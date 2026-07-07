import type { GlobalConfig } from 'payload'

import { heroFields } from '../fields/hero'

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  label: 'Page: Contact',
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: heroFields({
            kicker: 'Contact',
            title: 'Tell us about',
            titleGradient: 'your site.',
            intro:
              'We respond within one working day, by email, phone or WhatsApp, whichever you prefer.',
            coords: ['-1.2921° · 36.8219° NAIROBI', 'REPLY < 24 HRS', 'RTK FIX · ONLINE', 'WGS84 · EPSG:4326'],
          }),
        },
        {
          label: 'Form',
          fields: [
            {
              name: 'form',
              type: 'group',
              fields: [
                {
                  name: 'serviceOptions',
                  type: 'array',
                  admin: { description: 'Options in the “What do you need?” dropdown.' },
                  fields: [{ name: 'label', type: 'text', required: true }],
                },
                { name: 'servicePlaceholder', type: 'text', defaultValue: 'What do you need?' },
                {
                  name: 'messagePlaceholder',
                  type: 'text',
                  defaultValue: 'Describe your project or parcel (location, size, timeline)…',
                },
                { name: 'submitLabel', type: 'text', defaultValue: 'Send message' },
                { name: 'directLabel', type: 'text', defaultValue: 'Or write directly:' },
                { name: 'successTitle', type: 'text', defaultValue: 'Message sent' },
                {
                  name: 'successText',
                  type: 'textarea',
                  defaultValue:
                    'Thank you — your enquiry is with our team. We’ll reply within one working day.',
                },
                { name: 'successButton', type: 'text', defaultValue: 'Send another' },
              ],
            },
          ],
        },
        {
          label: 'Map & office',
          fields: [
            {
              name: 'office',
              type: 'group',
              fields: [
                { name: 'lat', type: 'number', defaultValue: -1.2921 },
                { name: 'lng', type: 'number', defaultValue: 36.8219 },
                { name: 'zoom', type: 'number', defaultValue: 6 },
                { name: 'popupTitle', type: 'text', defaultValue: 'GeoSpark Onestop Solution' },
                { name: 'popupSubtitle', type: 'text', defaultValue: 'Nairobi, Kenya' },
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
