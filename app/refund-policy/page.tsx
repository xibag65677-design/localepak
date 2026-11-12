import { Metadata } from 'next'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Refund Policy | LocalePak Commercial & Premium Services',
  description: 'Terms and conditions governing refunds for premium business verification, advertising banners, and promoted job posts.',
  alternates: {
    canonical: 'https://www.localepak.com/refund-policy/',
  },
}

export default function RefundPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#F8FAFC] text-slate-800 font-sans min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Refund & Cancellation Policy
          </h1>
          <p className="text-sm text-slate-500 mb-8 border-b border-slate-100 pb-4">
            Last Updated: August 2026 • LocalePak Enterprise Ecosystem
          </p>

          <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
            <p>
              Standard business listings on LocalePak are 100% free forever. For paid promotional services (such as featured banner placements, boosted job posts, or express NTN verification badges), this policy outlines eligible refund scenarios.
            </p>

            <h2 className="text-xl font-bold text-slate-900 pt-4">1. Eligibility for Refund</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Service Non-Delivery:</strong> If a paid advertisement or promoted placement is not activated within 48 hours of payment receipt.</li>
              <li><strong>Duplicate Payment:</strong> Accidental double billing for the same promotional order.</li>
            </ul>

            <h2 className="text-xl font-bold text-slate-900 pt-4">2. Non-Refundable Items</h2>
            <p>
              Once a featured job opening or banner ad campaign has actively launched and received impressions, fees are non-refundable.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
