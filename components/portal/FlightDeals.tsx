import { TrendingDown, ExternalLink } from 'lucide-react'

interface Deal {
  iata: string
  name: string
  country: string
  flag: string
  price: number
  kiwiUrl: string
}

const DESTINATION_NAMES: Record<string, { name: string; country: string; flag: string }> = {
  BCN: { name: 'Barcelona', country: 'Spain', flag: '🇪🇸' },
  PMI: { name: 'Mallorca', country: 'Spain', flag: '🇪🇸' },
  ALC: { name: 'Alicante', country: 'Spain', flag: '🇪🇸' },
  AGP: { name: 'Málaga', country: 'Spain', flag: '🇪🇸' },
  TFS: { name: 'Tenerife', country: 'Spain', flag: '🇪🇸' },
  LPA: { name: 'Gran Canaria', country: 'Spain', flag: '🇪🇸' },
  IBZ: { name: 'Ibiza', country: 'Spain', flag: '🇪🇸' },
  MAD: { name: 'Madrid', country: 'Spain', flag: '🇪🇸' },
  SVQ: { name: 'Seville', country: 'Spain', flag: '🇪🇸' },
  VLC: { name: 'Valencia', country: 'Spain', flag: '🇪🇸' },
  FAO: { name: 'Faro / Algarve', country: 'Portugal', flag: '🇵🇹' },
  LIS: { name: 'Lisbon', country: 'Portugal', flag: '🇵🇹' },
  OPO: { name: 'Porto', country: 'Portugal', flag: '🇵🇹' },
  ATH: { name: 'Athens', country: 'Greece', flag: '🇬🇷' },
  HER: { name: 'Crete', country: 'Greece', flag: '🇬🇷' },
  RHO: { name: 'Rhodes', country: 'Greece', flag: '🇬🇷' },
  CFU: { name: 'Corfu', country: 'Greece', flag: '🇬🇷' },
  ZTH: { name: 'Zante', country: 'Greece', flag: '🇬🇷' },
  SKG: { name: 'Thessaloniki', country: 'Greece', flag: '🇬🇷' },
  AYT: { name: 'Antalya', country: 'Turkey', flag: '🇹🇷' },
  IST: { name: 'Istanbul', country: 'Turkey', flag: '🇹🇷' },
  DLM: { name: 'Dalaman', country: 'Turkey', flag: '🇹🇷' },
  FCO: { name: 'Rome', country: 'Italy', flag: '🇮🇹' },
  ROM: { name: 'Rome', country: 'Italy', flag: '🇮🇹' },
  MXP: { name: 'Milan', country: 'Italy', flag: '🇮🇹' },
  MIL: { name: 'Milan', country: 'Italy', flag: '🇮🇹' },
  NAP: { name: 'Naples', country: 'Italy', flag: '🇮🇹' },
  VCE: { name: 'Venice', country: 'Italy', flag: '🇮🇹' },
  FLR: { name: 'Florence', country: 'Italy', flag: '🇮🇹' },
  PSA: { name: 'Pisa', country: 'Italy', flag: '🇮🇹' },
  CDG: { name: 'Paris', country: 'France', flag: '🇫🇷' },
  PAR: { name: 'Paris', country: 'France', flag: '🇫🇷' },
  NCE: { name: 'Nice', country: 'France', flag: '🇫🇷' },
  AMS: { name: 'Amsterdam', country: 'Netherlands', flag: '🇳🇱' },
  BRU: { name: 'Brussels', country: 'Belgium', flag: '🇧🇪' },
  PRG: { name: 'Prague', country: 'Czech Republic', flag: '🇨🇿' },
  BUD: { name: 'Budapest', country: 'Hungary', flag: '🇭🇺' },
  VIE: { name: 'Vienna', country: 'Austria', flag: '🇦🇹' },
  ZAG: { name: 'Zagreb', country: 'Croatia', flag: '🇭🇷' },
  SPU: { name: 'Split', country: 'Croatia', flag: '🇭🇷' },
  DBV: { name: 'Dubrovnik', country: 'Croatia', flag: '🇭🇷' },
  WAW: { name: 'Warsaw', country: 'Poland', flag: '🇵🇱' },
  KRK: { name: 'Kraków', country: 'Poland', flag: '🇵🇱' },
  CPH: { name: 'Copenhagen', country: 'Denmark', flag: '🇩🇰' },
  ARN: { name: 'Stockholm', country: 'Sweden', flag: '🇸🇪' },
  DUB: { name: 'Dublin', country: 'Ireland', flag: '🇮🇪' },
  RAK: { name: 'Marrakech', country: 'Morocco', flag: '🇲🇦' },
  HRG: { name: 'Hurghada', country: 'Egypt', flag: '🇪🇬' },
  SSH: { name: 'Sharm el-Sheikh', country: 'Egypt', flag: '🇪🇬' },
  DXB: { name: 'Dubai', country: 'UAE', flag: '🇦🇪' },
  BKK: { name: 'Bangkok', country: 'Thailand', flag: '🇹🇭' },
  DPS: { name: 'Bali', country: 'Indonesia', flag: '🇮🇩' },
  JFK: { name: 'New York', country: 'USA', flag: '🇺🇸' },
  CUN: { name: 'Cancún', country: 'Mexico', flag: '🇲🇽' },
  ZNZ: { name: 'Zanzibar', country: 'Tanzania', flag: '🇹🇿' },
  MRU: { name: 'Mauritius', country: 'Mauritius', flag: '🇲🇺' },
}

