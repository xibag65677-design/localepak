// ============================================================
// LocalePak — Weekly batch release for admin-approved businesses
// ------------------------------------------------------------
// Approvals happen any time in the admin panel, but an approved
// business does NOT go public immediately. Public visibility is
// released in a fixed 7-day cycle anchored at 2026-10-23
// (Asia/Karachi):
//
//   cycle 1: [2026-10-23, 2026-10-30)  -> releases on 2026-10-30
//   cycle 2: [2026-10-30, 2026-11-06)  -> releases on 2026-11-06
//   ...
//
// A Firestore business is publicly visible iff
//   status == 'approved'
//   AND (approvedAt missing/legacy OR approvedAt <= releaseBoundary(now))
//
// Everything approved during a cycle goes live together,
// automatically, when the next boundary passes — no cron job and
// no manual step. Seed listings (lib/seed-businesses.ts) are
// static and always visible; they are NOT part of this cycle.
//
// Scope: businesses only. Companies and jobs keep their current
// immediate-visibility behaviour, but can reuse these helpers
// later if the owner extends the cycle to them.
// ============================================================

/** Start of cycle 1: 2026-10-23 00:00 Asia/Karachi (+05:00). */
export const RELEASE_ANCHOR_MS = new Date('2026-10-23T00:00:00+05:00').getTime()

/** One release cycle: 7 days in milliseconds. */
export const CYCLE_MS = 7 * 24 * 3600 * 1000

/**
 * The most recent cycle boundary at or before `nowMs`.
 * For now in [Oct 23, Oct 30) this is Oct 23; from Oct 30 it is
 * Oct 30; then Nov 6, and so on.
 */
export function releaseBoundary(nowMs: number): number {
  return RELEASE_ANCHOR_MS + CYCLE_MS * Math.floor((nowMs - RELEASE_ANCHOR_MS) / CYCLE_MS)
}

/** The boundary at which the current cycle's approvals go live. */
export function nextRelease(nowMs: number): number {
  return releaseBoundary(nowMs) + CYCLE_MS
}

/** Structural stand-in for a Firestore Timestamp. */
export type TimestampLike = {
  toMillis?: () => number
  toDate?: () => Date
  seconds?: number
  nanoseconds?: number
}

/** Anything an `approvedAt` field can arrive as. */
export type ApprovedAtInput = Date | number | string | TimestampLike | null | undefined

/** Convert an approvedAt value to epoch ms; null when absent/unparseable. */
function approvedAtToMs(approvedAt: ApprovedAtInput): number | null {
  if (approvedAt === null || approvedAt === undefined) return null

  if (typeof approvedAt === 'number') {
    return Number.isFinite(approvedAt) ? approvedAt : null
  }

  if (approvedAt instanceof Date) {
    const t = approvedAt.getTime()
    return Number.isFinite(t) ? t : null
  }

  if (typeof approvedAt === 'string') {
    const t = Date.parse(approvedAt)
    return Number.isFinite(t) ? t : null
  }

  // Firestore Timestamp (or a plain { seconds, nanoseconds } object).
  if (typeof approvedAt.toMillis === 'function') {
    try {
      const t = approvedAt.toMillis()
      return Number.isFinite(t) ? t : null
    } catch {
      return null
    }
  }
  if (typeof approvedAt.toDate === 'function') {
    try {
      const t = approvedAt.toDate().getTime()
      return Number.isFinite(t) ? t : null
    } catch {
      return null
    }
  }
  if (typeof approvedAt.seconds === 'number') {
    return approvedAt.seconds * 1000 + Math.floor((approvedAt.nanoseconds || 0) / 1e6)
  }

  return null
}

/**
 * Whether a business approved at `approvedAt` is publicly released
 * at `nowMs`. A missing approvedAt means a legacy record approved
 * before the release cycle existed — those stay visible.
 *
 * PAUSED by owner order 2026-10-29 (for now): the cycle check is
 * bypassed, so an approved business goes live immediately. The
 * cycle code below is kept intact — restore it by setting
 * RELEASE_CYCLE_PAUSED to false.
 */
const RELEASE_CYCLE_PAUSED = true

export function isReleased(approvedAt: ApprovedAtInput, nowMs: number): boolean {
  if (RELEASE_CYCLE_PAUSED) return true
  const t = approvedAtToMs(approvedAt)
  if (t === null) return true
  return t <= releaseBoundary(nowMs)
}

/**
 * The next release date formatted for display in Asia/Karachi,
 * e.g. "30 October 2026".
 */
export function releaseDateLabel(nowMs: number): string {
  return new Date(nextRelease(nowMs)).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Karachi',
  })
}
