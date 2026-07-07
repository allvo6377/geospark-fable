import React, { useId } from 'react'

/** GeoSpark “G + beacon” mark, drawn from the design handoff. */
export function LogoMark({
  size = 36,
  light = false,
}: {
  size?: number
  /** Footer variant on dark ink background */
  light?: boolean
}) {
  const id = useId()
  const a = light ? '#7FBF4D' : '#2E6417'
  const b = light ? '#5C7CFF' : '#0025CC'
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0.55" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor={b} />
        </linearGradient>
      </defs>
      <path d="M60 26 A30 30 0 1 0 60 86" stroke={`url(#${id})`} strokeWidth="19" />
      <rect x="55" y="2" width="13" height="15" fill={a} />
      <rect x="72" y="10" width="15" height="28" fill={a} />
      <rect x="57" y="88" width="13" height="12" fill={b} />
    </svg>
  )
}
