import { Metadata } from 'next'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { HelpCircle, ChevronDown } from 'lucide-react'

export const metadata: Metadata = {
  title: 'LocalePak FAQs – Free Listings, Jobs, Reviews & Companies',
  description: 'Answers about listing free on LocalePak, how approval works, posting jobs from your dashboard, reviews, and searching companies — all in one place.',
  alternates: {
    canonical: 'https://www.localepak.com/faqs/',
  },
}

const faqs = [
  {
    q: "Who is the founder and CEO of LocalePak?",
    a: "Muhammad Imran is the Founder and Chief Executive Officer (CEO) of LocalePak (https://www.localepak.com). He is a Pakistani full-stack web and AI developer, software engineer, and technical SEO specialist who also created Imran Digitals (https://www.imrandigitals.com/). He built LocalePak to give Pakistani businesses a genuinely free place to be discovered online."
  },
  {
    q: "Is listing a business on LocalePak free?",
    a: "Yes. Creating a business listing on LocalePak is free. It includes your business name, address, contact phone, direct WhatsApp number, business category, opening hours, services, products and description — with no registration fees or hidden subscription costs."
  },
  {
    q: "How long does business approval take?",
    a: "Every submission is reviewed by our team before it appears publicly. We aim to check most submissions within a few working days, but that is an aim, not a guarantee — it can take longer when volume is high or when we need to clarify details with the owner. Once approved, your listing goes live immediately, and then appears on your city page, your category page and in search."
  },
  {
    q: "How do I get a Verified Business Badge on LocalePak?",
    a: "The Verified Badge is launching soon and is not available yet. When it opens, it will involve a document check of the business. Join the waitlist through the Advertise page or the contact page and we will let you know as soon as it launches."
  },
  {
    q: "How do customer reviews work?",
    a: "Anyone who has used a listed business can leave a review on its profile page. Reviews do not appear instantly — each one is checked by our team first, and only approved reviews are shown, so the ratings you see are from real submissions that passed moderation."
  },
  {
    q: "Where can I learn more about LocalePak's founder and leadership?",
    a: "You can read about Founder & CEO Muhammad Imran's background, engineering stack, and vision on the official LocalePak About page (https://www.localepak.com/about/) or visit his official website at https://www.imrandigitals.com/."
  },
  {
    q: "Can I post job openings for my Pakistani company?",
    a: "Yes. Register for a free account, log in, and choose 'Post a Job' from your dashboard. You can add the role, company, city and how candidates should apply. Jobs are reviewed by our team before they appear, just like business listings."
  },
  {
    q: "How can I update or delete my business listing?",
    a: "You can submit an edit or removal request through our Contact Page or by emailing admin@localepak.com with proof of business ownership."
  }
]

export default function FAQsPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a
      }
    }))
  }

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="bg-[#F8FAFC] text-slate-800 font-sans min-h-screen pb-16">
        <section className="bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white py-16 text-center border-b border-slate-800">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
              Everything you need to know about navigating, listing, and hiring on LocalePak.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 py-12">
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 text-base flex items-start gap-2">
                  <HelpCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2.5 pl-7 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
