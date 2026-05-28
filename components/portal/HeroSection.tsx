import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SearchWidget from './SearchWidget'

const categories = [
  { label: 'Destination Guides', href: '/blog/category/destination-guides' },
  { label: 'City Breaks', href: '/blog/category/city-breaks' },
  { label: 'UK Staycations', href: '/blog/category/uk-staycations' },
  { label: 'Budget Travel', href: '/blog/category/budget-travel-tips' },
]

export default function HeroSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-12 sm:pt-24 sm:pb-16">
        <div className="max-w-3xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-holiday-teal">
            UK Travel Guides &amp; Holiday Inspiration
          </p>
          <h1 className="font-poppins text-5xl font-extrabold leading-[1.05] tracking-tight text-holiday-navy sm:text-6xl lg:text-[4.5rem]">
            Your holiday.{' '}
            <span className="text-holiday-teal">Your way.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-500 sm:text-xl">
            Expert travel guides and the best deals on flights, hotels, and experiences —
            built for UK travellers on any budget.
          </p>
          <div className="mt-8 max-w-xl">
            <SearchWidget />
          </div>
        </div>
      </div>

      {/* Category navigation strip */}
      <div className="border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Browse by category"
            className="flex items-center overflow-x-auto no-scrollbar"
          >
            {categories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="flex shrink-0 items-center whitespace-nowrap border-b-2 border-transparent px-4 py-3 text-sm font-medium text-gray-600 transition-colors hover:border-holiday-teal hover:text-holiday-navy"
              >
                {cat.label}
              </Link>
            ))}
            <Link
              href="/destinations"
              className="ml-auto flex shrink-0 items-center gap-1 whitespace-nowrap px-4 py-3 text-sm font-semibold text-holiday-teal transition-colors hover:text-holiday-teal/70"
            >
              All Destinations <ArrowRight size={14} />
            </Link>
          </nav>
        </div>
      </div>
    </section>
  )
}
