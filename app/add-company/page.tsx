'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Factory, ArrowRight, Info } from 'lucide-react'
import { toast } from 'sonner'
import { safeErrorMessage } from '@/lib/user-error'
import { getFirebaseAuth, db } from '@/lib/firebase'
import { onAuthStateChanged, User } from 'firebase/auth'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { CATEGORIES, CITIES } from '@/lib/data'
import CityCombobox from '@/components/city-combobox'
import { isValidPakistaniPhone, normalizePakistaniPhone, sanitizePhoneInput } from '@/lib/validation'
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

const DRAFT_KEY = 'localepak_add_company_draft'

const inputClass =
  'w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-sm focus:outline-none focus:border-emerald-600'
const labelClass = 'block text-xs font-bold text-slate-700 mb-1'

export default function AddCompanyPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  // True once Firebase has reported the first auth state. The form
  // renders before that (and for signed-out visitors) so Googlebot
  // and first-time visitors see the real page; only the submit is
  // gated behind sign-in.
  const [authChecked, setAuthChecked] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [name, setName] = useState('')
  const [industry, setIndustry] = useState('')
  const [city, setCity] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [address, setAddress] = useState('')
  const [description, setDescription] = useState('')
  const [tier, setTier] = useState<ListingTier>('basic')
  // Saved at the last step: the listing waits here until the payment
  // proof is uploaded on the payment screen below.
  const [savedCompany, setSavedCompany] = useState<{ id: string; name: string } | null>(null)

  // Draft restore: a signed-out visitor who filled the form, was sent
  // to sign in on submit, and came back via /login?next= lands here
  // with their entries intact (same tab, sessionStorage).
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(DRAFT_KEY)
      if (raw) {
        const draft = JSON.parse(raw) as {
          name?: string
          industry?: string
          city?: string
          phone?: string
          email?: string
          website?: string
          address?: string
          description?: string
          tier?: ListingTier
        }
        if (draft.name && typeof draft.name === 'string') {
          setName(draft.name)
          if (draft.industry) setIndustry(draft.industry)
          if (draft.city) setCity(draft.city)
          if (draft.phone) setPhone(draft.phone)
          if (draft.email) setEmail(draft.email)
          if (draft.website) setWebsite(draft.website)
          if (draft.address) setAddress(draft.address)
          if (draft.description) setDescription(draft.description)
          if (draft.tier) setTier(draft.tier)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValidPakistaniPhone(phone)) {
      toast.error('Please enter a valid Pakistani mobile number (e.g. 0300 1234567 or +92 300 1234567).')
      return
    }
    if (!user) {
      // Save the completed form so the sign-in round-trip does not
      // wipe it; /login?next= brings the user straight back here.
      try {
        sessionStorage.setItem(
          DRAFT_KEY,
          JSON.stringify({ name, industry, city, phone, email, website, address, description, tier })
        )
      } catch {
        // Storage unavailable — continue to sign-in anyway.
      }
      toast.info('Please sign in to submit your company — you will come straight back here.')
      router.push('/login?next=/add-company')
      return
    }
    setIsSubmitting(true)
    try {
      const ref = await addDoc(collection(db, 'companies'), {
        name: name.trim(),
        slug: `${slugify(name)}-${slugify(city)}`,
        industry,
        city,
        phone: normalizePakistaniPhone(phone),
        email: email.trim(),
        website: website.trim(),
        address: address.trim(),
        description: description.trim(),
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
      await writeOwnerContact('companies', ref.id, user.uid, user.email || '')
      // Saved — the payment screen follows. The submission email
      // goes out only after the payment proof is uploaded, so the
      // owner gets one confirmation for the whole submission.
      setSavedCompany({ id: ref.id, name: name.trim() })
    } catch (err: any) {
      toast.error(`Could not submit your company: ${safeErrorMessage(err)}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Payment step: the listing is saved; the buyer pays and uploads
  // the proof here. Only then does the confirmation email go out.
  if (savedCompany && user) {
    return (
      <>
        <Navbar />
        <main className="bg-[#F8FAFC] text-slate-800 font-sans min-h-screen py-16 px-4 flex items-center justify-center">
          <div className="max-w-lg w-full bg-white border border-slate-200 rounded-3xl p-5 sm:p-8 shadow-xl">
            <PaymentScreen
              tier={tier}
              listingType="company"
              listingId={savedCompany.id}
              listingName={savedCompany.name}
              ownerId={user.uid}
              ownerEmail={user.email || ''}
              onSubmitted={async () => {
                await queueSubmissionEmails({
                  kind: 'company',
                  name: savedCompany.name,
                  city,
                  ownerEmail: user.email || '',
                  ownerName: user.displayName || '',
                })
                toast.success('Company submitted for review.')
                router.push('/dashboard')
              }}
            />
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="bg-[#F8FAFC] text-slate-800 font-sans min-h-screen py-16 px-4 flex items-center justify-center">
        <div className="max-w-lg w-full">
          {authChecked && !user && (
            <div className="mb-4 p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 font-medium flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                You can fill in the form now — you will be asked to sign in when you submit.{' '}
                <Link href="/login?next=/add-company" className="text-emerald-600 font-bold hover:underline">
                  Sign in
                </Link>
                {' '}or{' '}
                <Link href="/register?next=/add-company" className="text-emerald-600 font-bold hover:underline">
                  create an account
                </Link>
                .
              </span>
            </div>
          )}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-8 shadow-xl">
          <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-2xl bg-emerald-50 text-emerald-600 mb-3">
              <Factory className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Add Your Company</h1>
            <p className="text-xs text-slate-500 mt-1">Company profile — plans from PKR 99, verified before approval</p>
            <p className="text-sm text-slate-600 mt-3 max-w-lg mx-auto">
              List your company on LocalePak so buyers across Pakistan can find your industry, city and contact
              details. Fill in the profile below — it is reviewed before it appears publicly.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={labelClass}>Company Name *</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Pak Industries (Pvt) Ltd" className={inputClass} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Industry *</label>
                <select required value={industry} onChange={(e) => setIndustry(e.target.value)} className={inputClass}>
                  <option value="" disabled>Select an industry</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>City *</label>
                <CityCombobox required value={city} onChange={setCity} className={inputClass} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Phone *</label>
                <input type="tel" inputMode="tel" required value={phone} onChange={(e) => setPhone(sanitizePhoneInput(e.target.value))} placeholder="+92 300 1234567" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="info@company.pk" className={inputClass} />
              </div>
            </div>

            <div>
              <label className={labelClass}>Website</label>
              <input type="url" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://yourcompany.pk" className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Address</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Office 303, Evacuee Trust Complex, F-5/1" className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="Tell buyers what your company does, your products or services, and your track record." className={inputClass} />
            </div>

            <TierSelect value={tier} onChange={setTier} />

            <div className="flex gap-2.5 p-3.5 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-slate-600">
              <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Your company profile goes through a quick review and appears publicly on LocalePak after approval. After saving, you will pay for your plan and upload a payment screenshot — approval follows payment verification.</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Saving...' : 'Save & Continue to Payment'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
          </div>

          <section className="mt-8" aria-label="Frequently asked questions">
            <h2 className="text-lg font-extrabold text-slate-900 mb-4">Frequently asked questions</h2>
            <div className="space-y-3">
              <div className="bg-white border border-slate-200 rounded-2xl p-5">
                <h3 className="font-bold text-slate-900 text-sm">What details do I need to add my company?</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Your company name, industry, city and phone number. Email, website, address and a description
                  are optional, but they help buyers understand what your company offers.
                </p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5">
                <h3 className="font-bold text-slate-900 text-sm">What happens after I submit my company?</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Your company profile is saved, then you pay for your plan and upload a payment screenshot.
                  Our team verifies the payment and reviews the profile — once approved, it appears publicly
                  on LocalePak.
                </p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5">
                <h3 className="font-bold text-slate-900 text-sm">Do I need an account to add a company?</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Yes. You can fill in the form first, and when you submit you will be asked to sign in or
                  create an account — you come straight back to this page afterwards, with your entries intact.
                </p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5">
                <h3 className="font-bold text-slate-900 text-sm">How do buyers find my company?</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Approved companies appear on LocalePak&apos;s companies list and in search, so buyers can find
                  you by industry and city and contact you directly.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
