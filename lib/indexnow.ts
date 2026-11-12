/**
 * IndexNow Integration Utility
 * Automates real-time URL submission to search engines (Bing, Yandex, IndexNow.org)
 */

export const INDEXNOW_API_KEY = process.env.INDEXNOW_API_KEY || '43b9d5f2de814afe8a49c2551466070d'
export const INDEXNOW_HOST = process.env.NEXT_PUBLIC_SITE_HOST || 'www.localepak.com'
export const INDEXNOW_KEY_LOCATION = `https://${INDEXNOW_HOST}/${INDEXNOW_API_KEY}.txt`

export async function submitToIndexNow(urls: string | string[]): Promise<{ success: boolean; status: number; message: string }> {
  const urlList = Array.isArray(urls) ? urls : [urls]
  
  if (urlList.length === 0) {
    return { success: true, status: 200, message: 'No URLs to submit.' }
  }

  // Format valid URLs with full protocol and hostname
  const formattedUrls = urlList.map(url => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url
    }
    const cleanPath = url.startsWith('/') ? url : `/${url}`
    return `https://${INDEXNOW_HOST}${cleanPath}`
  })

  const payload = {
    host: INDEXNOW_HOST,
    key: INDEXNOW_API_KEY,
    keyLocation: INDEXNOW_KEY_LOCATION,
    urlList: formattedUrls
  }

  const endpoints = [
    'https://api.indexnow.org/IndexNow',
    'https://www.bing.com/IndexNow'
  ]

  let lastStatus = 200
  let lastMessage = 'URLs submitted successfully'

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(payload),
      })

      lastStatus = response.status
      if (response.ok || response.status === 200 || response.status === 202) {
        console.log(`[IndexNow] Submitted ${formattedUrls.length} URLs to ${endpoint} (Status: ${response.status})`)
      } else {
        const text = await response.text().catch(() => '')
        console.warn(`[IndexNow] Submission to ${endpoint} returned status ${response.status}: ${text}`)
        lastMessage = `Response status ${response.status}: ${text}`
      }
    } catch (err: any) {
      console.error(`[IndexNow] Failed to submit to ${endpoint}:`, err)
      lastMessage = err?.message || 'Network error'
    }
  }

  return {
    success: lastStatus === 200 || lastStatus === 202,
    status: lastStatus,
    message: lastMessage
  }
}
