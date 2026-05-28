'use client'

import { useCallback } from 'react'
import { BedDouble, Plane, Compass, ShieldCheck, ArrowRight, type LucideIcon } from 'lucide-react'

type Program = 'booking' | 'kayak' | 'viator' | 'insurance'

interface AffiliateWidgetProps {
  program: Program
  label: string
  url: string
  destination?: string
  articleSlug?: string
  placement?: string
}

interface ProgramConfig {
  Icon: LucideIcon
  iconBg: string
  iconColor: string
  cardBg: string
  border: string
  cta: string
}

const programConfig: Record<Program, ProgramConfig> = {
  booking: {
    Icon: BedDouble,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    cardBg: 'bg-blue-50',
    border: 'border-blue-200',
    cta: 'Find Hotels',
  },
  kayak: {
    Icon: Plane,
    iconBg: 'bg-sky-100',
    iconColor: 'text-sky-600',
    cardBg: 'bg-sky-50',
    border: 'border-sky-200',
    cta: 'Find Flights',
  },
  viator: {
    Icon: Compass,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    cardBg: 'bg-purple-50',
    border: 'border-purple-200',
    cta: 'See Activities',
  },
  insurance: {
    Icon: ShieldCheck,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    cardBg: 'bg-emerald-50',
    border: 'border-emerald-200',
    cta: 'Get Quote',
  },
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
  const { Icon } = config

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
    <div className={`my-3 flex items-center gap-4 rounded-xl border ${config.border} ${config.cardBg} p-4`}>
      {/* Icon container */}
      <div className={`shrink-0 flex h-10 w-10 items-center justify-center rounded-lg ${config.iconBg}`}>
        <Icon size={20} className={config.iconColor} strokeWidth={1.75} />
      </div>

      {/* Label */}
      <div className="min-w-0 flex-1">
        <p className="font-poppins text-sm font-semibold text-gray-800 leading-tight">{label}</p>
        <p className="mt-0.5 text-xs text-gray-400">Opens on partner site</p>
      </div>

      {/* CTA */}
      <button
        onClick={handleClick}
        className="shrink-0 flex items-center gap-1.5 rounded-lg bg-holiday-teal px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-holiday-teal/90 active:scale-95"
      >
        {config.cta}
        <ArrowRight size={13} strokeWidth={2.5} />
      </button>
    </div>
  )
}
