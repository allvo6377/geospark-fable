'use client'

import React, { useActionState } from 'react'

import { submitEnquiry, type EnquiryState } from '@/app/(frontend)/contact/actions'

import { Check } from './Icons'
import { Magnetic } from './fx/Magnetic'

export type ContactFormLabels = {
  namePlaceholder: string
  phonePlaceholder: string
  emailPlaceholder: string
  servicePlaceholder: string
  serviceOptions: string[]
  messagePlaceholder: string
  submitLabel: string
  directLabel: string
  directEmail: string
  successTitle: string
  successText: string
  successButton: string
}

export function ContactForm({ labels }: { labels: ContactFormLabels }) {
  const [state, action, pending] = useActionState<EnquiryState | null, FormData>(
    submitEnquiry,
    null,
  )
  const [resetKey, setResetKey] = React.useState(0)
  const [dismissed, setDismissed] = React.useState(false)
  const sent = state?.ok === true && !dismissed

  // a fresh successful submission re-shows the confirmation
  React.useEffect(() => {
    if (state?.ok) setDismissed(false)
  }, [state])

  if (sent) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 10px' }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            background: 'linear-gradient(135deg, var(--accent), var(--emerald))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 18px',
            color: '#fff',
          }}
        >
          <Check />
        </div>
        <div
          style={{
            fontFamily: 'var(--font-grotesk-stack)',
            fontSize: 22,
            fontWeight: 600,
            marginBottom: 8,
          }}
        >
          {labels.successTitle}
        </div>
        <p style={{ fontSize: 14.5, color: 'var(--muted)', lineHeight: 1.6, margin: '0 0 20px' }}>
          {labels.successText}
        </p>
        <button
          className="btn-ghost"
          style={{ padding: '11px 24px', fontSize: 14 }}
          onClick={() => {
            setResetKey((k) => k + 1)
            setDismissed(true)
          }}
        >
          {labels.successButton}
        </button>
      </div>
    )
  }

  return (
    <form key={resetKey} action={action} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <input className="gs-field" name="name" placeholder={labels.namePlaceholder} required maxLength={200} />
        <input className="gs-field" name="phone" placeholder={labels.phonePlaceholder} maxLength={40} />
      </div>
      <input
        className="gs-field"
        name="email"
        type="email"
        placeholder={labels.emailPlaceholder}
        required
        maxLength={320}
      />
      <select className="gs-field" name="service" defaultValue="">
        <option value="" disabled>
          {labels.servicePlaceholder}
        </option>
        {labels.serviceOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <textarea
        className="gs-field"
        name="message"
        rows={5}
        placeholder={labels.messagePlaceholder}
        required
        maxLength={5000}
        style={{ resize: 'vertical' }}
      />
      {/* honeypot — hidden from humans */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
      />
      {state && !state.ok && state.error && (
        <div style={{ fontSize: 13.5, color: '#c0392b', fontWeight: 500 }}>{state.error}</div>
      )}
      <Magnetic style={{ width: '100%' }}>
        <button
          type="submit"
          className="btn-primary"
          disabled={pending}
          style={{ width: '100%', justifyContent: 'center', opacity: pending ? 0.7 : 1 }}
        >
          {pending ? 'Sending…' : labels.submitLabel}
        </button>
      </Magnetic>
      <div style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center' }}>
        {labels.directLabel}{' '}
        <a
          href={`mailto:${labels.directEmail}`}
          style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}
        >
          {labels.directEmail}
        </a>
      </div>
    </form>
  )
}
