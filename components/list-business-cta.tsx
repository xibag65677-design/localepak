import Link from 'next/link'
import { Building2 } from 'lucide-react'

/**
 * Slim sticky bottom bar shown on small screens only, so business owners
 * always have the free-listing CTA in reach. Hidden on md+ screens where
 * the pages already carry prominent CTA sections.
 */
export default function ListBusinessCta() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-slate-900/95 backdrop-blur border-t border-slate-700 px-4 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))]">
      <Link
        href="/add-business" prefetch={false}
        className="flex items-center justify-center gap-2 w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-colors"
        aria-label="List your business on LocalePak for free"
      >
        <Building2 className="w-4 h-4" />
        List your business — free
      </Link>
    </div>
  )
}
