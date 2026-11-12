import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'User & Business Dashboard | LocalePak',
  description: 'Manage your listings, profile settings, saved bookmarks, and notifications on LocalePak.',
  robots: { index: false, follow: false },
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children
}
