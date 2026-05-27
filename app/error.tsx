'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="text-7xl mb-6">🗺️</div>
      <h1 className="font-poppins text-3xl font-bold text-holiday-navy mb-3">
        Something went wrong
      </h1>
      <p className="text-gray-500 max-w-md mb-8">
        We hit a bump on the road. This is usually temporary — try again or head back home.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={reset}
          className="rounded-full bg-holiday-teal px-8 py-3 text-sm font-semibold text-white hover:bg-holiday-teal/90 transition-colors"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="rounded-full border-2 border-holiday-navy px-8 py-3 text-sm font-semibold text-holiday-navy hover:bg-holiday-navy hover:text-white transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
