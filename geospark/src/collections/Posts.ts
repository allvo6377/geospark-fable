import type { CollectionConfig } from 'payload'

import { slugField } from '../fields/slug'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedDate', '_status'],
    description: 'Blog articles (“Field Notes”). Save as draft to preview before publishing.',
  },
  access: {
    read: ({ req }) => {
      // Public readers only see published posts; logged-in editors see drafts too.
      if (req.user) return true
      return { _status: { equals: 'published' } }
    },
  },
  versions: {
    drafts: true,
  },
  defaultSort: '-publishedDate',
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField('title'),
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      admin: { description: 'Short summary shown on blog cards and in search results.' },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional. If empty, a branded contour cover is generated.' },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      admin: { position: 'sidebar' },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'team-members',
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly' } },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Featured posts get the large “survey sheet” slot at the top of the blog.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'seo',
      type: 'group',
      admin: { description: 'Optional overrides for search engines.' },
      fields: [
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
      ],
    },
  ],
}
