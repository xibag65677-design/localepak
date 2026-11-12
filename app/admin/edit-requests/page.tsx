'use client'

import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase'
import { collection, getDocs, doc, getDoc, updateDoc, serverTimestamp, Timestamp } from 'firebase/firestore'
import { toast } from 'sonner'
import { StatusBadge, AdminLoading, AdminEmpty, formatDate, approveBtn, rejectBtn } from '@/components/admin-shared'
import { queueOwnerEmail } from '@/lib/owner-mail'
import { LISTING_COLLECTION } from '@/lib/tiers'
import { sanitizeChanges, nextEditRelease, EDITABLE_FIELD_LABELS, type EditRequest } from '@/lib/edit-requests'
import { releaseDateLabel } from '@/lib/release'

type Item = { id: string; data: EditRequest }
const TABS = ['all', 'pending', 'approved', 'rejected'] as const

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/**
 * Admin queue for listing edit requests (Premium / Featured owners).
 *
 * Approving does NOT rewrite the listing's display fields: the
 * sanitized changes are folded into the listing's `pendingEdit`
 * field with `editEffectiveAt` set to the next weekly release
 * boundary. Public pages merge pendingEdit only once that boundary
 * passes (lib/edit-requests.ts) — so an approved edit goes live
 * exactly on the 7-day rhythm, never instantly, and never with a
 * manual step. Rejecting notifies the owner with the admin note.
 */
