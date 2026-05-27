import { defineField, defineType } from 'sanity'

export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'siteName', title: 'Site Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'siteDescription', title: 'Site Description', type: 'text', rows: 2 }),
    defineField({ name: 'logo', title: 'Logo', type: 'image' }),
    defineField({
      name: 'affiliateDisclosureText',
      title: 'Affiliate Disclosure Text',
      type: 'text',
      rows: 3,
      description: 'Displayed on every article that contains affiliate links. Manage once here.',
      initialValue: 'This article contains affiliate links. If you make a booking through these links, Holiday My Way earns a small commission at no extra cost to you.',
    }),
    defineField({ name: 'cookiePolicyUrl', title: 'Cookie Policy URL', type: 'url' }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [{ type: 'object', fields: [{ name: 'platform', type: 'string', title: 'Platform' }, { name: 'url', type: 'url', title: 'URL' }] }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Site Settings' }) },
})
