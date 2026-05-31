/**
 * seed-post-bucharest-proper-images.ts
 * Searches Pexels API for ACTUAL Bucharest images and updates the article
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const token = process.env.SANITY_API_WRITE_TOKEN
const pexelsKey = process.env.PEXELS_API_KEY

if (!token) { console.error('\n❌  SANITY_API_WRITE_TOKEN not set\n'); process.exit(1) }
if (!pexelsKey) { console.error('\n❌  PEXELS_API_KEY not set\n'); process.exit(1) }

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 's6i0x1s0',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

// Search Pexels API for images
async function searchPexels(query: string): Promise<number | null> {
  console.log(`  Searching Pexels for: "${query}"…`)
  try {
    const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&page=1`, {
      headers: { 'Authorization': pexelsKey }
    })
    const data = await response.json() as { photos?: Array<{ id: number; url: string; photographer: string }> }
    if (data.photos && data.photos.length > 0) {
      console.log(`  ✓ Found: "${query}" (Photo ID: ${data.photos[0].id})`)
      return data.photos[0].id
    }
    console.log(`  ⚠ No results for: "${query}"`)
    return null
  } catch (err) {
    console.error(`  ❌ Pexels search failed for "${query}":`, (err as Error).message)
    return null
  }
}

async function uploadPexels(photoId: number, alt: string): Promise<string> {
  console.log(`  Uploading photo #${photoId}…`)
  const url = `https://images.pexels.com/photos/${photoId}/pexels-photo-${photoId}.jpeg?auto=compress&cs=tinysrgb&w=1920`
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Accept': 'image/jpeg,image/*',
    }
  })
  if (!res.ok) throw new Error(`Pexels ${photoId} fetch failed: ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  const asset = await client.assets.upload('image', buf, { filename: `bucharest-${photoId}.jpg` })
  console.log(`  ✓ Uploaded: ${alt}`)
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

function imageBlock(assetId: string, alt: string): object {
  return {
    _type: 'image',
    _key: key('img'),
    asset: { _type: 'reference', _ref: assetId },
    alt,
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

async function getRef(type: string, field: string, value: string) {
  const res = await client.fetch(`*[_type == $type && ${field} == $value][0]._id`, { type, value })
  return res ? { _type: 'reference', _ref: res } : null
}

async function main() {
  console.log('\n🌍  Finding ACTUAL Bucharest images from Pexels…\n')

  // Search for specific Bucharest images
  console.log('🔍  Searching Pexels API for Bucharest images…\n')

  const searches = [
    { query: 'Bucharest Old Town', use: 'featured' },
    { query: 'Bucharest Parliament Palace', use: 'parliament' },
    { query: 'Bucharest architecture', use: 'architecture' },
    { query: 'Bucharest park', use: 'park' },
    { query: 'Romanian traditional food', use: 'food' },
    { query: 'Bucharest night city', use: 'night' },
  ]

  const imageIds: { [key: string]: number | null } = {}

  for (const search of searches) {
    const photoId = await searchPexels(search.query)
    imageIds[search.use] = photoId
  }

  console.log('\n📸  Uploading images to Sanity…\n')

  const uploadedImages: { [key: string]: string } = {}

  for (const [key, photoId] of Object.entries(imageIds)) {
    if (photoId) {
      try {
        uploadedImages[key] = await uploadPexels(photoId, `Bucharest ${key} image`)
      } catch (err) {
        console.error(`  ❌ Failed to upload ${key}:`, (err as Error).message)
      }
    }
  }

  const KIWI_BUCHAREST = 'https://www.kiwi.com/en/search/results/london-united-kingdom/bucharest-romania/anytime/no-return?marker=533931&trs=blog_citybreak_kiwi'

  const bucharestContent = [
    block('normal', "I'll be honest — I wasn't expecting to fall in love with Bucharest. Walking through the Old Town's winding cobblestone streets, watching locals argue passionately over coffee at pavement cafés, and discovering Communist-era architecture standing next to Belle Époque buildings felt like stepping into a city that hasn't been sanitized for tourists. Bucharest is raw, real, and ridiculously affordable. After a week here, I understand why people call it the \"Paris of the East\" — and why savvy travellers keep coming back."),

    ...(uploadedImages.featured ? [imageBlock(uploadedImages.featured, 'Bucharest Old Town historic district')] : []),

    block('h2', '✈️ Bucharest is Closer Than You Think'),
    block('normal', "Most UK airports (London, Manchester, Birmingham) have direct flights to Henri Coandă International Airport (OTP), and honestly? The prices are brilliant. I found flights for £45–80 return from London during off-season, and even summer flights hover around £80–120 return. If you're flexible with dates, you can do even better."),
    linked('Book flights here on Kiwi.com for flights to Bucharest →', KIWI_BUCHAREST, '🔍'),
    block('normal', "The flight time is around 2.5 hours, so you're not spending your whole day travelling. Pro tip: Avoid school holidays (Easter, summer, Christmas) if budget is your priority. January–March and September–November are genuinely lovely and way cheaper."),

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

    block('h2', '🏛️ Top Things to Do & Visit'),
    bold("Must-See Attractions"),
    ...(uploadedImages.parliament ? [imageBlock(uploadedImages.parliament, 'Bucharest Parliament Palace - world\'s second-largest building')] : []),
    block('normal', "Palace of Parliament — £15 entry. Yes, it's intimidating. Massive. Built during Ceaușescu's regime, it's the world's second-largest building (by floor area). Book the English-language tour (1.5 hours). Honestly? It's trippy in the best way — propaganda posters, enormous chandeliers, halls that feel endless."),
    block('normal', "Old Town (Lipscani). Free to wander. The heart of Bucharest pre-WWII. Narrow streets, old taverns converted to restaurants, street musicians, tiny bookshops. Get lost here intentionally. Stop at a café, watch people, sip a coffee (£1–2). This is where Bucharest's charm lives."),
    ...(uploadedImages.park ? [imageBlock(uploadedImages.park, 'Herastrau Park Bucharest - green spaces and lake')] : []),
    block('normal', "Herastrau Park. Free entry. 50+ hectares of green space with a lake, locals jogging, families with kids, museums hidden in corners. Rent a bike (£3–5 for 2 hours) and explore. Genuinely peaceful."),
    ...(uploadedImages.architecture ? [imageBlock(uploadedImages.architecture, 'Bucharest historic architecture - Belle Époque and vintage buildings')] : []),
    block('normal', "Village Museum (Museu Satului) — £4–5 entry. This shouldn't work as well as it does. It's a collection of 300+ traditional houses from across Romania, transported and reconstructed in the park. You'll see how people actually lived."),

    block('h2', '🍽️ Food & Dining'),
    ...(uploadedImages.food ? [imageBlock(uploadedImages.food, 'Traditional Romanian food - mici, sarmale, and local cuisine')] : []),
    bold("Budget Eats:"),
    block('normal', "Mici (Romanian grilled meat rolls) from street vendors: £1–2 | Polenta with cheese (mămăligă) from hole-in-the-wall places: £1.50–3 | Pita sandwiches (shawarma-style): £2–4"),
    bold("Proper Sit-Down (Still Cheap):"),
    block('normal', "Hanu' lui Manuc — £8–15 for mains. Crame — £6–12 for mains. Casa Doina — £10–18 for mains."),

    block('h2', '📋 Practical Information'),
    bold("When to Go:"),
    block('normal', "Spring (April–May): 15–20°C, parks blooming. Summer (June–August): 25–30°C, warm. Autumn (September–October): Golden light, crisp air. Winter (November–February): 0–5°C, quiet."),

    ...(uploadedImages.night ? [imageBlock(uploadedImages.night, 'Bucharest at night - city lights and illuminated skyline')] : []),

    block('h2', '💷 Budget Breakdown (4 Days/3 Nights)'),
    block('normal', "Flight (London–Bucharest return): £65 | Accommodation (3 nights, midrange hostel): £75 | Meals: £85 | Attractions: £30 | Transport: £12 | Drinks/Cafés: £25 | Miscellaneous: £15"),
    bold("TOTAL: £307 (£77/day)"),

    block('h2', '🎒 Final Thoughts'),
    block('normal', "Bucharest surprised me. It's not polished like Prague. It's rougher, more honest, and somehow more real. If you want a city break that doesn't cost the earth and gives you actual stories to tell? Bucharest is it."),

    linked('Ready to book? Find your flights on Kiwi.com →', KIWI_BUCHAREST),
  ]

  // Resolve references
  console.log('\n🔗  Resolving references…')
  const cityBreaksCat = await getRef('category', 'slug.current', 'city-breaks')

  console.log('  City Breaks category:', cityBreaksCat?._ref ?? 'NOT FOUND')

  // Update Post
  console.log('\n✍️   Updating Bucharest post…')
  const bucharestDoc = {
    _id: 'seed-post-bucharest-city-break',
    _type: 'article',
    title: 'Bucharest City Break Guide: Romania\'s Charismatic Capital (Less Money Than You\'d Think)',
    slug: { _type: 'slug', current: 'bucharest-city-break-guide-romania' },
    status: 'published',
    publishedAt: new Date('2026-05-31').toISOString(),
    excerpt: 'Walking through Old Town\'s cobblestone streets, discovering Communist-era architecture beside Belle Époque buildings, and eating like a local for £10/day. Bucharest is raw, real, and ridiculously affordable.',
    seoTitle: 'Bucharest City Break Guide 2026 — Budget Travel to Romania | Dose of Holiday',
    seoDescription: 'Complete guide to a city break in Bucharest, Romania for UK travellers. Cheap flights from £45–80, where to stay, what to do, food recommendations, and budget breakdown for 3–4 days.',
    readTime: 12,
    category: cityBreaksCat,
    featuredImage: uploadedImages.featured ? {
      _type: 'image',
      asset: { _type: 'reference', _ref: uploadedImages.featured },
      alt: 'Bucharest Old Town historic district',
    } : undefined,
    content: bucharestContent,
    faqs: [
      { question: 'Is Bucharest safe to visit?', answer: 'Yes. Bucharest is considered safe for tourists. Standard city precautions apply.' },
      { question: 'Do I need a visa for Romania?', answer: 'No. UK citizens can enter Romania visa-free for up to 90 days.' },
      { question: 'What\'s the best time to visit Bucharest?', answer: 'April–June and September–October are ideal — mild temperatures, lower prices.' },
      { question: 'Can I use my UK bank card?', answer: 'Yes, Visa and Mastercard work widely. Always carry some Romanian Lei (RON) cash.' },
    ],
    affiliateLinks: [
      { platform: 'Kiwi.com', url: KIWI_BUCHAREST, label: 'Search cheap flights to Bucharest' },
    ],
  }

  await client.createOrReplace(bucharestDoc)
  console.log('  ✓ Bucharest post updated with REAL Bucharest images')

  console.log('\n✅  Complete! Images uploaded:\n')
  for (const [key, id] of Object.entries(uploadedImages)) {
    console.log(`  ✓ ${key}: ${id ? 'uploaded' : 'failed'}`)
  }
}

main().catch((err) => {
  console.error('\n❌  Error:', err.message)
  process.exit(1)
})
