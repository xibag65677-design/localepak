import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  name: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm text-gray-500 mb-6 overflow-x-auto whitespace-nowrap pb-2">
      <Link href="/" className="flex items-center gap-1 hover:text-[#60a5fa] transition-colors">
        <Home className="w-4 h-4" />
        <span className="hidden sm:inline">Home</span>
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
          {item.href ? (
            <Link href={item.href} className="hover:text-[#60a5fa] transition-colors max-w-[150px] truncate">
              {item.name}
            </Link>
          ) : (
            <span className="text-[#0f2b3d] font-medium max-w-[150px] truncate">
              {item.name}
            </span>
          )}
        </div>
      ))}
    </nav>
  )
}
