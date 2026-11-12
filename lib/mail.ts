import { queueOwnerEmail } from '@/lib/owner-mail'
import { loadOwnerEmail } from '@/lib/owner-contact'

// ============================================================
// LocalePak — transactional mail (welcome / received /
// approved / payment + admin notifications)
// ------------------------------------------------------------
// Every email the site sends goes through queueOwnerEmail()
// (lib/owner-mail.ts), which POSTs { to, message: { subject,
// text, html } } to the site's own /api/send-mail route. That
// route verifies the caller and delivers via Brevo — no
// Firebase extension or Blaze plan is involved.
//
// queueOwnerEmail NEVER throws (it returns false on failure), so
// calling these helpers can never break the user action that
// triggered the email. Callers may await them or fire-and-forget.
// ============================================================

/** Where admin notification emails go. One place only — change here. */
export const ADMIN_EMAIL = 'admin@localepak.com'

const SITE = 'https://www.localepak.com'
const SUPPORT_LINE = 'Questions? Contact our team at https://www.localepak.com/contact and we will be happy to help.'

// Cross-promotion PS (user order 2026-11-08, extended same day to add
// ListPak): one line at the end of happy-path owner emails only (welcome
// / listing-approved / payment-approved). Never in rejection, delete, or
// admin mail. BOTH URLs live-verified 2026-11-08 (HTTP 200 + correct
// <title>): PakListings add-business + ListPak add-business.
const CROSS_PROMO_TEXT = 'P.S. Want more visibility? List your business on PakListings too: https://www.paklistings.com/add-business — and on ListPak: https://www.listpak.com/add-business'
const CROSS_PROMO_HTML = 'P.S. Want more visibility? List your business on <a href="https://www.paklistings.com/add-business">PakListings</a> too — and on <a href="https://www.listpak.com/add-business">ListPak</a>.'

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/** Same branded shell the rejection/deletion emails use. */
function shell(innerHtml: string): string {
  return `
<div style="font-family:Arial,Helvetica,sans-serif;color:#0f172a;line-height:1.6;max-width:600px;margin:0 auto">
  <div style="background:#0f172a;color:#ffffff;padding:20px 24px;border-radius:12px 12px 0 0">
    <strong style="font-size:18px">LocalePak</strong>
  </div>
  <div style="border:1px solid #e2e8f0;border-top:none;padding:24px;border-radius:0 0 12px 12px">
    ${innerHtml}
    <p>— The LocalePak Team</p>
  </div>
</div>`.trim()
}

function greeting(ownerName?: string): string {
  return ownerName ? `Dear ${ownerName},` : 'Hello,'
}

// ------------------------------------------------------------
// (a) Welcome — queued right after a successful registration.
// ------------------------------------------------------------
export async function queueWelcomeEmail(to: string, ownerName?: string): Promise<boolean> {
  const subject = 'Welcome to LocalePak — your account is ready'
  const text = [
    greeting(ownerName),
    '',
    'Welcome to LocalePak, and thank you for creating your account.',
    '',
    'From your dashboard you can now:',
    '- Add a business listing (plans from PKR 99) and get found by customers across Pakistan',
    '- Add a company profile',
    '- Post a job and reach candidates',
    '',
    'Every listing is reviewed by our team before it goes public, and we will email you at each step — received, approved, or if anything needs fixing.',
    '',
    `Your dashboard: ${SITE}/dashboard`,
    '',
    SUPPORT_LINE,
    '',
    CROSS_PROMO_TEXT,
    '',
    '— The LocalePak Team',
  ].join('\n')
  const html = shell(`
    <p>${esc(greeting(ownerName))}</p>
    <p>Welcome to <strong>LocalePak</strong>, and thank you for creating your account.</p>
    <p>From your dashboard you can now:</p>
    <ul>
      <li>Add a <strong>business listing</strong> (plans from PKR 99) and get found by customers across Pakistan</li>
      <li>Add a <strong>company profile</strong></li>
      <li><strong>Post a job</strong> and reach candidates</li>
    </ul>
    <p>Every listing is reviewed by our team before it goes public, and we will email you at each step — received, approved, or if anything needs fixing.</p>
    <p><a href="${SITE}/dashboard">Open your dashboard</a></p>
    <p>Questions? <a href="${SITE}/contact">Contact our team</a> and we will be happy to help.</p>
    <p>${CROSS_PROMO_HTML}</p>
  `)
  return queueOwnerEmail(to, subject, text, html)
}

