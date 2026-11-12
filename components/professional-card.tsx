import Link from 'next/link'
import { MapPin, Phone, MessageCircle, ArrowRight, Clock } from 'lucide-react'
import type { PublicProfessionalCard } from '@/lib/public-listings'

/** Initials avatar for a professional card (no photo upload yet). */
function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[1][0]).toUpperCase()
}

/**
 * The professional profile card — same visual language as the
 * business/company listing cards (rounded-3xl, hover shadow),
 * with professional-specific rows: avatar, profession badge,
 * specialization, experience, city, phone, and a WhatsApp
 * shortcut next to the View Profile link.
 */
export default function ProfessionalCard({ pro }: { pro: PublicProfessionalCard }) {
  const waNumber = (pro.whatsapp || '').replace(/[^0-9]/g, '')
  return (
    <article className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-lg transition-all flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <span className="shrink-0 w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-extrabold text-sm">
          {initials(pro.name)}
        </span>
        <div className="flex-1 min-w-0">
          <h2 className="font-extrabold text-slate-900 leading-snug">{pro.name}</h2>
          <span className="inline-block mt-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-[11px] font-bold">
            {pro.profession}
          </span>
        </div>
      </div>
      {pro.specialization && (
        <p className="text-xs text-slate-500 font-medium">{pro.specialization}</p>
      )}
      {pro.experience && (
        <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
          <Clock className="w-3.5 h-3.5 text-emerald-600" /> {pro.experience} experience
        </p>
      )}
      {pro.city && (
        <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
          <MapPin className="w-3.5 h-3.5 text-emerald-600" /> {pro.city}
        </p>
      )}
      {pro.phone && (
        <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
          <Phone className="w-3.5 h-3.5 text-emerald-600" /> {pro.phone}
        </p>
      )}
      {pro.description && (
        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">{pro.description}</p>
      )}
      <div className="mt-auto flex items-center gap-3">
        <Link
          href={`/professional/${pro.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 hover:text-emerald-700"
        >
          View Profile <ArrowRight className="w-4 h-4" />
        </Link>
        {waNumber && (
          <a
            href={`https://wa.me/${waNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="ml-auto inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-700 border border-slate-200 hover:border-emerald-500 rounded-full px-3 py-1.5 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
          </a>
        )}
      </div>
    </article>
  )
}
