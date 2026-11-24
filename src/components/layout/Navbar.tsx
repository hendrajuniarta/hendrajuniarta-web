import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { siteConfig } from '@/data/siteConfig'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { lang, setLang } = useLanguage()
  const controlsRef = useRef<HTMLDivElement>(null)
  const targetOffsetRef = useRef(0)
  const currentOffsetRef = useRef(0)

  useEffect(() => {
    const computeTravelOffset = () => {
      if (isMenuOpen) {
        targetOffsetRef.current = 0
        return
      }

      const maxTravel = Math.max(0, window.innerHeight - 96)
      const travelDistance = Math.max(1, window.innerHeight * 0.72)
      const progress = Math.min(1, Math.max(0, window.scrollY / travelDistance))
      targetOffsetRef.current = maxTravel * (1 - progress)
    }

    computeTravelOffset()
    currentOffsetRef.current = targetOffsetRef.current

    let rafId = 0
    const tick = () => {
      const diff = targetOffsetRef.current - currentOffsetRef.current
      if (Math.abs(diff) < 0.25) {
        currentOffsetRef.current = targetOffsetRef.current
      } else {
        currentOffsetRef.current += diff * 0.16
      }

      if (controlsRef.current) {
        controlsRef.current.style.transform = `translate3d(0, ${currentOffsetRef.current.toFixed(2)}px, 0)`
      }

      rafId = window.requestAnimationFrame(tick)
    }

    rafId = window.requestAnimationFrame(tick)
    window.addEventListener('scroll', computeTravelOffset, { passive: true })
    window.addEventListener('resize', computeTravelOffset)

    return () => {
      window.cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', computeTravelOffset)
      window.removeEventListener('resize', computeTravelOffset)
    }
  }, [isMenuOpen])

  useEffect(() => {
    if (!isMenuOpen) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-5 pt-5 sm:px-8 sm:pt-6 md:px-12 md:pt-7">
        <div
          ref={controlsRef}
          className="flex items-center justify-between will-change-transform"
        >
          {/* Floating Monogram Badge */}
          <a
            href="#info"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Hendra Juniarta home"
            className="pointer-events-auto group flex h-11 w-11 items-center justify-center rounded-md border border-[#F5F3EF]/14 bg-[#241914]/95 shadow-lg backdrop-blur-sm transition-colors duration-300 hover:border-[#FF7A00]/60 sm:h-12 sm:w-12"
          >
            <img
              src="/assets/favicon.png"
              alt=""
              aria-hidden="true"
              className="h-5 w-5 object-contain transition-transform duration-300 group-hover:scale-105 sm:h-6 sm:w-6"
            />
          </a>

          {/* Language Toggle + Menu Toggle Button */}
          <div className="pointer-events-auto flex items-center gap-2.5">
            <div
              role="group"
              aria-label="Language switcher"
              className="inline-flex h-11 items-center rounded-md border border-[#F5F3EF]/14 bg-[#241914]/95 p-1 font-mono text-[10px] uppercase tracking-[0.16em] shadow-lg backdrop-blur-sm sm:h-12 sm:text-[11px]"
            >
              {(['en', 'id'] as const).map((code) => {
                const isActive = lang === code
                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setLang(code)}
                    aria-pressed={isActive}
                    className={`cursor-pointer rounded px-2.5 py-1.5 leading-none transition-colors duration-200 ${
                      isActive
                        ? 'bg-[#FF7A00] font-medium text-[#120E0D]'
                        : 'text-[#A89F96] hover:text-[#F5F3EF]'
                    }`}
                  >
                    {code.toUpperCase()}
                  </button>
                )
              })}
            </div>

            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-expanded={isMenuOpen}
              aria-controls="site-menu-overlay"
              className="group inline-flex h-11 cursor-pointer items-center gap-2.5 rounded-md border border-[#F5F3EF]/14 bg-[#241914]/95 px-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[#F5F3EF] shadow-lg backdrop-blur-sm transition-colors duration-300 hover:border-[#FF7A00]/60 sm:h-12 sm:px-5 sm:text-[11px]"
            >
              <span
                aria-hidden="true"
                className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${isMenuOpen ? 'bg-[#F5F3EF]' : 'bg-[#FF7A00]'
                  }`}
              />
              <span className="relative block h-[1.25em] overflow-hidden leading-[1.25em]">
                <span className="block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                  {isMenuOpen ? 'CLOSE' : 'MENU'}
                </span>
                <span
                  aria-hidden="true"
                  className="block text-[#FF7A00] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full"
                >
                  {isMenuOpen ? 'CLOSE' : 'MENU'}
                </span>
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Editorial Menu Overlay */}
      <div
        id="site-menu-overlay"
        aria-hidden={!isMenuOpen}
        className={`fixed inset-0 z-40 flex flex-col justify-between bg-[#241914]/98 px-5 pt-28 pb-10 backdrop-blur-md transition-all duration-500 sm:px-8 md:px-12 ${isMenuOpen
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0'
          }`}
      >
        <nav aria-label="Full navigation">
          <ul className="divide-y divide-[#F5F3EF]/10 border-t border-b border-[#F5F3EF]/10">
            {siteConfig.navItems.map((item, idx) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex items-baseline justify-between py-5 sm:py-6"
                >
                  <span className="font-mono text-xs tracking-[0.2em] text-[#A89F96]">
                    0{idx + 1}
                  </span>
                  <span className="font-display text-4xl font-bold uppercase tracking-tighter text-[#F5F3EF] transition-colors duration-300 group-hover:text-[#FF7A00] sm:text-6xl">
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[#A89F96]">
          <span>I Kadek Hendra Juniarta &bull; Software Developer</span>
          <span>{siteConfig.contact.location} &bull; &copy; 2026</span>
        </div>
      </div>
    </>
  )
}
