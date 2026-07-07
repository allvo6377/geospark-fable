import type { GlobalConfig } from 'payload'

import { heroFields } from '../fields/hero'

export const BlogPage: GlobalConfig = {
  slug: 'blog-page',
  label: 'Page: Blog',
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: heroFields({
            kicker: 'Field Notes',
            title: 'Dispatches from',
            titleGradient: 'the field.',
            intro:
              'Surveying, land, construction and planning in Kenya — explained by the people who set the beacons.',
            coords: ['LOG · UPDATED WEEKLY', 'WGS84 · EPSG:4326', 'FIELD NOTES · OPEN', '-1.2921° · 36.8219° NAIROBI'],
          }),
        },
        {
          label: 'Labels',
          fields: [
            { name: 'featuredLabel', type: 'text', defaultValue: 'Featured dispatch' },
            { name: 'allCategoriesLabel', type: 'text', defaultValue: 'All entries' },
            { name: 'readLabel', type: 'text', defaultValue: 'Read dispatch' },
            { name: 'minReadLabel', type: 'text', defaultValue: 'min read' },
            {
              name: 'emptyText',
              type: 'text',
              defaultValue: 'No dispatches in this category yet — check back soon.',
            },
            { name: 'backToLogLabel', type: 'text', defaultValue: 'Back to field notes' },
            { name: 'relatedLabel', type: 'text', defaultValue: 'Adjacent parcels' },
          ],
        },
        {
          label: 'SEO',
          fields: [
            { name: 'metaTitle', type: 'text', defaultValue: 'Field Notes | GeoSpark Onestop Solution' },
            {
              name: 'metaDescription',
              type: 'textarea',
              defaultValue:
                'Surveying, land, construction and planning in Kenya — explained by the people who set the beacons.',
            },
          ],
        },
      ],
    },
  ],
}
