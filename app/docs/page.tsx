import type { Metadata } from 'next'
import Link from 'next/link'
import {
  BookOpen,
  Building2,
  ChevronRight,
  Code2,
  FileText,
  Globe,
  KeyRound,
  Mail,
  MapPin,
  Newspaper,
  Search,
  ShieldCheck,
  Tag,
  TriangleAlert,
} from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

const PAGE_URL = 'https://www.localepak.com/docs'

// Static page: agent documentation changes rarely, so the page stays
// cached and cheap to serve between deploys.
export const revalidate = 2592000

export function generateMetadata(): Metadata {
  const title = 'Agent Documentation – Docs for AI Agents & Developers | LocalePak'
  const description =
    'How AI agents and developers can read LocalePak: public pages, llms.txt, authentication, pricing, and example requests. No API key needed for public content.'

  return {
    title,
    description,
    alternates: {
      canonical: PAGE_URL,
    },
    openGraph: {
      title,
      description,
      url: PAGE_URL,
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

const RESOURCES = [
  {
    name: 'llms.txt',
    href: '/llms.txt',
    format: 'text/markdown',
    what: 'Machine-readable overview: what LocalePak is, coverage, and key pages.',
  },
  {
    name: 'auth.md',
    href: '/auth.md',
    format: 'text/markdown',
    what: 'How agents obtain credentials: none needed for public content; website sign-up for listing owners.',
  },
  {
    name: 'pricing.md',
    href: '/pricing.md',
    format: 'text/markdown',
    what: 'Listing tiers in plain markdown: Basic PKR 99, Premium PKR 199, Featured PKR 299, one-time.',
  },
  {
    name: 'index.md',
    href: '/index.md',
    format: 'text/markdown',
    what: 'Markdown twin of the homepage, linked from the homepage as an alternate.',
  },
  {
    name: 'Public API (OpenAPI)',
    href: '/openapi.json',
    format: 'application/json',
    what: 'OpenAPI 3.1 spec for the free read-only JSON API: search businesses, get one business, list categories and cities. No key, max 20 per page, 60 req/min/IP.',
  },
  {
    name: 'MCP server',
    href: '/api/mcp',
    format: 'application/json',
    what: 'Streamable HTTP MCP endpoint (POST, JSON-RPC 2.0): tools search_businesses, get_business, list_categories, list_cities. Read-only, no authentication.',
  },
  {
    name: 'MCP server card',
    href: '/.well-known/mcp/server-card.json',
    format: 'application/json',
    what: 'Server card for the MCP server: display name, logo, description, endpoint, and tool list.',
  },
  {
    name: 'Authorization-server metadata',
    href: '/.well-known/oauth-authorization-server',
    format: 'application/json',
    what: 'RFC 8414 metadata stating honestly that LocalePak is not a full OAuth server: no authorization or token endpoint, no client registration.',
  },
  {
    name: 'Protected-resource metadata',
    href: '/.well-known/oauth-protected-resource',
    format: 'application/json',
    what: 'RFC 9728 metadata for the public API resource, naming the real scopes listings:read (public) and listings:write (website session only).',
  },
  {
    name: 'Agent Skills index',
    href: '/.well-known/agent-skills/index.json',
    format: 'application/json',
    what: 'Capabilities an agent can use: search businesses, browse cities and categories, read blog guides.',
  },
  {
    name: 'Agent card',
    href: '/.well-known/agent-card.json',
    format: 'application/json',
    what: 'A2A agent card: name, description, capabilities, and support contact.',
  },
  {
    name: 'Agentic Resource Discovery',
    href: '/.well-known/ard.json',
    format: 'application/json',
    what: 'Catalog of the agent resources above, with domain-anchored identifiers.',
  },
  {
    name: 'API catalog',
    href: '/.well-known/api-catalog',
    format: 'application/linkset+json',
    what: 'RFC 9727 linkset pointing at these docs and the sitemap.',
  },
  {
    name: 'Sitemap',
    href: '/sitemap.xml',
    format: 'application/xml',
    what: 'XML sitemap of the indexable public pages.',
  },
]

const CAPABILITIES = [
  {
    icon: Search,
    title: 'Search businesses',
    text: 'Find businesses by keyword, city, or category from the public search and listing pages — or via the JSON API / MCP tools.',
  },
  {
    icon: Code2,
    title: 'Read via the JSON API',
    text: 'Free read-only API: GET /api/v1/businesses, /api/v1/businesses/{slug}, /api/v1/categories, /api/v1/cities. No key, max 20 per page, 60 req/min/IP.',
  },
  {
    icon: MapPin,
    title: 'Browse cities',
    text: '183 cities across Pakistan, each with its own page and city-by-category listings.',
  },
  {
    icon: Building2,
    title: 'Browse categories',
    text: '24 business categories, from restaurants and real estate to healthcare and home services.',
  },
  {
    icon: Newspaper,
    title: 'Read blog guides',
    text: 'Practical guides for Pakistani business owners, including local SEO and listing guidance.',
  },
]

export default function DocsPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${PAGE_URL}/#webpage`,
        url: PAGE_URL,
        name: 'Agent Documentation – Docs for AI Agents & Developers',
        description:
          'How AI agents and developers can read LocalePak: public pages, llms.txt, authentication, pricing, and example requests.',
        isPartOf: { '@id': 'https://www.localepak.com/#website' },
        about: {
          '@type': 'Organization',
          name: 'LocalePak',
          url: 'https://www.localepak.com/',
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${PAGE_URL}/#breadcrumb`,
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
            name: 'Agent Documentation',
            item: PAGE_URL,
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
                  Agent Documentation
                </li>
              </ol>
            </nav>

            <div className="max-w-4xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 text-emerald-200 px-4 py-1.5 text-xs font-bold uppercase tracking-wider">
                <BookOpen className="h-4 w-4" />
                For AI agents &amp; developers
              </span>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Agent Documentation
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/90 sm:text-lg">
                LocalePak is Pakistan&apos;s business directory — 183 cities,
                24 categories. This page explains how an AI agent or developer
                can read the site: the free read-only JSON API, the MCP
                server, the public pages, what credentials are (not) needed,
                and what does not exist yet.
              </p>
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            What you can do
          </h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            Everything below reads public pages. No account, API key, or
            token is needed.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CAPABILITIES.map((cap) => (
              <article
                key={cap.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600/10 text-emerald-600">
                  <cap.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-bold">{cap.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {cap.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Agent resources */}
        <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Agent resources
          </h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            Machine-readable files that describe the site. Fetch them
            directly — they are plain static files.
          </p>

          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <ul className="divide-y divide-slate-200">
              {RESOURCES.map((res) => (
                <li key={res.name} className="px-6 py-5">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <a
                      href={res.href}
                      className="font-mono text-sm font-bold text-emerald-600 hover:text-emerald-700"
                    >
                      {res.href}
                    </a>
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                      {res.format}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                    <span className="font-semibold text-slate-900">
                      {res.name}:
                    </span>{' '}
                    {res.what}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Authentication */}
        <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600/10 text-emerald-600">
                <KeyRound className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight">
                Authentication
              </h2>
            </div>
            <p className="mt-4 leading-relaxed text-slate-600">
              Reading public content needs <strong className="text-slate-900">no credentials at all</strong> — no
              API key, no token, no OAuth. That covers the public pages, the
              JSON API (<code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs">/api/v1/*</code>), and
              the MCP server (<code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs">/api/mcp</code>).
              Listing owners who want to create or manage a listing sign up
              on the website itself at{' '}
              <Link href="/register" className="font-semibold text-emerald-600 hover:text-emerald-700">
                /register
              </Link>
              . There is no API key or programmatic token to obtain. The full
              walkthrough lives in{' '}
              <a href="/auth.md" className="font-semibold text-emerald-600 hover:text-emerald-700">
                auth.md
              </a>
              . LocalePak is not a full OAuth server: there is no
              authorization endpoint, token endpoint, or third-party client
              registration — the metadata files say so plainly (see the
              resource list above).
            </p>
          </div>
        </section>

        {/* Example requests */}
        <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600/10 text-emerald-600">
              <Code2 className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight">
              Example requests
            </h2>
          </div>
          <p className="mt-4 max-w-3xl leading-relaxed text-slate-600">
            The read-only JSON API is the fastest way to read listings as
            data. It is free, needs no key, returns at most 20 results per
            page, and allows 60 requests per minute per IP. The full spec
            is <a href="/openapi.json" className="font-semibold text-emerald-600 hover:text-emerald-700">/openapi.json</a>.
            Only fields already public on the listing pages are returned —
            never owner emails, owner IDs, or payment data.
          </p>
          <pre className="mt-6 overflow-x-auto rounded-2xl bg-[#0F172A] p-5 text-sm leading-relaxed text-slate-100">
            <code>
{`# Site overview (machine-readable)
curl https://www.localepak.com/llms.txt

# Search businesses via the JSON API (free, no key)
curl "https://www.localepak.com/api/v1/businesses?q=restaurants&city=Lahore"
curl "https://www.localepak.com/api/v1/businesses?category=technology&page=2"

# One business by slug
curl https://www.localepak.com/api/v1/businesses/nayatel

# Categories and cities
curl https://www.localepak.com/api/v1/categories
curl "https://www.localepak.com/api/v1/cities?q=lahore"

# MCP server: list tools, then call one (JSON-RPC 2.0 over POST)
curl -X POST https://www.localepak.com/api/mcp \\
  -H 'Content-Type: application/json' \\
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
curl -X POST https://www.localepak.com/api/mcp \\
  -H 'Content-Type: application/json' \\
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"search_businesses","arguments":{"q":"restaurants","city":"Lahore"}}}'

# Public pages (same content as HTML)
curl https://www.localepak.com/
curl https://www.localepak.com/businesses
curl https://www.localepak.com/city/lahore/
curl https://www.localepak.com/category/restaurants/

# A single business profile
curl https://www.localepak.com/business/<slug>/

# Blog guides
curl https://www.localepak.com/blog
curl https://www.localepak.com/blog/<slug>/

# Agent resources
curl https://www.localepak.com/.well-known/agent-card.json
curl https://www.localepak.com/.well-known/ard.json
curl https://www.localepak.com/openapi.json
curl https://www.localepak.com/sitemap.xml`}
            </code>
          </pre>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600">
            City and category slugs use lowercase hyphenated names, for
            example <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs">lahore</code> and{' '}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs">restaurants</code>.
            Business slugs are the public slugs shown in listing URLs.
            On the homepage, browsers that support WebMCP (Chrome origin
            trial) also get an in-page <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs">search_businesses</code> tool
            that opens the matching /search results in the same tab — no
            extra download on browsers without it.
          </p>
        </section>

        {/* Sandbox / trying it out */}
        <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600/10 text-emerald-600">
                <Globe className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight">
                Try it without signing up
              </h2>
            </div>
            <p className="mt-4 leading-relaxed text-slate-600">
              There is no separate sandbox and no sandbox account to create:
              the read-only API and MCP server are free with no key and no
              signup, so the live endpoints above <em>are</em> the trial.
              Run the curl examples against the production URLs and you get
              real public data back. Writes are the only part that needs an
              account — and writes happen on the website itself, in a
              signed-in browser session, never through the API. If you are
              building an integration, start with{' '}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs">GET /api/v1/businesses?q=&lt;keyword&gt;</code>{' '}
              and keep to the limits: 20 results per page, 60 requests per
              minute per IP.
            </p>
          </div>
        </section>

        {/* What does not exist yet */}
        <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                <TriangleAlert className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight">
                What does not exist yet
              </h2>
            </div>
            <p className="mt-4 leading-relaxed text-slate-700">
              The JSON API and MCP server above <strong>do</strong> exist
              now. What still does not exist: write endpoints on the API
              (listings are added on the website only), an OAuth flow or
              API tokens, a Wikipedia/Wikidata article, a ChatGPT app
              listing, payment protocols (x402, UCP, AP2, ACP), SDK
              packages or a CLI, and an NLWeb /ask endpoint. Do not assume
              endpoints exist beyond the ones listed on this page, and do
              not send credentials to any third party claiming to offer
              LocalePak API access.
            </p>
          </div>
        </section>

        {/* Pricing + contact */}
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600/10 text-emerald-700">
                  <Tag className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-extrabold tracking-tight">
                  Pricing
                </h2>
              </div>
              <p className="mt-4 leading-relaxed text-slate-600">
                Listing a business costs <strong className="text-slate-900">PKR 99 (Basic)</strong>,{' '}
                <strong className="text-slate-900">PKR 199 (Premium)</strong>, or{' '}
                <strong className="text-slate-900">PKR 299 (Featured)</strong> — one-time
                per listing. Browsing and reading are free, and so is the
                read-only API and MCP server (60 requests per minute per IP,
                20 results per page). Full details in{' '}
                <a href="/pricing.md" className="font-semibold text-emerald-600 hover:text-emerald-700">
                  pricing.md
                </a>
                .
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600/10 text-emerald-700">
                  <Mail className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-extrabold tracking-tight">
                  Contact
                </h2>
              </div>
              <p className="mt-4 leading-relaxed text-slate-600">
                Support: <a href="mailto:support@localepak.com" className="font-semibold text-emerald-600 hover:text-emerald-700">support@localepak.com</a>
                <br />
                Helpline: +92 334 5636230
                <br />
                Office: Office 303, Evacuee Trust Complex, F-5/1, Islamabad
                44000, Pakistan
              </p>
              <p className="mt-3 text-sm text-slate-500">
                <ShieldCheck className="mr-1 inline h-4 w-4" />
                Do not scrape the site in bulk. Cite the listing page URL
                you used.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/llms.txt"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white transition-colors"
            >
              <FileText className="h-4 w-4" />
              Read llms.txt
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-900 transition-colors hover:bg-slate-50"
            >
              <Globe className="h-4 w-4" />
              Visit LocalePak
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
