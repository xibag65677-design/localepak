import { cache } from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { MapPin, Phone, MessageCircle, ArrowLeft, Briefcase, Clock, Github, Linkedin, Facebook, Globe } from 'lucide-react'
import { fetchProfessionalBySlug } from '@/lib/public-listings'
import { applyPendingEdit } from '@/lib/edit-requests'
import { isValidProject, type Project } from '@/lib/tiers'

// Professional detail route — SERVER component (same posture as
// /company/[slug]): the profile is fetched HERE, on the server, and
// rendered into the initial HTML. The browser makes no Firestore read
// for it (anti-scrape). Approved profiles are public immediately —
// professionals have no weekly release cycle. Approved edits that
// passed their 7-day boundary are merged onto the stored profile
// before rendering (lib/edit-requests.ts).

// Professional profiles refresh at most every 7 days (owner decision
// 2026-10-31); approvals refresh instantly via on-demand revalidation.
export const revalidate = 604800

/** One anonymous read per request, shared by metadata + page. */
const loadProfessional = cache(async (slug: string): Promise<any | null> => {
  const found = await fetchProfessionalBySlug(slug)
  if (!found || found.data?.status !== 'approved') return null
  const raw = { id: found.id, ...found.data }
  return applyPendingEdit(raw, Date.now())
})

function metaDescriptionFor(pro: any): string {
  const rawDesc = (pro.description || '').replace(/\s+/g, ' ').trim()
  return rawDesc
    ? `${rawDesc.slice(0, 150)}${rawDesc.length > 150 ? '...' : ''}`
    : `${pro.name} is a ${pro.profession || 'professional'} in ${pro.city || 'Pakistan'}. Contact details and professional profile on LocalePak.`
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const pro = await loadProfessional(slug)
  if (!pro) return { robots: { index: false, follow: false } }
  return {
    title: `${pro.name} — ${pro.profession || 'Professional'} in ${pro.city || 'Pakistan'} | LocalePak`,
    description: metaDescriptionFor(pro),
  }
}

export default async function ProfessionalDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const pro = await loadProfessional(slug)
  if (!pro) notFound()

  let jsonLd: Record<string, any> | null = null
  if (pro) {
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: pro.name,
      url: `https://www.localepak.com/professional/${pro.slug || slug}`,
    }
    if (pro.description) jsonLd.description = pro.description
    if (pro.phone) jsonLd.telephone = pro.phone
    if (pro.address || pro.city) {
      jsonLd.address = {
        '@type': 'PostalAddress',
        ...(pro.address ? { streetAddress: pro.address } : {}),
        ...(pro.city ? { addressLocality: pro.city } : {}),
        addressCountry: 'PK',
      }
    }
  }

  const projects: Project[] = Array.isArray(pro.projects) ? pro.projects.filter(isValidProject) : []

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
        <Link href="/professionals" className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 hover:text-emerald-700 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Professionals
        </Link>

        {pro && (
          <section className="bg-white rounded-3xl border border-slate-200 p-8 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              {pro.profession && (
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-[11px] font-bold">
                  {pro.profession}
                </span>
              )}
              {pro.specialization && (
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-bold">
                  {pro.specialization}
                </span>
              )}
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900">{pro.name}</h1>
            {pro.headline && (
              <p className="text-base text-slate-600 font-medium -mt-2">{pro.headline}</p>
            )}
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500 font-medium">
              {pro.city && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-600" /> {pro.city}
                </span>
              )}
              {pro.phone && (
                <span className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-emerald-600" /> {pro.phone}
                </span>
              )}
              {pro.experience && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-600" /> {pro.experience} experience
                </span>
              )}
            </div>

            {pro.description && (
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{pro.description}</p>
            )}

            {pro.address && (
              <p className="text-sm text-slate-600">
                <strong className="text-slate-800">Address:</strong> {pro.address}
                {pro.city ? `, ${pro.city}` : ''}
              </p>
            )}

            {pro.skills && (
              <div className="space-y-2">
                <h2 className="font-extrabold text-slate-900 text-sm">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {String(pro.skills).split(',').map((s: string) => s.trim()).filter(Boolean).map((skill: string) => (
                    <span key={skill} className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-bold">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {pro.services && (
              <div className="space-y-1">
                <h2 className="font-extrabold text-slate-900 text-sm">Services Offered</h2>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{pro.services}</p>
              </div>
            )}

            {pro.education && (
              <p className="text-sm text-slate-600">
                <strong className="text-slate-800">Education:</strong> {pro.education}
              </p>
            )}

            {pro.languages && (
              <p className="text-sm text-slate-600">
                <strong className="text-slate-800">Languages:</strong> {pro.languages}
              </p>
            )}

            {projects.length > 0 && (
              <div className="space-y-3 pt-2">
                <h2 className="font-extrabold text-slate-900 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-emerald-600" /> Projects
                </h2>
                <ul className="space-y-3">
                  {projects.map((project, i) => (
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
              {pro.phone && (
                <a
                  href={`tel:${pro.phone}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-colors"
                >
                  <Phone className="w-4 h-4" /> Call Now
                </a>
              )}
              {pro.whatsapp && (
                <a
                  href={`https://wa.me/${pro.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 hover:border-emerald-500 text-slate-700 font-bold text-sm rounded-xl transition-colors"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
              )}
            </div>

            {(pro.githubUrl || pro.linkedinUrl || pro.facebookUrl || pro.portfolioUrl) && (
              <div className="flex flex-wrap gap-2 pt-1">
                {pro.githubUrl && (
                  <a href={pro.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-full transition-colors">
                    <Github className="w-3.5 h-3.5" /> GitHub
                  </a>
                )}
                {pro.linkedinUrl && (
                  <a href={pro.linkedinUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0A66C2] text-white font-bold text-xs rounded-full transition-colors">
                    <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                  </a>
                )}
                {pro.facebookUrl && (
                  <a href={pro.facebookUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1877F2] text-white font-bold text-xs rounded-full transition-colors">
                    <Facebook className="w-3.5 h-3.5" /> Facebook
                  </a>
                )}
                {pro.portfolioUrl && (
                  <a href={pro.portfolioUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 hover:border-emerald-500 text-slate-700 font-bold text-xs rounded-full transition-colors">
                    <Globe className="w-3.5 h-3.5" /> Portfolio
                  </a>
                )}
              </div>
            )}
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
