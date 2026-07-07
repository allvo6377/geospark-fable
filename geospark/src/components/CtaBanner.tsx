import Link from 'next/link'
import React from 'react'

import type { SiteSetting } from '@/payload-types'

import { ArrowRight, Clock, Mail, Phone } from './Icons'

export function CtaBanner({ settings }: { settings: SiteSetting }) {
  return (
    <section
      className="gs-px"
      style={{ padding: '40px clamp(20px,4vw,56px) 110px', maxWidth: 1290, margin: '0 auto' }}
    >
      <div className="cta-wrap">
        {/* drifting contour lines */}
        <div
          aria-hidden="true"
          style={{ position: 'absolute', inset: '-10%', animation: 'gsDrift 28s ease-in-out infinite' }}
        >
          <svg width="100%" height="100%" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice" fill="none">
            <g stroke="#5C7CFF" opacity="0.2">
              <path d="M100,250 C300,120 500,380 700,250 C900,120 1050,340 1250,220" strokeWidth="1.2" />
              <path d="M80,310 C280,180 480,440 680,310 C880,180 1030,400 1230,280" strokeWidth="1" />
              <path d="M60,370 C260,240 460,500 660,370 C860,240 1010,460 1210,340" strokeWidth="0.9" />
            </g>
            <g stroke="#7FBF4D" opacity="0.16">
              <path d="M120,190 C320,60 520,320 720,190 C920,60 1070,280 1270,160" strokeWidth="1" />
            </g>
          </svg>
        </div>
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-34%',
            right: '-6%',
            width: 520,
            height: 520,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(92,124,255,0.28), transparent 65%)',
          }}
        />

        <div className="gs-cta-grid">
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 9,
                padding: '7px 14px',
                borderRadius: 999,
                border: '1px solid rgba(127,191,77,0.35)',
                background: 'rgba(127,191,77,0.1)',
                marginBottom: 22,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#7FBF4D',
                  animation: 'gsBlink 2s ease-in-out infinite',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono-stack)',
                  fontSize: 11,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: '#B8D89A',
                }}
              >
                {settings.ctaBadge}
              </span>
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-grotesk-stack)',
                fontSize: 'clamp(32px, 4.4vw, 58px)',
                letterSpacing: '-0.03em',
                fontWeight: 700,
                lineHeight: 1.04,
                color: '#fff',
                margin: '0 0 18px',
              }}
            >
              {settings.ctaTitle}
              <br />
              <span
                style={{
                  background: 'linear-gradient(95deg, #7FBF4D, #5C7CFF)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent',
                }}
              >
                {settings.ctaTitleGradient}
              </span>
            </h2>
            <p
              style={{
                color: 'rgba(233,241,246,0.65)',
                fontSize: 16.5,
                lineHeight: 1.65,
                maxWidth: '46ch',
                margin: '0 0 30px',
              }}
            >
              {settings.ctaText}
            </p>
            <Link href={settings.ctaButtonHref || '/contact'} className="gs-cta-btn">
              {settings.ctaButtonLabel}
              <ArrowRight size={17} strokeWidth={2.2} />
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <a href={`mailto:${settings.email}`} className="gs-cta-card">
              <span
                style={{
                  flexShrink: 0,
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  background: 'rgba(127,191,77,0.16)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#9FD16B',
                }}
              >
                <Mail size={19} />
              </span>
              <span style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                <span className="cta-card-label" style={ctaLabelStyle}>
                  Email us
                </span>
                <span style={{ fontSize: 15, fontWeight: 600 }}>{settings.email}</span>
              </span>
            </a>
            <a href={`tel:${settings.phoneRaw}`} className="gs-cta-card">
              <span
                style={{
                  flexShrink: 0,
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  background: 'rgba(92,124,255,0.18)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#9DB2FF',
                }}
              >
                <Phone size={19} />
              </span>
              <span style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                <span style={ctaLabelStyle}>Call us</span>
                <span style={{ fontSize: 15, fontWeight: 600 }}>{settings.phone}</span>
              </span>
            </a>
            <div className="gs-cta-card" style={{ cursor: 'default' }}>
              <span
                style={{
                  flexShrink: 0,
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  background: 'rgba(255,255,255,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(233,241,246,0.8)',
                }}
              >
                <Clock />
              </span>
              <span style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                <span style={ctaLabelStyle}>Response time</span>
                <span style={{ fontSize: 15, fontWeight: 600 }}>{settings.responseTime}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const ctaLabelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono-stack)',
  fontSize: 10.5,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'rgba(233,241,246,0.5)',
}