const WHITELIST = new Set(Object.keys(DESTINATION_NAMES))

async function fetchDeals(): Promise<Deal[]> {
  const token = process.env.TP_API_TOKEN
  if (!token) return []
  try {
    const res = await fetch(
      `https://api.travelpayouts.com/v2/prices/latest?origin=LON&currency=gbp&limit=100&period_type=month&one_way=true&token=${token}`,
      { next: { revalidate: 21600 } }
    )
    if (!res.ok) return []
    const json = await res.json()
    const raw: { destination: string; value: number }[] = json.data ?? []

    const seen = new Set<string>()
    return raw
      .filter((d) => WHITELIST.has(d.destination))
      .map((d) => ({
        iata: d.destination,
        ...DESTINATION_NAMES[d.destination],
        price: d.value,
        kiwiUrl: `https://www.kiwi.com/en/search/results/LON/${d.destination.toLowerCase()}/anytime/no-return?marker=533931&trs=home_deals_kiwi`,
      }))
      .filter((d) => {
        if (seen.has(d.name)) return false
        seen.add(d.name)
        return true
      })
      .sort((a, b) => a.price - b.price)
      .slice(0, 8)
  } catch {
    return []
  }
}

export default async function FlightDeals() {
  const deals = await fetchDeals()
  if (!deals.length) return null

  return (
    <div className="mt-6 w-full max-w-2xl">
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <TrendingDown size={14} className="text-holiday-gold" strokeWidth={2.5} />
          <span className="text-[11px] font-semibold uppercase tracking-wider text-white/65">
            Cheapest flights from London right now
          </span>
        </div>
        <span className="text-[10px] text-white/30">Kiwi.com</span>
      </div>

      <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar">
        {deals.map((deal) => (
          <a
            key={deal.iata}
            href={deal.kiwiUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="group shrink-0 flex flex-col justify-between
                       rounded-xl bg-white/10 backdrop-blur-sm border border-white/15
                       px-3.5 py-3 w-[125px]
                       hover:bg-white/18 hover:border-holiday-gold/60
                       transition-all duration-150 active:scale-95 cursor-pointer"
          >
            <div>
              <span className="text-xl leading-none select-none">{deal.flag}</span>
              <p className="mt-1.5 text-[12px] font-semibold text-white leading-tight line-clamp-2">
                {deal.name}
              </p>
              <p className="text-[10px] text-white/45 mt-0.5 truncate">{deal.country}</p>
            </div>
            <div className="mt-2.5 flex items-end justify-between">
              <div>
                <p className="text-[9px] text-white/40 leading-none">from</p>
                <p className="font-poppins text-[15px] font-bold text-holiday-gold leading-snug">
                  £{deal.price}
                </p>
              </div>
              <ExternalLink
                size={10}
                className="text-white/25 group-hover:text-holiday-gold/70 transition-colors mb-0.5"
              />
            </div>
          </a>
        ))}
      </div>

      <p className="mt-2 px-1 text-[10px] text-white/25 leading-relaxed">
        Indicative prices, updated daily. Affiliate links.{' '}
        <a href="/affiliate-disclosure" className="underline hover:text-white/45 transition-colors">
          Learn more
        </a>
      </p>
    </div>
  )
}
