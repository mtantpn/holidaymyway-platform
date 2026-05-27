import { createClient } from 'next-sanity'

// Only pass a token if it looks like a real Sanity token (sk...).
// This prevents build failures when .env.local still has placeholder values.
const rawToken = process.env.SANITY_API_READ_TOKEN
const token = rawToken?.startsWith('sk') ? rawToken : undefined

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  token,
})

export async function sanityFetch<T>({
  query,
  params = {},
  revalidate = 3600,
}: {
  query: string
  params?: Record<string, unknown>
  revalidate?: number
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { revalidate },
  })
}
