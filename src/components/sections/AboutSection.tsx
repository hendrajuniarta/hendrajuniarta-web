import { useRef, type RefObject } from 'react'
import { AccentButton } from '@/components/ui/AccentButton'
import { useLanguage } from '@/context/LanguageContext'
import { siteConfig } from '@/data/siteConfig'
import { useLiveTime } from '@/hooks/useLiveTime'
import { gsap, useGSAP } from '@/lib/gsap'

interface AboutSectionProps {
  portraitSlotRef: RefObject<HTMLDivElement | null>
}

export function AboutSection({ portraitSlotRef }: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const statementRef = useRef<HTMLParagraphElement>(null)
  const liveTime = useLiveTime()
  const { lang } = useLanguage()

  useGSAP(
    () => {
      gsap.from('[data-about-reveal]', {
        y: 16,
        opacity: 0,
        duration: 0.75,
        stagger: 0.06,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 88%',
          once: true,
        },
      })
    },
    { scope: sectionRef },
  )

  useGSAP(
    () => {
      if (!statementRef.current) return
      const chars = gsap.utils.toArray<HTMLElement>(
        '[data-headline-char]',
        statementRef.current,
      )

      if (chars.length > 0) {
        gsap.set(chars, { color: '#F5F3EF', opacity: 0.14 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: statementRef.current,
            start: 'top 90%',
            end: 'bottom 38%',
            scrub: 0.65,
          },
        })

        const step = 0.045
        chars.forEach((char, idx) => {
          const at = idx * step
          tl.to(
            char,
            {
              color: '#FF7A00',
              opacity: 1,
              duration: 0.16,
              ease: 'none',
            },
            at,
          ).to(
            char,
            {
              color: '#F5F3EF',
              duration: 0.24,
              ease: 'none',
            },
            at + 0.18,
          )
        })
      }
    },
    { scope: sectionRef, dependencies: [lang], revertOnUpdate: true },
  )

  const metadataRows = [
    { label: 'ROLE', value: siteConfig.about.role },
    { label: 'SERVICES', value: siteConfig.about.services },
    { label: 'EXPERIENCE', value: siteConfig.about.experience[lang] },
    {
      label: 'TIMEZONE',
      value: `${liveTime} ${siteConfig.timezoneLabel}`,
      isTabular: true,
    },
    { label: 'CORE STACK', value: siteConfig.about.coreStack },
  ]

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-[#33241D] px-5 pt-10 pb-20 sm:px-8 sm:pt-12 sm:pb-24 md:px-12 md:pt-14"
    >
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-8">
        {/* Kolom Kiri: Label Section */}
        <div className="relative z-20 lg:col-span-1 lg:pt-1" data-about-reveal>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#A89F96]">
            {siteConfig.about.sectionLabel}
          </span>
        </div>

        {/* Kolom Tengah: Target Slot pendaratan Portrait dari Hero */}
        <div className="lg:col-span-5">
          <div
            ref={portraitSlotRef}
            aria-hidden="true"
            className="mx-auto aspect-[3/4] w-full max-w-[360px] rounded-xl lg:mx-auto lg:w-[min(100%,598px,54.78vh)] lg:max-w-none"
          />
        </div>

        {/* Kolom Kanan: Tabel Metadata + CTA Oranye */}
        <div className="relative z-20 lg:col-span-6 lg:self-center lg:pl-8">
          <div className="lg:max-w-[560px]">
            <dl className="divide-y divide-[#F5F3EF]/12 border-t border-b border-[#F5F3EF]/12">
              {metadataRows.map((row) => (
                <div
                  key={row.label}
                  data-about-reveal
                  className="flex flex-col gap-1.5 py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <dt className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-[#A89F96] sm:text-[11px]">
                    {row.label}
                  </dt>
                  <dd
                    className={`font-mono text-[11px] uppercase tracking-[0.12em] text-[#F5F3EF] sm:text-right sm:text-xs ${row.isTabular ? 'tabular-nums' : ''
                      }`}
                  >
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8" data-about-reveal>
              <AccentButton
                href={siteConfig.about.ctaHref}
                label={siteConfig.about.ctaLabel[lang]}
                hoverLabel={siteConfig.about.ctaHoverLabel[lang]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Giant Display Statement di Bawah */}
      <div className="mt-24 pt-6 sm:mt-32 md:mt-40">
        <p
          ref={statementRef}
          className="font-display text-[clamp(2.4rem,8.4vw,7.8rem)] font-bold uppercase leading-[0.9] tracking-tighter text-[#F5F3EF]"
        >
          {siteConfig.about.statementWords[lang].map((word, idx) => (
            <span
              key={`${lang}-${word.text}-${idx}`}
              className={`mr-[0.22em] inline-block ${word.serif ? 'font-serif font-normal italic tracking-tight' : ''
                }`}
            >
              {word.text.split('').map((char, charIdx) => (
                <span key={`${lang}-${idx}-${charIdx}`} data-headline-char>
                  {char}
                </span>
              ))}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
