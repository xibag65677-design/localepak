import { Metadata } from 'next'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Editorial Policy | LocalePak - Pakistan Business Directory',
  description: 'Our standards for publishing, reviewing, and fact-checking business listings, blogs, and market insights on LocalePak.',
  alternates: {
    canonical: 'https://www.localepak.com/editorial-policy/',
  },
}

export default function EditorialPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#F8FAFC] text-slate-800 font-sans min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Editorial & Publishing Policy
          </h1>
          <p className="text-sm text-slate-500 mb-8 border-b border-slate-100 pb-4">
            Last Updated: August 2026 • LocalePak Enterprise Ecosystem
          </p>

          <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
            <p>
              At <strong>LocalePak</strong>, we are committed to maintaining the highest level of integrity, accuracy, and trustworthiness across all published articles, business profiles, and city marketplace guides.
            </p>

            <h2 className="text-xl font-bold text-slate-900 pt-4">1. Content Verification</h2>
            <p>
              Every business submission is reviewed by our team before it goes public. We check that the business name is genuine, the phone number is a real, working number in the right format, and the category and city match what the business actually does.
            </p>

            <h2 className="text-xl font-bold text-slate-900 pt-4">2. Independence & Objectivity</h2>
            <p>
              Paid listings or advertising partnerships, when they launch, will not influence which listings are approved or which reviews are shown. Featured placement and the Verified Badge are launching soon; when they open, the Verified Badge will involve a document check of the business.
            </p>

            <h2 className="text-xl font-bold text-slate-900 pt-4">3. Corrections & Updates</h2>
            <p>
              If a business listing or published guide contains factual errors, users and owners can submit correction requests through our <a href="/contact" className="text-emerald-600 underline">Contact Portal</a> for immediate audit.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
