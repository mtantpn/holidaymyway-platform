/**
 * Chunk K seed — adds Sam Rivers, Andrea Costa, and 3 new blog posts.
 * Run: npx tsx scripts/seed-chunk-k.ts
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

let kc = 200 // start high to avoid collisions with seed.ts keys
const uid = (prefix = 'k') => `${prefix}${++kc}`

const p = (text: string) => {
  const k = uid()
  return {
    _type: 'block', _key: k, style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: `${k}s`, text, marks: [] }],
  }
}
const h2 = (text: string) => {
  const k = uid('h2')
  return {
    _type: 'block', _key: k, style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: `${k}s`, text, marks: [] }],
  }
}
const h3 = (text: string) => {
  const k = uid('h3')
  return {
    _type: 'block', _key: k, style: 'h3', markDefs: [],
    children: [{ _type: 'span', _key: `${k}s`, text, marks: [] }],
  }
}

// ─── Authors ──────────────────────────────────────────────────────────────────

const authorSam = {
  _id: 'seed-author-sam',
  _type: 'author',
  name: 'Sam Rivers',
  slug: { _type: 'slug', current: 'sam-rivers' },
  bio: "Sam is DoseOfHoliday's Budget Travel Researcher. She's flown Ryanair more times than she'd like to admit, once spent a week in Porto on £280 (including flights), and is convinced the best travel hack is simply booking earlier than feels comfortable. She tests budget strategies, compares booking platforms, and writes the kind of practical advice that saves you money without making your trip worse.",
  socialLinks: [
    { _key: 'sam-tw', platform: 'Twitter', url: 'https://twitter.com/holidaymyway' },
  ],
}

const authorAndrea = {
  _id: 'seed-author-andrea',
  _type: 'author',
  name: 'Andrea Costa',
  slug: { _type: 'slug', current: 'andrea-costa' },
  bio: "Andrea writes about city breaks, weekend escapes, and European travel for DoseOfHoliday. Based in London, she tries to leave at least once a month. She's been to Croatia four times and has strong opinions about Split versus Dubrovnik (Split, always Split). She writes the way she travels — with a plan, but loose enough to find something better.",
  socialLinks: [
    { _key: 'andrea-ig', platform: 'Instagram', url: 'https://instagram.com/holidaymyway' },
  ],
}

// ─── Blog post 1: Travel Tips (Sam) ──────────────────────────────────────────

const post1 = {
  _id: 'seed-post-booking-checklist',
  _type: 'article',
  title: '9 Things I Always Check Before Booking Any Holiday in 2026',
  slug: { _type: 'slug', current: '9-things-check-before-booking-holiday-2026' },
  excerpt: "I've made expensive holiday booking mistakes and I've learned from every one of them. Here's the checklist I actually use — covering flight pricing traps, accommodation location pitfalls, insurance errors, and the tourist tax most people forget to budget for.",
  publishedAt: '2026-04-15',
  readTime: 8,
  seoTitle: '9 Things to Check Before Booking a Holiday in 2026 — HolidayMyWay',
  seoDescription: "Don't book your next holiday without checking these nine things first. Practical pre-booking checklist for UK travellers — covering flights, hotels, travel insurance, entry requirements, and more.",
  author: { _type: 'reference', _ref: 'seed-author-sam' },
  category: { _type: 'reference', _ref: 'seed-cat-budget-travel' },
  tags: [
    { _type: 'reference', _ref: 'seed-cat-budget-travel' },
  ],
  content: [
    p("I've booked probably fifty holidays in the past several years. Some were brilliant. Some were expensive lessons. The expensive ones almost always had one thing in common: I was in a hurry, I clicked too fast, and I didn't do the basics. Here's my actual pre-booking checklist — not the stuff everyone already knows, but the things that genuinely make a difference."),

    h2('1. Is That "Cheap" Flight Actually Cheap Once You Add Bags?'),
    p("Ryanair's £29 return fare sounds incredible until you add a cabin bag (around £20–£28 each way), and suddenly you're at £100+ for what looked like a bargain. Before you celebrate any headline fare, figure out your actual baggage needs and build them in from the start. Ryanair's free bag is genuinely small — test it with your usual bag before you assume it qualifies. When comparing across airlines, always compare the total cost including one checked bag if you need one."),

    h2('2. Have You Checked Regional Airports?'),
    p("Flying from Leeds Bradford, Bristol, or East Midlands instead of Heathrow or Gatwick often saves serious money — not just on the airfare, but on parking, the drive, and your sanity. I flew to Lanzarote from Bristol last year, saved £38 on the fare, and spent nothing on parking (mate dropped me off). Skyscanner lets you tick 'nearby airports' when searching — it takes about ten extra seconds and can save you a lot more than that."),

    h2('3. When Are You Actually Booking?'),
    p("The 'book on a Tuesday' thing has been debunked to death, but timing does matter. For European short-hauls, 6–8 weeks out is usually the sweet spot. For summer holidays, January to March is when good availability and reasonable prices overlap. Book in August for the following August and you're competing with everyone else who left it too late. Google Flights' price graph is useful here — it shows you whether you're booking at a high point in the pricing cycle."),

    h2('4. Does Your Destination Have a Tourist Tax in 2026?'),
    p("Barcelona has had one for years. Amsterdam raised theirs to 12.5% in 2024. Venice now charges a day-tripper fee. More destinations are adding or increasing them. These aren't massive amounts, but they're worth knowing about before you budget — particularly if you're staying a week. A quick search for '[destination] tourist tax 2026' takes less than a minute."),

    h2('5. Have You Actually Compared Travel Insurance?'),
    p("Half the policies UK travellers buy are effectively useless for anything other than a cancelled flight. The excess on medical claims can be so high that small incidents aren't worth claiming. Pre-existing condition exclusions catch people out all the time. Use a comparison site, filter by the medical cover level you actually need, and read the activity exclusions — if you're going skiing, cycling, or doing anything active, check it's covered. The difference between a £15 and a £30 policy is usually significant."),

    h2('6. Is the Hotel Where You Think It Is?'),
    p("I once booked a 'Barcelona city centre' hotel that was technically in the city centre of a suburb, forty minutes by train from anything worth seeing. Before you confirm any accommodation, open Google Maps and check the actual location. Look up the nearest metro or bus stop. Check what neighbourhood it's in and whether that neighbourhood is what you think it is. 'Beachfront' can mean the beach is a 20-minute walk via a main road."),

    h2("7. Have You Set Up a Price Alert?"),
    p("Skyscanner and Google Flights both let you monitor specific routes and alert you when prices change. I set these up months before I'm ready to book — you see the normal price range, you know when something is genuinely good value, and you don't have to wonder whether it'll get cheaper or not. This is especially useful for long-haul flights where prices fluctuate more dramatically."),

    h2("8. What Are the Entry Requirements Right Now?"),
    p("UK passport holders have different rules in different places post-Brexit. Your passport needs to be valid for the duration of your stay in most EU countries, but rules vary elsewhere. ETIAS — the EU's new travel pre-registration system — is still expected to launch; always check before booking to any Schengen destination. Some countries outside Europe require visas that you can't get on arrival. The FCDO travel pages are the most reliable source; check them before you book, not before you fly."),

    h2("9. Can You Actually Afford What You've Budgeted?"),
    p("This is the one that gets people most often — including me, on my first solo trip, when I ended up eating supermarket sandwiches for the last two days because I'd been wildly optimistic about daily spending. Build your budget realistically: accommodation per night, two proper meals per day (not 'I'll just eat street food'), local transport, one paid activity or entrance fee, and at least one sit-down dinner where you have more than one course. Then add 20%. If the trip doesn't fit that budget comfortably, adjust something rather than hoping it works out."),

    p("None of this is revolutionary. But it's surprising how many people skip most of it and then wonder why the trip cost more than expected, or why the hotel was in the wrong place, or why the insurance didn't cover what they needed. Ten minutes before you click 'book' is worth a lot more than it sounds."),
  ],
  faqs: [
    {
      _key: 'post1-faq1',
      question: 'When is the best time to book a cheap holiday from the UK?',
      answer: 'For European short-haul flights, 6–8 weeks before travel usually offers the best balance of price and availability. For summer holidays, booking between January and March tends to give the best fares. Setting up price alerts on Skyscanner or Google Flights for your preferred routes is the most reliable approach.',
    },
    {
      _key: 'post1-faq2',
      question: 'How do I avoid hidden fees when booking cheap flights?',
      answer: "Always add your actual baggage needs before comparing prices. Budget airlines like Ryanair and easyJet charge separately for cabin bags above a small personal item, and for checked luggage. Build in the bag fee from the start so you're comparing real total costs. Also check for airport check-in fees — both airlines charge extra if you check in at the airport rather than online.",
    },
    {
      _key: 'post1-faq3',
      question: 'Which travel insurance comparison site is best for UK travellers?',
      answer: 'MoneySuperMarket, Compare the Market, and GoCompare all have solid travel insurance comparison tools. Filter by the level of medical cover you need (minimum £2m is generally recommended), check the excess fees, and read the activity exclusions carefully if you plan to do anything sporty. Price alone is a bad guide to quality for travel insurance.',
    },
  ],
}

// ─── Blog post 2: Weekend Gateway (Andrea) ───────────────────────────────────

const post2 = {
  _id: 'seed-post-split-croatia',
  _type: 'article',
  title: 'A Weekend in Split, Croatia: What to Do, Where to Stay, and How to Keep It Under £450',
  slug: { _type: 'slug', current: 'weekend-in-split-croatia-guide-2026' },
  excerpt: "Split is everything Dubrovnik used to be before the cruise ships arrived — old city walls, clear Adriatic water, brilliant seafood, and a crowd that's mostly people who've done their research. Here's how to do it properly, and cheaply.",
  publishedAt: '2026-04-22',
  readTime: 9,
  seoTitle: 'Weekend in Split Croatia 2026 — Full Guide for UK Travellers | HolidayMyWay',
  seoDescription: 'Planning a weekend in Split, Croatia? Our guide covers flights from the UK, where to stay, what to do, what to eat, and exactly what it costs. Updated for 2026.',
  author: { _type: 'reference', _ref: 'seed-author-andrea' },
  category: { _type: 'reference', _ref: 'seed-cat-city-breaks' },
  content: [
    p("I've been to Dubrovnik. It's spectacular. It's also completely overrun — in summer it genuinely feels like a Disney version of itself, with tour groups shuffling through the old town at speed and every restaurant charging Mayfair prices for mediocre food. Split is what Dubrovnik used to be. I went last September, and I'm already planning to go back."),

    h2('Why Split, and Why Now?'),
    p("Split is Croatia's second city and in my opinion its most interesting — a working town with a spectacular Roman emperor's palace plonked in the middle of it, turned over centuries into a neighbourhood where people actually live. There are restaurants, bars, and laundry lines inside 1,700-year-old walls. It's properly strange and brilliant. It's also significantly cheaper than Dubrovnik and hasn't yet hit the same level of tourist saturation. September is the window — sea is still warm, crowds have thinned, and prices are noticeably down from August peaks."),

    h2('How to Get to Split from the UK'),
    p("Direct flights run from London Gatwick, Stansted, Manchester, Bristol, Edinburgh, and Birmingham, mostly on easyJet, Ryanair, and Jet2. The flight is around 2 hours 30 minutes. Shoulder season fares — May, June, and September to early October — are where the value is. I paid £94 return from Gatwick in September, booked about eight weeks out. Avoid mid-July to mid-August unless you specifically want to be hot, crowded, and paying peak prices for everything."),

    h2('Where to Stay in Split'),
    p("The old town (inside Diocletian's Palace) is the obvious choice, and staying inside a 1,700-year-old palace complex is genuinely brilliant. But rooms are expensive and the streets around the bars can be noisy until 2am or later. My preference: Varoš or Manuš, the residential neighbourhoods immediately west of the palace. Five minutes' walk from the palace walls, quieter, and meaningfully cheaper. Expect to pay £70–£100 per night for a decent private apartment in September on Booking.com or Airbnb — less if you book six or more weeks ahead."),

    h2('What to Do in Split (the Non-Touristy Version)'),
    p("Walk the palace walls at sunrise or early morning, before the day-trippers arrive — it's included in entry to the Vestibule and the views are worth getting up early for. Climb Marjan Hill, the forested headland west of the city, for panoramic views over Split and the islands — it takes about 40 minutes to the top and costs nothing. Take the 25-minute ferry to Brač Island for an afternoon — it runs several times a day from the harbour, costs about €3 each way, and gives you a proper Adriatic island beach with a fraction of Split's crowds."),

    h3('Where to Eat Without Getting Ripped Off'),
    p("The market (Pazar) near the east gate of the palace is the place for breakfast — fresh produce, cheap pastries, the best espresso I had all trip. For lunch and dinner, avoid anything on the Riva (the seafront promenade) and anything with photos in the window inside the palace — these are almost exclusively tourist traps. Walk a few streets back and you'll find restaurants where locals actually eat. I had the best grilled fish of my entire trip at a place near the fish market that had no English-language sign, two tables outside, and cost €14 for the fish, salad, bread, and a glass of local white."),

    h2('What Does a Weekend in Split Actually Cost?'),
    p("Here's a realistic breakdown for two nights:"),
    p("Flights (return, Gatwick): £90–£150 depending on when you book and from which airport. Accommodation (two nights, private apartment): £140–£200. Food and drink — two proper meals a day, coffee, one or two drinks in the evening: £25–£35 per day. Activities and local transport, including the Brač ferry: £30–£50 for the weekend. Total: roughly £310–£430 per person, or around £600–£860 for two. For a three-day trip to somewhere genuinely different, that's very solid value."),

    h2('Honestly — Is Split Worth It in 2026?'),
    p("Yes, particularly in September. The Adriatic is still 23–24°C, the summer crowds have gone, and prices across accommodation, food, and flights are all noticeably lower than peak season. I'd also strongly consider staying an extra night and doing a day trip to Trogir — 30 minutes by bus (€3), a tiny medieval walled city on its own island that's even less visited than Split. Or take the fast catamaran to Hvar for the day if you want something with more nightlife energy. Split is the right base for all of it."),

    p("The smart move in Croatia right now is to go to Split instead of Dubrovnik, stay in Varoš, eat at the market, and leave an afternoon free for an island. You'll spend less, enjoy it more, and come back without the vague feeling that you've visited a heritage site rather than a real place."),
  ],
  faqs: [
    {
      _key: 'post2-faq1',
      question: 'Is Split cheaper than Dubrovnik?',
      answer: 'Yes, significantly. Accommodation in Split is typically 30–50% cheaper than Dubrovnik for similar quality, and restaurant prices are noticeably lower. There are also no cruise ship surcharges affecting Split to the same degree as Dubrovnik. September is the best month for value — still warm, crowds reduced, and prices lower than July and August.',
    },
    {
      _key: 'post2-faq2',
      question: 'Which UK airports fly direct to Split?',
      answer: 'Direct flights to Split Airport (SPU) operate from London Gatwick, Stansted, Manchester, Bristol, Birmingham, and Edinburgh, primarily with easyJet, Ryanair, and Jet2. Direct flights mostly run April to October. In winter, most routes switch to connections via Zagreb or other hubs.',
    },
    {
      _key: 'post2-faq3',
      question: 'What is the best time of year to visit Split?',
      answer: 'September is the sweet spot for UK travellers: the Adriatic is still warm (22–24°C), the peak summer crowds have gone, and both flights and accommodation are notably cheaper than July and August. May and June are also excellent — warm, less crowded than summer, with a full schedule of restaurants and attractions. July and August are the busiest and most expensive months.',
    },
  ],
}

// ─── Blog post 3: Budget Holiday Planning (Sam) ──────────────────────────────

const post3 = {
  _id: 'seed-post-budget-holiday-guide',
  _type: 'article',
  title: 'How to Plan a Budget Holiday in 2026 Without Living on Noodles',
  slug: { _type: 'slug', current: 'how-to-plan-budget-holiday-2026' },
  excerpt: "Budget travel in 2026 is genuinely good — more affordable destinations, more tools to find deals, more flexibility in how you go. The difference between a stressful budget trip and a brilliant one is almost always planning, not luck. Here's the approach that consistently works.",
  publishedAt: '2026-05-01',
  readTime: 11,
  seoTitle: 'How to Plan a Budget Holiday in 2026 — Complete UK Guide | HolidayMyWay',
  seoDescription: 'Step-by-step guide to planning a budget holiday from the UK in 2026. Covers destination choice, flight timing, accommodation, daily budgets, cashback, and the mistakes most people make.',
  author: { _type: 'reference', _ref: 'seed-author-sam' },
  category: { _type: 'reference', _ref: 'seed-cat-budget-travel' },
  content: [
    p("There's a version of budget travel that's miserable: cramped overnight buses, questionable hostels, choosing between lunch and seeing the thing you actually came to see. That's not what this is about. This is about making your money go further without making your trip worse. After years of doing this with varying success, here's the method that consistently works."),

    h2('Step 1: Choose Your Destination Based on Total Cost, Not Just Cheap Flights'),
    p("The cheapest flight doesn't always lead to the cheapest trip. This is one of the most common traps. Flying Ryanair to a popular Spanish resort for £40 return sounds great — but if accommodation is £120 a night and beer is £8 a pint, your cheap flight is irrelevant. The real number is total trip cost: flights + accommodation + food + activities + local transport."),
    p("The best value destinations for UK travellers in 2026 are in Eastern Europe (Poland, Czech Republic, Hungary, Bulgaria), Portugal outside of Lisbon and the Algarve peak season, and newer arrivals like Albania, Montenegro, and Georgia — all of which are genuinely stunning, significantly cheaper than Western Europe, and seeing growing UK visitor numbers for exactly that reason. If you want sun and sea without the western Mediterranean price tag, look east."),

    h2('Step 2: Master the Timing of Flight Booking'),
    p("For European short-hauls, booking 6–8 weeks out usually hits the sweet spot between cheap fares and decent seat availability. Too early (more than three months) and you're often paying pre-sale prices. Too late (under four weeks) and the cheap seats are almost always gone. For summer flights, January to March is consistently the best window. For autumn breaks, book in June or July."),
    p("The single most useful tool I've found is the 'whole month' calendar view on Skyscanner. Shift your dates by one or two days either side and you'll often find the exact same flight £40–£60 cheaper. Flying on a Wednesday instead of a Friday, or returning on a Tuesday instead of a Sunday, is genuinely significant."),

    h2('Step 3: Think Differently About Accommodation'),
    p("Hotels are not the only option. Private apartments booked through Booking.com or Airbnb are often meaningfully cheaper than hotels in the same neighbourhood, and they give you a kitchen. That kitchen matters more than it sounds: making your own breakfast every day (rather than paying €15 a head at the hotel) and cooking in one evening during a week's trip easily saves £50–£80 total. That's not nothing."),
    p("Aparthotels are worth investigating in city break destinations — they're often similar price to a mid-range hotel but with a kitchenette and more space. Hostels have also improved dramatically in the past five years; many now offer private rooms at hostel prices, and the social infrastructure (communal areas, organised activities) can be genuinely useful if you're travelling solo."),

    h2('Step 4: Build a Real Daily Budget, Not an Optimistic One'),
    p("My rule is to budget for a good day, not a perfect one, and definitely not an unlikely one. A good day means: breakfast at a café, lunch at a local restaurant (not a tourist trap, but not a supermarket sandwich either), an afternoon coffee or snack, one dinner where you order properly, two or three drinks, local transport where needed, and one paid activity or entrance fee."),
    p("For most Western European cities in 2026, that's £70–£90 per person per day. Eastern Europe: £40–£60. Southeast Asia or Central America: £30–£45. Then add 20% as a buffer for the things you didn't plan — the spontaneous ferry trip, the round you bought, the market stall you couldn't resist. The 20% buffer is not optional. It's the difference between a comfortable trip and a stressed one."),

    h2('Step 5: Use Cashback and the Right Cards'),
    p("This one's genuinely underused. TopCashback and Quidco both offer cashback on hotel and flight bookings made through their portals — typically 2–5% on major booking platforms. On a £400 hotel booking, that's £8–£20 back for doing absolutely nothing differently. It adds up across a trip."),
    p("The Halifax Clarity card and Barclaycard Rewards card both charge zero foreign transaction fees and give you close to the real exchange rate. Most UK debit cards charge 2–3% on every foreign currency transaction. Use the right card and you're keeping an extra £20–£30 on a £1,000 spend. Over multiple trips a year, it's a meaningful saving for one small piece of admin."),

    h2('Step 6: Know What to Spend On and What to Skip'),
    p("Worth spending more on: your accommodation location (the wrong area ruins a city break regardless of how cheap the room was); good travel insurance (the difference between a £15 and a £35 policy is often massive in terms of what it actually covers); and one or two genuinely good experiences per trip — a proper dinner, a guided tour, a boat trip. These are the things you remember."),
    p("Worth saving on: airport food and drinks (always eat before security and bring a reusable bottle); taxis from airports when a bus or train exists (the Gatwick Express costs £20 for a 30-minute journey; the Thameslink is £10 for 45 minutes); hotel breakfasts (almost always twice the price of the café around the corner); and restaurants within 200 metres of any major tourist attraction."),

    h2('Step 7: The 48-Hour Rule'),
    p("I never book anything immediately. When I find a fare or accommodation option I like, I open it in a tab, think about it, sleep on it, and come back the next day. If I still think it's the right choice, I book it. This sounds obvious but it's stopped me from booking accommodation in the wrong neighbourhood because it was cheap, from choosing flights with genuinely terrible timings because they looked like a deal, and from booking the wrong number of nights because I was excited."),
    p("The one exception: genuine flash sales through airline apps, where inventory is limited and the price really does change within hours. Those you have to grab when you see them — which is why having the apps installed and notifications on is worth doing if you're regularly looking for deals."),

    p("Budget travel in 2026 is genuinely good. The range of affordable destinations accessible from the UK has never been wider, flight competition keeps prices lower than they'd otherwise be, and the tools available for finding deals are better than they've ever been. The difference between a stressful budget trip and a brilliant one is almost always how much thought went in before you clicked 'book'. Spend the hour. It's worth it."),
  ],
  faqs: [
    {
      _key: 'post3-faq1',
      question: 'What is the cheapest way to book a holiday from the UK in 2026?',
      answer: 'Book flights separately from accommodation (package deals are often not the cheapest option). Use Skyscanner to compare across all airlines and dates, and switch on the "whole month" calendar view to find cheaper date combinations. Book European flights 6–8 weeks ahead of travel for the best price/availability balance. Use a cashback site like TopCashback or Quidco for hotel bookings, and a fee-free travel card like Halifax Clarity for all spending abroad.',
    },
    {
      _key: 'post3-faq2',
      question: 'What are the cheapest holiday destinations from the UK in 2026?',
      answer: "Eastern Europe offers the best value: Krakow, Warsaw, Budapest, Sofia, and Bucharest are all significantly cheaper than Western European equivalents once you're there. Albania (particularly the Riviera) and Georgia (Tbilisi) are generating serious interest from budget-conscious UK travellers for their combination of low prices, great food, and genuine cultural depth. Portugal outside Lisbon and the Algarve peak season is also strong value.",
    },
    {
      _key: 'post3-faq3',
      question: 'How much does a budget holiday from the UK cost per day?',
      answer: 'A realistic daily budget (accommodation, two meals, activities, and local transport) is £70–£90 per person in Western Europe, £40–£60 in Eastern Europe, and £30–£45 in Southeast Asia or Central America. These figures assume you eat at local restaurants rather than tourist traps, and use public transport rather than taxis. Add 20% as a buffer for unplanned spending.',
    },
  ],
}

// ─── Run ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n🌱  HolidayMyWay — Chunk K seed\n')

  const docs = [authorSam, authorAndrea, post1, post2, post3]

  for (const doc of docs) {
    const d = doc as any
    console.log(`  → ${d._type}: ${d.name ?? d.title}`)
    await client.createOrReplace(d)
  }

  console.log('\n✅  Done. 2 authors + 3 articles seeded.\n')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
