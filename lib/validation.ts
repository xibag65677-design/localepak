// ============================================================
// LocalePak — shared input validation helpers
// ------------------------------------------------------------
// Pakistani MOBILE numbers only, in the formats a user would
// actually type:
//   0300 1234567 / 03001234567        (local, 11 digits)
//   +92 300 1234567 / +923001234567   (international, 13 chars)
//   923001234567 / 3001234567         (prefix variants)
// Anything containing letters, or with more/fewer digits than
// the standard, is INVALID — there is deliberately no loose
// "enough digits" fallback.
// ============================================================

const PK_MOBILE_RE = /^(\+92|92|0)?3\d{9}$/

export function isValidPakistaniPhone(value: string): boolean {
  const compact = value.replace(/[\s-]/g, '')
  return PK_MOBILE_RE.test(compact)
}

/** Canonical stored form: 03XXXXXXXXX or +923XXXXXXXXX. */
export function normalizePakistaniPhone(value: string): string {
  let v = value.replace(/[\s-]/g, '')
  if (/^92\d{10}$/.test(v)) v = `+${v}`
  if (/^3\d{9}$/.test(v)) v = `0${v}`
  return v
}

/** While typing in a phone field: keep only digits, +, spaces and dashes. */
export function sanitizePhoneInput(value: string): string {
  return value.replace(/[^\d+\s-]/g, '')
}

// ============================================================
// Product prices: a plain positive number ("350", "350.50").
// Free text such as "abc" or "Rs 350" is NOT a valid price.
// An empty price is allowed where the price is optional.
// ============================================================

export function isValidPrice(value: string): boolean {
  const v = value.trim()
  if (v === '') return true
  if (!/^\d+(\.\d{1,2})?$/.test(v)) return false
  const n = Number(v)
  return n > 0 && n <= 999_999_999
}

// ============================================================
// Profile / website links: optional, but when present they
// must be a real http(s) URL. A bare "github.com/user" is
// accepted and normalized to https://github.com/user.
// ============================================================

/** Normalize a typed link: trim + add https:// when no scheme is present. */
export function normalizeUrl(value: string): string {
  const v = value.trim()
  if (v === '') return ''
  if (/^https?:\/\//i.test(v)) return v
  return `https://${v}`
}

/** True for an empty value or a parseable http(s) URL with a dotted host. */
export function isValidUrl(value: string): boolean {
  const v = value.trim()
  if (v === '') return true
  try {
    const u = new URL(normalizeUrl(v))
    return (u.protocol === 'http:' || u.protocol === 'https:') && u.hostname.includes('.')
  } catch {
    return false
  }
}
