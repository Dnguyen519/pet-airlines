import type { ReactElement } from 'react'

import { ACCENT, BLUE, INK, MUTED, PAPER } from './tokens'

// Landmark silhouettes for the corridor illustrations. Each is authored in
// local coordinates: the ground sits at y=0 and the shape is centred on x=0,
// occupying roughly -64..64 horizontally and -132..0 vertically. `CorridorScene`
// translates them into position, so a landmark never needs to know where on
// the canvas it lands.

export type Landmark = () => ReactElement

/** Toronto — CN Tower and neighbouring blocks. */
export const Toronto: Landmark = () => (
  <g>
    <rect x="-58" y="-30" width="24" height="30" rx="4" fill={MUTED} />
    <rect x="30" y="-44" width="26" height="44" rx="4" fill={MUTED} />
    <path d="M-9 0 -6-72h12L9 0Z" fill={INK} />
    <path d="M-22-72h44l-7-16h-30Z" fill={ACCENT} />
    <path d="M-6-88h12l-3-16h-6Z" fill={INK} />
    <path d="M-2-104h4l2-28h-8Z" fill={INK} />
  </g>
)

/** Hanoi — the One Pillar Pagoda rising from its pond, with a lotus. */
export const Hanoi: Landmark = () => (
  <g>
    <ellipse cx="0" cy="-8" rx="60" ry="7" fill={BLUE} opacity="0.3" />
    <rect x="-8" y="-54" width="16" height="52" rx="3" fill={INK} />
    <rect x="-19" y="-74" width="38" height="22" rx="4" fill={PAPER} stroke={INK} strokeWidth="2" />
    <path d="M-8-74h16v-12a8 8 0 0 0-16 0Z" fill={INK} />
    <path d="M-34-74h68l-13-16h-42Z" fill={ACCENT} />
    <path d="M-25-90h50L0-108Z" fill={INK} />
    <path d="M-2-108h4v-10h-4Z" fill={INK} />
    <g fill={ACCENT} transform="translate(-4 -8)">
      <path d="M44-6c-8 0-13-5-13-10 6 0 13 4 13 10Z" />
      <path d="M44-6c8 0 13-5 13-10-6 0-13 4-13 10Z" />
      <path d="M44-6c0-8 3-14 7-16 2 6 0 13-7 16Z" />
    </g>
  </g>
)

/** Seoul — N Seoul Tower on Namsan. */
export const Seoul: Landmark = () => (
  <g>
    <path d="M-64 0c22-30 44-40 64-40s42 10 64 40Z" fill={MUTED} />
    <path d="M-7-40 -5-84h10l2 44Z" fill={INK} />
    <path d="M-20-84h40l-6-18h-28Z" fill={ACCENT} />
    <rect x="-9" y="-112" width="18" height="10" rx="3" fill={INK} />
    <path d="M-2-112h4v-24h-4Z" fill={INK} />
  </g>
)

/** Ho Chi Minh City — the riverfront towers. */
export const HoChiMinhCity: Landmark = () => (
  <g>
    <rect x="-64" y="-34" width="24" height="34" rx="4" fill={MUTED} />
    <path d="M-34 0v-76c0-6 5-10 11-10h10c6 0 11 4 11 10V0Z" fill={INK} />
    <ellipse cx="-24" cy="-86" rx="22" ry="6" fill={ACCENT} />
    <path d="M8 0v-58h14v-24h12v24h14V0Z" fill={INK} />
    <path d="M28-82h4v-22h-4Z" fill={INK} />
    <rect x="48" y="-26" width="18" height="26" rx="4" fill={MUTED} />
  </g>
)

/** Paris — the Eiffel Tower. */
export const Paris: Landmark = () => (
  <g>
    <rect x="-64" y="-22" width="22" height="22" rx="3" fill={MUTED} />
    <rect x="44" y="-28" width="20" height="28" rx="3" fill={MUTED} />
    <path d="M-40 0-24-48h12L-16 0Z" fill={INK} />
    <path d="M40 0 24-48h-12L16 0Z" fill={INK} />
    <path d="M-22-14C-14-34 14-34 22-14" fill="none" stroke={INK} strokeWidth="5" />
    <path d="M-16-48-9-88h18l7 40Z" fill={INK} />
    <path d="M-6-88-2-118h4l6 30Z" fill={INK} />
    <path d="M-2-118h4v-10h-4Z" fill={INK} />
    <rect x="-27" y="-54" width="54" height="6" rx="3" fill={ACCENT} />
    <rect x="-14" y="-92" width="28" height="5" rx="2.5" fill={ACCENT} />
  </g>
)

/** United States — a Manhattan skyline with a harbour torch. */
export const NewYork: Landmark = () => (
  <g>
    <rect x="-66" y="-38" width="22" height="38" rx="3" fill={MUTED} />
    <rect x="-40" y="-56" width="24" height="56" rx="3" fill={MUTED} />
    <rect x="-30" y="-44" width="60" height="44" rx="3" fill={INK} />
    <rect x="-20" y="-72" width="40" height="32" rx="3" fill={INK} />
    <rect x="-12" y="-104" width="24" height="36" rx="4" fill={INK} />
    <rect x="-11" y="-100" width="22" height="5" rx="2.5" fill={ACCENT} />
    <rect x="-2" y="-122" width="4" height="20" rx="2" fill={INK} />
    <rect x="44" y="-30" width="20" height="30" rx="3" fill={MUTED} />
    <rect x="51" y="-46" width="6" height="18" rx="2" fill={INK} />
    <path d="M48-46c0-7 5-10 6-17 2 7 6 10 6 17Z" fill={ACCENT} />
  </g>
)

/** Sydney — the Opera House on its harbour podium. */
export const Sydney: Landmark = () => (
  <g>
    <ellipse cx="0" cy="-9" rx="66" ry="6" fill={BLUE} opacity="0.3" />
    <rect x="-60" y="-18" width="120" height="14" rx="5" fill={MUTED} />
    <path d="M-52-18c0-30 16-52 34-60-8 20-12 40-12 60Z" fill={PAPER} stroke={INK} strokeWidth="2" />
    <path d="M-22-18c0-34 18-58 38-68-9 24-14 46-14 68Z" fill={PAPER} stroke={INK} strokeWidth="2" />
    <path d="M10-18c0-26 14-46 30-54-7 18-11 34-11 54Z" fill={ACCENT} stroke={INK} strokeWidth="2" />
  </g>
)
