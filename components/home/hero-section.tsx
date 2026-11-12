import Link from 'next/link'
import HeroSearchForm from './hero-search-form'

export default function HeroSection() {
  return (
    <section
      className="relative bg-[#09090b] overflow-hidden py-16 md:py-28"
      aria-labelledby="hero-heading"
    >
      {/* Decorative circles */}
      <div aria-hidden="true" className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-red-600/15 blur-2xl" />
      <div aria-hidden="true" className="absolute -bottom-32 -left-32 w-[32rem] h-[32rem] rounded-full bg-rose-600/10 blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="inline-flex items-center gap-2 text-red-500 font-semibold text-sm mb-2 tracking-wide uppercase">
          <span className="w-4 h-px bg-red-500" />
          Pakistan&apos;s Free Business Directory
          <span className="w-4 h-px bg-red-500" />
        </p>

        <h1
          id="hero-heading"
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 text-balance"
        >
          Pakistan Free Business Directory – Submit Your Business
        </h1>
        <p className="text-red-400 font-semibold text-sm sm:text-base mb-6 tracking-wide uppercase">
          Register your company profile and connect with customers nationwide.
        </p>

        {/* Search Bar */}
        <HeroSearchForm />

        {/* Action Buttons */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link
            id="hero-list-business-btn"
            href="/add-business" prefetch={false}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-200 text-sm sm:text-base shadow-lg shadow-red-600/30 hover:shadow-xl hover:shadow-red-600/40 transform hover:-translate-y-0.5 cursor-pointer text-center"
          >
            List Your Business for Free
          </Link>
          <Link
            id="hero-about-btn"
            href="/about"
            className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-colors duration-200 text-sm sm:text-base border border-white/20 backdrop-blur-sm hover:border-white/30 cursor-pointer text-center"
          >
            Learn More About Us
          </Link>
        </div>

        <div className="mt-6 sm:mt-8 bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 max-w-2xl mx-auto border border-white/20">
          <p className="text-white text-sm sm:text-base font-medium">
            LocalePak connects Pakistani business owners, professionals, and employers with customers and candidates across all major cities.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs sm:text-sm text-slate-100 font-medium">
            <span className="bg-white/10 px-3 py-1 rounded-full">Easy Online Submission</span>
            <span className="bg-white/10 px-3 py-1 rounded-full">100% Free Listing</span>
            <span className="bg-white/10 px-3 py-1 rounded-full">Verified Business Info</span>
          </div>
        </div>
      </div>
    </section>
  )
}
