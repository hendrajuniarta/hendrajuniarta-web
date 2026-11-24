export interface PortraitSourceBounds {
  sx: number
  sy: number
  sw: number
  sh: number
}

export interface PortraitDrawOptions {
  bounds?: PortraitSourceBounds
  verticalBias?: number
}

function isStudioPixel(r: number, g: number, b: number): boolean {
  return r > 18 || g > 14 || b > 10
}

export function detectPortraitBounds(
  img: HTMLImageElement,
): PortraitSourceBounds | undefined {
  const w = img.naturalWidth
  const h = img.naturalHeight
  if (!w || !h) return undefined

  const probe = document.createElement('canvas')
  probe.width = w
  probe.height = h
  const ctx = probe.getContext('2d', { willReadFrequently: true })
  if (!ctx) return undefined

  ctx.drawImage(img, 0, 0)

  const sampleRows = [
    Math.floor(h * 0.15),
    Math.floor(h * 0.5),
    Math.floor(h * 0.8),
  ]

  let minX = w
  let maxX = -1

  for (const y of sampleRows) {
    const rowData = ctx.getImageData(0, y, w, 1).data
    for (let x = 0; x < w; x++) {
      const i = x * 4
      if (isStudioPixel(rowData[i], rowData[i + 1], rowData[i + 2])) {
        if (x < minX) minX = x
        if (x > maxX) maxX = x
      }
    }
  }

  if (maxX <= minX) return undefined

  const rawWidth = maxX - minX + 1
  const sampleCols = [
    Math.min(w - 1, minX + Math.round(rawWidth * 0.08)),
    Math.min(w - 1, minX + Math.round(rawWidth * 0.5)),
    Math.max(0, maxX - Math.round(rawWidth * 0.08)),
  ]

  const rowHasStudioContent = (y: number): boolean => {
    const rowData = ctx.getImageData(0, y, w, 1).data
    return sampleCols.some((x) => {
      const i = x * 4
      return isStudioPixel(rowData[i], rowData[i + 1], rowData[i + 2])
    })
  }

  let minY = 0
  while (minY < h - 1 && !rowHasStudioContent(minY)) {
    minY += 1
  }

  let maxY = h - 1
  while (maxY > minY && !rowHasStudioContent(maxY)) {
    maxY -= 1
  }

  const insetX = Math.max(4, Math.round(rawWidth * 0.01))
  const rawHeight = maxY - minY + 1
  const insetY = Math.max(2, Math.round(rawHeight * 0.005))

  const sx = Math.min(w - 1, minX + insetX)
  const sy = Math.min(h - 1, minY + insetY)
  const sw = Math.max(1, rawWidth - insetX * 2)
  const sh = Math.max(1, rawHeight - insetY * 2)

  return { sx, sy, sw, sh }
}

export function drawPortraitFrame(
  canvas: HTMLCanvasElement,
  img: HTMLImageElement,
  options: PortraitDrawOptions = {},
): void {
  if (!img.complete || img.naturalWidth === 0) return

  const rect = canvas.getBoundingClientRect()
  if (rect.width === 0 || rect.height === 0) return

  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const backingWidth = Math.round(rect.width * dpr)
  const backingHeight = Math.round(rect.height * dpr)

  if (canvas.width !== backingWidth || canvas.height !== backingHeight) {
    canvas.width = backingWidth
    canvas.height = backingHeight
  }

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
  ctx.clearRect(0, 0, rect.width, rect.height)

  const defaultTrimX = img.naturalWidth * 0.015
  const sx = options.bounds?.sx ?? defaultTrimX
  const sy = options.bounds?.sy ?? 0
  const sw = options.bounds?.sw ?? img.naturalWidth - defaultTrimX * 2
  const sh = options.bounds?.sh ?? img.naturalHeight

  const verticalBias = options.verticalBias ?? 0.15
  const imgRatio = sw / sh
  const canvasRatio = rect.width / rect.height

  let drawWidth = rect.width
  let drawHeight = rect.height
  let offsetX = 0
  let offsetY = 0

  if (canvasRatio > imgRatio) {
    drawWidth = rect.width
    drawHeight = rect.width / imgRatio
    offsetY = (rect.height - drawHeight) * verticalBias
  } else {
    drawHeight = rect.height
    drawWidth = rect.height * imgRatio
    offsetX = (rect.width - drawWidth) / 2
  }

  ctx.drawImage(img, sx, sy, sw, sh, offsetX, offsetY, drawWidth, drawHeight)
}
