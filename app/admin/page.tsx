'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { db } from '@/lib/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { Building2, Factory, Briefcase, Star, CreditCard, Mail, Users, CheckCircle2, ArrowRight } from 'lucide-react'

type Counts = {
  pendingBusinesses: number
  pendingCompanies: number
  pendingJobs: number
  pendingReviews: number
  pendingProofs: number
  unreadMessages: number
  totalUsers: number
  approvedListings: number
}

async function countWhere(col: string, field?: string, value?: string | boolean): Promise<number> {
  try {
    const q = field ? query(collection(db, col), where(field, '==', value)) : collection(db, col)
    const snap = await getDocs(q as any)
    return snap.size
  } catch {
    return 0
  }
}

export default function AdminOverviewPage() {
  const [counts, setCounts] = useState<Counts | null>(null)

  useEffect(() => {
    const load = async () => {
      const [
        pendingBusinesses,
        pendingCompanies,
        pendingJobs,
        pendingReviews,
        pendingProofs,
        unreadMessages,
        totalUsers,
        approvedBusinesses,
        approvedCompanies,
      ] = await Promise.all([
        countWhere('businesses', 'status', 'pending'),
        countWhere('companies', 'status', 'pending'),
        countWhere('jobs', 'status', 'pending'),
        countWhere('reviews', 'status', 'pending'),
        countWhere('payment_proofs', 'status', 'pending'),
        countWhere('contact_messages', 'read', false),
        countWhere('users'),
        countWhere('businesses', 'status', 'approved'),
        countWhere('companies', 'status', 'approved'),
      ])
      setCounts({
        pendingBusinesses,
        pendingCompanies,
        pendingJobs,
        pendingReviews,
        pendingProofs,
        unreadMessages,
        totalUsers,
        approvedListings: approvedBusinesses + approvedCompanies,
      })
    }
    load()
  }, [])

  const cards = counts
    ? [
        { label: 'Pending Businesses', value: counts.pendingBusinesses, href: '/admin/businesses', Icon: Building2 },
        { label: 'Pending Companies', value: counts.pendingCompanies, href: '/admin/companies', Icon: Factory },
        { label: 'Pending Jobs', value: counts.pendingJobs, href: '/admin/jobs', Icon: Briefcase },
        { label: 'Pending Reviews', value: counts.pendingReviews, href: '/admin/reviews', Icon: Star },
        { label: 'Pending Payment Proofs', value: counts.pendingProofs, href: '/admin/payments', Icon: CreditCard },
        { label: 'Unread Messages', value: counts.unreadMessages, href: '/admin/messages', Icon: Mail },
        { label: 'Total Users', value: counts.totalUsers, href: '/admin/users', Icon: Users },
        { label: 'Approved Listings', value: counts.approvedListings, href: '/admin/businesses', Icon: CheckCircle2 },
      ]
    : []

  const totalPending = counts
    ? counts.pendingBusinesses + counts.pendingCompanies + counts.pendingJobs + counts.pendingReviews + counts.pendingProofs
    : 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Overview</h1>
        <p className="text-sm text-slate-500">
          {counts
            ? totalPending > 0
              ? `${totalPending} item${totalPending === 1 ? '' : 's'} waiting for review across all queues.`
              : 'All queues are clear — nothing waiting for review.'
            : 'Loading queue counts...'}
        </p>
      </div>

      {!counts ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center text-sm text-slate-500">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map(({ label, value, href, Icon }) => (
            <Link
              key={label}
              href={href}
              className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3 hover:border-emerald-500 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between">
                <Icon className="w-6 h-6 text-emerald-600" />
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 transition-colors" />
              </div>
              <p className="text-3xl font-extrabold text-slate-900">{value}</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</p>
            </Link>
          ))}
        </div>
      )}

      <section className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3">
        <h2 className="font-extrabold text-slate-900">Daily routine</h2>
        <ol className="list-decimal pl-5 text-sm text-slate-600 space-y-1.5">
          <li>Clear the <Link href="/admin/businesses" className="text-emerald-600 font-semibold hover:underline">businesses</Link> and <Link href="/admin/companies" className="text-emerald-600 font-semibold hover:underline">companies</Link> queues — approve genuine listings, reject spam.</li>
          <li>Check <Link href="/admin/payments" className="text-emerald-600 font-semibold hover:underline">payment proofs</Link> — approving one activates the Featured or Verified upgrade on the listing.</li>
          <li>Moderate <Link href="/admin/reviews" className="text-emerald-600 font-semibold hover:underline">reviews</Link> so only genuine customer feedback goes public.</li>
          <li>Answer <Link href="/admin/messages" className="text-emerald-600 font-semibold hover:underline">messages</Link> and glance at new <Link href="/admin/applications" className="text-emerald-600 font-semibold hover:underline">job applications</Link>.</li>
        </ol>
      </section>
    </div>
  )
}
