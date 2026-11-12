'use client'

import { usePathname } from 'next/navigation'

interface BreadcrumbItem {
  name: string
  url: string
}

export function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', url: 'https://www.localepak.com/' }
  ]

  const pathSegments = pathname.split('/').filter(segment => segment)
  let currentUrl = 'https://www.localepak.com'

  pathSegments.forEach((segment) => {
    currentUrl += `/${segment}`
    const finalUrl = `${currentUrl}/`
    
    let name = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    // Special cases for better naming
    if (segment === 'best-restaurants') name = 'Best Restaurants'
    if (segment === 'top-real-estate') name = 'Top Real Estate'
    if (segment === 'healthcare-services') name = 'Healthcare Services'
    if (segment === 'add-business') name = 'Add Business'
    if (segment === 'categories') name = 'Categories'
    if (segment === 'locations') name = 'Locations'
    if (segment === 'cities') name = 'Cities'

    breadcrumbs.push({ name, url: finalUrl })
  })

  return breadcrumbs
}

export function BreadcrumbSchema({ pathname }: { pathname: string }) {
  const breadcrumbs = generateBreadcrumbs(pathname)
  
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: breadcrumb.name,
      item: breadcrumb.url
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
