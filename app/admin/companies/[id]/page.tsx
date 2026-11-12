'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { db } from '@/lib/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { toast } from 'sonner'
import { safeErrorMessage } from '@/lib/user-error'
import { ArrowLeft } from 'lucide-react'
import { CITIES, CATEGORIES } from '@/lib/data'
import { StatusBadge } from '@/components/admin-shared'

const inputClass =
  'w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-sm focus:outline-none focus:border-emerald-600'
const labelClass = 'block text-xs font-bold text-slate-700 mb-1'

export default function AdminEditCompanyPage() {
  const params = useParams()
  const router = useRouter()
  const id = String(params?.id || '')
  const [loading, setLoading] = useState(true)
  const [missing, setMissing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState('pending')
  const [slug, setSlug] = useState('')
  const [form, setForm] = useState({
    name: '', industry: '', email: '', phone: '', city: '', website: '', address: '', description: '',
  })

  useEffect(() => {
    if (!id) return
    const load = async () => {
      try {
        const snap = await getDoc(doc(db, 'companies', id))
        if (!snap.exists()) {
          setMissing(true)
          return
        }
        const d = snap.data() as any
        setStatus(d.status || 'pending')
        setSlug(d.slug || '')
        setForm({
          name: d.name || '',
          industry: d.industry || d.category || '',
          email: d.email || '',
          phone: d.phone || '',
          city: d.city || '',
          website: d.website || '',
          address: d.address || '',
          description: d.description || '',
        })
      } catch {
        toast.error('Could not load this company.')
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
      await updateDoc(doc(db, 'companies', id), {
        name: form.name.trim(),
        industry: form.industry.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        city: form.city,
        website: form.website.trim(),
        address: form.address.trim(),
        description: form.description.trim(),
      })
      toast.success('Company updated.')
      router.push('/admin/companies')
    } catch (err: any) {
      toast.error(`Save failed: ${safeErrorMessage(err)}`)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="text-sm text-slate-500">Loading company...</p>
  if (missing) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-slate-600">This company no longer exists.</p>
        <Link href="/admin/companies" className="text-sm font-bold text-emerald-600 hover:underline">← Back to Companies</Link>
      </div>
    )
  }

  const industryOptions = Array.from(new Set([...CATEGORIES.map((c) => c.name), form.industry].filter(Boolean)))

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <Link href="/admin/companies" className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Companies
        </Link>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Edit Company</h1>
        <StatusBadge status={status} />
        {slug && (
          <Link href={`/company/${slug}`} target="_blank" className="text-xs font-semibold text-emerald-600 hover:underline">
            View public page
          </Link>
        )}
      </div>
      <p className="text-xs text-slate-500 -mt-3">
        Status is read-only here — use Approve / Reject on the Companies list to change it.
      </p>

      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className={labelClass} htmlFor="f-name">Company name</label><input id="f-name" className={inputClass} value={form.name} onChange={set('name')} /></div>
          <div>
            <label className={labelClass} htmlFor="f-industry">Industry</label>
            <input id="f-industry" className={inputClass} value={form.industry} onChange={set('industry')} list="industry-options" />
            <datalist id="industry-options">
              {industryOptions.map((o) => <option key={o} value={o} />)}
            </datalist>
          </div>
          <div><label className={labelClass} htmlFor="f-email">Contact email</label><input id="f-email" type="email" className={inputClass} value={form.email} onChange={set('email')} /></div>
          <div><label className={labelClass} htmlFor="f-phone">Phone</label><input id="f-phone" className={inputClass} value={form.phone} onChange={set('phone')} /></div>
          <div>
            <label className={labelClass} htmlFor="f-city">City</label>
            <select id="f-city" className={inputClass} value={form.city} onChange={set('city')}>
              <option value="">Select city</option>
              {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div><label className={labelClass} htmlFor="f-website">Website</label><input id="f-website" className={inputClass} value={form.website} onChange={set('website')} /></div>
          <div className="sm:col-span-2"><label className={labelClass} htmlFor="f-address">Address</label><input id="f-address" className={inputClass} value={form.address} onChange={set('address')} /></div>
        </div>
        <div>
          <label className={labelClass} htmlFor="f-description">Description</label>
          <textarea id="f-description" rows={5} className={inputClass} value={form.description} onChange={set('description')} />
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-colors cursor-pointer disabled:opacity-50">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <Link href="/admin/companies" className="px-6 py-3 bg-white border border-slate-200 hover:border-emerald-500 font-bold text-sm rounded-xl transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
