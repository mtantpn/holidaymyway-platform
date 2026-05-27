import { defineField, defineType } from 'sanity'

export const tagSchema = defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: (r) => r.required() }),
    defineField({
      name: 'tagType',
      title: 'Tag Type',
      type: 'string',
      options: { list: ['budget', 'duration', 'season', 'activity', 'travelerType'] },
    }),
  ],
})
