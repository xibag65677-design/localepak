import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Metadata } from 'next'
import Link from 'next/link'
import {
  Search, MapPin, ChevronRight, ArrowRight, ShieldCheck, Globe,
  BookOpen, Sparkles, LayoutGrid, Compass, Building2, MessageCircle, ListChecks,
  Star, Phone, Share2
} from 'lucide-react'
import { CATEGORIES, CITIES, TOP_CITIES } from '@/lib/data'
import HeroCitySelect from '@/components/hero-city-select'
import ListBusinessCta from '@/components/list-business-cta'
import WebMcpTools from '@/components/webmcp-tools'
import { BLOG_POSTS } from '@/lib/blog-data'
import { getFeaturedBusinessCards } from '@/lib/public-listings'

export const metadata: Metadata = {
  title: "Pakistan Business Directory – Find & List Free | LocalePak",
  description: "LocalePak is Pakistan's business directory: find local businesses across 183 cities and 24 categories, or list your business with a public profile page.",
  alternates: {
    canonical: 'https://www.localepak.com/',
    types: {
      'text/markdown': '/index.md',
    },
  },
  openGraph: {
    title: "Pakistan Business Directory – Find & List Free | LocalePak",
    description: "LocalePak is Pakistan's business directory: find local businesses across 183 cities and 24 categories, or list your business with a public profile page.",
    url: 'https://www.localepak.com/',
    siteName: 'LocalePak',
    locale: 'en_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Pakistan Business Directory – Find & List Free | LocalePak",
    description: "LocalePak is Pakistan's business directory: find local businesses across 183 cities and 24 categories, or list your business with a public profile page.",
  },
}

const FAQS = [
  {
    question: 'What is LocalePak?',
    answer: 'LocalePak is a free business directory for Pakistan. It organizes local businesses and services by city and category, with guides that help you choose the right provider — and it gives business owners a public profile page that search engines can read.'
  },
  {
    question: 'Is LocalePak free to use?',
    answer: 'Yes. Browsing the directory, reading the city and category guides, and using search are all completely free, with no account required.'
  },
  {
    question: 'Which cities and categories does LocalePak cover?',
    answer: 'LocalePak has guides for cities across Pakistan — including Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan and Peshawar — and covers categories from restaurants and real estate to technology, healthcare, home services and more.'
  },
  {
    question: 'Is LocalePak the yellow pages of Pakistan?',
    answer: 'LocalePak is a modern online business directory for Pakistan — the online equivalent of the traditional yellow pages. It lists companies, suppliers and local services by city and category, with contact details so you can call or message a business directly, instead of flipping through a printed directory.'
  },
  {
    question: 'I run a business. How can I get listed?',
    answer: 'Create a free account, then complete the Add Business form — eight short steps covering your contact details, category, city, opening hours, services and products. Our team reviews every submission, and once approved, your listing goes live immediately, and then appears on your city page, your category page and in search.'
  }
]

function cityToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-')
}

