import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import OwnerCtaBand from '@/components/owner-cta-band'
import { Megaphone, CheckCircle2, Clock, ArrowRight, UserPlus, ClipboardList, SearchCheck, ShieldCheck, Sparkles, BadgeCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Advertise With Us | LocalePak',
  description: 'List your business free on LocalePak today. Featured listings and a verified badge are in development — join the waitlist to be first in line.',
  alternates: {
    canonical: 'https://www.localepak.com/advertise-with-us/',
  },
}

const freeFeatures = [
  'Your own business profile page',
  'Placement in your category and your city',
  'Call and WhatsApp buttons — customers contact you directly',
  'Opening hours, services and products on your profile',
  'Links to your website and social pages',
]

const faqs = [
  {
    q: 'Is a basic listing really free?',
    a: 'Yes. Registering and submitting a business costs nothing, and there is no subscription or commission. Your listing stays free; paid extras are optional and clearly labelled when they launch.',
  },
  {
    q: 'When will Featured Listings and the Verified Badge launch?',
    a: 'They are in development. We do not publish a launch date we cannot keep — join the waitlist through the contact page and we will email you as soon as each option opens, before it is announced publicly.',
  },
  {
    q: 'What will the Verified Badge require?',
    a: 'A document check: proof that the business is real and that you are authorised to represent it — for example business registration or utility documentation in the business name, plus a working phone number we can confirm. Exact requirements will be published with the launch.',
  },
  {
    q: 'Do you guarantee rankings, leads or sales?',
    a: 'No — and you should be wary of any directory that does. A complete, accurate profile on the pages customers search is a solid foundation, but results depend on your market, your offer and how you respond to enquiries.',
  },
]

export default function AdvertiseWithUsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />
      <main id="main-content" className="flex-1">
        <section className="bg-[#0F172A] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <Megaphone className="w-3.5 h-3.5" /> Advertise on LocalePak
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Put Your Business Where Customers Look
            </h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              LocalePak is a new, growing business directory for Pakistan. Here is the honest picture:
              a free listing is available right now, and paid visibility options are being built.
              No invented audience numbers — just what each option actually includes.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
              <Link href="/add-business" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-colors">
                List Your Business — Free <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl border border-white/20 transition-colors">
                Join the Waitlist
              </Link>
            </div>
          </div>
        </section>

        {/* Packages */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Packages</h2>
            <p className="text-sm text-slate-500 max-w-xl mx-auto">
              One option is live today. The other two are on the roadmap — clearly labelled,
              with a waitlist instead of a checkout.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Free Listing */}
            <div className="bg-white rounded-3xl border-2 border-emerald-500 p-8 flex flex-col space-y-5 shadow-sm">
              <div className="space-y-1.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-[11px] font-extrabold uppercase tracking-wide">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Available now
                </span>
                <h3 className="text-xl font-extrabold text-slate-900">Free Listing</h3>
                <p className="text-3xl font-extrabold text-slate-900">Free</p>
              </div>
              <ul className="space-y-2.5 text-sm text-slate-600 flex-1">
                {freeFeatures.map((f) => (
                  <li key={f} className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link href="/add-business" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-colors">
                Add Your Business <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Featured Listing */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 flex flex-col space-y-5">
              <div className="space-y-1.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-100 text-[11px] font-extrabold uppercase tracking-wide">
                  <Clock className="w-3.5 h-3.5" /> Launching soon
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" /> Featured Listing
                </h3>
                <p className="text-sm font-bold text-slate-500">Pricing announced at launch</p>
              </div>
              <ul className="space-y-2.5 text-sm text-slate-600 flex-1">
                <li className="flex gap-2"><Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" /><span>Placement on the homepage and category pages</span></li>
                <li className="flex gap-2"><Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" /><span>Priority position within your category and city</span></li>
                <li className="flex gap-2"><Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" /><span>A "Featured" label on your profile</span></li>
              </ul>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-colors">
                Join the Waitlist <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Verified Badge */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 flex flex-col space-y-5">
              <div className="space-y-1.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-100 text-[11px] font-extrabold uppercase tracking-wide">
                  <Clock className="w-3.5 h-3.5" /> Launching soon
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <BadgeCheck className="w-5 h-5 text-emerald-600" /> Verified Badge
                </h3>
                <p className="text-sm font-bold text-slate-500">Pricing announced at launch</p>
              </div>
              <ul className="space-y-2.5 text-sm text-slate-600 flex-1">
                <li className="flex gap-2"><ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /><span>A document check of your business registration</span></li>
                <li className="flex gap-2"><ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /><span>A verified badge shown on your profile</span></li>
                <li className="flex gap-2"><ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /><span>Extra trust signals for customers comparing providers</span></li>
              </ul>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-colors">
                Join the Waitlist <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200/80">
          <div className="max-w-5xl mx-auto space-y-8">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight text-center">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-3xl border border-slate-200 p-7 space-y-3">
                <UserPlus className="w-8 h-8 text-emerald-600" />
                <h3 className="font-extrabold text-slate-900">1. Register</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Create your free LocalePak account with your name, email and a Pakistani phone number.
                </p>
                <Link href="/register" className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 hover:underline">
                  Create free account <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="rounded-3xl border border-slate-200 p-7 space-y-3">
                <ClipboardList className="w-8 h-8 text-emerald-600" />
                <h3 className="font-extrabold text-slate-900">2. Add your business</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Complete the eight-step form — contact details, category, location, hours, services
                  and products. It takes a few minutes and you can update it later.
                </p>
                <Link href="/add-business" className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 hover:underline">
                  Start the form <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="rounded-3xl border border-slate-200 p-7 space-y-3">
                <SearchCheck className="w-8 h-8 text-emerald-600" />
                <h3 className="font-extrabold text-slate-900">3. Get discovered</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Our team reviews your submission. Once approved, your profile goes live immediately, and then appears in your
                  category, your city and search — customers call or WhatsApp you directly.
                </p>
                <Link href="/business-listing-guidelines" className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 hover:underline">
                  Read the listing guidelines <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight text-center">Advertising FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">{faq.q}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mt-2">{faq.a}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-slate-500">
            Questions about how listings are checked? Read our{' '}
            <Link href="/verification-policy" className="text-emerald-600 font-semibold hover:underline">verification policy</Link>{' '}
            and{' '}
            <Link href="/editorial-policy" className="text-emerald-600 font-semibold hover:underline">editorial policy</Link>.
          </p>
        </section>

        <OwnerCtaBand
          title="Start with the free listing today."
          text="Paid visibility is coming later — your free profile is available now. Register, add your business, and be listed from the start."
          links={[
            { label: 'Browse businesses', href: '/businesses' },
            { label: 'Browse companies', href: '/companies' },
            { label: 'Listing guidelines', href: '/business-listing-guidelines' },
            { label: 'FAQs', href: '/faqs' },
          ]}
        />
      </main>
      <Footer />
    </div>
  )
}
