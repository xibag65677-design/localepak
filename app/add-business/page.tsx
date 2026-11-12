'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Building2, ArrowLeft, ArrowRight, Info, X, Plus, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'
import { safeErrorMessage } from '@/lib/user-error'
import { getFirebaseAuth, db } from '@/lib/firebase'
import { onAuthStateChanged, User } from 'firebase/auth'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { CATEGORIES, CITIES } from '@/lib/data'
import CityCombobox from '@/components/city-combobox'
import { isValidPakistaniPhone, normalizePakistaniPhone, sanitizePhoneInput, isValidPrice } from '@/lib/validation'
import { writeOwnerContact } from '@/lib/owner-contact'
import { queueSubmissionEmails } from '@/lib/mail'
import TierSelect from '@/components/tier-select'
import PaymentScreen from '@/components/payment-screen'
import type { ListingTier } from '@/lib/tiers'

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'
type DayHours = { open: string; close: string; closed: boolean }

const DAY_KEYS: DayKey[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
const DAY_LABELS: Record<DayKey, string> = {
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday',
  sun: 'Sunday',
}

function defaultHours(): Record<DayKey, DayHours> {
  const open: DayHours = { open: '09:00', close: '18:00', closed: false }
  return {
    mon: { ...open },
    tue: { ...open },
    wed: { ...open },
    thu: { ...open },
    fri: { ...open },
    sat: { ...open },
    sun: { open: '09:00', close: '18:00', closed: true },
  }
}

type Product = { name: string; price: string }

type FormState = {
  name: string
  email: string
  phone: string
  whatsapp: string
  mainCategory: string
  secondaryCategory: string
  city: string
  address: string
  area: string
  mapsUrl: string
  hours: Record<DayKey, DayHours>
  services: string[]
  products: Product[]
  website: string
  facebook: string
  instagram: string
  youtube: string
  description: string
  tags: string
}

const initialForm: FormState = {
  name: '',
  email: '',
  phone: '',
  whatsapp: '',
  mainCategory: '',
  secondaryCategory: '',
  city: '',
  address: '',
  area: '',
  mapsUrl: '',
  hours: defaultHours(),
  services: [],
  products: [],
  website: '',
  facebook: '',
  instagram: '',
  youtube: '',
  description: '',
  tags: '',
}

const DRAFT_KEY = 'localepak_add_business_draft'

const STEP_TITLES = [
  'Basic Info',
  'Categories',
  'Location',
  'Business Hours',
  'Services',
  'Products',
  'Online Presence',
  'Description & Publish',
]

const inputClass =
  'w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-sm focus:outline-none focus:border-emerald-600'
const labelClass = 'block text-xs font-bold text-slate-700 mb-1'

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

export default function AddBusinessPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  // True once Firebase has reported the first auth state. The form
  // renders before that (and for signed-out visitors) so Googlebot
  // and first-time visitors see the real page; only the submit is
  // gated behind sign-in.
  const [authChecked, setAuthChecked] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState(1)
  const [stepError, setStepError] = useState('')
  const [tier, setTier] = useState<ListingTier>('basic')
  // Saved at the last step: the listing waits here until the payment
  // proof is uploaded on the payment screen below.
  const [savedBusiness, setSavedBusiness] = useState<{ id: string; name: string } | null>(null)
  const [form, setForm] = useState<FormState>(initialForm)
  const [serviceInput, setServiceInput] = useState('')
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState('')

  // Draft restore: a signed-out visitor who filled the form, was sent
  // to sign in on submit, and came back via /login?next= lands here
  // with their entries intact (same tab, sessionStorage).
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(DRAFT_KEY)
      if (raw) {
        const draft = JSON.parse(raw) as { form?: FormState; tier?: ListingTier; step?: number }
        if (draft.form && typeof draft.form.name === 'string') {
          setForm({ ...initialForm, ...draft.form })
          if (draft.tier) setTier(draft.tier)
          if (typeof draft.step === 'number') setStep(Math.min(8, Math.max(1, draft.step)))
        }
      }
    } catch {
      // Corrupt draft — ignore it and start with a blank form.
    }
    try {
      sessionStorage.removeItem(DRAFT_KEY)
    } catch {
      // Storage unavailable — nothing to clean up.
    }
  }, [])

  useEffect(() => {
    let unsub: (() => void) | undefined
    getFirebaseAuth().then((a) => {
      unsub = onAuthStateChanged(a, (u) => {
        setUser(u)
        setAuthChecked(true)
      })
    })
    return () => unsub?.()
  }, [])

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }))
    setStepError('')
  }

  const setDayHours = (day: DayKey, patch: Partial<DayHours>) => {
    setForm((f) => ({ ...f, hours: { ...f.hours, [day]: { ...f.hours[day], ...patch } } }))
    setStepError('')
  }

  const applyMondayToWeek = () => {
    setForm((f) => {
      const mon = f.hours.mon
      const next = { ...f.hours }
      DAY_KEYS.forEach((key) => {
        if (!next[key].closed) {
          next[key] = { ...next[key], open: mon.open, close: mon.close }
        }
      })
      return { ...f, hours: next }
    })
    toast.success('Monday hours applied to all open days.')
  }

  const validateStep = (s: number): string => {
    switch (s) {
      case 1:
        if (!form.name.trim()) return 'Business name is required.'
        if (!isValidEmail(form.email)) return 'Please enter a valid business email address.'
        if (!isValidPakistaniPhone(form.phone)) return 'Please enter a valid Pakistani phone number (e.g. 0300 1234567).'
        if (form.whatsapp.trim() && !isValidPakistaniPhone(form.whatsapp)) return 'Please enter a valid WhatsApp number, or leave it empty to use your phone number.'
        return ''
      case 2:
        if (!form.mainCategory) return 'Please select a main category.'
        if (form.secondaryCategory && form.secondaryCategory === form.mainCategory)
          return 'Secondary category cannot be the same as the main category.'
        return ''
      case 3:
        if (!form.city) return 'Please select your city.'
        if (!form.address.trim()) return 'Complete address is required.'
        return ''
      case 4:
        for (const key of DAY_KEYS) {
          const d = form.hours[key]
          if (!d.closed && (!d.open || !d.close)) return `Please set open and close times for ${DAY_LABELS[key]}, or mark it closed.`
        }
        return ''
      case 6:
        if (productPrice.trim() && !isValidPrice(productPrice))
          return 'Product price must be a number (e.g. 350) — letters or text like "abc" are not allowed. Fix the price, or clear it and press Next.'
        for (const p of form.products) {
          if (!isValidPrice(p.price)) return `The price for "${p.name}" is not a valid number. Remove that product and add it again with a numeric price.`
        }
        return ''
      case 8:
        if (form.description.trim().length < 30) return 'Description must be at least 30 characters so customers understand your business.'
        return ''
      default:
        return ''
    }
  }

  const goNext = () => {
    const err = validateStep(step)
    if (err) {
      setStepError(err)
      return
    }
    setStepError('')
    setStep((s) => Math.min(8, s + 1))
  }

  const goBack = () => {
    setStepError('')
    setStep((s) => Math.max(1, s - 1))
  }

  const addService = () => {
    const value = serviceInput.trim()
    if (!value) return
    if (form.services.includes(value)) {
      setServiceInput('')
      return
    }
    set('services', [...form.services, value])
    setServiceInput('')
  }

  const addProduct = () => {
    const name = productName.trim()
    if (!name) return
    if (!isValidPrice(productPrice)) {
      setStepError('Product price must be a number (e.g. 350) — letters or text like "abc" are not allowed.')
      return
    }
    set('products', [...form.products, { name, price: productPrice.trim() }])
    setProductName('')
    setProductPrice('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 8) {
      goNext()
      return
    }
    const err = validateStep(8)
    if (err) {
      setStepError(err)
      return
    }
    if (!user) {
      // Save the completed form so the sign-in round-trip does not
      // wipe it; /login?next= brings the user straight back here.
      try {
        sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ form, tier, step }))
      } catch {
        // Storage unavailable — continue to sign-in anyway.
      }
      toast.info('Please sign in to submit your business — you will come straight back here.')
      router.push('/login?next=/add-business')
      return
    }
    setIsSubmitting(true)
    try {
      const tags = form.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
      const ref = await addDoc(collection(db, 'businesses'), {
        name: form.name.trim(),
        slug: `${slugify(form.name)}-${slugify(form.city)}`,
        email: form.email.trim(),
        phone: normalizePakistaniPhone(form.phone),
        whatsapp: form.whatsapp.trim() ? normalizePakistaniPhone(form.whatsapp) : normalizePakistaniPhone(form.phone),
        category: form.mainCategory,
        mainCategory: form.mainCategory,
        secondaryCategory: form.secondaryCategory,
        city: form.city,
        address: form.address.trim(),
        area: form.area.trim(),
        mapsUrl: form.mapsUrl.trim(),
        hours: form.hours,
        services: form.services,
        products: form.products,
        website: form.website.trim(),
        facebook: form.facebook.trim(),
        instagram: form.instagram.trim(),
        youtube: form.youtube.trim(),
        description: form.description.trim(),
        tags,
        ownerId: user.uid,
        ownerName: user.displayName || '',
        status: 'pending',
        tier,
        paymentStatus: 'awaiting_payment',
        projects: [],
        createdAt: serverTimestamp(),
      })
      // Owner contact (login email) is private: it goes to the
      // owner/admin-only subcollection, never into the main document
      // (see lib/owner-contact.ts).
      await writeOwnerContact('businesses', ref.id, user.uid, user.email || '')
      // Saved — the payment screen follows. The submission email
      // goes out only after the payment proof is uploaded, so the
      // owner gets one confirmation for the whole submission.
      setSavedBusiness({ id: ref.id, name: form.name.trim() })
    } catch (err: any) {
      toast.error(`Could not submit your business: ${safeErrorMessage(err)}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Payment step: the listing is saved; the buyer pays and uploads
  // the proof here. Only then does the confirmation email go out.
  if (savedBusiness && user) {
    return (
      <>
        <Navbar />
        <main className="bg-[#F8FAFC] text-slate-800 font-sans min-h-screen py-16 px-4 flex items-center justify-center">
          <div className="max-w-lg w-full bg-white border border-slate-200 rounded-3xl p-5 sm:p-8 shadow-xl">
            <PaymentScreen
              tier={tier}
              listingType="business"
              listingId={savedBusiness.id}
              listingName={savedBusiness.name}
              ownerId={user.uid}
              ownerEmail={user.email || ''}
              onSubmitted={async () => {
                await queueSubmissionEmails({
                  kind: 'business',
                  name: savedBusiness.name,
                  city: form.city,
                  ownerEmail: user.email || '',
                  ownerName: user.displayName || '',
                })
                toast.success('Business submitted for review.')
                router.push('/dashboard')
              }}
            />
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const progressPct = (step / 8) * 100

  return (
    <>
      <Navbar />
      <main className="bg-[#F8FAFC] text-slate-800 font-sans min-h-screen py-16 px-4">
        {authChecked && !user && (
          <div className="max-w-2xl mx-auto mb-4 p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 font-medium flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              You can fill in the form now — you will be asked to sign in when you submit.{' '}
              <Link href="/login?next=/add-business" className="text-emerald-600 font-bold hover:underline">
                Sign in
              </Link>
              {' '}or{' '}
              <Link href="/register?next=/add-business" className="text-emerald-600 font-bold hover:underline">
                create an account
              </Link>
              .
            </span>
          </div>
        )}
        <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-3xl p-5 sm:p-8 shadow-xl">
          <div className="text-center mb-6">
            <div className="inline-flex p-3 rounded-2xl bg-emerald-50 text-emerald-600 mb-3">
              <Building2 className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Add Your Business</h1>
            <p className="text-xs text-slate-500 mt-1">Business listing — plans from PKR 99, verified before approval</p>
            <p className="text-sm text-slate-600 mt-3 max-w-lg mx-auto">
              List your business on LocalePak so customers across Pakistan can find your phone number, address,
              opening hours and services. Fill in the details below — your listing is reviewed before it appears publicly.
            </p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-bold mb-2">
              <span className="text-slate-700">
                Step {step} of 8 — <span className="text-emerald-600">{STEP_TITLES[step - 1]}</span>
              </span>
              <span className="text-slate-400">{Math.round(progressPct)}%</span>
            </div>
            <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <div className="hidden sm:flex justify-between mt-2">
              {STEP_TITLES.map((title, i) => (
                <span
                  key={title}
                  className={`text-[10px] font-semibold ${i + 1 === step ? 'text-emerald-600' : i + 1 < step ? 'text-emerald-600' : 'text-slate-300'}`}
                >
                  {title}
                </span>
              ))}
            </div>
          </div>

          {stepError && (
            <div className="mb-4 p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium">
              {stepError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Business Name *</label>
                  <input type="text" required value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Pak Tech Solutions" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Business Email *</label>
                  <input type="email" required value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="info@yourbusiness.pk" className={inputClass} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Business Phone *</label>
                    <input type="tel" inputMode="tel" required value={form.phone} onChange={(e) => set('phone', sanitizePhoneInput(e.target.value))} placeholder="+92 300 1234567" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>WhatsApp</label>
                    <input type="tel" inputMode="tel" value={form.whatsapp} onChange={(e) => set('whatsapp', sanitizePhoneInput(e.target.value))} placeholder="Same as phone if empty" className={inputClass} />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Main Category *</label>
                  <select required value={form.mainCategory} onChange={(e) => set('mainCategory', e.target.value)} className={inputClass}>
                    <option value="" disabled>Select a category</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Secondary Category</label>
                  <select value={form.secondaryCategory} onChange={(e) => set('secondaryCategory', e.target.value)} className={inputClass}>
                    <option value="">None</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.name} disabled={cat.name === form.mainCategory}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-[11px] text-slate-400 mt-1">Optional — pick a second category if your business fits more than one. It cannot be the same as your main category.</p>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>City *</label>
                  <CityCombobox required value={form.city} onChange={(city) => set('city', city)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Complete Address *</label>
                  <textarea required value={form.address} onChange={(e) => set('address', e.target.value)} rows={2} placeholder="Shop 12, Main Boulevard, Gulberg III" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Area / Locality</label>
                  <input type="text" value={form.area} onChange={(e) => set('area', e.target.value)} placeholder="Gulberg, DHA, Clifton..." className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Google Maps Link</label>
                  <input type="url" value={form.mapsUrl} onChange={(e) => set('mapsUrl', e.target.value)} placeholder="https://maps.google.com/..." className={inputClass} />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-500">Set opening hours for each day, or mark a day closed.</p>
                  <button type="button" onClick={applyMondayToWeek} className="text-xs font-bold text-emerald-600 hover:underline cursor-pointer whitespace-nowrap ml-3">
                    Same hours all week
                  </button>
                </div>
                {DAY_KEYS.map((key) => {
                  const d = form.hours[key]
                  return (
                    <div key={key} className="flex flex-wrap items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                      <span className="w-24 text-sm font-bold text-slate-700">{DAY_LABELS[key]}</span>
                      <input
                        type="time"
                        value={d.open}
                        disabled={d.closed}
                        onChange={(e) => setDayHours(key, { open: e.target.value })}
                        className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm disabled:opacity-40"
                      />
                      <span className="text-slate-400 text-xs font-bold">to</span>
                      <input
                        type="time"
                        value={d.close}
                        disabled={d.closed}
                        onChange={(e) => setDayHours(key, { close: e.target.value })}
                        className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm disabled:opacity-40"
                      />
                      <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 ml-auto cursor-pointer">
                        <input
                          type="checkbox"
                          checked={d.closed}
                          onChange={(e) => setDayHours(key, { closed: e.target.checked })}
                          className="w-4 h-4 accent-red-500"
                        />
                        Closed
                      </label>
                    </div>
                  )
                })}
              </div>
            )}

            {step === 5 && (
              <div className="space-y-4">
                <p className="text-xs text-slate-500">
                  Add the services you offer so customers can find you faster — for example <em>Home Delivery</em>, <em>Free Installation</em>, or <em>24/7 Emergency Service</em>. This step is optional, but listings with services get more calls.
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={serviceInput}
                    onChange={(e) => setServiceInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        addService()
                      }
                    }}
                    placeholder="e.g. Home Delivery"
                    className={inputClass}
                  />
                  <button type="button" onClick={addService} className="shrink-0 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl flex items-center gap-1.5 cursor-pointer">
                    <Plus className="w-4 h-4" /> Add
                  </button>
                </div>
                {form.services.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {form.services.map((service) => (
                      <span key={service} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-xs font-semibold">
                        {service}
                        <button
                          type="button"
                          onClick={() => set('services', form.services.filter((s) => s !== service))}
                          className="text-emerald-400 hover:text-red-500 cursor-pointer"
                          aria-label={`Remove ${service}`}
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">No services added yet.</p>
                )}
              </div>
            )}

            {step === 6 && (
              <div className="space-y-4">
                <p className="text-xs text-slate-500">
                  List your main products with prices (price is optional) — for example <em>Chicken Biryani — Rs 350</em>. This step is optional.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Product name" className={inputClass} />
                  <input type="text" inputMode="decimal" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} placeholder="Price in Rs (numbers only, e.g. 350)" className="w-full sm:w-44 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-sm focus:outline-none focus:border-emerald-600" />
                  <button type="button" onClick={addProduct} className="shrink-0 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-1.5 cursor-pointer">
                    <Plus className="w-4 h-4" /> Add
                  </button>
                </div>
                {form.products.length > 0 ? (
                  <ul className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                    {form.products.map((product, i) => (
                      <li key={`${product.name}-${i}`} className="flex items-center justify-between px-4 py-2.5 bg-slate-50 text-sm">
                        <span className="font-medium text-slate-700">{product.name}</span>
                        <span className="flex items-center gap-3">
                          {product.price && <span className="text-xs font-bold text-emerald-600">{product.price}</span>}
                          <button
                            type="button"
                            onClick={() => set('products', form.products.filter((_, idx) => idx !== i))}
                            className="text-slate-400 hover:text-red-500 cursor-pointer"
                            aria-label={`Remove ${product.name}`}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-slate-400 italic">No products added yet.</p>
                )}
              </div>
            )}

            {step === 7 && (
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Website</label>
                  <input type="url" value={form.website} onChange={(e) => set('website', e.target.value)} placeholder="https://yourbusiness.pk" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Facebook Page</label>
                  <input type="url" value={form.facebook} onChange={(e) => set('facebook', e.target.value)} placeholder="https://facebook.com/yourbusiness" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Instagram</label>
                  <input type="url" value={form.instagram} onChange={(e) => set('instagram', e.target.value)} placeholder="https://instagram.com/yourbusiness" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>YouTube Channel</label>
                  <input type="url" value={form.youtube} onChange={(e) => set('youtube', e.target.value)} placeholder="https://youtube.com/@yourbusiness" className={inputClass} />
                </div>
              </div>
            )}

            {step === 8 && (
              <div className="space-y-5">
                <div>
                  <label className={labelClass}>Business Description *</label>
                  <textarea
                    required
                    value={form.description}
                    onChange={(e) => set('description', e.target.value)}
                    rows={4}
                    placeholder="Tell customers what your business offers, your experience, and why they should choose you (at least 30 characters)."
                    className={inputClass}
                  />
                  <p className={`text-[11px] mt-1 font-medium ${form.description.trim().length >= 30 ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {form.description.trim().length}/30 characters minimum
                  </p>
                </div>
                <div>
                  <label className={labelClass}>Tags / Keywords</label>
                  <input
                    type="text"
                    value={form.tags}
                    onChange={(e) => set('tags', e.target.value)}
                    placeholder="biryani, karahi, family dinner (comma-separated)"
                    className={inputClass}
                  />
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4 text-xs text-slate-600">
                  <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Review your business
                  </h3>
                  <div>
                    <p className="font-bold text-slate-800 mb-1">Basic Info</p>
                    <p>{form.name} · {form.email} · {form.phone}{form.whatsapp ? ` · WhatsApp: ${form.whatsapp}` : ' · WhatsApp: same as phone'}</p>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 mb-1">Categories</p>
                    <p>{form.mainCategory}{form.secondaryCategory ? ` · also: ${form.secondaryCategory}` : ''}</p>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 mb-1">Location</p>
                    <p>{form.city}{form.area ? ` — ${form.area}` : ''} · {form.address}{form.mapsUrl ? ' · Maps link added' : ''}</p>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 mb-1">Business Hours</p>
                    <p>
                      {DAY_KEYS.map((key) => {
                        const d = form.hours[key]
                        return `${DAY_LABELS[key].slice(0, 3)}: ${d.closed ? 'Closed' : `${d.open}–${d.close}`}`
                      }).join(' · ')}
                    </p>
                  </div>
                  {form.services.length > 0 && (
                    <div>
                      <p className="font-bold text-slate-800 mb-1">Services</p>
                      <p>{form.services.join(', ')}</p>
                    </div>
                  )}
                  {form.products.length > 0 && (
                    <div>
                      <p className="font-bold text-slate-800 mb-1">Products</p>
                      <p>{form.products.map((p) => (p.price ? `${p.name} (${p.price})` : p.name)).join(', ')}</p>
                    </div>
                  )}
                  {(form.website || form.facebook || form.instagram || form.youtube) && (
                    <div>
                      <p className="font-bold text-slate-800 mb-1">Online Presence</p>
                      <p>{[form.website, form.facebook, form.instagram, form.youtube].filter(Boolean).join(' · ')}</p>
                    </div>
                  )}
                  {form.tags.trim() && (
                    <div>
                      <p className="font-bold text-slate-800 mb-1">Tags</p>
                      <p>{form.tags}</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-2.5 p-3.5 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-slate-600">
                  <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Your listing goes through a quick review; once approved, it goes live immediately. After saving, you will pay for your plan and upload a payment screenshot — approval follows payment verification.</span>
                </div>

                <TierSelect value={tier} onChange={setTier} />
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={goBack}
                  className="px-5 py-2.5 bg-white border border-slate-200 hover:border-emerald-500 text-slate-700 font-bold text-sm rounded-xl flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              ) : (
                <span />
              )}

              {step < 8 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl flex items-center gap-2 cursor-pointer transition-colors shadow-md"
                >
                  Next <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl flex items-center gap-2 cursor-pointer transition-colors shadow-md disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : 'Save & Continue to Payment'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

            <p className="text-center text-[11px] text-slate-400">
              Need help? See the <Link href="/business-listing-guidelines" className="text-emerald-600 font-semibold hover:underline">listing guidelines</Link>.
            </p>
          </form>
        </div>

        <section className="max-w-2xl mx-auto mt-8" aria-label="Frequently asked questions">
          <h2 className="text-lg font-extrabold text-slate-900 mb-4">Frequently asked questions</h2>
          <div className="space-y-3">
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <h3 className="font-bold text-slate-900 text-sm">What details do I need to add my business?</h3>
              <p className="text-sm text-slate-600 mt-1">
                Your business name, email, phone number, category, city and complete address. Opening hours,
                services, products, website and social links are optional, and the description needs at least
                30 characters.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <h3 className="font-bold text-slate-900 text-sm">What happens after I submit my business?</h3>
              <p className="text-sm text-slate-600 mt-1">
                Your listing is saved, then you pay for your plan and upload a payment screenshot. Our team
                verifies the payment and reviews the listing — once approved, it appears publicly on LocalePak.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <h3 className="font-bold text-slate-900 text-sm">Do I need an account to add a business?</h3>
              <p className="text-sm text-slate-600 mt-1">
                Yes. You can fill in the form first, and when you submit you will be asked to sign in or create
                an account — you come straight back to this page afterwards, with your entries intact.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <h3 className="font-bold text-slate-900 text-sm">Can I update my listing later?</h3>
              <p className="text-sm text-slate-600 mt-1">
                Yes. Sign in to your dashboard to manage your listings and request changes — updates go through
                review before they appear publicly.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
