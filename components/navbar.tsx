'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Plus, Building2, Search, Briefcase, MapPin, Newspaper } from 'lucide-react'

const navLinks = [
  { href: '/categories', label: 'Categories', icon: Building2 },
  { href: '/cities', label: 'Cities', icon: MapPin },
  { href: '/blog', label: 'Blog', icon: Newspaper },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-[#09090b] border-b border-zinc-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo */}
          <Link href="/" aria-label="LocalePak Home Page" className="flex items-center group py-1">
            <Image
              src="/logo.svg"
              alt="LocalePak - Pakistan Business Directory"
              width={160}
              height={48}
              priority
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 px-3 py-2 rounded-lg ${
                    isActive
                      ? 'text-emerald-400 bg-zinc-850/80'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-800/40'
                  }`}
                >
                  {link.icon && <link.icon className="w-4 h-4 opacity-80" />}
                  <span>{link.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/search" prefetch={false}
              aria-label="Search Directory"
              className="p-2.5 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-800/70 transition-colors flex items-center gap-1.5 text-sm font-medium"
              title="Search Directory"
            >
              <Search className="w-5 h-5 text-zinc-400" />
              <span>Search</span>
            </Link>

            <Link
              href="/dashboard" prefetch={false}
              aria-label="Business & Profile Dashboard"
              className="px-3.5 py-2 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-800/70 transition-colors flex items-center gap-1.5 text-sm font-medium"
              title="Business & Profile Dashboard"
            >
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>Dashboard</span>
            </Link>

            <Link
              href="/register" prefetch={false}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-md shadow-emerald-600/25 transition-all duration-200 inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Get Started</span>
            </Link>
          </div>

          {/* Mobile Clean Sidebar Menu Toggle Only */}
          <div className="flex items-center lg:hidden">
            <button
              id="mobile-hamburger-btn"
              className="text-white p-2.5 rounded-xl hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label={open ? 'Close navigation sidebar' : 'Open navigation sidebar'}
              aria-expanded={open}
              aria-controls="mobile-nav-menu"
              onClick={() => setOpen(!open)}
            >
              {open ? <X className="w-6.5 h-6.5" /> : <Menu className="w-6.5 h-6.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer / Sidebar Navigation */}
      {open && (
        <nav
          id="mobile-nav-menu"
          className="lg:hidden bg-[#09090b] border-t border-zinc-800 px-4 py-5 flex flex-col gap-2 shadow-2xl animate-in slide-in-from-top-2"
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`text-sm font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-between ${
                  isActive
                    ? 'bg-zinc-800 text-emerald-400'
                    : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  {link.icon && <link.icon className="w-4 h-4 text-emerald-400" />}
                  <span>{link.label}</span>
                </div>
              </Link>
            )
          })}
          
          <Link
            href="/search" prefetch={false}
            onClick={() => setOpen(false)}
            className="text-sm font-semibold py-3 px-4 rounded-xl text-zinc-300 hover:bg-zinc-800 flex items-center gap-3"
          >
            <Search className="w-4 h-4 text-emerald-400" />
            <span>Search</span>
          </Link>
          <div className="pt-3 border-t border-zinc-800 flex flex-col gap-2">
            <Link
              href="/dashboard" prefetch={false}
              onClick={() => setOpen(false)}
              className="text-sm font-semibold py-3 px-4 rounded-xl text-zinc-300 hover:bg-zinc-800 flex items-center gap-3"
            >
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>Business Dashboard</span>
            </Link>


            <Link
              href="/register" prefetch={false}
              onClick={() => setOpen(false)}
              className="mt-2 px-4 py-3 rounded-xl bg-emerald-600 text-white text-sm font-bold text-center shadow-md shadow-emerald-600/30 flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Get Started Free</span>
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
