// ============================================================
// LocalePak — paid listing tiers
// ------------------------------------------------------------
// Every new listing (business, company, job, professional
// profile) is sold on one of three tiers. Prices are PKR.
//
//   Basic    PKR 99  — add once, no edits
//   Premium  PKR 199 — edits + up to 3 projects
//   Featured PKR 299 — edits + up to 5 projects + 2 blog posts
//
// Tier rules:
// - Basic listings can never be edited. The owner can delete
//   the listing and submit a new one instead.
// - Premium / Featured owners request edits from their
//   dashboard. An approved edit goes live at the next weekly
//   release boundary (lib/release.ts) — the same 7-day batch
//   rhythm as newly approved businesses.
// - Projects live on the listing document itself (an array),
//   so they need no extra collection. Blog posts are their own
//   collection (blog_posts) and need admin approval.
// ============================================================

export type ListingTier = 'basic' | 'premium' | 'featured'

export type ListingType = 'business' | 'company' | 'job' | 'professional'

export const LISTING_COLLECTION: Record<ListingType, string> = {
  business: 'businesses',
  company: 'companies',
  job: 'jobs',
  professional: 'professionals',
}

export const LISTING_TYPE_LABEL: Record<ListingType, string> = {
  business: 'business listing',
  company: 'company profile',
  job: 'job post',
  professional: 'professional profile',
}

export const LISTING_TYPE_DASHBOARD: Record<ListingType, 'Business' | 'Company' | 'Job' | 'Professional'> = {
  business: 'Business',
  company: 'Company',
  job: 'Job',
  professional: 'Professional',
}

export type TierDef = {
  label: string
  price: number
  tagline: string
  features: string[]
  canEdit: boolean
  projectLimit: number
  blogLimit: number
}

export const TIERS: Record<ListingTier, TierDef> = {
  basic: {
    label: 'Basic',
    price: 99,
    tagline: 'Get listed — one-time add',
    features: ['Listed on LocalePak after approval', 'Shows in search, city and category pages', 'No edits after submission'],
    canEdit: false,
    projectLimit: 0,
    blogLimit: 0,
  },
  premium: {
    label: 'Premium',
    price: 199,
    tagline: 'Edit anytime + showcase work',
    features: ['Everything in Basic', 'Edit your listing (via approval)', 'Up to 3 projects on your listing'],
    canEdit: true,
    projectLimit: 3,
    blogLimit: 0,
  },
  featured: {
    label: 'Featured',
    price: 299,
    tagline: 'Maximum visibility + content',
    features: ['Everything in Premium', 'Up to 5 projects on your listing', 'Publish up to 2 blog posts'],
    canEdit: true,
    projectLimit: 5,
    blogLimit: 2,
  },
}

export const TIER_ORDER: ListingTier[] = ['basic', 'premium', 'featured']

export function tierLabel(tier?: string | null): string {
  if (tier === 'premium') return 'Premium'
  if (tier === 'featured') return 'Featured'
  return 'Basic'
}

export function tierPrice(tier?: string | null): number {
  if (tier === 'premium') return TIERS.premium.price
  if (tier === 'featured') return TIERS.featured.price
  return TIERS.basic.price
}

export function canEditTier(tier?: string | null): boolean {
  return tier === 'premium' || tier === 'featured'
}

export function projectLimitFor(tier?: string | null): number {
  if (tier === 'premium') return TIERS.premium.projectLimit
  if (tier === 'featured') return TIERS.featured.projectLimit
  return 0
}

export function blogLimitFor(tier?: string | null): number {
  return tier === 'featured' ? TIERS.featured.blogLimit : 0
}

export function formatPKR(amount: number): string {
  return `PKR ${amount.toLocaleString('en-PK')}`
}

export type Project = {
  title: string
  description: string
  link?: string
}

/** A project is valid only with a title and a description. */
export function isValidProject(p: any): p is Project {
  return (
    p &&
    typeof p.title === 'string' &&
    p.title.trim().length > 0 &&
    typeof p.description === 'string' &&
    p.description.trim().length > 0
  )
}
