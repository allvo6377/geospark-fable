import type { CollectionConfig } from 'payload'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'order'],
    description: 'Founders / leadership shown on the Home and About pages.',
  },
  access: {
    read: () => true,
  },
  defaultSort: 'order',
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'role',
      type: 'text',
      required: true,
      admin: { description: 'e.g. “Co-Founder · Land Surveyor”' },
    },
    { name: 'bio', type: 'textarea', required: true },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'tags',
      type: 'array',
      admin: { description: 'Small specialty chips, e.g. TOPOGRAPHIC, GIS.' },
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    { name: 'order', type: 'number', required: true, defaultValue: 1 },
  ],
}
