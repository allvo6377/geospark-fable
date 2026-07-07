'use client'

import React, { useEffect, useRef } from 'react'

import 'leaflet/dist/leaflet.css'

export type MapMarker = {
  lat: number
  lng: number
  title: string
  subtitle?: string
  category?: string
  /** 'ping' = pulsing project marker, 'beacon' = office marker */
  kind?: 'ping' | 'beacon'
}

/**
 * Leaflet map with the handoff's pulsing square markers.
 * Client-only; Leaflet is loaded dynamically after mount.
 */
export function LeafletMap({
  center,
  zoom = 6,
  markers,
  height = 380,
  activeCategory = 'All',
}: {
  center: { lat: number; lng: number }
  zoom?: number
  markers: MapMarker[]
  height?: number
  activeCategory?: string
}) {
  const elRef = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markerRefs = useRef<{ category?: string; marker: any }[]>([])

  useEffect(() => {
    let cancelled = false
    const init = async () => {
      const L = (await import('leaflet')).default
      if (cancelled || !elRef.current || mapRef.current) return

      const map = L.map(elRef.current, { scrollWheelZoom: false }).setView(
        [center.lat, center.lng],
        zoom,
      )
      mapRef.current = map
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map)

      markerRefs.current = markers.map((m) => {
        const html =
          m.kind === 'beacon'
            ? '<div class="gs-marker"></div>'
            : '<div class="gs-mk"><b></b><i></i></div>'
        const size = m.kind === 'beacon' ? 16 : 14
        const icon = L.divIcon({ className: '', html, iconSize: [size, size], iconAnchor: [size / 2, size / 2] })
        const marker = L.marker([m.lat, m.lng], { icon }).bindPopup(
          `<strong>${escapeHtml(m.title)}</strong>${m.subtitle ? `<br>${escapeHtml(m.subtitle)}` : ''}`,
        )
        marker.addTo(map)
        return { category: m.category, marker }
      })
    }
    init()
    return () => {
      cancelled = true
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
        markerRefs.current = []
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // sync marker visibility with the active filter
  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    markerRefs.current.forEach(({ category, marker }) => {
      const show = activeCategory === 'All' || category === activeCategory
      if (show) marker.addTo(map)
      else map.removeLayer(marker)
    })
  }, [activeCategory])

  return (
    <div
      ref={elRef}
      style={{
        height,
        borderRadius: 24,
        border: '1px solid var(--line)',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1,
      }}
    />
  )
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}
