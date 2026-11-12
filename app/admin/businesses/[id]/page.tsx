'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { db } from '@/lib/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { toast } from 'sonner'
import { safeErrorMessage } from '@/lib/user-error'
import { ArrowLeft, X, Plus } from 'lucide-react'
import { CITIES, CATEGORIES } from '@/lib/data'
import { StatusBadge } from '@/components/admin-shared'

const inputClass =
  'w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-sm focus:outline-none focus:border-emerald-600'
const labelClass = 'block text-xs font-bold text-slate-700 mb-1'

export default function AdminEditBusinessPage() {
  const params = useParams()
  const router = useRouter()
  const id = String(params?.id || '')
  const [loading, setLoading] = useState(true)
  const [missing, setMissing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState('pending')
  const [slug, setSlug] = useState('')
  const [form, setForm] = useState({
    name: '', email: '', phone: '', whatsapp: '', city: '', category: '', secondaryCategory: '',
    address: '', area: '', website: '', facebook: '', instagram: '', youtube: '', description: '',
  })
  const [tagsText, setTagsText] = useState('')
  const [services, setServices] = useState<string[]>([])
  const [serviceInput, setServiceInput] = useState('')

  useEffect(() => {
    if (!id) return
    const load = async () => {
      try {
        const snap = await getDoc(doc(db, 'businesses', id))
        if (!snap.exists()) {
          setMissing(true)
          return
        }
        const d = snap.data() as any
        setStatus(d.status || 'pending')
        setSlug(d.slug || '')
        setForm({
          name: d.name || '',
          email: d.email || '',
          phone: d.phone || '',
          whatsapp: d.whatsapp || '',
          city: d.city || '',
          category: d.category || d.mainCategory || '',
          secondaryCategory: d.secondaryCategory || '',
          address: d.address || '',
          area: d.area || '',
          website: d.website || '',
          facebook: d.facebook || '',
          instagram: d.instagram || '',
          youtube: d.youtube || '',
          description: d.description || '',
        })
        setTagsText(Array.isArray(d.tags) ? d.tags.join(', ') : '')
        setServices(Array.isArray(d.services) ? d.services : [])
      } catch {
        toast.error('Could not load this business.')
        setMissing(true)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }))

  const addService = () => {
    const v = serviceInput.trim()
    if (v && !services.includes(v)) setServices((prev) => [...prev, v])
    setServiceInput('')
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await updateDoc(doc(db, 'businesses', id), {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        whatsapp: form.whatsapp.trim(),
        city: form.city,
        category: form.category,
        mainCategory: form.category,
        secondaryCategory: form.secondaryCategory,
        address: form.address.trim(),
        area: form.area.trim(),
        website: form.website.trim(),
        facebook: form.facebook.trim(),
        instagram: form.instagram.trim(),
        youtube: form.youtube.trim(),
        description: form.description.trim(),
        tags: tagsText.split(',').map((t) => t.trim()).filter(Boolean),
        services,
      })
      toast.success('Business updated.')
      router.push('/admin/businesses')
    } catch (err: any) {
      toast.error(`Save failed: ${safeErrorMessage(err)}`)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="text-sm text-slate-500">Loading business...</p>
  if (missing) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-slate-600">This business no longer exists.</p>
        <Link href="/admin/businesses" className="text-sm font-bold text-emerald-600 hover:underline">← Back to Businesses</Link>
      </div>
    )
  }

  const categoryOptions = Array.from(new Set([...CATEGORIES.map((c) => c.name), form.category, form.secondaryCategory].filter(Boolean)))

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <Link href="/admin/businesses" className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Businesses
        </Link>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Edit Business</h1>
        <StatusBadge status={status} />
        {slug && (
          <Link href={`/business/${slug}`} target="_blank" className="text-xs font-semibold text-emerald-600 hover:underline">
            View public page
          </Link>
        )}
      </div>
      <p className="text-xs text-slate-500 -mt-3">
        Status is read-only here — use Approve / Reject on the Businesses list to change it.
      </p>

      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className={labelClass} htmlFor="f-name">Business name</label><input id="f-name" className={inputClass} value={form.name} onChange={set('name')} /></div>
          <div><label className={labelClass} htmlFor="f-email">Contact email</label><input id="f-email" type="email" className={inputClass} value={form.email} onChange={set('email')} /></div>
          <div><label className={labelClass} htmlFor="f-phone">Phone</label><input id="f-phone" className={inputClass} value={form.phone} onChange={set('phone')} /></div>
          <div><label className={labelClass} htmlFor="f-whatsapp">WhatsApp</label><input id="f-whatsapp" className={inputClass} value={form.whatsapp} onChange={set('whatsapp')} /></div>
          <div>
            <label className={labelClass} htmlFor="f-city">City</label>
            <select id="f-city" className={inputClass} value={form.city} onChange={set('city')}>
              <option value="">Select city</option>
              {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="f-category">Main category</label>
            <select id="f-category" className={inputClass} value={form.category} onChange={set('category')}>
              <option value="">Select category</option>
              {categoryOptions.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="f-secondary">Secondary category</label>
            <select id="f-secondary" className={inputClass} value={form.secondaryCategory} onChange={set('secondaryCategory')}>
              <option value="">None</option>
              {categoryOptions.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div><label className={labelClass} htmlFor="f-area">Area</label><input id="f-area" className={inputClass} value={form.area} onChange={set('area')} /></div>
          <div className="sm:col-span-2"><label className={labelClass} htmlFor="f-address">Address</label><input id="f-address" className={inputClass} value={form.address} onChange={set('address')} /></div>
          <div><label className={labelClass} htmlFor="f-website">Website</label><input id="f-website" className={inputClass} value={form.website} onChange={set('website')} /></div>
          <div><label className={labelClass} htmlFor="f-facebook">Facebook</label><input id="f-facebook" className={inputClass} value={form.facebook} onChange={set('facebook')} /></div>
          <div><label className={labelClass} htmlFor="f-instagram">Instagram</label><input id="f-instagram" className={inputClass} value={form.instagram} onChange={set('instagram')} /></div>
          <div><label className={labelClass} htmlFor="f-youtube">YouTube</label><input id="f-youtube" className={inputClass} value={form.youtube} onChange={set('youtube')} /></div>
        </div>

        <div>
          <label className={labelClass} htmlFor="f-description">Description</label>
          <textarea id="f-description" rows={5} className={inputClass} value={form.description} onChange={set('description')} />
        </div>

        <div>
          <span className={labelClass}>Services</span>
          <div className="flex flex-wrap gap-2 mb-2">
            {services.map((s) => (
              <span key={s} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
                {s}
                <button type="button" onClick={() => setServices((prev) => prev.filter((x) => x !== s))} aria-label={`Remove ${s}`} className="cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {services.length === 0 && <span className="text-xs text-slate-400">No services listed.</span>}
          </div>
          <div className="flex gap-2">
            <input
              aria-label="Add a service"
              className={inputClass}
              value={serviceInput}
              onChange={(e) => setServiceInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addService() } }}
              placeholder="Type a service and press Add"
            />
            <button type="button" onClick={addService} className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl cursor-pointer">
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="f-tags">Tags (comma separated)</label>
          <input id="f-tags" className={inputClass} value={tagsText} onChange={(e) => setTagsText(e.target.value)} placeholder="e.g. delivery, family dining, outdoor seating" />
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-colors cursor-pointer disabled:opacity-50">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <Link href="/admin/businesses" className="px-6 py-3 bg-white border border-slate-200 hover:border-emerald-500 font-bold text-sm rounded-xl transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
