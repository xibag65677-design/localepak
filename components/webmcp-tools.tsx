'use client'

import { useEffect } from 'react'

/**
 * WebMCP in-page tool (homepage only).
 *
 * Registers a read-only `search_businesses` tool with the browser's
 * in-page agent surface when the browser implements it
 * (document.modelContext in the current W3C draft; navigator.modelContext
 * in earlier Chrome builds — feature-detected, both tried). The tool
 * navigates the open tab to LocalePak search results for the query.
 *
 * Honest limits: WebMCP is a W3C Community Group draft, not a shipped
 * standard. Chrome exposes it behind an origin trial (Chrome 149+);
 * without a trial token or the chrome://flags/#enable-webmcp-testing
 * flag, `modelContext` is undefined and this component does nothing —
 * no extra script is fetched, no error is thrown, and the page is
 * unchanged. The registration is ~1 KB, guarded in try/catch, and
 * never runs twice (registering the same name twice throws).
 */
type ModelContextLike = {
  registerTool: (tool: {
    name: string
    description: string
    inputSchema: Record<string, unknown>
    annotations?: Record<string, unknown>
    execute: (input: Record<string, unknown>) => Promise<{
      content: Array<{ type: 'text'; text: string }>
    }>
  }) => unknown
}

export default function WebMcpTools() {
  useEffect(() => {
    let cancelled = false
    const register = async () => {
      try {
        const w = window as unknown as {
          document?: { modelContext?: ModelContextLike }
          navigator?: { modelContext?: ModelContextLike }
        }
        const mc = w.document?.modelContext ?? w.navigator?.modelContext
        if (!mc || typeof mc.registerTool !== 'function') return
        await mc.registerTool({
          name: 'search_businesses',
          description:
            'Search LocalePak (Pakistan business directory) for businesses by keyword, city, and/or category, then open the matching search results page in this tab.',
          inputSchema: {
            type: 'object',
            properties: {
              q: { type: 'string', description: 'Keyword, e.g. "restaurants".' },
              city: { type: 'string', description: 'City name, e.g. "Lahore".' },
              category: { type: 'string', description: 'Category id, e.g. "restaurants".' },
            },
          },
          annotations: { readOnlyHint: true },
          execute: async (input) => {
            const params = new URLSearchParams()
            if (typeof input.q === 'string' && input.q.trim()) params.set('q', input.q.trim())
            if (typeof input.city === 'string' && input.city.trim())
              params.set('city', input.city.trim())
            if (typeof input.category === 'string' && input.category.trim())
              params.set('category', input.category.trim())
            const url = `/search${params.toString() ? `?${params.toString()}` : ''}`
            window.location.assign(url)
            return {
              content: [
                {
                  type: 'text',
                  text: `Opening LocalePak search results at ${url}.`,
                },
              ],
            }
          },
        })
      } catch {
        // Duplicate registration or an API shape change: the page must
        // never break because the experimental tool surface changed.
      }
    }
    if (!cancelled) void register()
    return () => {
      cancelled = true
    }
  }, [])

  return null
}
