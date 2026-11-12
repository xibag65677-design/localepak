import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Headphones, Mail, Phone, MessageSquare } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Customer Support | LocalePak Desk',
  description: 'Connect with the LocalePak support desk for help with business listings, listing reviews, and directory inquiries.',
  alternates: {
    canonical: 'https://www.localepak.com/support/',
  },
}

export default function SupportPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#F8FAFC] text-slate-800 font-sans min-h-screen pb-16">
        <section className="bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white py-16 text-center border-b border-slate-800">
          <div className="max-w-4xl mx-auto px-4">
            <Headphones className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              LocalePak Customer Support Desk
            </h1>
            <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
              Our support team is available 6 days a week to help resolve platform issues and answer directory questions.
            </p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Need Immediate Assistance?</h2>
            <p className="text-sm text-slate-600 mb-6">Choose your preferred channel below or submit an online support inquiry.</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <Phone className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                <h4 className="font-bold text-slate-900 text-sm">Helpline</h4>
                <p className="text-xs text-slate-500 mt-1">+92 334 5636230</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <Mail className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                <h4 className="font-bold text-slate-900 text-sm">Email Support</h4>
                <p className="text-xs text-slate-500 mt-1">admin@localepak.com</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <MessageSquare className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                <h4 className="font-bold text-slate-900 text-sm">WhatsApp</h4>
                <p className="text-xs text-slate-500 mt-1">+92 334 5636230</p>
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-colors shadow-md"
            >
              Open Support Ticket
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
