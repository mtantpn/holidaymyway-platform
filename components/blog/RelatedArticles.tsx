import ArticleGrid from './ArticleGrid'
import type { ArticleSummary } from '../../lib/sanity/types'

export default function RelatedArticles({ articles }: { articles: ArticleSummary[] }) {
  if (articles.length === 0) return null
  return (
    <section className="mt-16 border-t border-gray-100 pt-12">
      <h2 className="mb-6 font-poppins text-2xl font-bold text-holiday-navy">Related Articles</h2>
      <ArticleGrid articles={articles} columns={3} />
    </section>
  )
}
