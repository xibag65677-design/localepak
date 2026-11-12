// ============================================================
// LocalePak — Public read-only API (v1) + MCP shared helpers
// ------------------------------------------------------------
// SERVER ONLY. Powers /api/v1/* and /api/mcp.
//
// ANTI-SCRAPE (standing order): the API exposes ONLY fields that
// are already public on the listing pages — name, slug, category,
// city, phone, description, featured flag, the listing's own
// public website link when the owner supplied one, and the public
// listing URL. Owner emails, owner IDs, payment data, and any
// other owner-private field are NEVER included. Results are capped
// at 20 per page and rate-limited to 60 requests/minute per IP,
// so there is no bulk "export all" path.
// ============================================================

import { CATEGORIES, CITIES } from '@/lib/data'
import {
  fetchApprovedBusinesses,
  SEED_CARDS,
  toBusinessCard,
  type PublicBusinessCard,
} from '@/lib/public-listings'
import { isReleased } from '@/lib/release'
import {
  checkRateLimit,
  getClientIp,
  RATE_LIMITS,
  type RateLimitResult,
} from '@/lib/rate-limit'

export const API_BASE_URL = 'https://www.localepak.com/api/v1'
export const API_MAX_PER_PAGE = 20
export const API_RATE_LIMIT_PER_MINUTE = RATE_LIMITS.api.limit

/** A business as the public API returns it — public fields only. */
export type ApiBusiness = {
  name: string
  slug: string
  category: string
  city: string
  phone: string
  description: string
  featured: boolean
  /** The business's own website, only when the owner supplied one. */
  website?: string
  /** Canonical public listing page. */
  url: string
}

export type ApiCategory = {
  id: string
  name: string
  description: string
  url: string
}

export type ApiCity = {
  name: string
  slug: string
  url: string
}

