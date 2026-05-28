import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { urlFor } from '../../lib/sanity/image'
import type { ArticleSummary } from '../../lib/sanity/types'

interface FeaturedArticlesProps {
  articles: ArticleSummary[]
}

export default function FeaturedArticles({ articles }: FeaturedArticlesProps) {
  if (!articles?.length) return null

  const [featured, ...rest] = articles
  const secondary = rest.slice(0, 2)

  const featuredImage = featured.featuredImage?.asset
    ? urlFor(featured.featuredImage).width(900).height(520).url()
    : null

  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-baseline justify-between">
          <div>
            <h2 className="font-poppins text-2xl font-bold text-holiday-navy sm:text-3xl">
              Latest Guides
            </h2>
            <p className="mt-1 text-sm text-gray-500">Fresh tips and guides for UK travellers</p>
          </div>
          <Link
            href="/blog"
            className="hidden items-center gap-1 text-sm font-semibold text-holiday-teal transition-colors hover:text-holiday-teal/70 sm:flex"
          >
            All guides <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-8">
          {/* Featured — large card */}
          <Link href={`/blog/${featured.slug}`} className="group lg:col-span-3">
            <article>
              <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-gray-100">
                {featuredImage ? (
                  <>
                    <Image
                      src={featuredImage}
                      alt={featured.featuredImage?.alt ?? featured.title}
                      fill
                      priority
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 1024px) 100vw, 58vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
                  </>
                ) : (
                  <div className="absolute inset-0 bg-holiday-navy" />
                )}
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  {featured.category && (
                    <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-widest text-holiday-gold">
                      {featured.category.name}
                    </span>
                  )}
                  <h3 className="font-poppins text-2xl font-bold leading-snug text-white sm:text-3xl">
                    {featured.title}
                  </h3>
                  {featured.excerpt && (
                    <p className="mt-2 line-clamp-2 text-sm text-white/75">{featured.excerpt}</p>
                  )}
                  <div className="mt-3 flex items-center gap-3 text-xs text-white/55">
                    {featured.publishedAt && (
                      <time dateTime={featured.publishedAt}>
                        {format(new Date(featured.publishedAt), 'd MMM yyyy')}
                      </time>
                    )}
                    {featured.readTime && <span>{featured.readTime} min read</span>}
                  </div>
                </div>
              </div>
            </article>
          </Link>

          {/* Secondary articles + CTA */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            {secondary.map((article) => {
              const imgUrl = article.featuredImage?.asset
                ? urlFor(article.featuredImage).width(400).height(260).url()
                : null

              return (
                <Link key={article._id} href={`/blog/${article.slug}`} className="group">
                  <article className="flex gap-4">
                    <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                      {imgUrl && (
                        <Image
                          src={imgUrl}
                          alt={article.featuredImage?.alt ?? article.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="112px"
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      {article.category && (
                        <span className="text-xs font-semibold uppercase tracking-widest text-holiday-teal">
                          {article.category.name}
                        </span>
                      )}
                      <h3 className="mt-1 line-clamp-2 font-poppins text-base font-semibold leading-snug text-holiday-navy transition-colors group-hover:text-holiday-teal">
                        {article.title}
                      </h3>
                      <p className="mt-1 text-xs text-gray-400">
                        {article.publishedAt &&
                          format(new Date(article.publishedAt), 'd MMM yyyy')}
                        {article.readTime && ` · ${article.readTime} min read`}
                      </p>
                    </div>
                  </article>
                </Link>
              )
            })}

            <Link
              href="/blog"
              className="mt-auto flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-holiday-navy transition-all hover:border-holiday-teal hover:text-holiday-teal"
            >
              Explore all guides →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
