/**
 * Sanity content seed script.
 * Creates: SiteSettings, Author, 4 Categories, 3 Destinations, 3 Articles.
 *
 * Prerequisites:
 *   1. Add SANITY_API_WRITE_TOKEN to .env.local (Editor role token from sanity.io/manage)
 *   2. npm run seed
 *
 * Idempotent — safe to run multiple times. Uses createOrReplace with stable _ids.
 */
import { config } from 'dotenv'
config({ path: '.env.local' })
import { createClient } from '@sanity/client'

// ─── Client ───────────────────────────────────────────────────────────────────

const token = process.env.SANITY_API_WRITE_TOKEN
if (!token) {
  console.error(
    '\n❌  SANITY_API_WRITE_TOKEN not set.\n' +
    '    Add it to .env.local (Editor role token from sanity.io/manage → API → Tokens)\n'
  )
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 's6i0x1s0',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

// ─── PortableText helpers ──────────────────────────────────────────────────────

let keyCounter = 0
function uid(prefix = 'k') {
  return `${prefix}${++keyCounter}`
}

function p(text: string) {
  const k = uid()
  return {
    _type: 'block', _key: k, style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: `${k}s`, text, marks: [] }],
  }
}

function h2(text: string) {
  const k = uid('h2')
  return {
    _type: 'block', _key: k, style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: `${k}s`, text, marks: [] }],
  }
}

function h3(text: string) {
  const k = uid('h3')
  return {
    _type: 'block', _key: k, style: 'h3', markDefs: [],
    children: [{ _type: 'span', _key: `${k}s`, text, marks: [] }],
  }
}

// ─── Documents ────────────────────────────────────────────────────────────────

const siteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  siteName: 'HolidayMyWay',
  siteDescription:
    'UK travel guides and holiday deals for budget to mid-range travellers. Find the best holidays from the UK.',
  affiliateDisclosureText:
    'This article contains affiliate links. If you book through these links, HolidayMyWay earns a small commission at no extra cost to you.',
  cookiePolicyUrl: '/cookies',
  socialLinks: [
    { _key: 'sl1', platform: 'Instagram', url: 'https://www.instagram.com/holidaymyway' },
    { _key: 'sl2', platform: 'TikTok', url: 'https://www.tiktok.com/@holidaymyway' },
    { _key: 'sl3', platform: 'Pinterest', url: 'https://www.pinterest.com/holidaymyway' },
  ],
}

const author = {
  _id: 'seed-author-team',
  _type: 'author',
  name: 'The HolidayMyWay Team',
  slug: { _type: 'slug', current: 'holidaymyway-team' },
  bio: 'A team of UK-based travel writers sharing honest destination guides, budget tips, and the best holiday deals for travellers aged 18–45.',
}

// ─── Categories ───────────────────────────────────────────────────────────────

const categories = [
  {
    _id: 'seed-cat-destination-guides',
    _type: 'category',
    name: 'Destination Guides',
    slug: { _type: 'slug', current: 'destination-guides' },
    description: 'In-depth guides to the best holiday destinations from the UK.',
    seoTitle: 'Destination Guides — HolidayMyWay',
    seoDescription: 'Comprehensive destination guides for UK travellers. Find the best places to visit, when to go, and how much to budget.',
  },
  {
    _id: 'seed-cat-budget-travel',
    _type: 'category',
    name: 'Budget Travel Tips',
    slug: { _type: 'slug', current: 'budget-travel-tips' },
    description: 'Money-saving tips, hacks, and strategies for travelling on a budget from the UK.',
    seoTitle: 'Budget Travel Tips — HolidayMyWay',
    seoDescription: 'Save money on flights, hotels, and activities. Expert budget travel tips for UK travellers.',
  },
  {
    _id: 'seed-cat-city-breaks',
    _type: 'category',
    name: 'City Breaks',
    slug: { _type: 'slug', current: 'city-breaks' },
    description: 'Weekend and short break guides to the best European and UK cities.',
    seoTitle: 'City Break Guides — HolidayMyWay',
    seoDescription: 'The best city breaks from the UK. Weekend guides to European and UK cities, with budget tips and itineraries.',
  },
  {
    _id: 'seed-cat-uk-staycations',
    _type: 'category',
    name: 'UK Staycations',
    slug: { _type: 'slug', current: 'uk-staycations' },
    description: "Discover the best of the UK's beaches, countryside, and hidden gems — no passport needed.",
    seoTitle: 'UK Staycation Guides — HolidayMyWay',
    seoDescription: 'The best UK staycation destinations. Cornwall, the Cotswolds, Scottish Highlands, and more — all budget-friendly.',
  },
]

