// Shrinks photos in the browser before upload. Students are often on mobile data,
// and a 6 MB phone photo becomes ~200-400 KB without any visible loss on a listing card.
export async function compressImage(file, { maxSize = 1600, quality = 0.82 } = {}) {
  if (!file.type.startsWith('image/')) throw new Error('INVALID_IMAGE')
  try {
    const bitmap = await createImageBitmap(file)
    const scale = Math.min(1, maxSize / Math.max(bitmap.width, bitmap.height))
    const w = Math.round(bitmap.width * scale)
    const h = Math.round(bitmap.height * scale)
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#fff' // PNG transparency -> white instead of black
    ctx.fillRect(0, 0, w, h)
    ctx.drawImage(bitmap, 0, 0, w, h)
    bitmap.close?.()
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality))
    return blob && blob.size < file.size ? blob : file
  } catch {
    return file // e.g. HEIC the browser can't decode: upload the original
  }
}
