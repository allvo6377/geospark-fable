import React from 'react'

type IconProps = { size?: number; strokeWidth?: number }

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
})

export const ArrowRight = ({ size = 15, strokeWidth = 2.4 }: IconProps) => (
  <svg {...base(size)} strokeWidth={strokeWidth}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export const Sun = ({ size = 16, strokeWidth = 2 }: IconProps) => (
  <svg {...base(size)} strokeWidth={strokeWidth}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
)

export const Moon = ({ size = 16, strokeWidth = 2 }: IconProps) => (
  <svg {...base(size)} strokeWidth={strokeWidth}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
  </svg>
)

export const Burger = ({ size = 17, strokeWidth = 2 }: IconProps) => (
  <svg {...base(size)} strokeWidth={strokeWidth}>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
)

export const Mail = ({ size = 18, strokeWidth = 1.8 }: IconProps) => (
  <svg {...base(size)} strokeWidth={strokeWidth}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
)

export const Phone = ({ size = 18, strokeWidth = 1.8 }: IconProps) => (
  <svg {...base(size)} strokeWidth={strokeWidth}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" />
  </svg>
)

export const WhatsApp = ({ size = 18 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1-.4-.1-.9-.3-1.6-.6-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8 0-1.3.7-2 .9-2.2.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.1.1.3 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.5.1.3.6 1 1.3 1.6.9.8 1.6 1 1.9 1.2.2.1.4.1.5-.1l.6-.7c.2-.2.3-.2.5-.1l1.8.9c.2.1.4.2.4.3.1.1.1.7-.1 1.2Z" />
  </svg>
)

export const MapPin = ({ size = 15, strokeWidth = 1.8 }: IconProps) => (
  <svg {...base(size)} strokeWidth={strokeWidth}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

export const Clock = ({ size = 19, strokeWidth = 1.8 }: IconProps) => (
  <svg {...base(size)} strokeWidth={strokeWidth}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
)

export const Check = ({ size = 26, strokeWidth = 2.6 }: IconProps) => (
  <svg {...base(size)} strokeWidth={strokeWidth}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

/* ---- service icons (exact paths from the handoff) ---- */

const serviceIcons: Record<string, React.ReactNode> = {
  survey: (
    <>
      <path d="M12 21s-6-5.2-6-10a6 6 0 1 1 12 0c0 4.8-6 10-6 10Z" />
      <circle cx="12" cy="11" r="2.2" />
    </>
  ),
  construction: <path d="M3 21h18M6 21V8l6-4 6 4v13M10 21v-5h4v5" />,
  planning: (
    <>
      <rect x="3" y="3" width="7" height="9" rx="1" />
      <rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="12" width="7" height="9" rx="1" />
      <rect x="3" y="16" width="7" height="5" rx="1" />
    </>
  ),
  interior: (
    <>
      <path d="M4 18v-8a2 2 0 0 1 2-2h2v4h8V8h2a2 2 0 0 1 2 2v8" />
      <path d="M2 18h20v2H2z" />
      <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </>
  ),
  landscape: (
    <>
      <path d="M11 20A7 7 0 0 1 4 13c0-4 3-8 8-10 5 2 8 6 8 10a7 7 0 0 1-7 7" />
      <path d="M12 21V11M12 14c-1.5-1-3-1.2-4.5-1M12 12c1.3-1.4 2.8-2 4.5-2" />
    </>
  ),
  realestate: (
    <>
      <path d="M15 7.5a4.5 4.5 0 1 1-6.4 6.3L3 19.4V21h1.6l5.6-5.6" />
      <path d="M14.5 4 20 9.5M16 11l4-4" />
    </>
  ),
}

export const ServiceIcon = ({ name, size = 23 }: { name: string; size?: number }) => (
  <svg {...base(size)} strokeWidth={1.8}>
    {serviceIcons[name] || serviceIcons.survey}
  </svg>
)
