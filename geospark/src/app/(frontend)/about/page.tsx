import type { Metadata } from 'next'
import Image from 'next/image'
import React from 'react'

import { CtaBanner } from '@/components/CtaBanner'
import { HeroContours, HeroCoords } from '@/components/HeroContours'
import { Reveal } from '@/components/fx/Reveal'
import { getGlobal, getSettings, getTeam, mediaUrl } from '@/lib/content'

export const revalidate = 120

export async function generateMetadata(): Promise<Metadata> {
  const page = await getGlobal('about-page')
  return {
    title: page.metaTitle || 'About',
    description: page.metaDescription || page.hero?.intro || undefined,
  }
}

export default async function AboutPage() {
  const [page, team, settings] = await Promise.all([
    getGlobal('about-page'),
    getTeam(),
    getSettings(),
  ])
  const hero = page.hero

  return (
    <>
      {/* HERO */}
      <header
        style={{
          position: 'relative',
          minHeight: '72vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '160px clamp(20px,4vw,56px) 72px',
          overflow: 'hidden',
        }}
      >
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
              style={{ fontSize: 'clamp(40px,6.4vw,84px)', margin: '0 0 22px', maxWidth: '16ch' }}
            >
              {hero?.title} <span className="grad-text">{hero?.titleGradient}</span>
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="lede" style={{ fontSize: 'clamp(16px,1.6vw,19px)', maxWidth: '58ch' }}>
              {hero?.intro}
            </p>
          </Reveal>
        </div>
      </header>

      {/* STORY + MISSION/VISION */}
      <section
        id="story"
        className="gs-container"
        style={{
          padding: '100px clamp(20px,4vw,56px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))',
          gap: 56,
          alignItems: 'start',
        }}
      >
        <div>
          <Reveal>
            <div className="kicker">{page.story?.kicker}</div>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="h-section h-section--sm" style={{ margin: '0 0 22px' }}>
              {page.story?.heading}
            </h2>
          </Reveal>
          {(page.story?.paragraphs ?? []).map((p, i) => (
            <Reveal key={i} delay={100 + i * 40}>
              <p style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.7, margin: '0 0 16px' }}>{p.text}</p>
            </Reveal>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Reveal>
            <div className="glass-card" style={{ borderRadius: 20, padding: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--accent)' }} />
                <span style={{ fontFamily: 'var(--font-grotesk-stack)', fontWeight: 600, fontSize: 18 }}>
                  {page.mission?.title}
                </span>
              </div>
              <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.65, margin: 0 }}>
                {page.mission?.text}
              </p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="glass-card" style={{ borderRadius: 20, padding: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--emerald)' }} />
                <span style={{ fontFamily: 'var(--font-grotesk-stack)', fontWeight: 600, fontSize: 18 }}>
                  {page.vision?.title}
                </span>
              </div>
              <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.65, margin: 0 }}>{page.vision?.text}</p>
            </div>
          </Reveal>
          <Reveal delay={160}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {(page.values ?? []).map((v, i) => (
                <div key={i} className="glass-card" style={{ borderRadius: 16, padding: 18 }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-grotesk-stack)',
                      fontWeight: 600,
                      fontSize: 15,
                      marginBottom: 4,
                    }}
                  >
                    {v.title}
                  </div>
                  <div style={{ fontSize: 12.5, color: 'var(--muted)' }}>{v.desc}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* TIMELINE */}
      <section style={{ position: 'relative', padding: '100px clamp(20px,4vw,56px)', overflow: 'hidden' }}>
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(150deg, rgba(46,100,23,0.06), rgba(0,37,204,0.05))',
            borderTop: '1px solid var(--line)',
            borderBottom: '1px solid var(--line)',
          }}
        />
        <div className="gs-container" style={{ position: 'relative' }}>
          <Reveal>
            <div className="kicker">{page.timeline?.kicker}</div>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="h-section h-section--sm" style={{ margin: '0 0 50px' }}>
              {page.timeline?.heading}
            </h2>
          </Reveal>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))',
              gap: 0,
              borderLeft: '1px solid var(--line)',
            }}
          >
            {(page.timeline?.items ?? []).map((item, i) => {
              const em = item.color === 'emerald'
              return (
                <Reveal key={i} delay={i * 80}>
                  <div
                    className={`gs-proc${em ? ' gs-proc--em' : ''}`}
                    style={{ padding: '0 28px 8px', borderRight: '1px solid var(--line)', height: '100%' }}
                  >
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 2.5,
                        background: em ? 'var(--emerald)' : 'var(--accent)',
                        marginBottom: 16,
                        animation: `${em ? 'gsPulseB' : 'gsPulse'} 3s infinite ${i * 0.5}s`,
                      }}
                    />
                    <div
                      className="gs-proc-num"
                      style={{ fontFamily: 'var(--font-mono-stack)', fontSize: 12, marginBottom: 8 }}
                    >
                      {item.label}
                    </div>
                    <div
                      className="gs-proc-title"
                      style={{
                        fontFamily: 'var(--font-grotesk-stack)',
                        fontWeight: 600,
                        fontSize: 17,
                        marginBottom: 8,
                      }}
                    >
                      {item.title}
                    </div>
                    <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="gs-container-wide" style={{ padding: '100px clamp(20px,4vw,56px)' }}>
        <Reveal>
          <div className="kicker">{page.team?.kicker}</div>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="h-section h-section--sm" style={{ margin: '0 0 50px', maxWidth: '22ch' }}>
            {page.team?.heading}
          </h2>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20 }}>
          {team.map((member, i) => {
            const photo = mediaUrl(member.photo, 'card')
            return (
              <Reveal key={member.id} delay={i * 80}>
                <div className="glass-card card-lift" style={{ padding: 30, height: '100%' }}>
                  {photo && (
                    <Image
                      src={photo.url}
                      alt={photo.alt || member.name}
                      width={96}
                      height={96}
                      style={{
                        width: 96,
                        height: 96,
                        borderRadius: 24,
                        objectFit: 'cover',
                        objectPosition: 'top',
                        border: '1px solid var(--line)',
                        marginBottom: 22,
                      }}
                    />
                  )}
                  <h3 style={{ fontFamily: 'var(--font-grotesk-stack)', fontSize: 20, fontWeight: 600, margin: '0 0 4px' }}>
                    {member.name}
                  </h3>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', marginBottom: 14 }}>
                    {member.role}
                  </div>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--muted)', margin: '0 0 16px' }}>
                    {member.bio}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {(member.tags ?? []).map((t, j) => (
                      <span key={j} className="chip-mono">
                        {t.text}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* TECH STACK */}
      <section className="gs-container" style={{ padding: '20px clamp(20px,4vw,56px) 100px' }}>
        <Reveal>
          <div className="kicker kicker--emerald">{page.tech?.kicker}</div>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="h-section h-section--sm" style={{ margin: '0 0 40px' }}>
            {page.tech?.heading}
          </h2>
        </Reveal>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {(page.tech?.chips ?? []).map((chip, i) => (
            <Reveal key={i} delay={i * 30} as="span">
              <span
                className="float-chip"
                style={{
                  display: 'inline-block',
                  animation: `gsFloat ${7 + (i % 4) * 0.5}s ease-in-out infinite ${i * 0.4}s`,
                }}
              >
                {chip.text}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBanner settings={settings} />
    </>
  )
}
