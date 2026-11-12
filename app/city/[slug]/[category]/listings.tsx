import Link from 'next/link'
import { Building2, MapPin, Phone, ArrowRight } from 'lucide-react'
import type { PublicBusinessCard } from '@/lib/public-listings'

// SERVER component (Round 3): the parent page fetches the approved +
// released Firestore listings for this city x category on the server
// and merges them with the page's static seed listings (see
// lib/public-listings.ts) — this component only renders what it is
// given. No Firestore query runs in the browser for these pages.
export default function CityCategoryListings({
  businesses,
  city,
  categoryName,
}: {
  businesses: PublicBusinessCard[]
  city: string
  categoryName: string
}) {
  if (businesses.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center space-y-4">
        <Building2 className="w-10 h-10 text-slate-300 mx-auto" />
        <h2 className="font-extrabold text-slate-900 text-lg">
          No {categoryName} listed in {city} yet — be the first
        </h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          This page is ready for its first {categoryName.toLowerCase()} listing. If you run one in {city},
          add it free and, once approved, your profile will appear here immediately.
        </p>
        <Link
          href="/add-business"
          prefetch={false}
          className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-colors"
        >
          Add Your Business — Free <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 min-h-[300px]">
      {businesses.map((business) => (
        <Link
          key={business.id}
          href={`/business/${business.slug}`}
          prefetch={false}
          className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3 hover:border-emerald-500 hover:shadow-md transition-all group"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-[11px] font-bold">
            {business.category}
          </span>
          <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-emerald-700">{business.name}</h3>
          {business.city && (
            <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" /> {business.city}
            </p>
          )}
          {business.description && (
            <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">{business.description}</p>
          )}
          {business.phone && (
            <p className="flex items-center gap-1.5 text-xs font-bold text-slate-700 pt-1">
              <Phone className="w-3.5 h-3.5 text-emerald-600" /> {business.phone}
            </p>
          )}
        </Link>
      ))}
    </div>
  )
}
