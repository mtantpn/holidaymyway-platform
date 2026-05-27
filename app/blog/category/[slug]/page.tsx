import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sanityFetch } from '../../../../lib/sanity/client'
import {
  categoryBySlugQuery,
  articlesByCategory,
  allCategorySlugsQuery,
} from '../../../../lib/sanity/queries'
import ArticleGrid from '../../../../components/blog/ArticleGrid'
import type { ArticleSummary, Category } from '../../../../lib/sanity/types'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  try {
    const slugs = await sanityFetch<{ slug: string }[]>({
      query: allCategorySlugsQuery,
      revalidate: 0,
    })
    return (slugs ?? []).map(({ slug }) => ({ slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = await sanityFetch<Category>({
    query: categoryBySlugQuery,
    params: { slug },
  })
  if (!category) return {}
  return {
    title: category.seoTitle || `${category.name} — Travel Guides`,
    description: category.seoDescription || category.description,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const [category, articles] = await Promise.all([
    sanityFetch<Category>({ query: categoryBySlugQuery, params: { slug }, revalidate: 3600 }),
    sanityFetch<ArticleSummary[]>({ query: articlesByCategory, params: { slug }, revalidate: 3600 }),
  ])
  if (!category) notFound()

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
      <header className="mb-10">
        <h1 className="font-poppins text-4xl font-bold text-holiday-navy">{category.name}</h1>
        {category.description && (
          <p className="mt-3 text-lg text-gray-600">{category.description}</p>
        )}
      </header>
      <ArticleGrid articles={articles ?? []} columns={3} />
    </div>
  )
}
