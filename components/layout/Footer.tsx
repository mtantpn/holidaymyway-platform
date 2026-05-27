import Link from 'next/link'

const footerLinks = {
  Explore: [
    { label: 'All Destinations', href: '/destinations' },
    { label: 'Travel Guides', href: '/blog' },
    { label: 'Best Deals', href: '/deals' },
    { label: 'From London', href: '/from/london' },
    { label: 'From Manchester', href: '/from/manchester' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Advertise', href: '/advertise' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'Affiliate Disclosure', href: '/disclosure' },
    { label: 'Terms of Service', href: '/terms' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-holiday-navy text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="font-poppins font-bold text-xl">
                Holiday<span className="text-holiday-orange">MyWay</span>
              </span>
            </Link>
            <p className="text-sm text-gray-300 leading-relaxed">
              Helping UK travellers find their perfect holiday — from beach breaks to city escapes.
            </p>
          </div>

          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="font-poppins font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">
                {section}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} HolidayMyWay. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 text-center max-w-lg">
            This site contains affiliate links. We may earn a commission when you book through our links, at no extra cost to you.
          </p>
        </div>
      </div>
    </footer>
  )
}
