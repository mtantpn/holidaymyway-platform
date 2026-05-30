'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Destinations', href: '/destinations' },
  { label: 'Guides', href: '/blog' },
  { label: 'About', href: '/about' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/assets/brand/logo/doh-primary.svg"
              alt="Dose of Holiday"
              width={120}
              height={50}
              className="h-10 w-auto"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-holiday-teal bg-holiday-teal/8'
                    : 'text-gray-600 hover:text-holiday-navy hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-4 bg-holiday-orange text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-holiday-orange/90 transition-colors"
            >
              Contact Us
            </Link>
          </nav>

          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-holiday-teal transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4">
          <nav className="flex flex-col gap-1 pt-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-holiday-teal bg-holiday-teal/8'
                    : 'text-gray-600 hover:text-holiday-navy'
                }`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="bg-holiday-orange text-white text-sm font-semibold px-4 py-2 rounded-full text-center hover:bg-holiday-orange/90 transition-colors mt-2"
              onClick={() => setOpen(false)}
            >
              Contact Us
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
