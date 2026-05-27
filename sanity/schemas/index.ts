import { articleSchema } from './article'
import { categorySchema } from './category'
import { tagSchema } from './tag'
import { authorSchema } from './author'
import { destinationSchema } from './destination'
import { departureCitySchema } from './departureCity'
import { siteSettingsSchema } from './siteSettings'

export const schemaTypes = [
  articleSchema,
  categorySchema,
  tagSchema,
  authorSchema,
  destinationSchema,
  departureCitySchema,
  siteSettingsSchema,
]
