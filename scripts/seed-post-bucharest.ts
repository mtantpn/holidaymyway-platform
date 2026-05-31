/**
 * seed-post-bucharest.ts
 * Creates 1 new blog post:
 *   Bucharest, Romania — city break guide (Chloe, city-breaks)
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const token = process.env.SANITY_API_WRITE_TOKEN
if (!token) { console.error('\n❌  SANITY_API_WRITE_TOKEN not set\n'); process.exit(1) }

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 's6i0x1s0',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const PEXELS_KEY = process.env.PEXELS_API_KEY!

async function uploadPexels(photoId: number, alt: string): Promise<string> {
  console.log(`  Fetching Pexels #${photoId}…`)
  const url = `https://images.pexels.com/photos/${photoId}/pexels-photo-${photoId}.jpeg?auto=compress&cs=tinysrgb&w=1920`
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Accept': 'image/jpeg,image/*',
    }
  })
  if (!res.ok) throw new Error(`Pexels ${photoId} fetch failed: ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  const asset = await client.assets.upload('image', buf, { filename: `pexels-${photoId}.jpg` })
  console.log(`  ✓ Uploaded ${alt} → ${asset._id}`)
  return asset._id
}

function key(suffix: string) {
  return `bkst-${suffix}-${Math.random().toString(36).slice(2, 7)}`
}

function block(style: string, text: string, extraKey?: string): object {
  return {
    _type: 'block',
    _key: extraKey ?? key('b'),
    style,
    children: [{ _type: 'span', _key: key('s'), text, marks: [] }],
    markDefs: [],
  }
}

function linked(text: string, href: string, surrounding = ''): object {
  const lk = key('lk')
  return {
    _type: 'block',
    _key: key('b'),
    style: 'normal',
    children: [
      ...(surrounding ? [{ _type: 'span', _key: key('s'), text: surrounding + ' ', marks: [] }] : []),
      { _type: 'span', _key: key('s'), text, marks: [lk] },
    ],
    markDefs: [{ _type: 'link', _key: lk, href }],
  }
}

function bold(text: string): object {
  return {
    _type: 'block',
    _key: key('b'),
    style: 'normal',
    children: [{ _type: 'span', _key: key('s'), text, marks: ['strong'] }],
    markDefs: [],
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// POST: BUCHAREST, ROMANIA
// Author: Chloe | Category: city-breaks
// ─────────────────────────────────────────────────────────────────────────────

const KIWI_BUCHAREST = 'https://www.kiwi.com/en/search/results/london-united-kingdom/bucharest-romania/anytime/no-return?marker=533931&trs=blog_citybreak_kiwi'

const bucharestContent = [
  block('normal', "I'll be honest — I wasn't expecting to fall in love with Bucharest. Walking through the Old Town's winding cobblestone streets, watching locals argue passionately over coffee at pavement cafés, and discovering Communist-era architecture standing next to Belle Époque buildings felt like stepping into a city that hasn't been sanitized for tourists. Bucharest is raw, real, and ridiculously affordable. After a week here, I understand why people call it the \"Paris of the East\" — and why savvy travellers keep coming back."),

  block('h2', '✈️ Bucharest is Closer Than You Think'),
  block('normal', "Most UK airports (London, Manchester, Birmingham) have direct flights to Henri Coandă International Airport (OTP), and honestly? The prices are brilliant. I found flights for £45–80 return from London during off-season, and even summer flights hover around £80–120 return. If you're flexible with dates, you can do even better."),
  linked('Book flights here on Kiwi.com for flights to Bucharest →', KIWI_BUCHAREST, '🔍'),
  block('normal', "The flight time is around 2.5 hours, so you're not spending your whole day travelling. Pro tip: Avoid school holidays (Easter, summer, Christmas) if budget is your priority. January–March and September–November are genuinely lovely and way cheaper."),

  block('h2', '🚌 Getting from Airport to City'),
  block('normal', "The airport is 16km north of the city. You have options:"),
  block('normal', "Airport buses (Express 780): £1.50 to Piața Obor (30 mins, frequent) | Ride-share apps (Uber/Bolt): £4–6 to Old Town (25–40 mins depending on traffic) | Organized transfers: Around £8–12 if you book in advance"),
  block('normal', "My recommendation: Take the bus. It's authentic, cheap, and you'll see the city approach as you enter. The locals are helpful if you look confused (and let's be honest, the signs are in Cyrillic)."),

  block('h2', '🏨 Where to Stay: Budget Without Sacrificing Comfort'),
  block('normal', "Old Town (Lipscani) is where you want to be — walkable, historic, packed with restaurants and bars, and surprisingly affordable."),
  bold("Hostels:"),
  block('normal', "Midland Hostel — £18–25/night in dorms, £35–45 private rooms. Brilliant rooftop bar with a view of the Parliament building. Free walking tours leave from here."),
  block('normal', "Happy Nomad Hostel — £17–22/night dorms. Cosy, social atmosphere, great breakfast options nearby."),
  bold("Budget Hotels:"),
  block('normal', "Hotel Amzei — £28–35/night, simple but clean rooms, excellent location near the university."),
  block('normal', "Katyn Hotel — £22–30/night, quirky decor, perfect for Instagram (and your wallet)."),
  bold("Mid-Range:"),
  block('normal', "Hanul Manuc — £40–55/night. Historic inn (opened 1808!), charming courtyard, feels like staying in a museum but a nice one."),
  block('normal', "Honest assessment: You can stay comfortably in Old Town for £20–35/night in budget accommodation, or £40–60/night for nicer hotels. The difference in quality between a £22 hostel and a £50 hotel is smaller than you'd expect."),

  block('h2', '🏛️ Top Things to Do & Visit'),
  bold("Must-See Attractions"),
  block('normal', "Palace of Parliament — £15 entry. Yes, it's intimidating. Massive. Built during Ceaușescu's regime, it's the world's second-largest building (by floor area). Book the English-language tour (1.5 hours). Honestly? It's trippy in the best way — propaganda posters, enormous chandeliers, halls that feel endless. Even if architecture bores you, the story will grab you."),
  block('normal', "Old Town (Lipscani). Free to wander. The heart of Bucharest pre-WWII. Narrow streets, old taverns converted to restaurants, street musicians, tiny bookshops. Get lost here intentionally. Stop at a café, watch people, sip a coffee (£1–2). This is where Bucharest's charm lives."),
  block('normal', "Herastrau Park. Free entry. 50+ hectares of green space with a lake, locals jogging, families with kids, museums hidden in corners. Rent a bike (£3–5 for 2 hours) and explore. Genuinely peaceful."),
  block('normal', "Village Museum (Museu Satului) — £4–5 entry. This shouldn't work as well as it does. It's a collection of 300+ traditional houses from across Romania, transported and reconstructed in the park. You'll see how people actually lived — not from a textbook, but by walking through homes. Brilliant."),
  block('normal', "Romanian Athenæum — Free to look at the exterior, £4–5 if you want to go inside. Neo-Renaissance concert hall, stunning architecture. The golden dome catches the light beautifully in late afternoon."),

  bold("Free Things (And Worth It)"),
  block('normal', "Walk the Dorobanți Park — Locals call it their green lung. Trees, paths, people playing chess on benches."),
  block('normal', "Explore Street Art in Obor & Dorobanți — Bucharest has an underground street art scene. Murals are brilliant."),
  block('normal', "Wander Piața Amzei Market — Fresh produce, local flowers, street food. Go mid-morning when it's busiest."),
  block('normal', "Caturday café — Yes, a cat café. £2 entry, £2–3 coffee. Cuddle rescue cats while sipping."),

  block('h2', '🎯 Activities & Experiences'),
  block('normal', "Free Walking Tour — Tip-based (usually £8–10 suggested). Tours leave from Midland Hostel daily at 10am. Your guide will take you through Old Town, explain the history, show you hidden courtyards, and point out the best local spots. Genuinely worth it — the history is fascinating and tragic."),
  block('normal', "Danube Delta Day Trip — £40–60 with organized tours. Bucharest is technically on the Danube. Day trips go to the Danube Delta (wetlands, wildlife, villages). Worth it if you want nature, but skip if you've got limited time — Old Town is more iconic."),
  block('normal', "Cooking Class — £35–50 per person. Local cooks teach traditional Romanian dishes (mici, sarmale, papanasi). Includes a meal. You'll leave knowing how to make something delicious."),
  block('normal', "Local Brewery Tour — £15–20. Romania has decent beer. Craft breweries have opened in recent years. Stella Artois dominates, but local brews are worth trying."),

  block('h2', '🍽️ Food & Dining: Eat Like a Local Without Spending Like a Tourist'),
  block('normal', "This is where Bucharest shines."),
  bold("Budget Eats:"),
  block('normal', "Mici (Romanian grilled meat rolls) from street vendors: £1–2 | Polenta with cheese (mămăligă) from hole-in-the-wall places: £1.50–3 | Pita sandwiches (shawarma-style): £2–4 | Pizza slice at corner places: £1.50–2.50"),
  bold("Proper Sit-Down (Still Cheap):"),
  block('normal', "Hanu' lui Manuc — £8–15 for mains. Touristy but historic, good traditional food."),
  block('normal', "Crame — £6–12 for mains. Local favourite, excellent pork dishes, no English menu (bring Google Translate)."),
  block('normal', "Casa Doina — £10–18 for mains. Traditional Romanian, beautiful courtyard, locals eat here too."),
  bold("Coffee Culture:"),
  block('normal', "Romanian coffee is strong and cheap. A proper espresso: £0.80–1.50. Cappuccino: £1.50–2.50. Sit at a café for 2 hours nursing one coffee, no one rushes you."),
  block('normal', "My meals averaged £5–8 for lunch (mains + drink), £10–15 for dinner (mains + drinks). You could eat for £25–30/day if you focused on budget options, or £40–50/day eating nicely in decent restaurants."),

  block('h2', '🚇 Transport Within the City'),
  block('normal', "Bucharest is walkable, but here's transport if needed:"),
  block('normal', "Metro — £0.50 single journey, £3.50 for 10-journey card. Clean, efficient, goes everywhere."),
  block('normal', "Trams/Buses — Same prices as metro. Vintage trams are charming, buses are reliable."),
  block('normal', "Taxis/Bolt — £1–3 for most city journeys."),
  block('normal', "Bike Rentals — £3–5 for 2 hours, free bike-share stations around the city."),
  block('normal', "Pro tip: Download the transit app \"MobiCare\" or just ask locals. Romanians are genuinely helpful."),

  block('h2', '📋 Practical Information'),
  bold("When to Go:"),
  block('normal', "Spring (April–May): 15–20°C, parks blooming, fewer tourists. Beautiful."),
  block('normal', "Summer (June–August): 25–30°C, warm, crowded in Old Town, but still feels local. Nights are lively."),
  block('normal', "Autumn (September–October): 10–20°C, golden light, crisp air. Honestly my favourite."),
  block('normal', "Winter (November–February): 0–5°C, can snow, quiet, atmospheric. Museums are less crowded."),
  bold("How Long?"),
  block('normal', "2 days: Old Town, Parliament, quick walk through main attractions."),
  block('normal', "3–4 days: What I'd recommend. Time to wander, eat properly, take a free walking tour, visit museums without rushing."),
  block('normal', "5–7 days: Explore beyond Old Town, maybe a Danube trip, actually make friends with cafe owners."),

  block('h2', '💷 Budget Breakdown (4 Days/3 Nights)'),
  block('normal', "Here's what I actually spent:"),
  block('normal', "Flight (London–Bucharest return): £65 | Accommodation (3 nights, midrange hostel): £75 | Meals (breakfast, lunch, dinner): £85 | Attractions (Parliament, Village Museum, etc.): £30 | Transport (metro, trams, local): £12 | Drinks/Cafés: £25 | Miscellaneous: £15"),
  bold("TOTAL: £307"),
  bold("Per day (excluding flight): £61"),
  block('normal', "With flight: ~£77/day for a comfortable city break. If you're in hostels and eating budget food: could do it for £45–50/day total."),

  block('h2', '💡 Local Tips & Insider Insights'),
  block('normal', "— Don't miss sunset from Herastrau Park. Golden hour hits the water beautifully. Take a bottle of wine (shop-bought, £2–4) and watch the city light up."),
  block('normal', "— Cash is still king in some places. Bring some RON. Not everything accepts cards, and ATM fees can bite you."),
  block('normal', "— Romanians are blunt but warm. What seems rude might just be honest directness. They're actually genuinely kind once you engage."),
  block('normal', "— The Parliament building photography is tricky. Photos from outside are fine, but inside tours have restrictions. Just follow the guide's lead."),
  block('normal', "— Coffee culture is real here. Romanians linger. Sit down, order coffee, watch life happen. That's the experience."),
  block('normal', "— Visit on a weeknight, not weekends. Weekends get packed with stag parties (it's become a thing). Weeknights feel more authentic."),
  block('normal', "— Papanasi are life-changing. They're fried dough with sour cream and jam. They're unhealthy and delicious. Order them."),

  block('h2', '🎒 Final Thoughts'),
  block('normal', "Bucharest surprised me. It's not polished like Prague or Rome. It's rougher, more honest, and somehow more real. You'll see Soviet-era blocks next to centuries-old houses. You'll overhear passionate arguments in cafés. You'll get lost in the Old Town and accidentally discover a perfect little restaurant where you're the only foreigner."),
  block('normal', "It's a city that's still figuring out who it wants to be, and that's kind of beautiful. Plus, the money stretches far here — brilliant food, interesting attractions, and genuine warmth from locals who are just living their lives."),
  block('normal', "If you want a city break that doesn't cost the earth, doesn't feel mass-produced, and gives you actual stories to tell? Bucharest is it."),

  linked('Ready to book? Find your flights to Bucharest on Kiwi.com →', KIWI_BUCHAREST),
  block('normal', "Have you been to Bucharest? Or thinking about going? Drop a comment below — I'd love to hear what you'd add to this guide."),
  block('normal', "Until the next adventure,"),
  block('normal', "Chloe"),
]

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────

async function getRef(type: string, field: string, value: string) {
  const res = await client.fetch(`*[_type == $type && ${field} == $value][0]._id`, { type, value })
  return res ? { _type: 'reference', _ref: res } : null
}

async function main() {
  console.log('\n🌍  Seeding Bucharest city break post…\n')

  // Upload image
  console.log('📸  Uploading image…')
  const bucharestImgId = await uploadPexels(3803517, 'Bucharest Old Town Romania')

  // Resolve references
  console.log('\n🔗  Resolving references…')
  const chloe = await getRef('author', 'slug.current', 'chloe')
  const cityBreaksCat = await getRef('category', 'slug.current', 'city-breaks')

  console.log('  Chloe:', chloe?._ref ?? 'NOT FOUND')
  console.log('  City Breaks category:', cityBreaksCat?._ref ?? 'NOT FOUND')

  // ── Post: Bucharest ──
  console.log('\n✍️   Creating Bucharest post…')
  const bucharestDoc = {
    _id: 'seed-post-bucharest-city-break',
    _type: 'article',
    title: 'Bucharest City Break Guide: Romania\'s Charismatic Capital (Less Money Than You\'d Think)',
    slug: { _type: 'slug', current: 'bucharest-city-break-guide-romania' },
    status: 'published',
    publishedAt: new Date('2026-05-31').toISOString(),
    excerpt: 'Walking through Old Town\'s cobblestone streets, discovering Communist-era architecture beside Belle Époque buildings, and eating like a local for £10/day. Bucharest is raw, real, and ridiculously affordable.',
    seoTitle: 'Bucharest City Break Guide 2026 — Budget Travel to Romania | Dose of Holiday',
    seoDescription: 'Complete guide to a city break in Bucharest, Romania for UK travellers. Cheap flights from £45–80, where to stay, what to do, food recommendations, and a full budget breakdown for 3–4 days.',
    readTime: 12,
    author: chloe,
    category: cityBreaksCat,
    featuredImage: {
      _type: 'image',
      asset: { _type: 'reference', _ref: bucharestImgId },
      alt: 'Bucharest Old Town — colourful buildings and cobblestone streets, Lipscani quarter',
    },
    content: bucharestContent,
    faqs: [
      { question: 'Is Bucharest safe to visit?', answer: 'Yes. Bucharest is considered safe for tourists. The Old Town is busy with visitors and well-patrolled. Standard city precautions apply — watch your pockets in crowded markets, don\'t leave things unattended. Solo travellers, including women, consistently report feeling comfortable here.' },
      { question: 'Do I need a visa for Romania?', answer: 'No. UK citizens can enter Romania visa-free for up to 90 days within 180 days. You just need a valid passport. This makes it extremely flexible for city break visits.' },
      { question: 'What\'s the best time to visit Bucharest?', answer: 'April–June and September–October are ideal — mild temperatures (15–25°C), lower prices than summer, and the city at its most pleasant. July and August are peak season and can be very hot (30°C+). The autumn light is particularly gorgeous for photography.' },
      { question: 'Can I use my UK bank card in Bucharest?', answer: 'Yes, Visa and Mastercard work widely in the city. ATMs are common everywhere. Always carry some Romanian Lei (RON) cash for markets and smaller restaurants. Avoid airport exchange desks — the rates are poor.' },
      { question: 'Is Bucharest different from other Eastern European cities?', answer: 'Yes — it\'s grittier and less "polished" than Prague or Budapest. It hasn\'t been sanitized for mass tourism, which is both its charm and its character. You get authentic Romanian culture, real street life, and genuinely friendly locals. It\'s not a fairy-tale city; it\'s a real one.' },
    ],
    affiliateLinks: [
      { platform: 'Kiwi.com', url: KIWI_BUCHAREST, label: 'Search cheap flights to Bucharest' },
    ],
  }

  await client.createOrReplace(bucharestDoc)
  console.log('  ✓ Bucharest post created')

  console.log('\n✅  Bucharest post published successfully!\n')
  console.log('Bucharest: /blog/bucharest-city-break-guide-romania')
}

main().catch((err) => {
  console.error('\n❌  Error:', err.message)
  process.exit(1)
})
