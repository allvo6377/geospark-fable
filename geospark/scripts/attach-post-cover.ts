/* One-off: attach a bundled cover image to a blog post that has none.
 *
 * Runs against whatever DATABASE_URL / MEDIA_DIR point at (on Railway that is
 * the SQLite file + uploads dir on the persistent volume). Driven by env vars
 * so it is safe to leave in the codebase — it only does anything when
 * ATTACH_COVER is set:
 *
 *   ATTACH_COVER        (required) — set to any value to enable this step
 *   ATTACH_COVER_SLUG   (optional) — post slug to update
 *                                    default: the title-deed article
 *   ATTACH_COVER_IMAGE  (optional) — path to the image file
 *                                    default: src/seed/assets/cover-title-deed.jpg
 *   ATTACH_COVER_ALT    (optional) — alt text for the uploaded media
 *   ATTACH_COVER_FORCE  (optional) — set to replace an existing cover
 *
 * Idempotent: if the post already has a cover it is left alone (unless FORCE),
 * and an existing media row with the same alt text is reused instead of
 * uploading a duplicate.
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

const DEFAULT_SLUG = 'how-to-verify-a-title-deed-in-kenya-before-you-buy-land'
const DEFAULT_IMAGE = path.resolve(dirname, '../src/seed/assets/cover-title-deed.jpg')
const DEFAULT_ALT = 'Land surveyor taking measurements with a level in the field'

async function attachCover() {
  if (!process.env.ATTACH_COVER) {
    console.error('[attach-cover] ATTACH_COVER is not set — nothing to do.')
    process.exit(1)
  }

  const slug = process.env.ATTACH_COVER_SLUG || DEFAULT_SLUG
  const imagePath = process.env.ATTACH_COVER_IMAGE || DEFAULT_IMAGE
  const alt = process.env.ATTACH_COVER_ALT || DEFAULT_ALT
  const force = Boolean(process.env.ATTACH_COVER_FORCE)

  const payload = await getPayload({ config })

  const found = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    limit: 1,
    overrideAccess: true,
  })

  if (found.totalDocs === 0) {
    console.error(`[attach-cover] No post found with slug "${slug}".`)
    process.exit(1)
  }

  const post = found.docs[0]

  if (post.coverImage && !force) {
    console.log(`[attach-cover] "${slug}" already has a cover — skipping (set ATTACH_COVER_FORCE to replace).`)
    process.exit(0)
  }

  // Reuse an existing media row with the same alt text to avoid duplicates.
  const existingMedia = await payload.find({
    collection: 'media',
    where: { alt: { equals: alt } },
    limit: 1,
    overrideAccess: true,
  })

  let mediaId = existingMedia.docs[0]?.id
  if (mediaId) {
    console.log(`[attach-cover] Reusing existing media #${mediaId} ("${alt}").`)
  } else {
    const media = await payload.create({
      collection: 'media',
      data: { alt },
      filePath: imagePath,
      overrideAccess: true,
    })
    mediaId = media.id
    console.log(`[attach-cover] Uploaded cover image as media #${mediaId}.`)
  }

  await payload.update({
    collection: 'posts',
    id: post.id,
    data: { coverImage: mediaId, _status: 'published' },
    overrideAccess: true,
  })

  console.log(`[attach-cover] Cover set on "${slug}" and published.`)
  process.exit(0)
}

attachCover().catch((err) => {
  console.error('[attach-cover] Failed:', err)
  process.exit(1)
})
