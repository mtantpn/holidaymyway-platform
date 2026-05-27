import { defineField, defineType } from 'sanity'

export const categorySchema = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: (r) => r.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
    defineField({ name: 'parentCategory', title: 'Parent Category', type: 'reference', to: [{ type: 'category' }] }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt text' }],
    }),
    defineField({ name: 'seoTitle', title: 'SEO Title', type: 'string', validation: (r) => r.max(60) }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 2, validation: (r) => r.max(160) }),
  ],
})
