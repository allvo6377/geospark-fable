import type { Metadata } from 'next'
import { IBM_Plex_Mono, Instrument_Sans, Space_Grotesk } from 'next/font/google'
import React from 'react'

import { Footer } from '@/components/Footer'
import { Nav } from '@/components/Nav'
import { MouseLight } from '@/components/fx/MouseLight'
import { Veil } from '@/components/fx/Veil'
import { getSettings, mediaUrl } from '@/lib/content'

import './globals.css'

const grotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-grotesk',
  display: 'swap',
})
const sans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})
const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

const themeInit = `(function(){try{if(localStorage.getItem('gs-theme')==='dark'){document.documentElement.dataset.theme='dark'}}catch(e){}})()`

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings()
  const og = mediaUrl(settings.ogImage, 'hero')
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
    title: {
      default: settings.siteTitle,
      template: `%s | ${settings.brandName} ${settings.brandTagline}`,
    },
    description: settings.siteDescription,
    openGraph: {
      siteName: `${settings.brandName} ${settings.brandTagline}`,
      type: 'website',
      ...(og ? { images: [{ url: og.url }] } : {}),
    },
    twitter: { card: 'summary_large_image' },
  }
}

export default async function FrontendLayout(props: { children: React.ReactNode }) {
  const settings = await getSettings()
  const base = (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(/\/$/, '')

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `${settings.brandName} ${settings.brandTagline}`,
    description: settings.siteDescription,
    url: base,
    email: settings.email,
    telephone: settings.phoneRaw,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Nairobi',
      addressCountry: 'KE',
    },
    geo: { '@type': 'GeoCoordinates', latitude: -1.2921, longitude: 36.8219 },
    areaServed: 'Kenya',
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className={`${grotesk.variable} ${sans.variable} ${mono.variable}`}>
        <Veil />
        <MouseLight />
        <div style={{ minHeight: '100vh', position: 'relative' }}>
          <Nav
            brandName={settings.brandName}
            brandTagline={settings.brandTagline}
            links={(settings.nav ?? []).map((l) => ({ label: l.label, href: l.href }))}
            ctaLabel={settings.navCtaLabel}
            ctaHref={settings.navCtaHref}
          />
          {props.children}
          <Footer settings={settings} />
        </div>
      </body>
    </html>
  )
}
