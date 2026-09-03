import type { MetadataRoute } from 'next'

const SITE_URL = 'https://www.pet-airlines.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const routes = [
    { path: '', changeFrequency: 'weekly' as const, priority: 1 },
    { path: '/about', changeFrequency: 'monthly' as const, priority: 0.6 },
    { path: '/services', changeFrequency: 'monthly' as const, priority: 0.9 },
    { path: '/how-it-works', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/pricing', changeFrequency: 'monthly' as const, priority: 0.9 },
    { path: '/routes', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/faq', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/quote', changeFrequency: 'monthly' as const, priority: 0.8 },
  ]

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))
}
