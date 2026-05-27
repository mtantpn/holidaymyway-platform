'use client'

import { useState } from 'react'

interface NewsletterSignupProps {
  variant?: 'inline' | 'section'
}

export default function NewsletterSignup({ variant = 'section' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('loading')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
        setMessage('You\'re in! Check your inbox for your first deal.')
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
      <div className="rounded-xl bg-holiday-cream p-6 my-8">
        <h3 className="font-poppins text-lg font-bold text-holiday-navy mb-1">
          Get weekly deals to your inbox
        </h3>
        <p className="text-sm text-gray-500 mb-4">UK holiday deals, guides, and inspiration — free, every Monday.</p>
        {status === 'success' ? (
          <p className="text-sm font-medium text-holiday-teal">{message}</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
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
              disabled={status === 'loading'}
              className="rounded-lg bg-holiday-teal px-4 py-2 text-sm font-semibold text-white hover:bg-holiday-teal/90 disabled:opacity-60"
            >
              {status === 'loading' ? '…' : 'Subscribe'}
            </button>
          </form>
        )}
        {status === 'error' && <p className="mt-2 text-xs text-red-500">{message}</p>}
      </div>
    )
  }

  return (
    <section className="bg-gradient-to-br from-holiday-navy to-holiday-teal py-16 sm:py-20 text-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 text-center">
        <div className="mb-3 text-3xl">✉️</div>
        <h2 className="font-poppins text-3xl font-bold sm:text-4xl">
          Never Miss a Deal Again
        </h2>
        <p className="mt-4 text-white/80 text-lg">
          Join UK travellers getting weekly holiday deals, destination guides, and budget tips — straight to their inbox.
        </p>
        <ul className="mt-5 flex flex-wrap justify-center gap-4 text-sm text-white/70">
          {['Weekly deals digest', 'New destination guides', 'Budget travel hacks', 'Unsubscribe anytime'].map((item) => (
            <li key={item} className="flex items-center gap-1.5">
              <span className="text-holiday-gold">✓</span> {item}
            </li>
          ))}
        </ul>

        {status === 'success' ? (
          <div className="mt-8 rounded-xl bg-white/10 px-6 py-5">
            <p className="text-lg font-semibold">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-xl border-0 bg-white/15 px-5 py-4 text-white placeholder:text-white/50 outline-none focus:bg-white/20 backdrop-blur-sm"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="rounded-xl bg-holiday-orange px-7 py-4 font-poppins font-semibold text-white hover:bg-holiday-orange/90 disabled:opacity-60 transition-colors shrink-0"
            >
              {status === 'loading' ? 'Subscribing…' : 'Get Free Deals →'}
            </button>
          </form>
        )}
        {status === 'error' && <p className="mt-3 text-sm text-red-300">{message}</p>}
        <p className="mt-4 text-xs text-white/40">
          No spam. Unsubscribe with one click. UK privacy compliant.
        </p>
      </div>
    </section>
  )
}
