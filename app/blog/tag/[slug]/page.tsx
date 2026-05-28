import type { Metadata } from 'next'
import { sanityFetch } from '../../../../lib/sanity/client'
import { articlesByTag, allTagSlugsQuery } from '../../../../lib/sanity/queries'
import ArticleGrid from '../../../../components/blog/ArticleGrid'
import type { ArticleSummary } from '../../../../lib/sanity/types'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  try {
    const slugs = await sanityFetch<{ slug: string }[]>({
      query: allTagSlugsQuery,
      revalidate: 0,
    })
    return (slugs ?? []).map(({ slug }) => ({ slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const label = slug.replace(/-/g, ' ')
  return {
    title: `${label.charAt(0).toUpperCase() + label.slice(1)} — Travel Guides`,
    description: `Browse all travel guides tagged "${label}" on Dose of Holiday.`,
  }
}

export default async function TagPage({ params }: Props) {
  const { slug } = await params
  const articles = await sanityFetch<ArticleSummary[]>({
    query: articlesByTag,
    params: { slug },
    revalidate: 3600,
  })

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
      <header className="mb-10">
        <h1 className="font-poppins text-4xl font-bold text-holiday-navy capitalize">
          {slug.replace(/-/g, ' ')}
        </h1>
      </header>
      <ArticleGrid articles={articles ?? []} columns={3} />
    </div>
  )
}
