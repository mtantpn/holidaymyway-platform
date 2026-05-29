'use client'

import { Car, ArrowRight, Star } from 'lucide-react'
import { AFFILIATE_LINKS } from '../../lib/affiliates'

interface TransferWidgetProps {
  destination: string
  articleSlug?: string
}

function trackClick(program: string, destination: string, articleSlug: string) {
  if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
    ;(window as any).gtag('event', 'affiliate_click', {
      program,
      destination,
      article_slug: articleSlug,
      placement: 'transfer_widget',
    })
  }
}

const transfers = [
  {
    key: 'kiwitaxi' as const,
    name: 'Kiwitaxi',
    tag: 'Best value',
    tagColor: 'bg-indigo-100 text-indigo-700',
    description: 'Fixed-price airport transfers. No hidden fees, meet-and-greet included.',
    cta: 'Book Transfer',
    ctaStyle: 'bg-indigo-600 hover:bg-indigo-700',
  },
  {
    key: 'welcomePickups' as const,
    name: 'Welcome Pickups',
    tag: 'Premium',
    tagColor: 'bg-blue-100 text-blue-700',
    description: 'English-speaking drivers, flight monitoring, free waiting time if delayed.',
    cta: 'Book Pickup',
    ctaStyle: 'bg-blue-600 hover:bg-blue-700',
  },
]

export default function TransferWidget({ destination, articleSlug = '' }: TransferWidgetProps) {
  return (
    <div className="my-8 rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 border-b border-gray-100 bg-gray-50 px-5 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-holiday-navy/10">
          <Car size={18} className="text-holiday-navy" strokeWidth={1.75} />
        </div>
        <div>
          <p className="font-poppins text-sm font-bold text-holiday-navy">
            Airport Transfer to {destination}
          </p>
          <p className="text-xs text-gray-400">
            Pre-book for a fixed price — no taxi queues, no surprises
          </p>
        </div>
      </div>

      <div className="divide-y divide-gray-50">
        {transfers.map((t) => (
          <div key={t.key} className="flex items-center gap-4 px-5 py-4">
            <Star size={16} className="shrink-0 text-holiday-gold" strokeWidth={1.75} fill="currentColor" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-poppins text-sm font-semibold text-holiday-navy">{t.name}</span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${t.tagColor}`}>
                  {t.tag}
                </span>
              </div>
              <p className="text-xs text-gray-500">{t.description}</p>
            </div>
            <a
              href={AFFILIATE_LINKS[t.key]}
              target="_blank"
              rel="noopener noreferrer sponsored"
              onClick={() => trackClick(t.key, destination, articleSlug)}
              className={`shrink-0 flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-white transition-colors ${t.ctaStyle}`}
            >
              {t.cta}
              <ArrowRight size={12} strokeWidth={2.5} />
            </a>
          </div>
        ))}
      </div>

      <p className="px-5 py-2.5 text-[10px] text-gray-400 bg-gray-50 border-t border-gray-100">
        Affiliate links — commission earned at no extra cost to you.{' '}
        <a href="/affiliate-disclosure" className="underline hover:text-gray-600">Learn more</a>
      </p>
    </div>
  )
}
