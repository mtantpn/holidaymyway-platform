import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact Us — HolidayMyWay',
  description:
    'Get in touch with the HolidayMyWay team — for editorial enquiries, partnership proposals, or reader questions.',
}

const topics = [
  {
    heading: 'Reader question or tip suggestion',
    text: 'Have a question about a destination, or a tip you think we should cover? We read everything.',
    email: 'hello@holidaymyway.com',
  },
  {
    heading: 'Press or partnership enquiry',
    text: 'Tourism boards, PR agencies, and travel brands — please use this address for collaboration proposals.',
    email: 'partnerships@holidaymyway.com',
  },
  {
    heading: 'Write for us',
    text: "Experienced UK travel writer? We're always open to pitches from writers who travel the way we do — practically, honestly, and with a budget in mind.",
    email: 'editorial@holidaymyway.com',
  },
]

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-14 sm:py-20">
      <div className="mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-holiday-teal mb-4">
          Get in touch
        </p>
        <h1 className="font-poppins text-4xl font-bold text-holiday-navy sm:text-5xl leading-tight">
          Say hello.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-gray-600 max-w-xl">
          We&apos;re a small team, so responses usually take 2–3 working days.
          Pick the right address below and we&apos;ll get back to you.
        </p>
      </div>

      <div className="space-y-5 mb-14">
        {topics.map((topic) => (
          <div key={topic.heading} className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="font-poppins font-semibold text-holiday-navy mb-1">
              {topic.heading}
            </h2>
            <p className="text-sm text-gray-500 mb-3 leading-relaxed">{topic.text}</p>
            <a
              href={`mailto:${topic.email}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-holiday-teal hover:text-holiday-teal/80 transition-colors"
            >
              {topic.email} →
            </a>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-gray-50 border border-gray-200 p-6 text-sm text-gray-500 leading-relaxed">
        <strong className="text-gray-700">Please note:</strong> We don&apos;t
        accept paid guest posts, link insertions, or sponsored reviews that aren&apos;t
        clearly labelled. Unsolicited SEO outreach is deleted unread. If you&apos;re
        a genuine travel writer or a brand that wants an honest, transparent
        partnership — we&apos;d love to hear from you.
      </div>

      <div className="mt-10 text-center">
        <Link href="/about" className="text-sm text-gray-400 hover:text-holiday-teal transition-colors">
          ← Back to About Us
        </Link>
      </div>
    </div>
  )
}
