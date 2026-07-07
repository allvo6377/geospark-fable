import type { GlobalConfig } from 'payload'

import { heroFields } from '../fields/hero'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'Page: About',
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: heroFields({
            kicker: 'About GeoSpark',
            title: 'Engineering Kenya’s future through',
            titleGradient: 'spatial intelligence.',
            intro:
              'Founded by two licensed land surveyors and an investment banker, GeoSpark Onestop Solution brings precision geospatial data, sustainable construction and smart planning under one roof.',
            coords: [
              '-1.2921° · 36.8219° NAIROBI',
              'EST · TU KENYA',
              'VISION · SMART · GREEN',
              '0.0236° · 37.9062° KENYA',
            ],
          }),
        },
        {
          label: 'Story',
          fields: [
            {
              name: 'story',
              type: 'group',
              fields: [
                { name: 'kicker', type: 'text', defaultValue: 'Our story' },
                {
                  name: 'heading',
                  type: 'text',
                  defaultValue: 'From boundary beacons to whole communities.',
                },
                {
                  name: 'paragraphs',
                  type: 'array',
                  fields: [{ name: 'text', type: 'textarea', required: true }],
                },
              ],
            },
            {
              name: 'mission',
              type: 'group',
              fields: [
                { name: 'title', type: 'text', defaultValue: 'Mission' },
                {
                  name: 'text',
                  type: 'textarea',
                  defaultValue:
                    'To shape Kenya’s future with sustainable, innovative solutions in infrastructure, spaces and communities.',
                },
              ],
            },
            {
              name: 'vision',
              type: 'group',
              fields: [
                { name: 'title', type: 'text', defaultValue: 'Vision' },
                {
                  name: 'text',
                  type: 'textarea',
                  defaultValue:
                    'To be Kenya’s leading partner in building smart, green and resilient spaces.',
                },
              ],
            },
            {
              name: 'values',
              type: 'array',
              admin: { description: 'The four small value cards.' },
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'desc', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          label: 'Timeline',
          fields: [
            {
              name: 'timeline',
              type: 'group',
              fields: [
                { name: 'kicker', type: 'text', defaultValue: 'Journey' },
                { name: 'heading', type: 'text', defaultValue: 'From founding to future.' },
                {
                  name: 'items',
                  type: 'array',
                  fields: [
                    { name: 'label', type: 'text', required: true, admin: { description: 'e.g. FOUNDED' } },
                    { name: 'title', type: 'text', required: true },
                    { name: 'desc', type: 'textarea', required: true },
                    {
                      name: 'color',
                      type: 'select',
                      defaultValue: 'accent',
                      options: [
                        { label: 'Green', value: 'accent' },
                        { label: 'Blue', value: 'emerald' },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Team & technology',
          fields: [
            {
              name: 'team',
              type: 'group',
              fields: [
                { name: 'kicker', type: 'text', defaultValue: 'Leadership' },
                { name: 'heading', type: 'text', defaultValue: 'The founding team.' },
              ],
            },
            {
              name: 'tech',
              type: 'group',
              fields: [
                { name: 'kicker', type: 'text', defaultValue: 'Technology' },
                { name: 'heading', type: 'text', defaultValue: 'Field-to-finish stack.' },
                {
                  name: 'chips',
                  type: 'array',
                  fields: [{ name: 'text', type: 'text', required: true }],
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
