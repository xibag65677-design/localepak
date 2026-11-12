import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = {
  title: 'Privacy Policy | LocalePak Pakistan Business Directory',
  description: 'Read the LocalePak privacy policy. Learn how we collect, store, and protect your personal and business data, and the rights available to you under GDPR.',
  alternates: {
    canonical: 'https://www.localepak.com/privacy/',
  },
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-4">Privacy Policy</h1>
        <p className="text-sm text-slate-500 mb-8 border-b border-slate-200 pb-4">
          Last Updated: September 2026 • LocalePak Digital Directory Platform
        </p>

        <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed space-y-6">
          <p>
            At <strong>LocalePak</strong> (accessible via <a href="https://www.localepak.com/" className="text-emerald-600 hover:underline">https://www.localepak.com/</a>), the privacy and protection of our users, business owners, professionals, and visitors is of paramount importance. This Privacy Policy describes the types of personal and business information collected, recorded, and utilized by LocalePak, as well as the safeguards and rights available to you.
          </p>
          <p>
            If you have questions or require more information about our Privacy Policy, please contact our administrative team at <a href="mailto:admin@localepak.com" className="text-emerald-600 hover:underline">admin@localepak.com</a>.
          </p>
          
          <h2 className="text-xl font-bold text-[#0F172A] pt-4">1. Information We Collect</h2>
          <p>
            We collect information from users through direct submissions, automated technologies, and interactions across the platform:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
            <li><strong>Personal Contact Data:</strong> When registering an account, submitting a contact inquiry, or reporting a listing, we may collect your name, email address, telephone number, and optional verification credentials.</li>
            <li><strong>Public Business & Professional Listings:</strong> When submitting a business, company, job vacancy, or professional talent profile, you voluntarily supply public data including trade names, addresses, WhatsApp contacts, job descriptions, service categories, logos, and business hours. This information is published publicly by design to enable customer discovery.</li>
            <li><strong>Automated Device & Log Data:</strong> We do not collect device or log data in our application code. Any logging by our hosting platform will be described here once confirmed by the provider.</li>
          </ul>

          <h2 className="text-xl font-bold text-[#0F172A] pt-4">2. Use of Information</h2>
          <p>
            LocalePak utilizes the collected information for transparent, legitimate operational purposes:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
            <li>To publish, index, and organize public business listings, professional profiles, and job opportunities across Pakistani cities.</li>
            <li>To enable direct consumer-to-business communications via phone, email, and WhatsApp.</li>
            <li>To conduct administrative moderation, anti-spam validation, and credential verification.</li>
            <li>To monitor server performance, diagnose technical errors, and optimize search responsiveness.</li>
            <li>To detect, prevent, and mitigate fraudulent submissions, abusive behavior, and impersonation.</li>
          </ul>
          <p>
            Service providers: LocalePak stores accounts and listings with Firebase (authentication, database and file storage). System emails (registration, listing updates, review notifications) are routed through Brevo from noreply@localepak.com. These providers process only the data needed to provide those services.
          </p>

          <h2 className="text-xl font-bold text-[#0F172A] pt-4">3. Cookies</h2>
          <p>
            LocalePak uses essential session cookies, user preference cookies, and analytics tags (including Google Analytics, which is active on this site and sets analytics cookies that Google processes under Google's terms, and Microsoft Clarity). You can configure your web browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. For detailed technical information regarding the specific cookie categories utilized across our platform, please consult our dedicated <Link href="/cookie-policy" className="text-emerald-600 underline">Cookie Policy</Link>.
          </p>

          <h2 className="text-xl font-bold text-[#0F172A] pt-4">4. European Economic Area (EEA), UK & Swiss User Rights</h2>
          <p>
            In compliance with the General Data Protection Regulation (GDPR), the UK Data Protection Act, and the Swiss Federal Act on Data Protection (FADP), users residing in the EEA, UK, or Switzerland possess defined legal rights regarding their personal information:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
            <li><strong>Right of Access:</strong> You may request copies of your personal data held by LocalePak.</li>
            <li><strong>Right to Rectification:</strong> You may request correction of inaccurate or incomplete listing details.</li>
            <li><strong>Right to Erasure (&quot;Right to be Forgotten&quot;):</strong> You may request deletion of your account or personal information under certain circumstances.</li>
            <li><strong>Right to Restrict or Object to Processing:</strong> You may restrict or object to our processing of your personal data.</li>
            <li><strong>Right to Withdraw Consent:</strong> You can record your cookie choice using our on-site cookie preferences banner; see our Cookie Policy for what that choice currently does and does not change.</li>
          </ul>

          <h2 className="text-xl font-bold text-[#0F172A] pt-4">5. Public Directory Listings & Content Removal</h2>
          <p>
            Business listings, professional profiles, and job announcements on LocalePak are published for public business discovery. If you are the authorized owner of a business listed on LocalePak and wish to update, claim, or permanently remove your listing, you may:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
            <li>Click the &quot;Claim Business&quot; button on your business profile to verify ownership.</li>
            <li>Submit a ticket through our <Link href="/report-abuse" className="text-emerald-600 underline">Report Abuse Portal</Link>.</li>
            <li>Email our data compliance desk directly at <a href="mailto:admin@localepak.com" className="text-emerald-600 underline">admin@localepak.com</a> with verification proof for prompt removal within 24–48 business hours.</li>
          </ul>

          <h2 className="text-xl font-bold text-[#0F172A] pt-4">6. Data Security Safeguards</h2>
          <p>
            We implement administrative, technical, and physical security measures—including TLS encryption, role-based database security rules, and strict administrative authentication—to safeguard your information. While no internet transmission is 100% immune, we regularly update our infrastructure to prevent unauthorized access or disclosure.
          </p>

          <h2 className="text-xl font-bold text-[#0F172A] pt-4">7. Policy for Children</h2>
          <p>
            LocalePak does not knowingly collect or solicit personal identifiable information from children under the age of 13. If you believe your child has submitted personal information on our website, please notify us immediately at <a href="mailto:admin@localepak.com" className="text-emerald-600 underline">admin@localepak.com</a> and we will swiftly remove such data.
          </p>

          <h2 className="text-xl font-bold text-[#0F172A] pt-4">8. Contact Information</h2>
          <p>
            For questions, data access requests, or policy inquiries, contact our data administration desk:
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-1 text-slate-800">
            <p className="font-bold text-slate-900">LocalePak Administration &amp; Data Compliance</p>
            <p>Office 303, Evacuee Trust Complex, F-5/1, Islamabad, Pakistan</p>
            <p>Email: <a href="mailto:admin@localepak.com" className="text-emerald-600 underline">admin@localepak.com</a></p>
            <p>Direct Inquiries / Support: +92 334 563 6230</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
