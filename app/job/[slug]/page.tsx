import { cache } from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { MapPin, Briefcase, Banknote, Building2, ArrowLeft } from 'lucide-react'
import { fetchJobBySlug } from '@/lib/public-listings'
import { applyPendingEdit } from '@/lib/edit-requests'

// Job detail route — SERVER component (same pattern as
// /company/[slug]): the job is fetched HERE, on the server, and
// rendered into the initial HTML. The browser makes no Firestore
// read for it (anti-scrape), and the per-listing SEO is real
// server output — generateMetadata plus an inline JobPosting
// JSON-LD script.
//
// Visibility posture: jobs have NO release cycle, and the public
// URL reflects PUBLIC visibility only — the server reads
// anonymously, so a job appears here exactly when a visitor could
// see it: status 'approved'. Owners manage pending jobs from
// their dashboard; admins from the admin panel.

// Job posts refresh at most every 7 days (owner decision 2026-10-31);
// approvals refresh instantly via on-demand revalidation.
export const revalidate = 604800

/** One anonymous read per request, shared by metadata + page. */
const loadJob = cache(async (slug: string): Promise<any | null> => {
  const found = await fetchJobBySlug(slug)
  if (!found || found.data?.status !== 'approved') return null
  const raw = { id: found.id, ...found.data }
  return applyPendingEdit(raw, Date.now())
})

function metaDescriptionFor(job: any): string {
  const rawDesc = (job.description || '').replace(/\s+/g, ' ').trim()
  return rawDesc
    ? `${rawDesc.slice(0, 150)}${rawDesc.length > 150 ? '...' : ''}`
    : `${job.title} at ${job.companyName || 'a Pakistani employer'} in ${job.city || 'Pakistan'}. Salary, role details and application contact on LocalePak.`
}

/** Stored job-type label → schema.org employmentType (Remote is a location, not a type). */
function employmentTypeFor(jobType: string): string | null {
  if (jobType === 'Full-time') return 'FULL_TIME'
  if (jobType === 'Part-time') return 'PART_TIME'
  if (jobType === 'Contract') return 'CONTRACTOR'
  if (jobType === 'Internship') return 'INTERN'
  return null
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const job = await loadJob(slug)
  // The page calls notFound(); noindex keeps this slug out of the
  // index instead of inheriting the homepage meta.
  if (!job) return { robots: { index: false, follow: false } }
  return {
    title: `${job.title} at ${job.companyName || 'Employer'} in ${job.city || 'Pakistan'} | LocalePak`,
    description: metaDescriptionFor(job),
    alternates: { canonical: `https://www.localepak.com/job/${job.slug || slug}/` },
    openGraph: {
      title: `${job.title} at ${job.companyName || 'Employer'} in ${job.city || 'Pakistan'} | LocalePak`,
      description: metaDescriptionFor(job),
      url: `https://www.localepak.com/job/${job.slug || slug}/`,
      siteName: 'LocalePak',
      locale: 'en_PK',
      type: 'website',
    },
  }
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const job = await loadJob(slug)
  if (!job) notFound()

  // JobPosting JSON-LD — only fields stored on the job document.
  const employmentType = employmentTypeFor(job.jobType || '')
  const postedMs = typeof job.createdAt === 'number' && job.createdAt > 0 ? job.createdAt : null
  const jsonLd: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description || '',
    hiringOrganization: {
      '@type': 'Organization',
      name: job.companyName || 'Employer',
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.city || 'Pakistan',
        addressCountry: 'PK',
      },
    },
    ...(employmentType ? { employmentType } : {}),
    ...(job.jobType === 'Remote' ? { jobLocationType: 'TELECOMMUTE' } : {}),
    ...(postedMs ? { datePosted: new Date(postedMs).toISOString() } : {}),
    url: `https://www.localepak.com/job/${job.slug || slug}/`,
  }

  const paragraphs = (job.description || '')
    .split(/\n+/)
    .map((p: string) => p.trim())
    .filter(Boolean)

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        <Link
          href="/jobs"
          prefetch={false}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> All Jobs
        </Link>

        <article className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex items-start gap-4">
            <span className="shrink-0 w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center">
              <Briefcase className="w-6 h-6" />
            </span>
            <div className="min-w-0">
              <h1 className="text-2xl font-extrabold text-slate-900 leading-tight">{job.title}</h1>
              {job.companyName && (
                <p className="text-sm text-slate-500 font-semibold mt-1 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-emerald-600" /> {job.companyName}
                </p>
              )}
              {job.jobType && (
                <span className="inline-block mt-2 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-[11px] font-bold">
                  {job.jobType}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600 font-medium">
            {job.city && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-600" /> {job.city}
              </span>
            )}
            {job.salaryRange && (
              <span className="flex items-center gap-1.5">
                <Banknote className="w-4 h-4 text-emerald-600" /> {job.salaryRange}
              </span>
            )}
          </div>

          {paragraphs.length > 0 && (
            <div className="space-y-3">
              {paragraphs.map((p: string, i: number) => (
                <p key={i} className="text-sm text-slate-700 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          )}

          {job.contact && (
            <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-4">
              <p className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 mb-1">
                How to apply
              </p>
              <p className="text-sm text-slate-800 font-semibold break-words">{job.contact}</p>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </div>
  )
}
