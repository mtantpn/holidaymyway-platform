'use client'

import { useEffect, useRef } from 'react'
import { TrendingUp } from 'lucide-react'

// Kiwi.com "Popular Destinations" widget via TravelPayouts
// Domain: tpwdg.com | shmarker=686940 (Kiwi-specific marker, different from TP marker)
// Colors: primary #0D9488 (teal), bg #FFFFFF (white), form #F8F7F4 (cream) | limit=8
const WIDGET_SRC =
  'https://tpwdg.com/content?currency=gbp&trs=533931&shmarker=686940&locale=en&powered_by=true&from_name=london_gb&limit=8&primary_color=0D9488&results_background_color=FFFFFF&form_background_color=F8F7F4&promo_id=4563&campaign_id=111'

export default function TrendingDestinationsWidget() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const script = document.createElement('script')
    script.src = WIDGET_SRC
    script.async = true
    script.charset = 'utf-8'
    ref.current.appendChild(script)
    return () => {
      // clean up on unmount
      ref.current?.removeChild(script)
    }
  }, [])

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp size={16} className="text-holiday-teal" strokeWidth={2} />
              <p className="text-xs font-semibold uppercase tracking-widest text-holiday-teal">
                Live prices · updated daily
              </p>
            </div>
            <h2 className="font-poppins text-2xl font-bold text-holiday-navy sm:text-3xl">
              Trending Flights from London
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Real prices from hundreds of airlines — click to search and book
            </p>
          </div>
        </div>

        {/* Widget inject point */}
        <div ref={ref} className="w-full" />

        <p className="mt-4 text-xs text-gray-400">
          Prices are indicative and subject to availability. Affiliate links —
          we may earn a commission at no extra cost to you.{' '}
          <a href="/affiliate-disclosure" className="underline hover:text-gray-600">
            Learn more
          </a>
        </p>
      </div>
    </section>
  )
}
