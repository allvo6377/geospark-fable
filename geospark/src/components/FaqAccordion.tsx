'use client'

import React, { useState } from 'react'

export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(-1)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {items.map((f, i) => {
        const isOpen = open === i
        return (
          <div key={i} className={`faq-item${isOpen ? ' is-open' : ''}`}>
            <button
              className="faq-q"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
            >
              {f.q}
              <span className="faq-mark">{isOpen ? '−' : '+'}</span>
            </button>
            <div className="faq-a-wrap">
              <div className="faq-a-inner">
                <p className="faq-a">{f.a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
