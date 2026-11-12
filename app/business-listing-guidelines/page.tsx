import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import OwnerCtaBand from '@/components/owner-cta-band'

export const metadata: Metadata = {
  title: 'Business Listing Guidelines | LocalePak',
  description: 'Requirements for adding your company, shop, or professional service to LocalePak free business directory.',
  alternates: {
    canonical: 'https://www.localepak.com/business-listing-guidelines/',
  },
}

export default function BusinessListingGuidelinesPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#F8FAFC] text-slate-800 font-sans min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Business Listing Guidelines
          </h1>
          <p className="text-sm text-slate-500 mb-8 border-b border-slate-100 pb-4">
            Last Updated: August 2026 • LocalePak Enterprise Ecosystem
          </p>

          <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
            <p>
              To keep search quality high for Pakistani enterprises, business owners must adhere to the following listing criteria when submitting their profile to LocalePak.
            </p>

            <h2 className="text-xl font-bold text-slate-900 pt-4">1. Eligible Businesses</h2>
            <p>
              Any legally operating business, professional service provider, retail store, educational institute, healthcare provider, or tech company located in Pakistan is eligible for listing.
            </p>

            <h2 className="text-xl font-bold text-slate-900 pt-4">2. Accurate NAP Information</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Business Name:</strong> Must match your official trade name without keyword stuffing.</li>
              <li><strong>Address:</strong> Accurate physical address including street, area, and city.</li>
              <li><strong>Phone & WhatsApp:</strong> Valid Pakistani telephone number for customer inquiries.</li>
            </ul>

            <h2 className="text-xl font-bold text-slate-900 pt-4">3. Prohibited Content</h2>
            <p>
              Listings promoting illegal activities, adult content, unauthorized financial schemes, or misleading medical claims will be rejected by our review team.
            </p>

            <h2 className="text-xl font-bold text-slate-900 pt-4">4. How Submission Works — The 8 Steps</h2>
            <p>
              Every listing follows the same path, so the process is predictable:
            </p>
            <ol className="list-decimal pl-5 space-y-2">
              <li><strong>Basic Info</strong> — business name, contact email and phone number.</li>
              <li><strong>Categories</strong> — one main category, plus a secondary category if you truly offer a second trade.</li>
              <li><strong>Location</strong> — city, area and street address, with an optional Google Maps link.</li>
              <li><strong>Business Hours</strong> — opening and closing times for each day.</li>
              <li><strong>Services</strong> — the individual services customers can ask for.</li>
              <li><strong>Products</strong> — optional key products, with prices where you want them shown.</li>
              <li><strong>Online Presence</strong> — website and social links; WhatsApp defaults to your phone number.</li>
              <li><strong>Description & Publish</strong> — your description, then submit. The listing enters our review queue as <em>pending</em>.</li>
            </ol>

            <h2 className="text-xl font-bold text-slate-900 pt-4">5. What Makes a Listing Get Approved</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Accurate information.</strong> The name, address and services describe the real business — nothing borrowed from another company.</li>
              <li><strong>A real, reachable phone.</strong> A working Pakistani number that the business itself answers; it becomes your public call and WhatsApp button.</li>
              <li><strong>The correct category and city.</strong> A plumber listed under Restaurants in the wrong city helps no one and will be sent back.</li>
              <li><strong>An honest description.</strong> Written about your business, in your own words — no keyword stuffing, no copied text, no claims you cannot support.</li>
              <li><strong>No spam.</strong> One listing per real business location. Duplicate submissions for the same business are removed.</li>
            </ul>
            <p>
              Listings are owner-submitted and reviewed by our team before they appear. Approval means the
              submission passed these checks — it is not an endorsement, and LocalePak does not guarantee
              rankings, enquiries or sales for any listing. Read the full{' '}
              <Link href="/verification-policy" className="text-emerald-600 font-semibold hover:underline">verification policy</Link>{' '}
              for how checks work, and the{' '}
              <Link href="/help-center" className="text-emerald-600 font-semibold hover:underline">help center</Link>{' '}
              for a step-by-step walkthrough.
            </p>
          </div>
        </div>
      </main>
      <div className="pt-12">
        <OwnerCtaBand
          title="Ready to submit your listing?"
          text="Follow the eight steps, keep the details accurate, and your listing has the smoothest path through review."
          links={[
            { label: 'Help center', href: '/help-center' },
            { label: 'FAQs', href: '/faqs' },
            { label: 'Verification policy', href: '/verification-policy' },
          ]}
        />
      </div>
      <Footer />
    </>
  )
}
