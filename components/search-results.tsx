'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { CATEGORIES, CITIES, TOP_CITIES } from '@/lib/data'
import { BLOG_POSTS } from '@/lib/blog-data'
import { SEED_BUSINESSES } from '@/lib/seed-businesses'
import { Search, MapPin, LayoutGrid, BookOpen, Building2, Briefcase, ArrowRight, UserRound } from 'lucide-react'

export type Result = {
  type: 'Business' | 'Company' | 'Professional' | 'Category' | 'City' | 'Guide'
  title: string
  snippet: string
  href: string
}

const TYPE_FILTERS = ['All', 'Businesses', 'Companies', 'Professionals', 'Categories', 'Cities', 'Blog'] as const
type TypeFilter = (typeof TYPE_FILTERS)[number]

function matchesFilter(type: Result['type'], filter: TypeFilter): boolean {
  if (filter === 'All') return true
  if (filter === 'Businesses') return type === 'Business'
  if (filter === 'Companies') return type === 'Company'
  if (filter === 'Professionals') return type === 'Professional'
  if (filter === 'Categories') return type === 'Category'
  if (filter === 'Cities') return type === 'City'
  return type === 'Guide'
}

function cityToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-')
}

const INDEX: Result[] = [
  // Static seed listings (lib/seed-businesses.ts) — always searchable,
  // even before any Firestore listing exists. Live Firestore results are
  // merged ahead of these and win href clashes via dedupe below.
  ...SEED_BUSINESSES.map(biz => ({
    type: 'Business' as const,
    title: biz.name,
    snippet: `${biz.category} in ${biz.city} — view contact details and listing information.`,
    href: `/business/${biz.slug}`,
  })),
  ...CATEGORIES.map(cat => ({
    type: 'Category' as const,
    title: cat.name,
    snippet: cat.desc,
    href: `/category/${cat.id}`,
  })),
  ...CITIES.map(city => ({
    type: 'City' as const,
    title: `Businesses in ${city}`,
    snippet: `Explore business categories and local guides for ${city}, Pakistan.`,
    href: `/city/${cityToSlug(city)}`,
  })),
  ...Object.values(BLOG_POSTS).map(post => ({
    type: 'Guide' as const,
    title: post.title,
    snippet: post.excerpt,
    href: `/blog/${post.slug}`,
  })),
]

