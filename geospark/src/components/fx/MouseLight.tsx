'use client'

import { useEffect, useRef } from 'react'

/** Mouse-responsive ambient lighting — a soft radial glow that follows the cursor. */
export function MouseLight() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const light = ref.current
    if (!light) return
    let raf = 0
    let mx = window.innerWidth / 2
    let my = window.innerHeight / 3

    const paint = () => {
      raf = 0
      const dark = document.documentElement.dataset.theme === 'dark'
      const a = dark ? 0.13 : 0.09
      const rgb =
        getComputedStyle(document.documentElement).getPropertyValue('--glow-rgb').trim() ||
        '46,100,23'
      light.style.background = `radial-gradient(600px circle at ${mx}px ${my}px, rgba(${rgb},${a}), transparent 70%)`
    }
    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      if (!raf) raf = requestAnimationFrame(paint)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    paint()
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        opacity: 'var(--glow)' as unknown as number,
        transition: 'opacity .4s ease',
      }}
    />
  )
}
