import type { NextRequest } from 'next/server'
import {
  apiErrorResponse,
  apiJsonResponse,
  checkApiRateLimit,
  filterApiBusinesses,
  getApiBusinesses,
  paginate,
  parsePagination,
  rejectPresentedCredentials,
} from '@/lib/api-v1'

export const dynamic = 'force-dynamic'

/**
 * GET /api/v1/businesses — public read-only search.
 * Query: q (keyword), city (name or slug), category (id, name or
 * slug), page, per_page (max 20). Public fields only; 60 req/min/IP.
 */
export async function GET(request: NextRequest) {
  const { result, exceeded } = checkApiRateLimit(request)
  if (exceeded) return exceeded
  const badAuth = rejectPresentedCredentials(request)
  if (badAuth) return badAuth

  const params = request.nextUrl.searchParams
  const { page, perPage } = parsePagination(params)
  const all = await getApiBusinesses()
  const filtered = filterApiBusinesses(all, {
    q: params.get('q') || undefined,
    city: params.get('city') || undefined,
    category: params.get('category') || undefined,
  })
  const { data, pagination } = paginate(filtered, page, perPage)
  return apiJsonResponse({ ok: true, data, pagination }, result)
}

export async function POST() {
  return apiErrorResponse(
    405,
    'method_not_allowed',
    'This API is read-only. POST is not supported on /api/v1/businesses.',
    'Use GET to read listings. To add or manage a listing, sign in on the website at https://www.localepak.com/add-business.'
  )
}
