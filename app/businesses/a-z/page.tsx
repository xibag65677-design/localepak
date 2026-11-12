import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Building2, MapPin, Phone, ArrowRight } from 'lucide-react'
import { getMergedBusinessCards } from '@/lib/public-listings'

export const metadata: Metadata = {
  title: 'Business A–Z Index – Find a Business by Name | LocalePak',
  description: 'Browse every approved business on LocalePak alphabetically by name — find a business phone number, address and profile from the A–Z index.',
  alternates: {
    canonical: 'https://www.localepak.com/businesses/a-z/',
  },
  openGraph: {
    title: 'Business A–Z Index – Find a Business by Name | LocalePak',
    description: 'Browse every approved business on LocalePak alphabetically by name — find a business phone number, address and profile from the A–Z index.',
    url: 'https://www.localepak.com/businesses/a-z/',
    siteName: 'LocalePak',
    locale: 'en_PK',
    type: 'website',
  },
}

// SERVER component (Gap 5): the A–Z index uses the SAME server-side
// merged-cards path as /businesses (lib/public-listings.ts), so no
// client-side Firestore LIST ever runs in a visitor's browser —
// public LIST is denied by design, and this page does not change that.
export const revalidate = 604800

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export default async function BusinessAzPage() {
  const businesses = await getMergedBusinessCards()
  const groups = new Map<string, typeof businesses>()
  for (const biz of businesses) {
    const first = (biz.name || '').trim().charAt(0).toUpperCase()
    const key = LETTERS.includes(first) ? first : '#'
    const list = groups.get(key) || []
    list.push(biz)
    groups.set(key, list)
  }
  for (const list of groups.values()) {
    list.sort((a, b) => a.name.localeCompare(b.name))
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />

      <section className="bg-[#0F172A] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
            <Building2 className="w-3.5 h-3.5" />
            <span>A–Z Business Index</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Businesses A–Z</h1>
          <p className="text-slate-400 text-sm">
            Find a business by name — pick a letter to jump to its listings, then call or WhatsApp directly.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full space-y-10">
        <nav className="flex flex-wrap gap-2 justify-center" aria-label="Jump to a letter">
          {[...LETTERS, '#'].map((letter) => {
            const has = (groups.get(letter) || []).length > 0
            return has ? (
              <a
                key={letter}
                href={`#letter-${letter === '#' ? 'other' : letter}`}
                className="w-9 h-9 flex items-center justify-center bg-white border border-slate-200 rounded-xl hover:border-emerald-500 text-sm font-bold text-slate-900"
              >
                {letter}
              </a>
            ) : (
              <span
                key={letter}
                className="w-9 h-9 flex items-center justify-center bg-slate-100 border border-slate-200 rounded-xl text-sm font-bold text-slate-400"
              >
                {letter}
              </span>
            )
          })}
        </nav>

        {[...LETTERS, '#'].map((letter) => {
          const list = groups.get(letter) || []
          if (list.length === 0) return null
          return (
            <section key={letter} id={`letter-${letter === '#' ? 'other' : letter}`} className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">{letter}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {list.map((biz) => (
                  <article key={biz.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-lg transition-all flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-extrabold text-slate-900 leading-snug">{biz.name}</h3>
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
            </section>
          )
        })}

        <p className="text-center text-sm text-slate-500">
          <Link href="/businesses" prefetch={false} className="font-bold text-emerald-600 hover:text-emerald-700">
            Back to all businesses
          </Link>
        </p>
      </main>

      <Footer />
    </div>
  )
}
