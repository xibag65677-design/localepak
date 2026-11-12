import type { NextRequest } from 'next/server'
import {
  apiErrorResponse,
  apiJsonResponse,
  checkApiRateLimit,
  getApiBusinesses,
  rejectPresentedCredentials,
} from '@/lib/api-v1'

export const dynamic = 'force-dynamic'

/** GET /api/v1/businesses/[slug] — one public business by its slug. */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { result, exceeded } = checkApiRateLimit(request)
  if (exceeded) return exceeded
  const badAuth = rejectPresentedCredentials(request)
  if (badAuth) return badAuth

  const { slug } = await params
  const all = await getApiBusinesses()
  const business = all.find((b) => b.slug === slug)
  if (!business) {
    return apiErrorResponse(
      404,
      'not_found',
      `No public business found with slug "${slug}".`,
      'Check the slug against the listing URL (https://www.localepak.com/business/<slug>/), or search by keyword at GET /api/v1/businesses?q=<keyword>.',
      result
    )
  }
  return apiJsonResponse({ ok: true, data: business }, result)
}

export async function POST() {
  return apiErrorResponse(
    405,
    'method_not_allowed',
    'This API is read-only. POST is not supported on /api/v1/businesses/[slug].',
    'Use GET to read a listing. To manage a listing, sign in on the website at https://www.localepak.com/dashboard.'
  )
}
