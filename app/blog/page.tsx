import type { Metadata } from 'next'
import { sanityFetch } from '../../lib/sanity/client'
import { allArticlesQuery } from '../../lib/sanity/queries'
import ArticleGrid from '../../components/blog/ArticleGrid'
import type { ArticleSummary } from '../../lib/sanity/types'

export const metadata: Metadata = {
  title: 'UK Travel Blog — Holiday Guides, Budget Tips & City Breaks',
  description:
    'Browse all our UK travel guides — from cheap holiday tips and city break ideas to long-haul destination guides. Real advice from real travellers.',
  alternates: {
    canonical: 'https://www.doseofholiday.com/blog',
  },
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
          UK Travel Blog
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Holiday guides, budget tips, and city break ideas — written for UK travellers
        </p>
      </header>
      <ArticleGrid articles={articles ?? []} columns={3} />
    </div>
  )
}