// ------------------------------------------------------------
// (b) Submission received — owner confirmation for add-flows,
// plus the admin notification for the same submission.
// kind: 'business' | 'company' | 'job'
// ------------------------------------------------------------
export type SubmissionKind = 'business' | 'company' | 'job' | 'professional'

const KIND_LABEL: Record<SubmissionKind, string> = {
  business: 'business listing',
  company: 'company profile',
  job: 'job post',
  professional: 'professional profile',
}

const KIND_ADMIN_PATH: Record<SubmissionKind, string> = {
  business: '/admin/businesses',
  company: '/admin/companies',
  job: '/admin/jobs',
  professional: '/admin/professionals',
}

export async function queueSubmissionEmails(args: {
  kind: SubmissionKind
  name: string
  city?: string
  ownerEmail: string
  ownerName?: string
}): Promise<void> {
  const { kind, name, city, ownerEmail, ownerName } = args
  const label = KIND_LABEL[kind]

  // Owner: "received, under review".
  const subject = `We received your ${label} '${name}' — it is under review`
  const releaseNote =
    kind === 'business'
      ? ' Once approved, it goes live on LocalePak straight away.'
      : ' Once approved, it goes live on LocalePak straight away.'
  const text = [
    greeting(ownerName),
    '',
    `Thank you — we have received your ${label} '${name}'${city ? ` (${city})` : ''} and it is now waiting for review.`,
    '',
    `Our team checks every submission by hand. You do not need to do anything else: we will email you when it is approved, or if something needs fixing first.${releaseNote}`,
    '',
    `Track its status any time in your dashboard: ${SITE}/dashboard`,
    '',
    SUPPORT_LINE,
    '',
    '— The LocalePak Team',
  ].join('\n')
  const html = shell(`
    <p>${esc(greeting(ownerName))}</p>
    <p>Thank you — we have received your ${label} <strong>${esc(name)}</strong>${city ? ` (${esc(city)})` : ''} and it is now waiting for review.</p>
    <p>Our team checks every submission by hand. You do not need to do anything else: we will email you when it is approved, or if something needs fixing first.${esc(releaseNote)}</p>
    <p>Track its status any time in <a href="${SITE}/dashboard">your dashboard</a>.</p>
    <p>Questions? <a href="${SITE}/contact">Contact our team</a> and we will be happy to help.</p>
  `)
  await queueOwnerEmail(ownerEmail, subject, text, html)

  // Admin: new submission waiting in the queue.
  await notifyAdmin({
    type: label,
    name,
    city,
    adminPath: KIND_ADMIN_PATH[kind],
    lines: [`Submitted by: ${ownerName || '—'} <${ownerEmail || 'no email'}>`],
  })
}

// ------------------------------------------------------------
// Admin notifications. Subject pattern:
//   [LocalePak Admin] New <type>: <name> — <city>
// (city suffix omitted when the source flow has no city.)
// ------------------------------------------------------------
export async function notifyAdmin(args: {
  type: string
  name: string
  city?: string
  adminPath: string
  lines?: string[]
}): Promise<boolean> {
  const { type, name, city, adminPath, lines = [] } = args
  const subject = `[LocalePak Admin] New ${type}: ${name}${city ? ` — ${city}` : ''}`
  const url = `${SITE}${adminPath}`
  const text = [
    `A new ${type} is waiting for review on LocalePak.`,
    '',
    `Name: ${name}`,
    ...(city ? [`City: ${city}`] : []),
    ...lines,
    '',
    `Review it here: ${url}`,
  ].join('\n')
  const html = shell(`
    <p>A new <strong>${esc(type)}</strong> is waiting for review on LocalePak.</p>
    <p><strong>Name:</strong> ${esc(name)}${city ? `<br /><strong>City:</strong> ${esc(city)}` : ''}</p>
    ${lines.length ? `<p>${lines.map((l) => esc(l)).join('<br />')}</p>` : ''}
    <p><a href="${url}">Review it in the admin panel</a></p>
  `)
  return queueOwnerEmail(ADMIN_EMAIL, subject, text, html)
}

/** Admin notification: a visitor submitted a review. */
export async function notifyAdminNewReview(args: {
  businessName: string
  city?: string
  authorName: string
  rating: number
}): Promise<boolean> {
  return notifyAdmin({
    type: 'review',
    name: args.businessName,
    city: args.city,
    adminPath: '/admin/reviews',
    lines: [`Reviewer: ${args.authorName}`, `Rating: ${args.rating}/5`],
  })
}

