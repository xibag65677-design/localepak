import { Metadata } from 'next'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Accessibility Statement | LocalePak Digital Inclusivity',
  description: 'Our commitment to web accessibility (WCAG 2.1) ensuring equal access for all users across Pakistan.',
  alternates: {
    canonical: 'https://www.localepak.com/accessibility/',
  },
}

export default function AccessibilityPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#F8FAFC] text-slate-800 font-sans min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Accessibility Statement
          </h1>
          <p className="text-sm text-slate-500 mb-8 border-b border-slate-100 pb-4">
            Last Updated: August 2026 • LocalePak Enterprise Ecosystem
          </p>

          <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
            <p>
              <strong>LocalePak</strong> is committed to ensuring digital accessibility for people of all abilities. We continuously improve user experience for everyone and apply the relevant accessibility standards (WCAG 2.1 Level AA guidelines).
            </p>

            <h2 className="text-xl font-bold text-slate-900 pt-4">1. Accessibility Features</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Keyboard Navigation:</strong> Full keyboard support for mobile and desktop menus.</li>
              <li><strong>Screen Reader Compatibility:</strong> Proper ARIA landmarks, alt texts for images, and semantic HTML tags.</li>
              <li><strong>Color Contrast:</strong> High contrast text ratios across dark headers and light directory sections.</li>
            </ul>

            <h2 className="text-xl font-bold text-slate-900 pt-4">2. Feedback & Support</h2>
            <p>
              We welcome your feedback on the accessibility of LocalePak. If you encounter accessibility barriers, please notify us at <a href="mailto:admin@localepak.com" className="text-emerald-600 underline">admin@localepak.com</a>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
