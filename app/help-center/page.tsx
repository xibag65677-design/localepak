import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import OwnerCtaBand from '@/components/owner-cta-band'
import { LifeBuoy, UserPlus, ClipboardList, Building2, Briefcase, ShieldCheck, Star, Mail, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'LocalePak Help Center – Listings, Jobs & Account Help',
  description: 'LocalePak help, step by step: create an account, add a business or company, post a job, learn how approval and verification work, and contact support.',
  alternates: {
    canonical: 'https://www.localepak.com/help-center/',
  },
}

const steps = [
  { n: 1, title: 'Basic Info', text: 'Your business name, email and phone number. Use a number customers can actually reach — it becomes your call button.' },
  { n: 2, title: 'Categories', text: 'Pick the main category that best matches what you do, plus a secondary one if you genuinely offer a second trade.' },
  { n: 3, title: 'Location', text: 'Your city, area and street address, with an optional Google Maps link so customers can navigate to you.' },
  { n: 4, title: 'Business Hours', text: 'Opening and closing times for each day of the week. Accurate hours prevent wasted trips and angry calls.' },
  { n: 5, title: 'Services', text: 'List the individual services you provide — this is what customers scan first when comparing profiles.' },
  { n: 6, title: 'Products', text: 'Optionally list key products with prices, so shoppers know what you stock before they visit.' },
  { n: 7, title: 'Online Presence', text: 'Your website and social links, so customers can check you out further. Your WhatsApp number defaults to your phone number.' },
  { n: 8, title: 'Description & Publish', text: 'A clear description of what your business does and who it serves — then submit for review.' },
]

