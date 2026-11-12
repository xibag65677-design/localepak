import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In to LocalePak',
  description: 'Log in to your LocalePak account to manage your business listings, company profile, and job applications.',
  robots: { index: false, follow: false },
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children
}
