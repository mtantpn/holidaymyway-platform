import type { MetadataRoute } from 'next'
import { sanityFetch } from '../lib/sanity/client'
import {
  sitemapArticlesQuery,
  allCategorySlugsQuery,
  allDestinationSlugsQuery,
  allDepartureCitySlugsQuery,
  allAuthorSlugsQuery,
} from '../lib/sanity/queries'

const BASE = 'https://www.doseofholiday.com'
const NOW = new Date()

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let articles: { slug: string; publishedAt: string; _updatedAt: string }[] = []
  let categories: { slug: string }[] = []
  let destinations: { slug: string }[] = []
  let departureCities: { slug: string }[] = []
  let authors: { slug: string }[] = []

  try {
    ;[articles, categories, destinations, departureCities, authors] = await Promise.all([
      sanityFetch<{ slug: string; publishedAt: string; _updatedAt: string }[]>({
        query: sitemapArticlesQuery,
        revalidate: 3600,
      }),
      sanityFetch<{ slug: string }[]>({ query: allCategorySlugsQuery, revalidate: 3600 }),
      sanityFetch<{ slug: string }[]>({ query: allDestinationSlugsQuery, revalidate: 3600 }),
      sanityFetch<{ slug: string }[]>({ query: allDepartureCitySlugsQuery, revalidate: 3600 }),
      sanityFetch<{ slug: string }[]>({ query: allAuthorSlugsQuery, revalidate: 3600 }),
    ])
  } catch {
    // returns static routes only if Sanity is unreachable
  }

  return [
    // Core pages
    { url: BASE, lastModified: NOW, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${BASE}/blog`, lastModified: NOW, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE}/destinations`, lastModified: NOW, priority: 0.9, changeFrequency: 'weekly' },

    // Legal + static
    { url: `${BASE}/privacy-policy`, lastModified: NOW, priority: 0.3, changeFrequency: 'yearly' },
    { url: `${BASE}/terms-of-service`, lastModified: NOW, priority: 0.3, changeFrequency: 'yearly' },
    { url: `${BASE}/affiliate-disclosure`, lastModified: NOW, priority: 0.3, changeFrequency: 'yearly' },
    { url: `${BASE}/cookies`, lastModified: NOW, priority: 0.3, changeFrequency: 'yearly' },

    // Articles
    ...articles.map((a) => ({
      url: `${BASE}/blog/${a.slug}`,
      lastModified: new Date(a._updatedAt || a.publishedAt),
      priority: 0.8 as const,
      changeFrequency: 'weekly' as const,
    })),

    // Categories
    ...categories.map((c) => ({
      url: `${BASE}/blog/category/${c.slug}`,
      lastModified: NOW,
      priority: 0.7 as const,
      changeFrequency: 'weekly' as const,
    })),

    // Destinations
    ...destinations.map((d) => ({
      url: `${BASE}/destinations/${d.slug}`,
      lastModified: NOW,
      priority: 0.9 as const,
      changeFrequency: 'monthly' as const,
    })),

    // Departure hubs — high-priority UK SEO
    ...departureCities.map((c) => ({
      url: `${BASE}/from/${c.slug}`,
      lastModified: NOW,
      priority: 0.85 as const,
      changeFrequency: 'monthly' as const,
    })),

    // Author pages
    ...authors.map((a) => ({
      url: `${BASE}/blog/author/${a.slug}`,
      lastModified: NOW,
      priority: 0.5 as const,
      changeFrequency: 'monthly' as const,
    })),
  ]
}
