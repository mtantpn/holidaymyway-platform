import Link from 'next/link'

const categories = [
  {
    name: 'Destination Guides',
    slug: 'destination-guides',
    description:
      "Deep-dive guides to Europe's top destinations — what to do, where to stay, what to spend.",
    accent: 'bg-holiday-teal',
  },
  {
    name: 'City Breaks',
    slug: 'city-breaks',
    description:
      "Weekend escapes to Europe's best cities, from Barcelona to Budapest and beyond.",
    accent: 'bg-holiday-orange',
  },
  {
    name: 'UK Staycations',
    slug: 'uk-staycations',
    description:
      "The best of Britain — coastal retreats, countryside getaways, and hidden gems.",
    accent: 'bg-holiday-navy',
  },
  {
    name: 'Budget Travel Tips',
    slug: 'budget-travel-tips',
    description:
      'How to travel more for less — cheap flights, budget stays, and money-saving tricks.',
    accent: 'bg-holiday-gold',
  },
]

export default function ExploreCategories() {
  return (
    <section className="bg-gray-50 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="font-poppins text-2xl font-bold text-holiday-navy sm:text-3xl">
            Holiday Guides by Category
          </h2>
          <p className="mt-2 text-sm text-gray-500">Budget travel tips, city breaks, UK staycations &amp; more</p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/blog/category/${cat.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-lg"
            >
              <div className={`mb-4 h-1 w-10 rounded-full ${cat.accent}`} />
              <h3 className="mb-2 font-poppins text-base font-semibold text-holiday-navy">
                {cat.name}
              </h3>
              <p className="text-sm leading-relaxed text-gray-500">{cat.description}</p>
              <p className="mt-4 flex items-center gap-1 text-xs font-semibold text-holiday-teal">
                Browse guides
                <span className="transition-transform group-hover:translate-x-1">&#8594;</span>
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
