import type { MetadataRoute } from 'next'
import { sanityFetch } from '../lib/sanity/client'
import {
  sitemapArticlesQuery,
  allCategorySlugsQuery,
  allDestinationSlugsQuery,
} from '../lib/sanity/queries'

const BASE_URL = 'https://www.holidaymyway.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let articles: { slug: string; publishedAt: string; _updatedAt: string }[] = []
  let categories: { slug: string }[] = []
  let destinations: { slug: string }[] = []

  try {
    ;[articles, categories, destinations] = await Promise.all([
      sanityFetch<{ slug: string; publishedAt: string; _updatedAt: string }[]>({
        query: sitemapArticlesQuery,
        revalidate: 3600,
      }),
      sanityFetch<{ slug: string }[]>({ query: allCategorySlugsQuery, revalidate: 3600 }),
      sanityFetch<{ slug: string }[]>({ query: allDestinationSlugsQuery, revalidate: 3600 }),
    ])
  } catch {
    // returns static routes only if Sanity is unreachable
  }

  return [
    { url: BASE_URL, lastModified: new Date(), priority: 1.0, changeFrequency: 'weekly' },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE_URL}/destinations`, lastModified: new Date(), priority: 0.9, changeFrequency: 'weekly' },
    ...articles.map((a) => ({
      url: `${BASE_URL}/blog/${a.slug}`,
      lastModified: new Date(a._updatedAt || a.publishedAt),
      priority: 0.8 as const,
      changeFrequency: 'weekly' as const,
    })),
    ...categories.map((c) => ({
      url: `${BASE_URL}/blog/category/${c.slug}`,
      lastModified: new Date(),
      priority: 0.7 as const,
      changeFrequency: 'weekly' as const,
    })),
    ...destinations.map((d) => ({
      url: `${BASE_URL}/destinations/${d.slug}`,
      lastModified: new Date(),
      priority: 0.9 as const,
      changeFrequency: 'monthly' as const,
    })),
  ]
}
