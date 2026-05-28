import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — Dose of Holiday',
  description: 'Terms and conditions for using doseofholiday.com.',
}

export default function TermsOfServicePage() {
  return (
    <div className="mx-auto max-w-[700px] px-4 sm:px-6 py-14">
      <h1 className="font-poppins text-4xl font-bold text-holiday-navy mb-2">
        Terms of Service
      </h1>
      <p className="text-sm text-gray-400 mb-10">Last updated: May 2026</p>

      <div className="prose prose-lg max-w-none prose-headings:font-poppins prose-headings:text-holiday-navy prose-a:text-holiday-teal">
        <p>
          Please read these Terms of Service (&quot;Terms&quot;) carefully before using{' '}
          <strong>doseofholiday.com</strong> (&quot;the Site&quot;). By accessing or using the Site, you
          agree to be bound by these Terms.
        </p>

        <h2>1. About the Site</h2>
        <p>
          Dose of Holiday is an independent travel content website providing guides, destination
          information, and links to third-party travel booking services. We are not a travel agent,
          tour operator, or booking platform. We do not sell flights, hotels, or holidays directly.
        </p>

        <h2>2. Affiliate relationships</h2>
        <p>
          This Site contains affiliate links. When you click these links and make a booking or
          purchase, we may receive a commission. This does not affect the price you pay.
          Full details are in our{' '}
          <a href="/affiliate-disclosure">Affiliate Disclosure</a>.
        </p>

        <h2>3. Accuracy of information</h2>
        <p>
          We make every effort to ensure the information on this Site is accurate and up to date.
          However, travel information — including prices, visa requirements, transport links, and
          entry requirements — changes frequently. You should always verify critical information
          with official sources (FCDO, airline, hotel, or embassy) before travelling.
        </p>
        <p>
          We accept no liability for any loss, inconvenience, or expense arising from reliance on
          information published on this Site.
        </p>

        <h2>4. Third-party links and services</h2>
        <p>
          This Site links to third-party websites and booking platforms. We are not responsible for
          the content, privacy practices, or terms of those third parties. Bookings made through
          affiliate links are subject to the terms of the relevant booking platform.
        </p>

        <h2>5. Intellectual property</h2>
        <p>
          All original written content, photography (where credited to Dose of Holiday), and design
          on this Site is owned by Dose of Holiday and protected by UK copyright law. You may not
          reproduce, redistribute, or republish our content without prior written permission.
        </p>
        <p>
          Short quotations (up to 50 words) with clear attribution and a link back to the original
          article are permitted.
        </p>

        <h2>6. User conduct</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the Site for any unlawful purpose</li>
          <li>Attempt to gain unauthorised access to any part of the Site or its infrastructure</li>
          <li>Scrape, copy, or republish our content in bulk without permission</li>
          <li>Submit false or misleading information through any form on the Site</li>
        </ul>

        <h2>7. Disclaimer of warranties</h2>
        <p>
          The Site is provided on an &quot;as is&quot; and &quot;as available&quot; basis. We make no
          warranties, express or implied, regarding the Site&apos;s availability, accuracy, or
          fitness for a particular purpose. We reserve the right to modify, suspend, or discontinue
          the Site at any time without notice.
        </p>

        <h2>8. Limitation of liability</h2>
        <p>
          To the fullest extent permitted by UK law, Dose of Holiday shall not be liable for any
          indirect, incidental, or consequential damages arising from your use of the Site or
          reliance on its content.
        </p>

        <h2>9. Governing law</h2>
        <p>
          These Terms are governed by the laws of England and Wales. Any disputes shall be subject
          to the exclusive jurisdiction of the courts of England and Wales.
        </p>

        <h2>10. Changes to these Terms</h2>
        <p>
          We may update these Terms at any time. Continued use of the Site after changes
          constitutes acceptance of the updated Terms.
        </p>

        <h2>11. Contact</h2>
        <p>
          For any questions about these Terms:{' '}
          <a href="mailto:hello@doseofholiday.com">hello@doseofholiday.com</a>
        </p>
      </div>
    </div>
  )
}
