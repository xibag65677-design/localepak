import { NextRequest, NextResponse } from 'next/server'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { verifyTurnstileToken } from '@/lib/turnstile'
import {
  checkRateLimit,
  getClientIp,
  rateLimitExceededResponse,
  RATE_LIMITS,
} from '@/lib/rate-limit'

export async function POST(req: NextRequest) {
  try {
    // One IP cannot flood the support inbox (10/hour).
    const limit = checkRateLimit(`contact:${getClientIp(req)}`, RATE_LIMITS.contact)
    if (!limit.allowed) {
      return rateLimitExceededResponse(limit.resetAfterSeconds)
    }
    const body = await req.json()
    // Turnstile: when keys are configured the token must verify
    // server-side first. When no secret key is set, verification is
    // skipped and the message goes through exactly as before.
    const check = await verifyTurnstileToken(body?.turnstileToken, getClientIp(req))
    if (!check.success) {
      return NextResponse.json(
        { error: 'Security check failed. Please complete the verification and try again.' },
        { status: 400 }
      )
    }
    const name = String(body?.name || '').trim()
    const email = String(body?.email || '').trim()
    const phone = String(body?.phone || '').trim()
    const subject = String(body?.subject || 'General Inquiry').trim()
    const message = String(body?.message || '').trim()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email and message are required.' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 })
    }

    await addDoc(collection(db, 'contactMessages'), {
      name,
      email,
      phone,
      subject,
      message,
      status: 'new',
      createdAt: serverTimestamp(),
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact form submission failed:', err)
    return NextResponse.json({ error: 'Could not send your message. Please try again.' }, { status: 500 })
  }
}
