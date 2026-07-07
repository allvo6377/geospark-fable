'use client'

import React, { useEffect, useRef } from 'react'

/** Magnetic hover — the wrapped element leans toward the cursor (desktop only). */
export function Magnetic({
  children,
  style,
  className,
}: {
  children: React.ReactNode
  style?: React.CSSProperties
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let resetTimer: ReturnType<typeof setTimeout>

    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      el.style.transform = `translate(${dx * 0.18}px, ${dy * 0.22}px)`
    }
    const leave = () => {
      el.style.transition = 'transform .5s cubic-bezier(.22,1,.36,1)'
      el.style.transform = 'translate(0,0)'
      resetTimer = setTimeout(() => {
        el.style.transition = ''
      }, 500)
    }
    const enter = () => {
      clearTimeout(resetTimer)
      el.style.transition = ''
    }
    el.addEventListener('mouseenter', enter)
    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', leave)
    return () => {
      el.removeEventListener('mouseenter', enter)
      el.removeEventListener('mousemove', move)
      el.removeEventListener('mouseleave', leave)
      clearTimeout(resetTimer)
    }
  }, [])

  return (
    <span ref={ref} className={className} style={{ display: 'inline-flex', ...style }}>
      {children}
    </span>
  )
}
