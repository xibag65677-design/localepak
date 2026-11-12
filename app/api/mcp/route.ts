// ============================================================
// LocalePak — MCP server (Streamable HTTP, stateless)
// ------------------------------------------------------------
// POST /api/mcp — Model Context Protocol over Streamable HTTP,
// implemented with the official @modelcontextprotocol/sdk
// (WebStandardStreamableHTTPServerTransport, stateless mode, JSON
// responses). Same read-only data as /api/v1/*: public listing
// fields only, 20 results per tool call, 60 requests/minute/IP.
// No auth: reads are free and need no key (see /auth.md).
// Writes do not exist — listing owners use the website itself.
// ============================================================

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js'
import { z } from 'zod'
import {
  apiErrorResponse,
  checkApiRateLimit,
  filterApiBusinesses,
  getApiBusinesses,
  getApiCategories,
  getApiCities,
  paginate,
} from '@/lib/api-v1'

export const dynamic = 'force-dynamic'

const SEARCH_INPUT = {
  q: z.string().optional().describe('Keyword to search in business name, description, category, or city.'),
  city: z.string().optional().describe('City name or slug, e.g. "Lahore" or "lahore".'),
  category: z.string().optional().describe('Category id, name, or slug, e.g. "restaurants".'),
  page: z.number().int().min(1).optional().describe('Page number, starting at 1.'),
  per_page: z.number().int().min(1).max(20).optional().describe('Results per page, max 20.'),
}

function createServer(): McpServer {
  const server = new McpServer(
    { name: 'localepak-mcp', version: '1.0.0' },
    {
      capabilities: { tools: {} },
      instructions:
        'LocalePak is Pakistan\'s business directory (183 cities, 24 categories). These tools read public listings only — name, slug, category, city, phone, description, featured flag, the business\'s own public website link when supplied, and the public listing URL. Owner emails, owner IDs, and payment data are never exposed. Reads are free with no key; at most 20 results per call.',
    }
  )

  server.registerTool(
    'search_businesses',
    {
      title: 'Search businesses',
      description:
        'Search public LocalePak business listings by keyword, city, and/or category. Returns at most 20 listings per call, with pagination info.',
      inputSchema: SEARCH_INPUT,
      annotations: { readOnlyHint: true, openWorldHint: true },
    },
    async ({ q, city, category, page, per_page }) => {
      const all = await getApiBusinesses()
      const filtered = filterApiBusinesses(all, { q, city, category })
      const { data, pagination } = paginate(filtered, page ?? 1, per_page ?? 20)
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({ data, pagination }, null, 2),
          },
        ],
      }
    }
  )

  server.registerTool(
    'get_business',
    {
      title: 'Get one business',
      description:
        'Get a single public LocalePak business listing by its slug (the slug in its URL, e.g. "nayatel" for https://www.localepak.com/business/nayatel/).',
      inputSchema: {
        slug: z.string().describe('The business slug from its public listing URL.'),
      },
      annotations: { readOnlyHint: true, openWorldHint: true },
    },
    async ({ slug }) => {
      const all = await getApiBusinesses()
      const business = all.find((b) => b.slug === slug)
      if (!business) {
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({
                error: 'not_found',
                message: `No public business found with slug "${slug}".`,
                hint: 'Search by keyword with search_businesses to find the right slug.',
              }),
            },
          ],
          isError: true,
        }
      }
      return {
        content: [{ type: 'text' as const, text: JSON.stringify(business, null, 2) }],
      }
    }
  )

  server.registerTool(
    'list_categories',
    {
      title: 'List categories',
      description:
        'List the 24 LocalePak business categories (id, name, description, public category URL). Optionally filter by keyword.',
      inputSchema: {
        q: z.string().optional().describe('Keyword to filter categories by.'),
      },
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async ({ q }) => ({
      content: [
        { type: 'text' as const, text: JSON.stringify(getApiCategories(q), null, 2) },
      ],
    })
  )

  server.registerTool(
    'list_cities',
    {
      title: 'List cities',
      description:
        'List the 183 Pakistani cities LocalePak covers (name, slug, public city URL). Optionally filter by keyword; at most 20 per call.',
      inputSchema: {
        q: z.string().optional().describe('Keyword to filter cities by.'),
        page: z.number().int().min(1).optional().describe('Page number, starting at 1.'),
        per_page: z.number().int().min(1).max(20).optional().describe('Results per page, max 20.'),
      },
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async ({ q, page, per_page }) => {
      const { data, pagination } = paginate(getApiCities(q), page ?? 1, per_page ?? 20)
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({ data, pagination }, null, 2),
          },
        ],
      }
    }
  )

  return server
}

export async function POST(request: Request) {
  const { exceeded } = checkApiRateLimit(request)
  if (exceeded) return exceeded
  try {
    const server = createServer()
    const transport = new WebStandardStreamableHTTPServerTransport({
      sessionIdGenerator: undefined, // stateless: no sessions to track
      enableJsonResponse: true,
    })
    await server.connect(transport)
    try {
      return await transport.handleRequest(request)
    } finally {
      await server.close()
    }
  } catch (error) {
    console.error('MCP request failed:', error)
    return apiErrorResponse(
      500,
      'internal_error',
      'The MCP endpoint could not process this request.',
      'Retry the request. If it keeps failing, use the plain JSON API at https://www.localepak.com/api/v1/businesses instead — same data, no MCP client needed.'
    )
  }
}

export async function GET() {
  return apiErrorResponse(
    405,
    'method_not_allowed',
    'This MCP endpoint accepts POST only (JSON-RPC over Streamable HTTP).',
    'Send a JSON-RPC request (initialize, tools/list, tools/call) with POST to /api/mcp. See https://www.localepak.com/docs for the tool list.'
  )
}

export async function DELETE() {
  return apiErrorResponse(
    405,
    'method_not_allowed',
    'This MCP endpoint is stateless, so there is no session to terminate.',
    'Send JSON-RPC requests with POST to /api/mcp. No DELETE is needed.'
  )
}
