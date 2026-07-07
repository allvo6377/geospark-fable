'use client'

import React, { useEffect, useRef } from 'react'

/**
 * Scroll-entrance animation, ported from the handoff's [data-reveal] logic:
 * elements below the fold start hidden and rise into view when intersecting.
 * Content is fully server-rendered (SEO-safe) — hiding happens only after mount.
 */
export function Reveal({
  delay = 0,
  className,
  style,
  as: Tag = 'div',
  children,
}: {
  delay?: number
  className?: string
  style?: React.CSSProperties
  as?: 'div' | 'section' | 'span' | 'figure' | 'article' | 'h1' | 'h2' | 'h3' | 'p' | 'a'
  children?: React.ReactNode
}) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // Matches the prototype: only animate elements that start below 88% of the viewport.
    if (el.getBoundingClientRect().top <= window.innerHeight * 0.88) return

    el.style.opacity = '0'
    el.style.transform = 'translateY(26px)'
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return
          el.style.transition = `opacity .8s ease ${delay}ms, transform .8s cubic-bezier(.22,1,.36,1) ${delay}ms`
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          io.unobserve(el)
        })
      },
      { threshold: 0.12 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [delay])

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className} style={style}>
      {children}
    </Tag>
  )
}
