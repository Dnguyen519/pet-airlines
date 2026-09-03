import { ACCENT, BLUE, INK, LIGHT, MUTED, PAPER, STROKE, type IllustrationProps } from './tokens'

/** A transport van with its side door open, a carrier waiting at a doorstep. */
export function ServiceDoorToDoor({
  className,
  title,
  titleId = 'illus-door-to-door',
}: IllustrationProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 320 240"
      role="img"
      aria-labelledby={titleId}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id={titleId}>{title}</title>

      <rect x="0" y="0" width="320" height="240" rx="20" fill={LIGHT} />

      <g stroke={INK} strokeWidth={STROKE} strokeLinejoin="round" strokeLinecap="round">
        {/* Doorway */}
        <path d="M18 196V78c0-7 5-12 12-12h58c7 0 12 5 12 12v118Z" fill={PAPER} />
        <path d="M8 80 59 48l51 32" fill={ACCENT} />
        <rect x="36" y="100" width="46" height="96" rx="8" fill={BLUE} />
        <circle cx="72" cy="150" r="4" fill={PAPER} />
        <rect x="14" y="196" width="98" height="12" rx="6" fill={MUTED} />

        {/* Van */}
        <path d="M156 190v-72c0-8 6-14 14-14h72l38 34h18c6 0 10 5 10 11v41Z" fill={PAPER} />
        <path d="M244 112l26 24h-26Z" fill={LIGHT} />
        <rect x="176" y="118" width="46" height="58" rx="8" fill={LIGHT} />
        <path d="M176 118v58" strokeDasharray="6 6" />
        <rect x="156" y="176" width="152" height="14" rx="7" fill={ACCENT} />
        <circle cx="192" cy="196" r="16" fill={INK} />
        <circle cx="192" cy="196" r="6" fill={PAPER} />
        <circle cx="278" cy="196" r="16" fill={INK} />
        <circle cx="278" cy="196" r="6" fill={PAPER} />

        {/* Carrier on the doorstep */}
        <rect x="112" y="152" width="52" height="44" rx="10" fill={PAPER} />
        <rect x="128" y="144" width="20" height="10" rx="5" fill={ACCENT} />
        <rect x="132" y="162" width="26" height="26" rx="6" fill={LIGHT} />
        <path d="M140 162v26M150 162v26" strokeWidth="1.5" />

        {/* Route between the two */}
        <path d="M96 214h128" stroke={BLUE} strokeWidth="4" strokeDasharray="10 10" />
      </g>
    </svg>
  )
}
