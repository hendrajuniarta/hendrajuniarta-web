import { useEffect, useState } from 'react'

const TOTAL_FRAMES = 72

const frameUrls = Array.from({ length: TOTAL_FRAMES }, (_, index) => {
  const frameNumber = String(index + 1).padStart(3, '0')
  return `/frames/frames/frame_${frameNumber}.webp`
})

export interface ImageSequenceState {
  images: HTMLImageElement[]
  progress: number
  isLoaded: boolean
  totalFrames: number
}

export function useImageSequence(): ImageSequenceState {
  const [images, setImages] = useState<HTMLImageElement[]>([])
  const [progress, setProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const total = frameUrls.length
    if (total === 0) return

    let isCancelled = false
    const settledIndices = new Set<number>()
    const preloadedImages: HTMLImageElement[] = new Array(total)

    const markSettled = (index: number) => {
      if (isCancelled || settledIndices.has(index)) return
      settledIndices.add(index)

      const nextProgress = Math.round((settledIndices.size / total) * 100)
      setProgress(nextProgress)

      if (settledIndices.size === total) {
        const validImages = preloadedImages.filter(
          (img) => img && img.naturalWidth > 0,
        )
        setImages(validImages)
        setIsLoaded(true)
      }
    }

    frameUrls.forEach((src, index) => {
      const img = new Image()
      img.decoding = 'async'
      img.onload = () => markSettled(index)
      img.onerror = () => markSettled(index)
      img.src = src
      preloadedImages[index] = img

      if (img.complete && img.naturalWidth > 0) {
        markSettled(index)
      }
    })

    return () => {
      isCancelled = true
    }
  }, [])

  return {
    images,
    progress,
    isLoaded,
    totalFrames: frameUrls.length,
  }
}
