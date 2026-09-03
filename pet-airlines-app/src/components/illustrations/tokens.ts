// Shared palette + geometry tokens for the SVG illustration set.
//
// Every colour resolves through a CSS custom property declared in
// `src/app/globals.css` so the illustrations follow the theme, with the
// literal brand hex from `tailwind.config.js` as a hard fallback for any
// context where the variables are not in scope (e.g. an SVG serialised on
// its own).

export const INK = 'var(--pet-navy, #1B3A5F)'
export const BLUE = 'var(--pet-blue, #3B9AE1)'
export const ACCENT = 'var(--pet-orange, #FFA366)'
export const LIGHT = 'var(--pet-light, #E8F4FB)'
export const SKY = 'var(--pet-sky, #87CEEB)'
export const PAPER = 'var(--pet-paper, #FFFFFF)'
export const MUTED = 'var(--pet-muted, #C9D6E2)'

/** Every stroke in the set is the same weight, drawn with round joins. */
export const STROKE = 2

export interface IllustrationProps {
  /** Utility classes for sizing/placement. The SVG is always viewBox-scaled. */
  className?: string
  /** Accessible name, rendered as the SVG's `<title>`. */
  title: string
  /**
   * Overrides the `<title>` element id. Only needed when the same
   * illustration is rendered more than once in a single document.
   */
  titleId?: string
}
