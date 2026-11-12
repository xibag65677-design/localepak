'use client'

import { useEffect, useRef } from 'react'
import { getTurnstileSiteKey } from '@/lib/turnstile'

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string
          callback?: (token: string) => void
          'expired-callback'?: () => void
          'error-callback'?: () => void
          theme?: 'light' | 'dark' | 'auto'
          size?: 'normal' | 'compact'
        }
      ) => string
      remove: (widgetId: string) => void
      reset: (widgetId?: string) => void
    }
    onloadTurnstileCallback?: () => void
  }
}

const TURNSTILE_SCRIPT_SRC =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'

function loadTurnstileScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()
  if (window.turnstile) return Promise.resolve()
  const existing = document.querySelector(
    `script[src="${TURNSTILE_SCRIPT_SRC}"]`
  )
  if (existing) {
    return new Promise((resolve) => {
      existing.addEventListener('load', () => resolve(), { once: true })
      // If it already loaded before we attached, resolve on next tick.
      setTimeout(() => resolve(), 1500)
    })
  }
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = TURNSTILE_SCRIPT_SRC
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load Turnstile script'))
    document.head.appendChild(script)
  })
}

interface TurnstileWidgetProps {
  /** Called with a fresh token on success, null when it expires/errors. */
  onToken: (token: string | null) => void
  className?: string
}

/**
 * Cloudflare Turnstile widget. Renders NOTHING when
 * NEXT_PUBLIC_TURNSTILE_SITE_KEY is unset (keys are the user's job) — the
 * form stays fully usable without it. When the key is set, the widget
 * must complete before submit: each form checks for a token and verifies
 * it server-side before saving.
 */
export default function TurnstileWidget({ onToken, className }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const onTokenRef = useRef(onToken)
  onTokenRef.current = onToken

  const siteKey = getTurnstileSiteKey()

  useEffect(() => {
    if (!siteKey) return
    let cancelled = false
    loadTurnstileScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token: string) => onTokenRef.current(token),
          'expired-callback': () => onTokenRef.current(null),
          'error-callback': () => onTokenRef.current(null),
          theme: 'light',
        })
      })
      .catch((err) => {
        console.warn('[turnstile] widget failed to load:', err)
      })
    return () => {
      cancelled = true
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current)
        } catch (_) {
          /* widget already gone */
        }
        widgetIdRef.current = null
      }
    }
    // Render once per site key; onToken is read via ref so parent re-renders
    // don't re-mount the widget and invalidate the token.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteKey])

  if (!siteKey) return null

  return (
    <div className={className}>
      <div ref={containerRef} />
      <p className="text-[11px] text-slate-400 mt-1">
        Security check by Cloudflare Turnstile — helps keep spam listings out.
      </p>
    </div>
  )
}
