import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const token = process.env.SANITY_API_WRITE_TOKEN
const pexelsKey = process.env.PEXELS_API_KEY

if (!token || !pexelsKey) { 
  console.error('Missing env vars')
  process.exit(1) 
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 's6i0x1s0',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

async function searchPexels(query: string): Promise<number | null> {
  console.log(`🔍 Searching Pexels for: "${query}"…`)
  const response = await fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`,
    { headers: { 'Authorization': pexelsKey! } }
  )
  const data = await response.json() as { photos?: Array<{ id: number }> }
  if (data.photos?.[0]) {
    console.log(`✓ Found photo ID: ${data.photos[0].id}`)
    return data.photos[0].id
  }
  return null
}

async function uploadPexels(photoId: number): Promise<string> {
  console.log(`📸 Uploading photo #${photoId}…`)
  const url = `https://images.pexels.com/photos/${photoId}/pexels-photo-${photoId}.jpeg?auto=compress&cs=tinysrgb&w=1920`
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Accept': 'image/jpeg,image/*',
    }
  })
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  const asset = await client.assets.upload('image', buf, { filename: `bucharest-featured.jpg` })
  console.log(`✓ Uploaded successfully`)
  return asset._id
}

async function main() {
  console.log('\n🏛️ Finding iconic Bucharest landmark image…\n')

  // Try different searches for iconic landmarks
  const searches = [
    'Bucharest Parliament Palace',
    'Bucharest iconic landmark',
    'Bucharest Old Town vibrant',
  ]

  let photoId: number | null = null
  for (const query of searches) {
    photoId = await searchPexels(query)
    if (photoId) break
  }

  if (!photoId) {
    console.error('❌ Could not find suitable image')
    process.exit(1)
  }

  const assetId = await uploadPexels(photoId)

  console.log('\n📝 Updating featured image in Sanity…')
  
  const doc = await client.getDocument('seed-post-bucharest-city-break')
  if (!doc) throw new Error('Document not found')

  await client.patch('seed-post-bucharest-city-break').set({
    featuredImage: {
      _type: 'image',
      asset: { _type: 'reference', _ref: assetId },
      alt: 'Bucharest iconic landmark - vibrant historic architecture',
    }
  }).commit()

  console.log('\n✅ Featured image updated! Better choice now.\n')
}

main().catch(err => {
  console.error('❌ Error:', err.message)
  process.exit(1)
})
