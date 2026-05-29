'use client'

import { useState } from 'react'

interface NewsletterSignupProps {
  variant?: 'inline' | 'section'
}

export default function NewsletterSignup({ variant = 'section' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !consent) return
    setStatus('loading')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
        setMessage("You're in! Check your inbox for your first deal.")
        setEmail('')
      } else {
        setStatus('error')
        setMessage('Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Connection error. Please try again.')
    }
  }

  if (variant === 'inline') {
    return (
      <div className="my-8 rounded-xl bg-holiday-cream p-6">
        <h3 className="mb-1 font-poppins text-lg font-bold text-holiday-navy">
          Get weekly deals to your inbox
        </h3>
        <p className="mb-4 text-sm text-gray-500">
          UK holiday deals, guides, and inspiration — free, every Monday.
        </p>
        {status === 'success' ? (
          <p className="text-sm font-medium text-holiday-teal">{message}</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex gap-2">
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-holiday-teal"
              />
              <button
                type="submit"
                disabled={status === 'loading' || !consent}
                className="rounded-lg bg-holiday-teal px-4 py-2 text-sm font-semibold text-white hover:bg-holiday-teal/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? '…' : 'Subscribe'}
              </button>
            </div>
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                required
                className="mt-0.5 h-4 w-4 shrink-0 accent-holiday-teal"
              />
              <span className="text-xs text-gray-500 leading-relaxed">
                I agree to receive weekly holiday deals and travel tips from Dose of Holiday.
                I can unsubscribe at any time. See our{' '}
                <a href="/privacy-policy" className="underline hover:text-gray-700">Privacy Policy</a>.
              </span>
            </label>
          </form>
        )}
        {status === 'error' && <p className="mt-2 text-xs text-red-500">{message}</p>}
      </div>
    )
  }

  return (
    <section className="bg-holiday-navy py-16 sm:py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-holiday-teal">
            Free Weekly Newsletter
          </p>
          <h2 className="font-poppins text-3xl font-bold sm:text-4xl">
            Holiday deals in your inbox,{' '}
            <span className="text-holiday-teal">every week.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/60">
            Join UK travellers getting the best flight deals, destination guides, and budget
            travel tips — straight to their inbox, every Monday.
          </p>
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/50">
            {[
              'Weekly deals digest',
              'New destination guides',
              'Budget travel hacks',
              'Unsubscribe anytime',
            ].map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-holiday-teal" />
                {item}
              </li>
            ))}
          </ul>

          {status === 'success' ? (
            <div className="mt-8">
              <p className="text-lg font-semibold text-holiday-teal">{message}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 max-w-md space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 rounded-xl border border-white/10 bg-white/10 px-5 py-3.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-holiday-teal focus:bg-white/15"
                />
                <button
                  type="submit"
                  disabled={status === 'loading' || !consent}
                  className="shrink-0 rounded-xl bg-holiday-teal px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-holiday-teal/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? 'Subscribing…' : 'Get Free Deals →'}
                </button>
              </div>
              {/* UK GDPR / PECR — explicit opt-in required for marketing emails */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  required
                  className="mt-0.5 h-4 w-4 shrink-0 accent-holiday-teal"
                />
                <span className="text-xs text-white/50 leading-relaxed">
                  I agree to receive weekly holiday deals and travel inspiration from Dose of Holiday.
                  I can unsubscribe at any time. View our{' '}
                  <a href="/privacy-policy" className="underline hover:text-white/80 transition-colors">
                    Privacy Policy
                  </a>.
                </span>
              </label>
            </form>
          )}
          {status === 'error' && <p className="mt-3 text-xs text-red-400">{message}</p>}
          <p className="mt-4 text-xs text-white/25">
            No spam. Unsubscribe with one click.
          </p>
        </div>
      </div>
    </section>
  )
}
