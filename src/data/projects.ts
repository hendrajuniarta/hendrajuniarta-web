import type { Project } from '../types/portfolio'

export const projects: Project[] = [
  {
    id: 'simrs',
    slug: 'simrs-hospital-system',
    title: {
      en: 'SIMRS — Hospital Information System Migration',
      id: 'SIMRS — Migrasi Sistem Informasi Rumah Sakit',
    },
    client: 'PT Sanata System',
    category: 'ENTERPRISE HEALTHCARE',
    role: 'Software Engineer',
    year: '2025',
    summary: {
      en: 'Ongoing migration of a Hospital Information Management System (SIMRS), transitioning core clinical and administrative workflows into a modular architecture powered by ASP.NET MVC, microservices, and React.',
      id: 'Proyek migrasi berkelanjutan Sistem Informasi Manajemen Rumah Sakit (SIMRS) yang mengalihkan alur klinis dan administrasi inti ke arsitektur modular berbasis ASP.NET MVC, microservices, dan React.',
    },
    highlights: {
      en: [
        'Migrating hospital modules into structured ASP.NET MVC and microservices architecture for better maintainability and service separation.',
        'Developing modern, responsive React interfaces integrated with ASP.NET backend services and RESTful APIs.',
        'Safeguarding data integrity, SQL Server validation rules, and secure workflow handling throughout the system migration.',
      ],
      id: [
        'Memigrasikan modul-modul rumah sakit ke arsitektur ASP.NET MVC dan microservices yang terstruktur agar mudah dirawat dan terpisah antar layanan.',
        'Mengembangkan antarmuka React yang modern dan responsif serta terintegrasi dengan layanan backend ASP.NET dan RESTful API.',
        'Menjaga integritas data, aturan validasi SQL Server, dan penanganan alur kerja yang aman sepanjang proses migrasi sistem.',
      ],
    },
    stack: ['ASP.NET', 'MVC', 'Microservices', 'React', 'SQL Server', 'RESTful API'],
  },
  {
    id: 'company-web-01',
    slug: 'company-web-platform',
    title: {
      en: 'Company Web Platform',
      id: 'Platform Web Perusahaan',
    },
    client: 'PT Sanata System',
    category: 'INTERNAL WEB SYSTEM',
    role: 'Software Developer',
    year: '2025',
    summary: {
      en: 'Modular internal web application built for PT Sanata System to streamline operational workflows, centralize business data, and replace manual multi-step processes.',
      id: 'Aplikasi web internal modular yang dibangun untuk PT Sanata System guna menyederhanakan alur kerja operasional, memusatkan data bisnis, dan menggantikan proses manual bertahap.',
    },
    highlights: {
      en: [
        'Designed responsive React + TypeScript interfaces with Tailwind CSS for fast daily operational usage.',
        'Integrated Firebase for structured cloud data storage and reliable synchronization across operational modules.',
        'Maintained strict Git branching and code review workflows to keep releases predictable.',
      ],
      id: [
        'Merancang antarmuka React + TypeScript yang responsif dengan Tailwind CSS untuk mendukung penggunaan operasional harian yang cepat.',
        'Mengintegrasikan Firebase untuk penyimpanan data cloud yang terstruktur dan sinkronisasi andal antar modul operasional.',
        'Menerapkan alur kerja branching Git dan code review yang rapi agar setiap rilis tetap terprediksi.',
      ],
    },
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Firebase'],
  },
]
