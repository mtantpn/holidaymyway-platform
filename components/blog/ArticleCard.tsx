import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { urlFor } from '../../lib/sanity/image'
import type { ArticleSummary } from '../../lib/sanity/types'

export default function ArticleCard({ article }: { article: ArticleSummary }) {
  const imageUrl = article.featuredImage?.asset
    ? urlFor(article.featuredImage).width(640).height(380).url()
    : null

  return (
    <Link href={`/blog/${article.slug}`} className="group block">
      <article className="flex h-full flex-col">
        <div className="relative aspect-[16/9] shrink-0 overflow-hidden rounded-2xl bg-gray-100">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={article.featuredImage?.alt ?? article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
        </div>
        <div className="flex flex-1 flex-col pt-4">
          {article.category && (
            <span className="mb-2 text-xs font-semibold uppercase tracking-widest text-holiday-teal">
              {article.category.name}
            </span>
          )}
          <h3 className="line-clamp-2 font-poppins text-lg font-bold leading-snug text-holiday-navy transition-colors group-hover:text-holiday-teal">
            {article.title}
          </h3>
          {article.excerpt && (
            <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-gray-500">
              {article.excerpt}
            </p>
          )}
          <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
            {article.publishedAt && (
              <time dateTime={article.publishedAt}>
                {format(new Date(article.publishedAt), 'd MMM yyyy')}
              </time>
            )}
            {article.readTime && (
              <>
                <span aria-hidden="true">·</span>
                <span>{article.readTime} min read</span>
              </>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}
