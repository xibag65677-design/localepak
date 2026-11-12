import Link from 'next/link'

export interface BlogContentLink {
  label: string
  href: string
  external?: boolean
}

export interface BlogContentSection {
  heading: string
  paragraphs: string[]
  bullets?: string[]
  links?: BlogContentLink[]
  callout?: string
}

export interface BlogContentSource {
  label: string
  href: string
}

export interface BlogContentDocument {
  intro: string
  sections: BlogContentSection[]
  sources?: BlogContentSource[]
}

function ArticleLink({ link }: { link: BlogContentLink }) {
  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-bold underline">
        {link.label}
      </a>
    )
  }

  return <Link href={link.href} className="text-emerald-700 font-bold underline">{link.label}</Link>
}

export default function ArticleContent({ content }: { content: BlogContentDocument }) {
  return (
    <>
      <p className="text-lg font-medium text-slate-800 leading-relaxed bg-gradient-to-r from-emerald-50 to-indigo-50/60 p-6 rounded-2xl border border-emerald-100/80 shadow-xs">
        {content.intro}
      </p>

      {content.sections.map((section) => (
        <section key={section.heading} className="space-y-4 pt-6 border-t border-slate-100">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            {section.heading}
          </h2>
          {section.paragraphs.map((paragraph, index) => (
            <p key={`${section.heading}-paragraph-${index}`}>{paragraph}</p>
          ))}
          {section.callout && (
            <div className="p-5 bg-amber-50 border border-amber-200 rounded-2xl text-sm text-amber-950">
              <strong>Practical note: </strong>{section.callout}
            </div>
          )}
          {section.bullets && (
            <ul className="space-y-2 text-sm text-slate-700 pl-5 border-l-4 border-emerald-500">
              {section.bullets.map((bullet) => <li key={bullet}>• {bullet}</li>)}
            </ul>
          )}
          {section.links && section.links.length > 0 && (
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {section.links.map((link) => <ArticleLink key={link.href} link={link} />)}
            </div>
          )}
        </section>
      ))}

      {content.sources && content.sources.length > 0 && (
        <section className="space-y-4 pt-6 border-t border-slate-100">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">Sources and further reading</h2>
          <p className="text-sm text-slate-600">The sources below support the factual and methodological parts of this guide. Readers should check the linked pages for the latest updates.</p>
          <ol className="space-y-2 text-sm text-slate-700 list-decimal pl-5">
            {content.sources.map((source) => (
              <li key={source.href}><a href={source.href} target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline">{source.label}</a></li>
            ))}
          </ol>
        </section>
      )}
    </>
  )
}
