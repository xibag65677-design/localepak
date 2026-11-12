'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { db } from '@/lib/firebase'
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { toast } from 'sonner'
import { Star } from 'lucide-react'
import { StatusBadge, AdminLoading, AdminEmpty, formatDate, approveBtn, rejectBtn, dangerBtn } from '@/components/admin-shared'

type Item = { id: string; data: any }

function Stars({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`w-3.5 h-3.5 ${i <= value ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
      ))}
    </span>
  )
}

function ReviewCard({
  item,
  busy,
  onPatch,
  onRemove,
}: {
  item: Item
  busy: string | null
  onPatch: (id: string, fields: Record<string, any>, msg: string) => void
  onRemove: (id: string) => void
}) {
  const { id, data } = item
  return (
    <article className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2.5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-extrabold text-slate-900 text-sm">{data.authorName || 'Anonymous'}</span>
        <Stars value={Number(data.rating) || 0} />
        <StatusBadge status={data.status || 'pending'} />
        <span className="text-[11px] text-slate-400 ml-auto">{formatDate(data.createdAt)}</span>
      </div>
      <p className="text-sm text-slate-600 leading-relaxed">{data.text || ''}</p>
      <p className="text-[11px] text-slate-400">
        Business:{' '}
        {data.businessSlug ? (
          <Link href={`/business/${data.businessSlug}`} target="_blank" className="text-emerald-600 font-semibold hover:underline">
            {data.businessSlug}
          </Link>
        ) : (
          data.businessId || '—'
        )}
      </p>
      <div className="flex flex-wrap gap-2 pt-1">
        {(data.status || 'pending') !== 'approved' && (
          <button type="button" disabled={busy === id} onClick={() => onPatch(id, { status: 'approved' }, 'Review approved — now public.')} className={approveBtn}>
            Approve
          </button>
        )}
        {(data.status || 'pending') !== 'rejected' && (
          <button type="button" disabled={busy === id} onClick={() => onPatch(id, { status: 'rejected' }, 'Review rejected.')} className={rejectBtn}>
            Reject
          </button>
        )}
        <button type="button" disabled={busy === id} onClick={() => onRemove(id)} className={dangerBtn}>
          Delete
        </button>
      </div>
    </article>
  )
}

export default function AdminReviewsPage() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDocs(collection(db, 'reviews'))
        const rows: Item[] = []
        snap.forEach((d) => rows.push({ id: d.id, data: d.data() }))
        rows.sort((a, b) => (b.data.createdAt?.toMillis?.() || 0) - (a.data.createdAt?.toMillis?.() || 0))
        setItems(rows)
      } catch {
        toast.error('Could not load reviews.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const patch = async (id: string, fields: Record<string, any>, msg: string) => {
    setBusy(id)
    try {
      await updateDoc(doc(db, 'reviews', id), fields)
      setItems((prev) => prev.map((it) => (it.id === id ? { ...it, data: { ...it.data, ...fields } } : it)))
      toast.success(msg)
    } catch {
      toast.error('Action failed — check permissions and try again.')
    } finally {
      setBusy(null)
    }
  }

  const remove = async (id: string) => {
    if (!window.confirm('Delete this review permanently? This cannot be undone.')) return
    setBusy(id)
    try {
      await deleteDoc(doc(db, 'reviews', id))
      setItems((prev) => prev.filter((it) => it.id !== id))
      toast.success('Review deleted.')
    } catch {
      toast.error('Delete failed — check permissions and try again.')
    } finally {
      setBusy(null)
    }
  }

  const pending = items.filter((it) => (it.data.status || 'pending') === 'pending')
  const approved = items.filter((it) => it.data.status === 'approved').slice(0, 20)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Reviews</h1>
        <p className="text-sm text-slate-500">Moderate customer reviews. Only approved reviews appear on business profiles.</p>
      </div>

      <section className="space-y-3">
        <h2 className="font-extrabold text-slate-900">Pending queue ({pending.length})</h2>
        {loading ? (
          <AdminLoading />
        ) : pending.length === 0 ? (
          <AdminEmpty text="No reviews waiting for moderation." />
        ) : (
          pending.map((item) => <ReviewCard key={item.id} item={item} busy={busy} onPatch={patch} onRemove={remove} />)
        )}
      </section>

      <section className="space-y-3">
        <h2 className="font-extrabold text-slate-900">Recently approved ({approved.length})</h2>
        {!loading && approved.length === 0 ? (
          <AdminEmpty text="No approved reviews yet." />
        ) : (
          approved.map((item) => <ReviewCard key={item.id} item={item} busy={busy} onPatch={patch} onRemove={remove} />)
        )}
      </section>
    </div>
  )
}
