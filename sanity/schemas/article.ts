import { defineField, defineType } from 'sanity'

export const articleSchema = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required().max(60) }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'excerpt', title: 'Excerpt (meta description)', type: 'text', rows: 3, validation: (r) => r.required().max(160) }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', type: 'string', title: 'Alt text', validation: (r: any) => r.required() }],
        },
      ],
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt text', validation: (r: any) => r.required() }],
    }),
    defineField({ name: 'seoTitle', title: 'SEO Title (50–60 chars)', type: 'string', validation: (r) => r.max(60) }),
    defineField({ name: 'seoDescription', title: 'SEO Description (155–160 chars)', type: 'text', rows: 2, validation: (r) => r.max(160) }),
    defineField({ name: 'readTime', title: 'Read Time (minutes)', type: 'number' }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: { list: ['draft', 'published', 'scheduled'] },
      initialValue: 'draft',
    }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime' }),
    defineField({ name: 'category', title: 'Category', type: 'reference', to: [{ type: 'category' }] }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'reference', to: [{ type: 'tag' }] }] }),
    defineField({ name: 'author', title: 'Author', type: 'reference', to: [{ type: 'author' }] }),
    defineField({ name: 'destination', title: 'Destination', type: 'reference', to: [{ type: 'destination' }] }),
    defineField({
      name: 'departureCities',
      title: 'Relevant Departure Cities',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'departureCity' }] }],
      description: 'Which UK departure cities is this article relevant to? (e.g. "cheap holidays from Manchester")',
    }),
    defineField({
      name: 'affiliateLinks',
      title: 'Affiliate Links',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'program', type: 'string', title: 'Program', options: { list: ['booking', 'kayak', 'viator', 'insurance'] } },
          { name: 'label', type: 'string', title: 'Button Label' },
          { name: 'url', type: 'url', title: 'Affiliate URL' },
          { name: 'placement', type: 'string', title: 'Placement', options: { list: ['hotels', 'flights', 'activities', 'insurance'] } },
        ],
      }],
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL (YouTube or TikTok embed)',
      type: 'url',
      description: 'Optional. Paste a YouTube or TikTok video URL to embed below the featured image.',
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      description: 'Add 5–8 questions travellers search. Renders as accordion + FAQPage schema.org markup.',
      of: [{
        type: 'object',
        fields: [
          { name: 'question', type: 'string', title: 'Question', validation: (r: any) => r.required() },
          { name: 'answer', type: 'text', title: 'Answer', rows: 3, validation: (r: any) => r.required() },
        ],
        preview: { select: { title: 'question' } },
      }],
    }),
    defineField({
      name: 'comparisonTable',
      title: 'Comparison Table (optional)',
      type: 'object',
      description: 'e.g. "Best budget hotels in Barcelona". Each row gets an affiliate link.',
      fields: [
        { name: 'heading', type: 'string', title: 'Table heading' },
        { name: 'columns', type: 'array', title: 'Column headers', of: [{ type: 'string' }] },
        {
          name: 'rows',
          type: 'array',
          title: 'Rows',
          of: [{
            type: 'object',
            fields: [
              { name: 'name', type: 'string', title: 'Name / Title' },
              { name: 'values', type: 'array', title: 'Cell values (match column order)', of: [{ type: 'string' }] },
              { name: 'affiliateUrl', type: 'url', title: 'Affiliate URL for this row' },
              { name: 'highlight', type: 'boolean', title: 'Highlight row (recommended pick)', initialValue: false },
            ],
            preview: { select: { title: 'name' } },
          }],
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', status: 'status', media: 'featuredImage' },
    prepare: ({ title, status, media }: any) => ({ title, subtitle: status, media }),
  },
})
