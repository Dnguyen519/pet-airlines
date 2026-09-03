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
