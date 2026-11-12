// ============================================================
// LocalePak — Area (neighbourhood) landing pages (Gap 2, 2026-11-04)
// ------------------------------------------------------------
// A DIRECTORY page type, not a blog article. Route:
//   /city/{citySlug}/area/{areaSlug}
// It does NOT clash with /city/[slug]/[category]: that route has
// two segments after /city, this one has three (slug + the literal
// "area" + area slug), and "area" alone as a category resolves to
// nothing, so /city/{slug}/area can never be mistaken for a category.
//
// Area names come ONLY from the per-city "Popular areas" district
// lists in lib/seo-content.ts CITY_INFO (today: Karachi, Lahore and
// Islamabad, 6 districts each). Listings match an area by the
// documented method in lib/public-listings.ts matchesArea(): the
// listing's own `area` field, or its street `address`, must contain
// the district as a whole word. Static seed listings carry neither
// field, so they never appear here — an area page with no matching
// owner listing is empty and therefore noindex, exactly like empty
// city×category pages. Nothing is inferred from city alone.
// ============================================================

import React, { cache } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import OwnerCtaBand from '@/components/owner-cta-band'
import ListBusinessCta from '@/components/list-business-cta'
import { CITIES, CATEGORIES } from '@/lib/data'
import { CITY_INFO } from '@/lib/seo-content'
import { BreadcrumbSchema } from '@/components/seo/breadcrumb-schema'
import { getCityAreaCards } from '@/lib/public-listings'
import { MapPin, Building2, Phone, ArrowRight } from 'lucide-react'

export const revalidate = 2592000

function cityToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-')
}

function slugify(value: string): string {
  return (value || '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function resolveCity(slug: string): string | null {
  return CITIES.find(c => cityToSlug(c) === slug.toLowerCase()) || null
}

function resolveArea(city: string, areaSlug: string): string | null {
  const districts = CITY_INFO[city]?.districts || []
  return districts.find(d => slugify(d) === areaSlug.toLowerCase()) || null
}

export function generateStaticParams() {
  const params: Array<{ slug: string; area: string }> = []
  for (const [city, info] of Object.entries(CITY_INFO)) {
    if (!info.districts) continue
    for (const district of info.districts) {
      params.push({ slug: cityToSlug(city), area: slugify(district) })
    }
  }
  return params
}

const getCachedAreaCards = cache((city: string, citySlug: string, areaName: string) =>
  getCityAreaCards({ city, citySlug, areaName })
)

export async function generateMetadata(props: {
  params: Promise<{ slug: string; area: string }>
}): Promise<Metadata> {
  const params = await props.params
  const city = resolveCity(params.slug)
  const area = city ? resolveArea(city, params.area) : null
  if (!city || !area) {
    return { title: 'Area Not Found | LocalePak', robots: { index: false, follow: false } }
  }
  const cards = await getCachedAreaCards(city, cityToSlug(city), area)
  const title = `Businesses in ${area}, ${city} – Find Contacts & Services | LocalePak`
  const description = `Browse businesses in ${area}, ${city} — compare local options, check contact details and call or WhatsApp providers directly on LocalePak.`
  const canonical = `https://www.localepak.com/city/${cityToSlug(city)}/area/${slugify(area)}/`
  return {
    title,
    description,
    ...(cards.length === 0 ? { robots: { index: false, follow: false } } : {}),
    alternates: { canonical },
    openGraph: { title, description, url: canonical, siteName: 'LocalePak', locale: 'en_PK', type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default async function AreaPage(props: {
  params: Promise<{ slug: string; area: string }>
}) {
  const params = await props.params
  const city = resolveCity(params.slug)
  const area = city ? resolveArea(city, params.area) : null
  if (!city || !area) notFound()

  const slug = cityToSlug(city)
  const areaSlug = slugify(area)
  const listings = await getCachedAreaCards(city, slug, area)
  const info = CITY_INFO[city]
  // Categories actually present among this area's listings, linked
  // to the city×category pages (area×category pages do not exist).
  const presentCategories = CATEGORIES.filter(cat =>
    listings.some(biz => biz.category === cat.name || slugify(biz.category) === cat.id || slugify(biz.category) === slugify(cat.name))
  )

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />
      <BreadcrumbSchema pathname={`/city/${slug}/area/${areaSlug}`} />

      <main id="main-content" className="flex-1">
        {/* Hero */}
        <section className="bg-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
              <MapPin className="w-3.5 h-3.5" />
              {area}, {city}{info ? `, ${info.province}` : ''}, Pakistan
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Businesses in <span className="text-emerald-400">{area}, {city}</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
              Browse approved businesses located in {area}, {city} — compare options, check contact details and call or WhatsApp providers directly.
            </p>
            <p className="text-xs text-slate-400">
              <Link href={`/city/${slug}`} className="hover:text-emerald-300 font-semibold">
                See all businesses and categories in {city}
              </Link>
            </p>
          </div>
        </section>

        {/* Categories present in this area */}
        {presentCategories.length > 0 && (
          <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Categories in {area}, {city}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {presentCategories.map(cat => (
                <Link
                  key={cat.id}
                  href={`/city/${slug}/${cat.id}`}
                  className="bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-emerald-500 hover:shadow-md transition-all group"
                >
                  <Building2 className="w-6 h-6 text-emerald-600 mb-2" />
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-emerald-600">{cat.name} in {city}</h3>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{cat.desc}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Businesses in this area */}
        <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Businesses in {area}, {city}
          </h2>
          {listings.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center space-y-4">
              <Building2 className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="font-extrabold text-slate-900 text-lg">
                No businesses listed in {area}, {city} yet — be the first
              </h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                This area page is ready for its first listing. If you run a business in {area},
                add it and, once approved, your profile will appear here.
              </p>
              <Link
                href="/add-business"
                prefetch={false}
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-colors"
              >
                Add Your Business — Free <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {listings.map(biz => (
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
        </section>

        <OwnerCtaBand
          title={`Run a business in ${area}, ${city}? Get listed free.`}
          text={`Join the ${area} directory: create a free account, complete the eight-step form, and once approved, your profile goes live immediately, and then appears on this page, in your category and in search.`}
          links={[
            { label: `All businesses in ${city}`, href: `/city/${slug}` },
            { label: 'Browse categories', href: '/categories' },
            { label: 'Listing guidelines', href: '/business-listing-guidelines' },
            { label: 'All cities', href: '/cities' },
          ]}
        />
      </main>

      <Footer />
      <ListBusinessCta />
    </div>
  )
}
