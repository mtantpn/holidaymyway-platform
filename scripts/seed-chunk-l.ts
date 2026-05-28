/**
 * Chunk L seed — 4 new articles + 3 new destinations (Tenerife, Lisbon, Seville).
 * Run: npm run seed:l
 * Idempotent — safe to run multiple times.
 */
import { config } from 'dotenv'
config({ path: '.env.local' })
import { createClient } from '@sanity/client'

const token = process.env.SANITY_API_WRITE_TOKEN
if (!token) {
  console.error('\n❌  SANITY_API_WRITE_TOKEN not set in .env.local\n')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 's6i0x1s0',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

// ─── PortableText helpers ─────────────────────────────────────────────────────

let kc = 500
const uid = (prefix = 'l') => `${prefix}${++kc}`

const p = (text: string) => {
  const k = uid()
  return {
    _type: 'block', _key: k, style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: `${k}s`, text, marks: [] }],
  }
}
const h2 = (text: string) => {
  const k = uid('h2l')
  return {
    _type: 'block', _key: k, style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: `${k}s`, text, marks: [] }],
  }
}
const h3 = (text: string) => {
  const k = uid('h3l')
  return {
    _type: 'block', _key: k, style: 'h3', markDefs: [],
    children: [{ _type: 'span', _key: `${k}s`, text, marks: [] }],
  }
}

// ─── Article 1: Dupe Destinations (Sam, Budget Travel Tips) ──────────────────

const postDupeDestinations = {
  _id: 'seed-post-dupe-destinations',
  _type: 'article',
  status: 'published',
  title: "Europe's Best Travel Dupes: Same Vibes, Half the Price",
  slug: { _type: 'slug', current: 'europe-best-travel-dupes-budget-alternatives' },
  excerpt: "TikTok's dupe destination trend is one of the smartest things to happen to budget travel in years. Here are six European destination swaps that genuinely deliver the same experience for significantly less money.",
  publishedAt: '2026-05-08',
  readTime: 7,
  seoTitle: "Europe's Best Travel Dupes 2026: Budget Alternatives to Expensive Destinations | HolidayMyWay",
  seoDescription: "Skip the overpriced tourist traps. These European destination dupes give you the same beaches, architecture, food, and atmosphere for half the cost. Updated for 2026 UK travellers.",
  author: { _type: 'reference', _ref: 'seed-author-sam' },
  category: { _type: 'reference', _ref: 'seed-cat-budget-travel' },
  content: [
    p("The dupe destination trend has been all over TikTok for the past two years, and honestly? It's one of the most useful things to come out of travel content in a long time. The idea is simple: instead of the expensive, overcrowded original, you go to somewhere that gives you the same vibe, the same core experience, and — most importantly — a much better time because it's not heaving with people who had the exact same idea as you."),
    p("I've tested most of these personally. Here's what actually works."),

    h2("Santorini Dupe: Kotor, Montenegro"),
    p("Santorini is extraordinary. It's also expensive (average accommodation £150–£250 a night in high season), overrun with cruise ship day-trippers, and increasingly difficult to enjoy without feeling like you're on a film set. Kotor is a genuinely stunning medieval walled city on Montenegro's Adriatic coast, with the dramatic mountain backdrop and the clear blue water you're actually looking for. Flights from the UK have expanded significantly — Ryanair and easyJet both fly to Tivat (20 minutes from Kotor) from around £60–£90 return. Hotels inside the old city walls cost £50–£80 a night. The food is brilliant and cheap. Nobody is pretending to be surprised by a donkey."),

    h2("Amalfi Coast Dupe: The Albanian Riviera"),
    p("The Amalfi Coast is beautiful, genuinely. It's also been on every travel influencer's grid since roughly 2015, it's about £180 a night minimum in season, and the roads are so narrow and busy in summer that you spend half your time stuck in traffic. The Albanian Riviera — particularly the stretch from Himara to Saranda — has the same turquoise water, the same dramatic cliffs, the same little fishing villages with excellent seafood restaurants. The difference is cost: accommodation is £35–£70 a night, a seafood dinner is £8–£12 a head, and you can walk a beach without shuffling sideways. Direct charter flights from the UK to Tirana have grown substantially. This is the one I recommend most strongly right now, before it stops being a dupe."),

    h2("Amsterdam Dupe: Ghent, Belgium"),
    p("Amsterdam is still brilliant. It's also been affected by overtourism to the point where the city has actively started trying to discourage bachelor parties and mass stag weekends. Accommodation averages £110–£160 a night. Ghent has everything you actually want from an Amsterdam trip: medieval canals, beautiful architecture, a brilliant café and restaurant scene, excellent cycling, and proper Belgian beer at Belgian prices (around €3–€4 a pint rather than Amsterdam's €6–€8). Flights to Brussels are cheap and frequent; Ghent is 30 minutes by train. Accommodation is £60–£80 a night for a good central option. It's one of the most underrated cities in Western Europe."),

    h2("Prague Dupe: Krakow, Poland"),
    p("Prague has a drinking tourism problem that's made the city centre genuinely unpleasant on Friday and Saturday nights, and prices in the tourist areas have caught up with Western Europe. Krakow has better medieval architecture, an intact old town that hasn't been turned into a bar crawl circuit, the extraordinary Wieliczka salt mine nearby, and Auschwitz-Birkenau if you want to add historical weight to your trip. Flights from the UK are frequent and cheap — often under £50 return from regional airports. Daily costs in Krakow are around 40% lower than Prague for the same standard of accommodation and food. It's not a dupe so much as a genuine upgrade in some respects."),

    h2("Ibiza Dupe: Tarifa, Spain"),
    p("Tarifa is Cadiz province's worst-kept secret — a windswept, bohemian town at the southernmost tip of Europe where the Atlantic meets the Mediterranean. It has brilliant beaches (Playa de los Lances is one of the best in Spain), world-class kitesurfing, a charming old town, and a laid-back nightlife scene without the industrial-scale clubbing of Ibiza. Flights to Malaga or Jerez are cheap; Tarifa is about 90 minutes by bus from either. It attracts a noticeably more interesting crowd than the big resort towns, accommodation is significantly cheaper, and you can actually have a conversation in a bar without shouting."),

    h2("Tuscany Dupe: Plovdiv, Bulgaria"),
    p("This one's a stretch in terms of landscape (Bulgaria's interior is different from Tuscany), but hear me out. What people actually want from a Tuscany trip is: beautiful old buildings, excellent food and wine, warm evenings, local character, and not spending £200 a night on a farmhouse. Plovdiv delivers on almost all of those: it has one of the best-preserved old towns in Eastern Europe, an excellent contemporary food scene, Bulgarian wine that's genuinely worth drinking, and prices that make the whole thing feel absurdly affordable. Flights to Sofia are cheap; Plovdiv is two hours by bus. If you want architectural beauty and good eating without Western European prices, Plovdiv should be on your list."),

    h2("One More: Dubrovnik Dupe: Split, Croatia"),
    p("We've written about this at length elsewhere — but the short version is that Split has the Roman walls, the Adriatic water, the seafood, and the general brilliance of Dubrovnik at about 60% of the price and without the cruise ships. September is the move."),

    p("None of these are compromises. In most cases they're genuinely better trips than the original — less crowded, less expensive, and more authentically themselves because they're not yet performing for Instagram. The best time to go is always before everyone else figures it out."),
  ],
  faqs: [
    {
      _key: 'ldupe-faq1',
      question: 'What is the dupe destination travel trend?',
      answer: "The dupe destination trend involves choosing a less famous but comparably beautiful or interesting destination instead of the expensive, overcrowded original. Examples include Kotor instead of Santorini, Ghent instead of Amsterdam, or Krakow instead of Prague. The 'dupe' typically offers the same core appeal — coastline, architecture, food scene, atmosphere — at significantly lower cost and without the tourist saturation of the original.",
    },
    {
      _key: 'ldupe-faq2',
      question: 'What are the cheapest European beach destinations for UK travellers in 2026?',
      answer: "Albania's Riviera and Montenegro's Adriatic coast are the standout budget beach destinations in Europe in 2026. Both offer clear water, dramatic scenery, and excellent food at prices significantly below Spain, Greece, and Italy. Bulgaria's Black Sea coast is also good value. For Atlantic beaches, Portugal's Alentejo coast and Morocco (accessible from southern Spain) are worth considering.",
    },
    {
      _key: 'ldupe-faq3',
      question: 'Which Eastern European cities are best for budget city breaks from the UK?',
      answer: "Krakow, Warsaw, and Gdansk in Poland are consistently excellent value. Bucharest, Romania is the cheapest capital in Europe. Sofia, Bulgaria is growing quickly and genuinely interesting. Plovdiv, Bulgaria and Brno, Czech Republic are smaller cities that offer the charm of Prague or Krakow without the tourist prices. All are accessible with cheap direct flights from UK regional airports.",
    },
  ],
}

