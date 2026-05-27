'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Destinations', href: '/destinations' },
  { label: 'Guides', href: '/blog' },
  { label: 'Deals', href: '/deals' },
  { label: 'About', href: '/about' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-poppins font-bold text-xl text-holiday-teal">
              Holiday<span className="text-holiday-orange">MyWay</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-holiday-teal transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/newsletter"
              className="bg-holiday-orange text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-holiday-orange/90 transition-colors"
            >
              Get Deals
            </Link>
          </nav>

          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-holiday-teal"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4">
          <nav className="flex flex-col gap-3 pt-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-holiday-teal py-1"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/newsletter"
              className="bg-holiday-orange text-white text-sm font-semibold px-4 py-2 rounded-full text-center hover:bg-holiday-orange/90 transition-colors mt-2"
              onClick={() => setOpen(false)}
            >
              Get Deals
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