function slugify(value: string): string {
  return (value || '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function toApiBusiness(card: PublicBusinessCard, website?: string): ApiBusiness {
  const out: ApiBusiness = {
    name: card.name,
    slug: card.slug,
    category: card.category,
    city: card.city,
    phone: card.phone,
    description: card.description,
    featured: card.featured,
    url: `https://www.localepak.com/business/${card.slug}/`,
  }
  // The website link is the business's own public link, supplied by
  // the owner on the add-business form (optional). Seed listings
  // carry none, so the field is simply absent for them.
  if (website) out.website = website
  return out
}

/**
 * All public businesses: static seeds merged with approved +
 * released Firestore listings (same merge rule as the /businesses
 * grid — a Firestore listing replaces its seed in place on a slug
 * clash). Fail-soft: a Firestore failure leaves the seed set.
 */
export async function getApiBusinesses(): Promise<ApiBusiness[]> {
  const seeds = SEED_CARDS.map((c) => toApiBusiness(c))
  const rows = await fetchApprovedBusinesses()
  const now = Date.now()
  const seedIndexBySlug = new Map(seeds.map((s, i) => [s.slug, i] as const))
  const merged = [...seeds]
  const replaced = new Set<string>()
  const extras: ApiBusiness[] = []
  for (const row of rows) {
    if (!isReleased(row.data.approvedAt, now)) continue
    const card = toBusinessCard(row)
    const website =
      typeof row.data.website === 'string' && row.data.website.trim()
        ? row.data.website.trim()
        : undefined
    const item = toApiBusiness(card, website)
    const idx = seedIndexBySlug.get(item.slug)
    if (idx !== undefined && !replaced.has(item.slug)) {
      merged[idx] = item
      replaced.add(item.slug)
    } else {
      extras.push(item)
    }
  }
  return [...merged, ...extras]
}

export type BusinessSearchParams = {
  q?: string
  city?: string
  category?: string
}

/** Filter businesses by keyword / city / category (all case-insensitive). */
export function filterApiBusinesses(
  items: ApiBusiness[],
  params: BusinessSearchParams
): ApiBusiness[] {
  const q = (params.q || '').trim().toLowerCase()
  const city = (params.city || '').trim().toLowerCase()
  const category = (params.category || '').trim().toLowerCase()
  return items.filter((b) => {
    if (q) {
      const hay = `${b.name} ${b.description} ${b.category} ${b.city}`.toLowerCase()
      if (!q.split(/\s+/).every((tok) => hay.includes(tok))) return false
    }
    if (city && slugify(b.city) !== slugify(city) && b.city.toLowerCase() !== city) return false
    if (category) {
      const cat = CATEGORIES.find(
        (c) =>
          c.id === category ||
          c.name.toLowerCase() === category ||
          slugify(c.name) === slugify(category)
      )
      const matches =
        b.category.toLowerCase() === category ||
        slugify(b.category) === slugify(category) ||
        (cat !== undefined &&
          (b.category === cat.name || slugify(b.category) === slugify(cat.name)))
      if (!matches) return false
    }
    return true
  })
}

export function getApiCategories(q?: string): ApiCategory[] {
  const needle = (q || '').trim().toLowerCase()
  return CATEGORIES.filter((c) => {
    if (!needle) return true
    return `${c.id} ${c.name} ${c.desc}`.toLowerCase().includes(needle)
  }).map((c) => ({
    id: c.id,
    name: c.name,
    description: c.desc,
    url: `https://www.localepak.com/category/${c.id}/`,
  }))
}

export function getApiCities(q?: string): ApiCity[] {
  const needle = (q || '').trim().toLowerCase()
  return CITIES.filter((name) => {
    if (!needle) return true
    return name.toLowerCase().includes(needle) || slugify(name).includes(slugify(needle))
  }).map((name) => {
    const slug = slugify(name)
    return { name, slug, url: `https://www.localepak.com/city/${slug}/` }
  })
}

/* ------------------------- pagination ------------------------- */

export type Pagination = {
  page: number
  per_page: number
  total: number
  total_pages: number
}

export function parsePagination(searchParams: URLSearchParams): {
  page: number
  perPage: number
} {
  const rawPage = Number(searchParams.get('page') || '1')
  const rawPerPage = Number(searchParams.get('per_page') || String(API_MAX_PER_PAGE))
  const page = Number.isFinite(rawPage) && rawPage >= 1 ? Math.floor(rawPage) : 1
  const perPage =
    Number.isFinite(rawPerPage) && rawPerPage >= 1
      ? Math.min(Math.floor(rawPerPage), API_MAX_PER_PAGE)
      : API_MAX_PER_PAGE
  return { page, perPage }
}

export function paginate<T>(items: T[], page: number, perPage: number): {
  data: T[]
  pagination: Pagination
} {
  const total = items.length
  const totalPages = Math.max(1, Math.ceil(total / perPage))
  const start = (page - 1) * perPage
  return {
    data: page > totalPages ? [] : items.slice(start, start + perPage),
    pagination: { page, per_page: perPage, total, total_pages: totalPages },
  }
}

/* ------------------------- error shape ------------------------- */

export type ApiErrorCode =
  | 'bad_request'
  | 'not_found'
  | 'unauthorized'
  | 'rate_limited'
  | 'method_not_allowed'
  | 'internal_error'

export function apiErrorBody(
  code: ApiErrorCode,
  message: string,
  hint: string
): { ok: false; error: { code: ApiErrorCode; message: string; hint: string } } {
  return { ok: false, error: { code, message, hint } }
}

export function rateLimitResponseHeaders(result: RateLimitResult): Record<string, string> {
  const resetSeconds =
    result.resetAfterSeconds > 0 ? result.resetAfterSeconds : 60
  return {
    'RateLimit-Limit': String(RATE_LIMITS.api.limit),
    'RateLimit-Remaining': String(result.remaining),
    'RateLimit-Reset': String(resetSeconds),
  }
}

export function apiErrorResponse(
  status: number,
  code: ApiErrorCode,
  message: string,
  hint: string,
  rateLimit?: RateLimitResult
): Response {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (rateLimit) {
    Object.assign(headers, rateLimitResponseHeaders(rateLimit))
    if (status === 429) headers['Retry-After'] = String(Math.max(1, rateLimit.resetAfterSeconds))
  }
  return new Response(JSON.stringify(apiErrorBody(code, message, hint)), {
    status,
    headers,
  })
}

export function apiJsonResponse(
  body: unknown,
  rateLimit?: RateLimitResult,
  status = 200
): Response {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    // Listings change when an approval lands; a 60s edge cache keeps
    // repeat reads cheap without serving stale data for long.
    'Cache-Control': 'public, max-age=60, s-maxage=60',
  }
  if (rateLimit) Object.assign(headers, rateLimitResponseHeaders(rateLimit))
  return new Response(JSON.stringify(body), { status, headers })
}

/**
 * Per-IP rate-limit check for a public API request. Returns the
 * result on success, or the 429 response to return directly.
 */
export function checkApiRateLimit(request: Request): {
  result: RateLimitResult
  exceeded: Response | null
} {
  const result = checkRateLimit(`api:${getClientIp(request)}`, RATE_LIMITS.api)
  if (!result.allowed) {
    return {
      result,
      exceeded: apiErrorResponse(
        429,
        'rate_limited',
        'Too many requests. The public API allows 60 requests per minute per IP.',
        'Wait for the window to reset (see the Retry-After header), then retry. Reads are free and need no key — slow down instead of retrying in a loop.',
        result
      ),
    }
  }
  return { result, exceeded: null }
}

/**
 * LocalePak issues NO API tokens: public reads need no credentials
 * and there is no token endpoint. A request that presents an
 * Authorization header is therefore rejected with a spec-shaped
 * 401 (RFC 6750 / RFC 9728): the WWW-Authenticate hint points at
 * the protected-resource metadata, which states the real position.
 * Requests without an Authorization header pass through untouched.
 */
export function rejectPresentedCredentials(request: Request): Response | null {
  if (!request.headers.get('authorization')) return null
  return new Response(
    JSON.stringify(
      apiErrorBody(
        'unauthorized',
        'LocalePak issues no API tokens, so no bearer token is valid here.',
        'Remove the Authorization header: public reads need no credentials. Listing owners sign in on the website itself — see https://www.localepak.com/auth.md.'
      )
    ),
    {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
        'WWW-Authenticate':
          'Bearer realm="LocalePak", error="invalid_token", error_description="LocalePak issues no API tokens", resource_metadata="https://www.localepak.com/.well-known/oauth-protected-resource"',
      },
    }
  )
}
