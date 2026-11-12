/**
 * Bulk-submit the live LocalePak sitemap to IndexNow (Bing / Yandex / IndexNow.org).
 *
 * Usage (from the repo root, after a deploy, once the key file is live):
 *   node scripts/submit-indexnow-sitemap.mjs
 *
 * - Fetches https://www.localepak.com/sitemap.xml, extracts every <loc> URL
 *   (follows nested sitemap-index .xml entries one level deep).
 * - POSTs URLs in batches of at most 10,000 per request to both
 *   https://api.indexnow.org/indexnow and https://www.bing.com/indexnow.
 * - The key is read from lib/indexnow.ts (never hardcoded here).
 * - Exits non-zero if the sitemap cannot be fetched, no URLs are found,
 *   or any endpoint rejects a batch.
 * - NOTE: IndexNow speeds up Bing (and Yandex etc.) — it does NOT submit to
 *   Google. Google needs the sitemap in Search Console / request-indexing.
 * - Replaces the old scripts/submit-indexnow.mjs, which hardcoded a dead key
 *   and a stale hand-written URL list (incl. prayer-times pages) plus a
 *   database dump that no longer exists. Delete the old script on deploy day.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const HOST = 'www.localepak.com'
const SITEMAP_URL = `https://${HOST}/sitemap.xml`
const ENDPOINTS = ['https://api.indexnow.org/indexnow', 'https://www.bing.com/indexnow']
const MAX_BATCH = 10000

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

function readIndexNowKey() {
  const source = fs.readFileSync(path.join(repoRoot, 'lib', 'indexnow.ts'), 'utf8')
  const match = source.match(/INDEXNOW_API_KEY\s*=\s*['"]([0-9a-fA-F]{32})['"]/)
  if (!match) throw new Error('INDEXNOW_API_KEY not found in lib/indexnow.ts')
  return match[1]
}

function extractLocs(xml) {
  const urls = []
  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const url = m[1].trim()
    if (url) urls.push(url)
  }
  return urls
}

async function fetchText(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'LocalePak-IndexNow-Script/1.0' } })
  if (!res.ok) throw new Error(`GET ${url} -> HTTP ${res.status}`)
  return res.text()
}

async function collectSitemapUrls() {
  const xml = await fetchText(SITEMAP_URL)
  const locs = extractLocs(xml)
  const nested = locs.filter(u => u.toLowerCase().endsWith('.xml'))
  const pages = locs.filter(u => !u.toLowerCase().endsWith('.xml'))
  // Follow nested sitemap-index entries one level deep.
  for (const subUrl of nested) {
    try {
      const subXml = await fetchText(subUrl)
      pages.push(...extractLocs(subXml).filter(u => !u.toLowerCase().endsWith('.xml')))
    } catch (err) {
      console.error(`[IndexNow] Failed to fetch nested sitemap ${subUrl}: ${err.message}`)
      throw err
    }
  }
  // Only submit URLs on our own host, deduplicated.
  const seen = new Set()
  return pages.filter(u => {
    try {
      if (new URL(u).hostname !== HOST) return false
    } catch {
      return false
    }
    if (seen.has(u)) return false
    seen.add(u)
    return true
  })
}

async function submitBatch(batch, key, keyLocation) {
  const payload = { host: HOST, key, keyLocation, urlList: batch }
  let failed = false
  for (const endpoint of ENDPOINTS) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(payload),
      })
      const body = await res.text().catch(() => '')
      console.log(`[IndexNow] ${endpoint} -> HTTP ${res.status} (${batch.length} URLs)${body ? ` — ${body.slice(0, 200)}` : ''}`)
      if (!res.ok) failed = true
    } catch (err) {
      console.error(`[IndexNow] ${endpoint} -> FAILED: ${err.message}`)
      failed = true
    }
  }
  return !failed
}

async function main() {
  const key = readIndexNowKey()
  const keyLocation = `https://${HOST}/${key}.txt`
  console.log(`[IndexNow] Key: ${key} (from lib/indexnow.ts)`)
  console.log(`[IndexNow] Fetching sitemap: ${SITEMAP_URL}`)
  const urls = await collectSitemapUrls()
  if (urls.length === 0) throw new Error('No URLs found in the sitemap')
  console.log(`[IndexNow] Found ${urls.length} unique URLs on ${HOST}`)

  let allOk = true
  for (let i = 0; i < urls.length; i += MAX_BATCH) {
    const batch = urls.slice(i, i + MAX_BATCH)
    console.log(`[IndexNow] Submitting batch ${i / MAX_BATCH + 1} (${batch.length} URLs)...`)
    const ok = await submitBatch(batch, key, keyLocation)
    if (!ok) allOk = false
  }

  console.log(`[IndexNow] Done. Submitted ${urls.length} URLs in ${Math.ceil(urls.length / MAX_BATCH)} batch(es). ${allOk ? 'All endpoints OK.' : 'Some submissions FAILED.'}`)
  if (!allOk) process.exit(1)
}

main().catch(err => {
  console.error(`[IndexNow] ERROR: ${err.message}`)
  process.exit(1)
})
