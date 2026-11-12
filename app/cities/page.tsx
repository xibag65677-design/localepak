import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { CITIES, TOP_CITIES } from '@/lib/data'
import { getMergedBusinessCards } from '@/lib/public-listings'
import Link from 'next/link'
import { MapPin, Building2, ArrowRight } from 'lucide-react'
import { Metadata } from 'next'

function slugify(value: string): string {
  return (value || '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const revalidate = 2592000

export const metadata: Metadata = {
  title: 'Cities Directory Pakistan | LocalePak Enterprise Hub',
  description: 'Explore business listings, companies, jobs and services across Pakistani cities including Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, and Peshawar.',
  alternates: { canonical: 'https://www.localepak.com/cities/' },
  openGraph: {
    title: 'Cities Directory Pakistan | LocalePak Enterprise Hub',
    description: 'Explore business listings, companies, jobs and services across Pakistani cities including Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, and Peshawar.',
    url: 'https://www.localepak.com/cities/',
    type: 'website',
  },
}

export default async function CitiesIndexPage() {
  const businesses = await getMergedBusinessCards()
  const countForCity = (city: string) =>
    businesses.filter(b => slugify(b.city) === slugify(city)).length
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />

      <section className="bg-[#0F172A] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
            <MapPin className="w-3.5 h-3.5" />
            <span>Pakistani Geographic Directory</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Business and Service Discovery Across Pakistan</h1>
          <p className="text-slate-400 text-sm">
            Find available businesses, services, employers and jobs by city and province in Pakistan.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full space-y-10">
        
        {/* Top Metropolitan Hubs */}
        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-600" />
            <span>Top Metropolitan Business Hubs</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {TOP_CITIES.slice(0, 10).map((city) => {
              const count = countForCity(city)
              return (
                <Link
                  key={city}
                  href={`/city/${city.toLowerCase().replace(/\s+/g, '-')}`}
                  className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all text-center space-y-2 group"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-emerald-600 transition-colors">
                    {city}
                  </h3>
                  <span className="text-[11px] font-semibold text-emerald-600 block">
                    {count === 0 ? 'No listings yet' : `${count} ${count === 1 ? 'listing' : 'listings'}`}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>

        {/* All 150+ Cities Index Grid */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-xs space-y-6">
          <h2 className="text-lg font-extrabold text-slate-900">
            Complete Index of Cities ({CITIES.length})
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 text-xs">
            {CITIES.map((city) => {
              const count = countForCity(city)
              return (
                <Link
                  key={city}
                  href={`/city/${city.toLowerCase().replace(/\s+/g, '-')}`}
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 font-semibold transition-colors flex items-center justify-between gap-2"
                >
                  <span className="min-w-0 truncate">{city}</span>
                  <span className="flex items-center gap-1.5 shrink-0">
                    <span className="text-slate-400 font-bold">{count === 0 ? '0 listings' : `${count} ${count === 1 ? 'listing' : 'listings'}`}</span>
                    <ArrowRight className="w-3 h-3 text-slate-400 opacity-60" />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  )
}
