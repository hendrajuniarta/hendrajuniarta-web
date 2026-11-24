import type { Language } from '@/context/LanguageContext'

export type Localized<T> = Record<Language, T>

export interface Project {
  id: string
  slug: string
  title: Localized<string>
  client: string
  category: string
  role: string
  year: string
  summary: Localized<string>
  highlights: Localized<string[]>
  stack: string[]
  thumbnail?: string
}

export interface ExperienceItem {
  id: string
  role: string
  company: string
  period: Localized<string>
  summary: Localized<string>
}

export interface CertificationItem {
  id: string
  title: string
  issuer: string
  year: string
  description: Localized<string>
  image?: string
  credentialUrl?: string
}

export interface NavItem {
  label: string
  href: string
}