/** Admin notification: an owner submitted a payment proof. */
export async function notifyAdminNewPaymentProof(args: {
  listingName: string
  plan: string
  tier?: string
  method?: string
  amount?: number
}): Promise<boolean> {
  if (args.tier) {
    const tierLabel = args.tier === 'premium' ? 'Premium' : args.tier === 'featured' ? 'Featured' : 'Basic'
    const methodLabel =
      args.method === 'jazzcash' ? 'JazzCash' : args.method === 'mashreq' ? 'Mashreq Bank' : 'Easypaisa'
    return notifyAdmin({
      type: 'payment proof',
      name: args.listingName,
      adminPath: '/admin/payments',
      lines: [
        `Tier payment: ${tierLabel}${args.amount ? ` — PKR ${args.amount}` : ''} via ${methodLabel}`,
        'Verify the screenshot, then approve: approval also approves the listing.',
      ],
    })
  }
  return notifyAdmin({
    type: 'payment proof',
    name: args.listingName,
    adminPath: '/admin/payments',
    lines: [`Upgrade requested: ${args.plan === 'verified' ? 'Verified' : 'Featured'}`],
  })
}

// ------------------------------------------------------------
// (c) Approval — queued by the admin businesses/companies/jobs
// pages after a successful approve. Businesses join the weekly
// release (lib/release.ts) and the email states the actual date;
// companies and jobs are live immediately.
// ------------------------------------------------------------
export async function queueListingApprovedEmail(
  col: 'businesses' | 'companies' | 'jobs' | 'professionals',
  item: { id: string; data: any }
): Promise<boolean> {
  const data = item.data || {}
  const name = data.name || data.title || 'your listing'
  const ownerName = data.ownerName || ''
  const ownerEmail = data.ownerEmail || (await loadOwnerEmail(col, item.id))
  if (!ownerEmail) return false

  if (col === 'businesses') {
    const subject = `Good news — '${name}' is approved and now live`
    const text = [
      greeting(ownerName),
      '',
      `Great news: your business listing '${name}' has been approved by our review team.`,
      '',
      `Your listing is live now — it appears in search results and in its city and category pages.`,
      ...(data.slug ? ['', `Your listing page: ${SITE}/business/${data.slug}`] : []),
      '',
      'Want more customers? Ask your happy customers to leave a review on your listing page — reviews help you rank higher.',
      '',
      SUPPORT_LINE,
      '',
      CROSS_PROMO_TEXT,
      '',
      '— The LocalePak Team',
    ].join('\n')
    const html = shell(`
      <p>${esc(greeting(ownerName))}</p>
      <p>Great news: your business listing <strong>${esc(name)}</strong> has been approved by our review team.</p>
      <p>Your listing is live now — it appears in search results and in its city and category pages.</p>
      ${data.slug ? `<p><a href="${SITE}/business/${esc(data.slug)}">Preview your listing page</a></p>` : ''}
      <p>Want more customers? Ask your happy customers to leave a review on your listing page — reviews help you rank higher.</p>
      <p>Questions? <a href="${SITE}/contact">Contact our team</a> and we will be happy to help.</p>
      <p>${CROSS_PROMO_HTML}</p>
    `)
    return queueOwnerEmail(ownerEmail, subject, text, html)
  }

  const isCompany = col === 'companies'
  const label = isCompany ? 'company profile' : col === 'professionals' ? 'professional profile' : 'job post'
  const publicUrl = isCompany && data.slug ? `${SITE}/company/${data.slug}` : col === 'professionals' && data.slug ? `${SITE}/professional/${data.slug}` : ''
  const subject = `Good news — your ${label} '${name}' is now live`
  const text = [
    greeting(ownerName),
    '',
    `Great news: your ${label} '${name}' has been approved by our review team and is now live on LocalePak.`,
    ...(publicUrl ? ['', `See it here: ${publicUrl}`] : []),
    '',
    `You can update its details any time from your dashboard: ${SITE}/dashboard`,
    '',
    SUPPORT_LINE,
    '',
    CROSS_PROMO_TEXT,
    '',
    '— The LocalePak Team',
  ].join('\n')
  const html = shell(`
    <p>${esc(greeting(ownerName))}</p>
    <p>Great news: your ${label} <strong>${esc(name)}</strong> has been approved by our review team and is <strong>now live</strong> on LocalePak.</p>
    ${publicUrl ? `<p><a href="${publicUrl}">See your live profile</a></p>` : ''}
    <p>You can update its details any time from <a href="${SITE}/dashboard">your dashboard</a>.</p>
    <p>Questions? <a href="${SITE}/contact">Contact our team</a> and we will be happy to help.</p>
    <p>${CROSS_PROMO_HTML}</p>
  `)
  return queueOwnerEmail(ownerEmail, subject, text, html)
}