// ─── Article 2: Cabin Bag Only Challenge (Andrea, Budget Travel Tips) ─────────

const postCabinBagOnly = {
  _id: 'seed-post-cabin-bag-only',
  _type: 'article',
  status: 'published',
  title: "I Travelled for 10 Days with Just a Cabin Bag — Here's My Exact Packing List",
  slug: { _type: 'slug', current: 'cabin-bag-only-packing-list-10-days' },
  excerpt: "The cabin bag only challenge is everywhere on TikTok, and with Ryanair charging £28 each way for a checked bag, it's become a genuine budget travel strategy. Here's exactly what I packed for 10 days in southern Europe — and the one thing I nearly regretted leaving behind.",
  publishedAt: '2026-05-14',
  readTime: 8,
  seoTitle: "Cabin Bag Only Packing List for 10 Days (2026) — What to Bring & What to Leave | HolidayMyWay",
  seoDescription: "Travel with just a cabin bag for 10 days and save on airline fees. Exact packing list tested in southern Europe, plus tips on which bag fits Ryanair and easyJet cabin dimensions.",
  author: { _type: 'reference', _ref: 'seed-author-andrea' },
  category: { _type: 'reference', _ref: 'seed-cat-budget-travel' },
  content: [
    p("I resisted the cabin bag only thing for longer than I should have. Ten days felt too long. I wouldn't have enough clothes. I'd have to do laundry in a sink. All of those objections turned out to be mostly wrong — and when I added up what I saved on bag fees for a 10-day trip (Ryanair charges £28 each way for a checked bag, so £56 return — more in peak season), it stopped feeling like an inconvenience and started feeling like a decision."),
    p("Here's exactly what I took for 10 days in Seville and Porto in May, and what I'd change if I did it again."),

    h2("The Bag"),
    p("This matters more than the packing list. The Ryanair cabin bag allowance for basic fare tickets is 40x20x25cm — that's the free underseat bag. To bring anything larger (the 55x40x20cm overhead cabin bag), you need to pay for priority boarding or a fare that includes it, which currently costs £6–£10 each way. Most cabin bag travel content assumes you have the larger bag — so just to be clear: the 40x20x25cm free bag is very small. It holds about 10 litres. The 55x40x20cm 'cabin bag' holds 40 litres. I used the latter."),
    p("For the bag itself, I used the Osprey Daylite Plus (20L) for years and it's fine for shorter trips. For 10 days I've switched to the Peak Design Travel Backpack 30L, which compresses down to fit overhead bins and has excellent organisation. It's expensive (£175), but it's the only bag you'll ever need. Budget-wise, the Cabin Zero 36L Classic and the Wandrd Duo Daypack are both around £45–£65 and Ryanair/easyJet compliant."),

    h2("Clothes (For 10 Days in Warm Weather)"),
    p("This is where most people overthink it. In warm weather, you need fewer clothes than you think. My list: 5 lightweight t-shirts (merino wool or synthetic dries faster than cotton — I used 3 Uniqlo Airism and 2 merino from Icebreaker), 2 lightweight shorts, 1 pair of jeans or chinos that can double as smart-casual for evenings, 1 linen shirt for nicer evenings, 4 pairs of underwear (merino again — washes and dries overnight), 4 pairs of thin socks, 1 lightweight packable layer for cool evenings or air-conditioned restaurants. That's it. The 5+4+4 rule (5 tops, 4 bottoms, 4 pairs of socks and underwear) circulates on TikTok and it's broadly right, though I find 5 tops is one too many if you have a merino option — those genuinely can be worn two or three days in a row."),

    h2("Shoes"),
    p("Shoes are the cabin bag killer. They're heavy, they take up space, and most people bring one too many pairs. I travelled with: one pair of comfortable walking shoes (I used New Balance 327s — not the most practical, but I wore them onto the plane), one pair of lightweight sandals for evenings and beach days. That's it. No flip-flops (the sandals cover it), no 'nicer' shoes (the walking shoes, if they're not obviously trainers, are fine for most restaurants). Your feet will be grateful too — if you're walking 12,000+ steps a day in a city, trainers beat sandals by a margin."),

    h2("Toiletries (The 100ml Rule)"),
    p("Everything liquid in a single 1-litre clear bag, all under 100ml. This is the part of cabin bag travel that actually requires planning. I decanted shampoo and conditioner into reusable 100ml bottles (buy a set of travel bottles for £3 on Amazon — it pays for itself the first time you use it). Solid shampoo bars bypass the liquid rule entirely and take up no space; Lush and Ethique both make good ones. Toothpaste, face wash, moisturiser: all in the smallest size I could buy or decant. The thing I never bother putting in the liquid bag: deodorant (stick form is fine, not a liquid), sunscreen (small SPF stick for face goes in the liquid bag, proper sunscreen you either buy there or check online — many good pharmacies in Spain and Portugal stock Factor 50)."),

    h2("Tech and Cables"),
    p("Laptop (if needed — on this trip I didn't bring one, used my phone for everything), phone charger, universal adapter, a small powerbank, earphones. I used a flat cable organiser pouch (£8 on Amazon) to stop these turning into the wire chaos that usually lives at the bottom of my bag. One tip: a MagSafe or wireless charging pad eliminates multiple cables at once if your phone supports it."),

    h2("The Things I Was Glad I Packed"),
    p("A dry bag or waterproof pouch for the beach (you can also buy them cheaply at most beach resorts, but having one guarantees I'll actually use it). A microfibre travel towel, which compresses to the size of a thick paperback. A reusable water bottle with a filter (Lifestraw or Brita make compact options) — this genuinely saves money and means I never had to buy water at tourist prices. A small first aid kit: ibuprofen, plasters, rehydration tablets, antihistamine. If you've ever needed any of these things at 11pm in a city you don't know, you know why this makes the cut."),

    h2("The One Thing I Nearly Regretted Leaving Behind"),
    p("A proper rain jacket. May in southern Europe is generally dry, but I had one afternoon of genuine downpour in Porto, and my lightweight layer was not adequate. Next time I'd either bring a packable rain jacket (they compress to the size of a fist) or accept I'd get wet. For reference: the Decathlon Quechua packable rain jacket costs £15 and folds into its own pocket."),

    h2("Does the Cabin Bag Only Strategy Actually Save Money?"),
    p("On a Ryanair or easyJet return trip: £28–£42 saved per person (checked bag fee each way), plus the time you save not queuing at baggage claim. On a two-week trip for two people, that's £112–£168 back in your pocket for a bit of packing discipline. The first time you do it you'll feel underprepared for the first two days. By day four you'll wonder why you ever checked a bag."),
  ],
  faqs: [
    {
      _key: 'lcabin-faq1',
      question: 'What size is the Ryanair free cabin bag?',
      answer: "Ryanair's free underseat personal item is 40x20x25cm (roughly 10 litres). To bring the larger overhead cabin bag (55x40x20cm), you need to pay for Priority boarding or a fare that includes it — currently around £6–£10 each way. Most cabin bag travel packing lists assume the larger 55x40x20cm bag. Always check Ryanair's current bag policy before booking as dimensions and fees change.",
    },
    {
      _key: 'lcabin-faq2',
      question: 'Can you really travel for 10 days with just a cabin bag?',
      answer: "Yes, particularly in warm weather. The key is choosing fast-drying fabrics (merino wool, synthetic blends rather than cotton), limiting yourself to 4–5 tops and using the rinse-and-dry method for one or two items during the trip, choosing versatile shoes (one pair of comfortable walking shoes and one pair of sandals covers most 10-day warm-weather trips), and decanting toiletries into travel-sized containers rather than bringing full-size products.",
    },
    {
      _key: 'lcabin-faq3',
      question: 'Which cabin bag fits both Ryanair and easyJet?',
      answer: "Ryanair's overhead cabin bag: 55x40x20cm. easyJet's cabin bag: 56x45x25cm. The Ryanair dimensions are the more restrictive — a bag that fits Ryanair will fit easyJet. Popular options that are compliant with both include the Cabin Zero 36L Classic (55x40x20cm exact), the Osprey Farpoint 40L (not always compliant — check before buying), and the Wandrd Duo Daypack. Check the airline's current bag page before every trip — policies and enforcement change.",
    },
  ],
}