export default function AdminEditRequestsPage() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<(typeof TABS)[number]>('all')
  const [busy, setBusy] = useState<string | null>(null)
  const [notes, setNotes] = useState<Record<string, string>>({})

  useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDocs(collection(db, 'edit_requests'))
        const rows: Item[] = []
        snap.forEach((d) => rows.push({ id: d.id, data: d.data() as EditRequest }))
        const rank = (s: string) => (s === 'pending' ? 0 : s === 'approved' ? 1 : 2)
        rows.sort((a, b) => {
          const r = rank(a.data.status || 'pending') - rank(b.data.status || 'pending')
          if (r !== 0) return r
          return (b.data.createdAt?.toMillis?.() || 0) - (a.data.createdAt?.toMillis?.() || 0)
        })
        setItems(rows)
      } catch {
        toast.error('Could not load edit requests.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const approve = async (item: Item) => {
    const { id, data } = item
    setBusy(id)
    try {
      const col = LISTING_COLLECTION[data.listingType] || 'businesses'
      const listingRef = doc(db, col, data.listingId)
      const listingSnap = await getDoc(listingRef)
      if (!listingSnap.exists()) {
        toast.error('Listing no longer exists — reject this request instead.')
        return
      }
      const currentPending = (listingSnap.data() as any).pendingEdit || {}
      const clean = sanitizeChanges(data.listingType, data.changes || {})
      if (Object.keys(clean).length === 0) {
        toast.error('Nothing valid to apply — all requested fields were dropped by the allowlist.')
        return
      }
      const effective = Timestamp.fromMillis(nextEditRelease(Date.now()))
      await updateDoc(listingRef, { pendingEdit: { ...currentPending, ...clean }, editEffectiveAt: effective })
      await updateDoc(doc(db, 'edit_requests', id), {
        status: 'approved',
        effectiveAt: effective,
        adminNote: '',
        reviewedAt: serverTimestamp(),
      })
      setItems((prev) =>
        prev.map((it) =>
          it.id === id ? { ...it, data: { ...it.data, status: 'approved', effectiveAt: effective } } : it
        )
      )
      const dateLabel = releaseDateLabel(Date.now())
      if (data.ownerEmail) {
        await queueOwnerEmail(
          data.ownerEmail,
          `Your edit for '${data.listingName}' is approved — goes live on ${dateLabel}`,
          [
            'Hello,',
            '',
            `Good news: your requested edit for '${data.listingName}' has been approved.`,
            '',
            `LocalePak publishes approved edits in a weekly batch, so the changes will go live on ${dateLabel}. There is nothing else you need to do.`,
            '',
            'Manage your listing any time from your dashboard: https://www.localepak.com/dashboard',
            '',
            '— The LocalePak Team',
          ].join('\n'),
          `<p>Hello,</p><p>Good news: your requested edit for <strong>${esc(data.listingName)}</strong> has been approved.</p><p>LocalePak publishes approved edits in a weekly batch, so the changes will go live on <strong>${esc(dateLabel)}</strong>. There is nothing else you need to do.</p><p>Manage your listing any time from <a href="https://www.localepak.com/dashboard">your dashboard</a>.</p><p>— The LocalePak Team</p>`
        )
      }
      toast.success(`Edit approved — goes live on ${dateLabel}.`)
    } catch {
      toast.error('Approval failed — check permissions and try again.')
    } finally {
      setBusy(null)
    }
  }

  const reject = async (item: Item) => {
    const { id, data } = item
    setBusy(id)
    try {
      const note = notes[id]?.trim() || ''
      await updateDoc(doc(db, 'edit_requests', id), {
        status: 'rejected',
        adminNote: note,
        reviewedAt: serverTimestamp(),
      })
      setItems((prev) =>
        prev.map((it) => (it.id === id ? { ...it, data: { ...it.data, status: 'rejected', adminNote: note } } : it))
      )
      if (data.ownerEmail) {
        await queueOwnerEmail(
          data.ownerEmail,
          `Your edit for '${data.listingName}' was not approved`,
          [
            'Hello,',
            '',
            `Your requested edit for '${data.listingName}' was not approved by our review team.`,
            ...(note ? ['', `Reason: ${note}`] : []),
            '',
            'Your live listing is unchanged. You can submit a new edit request from your dashboard.',
            '',
            '— The LocalePak Team',
          ].join('\n'),
          `<p>Hello,</p><p>Your requested edit for <strong>${esc(data.listingName)}</strong> was not approved by our review team.</p>${note ? `<p><strong>Reason:</strong> ${esc(note)}</p>` : ''}<p>Your live listing is unchanged. You can submit a new edit request from your dashboard.</p><p>— The LocalePak Team</p>`
        )
      }
      toast.success('Edit rejected — owner email queued.')
    } catch {
      toast.error('Rejection failed — check permissions and try again.')
    } finally {
      setBusy(null)
    }
  }

  const filtered = tab === 'all' ? items : items.filter((it) => (it.data.status || 'pending') === tab)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Edit Requests</h1>
        <p className="text-sm text-slate-500">
          Premium / Featured owners request listing edits here. Approving schedules the changes for the next weekly
          release — they go live on that date automatically, never instantly.
        </p>
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by status">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            aria-pressed={tab === t}
            className={`px-4 py-2 rounded-full text-xs font-bold border capitalize cursor-pointer transition-colors ${
              tab === t ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-500'
            }`}
          >
            {t} ({t === 'all' ? items.length : items.filter((it) => (it.data.status || 'pending') === t).length})
          </button>
        ))}
      </div>

      {loading ? (
        <AdminLoading />
      ) : filtered.length === 0 ? (
        <AdminEmpty text={`No edit requests with status "${tab}".`} />
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => {
            const { id, data } = item
            const status = data.status || 'pending'
            const changes = data.changes || {}
            return (
              <article key={id} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-extrabold text-slate-900 text-sm">{data.listingName || 'Unnamed listing'}</h2>
                      <StatusBadge status={status} />
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold capitalize">
                        {data.listingType || 'business'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Owner: {data.ownerEmail || '—'} · Requested {formatDate(data.createdAt)}
                      {data.effectiveAt ? ` · Goes live ${formatDate(data.effectiveAt)}` : ''}
                    </p>
                    <dl className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-1.5 mt-2">
                      {Object.keys(changes).length === 0 && (
                        <p className="text-xs text-slate-500">No changes attached.</p>
                      )}
                      {Object.entries(changes).map(([key, value]) => (
                        <div key={key} className="flex flex-col sm:flex-row sm:gap-3 text-xs">
                          <dt className="font-bold text-slate-700 shrink-0 sm:w-32">{EDITABLE_FIELD_LABELS[key] || key}</dt>
                          <dd className="text-slate-600 whitespace-pre-line break-words">{String(value)}</dd>
                        </div>
                      ))}
                    </dl>
                    {data.adminNote && status === 'rejected' && (
                      <p className="text-xs text-red-600">Admin note: {data.adminNote}</p>
                    )}
                  </div>
                  {status === 'pending' && (
                    <div className="flex flex-col gap-2 shrink-0 w-full md:w-64">
                      <button type="button" disabled={busy === id} onClick={() => approve(item)} className={approveBtn}>
                        Approve — live next release
                      </button>
                      <label htmlFor={`edit-note-${id}`} className="sr-only">Reason for rejection (optional)</label>
                      <input
                        id={`edit-note-${id}`}
                        type="text"
                        value={notes[id] || ''}
                        onChange={(e) => setNotes((prev) => ({ ...prev, [id]: e.target.value }))}
                        placeholder="Reason if rejecting (optional)"
                        className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-red-300"
                      />
                      <button type="button" disabled={busy === id} onClick={() => reject(item)} className={rejectBtn}>
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
