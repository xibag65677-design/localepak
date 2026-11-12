import { MetadataRoute } from 'next'
import { CATEGORIES, CITIES, TOP_CITIES } from '@/lib/data'
import { BLOG_POSTS } from '@/lib/blog-data'
import { SEED_BUSINESSES } from '@/lib/seed-businesses'
import { getSitemapGapData } from '@/lib/public-listings'

const BASE = 'https://www.localepak.com'

function canonicalUrl(path: string): string {
  if (path === '' || path === '/') return `${BASE}/`
  return `${BASE}${path.startsWith('/') ? path : `/${path}`}/`
}

function citySlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-')
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Indexable core + policy pages only. /search is noindex, and
  // /login, /register, /dashboard are auth/utility pages — none belong here.
  // /add-business and /add-company ARE indexable: they render fully for
  // signed-out visitors (only the submit is gated behind sign-in).
  const corePages = [
    '',
    '/about',
    '/contact',
    '/categories',
    '/cities',
    '/businesses',
    '/add-business',
    '/companies',
    '/add-company',
    '/professionals',
    '/jobs',
    '/blog',
    '/faqs',
    '/help-center',
    '/support',
    '/careers',
    '/advertise-with-us',
    '/find-us',
    '/html-sitemap',
    '/docs',
  ]

  const policyPages = [
    '/privacy',
    '/terms',
    '/cookie-policy',
    '/disclaimer',
    '/refund-policy',
    '/editorial-policy',
    '/community-guidelines',
    '/business-listing-guidelines',
    '/verification-policy',
    '/accessibility',
    '/report-abuse',
  ]

  // No lastModified on static routes: stamping every URL with "today"
  // is a false freshness signal, so the field is omitted entirely.
  // One exception: /blog is genuinely updated whenever a blog post is
  // added or edited, so it carries the latest real blog date
  // (dateModified, else date) from lib/blog-data.ts.
  const latestBlogDate = Object.values(BLOG_POSTS)
    .map((post) => new Date(post.dateModified || post.date))
    .filter((d) => !Number.isNaN(d.getTime()))
    .sort((a, b) => b.getTime() - a.getTime())[0]
  const coreRoutes = [...corePages, ...policyPages].map((path) => ({
    url: canonicalUrl(path),
    ...(path === '/blog' && latestBlogDate
      ? { lastModified: latestBlogDate }
      : {}),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1.0 : 0.6,
  }))

  const categoryRoutes = CATEGORIES.map((cat) => ({
    url: canonicalUrl(`/category/${cat.id}`),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const cityRoutes = CITIES.map((city) => ({
    url: canonicalUrl(`/city/${citySlug(city)}`),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const cityCategoryRoutes = TOP_CITIES.flatMap((city) =>
    CATEGORIES.map((cat) => ({
      url: canonicalUrl(`/city/${citySlug(city)}/${cat.id}`),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  )

  // Keyword-gap extensions (2026-11-04, gaps 2/3/5) — all listing-
  // backed, computed server-side from seeds + released approved
  // owner listings (same approved-status query + release check the
  // public pages use, so no Firestore rules change was needed):
  //  - city×category combos for the 163 non-top cities, ONLY where
  //    a listing actually exists (empty combos stay noindex and out
  //    of the sitemap, exactly like the pages themselves);
  //  - approved owner business detail pages (seed pages are added
  //    separately below; slugs are deduplicated);
  //  - area pages that have at least one matching listing.
  // If the Firestore read fails, only seed-backed combos are added
  // and no owner slugs or area pages appear — fail-soft by design.
  const gapData = await getSitemapGapData()
  const topCitySlugs = new Set(TOP_CITIES.map(citySlug))
  const gapCityCategoryRoutes = gapData.listingBackedCombos
    .filter((combo) => !topCitySlugs.has(combo.citySlug))
    .map((combo) => ({
      url: canonicalUrl(`/city/${combo.citySlug}/${combo.categoryId}`),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  const seedSlugs = new Set(SEED_BUSINESSES.map((biz) => biz.slug))
  const ownerBusinessRoutes = gapData.ownerBusinessSlugs
    .filter((slug) => !seedSlugs.has(slug))
    .map((slug) => ({
      url: canonicalUrl(`/business/${slug}`),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  const areaRoutes = gapData.areaPages.map((area) => ({
    url: canonicalUrl(`/city/${area.citySlug}/area/${area.areaSlug}`),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const blogRoutes = Object.values(BLOG_POSTS).map((post) => {
    const realDate = post.dateModified || post.date
    const parsed = realDate ? new Date(realDate) : null
    return {
      url: canonicalUrl(`/blog/${post.slug}`),
      ...(parsed && !Number.isNaN(parsed.getTime()) ? { lastModified: parsed } : {}),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }
  })

  // Static seed business listings (lib/seed-businesses.ts) — fully
  // static pages, always indexable. Released approved owner listings
  // are added above as ownerBusinessRoutes (gap 5); they were
  // previously undiscoverable except via /businesses and search.
  const seedBusinessRoutes = SEED_BUSINESSES.map((biz) => ({
    url: canonicalUrl(`/business/${biz.slug}`),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...coreRoutes, ...categoryRoutes, ...cityRoutes, ...cityCategoryRoutes, ...gapCityCategoryRoutes, ...blogRoutes, ...seedBusinessRoutes, ...ownerBusinessRoutes, ...areaRoutes]
}
