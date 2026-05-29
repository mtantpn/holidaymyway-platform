'use client'

import { Smartphone, Wifi, ArrowRight } from 'lucide-react'
import { AFFILIATE_LINKS } from '../../lib/affiliates'

interface EsimWidgetProps {
  destination?: string
  articleSlug?: string
}

const esims = [
  {
    key: 'airalo' as const,
    name: 'Airalo',
    tag: 'Most popular',
    tagColor: 'bg-teal-100 text-teal-700',
    commission: '12%',
    cookie: '30 days',
    description: 'The world\'s most recognised eSIM marketplace. Covers 200+ countries.',
    accent: 'border-teal-200',
    cta: 'Get Airalo eSIM',
    ctaStyle: 'bg-teal-600 hover:bg-teal-700',
  },
  {
    key: 'yesim' as const,
    name: 'Yesim',
    tag: '90-day cookie',
    tagColor: 'bg-emerald-100 text-emerald-700',
    commission: '18%',
    cookie: '90 days',
    description: 'Unlimited data plans available. Strong EU coverage. Virtual number included.',
    accent: 'border-emerald-200',
    cta: 'Get Yesim eSIM',
    ctaStyle: 'bg-emerald-600 hover:bg-emerald-700',
  },
  {
    key: 'saily' as const,
    name: 'Saily',
    tag: '15% commission',
    tagColor: 'bg-green-100 text-green-700',
    commission: '15%',
    cookie: '30 days',
    description: 'By Nord Security. Simple pricing, reliable speeds across Europe and beyond.',
    accent: 'border-green-200',
    cta: 'Get Saily eSIM',
    ctaStyle: 'bg-green-600 hover:bg-green-700',
  },
]

function trackClick(program: string, destination: string, articleSlug: string) {
  if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
    ;(window as any).gtag('event', 'affiliate_click', {
      program,
      destination,
      article_slug: articleSlug,
      placement: 'esim_widget',
    })
  }
}

export default function EsimWidget({ destination = '', articleSlug = '' }: EsimWidgetProps) {
  return (
    <div className="my-10 rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-100 bg-gray-50 px-5 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-holiday-teal/10">
          <Smartphone size={18} className="text-holiday-teal" strokeWidth={1.75} />
        </div>
        <div>
          <p className="font-poppins text-sm font-bold text-holiday-navy">
            Stay Connected Abroad — Skip Roaming Charges
          </p>
          <p className="text-xs text-gray-400">
            An eSIM gives you local data from the moment you land. No SIM swapping needed.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="divide-y divide-gray-50">
        {esims.map((esim) => (
          <div key={esim.key} className={`flex items-center gap-4 px-5 py-4 border-l-4 ${esim.accent}`}>
            <Wifi size={18} className="shrink-0 text-gray-400" strokeWidth={1.5} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-poppins text-sm font-semibold text-holiday-navy">{esim.name}</span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${esim.tagColor}`}>
                  {esim.tag}
                </span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{esim.description}</p>
            </div>
            <a
              href={AFFILIATE_LINKS[esim.key]}
              target="_blank"
              rel="noopener noreferrer sponsored"
              onClick={() => trackClick(esim.key, destination, articleSlug)}
              className={`shrink-0 flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-white transition-colors ${esim.ctaStyle}`}
            >
              {esim.cta}
              <ArrowRight size={12} strokeWidth={2.5} />
            </a>
          </div>
        ))}
      </div>

      <p className="px-5 py-2.5 text-[10px] text-gray-400 bg-gray-50 border-t border-gray-100">
        Affiliate links — we earn a small commission if you purchase, at no extra cost to you.{' '}
        <a href="/affiliate-disclosure" className="underline hover:text-gray-600">Learn more</a>
      </p>
    </div>
  )
}
