import type { Metadata } from 'next'
import React from 'react'

import { ContactForm } from '@/components/ContactForm'
import { HeroContours, HeroCoords } from '@/components/HeroContours'
import { LeafletMap } from '@/components/LeafletMap'
import { Reveal } from '@/components/fx/Reveal'
import { getGlobal, getSettings } from '@/lib/content'

export const revalidate = 120

export async function generateMetadata(): Promise<Metadata> {
  const page = await getGlobal('contact-page')
  return {
    title: page.metaTitle || 'Contact',
    description: page.metaDescription || page.hero?.intro || undefined,
  }
}

const cardLabelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono-stack)',
  fontSize: 10.5,
  letterSpacing: '0.2em',
  color: 'var(--accent)',
  textTransform: 'uppercase',
  marginBottom: 8,
}

export default async function ContactPage() {
  const [page, settings] = await Promise.all([getGlobal('contact-page'), getSettings()])
  const hero = page.hero
  const office = page.office
  const wa = (settings.phoneRaw || '').replace(/[^0-9]/g, '')

  return (
    <>
      {/* HERO */}
      <header style={{ position: 'relative', padding: '150px clamp(20px,4vw,56px) 48px', overflow: 'hidden' }}>
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

      {/* SPLIT: FORM + MAP */}
      <section
        id="form"
        className="gs-container"
        style={{
          padding: '32px clamp(20px,4vw,56px) 80px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))',
          gap: 24,
          alignItems: 'start',
        }}
      >
        <Reveal>
          <div className="glass-card" style={{ borderRadius: 24, padding: 32 }}>
            <ContactForm
              labels={{
                namePlaceholder: 'Your name',
                phonePlaceholder: 'Phone',
                emailPlaceholder: 'Email',
                servicePlaceholder: page.form?.servicePlaceholder || 'What do you need?',
                serviceOptions: (page.form?.serviceOptions ?? []).map((o) => o.label),
                messagePlaceholder:
                  page.form?.messagePlaceholder ||
                  'Describe your project or parcel (location, size, timeline)…',
                submitLabel: page.form?.submitLabel || 'Send message',
                directLabel: page.form?.directLabel || 'Or write directly:',
                directEmail: settings.email,
                successTitle: page.form?.successTitle || 'Message sent',
                successText:
                  page.form?.successText ||
                  'Thank you — your enquiry is with our team. We’ll reply within one working day.',
                successButton: page.form?.successButton || 'Send another',
              }}
            />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <LeafletMap
              center={{ lat: office?.lat ?? -1.2921, lng: office?.lng ?? 36.8219 }}
              zoom={office?.zoom ?? 6}
              height={340}
              markers={[
                {
                  lat: office?.lat ?? -1.2921,
                  lng: office?.lng ?? 36.8219,
                  title: office?.popupTitle || 'GeoSpark Onestop Solution',
                  subtitle: office?.popupSubtitle || 'Nairobi, Kenya',
                  kind: 'beacon',
                },
              ]}
            />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <a
                href={`https://wa.me/${wa}`}
                className="glass-card card-lift--border"
                style={{
                  borderRadius: 18,
                  padding: 20,
                  textDecoration: 'none',
                  color: 'var(--ink)',
                  transition: 'border-color .25s ease',
                }}
              >
                <div style={cardLabelStyle}>WhatsApp</div>
                <div style={{ fontSize: 14.5, fontWeight: 600 }}>{settings.phone}</div>
              </a>
              <a
                href={`tel:${settings.phoneRaw}`}
                className="glass-card card-lift--border"
                style={{
                  borderRadius: 18,
                  padding: 20,
                  textDecoration: 'none',
                  color: 'var(--ink)',
                  transition: 'border-color .25s ease',
                }}
              >
                <div style={cardLabelStyle}>Call</div>
                <div style={{ fontSize: 14.5, fontWeight: 600 }}>{settings.phone}</div>
              </a>
              <a
                href={`mailto:${settings.email}`}
                className="glass-card card-lift--border"
                style={{
                  borderRadius: 18,
                  padding: 20,
                  textDecoration: 'none',
                  color: 'var(--ink)',
                  transition: 'border-color .25s ease',
                }}
              >
                <div style={cardLabelStyle}>Email</div>
                <div style={{ fontSize: 14.5, fontWeight: 600, overflowWrap: 'anywhere' }}>{settings.email}</div>
              </a>
              <div className="glass-card" style={{ borderRadius: 18, padding: 20 }}>
                <div style={cardLabelStyle}>Office</div>
                <div style={{ fontSize: 14.5, fontWeight: 600 }}>{settings.address}</div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono-stack)',
                    fontSize: 10.5,
                    color: 'var(--muted)',
                    marginTop: 4,
                  }}
                >
                  {settings.coordsLabel}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
