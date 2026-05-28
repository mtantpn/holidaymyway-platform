import type { Metadata } from 'next'
import Link from 'next/link'
import StructuredData from '../../components/seo/StructuredData'

export const metadata: Metadata = {
  title: 'About Us — HolidayMyWay',
  description:
    'Meet the team behind HolidayMyWay — UK-based travel researchers and writers helping British travellers find better holidays for less.',
}

const team = [
  {
    name: 'Sam Rivers',
    role: 'Budget Travel Researcher',
    bio: "Sam has booked a frankly embarrassing number of flights in the past five years — mostly easyJet, occasionally Ryanair, and once a genuinely excellent Wizz Air deal she's still proud of. She spends her days testing budget travel strategies, comparing booking platforms, and working out exactly how much you can actually save by flying from Bristol instead of Heathrow. Her personal record is a week in Porto for £280 including flights. She's convinced the best travel hack is simply booking earlier than feels comfortable.",
    initials: 'SR',
    colour: 'bg-holiday-teal',
  },
  {
    name: 'Andrea Costa',
    role: 'Senior Travel Writer',
    bio: "Andrea covers city breaks, weekend escapes, and European travel for HolidayMyWay. She's based in London but tries to leave at least once a month. She's been to Croatia four times and has strong opinions about Split versus Dubrovnik (Split, always Split). She writes the way she travels: with a plan, but loose enough to find something better. Her guides are the ones you re-read on the plane because they're actually useful.",
    initials: 'AC',
    colour: 'bg-holiday-orange',
  },
  {
    name: 'The HolidayMyWay Team',
    role: 'Editorial Team',
    bio: "Beyond Sam and Andrea, HolidayMyWay is supported by a wider team of UK-based travel researchers, fact-checkers, and destination specialists. Every guide is checked for accuracy, every price estimate is based on real research, and every affiliate recommendation is one we'd genuinely use ourselves. We don't publish destination guides for places nobody on the team has actually been to.",
    initials: 'HM',
    colour: 'bg-holiday-navy',
  },
]

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'HolidayMyWay',
  url: 'https://www.holidaymyway.com',
  description:
    'UK travel guides and holiday deals for budget to mid-range British travellers.',
  foundingDate: '2025',
  employee: [
    { '@type': 'Person', name: 'Sam Rivers', jobTitle: 'Budget Travel Researcher' },
    { '@type': 'Person', name: 'Andrea Costa', jobTitle: 'Senior Travel Writer' },
  ],
}

export default function AboutPage() {
  return (
    <>
      <StructuredData data={orgSchema} />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-14 sm:py-20">
        {/* Header */}
        <div className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-holiday-teal mb-4">
            About HolidayMyWay
          </p>
          <h1 className="font-poppins text-4xl font-bold text-holiday-navy sm:text-5xl leading-tight">
            Honest travel guides.<br />No fluff.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-gray-600 max-w-2xl">
            HolidayMyWay is a UK travel publication built on one idea: you deserve
            accurate, practical travel information without having to wade through
            vague lists and suspiciously sponsored content.
          </p>
          <p className="mt-4 text-base leading-relaxed text-gray-500 max-w-2xl">
            We write destination guides, budget tips, and itineraries — all tested
            against reality, all priced in GBP, all written by people who actually
            travel. When we include a booking link, we'll always tell you it's an
            affiliate link. That's how we keep the lights on.
          </p>
        </div>

        {/* What we cover */}
        <div className="mb-14 grid gap-5 sm:grid-cols-3">
          {[
            {
              heading: 'Destination Guides',
              text: 'In-depth guides to European and worldwide destinations — flights, accommodation, food, transport, and honest budget breakdowns.',
              colour: 'bg-holiday-teal',
            },
            {
              heading: 'Budget Travel Tips',
              text: 'Practical money-saving strategies that actually work: when to book, which airports to fly from, how to avoid the common traps.',
              colour: 'bg-holiday-orange',
            },
            {
              heading: 'Weekend Breaks',
              text: 'City break guides built around 2–4 day itineraries for busy people who want to make the most of a long weekend.',
              colour: 'bg-holiday-navy',
            },
          ].map((card) => (
            <div key={card.heading} className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className={`mb-4 h-1 w-8 rounded-full ${card.colour}`} />
              <h3 className="font-poppins font-semibold text-holiday-navy mb-2">{card.heading}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{card.text}</p>
            </div>
          ))}
        </div>

        {/* Team */}
        <div className="mb-14">
          <h2 className="font-poppins text-2xl font-bold text-holiday-navy mb-8">
            Meet the team
          </h2>
          <div className="space-y-6">
            {team.map((member) => (
              <div key={member.name} className="flex gap-5 rounded-2xl border border-gray-200 bg-white p-6">
                <div
                  className={`shrink-0 h-12 w-12 rounded-full ${member.colour} flex items-center justify-center font-poppins font-bold text-white text-sm`}
                >
                  {member.initials}
                </div>
                <div>
                  <p className="font-poppins font-semibold text-holiday-navy">{member.name}</p>
                  <p className="text-xs text-holiday-teal font-medium uppercase tracking-wide mb-2">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Affiliate disclosure */}
        <div className="rounded-2xl bg-holiday-cream border border-holiday-gold/20 p-6 mb-10">
          <h2 className="font-poppins font-semibold text-holiday-navy mb-2">
            About our affiliate links
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Some links on HolidayMyWay are affiliate links — if you book through
            them, we earn a small commission at no extra cost to you. This is how
            we fund the site and keep our guides free. We only recommend services
            we would use ourselves, and we always label affiliate content clearly.
            Our editorial opinions are never influenced by commercial relationships.
            You can read our full{' '}
            <Link href="/affiliate-disclosure" className="text-holiday-teal underline">
              affiliate disclosure here
            </Link>.
          </p>
        </div>

        <div className="text-center">
          <p className="text-gray-500 text-sm mb-4">Questions or feedback?</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-holiday-teal px-6 py-3 text-sm font-semibold text-white hover:bg-holiday-teal/90 transition-colors"
          >
            Get in touch →
          </Link>
        </div>
      </div>
    </>
  )
}
