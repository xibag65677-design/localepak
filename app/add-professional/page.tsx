'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { UserRound, ArrowRight, Info } from 'lucide-react'
import { toast } from 'sonner'
import { safeErrorMessage } from '@/lib/user-error'
import { getFirebaseAuth, db } from '@/lib/firebase'
import { onAuthStateChanged, User } from 'firebase/auth'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import CityCombobox from '@/components/city-combobox'
import { isValidPakistaniPhone, normalizePakistaniPhone, sanitizePhoneInput, isValidUrl, normalizeUrl } from '@/lib/validation'
import { PROFESSIONS, PROFESSION_OTHER } from '@/lib/professions'
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

const inputClass =
  'w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-sm focus:outline-none focus:border-emerald-600'
const labelClass = 'block text-xs font-bold text-slate-700 mb-1'

export default function AddProfessionalPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [name, setName] = useState('')
  const [profession, setProfession] = useState('')
  const [customProfession, setCustomProfession] = useState('')
  const [specialization, setSpecialization] = useState('')
  const [city, setCity] = useState('')
  const [phone, setPhone] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [experience, setExperience] = useState('')
  const [address, setAddress] = useState('')
  const [description, setDescription] = useState('')
  const [headline, setHeadline] = useState('')
  const [skills, setSkills] = useState('')
  const [services, setServices] = useState('')
  const [education, setEducation] = useState('')
  const [languages, setLanguages] = useState('')
  const [githubUrl, setGithubUrl] = useState('')
  const [linkedinUrl, setLinkedinUrl] = useState('')
  const [facebookUrl, setFacebookUrl] = useState('')
  const [portfolioUrl, setPortfolioUrl] = useState('')
  const [tier, setTier] = useState<ListingTier>('basic')
  // Saved at the last step: the profile waits here until the payment
  // proof is uploaded on the payment screen below.
  const [savedProfile, setSavedProfile] = useState<{ id: string; name: string } | null>(null)

  useEffect(() => {
    let unsub: (() => void) | undefined
    getFirebaseAuth().then((a) => {
      unsub = onAuthStateChanged(a, (u) => {
        if (!u) {
          router.push('/login')
          return
        }
        setUser(u)
        setAuthLoading(false)
      })
    })
    return () => unsub?.()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    // "Other" means the user types their own profession freehand.
    const finalProfession = profession === PROFESSION_OTHER ? customProfession.trim() : profession
    if (!finalProfession) {
      toast.error('Please choose a profession, or select Other and type your own.')
      return
    }
    if (!isValidPakistaniPhone(phone)) {
      toast.error('Please enter a valid Pakistani mobile number (e.g. 0300 1234567 or +92 300 1234567).')
      return
    }
    if (whatsapp && !isValidPakistaniPhone(whatsapp)) {
      toast.error('Please enter a valid Pakistani WhatsApp number, or leave it blank to use your phone number.')
      return
    }
    const linkChecks: Array<[string, string]> = [
      ['GitHub', githubUrl],
      ['LinkedIn', linkedinUrl],
      ['Facebook', facebookUrl],
      ['Portfolio', portfolioUrl],
    ]
    for (const [label, value] of linkChecks) {
      if (!isValidUrl(value)) {
        toast.error(`Please enter a valid ${label} link (e.g. github.com/yourname), or leave it blank.`)
        return
      }
    }
    setIsSubmitting(true)
    try {
      const ref = await addDoc(collection(db, 'professionals'), {
        name: name.trim(),
        slug: `${slugify(name)}-${slugify(city)}`,
        profession: finalProfession,
        specialization: specialization.trim(),
        city,
        phone: normalizePakistaniPhone(phone),
        whatsapp: whatsapp.trim() ? normalizePakistaniPhone(whatsapp) : normalizePakistaniPhone(phone),
        experience: experience.trim(),
        address: address.trim(),
        description: description.trim(),
        headline: headline.trim(),
        skills: skills.trim(),
        services: services.trim(),
        education: education.trim(),
        languages: languages.trim(),
        githubUrl: normalizeUrl(githubUrl),
        linkedinUrl: normalizeUrl(linkedinUrl),
        facebookUrl: normalizeUrl(facebookUrl),
        portfolioUrl: normalizeUrl(portfolioUrl),
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
      await writeOwnerContact('professionals', ref.id, user.uid, user.email || '')
      // Saved — the payment screen follows. The submission email
      // goes out only after the payment proof is uploaded.
      setSavedProfile({ id: ref.id, name: name.trim() })
    } catch (err: any) {
      toast.error(`Could not submit your profile: ${safeErrorMessage(err)}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (authLoading) {
    return (
      <>
        <Navbar />
        <main className="bg-[#F8FAFC] min-h-screen py-16 px-4 flex items-center justify-center">
          <p className="text-sm text-slate-400">Loading...</p>
        </main>
        <Footer />
      </>
    )
  }

  // Payment step: the profile is saved; the buyer pays and uploads
  // the proof here. Only then does the confirmation email go out.
  if (savedProfile && user) {
    return (
      <>
        <Navbar />
        <main className="bg-[#F8FAFC] text-slate-800 font-sans min-h-screen py-16 px-4 flex items-center justify-center">
          <div className="max-w-lg w-full bg-white border border-slate-200 rounded-3xl p-5 sm:p-8 shadow-xl">
            <PaymentScreen
              tier={tier}
              listingType="professional"
              listingId={savedProfile.id}
              listingName={savedProfile.name}
              ownerId={user.uid}
              ownerEmail={user.email || ''}
              onSubmitted={async () => {
                await queueSubmissionEmails({
                  kind: 'professional',
                  name: savedProfile.name,
                  city,
                  ownerEmail: user.email || '',
                  ownerName: user.displayName || '',
                })
                toast.success('Professional profile submitted for review.')
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
        <div className="max-w-lg w-full bg-white border border-slate-200 rounded-3xl p-5 sm:p-8 shadow-xl">
          <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-2xl bg-emerald-50 text-emerald-600 mb-3">
              <UserRound className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Add Your Professional Profile</h1>
            <p className="text-xs text-slate-500 mt-1">Professional profile — plans from PKR 99, verified before approval</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={labelClass}>Full Name *</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Ahmed Raza" className={inputClass} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Profession *</label>
                <select required value={profession} onChange={(e) => setProfession(e.target.value)} className={inputClass}>
                  <option value="" disabled>Choose your profession...</option>
                  {PROFESSIONS.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                  <option value={PROFESSION_OTHER}>Other (type your own)</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Specialization</label>
                <input type="text" value={specialization} onChange={(e) => setSpecialization(e.target.value)} placeholder="Cardiologist, Web Developer..." className={inputClass} />
              </div>
            </div>

            {profession === PROFESSION_OTHER && (
              <div>
                <label className={labelClass}>Your Profession *</label>
                <input type="text" required value={customProfession} onChange={(e) => setCustomProfession(e.target.value)} placeholder="Type your profession..." className={inputClass} />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>City *</label>
                <CityCombobox required value={city} onChange={setCity} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Experience</label>
                <input type="text" value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="8 years" className={inputClass} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Phone *</label>
                <input type="tel" inputMode="tel" required value={phone} onChange={(e) => setPhone(sanitizePhoneInput(e.target.value))} placeholder="+92 300 1234567" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>WhatsApp</label>
                <input type="tel" inputMode="tel" value={whatsapp} onChange={(e) => setWhatsapp(sanitizePhoneInput(e.target.value))} placeholder="Same as phone if blank" className={inputClass} />
              </div>
            </div>

            <div>
              <label className={labelClass}>Address / Clinic / Office</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Clinic 4, Main Boulevard, Gulberg III" className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>About You</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="Your services, qualifications, and experience — what should clients know before they call?" className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Headline / Tagline</label>
              <input type="text" value={headline} onChange={(e) => setHeadline(e.target.value)} maxLength={120} placeholder="e.g. Helping businesses rank #1 on Google" className={inputClass} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Skills (comma separated)</label>
                <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="SEO, WordPress, Google Ads" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Education / Qualification</label>
                <input type="text" value={education} onChange={(e) => setEducation(e.target.value)} placeholder="MBBS, BS Computer Science..." className={inputClass} />
              </div>
            </div>

            <div>
              <label className={labelClass}>Services Offered</label>
              <textarea value={services} onChange={(e) => setServices(e.target.value)} rows={2} placeholder="What services do you offer? One per line or comma separated." className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Languages</label>
              <input type="text" value={languages} onChange={(e) => setLanguages(e.target.value)} placeholder="Urdu, English, Punjabi" className={inputClass} />
            </div>

            <div className="space-y-4">
              <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Profile Links (optional)</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>GitHub</label>
                  <input type="text" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} placeholder="github.com/yourname" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>LinkedIn</label>
                  <input type="text" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} placeholder="linkedin.com/in/yourname" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Facebook</label>
                  <input type="text" value={facebookUrl} onChange={(e) => setFacebookUrl(e.target.value)} placeholder="facebook.com/yourname" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Portfolio / Website</label>
                  <input type="text" value={portfolioUrl} onChange={(e) => setPortfolioUrl(e.target.value)} placeholder="yourwebsite.com" className={inputClass} />
                </div>
              </div>
            </div>

            <TierSelect value={tier} onChange={setTier} />

            <div className="flex gap-2.5 p-3.5 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-slate-600">
              <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Your professional profile goes through a quick review and appears publicly on LocalePak after approval. After saving, you will pay for your plan and upload a payment screenshot — approval follows payment verification.</span>
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
      </main>
      <Footer />
    </>
  )
}
