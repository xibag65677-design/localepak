import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  Building2,
  ChevronRight,
  ExternalLink,
  Globe,
  MapPin,
  Phone,
  Share2,
} from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import {
  FIND_US_ALL_URLS,
  FIND_US_CATEGORIES,
  FIND_US_TOTAL_LINKS,
  type FindUsCategory,
} from '@/lib/find-us-links'

const PAGE_URL = 'https://www.localepak.com/find-us'

// Revalidate every 30 days: profile links change rarely, so the page stays
// cached and cheap to serve between deploys.
export const revalidate = 2592000

export function generateMetadata(): Metadata {
  const title = 'Find Us Online – Official LocalePak Profiles & Listings | LocalePak'
  const description =
    'Discover LocalePak’s official online profiles, business listings, social media accounts, and other platforms where you can connect with us.'

  return {
    title,
    description,
    alternates: {
      canonical: PAGE_URL,
    },
    openGraph: {
      title,
      description,
      url: PAGE_URL,
      siteName: 'LocalePak',
      locale: 'en_PK',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

const CATEGORY_ICONS: Record<FindUsCategory['id'], typeof Share2> = {
  social: Share2,
  directories: Building2,
  listings: BookOpen,
  other: Globe,
}

/** Monogram tile for a platform — no brand logos, no extra dependencies. */
function PlatformMark({ name }: { name: string }) {
  const letters = name
    .replace(/[^A-Za-z0-9 ]/g, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()

  return (
    <span
      aria-hidden="true"
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-sm font-extrabold tracking-tight text-white"
    >
      {letters || 'L'}
    </span>
  )
}

export default function FindUsPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${PAGE_URL}/#webpage`,
        url: PAGE_URL,
        name: 'Find Us Online – Official LocalePak Profiles & Listings',
        description:
          'Discover our official online profiles, business listings, social media accounts, and other platforms where you can connect with us.',
        isPartOf: { '@id': 'https://www.localepak.com/#website' },
        about: {
          '@type': 'Organization',
          name: 'LocalePak',
          url: 'https://www.localepak.com/',
          sameAs: FIND_US_ALL_URLS,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${PAGE_URL}/#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.localepak.com/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Find Us Online',
            item: PAGE_URL,
          },
        ],
      },
    ],
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main id="main-content">
        {/* Hero */}
        <section className="relative overflow-hidden bg-[#0F172A] text-white">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-emerald-600/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-emerald-500/15 blur-3xl"
          />

          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <nav aria-label="Breadcrumb" className="mb-10">
              <ol className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-300">
                <li>
                  <Link href="/" className="transition-colors hover:text-white">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="h-4 w-4 text-slate-500" />
                </li>
                <li aria-current="page" className="text-white">
                  Find Us Online
                </li>
              </ol>
            </nav>

            <div className="max-w-4xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-200">
                <Globe className="h-4 w-4" />
                {FIND_US_TOTAL_LINKS} verified profiles
              </span>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Find Us Online
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
                Discover our official online profiles, business listings, social media accounts, and
                other platforms where you can connect with us.
              </p>

              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-400">
                Every link below goes to a real, verified LocalePak profile — Pakistan&apos;s free
                business directory, founded in 2026, covering 183 cities and 24 categories from our
                Islamabad office.
              </p>
            </div>
          </div>
        </section>

        {/* Categories — rendered entirely from lib/find-us-links.ts */}
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          {FIND_US_CATEGORIES.map((category) => {
            const Icon = CATEGORY_ICONS[category.id]
            return (
              <section key={category.id} aria-label={category.title} className="mb-14 last:mb-0">
                <div className="mb-6 flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                      {category.title}
                    </h2>
                    <p className="mt-2 max-w-3xl leading-relaxed text-slate-600">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {category.links.map((link) => (
                    <article
                      key={link.url}
                      className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <div className="flex items-start gap-4">
                        <PlatformMark name={link.name} />
                        <div className="min-w-0">
                          <h3 className="text-lg font-extrabold leading-snug text-slate-900">
                            {link.name}
                          </h3>
                          <p className="mt-1 break-words text-xs font-medium text-slate-500">
                            {new URL(link.url).hostname}
                          </p>
                        </div>
                      </div>

                      <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">
                        {link.description}
                      </p>

                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit Profile: LocalePak on ${link.name} (opens in a new tab)`}
                        className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-700"
                      >
                        Visit Profile
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </article>
                  ))}
                </div>
              </section>
            )
          })}
        </div>

        {/* Contact strip — NAP, same as the site footer */}
        <section className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
              Prefer to reach us directly?
            </h2>
            <p className="mt-3 leading-relaxed text-slate-600">
              Visit our office or get in touch — we are Pakistan&apos;s free business directory,
              founded in 2026.
            </p>
            <div className="mt-6 flex flex-col gap-3 text-sm font-semibold text-slate-700 sm:flex-row sm:flex-wrap sm:gap-x-8">
              <span className="inline-flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                Office 303, Evacuee Trust Complex, F-5/1, Islamabad 44000
              </span>
              <span className="inline-flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-emerald-600" />
                +923345636230
              </span>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-emerald-700"
              >
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-800 transition-colors hover:border-emerald-300 hover:text-emerald-700"
              >
                About LocalePak
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
