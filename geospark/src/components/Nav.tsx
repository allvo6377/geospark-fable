'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { LogoMark } from './LogoMark'
import { Burger, Moon, Sun } from './Icons'
import { Magnetic } from './fx/Magnetic'

export type NavLink = { label: string; href: string }

export function Nav({
  brandName,
  brandTagline,
  links,
  ctaLabel,
  ctaHref,
}: {
  brandName: string
  brandTagline: string
  links: NavLink[]
  ctaLabel: string
  ctaHref: string
}) {
  const pathname = usePathname()
  const [isDark, setIsDark] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setIsDark(document.documentElement.dataset.theme === 'dark')
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const toggleTheme = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.dataset.theme = next ? 'dark' : 'light'
    try {
      localStorage.setItem('gs-theme', next ? 'dark' : 'light')
    } catch {
      /* private mode */
    }
  }

  const isActive = (href: string) => {
    if (href.includes('#')) return false
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <nav className={`gs-nav${scrolled ? ' is-scrolled' : ''}`}>
      <Link
        href="/"
        style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'var(--ink)' }}
      >
        <LogoMark size={36} />
        <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
          <span
            style={{
              fontFamily: 'var(--font-grotesk-stack)',
              fontWeight: 700,
              fontSize: 18,
              letterSpacing: '-0.02em',
              color: 'var(--accent)',
            }}
          >
            {brandName}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono-stack)',
              fontSize: 8.5,
              letterSpacing: '0.22em',
              color: 'var(--muted)',
              textTransform: 'uppercase',
            }}
          >
            {brandTagline}
          </span>
        </span>
      </Link>

      <div
        className="gs-navlinks"
        style={{ display: 'flex', alignItems: 'center', gap: 24, fontSize: 14, fontWeight: 500 }}
      >
        {links.map((l) => (
          <Link key={l.href + l.label} href={l.href} className={`gs-link${isActive(l.href) ? ' gs-active' : ''}`}>
            {l.label}
          </Link>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button className="gs-iconbtn" onClick={toggleTheme} aria-label="Toggle theme">
          {isDark ? <Sun /> : <Moon />}
        </button>
        <Magnetic>
          <Link href={ctaHref} className="gs-navcta">
            {ctaLabel}
          </Link>
        </Magnetic>
        <button
          className="gs-iconbtn gs-burger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Menu"
          aria-expanded={menuOpen}
        >
          <Burger />
        </button>
      </div>

      {menuOpen && (
        <div className="gs-mobile-menu">
          {links.map((l) => (
            <Link key={l.href + l.label} href={l.href} onClick={() => setMenuOpen(false)}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
