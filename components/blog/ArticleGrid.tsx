import ArticleCard from './ArticleCard'
import type { ArticleSummary } from '../../lib/sanity/types'

interface ArticleGridProps {
  articles: ArticleSummary[]
  columns?: 2 | 3
}

export default function ArticleGrid({ articles, columns = 3 }: ArticleGridProps) {
  const gridClass = columns === 2
    ? 'grid-cols-1 sm:grid-cols-2'
    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'

  if (articles.length === 0) {
    return <p className="text-center text-gray-500 py-12">No articles found.</p>
  }

  return (
    <div className={`grid gap-6 ${gridClass}`}>
      {articles.map((article) => (
        <ArticleCard key={article._id} article={article} />
      ))}
    </div>
  )
}
