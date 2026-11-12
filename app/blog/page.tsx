import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, Clock, ArrowRight, Sparkles, TrendingUp, ShieldCheck, Briefcase, FileText, CheckCircle2 } from 'lucide-react'
import { getApprovedUserBlogPosts } from '@/lib/public-listings'

export const revalidate = 31536000

export const metadata: Metadata = {
  title: 'LocalePak Blog: Free Listing Tips & Pakistan Business Guides',
  description: 'Practical guides for Pakistani businesses: free listing tips, local SEO, job posting and company research — plus news for Karachi, Lahore and Islamabad.',
  keywords: 'LocalePak blog, free business listing tips, local SEO Pakistan, business directory guide, job posting tips Pakistan, Pakistan business news, online business marketing',
  alternates: {
    canonical: 'https://www.localepak.com/blog/',
  },
}

const FEATURED_POSTS = [
  {
    slug: 'restaurants-in-karachi',
    title: 'Restaurants in Karachi 2026: Food, Cuisines, Areas & Dining Guide',
    excerpt: 'Explore restaurants in Karachi by cuisine, area, budget and occasion, including Pakistani food, BBQ, cafés, family dining, fast food and fine dining.',
    category: 'Karachi Local Food Guide',
    date: 'August 13, 2026',
    readTime: '16 min read',
    icon: Sparkles
  },
  {
    slug: 'best-universities-computer-science-pakistan',
    title: 'Best Universities for Computer Science, IT & Software Engineering in Pakistan',
    excerpt: 'Compare universities for Computer Science, IT and Software Engineering in Pakistan. Learn what to check for programs, accreditation, admissions, fees, facilities and careers.',
    category: 'CS & Tech Education',
    date: 'August 13, 2026',
    readTime: '16 min read',
    icon: Sparkles
  },
  {
    slug: 'universities-in-pakistan',
    title: 'Universities in Pakistan 2026: Programs, Admissions & Cities',
    excerpt: 'Explore universities in Pakistan, including public and private universities, popular degree programs, major university cities, admissions and how to choose the right institution.',
    category: 'Education Pillar Guide',
    date: 'August 13, 2026',
    readTime: '15 min read',
    icon: BookOpen
  },
  {
    slug: 'it-jobs-in-pakistan',
    title: 'IT Jobs in Pakistan 2026: Fresh Graduate, Software & Remote Opportunities',
    excerpt: 'Explore IT jobs in Pakistan for fresh graduates and experienced professionals, including software, web, AI, cybersecurity, digital marketing, internships and remote opportunities.',
    category: 'IT & Tech Cluster Guide',
    date: 'August 13, 2026',
    readTime: '14 min read',
    icon: Sparkles
  },
  {
    slug: 'top-business-directory-websites-pakistan',
    title: 'Top Business Directory Websites in Pakistan: The Complete Guide to Finding Trusted Local Businesses (2026)',
    excerpt: 'Discover the best business directory websites in Pakistan to find trusted local businesses, improve your local SEO, reach more customers, and boost online visibility.',
    category: 'Directory Guide 2026',
    date: 'August 7, 2026',
    readTime: '10 min read',
    icon: Sparkles
  },
  {
    slug: 'how-to-list-business-free-localepak-guide',
    title: 'How to List Your Business Free on LocalePak – Complete Step-by-Step Guide 2026',
    excerpt: 'Learn exactly how to create your free business listing on LocalePak in 5 minutes. This comprehensive guide covers everything from account creation to optimization tips for maximum visibility on Google.',
    category: 'Free Business Listing Guide',
    date: 'August 1, 2026',
    readTime: '8 min read',
    icon: Sparkles
  },
  {
    slug: 'local-seo-pakistan-businesses-google-ranking',
    title: 'Local SEO for Pakistani Businesses: Win Visibility in Your City',
    excerpt: 'Discover proven local SEO strategies to rank your business on page 1 of Google for searches like "best restaurant in Lahore" or "plumber in Karachi". Includes free listing optimization tips.',
    category: 'Local SEO Pakistan',
    date: 'July 28, 2026',
    readTime: '12 min read',
    icon: TrendingUp
  }
]

