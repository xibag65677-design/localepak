import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

const perks = [
  'Free to list – no credit card required',
  'Put your business in front of local searchers',
  'Manage your business profile easily',
  'Get found on Google and other search engines',
]

export default function CTASection() {
  return (
    <section className="py-20 bg-[#0F172A]" aria-labelledby="cta-heading">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2
          id="cta-heading"
          className="text-3xl md:text-4xl font-bold text-white text-balance"
        >
          List Your Company <span className="text-[#34D399]">Free</span> Today
        </h2>
        <p className="mt-4 text-white/65 text-lg max-w-xl mx-auto text-pretty">
          List your business on LocalePak, the free Pakistan business directory built for local discovery.
          It&apos;s completely free and takes less than 2 minutes.
        </p>

        <ul className="mt-8 flex flex-col sm:flex-row flex-wrap justify-center gap-4 text-sm text-white/80">
          {perks.map((perk) => (
            <li key={perk} className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#34D399] shrink-0" aria-hidden="true" />
              {perk}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/add-business" prefetch={false}
            className="px-8 py-4 bg-[#34D399] hover:bg-emerald-400 text-white font-bold rounded-xl transition-colors duration-200 text-base shadow-lg"
          >
            Add Your Business – It&apos;s Free
          </Link>
          <Link
            href="/categories"
            className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-colors duration-200 text-base border border-white/20"
          >
            Browse Businesses
          </Link>
        </div>
      </div>
    </section>
  )
}
