import type { Metadata } from 'next'
import React from 'react'

import { CtaBanner } from '@/components/CtaBanner'
import { HeroContours, HeroCoords } from '@/components/HeroContours'
import { ProjectsExplorer } from '@/components/ProjectsExplorer'
import { Reveal } from '@/components/fx/Reveal'
import { getGlobal, getProjects, getSettings, mediaUrl } from '@/lib/content'

export const revalidate = 120

export async function generateMetadata(): Promise<Metadata> {
  const page = await getGlobal('projects-page')
  return {
    title: page.metaTitle || 'Projects',
    description: page.metaDescription || page.hero?.intro || undefined,
  }
}

export default async function ProjectsPage() {
  const [page, projects, settings] = await Promise.all([
    getGlobal('projects-page'),
    getProjects(),
    getSettings(),
  ])
  const hero = page.hero

  return (
    <>
      {/* HERO */}
      <header style={{ position: 'relative', padding: '150px clamp(20px,4vw,56px) 40px', overflow: 'hidden' }}>
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
              style={{ fontSize: 'clamp(36px,5.6vw,72px)', margin: '0 0 18px', maxWidth: '18ch' }}
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

      <ProjectsExplorer
        projects={projects.map((p) => ({
          id: p.id,
          title: p.title,
          category: p.category,
          locationLabel: p.locationLabel,
          lat: p.lat,
          lng: p.lng,
          description: p.description,
          image: mediaUrl(p.image, 'card'),
        }))}
        mapCenter={{ lat: page.map?.centerLat ?? -0.6, lng: page.map?.centerLng ?? 37.2 }}
        mapZoom={page.map?.zoom ?? 6}
      />

      <CtaBanner settings={settings} />
    </>
  )
}
