import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '../../lib/sanity/image'

interface DestinationCardProps {
  name: string
  slug: string
  country: string
  excerpt?: string
  featuredImage: any
  flightTime?: string
  budget?: string
}

export default function DestinationCard({
  name,
  slug,
  country,
  excerpt,
  featuredImage,
  flightTime,
  budget,
}: DestinationCardProps) {
  const imageUrl = featuredImage?.asset
    ? urlFor(featuredImage).width(500).height(360).url()
    : null

  return (
    <Link href={`/destinations/${slug}`} className="group block">
      <div className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 h-64">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={featuredImage?.alt ?? name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="h-full bg-holiday-navy" />
        )}

        {/* Gradient overlay — dark at bottom for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/70">{country}</p>
          <h3 className="font-poppins text-2xl font-bold text-white leading-tight">{name}</h3>

          {/* Quick info pills */}
          {(flightTime || budget) && (
            <div className="mt-2 flex flex-wrap gap-2">
              {flightTime && (
                <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs text-white backdrop-blur-sm">
                  ✈ {flightTime}
                </span>
              )}
              {budget && (
                <span className="rounded-full bg-holiday-gold/80 px-2.5 py-0.5 text-xs font-medium text-white">
                  {budget}/wk
                </span>
              )}
            </div>
          )}
        </div>

        {/* Arrow on hover */}
        <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
          →
        </div>
      </div>
    </Link>
  )
}