export default async function HomePage() {
  // Featured Businesses (paid Featured tier or admin-set). Empty array
  // means the section below renders nothing at all.
  const featuredBusinesses = await getFeaturedBusinessCards(8)

  const latestPosts = Object.values(BLOG_POSTS)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 3)

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer }
    }))
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main id="main-content">
        {/* HERO */}
        <section className="bg-slate-50 text-slate-900 pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto space-y-8 text-center">
            <div className="max-w-3xl mx-auto space-y-4">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/80 text-emerald-700 border border-emerald-200 text-xs font-bold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Pakistan's Local Business Directory</span>
              </span>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Find Local Businesses & Services Across <span className="text-emerald-700">Pakistan</span>
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                From Karachi to Khyber, explore Pakistan's cities and business categories, compare local services with our guides, and find exactly what you need near you.
              </p>
            </div>

            {/* Hero Search Box */}
            <div className="max-w-4xl mx-auto bg-white rounded-3xl p-3 sm:p-4 shadow-xl shadow-slate-900/5 border border-slate-200/90 text-left">
              <form action="/search" method="GET" className="grid grid-cols-1 md:grid-cols-12 gap-3">
                <div className="md:col-span-6 flex items-center gap-3 px-4 py-3 bg-slate-50/80 rounded-2xl border border-slate-200/80">
                  <Search className="w-5 h-5 text-slate-400 shrink-0" />
                  <label htmlFor="hero-search-q" className="sr-only">Search businesses, categories or guides</label>
                  <input
                    id="hero-search-q"
                    type="text"
                    name="q"
                    placeholder="Try restaurants, real estate, software houses..."
                    className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none"
                  />
                </div>

                <div className="md:col-span-4 flex items-center gap-3 px-4 py-3 bg-slate-50/80 rounded-2xl border border-slate-200/80">
                  <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
                  <label htmlFor="hero-city-select" className="sr-only">Select City</label>
                  <HeroCitySelect topCities={TOP_CITIES} />
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    aria-label="Search LocalePak Directory"
                    className="w-full h-full py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold text-sm rounded-2xl shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Search className="w-4 h-4" />
                    <span>Search</span>
                  </button>
                </div>
              </form>

              <div className="pt-3 px-2 flex items-center gap-2 flex-wrap text-xs text-slate-500">
                <span className="font-bold text-slate-400">Popular:</span>
                <Link href="/category/restaurants" className="hover:text-emerald-600 font-semibold">Restaurants</Link>
                <span>•</span>
                <Link href="/category/real-estate" className="hover:text-emerald-600 font-semibold">Real Estate</Link>
                <span>•</span>
                <Link href="/category/technology" className="hover:text-emerald-600 font-semibold">Software Houses</Link>
                <span>•</span>
                <Link href="/category/healthcare" className="hover:text-emerald-600 font-semibold">Healthcare</Link>
                <span>•</span>
                <Link href="/blog" className="hover:text-emerald-600 font-bold">Business Guides &rarr;</Link>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 px-2">
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  <strong className="text-slate-900">Own a business?</strong> Get a free profile page and let customers find you.
                </p>
                <div className="flex items-center gap-2.5 shrink-0">
                  <Link
                    href="/add-business" prefetch={false}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors"
                  >
                    Add Your Business — Free
                  </Link>
                  <Link
                    href="/register" prefetch={false}
                    className="px-5 py-2.5 bg-white border border-slate-200 hover:border-emerald-500 text-slate-700 font-bold text-xs rounded-xl transition-colors"
                  >
                    Create Free Account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST STRIP */}
        <section className="bg-white py-10 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">100% free</span>
                <p className="text-xs font-semibold text-slate-500 mt-1">Browse & search at no cost</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600">Every major city</span>
                <p className="text-xs font-semibold text-slate-500 mt-1">Karachi · Lahore · Islamabad & more</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600">24 categories</span>
                <p className="text-xs font-semibold text-slate-500 mt-1">From food to technology</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-2xl sm:text-3xl font-extrabold text-amber-500">Local guides</span>
                <p className="text-xs font-semibold text-slate-500 mt-1">Choose providers with confidence</p>
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Browse by Industry</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                What Are You Looking For?
              </h2>
            </div>
            <Link href="/categories" className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
              <span>View All 24 Categories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.slice(0, 12).map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.id}`}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all text-center space-y-2 group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <LayoutGrid className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-xs line-clamp-1 group-hover:text-emerald-600">
                  {cat.name}
                </h3>
                <p className="text-[11px] font-semibold text-emerald-600">
                  Explore guide
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* FEATURED BUSINESSES — renders ONLY when at least one approved
            business is featured (paid Featured tier, or admin Feature
            toggle). Empty means no section at all: no empty state, no
            filler, no seed/placeholder businesses. Newest featured first,
            capped at 8 (lib/public-listings.ts). */}
        {featuredBusinesses.length > 0 && (
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Featured Businesses</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Featured Businesses
                </h2>
                <p className="text-xs text-slate-500 mt-1">Featured listings from businesses across Pakistan.</p>
              </div>
              <Link href="/businesses" className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                <span>View All Businesses</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredBusinesses.map((biz) => (
                <article key={biz.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-lg transition-all flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-extrabold text-slate-900 leading-snug">{biz.name}</h3>
                    <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[11px] font-bold">
                      <Star className="w-3 h-3" /> Featured
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" /> {biz.city} · {biz.category}
                  </p>
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
                    View {biz.name} <ArrowRight className="w-4 h-4" />
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* CITIES */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-slate-900 text-white rounded-3xl my-8">
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-slate-800 pb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Near You</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Businesses in Your City
                </h2>
                <p className="text-xs text-slate-400 mt-1">Pick a city to explore its business sectors and local guides.</p>
              </div>
              <Link href="/cities" className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                <span>Explore All Cities</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 text-xs">
              {CITIES.map((city) => (
                <Link
                  key={city}
                  href={`/city/${cityToSlug(city)}`}
                  className="p-3.5 bg-slate-800/80 hover:bg-emerald-600 rounded-xl border border-slate-700 text-slate-200 hover:text-white transition-all flex items-center justify-between font-semibold group"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 group-hover:text-white" />
                    <span>{city}</span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* WHY LOCALEPAK */}
        <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200/80">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Why LocalePak</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                A Directory Built for Local Search
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm">One free platform for finding services, understanding your options, and discovering businesses across Pakistan.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-slate-200/80 space-y-3">
                <Compass className="w-8 h-8 text-emerald-600" />
                <h3 className="font-bold text-slate-900 text-base">Made for Local Search</h3>
                <p className="text-xs text-slate-600 leading-relaxed">Pages are organized by city and category, matching how people actually search: a service, in a place, near them.</p>
              </div>

              <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-slate-200/80 space-y-3">
                <BookOpen className="w-8 h-8 text-emerald-600" />
                <h3 className="font-bold text-slate-900 text-base">Guides, Not Just Lists</h3>
                <p className="text-xs text-slate-600 leading-relaxed">Every city and category comes with a practical guide — what to look for, what to ask, and how to compare providers before you spend a rupee.</p>
              </div>

              <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-slate-200/80 space-y-3">
                <ShieldCheck className="w-8 h-8 text-amber-600" />
                <h3 className="font-bold text-slate-900 text-base">Honest by Design</h3>
                <p className="text-xs text-slate-600 leading-relaxed">No fake rankings, no paid placements disguised as recommendations, and no invented statistics. What you read is what we know.</p>
              </div>

              <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-slate-200/80 space-y-3">
                <Globe className="w-8 h-8 text-purple-600" />
                <h3 className="font-bold text-slate-900 text-base">Built to Be Read by Search Engines</h3>
                <p className="text-xs text-slate-600 leading-relaxed">Fast, server-rendered pages with structured data — so listed businesses get profile pages that search engines can properly read.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FOR BUSINESS OWNERS */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">For Business Owners</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Put Your Business on LocalePak — Free
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm">
              Register in minutes, complete the eight-step Add Business form, and once approved, your listing goes live immediately, and then appears on your city page, your category page and in search.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 space-y-3">
              <Building2 className="w-8 h-8 text-emerald-600" />
              <h3 className="font-bold text-slate-900 text-base">Your Own Profile Page</h3>
              <p className="text-xs text-slate-600 leading-relaxed">A dedicated page for your business with your name, description, address and contact details — built to be read properly by Google.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 space-y-3">
              <Search className="w-8 h-8 text-emerald-600" />
              <h3 className="font-bold text-slate-900 text-base">Found in Category, City & Search</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Approved listings appear on their category page, their city page and in LocalePak search — the three places customers actually look.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 space-y-3">
              <MessageCircle className="w-8 h-8 text-emerald-600" />
              <h3 className="font-bold text-slate-900 text-base">Calls & WhatsApp, Directly to You</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Your profile carries Call and WhatsApp buttons, so customers reach you directly — no middleman and no commission on enquiries.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 space-y-3">
              <ListChecks className="w-8 h-8 text-amber-600" />
              <h3 className="font-bold text-slate-900 text-base">Hours, Services & Products</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Add your opening hours, the services you offer and your main products, so customers know exactly what you do before they call.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center flex-wrap">
            <Link
              href="/register" prefetch={false}
              className="px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-emerald-600/20 transition-all"
            >
              Create a Free Account
            </Link>
            <Link
              href="/add-business" prefetch={false}
              className="px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-2xl transition-all"
            >
              Add Your Business
            </Link>
          </div>
        </section>

        {/* BLOG / GUIDES */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Guides & Insights</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                From the LocalePak Blog
              </h2>
            </div>
            <Link href="/blog" className="text-xs font-bold text-emerald-600 hover:underline">
              Explore Blog &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="bg-white p-6 rounded-2xl border border-slate-200/80 space-y-3 hover:border-emerald-500 transition-colors">
                <span className="text-[11px] font-bold text-emerald-600">{post.category}</span>
                <h3 className="font-bold text-slate-900 text-sm">{post.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2">{post.excerpt}</p>
                <p className="text-[11px] text-slate-400 pt-1">{post.readTime}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions (FAQ)
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm">
              Everything you need to know about the LocalePak directory.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-2">
                <h3 className="font-bold text-slate-900 text-base">{faq.question}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* DIRECTORY CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white text-center max-w-4xl mx-auto space-y-6">
            <Building2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Explore the Directory — or Put Your Business on It
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
              Browse businesses by category and city, or list your own business free in a few minutes and get a profile page customers can call or WhatsApp directly.
            </p>
            <div className="flex items-center gap-3 justify-center flex-wrap">
              <Link
                href="/categories"
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors"
              >
                Browse Categories
              </Link>
              <Link
                href="/add-business" prefetch={false}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors"
              >
                List Your Business Free
              </Link>
            </div>
            <div className="flex items-center justify-center gap-2 pt-1 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1.5 font-semibold">
                <Share2 className="w-3.5 h-3.5" /> Share LocalePak:
              </span>
              <a
                href="https://twitter.com/intent/tweet?text=LocalePak%20%E2%80%94%20Pakistan%27s%20business%20directory&url=https%3A%2F%2Fwww.localepak.com%2F"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-slate-300 hover:text-white"
              >
                X
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.localepak.com%2F"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-slate-300 hover:text-white"
              >
                Facebook
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fwww.localepak.com%2F"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-slate-300 hover:text-white"
              >
                LinkedIn
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="https://wa.me/?text=LocalePak%20%E2%80%94%20Pakistan%27s%20business%20directory%20https%3A%2F%2Fwww.localepak.com%2F"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-slate-300 hover:text-white"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS + VERIFICATION */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How LocalePak Works — and How Listings Are Checked
            </h2>
            <p className="text-sm text-slate-500 max-w-2xl mx-auto">
              No listing appears on LocalePak by accident. Every profile is submitted by the business
              itself and reviewed by our team before it goes public.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white rounded-3xl border border-slate-200 p-7 space-y-3">
              <ListChecks className="w-8 h-8 text-emerald-600" />
              <h3 className="font-extrabold text-slate-900">1. The owner submits</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                The business owner creates a free account and completes the eight-step form —
                contact details, category, city, hours, services and products.
              </p>
            </div>
            <div className="bg-white rounded-3xl border border-slate-200 p-7 space-y-3">
              <ShieldCheck className="w-8 h-8 text-emerald-600" />
              <h3 className="font-extrabold text-slate-900">2. Our team reviews</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We check the essentials before approving: a genuine business name, a working phone
                number, and the correct category and city. Spam and duplicates are rejected.
              </p>
            </div>
            <div className="bg-white rounded-3xl border border-slate-200 p-7 space-y-3">
              <MessageCircle className="w-8 h-8 text-emerald-600" />
              <h3 className="font-extrabold text-slate-900">3. Customers connect directly</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Approved profiles go public in their category, city and search. Customers call or
                WhatsApp the business directly — we take no commission and never sit in between.
              </p>
            </div>
          </div>
          <p className="text-center text-xs text-slate-500">
            Read the full standards in our{' '}
            <Link href="/verification-policy" className="text-emerald-600 font-semibold hover:underline">verification policy</Link>{' '}
            and{' '}
            <Link href="/editorial-policy" className="text-emerald-600 font-semibold hover:underline">editorial policy</Link>,
            or report a problem listing via{' '}
            <Link href="/report-abuse" className="text-emerald-600 font-semibold hover:underline">Report Abuse</Link>.
          </p>
        </section>

        {/* FINAL CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-emerald-700 via-emerald-800 to-indigo-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl flex flex-col lg:flex-row justify-between items-center gap-8">
            <div className="space-y-3 max-w-2xl text-center lg:text-left">
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Your Customers Are Searching. Be There.
              </h2>
              <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
                Create a free account and add your business in eight short steps. Once approved, your listing goes live immediately, and then appears in your category, your city and search.
              </p>
            </div>

            <div className="flex items-center gap-4 flex-wrap justify-center shrink-0">
              <Link
                href="/add-business" prefetch={false}
                className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm rounded-2xl shadow-xl transition-all flex items-center gap-2"
              >
                <span>Add Your Business</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/register" prefetch={false}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-extrabold text-sm rounded-2xl transition-all"
              >
                Register Free
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WebMcpTools />
      <ListBusinessCta />
    </div>
  )
}
