import { siteConfig } from '@/data/siteConfig'

export function formatLocalTime(date: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: siteConfig.timezoneIana,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date)
}

