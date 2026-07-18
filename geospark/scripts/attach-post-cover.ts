/* One-off: attach bundled cover images to blog posts that have none.
 *
 * Runs against whatever DATABASE_URL / MEDIA_DIR point at (on Railway that is
 * the SQLite file + uploads dir on the persistent volume). Driven by env vars
 * so it is safe to leave in the codebase — it only does anything when
 * ATTACH_COVER is set:
 *
 *   ATTACH_COVER        (required) — set to any value to enable this step
 *   ATTACH_COVER_SLUG   (optional) — limit to a single post slug
 *   ATTACH_COVER_FORCE  (optional) — set to replace existing covers
 *
 * For each post in the manifest below that has no cover, the matching bundled
 * image is uploaded to the media library and set as the post cover (published).
 * Idempotent: posts that already have a cover are skipped (unless FORCE), and
 * an existing media row with the same alt text is reused instead of uploading
 * a duplicate.
 *
 * Invoke: npx tsx scripts/attach-post-cover.ts
 * It is wired into railway-bootstrap.mjs so it runs on boot when ATTACH_COVER
 * is set. Remove the variable afterwards.
 */

import config from '@payload-config'
import path from 'path'
import { getPayload } from 'payload'
import { fileURLToPath } from 'url'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const asset = (name: string) => path.resolve(dirname, '../src/seed/assets', name)

type CoverSpec = { slug: string; image: string; alt: string }

const COVERS: CoverSpec[] = [
  {
    slug: 'how-to-verify-a-title-deed-in-kenya-before-you-buy-land',
    image: asset('cover-title-deed.jpg'),
    alt: 'Land surveyor taking measurements with a level in the field',
  },
  {
    slug: 'drone-mapping-vs-traditional-survey-cost-accuracy-and-when-to-use-each',
    image: asset('cover-drone-mapping.jpg'),
    alt: 'Survey drone flying over patchwork farmland',
  },
  {
    slug: 'the-land-subdivision-process-in-kenya-step-by-step',
    image: asset('cover-land-subdivision.jpg'),
    alt: 'Aerial top-down view of land divided into distinct plots',
  },
  {
    slug: 'what-an-environmental-impact-assessment-is-and-when-your-project-needs-one',
    image: asset('cover-environmental-impact.jpg'),
    alt: 'Aerial view of a river meandering through green wetland',
  },
  {
    slug: 'five-questions-to-ask-before-breaking-ground-on-a-rural-build',
    image: asset('cover-rural-build.jpg'),
    alt: 'Rural stone house under construction against a blue sky',
  },
]

async function attachCovers() {
  if (!process.env.ATTACH_COVER) {
    console.error('[attach-cover] ATTACH_COVER is not set — nothing to do.')
    process.exit(1)
  }

  const onlySlug = process.env.ATTACH_COVER_SLUG
  const force = Boolean(process.env.ATTACH_COVER_FORCE)
  const targets = onlySlug ? COVERS.filter((c) => c.slug === onlySlug) : COVERS

  if (targets.length === 0) {
    console.error(`[attach-cover] No cover defined for slug "${onlySlug}".`)
    process.exit(1)
  }

  const payload = await getPayload({ config })
  let attached = 0
  let skipped = 0

  for (const cover of targets) {
    const found = await payload.find({
      collection: 'posts',
      where: { slug: { equals: cover.slug } },
      limit: 1,
      overrideAccess: true,
    })

    if (found.totalDocs === 0) {
      console.warn(`[attach-cover] No post found with slug "${cover.slug}" — skipping.`)
      continue
    }

    const post = found.docs[0]
    if (post.coverImage && !force) {
      console.log(`[attach-cover] "${cover.slug}" already has a cover — skipping.`)
      skipped++
      continue
    }

    // Reuse an existing media row with the same alt text to avoid duplicates.
    const existingMedia = await payload.find({
      collection: 'media',
      where: { alt: { equals: cover.alt } },
      limit: 1,
      overrideAccess: true,
    })

    let mediaId = existingMedia.docs[0]?.id
    if (!mediaId) {
      const media = await payload.create({
        collection: 'media',
        data: { alt: cover.alt },
        filePath: cover.image,
        overrideAccess: true,
      })
      mediaId = media.id
    }

    await payload.update({
      collection: 'posts',
      id: post.id,
      data: { coverImage: mediaId, _status: 'published' },
      overrideAccess: true,
    })
    console.log(`[attach-cover] Cover set on "${cover.slug}" and published.`)
    attached++
  }

  console.log(`[attach-cover] Done — ${attached} attached, ${skipped} already had covers.`)
  process.exit(0)
}

attachCovers().catch((err) => {
  console.error('[attach-cover] Failed:', err)
  process.exit(1)
})
