'use client'

import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase'
import { collection, getDocs, doc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { toast } from 'sonner'
import { StatusBadge, AdminLoading, AdminEmpty, formatDate, approveBtn, rejectBtn } from '@/components/admin-shared'
import { queueOwnerEmail } from '@/lib/owner-mail'

type Item = { id: string; data: any }
const TABS = ['all', 'pending', 'approved', 'rejected'] as const

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/**
 * Admin queue for user-submitted blog posts (Featured listings only,
 * max 2 per owner — enforced in the dashboard form). Approving
 * publishes the post on the public blog; rejecting notifies the
 * author with the admin note.
 */
export default function AdminBlogPostsPage() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<(typeof TABS)[number]>('all')
  const [busy, setBusy] = useState<string | null>(null)
  const [notes, setNotes] = useState<Record<string, string>>({})

  useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDocs(collection(db, 'blog_posts'))
        const rows: Item[] = []
        snap.forEach((d) => rows.push({ id: d.id, data: d.data() }))
        const rank = (s: string) => (s === 'pending' ? 0 : s === 'approved' ? 1 : 2)
        rows.sort((a, b) => {
          const r = rank(a.data.status || 'pending') - rank(b.data.status || 'pending')
          if (r !== 0) return r
          return (b.data.createdAt?.toMillis?.() || 0) - (a.data.createdAt?.toMillis?.() || 0)
        })
        setItems(rows)
      } catch {
        toast.error('Could not load blog posts.')
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
      await updateDoc(doc(db, 'blog_posts', id), {
        status: 'approved',
        approvedAt: serverTimestamp(),
        adminNote: '',
      })
      setItems((prev) =>
        prev.map((it) => (it.id === id ? { ...it, data: { ...it.data, status: 'approved' } } : it))
      )
      if (data.authorEmail) {
        await queueOwnerEmail(
          data.authorEmail,
          `Your blog post '${data.title}' is now live on LocalePak`,
          [
            'Hello,',
            '',
            `Great news: your blog post '${data.title}' has been approved and is now live on the LocalePak blog.`,
            '',
            `See it here: https://www.localepak.com/blog/${data.slug}`,
            '',
            '— The LocalePak Team',
          ].join('\n'),
          `<p>Hello,</p><p>Great news: your blog post <strong>${esc(data.title)}</strong> has been approved and is now live on the LocalePak blog.</p><p><a href="https://www.localepak.com/blog/${esc(data.slug)}">Read your post</a></p><p>— The LocalePak Team</p>`
        )
      }
      toast.success('Blog post approved — now live.')
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
      await updateDoc(doc(db, 'blog_posts', id), {
        status: 'rejected',
        adminNote: note,
        reviewedAt: serverTimestamp(),
      })
      setItems((prev) =>
        prev.map((it) => (it.id === id ? { ...it, data: { ...it.data, status: 'rejected', adminNote: note } } : it))
      )
      if (data.authorEmail) {
        await queueOwnerEmail(
          data.authorEmail,
          `Your blog post '${data.title}' was not approved`,
          [
            'Hello,',
            '',
            `Your blog post '${data.title}' was not approved by our review team.`,
            ...(note ? ['', `Reason: ${note}`] : []),
            '',
            'You can revise it and submit a new post from your dashboard.',
            '',
            '— The LocalePak Team',
          ].join('\n'),
          `<p>Hello,</p><p>Your blog post <strong>${esc(data.title)}</strong> was not approved by our review team.</p>${note ? `<p><strong>Reason:</strong> ${esc(note)}</p>` : ''}<p>You can revise it and submit a new post from your dashboard.</p><p>— The LocalePak Team</p>`
        )
      }
      toast.success('Blog post rejected — author email queued.')
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
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Blog Posts</h1>
        <p className="text-sm text-slate-500">
          User-submitted blog posts (Featured listings, max 2 per owner). Approving publishes the post on the public blog.
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
        <AdminEmpty text={`No blog posts with status "${tab}".`} />
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => {
            const { id, data } = item
            const status = data.status || 'pending'
            return (
              <article key={id} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-extrabold text-slate-900 text-sm">{data.title || 'Untitled post'}</h2>
                      <StatusBadge status={status} />
                    </div>
                    <p className="text-xs text-slate-500">
                      By {data.authorName || '—'} ({data.authorEmail || '—'})
                      {data.listingName ? ` · for ${data.listingName}` : ''} · Submitted {formatDate(data.createdAt)}
                    </p>
                    {data.excerpt && <p className="text-xs text-slate-600 italic">{data.excerpt}</p>}
                    {data.content && (
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-h-64 overflow-y-auto">
                        <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">{data.content}</p>
                      </div>
                    )}
                    {data.adminNote && status === 'rejected' && (
                      <p className="text-xs text-red-600">Admin note: {data.adminNote}</p>
                    )}
                  </div>
                  {status === 'pending' && (
                    <div className="flex flex-col gap-2 shrink-0 w-full md:w-64">
                      <button type="button" disabled={busy === id} onClick={() => approve(item)} className={approveBtn}>
                        Approve &amp; Publish
                      </button>
                      <label htmlFor={`post-note-${id}`} className="sr-only">Reason for rejection (optional)</label>
                      <input
                        id={`post-note-${id}`}
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