const RECENT_POSTS = [
  {
    slug: 'how-to-register-a-company-in-pakistan',
    title: 'How to Register a Company in Pakistan: SECP, NTN & FBR Steps',
    excerpt: 'Choose a structure, reserve a name with SECP, incorporate, get the company NTN from FBR, and open your first bank account.',
    category: 'Business Setup & Registration',
    date: 'October 23, 2026',
    readTime: '6 min read',
  },
  {
    slug: 'how-to-get-ntn-become-a-filer-pakistan',
    title: 'How to Become a Tax Filer & Get an NTN in Pakistan: IRIS Step-by-Step',
    excerpt: 'Register on FBR IRIS, file the annual return, and confirm your name on the Active Taxpayer List — for salaried staff, freelancers and business owners.',
    category: 'Tax & Finance Guide',
    date: 'October 23, 2026',
    readTime: '6 min read',
  },
  {
    slug: 'free-business-listing-checklist-pakistan',
    title: 'Free Business Listing Checklist for Pakistan: What to Prepare First',
    excerpt: 'The details to gather, the category and city choices to make, and the upkeep habits that keep a free listing earning its place.',
    category: 'Free Business Listing Guide',
    date: 'October 23, 2026',
    readTime: '3 min read',
  },
  {
    slug: 'how-to-build-a-professional-profile-pakistan',
    title: 'How to Build a Professional Profile in Pakistan That Clients Trust',
    excerpt: 'Structure, biography, credentials and privacy — how to build a professional profile that answers who you are and why to get in touch.',
    category: 'Professional Discovery',
    date: 'October 23, 2026',
    readTime: '3 min read',
  },
  {
    slug: 'best-software-houses-pakistan-2026',
    title: 'Best Software Houses in Pakistan 2026: How to Compare IT Companies',
    excerpt: 'Compare Pakistani software houses by services, city, industries, careers, and trustworthy evidence.',
    category: 'Companies & Technology',
    date: 'August 23, 2026',
    readTime: '12 min read',
  },
  {
    slug: 'how-to-find-jobs-in-pakistan-2026',
    title: 'How to Find Jobs in Pakistan in 2026: A Practical Search Guide',
    excerpt: 'Learn how to find and verify government, private, remote, internship, and city-based jobs in Pakistan.',
    category: 'Jobs & Careers',
    date: 'August 23, 2026',
    readTime: '12 min read',
  },
  {
    slug: 'remote-jobs-pakistan-fresh-graduates',
    title: 'Remote Jobs in Pakistan for Fresh Graduates: Skills, Search & Safety Guide',
    excerpt: 'Find legitimate remote opportunities, build proof of skill, and avoid work-from-home scams.',
    category: 'Remote Work & Careers',
    date: 'August 23, 2026',
    readTime: '12 min read',
  },
  {
    slug: 'accountant-jobs-pakistan-city-guide',
    title: 'Accountant Jobs in Pakistan: City, Skills & Application Guide',
    excerpt: 'Explore accountant and finance job searches across Pakistan with practical application guidance.',
    category: 'Finance Careers',
    date: 'August 23, 2026',
    readTime: '10 min read',
  },
  {
    slug: 'local-services-pakistan-by-city',
    title: 'Local Services in Pakistan by City: How to Find Trusted Providers',
    excerpt: 'Find and compare plumbers, electricians, clinics, tutors, mechanics, agencies, and other providers.',
    category: 'Local Business Discovery',
    date: 'August 23, 2026',
    readTime: '10 min read',
  },
  {
    slug: 'best-startups-pakistan-2026',
    title: 'Best Startups in Pakistan 2026: Sectors, Signals & How to Research Them',
    excerpt: 'Research Pakistani startups across fintech, SaaS, logistics, health, education, and e-commerce responsibly.',
    category: 'Entrepreneurship & Startups',
    date: 'August 23, 2026',
    readTime: '11 min read',
  },
  {
    slug: 'businesses-in-lahore-by-category',
    title: 'Businesses in Lahore by Category: A Practical City Discovery Guide',
    excerpt: 'Discover Lahore businesses by category, neighborhood, service, address, hours, and contact details.',
    category: 'Lahore Business Guide',
    date: 'August 23, 2026',
    readTime: '10 min read',
  },
  {
    slug: 'digital-marketing-jobs-lahore-guide',
    title: 'Digital Marketing Jobs in Lahore: Skills, Roles & Portfolio Guide',
    excerpt: 'Explore SEO, content, paid media, social, e-commerce, email, design, and growth roles in Lahore.',
    category: 'Digital Marketing Careers',
    date: 'August 23, 2026',
    readTime: '10 min read',
  }
]

const CATEGORIES = [
  { name: 'Free Business Listing Tips', count: 'Explore guides' },
  { name: 'Local SEO Pakistan', count: 'Explore guides' },
  { name: 'Free Job Posting Guide', count: 'Explore guides' },
  { name: 'Pakistan Business News', count: 'Explore guides' },
  { name: 'Digital Marketing Pakistan', count: 'Explore guides' },
  { name: 'Success Stories', count: 'Explore guides' },
]

