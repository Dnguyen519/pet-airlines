import type { MetadataRoute } from 'next'
import { POPULAR_ROUTES } from '@/lib/countries'
import { SITE_URL } from '@/lib/site'

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

  const routeCorridorPages = POPULAR_ROUTES.map((route) => ({
    path: `/routes/${route.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...routes, ...routeCorridorPages].map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))
}
