import type { MetadataRoute } from 'next'

const SITE_URL = 'https://www.pet-airlines.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/test-debug', '/email-preview'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