// ─── Destinations ─────────────────────────────────────────────────────────────

const destinations = [
  {
    _id: 'seed-dest-barcelona',
    _type: 'destination',
    name: 'Barcelona',
    slug: { _type: 'slug', current: 'barcelona' },
    country: 'Spain',
    region: 'europe-short-haul',
    iataCode: 'BCN',
    bookingCity: 'Barcelona',
    flightTimeFromLondon: '2h 15m',
    bestSeason: 'April – October (avoid August heat)',
    averageBudget: '£500–£800 per week including flights',
    excerpt:
      'Barcelona combines Gothic architecture, world-class food, and stunning beaches — making it one of the most popular and rewarding city breaks from the UK.',
    description: [
      p('Barcelona is a city that genuinely has it all: Gaudí masterpieces, a buzzing food scene, golden beaches, and some of the best nightlife in Europe. And with direct flights from most major UK airports from under £50 return, it\'s also one of the most accessible short breaks on the continent.'),
      h2('Why UK Travellers Love Barcelona'),
      p('The combination of beach and city is rare. In the morning you can visit the Sagrada Família, in the afternoon you\'re on Barceloneta beach, and in the evening you\'re eating tapas in El Born for £10 a head. Budget travellers can manage on £50–£70 per day including accommodation, food, and activities.'),
      h2('Getting Around Barcelona'),
      p('The metro is excellent — a T-Casual 10-trip card costs around €11.35 and covers all zones you\'ll realistically need. Walking is often faster for the old town. Taxis are metered and honest; Bolt and Cabify are cheaper alternatives to Uber.'),
      h2('Where to Stay in Barcelona'),
      p('The best-value areas are El Raval and Sant Antoni for budget accommodation, or Gràcia for a more local feel. Avoid booking directly on Las Ramblas — you\'ll pay a premium for a noisier, less interesting location.'),
      h2('Food and Drink on a Budget'),
      p('The menú del día (set lunch) is your best friend: two courses, bread, drink, and dessert for €10–€15 at most restaurants. The Mercat de Santa Caterina is less touristy than La Boqueria and has cheaper, better food. A beer at a local bar is €2–€3; the same beer on Las Ramblas is €7+.'),
    ],
    faqs: [
      { _key: 'faq-bcn-1', question: 'Is Barcelona cheap to visit from the UK?', answer: 'Budget travellers can manage on £50–£70 per day including mid-range accommodation, meals, and activities. Flights from London start from under £50 return if booked 6–8 weeks ahead. The city is significantly cheaper than London for food and drink.' },
      { _key: 'faq-bcn-2', question: 'When is the best time to visit Barcelona?', answer: 'April–June and September–October offer the best combination of warm weather, lower prices, and smaller crowds. July and August are peak season — very hot (35°C+) and extremely busy. November–March is quieter and cheaper, though some beach facilities close.' },
      { _key: 'faq-bcn-3', question: 'How long is the flight from London to Barcelona?', answer: 'Direct flights take approximately 2h 15m from Heathrow or Gatwick. easyJet, Vueling, Ryanair, and British Airways all fly the route. From Manchester the flight is around 2h 30m.' },
      { _key: 'faq-bcn-4', question: 'Do UK visitors need a visa for Barcelona?', answer: 'No — UK passport holders can visit Spain (and the wider Schengen Area) visa-free for up to 90 days within any 180-day period. Note: ETIAS (European Travel Information and Authorisation System) is expected to launch in 2025, which will require a small fee and online pre-registration.' },
      { _key: 'faq-bcn-5', question: 'Is Barcelona safe for tourists?', answer: 'Barcelona is generally safe. The main concern is pickpocketing, particularly on Las Ramblas, at the Sagrada Família, and on the metro. Use a money belt or anti-theft bag, keep your phone in your pocket, and be vigilant in crowded areas. Most visitor areas are well-lit and active until late.' },
    ],
    seoTitle: 'Barcelona Travel Guide for UK Travellers 2026 — HolidayMyWay',
    seoDescription: 'Complete Barcelona travel guide for UK visitors: flights, hotels, budget tips, best time to visit, and top attractions. Updated May 2026.',
  },

  {
    _id: 'seed-dest-amsterdam',
    _type: 'destination',
    name: 'Amsterdam',
    slug: { _type: 'slug', current: 'amsterdam' },
    country: 'Netherlands',
    region: 'europe-short-haul',
    iataCode: 'AMS',
    bookingCity: 'Amsterdam',
    flightTimeFromLondon: '1h 20m',
    bestSeason: 'April – May or September',
    averageBudget: '£450–£700 per week including flights',
    excerpt:
      'Amsterdam is one of the most charming European city breaks — canals, world-class museums, incredible cycling culture, and direct flights from every major UK airport in under 90 minutes.',
    description: [
      p('Amsterdam rewards slow travel. The city is compact enough to cycle everywhere, beautiful enough that getting lost is a pleasure, and just cultured enough that a weekend feels both relaxing and stimulating. With flights from around £60 return and a city centre you can cover on foot, it\'s one of the easiest and most rewarding short breaks from the UK.'),
      h2('Is Amsterdam Expensive?'),
      p('Amsterdam sits in the middle of the European cost spectrum — more expensive than Prague or Krakow, cheaper than Paris or Zurich. Mid-range travellers budget £80–£120 per day including accommodation, meals, and museum entry. Eating at Indonesian restaurants (a legacy of Dutch colonialism) is a brilliant way to eat well for under £15 per person.'),
      h2('Getting to Amsterdam from the UK'),
      p('Direct flights operate from London Heathrow, Gatwick, Stansted, Manchester, Edinburgh, Birmingham, and Bristol. The journey is 1h 15m–1h 30m depending on departure airport. Eurostar also runs direct London St Pancras to Amsterdam Centraal in around 3h 45m — useful if you prefer rail travel and book early.'),
      h2('The Best Neighbourhoods to Stay'),
      p('De Pijp and Jordaan are the most atmospheric and residential areas — quieter than the Canal Ring but easy walking distance from everything. The Red Light District area is central but not always the most comfortable place to stay. For budget accommodation, look at hostels around Leidseplein or the east of the city near Oosterpark.'),
    ],
    faqs: [
      { _key: 'faq-ams-1', question: 'How long is the flight from London to Amsterdam?', answer: 'Direct flights from Heathrow take around 1h 20m. From Stansted or Gatwick it\'s around 1h 30m. From Manchester or Edinburgh, expect 1h 45m–2h. KLM, easyJet, Ryanair, and British Airways all fly the route. Eurostar is also an option from London St Pancras (3h 45m direct).' },
      { _key: 'faq-ams-2', question: 'Is Amsterdam expensive for UK visitors?', answer: 'Mid-range travellers budget £80–£120 per day including accommodation, food, and activities. A pint of beer costs €5–€7 in most bars. The Rijksmuseum and Anne Frank House are worth the €25–€30 entry fee. Booking canal boat tours and museum tickets in advance is often cheaper.' },
      { _key: 'faq-ams-3', question: 'What is the best time to visit Amsterdam?', answer: 'Late April–May is the classic time: tulip season at Keukenhof, long days, mild temperatures (14–19°C), and the city at its most photogenic. September is also excellent — summer crowds have thinned, prices drop, and the weather is still warm. Avoid late July and August when the city is at peak tourist capacity.' },
      { _key: 'faq-ams-4', question: 'Do I need a visa for Amsterdam from the UK?', answer: 'No. UK passport holders can visit the Netherlands (Schengen Area) visa-free for up to 90 days in any 180-day period. Note that ETIAS pre-registration is expected to launch in 2025, requiring a small €7 fee paid online before arrival.' },
    ],
    seoTitle: 'Amsterdam Travel Guide for UK Visitors 2026 — HolidayMyWay',
    seoDescription: 'Amsterdam city break guide for UK travellers: cheap flights, best hotels, budget tips, and when to go. Updated May 2026.',
  },

  {
    _id: 'seed-dest-cornwall',
    _type: 'destination',
    name: 'Cornwall',
    slug: { _type: 'slug', current: 'cornwall' },
    country: 'United Kingdom',
    region: 'uk-staycations',
    bookingCity: 'Newquay',
    flightTimeFromLondon: 'N/A — approx. 4h 30m drive from London',
    bestSeason: 'June – September',
    averageBudget: '£400–£650 per week (self-catering)',
    excerpt:
      'Cornwall offers dramatic cliffs, world-famous beaches, superb seafood, and a genuinely different pace of life — all without a passport. The jewel of UK staycations.',
    description: [
      p('Cornwall has been the UK\'s favourite staycation destination for decades, and for good reason. The peninsula offers dramatic coastal scenery, some of the UK\'s best beaches (Porthcurno, Sennen, Kynance Cove), a thriving food scene centred on fresh seafood, and a distinctly relaxed culture that feels a world away from the rest of England.'),
      h2('Getting to Cornwall'),
      p('From London, the drive to Penzance takes around 4h 30m via the A30, though summer holiday traffic can add significant time — travel on a Tuesday or Wednesday if possible, and avoid the Friday afternoon exodus. The Great Western Railway runs London Paddington to Penzance in around 5h, with Newquay, Truro, and St Ives all served by train.'),
      h2('Best Beaches in Cornwall'),
      p('Porthcurno is arguably the finest: white sand, turquoise water, and dramatic cliffs. Kynance Cove on the Lizard Peninsula is similarly stunning but only accessible at low tide. For surf, Fistral Beach in Newquay is the UK\'s surf capital. For families, the sheltered sands of Carbis Bay near St Ives are ideal.'),
      h2('Food and Drink in Cornwall'),
      p('Fresh seafood is the headline — crab sandwiches in Padstow, oysters at Port Navas, and fish and chips on every harbour. Rick Stein\'s restaurants in Padstow are worth the splurge at least once. For budget eating, the Cornish pasty is not just a tourist cliché — a proper bakery pasty is a substantial and cheap meal. Expect to pay £3.50–£5.'),
      h2('Budget Tips for Cornwall'),
      p('Self-catering cottages or glamping are generally better value than hotels. Book 6–12 months ahead for summer (Cornwall sells out very early). The Eden Project (£35 per adult) is worth it. National Trust membership pays for itself if you\'re visiting multiple properties — the Cornish coast has several. Parking is a significant cost; many beaches charge £5–£10 per day.'),
    ],
    faqs: [
      { _key: 'faq-cor-1', question: 'How do I get to Cornwall from London?', answer: 'By car: approximately 4h 30m from London via the M4 and A30 in normal traffic. By train: Great Western Railway runs London Paddington to Penzance in around 5 hours, with stops including Truro and St Ives branch. Avoid travelling on Friday afternoons in summer — the A30 queues can add 2+ hours.' },
      { _key: 'faq-cor-2', question: 'When is the best time to visit Cornwall?', answer: 'June–September for reliable sunshine and warm sea temperatures (17–20°C at peak). Late May half-term and the full summer school holidays are the busiest and most expensive periods. For better value and fewer crowds, try late May before half-term, or early September after schools return.' },
      { _key: 'faq-cor-3', question: 'Is Cornwall expensive for a UK holiday?', answer: 'It can be, especially in peak summer when cottage rental prices are at their highest. Budget for £400–£650 per week in self-catering accommodation for a couple, plus food and activities. Shoulder season (May or October) brings prices down significantly. Free beaches, coastal paths, and village exploring keep activity costs low.' },
      { _key: 'faq-cor-4', question: 'What is Cornwall famous for?', answer: 'Its beaches and coastline (Porthcurno, Kynance Cove, Fistral), surfing (Newquay), seafood (especially Padstow), the Eden Project, St Ives\' arts scene, the South West Coast Path, and Cornish pasties. The distinctive Cornish culture and language (a Celtic language related to Welsh and Breton) also draw visitors.' },
      { _key: 'faq-cor-5', question: 'What are the best villages in Cornwall?', answer: 'St Ives is the most famous — cobbled streets, galleries, and a beautiful harbour beach. Mousehole is a quaint fishing village often cited as one of England\'s prettiest. Padstow is the foodie capital. Port Isaac (filming location for Doc Martin) is charming but very busy. Fowey and Mevagissey are beautiful and slightly less crowded.' },
    ],
    seoTitle: 'Cornwall Staycation Guide 2026 — HolidayMyWay',
    seoDescription: 'Complete Cornwall travel guide for UK visitors: best beaches, how to get there, budget tips, and when to visit. Updated May 2026.',
  },
]

