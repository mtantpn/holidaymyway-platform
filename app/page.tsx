import type { Metadata } from 'next'
import HeroSection from '../components/portal/HeroSection'
import ExploreCategories from '../components/portal/ExploreCategories'
import FeaturedArticles from '../components/portal/FeaturedArticles'
import DestinationCard from '../components/portal/DestinationCard'
import ArticleGrid from '../components/blog/ArticleGrid'
import NewsletterSignup from '../components/email/NewsletterSignup'
import { sanityFetch } from '../lib/sanity/client'
import { latestArticlesQuery, allDestinationsQuery } from '../lib/sanity/queries'
import type { ArticleSummary, Destination } from '../lib/sanity/types'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'HolidayMyWay — UK Travel Guides & Holiday Deals',
  description:
    'Expert travel guides and affordable holiday inspiration for UK travellers. Flights, hotels, activities — all in one place.',
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
      <HeroSection />

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
                  Popular Destinations
                </h2>
                <p className="mt-1 text-sm text-gray-500">Expert guides for every budget</p>
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
                  More Travel Guides
                </h2>
                <p className="mt-1 text-sm text-gray-500">More UK travel inspiration</p>
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
