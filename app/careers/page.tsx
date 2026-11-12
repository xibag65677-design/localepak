import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Briefcase, Building2, MapPin, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Careers at LocalePak | Join Pakistan Digital Business Platform',
  description: 'Explore career opportunities at LocalePak. Help build Pakistan\'s free digital business and employment ecosystem.',
  alternates: {
    canonical: 'https://www.localepak.com/careers/',
  },
}

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#F8FAFC] text-slate-800 font-sans min-h-screen pb-16">
        <section className="bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white py-16 text-center border-b border-slate-800">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Build the Future of Digital Pakistan
            </h1>
            <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
              LocalePak is a small, founder-led team, and we have no open roles right now. The roles below
              describe the kind of help we expect to hire for as the directory grows — speculative
              applications are welcome in the meantime.
            </p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 py-12 space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-3">Open Positions at LocalePak HQ</h2>
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">Engineering</span>
              <h3 className="font-bold text-slate-900 text-lg mt-2">Senior Full Stack Engineer</h3>
              <p className="text-xs text-slate-500 flex items-center gap-3 mt-1">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> Islamabad / Remote</span>
                <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5 text-slate-400" /> Full Time</span>
              </p>
            </div>
            <Link href="/contact" className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-colors shrink-0">
              Apply via Contact
            </Link>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">Growth & SEO</span>
              <h3 className="font-bold text-slate-900 text-lg mt-2">SEO & Content Operations Lead</h3>
              <p className="text-xs text-slate-500 flex items-center gap-3 mt-1">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> Islamabad HQ</span>
                <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5 text-slate-400" /> Full Time</span>
              </p>
            </div>
            <Link href="/contact" className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-colors shrink-0">
              Apply via Contact
            </Link>
          </div>

          <div className="pt-8 text-center text-xs text-slate-500">
            Don&apos;t see your role? Submit your resume to <a href="mailto:careers@localepak.com" className="text-emerald-600 underline font-medium">careers@localepak.com</a> for future consideration.
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
