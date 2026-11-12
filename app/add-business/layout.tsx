import type { Metadata } from 'next'

// Public, indexable add page: the form itself renders for signed-out
// visitors (and Googlebot); only the submit is gated behind sign-in,
// which returns the user here via /login?next=/add-business.
export const metadata: Metadata = {
  title: 'Add Business in Pakistan – List Your Business | LocalePak',
  description:
    'Add your business to LocalePak and list it across Pakistan. Submit your name, category, city, address, hours and services for review and approval.',
  alternates: {
    canonical: 'https://www.localepak.com/add-business/',
  },
  openGraph: {
    title: 'Add Business in Pakistan – List Your Business | LocalePak',
    description:
      'Add your business to LocalePak and list it across Pakistan. Submit your name, category, city, address, hours and services for review and approval.',
    url: 'https://www.localepak.com/add-business/',
    siteName: 'LocalePak',
    locale: 'en_PK',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function AddBusinessLayout({ children }: { children: React.ReactNode }) {
  return children
}
