import type { Metadata } from 'next'
import { poppins, inter } from '../lib/fonts'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import CookieConsent from '../components/layout/CookieConsent'
import GoogleAnalytics from '../components/analytics/GoogleAnalytics'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Dose of Holiday — UK Travel Guides, Holiday Deals & Budget Tips',
    template: '%s | Dose of Holiday',
  },
  description:
    'Expert holiday guides, cheap flight tips, and the best travel deals for UK travellers. From budget city breaks to long-haul adventures — plan your perfect holiday with Dose of Holiday.',
  metadataBase: new URL('https://www.doseofholiday.com'),
  keywords: [
    'holiday deals UK',
    'cheap holidays UK',
    'UK travel guides',
    'budget holidays',
    'city breaks UK',
    'holiday tips',
    'travel deals UK',
    'UK staycations',
    'cheap flights UK',
    'holiday ideas UK',
  ],
  openGraph: {
    siteName: 'Dose of Holiday',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@doseofholiday',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-GB" className={`${poppins.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-holiday-cream">
        <GoogleAnalytics />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  )
}
