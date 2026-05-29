import { Plane, TrendingDown, ExternalLink } from 'lucide-react'

interface Deal {
  iata: string
  name: string
  country: string
  flag: string
  price: number
  departDate: string
  kiwiUrl: string
}

async function getDeals(): Promise<Deal[]> {
  try {
    const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.doseofholiday.com'
    const res = await fetch(`${base}/api/deals`, {
      next: { revalidate: 21600 },
    })
    if (!res.ok) return []
    const json = await res.json()
    return json.deals ?? []
  } catch {
    return []
  }
}

export default async function FlightDeals() {
  const deals = await getDeals()
  if (!deals.length) return null

  return (
    <div className="mt-8 w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <TrendingDown size={15} className="text-holiday-gold" strokeWidth={2} />
          <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
            Cheapest flights from London right now
          </span>
        </div>
        <span className="text-[10px] text-white/35">Powered by Kiwi.com</span>
      </div>

      {/* Deal cards — horizontal scroll on mobile */}
      <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
        {deals.map((deal) => (
          <a
            key={deal.iata}
            href={deal.kiwiUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="group shrink-0 flex flex-col justify-between
                       rounded-xl bg-white/10 backdrop-blur-sm border border-white/15
                       px-4 py-3 min-w-[130px] max-w-[140px]
                       hover:bg-white/20 hover:border-holiday-gold/50
                       transition-all duration-200 active:scale-95"
          >
            <div>
              <span className="text-lg leading-none">{deal.flag}</span>
              <p className="mt-1.5 text-xs font-semibold text-white leading-tight line-clamp-2">
                {deal.name}
              </p>
              <p className="text-[10px] text-white/50 mt-0.5">{deal.country}</p>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-white/50 leading-none">from</p>
                <p className="font-poppins text-base font-bold text-holiday-gold leading-tight">
                  £{deal.price}
                </p>
              </div>
              <ExternalLink
                size={11}
                className="text-white/30 group-hover:text-holiday-gold transition-colors"
                strokeWidth={2}
              />
            </div>
          </a>
        ))}
      </div>

      <p className="mt-2 px-1 text-[10px] text-white/25">
        Prices update daily. Affiliate links — we may earn a commission.{' '}
        <a href="/affiliate-disclosure" className="underline hover:text-white/50">
          Learn more
        </a>
      </p>
    </div>
  )
}
