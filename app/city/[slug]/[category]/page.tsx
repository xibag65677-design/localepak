import React, { cache } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import OwnerCtaBand from '@/components/owner-cta-band'
import ListBusinessCta from '@/components/list-business-cta'
import { CITIES, CATEGORIES, TOP_CITIES } from '@/lib/data'
import { SEED_BUSINESSES } from '@/lib/seed-businesses'
import { CITY_INFO, generateCityCategoryContent } from '@/lib/seo-content'
import MarkdownContent from '@/components/seo/markdown-content'
import CityCategoryListings from './listings'
import { getCityCategoryCards, getApprovedReviewAverages, getTopRatedCards } from '@/lib/public-listings'
import { MapPin, Building2, ArrowRight } from 'lucide-react'

function cityToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-')
}

function resolveCity(slug: string): string | null {
  return CITIES.find(c => cityToSlug(c) === slug.toLowerCase()) || null
}

function resolveCategory(slug: string) {
  return CATEGORIES.find(c => c.id === slug.toLowerCase()) || null
}

export const dynamicParams = true

// Listings are fetched server-side (Round 3); ISR refreshes the merged
// seed + Firestore grid hourly — far inside the 7-day release cycle.
export const revalidate = 2592000

export function generateStaticParams() {
  // ISR-write fix (2026-11-07): prerender ONLY the city×category combos
  // that have at least one seed business. Every other combo still renders
  // on demand on first visit (dynamicParams = true above). Previously this
  // prerendered every TOP_CITIES × CATEGORIES combo (~480 pages, most of
  // them empty), and every deploy re-stored all of them in the ISR cache.
  const seen = new Set<string>()
  const params: { slug: string; category: string }[] = []
  for (const b of SEED_BUSINESSES) {
    const key = `${b.citySlug}|${b.categorySlug}`
    if (!seen.has(key)) {
      seen.add(key)
      params.push({ slug: b.citySlug, category: b.categorySlug })
    }
  }
  return params
}

// Shared between generateMetadata and the page component so the
// merged city x category listings are fetched once per render.
const getCachedCityCategoryCards = cache((
  city: string,
  citySlug: string,
  categoryId: string,
  categoryName: string
) => getCityCategoryCards({ city, citySlug, categoryId, categoryName }))
const getCachedReviewAverages = cache(() => getApprovedReviewAverages())

function cityCategoryTitle(categoryName: string, city: string): string {
  const long = `${categoryName} in ${city}: Find Contacts & Services | LocalePak`
  if (long.length <= 65) return long
  const mid = `${categoryName} in ${city}: Contacts & Services | LocalePak`
  if (mid.length <= 65) return mid
  return `${categoryName} in ${city}: Contacts | LocalePak`
}

