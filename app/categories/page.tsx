import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { CATEGORIES } from '@/lib/data'
import { getMergedBusinessCards } from '@/lib/public-listings'
import Link from 'next/link'
import { Sparkles, ArrowRight, Building2 } from 'lucide-react'
import { Metadata } from 'next'

function slugify(value: string): string {
  return (value || '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const revalidate = 2592000

export const metadata: Metadata = {
  title: 'Business Categories in Pakistan | LocalePak Directory Hub',
  description: 'Explore business categories in Pakistan including restaurants, technology, healthcare, real estate, construction, education, retail, and local services.',
  alternates: { canonical: 'https://www.localepak.com/categories/' },
  openGraph: {
    title: 'Business Categories in Pakistan | LocalePak Directory Hub',
    description: 'Explore business categories in Pakistan including restaurants, technology, healthcare, real estate, construction, education, retail, and local services.',
    url: 'https://www.localepak.com/categories/',
    type: 'website',
  },
}

export default async function CategoriesIndexPage() {
  const businesses = await getMergedBusinessCards()
  const countForCategory = (categoryId: string, categoryName: string) =>
    businesses.filter(b =>
      b.category === categoryName ||
      b.category === categoryId ||
      slugify(b.category) === slugify(categoryName)
    ).length
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />

      <section className="bg-[#0F172A] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Category Taxonomy Hub</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Browse Businesses, Services & Companies by Category</h1>
          <p className="text-slate-400 text-sm">
            Explore available businesses, services, employers and companies across Pakistan by industry and directory category.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => {
            const count = countForCategory(cat.id, cat.name)
            return (
              <Link
                key={cat.id}
                href={`/category/${cat.id}`}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-200 space-y-4 group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-extrabold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                      Explore listings
                    </span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-emerald-600 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {cat.desc}
                  </p>
                  <p className="text-xs font-bold text-emerald-600">
                    {count === 0 ? 'No listings yet' : `${count} ${count === 1 ? 'listing' : 'listings'}`}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
                  <span>Explore Category</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            )
          })}
        </div>
      </main>

      <Footer />
    </div>
  )
}
