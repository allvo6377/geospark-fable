'use client'

import Image from 'next/image'
import React, { useEffect, useMemo, useRef, useState } from 'react'

import { LeafletMap } from './LeafletMap'

export type ProjectItem = {
  id: string | number
  title: string
  category: string
  locationLabel: string
  lat: number
  lng: number
  description: string
  image?: { url: string; alt: string } | null
}

const CATEGORY_GRADIENTS: Record<string, string> = {
  Survey: 'linear-gradient(135deg,#2E6417,#4a8f2a)',
  GIS: 'linear-gradient(135deg,#0025CC,#3a5fe0)',
  Construction: 'linear-gradient(135deg,#3a4a2a,#2E6417)',
  Planning: 'linear-gradient(135deg,#1a3a8a,#0025CC)',
  Interior: 'linear-gradient(135deg,#5a6b3a,#2E6417)',
  Landscape: 'linear-gradient(135deg,#2E6417,#7FBF4D)',
}

/** Projects gallery: live map, category filters and skeleton-shimmer card staggers. */
export function ProjectsExplorer({
  projects,
  mapCenter,
  mapZoom,
}: {
  projects: ProjectItem[]
  mapCenter: { lat: number; lng: number }
  mapZoom: number
}) {
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(projects.map((p) => p.category)))],
    [projects],
  )
  const [filter, setFilter] = useState('All')
  const gridRef = useRef<HTMLDivElement>(null)

  const shown = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)),
    [filter, projects],
  )

  // Ported from the handoff: cards rise in with a stagger, then the skeleton
  // “FETCHING TILE” overlay fades to reveal the real card.
  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    const cards = Array.from(grid.querySelectorAll<HTMLElement>('.gs-card'))
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      cards.forEach((c) => c.classList.add('gs-loaded'))
      return
    }
    cards.forEach((c) => c.classList.remove('gs-loaded'))
    const timers: ReturnType<typeof setTimeout>[] = []
    const io = new IntersectionObserver(
      (entries) => {
        const batch = entries.filter((e) => e.isIntersecting)
        batch.forEach((e, k) => {
          io.unobserve(e.target)
          const el = e.target as HTMLElement
          el.animate(
            [
              { opacity: 0, transform: 'translateY(28px) scale(.985)' },
              { opacity: 1, transform: 'none' },
            ],
            { duration: 480, delay: k * 70, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' },
          )
          timers.push(
            setTimeout(() => {
              el.classList.add('gs-loaded')
              el.animate([{ transform: 'translateY(8px)' }, { transform: 'none' }], {
                duration: 420,
                easing: 'cubic-bezier(.22,1,.36,1)',
              })
            }, 420 + k * 170),
          )
        })
      },
      { threshold: 0.12 },
    )
    cards.forEach((c) => io.observe(c))
    return () => {
      io.disconnect()
      timers.forEach(clearTimeout)
    }
  }, [filter])

  return (
    <>
      {/* MAP */}
      <section style={{ padding: '16px clamp(20px,4vw,56px) 8px', maxWidth: 1180, margin: '0 auto' }}>
        <LeafletMap
          center={mapCenter}
          zoom={mapZoom}
          height={380}
          activeCategory={filter}
          markers={projects.map((p) => ({
            lat: p.lat,
            lng: p.lng,
            title: p.title,
            subtitle: `${p.category} · ${p.locationLabel.split(' · ')[0]}`,
            category: p.category,
            kind: 'ping',
          }))}
        />
      </section>

      {/* FILTERS */}
      <section
        id="work"
        className="gs-container-wide"
        style={{ padding: '28px clamp(20px,4vw,56px) 8px' }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {categories.map((c) => (
            <button
              key={c}
              className={`filter-btn${filter === c ? ' is-active' : ''}`}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* CARDS */}
      <section
        className="gs-container-wide"
        style={{ padding: '28px clamp(20px,4vw,56px) 80px' }}
      >
        <div
          ref={gridRef}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 20 }}
        >
          {shown.map((p) => (
            <div key={`${filter}-${p.id}`} className="gs-card">
              <div
                style={{
                  height: 150,
                  flex: '0 0 auto',
                  background: p.image ? undefined : CATEGORY_GRADIENTS[p.category] || CATEGORY_GRADIENTS.Survey,
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: 16,
                }}
              >
                {p.image && (
                  <Image
                    src={p.image.url}
                    alt={p.image.alt || p.title}
                    fill
                    sizes="(max-width: 700px) 100vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                )}
                <span
                  style={{
                    position: 'relative',
                    fontFamily: 'var(--font-mono-stack)',
                    fontSize: 10.5,
                    letterSpacing: '0.14em',
                    color: '#fff',
                    background: 'rgba(0,0,0,0.28)',
                    padding: '5px 10px',
                    borderRadius: 999,
                    textTransform: 'uppercase',
                  }}
                >
                  {p.category}
                </span>
              </div>
              <div style={{ padding: 22, display: 'flex', flexDirection: 'column', flex: '1 1 auto' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-grotesk-stack)',
                    fontSize: 18,
                    fontWeight: 600,
                    margin: '0 0 6px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {p.title}
                </h3>
                <div
                  style={{
                    fontFamily: 'var(--font-mono-stack)',
                    fontSize: 11,
                    color: 'var(--muted)',
                    marginBottom: 12,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {p.locationLabel}
                </div>
                <p
                  style={{
                    fontSize: 13.5,
                    lineHeight: 1.6,
                    color: 'var(--muted)',
                    margin: 0,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {p.description}
                </p>
              </div>

              {/* skeleton overlay */}
              <div className="gs-skel" aria-hidden="true">
                <div
                  style={{
                    height: 150,
                    flex: '0 0 auto',
                    background: 'var(--line)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    fontFamily: 'var(--font-mono-stack)',
                    fontSize: 10.5,
                    letterSpacing: '0.16em',
                    color: 'var(--muted)',
                  }}
                >
                  FETCHING TILE <span style={{ animation: 'gsBlink 1.2s infinite' }}>▮</span>
                </div>
                <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 11 }}>
                  <div className="gs-skel-bar" style={{ height: 17, width: '72%' }} />
                  <div className="gs-skel-bar" style={{ height: 11, width: '46%' }} />
                  <div className="gs-skel-bar" style={{ height: 11, width: '100%', marginTop: 6 }} />
                  <div className="gs-skel-bar" style={{ height: 11, width: '92%' }} />
                  <div className="gs-skel-bar" style={{ height: 11, width: '58%' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
