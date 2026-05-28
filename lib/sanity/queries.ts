import { groq } from 'next-sanity'

const articleSummaryFields = groq`
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  readTime,
  "featuredImage": featuredImage { asset, alt },
  "category": category->{ _id, name, "slug": slug.current },
  "author": author->{ name, "slug": slug.current, "photo": photo { asset, alt } }
`

export const allArticlesQuery = groq`
  *[_type == "article" && status == "published"] | order(publishedAt desc) {
    ${articleSummaryFields}
  }
`

export const latestArticlesQuery = groq`
  *[_type == "article" && status == "published"] | order(publishedAt desc)[0...$limit] {
    ${articleSummaryFields}
  }
`

export const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug][0] {
    ${articleSummaryFields},
    content,
    seoTitle,
    seoDescription,
    _updatedAt,
    "tags": tags[]->{ name, "slug": slug.current },
    "destination": destination->{ name, "slug": slug.current, iataCode, bookingCity },
    affiliateLinks,
    videoUrl,
    faqs,
    comparisonTable
  }
`

export const articlesByCategory = groq`
  *[_type == "article" && status == "published" && category->slug.current == $slug] | order(publishedAt desc) {
    ${articleSummaryFields}
  }
`

export const articlesByTag = groq`
  *[_type == "article" && status == "published" && $slug in tags[]->slug.current] | order(publishedAt desc) {
    ${articleSummaryFields}
  }
`

export const relatedArticlesQuery = groq`
  *[_type == "article" && status == "published" && category._ref == $categoryId && _id != $currentId][0...3] {
    ${articleSummaryFields}
  }
`

export const allCategoriesQuery = groq`
  *[_type == "category"] | order(name asc) {
    _id, name, "slug": slug.current, description, seoTitle, seoDescription
  }
`

export const categoryBySlugQuery = groq`
  *[_type == "category" && slug.current == $slug][0] {
    _id, name, "slug": slug.current, description, seoTitle, seoDescription
  }
`

export const allDestinationsQuery = groq`
  *[_type == "destination"] | order(name asc) {
    _id, name, "slug": slug.current, country, region, excerpt,
    "featuredImage": featuredImage { asset, alt }
  }
`

export const destinationBySlugQuery = groq`
  *[_type == "destination" && slug.current == $slug][0] {
    _id, name, "slug": slug.current, country, region, excerpt, description,
    "featuredImage": featuredImage { asset, alt },
    flightTimeFromLondon, bestSeason, averageBudget, iataCode, bookingCity,
    faqs,
    seoTitle, seoDescription
  }
`

export const allArticleSlugsQuery = groq`
  *[_type == "article" && status == "published"] { "slug": slug.current }
`

export const allCategorySlugsQuery = groq`
  *[_type == "category"] { "slug": slug.current }
`

export const allTagSlugsQuery = groq`
  *[_type == "tag"] { "slug": slug.current }
`

export const allDestinationSlugsQuery = groq`
  *[_type == "destination"] { "slug": slug.current }
`

export const allDepartureCitiesQuery = groq`
  *[_type == "departureCity"] | order(name asc) {
    _id, name, "slug": slug.current, iataCode, region, excerpt,
    "featuredImage": featuredImage { asset, alt }
  }
`

export const departureCityBySlugQuery = groq`
  *[_type == "departureCity" && slug.current == $slug][0] {
    _id, name, "slug": slug.current, iataCode, nearbyAirports, region, excerpt, description,
    "featuredImage": featuredImage { asset, alt },
    "popularDestinations": popularDestinations[]-> {
      _id, name, "slug": slug.current, country, excerpt,
      "featuredImage": featuredImage { asset, alt },
      iataCode, bookingCity
    },
    seoTitle, seoDescription
  }
`

export const allDepartureCitySlugsQuery = groq`
  *[_type == "departureCity"] { "slug": slug.current }
`

export const articlesByDepartureCityQuery = groq`
  *[_type == "article" && status == "published" && references(*[_type == "departureCity" && slug.current == $slug]._id)] | order(publishedAt desc)[0...$limit] {
    ${articleSummaryFields}
  }
`

export const sitemapArticlesQuery = groq`
  *[_type == "article" && status == "published"] {
    "slug": slug.current, publishedAt, _updatedAt
  }
`

export const allAuthorSlugsQuery = groq`
  *[_type == "author"] { "slug": slug.current }
`

export const authorBySlugQuery = groq`
  *[_type == "author" && slug.current == $slug][0] {
    _id, name, "slug": slug.current, bio,
    "photo": photo { asset, alt },
    socialLinks
  }
`

export const articlesByAuthorQuery = groq`
  *[_type == "article" && status == "published" && author->slug.current == $slug] | order(publishedAt desc) {
    ${articleSummaryFields}
  }
`

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName, siteDescription, affiliateDisclosureText, cookiePolicyUrl,
    "logo": logo { asset },
    socialLinks
  }
`
