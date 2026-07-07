import type { CollectionConfig } from 'payload'

export const Submissions: CollectionConfig = {
  slug: 'submissions',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'service', 'email', 'phone', 'createdAt'],
    description: 'Enquiries sent through the contact form. Read-only.',
  },
  access: {
    // Created only via the server action; only logged-in users can read.
    create: () => false,
    read: ({ req }) => Boolean(req.user),
    update: () => false,
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'phone', type: 'text' },
    { name: 'email', type: 'email', required: true },
    { name: 'service', type: 'text' },
    { name: 'message', type: 'textarea', required: true },
  ],
  timestamps: true,
}