function metaDescription(city: string, categoryId: string, categoryName: string): string {
  const md = generateCityCategoryContent(city, categoryId)
  const firstPara = md
    .split(/\n{2,}/)
    .map(s => s.trim())
    .find(s => s.length > 0 && !s.startsWith('#'))
  const text = (firstPara || `${categoryName} businesses and services in ${city}, Pakistan.`)
    .replace(/[#*_]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
  if (text.length <= 158) return text
  const cut = text.slice(0, 155)
  const lastSpace = cut.lastIndexOf(' ')
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd()
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string; category: string }>
}): Promise<Metadata> {
  const params = await props.params
  const city = resolveCity(params.slug)
  const cat = resolveCategory(params.category)
  if (!city || !cat) {
    return { title: 'Page Not Found | LocalePak', robots: { index: false, follow: false } }
  }
  const title = cityCategoryTitle(cat.name, city)
  const description = metaDescription(city, cat.id, cat.name)
  const listings = await getCachedCityCategoryCards(city, cityToSlug(city), cat.id, cat.name)
  const canonical = `https://www.localepak.com/city/${cityToSlug(city)}/${cat.id}`
  return {
    title,
    description,
    ...(listings.length === 0 ? { robots: { index: false, follow: false } } : {}),
    alternates: { canonical },
    openGraph: { title, description, url: canonical, siteName: 'LocalePak', locale: 'en_PK', type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default async function CityCategoryPage(props: {
  params: Promise<{ slug: string; category: string }>
}) {
  const params = await props.params
  const city = resolveCity(params.slug)
  const cat = resolveCategory(params.category)
  if (!city || !cat) notFound()

  const citySlug = cityToSlug(city)
  const listings = await getCachedCityCategoryCards(city, citySlug, cat.id, cat.name)
  const averages = await getCachedReviewAverages()
  const topRated = getTopRatedCards(listings, averages)
  const info = CITY_INFO[city]
  const guide = generateCityCategoryContent(city, cat.id)
  const otherCategories = CATEGORIES.filter(c => c.id !== cat.id).slice(0, 8)
  const otherCities = TOP_CITIES.filter(c => c !== city).slice(0, 10)

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.localepak.com/' },
      { '@type': 'ListItem', position: 2, name: 'Cities', item: 'https://www.localepak.com/cities/' },
      { '@type': 'ListItem', position: 3, name: city, item: `https://www.localepak.com/city/${citySlug}/` },
      { '@type': 'ListItem', position: 4, name: cat.name, item: `https://www.localepak.com/city/${citySlug}/${cat.id}/` },
    ],
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main id="main-content" className="flex-1">
        {/* Hero */}
        <section className="bg-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <Building2 className="w-3.5 h-3.5" />
              {city} · {info ? info.province : 'Pakistan'}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              {cat.name} <span className="text-emerald-400">in {city}</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
              {cat.desc}. Browse the approved {cat.name.toLowerCase()} businesses listed in {city} so far,
              read our local guide, and contact providers directly by phone or WhatsApp.
            </p>
            <p className="text-xs text-slate-400 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <Link href={`/city/${citySlug}`} className="hover:text-emerald-300 font-semibold">
                See all businesses and categories in {city}
              </Link>
            </p>
          </div>
        </section>

        {/* Listings */}
        <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Listed {cat.name} in {city}
          </h2>
          <CityCategoryListings businesses={listings} city={city} categoryName={cat.name} />
        </section>

        {/* Top rated in this city × category (Gap 1) — rendered ONLY
            when real approved reviews exist for these listings. */}
        {topRated.length > 0 && (
          <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Top rated {cat.name} in {city}
            </h2>
            <p className="text-sm text-slate-500">
              The highest-rated {cat.name.toLowerCase()} businesses in {city}, ranked by their approved customer reviews.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {topRated.map(biz => (
                <article key={biz.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-lg transition-all flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-extrabold text-slate-900 leading-snug">{biz.name}</h3>
                    <span className="shrink-0 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-100 text-[11px] font-bold">
                      ★ {biz.avgRating.toFixed(1)} · {biz.reviewCount} review{biz.reviewCount === 1 ? '' : 's'}
                    </span>
                  </div>
                  {biz.phone && (
                    <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" /> {biz.city}
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
          </section>
        )}

        {/* Guide */}
        <section className="bg-white py-14 px-4 sm:px-6 lg:px-8 border-y border-slate-200/80">
          <div className="max-w-4xl mx-auto">
            <MarkdownContent content={guide} />
          </div>
        </section>

        {/* More categories in this city */}
        <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            More Categories in {city}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {otherCategories.map(c => (
              <Link
                key={c.id}
                href={`/city/${citySlug}/${c.id}`}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-emerald-500 hover:shadow-md transition-all group"
              >
                <Building2 className="w-6 h-6 text-emerald-600 mb-2" />
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-emerald-600">{c.name} in {city}</h3>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{c.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Same category in other cities */}
        <section className="pb-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {cat.name} in Other Cities
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {otherCities.map(c => (
              <Link
                key={c}
                href={`/city/${cityToSlug(c)}/${cat.id}`}
                className="px-3.5 py-2 bg-white border border-slate-200 rounded-xl hover:border-emerald-500 text-xs font-medium inline-flex items-center gap-1"
              >
                {cat.name} in {c}
                <ArrowRight className="w-3 h-3" />
              </Link>
            ))}
            <Link href={`/category/${cat.id}`} className="px-3.5 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 text-xs font-bold">
              {cat.name} Across Pakistan
            </Link>
          </div>
        </section>

        <OwnerCtaBand
          title={`Run a ${cat.name.toLowerCase()} business in ${city}?`}
          text={`List it free on this page: register, complete the eight-step form, and once approved, your profile goes live immediately, and then appears here with call and WhatsApp buttons customers can use directly.`}
          links={[
            { label: `All businesses in ${city}`, href: `/city/${citySlug}` },
            { label: `${cat.name} across Pakistan`, href: `/category/${cat.id}` },
            { label: 'Browse all businesses', href: '/businesses' },
            { label: 'Listing guidelines', href: '/business-listing-guidelines' },
          ]}
        />
      </main>

      <Footer />
      <ListBusinessCta />
    </div>
  )
}
