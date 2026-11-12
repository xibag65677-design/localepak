'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Cookie, Shield, Check, X, Settings2 } from 'lucide-react'

export const COOKIE_CONSENT_KEY = 'localepak_cookie_consent'
export const COOKIE_PREFS_KEY = 'localepak_cookie_preferences'

export interface CookiePreferences {
  essential: boolean
  analytics: boolean
}

export default function CookieConsentBanner() {
  const [mounted, setMounted] = useState(false)
  const [showBanner, setShowBanner] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [prefs, setPrefs] = useState<CookiePreferences>({
    essential: true,
    analytics: true,
  })

  useEffect(() => {
    setMounted(true)
    try {
      const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
      if (!consent) {
        // Show banner on first user interaction or when idle (after 6s) to ensure zero impact on FCP/LCP
        const triggerBanner = () => {
          setShowBanner(true)
          cleanup()
        }
        const cleanup = () => {
          clearTimeout(timer)
          window.removeEventListener('scroll', triggerBanner)
          window.removeEventListener('touchstart', triggerBanner)
          window.removeEventListener('keydown', triggerBanner)
          window.removeEventListener('click', triggerBanner)
        }

        const timer = setTimeout(triggerBanner, 6000)
        window.addEventListener('scroll', triggerBanner, { passive: true, once: true })
        window.addEventListener('touchstart', triggerBanner, { passive: true, once: true })
        window.addEventListener('keydown', triggerBanner, { passive: true, once: true })
        window.addEventListener('click', triggerBanner, { passive: true, once: true })

        return cleanup
      } else {
        const storedPrefs = localStorage.getItem(COOKIE_PREFS_KEY)
        if (storedPrefs) {
          setPrefs(JSON.parse(storedPrefs))
        }
      }
    } catch (_) {}

    // Listen for custom trigger to reopen cookie settings from footer
    const handleReopen = () => {
      setShowModal(true)
      setShowBanner(false)
    }
    window.addEventListener('open-cookie-settings', handleReopen)
    return () => window.removeEventListener('open-cookie-settings', handleReopen)
  }, [])

  if (!mounted) return null

  const applyConsent = (decision: 'accepted' | 'declined' | 'customized', customPrefs?: CookiePreferences) => {
    try {
      const finalPrefs: CookiePreferences = customPrefs || (decision === 'accepted'
        ? { essential: true, analytics: true }
        : { essential: true, analytics: false }
      )

      localStorage.setItem(COOKIE_CONSENT_KEY, decision)
      localStorage.setItem(COOKIE_PREFS_KEY, JSON.stringify(finalPrefs))
      setPrefs(finalPrefs)

      // Notify consent listeners if a data layer is present
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        ;(window as any).dataLayer.push({
          event: 'cookie_consent_update',
          analytics_storage: finalPrefs.analytics ? 'granted' : 'denied',
        })
      }
    } catch (_) {}

    setShowBanner(false)
    setShowModal(false)
  }

  return (
    <>
      {/* Floating Sticky Bottom Banner */}
      {showBanner && !showModal && (
        <aside
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent banner"
          className="fixed bottom-20 md:bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-xl z-50 bg-[#0f172a] text-white p-5 sm:p-6 rounded-2xl shadow-2xl border border-slate-700/80 animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
              <Cookie className="w-5 h-5" />
            </div>
            <div className="space-y-2 flex-1">
              <h2 className="text-sm font-extrabold text-white tracking-wide flex items-center gap-2">
                <span>Cookie &amp; Privacy Preferences</span>
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                LocalePak uses cookies to guarantee platform security and analyze search trends. You can accept all or customize preferences at any time. Read our{' '}
                <Link href="/cookie-policy" className="text-emerald-400 underline hover:text-emerald-300">
                  Cookie Policy
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-emerald-400 underline hover:text-emerald-300">
                  Privacy Policy
                </Link>.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2.5">
            <button
              onClick={() => setShowModal(true)}
              className="text-xs font-semibold text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 py-1 px-2 rounded-lg hover:bg-slate-800/60 cursor-pointer"
            >
              <Settings2 className="w-3.5 h-3.5" />
              <span>Customize</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => applyConsent('declined')}
                className="px-3.5 py-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer border border-slate-700"
              >
                Essential Only
              </button>
              <button
                onClick={() => applyConsent('accepted')}
                className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-md transition-colors cursor-pointer"
              >
                Accept All
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Granular Preference Customization Modal */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-settings-title"
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
        >
          <div className="bg-[#0f172a] text-white w-full max-w-lg rounded-2xl p-6 border border-slate-700 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-400" />
                <h2 id="cookie-settings-title" className="text-base font-bold text-white">Manage Cookie Settings</h2>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
                aria-label="Close settings"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Customize your cookie permissions. Essential cookies are necessary for authentication, security, and directory search. You can enable or disable non-essential categories below:
            </p>

            <div className="space-y-3">
              {/* Essential */}
              <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3.5 flex items-center justify-between">
                <div className="space-y-0.5 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">Strictly Necessary</span>
                    <span className="text-[10px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded-md font-semibold">Always Active</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Required for directory navigation, form submission, and security.</p>
                </div>
                <input type="checkbox" checked disabled className="w-4 h-4 accent-emerald-600 cursor-not-allowed opacity-70" />
              </div>

              {/* Analytics */}
              <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3.5 flex items-center justify-between">
                <div className="space-y-0.5 pr-4">
                  <span className="text-xs font-bold text-white">Analytics &amp; Performance</span>
                  <p className="text-[11px] text-slate-400">Measures traffic anonymously to optimize directory speed and search accuracy.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prefs.analytics}
                    onChange={(e) => setPrefs({ ...prefs, analytics: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>

            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
              <button
                onClick={() => applyConsent('declined')}
                className="px-3.5 py-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
              >
                Reject All Non-Essential
              </button>
              <button
                onClick={() => applyConsent('customized', prefs)}
                className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-md transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Preferences</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
