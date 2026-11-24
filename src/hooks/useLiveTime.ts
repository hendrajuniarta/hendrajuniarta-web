import { useEffect, useState } from 'react'
import { formatLocalTime } from '@/lib/time'

export function useLiveTime(): string {
  const [liveTime, setLiveTime] = useState(() => formatLocalTime())

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setLiveTime(formatLocalTime())
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [])

  return liveTime
}

