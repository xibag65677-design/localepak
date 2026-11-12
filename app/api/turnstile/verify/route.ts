import { NextRequest, NextResponse } from 'next/server'
import { verifyTurnstileToken } from '@/lib/turnstile'
import {
  checkRateLimit,
  getClientIp,
  rateLimitExceededResponse,
  RATE_LIMITS,
} from '@/lib/rate-limit'

/**
 * POST /api/turnstile/verify — thin server verification for forms that
 * submit straight to Firestore from the client (add-business, add-company,
 * add-job, add-professional). The contact form verifies in its own route.
 *
 * Body: { token: string }. Returns { success, skipped?, error? }.
 * GRACEFULLY DISABLED when TURNSTILE_SECRET_KEY is unset: returns
 * { success: true, skipped: true } so forms keep working without keys.
 */
export async function POST(req: NextRequest) {
  try {
    const limit = checkRateLimit(`turnstile:${getClientIp(req)}`, RATE_LIMITS.submit)
    if (!limit.allowed) {
      return rateLimitExceededResponse(limit.resetAfterSeconds)
    }
    const body = await req.json().catch(() => ({}))
    const result = await verifyTurnstileToken(body?.token, getClientIp(req))
    if (!result.success) {
      return NextResponse.json(result, { status: 400 })
    }
    return NextResponse.json(result)
  } catch (error: any) {
    console.error('Turnstile verify API error:', error)
    return NextResponse.json(
      { success: false, error: 'verification-error' },
      { status: 500 }
    )
  }
}
