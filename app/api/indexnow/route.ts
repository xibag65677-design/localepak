import { NextRequest, NextResponse } from 'next/server'
import { submitToIndexNow, INDEXNOW_API_KEY } from '@/lib/indexnow'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { urls, apiKey } = body

    // Validate request — a missing or wrong key is rejected (no silent bypass).
    if (!apiKey || (apiKey !== INDEXNOW_API_KEY && apiKey !== process.env.ADMIN_SECRET_KEY)) {
      return NextResponse.json({ error: 'Unauthorized API key' }, { status: 401 })
    }

    if (!urls || (Array.isArray(urls) && urls.length === 0)) {
      return NextResponse.json({ error: 'No URLs provided for IndexNow submission' }, { status: 400 })
    }

    const result = await submitToIndexNow(urls)
    return NextResponse.json(result, { status: result.success ? 200 : result.status || 500 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal error' }, { status: 500 })
  }
}
