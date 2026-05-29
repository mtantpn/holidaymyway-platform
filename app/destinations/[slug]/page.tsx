import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Plane, Sun, PoundSterling } from 'lucide-react'
import { sanityFetch } from '../../../lib/sanity/client'
import {
  destinationBySlugQuery,
  allDestinationSlugsQuery,
  articlesByCategory,
} from '../../../lib/sanity/queries'
import ArticleBody from '../../../components/blog/ArticleBody'
import ArticleGrid from '../../../components/blog/ArticleGrid'
import ArticleFAQ from '../../../components/blog/ArticleFAQ'
import AffiliateWidget from '../../../components/affiliate/AffiliateWidget'
import BookingWidget from '../../../components/affiliate/BookingWidget'
import EsimWidget from '../../../components/affiliate/EsimWidget'
import TransferWidget from '../../../components/affiliate/TransferWidget'
import { AFFILIATE_LINKS } from '../../../lib/affiliates'
import StructuredData from '../../../components/seo/StructuredData'
import { urlFor } from '../../../lib/sanity/image'
import type { Destination, ArticleSummary } from '../../../lib/sanity/types'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  try {
    const slugs = await sanityFetch<{ slug: string }[]>({
      query: allDestinationSlugsQuery,
      revalidate: 0,
    })
    return (slugs ?? []).map(({ slug }) => ({ slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const dest = await sanityFetch<Destination>({
      query: destinationBySlugQuery,
      params: { slug },
    })
    if (!dest) return {}
    const image = dest.featuredImage?.asset
      ? urlFor(dest.featuredImage).width(1200).height(630).url()
      : undefined
    return {
      title: dest.seoTitle || `${dest.name} Holiday Guide — Cheap Holidays & Tips for UK Travellers`,
      description: dest.seoDescription || dest.excerpt,
      alternates: {
        canonical: `https://www.doseofholiday.com/destinations/${slug}`,
      },
      openGraph: {
        title: dest.seoTitle || `${dest.name} Holiday Guide`,
        description: dest.seoDescription || dest.excerpt,
        images: image ? [{ url: image, width: 1200, height: 630 }] : [],
      },
    }
  } catch {
    return {}
  }
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params

  let dest: Destination | null = null
  try {
    dest = await sanityFetch<Destination>({
      query: destinationBySlugQuery,
      params: { slug },
      revalidate: 3600,
    })
  } catch {
    notFound()
  }
  if (!dest) notFound()

  let relatedArticles: ArticleSummary[] = []
  try {
    relatedArticles = await sanityFetch<ArticleSummary[]>({
      query: articlesByCategory,
      params: { slug },
      revalidate: 3600,
    }) ?? []
  } catch {
    //
  }

  const heroUrl = dest.featuredImage?.asset
    ? urlFor(dest.featuredImage).width(1400).height(600).url()
    : null

  const destinationSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: dest.name,
    description: dest.excerpt,
    touristType: 'UK travellers',
    ...(dest.country && { containedInPlace: { '@type': 'Country', name: dest.country } }),
  }

  return (
    <>
      <StructuredData data={destinationSchema} />

      {/* Hero */}
      <div className="relative h-64 sm:h-96 overflow-hidden">
        {heroUrl ? (
          <Image
            src={heroUrl}
            alt={dest.featuredImage?.alt ?? dest.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="h-full bg-holiday-navy" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/70">
            {dest.country}
          </p>
          <h1 className="font-poppins text-4xl font-bold text-white sm:text-5xl">{dest.name}</h1>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">

          {/* Main column */}
          <div>
            {/* Quick facts */}
            {(dest.flightTimeFromLondon || dest.bestSeason || dest.averageBudget) && (
              <dl className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 rounded-2xl bg-holiday-cream p-6">
                {dest.flightTimeFromLondon && (
                  <div>
                    <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-400">
                      <Plane size={12} /> Flight time
                    </dt>
                    <dd className="mt-1 font-poppins font-semibold text-holiday-navy">{dest.flightTimeFromLondon}</dd>
                  </div>
                )}
                {dest.bestSeason && (
                  <div>
                    <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-400">
                      <Sun size={12} /> Best season
                    </dt>
                    <dd className="mt-1 font-poppins font-semibold text-holiday-navy">{dest.bestSeason}</dd>
                  </div>
                )}
                {dest.averageBudget && (
                  <div>
                    <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-400">
                      <PoundSterling size={12} /> Avg budget
                    </dt>
                    <dd className="mt-1 font-poppins font-semibold text-holiday-navy">{dest.averageBudget}</dd>
                  </div>
                )}
              </dl>
            )}

            {/* Destination description */}
            {dest.description && dest.description.length > 0 && (
              <ArticleBody content={dest.description} />
            )}

            {/* Booking.com widget */}
            {dest.bookingCity && (
              <BookingWidget city={dest.bookingCity} />
            )}

            {/* Airport Transfer Widget — inline content */}
            <TransferWidget destination={dest.name} />

            {/* eSIM Widget — inline content */}
            <EsimWidget destination={dest.name} />

            {/* FAQs */}
            {dest.faqs && dest.faqs.length > 0 && (
              <ArticleFAQ faqs={dest.faqs} />
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            <div className="sticky top-20">
              <h2 className="mb-4 font-poppins text-xl font-bold text-holiday-navy">
                Book Your Trip
              </h2>

              {/* Flights */}
              {dest.iataCode && (
                <AffiliateWidget
                  program="kayak"
                  label={`Flights to ${dest.name}`}
                  url={`https://www.kayak.co.uk/flights/LON-${dest.iataCode}`}
                  destination={dest.name}
                  placement="flights"
                />
              )}

              {/* Hotels */}
              {dest.bookingCity && (
                <AffiliateWidget
                  program="booking"
                  label={`Hotels in ${dest.name}`}
                  url={`https://www.booking.com/searchresults.en-gb.html?ss=${encodeURIComponent(dest.bookingCity)}`}
                  destination={dest.name}
                  placement="hotels"
                />
              )}

              {/* Airport Transfer */}
              <AffiliateWidget
                program="kiwitaxi"
                label={`Airport Transfer — ${dest.name}`}
                url={AFFILIATE_LINKS.kiwitaxi}
                destination={dest.name}
                placement="transfer"
              />

              {/* Activities — Klook (HOT program) + Viator */}
              <AffiliateWidget
                program="klook"
                label={`Experiences in ${dest.name}`}
                url={`${AFFILIATE_LINKS.klook}?q=${encodeURIComponent(dest.name)}`}
                destination={dest.name}
                placement="activities-klook"
              />
              <AffiliateWidget
                program="viator"
                label={`Tours & Activities — ${dest.name}`}
                url={`https://www.viator.com/searchResults/all?text=${encodeURIComponent(dest.name)}`}
                destination={dest.name}
                placement="activities-viator"
              />

              {/* Car hire */}
              <AffiliateWidget
                program="getRentacar"
                label={`Car Hire in ${dest.name}`}
                url={AFFILIATE_LINKS.getRentacar}
                destination={dest.name}
                placement="car-hire"
              />

              {/* Travel Insurance — EKTA (25% commission) */}
              <AffiliateWidget
                program="ekta"
                label="Travel Insurance — Get a Quote"
                url={AFFILIATE_LINKS.ekta}
                destination={dest.name}
                placement="insurance"
              />
            </div>
          </aside>
        </div>

        {/* Related articles */}
        {relatedArticles.length > 0 && (
          <section className="mt-16 border-t border-gray-100 pt-12">
            <h2 className="mb-6 font-poppins text-2xl font-bold text-holiday-navy">
              Travel Guides for {dest.name}
            </h2>
            <ArticleGrid articles={relatedArticles.slice(0, 3)} columns={3} />
          </section>
        )}
      </div>
    </>
  )
}
