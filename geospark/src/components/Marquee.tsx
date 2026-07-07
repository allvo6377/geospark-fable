import React from 'react'

/** Infinite technology marquee — content duplicated once for a seamless CSS loop. */
export function Marquee({ label, items }: { label?: string | null; items: string[] }) {
  if (items.length === 0) return null
  const loop = [...items, ...items]
  return (
    <section style={{ padding: '72px 0', overflow: 'hidden' }}>
      {label && (
        <div
          style={{
            textAlign: 'center',
            fontFamily: 'var(--font-mono-stack)',
            fontSize: 11.5,
            letterSpacing: '0.28em',
            color: 'var(--muted)',
            textTransform: 'uppercase',
            marginBottom: 34,
          }}
        >
          {label}
        </div>
      )}
      <div className="marquee-mask">
        <div className="marquee-track">
          {loop.map((item, i) => (
            <span key={i} className="glass-chip" aria-hidden={i >= items.length}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