// ─── Article 3: Albania Riviera Destination Guide (Andrea) ───────────────────

const postAlbania = {
  _id: 'seed-post-albania-riviera',
  _type: 'article',
  status: 'published',
  title: "Albania's Riviera: The European Beach Holiday That's Still Under the Radar (But Not for Long)",
  slug: { _type: 'slug', current: 'albania-riviera-travel-guide-uk' },
  excerpt: "Albania's southern coast has been the travel industry's best-kept secret for about three years now. Turquoise water, empty beaches, incredible food, and prices that feel like Europe from ten years ago. Here's everything you need to plan a trip.",
  publishedAt: '2026-05-20',
  readTime: 10,
  seoTitle: "Albania Riviera Travel Guide for UK Travellers 2026 — HolidayMyWay",
  seoDescription: "Complete guide to Albania's Riviera for UK visitors: best beaches, towns, flights, costs, safety, and when to go. Updated May 2026.",
  author: { _type: 'reference', _ref: 'seed-author-andrea' },
  category: { _type: 'reference', _ref: 'seed-cat-destination-guides' },
  content: [
    p("I want to start with a caveat: I've been recommending Albania to people for two years, and every single person who's gone has come back slightly annoyed at me for not telling them about it sooner. It's that kind of destination. The water is Adriatic blue (literally — it's on the same sea as Croatia and Montenegro), the beaches are significantly less crowded, the food is exceptional and cheap, and the whole thing costs roughly half what you'd pay in Croatia or Greece."),
    p("It is also genuinely changing fast. The coastal towns have seen significant infrastructure investment since 2022, flight connections from the UK have expanded dramatically, and the word is getting out. If you're going to go, the next two or three years are the sweet spot before it crosses the threshold into mainstream."),

    h2("Where Exactly is the Albanian Riviera?"),
    p("The Albanian Riviera refers to the southern coastline from the town of Vlora down to the Greek border at Saranda, passing through Dhermi, Himara, Palasa, Borsh, and Lukova. The coast road (the SH8) is one of the most spectacular drives in the Mediterranean — cliffs dropping to clear water, olive groves, small fishing villages. The sea is calmer than the Atlantic and clear enough to see the bottom at 5 metres."),
    p("Saranda is the main hub — a proper town with hotels, restaurants, and ferry connections to Corfu. Himara is the most popular coastal town with the best combination of infrastructure and authenticity. Dhermi has the best beaches and is increasingly popular with a younger, more party-oriented crowd. Ksamil, just north of Saranda, is the postcard destination — a beach with small islands you can swim to."),

    h2("Getting to Albania from the UK"),
    p("Tirana International Airport (TIA) has seen a significant expansion of UK routes. Direct flights operate from London Gatwick, Luton, Stansted, Manchester, and Birmingham, primarily with Wizz Air, Ryanair, and British Airways. Fares are typically £60–£140 return depending on season and how far ahead you book. Peak summer (July–August) sees prices rise; May, June, September, and October are the sweet spot for price and weather."),
    p("From Tirana, the Albanian Riviera is around 3–5 hours by road depending on your destination. You can hire a car (absolutely worth it — gives you flexibility to find the quieter beaches), take the public 'furgon' minibus system which is cheap and authentically chaotic, or book a private transfer (around £50–£80 from Tirana to Himara with a driver)."),

    h2("What Does a Trip to Albania's Riviera Actually Cost?"),
    p("This is where it gets interesting. Albania is priced roughly 40–60% below comparable Croatian or Greek destinations. In Himara in June: a good private apartment or guesthouse costs £30–£60 per night. A full sit-down meal with local wine is £8–£15 per person. Coffee is £1. A boat trip to a secluded beach is £10–£20 per person. Beer is £1.50–£2.50. A realistic daily budget for two people (accommodation, two proper meals, coffee, one activity) is £80–£120 total, not per person."),

    h2("The Beaches Worth Seeking Out"),
    p("Gjipe Beach is the one that appears on every Albania travel post for a reason: a 30-minute walk down a canyon from the road brings you to a secluded beach flanked by 200-metre cliffs with no road access, crystal water, and usually no more than 20–30 people. The effort filters out the day-trippers. Ksamil Beach has the small islands you can swim to — it's more popular but genuinely beautiful. Borsh Beach is one of the longest in Albania (7km) and still largely undeveloped. Drymades is close to Dhermi and slightly quieter than the main town beaches."),

    h2("Is Albania Safe for UK Travellers?"),
    p("Yes. Albania consistently ranks as one of the safer tourism destinations in the Balkans, and violent crime against tourists is rare. The FCDO travel advice is currently 'normal precautions' for the coastal areas and Tirana — the same level as France, Spain, and Italy. The main practical annoyances are: roads between Tirana and the coast can be poor in sections (a higher-clearance vehicle helps), tourist infrastructure is still developing (some restaurants have limited English menus, ATMs in smaller villages can be unreliable — bring cash in euros, which are widely accepted), and internet connectivity outside Tirana and the main coastal towns is variable."),

    h2("The Food Is Genuinely a Reason to Go"),
    p("Albanian cuisine is an underrated story. It sits at the crossroads of Italian, Greek, Ottoman, and Balkan cooking in a way that produces something genuinely its own. Tavë kosi (baked lamb with yoghurt) is the national dish and worth trying. Byrek (flaky pastry filled with spinach, cheese, or meat) is the standard breakfast from every bakery. Seafood on the coast is exceptional and cheap — grilled sea bass and bream caught the same morning, priced at around £6–£8 a portion. The local wine (Kallmet red, Shesh i Bardhe white) is drinkable to genuinely good and costs £4–£6 a bottle in a restaurant."),

    h2("Honestly — Is Now the Right Time to Go?"),
    p("Yes. The infrastructure has improved enough that a trip is comfortable and straightforward. The development that's coming (several large resort developments are planned for the coast) hasn't arrived yet. The prices still reflect where Albania was rather than where it's going. The beaches are not yet crowded in a way that detracts from them. This is the window."),
    p("The Albanian Riviera is the best value beach destination in Europe right now. That will not be true in five years. Book the flight before the summer hits its stride, aim for May–June or September–October, and rent a car. You'll spend less than any comparable trip to Croatia or Greece and have a better time."),
  ],
  faqs: [
    {
      _key: 'lalb-faq1',
      question: 'Do UK visitors need a visa for Albania?',
      answer: "UK passport holders can visit Albania visa-free for up to 90 days. No visa or pre-registration is required before travel. Your passport must be valid for the duration of your stay. Albania is not in the EU or Schengen Area, so EU's ETIAS scheme does not apply. Check the FCDO Albania travel page for current entry requirements before booking.",
    },
    {
      _key: 'lalb-faq2',
      question: 'What currency is used in Albania? Can I use euros?',
      answer: "Albania's official currency is the Albanian Lek (ALL). However, euros are widely accepted in tourist areas along the Riviera, in restaurants, accommodation, and shops. The exchange rate you'll get using euros directly is slightly less favourable than paying in Lek — so using local currency for larger purchases saves a small amount. ATMs are available in towns like Saranda and Himara; smaller villages may not have them, so carry cash. Most guesthouses and restaurants are cash-only.",
    },
    {
      _key: 'lalb-faq3',
      question: 'When is the best time to visit Albania\'s Riviera?',
      answer: "May, June, and September are the best months: the sea is warm (22–24°C in September), crowds are manageable, prices are lower than peak summer, and the weather is reliably good. July and August are the busiest months — Albanians from Tirana and diaspora visitors from Italy and Greece fill the coast, prices rise, and the best beaches get busier. October is still warm enough for swimming (19–21°C) and is excellent for hiking the coastal hills without summer heat.",
    },
  ],
}

