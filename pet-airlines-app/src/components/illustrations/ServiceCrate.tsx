import { ACCENT, BLUE, INK, LIGHT, MUTED, PAPER, STROKE, type IllustrationProps } from './tokens'

/** An IATA-style travel crate with a grille door, water bowl and tape measure. */
export function ServiceCrate({ className, title, titleId = 'illus-crate' }: IllustrationProps) {
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
        {/* Crate shell */}
        <rect x="44" y="60" width="188" height="140" rx="18" fill={PAPER} />
        <path d="M44 96h188" />
        <rect x="112" y="42" width="52" height="20" rx="10" fill={ACCENT} />
        <rect x="58" y="72" width="160" height="14" rx="7" fill={ACCENT} strokeWidth="0" />

        {/* Grille door */}
        <rect x="130" y="112" width="86" height="76" rx="12" fill={LIGHT} />
        <path
          d="M150 112v76M170 112v76M190 112v76M130 136h86M130 160h86"
          strokeWidth="1.5"
        />
        <circle cx="204" cy="150" r="4" fill={INK} />

        {/* Vents */}
        <g fill={LIGHT}>
          <circle cx="72" cy="126" r="8" />
          <circle cx="98" cy="126" r="8" />
          <circle cx="72" cy="152" r="8" />
          <circle cx="98" cy="152" r="8" />
        </g>
        <path d="M62 178h50" />

        {/* Skids */}
        <rect x="56" y="192" width="34" height="14" rx="7" fill={MUTED} />
        <rect x="186" y="192" width="34" height="14" rx="7" fill={MUTED} />

        {/* Water bowl */}
        <path d="M246 176h48l-7 24c-1 5-5 8-10 8h-14c-5 0-9-3-10-8Z" fill={PAPER} />
        <path d="M250 186h40" stroke={BLUE} strokeWidth="5" />

        {/* Tape measure */}
        <path d="M246 62v88" stroke={ACCENT} strokeWidth="4" />
        <path d="M238 62h16M238 150h16" stroke={ACCENT} strokeWidth="4" />
        <g stroke={ACCENT} strokeWidth="3">
          <path d="M246 84h10M246 106h10M246 128h10" />
        </g>
      </g>
    </svg>
  )
}
