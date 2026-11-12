import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Terms of Service | LocalePak Pakistan Business Directory',
  description: 'Read the LocalePak terms of service. Learn the rules and guidelines for listing and searching businesses on our free Pakistan directory.',
  alternates: {
    canonical: 'https://www.localepak.com/terms/',
  },
  robots: { index: true, follow: true },
}

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-8">Terms of Service</h1>
        <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed">
          <p className="mb-4">Last Updated: May 9, 2026</p>
          
          <h2 className="text-xl font-bold text-[#0F172A] mt-8 mb-4">1. Agreement to Terms</h2>
          <p className="mb-4">
            These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and <strong>LocalePak</strong> (“we,” “us” or “our”), concerning your access to and use of the <a href="https://www.localepak.com/" className="text-emerald-600 hover:underline">localepak.com</a> website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the “Site”).
          </p>
          <p className="mb-4">
            You agree that by accessing the Site, you have read, understood, and agree to be bound by all of these Terms of Service. If you do not agree with all of these Terms of Service, then you are expressly prohibited from using the Site and you must discontinue use immediately.
          </p>

          <h2 className="text-xl font-bold text-[#0F172A] mt-8 mb-4">2. Intellectual Property Rights</h2>
          <p className="mb-4">
            Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us.
          </p>

          <h2 className="text-xl font-bold text-[#0F172A] mt-8 mb-4">3. User Representations</h2>
          <p className="mb-4">
            By using the Site, you represent and warrant that:
          </p>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>All registration and listing information you submit will be true, accurate, current, and complete.</li>
            <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
            <li>You have the legal capacity and you agree to comply with these Terms of Service.</li>
            <li>You will not access the Site through automated or non-human means, whether through a bot, script, or otherwise.</li>
            <li>You will not use the Site for any illegal or unauthorized purpose.</li>
          </ul>

          <h2 className="text-xl font-bold text-[#0F172A] mt-8 mb-4">4. Business Listings & Submissions</h2>
          <p className="mb-4">
            Users who add business listings represent that the information provided is accurate and that they have the right to publish it. LocalePak reserves the right to review, edit, or remove any listing at its sole discretion if it violates our quality standards or community guidelines.
          </p>

          <h2 className="text-xl font-bold text-[#0F172A] mt-8 mb-4">5. Prohibited Activities</h2>
          <p className="mb-4">
            You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
          </p>

          <h2 className="text-[#0F172A] font-bold text-xl mt-8 mb-4">6. Limitation of Liability</h2>
          <p className="mb-4">
            LocalePak is a directory service. We do not guarantee the quality, safety, or legality of services provided by the businesses listed on our platform. In no event will we be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages arising from your use of the Site.
          </p>

          <h2 className="text-xl font-bold text-[#0F172A] mt-8 mb-4">7. Governing Law</h2>
          <p className="mb-4">
            These Terms of Service and your use of the Site are governed by and construed in accordance with the laws of Pakistan.
          </p>

          <h2 className="text-xl font-bold text-[#0F172A] mt-8 mb-4">8. Contact Us</h2>
          <p className="mb-4">
            In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
          </p>
          <p className="font-medium text-gray-900">
            LocalePak Support<br />
            Email: admin@localepak.com<br />
            Address: Evacuee Trust Complex, F-5/1, Islamabad, Pakistan
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
