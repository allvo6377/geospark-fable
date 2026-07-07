'use client'

import React, { useEffect, useRef } from 'react'

/** Thin gradient reading-progress baseline fixed to the top of the article. */
export function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf = 0
    const paint = () => {
      raf = 0
      const el = barRef.current
      if (!el) return
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0
      el.style.width = `${p * 100}%`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(paint)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    paint()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="fn-progress" aria-hidden="true">
      <div ref={barRef} />
    </div>
  )
}