// ------------------------------------------------------------
// (d) Payment-proof approval — the listing's Featured / Verified
// upgrade has been switched on. Owner email comes from the proof
// document itself (it carries ownerEmail by design), with the
// listing's private contact document as fallback.
// ------------------------------------------------------------
export async function queuePaymentApprovedEmail(item: { id: string; data: any }): Promise<boolean> {
  const data = item.data || {}
  const listingName = data.listingName || 'your listing'
  const listingCol =
    data.listingType === 'company'
      ? 'companies'
      : data.listingType === 'job'
        ? 'jobs'
        : data.listingType === 'professional'
          ? 'professionals'
          : 'businesses'
  const ownerEmail =
    data.ownerEmail || (data.listingId ? await loadOwnerEmail(listingCol, data.listingId) : '')
  if (!ownerEmail) return false

  // Tier payment approval (new paid-listing flow): verifying the
  // proof also approves the listing itself, and it goes live at once
  // (weekly release batch paused 2026-10-29).
  if (data.tier) {
    const tierLabel = data.tier === 'premium' ? 'Premium' : data.tier === 'featured' ? 'Featured' : 'Basic'
    const isBusiness = data.listingType === 'business'
    const subject = isBusiness
      ? `Payment verified — '${listingName}' is approved and now live`
      : `Payment verified — your ${tierLabel} listing '${listingName}' is now live`
    const text = [
      'Hello,',
      '',
      `We have verified your payment, and your ${tierLabel} listing '${listingName}' has been approved.`,
      '',
      isBusiness
        ? 'Your listing is now live on LocalePak.'
        : 'Your listing is now live on LocalePak.',
      '',
      `Manage your listing any time from your dashboard: ${SITE}/dashboard`,
      '',
      SUPPORT_LINE,
      '',
      CROSS_PROMO_TEXT,
      '',
      '— The LocalePak Team',
    ].join('\n')
    const html = shell(`
      <p>Hello,</p>
      <p>We have verified your payment, and your <strong>${tierLabel}</strong> listing <strong>${esc(listingName)}</strong> has been approved.</p>
      <p>Your listing is now live on LocalePak.</p>
      <p>Manage your listing any time from <a href="${SITE}/dashboard">your dashboard</a>.</p>
      <p>Questions? <a href="${SITE}/contact">Contact our team</a> and we will be happy to help.</p>
      <p>${CROSS_PROMO_HTML}</p>
    `)
    return queueOwnerEmail(ownerEmail, subject, text, html)
  }

  const planLabel = data.plan === 'verified' ? 'Verified' : 'Featured'

  const benefit =
    planLabel === 'Verified'
      ? 'Your listing now carries the blue Verified badge, which tells customers your business has been checked by our team.'
      : 'Your listing now carries the Featured badge and is highlighted ahead of ordinary listings in its city and category.'
  const subject = `Payment approved — '${listingName}' is now ${planLabel}`
  const text = [
    'Hello,',
    '',
    `We have verified your payment, and your listing '${listingName}' is now ${planLabel} on LocalePak.`,
    '',
    benefit,
    '',
    `Manage your listing any time from your dashboard: ${SITE}/dashboard`,
    '',
    SUPPORT_LINE,
    '',
    CROSS_PROMO_TEXT,
    '',
    '— The LocalePak Team',
  ].join('\n')
  const html = shell(`
    <p>Hello,</p>
    <p>We have verified your payment, and your listing <strong>${esc(listingName)}</strong> is now <strong>${planLabel}</strong> on LocalePak.</p>
    <p>${esc(benefit)}</p>
    <p>Manage your listing any time from <a href="${SITE}/dashboard">your dashboard</a>.</p>
    <p>Questions? <a href="${SITE}/contact">Contact our team</a> and we will be happy to help.</p>
    <p>${CROSS_PROMO_HTML}</p>
  `)
  return queueOwnerEmail(ownerEmail, subject, text, html)
}
