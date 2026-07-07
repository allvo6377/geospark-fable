import config from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

/** Payload Local API — direct DB access, no HTTP hop. Cached per request. */
export const getPayloadClient = cache(() => getPayload({ config }))

export const getSettings = cache(async () => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'site-settings' })
})

export const getGlobal = cache(
  async (
    slug:
      | 'home-page'
      | 'services-page'
      | 'about-page'
      | 'projects-page'
      | 'contact-page'
      | 'blog-page',
  ) => {
    const payload = await getPayloadClient()
    return payload.findGlobal({ slug })
  },
)

export const getServices = cache(async () => {
  const payload = await getPayloadClient()
  const res = await payload.find({ collection: 'services', sort: 'order', limit: 100 })
  return res.docs
})

export const getTeam = cache(async () => {
  const payload = await getPayloadClient()
  const res = await payload.find({ collection: 'team-members', sort: 'order', limit: 100 })
  return res.docs
})

export const getTestimonials = cache(async () => {
  const payload = await getPayloadClient()
  const res = await payload.find({ collection: 'testimonials', sort: 'order', limit: 100 })
  return res.docs
})

export const getProjects = cache(async () => {
  const payload = await getPayloadClient()
  const res = await payload.find({ collection: 'projects', sort: 'order', limit: 200 })
  return res.docs
})

export const getCategories = cache(async () => {
  const payload = await getPayloadClient()
  const res = await payload.find({ collection: 'categories', sort: 'title', limit: 100 })
  return res.docs
})

export const getPosts = cache(async (categorySlug?: string) => {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'posts',
    sort: '-publishedDate',
    limit: 100,
    where: categorySlug
      ? { 'category.slug': { equals: categorySlug } }
      : undefined,
  })
  return res.docs
})

export const getPost = cache(async (slug: string) => {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return res.docs[0] ?? null
})

/* ---------- helpers ---------- */

type MediaLike = {
  url?: string | null
  alt?: string | null
  width?: number | null
  height?: number | null
  sizes?: Record<string, { url?: string | null; width?: number | null; height?: number | null }> | null
}

/** Resolve an upload relation to a usable image URL (preferring a resized rendition). */
export function mediaUrl(
  media: unknown,
  size?: 'thumbnail' | 'card' | 'hero',
): { url: string; alt: string; width?: number; height?: number } | null {
  if (!media || typeof media !== 'object') return null
  const m = media as MediaLike
  const sized = size && m.sizes?.[size]?.url ? m.sizes[size] : null
  const url = sized?.url || m.url
  if (!url) return null
  return {
    url,
    alt: m.alt || '',
    width: (sized?.width ?? m.width) || undefined,
    height: (sized?.height ?? m.height) || undefined,
  }
}

/** Rough reading time from Lexical rich text. */
export function readingTime(content: unknown): number {
  const words = JSON.stringify(content ?? '')
    .replace(/"[a-zA-Z]+":/g, ' ')
    .split(/\s+/).length
  return Math.max(2, Math.round(words / 220))
}

export function formatDate(iso?: string | null): string {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-KE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
