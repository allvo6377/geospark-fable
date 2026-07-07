import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'authorTitle',
    defaultColumns: ['authorTitle', 'context', 'order'],
    description: 'Client quotes shown on the Home page.',
  },
  access: {
    read: () => true,
  },
  defaultSort: 'order',
  fields: [
    { name: 'quote', type: 'textarea', required: true },
    {
      name: 'authorTitle',
      type: 'text',
      required: true,
      admin: { description: 'Who said it, e.g. “Property Owner”.' },
    },
    {
      name: 'context',
      type: 'text',
      admin: { description: 'Project context, e.g. “Kiambu Subdivision”.' },
    },
    { name: 'order', type: 'number', required: true, defaultValue: 1 },
  ],
}
