import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Layout from '@/components/layout/Layout'
import { FaqAccordion, type FaqSection } from '@/components/marketing/FaqAccordion'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbList, faqPage } from '@/components/seo/schemas'
import { POPULAR_ROUTES, countryName } from '@/lib/countries'
import { ROUTE_CONTENT } from '@/lib/route-content'

interface RoutePageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return POPULAR_ROUTES.map((route) => ({ slug: route.slug }))
}

function findRoute(slug: string) {
  return POPULAR_ROUTES.find((route) => route.slug === slug)
}

export function generateMetadata({ params }: RoutePageProps): Metadata {
  const route = findRoute(params.slug)
  if (!route) {
    return { title: 'Route Not Found' }
  }

  const fromName = countryName(route.from)
  const toName = countryName(route.to)
  const title = `Pet Transport ${fromName} to ${toName}`
  const description = `Requirements, timeline, and crate guidance for moving a dog or cat from ${fromName} to ${toName} — documentation, quarantine rules, and what to expect door-to-door.`

  return {
    title,
    description,
    alternates: { canonical: `/routes/${route.slug}` },
    openGraph: {
      title: `${title} | Pet Airlines`,
      description,
      url: `/routes/${route.slug}`,
      type: 'website',
    },
  }
}

export default function RouteCorridorPage({ params }: RoutePageProps) {
  const route = findRoute(params.slug)
  if (!route) {
    notFound()
  }

  const content = ROUTE_CONTENT[route.slug as keyof typeof ROUTE_CONTENT]
  const fromName = countryName(route.from)
  const toName = countryName(route.to)

  const breadcrumbJsonLd = breadcrumbList([
    { name: 'Home', path: '/' },
    { name: 'Routes', path: '/routes' },
    { name: route.title, path: `/routes/${route.slug}` },
  ])

  const faqJsonLd = faqPage(
    content.faqs.map((faq) => ({ question: faq.question, answer: faq.answer }))
  )

  const faqSections: FaqSection[] = [
    {
      category: `${fromName} to ${toName} FAQs`,
      questions: content.faqs.map((faq) => ({ q: faq.question, a: faq.answer })),
    },
  ]

  const otherRoutes = POPULAR_ROUTES.filter((r) => r.slug !== route.slug)

  return (
    <Layout>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />

      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-pet-navy mb-4">
              Pet transport from {fromName} to {toName}
            </h1>
            <p className="text-xl text-gray-600">{content.intro}</p>
          </div>

          {/* Requirements */}
          <section className="bg-white rounded-3xl p-8 mb-8 shadow-md">
            <h2 className="text-2xl font-bold text-pet-navy mb-4">Documentation requirements</h2>
            <ul className="space-y-3">
              {content.requirements.map((item, index) => (
                <li key={index} className="flex gap-3 text-gray-700">
                  <span className="text-pet-blue mt-1">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Timeline */}
          <section className="bg-white rounded-3xl p-8 mb-8 shadow-md">
            <h2 className="text-2xl font-bold text-pet-navy mb-4">Timeline</h2>
            <p className="text-gray-700">{content.timeline}</p>
          </section>

          {/* Crate + airline */}
          <section className="bg-white rounded-3xl p-8 mb-8 shadow-md">
            <h2 className="text-2xl font-bold text-pet-navy mb-4">Crate &amp; airline</h2>
            <p className="text-gray-700">{content.crateAndAirline}</p>
          </section>

          {/* Cost factors */}
          <section className="bg-white rounded-3xl p-8 mb-8 shadow-md">
            <h2 className="text-2xl font-bold text-pet-navy mb-4">What affects cost</h2>
            <p className="text-gray-700">{content.costFactors}</p>
          </section>

          {/* FAQs */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-pet-navy mb-6">Frequently asked questions</h2>
            <FaqAccordion sections={faqSections} />
          </section>

          {/* CTA */}
          <div className="bg-gradient-to-r from-pet-blue to-pet-sky rounded-3xl p-8 text-center text-white mb-12">
            <h2 className="text-3xl font-bold mb-4">Ready to plan your {fromName}-{toName} move?</h2>
            <p className="mb-6 text-white/90">Get a route-specific quote for your pet.</p>
            <a
              href={`/quote?from=${route.from}&to=${route.to}`}
              className="inline-block bg-white text-pet-blue px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all"
            >
              Get a Quote
            </a>
          </div>

          {/* Other routes */}
          <section>
            <h2 className="text-2xl font-bold text-pet-navy mb-6">Other popular routes</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {otherRoutes.map((other) => (
                <a
                  key={other.slug}
                  href={`/routes/${other.slug}`}
                  className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all text-pet-navy font-semibold"
                >
                  {other.title}
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  )
}
