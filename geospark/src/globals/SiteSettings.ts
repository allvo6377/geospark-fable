import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    description: 'Brand, navigation, contact details, footer and the big green CTA banner.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Brand',
          fields: [
            { name: 'brandName', type: 'text', required: true, defaultValue: 'GeoSpark' },
            { name: 'brandTagline', type: 'text', required: true, defaultValue: 'Onestop Solution' },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Optional image logo. If empty, the built-in GeoSpark mark is used.' },
            },
          ],
        },
        {
          label: 'Navigation',
          fields: [
            {
              name: 'nav',
              type: 'array',
              admin: { description: 'Links in the top navigation bar, in order.' },
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'href', type: 'text', required: true, admin: { description: 'e.g. /services or /#team' } },
              ],
            },
            { name: 'navCtaLabel', type: 'text', required: true, defaultValue: 'Request Proposal' },
            { name: 'navCtaHref', type: 'text', required: true, defaultValue: '/contact' },
          ],
        },
        {
          label: 'Contact details',
          fields: [
            { name: 'email', type: 'text', required: true, defaultValue: 'hello@geospark.co.ke' },
            {
              name: 'phone',
              type: 'text',
              required: true,
              defaultValue: '+254 704 453 850',
              admin: { description: 'Displayed phone number.' },
            },
            {
              name: 'phoneRaw',
              type: 'text',
              required: true,
              defaultValue: '+254704453850',
              admin: { description: 'Phone number for tel: and WhatsApp links (no spaces).' },
            },
            { name: 'address', type: 'text', required: true, defaultValue: 'Nairobi, Kenya' },
            {
              name: 'coordsLabel',
              type: 'text',
              defaultValue: '-1.2921° S · 36.8219° E',
              admin: { description: 'Decorative coordinates shown in the footer.' },
            },
            { name: 'responseTime', type: 'text', defaultValue: 'Within one working day' },
          ],
        },
        {
          label: 'CTA banner',
          description: 'The dark “Let’s build something extraordinary” banner shown near the bottom of most pages.',
          fields: [
            { name: 'ctaBadge', type: 'text', defaultValue: 'Booking new projects' },
            { name: 'ctaTitle', type: 'text', defaultValue: 'Let’s build something' },
            { name: 'ctaTitleGradient', type: 'text', defaultValue: 'extraordinary.' },
            {
              name: 'ctaText',
              type: 'textarea',
              defaultValue:
                'From a single boundary survey to a full development, tell us about your project and we’ll respond within one working day.',
            },
            { name: 'ctaButtonLabel', type: 'text', defaultValue: 'Start your project' },
            { name: 'ctaButtonHref', type: 'text', defaultValue: '/contact' },
          ],
        },
        {
          label: 'Footer',
          fields: [
            {
              name: 'footerBlurb',
              type: 'textarea',
              defaultValue:
                'Licensed land surveyors and built-environment specialists. Turning ground truth into buildable, bankable, titled land across Kenya.',
            },
            {
              name: 'footerColumns',
              type: 'array',
              admin: { description: 'Link columns (e.g. “Who we are”, “Our services”).' },
              fields: [
                { name: 'heading', type: 'text', required: true },
                {
                  name: 'links',
                  type: 'array',
                  fields: [
                    { name: 'label', type: 'text', required: true },
                    { name: 'href', type: 'text', required: true },
                  ],
                },
              ],
            },
            {
              name: 'legalLinks',
              type: 'array',
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'href', type: 'text', required: true },
              ],
            },
            {
              name: 'copyright',
              type: 'text',
              defaultValue: '© 2026 GeoSpark Onestop Solution. All rights reserved.',
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'siteTitle',
              type: 'text',
              required: true,
              defaultValue: 'GeoSpark Onestop Solution | Spatial intelligence for Kenya',
            },
            {
              name: 'siteDescription',
              type: 'textarea',
              required: true,
              defaultValue:
                'Licensed land surveyors and built-environment specialists in Nairobi, Kenya — land survey, construction, urban planning, interior design, landscaping and real-estate management.',
            },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Image shown when the site is shared on social media.' },
            },
          ],
        },
      ],
    },
  ],
}
