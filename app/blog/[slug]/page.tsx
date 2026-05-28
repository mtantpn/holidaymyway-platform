import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { format } from 'date-fns'
import { sanityFetch } from '../../../lib/sanity/client'
import {
  articleBySlugQuery,
  allArticleSlugsQuery,
  relatedArticlesQuery,
  siteSettingsQuery,
} from '../../../lib/sanity/queries'
import ArticleBody, { extractHeadings } from '../../../components/blog/ArticleBody'
import ArticleVideo from '../../../components/blog/ArticleVideo'
import ArticleFAQ from '../../../components/blog/ArticleFAQ'
import ComparisonTable from '../../../components/blog/ComparisonTable'
import AuthorBio from '../../../components/blog/AuthorBio'
import RelatedArticles from '../../../components/blog/RelatedArticles'
import TableOfContents from '../../../components/blog/TableOfContents'
import SocialShare from '../../../components/blog/SocialShare'
import StructuredData from '../../../components/seo/StructuredData'
import Breadcrumbs from '../../../components/seo/Breadcrumbs'
import { urlFor } from '../../../lib/sanity/image'
import type { ArticleFull, ArticleSummary, SiteSettings } from '../../../lib/sanity/types'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  try {
    const slugs = await sanityFetch<{ slug: string }[]>({
      query: allArticleSlugsQuery,
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
    const article = await sanityFetch<ArticleFull>({ query: articleBySlugQuery, params: { slug } })
    if (!article) return {}
    const image = article.featuredImage?.asset
      ? urlFor(article.featuredImage).width(1200).height(630).url()
      : undefined
    return {
      title: article.seoTitle || article.title,
      description: article.seoDescription || article.excerpt,
      alternates: {
        canonical: `https://www.doseofholiday.com/blog/${slug}`,
      },
      openGraph: {
        title: article.seoTitle || article.title,
        description: article.seoDescription || article.excerpt,
        type: 'article',
        publishedTime: article.publishedAt,
        images: image ? [{ url: image, width: 1200, height: 630, alt: article.title }] : [],
      },
    }
  } catch {
    return {}
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params

  const [article, siteSettings] = await Promise.all([
    sanityFetch<ArticleFull>({ query: articleBySlugQuery, params: { slug }, revalidate: 3600 }),
    sanityFetch<SiteSettings>({ query: siteSettingsQuery, revalidate: 86400 }),
  ])
  if (!article) notFound()

  const related = await sanityFetch<ArticleSummary[]>({
    query: relatedArticlesQuery,
    params: { categoryId: article.category?._id ?? '', currentId: article._id },
    revalidate: 3600,
  })

  const heroUrl = article.featuredImage?.asset
    ? urlFor(article.featuredImage).width(1200).height(630).url()
    : null

  const hasAffiliateLinks = article.affiliateLinks && article.affiliateLinks.length > 0
  const disclosureText =
    siteSettings?.affiliateDisclosureText ??
    'This article contains affiliate links. If you book through these links, Dose of Holiday earns a small commission at no extra cost to you.'

  const headings = extractHeadings(article.content ?? [])

  const canonicalUrl = `https://www.doseofholiday.com/blog/${slug}`

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
    image: heroUrl ?? undefined,
    datePublished: article.publishedAt,
    dateModified: article._updatedAt,
    url: canonicalUrl,
    author: { '@type': 'Person', name: article.author?.name ?? 'Dose of Holiday' },
    publisher: {
      '@type': 'Organization',
      name: 'Dose of Holiday',
      logo: { '@type': 'ImageObject', url: 'https://www.doseofholiday.com/logo.png' },
    },
  }

  return (
    <>
      <StructuredData data={articleSchema} />

      <article className="mx-auto max-w-[900px] px-4 sm:px-6 py-12">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Blog', href: '/blog' },
            ...(article.category
              ? [{ name: article.category.name, href: `/blog/category/${article.category.slug}` }]
              : []),
            { name: article.title },
          ]}
        />

        {/* Affiliate disclosure */}
        {hasAffiliateLinks && (
          <div className="mb-6 rounded-lg bg-holiday-cream border border-holiday-gold/30 px-4 py-3 text-sm text-gray-600">
            <strong>Disclosure:</strong> {disclosureText}
          </div>
        )}

        <header className="mb-8">
          {article.category && (
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-holiday-teal">
              {article.category.name}
            </span>
          )}
          <h1 className="font-poppins text-3xl font-bold text-holiday-navy md:text-4xl lg:text-5xl leading-tight">
            {article.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
            {article.author && <span>By {article.author.name}</span>}
            {article.publishedAt && (
              <time dateTime={article.publishedAt}>
                {format(new Date(article.publishedAt), 'd MMMM yyyy')}
              </time>
            )}
            {article.readTime && <span>{article.readTime} min read</span>}
            {article._updatedAt && (
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-500">
                Updated {format(new Date(article._updatedAt), 'MMMM yyyy')}
              </span>
            )}
          </div>
        </header>

        {heroUrl && (
          <div className="relative mb-10 h-64 sm:h-96 overflow-hidden rounded-xl">
            <Image
              src={heroUrl}
              alt={article.featuredImage?.alt ?? article.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 900px) 100vw, 900px"
            />
          </div>
        )}

        {article.videoUrl && <ArticleVideo url={article.videoUrl} />}

        <div className="mx-auto max-w-[700px]">
          {/* Table of Contents — shown when article has 3+ headings */}
          <TableOfContents headings={headings} />

          <ArticleBody content={article.content ?? []} />

          {article.comparisonTable && (
            <ComparisonTable
              heading={article.comparisonTable.heading}
              columns={article.comparisonTable.columns}
              rows={article.comparisonTable.rows}
            />
          )}
        </div>

        {article.faqs && article.faqs.length > 0 && (
          <div className="mx-auto max-w-[700px]">
            <ArticleFAQ faqs={article.faqs} />
          </div>
        )}

        <div className="mx-auto max-w-[700px]">
          <SocialShare url={canonicalUrl} title={article.title} />
        </div>

        {article.author && (
          <AuthorBio
            name={article.author.name}
            slug={article.author.slug}
            bio={(article as any).author?.bio}
            photo={article.author.photo}
          />
        )}

        <RelatedArticles articles={related ?? []} />
      </article>
    </>
  )
}
