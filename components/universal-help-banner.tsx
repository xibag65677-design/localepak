import Link from 'next/link'
import { LifeBuoy, ArrowRight, MessageSquare, ShieldCheck } from 'lucide-react'

export default function UniversalHelpBanner() {
  return (
    <section className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border-t border-slate-800 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-start sm:items-center gap-5 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-indigo-500 flex items-center justify-center text-white shadow-xl shrink-0 border border-white/10">
              <LifeBuoy className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  LocalePak 24/7 Support Desk
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Facing an issue with this website? Contact our support team and we will help you as soon as possible.
              </h2>
              <p className="mt-2 text-sm text-slate-300 max-w-2xl leading-relaxed">
                Whether you need help updating your business listing, reporting a concern, asking a platform question, or exploring advertising solutions, our dedicated team is here to assist you.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full md:w-auto shrink-0 relative z-10">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg hover:shadow-emerald-500/25 transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact Us Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/help-center"
              className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700 transition-colors text-center"
            >
              Visit Help Center
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
