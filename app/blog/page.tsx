import type { Metadata } from 'next'
import { sanityFetch } from '../../lib/sanity/client'
import { allArticlesQuery } from '../../lib/sanity/queries'
import ArticleGrid from '../../components/blog/ArticleGrid'
import type { ArticleSummary } from '../../lib/sanity/types'

export const metadata: Metadata = {
  title: 'Travel Blog — All Guides',
  description: 'Expert travel guides, budget tips, and destination inspiration for UK travellers.',
}

export default async function BlogPage() {
  const articles = await sanityFetch<ArticleSummary[]>({
    query: allArticlesQuery,
    revalidate: 3600,
  })

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
      <header className="mb-10 text-center">
        <h1 className="font-poppins text-4xl font-bold text-holiday-navy md:text-5xl">
          Travel Blog
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Guides, tips, and inspiration for UK travellers
        </p>
      </header>
      <ArticleGrid articles={articles ?? []} columns={3} />
    </div>
  )
}
