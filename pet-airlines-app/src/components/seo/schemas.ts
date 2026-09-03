import { SITE_URL } from '@/lib/site'

/** Canonical @id for the single Organization node emitted by the root layout. */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`

export interface BreadcrumbItem {
  name: string
  path: string
}

export function breadcrumbList(items: BreadcrumbItem[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}

export interface FaqQa {
  question: string
  answer: string
}

export function faqPage(qa: FaqQa[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: qa.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

type ParsedPrice =
  | { kind: 'single'; amount: number }
  | { kind: 'range'; low: number; high: number }
  | { kind: 'floor'; low: number }

/**
 * Parses a display price string ("$800 - $2,200", "$75", "$3,500+") into a
 * typed shape. Returns null for anything it doesn't understand explicitly —
 * never guesses a number.
 */
export function parseDisplayPrice(raw: string): ParsedPrice | null {
  const trimmed = raw.trim()

  const rangeMatch = trimmed.match(/^\$([\d,]+)\s*-\s*\$?([\d,]+)$/)
  if (rangeMatch) {
    const low = Number(rangeMatch[1].replace(/,/g, ''))
    const high = Number(rangeMatch[2].replace(/,/g, ''))
    return Number.isFinite(low) && Number.isFinite(high) ? { kind: 'range', low, high } : null
  }

  const floorMatch = trimmed.match(/^\$([\d,]+)\+$/)
  if (floorMatch) {
    const low = Number(floorMatch[1].replace(/,/g, ''))
    return Number.isFinite(low) ? { kind: 'floor', low } : null
  }

  const singleMatch = trimmed.match(/^\$([\d,]+)$/)
  if (singleMatch) {
    const amount = Number(singleMatch[1].replace(/,/g, ''))
    return Number.isFinite(amount) ? { kind: 'single', amount } : null
  }

  return null
}

/**
 * Builds a schema.org Offer/AggregateOffer node (USD) from a display price
 * string. Returns null when the price string can't be parsed — the caller
 * should omit the offer for that tier rather than emit a guessed number.
 */
export function priceOffer(rawPrice: string, url: string): Record<string, unknown> | null {
  const parsed = parseDisplayPrice(rawPrice)
  if (!parsed) return null

  if (parsed.kind === 'single') {
    return { '@type': 'Offer', price: parsed.amount, priceCurrency: 'USD', url }
  }

  if (parsed.kind === 'range') {
    return { '@type': 'AggregateOffer', lowPrice: parsed.low, highPrice: parsed.high, priceCurrency: 'USD', url }
  }

  return { '@type': 'AggregateOffer', lowPrice: parsed.low, priceCurrency: 'USD', url }
}
