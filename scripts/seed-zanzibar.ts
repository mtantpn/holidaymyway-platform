/**
 * Zanzibar posts seed — 2 articles + Pexels images uploaded to Sanity.
 * Source: https://zanzibiz.com/travel-guide
 * Run: npx tsx scripts/seed-zanzibar.ts
 */
import { config } from 'dotenv'
config({ path: '.env.local' })
import { createClient } from '@sanity/client'

const token = process.env.SANITY_API_WRITE_TOKEN
if (!token) { console.error('\n❌  SANITY_API_WRITE_TOKEN not set\n'); process.exit(1) }

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 's6i0x1s0',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

// ─── PortableText helpers ─────────────────────────────────────────────────────

let kc = 700
const uid = (prefix = 'z') => `${prefix}${++kc}`
const p = (text: string) => {
  const k = uid(); return { _type: 'block', _key: k, style: 'normal', markDefs: [], children: [{ _type: 'span', _key: `${k}s`, text, marks: [] }] }
}
const h2 = (text: string) => {
  const k = uid('h2z'); return { _type: 'block', _key: k, style: 'h2', markDefs: [], children: [{ _type: 'span', _key: `${k}s`, text, marks: [] }] }
}
const h3 = (text: string) => {
  const k = uid('h3z'); return { _type: 'block', _key: k, style: 'h3', markDefs: [], children: [{ _type: 'span', _key: `${k}s`, text, marks: [] }] }
}

// ─── Upload Pexels image to Sanity ────────────────────────────────────────────

async function uploadPexelsImage(pexelsId: string, filename: string, alt: string): Promise<string> {
  const url = `https://images.pexels.com/photos/${pexelsId}/pexels-photo-${pexelsId}.jpeg?auto=compress&cs=tinysrgb&w=1920`
  console.log(`  Downloading ${filename}...`)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Pexels download failed: ${res.status}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  const asset = await client.assets.upload('image', buffer, { filename: `${filename}.jpg`, contentType: 'image/jpeg' })
  console.log(`  Uploaded → ${asset._id}`)
  return asset._id
}

// ─── Article 1: Practical Pre-Travel Checklist (Sam Rivers) ──────────────────

