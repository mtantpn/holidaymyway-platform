import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import SearchWidget from './SearchWidget'

// Hero image: Navagio Beach (Shipwreck Beach), Zakynthos, Greece — stored in Sanity CDN
// Photo by Robin James Bartlett via Pexels
const HERO_IMAGE =
  'https://cdn.sanity.io/images/s6i0x1s0/production/53ddfb9e06e05999ed7bf9ad8c138fde0fdbd5ed-1920x1079.jpg'

const categories = [
  { label: 'Destination Guides', href: '/blog/category/destination-guides' },
  { label: 'City Breaks', href: '/blog/category/city-breaks' },
  { label: 'UK Staycations', href: '/blog/category/uk-staycations' },
  { label: 'Budget Travel', href: '/blog/category/budget-travel-tips' },
]

export default function HeroSection() {
  return (
    <section className="relative flex flex-col overflow-hidden">
      {/* ── Background image ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src={HERO_IMAGE}
          alt="Navagio Beach, Zakynthos, Greece — turquoise water and white cliffs"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Uniform overlay — ensures text contrast across full width for centered layout */}
        <div className="absolute inset-0 bg-black/45" />
        {/* Bottom vignette — blends into the category strip */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/65 to-transparent" />
      </div>

      {/* ── Hero content — centred ── */}
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center
                      px-4 pt-16 pb-14 text-center
                      sm:px-6 sm:pt-24 sm:pb-20
                      lg:px-8 lg:pt-28 lg:pb-24
                      min-h-[520px] sm:min-h-[580px] justify-center">

        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-holiday-gold">
          Cheap Holidays · City Breaks · UK Staycations · Budget Travel Tips
        </p>

        <h1 className="font-poppins text-4xl font-extrabold leading-[1.05] tracking-tight text-white
                       sm:text-5xl lg:text-[4rem] xl:text-[4.5rem]
                       max-w-3xl">
          Your holiday.{' '}
          <span className="text-holiday-gold">Your way.</span>
        </h1>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg sm:mt-6">
          Honest travel guides, cheap holiday finds, and the best deals on
          flights, hotels, and experiences — for UK travellers on any budget.
        </p>

        {/* Search widget — full width up to max-w-2xl, centred */}
        <div className="mt-8 w-full max-w-2xl">
          <SearchWidget dark />
        </div>
      </div>

      {/* ── Category navigation strip ── */}
      <div className="relative z-10 border-t border-white/10 bg-black/35 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Browse by category"
            className="flex items-center overflow-x-auto no-scrollbar"
          >
            {categories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="flex shrink-0 items-center whitespace-nowrap border-b-2 border-transparent
                           px-4 py-3.5 text-sm font-medium text-white/75
                           transition-colors hover:border-white hover:text-white
                           min-h-[44px]"
              >
                {cat.label}
              </Link>
            ))}
            <Link
              href="/destinations"
              className="ml-auto flex shrink-0 items-center gap-1 whitespace-nowrap
                         px-4 py-3.5 text-sm font-semibold text-holiday-gold
                         transition-colors hover:text-holiday-gold/80 min-h-[44px]"
            >
              All Destinations <ArrowRight size={14} />
            </Link>
          </nav>
        </div>
      </div>
    </section>
  )
}
