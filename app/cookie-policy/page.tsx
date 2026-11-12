import { Metadata } from 'next'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cookie Policy | LocalePak - Pakistan Business Directory',
  description: 'Understand how LocalePak uses cookies and web analytics to keep you signed in, remember your preferences, and provide a secure, customized experience.',
  alternates: {
    canonical: 'https://www.localepak.com/cookie-policy/',
  },
  robots: { index: true, follow: true },
}

export default function CookiePolicyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#F8FAFC] text-slate-800 font-sans min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Cookie &amp; Tracking Policy
          </h1>
          <p className="text-sm text-slate-500 mb-8 border-b border-slate-100 pb-4">
            Last Updated: September 2026 • LocalePak Enterprise Ecosystem
          </p>

          <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
            <p>
              This Cookie Policy explains how <strong>LocalePak</strong> (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) uses cookies and local browser storage when you visit our website at <a href="https://www.localepak.com/" className="text-emerald-600 underline">https://www.localepak.com/</a>. It outlines the specific types of cookies used, why they are deployed, and how you can manage your preferences at any time.
            </p>

            <h2 className="text-xl font-bold text-slate-900 pt-4">1. What Are Cookies?</h2>
            <p>
              Cookies are small data files stored on your browser, device, or computer by web servers when you browse a website. They serve critical functional purposes, such as keeping you authenticated, remembering your cookie-consent choice and keeping you signed in, and analyzing web traffic.
            </p>

            <h2 className="text-xl font-bold text-slate-900 pt-4">2. Categories of Cookies We Use</h2>
            <div className="space-y-4">
              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                <h3 className="font-bold text-slate-900 mb-1">A. Strictly Necessary / Essential Cookies</h3>
                <p className="text-xs text-slate-600">
                  Essential cookies are required for the basic operation and security of the website. These cover the minimum needed for the site to work, such as keeping you signed in (via Firebase Authentication) and remembering your cookie-consent choice. Sign-in state is stored in your browser's local storage, not in a LocalePak cookie.
                </p>
              </div>

              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                <h3 className="font-bold text-slate-900 mb-1">B. Performance &amp; Analytics Cookies</h3>
                <p className="text-xs text-slate-600">
                  We use Google Analytics, Microsoft Clarity, Vercel Analytics and Vercel Speed Insights to measure engagement, monitor page speed and detect technical errors. These tools may set their own cookies or use other identifiers; we do not publish a fixed list of their cookie names because they are set by the vendors' scripts, not by LocalePak code.
                </p>
              </div>

              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                <h3 className="font-bold text-slate-900 mb-1">C. Functionality &amp; Preference Cookies</h3>
                <p className="text-xs text-slate-600">
                  These cookies allow our website to remember choices you make during your visit, such as your cookie-consent choice and, when you sign in, your session details.
                </p>
              </div>

            </div>

            <h2 className="text-xl font-bold text-slate-900 pt-4">3. Managing and Opting Out of Cookies</h2>
            <p>
              You have the right to decide whether to accept or reject cookies. You can exercise your preferences through several channels:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>On-Site Consent Manager:</strong> Your choice is stored in this browser (local storage) when you use the cookie banner. Choosing 'Essential Only' records that you declined non-essential analytics, but it does not currently switch off Google Analytics, Microsoft Clarity, Vercel Analytics or Vercel Speed Insights, which load on every page. Until that control is implemented, you can block those tools with your browser's cookie and site-data controls.
              </li>
              <li>
                <strong>Browser Settings:</strong> You can configure your browser (Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge) to reject cookies, clear cache, or notify you when a cookie is placed.
              </li>
            </ul>

            <h2 className="text-xl font-bold text-slate-900 pt-4">4. EU User Consent &amp; Data Protection</h2>
            <p>
              For users located in the European Economic Area (EEA), the United Kingdom, or Switzerland, non-essential analytics are intended to be governed by user consent in accordance with applicable data protection regulations. Until that control is fully implemented, section 3 above describes what your recorded choice currently does.
            </p>

            <h2 className="text-xl font-bold text-slate-900 pt-4">5. Contact Our Data Desk</h2>
            <p>
              If you have any questions or require further clarification regarding our use of cookies or tracking technologies, please consult our <Link href="/privacy" className="text-emerald-600 underline">Privacy Policy</Link> or email our support desk directly at <a href="mailto:admin@localepak.com" className="text-emerald-600 underline">admin@localepak.com</a>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
