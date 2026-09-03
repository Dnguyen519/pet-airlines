import { ACCENT, INK, LIGHT, MUTED, PAPER, SKY, STROKE, type IllustrationProps } from './tokens'
import type { Landmark } from './landmarks'

interface CorridorSceneProps extends IllustrationProps {
  /** Origin landmark, drawn on the left. */
  origin: Landmark
  /** Destination landmark, drawn on the right. */
  destination: Landmark
}

/**
 * Shared frame for the corridor illustrations: an origin silhouette on the
 * left, a destination silhouette on the right, joined by a dotted flight arc
 * carrying a pet carrier. Decorative — the silhouettes stand for the cities on
 * the corridor, not for any Pet Airlines facility or aircraft.
 */
export function CorridorScene({
  className,
  title,
  titleId,
  origin: Origin,
  destination: Destination,
}: CorridorSceneProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 480 200"
      role="img"
      aria-labelledby={titleId}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id={titleId}>{title}</title>

      <rect x="0" y="0" width="480" height="200" rx="18" fill={LIGHT} />
      <circle cx="404" cy="42" r="26" fill={SKY} opacity="0.4" />

      <g transform="translate(96 160)">
        <Origin />
      </g>
      <g transform="translate(384 160)">
        <Destination />
      </g>

      <path d="M0 160h480" stroke={INK} strokeWidth={STROKE} />
      <rect x="0" y="160" width="480" height="40" fill={MUTED} opacity="0.35" />

      {/* Flight arc */}
      <path
        d="M128 132Q240 8 352 132"
        fill="none"
        stroke={ACCENT}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="8 11"
      />
      <circle cx="128" cy="132" r="5" fill={ACCENT} />
      <circle cx="352" cy="132" r="5" fill={ACCENT} />

      {/* Carrier riding the arc */}
      <g
        transform="translate(240 70)"
        stroke={INK}
        strokeWidth={STROKE}
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <rect x="-24" y="-16" width="48" height="34" rx="9" fill={PAPER} />
        <rect x="-9" y="-23" width="18" height="9" rx="4.5" fill={ACCENT} />
        <rect x="-1" y="-8" width="19" height="19" rx="5" fill={LIGHT} />
        <path d="M5-8v19M12-8v19" strokeWidth="1.5" />
        <circle cx="-13" cy="-1" r="4" fill={LIGHT} />
        <circle cx="-13" cy="10" r="4" fill={LIGHT} />
      </g>
    </svg>
  )
}
