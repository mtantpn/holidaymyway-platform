import type { Metadata } from 'next'
import { sanityFetch } from '../../lib/sanity/client'
import { allDestinationsQuery } from '../../lib/sanity/queries'
import DestinationCard from '../../components/portal/DestinationCard'
import type { Destination } from '../../lib/sanity/types'

export const metadata: Metadata = {
  title: 'Holiday Destinations — Cheap Holidays & Travel Guides for UK Travellers',
  description:
    'Explore holiday destinations with expert guides for UK travellers. Real prices in GBP, best time to visit, flight times from London, and honest tips on where to stay and what to do.',
  alternates: {
    canonical: 'https://www.doseofholiday.com/destinations',
  },
}

export default async function DestinationsPage() {
  let destinations: Destination[] = []
  try {
    destinations = await sanityFetch<Destination[]>({
      query: allDestinationsQuery,
      revalidate: 3600,
    }) ?? []
  } catch {
    //
  }

  const regions: Record<string, Destination[]> = {}
  for (const dest of destinations) {
    const key = dest.region ?? 'other'
    if (!regions[key]) regions[key] = []
    regions[key].push(dest)
  }

  const regionLabels: Record<string, string> = {
    'uk-staycations':       'UK Staycations',
    'europe-short-haul':    'Europe Short-Haul',
    'long-haul':            'Long-Haul',
    'budget-destinations':  'Budget Destinations',
    other:                  'All Destinations',
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
      <header className="mb-10">
        <h1 className="font-poppins text-4xl font-bold text-holiday-navy sm:text-5xl">
          Holiday Destinations for UK Travellers
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          From European city breaks to long-haul adventures — expert guides with real prices in GBP.
        </p>
      </header>

      {Object.keys(regions).length === 0 ? (
        <p className="text-center text-gray-400 py-20">Destination guides coming soon.</p>
      ) : (
        Object.entries(regions).map(([region, dests]) => (
          <section key={region} className="mb-14">
            <h2 className="mb-6 font-poppins text-2xl font-semibold text-holiday-navy">
              {regionLabels[region] ?? region}
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {dests.map((dest) => (
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
          </section>
        ))
      )}
    </div>
  )
}
