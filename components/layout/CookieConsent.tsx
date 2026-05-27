'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const COOKIE_NAME = 'hmw_consent'
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60 // 1 year in seconds

function readConsent(): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : null
}

function writeConsent(value: 'all' | 'essential') {
  document.cookie = `${COOKIE_NAME}=${value}; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax`
  window.dispatchEvent(new CustomEvent('hmw:consent', { detail: { analytics: value === 'all' } }))
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!readConsent()) setVisible(true)
  }, [])

  if (!visible) return null

  function accept() {
    writeConsent('all')
    setVisible(false)
  }

  function reject() {
    writeConsent('essential')
    setVisible(false)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <div className="mx-auto max-w-4xl bg-holiday-navy text-white rounded-2xl shadow-2xl p-5 sm:p-6 flex flex-col sm:flex-row gap-4 sm:items-center">
        <div className="flex-1 text-sm leading-relaxed">
          <p>
            We use cookies to analyse site traffic and improve your experience. Read our{' '}
            <Link href="/privacy-policy" className="underline hover:text-holiday-teal transition-colors">
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link href="/cookies" className="underline hover:text-holiday-teal transition-colors">
              Cookie Policy
            </Link>{' '}
            for full details.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={reject}
            className="rounded-full border border-white/40 px-5 py-2 text-sm font-medium hover:bg-white/10 transition-colors"
          >
            Essential only
          </button>
          <button
            onClick={accept}
            className="rounded-full bg-holiday-teal px-5 py-2 text-sm font-semibold hover:bg-holiday-teal/90 transition-colors"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  )
}
