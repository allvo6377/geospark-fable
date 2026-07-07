import type { MetadataRoute } from 'next'

import { getCategories, getPayloadClient } from '@/lib/content'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(/\/$/, '')

  const payload = await getPayloadClient()
  const posts = await payload.find({
    collection: 'posts',
    limit: 500,
    select: { slug: true, updatedAt: true },
    where: { _status: { equals: 'published' } },
  })
  const categories = await getCategories()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/services`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/projects`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/contact`, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/blog`, changeFrequency: 'weekly', priority: 0.8 },
  ]

  return [
    ...staticRoutes,
    ...categories.map((c) => ({
      url: `${base}/blog?category=${c.slug}`,
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    })),
    ...posts.docs.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : undefined,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
