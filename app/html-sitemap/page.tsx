import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { CATEGORIES, TOP_CITIES, CITIES } from '@/lib/data'
import { BLOG_POSTS } from '@/lib/blog-data'

export const metadata: Metadata = {
  title: 'Sitemap | LocalePak',
  description: 'A complete map of LocalePak — core pages, business categories, city guides and blog articles.',
  alternates: { canonical: 'https://www.localepak.com/html-sitemap/' },
}

function cityToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-')
}

const CORE_LINKS: { label: string; href: string }[] = [
  { label: 'Home', href: '/' },
  { label: 'About LocalePak', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Search', href: '/search' },
  { label: 'Sign In', href: '/login' },
  { label: 'Create Account', href: '/register' },
  { label: 'My Dashboard', href: '/dashboard' },
  { label: 'All Categories', href: '/categories' },
  { label: 'All Cities', href: '/cities' },
  { label: 'All Businesses', href: '/businesses' },
  { label: 'All Companies', href: '/companies' },
  { label: 'All Jobs', href: '/jobs' },
  { label: 'Add Your Business — Free', href: '/add-business' },
  { label: 'Add Your Company — Free', href: '/add-company' },
  { label: 'Post a Job — Free', href: '/add-job' },
  { label: 'Blog', href: '/blog' },
  { label: 'Careers', href: '/careers' },
  { label: 'Advertise With Us', href: '/advertise-with-us' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Help Center', href: '/help-center' },
  { label: 'Customer Support', href: '/support' },
]

const POLICY_LINKS: { label: string; href: string }[] = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookie-policy' },
  { label: 'Disclaimer', href: '/disclaimer' },
  { label: 'Refund Policy', href: '/refund-policy' },
  { label: 'Editorial Policy', href: '/editorial-policy' },
  { label: 'Community Guidelines', href: '/community-guidelines' },
  { label: 'Business Listing Guidelines', href: '/business-listing-guidelines' },
  { label: 'Verification Policy', href: '/verification-policy' },
  { label: 'Accessibility Statement', href: '/accessibility' },
  { label: 'Report Abuse', href: '/report-abuse' },
]

function LinkList({ items }: { items: { label: string; href: string }[] }) {
  return (
    <ul className="space-y-2">
      {items.map(item => (
        <li key={item.href}>
          <Link href={item.href} className="text-sm text-emerald-700 hover:underline font-medium">
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default function HtmlSitemapPage() {
  const posts = Object.values(BLOG_POSTS).sort((a, b) => (a.date < b.date ? 1 : -1))

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />

      <main id="main-content" className="flex-1 py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">LocalePak Sitemap</h1>
            <p className="text-sm text-slate-500">LocalePak's core pages, business categories, city guides and blog articles, organized by section.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <section aria-label="Core pages" className="bg-white rounded-3xl border border-slate-200 p-7">
              <h2 className="font-extrabold text-slate-900 text-lg mb-4">Core Pages</h2>
              <LinkList items={CORE_LINKS} />
            </section>

            <section aria-label="Policies and support" className="bg-white rounded-3xl border border-slate-200 p-7">
              <h2 className="font-extrabold text-slate-900 text-lg mb-4">Policies & Support</h2>
              <LinkList items={POLICY_LINKS} />
            </section>

            <section aria-label="Business categories" className="bg-white rounded-3xl border border-slate-200 p-7">
              <h2 className="font-extrabold text-slate-900 text-lg mb-4">Business Categories</h2>
              <LinkList items={CATEGORIES.map(c => ({ label: c.name, href: `/category/${c.id}` }))} />
            </section>

            <section aria-label="All cities" className="bg-white rounded-3xl border border-slate-200 p-7">
              <h2 className="font-extrabold text-slate-900 text-lg mb-4">All Cities ({CITIES.length})</h2>
              <div className="max-h-96 overflow-y-auto pr-2">
                <LinkList items={CITIES.map(c => ({ label: `Businesses in ${c}`, href: `/city/${cityToSlug(c)}` }))} />
              </div>
            </section>
          </div>

          <section aria-label="Top cities by category" className="bg-white rounded-3xl border border-slate-200 p-7">
            <h2 className="font-extrabold text-slate-900 text-lg mb-4">Top Cities by Category</h2>
            <p className="text-xs text-slate-500 mb-4">
              Every category has a dedicated page in each of our {TOP_CITIES.length} top cities —{' '}
              {TOP_CITIES.length * CATEGORIES.length} pages exist in total; a selection of 30 is shown below:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
              <LinkList
                items={TOP_CITIES.slice(0, 10).flatMap(c =>
                  CATEGORIES.slice(0, 3).map(cat => ({
                    label: `${cat.name} in ${c}`,
                    href: `/city/${cityToSlug(c)}/${cat.id}`,
                  }))
                )}
              />
            </div>
          </section>

          <section aria-label="Blog articles" className="bg-white rounded-3xl border border-slate-200 p-7">
            <h2 className="font-extrabold text-slate-900 text-lg mb-4">Blog Articles & Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
              <LinkList items={posts.map(p => ({ label: p.title, href: `/blog/${p.slug}` }))} />
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
