/**
 * Pexels image seeder — pulls photos and uploads them to Sanity assets.
 * Prerequisites:
 *   1. PEXELS_API_KEY=your_key  in .env.local
 *   2. SANITY_API_WRITE_TOKEN in .env.local
 *   3. npm run seed:images
 */
import { config } from 'dotenv'
config({ path: '.env.local' })
import { createClient } from '@sanity/client'

const PEXELS_KEY = process.env.PEXELS_API_KEY
const token = process.env.SANITY_API_WRITE_TOKEN

if (!PEXELS_KEY) {
  console.error('\n❌  PEXELS_API_KEY not set in .env.local\n    Add: PEXELS_API_KEY=your_key_here\n')
  process.exit(1)
}
if (!token) {
  console.error('\n❌  SANITY_API_WRITE_TOKEN not set in .env.local\n')
  process.exit(1)
}

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 's6i0x1s0',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

// ─── Image map ────────────────────────────────────────────────────────────────
// Each entry: { docId, field, pexelsQuery, altText }

const imageTargets = [
  // Destinations
  {
    docId: 'seed-dest-barcelona',
    field: 'featuredImage',
    query: 'Barcelona Sagrada Familia cityscape',
    alt: 'Barcelona skyline with Sagrada Família',
  },
  {
    docId: 'seed-dest-amsterdam',
    field: 'featuredImage',
    query: 'Amsterdam canal houses boats',
    alt: 'Amsterdam canal with traditional Dutch houses',
  },
  {
    docId: 'seed-dest-cornwall',
    field: 'featuredImage',
    query: 'Cornwall beach England coast cliffs',
    alt: 'Cornwall coastline with turquoise sea',
  },
  // Articles
  {
    docId: 'seed-art-budget-hotels-barcelona',
    field: 'featuredImage',
    query: 'Barcelona hotel terrace rooftop city view',
    alt: 'Budget hotel in Barcelona city centre',
  },
  {
    docId: 'seed-art-amsterdam-48hrs',
    field: 'featuredImage',
    query: 'Amsterdam cycling canal bridge',
    alt: '48 hours in Amsterdam — canal street scene',
  },
  {
    docId: 'seed-art-cornwall-staycation',
    field: 'featuredImage',
    query: 'Cornwall beach golden sand cliffs England',
    alt: 'Cornwall beach at sunset — UK staycation guide',
  },
  // New posts
  {
    docId: 'seed-post-booking-checklist',
    field: 'featuredImage',
    query: 'passport boarding pass travel planning',
    alt: 'Travel planning — passport and boarding pass',
  },
  {
    docId: 'seed-post-split-croatia',
    field: 'featuredImage',
    query: 'Split Croatia Diocletian Palace old town',
    alt: 'Split, Croatia — Diocletian Palace old town',
  },
  {
    docId: 'seed-post-budget-holiday-guide',
    field: 'featuredImage',
    query: 'Europe travel backpack budget adventure',
    alt: 'Budget travel in Europe — backpacker adventure',
  },
]

// ─── Pexels fetch ─────────────────────────────────────────────────────────────

async function fetchPexelsPhoto(query: string): Promise<string | null> {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=3&orientation=landscape`
  const res = await fetch(url, {
    headers: { Authorization: PEXELS_KEY! },
  })
  if (!res.ok) {
    console.error(`  ⚠  Pexels API error ${res.status} for query: "${query}"`)
    return null
  }
  const data = await res.json() as { photos: { src: { large2x: string } }[] }
  if (!data.photos?.length) {
    console.error(`  ⚠  No results for: "${query}"`)
    return null
  }
  // Pick the first result
  return data.photos[0].src.large2x
}

// ─── Upload to Sanity ─────────────────────────────────────────────────────────

async function uploadImageToSanity(imageUrl: string, alt: string): Promise<string | null> {
  try {
    const imgRes = await fetch(imageUrl)
    if (!imgRes.ok) throw new Error(`Failed to download image: ${imgRes.status}`)
    const buffer = await imgRes.arrayBuffer()

    const asset = await sanity.assets.upload('image', Buffer.from(buffer), {
      filename: `${alt.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.jpg`,
      contentType: 'image/jpeg',
    })
    return asset._id
  } catch (err) {
    console.error(`  ⚠  Upload failed: ${err}`)
    return null
  }
}

// ─── Patch Sanity document ────────────────────────────────────────────────────

async function patchDocument(docId: string, field: string, assetId: string, alt: string) {
  await sanity
    .patch(docId)
    .set({
      [field]: {
        _type: 'image',
        asset: { _type: 'reference', _ref: assetId },
        alt,
      },
    })
    .commit()
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n🖼   HolidayMyWay — Pexels image seeder\n')

  for (const target of imageTargets) {
    process.stdout.write(`  → ${target.docId} (${target.query})... `)

    const photoUrl = await fetchPexelsPhoto(target.query)
    if (!photoUrl) continue

    const assetId = await uploadImageToSanity(photoUrl, target.alt)
    if (!assetId) continue

    await patchDocument(target.docId, target.field, assetId, target.alt)
    console.log('✓')

    // Rate limit: 1 request/second to stay well within Pexels free tier limits
    await new Promise((r) => setTimeout(r, 1100))
  }

  console.log('\n✅  Images seeded. Vercel will revalidate pages on next visit.\n')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
