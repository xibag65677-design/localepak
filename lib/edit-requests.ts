// ============================================================
// LocalePak — listing edit requests
// ------------------------------------------------------------
// Premium / Featured owners cannot edit a live listing
// directly. They submit an edit REQUEST from their dashboard;
// an admin approves or rejects it. An approved edit goes live
// at the next weekly release boundary (lib/release.ts) — the
// same 7-day batch rhythm as newly approved businesses.
//
// Public detail pages merge approved, effective edits onto the
// stored listing with applyApprovedEdits() — the listing
// document itself is never rewritten by the owner, so a forged
// client write cannot change live content.
// ============================================================

import { nextRelease } from '@/lib/release'

export type EditRequestStatus = 'pending' | 'approved' | 'rejected'

export type EditRequest = {
  id: string
  listingType: 'business' | 'company' | 'job' | 'professional'
  listingId: string
  listingName: string
  ownerId: string
  ownerEmail: string
  /** Partial listing fields the owner asked to change. */
  changes: Record<string, any>
  status: EditRequestStatus
  adminNote?: string
  effectiveAt?: any
  createdAt?: any
}

/**
 * Fields an owner may request to change, per listing type.
 * Anything outside this allowlist is dropped when the admin
 * applies a request — status, tier, payment and ownership
 * fields can never be smuggled through an edit.
 */
export const EDITABLE_FIELDS: Record<EditRequest['listingType'], string[]> = {
  business: ['name', 'phone', 'whatsapp', 'description', 'address', 'area', 'website', 'facebook', 'instagram', 'youtube'],
  company: ['name', 'phone', 'description', 'address', 'website'],
  job: ['title', 'companyName', 'salaryRange', 'contact', 'description'],
  professional: ['name', 'profession', 'specialization', 'phone', 'whatsapp', 'experience', 'address', 'description', 'headline', 'skills', 'services', 'education', 'languages', 'githubUrl', 'linkedinUrl', 'facebookUrl', 'portfolioUrl'],
}

/** Human labels for the editable fields, used by admin + dashboard. */
export const EDITABLE_FIELD_LABELS: Record<string, string> = {
  name: 'Name',
  title: 'Job title',
  companyName: 'Company name',
  profession: 'Profession',
  specialization: 'Specialization',
  phone: 'Phone',
  whatsapp: 'WhatsApp',
  experience: 'Experience',
  salaryRange: 'Salary range',
  contact: 'Apply contact',
  description: 'Description',
  headline: 'Headline',
  skills: 'Skills',
  services: 'Services offered',
  education: 'Education',
  languages: 'Languages',
  githubUrl: 'GitHub',
  linkedinUrl: 'LinkedIn',
  facebookUrl: 'Facebook',
  portfolioUrl: 'Portfolio',
  address: 'Address',
  area: 'Area',
  website: 'Website',
  facebook: 'Facebook',
  instagram: 'Instagram',
  youtube: 'YouTube',
}

/** Keep only allowlisted, non-empty changes for a listing type. */
export function sanitizeChanges(listingType: EditRequest['listingType'], changes: Record<string, any>): Record<string, any> {
  const allowed = EDITABLE_FIELDS[listingType] || []
  const out: Record<string, any> = {}
  for (const key of allowed) {
    const v = changes[key]
    if (typeof v === 'string' && v.trim().length > 0) out[key] = v.trim()
  }
  return out
}

function effectiveMs(value: any): number | null {
  if (value === null || value === undefined) return null
  if (typeof value?.toMillis === 'function') return value.toMillis()
  if (typeof value === 'number') return value
  const t = Date.parse(String(value))
  return Number.isNaN(t) ? null : t
}

/**
 * Merge approved, already-effective edit requests onto a listing
 * for public display. Requests apply oldest-effective first, so a
 * later edit wins a field over an earlier one. Pending or
 * future-effective requests never change the public view.
 */
export function applyApprovedEdits<T extends Record<string, any>>(base: T, requests: EditRequest[], nowMs: number): T {
  const approved = requests
    .filter((r) => r.status === 'approved')
    .map((r) => ({ ...r, ms: effectiveMs(r.effectiveAt) }))
    .filter((r) => r.ms !== null && (r.ms as number) <= nowMs)
    .sort((a, b) => (a.ms as number) - (b.ms as number))
  if (approved.length === 0) return base
  const merged: Record<string, any> = { ...base }
  for (const r of approved) {
    const clean = sanitizeChanges(r.listingType, r.changes || {})
    Object.assign(merged, clean)
  }
  return merged as T
}

/** The boundary at which an edit approved right now will go live. */
export function nextEditRelease(nowMs: number): number {
  return nextRelease(nowMs)
}

const RESERVED_EDIT_KEYS = new Set([
  'status',
  'tier',
  'paymentStatus',
  'ownerId',
  'ownerName',
  'pendingEdit',
  'editEffectiveAt',
  'approvedAt',
  'createdAt',
])

/**
 * Display-time merge for the approval-time write pattern: when an
 * admin approves an edit request, the sanitized changes are folded
 * into the listing's `pendingEdit` field with `editEffectiveAt`
 * set to the next release boundary. Public pages call this on the
 * already-fetched listing document — no extra read, and no owner
 * data ever leaks, because pendingEdit holds display fields only.
 */
export function applyPendingEdit<T extends Record<string, any>>(doc: T, nowMs: number): T {
  const pending = (doc as any).pendingEdit
  const ms = effectiveMs((doc as any).editEffectiveAt)
  if (!pending || typeof pending !== 'object' || ms === null || ms > nowMs) return doc
  const merged: Record<string, any> = { ...doc }
  for (const [k, v] of Object.entries(pending)) {
    if (!RESERVED_EDIT_KEYS.has(k)) merged[k] = v
  }
  return merged as T
}
