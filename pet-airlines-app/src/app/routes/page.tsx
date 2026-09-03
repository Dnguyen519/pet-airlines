import type { Metadata } from 'next'
import Link from 'next/link'
import Layout from '@/components/layout/Layout'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbList } from '@/components/seo/schemas'
import { POPULAR_ROUTES, countryName } from '@/lib/countries'

export const metadata: Metadata = {
  title: 'Popular Pet Transport Routes',
  description:
    'Documentation, quarantine, and timeline requirements differ by corridor — see what to expect for our most-requested international pet relocation routes.',
  alternates: { canonical: '/routes' },
  openGraph: {
    title: 'Popular Pet Transport Routes | Pet Airlines',
    description:
      'Documentation, quarantine, and timeline requirements differ by corridor — see what to expect for our most-requested international pet relocation routes.',
    url: '/routes',
    type: 'website',
  },
}

export default function RoutesPage() {
  const breadcrumbJsonLd = breadcrumbList([
    { name: 'Home', path: '/' },
    { name: 'Routes', path: '/routes' },
  ])

  return (
    <Layout>
      <JsonLd data={breadcrumbJsonLd} />

      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold text-pet-navy mb-4">Popular Routes</h1>
            <p className="text-xl text-gray-600 mb-6">
              We connect pets with their families worldwide
            </p>
            <p className="text-gray-700 text-left md:text-center">
              Every international pet relocation runs on the same basic pieces — a microchip, a
              rabies vaccination, a veterinary health certificate, and an import permit or
              equivalent clearance — but the specific rules attached to each piece vary a lot by
              destination. Some countries, like Vietnam, do not currently require a rabies
              antibody titer test or a quarantine period for pets arriving with complete
              paperwork. Others, like South Korea, typically require a titer test with a waiting
              period before travel is permitted. The European Union enforces a fixed 21-day wait
              after the rabies vaccination before entry, no matter how complete the rest of your
              documentation is. And Australia runs one of the strictest processes in the world,
              combining months of pre-export testing with mandatory post-arrival quarantine at an
              approved facility. Below are the corridors we&apos;re asked about most, each with its
              own requirements, realistic timeline, and what typically drives the cost on that
              specific route. If your route isn&apos;t listed, we handle custom corridors too — get
              in touch and we&apos;ll walk you through what your destination requires.
            </p>
          </div>

          {/* Routes Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {POPULAR_ROUTES.map((route) => (
              <Link
                key={route.slug}
                href={`/routes/${route.slug}`}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-pet-blue">
                    {countryName(route.from)}
                  </span>
                  <span className="text-gray-400">→</span>
                  <span className="text-sm font-semibold text-pet-blue">
                    {countryName(route.to)}
                  </span>
                </div>
                <h2 className="font-semibold text-pet-navy mb-2">{route.title}</h2>
                <p className="text-sm text-gray-600">
                  Requirements, timeline &amp; crate guidance for this route
                </p>
              </Link>
            ))}
          </div>

          {/* Additional Info */}
          <div className="bg-white rounded-3xl p-8">
            <h2 className="text-3xl font-bold text-pet-navy mb-6">Custom Routes Available</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-pet-navy mb-4">
                  Don&apos;t see your route?
                </h3>
                <p className="text-gray-700 mb-4">
                  We handle custom routes to destinations beyond the corridors listed above. Each
                  journey is carefully planned around that country&apos;s current import
                  requirements.
                </p>
              </div>
              <div className="flex items-center">
                <Link href="/quote" className="btn-primary">
                  Get Custom Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
