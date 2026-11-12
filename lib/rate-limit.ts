/**
 * Small dependency-free, in-memory fixed-window rate limiter (server only).
 *
 * Used by the Turnstile verify route and the contact route so one IP
 * cannot flood verification checks or the support inbox. In-memory
 * counters reset when the serverless instance is recycled, and each
 * instance keeps its own counters — acceptable for this site's threat
 * model (low-traffic directory), to be revisited if abuse appears: the
 * next step is a shared store (Upstash Redis / Vercel KV) or
 * provider-side limits.
 *
 * Budgets:
 *  - submit (public forms via /api/turnstile/verify): 10 / hour per IP.
 *    A legitimate submission is rare (one per visit); 10 stops listing
 *    spam floods while allowing a user to fix and resubmit a few times.
 *  - contact: 10 / hour per IP. A legitimate visitor sends one contact
 *    message; 10 leaves room for retries without letting one IP flood
 *    the inbox or burn Brevo quota.
 */

export type RateLimitPreset = { limit: number; windowMs: number }

export const RATE_LIMITS = {
  submit: { limit: 10, windowMs: 60 * 60 * 1000 },
  contact: { limit: 10, windowMs: 60 * 60 * 1000 },
  /**
   * Public read-only API (/api/v1/*, /api/mcp): 60 requests per minute
   * per IP. Reads are free and need no key; the cap exists only so one
   * IP cannot page through the whole directory in seconds (anti-scrape:
   * 20 results per page + this limit + public fields only).
   */
  api: { limit: 60, windowMs: 60 * 1000 },
} as const satisfies Record<string, RateLimitPreset>

export type RateLimitResult = {
  allowed: boolean
  /** Requests remaining in the current window (0 when blocked). */
  remaining: number
  /** Seconds until the current window resets (0 when allowed). */
  resetAfterSeconds: number
}

type Bucket = { count: number; resetAt: number }

/** Hard cap on tracked buckets so a flood of distinct keys cannot grow memory unboundedly. */
const MAX_BUCKETS = 10_000

const buckets = new Map<string, Bucket>()

/**
 * Server-side fixed-window check. `key` must already include its scope,
 * e.g. `turnstile:<ip>` or `contact:<ip>`.
 */
export function checkRateLimit(
  key: string,
  preset: RateLimitPreset
): RateLimitResult {
  const now = Date.now()
  const bucket = buckets.get(key)
  if (!bucket || now >= bucket.resetAt) {
    // New window. Prune expired buckets opportunistically (cheap,
    // amortised: only when we create a fresh bucket).
    if (buckets.size >= MAX_BUCKETS) {
      for (const [k, b] of buckets) {
        if (now >= b.resetAt) buckets.delete(k)
      }
      // Still full after pruning: drop the oldest entry to stay bounded.
      if (buckets.size >= MAX_BUCKETS) {
        const oldest = buckets.keys().next()
        if (!oldest.done) buckets.delete(oldest.value)
      }
    }
    buckets.set(key, { count: 1, resetAt: now + preset.windowMs })
    return { allowed: true, remaining: preset.limit - 1, resetAfterSeconds: 0 }
  }
  if (bucket.count >= preset.limit) {
    return {
      allowed: false,
      remaining: 0,
      resetAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000),
    }
  }
  bucket.count += 1
  return {
    allowed: true,
    remaining: preset.limit - bucket.count,
    resetAfterSeconds: 0,
  }
}

/**
 * Best-effort client IP for a route handler. On Vercel, `x-forwarded-for`
 * starts with the real client IP; `x-real-ip` is the fallback. Returns
 * 'unknown' when neither header is present (shared bucket — still capped).
 * Note: this header is spoofable by a direct caller, so it is only a
 * rate-limit key, never an identity signal.
 */
export function getClientIp(request: { headers: Headers }): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim()
    if (first) return first
  }
  const realIp = request.headers.get('x-real-ip')?.trim()
  if (realIp) return realIp
  return 'unknown'
}

/**
 * Standard 429 response for a rate-limited route handler. Sets
 * Retry-After so well-behaved clients back off.
 */
export function rateLimitExceededResponse(resetAfterSeconds: number): Response {
  return new Response(
    JSON.stringify({
      ok: false,
      error: 'rate_limited',
      message: 'Too many requests. Please try again later.',
    }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': String(Math.max(1, resetAfterSeconds)),
      },
    }
  )
}
