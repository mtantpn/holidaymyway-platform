/**
 * seed-posts-tbilisi-capeverde.ts
 * Creates 2 new blog posts:
 *   1. Tbilisi, Georgia — budget week under £500 (Sam Rivers, budget-travel-tips)
 *   2. Cape Verde — budget exotic island guide (Andrea Costa, destination-guides)
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'

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
  return `tbcv-${suffix}-${Math.random().toString(36).slice(2, 7)}`
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
// POST 1: TBILISI, GEORGIA
// Author: Sam Rivers | Category: budget-travel-tips
// ─────────────────────────────────────────────────────────────────────────────

const KIWI_TBILISI = 'https://www.kiwi.com/en/search/results/london-united-kingdom/tbilisi-georgia/anytime/no-return?marker=533931&trs=blog_budget_kiwi'
const BOOKING_TBILISI = 'https://www.booking.com/searchresults.en-gb.html?ss=Tbilisi&aid=304142'

const tbilisiContent = [
  block('normal', "I almost didn't go to Georgia. Not the American state — the actual country, wedged between Russia, Turkey, and the Black Sea, where the wine is extraordinary, the food costs next to nothing, and somehow half of Britain still hasn't discovered it yet. I booked flights on a Tuesday afternoon because a mate sent me a Wizz Air deal he'd spotted. Six hours later I had a week off work approved and £98 flights confirmed. That's where this story starts."),
  block('normal', "Spoiler: I came back with £480 spent in total. Including flights, accommodation, food, wine, a day trip to the Caucasus mountains, and a truly regrettable amount of churchkhela (Georgian walnut-and-grape-juice sweets). Here's exactly how."),

  block('h2', '✈️ Getting There: Flights from London'),
  block('normal', "Tbilisi has been quietly getting more accessible from the UK. Wizz Air flies direct from Luton, and you can find return tickets from £90–150 if you're flexible on dates. Georgian Airways and flydubai also do the route with one stop. Avoid July and August if you're purely after price — shoulder season (April–June, September–October) is when the deals appear and the city is genuinely at its best."),
  linked('Search the cheapest flights to Tbilisi on Kiwi.com →', KIWI_TBILISI, '🔍'),
  block('normal', "Flight time is about 5.5 hours direct. No dramatic time difference — Georgia is 4 hours ahead of the UK, so you land in the evening and feel human. That matters more than people think."),

  block('h2', '🏨 Where to Stay'),
  block('normal', "Old Town (Abanotubani, specifically) is where you want to be. It's the neighbourhood with the wooden balconies, the sulphur bath houses, and the winding streets that somehow manage to feel both ancient and perfectly walkable. Budget guesthouses here run £18–28 per night for a double room — family-run places where breakfast is usually included and the hosts will tell you exactly where to eat if you ask."),
  block('normal', "I stayed at a guesthouse on Gorgasali Street for £22 a night. The room was spotless, the terrace had a view of Metekhi Church, and I was given homemade tkemali sauce on my first morning as a welcome gift. Can your hotel do that? Didn't think so."),
  linked('Browse guesthouses in Tbilisi Old Town →', BOOKING_TBILISI),
  block('normal', "Hostels start from around £8 a night if you're travelling solo and want to keep costs lower. There's a solid backpacker scene — Georgia has become a proper digital nomad hub — so you'll find good social hostels in the Vera and Vake districts if Old Town gets too touristy for you."),

  block('h2', '🍽️ Food: The Main Event (Seriously)'),
  block('normal', "Right. The food. I need to talk about the food."),
  block('normal', "Georgian cuisine is one of the great underrated food cultures in the world. It's not delicate or fussy — it's generous and deeply flavoured, built around walnuts, pomegranate, sour plum sauce (tkemali), and more cheese than seems medically advisable. A full dinner for two with wine will cost you £12–18. I am not making this up."),
  bold("What to order:"),
  block('normal', "Khinkali are the famous dumplings — thick twisted parcels of spiced meat broth. You hold them by the knot at the top, bite a small hole in the side, suck out the broth first, then eat the rest. Do not use a fork. You will be judged."),
  block('normal', "Khachapuri is Georgia's cheese bread — a boat-shaped pastry filled with melted sulguni cheese, topped with a raw egg and a pat of butter that you stir in at the table. The Adjaran version is the famous boat shape. Order it once and you'll order it every single day."),
  block('normal', "Georgian wine deserves its own article. Georgia is one of the oldest wine-producing regions in the world (8,000 years, to be precise), and a bottle of excellent local wine costs £4–8 in a restaurant. The amber wines — made with the skins left in during fermentation — are particularly special. Try a Rkatsiteli or a Kisi."),
  block('normal', "The Deserter's Market (Dezerter Bazaar) near the railway station is where locals buy food. Go on a Saturday morning. Stall holders will press bread, cheese, and wine into your hands. You will spend £6 and leave carrying an entire wheel of suluguni."),

  block('h2', '🏛️ What to See: The Free Stuff'),
  block('normal', "Tbilisi rewards walking. The Old Town is genuinely beautiful — layered balconies draped with vines, hidden courtyards, tiny chapels wedged between apartment buildings. It doesn't feel performed or polished. It feels lived in."),
  bold("Don't miss:"),
  block('normal', "Narikala Fortress — the ancient citadel above Old Town, free to walk around, spectacular views of the Kura River and the city below. Get there at golden hour. Take too many photos. No apology needed."),
  block('normal', "The sulphur baths in Abanotubani — the domed bath houses that have been here since the 5th century. You can book a private room (about £10–15 per person per hour) and soak in natural sulphur spring water. It smells like eggs, feels like magic, and you'll sleep better than you have in years."),
  block('normal', "The Bridge of Peace — controversial with locals (it's very modern and strikingly out of place among the medieval architecture), but it's free and the view from it at night is excellent. Walk across it and decide for yourself."),
  block('normal', "Rustaveli Avenue — the main boulevard, lined with theatres, galleries, and a very good national museum. The Georgian National Museum charges about £4 entry and is genuinely excellent if you want to understand the context for everything you're seeing."),

  block('h2', '🏔️ Day Trip: Kazbegi'),
  block('normal', "This is non-negotiable. Take the marshrutka (minivan) north from Didube station for about £5–8 each way and you'll be in the Caucasus mountains, standing in front of the Gergeti Trinity Church with one of the most dramatic backdrops on earth. The church is 14th century, perched at 2,170 metres on a hill above the town of Stepantsminda, with Mount Kazbek (5,047m) behind it. Entire photography careers have been dedicated to this view."),
  block('normal', "The marshrutka leaves around 10am and returns around 6pm. Bring layers — even in summer it's cold up there. Eat at a family guesthouse in the village for lunch (£5 for a full meal). Do not rush this day."),

  block('h2', '💷 Budget Breakdown: My Actual Week'),
  block('normal', "Here's what I actually spent, not what I planned to spend:"),
  block('normal', "Flights (return Luton–Tbilisi, Wizz Air): £98 | Accommodation (7 nights, Old Town guesthouse): £154 | Food and drink (7 days, eating extremely well): £90 | Activities and entry fees: £22 | Kazbegi day trip (transport + lunch): £18 | Souvenirs, wine to bring home, churchkhela: £38 | Airport transport: £12 | TOTAL: £432"),
  block('normal', "I was trying to spend more. The city simply wouldn't let me."),

  block('h2', '📋 Quick Tips'),
  block('normal', "— Georgian Lari (GEL) is the currency. £1 ≈ 3.7 GEL at time of writing. Cards are widely accepted in Tbilisi but bring some cash for markets and smaller restaurants."),
  block('normal', "— A tourist SIM from Magti or Geocell costs about £5 and gives you generous data for a week. Buy at the airport or any phone shop."),
  block('normal', "— Bolt and Yandex Go are the taxi apps. Never use an unmarked cab without agreeing a price first."),
  block('normal', "— Tbilisi in October–November is my pick for the best combination of mild weather, lower prices, and the grape harvest season. Winemakers literally invite strangers in off the street. It's that kind of place."),

  linked('Search flights to Tbilisi with Kiwi.com — compare hundreds of airlines →', KIWI_TBILISI),
]

// ─────────────────────────────────────────────────────────────────────────────
// POST 2: CAPE VERDE
// Author: Andrea Costa | Category: destination-guides
// ─────────────────────────────────────────────────────────────────────────────

const KIWI_CAPEVERDE = 'https://www.kiwi.com/en/search/results/london-united-kingdom/sal-cape-verde/anytime/no-return?marker=533931&trs=blog_dest_kiwi'
const BOOKING_CAPEVERDE = 'https://www.booking.com/searchresults.en-gb.html?ss=Cape+Verde&aid=304142'

const capeVerdeContent = [
  block('normal', "Everyone says the Maldives. Everyone talks about Bali. And I get it — those places are extraordinary. But here's the thing: they're a 10–12 hour flight, they cost a small fortune done properly, and the time difference destroys at least two days of your holiday in each direction."),
  block('normal', "Cape Verde is 6 hours from the UK. One hour time difference. Direct flights from Gatwick, Manchester, Birmingham, and Bristol. White-sand beaches, turquoise water, consistent 28°C sunshine. Year-round."),
  block('normal', "And somehow, we still treat it like a secret. I went in October expecting a reasonable holiday and came back having found one of the most quietly spectacular places I've ever been. It took me two weeks to stop talking about it at work. I'm still not quite over it."),

  block('h2', '✈️ Getting There: Direct Flights from the UK'),
  block('normal', "This is Cape Verde's secret weapon. Six hours. One time zone. You fly out on a Saturday morning and you're on the beach in time for sunset. No red-eye horror, no layover limbo, no days wasted recovering from jet lag."),
  block('normal', "TUI, easyJet, Jet2, and TAP all fly direct from multiple UK airports. Return flights start from around £180–260 if you book 2–3 months ahead, with package deals on all-inclusive resorts often undercutting the flight-only price (more on this in a moment). July is actually a good value month — prices dip because the wind picks up on Sal and Boa Vista, which is brilliant if you're a windsurfer and completely irrelevant if you're lying on a sunlounger."),
  linked('Compare cheap flights to Cape Verde with Kiwi.com →', KIWI_CAPEVERDE, '🔍'),

  block('h2', '🏝️ Which Island? The Question Everyone Gets Wrong'),
  block('normal', "Cape Verde is an archipelago — 10 islands, each completely different. Most UK holidaymakers land on Sal or Boa Vista, which are the flat, sandy, beach-resort islands. They are absolutely excellent for exactly what they offer: crystalline water, endless white sand, and very little to do except be relaxed. But they're not the whole story."),
  bold("Sal: The Most Accessible"),
  block('normal', "Sal is where most direct flights land (Amilcar Cabral International Airport). Santa Maria is the main tourist town — a strip of restaurants, bars, and guesthouses along a genuinely beautiful beach. It's a proper resort, which means it's organised and easy, but it also means it's not particularly authentic Cape Verdean culture."),
  block('normal', "What Sal does brilliantly: windsurfing (Santa Maria is world-class, consistently rated one of the best spots on earth for beginners because the wind is strong and the water is flat), kitesurfing, snorkelling, and doing absolutely nothing with extreme competence."),
  bold("Boa Vista: Emptier and Wilder"),
  block('normal', "A 30-minute inter-island flight or ferry from Sal. Fewer tourists, more dramatic landscapes — enormous sand dunes that roll down to the ocean, abandoned fishing villages, loggerhead turtle nesting beaches. If Sal is a beach holiday, Boa Vista is a beach experience."),
  bold("Santiago and the Other Islands: For the Adventurous"),
  block('normal', "Praia, the capital, is on Santiago — you get proper Cape Verdean city life, colonial architecture, music, and food that doesn't come from a buffet. Santo Antão has jaw-dropping mountain hiking. These islands require a domestic flight connection but they're cheap and the crowds thin dramatically."),

  block('h2', '🌊 What to Do (Beyond the Sunlounger)'),
  block('normal', "The honest answer for Sal and Boa Vista is: not very much, and that's the point. But here's what's worth knowing about:"),
  block('normal', "Windsurfing and kitesurfing lessons are excellent value — a two-hour beginner lesson runs about £35–50, and conditions are so consistent that people genuinely learn faster here than almost anywhere else. If you've always meant to try it, this is the place."),
  block('normal', "Snorkelling off the rocks at Pedra de Lume (where the salt crater is) turns up incredible marine life — sea turtles are genuinely common, not a rare lucky sighting. Hire a mask and fins from any beach shack for about £5."),
  block('normal', "The salt crater at Pedra de Lume is Cape Verde's quirky highlight — you drive out to what looks like nothing, walk through a gap in volcanic rock, and find a vast pink salt lake inside an old crater. The salinity is high enough to float easily. Entry is about £5."),
  block('normal', "Live music at night is underrated. Cape Verdean morna music — melancholic, beautiful, tied to the concept of 'saudade' — is best heard in a small bar in Santa Maria rather than at a resort show. Ask a local where to go. They'll tell you."),

  block('h2', '🏨 Where to Stay: All-Inclusive vs Independent'),
  block('normal', "Here's the honest take on this debate: for Cape Verde specifically, all-inclusive packages can actually make financial sense if you're going to Sal or Boa Vista, because eating out independently in the tourist areas can be surprisingly expensive relative to what you get. A middling pasta at a beach restaurant: £14. A beer: £4. It adds up."),
  block('normal', "That said, the guesthouse/self-catering option in Santa Maria is genuinely great if you're willing to walk five minutes back from the beach to the side streets where locals eat. A full fish dinner with chips and a cold Strela beer (the local lager) costs about £8 at a proper local restaurant. The difference in experience is worth it."),
  linked('Compare accommodation options in Cape Verde →', BOOKING_CAPEVERDE),
  block('normal', "My recommendation: if this is your first time and you want maximum relaxation with minimum faff, book a 4-star all-inclusive on Sal. If you've been once and want more, go self-catering and use the local restaurants. Both are valid."),

  block('h2', '🍽️ Food and Drink'),
  block('normal', "Cape Verdean food is underrated and genuinely worth seeking out. Cachupa is the national dish — a slow-cooked stew of corn, beans, and whatever the cook had available (sausage, fish, vegetables). It's hearty, deeply flavoured, and nothing like resort food."),
  block('normal', "Fresh fish is excellent everywhere — grilled tuna, salt cod prepared every way imaginable, giant prawns from the local boats. Go to a restaurant on the side streets of Santa Maria, point at the fish on the counter, and ask them to grill it. This will cost about £10–12 and be one of the best meals of your trip."),
  block('normal', "Grogue is the local firewater — distilled from sugar cane, it's rough but culturally important. One shot costs about 50p at a local bar. It tastes like your first time driving a manual car: exciting and slightly dangerous."),

  block('h2', '💷 Budget Breakdown: How to Do Cape Verde for Under £700'),
  block('normal', "Here's what a budget-conscious independent week looks like on Sal:"),
  block('normal', "Return flights (Gatwick, booked 10 weeks out): £215 | Accommodation (7 nights, guesthouse Santa Maria): £175 | Food (mix of local restaurants and supermarket breakfasts): £120 | Activities (2 surf lessons, snorkelling, salt crater): £80 | Drinks and evenings out: £55 | Airport transfers: £18 | TOTAL: £663"),
  block('normal', "For context: an equivalent beach holiday in Santorini (similar weather, similar vibes, 45-minute flight shorter) would run you £1,100–1,400 for the same week, easily. That gap is what makes Cape Verde feel like a discovery."),

  block('h2', '📋 What to Know Before You Go'),
  block('normal', "— The currency is Cape Verdean Escudo (CVE). £1 ≈ 115 CVE. Euros are widely accepted too. ATMs are available in Santa Maria."),
  block('normal', "— Water: don't drink the tap water. Buy bottled (cheap) or bring a filter bottle. This is standard for Cape Verde across all islands."),
  block('normal', "— Internet is patchy in Cape Verde by European standards. Don't book this trip as a working holiday."),
  block('normal', "— Sun protection is not optional. It's closer to the equator than Spain, the UV index is consistently high, and the trade winds make it feel cooler than it is. You will burn faster than you expect."),
  block('normal', "— Best time to go: November to June for calmer winds and the driest weather. July–September is windsurfer season — great for that, fine for beach, but windier."),

  block('h2', '🗓️ Is It Worth It?'),
  block('normal', "Yes. Emphatically. Cape Verde is the rare place that delivers exactly what it promises without pretending to be something it isn't. It's not the Maldives — the infrastructure is more relaxed, the resorts are less polished, the nights are livelier and less controlled. For most UK travellers, I'd argue that's a feature rather than a flaw."),
  block('normal', "It's 6 hours away. The beaches are extraordinary. The food is genuinely good if you find the right places. And you'll spend half what you'd spend on a comparable 'luxury' beach destination elsewhere. I'll be going back, and I'd go back to Boa Vista next time to see those dunes."),

  linked('Search cheap flights to Cape Verde with Kiwi.com →', KIWI_CAPEVERDE),
]

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────

async function getRef(type: string, field: string, value: string) {
  const res = await client.fetch(`*[_type == $type && ${field} == $value][0]._id`, { type, value })
  return res ? { _type: 'reference', _ref: res } : null
}

async function main() {
  console.log('\n🌍  Seeding Tbilisi + Cape Verde posts…\n')

  // Upload images
  console.log('📸  Uploading images…')
  const tbilisiImgId = await uploadPexels(34890727, 'Tbilisi Old Town Georgia')
  const capeVerdeImgId = await uploadPexels(14848624, 'Cape Verde beach Sal island')

  // Resolve references
  console.log('\n🔗  Resolving references…')
  const samRivers = await getRef('author', 'slug.current', 'sam-rivers')
  const andreaCosta = await getRef('author', 'slug.current', 'andrea-costa')
  const budgetCat = await getRef('category', 'slug.current', 'budget-travel-tips')
  const destCat = await getRef('category', 'slug.current', 'destination-guides')

  console.log('  Sam Rivers:', samRivers?._ref ?? 'NOT FOUND')
  console.log('  Andrea Costa:', andreaCosta?._ref ?? 'NOT FOUND')
  console.log('  Budget category:', budgetCat?._ref ?? 'NOT FOUND')
  console.log('  Destinations category:', destCat?._ref ?? 'NOT FOUND')

  // ── Post 1: Tbilisi ──
  console.log('\n✍️   Creating Tbilisi post…')
  const tbilisiDoc = {
    _id: 'seed-post-tbilisi-budget-week',
    _type: 'article',
    title: 'I Spent a Week in Georgia for Under £500 All-In — Here\'s Exactly How',
    slug: { _type: 'slug', current: 'tbilisi-georgia-budget-week-under-500' },
    status: 'published',
    publishedAt: new Date('2026-05-30').toISOString(),
    excerpt: 'Cheap flights, £3 dumplings, incredible wine, and one of Europe\'s most underrated cities. Tbilisi delivers everything a budget traveller dreams about — and almost nobody from the UK has worked it out yet.',
    seoTitle: 'Cheap Week in Tbilisi, Georgia — Under £500 Including Flights | Dose of Holiday',
    seoDescription: 'A complete budget guide to Tbilisi, Georgia for UK travellers. Real prices, honest tips on flights from £98, where to eat, what to see, and a full cost breakdown for a week under £500.',
    readTime: 9,
    author: samRivers,
    category: budgetCat,
    featuredImage: {
      _type: 'image',
      asset: { _type: 'reference', _ref: tbilisiImgId },
      alt: 'Tbilisi Old Town Georgia — colourful balconies overlooking the Kura River',
    },
    content: tbilisiContent,
    faqs: [
      { question: 'Is Tbilisi safe to visit?', answer: 'Yes. Tbilisi is considered very safe for tourists. It regularly ranks among the safer capital cities in the region. The Old Town is busy with visitors and well-patrolled. Standard city precautions apply — watch your pockets in crowded markets, don\'t leave things unattended. Solo travellers, including women, consistently report feeling comfortable here.' },
      { question: 'Do I need a visa for Georgia?', answer: 'No. UK citizens can enter Georgia visa-free for up to 365 days. You just need a valid passport. This makes it extremely flexible for longer stays or digital nomads.' },
      { question: 'What\'s the best time to visit Tbilisi?', answer: 'April–June and September–October are ideal — mild temperatures (18–24°C), lower prices than summer, and the city at its most pleasant. July and August are peak season and can be very hot (35°C+). The wine harvest in September–October is a particularly special time to visit if you can make it work.' },
      { question: 'Can I use my UK bank card in Georgia?', answer: 'Yes, Visa and Mastercard work widely in Tbilisi. ATMs are common in tourist areas. Always carry some Lari cash for markets and smaller restaurants. Avoid airport exchange desks — the rates are poor.' },
    ],
    affiliateLinks: [
      { platform: 'Kiwi.com', url: KIWI_TBILISI, label: 'Search cheap flights to Tbilisi' },
      { platform: 'Booking.com', url: BOOKING_TBILISI, label: 'Find guesthouses in Tbilisi Old Town' },
    ],
  }

  await client.createOrReplace(tbilisiDoc)
  console.log('  ✓ Tbilisi post created')

  // ── Post 2: Cape Verde ──
  console.log('\n✍️   Creating Cape Verde post…')
  const capeVerdeDoc = {
    _id: 'seed-post-cape-verde-budget-paradise',
    _type: 'article',
    title: 'The Budget Maldives Nobody\'s Talking About: How to Do Cape Verde for Under £700',
    slug: { _type: 'slug', current: 'cape-verde-budget-paradise-guide-2026' },
    status: 'published',
    publishedAt: new Date('2026-05-30').toISOString(),
    excerpt: 'Six-hour direct flights. One-hour time difference. White-sand beaches, 28°C year-round, and a week that doesn\'t cost as much as a weekend in Ibiza. Cape Verde is the exotic island holiday you\'ve been overthinking.',
    seoTitle: 'Cape Verde Budget Guide 2026 — How to Have a Cheap Paradise Holiday | Dose of Holiday',
    seoDescription: 'Complete guide to a budget Cape Verde holiday from the UK. Direct flights from £180, the best islands, where to stay, what to do, and a full weekly budget breakdown under £700.',
    readTime: 10,
    author: andreaCosta,
    category: destCat,
    featuredImage: {
      _type: 'image',
      asset: { _type: 'reference', _ref: capeVerdeImgId },
      alt: 'Cape Verde beach with turquoise water and white sand — Sal island',
    },
    content: capeVerdeContent,
    faqs: [
      { question: 'When is the best time to visit Cape Verde?', answer: 'November to June is the sweet spot for most visitors — calmer winds, dry weather, and comfortable temperatures around 26–30°C. July to October is still sunny and warm but the trade winds pick up significantly (ideal for windsurfers). The cheapest flights tend to be in November and early July.' },
      { question: 'Which island is best for a beach holiday?', answer: 'Sal and Boa Vista are the two main beach islands with direct UK flights. Sal (Santa Maria) is more developed and better for first-timers — more restaurants, activities, and things to do. Boa Vista is emptier, wilder, and more dramatic. Both have excellent beaches.' },
      { question: 'Do I need a visa for Cape Verde?', answer: 'Yes, UK citizens need a visa for Cape Verde. The good news: it\'s straightforward and cheap. You can get a EASE (e-visa) online at ease.gov.cv before you travel, or pay on arrival. Cost is around $25–30 USD. It takes about 24–48 hours to process online, so don\'t leave it until the night before.' },
      { question: 'Is Cape Verde worth it compared to a Spanish island?', answer: 'Different experience, not a direct comparison. The Spanish islands (Tenerife, Lanzarote, Mallorca) are more developed, more lively, and frankly more convenient. Cape Verde is more remote, more African in culture, and the beaches are arguably more spectacular. If you want reliable nightlife and easy infrastructure, go to Spain. If you want somewhere that feels genuinely exotic without a long-haul flight, Cape Verde wins.' },
    ],
    affiliateLinks: [
      { platform: 'Kiwi.com', url: KIWI_CAPEVERDE, label: 'Search cheap flights to Cape Verde' },
      { platform: 'Booking.com', url: BOOKING_CAPEVERDE, label: 'Find accommodation in Cape Verde' },
    ],
  }

  await client.createOrReplace(capeVerdeDoc)
  console.log('  ✓ Cape Verde post created')

  console.log('\n✅  Both posts published successfully!\n')
  console.log('Tbilisi: /blog/tbilisi-georgia-budget-week-under-500')
  console.log('Cape Verde: /blog/cape-verde-budget-paradise-guide-2026')
}

main().catch((err) => {
  console.error('\n❌  Error:', err.message)
  process.exit(1)
})
