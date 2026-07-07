import Link from 'next/link'
import React from 'react'

import type { SiteSetting } from '@/payload-types'

import { LogoMark } from './LogoMark'
import { Mail, MapPin, Phone, WhatsApp } from './Icons'

export function Footer({ settings }: { settings: SiteSetting }) {
  const columns = settings.footerColumns ?? []
  const legal = settings.legalLinks ?? []

  return (
    <footer className="gs-footer">
      {/* survey grid overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(233,241,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(233,241,246,0.05) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-38%',
          right: '-6%',
          width: 520,
          height: 520,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(92,124,255,0.16), transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      <div className="gs-foot-grid">
        <div style={{ maxWidth: 340 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 18 }}>
            <LogoMark size={34} light />
            <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
              <span
                style={{
                  fontFamily: 'var(--font-grotesk-stack)',
                  fontWeight: 700,
                  fontSize: 18,
                  letterSpacing: '-0.02em',
                  color: '#9FD16B',
                }}
              >
                {settings.brandName}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono-stack)',
                  fontSize: 9,
                  letterSpacing: '0.22em',
                  color: 'rgba(233,241,246,0.5)',
                  textTransform: 'uppercase',
                }}
              >
                {settings.brandTagline}
              </span>
            </span>
          </div>
          <p
            style={{
              fontSize: 14,
              color: 'rgba(233,241,246,0.62)',
              lineHeight: 1.65,
              margin: '0 0 22px',
              maxWidth: '38ch',
            }}
          >
            {settings.footerBlurb}
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            <a
              href={`https://wa.me/${(settings.phoneRaw || '').replace(/[^0-9]/g, '')}`}
              aria-label="WhatsApp"
              className="gs-social"
            >
              <WhatsApp />
            </a>
            <a href={`mailto:${settings.email}`} aria-label="Email" className="gs-social">
              <Mail />
            </a>
            <a href={`tel:${settings.phoneRaw}`} aria-label="Phone" className="gs-social">
              <Phone />
            </a>
          </div>
        </div>

        {columns.map((col, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 13, fontSize: 14 }}>
            <span className="foot-heading">{col.heading}</span>
            {(col.links ?? []).map((l, j) => (
              <Link key={j} href={l.href} className="gs-flink">
                {l.label}
              </Link>
            ))}
          </div>
        ))}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 13, fontSize: 14 }}>
          <span className="foot-heading">Get in touch</span>
          <a href={`mailto:${settings.email}`} className="gs-flink">
            {settings.email}
          </a>
          <a href={`tel:${settings.phoneRaw}`} className="gs-flink">
            {settings.phone}
          </a>
          <span
            style={{
              color: 'rgba(233,241,246,0.5)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 7,
              lineHeight: 1.5,
            }}
          >
            <span style={{ flexShrink: 0, marginTop: 2, display: 'inline-flex' }}>
              <MapPin />
            </span>
            {settings.address}
          </span>
        </div>
      </div>

      <div
        style={{
          position: 'relative',
          maxWidth: 1180,
          margin: 'clamp(44px, 5vw, 64px) auto 0',
          padding: '22px clamp(20px, 4vw, 56px)',
          borderTop: '1px solid rgba(233,241,246,0.1)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '14px 28px',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 12.5,
          color: 'rgba(233,241,246,0.5)',
        }}
      >
        <span>{settings.copyright}</span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 22, alignItems: 'center' }}>
          {legal.map((l, i) => (
            <Link key={i} href={l.href} className="gs-flink" style={{ color: 'rgba(233,241,246,0.5)' }}>
              {l.label}
            </Link>
          ))}
          <span
            style={{
              fontFamily: 'var(--font-mono-stack)',
              fontSize: 11,
              letterSpacing: '0.1em',
              color: 'rgba(233,241,246,0.4)',
            }}
          >
            {settings.coordsLabel}
          </span>
        </div>
      </div>
    </footer>
  )
}
