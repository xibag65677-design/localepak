'use client'

import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase'
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { toast } from 'sonner'
import { MailOpen, Mail } from 'lucide-react'
import { AdminLoading, AdminEmpty, formatDate, neutralBtn, dangerBtn } from '@/components/admin-shared'

type Item = { id: string; data: any }

export default function AdminMessagesPage() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDocs(collection(db, 'contact_messages'))
        const rows: Item[] = []
        snap.forEach((d) => rows.push({ id: d.id, data: d.data() }))
        rows.sort((a, b) => (b.data.createdAt?.toMillis?.() || 0) - (a.data.createdAt?.toMillis?.() || 0))
        setItems(rows)
      } catch {
        toast.error('Could not load messages.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const toggleRead = async (id: string, current: boolean) => {
    setBusy(id)
    try {
      await updateDoc(doc(db, 'contact_messages', id), { read: !current })
      setItems((prev) => prev.map((it) => (it.id === id ? { ...it, data: { ...it.data, read: !current } } : it)))
    } catch {
      toast.error('Update failed — check permissions and try again.')
    } finally {
      setBusy(null)
    }
  }

  const remove = async (id: string) => {
    if (!window.confirm('Delete this message permanently?')) return
    setBusy(id)
    try {
      await deleteDoc(doc(db, 'contact_messages', id))
      setItems((prev) => prev.filter((it) => it.id !== id))
      toast.success('Message deleted.')
    } catch {
      toast.error('Delete failed — check permissions and try again.')
    } finally {
      setBusy(null)
    }
  }

  const unread = items.filter((it) => !it.data.read).length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Messages</h1>
        <p className="text-sm text-slate-500">{items.length} total · {unread} unread · from the contact form.</p>
      </div>

      {loading ? (
        <AdminLoading />
      ) : items.length === 0 ? (
        <AdminEmpty text="No contact messages yet." />
      ) : (
        <div className="space-y-3">
          {items.map(({ id, data }) => (
            <article key={id} className={`bg-white rounded-2xl border p-5 space-y-2 ${data.read ? 'border-slate-200' : 'border-emerald-300 bg-emerald-50/30'}`}>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-extrabold text-slate-900 text-sm">{data.name || 'No name'}</h2>
                {data.email && (
                  <a href={`mailto:${data.email}`} className="text-xs text-emerald-600 font-semibold hover:underline">
                    {data.email}
                  </a>
                )}
                {!data.read && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold">Unread</span>
                )}
                <span className="text-[11px] text-slate-400 ml-auto">{formatDate(data.createdAt)}</span>
              </div>
              {data.subject && <p className="text-xs font-bold text-slate-700">Subject: {data.subject}</p>}
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{data.message || ''}</p>
              <div className="flex flex-wrap gap-2 pt-1">
                <button type="button" disabled={busy === id} onClick={() => toggleRead(id, !!data.read)} className={`${neutralBtn} inline-flex items-center gap-1.5`}>
                  {data.read ? <Mail className="w-3.5 h-3.5" /> : <MailOpen className="w-3.5 h-3.5" />}
                  {data.read ? 'Mark unread' : 'Mark read'}
                </button>
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
