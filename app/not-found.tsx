'use client'

import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { FileQuestion, Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="bg-[#f8fafc] min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-[0_20px_50px_rgba(15,43,61,0.08)] border border-slate-100 max-w-lg w-full text-center flex flex-col items-center relative overflow-hidden">
          {/* Decorative Glow Background */}
          <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-emerald-500/5 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-emerald-500/5 blur-3xl" />

          {/* Animated 404 Illustration */}
          <div className="w-24 h-24 rounded-2xl bg-emerald-50/80 flex items-center justify-center mb-8 relative animate-bounce" style={{ animationDuration: '3s' }}>
            <FileQuestion className="w-12 h-12 text-[#34D399]" />
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-extrabold text-[#0F172A] tracking-tight mb-4">
            Page Not Found
          </h1>

          {/* Description */}
          <p className="text-slate-500 text-base leading-relaxed max-w-sm mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0F172A] hover:bg-[#0F172A] text-white rounded-xl font-semibold transition-all duration-200 shadow-md shadow-slate-200"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl font-semibold border border-slate-200 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
          </div>

          {/* Helpful Directory Quick Links */}
          <div className="mt-8 pt-8 border-t border-slate-100 w-full">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Or Explore Our Directories
            </p>
            <div className="flex justify-center gap-6 text-sm font-semibold text-[#34D399]">
              <Link href="/categories/" className="hover:text-emerald-500 transition-colors">
                Categories
              </Link>
              <span className="text-slate-200">•</span>
              <Link href="/cities/" className="hover:text-emerald-500 transition-colors">
                Cities
              </Link>
              <span className="text-slate-200">•</span>
              <Link href="/featured-businesses/" className="hover:text-emerald-500 transition-colors">
                Featured
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
