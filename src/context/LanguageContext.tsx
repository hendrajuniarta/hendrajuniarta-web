import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

export type Language = 'en' | 'id'

interface LanguageContextValue {
  lang: Language
  setLang: (lang: Language) => void
  toggleLang: () => void
}

const STORAGE_KEY = 'hj-portfolio-lang'

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      return saved === 'id' || saved === 'en' ? saved : 'en'
    } catch {
      return 'en'
    }
  })

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // Abaikan jika penyimpanan browser dibatasi
    }
  }, [lang])

  const toggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'id' : 'en'))
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return ctx
}
