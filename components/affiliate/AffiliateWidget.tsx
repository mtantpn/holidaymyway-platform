'use client'

import { useCallback } from 'react'

type Program = 'booking' | 'kayak' | 'viator' | 'insurance'

interface AffiliateWidgetProps {
  program: Program
  label: string
  url: string
  destination?: string
  articleSlug?: string
  placement?: string
}

const programConfig: Record<Program, { icon: string; bg: string; border: string; cta: string }> = {
  booking:   { icon: '🏨', bg: 'bg-blue-50',    border: 'border-blue-200',   cta: 'Find Hotels' },
  kayak:     { icon: '✈️', bg: 'bg-sky-50',     border: 'border-sky-200',    cta: 'Find Flights' },
  viator:    { icon: '🎭', bg: 'bg-purple-50',  border: 'border-purple-200', cta: 'Book Activity' },
  insurance: { icon: '🛡️', bg: 'bg-emerald-50', border: 'border-emerald-200', cta: 'Get Quote' },
}

export default function AffiliateWidget({
  program,
  label,
  url,
  destination = '',
  articleSlug = '',
  placement = '',
}: AffiliateWidgetProps) {
  const config = programConfig[program]

  const handleClick = useCallback(() => {
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      ;(window as any).gtag('event', 'affiliate_click', {
        program,
        article_slug: articleSlug,
        destination,
        placement,
      })
    }

    try {
      const affiliateUrl = new URL(url)
      affiliateUrl.searchParams.set('utm_source', 'holidaymyway')
      affiliateUrl.searchParams.set('utm_medium', 'blog')
      affiliateUrl.searchParams.set('utm_campaign', articleSlug || destination)
      affiliateUrl.searchParams.set('utm_content', placement)
      window.open(affiliateUrl.toString(), '_blank', 'noopener,noreferrer')
    } catch {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }, [program, url, articleSlug, destination, placement])

  return (
    <div className={`rounded-xl border-2 ${config.border} ${config.bg} p-5 my-4`}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-poppins text-base font-semibold text-gray-800">
            {config.icon} {label}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">Opens in partner site</p>
        </div>
        <button
          onClick={handleClick}
          className="shrink-0 rounded-xl bg-holiday-teal px-5 py-2.5 text-sm font-semibold text-white hover:bg-holiday-teal/90 transition-colors"
        >
          {config.cta} →
        </button>
      </div>
    </div>
  )
}
