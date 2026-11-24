import { useEffect, useState } from 'react'
import { ArrowLeft, ZoomIn } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import type { CertificationItem } from '@/types/portfolio'

interface CertificationsModalProps {
  isOpen: boolean
  onClose: () => void
  certifications: CertificationItem[]
}

export function CertificationsModal({
  isOpen,
  onClose,
  certifications,
}: CertificationsModalProps) {
  const [previewCert, setPreviewCert] = useState<CertificationItem | null>(null)
  const { lang } = useLanguage()

  useEffect(() => {
    if (!isOpen) {
      setPreviewCert(null)
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (previewCert) {
          setPreviewCert(null)
        } else {
          onClose()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose, previewCert])

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="certifications-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A110F]/80 p-4 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <div
        data-lenis-prevent
        className={`max-h-[88vh] w-full overflow-y-auto rounded-lg border border-[#F5F3EF]/15 bg-[#241914] p-6 shadow-2xl transition-[max-width] duration-300 sm:p-8 ${previewCert ? 'max-w-4xl' : 'max-w-2xl'
          }`}
        onClick={(event) => event.stopPropagation()}
      >
        {previewCert ? (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F5F3EF]/12 pb-4">
              <button
                type="button"
                onClick={() => setPreviewCert(null)}
                className="inline-flex cursor-pointer items-center gap-2 rounded border border-[#F5F3EF]/18 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#F5F3EF] transition-colors duration-200 hover:border-[#FF7A00] hover:text-[#FF7A00]"
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                {lang === 'id' ? 'KEMBALI' : 'BACK'}
              </button>

              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#A89F96]">
                {previewCert.issuer} · {previewCert.year}
              </span>

              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer rounded border border-[#F5F3EF]/18 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#F5F3EF] transition-colors duration-200 hover:border-[#FF7A00] hover:text-[#FF7A00]"
              >
                {lang === 'id' ? 'TUTUP' : 'CLOSE'}
              </button>
            </div>

            <h3
              id="certifications-modal-title"
              className="mt-4 text-base font-medium text-[#F5F3EF] sm:text-lg"
            >
              {previewCert.title}
            </h3>

            {previewCert.image && (
              <div className="mt-4 overflow-hidden rounded-md border border-[#F5F3EF]/12 bg-[#1C1412] p-2 sm:p-3">
                <img
                  src={previewCert.image}
                  alt={previewCert.title}
                  className="mx-auto max-h-[64vh] w-auto object-contain"
                />
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between gap-4 border-b border-[#F5F3EF]/12 pb-5">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#FF7A00]">
                  {lang === 'id' ? 'KREDENSIAL' : 'CREDENTIALS'}
                </span>
                <h3
                  id="certifications-modal-title"
                  className="mt-1 font-display text-2xl font-bold uppercase tracking-tight text-[#F5F3EF] sm:text-3xl"
                >
                  {lang === 'id' ? 'SERTIFIKASI' : 'CERTIFICATIONS'}
                </h3>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer rounded border border-[#F5F3EF]/18 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#F5F3EF] transition-colors duration-200 hover:border-[#FF7A00] hover:text-[#FF7A00]"
              >
                {lang === 'id' ? 'TUTUP' : 'CLOSE'}
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {certifications.map((cert, idx) => (
                <div
                  key={cert.id}
                  className="flex flex-col gap-4 rounded-md border border-[#F5F3EF]/12 bg-[#33241D] p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#FF7A00]">
                        0{idx + 1} · {cert.issuer}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#A89F96]">
                        {cert.year}
                      </span>
                    </div>

                    <h4 className="mt-2 text-base font-medium text-[#F5F3EF] sm:text-lg">
                      {cert.title}
                    </h4>

                    <p className="mt-2 text-sm leading-relaxed text-[#A89F96]">
                      {cert.description[lang]}
                    </p>

                    {cert.credentialUrl && (
                      <div className="mt-3">
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[#FF7A00] transition-opacity duration-200 hover:opacity-80"
                        >
                          VIEW CREDENTIAL &rarr;
                        </a>
                      </div>
                    )}
                  </div>

                  {cert.image && (
                    <button
                      type="button"
                      onClick={() => setPreviewCert(cert)}
                      aria-label={`Preview ${cert.title}`}
                      className="group relative aspect-[4/3] w-full shrink-0 cursor-pointer overflow-hidden rounded border border-[#F5F3EF]/15 bg-[#1C1412] p-1.5 transition-colors duration-200 hover:border-[#FF7A00] sm:w-40"
                    >
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                      <span className="absolute right-1.5 bottom-1.5 inline-flex items-center gap-1 rounded bg-[#1C1412]/90 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-[#F5F3EF] transition-colors duration-200 group-hover:text-[#FF7A00]">
                        <ZoomIn className="h-2.5 w-2.5" aria-hidden="true" />
                        {lang === 'id' ? 'PERBESAR' : 'ZOOM'}
                      </span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
