import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { sanityFetch } from '../../../../lib/sanity/client'
import {
  authorBySlugQuery,
  allAuthorSlugsQuery,
  articlesByAuthorQuery,
} from '../../../../lib/sanity/queries'
import type { Author, ArticleSummary } from '../../../../lib/sanity/types'
import { urlFor } from '../../../../lib/sanity/image'
import ArticleCard from '../../../../components/blog/ArticleCard'
import Breadcrumbs from '../../../../components/seo/Breadcrumbs'
import StructuredData from '../../../../components/seo/StructuredData'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  try {
    const slugs = await sanityFetch<{ slug: string }[]>({
      query: allAuthorSlugsQuery,
      revalidate: 0,
    })
    return (slugs ?? []).map(({ slug }) => ({ slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const author = await sanityFetch<Author>({ query: authorBySlugQuery, params: { slug } })
    if (!author) return {}
    return {
      title: `${author.name} — Dose of Holiday`,
      description: author.bio ?? `Travel articles by ${author.name} on Dose of Holiday.`,
      alternates: { canonical: `https://www.doseofholiday.com/blog/author/${slug}` },
    }
  } catch {
    return {}
  }
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params

  let author: Author | null = null
  let articles: ArticleSummary[] = []

  try {
    author = await sanityFetch<Author>({ query: authorBySlugQuery, params: { slug } })
  } catch {
    /* no-op */
  }

  if (!author) notFound()

  try {
    articles = await sanityFetch<ArticleSummary[]>({
      query: articlesByAuthorQuery,
      params: { slug },
    })
  } catch {
    articles = []
  }

  const photoUrl = author.photo?.asset
    ? urlFor(author.photo).width(200).height(200).url()
    : null

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    url: `https://www.doseofholiday.com/blog/author/${slug}`,
    ...(photoUrl ? { image: photoUrl } : {}),
    ...(author.bio ? { description: author.bio } : {}),
    worksFor: {
      '@type': 'Organization',
      name: 'Dose of Holiday',
      url: 'https://www.doseofholiday.com',
    },
    ...(author.socialLinks?.length
      ? { sameAs: author.socialLinks.map((l) => l.url) }
      : {}),
  }

  const socialIcons: Record<string, string> = {
    twitter: 'X (Twitter)',
    instagram: 'Instagram',
    tiktok: 'TikTok',
    facebook: 'Facebook',
    website: 'Website',
  }

  return (
    <>
      <StructuredData data={personSchema} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Blog', href: '/blog' },
            { name: author.name },
          ]}
        />

        {/* Author header */}
        <div className="flex flex-col sm:flex-row gap-6 items-start mb-12 pb-12 border-b border-gray-100">
          {photoUrl && (
            <Image
              src={photoUrl}
              alt={author.name}
              width={100}
              height={100}
              className="rounded-full object-cover shrink-0 ring-4 ring-holiday-cream"
            />
          )}
          <div className="flex-1">
            <h1 className="font-poppins text-3xl font-bold text-holiday-navy mb-2">
              {author.name}
            </h1>
            {author.bio && (
              <p className="text-gray-600 leading-relaxed max-w-2xl">{author.bio}</p>
            )}
            {author.socialLinks && author.socialLinks.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-3">
                {author.socialLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-holiday-teal hover:underline"
                  >
                    {socialIcons[link.platform.toLowerCase()] ?? link.platform}
                  </a>
                ))}
              </div>
            )}
          </div>
          <div className="shrink-0 rounded-xl bg-holiday-cream px-6 py-4 text-center">
            <p className="font-poppins text-3xl font-bold text-holiday-navy">{articles.length}</p>
            <p className="text-sm text-gray-500">
              {articles.length === 1 ? 'article' : 'articles'}
            </p>
          </div>
        </div>

        {/* Article grid */}
        {articles.length > 0 ? (
          <>
            <h2 className="font-poppins text-xl font-bold text-holiday-navy mb-6">
              Articles by {author.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article._id} article={article} />
              ))}
            </div>
          </>
        ) : (
          <p className="text-gray-400 text-center py-20">No published articles yet.</p>
        )}
      </div>
    </>
  )
}
