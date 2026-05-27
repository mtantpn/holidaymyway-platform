import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Page Not Found — HolidayMyWay',
}

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="text-7xl mb-6">✈️</div>
      <h1 className="font-poppins text-4xl font-bold text-holiday-navy mb-3">
        Lost in Transit
      </h1>
      <p className="text-lg text-gray-500 max-w-md mb-8">
        We can&apos;t find the page you&apos;re looking for. It may have moved, or the URL might be wrong.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="rounded-full bg-holiday-teal px-8 py-3 text-sm font-semibold text-white hover:bg-holiday-teal/90 transition-colors"
        >
          Back to Home
        </Link>
        <Link
          href="/destinations"
          className="rounded-full border-2 border-holiday-navy px-8 py-3 text-sm font-semibold text-holiday-navy hover:bg-holiday-navy hover:text-white transition-colors"
        >
          Browse Destinations
        </Link>
      </div>
    </div>
  )
}
