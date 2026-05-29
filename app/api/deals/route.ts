import { NextResponse } from 'next/server'

// Curated map of IATA codes → display names for popular UK holiday destinations
const DESTINATION_NAMES: Record<string, { name: string; country: string; flag: string }> = {
  // Spain
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
  // Portugal
  FAO: { name: 'Faro / Algarve', country: 'Portugal', flag: '🇵🇹' },
  LIS: { name: 'Lisbon', country: 'Portugal', flag: '🇵🇹' },
  OPO: { name: 'Porto', country: 'Portugal', flag: '🇵🇹' },
  // Greece
  ATH: { name: 'Athens', country: 'Greece', flag: '🇬🇷' },
  HER: { name: 'Crete', country: 'Greece', flag: '🇬🇷' },
  RHO: { name: 'Rhodes', country: 'Greece', flag: '🇬🇷' },
  CFU: { name: 'Corfu', country: 'Greece', flag: '🇬🇷' },
  ZTH: { name: 'Zante', country: 'Greece', flag: '🇬🇷' },
  SKG: { name: 'Thessaloniki', country: 'Greece', flag: '🇬🇷' },
  // Turkey
  AYT: { name: 'Antalya', country: 'Turkey', flag: '🇹🇷' },
  IST: { name: 'Istanbul', country: 'Turkey', flag: '🇹🇷' },
  DLM: { name: 'Dalaman', country: 'Turkey', flag: '🇹🇷' },
  // Italy
  FCO: { name: 'Rome', country: 'Italy', flag: '🇮🇹' },
  ROM: { name: 'Rome', country: 'Italy', flag: '🇮🇹' },
  MXP: { name: 'Milan', country: 'Italy', flag: '🇮🇹' },
  MIL: { name: 'Milan', country: 'Italy', flag: '🇮🇹' },
  NAP: { name: 'Naples', country: 'Italy', flag: '🇮🇹' },
  VCE: { name: 'Venice', country: 'Italy', flag: '🇮🇹' },
  FLR: { name: 'Florence', country: 'Italy', flag: '🇮🇹' },
  PSA: { name: 'Pisa', country: 'Italy', flag: '🇮🇹' },
  BRI: { name: 'Bari', country: 'Italy', flag: '🇮🇹' },
  // France
  CDG: { name: 'Paris', country: 'France', flag: '🇫🇷' },
  PAR: { name: 'Paris', country: 'France', flag: '🇫🇷' },
  NCE: { name: 'Nice', country: 'France', flag: '🇫🇷' },
  MRS: { name: 'Marseille', country: 'France', flag: '🇫🇷' },
  // Netherlands / Belgium
  AMS: { name: 'Amsterdam', country: 'Netherlands', flag: '🇳🇱' },
  BRU: { name: 'Brussels', country: 'Belgium', flag: '🇧🇪' },
  // Central Europe
  PRG: { name: 'Prague', country: 'Czech Republic', flag: '🇨🇿' },
  BUD: { name: 'Budapest', country: 'Hungary', flag: '🇭🇺' },
  VIE: { name: 'Vienna', country: 'Austria', flag: '🇦🇹' },
  ZAG: { name: 'Zagreb', country: 'Croatia', flag: '🇭🇷' },
  SPU: { name: 'Split', country: 'Croatia', flag: '🇭🇷' },
  DBV: { name: 'Dubrovnik', country: 'Croatia', flag: '🇭🇷' },
  WAW: { name: 'Warsaw', country: 'Poland', flag: '🇵🇱' },
  KRK: { name: 'Kraków', country: 'Poland', flag: '🇵🇱' },
  // Scandinavia / Ireland
  CPH: { name: 'Copenhagen', country: 'Denmark', flag: '🇩🇰' },
  ARN: { name: 'Stockholm', country: 'Sweden', flag: '🇸🇪' },
  DUB: { name: 'Dublin', country: 'Ireland', flag: '🇮🇪' },
  // Morocco / N. Africa
  RAK: { name: 'Marrakech', country: 'Morocco', flag: '🇲🇦' },
  CMN: { name: 'Casablanca', country: 'Morocco', flag: '🇲🇦' },
  HRG: { name: 'Hurghada', country: 'Egypt', flag: '🇪🇬' },
  SSH: { name: 'Sharm el-Sheikh', country: 'Egypt', flag: '🇪🇬' },
  // Middle East / Asia
  DXB: { name: 'Dubai', country: 'UAE', flag: '🇦🇪' },
  BKK: { name: 'Bangkok', country: 'Thailand', flag: '🇹🇭' },
  DPS: { name: 'Bali', country: 'Indonesia', flag: '🇮🇩' },
  // Long-haul
  JFK: { name: 'New York', country: 'USA', flag: '🇺🇸' },
  LAX: { name: 'Los Angeles', country: 'USA', flag: '🇺🇸' },
  MIA: { name: 'Miami', country: 'USA', flag: '🇺🇸' },
  CUN: { name: 'Cancún', country: 'Mexico', flag: '🇲🇽' },
  ZNZ: { name: 'Zanzibar', country: 'Tanzania', flag: '🇹🇿' },
  MRU: { name: 'Mauritius', country: 'Mauritius', flag: '🇲🇺' },
}

const WHITELIST = new Set(Object.keys(DESTINATION_NAMES))

export async function GET() {
  const token = process.env.TP_API_TOKEN
  if (!token) return NextResponse.json({ error: 'API token not configured' }, { status: 500 })

  try {
    const res = await fetch(
      `https://api.travelpayouts.com/v2/prices/latest?origin=LON&currency=gbp&limit=100&period_type=month&one_way=true&token=${token}`,
      { next: { revalidate: 21600 } } // cache 6 hours
    )

    if (!res.ok) throw new Error(`TravelPayouts API error: ${res.status}`)

    const json = await res.json()
    const raw: { destination: string; value: number; depart_date: string }[] = json.data ?? []

    // Filter to whitelist destinations only, deduplicate by city name, sort by price
    const seen = new Set<string>()
    const deals = raw
      .filter((d) => WHITELIST.has(d.destination))
      .map((d) => ({
        iata: d.destination,
        ...DESTINATION_NAMES[d.destination],
        price: d.value,
        departDate: d.depart_date,
        kiwiUrl: `https://www.kiwi.com/en/search/results/LON/${d.destination.toLowerCase()}/anytime/no-return?marker=533931&trs=home_deals_kiwi`,
      }))
      .filter((d) => {
        const key = d.name
        if (seen.has(key)) return false
        seen.add(key)
        return true
      })
      .sort((a, b) => a.price - b.price)
      .slice(0, 8)

    return NextResponse.json({ deals, updatedAt: new Date().toISOString() })
  } catch (err) {
    console.error('Flight deals API error:', err)
    return NextResponse.json({ error: 'Failed to fetch deals' }, { status: 500 })
  }
}
