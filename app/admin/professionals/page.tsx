'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { db } from '@/lib/firebase'
import { collection, getDocs, doc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { toast } from 'sonner'
import { Eye } from 'lucide-react'
import { StatusBadge, AdminLoading, AdminEmpty, formatDate, approveBtn, rejectBtn, neutralBtn, dangerBtn } from '@/components/admin-shared'
import { RejectPanel, DeletePanel, moderateReject, moderateDelete } from '@/components/admin-moderation'
import { resolveOwnerEmails } from '@/lib/owner-contact'
import { queueListingApprovedEmail } from '@/lib/mail'
import { revalidateApprovedListing } from '@/lib/revalidate'
import { tierLabel } from '@/lib/tiers'

type Item = { id: string; data: any }
const TABS = ['all', 'pending', 'approved', 'rejected'] as const
const COL = 'professionals'

export default function AdminProfessionalsPage() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<(typeof TABS)[number]>('all')
  const [busy, setBusy] = useState<string | null>(null)
  const [rejectFor, setRejectFor] = useState<string | null>(null)
  const [deleteFor, setDeleteFor] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDocs(collection(db, COL))
        const rows: Item[] = []
        snap.forEach((d) => rows.push({ id: d.id, data: d.data() }))
        // Owner emails live in the private subcollection (same pattern
        // as businesses/companies); resolve them for the list + emails.
        const resolved = await resolveOwnerEmails(COL, rows)
        resolved.sort((a, b) => (b.data.createdAt?.toMillis?.() || 0) - (a.data.createdAt?.toMillis?.() || 0))
        setItems(resolved)
      } catch {
        toast.error('Could not load professional profiles.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const patch = async (id: string, fields: Record<string, any>, msg: string, afterSuccess?: () => Promise<unknown>) => {
    setBusy(id)
    try {
      await updateDoc(doc(db, COL, id), fields)
      setItems((prev) => prev.map((it) => (it.id === id ? { ...it, data: { ...it.data, ...fields } } : it)))
      if (afterSuccess) {
        try {
          await afterSuccess()
        } catch {
          // ignore — follow-ups are best effort
        }
      }
      toast.success(msg)
    } catch {
      toast.error('Action failed — check permissions and try again.')
    } finally {
      setBusy(null)
    }
  }

  const approve = (item: Item) => {
    // Paid-listing guard: a profile whose payment is still unverified
    // must be approved through Payment Proofs, not from here. Legacy
    // profiles (no paymentStatus field) are unaffected.
    if (item.data.paymentStatus === 'awaiting_payment' || item.data.paymentStatus === 'payment_rejected') {
      toast.error('Payment not verified yet — verify the proof in Payment Proofs first.')
      return
    }
    return patch(
      item.id,
      { status: 'approved', rejectionReasons: [], rejectionNote: '', rejectedAt: null },
      'Professional profile approved (any previous rejection cleared). It is now live.',
      // Then refresh the profile's public pages immediately (lib/revalidate.ts).
      async () => {
        await queueListingApprovedEmail(COL, item)
        await revalidateApprovedListing({ kind: 'professional', slug: item.data.slug })
      }
    )
  }

  const confirmReject = async (item: Item, reasons: string[], note: string) => {
    setBusy(item.id)
    try {
      const emailed = await moderateReject(COL, item, reasons, note)
      setItems((prev) =>
        prev.map((it) =>
          it.id === item.id
            ? { ...it, data: { ...it.data, status: 'rejected', rejectionReasons: reasons, rejectionNote: note } }
            : it
        )
      )
      setRejectFor(null)
      toast.success(emailed ? 'Profile rejected — owner email queued.' : 'Profile rejected. (No owner email on file — nothing queued.)')
    } catch {
      toast.error('Rejection failed — check permissions and try again.')
    } finally {
      setBusy(null)
    }
  }

  const confirmDelete = async (item: Item, note: string) => {
    setBusy(item.id)
    try {
      const emailed = await moderateDelete(COL, item, note)
      setItems((prev) => prev.filter((it) => it.id !== item.id))
      setDeleteFor(null)
      toast.success(emailed ? 'Profile deleted — owner email queued.' : 'Profile deleted. (No owner email on file — nothing queued.)')
    } catch {
      toast.error('Delete failed — check permissions and try again.')
    } finally {
      setBusy(null)
    }
  }

  const filtered = tab === 'all' ? items : items.filter((it) => (it.data.status || 'pending') === tab)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Professional Profiles</h1>
        <p className="text-sm text-slate-500">{items.length} total · approve, reject (with reasons) or delete profiles.</p>
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
        <AdminEmpty text={`No professional profiles with status "${tab}".`} />
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => {
            const { id, data } = item
            return (
              <article key={id} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-extrabold text-slate-900 text-sm">{data.name || 'Unnamed professional'}</h2>
                      <StatusBadge status={data.status || 'pending'} />
                      {data.tier && (
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
                          {tierLabel(data.tier)}
                        </span>
                      )}
                      {data.paymentStatus && (
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
                          Payment: {data.paymentStatus.replace('_', ' ')}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500">
                      {data.profession || '—'}
                      {data.specialization ? ` · ${data.specialization}` : ''} · {data.city || '—'} · {data.phone || 'no phone'}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Owner: {data.ownerEmail || '—'} · Submitted {formatDate(data.createdAt)}
                    </p>
                    {data.status === 'rejected' && (data.rejectionReasons?.length > 0 || data.rejectionNote) && (
                      <p className="text-[11px] text-red-600">
                        Rejected: {[...(data.rejectionReasons || []), data.rejectionNote].filter(Boolean).join(' · ')}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 shrink-0">
                    {data.slug && (
                      <Link href={`/professional/${data.slug}`} target="_blank" className={`${neutralBtn} inline-flex items-center gap-1`}>
                        <Eye className="w-3.5 h-3.5" /> View
                      </Link>
                    )}
                    {(data.status || 'pending') !== 'approved' && (
                      <button type="button" disabled={busy === id} onClick={() => approve(item)} className={approveBtn}>
                        Approve
                      </button>
                    )}
                    {(data.status || 'pending') !== 'rejected' && (
                      <button
                        type="button"
                        disabled={busy === id}
                        onClick={() => { setRejectFor(rejectFor === id ? null : id); setDeleteFor(null) }}
                        aria-expanded={rejectFor === id}
                        className={rejectBtn}
                      >
                        Reject
                      </button>
                    )}
                    <button
                      type="button"
                      disabled={busy === id}
                      onClick={() => { setDeleteFor(deleteFor === id ? null : id); setRejectFor(null) }}
                      aria-expanded={deleteFor === id}
                      className={dangerBtn}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                {rejectFor === id && (
                  <RejectPanel item={item} busy={busy === id} onConfirm={(reasons, note) => confirmReject(item, reasons, note)} onCancel={() => setRejectFor(null)} />
                )}
                {deleteFor === id && (
                  <DeletePanel item={item} busy={busy === id} onConfirm={(note) => confirmDelete(item, note)} onCancel={() => setDeleteFor(null)} />
                )}
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
