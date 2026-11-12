import { NextRequest, NextResponse } from 'next/server'

/**
 * LocalePak transactional mail — direct-send route (no Firebase extension).
 *
 * The client mail helpers (lib/owner-mail.ts -> lib/mail.ts) POST here with
 * { to, message: { subject, text, html } }. This route verifies who is
 * asking and then sends through the Brevo transactional API using the
 * server-only BREVO_API_KEY (Vercel env). Sender is the authenticated
 * domain address noreply@localepak.com; replies go to admin@localepak.com.
 *
 * Authorization mirrors the old Firestore `mail` rules:
 * - Signed-in caller (verified ID token): may mail themselves or the admin
 *   inbox. The admin accounts (admin@, support@) may mail anyone (approval /
 *   rejection / deletion / payment emails go to listing owners).
 * - Signed-out caller: may ONLY trigger a notification to the admin inbox
 *   (e.g. a visitor submitting a review). Nothing else can be sent.
 */

const BREVO_URL = 'https://api.brevo.com/v3/smtp/email'
const ADMIN_EMAIL = 'admin@localepak.com'
// Admin senders: the site owner's two mailboxes. The admin panel itself is
// role-gated (users doc role === 'admin'), but this route used to accept
// ONLY admin@ as the admin identity — while the owner's actual admin
// sign-in is support@ (proven 2026-10-27: admin@ was still free to register
// while support@ was already registered). That mismatch made every
// admin-to-owner email (reject / delete / approve / payment) fail with 403,
// while self-addressed signup/submission emails kept working. Both of these
// inboxes belong to the site owner, so both may mail listing owners.
const ADMIN_SENDERS = new Set([ADMIN_EMAIL, 'support@localepak.com'])
const SENDER = { name: 'LocalePak', email: 'noreply@localepak.com' }

async function verifyToken(idToken: string): Promise<{ email: string } | null> {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
  if (!apiKey || !idToken) return null
  try {
    const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    })
    if (!res.ok) return null
    const data: any = await res.json().catch(() => null)
    const email = data?.users?.[0]?.email
    if (!email || typeof email !== 'string') return null
    return { email: email.toLowerCase() }
  } catch {
    return null
  }
}

export async function POST(req: NextRequest) {
  const brevoKey = process.env.BREVO_API_KEY
  if (!brevoKey) {
    return NextResponse.json({ error: 'mail_not_configured' }, { status: 503 })
  }

  let body: any
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 })
  }

  const to = typeof body?.to === 'string' ? body.to.trim() : ''
  const subject = typeof body?.message?.subject === 'string' ? body.message.subject : ''
  const text = typeof body?.message?.text === 'string' ? body.message.text : ''
  const html = typeof body?.message?.html === 'string' ? body.message.html : ''

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)
  if (
    !emailOk ||
    !subject ||
    (!text && !html) ||
    subject.length > 200 ||
    text.length > 5000 ||
    html.length > 20000
  ) {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 })
  }

  const authz = req.headers.get('authorization') || ''
  const token = authz.startsWith('Bearer ') ? authz.slice('Bearer '.length) : ''
  const caller = token ? await verifyToken(token) : null
  const target = to.toLowerCase()

  if (caller) {
    const isAdmin = ADMIN_SENDERS.has(caller.email)
    if (!isAdmin && target !== caller.email && target !== ADMIN_EMAIL) {
      return NextResponse.json({ error: 'forbidden' }, { status: 403 })
    }
  } else if (target !== ADMIN_EMAIL) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  try {
    const res = await fetch(BREVO_URL, {
      method: 'POST',
      headers: {
        'api-key': brevoKey,
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: SENDER,
        to: [{ email: to }],
        replyTo: { email: ADMIN_EMAIL },
        subject,
        ...(text ? { textContent: text } : {}),
        ...(html ? { htmlContent: html } : {}),
      }),
    })
    if (!res.ok) {
      return NextResponse.json({ error: 'send_failed' }, { status: 502 })
    }
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'send_failed' }, { status: 502 })
  }
}
