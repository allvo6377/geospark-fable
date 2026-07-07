import React from 'react'

const GRADIENTS = [
  'linear-gradient(135deg,#2E6417,#4a8f2a)',
  'linear-gradient(135deg,#0025CC,#3a5fe0)',
  'linear-gradient(135deg,#14260D,#0B1233)',
  'linear-gradient(135deg,#2E6417,#7FBF4D)',
  'linear-gradient(135deg,#1a3a8a,#0025CC)',
]

/** Branded fallback cover for posts without an image — gradient + contour lines + sheet number. */
export function FieldCover({ index = 0, label }: { index?: number; label?: string }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        background: GRADIENTS[index % GRADIENTS.length],
        overflow: 'hidden',
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 600 400"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        style={{ position: 'absolute', inset: 0 }}
      >
        <g stroke="rgba(255,255,255,0.22)">
          <path d="M90,60 C160,30 260,45 300,90 C340,135 320,190 260,210 C200,230 120,215 90,165 C60,115 50,85 90,60 Z" strokeWidth="1.2" />
          <path d="M110,75 C165,52 245,63 278,98 C311,133 296,176 249,192 C202,208 139,196 116,157 C93,118 86,95 110,75 Z" strokeWidth="1" />
          <path d="M380,215 C450,180 540,200 570,255 C600,310 570,365 495,380 C420,395 350,365 335,310 C320,255 330,240 380,215 Z" strokeWidth="1.2" />
          <path d="M395,238 C450,210 520,226 543,268 C566,310 543,352 485,364 C427,376 373,353 361,311 C349,269 357,257 395,238 Z" strokeWidth="1" />
        </g>
        <g stroke="rgba(255,255,255,0.1)">
          {Array.from({ length: 9 }, (_, i) => (
            <path key={i} d={`M${(i + 1) * 60},0 V400`} strokeWidth="0.6" />
          ))}
          {Array.from({ length: 6 }, (_, i) => (
            <path key={`h${i}`} d={`M0,${(i + 1) * 60} H600`} strokeWidth="0.6" />
          ))}
        </g>
      </svg>
      <span
        style={{
          position: 'absolute',
          right: 18,
          bottom: 10,
          fontFamily: 'var(--font-mono-stack)',
          fontSize: 64,
          fontWeight: 500,
          color: 'rgba(255,255,255,0.14)',
          letterSpacing: '-0.04em',
          lineHeight: 1,
          userSelect: 'none',
        }}
      >
        {label}
      </span>
    </div>
  )
}
