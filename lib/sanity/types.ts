export interface SanityImage {
  asset: { _ref: string }
  alt?: string
  hotspot?: boolean
}

// Slugs are projected as plain strings by GROQ ("slug": slug.current)
export interface ArticleSummary {
  _id: string
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  readTime: number
  featuredImage: SanityImage
  category: { _id: string; name: string; slug: string }
  author: { name: string; photo: SanityImage }
}

export interface ArticleFull extends ArticleSummary {
  content: any[]
  seoTitle: string
  seoDescription: string
  _updatedAt: string
  tags: { name: string; slug: string }[]
  destination?: {
    name: string
    slug: string
    iataCode?: string
    bookingCity?: string
  }
  affiliateLinks: {
    program: string
    label: string
    url: string
    placement: string
  }[]
  videoUrl?: string
  faqs?: { question: string; answer: string }[]
  comparisonTable?: {
    heading: string
    columns: string[]
    rows: {
      name: string
      values: string[]
      affiliateUrl: string
      highlight?: boolean
    }[]
  } | null
}

export interface Category {
  _id: string
  name: string
  slug: string
  description?: string
  seoTitle?: string
  seoDescription?: string
}

export interface Destination {
  _id: string
  name: string
  slug: string
  country: string
  region: string
  excerpt: string
  description: any[]
  featuredImage: SanityImage
  flightTimeFromLondon?: string
  bestSeason?: string
  averageBudget?: string
  iataCode?: string
  bookingCity?: string
  faqs?: { question: string; answer: string }[]
  seoTitle?: string
  seoDescription?: string
}

export interface DepartureCitySummary {
  _id: string
  name: string
  slug: string
  iataCode?: string
  region?: string
  excerpt?: string
  featuredImage?: SanityImage
}

export interface DepartureCity extends DepartureCitySummary {
  nearbyAirports?: string[]
  description?: any[]
  popularDestinations?: {
    _id: string
    name: string
    slug: string
    country: string
    excerpt: string
    featuredImage: SanityImage
    iataCode?: string
    bookingCity?: string
  }[]
  seoTitle?: string
  seoDescription?: string
}

export interface SiteSettings {
  siteName: string
  siteDescription: string
  affiliateDisclosureText: string
  cookiePolicyUrl?: string
  logo?: { asset: { _ref: string } }
  socialLinks?: { platform: string; url: string }[]
}