async function buildPost1(imageAssetId: string) {
  return {
    _id: 'seed-post-zanzibar-checklist',
    _type: 'article',
    status: 'published',
    title: 'Before You Fly to Zanzibar: The Practical Checklist Nobody Gives You',
    slug: { _type: 'slug', current: 'zanzibar-pre-travel-checklist-uk' },
    excerpt: "Most people spend weeks planning what they'll do in Zanzibar and about 20 minutes thinking about what they need to sort before they leave. That imbalance causes most of the problems. Here's what to actually prepare — visas, money, connectivity, insurance — before you step on the plane.",
    publishedAt: '2026-05-27',
    readTime: 8,
    seoTitle: 'Zanzibar Pre-Travel Checklist for UK Visitors 2026 — HolidayMyWay',
    seoDescription: "Everything UK travellers need to sort before flying to Zanzibar: visa on arrival, Tanzanian shilling vs USD, eSIM setup, travel insurance, and airport transfers. Practical guide updated 2026.",
    author: { _type: 'reference', _ref: 'seed-author-sam' },
    category: { _type: 'reference', _ref: 'seed-cat-destination-guides' },
    featuredImage: {
      _type: 'image',
      asset: { _type: 'reference', _ref: imageAssetId },
      alt: 'Traditional dhow sailing at sunset in Zanzibar — Indian Ocean',
    },
    content: [
      p("Zanzibar is one of those places that sounds straightforward until you're actually trying to organise the trip. The flights are manageable, the beaches sell themselves. But the gap between 'I want to go' and 'I'm actually ready to get on this plane' involves a handful of things that most standard travel advice skips over entirely. These are the ones that actually matter."),
      p("*Source: Information in this guide draws on the Zanzibar travel guide at [zanzibiz.com/travel-guide](https://zanzibiz.com/travel-guide), with additional context for UK travellers.*"),

      h2("Visa: What You Actually Need at the Airport"),
      p("UK passport holders do not need to arrange a visa before travelling to Zanzibar. You get it on arrival at Abeid Amani Karume International Airport (ZNZ). The process takes 15–30 minutes — you fill in a form, pay the fee (currently around USD 50, cash), and you're through."),
      p("A few things to know before you land: bring USD cash specifically for this, because the payment terminals at the visa desk are unreliable and card payments are sometimes not accepted. Your passport needs at least 6 months' validity beyond your return date. You'll also need to show an onward ticket (your return flight) and proof of accommodation for your first night — a hotel booking confirmation on your phone is fine."),
      p("Don't confuse Zanzibar's entry with Tanzania mainland entry. If you're flying Zanzibar only, the Zanzibar visa is what you need. If you're combining Zanzibar with a safari on the mainland, you need a Tanzania single-entry visa which covers both — check which applies to your itinerary before you go."),

      h2("Money: The USD vs Shilling Reality"),
      p("The official currency is the Tanzanian Shilling (TZS), but USD is so widely accepted in Zanzibar that you can go an entire trip without using shillings if you stay in tourist areas. Most hotels, restaurants, tours, and larger shops quote in USD and accept it without complaint."),
      p("That said, a few things work better with local currency. Dala dalas (shared minibuses), market stalls, small roadside restaurants, and tuk-tuks often deal in shillings and will round up against you if you try to pay in dollars. Change USD into shillings for anything under about $10 — you'll get fairer change and fairer prices."),
      p("The practical setup: bring a mix. USD 200–300 in mixed notes (some small bills — $1 and $5 — for tips and small payments, some $20s and $50s for bigger things). Use an ATM in Stone Town for shillings once you arrive; the rates are better than airport exchange. The Barclays and CRDB ATMs in Stone Town are the most reliable. Notify your bank before you travel that you'll be using your card in Tanzania."),
      p("The Halifax Clarity or Starling card both work well for ATM withdrawals with no foreign transaction fees. Use one specifically for Zanzibar and you'll save a noticeable amount on a week-long trip."),

      h2("Connectivity: Get an eSIM Before You Leave the UK"),
      p("This is the one most people leave too late and regret immediately. When you land at Zanzibar airport, you want your maps working, your hotel confirmation accessible, your WhatsApp running so your hotel transfer driver can find you. Without mobile data, none of that happens smoothly."),
      p("A local SIM swap at the airport works but it takes time, requires documentation, and the airport desk isn't always staffed for late arrivals. An eSIM sorted before you fly removes all of that friction. Airalo, Holafly, and Nomad all offer Tanzania eSIMs that activate on arrival. A 1GB eSIM for 7 days costs around £4–£8. That's about the same as one airport coffee. Buy it, install it before you leave home, and it switches on automatically when you land."),
      p("One thing to check: your phone needs to be eSIM compatible (most iPhones from XS onwards, most recent Android flagships). If your phone doesn't support eSIM, pick up a local Vodacom or Airtel Tanzania SIM at the airport — the process is slower but they're cheap and coverage is solid in the main tourist areas."),

      h2("Travel Insurance: What to Check Specifically for Zanzibar"),
      p("Standard travel insurance covers cancellations and lost luggage. For Zanzibar, you need to make sure yours also covers medical evacuation. The medical facilities on the island are limited — for anything serious, you're looking at an evacuation to Nairobi or Dar es Salaam, which is expensive without cover. Check that your policy has medical evacuation cover of at least £500,000 and that it covers Tanzania specifically (some cheaper policies exclude sub-Saharan Africa or have restricted medical limits for the region)."),
      p("Also check the activity exclusions. If you're planning to dive (Zanzibar has some of the best diving in the Indian Ocean — Mnemba Atoll is world-class), your policy needs to cover scuba at the depth you're planning to dive to. Many standard policies cap at 18 metres or exclude diving entirely."),
      p("Compare on MoneySuperMarket or Compare the Market, but read the actual policy documents rather than just the headline summary. For Zanzibar, the medical repatriation limit and activity coverage matter more than the excess amount."),

      h2("Airport Transfer: Why It's Worth Booking in Advance"),
      p("Zanzibar airport to Stone Town is 15 minutes. To Nungwi on the north coast, it's about 75 minutes. From the moment you exit arrivals, you'll be approached by taxi drivers with variable prices and variable reliability."),
      p("Pre-booking a transfer costs roughly the same as a negotiated taxi — sometimes a little more — but you have a named driver waiting for you, a confirmed price, and no haggling after a long flight. For families or late arrivals especially, that's worth a few extra pounds. Your hotel can usually arrange this; if not, the ZanziBiz transfer service (linked from the travel guide at [zanzibiz.com/travel-guide](https://zanzibiz.com/travel-guide)) is one option worth checking."),
      p("If you do take an airport taxi, agree the price before you get in. The standard rate to Stone Town is around USD 15–20; to Nungwi, USD 35–50. Have the cash ready so you're not rooting through your bag after a long flight."),

      h2("The Two Things Most People Forget"),
      p("Yellow fever vaccination certificate — you don't need one if you're flying directly from the UK, but if your routing goes through Kenya or another yellow fever zone, you may be asked to show proof of vaccination on arrival. Check your specific route before you travel."),
      p("Malaria prevention. Zanzibar is a malaria risk area. Speak to your GP or a travel clinic about antimalarial medication before you go — ideally 4–6 weeks before departure. Doxycycline is the most commonly prescribed option for East Africa and is cheap. Also bring a good DEET mosquito repellent (50% DEET or higher). The mosquitoes are worst at dawn and dusk; eating outside in the evenings is fine, but cover your arms and legs or use repellent."),

      p("None of this is complicated. The eSIM takes five minutes. The insurance comparison takes 20. The USD cash you get from the post office or a travel money service before you fly. The visa you deal with at the airport. Do these before you leave and the first few hours in Zanzibar go smoothly. Skip them and the first few hours in Zanzibar are spent sorting problems that didn't need to exist."),
    ],
    faqs: [
      {
        _key: 'zchk-faq1',
        question: 'Do UK citizens need a visa for Zanzibar?',
        answer: "UK passport holders can get a visa on arrival at Zanzibar's Abeid Amani Karume International Airport. The current fee is approximately USD 50, payable in cash. You'll need a valid passport (6+ months validity), a return ticket, and proof of accommodation for your first night. No advance visa application is required for UK travellers.",
      },
      {
        _key: 'zchk-faq2',
        question: 'Should I take USD or Tanzanian Shillings to Zanzibar?',
        answer: "Both. USD is widely accepted at hotels, restaurants, and tour operators. Tanzanian Shillings (TZS) are better for small purchases — local transport, market stalls, street food. Bring USD 200–300 in mixed denominations and use an ATM in Stone Town (Barclays or CRDB) for shillings. Use a fee-free card like Halifax Clarity or Starling to avoid foreign transaction charges.",
      },
      {
        _key: 'zchk-faq3',
        question: 'Is malaria a risk in Zanzibar?',
        answer: "Yes — Zanzibar is a malaria risk area. Visit your GP or a travel clinic at least 4–6 weeks before departure to discuss antimalarial medication (doxycycline is commonly prescribed). Also bring high-strength DEET repellent (50%+) and cover up at dawn and dusk when mosquitoes are most active. Pack a travel-sized insect repellent in your hand luggage for the flight and first night.",
      },
    ],
  }
}

