import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Search the LocalePak Directory',
  description: 'Search businesses and companies across Pakistan by name, keyword, category, and city on LocalePak.',
  robots: { index: false, follow: true },
  alternates: { canonical: 'https://www.localepak.com/search/' },
}

export default function SearchLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
