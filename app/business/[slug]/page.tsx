import { cache } from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BusinessDetailClient from '@/components/business-detail-client'
import SeedBusinessDetail from '@/components/seed-business-detail'
import { SEED_BUSINESSES, getSeedBusiness } from '@/lib/seed-businesses'
import type { SeedBusiness } from '@/lib/seed-businesses'
import { fetchBusinessBySlug } from '@/lib/public-listings'
import { isReleased, releaseDateLabel } from '@/lib/release'
import { applyPendingEdit } from '@/lib/edit-requests'

// Business detail route — two kinds of listings:
// 1. SEED listings (lib/seed-businesses.ts): directory-created pages for
//    real businesses. Their public URLs (/business/<slug>) are rewritten
//    in next.config.mjs to the dedicated /seed-business/[slug] route,
//    which carries a 2-year revalidate — seed data only ever changes
//    via a code deploy (which rebuilds them anyway), so they never
//    need a short ISR window. They are still listed in
//    generateStaticParams here as a fallback, so a missed rewrite
//    still renders the seed page instead of a 404.
// 2. FIRESTORE listings (owner-added via the dashboard): any other slug
//    is fetched HERE, on the server, and handed to the client island
//    as props: the profile renders into the initial HTML and the
//    browser makes no Firestore read for it. Only the interactive
//    parts (reviews) still run client-side. The revalidate below
//    covers these Firestore listings only.
//
//    Note the public URL now reflects PUBLIC visibility only: the
//    server reads anonymously, so a Firestore listing appears here
//    exactly when a visitor could see it — status 'approved' and past
//    its weekly release boundary. Owners manage pending listings from
//    their dashboard; admins from the admin panel. Missing and
//    non-approved slugs are a real 404 (notFound), not a soft-404
//    page at HTTP 200; approved-but-unreleased slugs keep their
//    deliberate release-date state.

export const dynamicParams = true

// Firestore listings refresh at most every 7 days (owner decision
// 2026-10-31); approvals refresh instantly via on-demand revalidation
// (lib/revalidate.ts), and seed listings use the 2-year route instead.
export const revalidate = 63072000

export function generateStaticParams() {
  return SEED_BUSINESSES.map((b) => ({ slug: b.slug }))
}

/** One anonymous read per request, shared by metadata + page. Approved only. */
const loadBusiness = cache(async (slug: string): Promise<any | null> => {
  const found = await fetchBusinessBySlug(slug)
  if (!found || found.data?.status !== 'approved') return null
  return { id: found.id, ...found.data }
})

/**
 * Title guard (owner's spec: 50-60 chars, 65 hard ceiling). The full
 * form is used when it fits; otherwise the category is dropped — the
 * business name itself is never truncated. A handful of very long
 * names still exceed 65 even in the short form (name + city + brand
 * alone); those are reported as outliers rather than cut.
 */
function businessTitle(name: string, category: string | undefined, city: string | undefined): string {
  const cityLabel = city || 'Pakistan'
  const full = category
    ? `${name} — ${category} in ${cityLabel} | LocalePak`
    : `${name} in ${cityLabel} | LocalePak`
  if (full.length <= 65) {
    if (full.length >= 50) return full
    // Short name: extend with one generic directory word (never a
    // business fact) so the title uses the snippet instead of wasting
    // it. Guarded so a category already ending in "Services" gets
    // "Providers" instead of the redundant "Services Services".
    if (category) {
      const extender = /services$/i.test(category) ? 'Providers' : 'Services'
      const extended = `${name} — ${category} ${extender} in ${cityLabel} | LocalePak`
      if (extended.length >= 50 && extended.length <= 65) return extended
    }
    return full
  }
  // Full form over 65: category dropped (name never truncated).
  const fallback = `${name} in ${cityLabel} | LocalePak`
  if (fallback.length >= 50) return fallback
  // Fallback itself short: pad with a generic, claim-free suffix
  // (no contact claim — phone-less listings must not imply contact
  // details exist). Covers every observed fallback length 37-49.
  const padded = `${name} in ${cityLabel}: Details & More | LocalePak`
  if (padded.length >= 50 && padded.length <= 65) return padded
  return fallback
}

/** Word-boundary truncate to at most `max` chars, keeping whole words. */
function truncateWords(text: string, max: number): string {
  if (text.length <= max) return text
  const cut = text.slice(0, max)
  const lastSpace = cut.lastIndexOf(' ')
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd()
}

/**
 * Interest-led description (120-158 chars) from a Firestore business's
 * own description. Longer descriptions are word-boundary truncated;
 * shorter ones are topped up with generic directory wording only —
 * no business facts are invented.
 */
