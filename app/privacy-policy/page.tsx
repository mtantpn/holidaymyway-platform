import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — HolidayMyWay',
  description: 'How HolidayMyWay collects, uses, and protects your personal data.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-[700px] px-4 sm:px-6 py-14">
      <h1 className="font-poppins text-4xl font-bold text-holiday-navy mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-400 mb-10">Last updated: May 2026</p>

      <div className="prose prose-lg max-w-none prose-headings:font-poppins prose-headings:text-holiday-navy prose-a:text-holiday-teal">
        <p>
          HolidayMyWay (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates{' '}
          <strong>holidaymyway.com</strong>. This Privacy Policy explains what personal data we
          collect, how we use it, and your rights under UK GDPR and the Data Protection Act 2018.
        </p>

        <h2>1. Who we are</h2>
        <p>
          HolidayMyWay is an independent travel website operated from the United Kingdom.
          For data protection enquiries, contact:{' '}
          <a href="mailto:privacy@holidaymyway.com">privacy@holidaymyway.com</a>.
        </p>

        <h2>2. What data we collect</h2>
        <h3>Email address</h3>
        <p>
          If you subscribe to our newsletter, we collect your email address. This is stored
          securely in <strong>Kit (ConvertKit)</strong>, our email service provider.
        </p>
        <h3>Usage and analytics data</h3>
        <p>
          With your consent, we collect anonymised usage data including pages visited, time on
          page, and general location (country/city level) via <strong>Google Analytics 4</strong>{' '}
          and behavioural data via <strong>Hotjar</strong>. IP addresses are anonymised before
          storage. This data is never sold to third parties.
        </p>
        <h3>Cookies</h3>
        <p>
          We use cookies to store your consent preferences and (with your permission) to run
          analytics. See our{' '}
          <a href="/cookies">Cookie Policy</a> for full details.
        </p>

        <h2>3. How we use your data</h2>
        <ul>
          <li><strong>Email address:</strong> to send you our newsletter and holiday deals you opted into. You can unsubscribe at any time.</li>
          <li><strong>Analytics data:</strong> to understand which content is useful and to improve the site.</li>
          <li><strong>Affiliate click data:</strong> tracked by our affiliate partners (Travelpayouts, Booking.com, etc.) for commission attribution. We receive aggregate reporting only — not your personal identity.</li>
        </ul>

        <h2>4. Legal basis for processing</h2>
        <ul>
          <li><strong>Newsletter subscription:</strong> consent (you opted in)</li>
          <li><strong>Analytics:</strong> consent (cookie banner acceptance)</li>
          <li><strong>Affiliate commission reporting:</strong> legitimate interest</li>
        </ul>

        <h2>5. Data retention</h2>
        <p>
          Email subscribers are retained until they unsubscribe. Analytics data is retained for
          14 months in Google Analytics (default). We do not hold any other personal data longer
          than 12 months.
        </p>

        <h2>6. Third-party services</h2>
        <p>We use the following third-party processors:</p>
        <ul>
          <li><strong>Sanity.io</strong> — CMS, hosted in the EU (content only, no user data)</li>
          <li><strong>Vercel</strong> — web hosting (processes server logs for up to 30 days)</li>
          <li><strong>Kit (ConvertKit)</strong> — email marketing, US-based, EU-UK data transfer covered by SCCs</li>
          <li><strong>Google Analytics 4</strong> — analytics, US-based, anonymised</li>
          <li><strong>Hotjar</strong> — heatmaps, EU-based</li>
          <li><strong>Travelpayouts</strong> — affiliate tracking (click data only)</li>
        </ul>

        <h2>7. Your rights</h2>
        <p>Under UK GDPR you have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your data (&quot;right to be forgotten&quot;)</li>
          <li>Object to or restrict processing</li>
          <li>Data portability</li>
          <li>Withdraw consent at any time (e.g. unsubscribe from emails)</li>
        </ul>
        <p>
          To exercise any of these rights, email{' '}
          <a href="mailto:privacy@holidaymyway.com">privacy@holidaymyway.com</a>. We will respond
          within 30 days.
        </p>
        <p>
          If you believe we have handled your data unlawfully, you have the right to lodge a
          complaint with the{' '}
          <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">
            Information Commissioner&apos;s Office (ICO)
          </a>.
        </p>

        <h2>8. Changes to this policy</h2>
        <p>
          We may update this Privacy Policy from time to time. The &quot;last updated&quot; date at the
          top of this page reflects the most recent revision.
        </p>
      </div>
    </div>
  )
}
