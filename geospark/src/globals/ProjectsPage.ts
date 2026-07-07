import type { GlobalConfig } from 'payload'

import { heroFields } from '../fields/hero'

export const ProjectsPage: GlobalConfig = {
  slug: 'projects-page',
  label: 'Page: Projects',
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: heroFields({
            kicker: 'Projects',
            title: 'Surveyed, planned and',
            titleGradient: 'built across Kenya.',
            intro: 'A selection of our work. Filter by service or explore live on the map.',
            coords: ['8 SITES · MAPPED', 'GRID · UTM ZONE 37S', 'RTK FIX · ±8 MM', '-0.09° · 34.77° KISUMU'],
          }),
        },
        {
          label: 'Map',
          fields: [
            {
              name: 'map',
              type: 'group',
              fields: [
                { name: 'centerLat', type: 'number', defaultValue: -0.6 },
                { name: 'centerLng', type: 'number', defaultValue: 37.2 },
                { name: 'zoom', type: 'number', defaultValue: 6 },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            { name: 'metaTitle', type: 'text' },
            { name: 'metaDescription', type: 'textarea' },
          ],
        },
      ],
    },
  ],
}
