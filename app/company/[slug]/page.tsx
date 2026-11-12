import { cache } from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { MapPin, Phone, Globe, Mail, ArrowLeft, Briefcase } from 'lucide-react'
import { fetchCompanyBySlug } from '@/lib/public-listings'
import { applyPendingEdit } from '@/lib/edit-requests'
import { isValidProject, type Project } from '@/lib/tiers'

// Company detail route — SERVER component (Round 3 parity with
// /business/[slug]): the company is fetched HERE, on the server, and
// rendered into the initial HTML. The browser makes no Firestore read
// for it (anti-scrape), and the per-listing SEO that the old client
// page applied with effects (document.title, meta description,
// Organization JSON-LD) is now real server output — generateMetadata
// plus an inline JSON-LD script — which is strictly better for
// crawlers than the post-hydration DOM edits it replaces.
//
// Visibility posture (unchanged): companies have NO weekly release
// cycle, and the public URL reflects PUBLIC visibility only — the
// server reads anonymously, so a company appears here exactly when a
// visitor could see it: status 'approved'. Owners manage pending
// companies from their dashboard; admins from the admin panel.

// Company profiles refresh at most every 7 days (owner decision
// 2026-10-31); approvals refresh instantly via on-demand revalidation.
export const revalidate = 604800

/** One anonymous read per request, shared by metadata + page. */
const loadCompany = cache(async (slug: string): Promise<any | null> => {
  const found = await fetchCompanyBySlug(slug)
  if (!found || found.data?.status !== 'approved') return null
  const raw = { id: found.id, ...found.data }
  return applyPendingEdit(raw, Date.now())
})

function metaDescriptionFor(company: any): string {
  const industryLabel = company.industry || company.category || 'Company'
  const rawDesc = (company.description || '').replace(/\s+/g, ' ').trim()
  return rawDesc
    ? `${rawDesc.slice(0, 150)}${rawDesc.length > 150 ? '...' : ''}`
    : `${company.name} is a ${industryLabel} company in ${company.city || 'Pakistan'}. Contact details and company profile on LocalePak.`
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const company = await loadCompany(slug)
  // The page calls notFound(); noindex keeps this slug out of the
  // index instead of inheriting the homepage meta.
  if (!company) return { robots: { index: false, follow: false } }
  const industryLabel = company.industry || company.category || 'Company'
  return {
    title: `${company.name} — ${industryLabel} in ${company.city || 'Pakistan'} | LocalePak`,
    description: metaDescriptionFor(company),
  }
}

export default async function CompanyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const company = await loadCompany(slug)
  if (!company) notFound()

  // Organization JSON-LD — same fields the old client page injected.
  let jsonLd: Record<string, any> | null = null
  if (company) {
    const sameAs = [company.website].filter(Boolean)
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: company.name,
      url: `https://www.localepak.com/company/${company.slug || slug}`,
    }
    if (company.description) jsonLd.description = company.description
    if (company.phone) jsonLd.telephone = company.phone
    if (company.email) jsonLd.email = company.email
    if (company.address || company.city) {
      jsonLd.address = {
        '@type': 'PostalAddress',
        ...(company.address ? { streetAddress: company.address } : {}),
        ...(company.city ? { addressLocality: company.city } : {}),
        addressCountry: 'PK',
      }
    }
    if (sameAs.length > 0) jsonLd.sameAs = sameAs
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        <Link href="/companies" className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 hover:text-emerald-700 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Companies
        </Link>

        {company && (
          <section className="bg-white rounded-3xl border border-slate-200 p-8 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              {(company.industry || company.category) && (
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-[11px] font-bold">
                  {company.industry || company.category}
                </span>
              )}
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900">{company.name}</h1>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500 font-medium">
              {company.city && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-600" /> {company.city}
                </span>
              )}
              {company.phone && (
                <span className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-emerald-600" /> {company.phone}
                </span>
              )}
              {company.email && (
                <span className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-slate-400" /> {company.email}
                </span>
              )}
            </div>

            {company.description && (
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{company.description}</p>
            )}

            {company.address && (
              <p className="text-sm text-slate-600">
                <strong className="text-slate-800">Address:</strong> {company.address}
                {company.city ? `, ${company.city}` : ''}
              </p>
            )}

            {Array.isArray(company.projects) && company.projects.filter(isValidProject).length > 0 && (
              <div className="space-y-3 pt-2">
                <h2 className="font-extrabold text-slate-900 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-emerald-600" /> Projects
                </h2>
                <ul className="space-y-3">
                  {(company.projects as Project[]).filter(isValidProject).map((project, i) => (
                    <li key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                      <p className="font-bold text-slate-900 text-sm">{project.title}</p>
                      <p className="text-sm text-slate-600 leading-relaxed mt-1">{project.description}</p>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 mt-2"
                        >
                          View project →
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-wrap gap-3 pt-2">
              {company.phone && (
                <a
                  href={`tel:${company.phone}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-colors"
                >
                  <Phone className="w-4 h-4" /> Call Now
                </a>
              )}
              {company.email && (
                <a
                  href={`mailto:${company.email}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-colors"
                >
                  <Mail className="w-4 h-4" /> Send Email
                </a>
              )}
              {company.website && (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 hover:border-emerald-500 text-slate-700 font-bold text-sm rounded-xl transition-colors"
                >
                  <Globe className="w-4 h-4" /> Visit Website
                </a>
              )}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
