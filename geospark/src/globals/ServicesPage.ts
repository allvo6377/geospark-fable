import type { GlobalConfig } from 'payload'

import { heroFields } from '../fields/hero'

export const ServicesPage: GlobalConfig = {
  slug: 'services-page',
  label: 'Page: Services',
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: heroFields({
            kicker: 'Services',
            title: 'Integrated spatial &',
            titleGradient: 'infrastructure solutions.',
            intro:
              'Six service lines, one accountable team. Every capability below is delivered in-house, from the first coordinate to ongoing property management.',
            coords: [
              '-1.2921° · 36.8219° NAIROBI',
              '6 SERVICE LINES',
              'FIELD → FINISH',
              'UTM ZONE 37S',
            ],
          }),
        },
        {
          label: 'Process',
          fields: [
            {
              name: 'process',
              type: 'group',
              fields: [
                { name: 'kicker', type: 'text', defaultValue: 'How we work' },
                {
                  name: 'heading',
                  type: 'text',
                  defaultValue: 'A straight line from brief to handover.',
                },
                {
                  name: 'steps',
                  type: 'array',
                  fields: [
                    { name: 'step', type: 'text', required: true, admin: { description: 'e.g. “01 · BRIEF”' } },
                    { name: 'title', type: 'text', required: true },
                    { name: 'desc', type: 'textarea', required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'FAQ',
          fields: [
            {
              name: 'faq',
              type: 'group',
              fields: [
                { name: 'kicker', type: 'text', defaultValue: 'FAQ' },
                { name: 'heading', type: 'text', defaultValue: 'Common questions.' },
                {
                  name: 'items',
                  type: 'array',
                  fields: [
                    { name: 'q', type: 'text', required: true },
                    { name: 'a', type: 'textarea', required: true },
                  ],
                },
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
