import Link from 'next/link'
import { MapPin, Briefcase, Banknote, ArrowRight } from 'lucide-react'
import type { PublicJobCard } from '@/lib/public-listings'

/**
 * The job post card — same visual language as the business/company/
 * professional listing cards (rounded-3xl, hover shadow), with
 * job-specific rows: title, company, city, type badge, salary,
 * and a View Job link.
 */
export default function JobCard({ job }: { job: PublicJobCard }) {
  const snippet = (job.description || '').replace(/\s+/g, ' ').trim()
  return (
    <article className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-lg transition-all flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <span className="shrink-0 w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-extrabold text-sm">
          <Briefcase className="w-5 h-5" />
        </span>
        <div className="flex-1 min-w-0">
          <h2 className="font-extrabold text-slate-900 leading-snug">{job.title}</h2>
          {job.companyName && (
            <p className="text-xs text-slate-500 font-semibold mt-0.5">{job.companyName}</p>
          )}
          {job.jobType && (
            <span className="inline-block mt-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-[11px] font-bold">
              {job.jobType}
            </span>
          )}
        </div>
      </div>
      {job.city && (
        <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
          <MapPin className="w-3.5 h-3.5 text-emerald-600" /> {job.city}
        </p>
      )}
      {job.salaryRange && (
        <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
          <Banknote className="w-3.5 h-3.5 text-emerald-600" /> {job.salaryRange}
        </p>
      )}
      {snippet && (
        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">{snippet}</p>
      )}
      <Link
        href={`/job/${job.slug}`}
        prefetch={false}
        className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-800"
      >
        View Job <ArrowRight className="w-4 h-4" />
      </Link>
    </article>
  )
}
