import { getFirebaseAuth } from '@/lib/firebase'

/**
 * Owner notification emails are sent through the site's own mail route
 * (app/api/send-mail) which delivers via Brevo — no Firebase extension
 * and no Blaze plan needed. The route verifies the caller's sign-in
 * token (when signed in) and enforces who may mail whom; signed-out
 * callers can only trigger notifications to the admin inbox.
 *
 * NEVER throws — returns false on failure so an email problem can
 * never break the user action that triggered it.
 */
export async function queueOwnerEmail(to: string, subject: string, text: string, html: string): Promise<boolean> {
  if (!to) return false
  try {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' }
    const current = (await getFirebaseAuth()).currentUser
    if (current) {
      try {
        headers.Authorization = `Bearer ${await current.getIdToken()}`
      } catch {
        // token unavailable — route still allows admin-inbox notifications
      }
    }
    const res = await fetch('/api/send-mail', {
      method: 'POST',
      headers,
      body: JSON.stringify({ to, message: { subject, text, html } }),
    })
    return res.ok
  } catch {
    return false
  }
}

const SUPPORT_LINE = 'Questions? Contact our team at https://www.localepak.com/contact and we will be happy to help.'

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export function buildRejectionEmail(args: {
  listingName: string
  ownerName?: string
  reasons: string[]
  note?: string
}): { subject: string; text: string; html: string } {
  const { listingName, ownerName, reasons, note } = args
  const subject = `Your LocalePak listing '${listingName}' was not approved`
  const greeting = ownerName ? `Dear ${ownerName},` : 'Hello,'
  const reasonLines = reasons.map((r) => `- ${r}`).join('\n')
  const reasonItems = reasons.map((r) => `<li>${esc(r)}</li>`).join('')

  const text = [
    greeting,
    '',
    `Thank you for submitting '${listingName}' to LocalePak. Our review team has checked your listing, and unfortunately we could not approve it in its current form.`,
    '',
    'Here is what needs attention:',
    reasonLines,
    ...(note ? ['', `A note from our review team: ${note}`] : []),
    '',
    'What to do next:',
    'This listing cannot be re-approved as it stands, so please do not wait for it to appear. Instead, submit a fresh, corrected listing at https://www.localepak.com/add-business and address each point above — accurate details, a reachable phone number, the right category, and a clear description written in your own words.',
    '',
    'Listings that follow our guidelines (https://www.localepak.com/business-listing-guidelines) are normally approved without any problem.',
    '',
    SUPPORT_LINE,
    '',
    '— The LocalePak Team',
  ].join('\n')

  const html = `
<div style="font-family:Arial,Helvetica,sans-serif;color:#0f172a;line-height:1.6;max-width:600px;margin:0 auto">
  <div style="background:#0f172a;color:#ffffff;padding:20px 24px;border-radius:12px 12px 0 0">
    <strong style="font-size:18px">LocalePak</strong>
  </div>
  <div style="border:1px solid #e2e8f0;border-top:none;padding:24px;border-radius:0 0 12px 12px">
    <p>${esc(greeting)}</p>
    <p>Thank you for submitting <strong>${esc(listingName)}</strong> to LocalePak. Our review team has checked your listing, and unfortunately we could not approve it in its current form.</p>
    <p><strong>Here is what needs attention:</strong></p>
    <ul>${reasonItems}</ul>
    ${note ? `<p><strong>A note from our review team:</strong> ${esc(note)}</p>` : ''}
    <p><strong>What to do next:</strong> this listing cannot be re-approved as it stands, so please submit a fresh, corrected listing at
    <a href="https://www.localepak.com/add-business">localepak.com/add-business</a> and address each point above — accurate details, a reachable phone number, the right category, and a clear description in your own words.</p>
    <p>Listings that follow our <a href="https://www.localepak.com/business-listing-guidelines">listing guidelines</a> are normally approved without any problem.</p>
    <p>Questions? <a href="https://www.localepak.com/contact">Contact our team</a> and we will be happy to help.</p>
    <p>— The LocalePak Team</p>
  </div>
</div>`.trim()

  return { subject, text, html }
}

export function buildDeletionEmail(args: {
  listingName: string
  ownerName?: string
  note?: string
}): { subject: string; text: string; html: string } {
  const { listingName, ownerName, note } = args
  const subject = `Your LocalePak listing '${listingName}' has been removed`
  const greeting = ownerName ? `Dear ${ownerName},` : 'Hello,'

  const text = [
    greeting,
    '',
    `We are writing to let you know that your LocalePak listing '${listingName}' has been removed from the directory by our moderation team.`,
    ...(note ? ['', `Reason given: ${note}`] : []),
    '',
    'If you would like to list again, please fill in all the details again from scratch — a removed listing cannot be restored.',
    '',
    'If this business is still operating, you are welcome to create a new listing that follows our guidelines:',
    '- Listing guidelines: https://www.localepak.com/business-listing-guidelines',
    '- Add a business: https://www.localepak.com/add-business',
    '',
    'A fresh listing with accurate details, a reachable phone number and the correct category will go through review in the normal way.',
    '',
    SUPPORT_LINE,
    '',
    '— The LocalePak Team',
  ].join('\n')

  const html = `
<div style="font-family:Arial,Helvetica,sans-serif;color:#0f172a;line-height:1.6;max-width:600px;margin:0 auto">
  <div style="background:#0f172a;color:#ffffff;padding:20px 24px;border-radius:12px 12px 0 0">
    <strong style="font-size:18px">LocalePak</strong>
  </div>
  <div style="border:1px solid #e2e8f0;border-top:none;padding:24px;border-radius:0 0 12px 12px">
    <p>${esc(greeting)}</p>
    <p>We are writing to let you know that your LocalePak listing <strong>${esc(listingName)}</strong> has been removed from the directory by our moderation team.</p>
    ${note ? `<p><strong>Reason given:</strong> ${esc(note)}</p>` : ''}
    <p>If you would like to list again, please fill in all the details again from scratch — a removed listing cannot be restored.</p>
    <p>If this business is still operating, you are welcome to create a new listing that follows our
    <a href="https://www.localepak.com/business-listing-guidelines">listing guidelines</a> — start at
    <a href="https://www.localepak.com/add-business">localepak.com/add-business</a>.</p>
    <p>A fresh listing with accurate details, a reachable phone number and the correct category will go through review in the normal way.</p>
    <p>Questions? <a href="https://www.localepak.com/contact">Contact our team</a> and we will be happy to help.</p>
    <p>— The LocalePak Team</p>
  </div>
</div>`.trim()

  return { subject, text, html }
}
