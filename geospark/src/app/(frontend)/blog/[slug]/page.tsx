import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

import { ArrowRight } from '@/components/Icons'
import { FieldCover } from '@/components/blog/FieldCover'
import { ReadingProgress } from '@/components/blog/ReadingProgress'
import { Reveal } from '@/components/fx/Reveal'
import {
  formatDate,
  getGlobal,
  getPayloadClient,
  getPost,
  getPosts,
  getSettings,
  mediaUrl,
  readingTime,
} from '@/lib/content'

export const revalidate = 120

export async function generateStaticParams() {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'posts',
    limit: 200,
    select: { slug: true },
    where: { _status: { equals: 'published' } },
  })
  return res.docs.map((p) => ({ slug: String(p.slug) }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}
  const cover = mediaUrl(post.coverImage, 'hero')
  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    openGraph: {
      type: 'article',
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      ...(cover ? { images: [{ url: cover.url }] } : {}),
    },
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [post, page, settings] = await Promise.all([
    getPost(slug),
    getGlobal('blog-page'),
    getSettings(),
  ])
  if (!post) notFound()

  const cover = mediaUrl(post.coverImage, 'hero')
  const category = post.category && typeof post.category === 'object' ? post.category : null
  const author = post.author && typeof post.author === 'object' ? post.author : null
  const mins = readingTime(post.content)

  const related = (await getPosts(category?.slug ?? undefined))
    .filter((p) => p.id !== post.id)
    .slice(0, 3)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedDate,
    dateModified: post.updatedAt,
    ...(author ? { author: { '@type': 'Person', name: author.name } } : {}),
    publisher: {
      '@type': 'Organization',
      name: `${settings.brandName} ${settings.brandTagline}`,
    },
    ...(cover ? { image: [cover.url] } : {}),
  }

  return (
    <>
      <ReadingProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HEADER */}
      <header style={{ position: 'relative', padding: '150px clamp(20px,4vw,56px) 34px', overflow: 'hidden' }}>
        <div className="grid-bg grid-bg--top" aria-hidden="true" />
        <div className="gs-container" style={{ position: 'relative', zIndex: 2, maxWidth: 900 }}>
          <Reveal>
            <Link
              href="/blog"
              className="fn-index"
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}
            >
              ← {page.backToLogLabel || 'Back to field notes'}
            </Link>
          </Reveal>
          <Reveal delay={40}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', margin: '22px 0 20px' }}>
              {category && <span className="fn-stamp">◈ {category.title}</span>}
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1
              className="h-display"
              style={{ fontSize: 'clamp(32px,5vw,62px)', lineHeight: 1.06, margin: '0 0 20px' }}
            >
              {post.title}
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="lede" style={{ fontSize: 'clamp(16px,1.5vw,18.5px)', maxWidth: '58ch', margin: '0 0 26px' }}>
              {post.excerpt}
            </p>
          </Reveal>
          <Reveal delay={150}>
            <div className="fn-rule">
              {formatDate(post.publishedDate)} · {mins} {page.minReadLabel || 'min read'}
              {author ? ` · BY ${author.name.toUpperCase()}` : ''}
            </div>
          </Reveal>
        </div>
      </header>

      {/* COVER */}
      <section className="gs-container" style={{ padding: '0 clamp(20px,4vw,56px) 40px', maxWidth: 900 }}>
        <Reveal>
          <div
            style={{
              position: 'relative',
              height: 'clamp(240px, 42vw, 460px)',
              borderRadius: 26,
              overflow: 'hidden',
              border: '1px solid var(--ink)',
              boxShadow: '10px 10px 0 var(--accent)',
            }}
          >
            {cover ? (
              <Image
                src={cover.url}
                alt={cover.alt || post.title}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 900px"
                style={{ objectFit: 'cover' }}
              />
            ) : (
              <FieldCover index={0} label="001" />
            )}
          </div>
        </Reveal>
      </section>

      {/* BODY + RAIL */}
      <section
        className="gs-container"
        style={{
          padding: '30px clamp(20px,4vw,56px) 90px',
          maxWidth: 1080,
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr)',
          gap: 48,
        }}
      >
        <div className="fn-article-body">
          <article className="prose-gs">
            <RichText data={post.content} />
          </article>
          <aside className="fn-article-rail" style={{ minWidth: 150 }}>
            <div>
              <div className="fn-rail-label">Logged</div>
              {formatDate(post.publishedDate)}
            </div>
            <div>
              <div className="fn-rail-label">Duration</div>
              {mins} {page.minReadLabel || 'min read'}
            </div>
            {category && (
              <div>
                <div className="fn-rail-label">Class</div>
                {category.title}
              </div>
            )}
            {author && (
              <div>
                <div className="fn-rail-label">Surveyor</div>
                {author.name}
              </div>
            )}
            <div>
              <div className="fn-rail-label">Datum</div>
              WGS84 · EPSG:4326
            </div>
          </aside>
        </div>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="gs-container" style={{ padding: '0 clamp(20px,4vw,56px) 110px' }}>
          <div className="fn-rule" style={{ marginBottom: 22 }}>
            {page.relatedLabel || 'Adjacent parcels'}
          </div>
          <div className="fn-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
            {related.map((p, i) => {
              const c = mediaUrl(p.coverImage, 'card')
              return (
                <Link key={p.id} href={`/blog/${p.slug}`} className="fn-tile">
                  <div className="fn-cover" style={{ minHeight: 140 }}>
                    {c ? (
                      <Image src={c.url} alt={c.alt || p.title} fill sizes="33vw" />
                    ) : (
                      <FieldCover index={i + 2} label={String(i + 2).padStart(3, '0')} />
                    )}
                  </div>
                  <div style={{ padding: '18px 20px 22px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <span className="fn-index">{formatDate(p.publishedDate)}</span>
                    <h3
                      style={{
                        fontFamily: 'var(--font-grotesk-stack)',
                        fontSize: 17,
                        letterSpacing: '-0.015em',
                        lineHeight: 1.25,
                        fontWeight: 600,
                        margin: 0,
                      }}
                    >
                      {p.title}
                    </h3>
                    <span className="fn-index" style={{ color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      {page.readLabel || 'Read dispatch'} <ArrowRight size={11} />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      )}
    </>
  )
}
