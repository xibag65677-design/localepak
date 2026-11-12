'use client'

import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase'
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'
import { toast } from 'sonner'
import { AdminLoading, AdminEmpty, formatDate, dangerBtn } from '@/components/admin-shared'

type Item = { id: string; data: any }

export default function AdminApplicationsPage() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDocs(collection(db, 'job_applications'))
        const rows: Item[] = []
        snap.forEach((d) => rows.push({ id: d.id, data: d.data() }))
        rows.sort((a, b) => (b.data.createdAt?.toMillis?.() || 0) - (a.data.createdAt?.toMillis?.() || 0))
        setItems(rows)
      } catch {
        toast.error('Could not load applications.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const remove = async (id: string) => {
    if (!window.confirm('Delete this application permanently?')) return
    setBusy(id)
    try {
      await deleteDoc(doc(db, 'job_applications', id))
      setItems((prev) => prev.filter((it) => it.id !== id))
      toast.success('Application deleted.')
    } catch {
      toast.error('Delete failed — check permissions and try again.')
    } finally {
      setBusy(null)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Job Applications</h1>
        <p className="text-sm text-slate-500">{items.length} total · applications submitted against posted jobs.</p>
      </div>

      {loading ? (
        <AdminLoading />
      ) : items.length === 0 ? (
        <AdminEmpty text="No job applications yet." />
      ) : (
        <div className="space-y-3">
          {items.map(({ id, data }) => (
            <article key={id} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-extrabold text-slate-900 text-sm">{data.applicantName || data.name || 'No name'}</h2>
                {(data.applicantEmail || data.email) && (
                  <a href={`mailto:${data.applicantEmail || data.email}`} className="text-xs text-emerald-600 font-semibold hover:underline">
                    {data.applicantEmail || data.email}
                  </a>
                )}
                <span className="text-[11px] text-slate-400 ml-auto">{formatDate(data.createdAt)}</span>
              </div>
              <p className="text-xs text-slate-500">
                Applied for: <span className="font-semibold text-slate-700">{data.jobTitle || data.jobId || '—'}</span>
                {data.applicantPhone || data.phone ? ` · ${data.applicantPhone || data.phone}` : ''}
              </p>
              {(data.coverNote || data.message) && (
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{data.coverNote || data.message}</p>
              )}
              <div className="pt-1">
                <button type="button" disabled={busy === id} onClick={() => remove(id)} className={dangerBtn}>
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
