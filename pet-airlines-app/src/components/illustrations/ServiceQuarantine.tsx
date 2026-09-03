import { ACCENT, BLUE, INK, LIGHT, MUTED, PAPER, SKY, STROKE, type IllustrationProps } from './tokens'

/** A bright glass-fronted boarding kennel with a cat resting on a blanket. */
export function ServiceQuarantine({
  className,
  title,
  titleId = 'illus-quarantine',
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
        {/* Kennel shell */}
        <rect x="40" y="40" width="240" height="164" rx="20" fill={PAPER} />
        <rect x="40" y="40" width="240" height="24" rx="12" fill={ACCENT} />

        {/* Glass front */}
        <rect x="60" y="78" width="200" height="108" rx="14" fill={SKY} opacity="0.25" />
        <rect x="60" y="78" width="200" height="108" rx="14" fill="none" />
        <path d="M160 78v108" />
        <path d="M78 96l26 62M96 96l26 62" stroke={PAPER} strokeWidth="6" opacity="0.9" />
        <circle cx="150" cy="132" r="5" fill={MUTED} />
        <circle cx="170" cy="132" r="5" fill={MUTED} />

        {/* Blanket */}
        <path d="M176 186v-14c0-6 5-11 11-11h56c6 0 11 5 11 11v14Z" fill={BLUE} />
        <path d="M182 172h68" stroke={PAPER} strokeWidth="4" />

        {/* Cat */}
        <path d="M186 162c0-18 12-30 30-30s30 12 30 30Z" fill={PAPER} />
        <path d="M200 118 192 88l24 14ZM232 118l8-30-24 14Z" fill={PAPER} />
        <circle cx="216" cy="122" r="22" fill={PAPER} />
        <circle cx="209" cy="120" r="3" fill={INK} strokeWidth="0" />
        <circle cx="223" cy="120" r="3" fill={INK} strokeWidth="0" />
        <path d="M216 128l-4 4M216 128l4 4" strokeWidth="1.5" />
        <path d="M246 162c14 0 18-10 12-18" fill="none" />
      </g>
    </svg>
  )
}
