'use client'

import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { toast } from 'sonner'
import { ShieldCheck, ShieldOff } from 'lucide-react'

/**
 * Admin → Settings: the site-protection toggle.
 *
 * ON (default): view-source / devtools shortcuts and the right-click menu
 * are blocked for every visitor. OFF: the guard stands down so the owner
 * can test the site with devtools — turn it back ON when testing is done.
 * The value lives in Firestore (settings/site, protectionEnabled); only
 * an admin can write it (see firestore.rules).
 */
export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true)
  const [protection, setProtection] = useState(true) // default ON
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getDoc(doc(db, 'settings', 'site'))
      .then((snap) => {
        if (
          snap.exists() &&
          typeof (snap.data() as any).protectionEnabled === 'boolean'
        ) {
          setProtection((snap.data() as any).protectionEnabled)
        }
      })
      .catch(() => {
        // Unreadable (doc missing or rules not published yet) => ON.
      })
      .finally(() => setLoading(false))
  }, [])

  const setProtectionValue = async (next: boolean) => {
    setSaving(true)
    try {
      await setDoc(
        doc(db, 'settings', 'site'),
        { protectionEnabled: next },
        { merge: true },
      )
      setProtection(next)
      toast.success(
        next
          ? 'Site protection is ON.'
          : 'Site protection is OFF — remember to turn it back ON after testing.',
      )
    } catch {
      toast.error('Could not save the setting. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500">
          Site-wide switches. Only administrators can change these.
        </p>
      </div>

      <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4">
        <div className="flex items-start gap-3">
          {protection ? (
            <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <ShieldOff className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
          )}
          <div className="min-w-0">
            <h2 className="font-extrabold text-slate-900">Site protection</h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              When ON, view-source (Ctrl+U), devtools / inspect shortcuts
              (F12, Ctrl+Shift+I/J/C) and the right-click menu are blocked
              for every visitor. Turn it OFF only while you are testing the
              site with devtools, and turn it back ON when you are done.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed mt-2">
              Note: this stops casual tampering only. Real database security
              comes from the Firestore rules, not from this switch.
            </p>
          </div>
        </div>

        {loading ? (
          <p className="text-sm text-slate-500">Loading current setting...</p>
        ) : (
          <div className="flex items-center gap-4">
            <button
              type="button"
              role="switch"
              aria-checked={protection}
              aria-label="Site protection"
              disabled={saving}
              onClick={() => setProtectionValue(!protection)}
              className={`relative w-14 h-8 rounded-full transition-colors shrink-0 cursor-pointer disabled:opacity-60 ${
                protection ? 'bg-emerald-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow transition-all ${
                  protection ? 'left-7' : 'left-1'
                }`}
              />
            </button>
            <span className="text-sm font-extrabold text-slate-900">
              {protection ? 'ON' : 'OFF'}
            </span>
            {saving && (
              <span className="text-xs text-slate-500">Saving...</span>
            )}
          </div>
        )}
      </section>
    </div>
  )
}
