import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact LocalePak – Support, Listings & Partnerships',
  description: 'Contact LocalePak: email support@localepak.com or admin@localepak.com, call +92 334 5636230, or visit Office 303, Evacuee Trust Complex, F-5/1, Islamabad.',
  alternates: { canonical: 'https://www.localepak.com/contact/' },
  openGraph: {
    title: 'Contact LocalePak – Support, Listings & Partnerships',
    description: 'Contact LocalePak: email support@localepak.com or admin@localepak.com, call +92 334 5636230, or visit Office 303, Evacuee Trust Complex, F-5/1, Islamabad.',
    url: 'https://www.localepak.com/contact/',
    type: 'website',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
