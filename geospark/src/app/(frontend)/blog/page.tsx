import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { HeroContours, HeroCoords } from '@/components/HeroContours'
import { ArrowRight } from '@/components/Icons'
import { FieldCover } from '@/components/blog/FieldCover'
import { Reveal } from '@/components/fx/Reveal'
import {
  formatDate,
  getCategories,
  getGlobal,
  getPosts,
  mediaUrl,
  readingTime,
} from '@/lib/content'

export const revalidate = 120

export async function generateMetadata(): Promise<Metadata> {
  const page = await getGlobal('blog-page')
  return {
    title: page.metaTitle || 'Field Notes',
    description: page.metaDescription || page.hero?.intro || undefined,
  }
}

type PostDoc = Awaited<ReturnType<typeof getPosts>>[number]

const catTitle = (post: PostDoc): string =>
  post.category && typeof post.category === 'object' ? post.category.title : 'Field note'

const authorName = (post: PostDoc): string | null =>
  post.author && typeof post.author === 'object' ? post.author.name : null

export default async function BlogIndex({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const [page, categories, posts] = await Promise.all([
    getGlobal('blog-page'),
    getCategories(),
    getPosts(category),
  ])
  const hero = page.hero

  const featured = !category ? (posts.find((p) => p.featured) ?? posts[0]) : null
  const rest = featured ? posts.filter((p) => p.id !== featured.id) : posts
  const sheetNo = (n: number) => String(n).padStart(3, '0')

  return (
    <>
      {/* HERO */}
      <header style={{ position: 'relative', padding: '150px clamp(20px,4vw,56px) 42px', overflow: 'hidden' }}>
        <HeroContours variant="simple" maskTop />
        <HeroCoords items={hero?.coords} />
        <div className="gs-container" style={{ position: 'relative', zIndex: 2 }}>
          <Reveal>
            <div className="kicker kicker--emerald" style={{ marginBottom: 18 }}>
              {hero?.kicker}
            </div>
          </Reveal>
          <Reveal delay={60}>
            <h1
              className="h-display"
              style={{ fontSize: 'clamp(38px,6vw,80px)', margin: '0 0 18px', maxWidth: '16ch' }}
            >
              {hero?.title} <span className="grad-text">{hero?.titleGradient}</span>
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="lede" style={{ fontSize: 'clamp(16px,1.6vw,18.5px)', maxWidth: '56ch' }}>
              {hero?.intro}
            </p>
          </Reveal>
        </div>
      </header>

      {/* CATEGORY FILTERS */}
      <section className="gs-container" style={{ padding: '10px clamp(20px,4vw,56px) 34px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          <Link href="/blog" className={`fn-filter${!category ? ' is-active' : ''}`}>
            {page.allCategoriesLabel || 'All entries'}
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/blog?category=${c.slug}`}
              className={`fn-filter${category === c.slug ? ' is-active' : ''}`}
            >
              {c.title}
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED “SURVEY SHEET” */}
      {featured && (
        <section className="gs-container" style={{ padding: '0 clamp(20px,4vw,56px) 56px' }}>
          <Reveal>
            <div className="fn-rule" style={{ marginBottom: 22 }}>
              SHEET {sheetNo(1)} · {page.featuredLabel || 'Featured dispatch'}
            </div>
          </Reveal>
          <Reveal delay={80}>
            <Link href={`/blog/${featured.slug}`} className="fn-sheet">
              <div style={{ padding: 'clamp(28px,4vw,48px)', display: 'flex', flexDirection: 'column', gap: 20 }}>
                <span className="fn-stamp" style={{ alignSelf: 'flex-start' }}>
                  ◈ {catTitle(featured)}
                </span>
                <h2
                  style={{
                    fontFamily: 'var(--font-grotesk-stack)',
                    fontSize: 'clamp(26px,3.4vw,44px)',
                    letterSpacing: '-0.03em',
                    lineHeight: 1.08,
                    fontWeight: 700,
                    margin: 0,
                  }}
                >
                  {featured.title}
                </h2>
                <p style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.7, margin: 0, maxWidth: '52ch' }}>
                  {featured.excerpt}
                </p>
                <div className="fn-sheet-meta">
                  <span>{formatDate(featured.publishedDate)}</span>
                  <span>
                    {readingTime(featured.content)} {page.minReadLabel || 'min read'}
                  </span>
                  {authorName(featured) && <span>BY {authorName(featured)}</span>}
                </div>
                <span className="link-accent" style={{ marginTop: 'auto' }}>
                  {page.readLabel || 'Read dispatch'}
                  <ArrowRight size={14} />
                </span>
              </div>
              <div className="fn-cover">
                {mediaUrl(featured.coverImage, 'hero') ? (
                  <Image
                    src={mediaUrl(featured.coverImage, 'hero')!.url}
                    alt={mediaUrl(featured.coverImage, 'hero')!.alt || featured.title}
                    fill
                    sizes="(max-width: 860px) 100vw, 50vw"
                    priority
                  />
                ) : (
                  <FieldCover index={0} label={sheetNo(1)} />
                )}
                <span style={{ position: 'absolute', top: 16, left: 16 }} className="fn-cat-chip">
                  {catTitle(featured)}
                </span>
              </div>
            </Link>
          </Reveal>
        </section>
      )}

      {/* LOG GRID (bento) */}
      <section className="gs-container" style={{ padding: '0 clamp(20px,4vw,56px) 110px' }}>
        {rest.length > 0 && (
          <Reveal>
            <div className="fn-rule" style={{ marginBottom: 22 }}>
              SURVEY LOG · {rest.length} {rest.length === 1 ? 'ENTRY' : 'ENTRIES'}
            </div>
          </Reveal>
        )}
        {posts.length === 0 && (
          <p className="lede" style={{ padding: '30px 0 60px' }}>
            {page.emptyText}
          </p>
        )}
        <div className="fn-grid">
          {rest.map((post, i) => {
            const tall = i % 5 === 0
            const cover = mediaUrl(post.coverImage, 'card')
            const logNo = sheetNo(i + 2)
            return (
              <Reveal key={post.id} delay={(i % 3) * 70} style={tall ? { gridRow: 'span 2' } : undefined}>
                <Link href={`/blog/${post.slug}`} className={`fn-tile${tall ? ' fn-tile--tall' : ''}`} style={{ height: '100%' }}>
                  <div className="fn-cover">
                    {cover ? (
                      <Image
                        src={cover.url}
                        alt={cover.alt || post.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1020px) 50vw, 33vw"
                      />
                    ) : (
                      <FieldCover index={i + 1} label={logNo} />
                    )}
                    <span style={{ position: 'absolute', top: 14, left: 14 }} className="fn-cat-chip">
                      {catTitle(post)}
                    </span>
                  </div>
                  <div style={{ padding: '20px 22px 24px', display: 'flex', flexDirection: 'column', gap: 10, flex: '1 0 auto' }}>
                    <span className="fn-index">
                      LOG {logNo} · {formatDate(post.publishedDate)}
                    </span>
                    <h3
                      style={{
                        fontFamily: 'var(--font-grotesk-stack)',
                        fontSize: tall ? 'clamp(20px,2vw,26px)' : 19,
                        letterSpacing: '-0.02em',
                        lineHeight: 1.2,
                        fontWeight: 650,
                        margin: 0,
                      }}
                    >
                      {post.title}
                    </h3>
                    <p
                      style={{
                        color: 'var(--muted)',
                        fontSize: 14,
                        lineHeight: 1.6,
                        margin: 0,
                        display: '-webkit-box',
                        WebkitLineClamp: tall ? 4 : 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {post.excerpt}
                    </p>
                    <span className="fn-index" style={{ marginTop: 'auto', color: 'var(--accent)' }}>
                      {readingTime(post.content)} {page.minReadLabel || 'min read'} →
                    </span>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </section>
    </>
  )
}
