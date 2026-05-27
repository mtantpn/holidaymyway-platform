import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { urlFor } from '../../lib/sanity/image'
import { Badge } from '../ui/badge'
import type { ArticleSummary } from '../../lib/sanity/types'

export default function ArticleCard({ article }: { article: ArticleSummary }) {
  const imageUrl = article.featuredImage?.asset
    ? urlFor(article.featuredImage).width(600).height(400).url()
    : null

  return (
    <Link href={`/blog/${article.slug}`}>
      <article className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
        {imageUrl && (
          <div className="relative h-48 overflow-hidden shrink-0">
            <Image
              src={imageUrl}
              alt={article.featuredImage?.alt ?? article.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <div className="p-5 flex flex-col flex-1">
          {article.category && (
            <Badge className="mb-2 bg-holiday-orange/10 text-holiday-orange hover:bg-holiday-orange/20 border-0 w-fit">
              {article.category.name}
            </Badge>
          )}
          <h3 className="mb-2 line-clamp-2 font-poppins text-lg font-semibold text-holiday-navy group-hover:text-holiday-teal transition-colors">
            {article.title}
          </h3>
          <p className="mb-4 line-clamp-2 text-sm text-gray-600 flex-1">{article.excerpt}</p>
          <div className="flex items-center justify-between text-xs text-gray-400">
            {article.publishedAt && (
              <time dateTime={article.publishedAt}>
                {format(new Date(article.publishedAt), 'd MMM yyyy')}
              </time>
            )}
            {article.readTime && <span>{article.readTime} min read</span>}
          </div>
        </div>
      </article>
    </Link>
  )
}