function firestoreMetaDescription(business: any): string {
  const raw = (business.description || '').replace(/\s+/g, ' ').trim()
  if (raw.length >= 120) {
    if (raw.length <= 158) return raw
    return `${truncateWords(raw, 155)}...`
  }
  const categoryLabel = business.category || business.mainCategory || 'Business'
  let desc = raw || `${business.name} is a ${categoryLabel} business in ${business.city || 'Pakistan'}.`
  const suffixes = [
    'Find contact details and more on LocalePak.',
    'Browse similar options to compare and choose the right one.',
    'See its LocalePak profile for more details.',
  ]
  for (const suffix of suffixes) {
    if (desc.length >= 120) break
    desc = `${desc} ${suffix}`
  }
  if (desc.length > 158) return `${truncateWords(desc, 155)}...`
  return desc
}

/**
 * Seed description (120-158 chars, interest-led) built ONLY from the
 * seed's own attributes: name, city, category and phone presence.
 * Phone seeds may reference calling the number listed here; phone-less
 * seeds never claim contact details exist and use a discovery angle
 * (browsing more options in the same city/category) instead. The
 * candidate tails are tried longest-first within the 158 ceiling, so
 * every seed lands in range whatever its name length.
 */
function seedMetaDescription(seed: SeedBusiness): string {
  const base = `Find ${seed.name} in ${seed.city} — ${seed.category} on LocalePak.`
  const tails = seed.phone
    ? [
        ' Call the number listed here to check availability.',
        ' Call the number listed here to check services and availability.',
        ' Call the number listed here to check services and timings before you visit.',
      ]
    : [
        ' Browse more options in this city to compare.',
        ' Browse more options in this city and category to compare and choose.',
        ' Browse more options in this city and category to compare choices and find the right fit.',
        ' Browse more options in this city and category to compare choices, check what suits you, and find the right fit.',
      ]
  const candidates = tails.map((tail) => `${base}${tail}`)
  const fitting = candidates.filter((candidate) => candidate.length <= 158)
  return fitting.length > 0 ? fitting[fitting.length - 1] : candidates[0]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const seed = getSeedBusiness(slug)
  if (seed) {
    const title = businessTitle(seed.name, seed.category, seed.city)
    const description = seedMetaDescription(seed)
    const canonical = `https://www.localepak.com/business/${seed.slug}/`
    return {
      title,
      description,
      alternates: { canonical },
      openGraph: {
        title: `${seed.name} | LocalePak`,
        description,
        url: canonical,
        siteName: 'LocalePak',
        locale: 'en_PK',
        type: 'website',
      },
      twitter: {
        card: 'summary',
        title: `${seed.name} | LocalePak`,
        description,
      },
    }
  }

  const business = await loadBusiness(slug)
  if (!business) {
    // The page calls notFound(); noindex keeps this slug out of the
    // index instead of inheriting the homepage meta.
    return { robots: { index: false, follow: false } }
  }
  const canonical = `https://www.localepak.com/business/${slug}/`
  const title = businessTitle(business.name, business.category || business.mainCategory, business.city)
  if (!isReleased(business.approvedAt, Date.now())) {
    // Approved but not yet released: an honest title only, no
    // description (the profile itself is still hidden) and noindex.
    return { title, robots: { index: false, follow: false } }
  }
  const description = firestoreMetaDescription(business)
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'LocalePak',
      locale: 'en_PK',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  }
}

export default async function BusinessDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const seed = getSeedBusiness(slug)
  if (seed) {
    return <SeedBusinessDetail business={seed} />
  }

  const business = await loadBusiness(slug)
  if (!business) notFound()

  // Approved edits that passed their 7-day boundary are merged onto
  // the stored listing before rendering (lib/edit-requests.ts).
  const mergedBusiness = applyPendingEdit(business, Date.now())

  let initialBusiness: any = null
  let initialUnreleased: { name: string; releaseLabel: string } | null = null
  // Weekly batch release (lib/release.ts): an approved business
  // stays hidden until the next 7-day cycle boundary passes. This
  // state is intentional release-cycle UX, NOT a soft-404.
  if (!isReleased(mergedBusiness.approvedAt, Date.now())) {
    initialUnreleased = {
      name: mergedBusiness.name || 'This business',
      releaseLabel: releaseDateLabel(Date.now()),
    }
  } else {
    initialBusiness = mergedBusiness
  }
  return (
    <BusinessDetailClient
      slug={slug}
      initialBusiness={initialBusiness}
      initialUnreleased={initialUnreleased}
    />
  )
}
