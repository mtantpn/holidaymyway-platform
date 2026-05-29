'use client'

import { useCallback } from 'react'
import {
  BedDouble, Plane, Compass, ShieldCheck, Smartphone,
  Car, MapPin, Luggage, Headphones, Ticket, ArrowRight,
  type LucideIcon,
} from 'lucide-react'

export type Program =
  | 'booking' | 'kayak' | 'kiwi'
  | 'viator' | 'klook' | 'tiqets' | 'wegotrip' | 'goCity'
  | 'airalo' | 'yesim' | 'saily'
  | 'kiwitaxi' | 'welcomePickups' | 'getTransfer' | 'intui'
  | 'getRentacar' | 'localrent' | 'autoEurope' | 'qeeq'
  | 'ekta' | 'airhelp' | 'compensair'
  | 'radicalStorage' | 'searadar' | 'nordvpn'

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
  // Accommodation
  booking: {
    Icon: BedDouble, iconBg: 'bg-blue-100', iconColor: 'text-blue-600',
    cardBg: 'bg-blue-50', border: 'border-blue-200', cta: 'Find Hotels',
  },
  // Flights
  kayak: {
    Icon: Plane, iconBg: 'bg-sky-100', iconColor: 'text-sky-600',
    cardBg: 'bg-sky-50', border: 'border-sky-200', cta: 'Compare Flights',
  },
  kiwi: {
    Icon: Plane, iconBg: 'bg-cyan-100', iconColor: 'text-cyan-600',
    cardBg: 'bg-cyan-50', border: 'border-cyan-200', cta: 'Find Cheap Flights',
  },
  // Activities & experiences
  viator: {
    Icon: Compass, iconBg: 'bg-purple-100', iconColor: 'text-purple-600',
    cardBg: 'bg-purple-50', border: 'border-purple-200', cta: 'Browse Activities',
  },
  klook: {
    Icon: Ticket, iconBg: 'bg-rose-100', iconColor: 'text-rose-600',
    cardBg: 'bg-rose-50', border: 'border-rose-200', cta: 'Book Experiences',
  },
  tiqets: {
    Icon: Ticket, iconBg: 'bg-orange-100', iconColor: 'text-orange-600',
    cardBg: 'bg-orange-50', border: 'border-orange-200', cta: 'Skip the Queue',
  },
  wegotrip: {
    Icon: Headphones, iconBg: 'bg-violet-100', iconColor: 'text-violet-600',
    cardBg: 'bg-violet-50', border: 'border-violet-200', cta: 'Get Audio Guide',
  },
  goCity: {
    Icon: Ticket, iconBg: 'bg-yellow-100', iconColor: 'text-yellow-700',
    cardBg: 'bg-yellow-50', border: 'border-yellow-200', cta: 'View City Pass',
  },
  // eSIMs
  airalo: {
    Icon: Smartphone, iconBg: 'bg-teal-100', iconColor: 'text-teal-600',
    cardBg: 'bg-teal-50', border: 'border-teal-200', cta: 'Get eSIM',
  },
  yesim: {
    Icon: Smartphone, iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600',
    cardBg: 'bg-emerald-50', border: 'border-emerald-200', cta: 'Get eSIM',
  },
  saily: {
    Icon: Smartphone, iconBg: 'bg-green-100', iconColor: 'text-green-600',
    cardBg: 'bg-green-50', border: 'border-green-200', cta: 'Get eSIM',
  },
  // Transfers
  kiwitaxi: {
    Icon: MapPin, iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600',
    cardBg: 'bg-indigo-50', border: 'border-indigo-200', cta: 'Book Transfer',
  },
  welcomePickups: {
    Icon: MapPin, iconBg: 'bg-blue-100', iconColor: 'text-blue-600',
    cardBg: 'bg-blue-50', border: 'border-blue-200', cta: 'Book Pickup',
  },
  getTransfer: {
    Icon: MapPin, iconBg: 'bg-sky-100', iconColor: 'text-sky-600',
    cardBg: 'bg-sky-50', border: 'border-sky-200', cta: 'Compare Transfers',
  },
  intui: {
    Icon: MapPin, iconBg: 'bg-slate-100', iconColor: 'text-slate-600',
    cardBg: 'bg-slate-50', border: 'border-slate-200', cta: 'Book Transfer',
  },
  // Car hire
  getRentacar: {
    Icon: Car, iconBg: 'bg-amber-100', iconColor: 'text-amber-600',
    cardBg: 'bg-amber-50', border: 'border-amber-200', cta: 'Compare Car Hire',
  },
  localrent: {
    Icon: Car, iconBg: 'bg-orange-100', iconColor: 'text-orange-600',
    cardBg: 'bg-orange-50', border: 'border-orange-200', cta: 'Rent a Car',
  },
  autoEurope: {
    Icon: Car, iconBg: 'bg-red-100', iconColor: 'text-red-600',
    cardBg: 'bg-red-50', border: 'border-red-200', cta: 'Find Car Hire',
  },
  qeeq: {
    Icon: Car, iconBg: 'bg-rose-100', iconColor: 'text-rose-600',
    cardBg: 'bg-rose-50', border: 'border-rose-200', cta: 'Search Car Hire',
  },
  // Insurance & compensation
  ekta: {
    Icon: ShieldCheck, iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600',
    cardBg: 'bg-emerald-50', border: 'border-emerald-200', cta: 'Get Quote',
  },
  airhelp: {
    Icon: ShieldCheck, iconBg: 'bg-blue-100', iconColor: 'text-blue-700',
    cardBg: 'bg-blue-50', border: 'border-blue-200', cta: 'Check Claim',
  },
  compensair: {
    Icon: ShieldCheck, iconBg: 'bg-violet-100', iconColor: 'text-violet-600',
    cardBg: 'bg-violet-50', border: 'border-violet-200', cta: 'Check Claim',
  },
  // Niche
  radicalStorage: {
    Icon: Luggage, iconBg: 'bg-stone-100', iconColor: 'text-stone-600',
    cardBg: 'bg-stone-50', border: 'border-stone-200', cta: 'Store Luggage',
  },
  searadar: {
    Icon: Compass, iconBg: 'bg-cyan-100', iconColor: 'text-cyan-700',
    cardBg: 'bg-cyan-50', border: 'border-cyan-200', cta: 'Rent a Boat',
  },
  nordvpn: {
    Icon: ShieldCheck, iconBg: 'bg-gray-100', iconColor: 'text-gray-700',
    cardBg: 'bg-gray-50', border: 'border-gray-200', cta: 'Get Protected',
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
      affiliateUrl.searchParams.set('utm_source', 'doseofholiday')
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
      <div className={`shrink-0 flex h-10 w-10 items-center justify-center rounded-lg ${config.iconBg}`}>
        <Icon size={20} className={config.iconColor} strokeWidth={1.75} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-poppins text-sm font-semibold text-gray-800 leading-tight">{label}</p>
        <p className="mt-0.5 text-xs text-gray-400">Opens on partner site</p>
      </div>
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
