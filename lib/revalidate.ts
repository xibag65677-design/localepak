'use server'

import { revalidatePath } from 'next/cache'
import { CATEGORIES } from './data'

export type ListingKind = 'business' | 'company' | 'job' | 'professional'

function slugify(value: string): string {
  return (value || '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Refresh a listing's public pages right after an admin approval, so a
 * page cached while the listing was still pending (notably a cached 404
 * on the detail page, or a stale index) is replaced immediately instead
 * of waiting out the ISR window. This is what makes "approve = live now"
 * true even with long revalidate windows on detail/category pages.
 *
 * Best effort by design: it must never fail the approval itself, so
 * every path is guarded and the whole call swallows errors.
 */
export async function revalidateApprovedListing(input: {
  kind: ListingKind
  slug?: string
  category?: string
  city?: string
  /**
   * True when the listing is (now) Featured — the homepage Featured
   * Businesses section renders from doc.featured, so '/' must refresh
   * too. Only business listings appear there; companies/jobs/
   * professionals never trigger a homepage refresh.
   */
  featured?: boolean
}): Promise<void> {
  try {
    const { kind, slug, category, city, featured } = input
    const detailBase =
      kind === 'business' ? 'business' : kind === 'company' ? 'company' : kind === 'job' ? 'job' : 'professional'
    const indexBase =
      kind === 'business'
        ? 'businesses'
        : kind === 'company'
          ? 'companies'
          : kind === 'job'
            ? 'jobs'
            : 'professionals'
    const paths: string[] = []
    if (slug) paths.push(`/${detailBase}/${slug}`)
    paths.push(`/${indexBase}`)
    if (kind === 'business') {
      // Category pages are keyed by category id (lib/data CATEGORIES),
      // not by the display name stored on the listing.
      const catId = category
        ? CATEGORIES.find(
            (c) => c.id === category.toLowerCase() || c.name.toLowerCase() === category.toLowerCase(),
          )?.id
        : undefined
      const citySlug = city ? slugify(city) : undefined
      if (catId) paths.push(`/category/${catId}`)
      if (citySlug) paths.push(`/city/${citySlug}`)
      if (citySlug && catId) paths.push(`/city/${citySlug}/${catId}`)
      // A newly Featured business joins the homepage Featured section.
      if (featured) paths.push('/')
    }
    for (const p of paths) {
      try {
        revalidatePath(p)
      } catch {
        // A path that was never cached is a harmless no-op; keep going.
      }
    }
  } catch {
    // Never fail the approval that triggered this refresh.
  }
}

/**
 * Refresh the homepage after a manual admin Feature/Unfeature toggle
 * (app/admin/businesses). The toggle writes doc.featured directly, so
 * it bypasses revalidateApprovedListing — without this the homepage
 * Featured section would stay stale until the next deploy.
 * Best effort by design, same as revalidateApprovedListing.
 */
export async function revalidateHomepage(): Promise<void> {
  try {
    revalidatePath('/')
  } catch {
    // ignore — a path that was never cached is a harmless no-op
  }
}
