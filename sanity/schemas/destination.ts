import { defineField, defineType } from 'sanity'

export const destinationSchema = defineType({
  name: 'destination',
  title: 'Destination',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: (r) => r.required() }),
    defineField({ name: 'country', title: 'Country', type: 'string' }),
    defineField({
      name: 'region',
      title: 'Region',
      type: 'string',
      options: { list: ['uk-staycations', 'europe-short-haul', 'long-haul', 'budget-destinations'] },
    }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 2, validation: (r) => r.max(160) }),
    defineField({ name: 'description', title: 'Description', type: 'array', of: [{ type: 'block' }] }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt text', validation: (r: any) => r.required() }],
    }),
    defineField({ name: 'flightTimeFromLondon', title: 'Flight Time from London', type: 'string' }),
    defineField({ name: 'bestSeason', title: 'Best Season', type: 'string' }),
    defineField({ name: 'averageBudget', title: 'Average Budget (per person/week)', type: 'string' }),
    defineField({ name: 'iataCode', title: 'Airport IATA Code (e.g. BCN)', type: 'string' }),
    defineField({ name: 'bookingCity', title: 'Booking.com City Name', type: 'string' }),
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
    defineField({ name: 'seoTitle', title: 'SEO Title', type: 'string', validation: (r) => r.max(60) }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 2, validation: (r) => r.max(160) }),
  ],
})