// ─── Article 2: What You Need to Know (Andrea Costa) ─────────────────────────

async function buildPost2(imageAssetId: string) {
  return {
    _id: 'seed-post-zanzibar-what-to-know',
    _type: 'article',
    status: 'published',
    title: "What Nobody Tells You Before Your First Trip to Zanzibar (But Should)",
    slug: { _type: 'slug', current: 'zanzibar-first-time-essential-tips' },
    excerpt: "Zanzibar isn't just a beach holiday. It's a Swahili island with its own culture, rules, and rhythms — and if you go in without knowing a few key things, you'll either cause offence or miss what makes it genuinely special. Here's what actually helps.",
    publishedAt: '2026-05-27',
    readTime: 9,
    seoTitle: 'First Time in Zanzibar: Essential Tips for UK Travellers 2026 — HolidayMyWay',
    seoDescription: "What UK travellers need to know before their first trip to Zanzibar: cultural dress codes, when to go, health prep, Stone Town vs beaches, and the things that genuinely surprise first-timers.",
    author: { _type: 'reference', _ref: 'seed-author-andrea' },
    category: { _type: 'reference', _ref: 'seed-cat-destination-guides' },
    featuredImage: {
      _type: 'image',
      asset: { _type: 'reference', _ref: imageAssetId },
      alt: 'White sand beach with palm trees and pier in Zanzibar',
    },
    content: [
      p("The first thing Zanzibar does is surprise you. Not because it's bigger or more dramatic than you expected — but because it's different in ways that the Instagram photos don't prepare you for. It's a Swahili Muslim island with a 1,200-year trading history. The beaches are extraordinary. But so is Stone Town, and the spice farms, and the food, and the cultural texture of the place. Go in knowing a few things and Zanzibar is one of the best trips you'll take. Go in assuming it's just a beach destination and you'll miss most of it."),
      p("*Source: The foundational travel information for this guide draws on the Zanzibar travel guide at [zanzibiz.com/travel-guide](https://zanzibiz.com/travel-guide).*"),

      h2("When to Go — and When to Avoid"),
      p("Zanzibar has two main dry seasons: June to October, and December to February. Both are excellent. June to October is cooler (27–30°C), less humid, and has the best diving visibility. December to February is hotter but the water is very warm and it's the peak beach season."),
      p("The months to avoid are March to May (the long rains — heavy daily downpours, many hotels close or drop their standards of maintenance) and November (the short rains — less severe but still unpredictable). If your dates are flexible, September is the sweet spot: dry season, manageable humidity, the sea at its clearest, and prices just starting to ease off the peak summer level."),
      p("Flying from the UK, most routes go via Nairobi (Kenya Airways, KLM), Dubai (flydubai, Emirates), or Addis Ababa (Ethiopian Airlines). From London the journey is around 10–12 hours door to door depending on your layover. Qatar Airways via Doha is also worth checking — they occasionally have very competitive fares and the service is significantly better than budget East African routing."),

      h2("Stone Town: Why You Should Spend More Time Here Than You Think"),
      p("Most people spend one night in Stone Town and the rest of their trip on the north or east coast beaches. That's understandable — the beaches are stunning. But one night isn't enough to get Stone Town properly."),
      p("The old city is a UNESCO World Heritage Site and one of the best-preserved examples of Swahili coastal trading architecture in East Africa. The narrow streets (so narrow that two people with bags sometimes can't pass) are genuinely beautiful. The doors — the carved wooden doors that the merchant houses were designed around — are some of the most extraordinary craftsmanship you'll see anywhere. The Forodhani Gardens night food market is one of the best street food experiences in Africa: fresh Zanzibari pizza, grilled seafood, sugar cane juice, all for £1–£3 a dish."),
      p("Give Stone Town two nights minimum. Stay in a heritage riad or small guesthouse inside the old city rather than a resort hotel on the outskirts — you're there for the experience and the location matters."),

      h2("Dress Code: This Is Not Negotiable in Stone Town"),
      p("Zanzibar is around 99% Muslim. On the beach resorts, Western swimwear is completely normal. Inside Stone Town and in local villages, different rules apply — and this is one of the things that genuinely matters."),
      p("In Stone Town, women should cover their shoulders and knees. A light cotton scarf or sarong is enough — you don't need to cover your hair. Men should avoid going shirtless or wearing very short shorts in the streets. This isn't about strict enforcement (nobody will stop you); it's about basic respect for the community you're walking through. The locals are accustomed to tourists and are extraordinarily hospitable, but visibly ignoring the cultural norms makes a bad impression that's entirely avoidable."),
      p("Pack one lightweight cover-up — a cotton shirt, a sarong, something you can throw on when you're off the beach and heading into town. It takes up no space and you'll use it every day."),

      h2("The Food — Which Is Excellent and Underrated"),
      p("Zanzibari food is the result of centuries of Indian Ocean trading: Arabic spices, Indian techniques, African ingredients, Swahili coastal flavours. The pilau rice (slow-cooked with whole spices) is one of the best things you'll eat. Urojo — the Zanzibar mix, a tangy tamarind and coconut soup with fried cassava, potatoes, and bhajias served from carts — is a local institution. Fresh tuna, kingfish, octopus, and crab are all cheap, abundant, and cooked well."),
      p("The spice tour is worth doing once. Zanzibar was historically the world's largest exporter of cloves, and the spice farms in the island's interior take about 3 hours and cost around USD 15–20 per person including a guide. You'll try nutmeg, vanilla, cinnamon, turmeric, and lemongrass in their fresh forms, and the farm lunch is usually excellent."),
      p("Avoid eating at the big beach resort restaurants for every meal. They're convenient but expensive and the food is generic international. The better eating is in the local restaurants and small cafés — follow where the locals eat and you'll spend £5–£8 for a meal that beats most resort dinners at three times the price."),

      h2("Health Prep: What to Do Before You Go"),
      p("Malaria prevention is non-negotiable. See your GP or a travel clinic at least 4 weeks before you travel — earlier if possible, because some antimalarials need to be started before you arrive. Doxycycline is the most common prescription for East Africa; it's cheap, effective, and available from most travel clinics and pharmacies. Also bring a 50%+ DEET repellent and use it at dawn and dusk."),
      p("Yellow fever vaccine: you don't need one if you're flying direct from the UK. If your route passes through Kenya or another yellow fever zone, you may need to show your certificate at Zanzibar border control. Check your specific routing."),
      p("Tap water in Zanzibar is not safe to drink. Bottled water is cheap and widely available — budget about £0.50 per 1.5 litre bottle. At restaurants, ask for sealed bottles. The ice in most tourist restaurants is made from filtered water and is generally fine."),
      p("Sun is stronger than it looks here. Factor 50 every day, reapply after swimming, and cover up during the midday hours (11am–2pm) if you're not used to tropical sun. I've seen people burn badly on their first full beach day by underestimating how quickly it happens this close to the equator."),

      h2("Getting Around the Island"),
      p("Dala dalas (local shared minibuses) run between Stone Town and most beach areas for around TZS 3,000–5,000 (roughly 80p–£1.40). They're cheap, genuinely local, and chaotic in an entertaining way. Dalla dallas are great if you're not in a hurry, have light luggage, and are comfortable finding your own way."),
      p("For beach resort areas and day trips, dala dalas work. For early morning airport transfers, late night returns, or travelling with luggage, book a private taxi or transfer through your hotel. The price difference is not large enough to justify the stress if things go wrong."),
      p("Motorbike taxis (bodabodas) are everywhere and cheap for short distances in Stone Town. They're legal and commonly used. Wear a helmet if one's offered, hold on properly, and don't accept a ride if the driver seems impaired. This is true everywhere but worth repeating."),

      h2("One Thing That Will Genuinely Make Your Trip Better"),
      p("Learn five words of Swahili. Not a full phrase book — just: jambo (hello), asante (thank you), karibu (welcome, also used as 'you're welcome'), pole pole (slowly slowly, used as the general philosophy of not rushing), and hakuna matata (yes, it's a real phrase, no worries). Use them and people light up. Zanzibar is one of the friendliest places I've travelled — and the hospitality gets noticeably warmer when you make any effort at all with the language."),

      p("The practical planning for Zanzibar — the visa, the currency, the insurance, the flights — is covered in our pre-travel checklist post. But the things that make a Zanzibar trip genuinely memorable are the less transactional ones: the dhow sunset cruise with warm Kilimanjaro beer, the early morning walk through Stone Town before the heat arrives, the impossibly fresh grilled octopus at a beach shack for £3. None of those need much planning. They just need you to show up with some context for where you've landed."),
    ],
    faqs: [
      {
        _key: 'zwtk-faq1',
        question: 'What is the best time of year to visit Zanzibar from the UK?',
        answer: "June to October (dry season) is the most reliable time — warm but less humid than the beach months, with the best diving visibility. December to February is also dry and good for beaches. Avoid March–May (heavy rains) and November (short rains). September specifically is excellent: dry, the sea is at its clearest, and prices are slightly lower than peak July–August.",
      },
      {
        _key: 'zwtk-faq2',
        question: 'What should I wear in Zanzibar?',
        answer: "On beach resorts, normal holiday clothing is fine. In Stone Town and local villages, dress modestly out of respect for the island's Muslim culture: cover shoulders and knees. A lightweight cotton scarf or sarong is enough for women — no need to cover your hair. Men should avoid shirtless walking in town. Pack one cover-up specifically for time away from the beach.",
      },
      {
        _key: 'zwtk-faq3',
        question: 'How do you get from Stone Town to the north coast beaches?',
        answer: "The north coast (Nungwi, Kendwa) is about 60–75 minutes from Stone Town. A dala dala (local shared minibus) from Darajani bus station in Stone Town costs around TZS 3,000–5,000 (under £1.50) but takes longer and requires a change. A private taxi is USD 25–35 and takes you directly. For first-time visitors with luggage, a pre-booked transfer through your hotel is the least stressful option.",
      },
    ],
  }
}

// ─── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n🌴  HolidayMyWay — Zanzibar posts seed\n')

  console.log('Uploading images to Sanity...')
  const img1Id = await uploadPexelsImage('3361818', 'zanzibar-sunset-dhow', 'Traditional dhow at sunset in Zanzibar')
  const img2Id = await uploadPexelsImage('8804770', 'zanzibar-palm-beach-pier', 'White sand beach with palms and pier in Zanzibar')

  const post1 = await buildPost1(img1Id)
  const post2 = await buildPost2(img2Id)

  console.log('\nSeeding articles...')
  for (const doc of [post1, post2]) {
    const d = doc as any
    console.log(`  → ${d.title}`)
    await client.createOrReplace(d)
  }

  console.log('\n✅  Done. 2 Zanzibar articles published.\n')
}

main().catch(err => { console.error(err); process.exit(1) })
