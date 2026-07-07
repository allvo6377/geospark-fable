import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { CtaBanner } from '@/components/CtaBanner'
import { HeroContours, HeroCoords } from '@/components/HeroContours'
import { ArrowRight, ServiceIcon } from '@/components/Icons'
import { Marquee } from '@/components/Marquee'
import { Counter } from '@/components/fx/Counter'
import { Magnetic } from '@/components/fx/Magnetic'
import { Reveal } from '@/components/fx/Reveal'
import {
  getGlobal,
  getServices,
  getSettings,
  getTeam,
  getTestimonials,
  mediaUrl,
} from '@/lib/content'

export const revalidate = 120

export async function generateMetadata(): Promise<Metadata> {
  const page = await getGlobal('home-page')
  return {
    ...(page.metaTitle ? { title: { absolute: page.metaTitle } } : {}),
    ...(page.metaDescription ? { description: page.metaDescription } : {}),
  }
}

export default async function HomePage() {
  const [page, services, team, testimonials, settings] = await Promise.all([
    getGlobal('home-page'),
    getServices(),
    getTeam(),
    getTestimonials(),
    getSettings(),
  ])
  const hero = page.hero
  const marqueeItems = (page.marquee?.items ?? []).map((i) => i.text)

  return (
    <>
      {/* ============ HERO ============ */}
      <header
        id="top"
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '140px clamp(20px,4vw,56px) 80px',
          overflow: 'hidden',
        }}
      >
        <HeroContours variant="full" />
        <HeroCoords items={hero?.coords} />

        <div className="gs-container" style={{ position: 'relative', zIndex: 2 }}>
          {hero?.badge && (
            <Reveal>
              <div className="hero-badge">
                <span className="dot" />
                {hero.badge}
              </div>
            </Reveal>
          )}
          <Reveal delay={60}>
            <h1
              className="h-display"
              style={{ fontSize: 'clamp(46px,7.4vw,96px)', lineHeight: 1.02, margin: '0 0 26px', maxWidth: '13ch' }}
            >
              {hero?.title} <span className="grad-text">{hero?.titleGradient}</span>
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p
              className="lede"
              style={{ fontSize: 'clamp(16px,1.6vw,19px)', maxWidth: '56ch', margin: '0 0 38px' }}
            >
              {hero?.intro}
            </p>
          </Reveal>
          <Reveal delay={180}>
            <div
              style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center', marginBottom: 64 }}
            >
              {hero?.primaryCtaLabel && (
                <Magnetic>
                  <Link href={hero.primaryCtaHref || '/#services'} className="btn-primary">
                    {hero.primaryCtaLabel}
                    <ArrowRight />
                  </Link>
                </Magnetic>
              )}
              {hero?.secondaryCtaLabel && (
                <Magnetic>
                  <Link href={hero.secondaryCtaHref || '/contact'} className="btn-ghost">
                    {hero.secondaryCtaLabel}
                  </Link>
                </Magnetic>
              )}
            </div>
          </Reveal>
          {(hero?.stats ?? []).length > 0 && (
            <Reveal delay={240}>
              <div className="stat-strip">
                {(hero?.stats ?? []).map((stat, i) => {
                  const n = Number(stat.value)
                  const canCount = stat.animate && Number.isFinite(n)
                  return (
                    <div className="stat-cell" key={i}>
                      <div className="stat-value">
                        {canCount ? (
                          <Counter to={n} suffix={stat.suffix || ''} />
                        ) : (
                          <>
                            {stat.value}
                            {stat.suffix && (
                              <span style={{ fontSize: 18, color: 'var(--muted)' }}>{stat.suffix}</span>
                            )}
                          </>
                        )}
                      </div>
                      <div className="stat-label">{stat.label}</div>
                    </div>
                  )
                })}
              </div>
            </Reveal>
          )}
        </div>
      </header>

      {/* ============ SERVICES ============ */}
      <section id="services" className="gs-section gs-container-wide">
        <Reveal>
          <div className="kicker">{page.services?.kicker}</div>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="h-section" style={{ maxWidth: '20ch' }}>
            {page.services?.heading}
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="lede" style={{ maxWidth: '60ch', margin: '0 0 54px' }}>
            {page.services?.sub}
          </p>
        </Reveal>
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(310px,1fr))', gap: 20 }}
        >
          {services.map((svc, i) => (
            <Reveal key={svc.id} delay={(i % 3) * 60} as="div">
              <Link href="/contact" className="gs-svc" style={{ height: '100%' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: 44,
                  }}
                >
                  <span className="svc-icon">
                    <ServiceIcon name={svc.icon} />
                  </span>
                  <span className="svc-num">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-grotesk-stack)',
                    fontSize: 21,
                    fontWeight: 600,
                    letterSpacing: '-0.015em',
                    margin: '0 0 10px',
                  }}
                >
                  {svc.title}
                </h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.6, color: 'var(--muted)', margin: '0 0 18px' }}>
                  {svc.description}
                </p>
                <span className="svc-more">
                  {page.services?.cardCtaLabel || 'Enquire'}
                  <ArrowRight size={13} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ ABOUT / MISSION ============ */}
      <section id="about" style={{ position: 'relative', padding: '110px clamp(20px,4vw,56px)', overflow: 'hidden' }}>
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(150deg, rgba(46,100,23,0.06), rgba(46,100,23,0.07))',
            borderTop: '1px solid var(--line)',
            borderBottom: '1px solid var(--line)',
          }}
        />
        <div
          aria-hidden="true"
          style={{ position: 'absolute', inset: '-6%', opacity: 0.6, animation: 'gsDrift2 30s ease-in-out infinite' }}
        >
          <svg width="100%" height="100%" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" fill="none">
            <g stroke="var(--accent)" opacity="0.1">
              <path d="M-50,420 C200,300 420,480 640,380 C860,280 1020,420 1260,340" strokeWidth="1.2" />
              <path d="M-50,470 C200,350 420,530 640,430 C860,330 1020,470 1260,390" strokeWidth="1" />
              <path d="M-50,520 C200,400 420,580 640,480 C860,380 1020,520 1260,440" strokeWidth="0.9" />
            </g>
          </svg>
        </div>
        <div
          className="gs-container"
          style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))',
            gap: 56,
            alignItems: 'start',
          }}
        >
          <div>
            <Reveal>
              <div className="kicker">{page.about?.kicker}</div>
            </Reveal>
            <Reveal delay={60}>
              <h2 className="h-section h-section--sm" style={{ margin: '0 0 22px' }}>
                {page.about?.heading}
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.7, margin: '0 0 18px' }}>
                <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>Mission:</strong> {page.about?.missionText}
              </p>
            </Reveal>
            <Reveal delay={140}>
              <p style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.7, margin: '0 0 34px' }}>
                <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>Vision:</strong> {page.about?.visionText}
              </p>
            </Reveal>
            <Reveal delay={180}>
              <Link href="/#team" className="link-accent">
                {page.about?.linkLabel}
                <ArrowRight size={14} />
              </Link>
            </Reveal>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {(page.about?.values ?? []).map((v, i) => (
              <Reveal key={i} delay={i * 60}>
                <div
                  className="glass-card card-lift card-lift--border"
                  style={{ borderRadius: 20, padding: 24, height: '100%' }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono-stack)',
                      fontSize: 10.5,
                      color: i % 2 === 0 ? 'var(--accent)' : 'var(--emerald)',
                      letterSpacing: '0.18em',
                      marginBottom: 12,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-grotesk-stack)',
                      fontWeight: 600,
                      fontSize: 17,
                      marginBottom: 6,
                    }}
                  >
                    {v.title}
                  </div>
                  <div style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.55 }}>{v.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TECHNOLOGY MARQUEE ============ */}
      <Marquee label={page.marquee?.label} items={marqueeItems} />

      {/* ============ TEAM ============ */}
      <section id="team" className="gs-section gs-container-wide">
        <Reveal>
          <div className="kicker">{page.team?.kicker}</div>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="h-section" style={{ margin: '0 0 54px', maxWidth: '22ch' }}>
            {page.team?.heading}
          </h2>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20 }}>
          {team.map((member, i) => {
            const photo = mediaUrl(member.photo, 'card')
            return (
              <Reveal key={member.id} delay={i * 60}>
                <div className="glass-card card-lift" style={{ padding: 30, height: '100%' }}>
                  {photo && (
                    <Image
                      src={photo.url}
                      alt={photo.alt || member.name}
                      width={84}
                      height={84}
                      style={{
                        width: 84,
                        height: 84,
                        borderRadius: 22,
                        objectFit: 'cover',
                        objectPosition: 'top',
                        border: '1px solid var(--line)',
                        marginBottom: 22,
                      }}
                    />
                  )}
                  <h3
                    style={{
                      fontFamily: 'var(--font-grotesk-stack)',
                      fontSize: 20,
                      fontWeight: 600,
                      letterSpacing: '-0.015em',
                      margin: '0 0 4px',
                    }}
                  >
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

      {/* ============ TESTIMONIALS ============ */}
      <section
        className="gs-container-wide"
        style={{ padding: '40px clamp(20px,4vw,56px) 20px' }}
      >
        <Reveal>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '8px 18px',
              borderRadius: 999,
              border: '1px solid var(--line)',
              fontFamily: 'var(--font-mono-stack)',
              fontSize: 11,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: 26,
            }}
          >
            {page.testimonials?.kicker}
          </div>
        </Reveal>
        <Reveal>
          <h2
            className="h-section"
            style={{
              fontSize: 'clamp(30px,4.4vw,56px)',
              lineHeight: 1.05,
              margin: '0 0 clamp(36px,4vw,56px)',
              maxWidth: '16ch',
            }}
          >
            {page.testimonials?.heading}
          </h2>
        </Reveal>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
            gap: 'clamp(20px,2.4vw,32px)',
          }}
        >
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={i * 60} as="figure" style={{ margin: 0 }}>
              <figure className="gs-tcard" style={{ height: '100%' }}>
                <blockquote
                  style={{
                    margin: 0,
                    fontSize: 'clamp(17px,1.4vw,19px)',
                    lineHeight: 1.55,
                    color: 'var(--ink)',
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <hr style={{ border: 'none', borderTop: '1px solid var(--line)', margin: '26px 0 20px' }} />
                <figcaption style={{ fontFamily: 'var(--font-mono-stack)' }}>
                  <span
                    style={{
                      display: 'block',
                      fontSize: 11,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--ink)',
                      fontWeight: 600,
                    }}
                  >
                    {t.authorTitle}
                  </span>
                  {t.context && (
                    <span style={{ display: 'block', fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>
                      {t.context}
                    </span>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBanner settings={settings} />
    </>
  )
}
