import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Affiliate Disclosure — HolidayMyWay',
  description: 'How HolidayMyWay uses affiliate links and earns commissions.',
}

export default function AffiliateDisclosurePage() {
  return (
    <div className="mx-auto max-w-[700px] px-4 sm:px-6 py-14">
      <h1 className="font-poppins text-4xl font-bold text-holiday-navy mb-2">
        Affiliate Disclosure
      </h1>
      <p className="text-sm text-gray-400 mb-10">Last updated: May 2026</p>

      <div className="prose prose-lg max-w-none prose-headings:font-poppins prose-headings:text-holiday-navy prose-a:text-holiday-teal">
        <p>
          HolidayMyWay (<strong>holidaymyway.com</strong>) is an independent travel guide for UK
          travellers. We earn income through affiliate partnerships — this page explains how that
          works and how it affects our editorial process.
        </p>

        <h2>What are affiliate links?</h2>
        <p>
          Some links on this website are affiliate links. This means if you click a link and make
          a purchase or booking, we may receive a small commission from the partner at{' '}
          <strong>no extra cost to you</strong>. The price you pay is exactly the same whether you
          use our link or go directly to the booking site.
        </p>

        <h2>Which partners do we work with?</h2>
        <p>We participate in affiliate programmes operated by the following companies:</p>
        <ul>
          <li><strong>Booking.com</strong> — hotel and accommodation bookings</li>
          <li><strong>Kayak</strong> — flight and hotel price comparison</li>
          <li><strong>Viator</strong> — tours, activities, and experiences</li>
          <li><strong>GetYourGuide</strong> — tours, activities, and experiences</li>
          <li><strong>InsureMyTrip / comparethemarket.com</strong> — travel insurance</li>
          <li><strong>Rentalcars.com</strong> — car hire</li>
          <li><strong>Wise</strong> — currency exchange</li>
          <li><strong>Travelpayouts</strong> — travel affiliate aggregator (includes Skyscanner, Trip.com and others)</li>
        </ul>
        <p>
          All of the above are operated through the <strong>Travelpayouts</strong> affiliate
          network or directly.
        </p>

        <h2>Does this affect our editorial independence?</h2>
        <p>
          No. Our editorial recommendations are based on genuine research, personal travel
          experience, and what we believe provides the best value for UK travellers. We do{' '}
          <strong>not</strong>:
        </p>
        <ul>
          <li>Accept payment to feature, rank, or positively review any product or destination</li>
          <li>Remove or alter a negative review in exchange for commission</li>
          <li>Recommend a product solely because it pays a higher commission</li>
        </ul>
        <p>
          If we recommend a hotel, flight search tool, or activity provider, it is because we
          genuinely believe it offers good value — not because of the commission rate.
        </p>

        <h2>How are affiliate links labelled?</h2>
        <p>
          Articles containing affiliate links display a disclosure banner directly below the
          article title. Affiliate links in comparison tables and booking widgets carry the
          rel="sponsored" attribute in their HTML.
        </p>

        <h2>UK & EU compliance</h2>
        <p>
          This disclosure is made in compliance with the UK Advertising Standards Authority (ASA)
          guidelines, the Committee of Advertising Practice (CAP) Code, and the FTC guidelines
          on affiliate marketing. We are required by law to disclose material commercial
          relationships to our readers.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about our affiliate relationships? Email us at{' '}
          <a href="mailto:hello@holidaymyway.com">hello@holidaymyway.com</a>.
        </p>
      </div>
    </div>
  )
}
