'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { db } from '@/lib/firebase'
import { collection, getDocs, doc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { toast } from 'sonner'
import { Eye, Star, BadgeCheck, Pencil } from 'lucide-react'
import { StatusBadge, AdminLoading, AdminEmpty, formatDate, approveBtn, rejectBtn, neutralBtn, dangerBtn } from '@/components/admin-shared'
import { RejectPanel, DeletePanel, moderateReject, moderateDelete } from '@/components/admin-moderation'
import { resolveOwnerEmails } from '@/lib/owner-contact'
import { queueListingApprovedEmail } from '@/lib/mail'
import { revalidateApprovedListing } from '@/lib/revalidate'

type Item = { id: string; data: any }
const TABS = ['all', 'pending', 'approved', 'rejected'] as const
const COL = 'companies'

export default function AdminCompaniesPage() {
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
        // Owner emails live in the private subcollection now (Round 3);
        // resolve them (legacy main-doc field is the fallback) so the
        // "Owner:" line and moderation emails keep working.
        const resolved = await resolveOwnerEmails(COL, rows)
        resolved.sort((a, b) => (b.data.createdAt?.toMillis?.() || 0) - (a.data.createdAt?.toMillis?.() || 0))
        setItems(resolved)
      } catch {
        toast.error('Could not load companies.')
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
      // Optional follow-up (e.g. queueing the owner approval email). It runs
      // only after the update succeeds and can never fail the action itself.
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
    // Paid-listing guard: a listing whose payment is still unverified
    // must be approved through Payment Proofs (where the admin
    // authenticates the payment), not from here. Legacy listings
    // (no paymentStatus field) are unaffected.
    if (item.data.paymentStatus === 'awaiting_payment' || item.data.paymentStatus === 'payment_rejected') {
      toast.error('Payment not verified yet — verify the proof in Payment Proofs first.')
      return
    }
    return patch(
      item.id,
      { status: 'approved', rejectionReasons: [], rejectionNote: '', rejectedAt: null },
      'Company approved (any previous rejection cleared).',
      // Owner approval email ("live now") — queued only. Then refresh
      // the company's public pages immediately (lib/revalidate.ts).
      async () => {
        await queueListingApprovedEmail(COL, item)
        await revalidateApprovedListing({ kind: 'company', slug: item.data.slug })
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
      toast.success(emailed ? 'Company rejected — owner email queued.' : 'Company rejected. (No owner email on file — nothing queued.)')
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
      toast.success(emailed ? 'Company deleted — owner email queued.' : 'Company deleted. (No owner email on file — nothing queued.)')
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
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Companies</h1>
        <p className="text-sm text-slate-500">{items.length} total · approve, reject (with reasons), edit, feature, verify or delete company profiles.</p>
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
        <AdminEmpty text={`No companies with status "${tab}".`} />
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => {
            const { id, data } = item
            return (
              <article key={id} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-extrabold text-slate-900 text-sm">{data.name || 'Unnamed company'}</h2>
                      <StatusBadge status={data.status || 'pending'} />
                      {data.featured && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold">
                          <Star className="w-3 h-3" /> Featured
                        </span>
                      )}
                      {data.verified && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                          <BadgeCheck className="w-3 h-3" /> Verified
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500">
                      {data.industry || data.category || '—'} · {data.city || '—'} · {data.phone || 'no phone'}
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
                      <Link href={`/company/${data.slug}`} target="_blank" className={`${neutralBtn} inline-flex items-center gap-1`}>
                        <Eye className="w-3.5 h-3.5" /> View
                      </Link>
                    )}
                    <Link href={`/admin/companies/${id}`} className={`${neutralBtn} inline-flex items-center gap-1`}>
                      <Pencil className="w-3.5 h-3.5" /> Edit
                    </Link>
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
                      onClick={() =>
                        patch(
                          id,
                          // Featuring stamps featuredAt (unfeaturing clears
                          // it) — same single source of truth as businesses.
                          {
                            featured: !data.featured,
                            featuredAt: data.featured ? null : serverTimestamp(),
                          },
                          data.featured ? 'Featured removed.' : 'Company marked Featured.',
                        )
                      }
                      className={neutralBtn}
                      aria-pressed={!!data.featured}
                    >
                      {data.featured ? 'Unfeature' : 'Feature'}
                    </button>
                    <button
                      type="button"
                      disabled={busy === id}
                      onClick={() => patch(id, { verified: !data.verified }, data.verified ? 'Verified badge removed.' : 'Company marked Verified.')}
                      className={neutralBtn}
                      aria-pressed={!!data.verified}
                    >
                      {data.verified ? 'Unverify' : 'Verify'}
                    </button>
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
