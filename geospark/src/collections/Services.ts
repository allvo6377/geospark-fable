import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'order'],
    description: 'The six service lines. Shown on the Home page cards and the Services page.',
  },
  access: {
    read: () => true,
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 1,
      admin: { description: 'Position in the list (1 = first). Also used for the 01/02… numbering.' },
    },
    {
      name: 'icon',
      type: 'select',
      required: true,
      defaultValue: 'survey',
      options: [
        { label: 'Map pin (Survey)', value: 'survey' },
        { label: 'Building (Construction)', value: 'construction' },
        { label: 'City blocks (Planning)', value: 'planning' },
        { label: 'Interior (Sofa)', value: 'interior' },
        { label: 'Leaf (Landscaping)', value: 'landscape' },
        { label: 'Key & tools (Real estate)', value: 'realestate' },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: { description: 'Short paragraph shown on the Home page card.' },
    },
    {
      name: 'tagline',
      type: 'text',
      required: true,
      admin: { description: 'One-liner shown on the Services page card.' },
    },
    {
      name: 'items',
      type: 'array',
      admin: { description: 'Bullet list shown on the Services page card.' },
      fields: [{ name: 'text', type: 'text', required: true }],
    },
  ],
}
