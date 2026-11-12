'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'

/**
 * Casual-tamper guard: blocks view-source / devtools shortcuts and the
 * right-click menu while site protection is ON.
 *
 * Protection is ON by default — including while the setting is still
 * loading, or if it cannot be read at all (e.g. rules not published yet).
 * It turns OFF only when the admin has explicitly disabled it in
 * /admin/settings (settings/site doc, protectionEnabled === false).
 *
 * Honest limit: this stops casual poking, not a determined person — the
 * browser menu, curl, or disabling JavaScript bypass it. Real data
 * protection is the Firestore rules, not this guard.
 */
export default function ProtectionGuard() {
  const [enabled, setEnabled] = useState(true) // fail-safe: ON

  useEffect(() => {
    let cancelled = false
    getDoc(doc(db, 'settings', 'site'))
      .then((snap) => {
        if (
          !cancelled &&
          snap.exists() &&
          (snap.data() as any).protectionEnabled === false
        ) {
          setEnabled(false)
        }
      })
      .catch(() => {
        // Unreadable setting (missing doc, rules not published) => stay ON.
      })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!enabled) return
    const onKeyDown = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase()
      if (
        e.key === 'F12' ||
        // Devtools / inspect / console: Ctrl+Shift+I/J/C/K (Win/Linux)
        (e.ctrlKey && e.shiftKey && ['i', 'j', 'c', 'k'].includes(k)) ||
        // View source / save page: Ctrl+U, Ctrl+S (Win/Linux)
        (e.ctrlKey && ['u', 's'].includes(k)) ||
        // macOS devtools variants: Cmd+Option+I/J/U
        (e.metaKey && e.altKey && ['i', 'j', 'u'].includes(k)) ||
        // macOS save page: Cmd+S
        (e.metaKey && !e.altKey && !e.ctrlKey && k === 's')
      ) {
        e.preventDefault()
      }
    }
    const onContextMenu = (e: MouseEvent) => {
      e.preventDefault()
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('contextmenu', onContextMenu)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('contextmenu', onContextMenu)
    }
  }, [enabled])

  return null
}
