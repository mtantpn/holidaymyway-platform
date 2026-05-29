import type { Metadata } from 'next'
import HeroSection from '../components/portal/HeroSection'
import TrendingDestinationsWidget from '../components/portal/TrendingDestinationsWidget'
import ExploreCategories from '../components/portal/ExploreCategories'
import FeaturedArticles from '../components/portal/FeaturedArticles'
import DestinationCard from '../components/portal/DestinationCard'
import ArticleGrid from '../components/blog/ArticleGrid'
import NewsletterSignup from '../components/email/NewsletterSignup'
import StructuredData from '../components/seo/StructuredData'
import { sanityFetch } from '../lib/sanity/client'
import { latestArticlesQuery, allDestinationsQuery } from '../lib/sanity/queries'
import type { ArticleSummary, Destination } from '../lib/sanity/types'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Dose of Holiday — Cheap Holidays, Travel Deals & UK Travel Guides',
  description:
    'Plan your perfect getaway with Dose of Holiday. Expert guides on cheap holidays, city breaks, UK staycations, and budget travel tips — written by real travellers for UK adventurers.',
  alternates: {
    canonical: 'https://www.doseofholiday.com',
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Dose of Holiday',
  url: 'https://www.doseofholiday.com',
  description:
    'Expert holiday guides, cheap travel deals, and destination inspiration for UK travellers.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://www.doseofholiday.com/blog?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Dose of Holiday',
  url: 'https://www.doseofholiday.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://www.doseofholiday.com/logo.png',
    width: 512,
    height: 512,
  },
  sameAs: [
    'https://www.instagram.com/doseofholiday',
    'https://www.facebook.com/doseofholiday',
    'https://twitter.com/doseofholiday',
  ],
  description:
    'UK travel blog helping everyday travellers find the best holiday deals, plan budget trips, and discover amazing destinations.',
}

export default async function HomePage() {
  let articles: ArticleSummary[] = []
  let destinations: Destination[] = []

  try {
    ;[articles, destinations] = await Promise.all([
      sanityFetch<ArticleSummary[]>({
        query: latestArticlesQuery,
        params: { limit: 6 },
        revalidate: 3600,
      }),
      sanityFetch<Destination[]>({ query: allDestinationsQuery, revalidate: 3600 }),
    ])
  } catch {
    // Sanity not yet configured — render shell with empty sections
  }

  const featuredArticles = articles.slice(0, 3)
  const moreArticles = articles.slice(3, 6)

  return (
    <>
      <StructuredData data={websiteSchema} />
      <StructuredData data={organizationSchema} />

      <HeroSection />

      {/* TravelPayouts trending destinations widget */}
      <TrendingDestinationsWidget />

      {/* Editorial magazine feature — top 3 articles */}
      {featuredArticles.length > 0 && <FeaturedArticles articles={featuredArticles} />}

      {/* Category browser — always shown */}
      <ExploreCategories />

      {/* Popular Destinations */}
      {destinations.length > 0 && (
        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex items-baseline justify-between">
              <div>
                <h2 className="font-poppins text-2xl font-bold text-holiday-navy sm:text-3xl">
                  Popular Holiday Destinations
                </h2>
                <p className="mt-1 text-sm text-gray-500">Expert UK travel guides — real prices, honest tips</p>
              </div>
              <Link
                href="/destinations"
                className="hidden items-center gap-1 text-sm font-semibold text-holiday-teal transition-colors hover:text-holiday-teal/70 sm:flex"
              >
                View all <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {destinations.slice(0, 6).map((dest) => (
                <DestinationCard
                  key={dest._id}
                  name={dest.name}
                  slug={dest.slug}
                  country={dest.country}
                  excerpt={dest.excerpt}
                  featuredImage={dest.featuredImage}
                  flightTime={dest.flightTimeFromLondon}
                  budget={dest.averageBudget}
                />
              ))}
            </div>
            <div className="mt-8 text-center sm:hidden">
              <Link
                href="/destinations"
                className="inline-flex items-center gap-2 rounded-full border-2 border-holiday-teal px-6 py-2.5 text-sm font-semibold text-holiday-teal transition-colors hover:bg-holiday-teal hover:text-white"
              >
                View all destinations →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* More guides — articles 4–6 */}
      {moreArticles.length > 0 && (
        <section className="bg-gray-50 py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex items-baseline justify-between">
              <div>
                <h2 className="font-poppins text-2xl font-bold text-holiday-navy sm:text-3xl">
                  Holiday Tips, City Breaks & Budget Travel
                </h2>
                <p className="mt-1 text-sm text-gray-500">Practical guides written by UK travellers, for UK travellers</p>
              </div>
              <Link
                href="/blog"
                className="hidden items-center gap-1 text-sm font-semibold text-holiday-teal transition-colors hover:text-holiday-teal/70 sm:flex"
              >
                View all <span aria-hidden="true">→</span>
              </Link>
            </div>
            <ArticleGrid articles={moreArticles} columns={3} />
            <div className="mt-8 text-center sm:hidden">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full border-2 border-holiday-teal px-6 py-2.5 text-sm font-semibold text-holiday-teal transition-colors hover:bg-holiday-teal hover:text-white"
              >
                View all guides →
              </Link>
            </div>
          </div>
        </section>
      )}

      <NewsletterSignup variant="section" />
    </>
  )
}
