import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { MapPin, Phone, MessageCircle, ArrowLeft, ArrowRight, Info, UserCheck } from 'lucide-react'
import { SEED_BUSINESSES } from '@/lib/seed-businesses'
import type { SeedBusiness } from '@/lib/seed-businesses'

// Fully static, server-rendered detail page for directory-created
// ("seed") business listings. No Firestore reads, no client JS state:
// the data comes from lib/seed-businesses.ts at build time and only
// publicly verified fields are shown.

function telHref(phone: string): string {
  // Some verified listings publish two numbers ("111-007-008 / 0304-111-7008");
  // the call button dials the first one.
  const first = phone.split('/')[0].trim()
  return `tel:${first.replace(/[\s()-]/g, '')}`
}

function whatsappDigits(raw: string): string {
  const first = (raw || '').split('/')[0]
  let digits = first.replace(/\D/g, '')
  if (digits.startsWith('0')) digits = `92${digits.slice(1)}`
  return digits
}

export default function SeedBusinessDetail({ business }: { business: SeedBusiness }) {
  const url = `https://www.localepak.com/business/${business.slug}`
  const waNumber = business.phone ? whatsappDigits(business.phone) : ''
  // Other real seed listings in the same city + category (self
  // excluded). Rendered only when at least one sibling exists.
  const siblings = SEED_BUSINESSES.filter(
    (other) =>
      other.slug !== business.slug &&
      other.citySlug === business.citySlug &&
      other.categorySlug === business.categorySlug
  )

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: business.name,
    description: business.description,
    url,
    address: {
      '@type': 'PostalAddress',
      addressLocality: business.city,
      addressCountry: 'PK',
    },
  }
  if (business.phone) jsonLd.telephone = business.phone

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        <Link href="/businesses" className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 hover:text-emerald-700 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Businesses
        </Link>

        <div className="space-y-6">
          <section className="bg-white rounded-3xl border border-slate-200 p-8 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/category/${business.categorySlug}`}
                className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-[11px] font-bold hover:border-emerald-300"
              >
                {business.category}
              </Link>
              <span className="px-3 py-1 rounded-full bg-slate-50 text-slate-500 border border-slate-200 text-[11px] font-bold">
                Directory listing
              </span>
            </div>

            <h1 className="text-3xl font-extrabold text-slate-900">{business.name}</h1>

            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-600" /> {business.city}, Pakistan
              </span>
              {business.phone && (
                <span className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-emerald-600" /> {business.phone}
                </span>
              )}
            </div>

            {!business.phone && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700 leading-relaxed">
                  No contact details are available for this listing yet. The owner can{' '}
                  <Link href="/register" className="text-emerald-600 font-semibold hover:underline">
                    claim it free
                  </Link>{' '}
                  to add them.
                </p>
              </div>
            )}

            <p className="text-sm text-slate-600 leading-relaxed">{business.description}</p>

            {business.phone && (
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={telHref(business.phone)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-colors"
                >
                  <Phone className="w-4 h-4" /> Call Now
                </a>
                {waNumber && (
                  <a
                    href={`https://wa.me/${waNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </a>
                )}
              </div>
            )}

            <p className="text-xs text-slate-400 pt-1">
              Looking for more {business.category} options nearby? Browse{' '}
              <Link href={`/city/${business.citySlug}/${business.categorySlug}`} className="text-emerald-600 font-semibold hover:underline">
                {business.category} in {business.city}
              </Link>
              .
            </p>
          </section>

          {siblings.length > 0 && (
            <section className="bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
              <h2 className="font-extrabold text-slate-900 text-lg">
                More {business.category} in {business.city}
              </h2>
              <ul className="divide-y divide-slate-100">
                {siblings.map((sibling) => (
                  <li key={sibling.slug} className="py-3 first:pt-0 last:pb-0">
                    <Link
                      href={`/business/${sibling.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700 hover:underline"
                    >
                      {sibling.name} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-slate-400 pt-1">
                <Link href={`/city/${business.citySlug}/${business.categorySlug}`} className="text-emerald-600 font-semibold hover:underline">
                  See all {business.category} in {business.city}
                </Link>
              </p>
            </section>
          )}

          <section className="bg-emerald-50 rounded-3xl border border-emerald-100 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Info className="w-6 h-6 text-emerald-500 shrink-0" />
            <div className="space-y-1">
              <h2 className="font-bold text-slate-900 text-sm">About this directory listing</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                This listing was created by the LocalePak directory team from publicly available
                information so customers can find this business. It has not been claimed by the
                business yet, so some details may be incomplete — the business can claim it for
                free to add opening hours, services, photos and more.
              </p>
            </div>
          </section>

          <section className="bg-[#0F172A] rounded-3xl p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <UserCheck className="w-8 h-8 text-emerald-400 shrink-0" />
            <div className="space-y-1.5 flex-1">
              <h2 className="font-extrabold text-white text-lg">Is this your business? Claim this listing</h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Create a free LocalePak account to claim {business.name}, keep its contact details
                accurate, add hours, services and photos, and reply to customer reviews.
              </p>
            </div>
            <Link
              href="/register"
              prefetch={false}
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-colors shrink-0"
            >
              Claim This Listing <ArrowRight className="w-4 h-4" />
            </Link>
          </section>
        </div>
      </main>

      <Footer hideSitePhone />
    </div>
  )
}