// ─── Article 4: Seville City Break (Sam, City Breaks) ────────────────────────

const postSeville = {
  _id: 'seed-post-seville-city-break',
  _type: 'article',
  status: 'published',
  title: "48 Hours in Seville: The Spanish City Break That's Still Underrated in 2026",
  slug: { _type: 'slug', current: 'seville-city-break-guide-48-hours' },
  excerpt: "Seville has all the elements of a great city break — extraordinary architecture, brilliant food, flamenco, and genuinely warm weather in spring and autumn — but still gets overlooked in favour of Barcelona and Madrid. Here's why that makes it better, and how to do it in a weekend.",
  publishedAt: '2026-05-25',
  readTime: 9,
  seoTitle: "48 Hours in Seville: City Break Guide for UK Travellers 2026 | HolidayMyWay",
  seoDescription: "Seville city break guide for UK visitors: what to do, where to eat, where to stay, and how to get there. Perfect for a spring or autumn weekend. Updated May 2026.",
  author: { _type: 'reference', _ref: 'seed-author-sam' },
  category: { _type: 'reference', _ref: 'seed-cat-city-breaks' },
  content: [
    p("I've been to Barcelona five times and Madrid four times, and both are brilliant. But Seville has beaten both of them, every time I've been, for the specific feeling of actually enjoying where you are rather than ticking things off. It's warmer, it's less crowded, the food is cheaper and often better, and the whole city operates on a timetable that makes a lot more sense than anywhere in northern Europe."),
    p("Seville in spring (March–May) or autumn (September–November) is one of the best city break propositions in Europe. Here's how to spend 48 hours there properly."),

    h2("Getting to Seville from the UK"),
    p("Ryanair, easyJet, and Vueling all fly direct from London Stansted, Gatwick, and Bristol to Seville Airport (SVQ). The flight is about 2h 20m. Fares start from around £40–£60 return in shoulder season if you book 6–8 weeks ahead. From Manchester, easyJet flies direct in around 2h 45m."),
    p("The airport is about 8km from the city centre. The bus into town (EA line, Aeropuerto–Prado de San Sebastián) costs €4 and takes about 35 minutes. Taxis are around €20–€28 and take 20 minutes. Uber and Cabify both work in Seville and are often £3–£4 cheaper than official taxis."),

    h2("Where to Stay in Seville"),
    p("For a city break, staying in or near the Santa Cruz neighbourhood (the old Jewish quarter, directly adjacent to the cathedral) puts you within walking distance of everything worth seeing. Expect to pay £70–£110 per night for a good hotel in this area, or £55–£85 for a private apartment. Triana, across the river, is the more local alternative — bohemian, quieter in the evenings, and 15 minutes' walk from the centre. Budget options exist around the Alameda de Hércules area — it's a bit further out but a genuinely interesting neighbourhood with excellent tapas bars."),

    h2("Day One: The Big Things"),
    p("Start at the Real Alcázar. Book online before you go (£12–£15 per person) and arrive right when it opens to beat the tour groups. This is one of the most beautiful buildings in Europe — Moorish palace architecture at its finest, with extraordinary tilework and gardens. Allow two hours minimum; rushing it is a mistake."),
    p("After the Alcázar, walk the Barrio Santa Cruz — the narrow medieval streets that surround it. Have lunch at one of the restaurants in the maze of alleys (look for one with a handwritten daily menu rather than a printed tourist menu). Order the salmorejo rather than gazpacho — Seville's version of the cold tomato soup is thicker, richer, and topped with jamón and boiled egg. It's one of the best things you'll eat all trip."),
    p("In the afternoon, climb the Giralda tower (the cathedral's 97-metre bell tower) for views across the old city. The cathedral itself is enormous and impressive, though the interior is primarily for people with a specific interest in Gothic architecture. The Giralda view is worth the €12 entry."),
    p("The evening is for tapas and the Alameda de Hércules. Seville's tapas culture is different from the rest of Spain — in many traditional bars, tapas come free with every drink, or cost €1–€2 each. The Alameda is the local evening hub, packed with restaurants and bars and a very mixed crowd. Eat at 9pm, not 7pm. Drink fino sherry rather than beer — it's the local thing, it's about €1.50–€2.50 a glass, and it's genuinely perfect with fried food."),

    h2("Day Two: The Things Most People Miss"),
    p("Palacio de las Dueñas is the private palace of the House of Alba, and it's a genuine rival to the Alcázar for ornate Mudéjar architecture — but visited by a fraction of the number of people. It's open to the public and costs about £8 entry."),
    p("Cross the river to Triana for breakfast. The covered market (Mercado de Triana) has excellent coffee and pastries and is genuinely a local market rather than a tourist one. Walk along the Calle Betis — the riverside street on the Triana side — for views back across to the old town. This is the view that ends up on postcards."),
    p("If it's a Saturday, check whether there's a flamenco show happening at one of the smaller venues rather than the touristy tablao restaurants. The Casa de la Memoria runs shows most evenings for about €20 per person — intimate, in an old palace courtyard, performed by genuinely skilled dancers and musicians rather than the watered-down tourist versions."),

    h2("What Does a Weekend in Seville Cost?"),
    p("Return flights: £80–£130 depending on airport and booking timing. Two nights' accommodation: £140–£200 for a central option. Food and drink: tapas in Seville is genuinely cheap — budget £25–£40 per day per person for meals, drinks, and coffee. Activities (Alcázar, Giralda, Palacio de las Dueñas, optional flamenco show): £50–£60 total. Local transport (bus, Uber): £15–£20 for the weekend. Total for one person: roughly £310–£410. For two: £600–£780. That's competitive with almost any other European city break from the UK."),

    h2("Why Seville Rather Than Barcelona or Madrid?"),
    p("Barcelona and Madrid are louder, busier, and more expensive. Seville is the better place to actually sit somewhere beautiful and be in the place rather than processing it. The tapas culture means you eat more casually, for less money, in better settings. The Alcázar is architecturally more interesting than anything in Barcelona or Madrid, in my opinion. And crucially — in spring and autumn, when Barcelona is already filling with groups and Madrid is doing its thing, Seville is at exactly the right temperature and exactly the right level of visited: busy enough to feel alive, not so busy that you're shuffling."),
    p("It's one of the most underrated city break destinations in Europe, and it's been quietly underrated for years. That's not going to change quickly because it doesn't have the profile of Barcelona or the capital status of Madrid. Which means it stays good. Go in April. Go in October. Either way, go."),
  ],
  faqs: [
    {
      _key: 'lsev-faq1',
      question: 'What is the best time to visit Seville?',
      answer: "March to May and September to November are the best times for a Seville city break. Spring brings warm temperatures (18–24°C), orange blossom scent across the city, and the famous Semana Santa (Holy Week) and Feria de Abril festivals in March–April. Autumn has similar temperatures and smaller crowds. July and August are very hot (38–45°C) and genuinely uncomfortable for walking — not recommended for a city break unless you have specific reasons to go in summer.",
    },
    {
      _key: 'lsev-faq2',
      question: 'How long does it take to fly from the UK to Seville?',
      answer: "Direct flights from London to Seville Airport (SVQ) take approximately 2h 20m from Stansted, Gatwick, or Bristol. From Manchester it's around 2h 45m direct. easyJet, Ryanair, and Vueling all operate the route. Return fares start from around £40–£60 in shoulder season when booked 6–8 weeks ahead.",
    },
    {
      _key: 'lsev-faq3',
      question: 'Is Seville expensive for UK visitors?',
      answer: "Seville is one of the more affordable major Spanish cities. Tapas culture means you can eat well in good traditional bars for £15–£25 per person including drinks. Accommodation is cheaper than Barcelona or Madrid for equivalent quality. The main attractions (Alcázar, Giralda, cathedral) cost £12–£15 each with online booking. A realistic daily budget for a good trip is £50–£70 per person including accommodation, food, one attraction, and local transport.",
    },
  ],
}

