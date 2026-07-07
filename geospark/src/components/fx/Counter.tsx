'use client'

import React, { useEffect, useRef } from 'react'

/** Animated stat counter — counts up over 1.5s with cubic ease-out when scrolled into view. */
export function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return
          io.unobserve(el)
          const t0 = performance.now()
          const dur = 1500
          const tick = (now: number) => {
            const p = Math.min(1, (now - t0) / dur)
            const eased = 1 - Math.pow(1 - p, 3)
            el.textContent = Math.round(to * eased) + suffix
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        })
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [to, suffix])

  return (
    <span ref={ref}>
      {to}
      {suffix}
    </span>
  )
}
