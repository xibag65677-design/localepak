import type { Metadata } from 'next'

// Public, indexable add page: the form itself renders for signed-out
// visitors (and Googlebot); only the submit is gated behind sign-in,
// which returns the user here via /login?next=/add-company.
export const metadata: Metadata = {
  title: 'Add Company in Pakistan – List Your Company | LocalePak',
  description:
    'Add your company to LocalePak and list it across Pakistan. Submit your industry, city, contact details and profile for review and approval.',
  alternates: {
    canonical: 'https://www.localepak.com/add-company/',
  },
  openGraph: {
    title: 'Add Company in Pakistan – List Your Company | LocalePak',
    description:
      'Add your company to LocalePak and list it across Pakistan. Submit your industry, city, contact details and profile for review and approval.',
    url: 'https://www.localepak.com/add-company/',
    siteName: 'LocalePak',
    locale: 'en_PK',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function AddCompanyLayout({ children }: { children: React.ReactNode }) {
  return children
}
