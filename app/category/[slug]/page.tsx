import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import OwnerCtaBand from '@/components/owner-cta-band'
import ListBusinessCta from '@/components/list-business-cta'
import { CATEGORIES, TOP_CITIES } from '@/lib/data'
import { getCategoryCards } from '@/lib/public-listings'
import { generateCategoryContent } from '@/lib/seo-content'
import { getCategorySeoCopy } from '@/lib/seo-directory-content'
import { BreadcrumbSchema } from '@/components/seo/breadcrumb-schema'
import MarkdownContent from '@/components/seo/markdown-content'
import { Building2, MapPin, Phone, ArrowRight } from 'lucide-react'

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

export const revalidate = 2592000

export function generateStaticParams() {
  return CATEGORIES.map(cat => ({ slug: cat.id }))
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const params = await props.params
  const cat = CATEGORIES.find(c => c.id === params.slug.toLowerCase())
  if (!cat) {
    return { title: 'Category Not Found | LocalePak', robots: { index: false, follow: false } }
  }
  const title = `${cat.name} in Pakistan – Directory | LocalePak`
  const description = `Find ${cat.name.toLowerCase()} across Pakistan's major cities: browse free listings, compare providers, and choose the right one with our local guide.`
  const listings = await getCategoryCards(cat.id, cat.name)
  const canonical = `https://www.localepak.com/category/${cat.id}/`
  return {
    title,
    description,
    ...(listings.length === 0 ? { robots: { index: false, follow: false } } : {}),
    alternates: { canonical },
    openGraph: { title, description, url: canonical, siteName: 'LocalePak', locale: 'en_PK', type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default async function CategoryPage(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  const cat = CATEGORIES.find(c => c.id === params.slug.toLowerCase())
  if (!cat) notFound()

  const listings = await getCategoryCards(cat.id, cat.name)
  const copy = getCategorySeoCopy(cat.id)
  const guide = generateCategoryContent(cat.id)
  // Only internal links that resolve to live core routes (blog/city/category)
  const liveLinks = (copy?.links || []).filter(l =>
    l.href.startsWith('/blog/') || l.href.startsWith('/city/') || l.href.startsWith('/category/')
  )
  const otherCategories = CATEGORIES.filter(c => c.id !== cat.id).slice(0, 8)

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />
      <BreadcrumbSchema pathname={`/category/${cat.id}`} />

      <main id="main-content" className="flex-1">
        {/* Hero */}
        <section className="bg-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <Building2 className="w-3.5 h-3.5" />
              Business Category
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              {cat.name} <span className="text-emerald-400">in Pakistan</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
              {copy?.intro || cat.desc}
            </p>
            <p className="text-emerald-300 text-sm font-semibold">
              {listings.length === 0
                ? `No ${cat.name} listings yet.`
                : `${listings.length} ${listings.length === 1 ? 'listing' : 'listings'} in this category across Pakistan.`}
            </p>
          </div>
        </section>

        {/* Listings */}
        <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Listed {cat.name} in Pakistan
          </h2>
          {listings.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center space-y-4">
              <Building2 className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="font-extrabold text-slate-900 text-lg">
                No {cat.name} listings yet — be the first
              </h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                This page is ready for its first {cat.name.toLowerCase()} listing. If you run one,
                add it free and, once approved, your profile will appear here immediately.
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
              {listings.map((biz) => (
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

        {/* Browse by city */}
        <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Explore by City
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {TOP_CITIES.map(city => {
              const count = listings.filter(l => slugify(l.city) === slugify(city)).length
              return (
                <Link
                  key={city}
                  href={`/city/${cityToSlug(city)}/${cat.id}`}
                  className="p-3.5 bg-white hover:bg-emerald-600 rounded-xl border border-slate-200 text-slate-700 hover:text-white transition-all flex items-center gap-2 font-semibold text-xs group"
                >
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-emerald-600 group-hover:text-white" />
                  <span className="min-w-0">
                    <span className="block truncate">{cat.name} in {city}</span>
                    <span className="block text-[11px] font-medium text-slate-400 group-hover:text-white/80">
                      {count === 0 ? 'No listings yet' : `${count} ${count === 1 ? 'listing' : 'listings'}`}
                    </span>
                  </span>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Category guide */}
        <section className="bg-white py-14 px-4 sm:px-6 lg:px-8 border-y border-slate-200/80">
          <div className="max-w-4xl mx-auto">
            <MarkdownContent content={guide} />
            {copy?.guidance && (
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-6">{copy.guidance}</p>
            )}
            {liveLinks.length > 0 && (
              <div className="mt-8 space-y-2">
                <h3 className="text-lg font-bold text-slate-900">Helpful reading</h3>
                <ul className="space-y-1.5">
                  {liveLinks.map(l => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-emerald-600 hover:underline text-sm font-medium inline-flex items-center gap-1">
                        {l.label}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* Other categories */}
        <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Other Categories</h2>
            <Link href="/categories" className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 shrink-0">
              <span>All Categories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {otherCategories.map(c => (
              <Link
                key={c.id}
                href={`/category/${c.id}`}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-emerald-500 hover:shadow-md transition-all group"
              >
                <Building2 className="w-6 h-6 text-emerald-600 mb-2" />
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-emerald-600">{c.name}</h3>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{c.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        <OwnerCtaBand
          title={`Run a ${cat.name} business? Get listed free.`}
          text={`Add your business to the ${cat.name} category: a free profile with call and WhatsApp buttons, hours, services and products — shown in your city and in search as soon as it is approved.`}
          links={[
            { label: 'All businesses', href: '/businesses' },
            { label: 'All companies', href: '/companies' },
            { label: 'Browse cities', href: '/cities' },
            { label: 'Listing guidelines', href: '/business-listing-guidelines' },
          ]}
        />
      </main>

      <Footer />
      <ListBusinessCta />
    </div>
  )
}