// ─── New Destinations ─────────────────────────────────────────────────────────

const destTenerife = {
  _id: 'seed-dest-tenerife',
  _type: 'destination',
  name: 'Tenerife',
  slug: { _type: 'slug', current: 'tenerife' },
  country: 'Spain',
  region: 'europe-short-haul',
  iataCode: 'TFS',
  bookingCity: 'Tenerife',
  flightTimeFromLondon: '4h 20m',
  bestSeason: 'Year-round (winter sun Oct – Mar)',
  averageBudget: '£550–£850 per week including flights',
  excerpt: "Tenerife is the UK's go-to winter sun destination for good reason — reliably warm all year, with a volcanic landscape, excellent beaches, and some of the best resort infrastructure in Europe.",
  description: [
    p("Tenerife is the largest of the Canary Islands and the most visited Spanish island by UK tourists — around 3.5 million Brits visit every year. The appeal is straightforward: guaranteed warm weather even in January (average 20–21°C), direct flights from virtually every UK airport, and a well-developed tourist infrastructure that ranges from all-inclusive resorts to boutique rural retreats in the Anaga mountains."),
    h2("North vs South Tenerife"),
    p("The island is effectively two destinations. The south (Playa de las Américas, Los Cristianos, Costa Adeje) is where most UK visitors go: purpose-built resort towns with excellent beaches, pool complexes, and all-inclusive hotels. The north (Santa Cruz, Puerto de la Cruz, La Orotava) is quieter, greener, and more culturally interesting — the historic towns have genuine character and the Anaga Rural Park is one of the best hiking landscapes in the Canary Islands."),
    h2("Mount Teide"),
    p("Spain's highest peak (3,718 metres) and one of the world's largest volcanoes, Teide is the island's must-do experience. The cable car to 3,555m runs year-round and costs around £25 per person; the final summit hike requires a permit (free but limited, book through the Parque Nacional de Teide website months ahead). Even the drive through the national park on a clear day is worth it — the lunar landscape is genuinely extraordinary."),
    h2("Budget Tips for Tenerife"),
    p("Self-catering or apartment accommodation in the south saves significantly over all-inclusive in the same area. Eating one meal per day at local restaurants (rather than resort strip places) will halve your food costs. The Mercadona supermarket chain has branches across the island and is significantly cheaper than resort-area shops. Renting a car for a day to see the north and Teide is worth every penny — public transport to Teide is limited and slow."),
  ],
  faqs: [
    { _key: 'faq-tfe-1', question: 'When is the best time to visit Tenerife?', answer: 'Tenerife has genuine year-round appeal, which is unusual in Europe. October to March is peak season for UK visitors seeking winter sun — temperatures average 20–22°C. Summer (June–September) is hotter in the south (27–30°C) but can be misty and cooler in the north. April and May are quieter and cheaper while still warm.' },
    { _key: 'faq-tfe-2', question: 'Which airport should I fly into in Tenerife?', answer: "Tenerife has two airports. Tenerife South (TFS / Reina Sofía) is closest to the main resort areas (Los Cristianos, Playa de las Américas, Costa Adeje) and handles most UK charter and scheduled flights. Tenerife North (TFN / Los Rodeos) is closer to Santa Cruz and Puerto de la Cruz. Most UK visitors should book TFS unless they're specifically heading to the north of the island." },
    { _key: 'faq-tfe-3', question: 'Is Tenerife good for families?', answer: "Yes — it's one of the best family destinations from the UK. Siam Park (regularly voted Europe's best water park) is in the south, the warm and calm beaches are ideal for children, and the all-inclusive resort model means predictable costs. The Loro Parque zoo/aquarium in Puerto de la Cruz is also genuinely excellent, though pricey (around £35 per adult, £28 per child)." },
  ],
  seoTitle: 'Tenerife Travel Guide for UK Visitors 2026 — HolidayMyWay',
  seoDescription: "Complete Tenerife guide for UK travellers: best resorts, flights, Mount Teide, budget tips, and when to go. Updated 2026.",
}

