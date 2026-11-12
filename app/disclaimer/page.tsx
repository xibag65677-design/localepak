import { Metadata } from 'next'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Disclaimer | LocalePak - Pakistan Business Ecosystem',
  description: 'Legal disclaimer for LocalePak business directory listings, professional talent profiles, job postings, and third-party content accuracy.',
  alternates: {
    canonical: 'https://www.localepak.com/disclaimer/',
  },
}

export default function DisclaimerPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#F8FAFC] text-slate-800 font-sans min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Disclaimer
          </h1>
          <p className="text-sm text-slate-500 mb-8 border-b border-slate-100 pb-4">
            Last Updated: August 2026 • LocalePak Enterprise Ecosystem
          </p>

          <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
            <p>
              The information provided by <strong>LocalePak</strong> (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) on <a href="https://www.localepak.com/" className="text-emerald-600 underline">https://www.localepak.com/</a> is for general informational and commercial directory purposes only.
            </p>

            <h2 className="text-xl font-bold text-slate-900 pt-4">1. Information Accuracy</h2>
            <p>
              While we strive to keep business details, addresses, contacts, and job openings accurate and up-to-date, LocalePak makes no representation or warranty of any kind, express or implied, regarding the completeness or accuracy of third-party user listings.
            </p>

            <h2 className="text-xl font-bold text-slate-900 pt-4">2. Professional Advice Disclaimer</h2>
            <p>
              Listings related to legal, medical, financial, or engineering professionals do not constitute professional advice. Users should perform independent verification before engaging service providers.
            </p>

            <h2 className="text-xl font-bold text-slate-900 pt-4">3. External Links Disclaimer</h2>
            <p>
              LocalePak may contain links to external third-party websites. We do not monitor, endorse, or guarantee the content or privacy practices of these external sites.
            </p>

            <h2 className="text-xl font-bold text-slate-900 pt-4">4. Limitation of Liability</h2>
            <p>
              In no event shall LocalePak be liable for any special, direct, indirect, or consequential damages arising out of or in connection with the use of our website or services.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
