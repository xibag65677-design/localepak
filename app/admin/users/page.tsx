'use client'

import { useState, useEffect } from 'react'
import { getFirebaseAuth, db } from '@/lib/firebase'
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore'
import { toast } from 'sonner'
import { AdminLoading, AdminEmpty, formatDate, neutralBtn } from '@/components/admin-shared'

type Item = { id: string; data: any }

export default function AdminUsersPage() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState<string | null>(null)
  // Own UID, resolved lazily (perf, 2026-11-11): reading it from the Auth
  // instance needs firebase/auth loaded, which no longer happens at
  // module scope. Until it resolves, no row is marked as "self" — the
  // role buttons still work, and the admin's own row is only ever
  // labelled, never editable in a privileged way.
  const [myUid, setMyUid] = useState<string | undefined>(undefined)

  useEffect(() => {
    getFirebaseAuth().then((a) => setMyUid(a.currentUser?.uid))
  }, [])

  useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDocs(collection(db, 'users'))
        const rows: Item[] = []
        snap.forEach((d) => rows.push({ id: d.id, data: d.data() }))
        rows.sort((a, b) => (b.data.createdAt?.toMillis?.() || 0) - (a.data.createdAt?.toMillis?.() || 0))
        setItems(rows)
      } catch {
        toast.error('Could not load users.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  // Owner's standing rule: NOBODY can be made an admin from this panel — the
  // only admin is the owner's own account. The assignable role here is
  // 'tester': testers can add businesses and edit/delete ONLY their own
  // listings; existing listings stay under the owner's ownership.
  const setTesterRole = async (item: Item, makeTester: boolean) => {
    const { id, data } = item
    const next = makeTester ? 'tester' : 'member'
    const label = data.ownerName || data.email || 'this user'
    const prompt = makeTester
      ? `Make ${label} a tester? Testers can add businesses and manage only their own listings.`
      : `Remove the tester role from ${label} (back to member)?`
    if (!window.confirm(prompt)) return
    setBusy(id)
    try {
      await updateDoc(doc(db, 'users', id), { role: next })
      setItems((prev) => prev.map((it) => (it.id === id ? { ...it, data: { ...it.data, role: next } } : it)))
      toast.success(`${label} is now ${makeTester ? 'a tester' : 'a member'}.`)
    } catch {
      toast.error('Role change failed — check permissions and try again.')
    } finally {
      setBusy(null)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Users</h1>
        <p className="text-sm text-slate-500">
          {items.length} registered · assign the Tester role here — testers manage only their own listings.
          Admin is the owner&apos;s account only; nobody can be made an admin from this panel.
        </p>
      </div>

      {loading ? (
        <AdminLoading />
      ) : items.length === 0 ? (
        <AdminEmpty text="No registered users yet." />
      ) : (
        <div className="space-y-3">
          {items.map((item) => {
            const { id, data } = item
            const role = data.role || 'member'
            const isAdmin = role === 'admin'
            const isTester = role === 'tester'
            const isSelf = id === myUid
            return (
              <article key={id} className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-extrabold text-slate-900 text-sm">{data.ownerName || data.name || 'Unnamed user'}</h2>
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                        isAdmin
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : isTester
                            ? 'bg-amber-100 text-amber-800 border-amber-300'
                            : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}
                    >
                      {isAdmin ? 'Admin' : isTester ? 'Tester' : 'Member'}
                    </span>
                    {isSelf && <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">(you)</span>}
                  </div>
                  <p className="text-xs text-slate-500">
                    {data.email || '—'} · {data.phone || 'no phone'} · Joined {formatDate(data.createdAt)}
                  </p>
                  {isTester && (
                    <p className="text-[11px] text-amber-700">Tester — can add businesses and edit/delete only their own listings.</p>
                  )}
                </div>
                <div className="shrink-0">
                  {isAdmin ? (
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide" title="The admin role belongs to the owner only and cannot be changed here">
                      Owner — locked
                    </span>
                  ) : (
                    <button type="button" disabled={busy === id} onClick={() => setTesterRole(item, !isTester)} className={neutralBtn}>
                      {isTester ? 'Make Member' : 'Make Tester'}
                    </button>
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
