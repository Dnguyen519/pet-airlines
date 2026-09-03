import type { ComponentType } from 'react'

import {
  CorridorCanadaAustralia,
  CorridorCanadaFrance,
  CorridorCanadaSouthKorea,
  CorridorCanadaUnitedStates,
  CorridorCanadaVietnam,
  CorridorSouthKoreaFrance,
  CorridorSouthKoreaVietnam,
  CorridorVietnamFrance,
  type IllustrationProps,
} from '@/components/illustrations'
import { POPULAR_ROUTES } from './countries'

type RouteSlug = (typeof POPULAR_ROUTES)[number]['slug']

export interface RouteIllustration {
  Component: ComponentType<IllustrationProps>
  /**
   * Accessible name for the artwork. These describe the drawing itself —
   * landmark silhouettes and a flight arc — and deliberately make no claim
   * about photographed people, animals, aircraft, or facilities.
   */
  title: string
}

export const ROUTE_ILLUSTRATIONS = {
  'canada-to-vietnam': {
    Component: CorridorCanadaVietnam,
    title:
      'Illustration: Toronto skyline on the left, a Hanoi pagoda on the right, joined by a dotted flight path carrying a pet carrier',
  },
  'canada-to-south-korea': {
    Component: CorridorCanadaSouthKorea,
    title:
      'Illustration: Toronto skyline on the left, the Seoul hillside tower on the right, joined by a dotted flight path carrying a pet carrier',
  },
  'south-korea-to-vietnam': {
    Component: CorridorSouthKoreaVietnam,
    title:
      'Illustration: the Seoul hillside tower on the left, Ho Chi Minh City towers on the right, joined by a dotted flight path carrying a pet carrier',
  },
  'canada-to-france': {
    Component: CorridorCanadaFrance,
    title:
      'Illustration: Toronto skyline on the left, the Paris tower on the right, joined by a dotted flight path carrying a pet carrier',
  },
  'south-korea-to-france': {
    Component: CorridorSouthKoreaFrance,
    title:
      'Illustration: the Seoul hillside tower on the left, the Paris tower on the right, joined by a dotted flight path carrying a pet carrier',
  },
  'vietnam-to-france': {
    Component: CorridorVietnamFrance,
    title:
      'Illustration: a Hanoi pagoda on the left, the Paris tower on the right, joined by a dotted flight path carrying a pet carrier',
  },
  'canada-to-united-states': {
    Component: CorridorCanadaUnitedStates,
    title:
      'Illustration: Toronto skyline on the left, a New York skyline on the right, joined by a dotted flight path carrying a pet carrier',
  },
  'canada-to-australia': {
    Component: CorridorCanadaAustralia,
    title:
      'Illustration: Toronto skyline on the left, the Sydney harbour shells on the right, joined by a dotted flight path carrying a pet carrier',
  },
} satisfies Record<RouteSlug, RouteIllustration>
