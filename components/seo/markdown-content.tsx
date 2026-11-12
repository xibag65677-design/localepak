import React from 'react'

// Minimal renderer for the generated guide content in lib/seo-content.ts
// (supports ## / ### headings, "- " bullet lists and plain paragraphs).
export default function MarkdownContent({ content }: { content: string }) {
  const blocks = content.split(/\n{2,}/).map(b => b.trim()).filter(Boolean)

  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        if (block.startsWith('### ')) {
          return (
            <h3 key={i} className="text-lg font-bold text-slate-900 pt-2">
              {block.replace(/^###\s+/, '')}
            </h3>
          )
        }
        if (block.startsWith('## ')) {
          return (
            <h2 key={i} className="text-2xl font-extrabold text-slate-900 tracking-tight pt-2">
              {block.replace(/^##\s+/, '')}
            </h2>
          )
        }
        if (block.startsWith('- ')) {
          const items = block.split('\n').map(l => l.replace(/^-\s+/, '').trim()).filter(Boolean)
          return (
            <ul key={i} className="list-disc pl-6 space-y-1.5 text-slate-600 text-sm sm:text-base leading-relaxed">
              {items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          )
        }
        return (
          <p key={i} className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {block}
          </p>
        )
      })}
    </div>
  )
}
