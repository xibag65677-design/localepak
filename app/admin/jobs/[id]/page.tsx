'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { db } from '@/lib/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { toast } from 'sonner'
import { safeErrorMessage } from '@/lib/user-error'
import { ArrowLeft } from 'lucide-react'
import { CITIES } from '@/lib/data'
import { StatusBadge } from '@/components/admin-shared'

const inputClass =
  'w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-sm focus:outline-none focus:border-emerald-600'
const labelClass = 'block text-xs font-bold text-slate-700 mb-1'
const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Remote', 'Internship']

export default function AdminEditJobPage() {
  const params = useParams()
  const router = useRouter()
  const id = String(params?.id || '')
  const [loading, setLoading] = useState(true)
  const [missing, setMissing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState('pending')
  const [form, setForm] = useState({
    title: '', companyName: '', jobType: '', city: '', salaryRange: '', contact: '', description: '',
  })

  useEffect(() => {
    if (!id) return
    const load = async () => {
      try {
        const snap = await getDoc(doc(db, 'jobs', id))
        if (!snap.exists()) {
          setMissing(true)
          return
        }
        const d = snap.data() as any
        setStatus(d.status || 'pending')
        setForm({
          title: d.title || d.name || '',
          companyName: d.companyName || d.company || '',
          jobType: d.jobType || '',
          city: d.city || '',
          salaryRange: d.salaryRange || '',
          contact: d.contact || '',
          description: d.description || '',
        })
      } catch {
        toast.error('Could not load this job.')
        setMissing(true)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }))

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await updateDoc(doc(db, 'jobs', id), {
        title: form.title.trim(),
        companyName: form.companyName.trim(),
        jobType: form.jobType,
        city: form.city,
        salaryRange: form.salaryRange.trim(),
        contact: form.contact.trim(),
        description: form.description.trim(),
      })
      toast.success('Job updated.')
      router.push('/admin/jobs')
    } catch (err: any) {
      toast.error(`Save failed: ${safeErrorMessage(err)}`)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="text-sm text-slate-500">Loading job...</p>
  if (missing) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-slate-600">This job no longer exists.</p>
        <Link href="/admin/jobs" className="text-sm font-bold text-emerald-600 hover:underline">← Back to Jobs</Link>
      </div>
    )
  }

  const typeOptions = Array.from(new Set([...JOB_TYPES, form.jobType].filter(Boolean)))

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <Link href="/admin/jobs" className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Jobs
        </Link>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Edit Job</h1>
        <StatusBadge status={status} />
      </div>
      <p className="text-xs text-slate-500 -mt-3">
        Status is read-only here — use Approve / Reject on the Jobs list to change it.
      </p>

      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className={labelClass} htmlFor="f-title">Job title</label><input id="f-title" className={inputClass} value={form.title} onChange={set('title')} /></div>
          <div><label className={labelClass} htmlFor="f-company">Company name</label><input id="f-company" className={inputClass} value={form.companyName} onChange={set('companyName')} /></div>
          <div>
            <label className={labelClass} htmlFor="f-type">Job type</label>
            <select id="f-type" className={inputClass} value={form.jobType} onChange={set('jobType')}>
              <option value="">Select type</option>
              {typeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="f-city">City</label>
            <select id="f-city" className={inputClass} value={form.city} onChange={set('city')}>
              <option value="">Select city</option>
              {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div><label className={labelClass} htmlFor="f-salary">Salary range</label><input id="f-salary" className={inputClass} value={form.salaryRange} onChange={set('salaryRange')} placeholder="e.g. PKR 80,000 – 120,000 / month" /></div>
          <div><label className={labelClass} htmlFor="f-contact">How to apply / contact</label><input id="f-contact" className={inputClass} value={form.contact} onChange={set('contact')} /></div>
        </div>
        <div>
          <label className={labelClass} htmlFor="f-description">Description</label>
          <textarea id="f-description" rows={6} className={inputClass} value={form.description} onChange={set('description')} />
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-colors cursor-pointer disabled:opacity-50">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <Link href="/admin/jobs" className="px-6 py-3 bg-white border border-slate-200 hover:border-emerald-500 font-bold text-sm rounded-xl transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
