import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cookie Policy — Dose of Holiday',
  description: 'Which cookies Dose of Holiday sets, why, and how to manage your preferences.',
}

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-[700px] px-4 sm:px-6 py-14">
      <h1 className="font-poppins text-4xl font-bold text-holiday-navy mb-2">Cookie Policy</h1>
      <p className="text-sm text-gray-400 mb-10">Last updated: May 2026</p>

      <div className="prose prose-lg max-w-none prose-headings:font-poppins prose-headings:text-holiday-navy prose-a:text-holiday-teal">
        <p>
          This Cookie Policy explains what cookies are, which cookies{' '}
          <strong>doseofholiday.com</strong> uses, and how you can control them. It should be read
          alongside our{' '}
          <a href="/privacy-policy">Privacy Policy</a>.
        </p>

        <h2>What are cookies?</h2>
        <p>
          Cookies are small text files stored on your browser when you visit a website. They are
          widely used to make websites work, remember your preferences, and provide site owners
          with information about how their site is used.
        </p>

        <h2>Your consent choices</h2>
        <p>
          When you first visit this site, a banner asks for your consent for non-essential cookies.
          You can choose:
        </p>
        <ul>
          <li><strong>Accept all</strong> — essential + analytics cookies enabled.</li>
          <li><strong>Essential only</strong> — only strictly necessary cookies are set.</li>
        </ul>
        <p>
          Your preference is stored for 12 months. You can change it at any time by clearing your
          browser cookies or using the link in our footer.
        </p>

        <h2>Cookies we use</h2>

        <h3>Essential cookies (always active)</h3>
        <p>
          These are required for the site to function and cannot be disabled.
        </p>

        <div className="not-prose overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-holiday-navy text-white">
                <th className="text-left px-3 py-2 font-semibold">Cookie</th>
                <th className="text-left px-3 py-2 font-semibold">Purpose</th>
                <th className="text-left px-3 py-2 font-semibold">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="bg-white">
                <td className="px-3 py-2 font-mono text-xs">hmw_consent</td>
                <td className="px-3 py-2">Stores your cookie consent preference (essential/all)</td>
                <td className="px-3 py-2 whitespace-nowrap">1 year</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-3 py-2 font-mono text-xs">__Secure-next-auth.*</td>
                <td className="px-3 py-2">Next.js framework session management (if applicable)</td>
                <td className="px-3 py-2 whitespace-nowrap">Session</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Analytics cookies (optional — set only with your consent)</h3>
        <p>
          We use <strong>Google Analytics 4</strong> and <strong>Hotjar</strong> to understand
          how visitors use the site. This helps us improve content and navigation. IP addresses
          are anonymised before storage.
        </p>

        <div className="not-prose overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-holiday-navy text-white">
                <th className="text-left px-3 py-2 font-semibold">Cookie</th>
                <th className="text-left px-3 py-2 font-semibold">Provider</th>
                <th className="text-left px-3 py-2 font-semibold">Purpose</th>
                <th className="text-left px-3 py-2 font-semibold">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="bg-white">
                <td className="px-3 py-2 font-mono text-xs">_ga</td>
                <td className="px-3 py-2">Google Analytics</td>
                <td className="px-3 py-2">Distinguishes unique users</td>
                <td className="px-3 py-2 whitespace-nowrap">2 years</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-3 py-2 font-mono text-xs">_ga_*</td>
                <td className="px-3 py-2">Google Analytics</td>
                <td className="px-3 py-2">Stores and counts page views</td>
                <td className="px-3 py-2 whitespace-nowrap">2 years</td>
              </tr>
              <tr className="bg-white">
                <td className="px-3 py-2 font-mono text-xs">_hjSessionUser_*</td>
                <td className="px-3 py-2">Hotjar</td>
                <td className="px-3 py-2">Unique user ID across sessions</td>
                <td className="px-3 py-2 whitespace-nowrap">1 year</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-3 py-2 font-mono text-xs">_hjSession_*</td>
                <td className="px-3 py-2">Hotjar</td>
                <td className="px-3 py-2">Current session data (heatmaps)</td>
                <td className="px-3 py-2 whitespace-nowrap">30 minutes</td>
              </tr>
              <tr className="bg-white">
                <td className="px-3 py-2 font-mono text-xs">_hjFirstSeen</td>
                <td className="px-3 py-2">Hotjar</td>
                <td className="px-3 py-2">Identifies first-time visitors</td>
                <td className="px-3 py-2 whitespace-nowrap">Session</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Affiliate tracking (third-party)</h3>
        <p>
          When you click an affiliate link (e.g. to Booking.com, Skyscanner), the destination
          site may set its own cookies to track your visit for commission attribution. These are
          set by the third party — not by us — and are subject to their own cookie policies.
          We receive aggregate click and commission data only; we never receive your personal
          identity from these partners.
        </p>

        <h2>How to manage or delete cookies</h2>
        <p>
          You can control cookies through your browser settings. Links to instructions for the
          most common browsers:
        </p>
        <ul>
          <li>
            <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">
              Google Chrome
            </a>
          </li>
          <li>
            <a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer">
              Mozilla Firefox
            </a>
          </li>
          <li>
            <a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">
              Apple Safari
            </a>
          </li>
          <li>
            <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge" target="_blank" rel="noopener noreferrer">
              Microsoft Edge
            </a>
          </li>
        </ul>
        <p>
          Note: Blocking all cookies will affect site functionality. To opt out of Google
          Analytics specifically, you can install the{' '}
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
            Google Analytics Opt-out Browser Add-on
          </a>.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may update this Cookie Policy from time to time. The &quot;last updated&quot; date at
          the top of this page will reflect any changes.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about cookies?{' '}
          <a href="mailto:privacy@doseofholiday.com">privacy@doseofholiday.com</a>
        </p>
      </div>

      <div className="mt-10 p-4 rounded-xl bg-holiday-cream border border-gray-200 text-sm text-gray-600">
        <p>
          <strong>Manage your preferences:</strong> To change your consent choice, clear the{' '}
          <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">hmw_consent</code> cookie in
          your browser settings and reload the page. The consent banner will reappear.
        </p>
      </div>
    </div>
  )
}
