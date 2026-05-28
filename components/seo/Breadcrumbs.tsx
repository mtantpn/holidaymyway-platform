import Link from 'next/link'

export interface BreadcrumbItem {
  name: string
  href?: string
}

interface Props {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: Props) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      ...(item.href ? { item: `https://www.doseofholiday.com${item.href}` } : {}),
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-400">
          {items.map((item, i) => {
            const isLast = i === items.length - 1
            return (
              <li key={i} className="flex items-center gap-1">
                {i > 0 && <span aria-hidden="true" className="text-gray-300">›</span>}
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="hover:text-holiday-teal transition-colors"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <span
                    className={isLast ? 'text-gray-600 truncate max-w-[200px] sm:max-w-none' : ''}
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {item.name}
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
