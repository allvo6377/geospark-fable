import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'order'],
    description: 'Portfolio entries shown on the Projects page (cards + map markers).',
  },
  access: {
    read: () => true,
  },
  defaultSort: 'order',
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Survey', value: 'Survey' },
        { label: 'GIS', value: 'GIS' },
        { label: 'Construction', value: 'Construction' },
        { label: 'Planning', value: 'Planning' },
        { label: 'Interior', value: 'Interior' },
        { label: 'Landscape', value: 'Landscape' },
      ],
    },
    {
      name: 'locationLabel',
      type: 'text',
      required: true,
      admin: { description: 'Shown on the card, e.g. “KIAMBU · -1.171, 36.836”.' },
    },
    {
      type: 'row',
      fields: [
        { name: 'lat', type: 'number', required: true, admin: { width: '50%', description: 'Latitude for the map marker.' } },
        { name: 'lng', type: 'number', required: true, admin: { width: '50%', description: 'Longitude for the map marker.' } },
      ],
    },
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional photo. If empty, a branded gradient cover is used.' },
    },
    { name: 'order', type: 'number', required: true, defaultValue: 1 },
  ],
}
