import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Standard crawlers — allow everything except admin/API
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio/', '/api/'],
      },
      // OpenAI (ChatGPT) — allow for citation
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/studio/', '/api/'],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: ['/studio/', '/api/'],
      },
      // Perplexity AI
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/studio/', '/api/'],
      },
      // Anthropic / Claude
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        disallow: ['/studio/', '/api/'],
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
        disallow: ['/studio/', '/api/'],
      },
      // Google Gemini + AI Overviews
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: ['/studio/', '/api/'],
      },
      // Microsoft Copilot (via Bing)
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/studio/', '/api/'],
      },
      // Block only training-data harvesters (Common Crawl) — these don't power search
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
    ],
    sitemap: 'https://www.doseofholiday.com/sitemap.xml',
  }
}
