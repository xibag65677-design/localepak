import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Briefcase, ArrowRight } from 'lucide-react'
import { getApprovedJobCards } from '@/lib/public-listings'
import JobCard from '@/components/job-card'

export async function generateMetadata(): Promise<Metadata> {
  const jobs = await getApprovedJobCards()
  const title = 'Jobs in Pakistan – Find Open Roles | LocalePak'
  const description =
    'Browse approved job posts across Pakistan — open roles from verified employers, with salary ranges and direct application contacts.'
  return {
    title,
    description,
    ...(jobs.length === 0 ? { robots: { index: false, follow: false } } : {}),
    alternates: {
      canonical: 'https://www.localepak.com/jobs/',
    },
    openGraph: {
      title,
      description,
      url: 'https://www.localepak.com/jobs/',
      siteName: 'LocalePak',
      locale: 'en_PK',
      type: 'website',
    },
  }
}

// SERVER component: approved job posts are fetched on the server, so
// the grid is part of the initial HTML and no Firestore list query
// ever runs in a visitor's browser (anti-scrape). Jobs have no
// release cycle — approved posts are public immediately.
export const revalidate = 604800

export default async function JobsPage() {
  const jobs = await getApprovedJobCards()

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />

      <section className="bg-[#0F172A] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Open Roles</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Jobs in Pakistan</h1>
          <p className="text-slate-400 text-sm">
            Browse approved job posts across Pakistan — open roles from verified employers, with
            salary ranges and direct application contacts.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        {jobs.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
            <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
            <h2 className="font-extrabold text-slate-900 text-lg">
              No job posts listed yet — be the first to post yours
            </h2>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              Create an account and post your open role to appear here and in LocalePak search
              results.
            </p>
            <Link
              href="/add-job"
              prefetch={false}
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-colors"
            >
              Post a Job <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
