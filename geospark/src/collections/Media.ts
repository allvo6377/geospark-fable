import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    description: 'All images used on the website. Upload once, reuse anywhere.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Short description of the image (used by search engines and screen readers).',
      },
    },
  ],
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*'],
    imageSizes: [
      { name: 'thumbnail', width: 300 },
      { name: 'card', width: 768 },
      { name: 'hero', width: 1600 },
    ],
    adminThumbnail: 'thumbnail',
    focalPoint: true,
  },
}
