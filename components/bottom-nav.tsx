'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, LayoutGrid, Info } from 'lucide-react'

export default function BottomNav() {
  const pathname = usePathname()

  const items = [
    {
      label: 'Home',
      href: '/',
      icon: Home,
      active: pathname === '/'
    },
    {
      label: 'Categories',
      href: '/categories',
      icon: LayoutGrid,
      isCenter: true
    },
    {
      label: 'About',
      href: '/about',
      icon: Info,
      active: pathname === '/about'
    }
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-[#09090b] border-t border-white/5 rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.3)] md:hidden pb-safe" aria-label="Mobile bottom navigation">
      <div className="flex items-center justify-around h-16 px-2 relative">
        {items.map((item, idx) => {
          const Icon = item.icon
          const navId = `bottom-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`

          if (item.isCenter) {
            return (
              <Link
                key={idx}
                id={navId}
                href={item.href}
                aria-label="Browse Categories"
                className="relative -top-4 flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-600 rounded-full text-white border-4 border-[#09090b] shadow-lg hover:scale-105 transition-all duration-200"
                title="Browse Categories"
              >
                <LayoutGrid className="w-8 h-8" />
              </Link>
            )
          }

          return (
            <Link
              key={idx}
              id={navId}
              href={item.href}
              aria-label={item.label}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors duration-200 ${
                item.active ? 'text-emerald-400' : 'text-slate-300 hover:text-white'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center mb-0.5 transition-colors ${
                  item.active ? 'bg-white/10' : 'bg-transparent'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-semibold">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
