import Link from 'next/link'
import Image from 'next/image'
import { ShieldCheck, MapPin, Briefcase, Sparkles, Phone, Mail, HelpCircle, FileText, Globe } from 'lucide-react'
import UniversalHelpBanner from '@/components/universal-help-banner'

export default function Footer({ hideSitePhone = false }: { hideSitePhone?: boolean }) {
  return (
    <>
      <UniversalHelpBanner />
      <footer className="bg-[#09090b] text-white pt-16 pb-12 border-t border-zinc-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Branding & NAP Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center pb-12 border-b border-zinc-800/80 gap-6">
          <div className="flex flex-col gap-3">
            <Link href="/" aria-label="LocalePak Home Page" className="inline-block group">
              <Image
                src="/logo.svg"
                alt="LocalePak - Pakistan Business Directory"
                width={160}
                height={48}
                loading="lazy"
                className="h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              />
            </Link>
            <p className="text-xs text-zinc-400 max-w-md leading-relaxed">
              Pakistan-focused business discovery connecting companies, employers, professionals, job seekers, and customers through category and city pages.
            </p>
            
            {/* Official NAP Display */}
            <div className="pt-2 space-y-1 text-xs text-zinc-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span><strong>Official HQ Address:</strong> Office 303, Evacuee Trust Complex, F-5/1, Islamabad 44000, Pakistan</span>
              </div>
              {/* Site phone hidden on listing detail pages: visitors were
                  calling LocalePak's number thinking it was the business's. */}
              {!hideSitePhone && (
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span><strong>Phone Contact:</strong> +92 334 5636230</span>
              </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Business profiles</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-medium">
              <MapPin className="w-4 h-4 text-red-500" />
              <span>City-based discovery</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-medium">
              <Briefcase className="w-4 h-4 text-amber-400" />
              <span>Free Job Postings</span>
            </div>
          </div>
        </div>

        {/* 5 Column Link Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 py-12 border-b border-slate-800/80">
          
          {/* Section 1: Directory & Explore */}
          <div>
            <h3 className="font-bold text-white text-sm tracking-wider uppercase mb-4 text-emerald-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Directory</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><Link href="/categories" className="inline-block py-1 hover:text-emerald-400 transition-colors">All Categories</Link></li>
              <li><Link href="/cities" className="inline-block py-1 hover:text-emerald-400 transition-colors">All Cities</Link></li>
              <li><Link href="/businesses" prefetch={false} className="inline-block py-1 hover:text-emerald-400 transition-colors">Businesses</Link></li>
              <li><Link href="/companies" prefetch={false} className="inline-block py-1 hover:text-emerald-400 transition-colors">Companies</Link></li>
              <li><Link href="/jobs" prefetch={false} className="inline-block py-1 hover:text-emerald-400 transition-colors">Jobs</Link></li>
              <li><Link href="/search" prefetch={false} className="inline-block py-1 hover:text-emerald-400 transition-colors">Search</Link></li>
            </ul>
          </div>

          {/* Section 2: Major Cities */}
          <div>
            <h3 className="font-bold text-white text-sm tracking-wider uppercase mb-4 text-emerald-400 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Top Hubs</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><Link href="/city/karachi" className="inline-block py-1 hover:text-emerald-400 transition-colors">Karachi Directory</Link></li>
              <li><Link href="/city/lahore" className="inline-block py-1 hover:text-emerald-400 transition-colors">Lahore Directory</Link></li>
              <li><Link href="/city/islamabad" className="inline-block py-1 hover:text-emerald-400 transition-colors">Islamabad Directory</Link></li>
              <li><Link href="/city/rawalpindi" className="inline-block py-1 hover:text-emerald-400 transition-colors">Rawalpindi Directory</Link></li>
              <li><Link href="/city/faisalabad" className="inline-block py-1 hover:text-emerald-400 transition-colors">Faisalabad Directory</Link></li>
              <li><Link href="/city/multan" className="inline-block py-1 hover:text-emerald-400 transition-colors">Multan Directory</Link></li>
              <li><Link href="/city/peshawar" className="inline-block py-1 hover:text-emerald-400 transition-colors">Peshawar Directory</Link></li>
            </ul>
          </div>

          {/* Section 3: Company & Trust */}
          <div>
            <h3 className="font-bold text-white text-sm tracking-wider uppercase mb-4 text-amber-400 flex items-center gap-2">
              <Globe className="w-4 h-4 text-amber-400" />
              <span>Company</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><Link href="/about" className="hover:text-amber-400 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-amber-400 transition-colors">Contact Us</Link></li>
              <li><Link href="/careers" className="hover:text-amber-400 transition-colors">Careers</Link></li>
              <li><Link href="/advertise-with-us" className="hover:text-amber-400 transition-colors">Advertise With Us</Link></li>
              <li><Link href="/blog" className="hover:text-amber-400 transition-colors">Pakistan Business Blog</Link></li>
              <li><Link href="/find-us" className="hover:text-amber-400 transition-colors">Find Us Online</Link></li>
              <li><Link href="/html-sitemap" className="hover:text-amber-400 transition-colors">HTML Sitemap</Link></li>
            </ul>
          </div>

          {/* Section 4: Support & FAQs */}
          <div>
            <h3 className="font-bold text-white text-sm tracking-wider uppercase mb-4 text-sky-400 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-sky-400" />
              <span>Help & Support</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><Link href="/help-center" className="hover:text-sky-400 transition-colors">Help Center</Link></li>
              <li><Link href="/support" className="hover:text-sky-400 transition-colors">Customer Support</Link></li>
              <li><Link href="/faqs" className="hover:text-sky-400 transition-colors">FAQs</Link></li>
              <li><Link href="/report-abuse" className="hover:text-sky-400 transition-colors">Report Abuse</Link></li>
              <li><Link href="/accessibility" className="hover:text-sky-400 transition-colors">Accessibility Statement</Link></li>
            </ul>
          </div>

          {/* Section 5: Policies & Legal */}
          <div>
            <h3 className="font-bold text-white text-sm tracking-wider uppercase mb-4 text-purple-400 flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-400" />
              <span>Legal Policies</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><Link href="/privacy" className="hover:text-purple-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-purple-400 transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/cookie-policy" className="hover:text-purple-400 transition-colors">Cookie Policy</Link></li>
              <li><Link href="/disclaimer" className="hover:text-purple-400 transition-colors">Disclaimer</Link></li>
              <li><Link href="/editorial-policy" className="hover:text-purple-400 transition-colors">Editorial Policy</Link></li>
              <li><Link href="/community-guidelines" className="hover:text-purple-400 transition-colors">Community Guidelines</Link></li>
              <li><Link href="/business-listing-guidelines" className="hover:text-purple-400 transition-colors">Listing Guidelines</Link></li>
              <li><Link href="/verification-policy" className="hover:text-purple-400 transition-colors">Verification Policy</Link></li>
              <li><Link href="/refund-policy" className="hover:text-purple-400 transition-colors">Refund Policy</Link></li>
            </ul>
          </div>

        </div>

        {/* Yellow-pages synonym line (Gap 8): honest positioning copy only. */}
        <p className="pt-8 text-xs text-slate-400 text-center md:text-left">
          LocalePak — Pakistan&apos;s modern online yellow pages: a list of companies, suppliers and local services across Pakistan, organised by city and category.
        </p>

        {/* Listed-on badges (user-approved 2026-11-07, "Lagao lagao"): IndieTools — Classic · Light.
            Other approved badges (SaaS.fyi, SaaSCity, Startup Fame, Fazier, PeekLaunch, OpenHunts) join here as their codes arrive. */}
        <div className="pt-8 flex flex-col md:flex-row items-center gap-4">
          <span className="text-xs text-slate-400 uppercase tracking-wider">Listed on</span>
          <a href="https://www.indietools.app/products/localepak" target="_blank" rel="noopener">
            <img src="https://www.indietools.app/badges/listed-on-indietools-light.png" alt="Listed on IndieTools" width="176" height="56" />
          </a>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p className="text-center md:text-left">
            © 2026 LocalePak Enterprise Ecosystem. All rights reserved. Office 303, Evacuee Trust Complex, F-5/1, Islamabad 44000, Pakistan.
          </p>
          <div className="flex items-center gap-3 text-slate-400 flex-wrap justify-center">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <span>•</span>
            <Link href="/cookie-policy" className="hover:text-white">Cookies</Link>
            <span>•</span>
            <Link href="/disclaimer" className="hover:text-white">Disclaimer</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>

      </div>
    </footer>
    </>
  )
}
