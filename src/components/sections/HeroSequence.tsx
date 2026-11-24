import { useEffect, useRef } from 'react'
import { AboutSection } from '@/components/sections/AboutSection'
import { useLanguage } from '@/context/LanguageContext'
import { siteConfig } from '@/data/siteConfig'
import { useImageSequence } from '@/hooks/useImageSequence'
import {
  detectPortraitBounds,
  drawPortraitFrame,
  type PortraitSourceBounds,
} from '@/lib/canvasPortrait'

const LERP_FACTOR = 0.15

interface SlotRect {
  x: number
  y: number
  width: number
  height: number
}

export function HeroSequence() {
  const stageRef = useRef<HTMLDivElement>(null)
  const heroSlotRef = useRef<HTMLDivElement>(null)
  const aboutSlotRef = useRef<HTMLDivElement>(null)
  const portraitLayerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const slotsRef = useRef<{ hero: SlotRect; about: SlotRect; landingY: number } | null>(
    null,
  )
  const targetProgressRef = useRef(0)
  const currentProgressRef = useRef(0)
  const lastDrawnFrameRef = useRef(-1)
  const sourceBoundsRef = useRef<PortraitSourceBounds | undefined>(undefined)

  const { images, progress, isLoaded, totalFrames } = useImageSequence()
  const { lang } = useLanguage()

  useEffect(() => {
    if (!isLoaded || images.length === 0) return

    sourceBoundsRef.current = detectPortraitBounds(images[0])

    const measureSlots = () => {
      const stage = stageRef.current
      const heroSlot = heroSlotRef.current
      const aboutSlot = aboutSlotRef.current
      if (!stage || !heroSlot || !aboutSlot) return

      const stageRect = stage.getBoundingClientRect()
      const heroRect = heroSlot.getBoundingClientRect()
      const aboutRect = aboutSlot.getBoundingClientRect()

      const hero: SlotRect = {
        x: heroRect.left - stageRect.left,
        y: heroRect.top - stageRect.top,
        width: heroRect.width,
        height: heroRect.height,
      }

      const about: SlotRect = {
        x: aboutRect.left - stageRect.left,
        y: aboutRect.top - stageRect.top,
        width: aboutRect.width,
        height: aboutRect.height,
      }

      const targetScreenTop =
        window.innerWidth >= 1024
          ? window.innerHeight * 0.14
          : window.innerHeight * 0.2
      const landingY = Math.max(120, about.y - targetScreenTop)

      slotsRef.current = { hero, about, landingY }

      if (portraitLayerRef.current) {
        portraitLayerRef.current.style.width = `${hero.width}px`
        portraitLayerRef.current.style.height = `${hero.height}px`
      }
    }

    const updateTargetProgress = () => {
      const slots = slotsRef.current
      if (!slots) return
      const clamped = Math.min(1, Math.max(0, window.scrollY / slots.landingY))
      targetProgressRef.current = clamped
    }

    const applyTransform = (t: number) => {
      const slots = slotsRef.current
      const layer = portraitLayerRef.current
      if (!slots || !layer) return

      const { hero, about } = slots
      const targetScale = hero.width > 0 ? about.width / hero.width : 1
      const horizontalEase = 1 - Math.pow(1 - t, 1.85)
      const scale = 1 + (targetScale - 1) * horizontalEase
      const x = hero.x + (about.x - hero.x) * horizontalEase
      const y = hero.y + (about.y - hero.y) * t

      layer.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`
    }

    measureSlots()
    updateTargetProgress()
    currentProgressRef.current = targetProgressRef.current
    applyTransform(currentProgressRef.current)

    lastDrawnFrameRef.current = -1
    if (canvasRef.current) {
      const initialIndex = Math.min(
        images.length - 1,
        Math.max(0, Math.round(currentProgressRef.current * (images.length - 1))),
      )
      drawPortraitFrame(canvasRef.current, images[initialIndex], {
        bounds: sourceBoundsRef.current,
      })
      lastDrawnFrameRef.current = initialIndex
    }

    let rafId = 0

    const renderLoop = () => {
      const diff = targetProgressRef.current - currentProgressRef.current
      if (Math.abs(diff) < 0.0008) {
        currentProgressRef.current = targetProgressRef.current
      } else {
        currentProgressRef.current += diff * LERP_FACTOR
      }

      const t = currentProgressRef.current
      applyTransform(t)

      const nextFrame = Math.min(
        images.length - 1,
        Math.max(0, Math.round(t * (images.length - 1))),
      )

      if (nextFrame !== lastDrawnFrameRef.current && canvasRef.current) {
        drawPortraitFrame(canvasRef.current, images[nextFrame], {
          bounds: sourceBoundsRef.current,
        })
        lastDrawnFrameRef.current = nextFrame
      }

      rafId = window.requestAnimationFrame(renderLoop)
    }

    rafId = window.requestAnimationFrame(renderLoop)
    window.addEventListener('scroll', updateTargetProgress, { passive: true })

    const resizeObserver = new ResizeObserver(() => {
      measureSlots()
      updateTargetProgress()
      applyTransform(currentProgressRef.current)
      if (canvasRef.current) {
        const index = Math.min(
          images.length - 1,
          Math.max(0, Math.round(currentProgressRef.current * (images.length - 1))),
        )
        drawPortraitFrame(canvasRef.current, images[index], {
          bounds: sourceBoundsRef.current,
        })
        lastDrawnFrameRef.current = index
      }
    })

    if (stageRef.current) {
      resizeObserver.observe(stageRef.current)
    }
    if (aboutSlotRef.current) {
      resizeObserver.observe(aboutSlotRef.current)
    }

    const mutationObserver = new MutationObserver(() => {
      measureSlots()
      updateTargetProgress()
      applyTransform(currentProgressRef.current)
    })

    if (aboutSlotRef.current) {
      mutationObserver.observe(aboutSlotRef.current, {
        attributes: true,
        attributeFilter: ['class', 'style'],
      })
    }

    return () => {
      window.cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', updateTargetProgress)
      resizeObserver.disconnect()
      mutationObserver.disconnect()
    }
  }, [images, isLoaded])

  return (
    <div ref={stageRef} className="relative w-full bg-[#33241D]">
      {/* Preloader Minimalis */}
      <div
        aria-live="polite"
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#33241D] transition-opacity duration-500 ${isLoaded
          ? 'pointer-events-none opacity-0'
          : 'pointer-events-auto opacity-100'
          }`}
      >
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#A89F96]">
          {lang === 'id' ? 'Memuat Sequence' : 'Loading Sequence'}
        </span>
        <span className="mt-3 font-mono text-2xl font-medium tabular-nums text-[#F5F3EF]">
          {progress}%
        </span>
        <div className="mt-4 h-px w-44 overflow-hidden bg-[#F5F3EF]/15">
          <div
            className="h-full bg-[#F5F3EF] transition-[width] duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="mt-2 font-mono text-[10px] tracking-[0.18em] text-[#A89F96]">
          {totalFrames} FRAMES
        </span>
      </div>

      {/* SVG Unsharp-Mask Filter (GPU-accelerated, sRGB-accurate) */}
      <svg className="pointer-events-none absolute h-0 w-0" aria-hidden="true">
        <defs>
          <filter
            id="hero-portrait-sharpen"
            colorInterpolationFilters="sRGB"
          >
            <feConvolveMatrix
              order="3"
              kernelMatrix="0 -0.12 0 -0.12 1.48 -0.12 0 -0.12 0"
              divisor={1}
              bias={0}
              edgeMode="duplicate"
              preserveAlpha
            />
          </filter>
        </defs>
      </svg>

      {/* Shared Morphing Portrait Canvas Layer */}
      <div
        ref={portraitLayerRef}
        className="pointer-events-none absolute top-0 left-0 z-10 origin-top-left will-change-transform"
        style={{
          maskImage:
            'radial-gradient(ellipse 58% 72% at 50% 54%, #000 76%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 58% 72% at 50% 54%, #000 76%, transparent 100%)',
        }}
      >
        <div
          className="relative h-full w-full overflow-hidden"
          style={{
            maskImage:
              'linear-gradient(to right, transparent 0%, #000 7%, #000 93%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, #000 7%, #000 93%, transparent 100%)',
          }}
        >
          <canvas
            ref={canvasRef}
            aria-label="Hendra Juniarta interactive portrait sequence"
            className="block h-full w-full"
            style={{
              filter:
                'url(#hero-portrait-sharpen) contrast(1.03) brightness(1.02) saturate(1.02)',
              maskImage:
                'linear-gradient(to bottom, transparent 0%, #000 4%, #000 88%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to bottom, transparent 0%, #000 4%, #000 88%, transparent 100%)',
            }}
          />
        </div>
      </div>

      {/* HERO SECTION */}
      <section
        id="info"
        className="relative h-[100svh] min-h-[640px] w-full overflow-hidden"
      >
        {/* Top Editorial Bar (HENDRAJUNIARTA + Hairline + Intro) */}
        <div className="relative z-20 flex flex-col gap-4 px-5 pt-6 sm:flex-row sm:items-center sm:gap-6 sm:px-8 sm:pt-7 md:px-12 md:pt-8">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#F5F3EF]/80 sm:text-[13px]">
            {siteConfig.greeting}
          </span>

          <div className="hidden h-px flex-1 bg-[#F5F3EF]/12 sm:block" />

          <h1 className="max-w-[275px] text-xs font-normal leading-[1.45] text-[#F5F3EF] sm:max-w-[235px] sm:text-right sm:text-[13px]">
            {siteConfig.headline[lang]}
          </h1>
        </div>

        {/* Hero Target Slot untuk posisi awal Portrait Besar */}
        <div
          ref={heroSlotRef}
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-1/2 aspect-[3/4] h-[81vh] max-h-[960px] -translate-x-1/2 sm:h-[84vh] md:h-[88vh]"
        />

        {/* Nama Editorial Instrument Serif (Hendra regular + Juniarta italic) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-[82%] z-20 -translate-y-1/2 select-none px-4 sm:top-[84%] sm:px-8 md:px-12"
        >
          <p className="w-full text-center font-serif text-[clamp(2.75rem,10.6vw,10.6rem)] font-normal leading-[0.88] tracking-[0.025em] [word-spacing:0.16em] whitespace-nowrap text-[#F5F3EF]/92">
            Hendra <span className="italic">Juniarta</span>
          </p>
        </div>
      </section>

      {/* ABOUT SECTION (Slot tujuan mengecilnya foto) */}
      <AboutSection portraitSlotRef={aboutSlotRef} />
    </div>
  )
}
