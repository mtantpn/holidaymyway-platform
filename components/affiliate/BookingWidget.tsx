'use client'

import { useEffect, useRef } from 'react'

interface BookingWidgetProps {
  city?: string
  marker?: string
}

export default function BookingWidget({ city = '', marker }: BookingWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const tpMarker = marker ?? process.env.NEXT_PUBLIC_TRAVELPAYOUTS_MARKER ?? ''

  useEffect(() => {
    if (!tpMarker || tpMarker === '000000') return
    const script = document.createElement('script')
    script.async = true
    script.src = `https://tp.media/content?trs=&shmarker=${tpMarker}&locale=en&curr=GBP&powered_by=false&target=price_widget&hotel_city=${encodeURIComponent(city)}&border_radius=8&plain=false&no_labels=false`
    script.charset = 'utf-8'
    if (containerRef.current) {
      containerRef.current.innerHTML = ''
      containerRef.current.appendChild(script)
    }
    return () => {
      if (containerRef.current) containerRef.current.innerHTML = ''
    }
  }, [city, tpMarker])

  return (
    <div className="my-6">
      <h3 className="mb-3 font-poppins text-lg font-semibold text-holiday-navy">
        🏨 Find Hotels in {city || 'Your Destination'}
      </h3>
      <div ref={containerRef} className="min-h-[100px] rounded-xl overflow-hidden bg-gray-50" />
    </div>
  )
}
