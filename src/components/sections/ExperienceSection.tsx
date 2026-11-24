import { useRef } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { siteConfig } from '@/data/siteConfig'
import { gsap, useGSAP } from '@/lib/gsap'

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { lang } = useLanguage()

  useGSAP(
    () => {
      gsap.from('[data-exp-reveal]', {
        y: 20,
        opacity: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 84%',
          once: true,
        },
      })
    },
    { scope: sectionRef },
  )

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="border-t border-[#F5F3EF]/12 bg-[#33241D] px-5 py-20 sm:px-8 sm:py-28 md:px-12"
    >
      {/* Experience Block */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4" data-exp-reveal>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#A89F96]">
            02 / EXPERIENCE
          </span>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#A89F96]">
            {siteConfig.experienceSection.subtitle[lang]}
          </p>
        </div>

        <div className="lg:col-span-8">
          <h2
            data-exp-reveal
            className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[#FF7A00]"
          >
            {siteConfig.experienceSection.heading[lang]}
          </h2>
          <div className="divide-y divide-[#F5F3EF]/12 border-t border-b border-[#F5F3EF]/12">
            {siteConfig.experiences.map((exp) => (
              <div
                key={exp.id}
                data-exp-reveal
                className="grid grid-cols-1 gap-3 py-6 sm:grid-cols-12 sm:gap-6"
              >
                <div className="sm:col-span-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#A89F96]">
                    {exp.period[lang]}
                  </p>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.1em] text-[#F5F3EF]/85">
                    {exp.company}
                  </p>
                </div>
                <div className="sm:col-span-8">
                  <h3 className="text-base font-medium text-[#F5F3EF] sm:text-lg">
                    {exp.role}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#A89F96]">
                    {exp.summary[lang]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
