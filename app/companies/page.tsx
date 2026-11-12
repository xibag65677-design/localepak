import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Factory, MapPin, Phone, ArrowRight } from 'lucide-react'
import { getApprovedCompanyCards } from '@/lib/public-listings'

export const metadata: Metadata = {
  title: 'Companies in Pakistan – List of Companies, Suppliers & Manufacturers | LocalePak',
  description: 'A list of companies in Pakistan — manufacturers, suppliers, exporters and service providers. Find approved firms, compare profiles and contact companies directly for products, quotes and jobs.',
  alternates: {
    canonical: 'https://www.localepak.com/companies/',
  },
  openGraph: {
    title: 'Companies in Pakistan – List of Companies, Suppliers & Manufacturers | LocalePak',
    description: 'A list of companies in Pakistan — manufacturers, suppliers, exporters and service providers. Find approved firms, compare profiles and contact companies directly for products, quotes and jobs.',
    url: 'https://www.localepak.com/companies/',
    siteName: 'LocalePak',
    locale: 'en_PK',
    type: 'website',
  },
}

// SERVER component (Round 3 parity with /businesses): the approved
// Firestore companies are fetched on the server, so the full grid is
// part of the initial HTML — real LCP content, no layout shift, and NO
// Firestore list query ever runs in a visitor's browser (anti-scrape:
// the data layer is no longer downloadable; only what is rendered on
// the page is visible). Companies have no weekly release cycle —
// approved companies are public immediately, as before.
// ISR keeps the data fresh without a read per visitor.
export const revalidate = 604800

export default async function CompaniesPage() {
  const companies = await getApprovedCompanyCards()

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />

      <section className="bg-[#0F172A] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
            <Factory className="w-3.5 h-3.5" />
            <span>Registered Companies</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Companies in Pakistan</h1>
          <p className="text-slate-400 text-sm">
            Browse approved companies across Pakistan — manufacturers, suppliers, exporters and service providers you can contact directly for products, quotes and jobs.
          </p>
          <Link href="/add-company" prefetch={false} className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-colors shadow-md">
            Add Your Company <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        <p className="text-sm text-slate-500 max-w-3xl mb-8">
          For buyers and trade enquiries: use this list of companies to find a manufacturer or supplier, check what each firm offers, and contact it directly. Firms in the manufacturing sector are also listed under{' '}
          <Link href="/category/manufacturing" className="font-bold text-emerald-600 hover:text-emerald-700">
            Manufacturing &amp; Industrial
          </Link>
          .
        </p>
        {companies.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
            <Factory className="w-10 h-10 text-slate-300 mx-auto" />
            <h2 className="font-extrabold text-slate-900 text-lg">No companies listed yet — be the first to add yours</h2>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              Create a free account and add your company profile to appear here and in LocalePak search results.
            </p>
            <Link href="/register" prefetch={false} className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-colors">
              Add Your Company Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {companies.map((company) => (
              <article key={company.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-lg transition-all flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-extrabold text-slate-900 leading-snug">{company.name}</h2>
                  <span className="shrink-0 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-[11px] font-bold">
                    {company.industry}
                  </span>
                </div>
                {company.city && (
                  <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" /> {company.city}
                  </p>
                )}
                {company.phone && (
                  <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" /> {company.phone}
                  </p>
                )}
                {company.description && (
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">{company.description}</p>
                )}
                <Link
                  href={`/company/${company.slug}`}
                  className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 hover:text-emerald-700"
                >
                  View Company <ArrowRight className="w-4 h-4" />
                </Link>
              </article>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
