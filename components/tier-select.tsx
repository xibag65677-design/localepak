'use client'

import { TIERS, TIER_ORDER, formatPKR, type ListingTier } from '@/lib/tiers'
import { CheckCircle2 } from 'lucide-react'

/**
 * Tier picker shared by all add-listing forms. The buyer picks a
 * tier before the listing is saved; the payment screen that
 * follows charges exactly that tier's price.
 */
export default function TierSelect({
  value,
  onChange,
}: {
  value: ListingTier
  onChange: (tier: ListingTier) => void
}) {
  return (
    <div className="space-y-3">
      <p className="block text-xs font-bold text-slate-700">Choose your listing plan *</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" role="radiogroup" aria-label="Listing plan">
        {TIER_ORDER.map((tier) => {
          const def = TIERS[tier]
          const selected = value === tier
          return (
            <button
              key={tier}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(tier)}
              className={`text-left rounded-2xl border-2 p-4 transition-all cursor-pointer ${
                selected
                  ? 'border-emerald-600 bg-emerald-50 shadow-md'
                  : 'border-slate-200 bg-white hover:border-emerald-300'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-extrabold text-slate-900 text-sm">{def.label}</span>
                {selected && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
              </div>
              <p className="font-extrabold text-emerald-700 text-base mt-1">{formatPKR(def.price)}</p>
              <p className="text-[11px] text-slate-500 font-semibold mt-0.5">{def.tagline}</p>
              <ul className="mt-2 space-y-1">
                {def.features.map((f) => (
                  <li key={f} className="text-[11px] text-slate-600 leading-snug">• {f}</li>
                ))}
              </ul>
            </button>
          )
        })}
      </div>
      <p className="text-[11px] text-slate-400">
        Payment is verified by our team before your listing is approved. Basic listings cannot be edited after
        submission — Premium and Featured listings can request edits from your dashboard.
      </p>
    </div>
  )
}
