/**
 * LocalePak Input Sanitization & Security Helper
 * Guards user-submitted content (businesses, jobs, professionals, contacts)
 * against XSS, script injection, and protocol manipulation.
 */

export function sanitizeText(input?: string | null, maxLength: number = 5000): string {
  if (!input || typeof input !== 'string') return ''

  // 1. Strip null bytes
  let cleaned = input.replace(/\0/g, '')

  // 2. Strip script, style, and iframe tags along with their inner contents
  cleaned = cleaned.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  cleaned = cleaned.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
  cleaned = cleaned.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')

  // 3. Strip all remaining HTML tags
  cleaned = cleaned.replace(/<[^>]*>/g, '')

  // 4. Strip dangerous URI pseudoprotocols in text
  cleaned = cleaned.replace(/javascript:/gi, '')
  cleaned = cleaned.replace(/vbscript:/gi, '')
  cleaned = cleaned.replace(/data:text\/html/gi, '')

  // 5. Trim and enforce maximum length
  return cleaned.trim().slice(0, maxLength)
}

export function sanitizeUrl(url?: string | null): string {
  if (!url || typeof url !== 'string') return ''

  const trimmed = url.trim()
  if (!trimmed) return ''

  // Only allow http:// or https:// schemes
  if (!/^https?:\/\//i.test(trimmed)) {
    // If it looks like a domain without scheme (e.g. "example.com"), prefix with https://
    if (/^[a-z0-9][a-z0-9-]{1,61}[a-z0-9](\.[a-z0-9-]+)+/i.test(trimmed) && !trimmed.includes(':')) {
      return `https://${trimmed}`
    }
    return ''
  }

  try {
    const parsed = new URL(trimmed)
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return ''
    }
    return parsed.toString()
  } catch (_) {
    return ''
  }
}

export function sanitizeImageUrl(url?: string | null): string {
  if (!url || typeof url !== 'string') return ''
  const trimmed = url.trim()
  if (!trimmed) return ''

  // 1. Allow safe base64 data URLs for user-uploaded images/logos
  if (/^data:image\/(png|jpe?g|webp|gif|svg\+xml);base64,[a-z0-9+/=]+$/i.test(trimmed)) {
    return trimmed
  }

  // 2. Allow local absolute paths (e.g. /logos/..., /crust-and-crave-logo.jpg)
  if (trimmed.startsWith('/') && !trimmed.startsWith('//') && !trimmed.includes('\\') && !trimmed.includes('..')) {
    return trimmed
  }

  // 3. Fallback to standard URL validation
  return sanitizeUrl(trimmed)
}

export function sanitizePhone(phone?: string | null): string {
  if (!phone || typeof phone !== 'string') return ''
  // Allow only plus, digits, spaces, parentheses, hyphens
  return phone.replace(/[^0-9+\s\-()]/g, '').trim().slice(0, 30)
}

