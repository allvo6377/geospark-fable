import React from 'react'

/**
 * Animated topographic contour field + soft brand glows for page heroes.
 * Pure CSS animation — ported from the handoff.
 */
export function HeroContours({
  variant = 'full',
  maskTop = false,
}: {
  /** 'full' = the dense Home field, 'simple' = inner-page field */
  variant?: 'full' | 'simple'
  /** move the grid mask focus toward the top (inner pages) */
  maskTop?: boolean
}) {
  return (
    <>
      <div className={`grid-bg${maskTop ? ' grid-bg--top' : ''}`} aria-hidden="true" />
      <div className="contour-drift" aria-hidden="true">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <g stroke="var(--accent)" opacity="0.16">
            <path
              d="M180,120 C320,60 520,90 600,180 C680,270 640,380 520,420 C400,460 240,430 180,330 C120,230 100,170 180,120 Z"
              strokeWidth="1.2"
            />
            <path
              d="M220,150 C330,100 490,125 555,195 C620,265 590,350 495,383 C400,416 275,392 225,312 C175,232 160,190 220,150 Z"
              strokeWidth="1"
            />
            {variant === 'full' && (
              <>
                <path
                  d="M260,180 C340,140 460,160 510,212 C560,264 540,322 470,347 C400,372 310,353 272,295 C234,237 225,210 260,180 Z"
                  strokeWidth="1"
                />
                <path
                  d="M300,212 C355,185 430,197 464,231 C498,265 484,304 438,321 C392,338 336,325 312,287 C288,249 282,230 300,212 Z"
                  strokeWidth="0.9"
                />
              </>
            )}
          </g>
          <g stroke="var(--accent)" opacity="0.15">
            <path
              d="M760,430 C900,360 1080,400 1140,510 C1200,620 1140,730 990,760 C840,790 700,730 670,620 C640,510 660,480 760,430 Z"
              strokeWidth="1.2"
            />
            <path
              d="M790,470 C900,415 1040,445 1090,530 C1140,615 1095,700 980,725 C865,750 755,703 730,617 C705,531 715,507 790,470 Z"
              strokeWidth="1"
            />
            {variant === 'full' && (
              <>
                <path
                  d="M825,510 C905,470 1005,492 1042,554 C1079,616 1046,678 962,696 C878,714 800,680 782,617 C764,554 770,537 825,510 Z"
                  strokeWidth="1"
                />
                <path
                  d="M862,548 C917,522 986,537 1010,580 C1034,623 1012,666 954,678 C896,690 843,667 831,624 C819,581 825,566 862,548 Z"
                  strokeWidth="0.9"
                />
              </>
            )}
          </g>
          {variant === 'full' && (
            <g stroke="var(--accent)" opacity="0.1">
              <path
                d="M700,60 C860,10 1060,50 1130,150 C1200,250 1150,340 1010,360 C870,380 720,330 690,230 C660,130 640,80 700,60 Z"
                strokeWidth="1"
              />
              <path
                d="M740,95 C870,55 1030,90 1086,170 C1142,250 1100,320 986,336 C872,352 752,312 728,232 C704,152 692,112 740,95 Z"
                strokeWidth="0.9"
              />
            </g>
          )}
        </svg>
      </div>
      <div
        className="glow-orb"
        aria-hidden="true"
        style={{
          top: '-15%',
          right: '-8%',
          width: 620,
          height: 620,
          background: 'radial-gradient(circle, rgba(46,100,23,0.16), transparent 65%)',
          animation: 'gsDrift2 20s ease-in-out infinite',
        }}
      />
      <div
        className="glow-orb"
        aria-hidden="true"
        style={{
          bottom: '-20%',
          left: '-10%',
          width: 560,
          height: 560,
          background:
            variant === 'full'
              ? 'radial-gradient(circle, rgba(46,100,23,0.14), transparent 65%)'
              : 'radial-gradient(circle, rgba(0,37,204,0.1), transparent 65%)',
          animation: 'gsDrift2 24s ease-in-out infinite reverse',
        }}
      />
    </>
  )
}

const coordPositions: React.CSSProperties[] = [
  { top: '22%', left: '6%', animation: 'gsFloat 7s ease-in-out infinite' },
  { top: '31%', right: '7%', animation: 'gsFloat 9s ease-in-out infinite 1s' },
  { bottom: '30%', left: '8%', animation: 'gsFloat 8s ease-in-out infinite 2s' },
  { bottom: '22%', right: '9%', animation: 'gsFloat 10s ease-in-out infinite .5s' },
]

/** Floating survey-coordinate labels around a hero. */
export function HeroCoords({ items }: { items?: ({ text?: string | null } | null)[] | null }) {
  if (!items || items.length === 0) return null
  return (
    <div className="gs-coords" aria-hidden="true">
      {items.slice(0, 4).map((item, i) => (
        <div key={i} style={coordPositions[i]}>
          {i === 0 && <span className="coord-dot coord-dot--pulse" style={{ background: 'var(--accent)' }} />}
          {i === 3 && <span className="coord-dot" />}
          <span>
            {item?.text}
            {i === 2 && (
              <>
                {' '}
                <span className="blink">▮</span>
              </>
            )}
          </span>
        </div>
      ))}
    </div>
  )
}
