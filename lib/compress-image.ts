/**
 * Browser-side image compression for payment proofs.
 *
 * Firebase Storage is unavailable on the free plan, so proofs are stored
 * directly in Firestore as JPEG data URLs. A Firestore document caps at
 * 1 MiB, so the compressed image must stay well under that: this helper
 * tries decreasing sizes and qualities until the data URL fits inside
 * the budget (default 950_000 chars, leaving room for the other fields
 * of the proof document). Transparent PNGs get a white background,
 * because JPEG has no alpha channel. Modern browsers already apply a
 * photo's EXIF orientation when drawing it to a canvas.
 */
export async function compressImageToDataUrl(
  file: File,
  maxDataUrlChars = 950_000,
): Promise<string> {
  if (!file.type.startsWith('image/')) {
    throw new Error('The proof must be an image file.')
  }

  const img = await loadImage(file)
  if (!img.naturalWidth || !img.naturalHeight) {
    throw new Error('Could not read the image file.')
  }

  // Longest side capped at 1920px (also keeps canvases inside mobile limits).
  const MAX_SIDE = 1920
  const scaleToFit = Math.min(1, MAX_SIDE / Math.max(img.naturalWidth, img.naturalHeight))
  const baseWidth = Math.round(img.naturalWidth * scaleToFit)
  const baseHeight = Math.round(img.naturalHeight * scaleToFit)

  const scales = [1, 0.75, 0.5, 0.35]
  const qualities = [0.85, 0.7, 0.55, 0.4]

  for (const scale of scales) {
    const width = Math.max(1, Math.round(baseWidth * scale))
    const height = Math.max(1, Math.round(baseHeight * scale))
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (!ctx) continue
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)
    ctx.drawImage(img, 0, 0, width, height)
    for (const quality of qualities) {
      const dataUrl = canvas.toDataURL('image/jpeg', quality)
      if (dataUrl.length <= maxDataUrlChars) {
        return dataUrl
      }
    }
  }

  throw new Error(
    'Could not compress the image below the size limit. Please use a smaller or clearer screenshot.',
  )
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img)
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Could not read the image file.'))
    }
    img.src = url
  })
}