export default async function BlogPage() {
  const communityPosts = await getApprovedUserBlogPosts()
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'LocalePak Blog – Free Business Listing Tips & Pakistan Business News',
    url: 'https://www.localepak.com/blog/',
    description: 'Expert guides on free business listing, local SEO, job posting, and growing your business in Pakistan',
  }

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <main className="bg-[#F8FAFC] text-[#0F172A] font-sans pb-16">
        
        {/* HERO SECTION */}
        <section className="bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white py-16 sm:py-24 border-b border-slate-800 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold mb-6">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>LocalePak Knowledge Base & Business Guides</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              LocalePak Blog – Business Listing Tips, SEO Guides & News
            </h1>

            <p className="mt-6 text-base sm:text-xl text-slate-300 leading-relaxed font-normal">
              Your go-to resource for free business listing tips, local SEO strategies, job posting guides, and the latest Pakistan business growth news. Expert advice for businesses across Karachi, Lahore, Islamabad, and all cities.
            </p>
          </div>
        </section>

        {/* COMMUNITY POSTS (Featured listing owners) */}
        {communityPosts.length > 0 && (
          <section className="py-16 sm:py-20 bg-white border-b border-[#E2E8F0]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-extrabold text-[#0F172A]">From Our Community</h2>
                <p className="mt-3 text-slate-600 max-w-2xl mx-auto">Posts by Featured listing owners — tips and insights from professionals across Pakistan.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {communityPosts.map((post) => (
                  <div key={post.id} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3 text-xs">
                        <span className="font-bold text-[#059669]">Community Post</span>
                        {post.authorName && <span className="text-slate-400 font-medium">By {post.authorName}</span>}
                      </div>
                      <h3 className="font-bold text-[#0F172A] text-base mb-2 leading-snug">{post.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed mb-6 line-clamp-3">{post.excerpt}</p>
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-xs font-bold text-[#059669] hover:underline inline-flex items-center gap-1.5 pt-4 border-t border-slate-200"
                    >
                      <span>Read Post</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FEATURED POSTS */}
        <section className="py-16 sm:py-20 bg-white border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-[#0F172A]">Featured Guides & Must-Read Articles</h2>
              <p className="mt-3 text-slate-600 max-w-2xl mx-auto">Learn how to create useful business listings and improve local visibility in your city.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {FEATURED_POSTS.map((post, idx) => {
                const IconComp = post.icon
                return (
                  <div key={idx} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-8 shadow-sm hover:border-[#059669] hover:shadow-xl transition-all flex flex-col justify-between group">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-[#059669] bg-emerald-50 px-3 py-1 rounded-full">{post.category}</span>
                        <span className="text-xs text-slate-400 font-medium flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                      </div>
                      <h3 className="text-xl font-bold text-[#0F172A] mb-3 group-hover:text-[#059669] transition-colors leading-snug">{post.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed mb-6">{post.excerpt}</p>
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-xs font-bold text-[#059669] hover:underline inline-flex items-center gap-1.5 pt-4 border-t border-slate-200"
                    >
                      <span>Read Full Guide</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CATEGORIES CHIPS */}
        <section className="py-12 bg-[#ECFDF5] border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#0F172A]">Browse Blog Categories</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-center">
              {CATEGORIES.map((cat, idx) => (
                <div key={idx} className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-sm hover:border-[#059669] transition-all">
                  <div className="font-bold text-[#0F172A] text-xs sm:text-sm mb-1">{cat.name}</div>
                  <div className="text-[10px] text-[#059669] font-semibold">{cat.count}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RECENT POSTS GRID */}
        <section className="py-16 sm:py-20 bg-white border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-[#0F172A]">Latest Articles & Growth Tips</h2>
              <p className="mt-3 text-slate-600 max-w-2xl mx-auto">Updated weekly with new guides, local SEO strategies, and Pakistan business news.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {RECENT_POSTS.map((post, idx) => (
                <div key={idx} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3 text-xs">
                      <span className="font-bold text-[#059669]">{post.category}</span>
                      <span className="text-slate-400 font-medium">{post.readTime}</span>
                    </div>
                    <h3 className="font-bold text-[#0F172A] text-base mb-2 leading-snug">{post.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-6">{post.excerpt}</p>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-slate-200 text-xs">
                    <span className="text-slate-400">{post.date}</span>
                    <Link href={`/blog/${post.slug}`} className="font-bold text-[#059669] hover:underline inline-flex items-center gap-1">
                      <span>Read More</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="py-16 bg-[#F8FAFC]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8 shadow-md text-center">
              <h2 className="text-2xl font-bold text-[#0F172A] mb-2">Subscribe to LocalePak Business Newsletter</h2>
              <p className="text-xs sm:text-sm text-slate-600 mb-6">Get weekly free business listing tips, SEO strategies, and Pakistan business news delivered to your inbox.</p>

              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  className="flex-1 px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-base sm:text-sm focus:outline-none focus:border-[#059669]"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold rounded-xl transition-colors shadow-md text-sm shrink-0"
                >
                  Subscribe Free
                </button>
              </form>
              <p className="text-[10px] text-slate-400 mt-3">100% free forever. No spam, unsubscribe anytime with one click.</p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