const destLisbon = {
  _id: 'seed-dest-lisbon',
  _type: 'destination',
  name: 'Lisbon',
  slug: { _type: 'slug', current: 'lisbon' },
  country: 'Portugal',
  region: 'europe-short-haul',
  iataCode: 'LIS',
  bookingCity: 'Lisbon',
  flightTimeFromLondon: '2h 30m',
  bestSeason: 'March – June, September – November',
  averageBudget: '£500–£800 per week including flights',
  excerpt: "Lisbon is the city break that keeps getting better — ocean views, extraordinary tiled architecture, the best pastries in Europe, and a cultural energy that feels genuinely alive rather than curated for tourists.",
  description: [
    p("Lisbon has been one of the most talked-about European city breaks since roughly 2018, and the sustained interest is entirely justified. Built across seven hills overlooking the Tagus estuary, it's one of the most visually dramatic cities in Europe — all terracotta rooftops, yellow trams, and the kind of light that makes everything look slightly more beautiful than it is elsewhere."),
    h2("The Neighbourhoods"),
    p("Alfama is the oldest neighbourhood — a maze of narrow streets climbing the hill above the river, with excellent fado restaurants, viewpoints (miradouros), and the Castelo de São Jorge at the top. Bairro Alto is the nightlife district — bars packed close together, a young mixed crowd, active until 3–4am. Belém, 6km west along the river, is where you go for the Jerónimos Monastery and the original Pastéis de Belém custard tarts. LX Factory — a repurposed industrial complex in Alcântara — has the best Sunday market in Portugal."),
    h2("Food and Drink"),
    p("The pastel de nata (custard tart) is the iconic food, but Lisbon's food scene has expanded far beyond it. The Mercado da Ribeira (Time Out Market) is genuinely excellent — not a tourist trap but a proper curated food hall with vendors from some of the city's best restaurants. Bacalhau (salt cod, prepared in hundreds of ways) is everywhere and usually excellent. A full meal with wine at a traditional tasca costs £12–£18 per person."),
    h2("Getting Around Lisbon"),
    p("The seven hills make walking more tiring than it looks on a map. The tram system is atmospheric but slow and extremely crowded on the famous Line 28 (take it early morning or late evening if you want to enjoy it rather than survive it). The metro is the most efficient way to get around; a day pass costs around €6.65. Tuk-tuks are everywhere in the historic areas — charming for one ride, overpriced for anything else."),
  ],
  faqs: [
    { _key: 'faq-lis-1', question: 'Is Lisbon expensive?', answer: "Lisbon has become more expensive over the past five years due to increased tourism and a cost-of-living increase, but it's still cheaper than London, Paris, and Amsterdam for equivalent quality. Budget accommodation starts from £55–£80 per night in decent central areas. A meal at a local restaurant (not tourist zone) costs £12–£20 per person with wine. Coffee is £1–£1.50. The main costs are accommodation (which can be expensive in central Alfama and Chiado) and activities." },
    { _key: 'faq-lis-2', question: 'What is the best time to visit Lisbon?', answer: "March to June is the sweet spot: warm (18–25°C), long evenings, fewer crowds than peak summer, and lower prices. September and October are also excellent — summer heat eases, but the sea is still warm (20–21°C at nearby beaches like Cascais and Sesimbra). July and August are the busiest and most expensive months; temperatures can reach 35°C+ and accommodation prices peak." },
    { _key: 'faq-lis-3', question: 'How far is Lisbon from the coast?', answer: "Lisbon is built on the Tagus estuary, close to both the Atlantic coast and the Setúbal Peninsula beaches. Cascais is 40 minutes by train (€2.35 from Cais do Sodré), a charming coastal town with good Atlantic beaches. Sesimbra is around 45 minutes by bus, with calmer water and excellent seafood restaurants. Arrábida Natural Park beaches (accessible by car or tour) are arguably the most beautiful — dramatic limestone cliffs and turquoise water within an hour of the city." },
  ],
  seoTitle: 'Lisbon Travel Guide for UK Visitors 2026 — HolidayMyWay',
  seoDescription: "Complete Lisbon city break guide for UK travellers: flights, best neighbourhoods, food, budget tips, and when to go. Updated 2026.",
}

