import { ACCENT, BLUE, INK, LIGHT, MUTED, PAPER, STROKE, type IllustrationProps } from './tokens'

/** A stack of travel paperwork — booklet, certificate, stamped paw mark. */
export function ServiceDocumentation({
  className,
  title,
  titleId = 'illus-documentation',
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
        {/* Back sheets */}
        <rect x="52" y="38" width="132" height="164" rx="12" fill={PAPER} transform="rotate(-7 118 120)" />
        <rect x="76" y="46" width="132" height="164" rx="12" fill={PAPER} transform="rotate(4 142 128)" />

        {/* Certificate on top */}
        <rect x="88" y="52" width="132" height="164" rx="12" fill={PAPER} />
        <rect x="88" y="52" width="132" height="26" rx="12" fill={BLUE} />
        <g stroke={MUTED} strokeWidth="6" strokeLinecap="round">
          <path d="M106 100h96M106 120h96M106 140h62" />
        </g>
        {/* Paw-print seal */}
        <path d="M118 182l-7 28 19-11 19 11-7-28Z" fill={ACCENT} />
        <circle cx="130" cy="160" r="26" fill={ACCENT} />
        <g fill={PAPER} strokeWidth="0">
          <circle cx="122" cy="150" r="4.5" />
          <circle cx="138" cy="150" r="4.5" />
          <circle cx="111" cy="160" r="4" />
          <circle cx="149" cy="160" r="4" />
          <path d="M130 157c9 0 15 6 15 11s-7 6-15 6-15-1-15-6 6-11 15-11Z" />
        </g>

        {/* Passport booklet, tucked in front */}
        <rect x="188" y="96" width="94" height="122" rx="12" fill={INK} />
        <rect x="200" y="108" width="70" height="98" rx="8" fill={PAPER} opacity="0.15" />
        <circle cx="235" cy="146" r="20" fill={ACCENT} strokeWidth="0" />
        <path d="M214 182h42" stroke={ACCENT} strokeWidth="5" />
      </g>
    </svg>
  )
}
