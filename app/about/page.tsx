import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ChevronRight,
  Code2,
  Cpu,
  ExternalLink,
  Eye,
  FileText,
  Globe,
  Headphones,
  HeartHandshake,
  HelpCircle,
  Linkedin,
  MapPin,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Users,
} from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

import {
  FOUNDER_LINKEDIN_URL,
  FOUNDER_PORTFOLIO_URL,
  LOCALEPAK_ORGANIZATION_ID,
} from '@/lib/organization-schema'

// Public, stack-free expertise list used only in structured data.
const FOUNDER_SCHEMA_KNOWS_ABOUT = [
  'Full-Stack Web Development',
  'Artificial Intelligence',
  'Technical SEO',
  'Local Search',
]

export function generateMetadata(): Metadata {
  const title = 'About LocalePak – Founder & CEO Muhammad Imran | LocalePak'
  const description =
    'Meet Muhammad Imran, Founder & CEO of LocalePak, Pakistan’s free business directory — built to help local businesses get discovered, with no listing fees.'

  return {
    title,
    description,
    alternates: {
      canonical: 'https://www.localepak.com/about',
    },
    openGraph: {
      title,
      description,
      url: 'https://www.localepak.com/about',
      siteName: 'LocalePak',
      locale: 'en_PK',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

const STATS = [
  {
    value: '183',
    label: 'Cities Covered',
    detail: 'City pages across Pakistan',
    icon: MapPin,
  },
  {
    value: '24',
    label: 'Business Categories',
    detail: 'Organised for local discovery',
    icon: Building2,
  },
  {
    value: '100%',
    label: 'Free Listings',
    detail: 'No listing fee to get started',
    icon: BadgeCheck,
  },
  {
    value: '0',
    label: 'Rupees to List',
    detail: 'Contact details are not paywalled',
    icon: ShieldCheck,
  },
]

const FOUNDER_SKILLS = [
  'Full-Stack Web Architecture',
  'Modern Web Technologies',
  'JavaScript Backend Development',
  'Artificial Intelligence & Agentic AI',
  'Technical SEO & Core Web Vitals',
  'Generative Engine Optimization (GEO)',
  'Cloud Database Architecture',
  'Local Search Engineering',
  'High-Performance PWA Development',
  'REST & GraphQL API Design',
]

const CORE_VALUES = [
  {
    title: '100% Free Forever',
    description:
      'Business listings are free, with no subscriptions and no paywall placed between a customer and a business’s phone or WhatsApp details.',
    icon: BadgeCheck,
  },
  {
    title: 'Customer & Community First',
    description:
      'LocalePak is built for dukandars, startups, job seekers and everyday customers who need a simpler way to find and contact local businesses.',
    icon: HeartHandshake,
  },
  {
    title: 'Radical Transparency',
    description:
      'We do not publish invented statistics or dress up estimates as facts. Listings are owner-submitted, reviewed and presented honestly.',
    icon: Eye,
  },
  {
    title: 'Continuous Technical Innovation',
    description:
      'A modern web foundation, fast search, structured data and local SEO architecture help business information stay discoverable and easy to use.',
    icon: Cpu,
  },
  {
    title: 'Nationwide Inclusive Growth',
    description:
      'From cottage artisans to technology enterprises in Karachi, Lahore and Islamabad, businesses of every size deserve a route to online visibility.',
    icon: Users,
  },
  {
    title: 'Data Accuracy & E-E-A-T',
    description:
      'Useful local discovery depends on accurate business details, working phone numbers, validated information and direct WhatsApp connectivity.',
    icon: ShieldCheck,
  },
]

const FUTURE_GOALS = [
  {
    title: 'Grow reviewed listings city by city',
    description:
      'Our next focus is to expand owner-submitted, reviewed business listings across Pakistan, city by city and category by category.',
    icon: MapPin,
  },
  {
    title: 'Launch Featured listings and the Verified badge',
    description:
      'Businesses that want additional visibility will be able to choose Featured placement or apply for a Verified badge through a clear review process.',
    icon: BadgeCheck,
  },
  {
    title: 'Build Pakistan’s most trusted local review system',
    description:
      'We are building toward a review experience designed around genuine customer experiences, moderation and trust — so good local businesses can earn visibility fairly.',
    icon: Star,
  },
]

const TEAM_FUNCTIONS = [
  {
    name: 'Engineering & Product Team',
    role: 'Platform Engineering & Product',
    description:
      'The engineering function behind search speed, UI/UX, database scalability and the systems that support listing submission and moderation.',
    icon: Code2,
  },
  {
    name: 'Customer & Listing Support',
    role: 'Owner Support & Listing Help',
    description:
      'The support function that helps business owners with verification questions, profile updates and free job posting.',
    icon: Headphones,
  },
  {
    name: 'Content & SEO Strategy',
    role: 'Content, Taxonomy & Local SEO',
    description:
      'The content function responsible for business taxonomy, citation consistency, category organisation and practical city guides.',
    icon: FileText,
  },
]

const ABOUT_FAQS = [
  {
    question: 'Who is the founder of LocalePak?',
    answer:
      'Muhammad Imran is the Founder and CEO of LocalePak (localepak.com). He is a Pakistani full-stack web and AI developer and technical SEO specialist who also founded Imran Digitals.',
  },
  {
    question: 'Who is the CEO of LocalePak?',
    answer:
      'Muhammad Imran is the CEO of LocalePak. He is also the platform’s lead software architect, steering engineering, technical SEO and growth.',
  },
  {
    question: 'When was LocalePak founded, and what is its mission?',
    answer:
      'LocalePak was founded in 2026 by Muhammad Imran. Its mission is to give Pakistan’s small and medium businesses free online visibility, with no listing paywalls or hidden fees.',
  },
  {
    question: 'What is Muhammad Imran’s official website?',
    answer:
      'Muhammad Imran’s official website and portfolio is https://www.imrandigitals.com/. His LinkedIn profile is https://www.linkedin.com/in/muhammad-imran-972364373/.',
  },
  {
    question: 'What is the relationship between LocalePak and Imran Digitals?',
    answer:
      'LocalePak is a venture founded and engineered by Muhammad Imran. Imran Digitals is his digital agency and engineering consultancy, providing custom web applications, SaaS architecture, AI automation and technical SEO.',
  },
  {
    question: 'What technology is LocalePak built on?',
    answer:
      'LocalePak is built as a fast, mobile-first web platform designed for local search, with Schema.org structured data used to describe the site and its content clearly for search engines and AI assistants.',
  },
]

export default function AboutPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': 'https://www.localepak.com/about/#webpage',
        url: 'https://www.localepak.com/about',
        name: 'About LocalePak – Founder & CEO Muhammad Imran',
        about: { '@id': LOCALEPAK_ORGANIZATION_ID },
        mainEntity: { '@id': 'https://www.localepak.com/about/#muhammad-imran' },
      },
      {
        '@type': 'Person',
        '@id': 'https://www.localepak.com/about/#muhammad-imran',
        name: 'Muhammad Imran',
        jobTitle: 'Founder, Owner & CEO',
        description:
          'Muhammad Imran is the Founder, Owner and CEO of LocalePak, a Pakistani full-stack web and AI developer, software architect and technical SEO specialist, and the founder of Imran Digitals.',
        url: FOUNDER_PORTFOLIO_URL,
        sameAs: [FOUNDER_PORTFOLIO_URL, FOUNDER_LINKEDIN_URL],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Multan',
          addressRegion: 'Punjab',
          addressCountry: 'PK',
        },
        worksFor: { '@id': LOCALEPAK_ORGANIZATION_ID },
        founderOf: [
          { '@id': LOCALEPAK_ORGANIZATION_ID },
          {
            '@type': 'Organization',
            name: 'Imran Digitals',
            url: FOUNDER_PORTFOLIO_URL,
          },
        ],
        knowsAbout: FOUNDER_SCHEMA_KNOWS_ABOUT,
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://www.localepak.com/about/#faq',
        mainEntity: ABOUT_FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://www.localepak.com/about/#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.localepak.com/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'About',
            item: 'https://www.localepak.com/about',
          },
        ],
      },
    ],
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main id="main-content">
        {/* Hero */}
        <section className="relative overflow-hidden bg-[#0F172A] text-white">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-emerald-600/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-emerald-500/15 blur-3xl"
          />

          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <nav aria-label="Breadcrumb" className="mb-10">
              <ol className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-300">
                <li>
                  <Link href="/" className="transition-colors hover:text-white">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="h-4 w-4 text-slate-500" />
                </li>
                <li aria-current="page" className="text-white">
                  About
                </li>
              </ol>
            </nav>

            <div className="max-w-4xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-200">
                <Sparkles className="h-4 w-4" />
                Founded by Muhammad Imran
              </span>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                About LocalePak
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
                LocalePak is Pakistan’s free business directory, founded in 2026 by{' '}
                <strong className="font-semibold text-white">Muhammad Imran</strong>, Founder of{' '}
                <a
                  href={FOUNDER_PORTFOLIO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-emerald-300 underline decoration-emerald-300/50 underline-offset-4 transition-colors hover:text-emerald-200"
                >
                  Imran Digitals
                </a>
                . It connects local businesses with customers through free listings on 183 city pages across Pakistan,
                while keeping phone and WhatsApp details visible instead of hiding them behind paywalls.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#founder"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-950/30 transition-colors hover:bg-emerald-500"
                >
                  Meet the Founder
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  href="/businesses"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-600 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
                >
                  Explore Businesses
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Honest platform stats */}
        <section aria-label="LocalePak platform facts" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat) => {
              const Icon = stat.icon
              return (
                <article
                  key={stat.label}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-4xl font-extrabold tracking-tight text-slate-900">
                        {stat.value}
                      </p>
                      <h2 className="mt-2 text-sm font-bold text-slate-900">{stat.label}</h2>
                      <p className="mt-1 text-sm leading-relaxed text-slate-500">{stat.detail}</p>
                    </div>
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        {/* Founder spotlight */}
        <section id="founder" className="scroll-mt-24 px-4 pb-20 pt-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Founder Spotlight
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Muhammad Imran — Founder, Owner & CEO
              </h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                LocalePak is led by the developer and digital founder who built it: a platform shaped by
                hands-on experience with Pakistan’s local businesses, modern web engineering and local
                search.
              </p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="grid lg:grid-cols-[0.82fr_1.55fr]">
                {/* Founder profile card */}
                <aside className="border-b border-slate-200 bg-slate-50 p-7 sm:p-9 lg:border-b-0 lg:border-r">
                  <div className="relative mx-auto w-fit lg:mx-0">
                    <div
                      aria-hidden="true"
                      className="flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-500 text-5xl font-extrabold tracking-tight text-white shadow-xl shadow-emerald-600/20 ring-8 ring-white"
                    >
                      MI
                    </div>
                    <span className="absolute -bottom-2 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow-md">
                      <BadgeCheck className="h-3.5 w-3.5" />
                      Founder
                    </span>
                  </div>

                  <div className="mt-9 text-center lg:text-left">
                    <h3 className="text-3xl font-extrabold tracking-tight text-slate-900">
                      Muhammad Imran
                    </h3>
                    <p className="mt-2 font-bold text-emerald-700">
                      Founder & Chief Executive Officer (CEO)
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-500">
                      Founder, owner and lead software architect of LocalePak
                    </p>
                    <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-600">
                      <MapPin className="h-4 w-4 text-emerald-600" />
                      Multan & Lahore, Punjab, Pakistan
                    </p>
                  </div>

                  <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                      Key Ventures
                    </h4>
                    <ul className="mt-4 space-y-3 text-sm font-semibold text-slate-700">
                      <li className="flex items-start gap-3">
                        <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-600" />
                        Founder & CEO @ LocalePak
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-600" />
                        Founder @ Imran Digitals
                      </li>
                    </ul>
                  </div>

                  <div className="mt-6 grid gap-3">
                    <a
                      href={FOUNDER_PORTFOLIO_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-700"
                    >
                      <Globe className="h-4 w-4" />
                      Visit Portfolio
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <a
                      href={FOUNDER_LINKEDIN_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition-colors hover:border-emerald-300 hover:text-emerald-700"
                    >
                      <Linkedin className="h-4 w-4 text-[#0A66C2]" />
                      LinkedIn
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </aside>

                {/* Founder biography */}
                <div className="p-7 sm:p-9 lg:p-11">
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700">
                    <Sparkles className="h-4 w-4" />
                    The Visionary Behind LocalePak
                  </span>

                  <h3 className="mt-5 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                    Building free digital visibility for local Pakistan
                  </h3>

                  <div className="mt-6 space-y-5 leading-relaxed text-slate-600">
                    <p>
                      <strong className="font-semibold text-slate-900">Muhammad Imran</strong> is a
                      Pakistani full-stack web & AI developer, software architect and technical SEO
                      specialist. As the founder of{' '}
                      <a
                        href={FOUNDER_PORTFOLIO_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-emerald-700 underline decoration-emerald-300 underline-offset-4 hover:text-emerald-800"
                      >
                        Imran Digitals
                      </a>
                      , he works across custom web applications, SaaS architecture, AI automation and
                      technical SEO.
                    </p>
                    <p>
                      Through Imran Digitals, he has worked with local businesses across Pakistan and
                      saw firsthand that many small businesses — a dukaan in Multan, a clinic in
                      Lahore, a workshop in Gujranwala — were effectively invisible online. Legacy
                      directories could charge Rs. 5,000 to Rs. 50,000 a year simply to display a
                      phone number, or they locked contact details behind login walls.
                    </p>
                    <p>
                      He built LocalePak to fix that problem: a completely free directory where any
                      business can register, have its submission reviewed, and be discovered without
                      spending a single rupee. The aim is practical, not theoretical — make it easy
                      for a customer to find the right local business and contact it directly.
                    </p>
                  </div>

                  <div className="mt-9 border-t border-slate-200 pt-8">
                    <h4 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-slate-900">
                      <Cpu className="h-5 w-5 text-emerald-600" />
                      Founder’s Core Engineering & SEO Competencies
                    </h4>
                    <ul className="mt-5 flex flex-wrap gap-2" aria-label="Muhammad Imran skills">
                      {FOUNDER_SKILLS.map((skill) => (
                        <li
                          key={skill}
                          className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
                    <p className="text-sm leading-relaxed text-emerald-950">
                      <strong className="font-bold">Founder fact:</strong> Muhammad Imran is the
                      founder, owner and CEO of LocalePak and the founder of Imran Digitals, his
                      digital agency and engineering consultancy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission and vision */}
        <section className="border-y border-slate-200 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Purpose
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Our Mission & Vision
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <article className="rounded-3xl border border-slate-200 bg-[#F8FAFC] p-7 shadow-sm sm:p-9">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-2xl font-extrabold text-slate-900">Our Mission</h3>
                <p className="mt-4 leading-relaxed text-slate-600">
                  To eliminate digital entry barriers for Pakistani entrepreneurs by providing a
                  completely free, reviewed business directory across its 183 city pages.
                </p>
              </article>

              <article className="rounded-3xl border border-slate-200 bg-[#F8FAFC] p-7 shadow-sm sm:p-9">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-2xl font-extrabold text-slate-900">Our Vision</h3>
                <p className="mt-4 leading-relaxed text-slate-600">
                  To be Pakistan’s trusted digital registry of local commerce, where any customer can
                  find an authentic phone number, address and direct WhatsApp line for any dukaan,
                  clinic, company or service in the country.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Core values */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              How We Work
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Core Values
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600">
              These principles shape how LocalePak is engineered, reviewed and improved — and how we
              communicate what the platform does and does not claim.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {CORE_VALUES.map((value) => {
              const Icon = value.icon
              return (
                <article
                  key={value.title}
                  className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-extrabold text-slate-900">{value.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{value.description}</p>
                </article>
              )
            })}
          </div>

          <p className="mt-8 text-sm leading-relaxed text-slate-500">
            Read more about our standards in the{' '}
            <Link href="/editorial-policy" className="font-bold text-emerald-700 hover:text-emerald-800">
              Editorial Policy
            </Link>{' '}
            and{' '}
            <Link href="/verification-policy" className="font-bold text-emerald-700 hover:text-emerald-800">
              Verification Policy
            </Link>
            .
          </p>
        </section>

        {/* Our story */}
        <section className="border-y border-slate-200 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[1.35fr_0.85fr]">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Our Story
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                How Muhammad Imran Built LocalePak
              </h2>

              <div className="mt-7 space-y-5 leading-relaxed text-slate-600">
                <p>
                  While working with dozens of local enterprises through Imran Digitals, Muhammad Imran
                  kept hearing the same problem. Businesses were serving their neighbourhoods every
                  day, but customers searching online often could not find a reliable page, phone
                  number or WhatsApp contact for them.
                </p>
                <p>
                  The issue was not a lack of quality businesses. It was a lack of accessible digital
                  infrastructure built for Pakistan’s local markets. Existing options could be
                  expensive, restrictive or simply not designed around how customers here search for
                  a shop, clinic, company or service.
                </p>
                <p>
                  LocalePak was founded in 2026 as the answer. It was engineered from the ground up
                  with modern web technologies and secure cloud infrastructure, organised around cities and categories, and built
                  with a review step before listings go public. Customers can discover a business and
                  reach it through direct phone and WhatsApp details; owners can create visibility
                  without paying to reveal their own contact information.
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    Founded
                  </p>
                  <p className="mt-2 font-extrabold text-slate-900">2026</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    Founder
                  </p>
                  <p className="mt-2 font-extrabold text-slate-900">Muhammad Imran</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    Listing Model
                  </p>
                  <p className="mt-2 font-extrabold text-slate-900">Free & Reviewed</p>
                </div>
              </div>
            </div>

            <figure className="rounded-3xl bg-[#0F172A] p-8 text-white shadow-sm sm:p-10">
              <Quote className="h-10 w-10 text-emerald-400" />
              <blockquote className="mt-6 text-2xl font-bold leading-snug tracking-tight">
                “What if every Pakistani dukandar, trader, and service provider could get listed online
                for free, forever, with zero hidden charges?”
              </blockquote>
              <figcaption className="mt-7 border-t border-slate-700 pt-6">
                <p className="font-bold text-white">Muhammad Imran</p>
                <p className="mt-1 text-sm text-slate-300">
                  The founding question behind LocalePak
                </p>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Where we are headed */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Looking Ahead
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Where We’re Headed
              </h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                These are future goals for LocalePak — the work we are building toward as the directory
                grows responsibly.
              </p>
            </div>
            <span className="w-fit rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700">
              Future Goals
            </span>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {FUTURE_GOALS.map((goal) => {
              const Icon = goal.icon
              return (
                <article
                  key={goal.title}
                  className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-extrabold leading-snug text-slate-900">
                    {goal.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{goal.description}</p>
                </article>
              )
            })}
          </div>
        </section>

        {/* People and functions behind LocalePak */}
        <section className="border-y border-slate-200 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                People & Expertise
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                The People Behind LocalePak
              </h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                LocalePak is powered by Muhammad Imran and the specialist functions at Imran Digitals
                that support its engineering, customer experience and local search strategy.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              <article className="rounded-3xl border border-emerald-200 bg-emerald-50/60 p-7 shadow-sm">
                <div
                  aria-hidden="true"
                  className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-500 text-lg font-extrabold text-white"
                >
                  MI
                </div>
                <h3 className="mt-5 text-lg font-extrabold text-slate-900">Muhammad Imran</h3>
                <p className="mt-1 text-sm font-bold text-emerald-700">
                  Founder, Owner & CEO
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Responsible for the platform vision, software architecture, web development, AI
                  integration and local SEO strategy.
                </p>
                <div className="mt-5 flex gap-4 border-t border-emerald-100 pt-4 text-sm font-bold">
                  <a
                    href={FOUNDER_PORTFOLIO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-900"
                  >
                    Portfolio
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={FOUNDER_LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-slate-700 hover:text-emerald-700"
                  >
                    LinkedIn
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </article>

              {TEAM_FUNCTIONS.map((team) => {
                const Icon = team.icon
                return (
                  <article
                    key={team.name}
                    className="rounded-3xl border border-slate-200 bg-[#F8FAFC] p-7 shadow-sm"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-lg font-extrabold leading-snug text-slate-900">
                      {team.name}
                    </h3>
                    <p className="mt-1 text-sm font-bold text-emerald-700">{team.role}</p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {team.description}
                    </p>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        {/* Founder FAQs */}
        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700">
              <HelpCircle className="h-4 w-4" />
              Founder FAQs
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Questions About LocalePak’s Founder
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-slate-600">
              Clear answers about who founded LocalePak, who leads it and how it relates to Imran
              Digitals.
            </p>
          </div>

          <div className="space-y-4">
            {ABOUT_FAQS.map((faq, index) => (
              <details
                key={faq.question}
                open={index === 0}
                className="group rounded-3xl border border-slate-200 bg-white shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 font-extrabold text-slate-900 marker:hidden [&::-webkit-details-marker]:hidden">
                  <span>{faq.question}</span>
                  <ChevronRight className="h-5 w-5 shrink-0 text-emerald-600 transition-transform group-open:rotate-90" />
                </summary>
                <p className="border-t border-slate-100 px-6 pb-6 pt-4 leading-relaxed text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#0F172A] px-6 py-14 text-center text-white shadow-sm sm:px-10 sm:py-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-emerald-600/20 blur-3xl"
            />
            <div className="relative mx-auto max-w-3xl">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Add Your Business to LocalePak
              </h2>
              <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-slate-300">
                Join Pakistani business owners getting 100% free online discoverability.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-emerald-500"
                >
                  Create Free Account
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/add-business"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-emerald-500"
                >
                  Add Your Business
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
