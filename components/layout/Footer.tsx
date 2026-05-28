import Link from 'next/link'

const footerLinks = {
  Explore: [
    { label: 'All Destinations', href: '/destinations' },
    { label: 'Travel Guides', href: '/blog' },
    { label: 'City Breaks', href: '/blog/category/city-breaks' },
    { label: 'UK Staycations', href: '/blog/category/uk-staycations' },
    { label: 'Budget Travel Tips', href: '/blog/category/budget-travel-tips' },
  ],
  'Depart From': [
    { label: 'From London', href: '/from/london' },
    { label: 'From Manchester', href: '/from/manchester' },
    { label: 'From Birmingham', href: '/from/birmingham' },
    { label: 'From Edinburgh', href: '/from/edinburgh' },
    { label: 'From Bristol', href: '/from/bristol' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Write for Us', href: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'Affiliate Disclosure', href: '/affiliate-disclosure' },
    { label: 'Terms of Service', href: '/terms-of-service' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-holiday-navy text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="font-poppins font-bold text-xl">
                Dose of<span className="text-holiday-orange"> Holiday</span>
              </span>
            </Link>
            <p className="text-sm text-gray-300 leading-relaxed">
              Honest travel guides and the best cheap holiday deals — for UK
              travellers on any budget.
            </p>
          </div>

          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="font-poppins font-semibold text-xs uppercase tracking-wider text-gray-400 mb-4">
                {section}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href + link.label}>
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

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Dose of Holiday. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 text-center max-w-lg">
            This site contains affiliate links. We may earn a commission when you
            book through our links, at no extra cost to you.
          </p>
        </div>
      </div>
    </footer>
  )
}
