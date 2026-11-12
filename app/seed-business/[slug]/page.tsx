import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import SeedBusinessDetail from '@/components/seed-business-detail'
import { SEED_BUSINESSES, getSeedBusiness } from '@/lib/seed-businesses'
import type { SeedBusiness } from '@/lib/seed-businesses'

// Internal seed-business route — NOT a public URL. Public seed URLs
// stay /business/<slug> (sitemap, links, canonicals all use that form);
// next.config.mjs rewrites each seed slug to this route internally, so
// the browser and crawlers never see /seed-business/<slug> (robots.txt
// also disallows it). This route exists for one reason only: a route
// segment has a single `revalidate` value, and seed pages must live far
// longer than Firestore listings. Seed data only ever changes via a
// code deploy — which rebuilds these pages anyway — so a 2-year ISR
// window (owner decision 2026-10-31: 1 year or more) is effectively
// "until the next deploy", with at most 116 ISR writes a year even if
// every seed page is visited weekly. Firestore business listings keep
// their own 7-day window on /business/[slug].
export const dynamicParams = false

export const revalidate = 63072000 // 2 years

export function generateStaticParams() {
  return SEED_BUSINESSES.map((b) => ({ slug: b.slug }))
}

// Title/description logic copied from app/business/[slug]/page.tsx so
// the rewritten seed pages keep byte-identical metadata. Keep both in
// sync if the spec changes.
function businessTitle(name: string, category: string | undefined, city: string | undefined): string {
  const cityLabel = city || 'Pakistan'
  const full = category
    ? `${name} — ${category} in ${cityLabel} | LocalePak`
    : `${name} in ${cityLabel} | LocalePak`
  if (full.length <= 65) {
    if (full.length >= 50) return full
    if (category) {
      const extender = /services$/i.test(category) ? 'Providers' : 'Services'
      const extended = `${name} — ${category} ${extender} in ${cityLabel} | LocalePak`
      if (extended.length >= 50 && extended.length <= 65) return extended
    }
    return full
  }
  const fallback = `${name} in ${cityLabel} | LocalePak`
  if (fallback.length >= 50) return fallback
  const padded = `${name} in ${cityLabel}: Details & More | LocalePak`
  if (padded.length >= 50 && padded.length <= 65) return padded
  return fallback
}

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
  if (!seed) return { robots: { index: false, follow: false } }
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

export default async function SeedBusinessPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const seed = getSeedBusiness(slug)
  if (!seed) notFound()
  return <SeedBusinessDetail business={seed} />
}
