'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Plane, MapPin } from 'lucide-react'

const TP_MARKER = '533931'

const POPULAR = ['Barcelona', 'Corfu', 'Lanzarote', 'Amsterdam', 'Tenerife', 'Cornwall']

const UK_AIRPORTS = [
  { label: 'London (All)', iata: 'LON' },
  { label: 'London Heathrow', iata: 'LHR' },
  { label: 'London Gatwick', iata: 'LGW' },
  { label: 'London Stansted', iata: 'STN' },
  { label: 'Manchester', iata: 'MAN' },
  { label: 'Birmingham', iata: 'BHX' },
  { label: 'Edinburgh', iata: 'EDI' },
  { label: 'Glasgow', iata: 'GLA' },
  { label: 'Bristol', iata: 'BRS' },
  { label: 'Leeds Bradford', iata: 'LBA' },
  { label: 'Newcastle', iata: 'NCL' },
  { label: 'Liverpool', iata: 'LPL' },
  { label: 'Belfast', iata: 'BFS' },
]

function buildKiwiUrl(fromIata: string, destination: string): string {
  const toSlug = destination.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  const kiwiPath = `https://www.kiwi.com/en/search/results/${fromIata}/${toSlug}/anytime/no-return`
  return `https://tp.media/r?marker=${TP_MARKER}&trs=0&p=4114&u=${encodeURIComponent(kiwiPath)}`
}

interface SearchWidgetProps {
  dark?: boolean
}

export default function SearchWidget({ dark = false }: SearchWidgetProps) {
  const [tab, setTab] = useState<'guides' | 'flights'>('guides')
  const [destination, setDestination] = useState('')
  const [fromAirport, setFromAirport] = useState('LON')
  const [flightDest, setFlightDest] = useState('')
  const router = useRouter()

  const handleGuideSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const query = destination.trim()
    if (!query) return
    const slug = query.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    router.push(`/destinations/${slug}`)
  }

  const handleFlightSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!flightDest.trim()) return
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      ;(window as any).gtag('event', 'affiliate_click', {
        program: 'kiwi',
        destination: flightDest,
        placement: 'hero_flight_search',
      })
    }
    window.open(buildKiwiUrl(fromAirport, flightDest), '_blank', 'noopener,noreferrer')
  }

  const handleQuick = (name: string) => {
    const slug = name.toLowerCase().replace(/\s+/g, '-')
    router.push(`/destinations/${slug}`)
  }

  // ── Shared tab button styles ─────────────────────────────────────
  const tabBase = 'flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-colors'
  const tabActive = dark
    ? 'bg-white/20 text-white'
    : 'bg-holiday-teal text-white'
  const tabInactive = dark
    ? 'text-white/60 hover:text-white'
    : 'text-gray-500 hover:text-holiday-navy'

  // ── Shared input / select styles ─────────────────────────────────
  const inputClass = dark
    ? 'flex-1 rounded-xl border border-white/30 bg-white/15 px-4 py-3 text-sm text-white placeholder-white/50 outline-none focus:border-holiday-gold focus:ring-2 focus:ring-holiday-gold/30'
    : 'flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-holiday-teal focus:ring-2 focus:ring-holiday-teal/20'

  const selectClass = dark
    ? 'rounded-xl border border-white/30 bg-white/15 px-3 py-3 text-sm text-white outline-none focus:border-holiday-gold focus:ring-2 focus:ring-holiday-gold/30'
    : 'rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-700 outline-none focus:border-holiday-teal focus:ring-2 focus:ring-holiday-teal/20'

  const btnClass = dark
    ? 'flex items-center gap-2 rounded-xl bg-holiday-gold px-5 py-3 text-sm font-semibold text-holiday-navy hover:bg-holiday-gold/90 transition-colors'
    : 'flex items-center gap-2 rounded-xl bg-holiday-teal px-5 py-3 text-sm font-semibold text-white hover:bg-holiday-teal/90 transition-colors'

  const containerClass = dark
    ? 'rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-5 sm:p-7'
    : 'rounded-2xl bg-white p-5 shadow-2xl sm:p-7'

  const labelClass = dark ? 'text-white/50' : 'text-gray-400'
  const pillBase = dark
    ? 'rounded-full border border-white/25 px-3 py-1 text-xs text-white/70 hover:border-holiday-gold hover:text-holiday-gold transition-colors'
    : 'rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600 hover:border-holiday-teal hover:text-holiday-teal transition-colors'

  return (
    <div className={containerClass}>
      {/* Tabs */}
      <div className="mb-4 flex items-center gap-1">
        <button
          type="button"
          onClick={() => setTab('guides')}
          className={`${tabBase} ${tab === 'guides' ? tabActive : tabInactive}`}
        >
          <MapPin size={13} strokeWidth={2} />
          Holiday Guides
        </button>
        <button
          type="button"
          onClick={() => setTab('flights')}
          className={`${tabBase} ${tab === 'flights' ? tabActive : tabInactive}`}
        >
          <Plane size={13} strokeWidth={2} />
          Search Flights
        </button>
      </div>

      {/* Guide search */}
      {tab === 'guides' && (
        <>
          <form onSubmit={handleGuideSearch} className="flex gap-3">
            <input
              type="text"
              placeholder="e.g. Barcelona, Corfu, Cornwall…"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className={inputClass}
            />
            <button type="submit" className={btnClass}>
              <Search size={16} />
              Search
            </button>
          </form>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className={`text-xs ${labelClass}`}>Popular:</span>
            {POPULAR.map((name) => (
              <button key={name} type="button" onClick={() => handleQuick(name)} className={pillBase}>
                {name}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Flight search */}
      {tab === 'flights' && (
        <>
          <form onSubmit={handleFlightSearch} className="space-y-3">
            <div className="flex gap-3">
              <select
                value={fromAirport}
                onChange={(e) => setFromAirport(e.target.value)}
                className={selectClass}
                aria-label="Departure airport"
              >
                {UK_AIRPORTS.map((a) => (
                  <option key={a.iata} value={a.iata}>{a.label}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Where to? e.g. Barcelona…"
                value={flightDest}
                onChange={(e) => setFlightDest(e.target.value)}
                className={inputClass}
              />
            </div>
            <button type="submit" className={`w-full justify-center ${btnClass}`}>
              <Plane size={16} />
              Search Cheap Flights
            </button>
          </form>
          <p className={`mt-3 text-[11px] ${labelClass}`}>
            Powered by Kiwi.com — compares hundreds of airlines. Affiliate link.
          </p>
        </>
      )}
    </div>
  )
}
