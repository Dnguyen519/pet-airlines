import { ACCENT, BLUE, INK, LIGHT, MUTED, PAPER, SKY, STROKE, type IllustrationProps } from './tokens'

/**
 * Wide 16:9 scene: a calm dog sitting beside an IATA-style travel crate on an
 * airport apron, with an aircraft tail behind them. Decorative — it does not
 * depict a specific animal, aircraft, or facility.
 */
export function HeroIllustration({ className, title, titleId = 'illus-hero' }: IllustrationProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 800 450"
      role="img"
      aria-labelledby={titleId}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id={titleId}>{title}</title>

      {/* Sky */}
      <rect x="0" y="0" width="800" height="450" rx="28" fill={LIGHT} />
      <circle cx="128" cy="92" r="50" fill={SKY} opacity="0.45" />
      <g fill={PAPER} opacity="0.9">
        <path d="M470 96c0-16 13-29 29-29 10 0 19 5 24 13 4-3 9-4 14-4 15 0 27 12 27 27s-12 27-27 27h-67c-14 0-25-11-25-25s11-25 25-25Z" />
        <path d="M96 214c0-12 10-22 22-22 8 0 15 4 19 10 3-2 7-3 11-3 11 0 20 9 20 20s-9 20-20 20h-50c-11 0-20-9-20-20s9-25 18-5Z" opacity="0.75" />
      </g>

      {/* Aircraft tail + rear fuselage */}
      <g stroke={INK} strokeWidth={STROKE} strokeLinejoin="round">
        <path d="M556 334 646 140c5-11 15-18 27-18h39c11 0 20 9 20 20v192Z" fill={BLUE} />
        <path d="M660 268h112c9 0 16 7 16 16s-7 16-16 16H636Z" fill={SKY} />
        <path d="M520 300h228c8 0 14 7 14 15v19H520c-9 0-17-8-17-17s8-17 17-17Z" fill={PAPER} />
        <path d="M690 168h30v70h-44Z" fill={LIGHT} strokeWidth="0" />
      </g>

      {/* Apron */}
      <rect x="0" y="334" width="800" height="116" fill={MUTED} opacity="0.4" />
      <path d="M0 334h800" stroke={INK} strokeWidth={STROKE} />
      <path
        d="M36 402h728"
        stroke={ACCENT}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="30 22"
        opacity="0.8"
      />

      {/* Travel crate */}
      <g stroke={INK} strokeWidth={STROKE} strokeLinejoin="round" strokeLinecap="round">
        <rect x="316" y="202" width="168" height="132" rx="16" fill={PAPER} />
        <path d="M316 234h168" />
        <rect x="368" y="184" width="64" height="20" rx="10" fill={ACCENT} />
        <rect x="330" y="212" width="140" height="14" rx="7" fill={ACCENT} strokeWidth="0" />
        {/* Grille door */}
        <rect x="396" y="248" width="76" height="74" rx="10" fill={LIGHT} />
        <path d="M414 248v74M434 248v74M454 248v74M396 274h76M396 298h76" strokeWidth="1.5" />
        {/* Vents + water bowl slot */}
        <g fill={LIGHT}>
          <circle cx="342" cy="262" r="7" />
          <circle cx="366" cy="262" r="7" />
          <circle cx="342" cy="286" r="7" />
          <circle cx="366" cy="286" r="7" />
        </g>
        <path d="M334 310h44" strokeLinecap="round" />
        {/* Skids */}
        <rect x="326" y="326" width="30" height="14" rx="6" fill={MUTED} />
        <rect x="444" y="326" width="30" height="14" rx="6" fill={MUTED} />
      </g>

      {/* Dog */}
      <g stroke={INK} strokeWidth={STROKE} strokeLinejoin="round" strokeLinecap="round">
        <path d="M268 332c14-22 8-52-10-64" fill="none" />
        <path d="M182 334c-12-32-8-70 16-90 16-14 44-14 60 0 24 20 28 58 16 90Z" fill={ACCENT} />
        <rect x="192" y="306" width="22" height="30" rx="11" fill={PAPER} />
        <rect x="230" y="306" width="22" height="30" rx="11" fill={PAPER} />
        <path d="M204 196c-16-10-22-32-10-38 12-6 22 10 24 28Z" fill={ACCENT} />
        <path d="M244 196c16-10 22-32 10-38-12-6-22 10-24 28Z" fill={ACCENT} />
        <circle cx="224" cy="216" r="38" fill={PAPER} />
        <ellipse cx="224" cy="234" rx="18" ry="13" fill={LIGHT} />
        <ellipse cx="224" cy="226" rx="6" ry="4.5" fill={INK} strokeWidth="0" />
        <circle cx="210" cy="206" r="3.5" fill={INK} strokeWidth="0" />
        <circle cx="238" cy="206" r="3.5" fill={INK} strokeWidth="0" />
        <path d="M224 240v6" />
        <path d="M196 258c16 10 40 10 56 0" stroke={BLUE} strokeWidth="6" />
      </g>
    </svg>
  )
}
