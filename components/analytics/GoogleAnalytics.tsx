'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

const COOKIE_NAME = 'hmw_consent'

function hasAnalyticsConsent(): boolean {
  if (typeof document === 'undefined') return false
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) === 'all' : false
}

export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID
  const [consented, setConsented] = useState(false)

  useEffect(() => {
    // Check cookie immediately on mount (returning visitor)
    if (hasAnalyticsConsent()) {
      setConsented(true)
      return
    }

    // Listen for consent granted during this session
    function onConsent(e: Event) {
      const detail = (e as CustomEvent<{ analytics: boolean }>).detail
      if (detail.analytics) setConsented(true)
    }
    window.addEventListener('hmw:consent', onConsent)
    return () => window.removeEventListener('hmw:consent', onConsent)
  }, [])

  // Scroll depth tracking — fires once per milestone per page view
  useEffect(() => {
    if (!consented || !gaId || gaId.startsWith('G-X')) return

    const milestones = new Set<number>()
    const thresholds = [25, 50, 75, 100]

    function onScroll() {
      const scrolled = window.scrollY + window.innerHeight
      const total = document.documentElement.scrollHeight
      const pct = Math.round((scrolled / total) * 100)

      for (const t of thresholds) {
        if (pct >= t && !milestones.has(t)) {
          milestones.add(t)
          if (typeof window.gtag === 'function') {
            window.gtag('event', 'scroll_depth', { depth_threshold: t })
          }
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [consented, gaId])

  if (!consented || !gaId || gaId.startsWith('G-X')) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure'
          });
        `}
      </Script>
    </>
  )
}
