import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'

// Load .env.local manually
const envContent = readFileSync('.env.local', 'utf-8')
const envVars = Object.fromEntries(
  envContent.split('\n')
    .filter(line => line && !line.startsWith('#'))
    .map(line => {
      const [key, ...rest] = line.split('=')
      return [key, rest.join('=').replace(/^['"]|['"]$/g, '')]
    })
)

const client = createClient({
  projectId: envVars.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: envVars.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: envVars.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

interface BlockContent {
  _type: 'block'
  style?: 'normal' | 'h2' | 'h3'
  _key: string
  children: Array<{ _type: 'span'; text: string; _key: string }>
  markDefs?: Array<any>
}

async function uploadImage(url: string, alt: string): Promise<string> {
  console.log(`  Fetching image: ${alt}…`)
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'image/jpeg,image/*',
      }
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const buf = Buffer.from(await res.arrayBuffer())
    const asset = await client.assets.upload('image', buf, { filename: `hero-${Date.now()}.jpg` })
    console.log(`  ✓ Uploaded → ${asset._id}`)
    return asset._id
  } catch (err) {
    console.error(`  ✗ Failed:`, err instanceof Error ? err.message : String(err))
    throw err
  }
}

async function seedNYPost() {
  console.log('\n🌍  Seeding New York post…\n')

  // Upload image
  console.log('📸  Uploading image…')
  const imageId = await uploadImage(
    'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'New York City skyline'
  )

  // Resolve author and category
  console.log('\n🔗  Resolving references…')
  const authorRes = 'seed-author-sam'
  const categoryRes = 'seed-cat-budget-travel'

  if (!authorRes || !categoryRes) {
    throw new Error('Author or category not found - ensure seed-posts-tbilisi-capeverde.ts was run first')
  }
  console.log(`  Author: ${authorRes}`)
  console.log(`  Category: ${categoryRes}`)

  const content: BlockContent[] = [
    {
      _type: 'block',
      style: 'normal',
      _key: 'intro1',
      children: [
        {
          _type: 'span',
          text: 'New York is the kind of city that ruins you for everywhere else. I don\'t mean that in a bad way—I mean that after you\'ve stood in Times Square watching thirty different worlds collide at once, after you\'ve eaten a slice of pizza at 2am from a hole-in-the-wall in the Lower East Side, after you\'ve felt that specific hum of eight million people living their lives in the same few square miles, every other city feels a bit quieter. A bit smaller. A bit less alive.',
          _key: 'intro1-text',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      _key: 'intro2',
      children: [
        {
          _type: 'span',
          text: 'And here\'s the thing nobody tells you: you don\'t need a huge budget to experience that magic. I\'m not saying New York is cheap—it\'s not. But I am saying that if you\'re smart about it, if you know where to look and what to skip, you can do a proper New York week for less than you\'d think. This is how.',
          _key: 'intro2-text',
        },
      ],
    },
    {
      _type: 'block',
      style: 'h2',
      _key: 'flights-h',
      children: [
        {
          _type: 'span',
          text: 'Getting There Without Emptying Your Bank Account',
          _key: 'flights-h-text',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      _key: 'flights1',
      children: [
        {
          _type: 'span',
          text: 'Right now, we\'ve found a flight from London to New York for just £303.44. That\'s not a typo. That\'s a genuine, bookable ticket that gets you across the Atlantic for less than the cost of a decent weekend in the Cotswolds.',
          _key: 'flights1-text',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      _key: 'flights2',
      children: [
        {
          _type: 'span',
          text: 'The catch? You get 4kg of hand baggage and a 10kg checked bag. This might sound restrictive, but honestly, you can work with it. Pack light. Roll your clothes. Wear your bulkiest items on the plane. And remember—you\'re going to New York, not on a three-month expedition. One carry-on and one checked bag is actually plenty.',
          _key: 'flights2-text',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      _key: 'flights3',
      children: [
        {
          _type: 'span',
          text: 'This price fluctuates constantly, but the point is: New York flights from London can be genuinely affordable if you catch them at the right moment. We found this offer through our flight search engine, and you can find similar deals by being flexible with your dates. Tuesday, Wednesday, and Saturday departures are usually cheaper than Friday. Early morning flights beat afternoon ones. Avoid school holidays.',
          _key: 'flights3-text',
        },
      ],
    },
    {
      _type: 'block',
      style: 'h2',
      _key: 'where-h',
      children: [
        {
          _type: 'span',
          text: 'Where to Stay (Without Paying Manhattan Prices)',
          _key: 'where-h-text',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      _key: 'where1',
      children: [
        {
          _type: 'span',
          text: 'Manhattan is expensive. Full stop. A hostel bed in Midtown will cost you £25-35 per night. A budget hotel room, £70-100. But step one block outside Manhattan—into the outer boroughs—and everything changes.',
          _key: 'where1-text',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      _key: 'where2',
      children: [
        {
          _type: 'span',
          text: 'Queens is where I\'d head. Astoria specifically. Five minutes on the subway to Midtown, but your money stretches about three times as far. You\'ll find decent Airbnb rooms for £40-60 per night here, shared apartments for £30-45. Plus Astoria has some of the best food in the city—Greek, Italian, Mexican, Korean, all competing for your attention and your budget.',
          _key: 'where2-text',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      _key: 'where3',
      children: [
        {
          _type: 'span',
          text: 'Astoria Park itself is absolutely free and overlooks the Manhattan skyline. Seriously—you can see the Empire State Building from the waterfront, watch the sunset over the city, and you\'ve paid nothing. That\'s New York.',
          _key: 'where3-text',
        },
      ],
    },
    {
      _type: 'block',
      style: 'h2',
      _key: 'eat-h',
      children: [
        {
          _type: 'span',
          text: 'Eating Like a Local (Not Like a Tourist)',
          _key: 'eat-h-text',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      _key: 'eat1',
      children: [
        {
          _type: 'span',
          text: 'Pizza in New York costs £3-4 a slice from proper joints. Not the fancy sit-down places—the real New York spots where locals queue. Get two slices and a coffee and you\'ve had breakfast for £6.',
          _key: 'eat1-text',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      _key: 'eat2',
      children: [
        {
          _type: 'span',
          text: 'Street food is incredible here. A proper halal platter—chicken or lamb over rice with white and hot sauce—is £6-7 and genuinely some of the best food I\'ve eaten in the city. A hot dog and soda from a street cart is £3. Tacos from a taco truck are £2-3 each.',
          _key: 'eat2-text',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      _key: 'eat3',
      children: [
        {
          _type: 'span',
          text: 'If you want to sit down somewhere nice without destroying your budget, hit up the outer borough neighbourhoods—Astoria, Williamsburg, Greenpoint. You can get a proper meal with a drink for £15-20 here, whereas the same thing in Midtown would be £40+.',
          _key: 'eat3-text',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      _key: 'eat4',
      children: [
        {
          _type: 'span',
          text: 'Bagels. Get them from H&H or Absolute. £1.50 with cream cheese. It\'s not fancy, but it\'s authentically New York, and it\'s fuel.',
          _key: 'eat4-text',
        },
      ],
    },
    {
      _type: 'block',
      style: 'h2',
      _key: 'do-h',
      children: [
        {
          _type: 'span',
          text: 'What to Actually Do (And Most of It Is Free)',
          _key: 'do-h-text',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      _key: 'do1',
      children: [
        {
          _type: 'span',
          text: 'Walking is the best way to experience New York. Take the subway somewhere unfamiliar and just walk. Walk across the Brooklyn Bridge—it\'s free, it\'s stunning, and you\'ll understand why people move their lives to this city. Walk through Washington Square Park. Sit on the steps at the New York Public Library. Walk down the High Line (a converted elevated railway turned into a park). All free.',
          _key: 'do1-text',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      _key: 'do2',
      children: [
        {
          _type: 'span',
          text: 'Times Square is free to see, though worth visiting at night when it\'s absolutely mental—neon and screens and people from everywhere, all together. Stay for thirty minutes, take your photo, then leave. People spend hours here and wonder why they\'re not having fun. You won\'t be staying hours.',
          _key: 'do2-text',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      _key: 'do3',
      children: [
        {
          _type: 'span',
          text: 'The Statue of Liberty is worth doing once, but book the ferry tickets in advance online (they\'re cheaper that way). £17-18 gets you to Liberty Island. The views of Manhattan from there—especially at sunset—are incredible and genuinely one of the things you should do in New York.',
          _key: 'do3-text',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      _key: 'do4',
      children: [
        {
          _type: 'span',
          text: 'Museums have pay-what-you-wish hours. The Metropolitan Museum of Art, MoMA, the Natural History Museum—they\'re all technically free if you\'re a New York resident, but they operate on a suggested donation for visitors. Pay £1, pay £20, they don\'t turn you away. Go for a few hours, see what you want to see, move on.',
          _key: 'do4-text',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      _key: 'do5',
      children: [
        {
          _type: 'span',
          text: 'Neighbourhoods are free entertainment. Soho is chaotic and full of galleries and independent shops. The East Village is grungy and cool. Chinatown is a sensory overload. Greenwich Village is where artists supposedly lived (before gentrification made it unaffordable). Harlem is vibrant and real in a way Midtown never is. Just walk. That\'s the real New York.',
          _key: 'do5-text',
        },
      ],
    },
    {
      _type: 'block',
      style: 'h2',
      _key: 'budget-h',
      children: [
        {
          _type: 'span',
          text: 'Real Budget Breakdown (5 Nights / 6 Days)',
          _key: 'budget-h-text',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      _key: 'budget1',
      children: [
        {
          _type: 'span',
          text: 'Flight: £303.44 (done)',
          _key: 'budget1-text',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      _key: 'budget2',
      children: [
        {
          _type: 'span',
          text: 'Accommodation (5 nights in Astoria): £225-300 (£45-60/night)',
          _key: 'budget2-text',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      _key: 'budget3',
      children: [
        {
          _type: 'span',
          text: 'Subway pass (7 days unlimited): £33',
          _key: 'budget3-text',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      _key: 'budget4',
      children: [
        {
          _type: 'span',
          text: 'Food (street pizza, halal, tacos, bagels): £120 (£20/day)',
          _key: 'budget4-text',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      _key: 'budget5',
      children: [
        {
          _type: 'span',
          text: 'Ferry to Statue of Liberty: £18',
          _key: 'budget5-text',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      _key: 'budget6',
      children: [
        {
          _type: 'span',
          text: 'Museum donations (optional): £20',
          _key: 'budget6-text',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      _key: 'budget-total',
      children: [
        {
          _type: 'span',
          text: 'Total: Approximately £720-770 for flights, accommodation, food, and the main things to do. That\'s a proper New York week for less than £800.',
          _key: 'budget-total-text',
        },
      ],
    },
    {
      _type: 'block',
      style: 'h2',
      _key: 'practical-h',
      children: [
        {
          _type: 'span',
          text: 'Practical Things Nobody Mentions',
          _key: 'practical-h-text',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      _key: 'practical1',
      children: [
        {
          _type: 'span',
          text: 'Get a subway card immediately when you land. It\'s on the subway platforms before you exit. Tap it, load £33 onto it, and you can go anywhere for 7 days. Without this, every ride costs £2.75 and it adds up fast.',
          _key: 'practical1-text',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      _key: 'practical2',
      children: [
        {
          _type: 'span',
          text: 'Bring layers. New York weather is dramatic. Summer is scorching and humid. Winter is brutal. Spring and autumn are nice but change daily. Wear something you can take off.',
          _key: 'practical2-text',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      _key: 'practical3',
      children: [
        {
          _type: 'span',
          text: 'Everyone tips 18-20% as standard. It\'s built into their wages structure. Factor that into your budget.',
          _key: 'practical3-text',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      _key: 'practical4',
      children: [
        {
          _type: 'span',
          text: 'The subway smells bad and is often delayed. This is normal. This is New York. You will get used to it in about three hours.',
          _key: 'practical4-text',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      _key: 'practical5',
      children: [
        {
          _type: 'span',
          text: 'Your phone will work fine (roaming is expensive though—get an eSIM or local SIM if you can). Wifi is everywhere but sometimes slow.',
          _key: 'practical5-text',
        },
      ],
    },
    {
      _type: 'block',
      style: 'h2',
      _key: 'faq-h',
      children: [
        {
          _type: 'span',
          text: 'FAQ',
          _key: 'faq-h-text',
        },
      ],
    },
    {
      _type: 'block',
      style: 'h3',
      _key: 'faq1-q',
      children: [
        {
          _type: 'span',
          text: 'Is New York actually as good as people say?',
          _key: 'faq1-q-text',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      _key: 'faq1-a',
      children: [
        {
          _type: 'span',
          text: 'Yes. It\'s overhyped and it\'s exactly as good as the hype. There\'s nowhere else like it. The chaos is intentional. The pace is real. The energy is genuine.',
          _key: 'faq1-a-text',
        },
      ],
    },
    {
      _type: 'block',
      style: 'h3',
      _key: 'faq2-q',
      children: [
        {
          _type: 'span',
          text: 'How long should I stay?',
          _key: 'faq2-q-text',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      _key: 'faq2-a',
      children: [
        {
          _type: 'span',
          text: 'At least 5 days. Less than that and you\'re just touching the surface. More than 10 and you might get tired. Five to seven days is the sweet spot.',
          _key: 'faq2-a-text',
        },
      ],
    },
    {
      _type: 'block',
      style: 'h3',
      _key: 'faq3-q',
      children: [
        {
          _type: 'span',
          text: 'Is it safe?',
          _key: 'faq3-q-text',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      _key: 'faq3-a',
      children: [
        {
          _type: 'span',
          text: 'By and large, yes. Use common sense. Don\'t flash expensive stuff. Don\'t wander alone at 3am in unfamiliar neighbourhoods. But millions of people live here. Millions of tourists visit. It\'s safer than the news makes it sound.',
          _key: 'faq3-a-text',
        },
      ],
    },
    {
      _type: 'block',
      style: 'h3',
      _key: 'faq4-q',
      children: [
        {
          _type: 'span',
          text: 'Should I book a tour?',
          _key: 'faq4-q-text',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      _key: 'faq4-a',
      children: [
        {
          _type: 'span',
          text: 'Not unless you really want to. New York is walkable. The subway is intuitive once you understand it. Walking and exploring on your own is actually more fun than being herded around on a bus with 40 other tourists.',
          _key: 'faq4-a-text',
        },
      ],
    },
  ]

  console.log('\n✍️   Creating New York post…')
  const doc = {
    _type: 'article',
    title: 'I Did New York for £770 All-In — Here\'s Exactly How',
    slug: { current: 'new-york-budget-guide-2026' },
    author: { _type: 'reference', _ref: authorRes },
    category: { _type: 'reference', _ref: categoryRes },
    publishedAt: new Date().toISOString(),
    content,
    featuredImage: {
      _type: 'image',
      asset: { _type: 'reference', _ref: imageId },
      alt: 'New York City skyline with Empire State Building',
    },
  }

  const created = await client.create(doc)
  console.log(`  ✓ New York post created\n`)

  return created
}

seedNYPost().catch(err => {
  console.error('\n❌  Error:', err.message)
  process.exit(1)
})