// ─── Articles ─────────────────────────────────────────────────────────────────

const articles = [
  {
    _id: 'seed-art-budget-hotels-barcelona',
    _type: 'article',
    title: 'Best Budget Hotels in Barcelona 2026',
    slug: { _type: 'slug', current: 'best-budget-hotels-barcelona-2026' },
    status: 'published',
    publishedAt: '2026-05-01T09:00:00Z',
    readTime: 8,
    excerpt: 'Our pick of the best budget hotels in Barcelona for 2026 — well-located, well-reviewed, and under £80 per night.',
    seoTitle: 'Best Budget Hotels in Barcelona 2026 | HolidayMyWay',
    seoDescription: 'The 8 best budget hotels in Barcelona under £80/night. Hand-picked for location, reviews, and value. Updated May 2026.',
    category: { _type: 'reference', _ref: 'seed-cat-destination-guides' },
    author: { _type: 'reference', _ref: 'seed-author-team' },
    destination: { _type: 'reference', _ref: 'seed-dest-barcelona' },
    affiliateLinks: [
      { _key: 'af1', program: 'booking', label: 'Search Barcelona hotels on Booking.com', url: 'https://www.booking.com/city/es/barcelona.html?aid=304142', placement: 'hotels' },
      { _key: 'af2', program: 'kayak', label: 'Compare Barcelona flights on Kayak', url: 'https://www.kayak.co.uk/flights/LON-BCN', placement: 'flights' },
    ],
    content: [
      p('Barcelona is one of the most visited cities in Europe — and the hotel market reflects that. But if you know where to look, there\'s excellent value to be found, even in high season. We\'ve hand-picked the eight best budget hotels in Barcelona for 2026, all rated 8.0+ on Booking.com and under £80 per night in low season.'),
      h2('What Makes a Good Budget Hotel in Barcelona?'),
      p('Location matters more than almost anything else in Barcelona. A cheap hotel in Sants (the main train station area) is still within 20 minutes of everything, but a cheap hotel in El Raval puts you inside the old city. We\'ve prioritised hotels within walking distance of the Gothic Quarter or with easy metro access.'),
      p('Amenities to look for: air conditioning is essential June–September, free WiFi is standard, and breakfast-included deals often represent good value versus café breakfasts (€4–€8 per person). Check-in flexibility matters if you\'re arriving early on a budget flight.'),
      h2('Best Areas to Stay in Barcelona on a Budget'),
      h3('El Raval'),
      p('The most central budget area — slightly rough around the edges but rapidly gentrifying. Excellent restaurant options, 5 minutes\' walk from Las Ramblas without the Las Ramblas prices. Budget hotels here run £45–£75 per night.'),
      h3('Sant Antoni'),
      p('Just west of El Raval and increasingly popular with locals. A fantastic weekend market, the best café scene in the city, and good mid-range accommodation. Expect to pay £55–£85 per night.'),
      h3('Gràcia'),
      p('A 15-minute walk or one metro stop from the old city. Far more residential and local-feeling. Prices are slightly lower than the centre and the neighbourhood is significantly more pleasant to spend time in. £50–£80 per night.'),
      h2('Our Top Picks for 2026'),
      p('All of the following have been rated 8.0 or above on Booking.com, are within a 20-minute walk or one metro stop of Las Ramblas, and are available for under £80 per night in low season (October–April).'),
      h2('When to Book Barcelona Hotels'),
      p('Book 8–12 weeks ahead for summer (June–August). For September and October travel, 4–6 weeks is usually sufficient. Last-minute deals do exist in January and February but availability is limited. The Mobile World Congress (late February) fills the city — avoid that week unless you\'re attending.'),
      h2('Tips for Getting the Best Price'),
      p('Compare Booking.com against the hotel\'s own website — many independent hotels will match or beat Booking.com prices for direct bookings. Free cancellation rates are almost always worth the small premium. Arriving on a Sunday or Monday night is typically 15–25% cheaper than a Friday or Saturday.'),
    ],
    comparisonTable: {
      heading: 'Best Budget Hotels in Barcelona 2026',
      columns: ['Hotel', 'Area', 'Rating', 'From (low season)', 'Book'],
      rows: [
        { _key: 'row1', name: 'Hotel Peninsular', values: ['El Raval', '8.2 / 10', '~£52/night', ''], affiliateUrl: 'https://www.booking.com/hotel/es/peninsular.html?aid=304142', highlight: false },
        { _key: 'row2', name: 'Hotel Banys Orientals', values: ['El Born', '8.6 / 10', '~£75/night', ''], affiliateUrl: 'https://www.booking.com/hotel/es/banys-orientals.html?aid=304142', highlight: true },
        { _key: 'row3', name: 'Room Mate Pau', values: ['Sant Antoni', '8.4 / 10', '~£68/night', ''], affiliateUrl: 'https://www.booking.com/hotel/es/room-mate-pau.html?aid=304142', highlight: false },
      ],
    },
    faqs: [
      { _key: 'faq-art-1', question: 'What is the best area to stay in Barcelona on a budget?', answer: 'El Raval offers the best combination of location and price — it\'s central, walkable to most attractions, and has the cheapest hotels in the old city. Sant Antoni is slightly pricier but considerably more pleasant. Avoid booking on Las Ramblas itself.' },
      { _key: 'faq-art-2', question: 'How much does a hotel in Barcelona cost per night?', answer: 'Budget hotels in Barcelona run £45–£80 per night in low season (October–April). In peak summer (July–August), expect to pay £90–£150+ for the same hotels. Booking 8–12 weeks ahead gives the best rates.' },
      { _key: 'faq-art-3', question: 'Is Booking.com or Airbnb better for Barcelona?', answer: 'For most travellers, hotels via Booking.com offer better value than Airbnb in Barcelona, particularly since the city has tightened short-term rental regulations. Hotels include daily cleaning, reception staff, and free cancellation options that Airbnb typically does not.' },
    ],
  },

  {
    _id: 'seed-art-amsterdam-48hrs',
    _type: 'article',
    title: '48 Hours in Amsterdam: The Budget Itinerary (2026)',
    slug: { _type: 'slug', current: '48-hours-amsterdam-budget-itinerary-2026' },
    status: 'published',
    publishedAt: '2026-05-08T09:00:00Z',
    readTime: 7,
    excerpt: 'How to spend 48 hours in Amsterdam on a budget — a day-by-day itinerary covering the must-sees without the tourist-trap prices.',
    seoTitle: '48 Hours in Amsterdam on a Budget 2026 | HolidayMyWay',
    seoDescription: 'A 48-hour Amsterdam budget itinerary for UK travellers. Day-by-day guide with costs, cheap eats, and the best free things to do.',
    category: { _type: 'reference', _ref: 'seed-cat-city-breaks' },
    author: { _type: 'reference', _ref: 'seed-author-team' },
    destination: { _type: 'reference', _ref: 'seed-dest-amsterdam' },
    affiliateLinks: [
      { _key: 'af3', program: 'booking', label: 'Search Amsterdam hotels', url: 'https://www.booking.com/city/nl/amsterdam.html?aid=304142', placement: 'hotels' },
      { _key: 'af4', program: 'kayak', label: 'Find cheap flights to Amsterdam', url: 'https://www.kayak.co.uk/flights/LON-AMS', placement: 'flights' },
    ],
    content: [
      p('Amsterdam is perfectly sized for a 48-hour city break. It\'s compact enough to see a huge amount without exhausting yourself, cultured enough to fill multiple days, and just affordable enough — if you plan well — to avoid breaking the bank. This itinerary shows how to get the most from two full days in the Dutch capital on a realistic UK budget.'),
      h2('Day One: Canal Belt, Jordaan, and the Rijksmuseum'),
      h3('Morning: Jordaan neighbourhood walk (free)'),
      p('Start by getting lost in Jordaan — the most photogenic district in the city. Wind through the narrow streets and across the famous Prinsengracht and Keizersgracht canals. Pick up a coffee and stroopwafel (Dutch caramel waffle, ~€2) from a street stall. The neighbourhood is best between 9am and 11am before tour groups arrive.'),
      h3('Midday: Lunch at a Dutch brown café'),
      p('Amsterdam\'s "brown cafés" (bruine kroegen) are the real locals\' pubs — dark wood, candles in bottles, and cheap, hearty food. A bitterballen (deep-fried snack) and beer lunch comes in at around €12–€15. Café \'t Smalle on Egelantiersgracht is one of the oldest and best.'),
      h3('Afternoon: Rijksmuseum (€22.50, book ahead)'),
      p('The Rijksmuseum is worth every euro. Rembrandt\'s The Night Watch alone is extraordinary. Allow 2–3 hours. Book tickets at least 48 hours ahead to avoid the queue — walk-up tickets are rare and often sold out. The I Amsterdam sign outside is free and photogenic, though very busy.'),
      h3('Evening: De Pijp and dinner'),
      p('The De Pijp neighbourhood is Amsterdam\'s most vibrant dinner destination. The Albert Cuyp Market (closes around 5pm) is the largest street market in the Netherlands — great for cheap snacks. For dinner, the Indonesian restaurants along Ferdinand Bolstraat serve rijsttafel (rice table, a feast of small dishes) for €18–€25 per person — one of Amsterdam\'s great food traditions.'),
      h2('Day Two: Anne Frank House, Museums, and Canal Cruise'),
      h3('Morning: Anne Frank House (book months ahead — seriously)'),
      p('The Anne Frank House is one of the most important historical sites in Europe and sells out months in advance. Tickets are €16 per adult and must be booked online. If you haven\'t pre-booked, the Jewish Historical Museum (€17) is an excellent and less-crowded alternative nearby.'),
      h3('Afternoon: Van Gogh Museum or free alternatives'),
      p('The Van Gogh Museum (€22) is exceptional — the largest collection of Van Gogh\'s work in the world. If you\'re budgeting tightly, the Vondelpark is free, beautiful, and locals actually use it. The FOAM Photography Museum (€15) is also excellent and less visited than the major art museums.'),
      h3('Evening: Canal cruise and farewell dinner'),
      p('A 1-hour canal cruise in the evening costs €16–€22 with operators like Blue Boat. The city looks completely different from the water, particularly at dusk. For a final dinner, the Foodhallen (indoor food market in Oud-West) is a budget-friendly option with 20+ different stalls — expect to spend €12–€18 per person.'),
      h2('Budget Summary for 48 Hours in Amsterdam'),
      p('Flights (return, booked 4–6 weeks ahead): £60–£100 | Accommodation (mid-range hotel, 2 nights): £120–£180 | Food and drink (all meals, 2 days): £60–£90 | Museums and activities: £50–£70 | Transport (airport + metro): £20–£30 | Total per person: £310–£470.'),
    ],
    faqs: [
      { _key: 'faq-ams-art-1', question: 'Is 48 hours enough time in Amsterdam?', answer: 'Yes — 48 hours is enough to see the major highlights: Rijksmuseum, Jordaan neighbourhood, a canal cruise, and one or two other museums. It\'s a compact city. If you can extend to 3–4 days, you\'ll be able to explore further afield and spend more time at each attraction without rushing.' },
      { _key: 'faq-ams-art-2', question: 'How much money do I need for a weekend in Amsterdam?', answer: 'Budget £300–£500 per person for a 48-hour trip from the UK, including return flights (£60–£100), 2 nights in a mid-range hotel (£60–£90/night), meals, and activities. Flying from a regional UK airport or travelling mid-week can reduce the flight cost significantly.' },
      { _key: 'faq-ams-art-3', question: 'How do I get from Amsterdam Schiphol Airport to the city centre?', answer: 'The train from Schiphol to Amsterdam Centraal runs every 15 minutes and takes 17 minutes. A single ticket costs €6.40. This is far cheaper and faster than a taxi (€35–€45) or Uber. Buy tickets at the yellow NS machines in the arrivals hall — contactless payment is accepted.' },
    ],
  },

  {
    _id: 'seed-art-cornwall-staycation',
    _type: 'article',
    title: 'Cornwall Staycation Guide 2026: Best Beaches, Tips, and Budget Advice',
    slug: { _type: 'slug', current: 'cornwall-staycation-guide-2026' },
    status: 'published',
    publishedAt: '2026-05-15T09:00:00Z',
    readTime: 10,
    excerpt: 'Everything you need to plan the perfect Cornwall staycation in 2026 — the best beaches, how to get there, where to stay, and how to visit on a budget.',
    seoTitle: 'Cornwall Staycation Guide 2026 — Best Beaches & Budget Tips | HolidayMyWay',
    seoDescription: 'Plan your 2026 Cornwall staycation: best beaches, self-catering tips, when to visit, and how to save money. Updated May 2026.',
    category: { _type: 'reference', _ref: 'seed-cat-uk-staycations' },
    author: { _type: 'reference', _ref: 'seed-author-team' },
    destination: { _type: 'reference', _ref: 'seed-dest-cornwall' },
    affiliateLinks: [
      { _key: 'af5', program: 'booking', label: 'Search Cornwall hotels and cottages', url: 'https://www.booking.com/region/gb/cornwall.html?aid=304142', placement: 'hotels' },
    ],
    content: [
      p('Cornwall is the undisputed capital of the UK staycation. No other county in England combines dramatic coastline, world-class beaches, a genuine food culture, and an independent spirit in quite the same way. In 2026, with overseas travel costs continuing to rise, Cornwall is having another record year — which means booking ahead is more important than ever.'),
      h2('The Best Beaches in Cornwall'),
      h3('Porthcurno'),
      p('The finest beach in Cornwall and one of the best in the UK. White-sand, clear turquoise water, and dramatic granite cliffs on both sides. It gets busy in July and August — arrive before 10am or after 4pm for a better experience. The Minack Theatre, carved into the clifftop above, is one of the most extraordinary performance venues in the world (worth visiting even if you\'re not seeing a show).'),
      h3('Kynance Cove'),
      p('On the Lizard Peninsula — the most southerly point of mainland Britain. Accessible only at low tide (check tidal charts before visiting — it fills with water at high tide). Serpentine rock formations, turquoise water, and a genuinely remote feel. The 20-minute cliff walk from the car park is part of the experience.'),
      h3('Fistral Beach, Newquay'),
      p('The UK\'s premier surf beach. The waves are consistent, the surf school scene is well-developed (Escape Surf School and Walkabout Surf School are both reputable), and Newquay itself has more amenities than most Cornish towns. Expect to pay £40–£60 for a 2-hour surf lesson.'),
      h3('Carbis Bay, St Ives'),
      p('The most family-friendly beach in Cornwall — shallow, sheltered, and with lifeguards throughout summer. St Ives itself is a 10-minute walk along the coast path and is one of the most attractive towns in Britain.'),
      h2('Where to Stay in Cornwall on a Budget'),
      p('Self-catering cottages represent the best value, particularly for groups or families. Sites like Sykes Cottages and Cottages.com have the widest selection. Book by October–November for the following summer — the best properties in desirable areas (St Ives, Padstow, Porthcurno) sell out extremely early.'),
      p('Camping is a genuinely good option in Cornwall — the weather is mild enough from late May. Trevalgan Touring Park near St Ives and Ayr Holiday Park have excellent reviews. Expect to pay £25–£45 per pitch per night in peak season.'),
      p('For solo travellers or couples on a tight budget, YHA hostels in Penzance and Coverack offer dormitory beds from £25 per night and private rooms from £65.'),
      h2('Getting to Cornwall Without a Car'),
      p('The train is genuinely viable. Great Western Railway runs London Paddington to Penzance in around 5 hours, with branch lines serving St Ives (change at St Erth), Newquay (change at Par), and Falmouth (change at Truro). Book well ahead — Advance fares can be under £30 single. Once in Cornwall, the bus network covers most coastal areas, though services can be infrequent in rural areas.'),
      h2('Money-Saving Tips for a Cornwall Holiday'),
      p('The National Trust covers significant swathes of the Cornish coast. Membership (£78 per adult, £138 per couple for 2026) pays for itself if you\'re visiting multiple properties — Glendurgan Garden, Trelissick, Godolphin, and sections of the Coast Path are all NT-managed. Parking alone at NT car parks can save £30–£50 over a week.'),
      p('Supermarkets over restaurants wherever possible for breakfast and lunch — Lidl in Truro or Penzance is far cheaper than anything in tourist areas. The Co-op is near many Cornish villages. Save restaurant meals for evenings, when local fish and chip shops represent exceptional value (£8–£12 for a proper portion).'),
    ],
    faqs: [
      { _key: 'faq-cor-art-1', question: 'When should I book a Cornwall holiday?', answer: 'For peak summer (July–August), book self-catering accommodation by October–November the year before. The best cottages and campsites in popular areas sell out months in advance. For May half-term or September travel, booking 3–4 months ahead is usually sufficient.' },
      { _key: 'faq-cor-art-2', question: 'Is Cornwall worth visiting in May or September?', answer: 'Yes — arguably better than peak summer. Beaches are quieter, prices are 20–30% lower, the weather is usually warm and sunny (Cornwall has the mildest climate in the UK), and local restaurants are less stretched. Sea temperatures are lower (around 14°C in May, 18°C in September) but surfing is still excellent.' },
      { _key: 'faq-cor-art-3', question: 'How much does a week in Cornwall cost?', answer: 'Budget roughly £400–£650 per week for a couple in self-catering accommodation, plus £30–£60 per day for food and activities. Petrol is an additional cost if driving. A family of four can expect £700–£1,000 per week all-in for a self-catering cottage, which is significantly cheaper than a comparable overseas package holiday.' },
    ],
  },
]

// ─── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🌍  Seeding HolidayMyWay Sanity dataset "${client.config().dataset}"...\n`)

  const docs: any[] = [
    siteSettings,
    author,
    ...categories,
    ...destinations,
    ...articles,
  ]

  for (const doc of docs) {
    try {
      await client.createOrReplace(doc)
      console.log(`  ✓  ${doc._type.padEnd(20)} ${doc._id}`)
    } catch (err: any) {
      console.error(`  ✗  ${doc._type.padEnd(20)} ${doc._id} — ${err.message}`)
    }
  }

  console.log(`\n✅  Seeded ${docs.length} documents.\n`)
  console.log('Next steps:')
  console.log('  1. Open /studio to verify documents appeared')
  console.log('  2. Add featured images to each destination and article')
  console.log('  3. Add your author photo')
  console.log('  4. Publish the site\n')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
