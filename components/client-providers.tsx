'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import BottomNav from '@/components/bottom-nav'

// Deferred until after the page has loaded: the toast system and the cookie
// banner are never needed for the initial render, so their JS should not be
// fetched or parsed during the critical load window on any page. They mount
// on window load + idle, on the user's first interaction, or after a hard
// fallback timeout — whichever comes first. Toasts only ever fire from user
// actions (form submits), which cannot happen before this gate opens.
//
// The site-protection guard rides the same gate (perf, 2026-11-11): it
// imports lib/firebase, whose chunk (firebase/app + firestore + storage,
// ~121 KiB transfer) was in the homepage's initial JS because the guard
// sat in the root layout. The guard is ON by default and only ever turns
// OFF after its settings read, so mounting it ~1.5–3s later changes
// nothing about protection — it just stops Firebase code from competing
// with the first paint. It is imported dynamically (ssr: false) so the
// Firebase chunk is not in the initial bundle at all.
const ProtectionGuard = dynamic(() => import('@/components/protection-guard'), {
  ssr: false,
})
const Toaster = dynamic(() => import('sonner').then((m) => m.Toaster), {
  ssr: false,
})
const CookieConsentBanner = dynamic(
  () => import('@/components/cookie-consent-banner'),
  { ssr: false }
)

type IdleWindow = Window & {
  requestIdleCallback?: (
    callback: () => void,
    options?: { timeout: number }
  ) => number
  cancelIdleCallback?: (handle: number) => void
}

function useDeferredReady() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let done = false
    let idleId: number | undefined
    let fallbackId: number | undefined

    const enable = () => {
      if (done) return
      done = true
      setReady(true)
    }

    const armIdle = () => {
      const w = window as IdleWindow
      if (typeof w.requestIdleCallback === 'function') {
        idleId = w.requestIdleCallback(enable, { timeout: 1500 })
      } else {
        fallbackId = window.setTimeout(enable, 800)
      }
    }

    if (document.readyState === 'complete') {
      armIdle()
    } else {
      window.addEventListener('load', armIdle, { once: true })
    }
    // First interaction also opens the gate immediately (a submit can then
    // never beat the Toaster mount), and a hard fallback guarantees the
    // deferred UI always appears even if load/idle never fire.
    window.addEventListener('pointerdown', enable, { once: true })
    window.addEventListener('keydown', enable, { once: true })
    const hardFallback = window.setTimeout(enable, 3000)

    return () => {
      window.removeEventListener('load', armIdle)
      window.removeEventListener('pointerdown', enable)
      window.removeEventListener('keydown', enable)
      window.clearTimeout(hardFallback)
      if (fallbackId !== undefined) window.clearTimeout(fallbackId)
      const w = window as IdleWindow
      if (idleId !== undefined && typeof w.cancelIdleCallback === 'function') {
        w.cancelIdleCallback(idleId)
      }
    }
  }, [])

  return ready
}

export default function ClientProviders() {
  const deferredReady = useDeferredReady()

  return (
    <>
      <BottomNav />
      {deferredReady && <ProtectionGuard />}
      {deferredReady && <CookieConsentBanner />}
      {deferredReady && (
        <Toaster
          position="top-center"
          duration={5000}
          closeButton={true}
          richColors={true}
          expand={true}
          toastOptions={{
            duration: 5000,
            className: 'localepak-popup-toast',
          }}
        />
      )}
      <SpeedInsights />
      <Analytics />
    </>
  )
}
