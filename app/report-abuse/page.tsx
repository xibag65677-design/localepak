import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { ShieldAlert } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Report Abuse | LocalePak Safety & Compliance',
  description: 'Report spam, harassment, counterfeit listings, copyright violations, or abusive behavior on LocalePak.',
  alternates: {
    canonical: 'https://www.localepak.com/report-abuse/',
  },
}

export default function ReportAbusePage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#F8FAFC] text-slate-800 font-sans min-h-screen pb-16">
        <section className="bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white py-16 text-center border-b border-slate-800">
          <div className="max-w-4xl mx-auto px-4">
            <ShieldAlert className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Report Abuse & Compliance Concerns
            </h1>
            <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
              We take copyright infringement, spam, and abusive behavior seriously.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 py-12">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-slate-900">Abuse Reporting Categories</h2>
            
            <div className="space-y-3 text-xs sm:text-sm text-slate-600">
              <div className="p-4 bg-red-50/50 rounded-xl border border-red-100">
                <h3 className="font-bold text-red-900">Copyright & Trademark Infringement</h3>
                <p className="mt-1">DMCA notices regarding unauthorized brand logos, photos, or text assets.</p>
              </div>

              <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                <h3 className="font-bold text-amber-900">Spam & Automated Harassment</h3>
                <p className="mt-1">Deceptive messaging, phishing links, or artificial bot listings.</p>
              </div>
            </div>

            <div className="pt-4 text-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl transition-colors shadow-md"
              >
                Submit Immediate Abuse Notice
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