export default function HelpCenterPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />
      <main id="main-content" className="flex-1">
        <section className="bg-[#0F172A] text-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <LifeBuoy className="w-3.5 h-3.5" /> Help Center
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">How Can We Help?</h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Practical guides for using LocalePak — whether you are finding a local business,
              listing your own, or hiring. Start with the section that matches your question.
            </p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 space-y-12">
          {/* Getting started */}
          <section className="space-y-4">
            <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2.5">
              <UserPlus className="w-6 h-6 text-emerald-600" /> Getting Started
            </h2>
            <div className="bg-white rounded-3xl border border-slate-200 p-7 space-y-3 text-sm text-slate-600 leading-relaxed">
              <p>
                <strong className="text-slate-900">Finding a business needs no account.</strong> Browse by{' '}
                <Link href="/categories" className="text-emerald-600 font-semibold hover:underline">category</Link> or{' '}
                <Link href="/cities" className="text-emerald-600 font-semibold hover:underline">city</Link>, open a profile,
                and call or WhatsApp the business directly — LocalePak never sits between you and the business,
                and never charges you for an enquiry.
              </p>
              <p>
                <strong className="text-slate-900">Listing a business starts with a free account.</strong>{' '}
                <Link href="/register" className="text-emerald-600 font-semibold hover:underline">Register</Link> with your
                owner name, email and a Pakistani mobile number, and choose a password of at least eight characters
                mixing letters, numbers and a special character. Then{' '}
                <Link href="/login" className="text-emerald-600 font-semibold hover:underline">log in</Link> to reach your
                personal dashboard. Your dashboard is private to your account and shows only your own listings.
              </p>
            </div>
          </section>

          {/* Adding a business */}
          <section className="space-y-4">
            <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2.5">
              <ClipboardList className="w-6 h-6 text-emerald-600" /> Adding a Business — The 8 Steps
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              From your dashboard, choose <strong className="text-slate-900">Add Business</strong>. The form walks you
              through eight short steps. You can move back and forth before submitting, so nothing is final until step 8.
            </p>
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {steps.map((step) => (
                <li key={step.n} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-1.5">
                  <h3 className="font-bold text-slate-900 text-sm">
                    <span className="text-emerald-600">Step {step.n}:</span> {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.text}</p>
                </li>
              ))}
            </ol>
            <p className="text-sm text-slate-600 leading-relaxed">
              After you submit, the listing is marked <em>pending</em> in your dashboard. Read the{' '}
              <Link href="/business-listing-guidelines" className="text-emerald-600 font-semibold hover:underline">listing guidelines</Link>{' '}
              before submitting to give your listing the smoothest path through review.
            </p>
          </section>

          {/* Companies & jobs */}
          <section className="space-y-4">
            <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2.5">
              <Building2 className="w-6 h-6 text-emerald-600" /> Companies &amp; Jobs
            </h2>
            <div className="bg-white rounded-3xl border border-slate-200 p-7 space-y-3 text-sm text-slate-600 leading-relaxed">
              <p>
                <strong className="text-slate-900">Add Company</strong> creates a company profile — suited to
                registered firms, agencies and larger organisations. Approved companies appear in the{' '}
                <Link href="/companies" className="text-emerald-600 font-semibold hover:underline">companies directory</Link>{' '}
                with their industry, city and contact details.
              </p>
              <p>
                <strong className="text-slate-900">Post a Job</strong> is also on your dashboard. Add the role title,
                company, city, job type and how candidates should apply. Like listings, jobs are reviewed before
                they appear — write the description yourself, state the real requirements, and never charge
                candidates a fee to apply.
              </p>
              <p className="flex items-start gap-2">
                <Briefcase className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Your dashboard groups everything you have submitted — businesses, companies and jobs — each with its current status.</span>
              </p>
            </div>
          </section>

          {/* Verification & approval */}
          <section className="space-y-4">
            <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2.5">
              <ShieldCheck className="w-6 h-6 text-emerald-600" /> Verification &amp; Approval
            </h2>
            <div className="bg-white rounded-3xl border border-slate-200 p-7 space-y-3 text-sm text-slate-600 leading-relaxed">
              <p>
                Every submission is reviewed by a person on our team before it goes public. We check that the
                business name is genuine, the phone number is a real, working number in the right format, the
                category and city match what the business actually does, and the description is about the business —
                not keyword stuffing or copied text. We aim to check most submissions within a few working days;
                that is an aim, not a guaranteed timeframe.
              </p>
              <p>
                If a submission is not approved, it usually needs a fixable correction — a wrong category, an
                unreachable phone number, or details that do not match. Correct the issue and resubmit, or contact
                us and we will explain what we found. Our full standards are in the{' '}
                <Link href="/verification-policy" className="text-emerald-600 font-semibold hover:underline">verification policy</Link>{' '}
                and{' '}
                <Link href="/editorial-policy" className="text-emerald-600 font-semibold hover:underline">editorial policy</Link>.
              </p>
              <p className="flex items-start gap-2">
                <Star className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  Customer reviews are moderated the same way: they are held as pending and only appear on a
                  business profile after a team check, which keeps ratings honest.
                </span>
              </p>
            </div>
          </section>

          {/* Contact support */}
          <section className="space-y-4">
            <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2.5">
              <Mail className="w-6 h-6 text-emerald-600" /> Contact Support
            </h2>
            <div className="bg-white rounded-3xl border border-slate-200 p-7 space-y-3 text-sm text-slate-600 leading-relaxed">
              <p>
                Still stuck? Message us through the{' '}
                <Link href="/contact" className="text-emerald-600 font-semibold hover:underline">contact page</Link> or the{' '}
                <Link href="/support" className="text-emerald-600 font-semibold hover:underline">support page</Link>.
                Include the page URL and the name of the listing involved — that one detail saves a full round
                of back-and-forth. To report a listing that looks fake, closed or abusive, use{' '}
                <Link href="/report-abuse" className="text-emerald-600 font-semibold hover:underline">Report Abuse</Link>{' '}
                so it reaches the review queue directly.
              </p>
              <p>
                Common questions are answered faster in the{' '}
                <Link href="/faqs" className="text-emerald-600 font-semibold hover:underline">FAQs</Link> — check there
                first for approval timing, the verified badge, and how reviews work.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors">
                Contact Support <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>
        </div>

        <OwnerCtaBand
          title="Ready to list your business?"
          text="It is free, it takes a few minutes, and your profile goes in front of customers searching your category and city. Register, complete the eight steps, and we handle the review."
          links={[
            { label: 'Listing guidelines', href: '/business-listing-guidelines' },
            { label: 'FAQs', href: '/faqs' },
            { label: 'Browse businesses', href: '/businesses' },
            { label: 'Verification policy', href: '/verification-policy' },
          ]}
        />
      </main>
      <Footer />
    </div>
  )
}