// Round 3: the live (Firestore) part of the index is fetched on the
// SERVER by app/search/page.tsx and passed in as `initialLiveItems` —
// this component only filters/renders, and the browser runs no
// Firestore list query for search anymore.
//
// Round 4: do NOT read the query with useSearchParams() here. On a
// statically prerendered page that hook bails the whole subtree out
// of SSR (Next renders the nearest Suspense fallback instead), so the
// initial HTML contained only "Loading search..." and the results
// popped in after hydration — a 0.702 layout shift that shoved the
// footer. Instead the component SSRs the DEFAULT view (no query —
// the full index) from its props, and syncs ?q=/?city= from
// window.location once on mount. The search form submits with a full
// GET navigation, so a submitted search re-runs this same sync on the
// fresh page — the visible end state is identical to before.
export default function SearchResults({ initialLiveItems }: { initialLiveItems: Result[] }) {
  const [q, setQ] = useState('')
  const [city, setCity] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const liveItems = initialLiveItems
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('All')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const urlQ = (params.get('q') || '').trim()
    const urlCity = (params.get('city') || '').trim()
    setQ(urlQ)
    setCity(urlCity)
    if (inputRef.current) inputRef.current.value = urlQ
  }, [])

  const results = useMemo(() => {
    const query = q.toLowerCase()
    const cityQuery = city.toLowerCase()
    const seenHrefs = new Set<string>()
    return [...liveItems, ...INDEX].filter(item => {
      // First occurrence of an href wins, so a live Firestore listing
      // shadows the static seed entry for the same business.
      if (seenHrefs.has(item.href)) return false
      seenHrefs.add(item.href)
      const matchesQuery = !query ||
        item.title.toLowerCase().includes(query) ||
        item.snippet.toLowerCase().includes(query)
      const matchesCity = !cityQuery ||
        item.title.toLowerCase().includes(cityQuery) ||
        item.snippet.toLowerCase().includes(cityQuery)
      return matchesQuery && matchesCity && matchesFilter(item.type, typeFilter)
    }).slice(0, 60)
  }, [q, city, liveItems, typeFilter])

  const iconFor = (type: Result['type']) =>
    type === 'City' ? <MapPin className="w-5 h-5 text-emerald-600" />
    : type === 'Guide' ? <BookOpen className="w-5 h-5 text-amber-600" />
    : type === 'Business' ? <Building2 className="w-5 h-5 text-emerald-600" />
    : type === 'Professional' ? <UserRound className="w-5 h-5 text-teal-600" />
    : type === 'Company' ? <Briefcase className="w-5 h-5 text-indigo-600" />
    : <LayoutGrid className="w-5 h-5 text-emerald-600" />

  return (
    <main id="main-content" className="flex-1">
      <section className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-5">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Search LocalePak</h1>
          <form action="/search" method="GET" className="flex gap-3">
            <div className="flex-1 min-w-0 flex items-center gap-3 px-4 py-3 bg-white rounded-2xl text-left">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <label htmlFor="search-page-q" className="sr-only">Search businesses, professionals, categories, cities and guides</label>
              <input
                ref={inputRef}
                id="search-page-q"
                type="text"
                name="q"
                defaultValue=""
                placeholder="Search businesses, professionals, categories..."
                className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none"
              />
            </div>
            <button type="submit" className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-2xl transition-colors">
              Search
            </button>
          </form>
          <p className="text-xs text-slate-400" role="status">
            {q || city
              ? `${results.length} result${results.length === 1 ? '' : 's'}${q ? ` for "${q}"` : ''}${city ? ` in ${city}` : ''}`
              : 'Search listed businesses, companies and professionals, all categories, city guides and blog articles.'}
          </p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter results by type">
            {TYPE_FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setTypeFilter(filter)}
                aria-pressed={typeFilter === filter}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
                  typeFilter === filter
                    ? 'bg-emerald-600 border-emerald-600 text-white'
                    : 'bg-white/10 border-white/20 text-slate-200 hover:bg-white/20'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full min-h-[480px]">
        {results.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center space-y-5">
            <div className="space-y-2">
              <h2 className="font-extrabold text-slate-900 text-lg">No results found</h2>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                Nothing matches that search yet. LocalePak is a growing directory — the business you are
                looking for may simply not be listed yet.
              </p>
            </div>
            <Link
              href="/add-business"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-colors"
            >
              Run this business? Add it free <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="pt-2 space-y-3">
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Popular categories</p>
              <div className="flex flex-wrap justify-center gap-2">
                {CATEGORIES.slice(0, 6).map((cat) => (
                  <Link key={cat.id} href={`/category/${cat.id}`} className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-xs font-semibold text-slate-700 hover:border-emerald-500">
                    {cat.name}
                  </Link>
                ))}
              </div>
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Popular cities</p>
              <div className="flex flex-wrap justify-center gap-2">
                {TOP_CITIES.slice(0, 8).map((c) => (
                  <Link key={c} href={`/city/${cityToSlug(c)}`} className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-xs font-semibold text-slate-700 hover:border-emerald-500">
                    {c}
                  </Link>
                ))}
              </div>
              <p className="text-xs text-slate-500">
                Or browse all <Link href="/categories" className="text-emerald-600 font-semibold hover:underline">categories</Link> and{' '}
                <Link href="/cities" className="text-emerald-600 font-semibold hover:underline">cities</Link> directly.
              </p>
            </div>
          </div>
        ) : (
          <ul className="space-y-4">
            {results.map(item => (
              <li key={item.href + item.title}>
                <Link
                  href={item.href}
                  prefetch={false}
                  className="flex gap-4 bg-white rounded-2xl border border-slate-200 p-5 hover:border-emerald-500 hover:shadow-md transition-all"
                >
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                    {iconFor(item.type)}
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">{item.type}</span>
                    <h2 className="font-bold text-slate-900 text-base">{item.title}</h2>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{item.snippet}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}
