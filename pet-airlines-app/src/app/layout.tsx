import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/site'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Pet Airlines - International Pet Transportation',
    template: '%s | Pet Airlines',
  },
  description: 'Professional door-to-door pet transportation services worldwide. Safe, reliable, and stress-free travel for your furry family members.',
  keywords: 'pet transportation, international pet travel, pet relocation, pet airline, pet shipping',
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Pet Airlines',
  url: SITE_URL,
  description:
    'Door-to-door international pet transportation, flight-only booking, ground transport, documentation, and customs clearance services.',
  email: 'info@pet-airlines.com',
  foundingDate: '2014',
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Pet Airlines',
  url: SITE_URL,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
