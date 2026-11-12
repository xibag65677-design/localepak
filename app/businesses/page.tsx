import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Building2, MapPin, Phone, ArrowRight } from 'lucide-react'
import { getMergedBusinessCards } from '@/lib/public-listings'

export const metadata: Metadata = {
  title: 'Businesses in Pakistan – Browse, Call & Compare | LocalePak',
  description: 'Browse approved businesses across Pakistan by city and category, compare services, then call or WhatsApp them directly — no middleman, free to use.',
  alternates: {
    canonical: 'https://www.localepak.com/businesses/',
  },
  openGraph: {
    title: 'Businesses in Pakistan – Browse, Call & Compare | LocalePak',
    description: 'Browse approved businesses across Pakistan by city and category, compare services, then call or WhatsApp them directly — no middleman, free to use.',
    url: 'https://www.localepak.com/businesses/',
    siteName: 'LocalePak',
    locale: 'en_PK',
    type: 'website',
  },
}

// SERVER component (Round 3): the approved + released Firestore
// listings are fetched on the server and merged with the static seed
// listings here, so the full grid is part of the initial HTML — real
// LCP content, no layout shift, and NO Firestore list query ever runs
// in a visitor's browser (anti-scrape: the data layer is no longer
// downloadable; only what is rendered on the page is visible).
// ISR keeps the data fresh without a read per visitor; the weekly
// release cycle makes an hourly refresh more than sufficient.
export const revalidate = 604800

export default async function BusinessesPage() {
  const businesses = await getMergedBusinessCards()

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />

      <section className="bg-[#0F172A] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
            <Building2 className="w-3.5 h-3.5" />
            <span>Reviewed Local Businesses</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Businesses in Pakistan</h1>
          <p className="text-slate-400 text-sm">
            Browse approved local businesses across Pakistan — call or WhatsApp them directly, no middleman.
          </p>
          <p className="text-slate-400 text-xs">
            Looking for one business by name?{' '}
            <Link href="/businesses/a-z" prefetch={false} className="font-bold text-emerald-400 hover:text-emerald-300">
              Browse the A–Z index
            </Link>
          </p>
          <Link href="/add-business" prefetch={false} className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-colors shadow-md">
            Add Your Business <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        {businesses.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
            <Building2 className="w-10 h-10 text-slate-300 mx-auto" />
            <h2 className="font-extrabold text-slate-900 text-lg">No businesses listed yet — be the first to add yours</h2>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              Create a free account and add your business to appear here and in LocalePak search results.
            </p>
            <Link href="/register" prefetch={false} className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-colors">
              Add Your Business Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 min-h-[480px]">
            {businesses.map((biz) => (
              <article key={biz.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-lg transition-all flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-extrabold text-slate-900 leading-snug">{biz.name}</h2>
                  <span className="shrink-0 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-[11px] font-bold">
                    {biz.category}
                  </span>
                </div>
                {biz.city && (
                  <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" /> {biz.city}
                  </p>
                )}
                {biz.phone && (
                  <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" /> {biz.phone}
                  </p>
                )}
                {biz.description && (
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">{biz.description}</p>
                )}
                <Link
                  href={`/business/${biz.slug}`}
                  prefetch={false}
                  className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 hover:text-emerald-700"
                >
                  View Business <ArrowRight className="w-4 h-4" />
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
