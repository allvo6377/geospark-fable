import type { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Page: Home',
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
              name: 'hero',
              type: 'group',
              fields: [
                {
                  name: 'badge',
                  type: 'text',
                  defaultValue:
                    'Licensed land surveyors & built-environment specialists · Nairobi, Kenya',
                },
                { name: 'title', type: 'text', required: true, defaultValue: 'Innovation meets' },
                {
                  name: 'titleGradient',
                  type: 'text',
                  required: true,
                  defaultValue: 'Kenya’s future.',
                },
                {
                  name: 'intro',
                  type: 'textarea',
                  required: true,
                  defaultValue:
                    'GeoSpark Onestop Solution is an integrated practice spanning land survey, construction, urban planning, interior design, landscaping and real-estate management, from precision geospatial data to finished, sustainable spaces.',
                },
                { name: 'primaryCtaLabel', type: 'text', defaultValue: 'Explore our services' },
                { name: 'primaryCtaHref', type: 'text', defaultValue: '/#services' },
                { name: 'secondaryCtaLabel', type: 'text', defaultValue: 'Contact us' },
                { name: 'secondaryCtaHref', type: 'text', defaultValue: '/contact' },
                {
                  name: 'coords',
                  type: 'array',
                  maxRows: 4,
                  admin: { description: 'Decorative floating survey labels (up to 4).' },
                  fields: [{ name: 'text', type: 'text', required: true }],
                },
                {
                  name: 'stats',
                  type: 'array',
                  admin: { description: 'The stat strip under the hero buttons.' },
                  fields: [
                    {
                      name: 'value',
                      type: 'text',
                      required: true,
                      admin: { description: 'e.g. 120 or ±8' },
                    },
                    { name: 'suffix', type: 'text', admin: { description: 'e.g. + or % or mm' } },
                    { name: 'label', type: 'text', required: true },
                    {
                      name: 'animate',
                      type: 'checkbox',
                      defaultValue: true,
                      admin: { description: 'Count up from 0 when scrolled into view (numbers only).' },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Services section',
          fields: [
            {
              name: 'services',
              type: 'group',
              fields: [
                { name: 'kicker', type: 'text', defaultValue: 'What we do' },
                {
                  name: 'heading',
                  type: 'text',
                  defaultValue: 'One partner, from boundary beacon to finished build.',
                },
                {
                  name: 'sub',
                  type: 'textarea',
                  defaultValue:
                    'Six integrated service lines that keep your project on one accountable team: surveyed, planned, built and managed.',
                },
                { name: 'cardCtaLabel', type: 'text', defaultValue: 'Enquire' },
              ],
            },
          ],
        },
        {
          label: 'Mission section',
          fields: [
            {
              name: 'about',
              type: 'group',
              fields: [
                { name: 'kicker', type: 'text', defaultValue: 'Who we are' },
                {
                  name: 'heading',
                  type: 'text',
                  defaultValue: 'Building smart, green and resilient spaces.',
                },
                {
                  name: 'missionText',
                  type: 'textarea',
                  defaultValue:
                    'To shape Kenya’s future with sustainable, innovative solutions in infrastructure, spaces and communities.',
                },
                {
                  name: 'visionText',
                  type: 'textarea',
                  defaultValue:
                    'To be Kenya’s leading partner in building smart, green and resilient spaces.',
                },
                { name: 'linkLabel', type: 'text', defaultValue: 'Meet the founders' },
                {
                  name: 'values',
                  type: 'array',
                  admin: { description: 'The four value cards.' },
                  fields: [
                    { name: 'title', type: 'text', required: true },
                    { name: 'desc', type: 'text', required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Marquee',
          fields: [
            {
              name: 'marquee',
              type: 'group',
              fields: [
                { name: 'label', type: 'text', defaultValue: 'Field-to-finish technology' },
                {
                  name: 'items',
                  type: 'array',
                  fields: [{ name: 'text', type: 'text', required: true }],
                },
              ],
            },
          ],
        },
        {
          label: 'Team & testimonials',
          fields: [
            {
              name: 'team',
              type: 'group',
              fields: [
                { name: 'kicker', type: 'text', defaultValue: 'Leadership' },
                {
                  name: 'heading',
                  type: 'text',
                  defaultValue: 'Surveyors, builders and financiers. One founding team.',
                },
              ],
            },
            {
              name: 'testimonials',
              type: 'group',
              fields: [
                { name: 'kicker', type: 'text', defaultValue: 'What clients say' },
                {
                  name: 'heading',
                  type: 'text',
                  defaultValue: 'Trusted by people building on the ground.',
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
