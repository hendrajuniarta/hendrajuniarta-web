import type {
  CertificationItem,
  ExperienceItem,
  NavItem,
} from '@/types/portfolio'

export const siteConfig = {
  domain: 'hendrajuniarta.my.id',
  editionLabel: 'PORTFOLIO 2026',
  wordmark: 'HENDRA JUNIARTA',
  greeting: 'hendrajuniarta',
  headline: {
    en: 'Software Developer focused on web architecture',
    id: 'Software Developer dengan fokus pada arsitektur web',
  },
  timezoneLabel: 'DPS / WITA',
  timezoneIana: 'Asia/Makassar',
  navItems: [
    { label: 'INFO', href: '#info' },
    { label: 'ABOUT', href: '#about' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'WORK', href: '#work' },
    { label: 'CONTACT', href: '#contact' },
  ] satisfies NavItem[],
  about: {
    sectionLabel: 'ABOUT',
    role: 'SOFTWARE DEVELOPER',
    services: 'WEB SYSTEMS & FULL-STACK ARCHITECTURE',
    experience: {
      en: '1.5+ YEARS',
      id: '1.5+ TAHUN',
    },
    coreStack: 'REACT, TYPESCRIPT, TAILWIND, ASP.NET CORE & C#',
    ctaLabel: {
      en: 'VIEW WORK',
      id: 'LIHAT KARYA',
    },
    ctaHoverLabel: {
      en: 'CLICK HERE',
      id: 'KLIK DI SINI',
    },
    ctaHref: '#work',
    statementWords: {
      en: [
        { text: 'BUILDING', accent: false, serif: false },
        { text: 'RELIABLE', accent: true, serif: false },
        { text: 'SYSTEMS', accent: false, serif: false },
        { text: '—', accent: false, serif: false },
        { text: 'FAST', accent: false, serif: true },
        { text: 'AND', accent: false, serif: false },
        { text: 'SECURE', accent: false, serif: true },
      ],
      id: [
        { text: 'MEMBANGUN', accent: false, serif: false },
        { text: 'SISTEM', accent: true, serif: false },
        { text: 'ANDAL', accent: false, serif: false },
        { text: '—', accent: false, serif: false },
        { text: 'CEPAT', accent: false, serif: true },
        { text: 'DAN', accent: false, serif: false },
        { text: 'AMAN', accent: false, serif: true },
      ],
    },
  },
  experienceSection: {
    subtitle: {
      en: 'Hands-on roles across healthcare system migration and institutional IT infrastructure.',
      id: 'Pengalaman langsung pada proyek migrasi sistem informasi rumah sakit serta infrastruktur TI instansi.',
    },
    heading: {
      en: 'PROFESSIONAL EXPERIENCE',
      id: 'PENGALAMAN PROFESIONAL',
    },
  },
  experiences: [
    {
      id: 'exp-1',
      role: 'Software Engineer',
      company: 'PT Sanata System',
      period: {
        en: '2025 — PRESENT',
        id: '2025 — SEKARANG',
      },
      summary: {
        en: 'Contributing to the Hospital Information Management System (SIMRS) migration project operational workflows while safeguarding data integrity and system reliability.',
        id: 'Berkontribusi dalam proyek migrasi Sistem Informasi Manajemen Rumah Sakit (SIMRS) untuk alur kerja operasional dengan menjaga integritas data dan keandalan sistem.',
      },
    },
    {
      id: 'exp-2',
      role: 'IT Support',
      company: 'Polresta Denpasar',
      period: {
        en: '2021',
        id: '2021',
      },
      summary: {
        en: 'Provided technical support, maintained IT infrastructure, and troubleshot operational systems to keep daily institutional workflows running smoothly.',
        id: 'Memberikan dukungan teknis, memelihara infrastruktur TI, dan melakukan troubleshooting sistem operasional untuk menjaga kelancaran aktivitas harian instansi.',
      },
    },
  ] satisfies ExperienceItem[],
  workSection: {
    subtitle: {
      en: 'A curated look at hospital information systems and company web platforms engineered for reliability, clarity, and data integrity.',
      id: 'Rangkuman sistem informasi rumah sakit dan aplikasi web perusahaan yang dirancang untuk keandalan, kejelasan alur, dan integritas data.',
    },
    credentialsLabel: {
      en: 'CREDENTIALS & TRAINING',
      id: 'SERTIFIKASI & PELATIHAN',
    },
    viewCertifications: {
      en: 'VIEW CERTIFICATIONS',
      id: 'LIHAT SERTIFIKAT',
    },
  },
  certifications: [
    {
      id: 'cert-1',
      title: 'Microcredential Information System Security (Secure Software Coding)',
      issuer: 'PT Sawah Cyber Security · PNB',
      year: '2025',
      description: {
        en: 'Cybersecurity training program focused on Secure Software Coding, practical coding exercises, and secure software development fundamentals.',
        id: 'Pelatihan keamanan siber yang berfokus pada Secure Software Coding, praktik pengkodean aman, dan dasar-dasar pengembangan perangkat lunak yang aman.',
      },
      image: '/assets/cybersecurity.jpg',
    },
    {
      id: 'cert-2',
      title: 'Certificate of Competence — Software Development (Junior Coder)',
      issuer: 'BNSP · LSP TIK Triatma Kompetensi',
      year: '2022',
      description: {
        en: 'National professional competency certification in Software Development (Junior Coder), valid for 3 years from issuance.',
        id: 'Sertifikasi kompetensi profesi nasional di bidang Pengembangan Perangkat Lunak (Junior Coder), berlaku selama 3 tahun sejak diterbitkan.',
      },
      image: '/assets/sertif-bnsp.jpeg',
    },
  ] satisfies CertificationItem[],
  contact: {
    sectionLabel: '04 / CONTACT',
    email: 'dekhendrajun1@gmail.com',
    location: 'Bali, Indonesia',
    headlineStart: {
      en: "LET'S BUILD SOMETHING",
      id: 'MARI BANGUN SISTEM YANG',
    },
    headlineAccent: {
      en: 'RELIABLE',
      id: 'ANDAL',
    },
    ctaLabel: {
      en: 'GET IN TOUCH',
      id: 'HUBUNGI SAYA',
    },
  },
}
