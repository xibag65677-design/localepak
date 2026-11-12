import type { NextRequest } from 'next/server'
import {
  apiJsonResponse,
  checkApiRateLimit,
  getApiCategories,
  paginate,
  parsePagination,
  rejectPresentedCredentials,
} from '@/lib/api-v1'

export const dynamic = 'force-dynamic'

/** GET /api/v1/categories — the 24 directory categories. Query: q, page, per_page (max 20). */
export async function GET(request: NextRequest) {
  const { result, exceeded } = checkApiRateLimit(request)
  if (exceeded) return exceeded
  const badAuth = rejectPresentedCredentials(request)
  if (badAuth) return badAuth

  const params = request.nextUrl.searchParams
  const { page, perPage } = parsePagination(params)
  const { data, pagination } = paginate(
    getApiCategories(params.get('q') || undefined),
    page,
    perPage
  )
  return apiJsonResponse({ ok: true, data, pagination }, result)
}
