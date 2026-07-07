import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

import { CtaBanner } from '@/components/CtaBanner'
import { FaqAccordion } from '@/components/FaqAccordion'
import { HeroContours, HeroCoords } from '@/components/HeroContours'
import { ArrowRight } from '@/components/Icons'
import { Reveal } from '@/components/fx/Reveal'
import { getGlobal, getServices, getSettings } from '@/lib/content'

export const revalidate = 120

export async function generateMetadata(): Promise<Metadata> {
  const page = await getGlobal('services-page')
  return {
    title: page.metaTitle || 'Services',
    ...(page.metaDescription
      ? { description: page.metaDescription }
      : { description: page.hero?.intro || undefined }),
  }
}

export default async function ServicesPage() {
  const [page, services, settings] = await Promise.all([
    getGlobal('services-page'),
    getServices(),
    getSettings(),
  ])
  const hero = page.hero

  return (
    <>
      {/* HERO */}
      <header
        style={{
          position: 'relative',
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '160px clamp(20px,4vw,56px) 64px',
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
              style={{ fontSize: 'clamp(38px,6vw,80px)', margin: '0 0 22px', maxWidth: '18ch' }}
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

      {/* SERVICE LINES */}
      <section
        id="lines"
        className="gs-container-wide"
        style={{
          padding: '80px clamp(20px,4vw,56px) 40px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(330px,1fr))',
          gap: 20,
        }}
      >
        {services.map((svc, i) => (
          <Reveal key={svc.id} delay={(i % 3) * 60}>
            <div className="gs-line-card" style={{ height: '100%' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 20,
                }}
              >
                <span className="gs-dot" style={{ marginTop: 6 }} />
                <span style={{ fontFamily: 'var(--font-mono-stack)', fontSize: 11, color: 'var(--muted)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-grotesk-stack)',
                  fontSize: 22,
                  fontWeight: 600,
                  letterSpacing: '-0.015em',
                  margin: '0 0 8px',
                }}
              >
                {svc.title}
              </h2>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--muted)', margin: '0 0 18px' }}>
                {svc.tagline}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 22 }}>
                {(svc.items ?? []).map((item, j) => (
                  <div
                    key={j}
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: 10,
                      fontSize: 13.5,
                      color: 'var(--ink)',
                    }}
                  >
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: 1.5,
                        background: 'var(--emerald)',
                        flexShrink: 0,
                      }}
                    />
                    {item.text}
                  </div>
                ))}
              </div>
              <Link href="/contact" className="gs-arrow link-accent" style={{ fontSize: 13.5 }}>
                Enquire <ArrowRight size={13} />
              </Link>
            </div>
          </Reveal>
        ))}
      </section>

      {/* PROCESS */}
      <section
        style={{ position: 'relative', padding: '90px clamp(20px,4vw,56px)', overflow: 'hidden', marginTop: 40 }}
      >
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
            <div className="kicker">{page.process?.kicker}</div>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="h-section h-section--sm" style={{ margin: '0 0 46px' }}>
              {page.process?.heading}
            </h2>
          </Reveal>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
              gap: 0,
              borderLeft: '1px solid var(--line)',
            }}
          >
            {(page.process?.steps ?? []).map((step, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="gs-proc" style={{ padding: '0 26px 8px', borderRight: '1px solid var(--line)', height: '100%' }}>
                  <div
                    className="gs-proc-num"
                    style={{ fontFamily: 'var(--font-mono-stack)', fontSize: 12, marginBottom: 10 }}
                  >
                    {step.step}
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
                    {step.title}
                  </div>
                  <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '90px clamp(20px,4vw,56px)', maxWidth: 880, margin: '0 auto' }}>
        <Reveal>
          <div className="kicker kicker--emerald">{page.faq?.kicker}</div>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="h-section h-section--sm" style={{ fontSize: 'clamp(28px,3.6vw,44px)', margin: '0 0 40px' }}>
            {page.faq?.heading}
          </h2>
        </Reveal>
        <FaqAccordion items={(page.faq?.items ?? []).map((f) => ({ q: f.q, a: f.a }))} />
      </section>

      <CtaBanner settings={settings} />
    </>
  )
}
