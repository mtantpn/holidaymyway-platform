/**
 * lib/affiliates.ts — Dose of Holiday TravelPayouts Affiliate Link Config
 *
 * HOW TO USE:
 * 1. In TravelPayouts dashboard → "My Programs" → click a program → "Generate links"
 * 2. Generate the base link for that program
 * 3. Paste it in the correct slot below
 * 4. Set NEXT_PUBLIC_TP_MARKER in .env.local (find it in TravelPayouts → Settings → Marker)
 *
 * Priority tiers reflect commission rate × booking intent × UK audience relevance
 */

export const TP_MARKER = process.env.NEXT_PUBLIC_TP_MARKER ?? ''

// ─────────────────────────────────────────────────────────────
// TIER 1 — Must implement. Highest commission + highest intent
// ─────────────────────────────────────────────────────────────

export const AFFILIATE_LINKS = {

  // EKTA Travel Insurance — 25% commission, 30-day cookie
  // Use on: every destination page sidebar, every article CTA, dedicated insurance article
  // Generate at: TravelPayouts → EKTA → Generate links
  ekta: 'https://tp.media/r?marker=YOUR_TP_MARKER&trs=0&p=5841&u=https%3A%2F%2Fekta.life%2Fen%2Ftravel-insurance',

  // WeGoTrip Audio Guides — up to 41.5% commission, 30-day cookie
  // Use on: city break articles, destination pages, "things to do" sections
  // Generate at: TravelPayouts → WeGoTrip → Generate links
  wegotrip: 'https://tp.media/r?marker=YOUR_TP_MARKER&trs=0&p=5953&u=https%3A%2F%2Fwegotrip.com',

  // Yesim eSIM — 18% commission, 90-day cookie (longest in portfolio!)
  // Use on: every destination page, every packing/travel tips article
  yesim: 'https://tp.media/r?marker=YOUR_TP_MARKER&trs=0&p=5977&u=https%3A%2F%2Fyesim.app%2Fen%2F',

  // AirHelp Flight Compensation — 15–16.6% commission, 45-day cookie
  // Use on: budget travel articles, packing tips, "before you fly" content
  airhelp: 'https://tp.media/r?marker=YOUR_TP_MARKER&trs=0&p=5584&u=https%3A%2F%2Fwww.airhelp.com%2Fen-gb%2F',

  // Saily eSIM — 15% commission, 30-day cookie
  // Use on: alongside Airalo and Yesim in eSIM comparison sections
  saily: 'https://tp.media/r?marker=YOUR_TP_MARKER&trs=0&p=6143&u=https%3A%2F%2Fgo.saily.com',

  // Airalo eSIM — 12% commission, 30-day cookie (most recognised brand)
  // Use on: every destination page, packing/travel tips articles
  airalo: 'https://tp.media/r?marker=YOUR_TP_MARKER&trs=0&p=5869&u=https%3A%2F%2Fwww.airalo.com',

  // GetRentacar.com — 10% commission, 90-day cookie (longest for car hire!)
  // Use on: destination pages with driving culture, road trip articles
  getRentacar: 'https://tp.media/r?marker=YOUR_TP_MARKER&trs=0&p=5947&u=https%3A%2F%2Fwww.getrentacar.com',

  // Kiwitaxi Airport Transfers — 9–11% commission, 30-day cookie
  // Use on: every destination page "Getting from the airport" section
  kiwitaxi: 'https://tp.media/r?marker=YOUR_TP_MARKER&trs=0&p=4750&u=https%3A%2F%2Fkiwitaxi.com',

  // Localrent.com — 7.5–12% commission, 30-day cookie
  // Use on: destination pages in Mediterranean/southern Europe (where car hire is essential)
  localrent: 'https://tp.media/r?marker=YOUR_TP_MARKER&trs=0&p=4561&u=https%3A%2F%2Flocalrent.com',

  // ─────────────────────────────────────────────────────────────
  // TIER 2 — High value. Implement after Tier 1 is live.
  // ─────────────────────────────────────────────────────────────

  // Klook Experiences — 2–5% commission, HOT PROGRAM, 7–30-day cookie
  // Use on: every destination page, activity sections, city break articles
  klook: 'https://tp.media/r?marker=YOUR_TP_MARKER&trs=0&p=5837&u=https%3A%2F%2Fwww.klook.com',

  // Tiqets Museum/Attraction Tickets — 3.5–8% commission, 30-day cookie
  // Use on: city break articles, European destination pages (museums, skip-the-line)
  tiqets: 'https://tp.media/r?marker=YOUR_TP_MARKER&trs=0&p=5762&u=https%3A%2F%2Fwww.tiqets.com',

  // Go City Attraction Passes — 3.4–6% commission, 90-day cookie (long cookie!)
  // Use on: major city destination pages (London, Paris, NYC, Dubai, Amsterdam)
  goCity: 'https://tp.media/r?marker=YOUR_TP_MARKER&trs=0&p=5831&u=https%3A%2F%2Fgocity.com%2Fen-gb',

  // Welcome Pickups — 8–9% commission, 45-day cookie (premium transfers)
  // Use on: destination pages alongside Kiwitaxi as the premium option
  welcomePickups: 'https://tp.media/r?marker=YOUR_TP_MARKER&trs=0&p=5438&u=https%3A%2F%2Fwww.welcomepickups.com',

  // GetTransfer.com — 4–25% commission, 30-day cookie (premium = high commission)
  // Use on: long-haul destination pages, luxury/premium travel articles
  getTransfer: 'https://tp.media/r?marker=YOUR_TP_MARKER&trs=0&p=5456&u=https%3A%2F%2Fwww.gettransfer.com',

  // Kiwi.com Flights — 3% commission, 30-day cookie
  // Use on: budget travel articles ("cheapest flights" content), departure city pages
  kiwi: 'https://tp.media/r?marker=YOUR_TP_MARKER&trs=0&p=4114&u=https%3A%2F%2Fwww.kiwi.com',

  // AutoEurope Car Hire — 4.4–8% commission, 30-day cookie (EU/UK focused)
  // Use on: European destination pages as second car hire option
  autoEurope: 'https://tp.media/r?marker=YOUR_TP_MARKER&trs=0&p=5xxx&u=https%3A%2F%2Fwww.autoeurope.co.uk',

  // Radical Storage Luggage — 8% commission, 30-day cookie
  // Use on: city break articles, day trip articles ("store luggage on arrival day")
  radicalStorage: 'https://tp.media/r?marker=YOUR_TP_MARKER&trs=0&p=5xxx&u=https%3A%2F%2Fwww.radicalstorage.com',

  // ─────────────────────────────────────────────────────────────
  // TIER 3 — Niche/situational. Add to specific content types.
  // ─────────────────────────────────────────────────────────────

  // Compensair Flight Compensation — fixed €5–12, 30-day cookie
  // Use on: budget travel articles alongside AirHelp
  compensair: 'https://tp.media/r?marker=YOUR_TP_MARKER&trs=0&p=5xxx&u=https%3A%2F%2Fcompensair.com',

  // GigSky eSIM — 20% fixed, 30-day cookie (third eSIM option)
  // Use on: eSIM comparison article
  gigsky: 'https://tp.media/r?marker=YOUR_TP_MARKER&trs=0&p=5xxx&u=https%3A%2F%2Fwww.gigsky.com',

  // intui.travel Transfers — 10% commission, 35-day cookie
  // Use on: destination pages as third transfer option (if Kiwitaxi/WelcomePickups not available)
  intui: 'https://tp.media/r?marker=YOUR_TP_MARKER&trs=0&p=5xxx&u=https%3A%2F%2Fintui.travel%2Fen',

  // SEARADAR Boat Rentals — 5% commission, 30-day cookie
  // Use on: coastal/island destination pages (Croatia, Greece, Mallorca, Canaries)
  searadar: 'https://tp.media/r?marker=YOUR_TP_MARKER&trs=0&p=5xxx&u=https%3A%2F%2Fsearadar.com',

  // QEEQ Car Hire — 5–10% commission, 30-day cookie
  // Use on: car hire comparison article as third option
  qeeq: 'https://tp.media/r?marker=YOUR_TP_MARKER&trs=0&p=5xxx&u=https%3A%2F%2Fwww.qeeq.com',

  // NordVPN — 5%, 30-day cookie (public WiFi security while travelling)
  // Use on: budget travel tips ("stay safe on public WiFi abroad")
  nordvpn: 'https://tp.media/r?marker=YOUR_TP_MARKER&trs=0&p=5xxx&u=https%3A%2F%2Fnordvpn.com',

  // ─────────────────────────────────────────────────────────────
  // EXISTING (keep — already on site, high brand recognition)
  // ─────────────────────────────────────────────────────────────
  booking: 'https://www.booking.com/?aid=304142',
  kayak: 'https://www.kayak.co.uk/',
  viator: 'https://www.viator.com/',
} as const

export type AffiliateProgram = keyof typeof AFFILIATE_LINKS
