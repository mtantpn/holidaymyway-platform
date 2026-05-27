import type { Metadata } from 'next'
import HeroSection from '../components/portal/HeroSection'
import HowItWorks from '../components/portal/HowItWorks'
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

  return (
    <>
      <HeroSection />
      <HowItWorks />

      {/* Featured Destinations */}
      {destinations.length > 0 ? (
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <h2 className="font-poppins text-3xl font-bold text-holiday-navy sm:text-4xl">
                  Popular Destinations
                </h2>
                <p className="mt-2 text-gray-500">Expert guides for every budget</p>
              </div>
              <Link
                href="/destinations"
                className="hidden text-sm font-semibold text-holiday-teal hover:text-holiday-teal/80 sm:block"
              >
                View all →
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
                className="inline-block rounded-full border-2 border-holiday-teal px-6 py-3 text-sm font-semibold text-holiday-teal hover:bg-holiday-teal hover:text-white transition-colors"
              >
                View all destinations →
              </Link>
            </div>
          </div>
        </section>
      ) : (
        /* Placeholder shown before content is seeded */
        <section className="py-16 bg-holiday-cream">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center">
            <h2 className="font-poppins text-3xl font-bold text-holiday-navy">
              Destinations Coming Soon
            </h2>
            <p className="mt-3 text-gray-500">
              We&apos;re building out our destination guides. Check back soon.
            </p>
          </div>
        </section>
      )}

      {/* Latest Articles */}
      {articles.length > 0 && (
        <section className="bg-holiday-cream py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <h2 className="font-poppins text-3xl font-bold text-holiday-navy sm:text-4xl">
                  Latest Travel Guides
                </h2>
                <p className="mt-2 text-gray-500">Fresh tips for UK travellers</p>
              </div>
              <Link
                href="/blog"
                className="hidden text-sm font-semibold text-holiday-teal hover:text-holiday-teal/80 sm:block"
              >
                View all articles →
              </Link>
            </div>
            <ArticleGrid articles={articles} columns={3} />
            <div className="mt-8 text-center sm:hidden">
              <Link
                href="/blog"
                className="inline-block rounded-full border-2 border-holiday-teal px-6 py-3 text-sm font-semibold text-holiday-teal hover:bg-holiday-teal hover:text-white transition-colors"
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
