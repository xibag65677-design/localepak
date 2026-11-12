/**
 * Cloudflare Turnstile (CAPTCHA alternative) — LocalePak.
 *
 * Keys are the USER's job: create a Turnstile site in the Cloudflare
 * dashboard (https://dash.cloudflare.com/?to=/:account/turnstile) and set
 *   NEXT_PUBLIC_TURNSTILE_SITE_KEY  (public site key — safe in the client)
 *   TURNSTILE_SECRET_KEY            (secret — server only, never NEXT_PUBLIC_)
 * in Vercel env (and .env.local for local dev). NO keys are hardcoded here
 * and NONE are invented — until both are set, every form works exactly as
 * before: the widget renders nothing and verification is skipped.
 *
 * Flow: the client widget (components/turnstile-widget.tsx) obtains a token
 * and the submit handler verifies it — either server-side in the form's own
 * API route (/api/contact), or via the thin /api/turnstile/verify route for
 * forms that write straight to Firestore from the client (add-business,
 * add-company, add-job, add-professional).
 */

const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

export interface TurnstileVerifyResult {
  success: boolean
  /** True when no secret key is configured — verification was skipped, not passed. */
  skipped?: boolean
  error?: string
  errorCodes?: string[]
}

/** Public site key (client-safe). Empty until the user sets it. */
export function getTurnstileSiteKey(): string {
  return (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '').trim()
}

/** True when the widget can render (site key set). Client-side check. */
export function isTurnstileWidgetEnabled(): boolean {
  return getTurnstileSiteKey().length > 0
}

/** True when server verification can run (secret key set). */
export function isTurnstileConfigured(): boolean {
  return (process.env.TURNSTILE_SECRET_KEY || '').trim().length > 0
}

/**
 * Server-side token verification against Cloudflare.
 * GRACEFULLY DISABLED when TURNSTILE_SECRET_KEY is unset: returns
 * { success: true, skipped: true } so forms keep working without keys.
 * Call only from server code (API routes) — never from the client.
 */
export async function verifyTurnstileToken(
  token: string | null | undefined,
  remoteIp?: string | null
): Promise<TurnstileVerifyResult> {
  const secret = (process.env.TURNSTILE_SECRET_KEY || '').trim()
  if (!secret) {
    return { success: true, skipped: true }
  }
  if (!token || typeof token !== 'string' || !token.trim()) {
    return { success: false, error: 'missing-token' }
  }
  try {
    const body = new URLSearchParams({ secret, response: token.trim() })
    if (remoteIp) body.set('remoteip', remoteIp)
    const res = await fetch(SITEVERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    })
    const data = (await res.json()) as {
      success?: boolean
      'error-codes'?: string[]
    }
    if (data.success === true) return { success: true }
    return {
      success: false,
      error: 'verification-failed',
      errorCodes: data['error-codes'] || [],
    }
  } catch (err) {
    console.error('[turnstile] siteverify request failed:', err)
    return { success: false, error: 'verification-error' }
  }
}

/**
 * Client-side helper: verifies a widget token through the thin
 * /api/turnstile/verify route (for forms with no server submit route).
 * Returns { success: true, skipped: true } when keys are unset.
 */
export async function verifyTurnstileTokenClient(
  token: string | null
): Promise<TurnstileVerifyResult> {
  try {
    const res = await fetch('/api/turnstile/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
    return (await res.json()) as TurnstileVerifyResult
  } catch (err) {
    console.warn('[turnstile] verify request failed:', err)
    return { success: false, error: 'verification-error' }
  }
}