const destSeville = {
  _id: 'seed-dest-seville',
  _type: 'destination',
  name: 'Seville',
  slug: { _type: 'slug', current: 'seville' },
  country: 'Spain',
  region: 'europe-short-haul',
  iataCode: 'SVQ',
  bookingCity: 'Seville',
  flightTimeFromLondon: '2h 20m',
  bestSeason: 'March – May, September – November',
  averageBudget: '£450–£700 per week including flights',
  excerpt: "Seville is the most atmospheric city in Spain — Moorish palaces, free tapas culture, flamenco in courtyard venues, and perfect spring and autumn weather that makes it a near-flawless city break destination.",
  description: [
    p("Seville is the capital of Andalusia and one of the most beautiful cities in Europe, full stop. Unlike Madrid (vast, formal, exhausting) or Barcelona (brilliant but increasingly touristy), Seville has maintained a quality that's harder to define — it feels like a real place that's also extraordinarily beautiful, rather than a heritage site that people happen to live in."),
    h2("The Real Alcázar"),
    p("The Royal Palace of Seville is one of the finest examples of Moorish architecture in the world and significantly more human in scale than the Alhambra in Granada. The gardens alone are worth the entry fee (£12–£15 online). Book the first entry slot of the day and you'll have it largely to yourself for the first hour."),
    h2("Seville's Tapas Culture"),
    p("Seville still maintains the tradition of free tapas with drinks in many bars — order a glass of fino sherry or a cerveza and receive a small plate of food. In the Alameda de Hércules area and around the Triana neighbourhood, this is common practice. Even where tapas aren't free, raciones (larger sharing portions) cost £4–£8 and a full meal for two with wine rarely exceeds £30 outside tourist zones."),
    h2("Flamenco"),
    p("Seville is the home of flamenco and the best place to see it performed properly rather than performed for tourists. The Casa de la Memoria runs intimate shows in a historic courtyard for around £20 per person — book ahead as it sells out. Avoid the all-inclusive 'dinner and show' tablao packages; they're expensive and the quality is variable."),
    h2("Day Trips from Seville"),
    p("Córdoba is 45 minutes by AVE high-speed train (around £20 return if booked ahead) and home to the Mezquita — the extraordinary mosque-cathedral that's one of the most important buildings in Europe. Granada and the Alhambra are 2.5 hours by bus or train and absolutely worth an overnight stay if you have the time. Cádiz, the ancient Atlantic port city, is 1h 30m by train and has excellent beaches and one of Spain's best carnival celebrations."),
  ],
  faqs: [
    { _key: 'faq-svq-1', question: 'Is Seville good for a long weekend city break?', answer: "Seville is excellent for 3–4 nights. The main sights (Alcázar, Giralda, Barrio Santa Cruz, Triana) are walkable and take 2–3 days to see properly without rushing. A Thursday evening to Monday morning trip covers everything, with time for day trip options. Anything under 2 nights doesn't do it justice." },
    { _key: 'faq-svq-2', question: 'When is Semana Santa in Seville?', answer: "Semana Santa (Holy Week) falls the week before Easter (March or April). Seville's processions are the most famous in Spain — extraordinary visual spectacles of floats, brotherhoods in robes, and thousands of spectators. Note: accommodation prices double or triple during this week and book out months in advance. If you want to experience it, plan well ahead. If you want to avoid the crowds, choose a different week." },
    { _key: 'faq-svq-3', question: 'How do I get from Seville airport to the city centre?', answer: "The EA bus (Especial Aeropuerto) runs from Seville Airport to Prado de San Sebastián bus station in the city centre every 30 minutes and costs €4. The journey takes around 35 minutes. Taxis are fixed-rate (around £20–£25) and take 20 minutes. Uber and Cabify are also available from Seville Airport and are often slightly cheaper than taxis for the same journey time." },
  ],
  seoTitle: 'Seville Travel Guide for UK Visitors 2026 — HolidayMyWay',
  seoDescription: "Seville city break guide for UK travellers: Real Alcázar, tapas culture, flamenco, flights, costs, and best time to go. Updated 2026.",
}

// ─── Run ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n🌱  HolidayMyWay — Chunk L seed\n')

  const docs = [
    postDupeDestinations,
    postCabinBagOnly,
    postAlbania,
    postSeville,
    destTenerife,
    destLisbon,
    destSeville,
  ]

  for (const doc of docs) {
    const d = doc as any
    console.log(`  → ${d._type}: ${d.name ?? d.title}`)
    await client.createOrReplace(d)
  }

  console.log('\n✅  Done. 4 articles + 3 destinations seeded.\n')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
