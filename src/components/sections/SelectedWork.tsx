import { useRef, useState } from 'react'
import { CertificationsModal } from '@/components/ui/CertificationsModal'
import { useLanguage } from '@/context/LanguageContext'
import { projects } from '@/data/projects'
import { siteConfig } from '@/data/siteConfig'
import { gsap, useGSAP } from '@/lib/gsap'

export function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null)
  const { lang } = useLanguage()
  const [openIds, setOpenIds] = useState<string[]>(() =>
    projects.map((project) => project.id),
  )
  const [isCertModalOpen, setIsCertModalOpen] = useState(false)

  const toggleProject = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  useGSAP(
    () => {
      gsap.from('[data-work-reveal]', {
        y: 22,
        opacity: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          once: true,
        },
      })
    },
    { scope: sectionRef },
  )

  const certifications = siteConfig.certifications

  return (
    <section
      id="work"
      ref={sectionRef}
      className="border-t border-[#F5F3EF]/12 bg-[#33241D] px-5 pt-20 pb-10 sm:px-8 sm:pt-24 sm:pb-12 md:px-12"
    >
      {/* Header Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
        <div className="lg:col-span-4" data-work-reveal>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#A89F96]">
            03 / SELECTED WORK
          </span>
        </div>

        <div className="lg:col-span-8" data-work-reveal>
          <h2 className="font-display text-[clamp(2.5rem,7vw,6.2rem)] font-bold uppercase leading-[0.88] tracking-tighter text-[#F5F3EF]">
            SELECTED{' '}
            <span className="font-serif font-normal italic tracking-tight text-[#FF7A00]">
              WORK
            </span>
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#A89F96] sm:text-base">
            {siteConfig.workSection.subtitle[lang]}
          </p>
        </div>
      </div>

      {/* Editorial Case-Study Rows */}
      <div className="mt-12 divide-y divide-[#F5F3EF]/12 border-t border-b border-[#F5F3EF]/12 sm:mt-16">
        {projects.map((project, idx) => {
          const isOpen = openIds.includes(project.id)
          const itemNumber = String(idx + 1).padStart(2, '0')

          return (
            <article key={project.id} data-work-reveal>
              <button
                type="button"
                onClick={() => toggleProject(project.id)}
                aria-expanded={isOpen}
                className="group grid w-full cursor-pointer grid-cols-1 items-baseline gap-3 py-6 text-left transition-colors duration-300 sm:py-8 lg:grid-cols-12 lg:gap-8"
              >
                <div className="flex items-center gap-3 lg:col-span-2">
                  <span className="font-mono text-[11px] tracking-[0.18em] text-[#A89F96]">
                    {itemNumber}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#FF7A00]">
                    {project.category}
                  </span>
                </div>

                <div className="lg:col-span-6">
                  <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-[#F5F3EF] transition-colors duration-300 group-hover:text-[#FF7A00] sm:text-3xl md:text-4xl">
                    {project.title[lang]}
                  </h3>
                </div>

                <div className="flex items-center justify-between gap-4 lg:col-span-4 lg:justify-end">
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#A89F96]">
                    {project.role}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#F5F3EF]/16 font-mono text-xs transition-all duration-300 ${
                      isOpen
                        ? 'border-[#FF7A00] bg-[#FF7A00] text-[#1C1611]'
                        : 'text-[#F5F3EF] group-hover:border-[#FF7A00]/60 group-hover:text-[#FF7A00]'
                    }`}
                  >
                    {isOpen ? '−' : '+'}
                  </span>
                </div>
              </button>

              {isOpen && (
                <div className="grid grid-cols-1 gap-6 pb-8 lg:grid-cols-12 lg:gap-8">
                  <div className="space-y-5 lg:col-span-6 lg:col-start-3">
                    <p className="text-sm leading-relaxed text-[#F5F3EF]/90 sm:text-base">
                      {project.summary[lang]}
                    </p>
                    <ul className="space-y-2 border-l border-[#FF7A00]/50 pl-4">
                      {project.highlights[lang].map((item) => (
                        <li
                          key={item}
                          className="text-xs leading-relaxed text-[#A89F96] sm:text-sm"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="lg:col-span-4 lg:flex lg:flex-col lg:items-end lg:justify-between">
                    <div className="flex flex-wrap gap-2 lg:justify-end">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded border border-[#F5F3EF]/14 bg-[#3E2C24] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#F5F3EF]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </article>
          )
        })}
      </div>

      {/* Certifications Modal Trigger */}
      <div
        data-work-reveal
        className="mt-6 flex flex-wrap items-center justify-between gap-4 sm:mt-8"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#A89F96]">
          {siteConfig.workSection.credentialsLabel[lang]}
        </span>

        <button
          type="button"
          onClick={() => setIsCertModalOpen(true)}
          className="group inline-flex cursor-pointer items-center gap-2.5 rounded border border-[#F5F3EF]/18 bg-[#241914] px-3.5 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-[#F5F3EF] transition-colors duration-300 hover:border-[#FF7A00] hover:text-[#FF7A00]"
        >
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-[#FF7A00] transition-transform duration-300 group-hover:scale-125"
          />
          <span className="relative block h-[1.25em] overflow-hidden leading-[1.25em]">
            <span className="block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
              {siteConfig.workSection.viewCertifications[lang]}
            </span>
            <span
              aria-hidden="true"
              className="block text-[#FF7A00] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full"
            >
              {siteConfig.workSection.viewCertifications[lang]}
            </span>
          </span>
        </button>
      </div>

      <CertificationsModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        certifications={certifications}
      />
    </section>
  )
}
