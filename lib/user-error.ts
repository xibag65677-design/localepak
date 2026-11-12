/**
 * User-safe error text.
 *
 * Backend failures must never reach the user as raw text: Firebase error
 * messages name the backend ("FirebaseError", quota errors, permission
 * errors) and teach a visitor what the site runs on. This returns the
 * original message ONLY when it is plain, non-technical wording (our own
 * validation messages, e.g. the image compressor's); anything that smells
 * like a backend error becomes a generic fallback. Technical detail still
 * belongs in console.error at the call site, never in a toast.
 */
const TECHNICAL_MARKERS = [
  'firebase',
  'firestore',
  'firestore.googleapis.com',
  'permission-denied',
  'missing or insufficient permissions',
  'resource-exhausted',
  'quota',
  'auth/',
  'storage/',
  'internal error',
  '://', // URLs leak endpoints and are never user wording
]

export function safeErrorMessage(
  err: unknown,
  fallback = 'Something went wrong. Please try again.',
): string {
  const code = (err as any)?.code
  const message = (err as any)?.message
  // Firebase-style error codes (auth/..., firestore/...) are never user text.
  if (typeof code === 'string' && code.includes('/')) {
    return fallback
  }
  if (typeof message === 'string' && message.trim().length > 0) {
    const text = message.trim()
    if (text.length > 200) {
      return fallback
    }
    const lower = text.toLowerCase()
    if (TECHNICAL_MARKERS.some((m) => lower.includes(m))) {
      return fallback
    }
    return text
  }
  return fallback
}
