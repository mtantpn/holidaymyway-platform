import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { sanityFetch } from '../../../lib/sanity/client'
import { urlFor } from '../../../lib/sanity/image'
import {
  departureCityBySlugQuery,
  allDepartureCitySlugsQuery,
  articlesByDepartureCityQuery,
} from '../../../lib/sanity/queries'
import type { DepartureCity, ArticleSummary } from '../../../lib/sanity/types'
import ArticleCard from '../../../components/blog/ArticleCard'
import ArticleBody from '../../../components/blog/ArticleBody'

type Props = { params: Promise<{ city: string }> }

export async function generateStaticParams() {
  try {
    const slugs = await sanityFetch<{ slug: string }[]>({
      query: allDepartureCitySlugsQuery,
      revalidate: 0,
    })
    return (slugs ?? []).map(({ slug }) => ({ city: slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params
  try {
    const data = await sanityFetch<DepartureCity>({
      query: departureCityBySlugQuery,
      params: { slug: city },
    })
    if (!data) return {}
    const title = data.seoTitle ?? `Cheap Holidays from ${data.name} — HolidayMyWay`
    const description =
      data.seoDescription ??
      data.excerpt ??
      `Find the best holiday deals departing from ${data.name}. Compare flights, hotels, and packages for UK travellers.`
    return {
      title,
      description,
      openGraph: { title, description, type: 'website' },
    }
  } catch {
    return {}
  }
}

export default async function DepartureCityPage({ params }: Props) {
  const { city } = await params

  let data: DepartureCity | null = null
  let articles: ArticleSummary[] = []

  try {
    data = await sanityFetch<DepartureCity>({
      query: departureCityBySlugQuery,
      params: { slug: city },
    })
  } catch {
    /* no-op — build-time resilience */
  }

  if (!data) notFound()

  try {
    articles = await sanityFetch<ArticleSummary[]>({
      query: articlesByDepartureCityQuery,
      params: { slug: city, limit: 6 },
    })
  } catch {
    articles = []
  }

  const heroImageUrl = data.featuredImage
    ? urlFor(data.featuredImage).width(1400).height(500).auto('format').url()
    : null

  const marker = process.env.NEXT_PUBLIC_TRAVELPAYOUTS_MARKER ?? '0'
  const iata = data.iataCode ?? ''
  const skyscannerUrl = `https://www.skyscanner.net/transport/flights/${iata.toLowerCase()}/anywhere/?ref=travelpayouts&marker=${marker}`

  const allAirports = [data.iataCode, ...(data.nearbyAirports ?? [])].filter(Boolean)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Cheap Holidays from ${data.name}`,
    description: data.excerpt,
    url: `https://www.holidaymyway.com/from/${city}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative h-64 sm:h-80 overflow-hidden bg-holiday-navy">
        {heroImageUrl ? (
          <Image
            src={heroImageUrl}
            alt={data.name}
            fill
            className="object-cover opacity-50"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-holiday-navy to-holiday-teal opacity-80" />
        )}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <p className="text-holiday-teal text-sm font-semibold uppercase tracking-widest mb-2">
            Departing from
          </p>
          <h1 className="font-poppins text-4xl sm:text-5xl font-bold text-white mb-3">
            {data.name}
          </h1>
          {allAirports.length > 0 && (
            <p className="text-white/80 text-sm">
              Airport{allAirports.length > 1 ? 's' : ''}: {allAirports.join(' · ')}
            </p>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">

        {/* Search CTA */}
        {iata && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 mb-12 text-center">
            <h2 className="font-poppins text-2xl font-bold text-holiday-navy mb-2">
              Find flights from {data.name}
            </h2>
            <p className="text-gray-500 mb-6 max-w-lg mx-auto">
              Compare hundreds of airlines and booking sites. Prices update in real time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={skyscannerUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-holiday-teal px-8 py-3 text-sm font-semibold text-white hover:bg-holiday-teal/90 transition-colors"
              >
                ✈ Search flights from {iata}
              </a>
              <a
                href={`https://www.booking.com/flights/index.html?aid=304142&from=${iata}`}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-holiday-navy px-8 py-3 text-sm font-semibold text-holiday-navy hover:bg-holiday-navy hover:text-white transition-colors"
              >
                Search Hotels too
              </a>
            </div>
            <p className="text-xs text-gray-400 mt-4">
              Affiliate links — we may earn a small commission at no cost to you.{' '}
              <Link href="/affiliate-disclosure" className="underline">Learn more</Link>
            </p>
          </div>
        )}

        {/* Description */}
        {data.description && data.description.length > 0 && (
          <div className="prose prose-lg max-w-2xl mx-auto mb-12 prose-headings:font-poppins prose-headings:text-holiday-navy prose-a:text-holiday-teal">
            <ArticleBody content={data.description} />
          </div>
        )}

        {/* Popular destinations */}
        {data.popularDestinations && data.popularDestinations.length > 0 && (
          <section className="mb-16">
            <h2 className="font-poppins text-2xl font-bold text-holiday-navy mb-6">
              Popular destinations from {data.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.popularDestinations.map((dest) => {
                const imgUrl = dest.featuredImage
                  ? urlFor(dest.featuredImage).width(600).height(400).auto('format').url()
                  : null
                const searchUrl = iata && dest.iataCode
                  ? `https://www.skyscanner.net/transport/flights/${iata.toLowerCase()}/${dest.iataCode.toLowerCase()}/?ref=travelpayouts&marker=${marker}`
                  : skyscannerUrl
                return (
                  <div
                    key={dest._id}
                    className="group relative overflow-hidden rounded-2xl aspect-[3/2] bg-gray-200"
                  >
                    {imgUrl ? (
                      <Image
                        src={imgUrl}
                        alt={dest.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-holiday-teal to-holiday-navy" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-poppins text-lg font-bold text-white">{dest.name}</h3>
                      <p className="text-white/80 text-sm">{dest.country}</p>
                    </div>
                    <div className="absolute top-3 right-3 flex gap-2">
                      <Link
                        href={`/destinations/${dest.slug}`}
                        className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-holiday-navy hover:bg-white transition-colors"
                      >
                        Guide
                      </Link>
                      <a
                        href={searchUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="rounded-full bg-holiday-teal px-3 py-1 text-xs font-semibold text-white hover:bg-holiday-teal/90 transition-colors"
                      >
                        Flights
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* Related articles */}
        {articles.length > 0 && (
          <section>
            <h2 className="font-poppins text-2xl font-bold text-holiday-navy mb-6">
              Travel guides for {data.name} flyers
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article._id} article={article} />
              ))}
            </div>
          </section>
        )}

        {/* Empty state */}
        {articles.length === 0 && (!data.popularDestinations || data.popularDestinations.length === 0) && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">Content coming soon for {data.name} departures.</p>
            <Link href="/destinations" className="mt-4 inline-block text-holiday-teal hover:underline">
              Browse all destinations →
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
