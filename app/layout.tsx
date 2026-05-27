import type { Metadata } from 'next'
import { poppins, inter } from '../lib/fonts'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'HolidayMyWay — UK Travel Deals & Holiday Guides',
    template: '%s | HolidayMyWay',
  },
  description: 'Find the best holiday deals, travel guides, and destination inspiration for UK travellers. Budget to mid-range breaks from the UK.',
  metadataBase: new URL('https://www.holidaymyway.com'),
  openGraph: {
    siteName: 'HolidayMyWay',
    locale: 'en_GB',
    type: 'website',
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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
