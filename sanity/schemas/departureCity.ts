import { defineField, defineType } from 'sanity'

export const departureCitySchema = defineType({
  name: 'departureCity',
  title: 'Departure City',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'City Name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'iataCode',
      title: 'Primary Airport IATA Code',
      type: 'string',
      description: 'e.g. MAN, BHX, EDI, GLA',
    }),
    defineField({
      name: 'nearbyAirports',
      title: 'Nearby Airport IATA Codes',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Additional airports near this city (e.g. LBA for Leeds/Bradford near Manchester)',
    }),
    defineField({
      name: 'region',
      title: 'UK Region',
      type: 'string',
      options: {
        list: [
          'London & South East',
          'South West',
          'East of England',
          'East Midlands',
          'West Midlands',
          'Yorkshire',
          'North West',
          'North East',
          'Scotland',
          'Wales',
          'Northern Ireland',
        ],
      },
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short description for cards and meta — 120–160 chars',
      validation: (r) => r.max(160),
    }),
    defineField({
      name: 'description',
      title: 'Page Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt text' }],
    }),
    defineField({
      name: 'popularDestinations',
      title: 'Popular Destinations from This City',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'destination' }] }],
      description: 'Destinations to feature on the departure hub page',
    }),
    defineField({ name: 'seoTitle', title: 'SEO Title', type: 'string', validation: (r) => r.max(60) }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 2, validation: (r) => r.max(160) }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'iataCode' },
    prepare: ({ title, subtitle }: any) => ({ title, subtitle: subtitle ? `Airport: ${subtitle}` : 'No IATA set' }),
  },
})
