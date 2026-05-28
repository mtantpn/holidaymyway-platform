'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

const POPULAR = ['Barcelona', 'Corfu', 'Lanzarote', 'Amsterdam', 'Tenerife', 'Cornwall']

interface SearchWidgetProps {
  dark?: boolean
}

export default function SearchWidget({ dark = false }: SearchWidgetProps) {
  const [destination, setDestination] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const query = destination.trim()
    if (!query) return
    const slug = query.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    router.push(`/destinations/${slug}`)
  }

  const handleQuick = (name: string) => {
    const slug = name.toLowerCase().replace(/\s+/g, '-')
    router.push(`/destinations/${slug}`)
  }

  if (dark) {
    return (
      <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-5 sm:p-7">
        <h2 className="mb-4 font-poppins text-lg font-semibold text-white">
          Where do you want to go?
        </h2>
        <form onSubmit={handleSearch} className="flex gap-3">
          <input
            type="text"
            placeholder="e.g. Barcelona, Corfu, Cornwall…"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="flex-1 rounded-xl border border-white/30 bg-white/15 px-4 py-3 text-sm text-white placeholder-white/50 outline-none focus:border-holiday-gold focus:ring-2 focus:ring-holiday-gold/30"
          />
          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-holiday-gold px-5 py-3 text-sm font-semibold text-holiday-navy hover:bg-holiday-gold/90 transition-colors"
          >
            <Search size={16} />
            Search
          </button>
        </form>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-xs text-white/50">Popular:</span>
          {POPULAR.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => handleQuick(name)}
              className="rounded-full border border-white/25 px-3 py-1 text-xs text-white/70 hover:border-holiday-gold hover:text-holiday-gold transition-colors"
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl bg-white p-5 shadow-2xl sm:p-7">
      <h2 className="mb-4 font-poppins text-lg font-semibold text-holiday-navy">
        Where do you want to go?
      </h2>
      <form onSubmit={handleSearch} className="flex gap-3">
        <input
          type="text"
          placeholder="e.g. Barcelona, Corfu, Cornwall…"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-holiday-teal focus:ring-2 focus:ring-holiday-teal/20"
        />
        <button
          type="submit"
          className="flex items-center gap-2 rounded-xl bg-holiday-teal px-5 py-3 text-sm font-semibold text-white hover:bg-holiday-teal/90 transition-colors"
        >
          <Search size={16} />
          Search
        </button>
      </form>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="text-xs text-gray-400">Popular:</span>
        {POPULAR.map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => handleQuick(name)}
            className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600 hover:border-holiday-teal hover:text-holiday-teal transition-colors"
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  )
}
