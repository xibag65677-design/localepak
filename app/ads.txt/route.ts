import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-static'
export const revalidate = 604800

export async function GET() {
  const filePath = path.join(process.cwd(), 'public', 'ads.txt')
  let content = ''

  try {
    if (fs.existsSync(filePath)) {
      content = fs.readFileSync(filePath, 'utf8')
    }
  } catch (_) {}

  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  })
}
