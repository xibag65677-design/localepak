'use client'

import { useEffect } from 'react'

// Google Analytics measurement ID, owner-supplied 2026-10-25. Defined
// once and referenced by both the loader URL and the gtag config call, so
// the tag exists in exactly one place (one Google tag per page).
const GA_MEASUREMENT_ID = 'G-77B4J5JX5F'
// Microsoft Clarity project ID (owner-supplied).
const CLARITY_ID = 'z22cr0frhy'

/**
 * Google tag + Microsoft Clarity, deferred until after first paint
 * (perf, 2026-11-11).
 *
 * The old layout used next/script lazyOnload, but PageSpeed still
 * flagged GTM at 178 KiB / 292ms main-thread and Clarity at 96ms:
 * lazyOnload fires right after window load, still inside the lab trace
 * window. These scripts now load only on window load + idle (2.5s
 * timeout), on the user's first interaction, or after a 4s hard
 * fallback — whichever comes first. Pageviews and Clarity sessions are
 * still recorded; they just never compete with the first paint.
 *
 * Small trade-off, stated plainly: a visitor who bounces within ~3s
 * of load (before idle/interaction/fallback fires) is not counted by
 * analytics. That is the standard cost of keeping third-party scripts
 * out of the critical window.
 */
export default function DeferredAnalytics() {
  useEffect(() => {
    let done = false
    let idleId: number | undefined
    let fallbackId: number | undefined

    const load = () => {
      if (done) return
      done = true

      // Google tag loader.
      const gtagLoader = document.createElement('script')
      gtagLoader.async = true
      gtagLoader.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
      document.head.appendChild(gtagLoader)

      // gtag config: defines gtag() and queues into dataLayer; the
      // loader drains the queue when it arrives, so inserting the
      // config in the same tick is safe.
      const gtagConfig = document.createElement('script')
      gtagConfig.text = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`
      document.head.appendChild(gtagConfig)

      // Microsoft Clarity.
      const clarity = document.createElement('script')
      clarity.text = `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");`
      document.head.appendChild(clarity)
    }

    const armIdle = () => {
      if (typeof window.requestIdleCallback === 'function') {
        idleId = window.requestIdleCallback(load, { timeout: 2500 })
      } else {
        fallbackId = window.setTimeout(load, 1500)
      }
    }

    if (document.readyState === 'complete') {
      armIdle()
    } else {
      window.addEventListener('load', armIdle, { once: true })
    }
    window.addEventListener('pointerdown', load, { once: true })
    window.addEventListener('keydown', load, { once: true })
    const hardFallback = window.setTimeout(load, 4000)

    return () => {
      window.removeEventListener('load', armIdle)
      window.removeEventListener('pointerdown', load)
      window.removeEventListener('keydown', load)
      window.clearTimeout(hardFallback)
      if (fallbackId !== undefined) window.clearTimeout(fallbackId)
      if (idleId !== undefined && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId)
      }
    }
  }, [])

  return null
}
