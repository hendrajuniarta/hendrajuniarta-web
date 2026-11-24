import { AccentButton } from '@/components/ui/AccentButton'
import { useLanguage } from '@/context/LanguageContext'
import { siteConfig } from '@/data/siteConfig'

export function Footer() {
  const { lang } = useLanguage()

  return (
    <footer
      id="contact"
      className="border-t border-[#F5F3EF]/12 bg-[#33241D] px-5 pt-20 pb-12 sm:px-8 sm:pt-28 md:px-12"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
        <div className="lg:col-span-8">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#A89F96]">
            {siteConfig.contact.sectionLabel}
          </span>
          <h2 className="mt-4 font-display text-[clamp(2.4rem,6.8vw,5.8rem)] font-bold uppercase leading-[0.9] tracking-tighter text-[#F5F3EF]">
            {siteConfig.contact.headlineStart[lang]}{' '}
            <span className="font-serif font-normal italic tracking-tight text-[#FF7A00]">
              {siteConfig.contact.headlineAccent[lang]}
            </span>
          </h2>
        </div>

        <div className="lg:col-span-4 lg:flex lg:justify-end">
          <AccentButton
            href={`mailto:${siteConfig.contact.email}`}
            label={siteConfig.contact.ctaLabel[lang]}
            hoverLabel={siteConfig.about.ctaHoverLabel[lang]}
          />
        </div>
      </div>

      <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-[#F5F3EF]/12 pt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-[#A89F96]">
        <span>I Kadek Hendra Juniarta &bull; Software Developer</span>

        <span>{siteConfig.contact.location} &bull; &copy; 2026</span>
      </div>
    </footer>
  )
}
