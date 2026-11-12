import { Metadata } from 'next'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Community Guidelines | LocalePak - Pakistan Business Hub',
  description: 'Standards of conduct for business owners, job seekers, employers, and consumers engaging on LocalePak.',
  alternates: {
    canonical: 'https://www.localepak.com/community-guidelines/',
  },
}

export default function CommunityGuidelinesPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#F8FAFC] text-slate-800 font-sans min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Community Guidelines
          </h1>
          <p className="text-sm text-slate-500 mb-8 border-b border-slate-100 pb-4">
            Last Updated: August 2026 • LocalePak Enterprise Ecosystem
          </p>

          <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
            <p>
              LocalePak is dedicated to fostering a safe, professional, and respectful ecosystem for businesses, job seekers, and consumers across Pakistan.
            </p>

            <h2 className="text-xl font-bold text-slate-900 pt-4">1. Authentic Reviews & Feedback</h2>
            <p>
              Reviews must reflect genuine consumer experiences. Fake reviews, competitor sabotage, or incentivized feedback are strictly prohibited.
            </p>

            <h2 className="text-xl font-bold text-slate-900 pt-4">2. Zero Tolerance for Spam & Harassment</h2>
            <p>
              Unsolicited commercial messages, abusive language, hate speech, or deceptive business claims will result in immediate profile suspension.
            </p>

            <h2 className="text-xl font-bold text-slate-900 pt-4">3. Reporting Violations</h2>
            <p>
              To report suspicious behavior or policy violations, please use our <a href="/report-abuse" className="text-emerald-600 underline">Report Abuse Portal</a>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
