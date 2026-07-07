'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

/**
 * Page-transition veil, ported from the handoff: internal navigations fade
 * through the page background colour instead of hard-cutting.
 */
export function Veil() {
  const router = useRouter()
  const pathname = usePathname()
  const ref = useRef<HTMLDivElement>(null)
  const navigating = useRef(false)
  const [, force] = useState(0)

  // Fade the veil out whenever a route finishes rendering (incl. first load).
  useEffect(() => {
    const v = ref.current
    if (!v) return
    navigating.current = false
    v.classList.remove('is-out')
    // restart the fade-out animation
    v.classList.remove('is-in')
    void v.offsetHeight
    v.classList.add('is-in')
    force((n) => n + 1)
  }, [pathname])

  // Intercept internal link clicks to fade in before navigating.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)
        return
      const a = (e.target as HTMLElement | null)?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return
      const href = a.getAttribute('href') || ''
      // only same-origin path navigations, not hash jumps or external links
      if (!href.startsWith('/') || href.startsWith('//')) return
      const [path] = href.split('#')
      if (!path || path === pathname) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      e.preventDefault()
      if (navigating.current) return
      navigating.current = true
      const v = ref.current
      if (!v) {
        router.push(href)
        return
      }
      v.classList.remove('is-in')
      void v.offsetHeight
      v.classList.add('is-out')
      window.setTimeout(() => router.push(href), 300)
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [pathname, router])

  return <div ref={ref} className="gs-veil is-in" aria-hidden="true" />
}
