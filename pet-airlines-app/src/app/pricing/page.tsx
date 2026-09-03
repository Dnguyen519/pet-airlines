import type { Metadata } from 'next'
import Layout from '@/components/layout/Layout'
import { PriceEstimator } from '@/components/marketing/PriceEstimator'
import { ServicePricingTabs, type PricingTier } from '@/components/marketing/ServicePricingTabs'
import { JsonLd } from '@/components/seo/JsonLd'
import { ORGANIZATION_ID, breadcrumbList, priceOffer } from '@/components/seo/schemas'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Pet Relocation Pricing & Quote Estimator',
  description:
    'Pricing for door-to-door transport, flight-only booking, documentation, customs clearance, IATA crates, and consulting, plus a quick cost estimator by pet size and route.',
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: 'Pet Relocation Pricing & Quote Estimator | Pet Airlines',
    description:
      'Pricing for door-to-door transport, flight-only booking, documentation, customs clearance, IATA crates, and consulting.',
    url: '/pricing',
    type: 'website',
  },
}

const transportServices: PricingTier[] = [
  {
    name: 'Door-to-Door International',
    icon: '🚪✈️🚪',
    basePrice: '$2,800 - $5,500',
    description: 'Complete service from pickup to delivery',
    popular: true,
    features: ['Home pickup & delivery', 'All documentation', 'Airport handling', 'Customs clearance', '24/7 support'],
  },
  {
    name: 'Flight-Only Transport',
    icon: '✈️',
    basePrice: '$800 - $2,200',
    description: 'Airport to airport service',
    features: ['Airline booking', 'Check-in assistance', 'Basic documentation', 'Flight monitoring', 'No ground transport'],
  },
  {
    name: 'Ground Transport Only',
    icon: '🚗',
    basePrice: '$150 - $600',
    description: 'Local pickup and delivery',
    features: ['Door-to-airport transfer', 'Airport-to-door delivery', 'Inter-city transport', 'Professional handling'],
  },
]

const supportServices: PricingTier[] = [
  {
    name: 'Documentation Services',
    icon: '📄',
    basePrice: '$300 - $500',
    description: 'Complete paperwork handling',
    features: ['Health certificates', 'Import/export permits', 'Airline compliance', 'Vet coordination'],
  },
  {
    name: 'Customs Clearance',
    icon: '🛃',
    basePrice: '$200 - $400',
    description: 'Professional customs handling',
    features: ['Import processing', 'Quarantine handling', 'Fee payments', 'Document submission'],
  },
  {
    name: 'Travel Crates',
    icon: '📦',
    basePrice: '$150 - $400',
    description: 'IATA-approved transport crates',
    features: ['Size-appropriate crates', 'IATA compliance', 'Door delivery', 'Assembly instructions'],
  },
]

const consultingServices: PricingTier[] = [
  {
    name: 'Basic Consulting',
    icon: '💬',
    basePrice: '$75',
    description: '30-45 minute consultation',
    features: ['Route planning help', 'Document checklist review', 'Timeline guidance', 'Quick questions', 'DIY traveler support'],
  },
  {
    name: 'Premium Advisory',
    icon: '🌟',
    basePrice: '$250',
    description: 'Complete journey support',
    premium: true,
    features: [
      'Complete journey planning',
      'Document preparation help',
      'Vendor recommendations',
      'WhatsApp support',
      'Until arrival assistance',
      'Emergency guidance',
    ],
  },
]

const allTiers = [...transportServices, ...supportServices, ...consultingServices]

const servicesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: allTiers.map((tier, index) => {
    const offers = priceOffer(tier.basePrice, `${SITE_URL}/pricing`)
    return {
      '@type': 'Service',
      position: index + 1,
      name: tier.name,
      description: tier.description,
      provider: { '@id': ORGANIZATION_ID },
      ...(offers ? { offers } : {}),
    }
  }),
}

export default function PricingPage() {
  return (
    <Layout>
      <JsonLd data={servicesJsonLd} />
      <JsonLd data={breadcrumbList([{ name: 'Home', path: '/' }, { name: 'Pricing', path: '/pricing' }])} />
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-pet-sky via-pet-light to-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-6xl animate-float">💰</div>
          <div className="absolute top-20 right-20 text-4xl animate-float" style={{ animationDelay: '0.5s' }}>🏷️</div>
          <div className="absolute bottom-10 left-1/4 text-5xl animate-float" style={{ animationDelay: '1s' }}>📊</div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-pet-navy mb-6">
            Transparent Pet Travel Pricing 💸
          </h1>
          <p className="text-xl md:text-2xl text-pet-navy/80 max-w-3xl mx-auto">
            No hidden fees, no surprises. Every cost explained clearly.
          </p>
          <p className="text-sm text-pet-navy/60 mt-4">
            All prices are in US dollars (USD).
          </p>
        </div>
      </section>

      {/* Pricing Calculator */}
      <section className="py-16 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-pet-navy mb-4">Quick Price Estimator 🧮</h2>
            <p className="text-gray-600">Get an instant estimate for your pet&apos;s journey</p>
          </div>

          <PriceEstimator />
        </div>
      </section>

      {/* Service Pricing Tabs */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-pet-navy text-center mb-12">
            Detailed Service Pricing 📋
          </h2>

          <ServicePricingTabs
            transportServices={transportServices}
            supportServices={supportServices}
            consultingServices={consultingServices}
          />
        </div>
      </section>

      {/* What's Included/Not Included */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-pet-navy text-center mb-12">
            Understanding Your Quote 📑
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* What's Included */}
            <div className="bg-green-50 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center">
                <span className="text-3xl mr-3">✅</span>
                Always Included
              </h3>
              <ul className="space-y-3">
                {[
                  { title: 'Professional handling', desc: 'Experienced team throughout journey' },
                  { title: 'Real-time updates', desc: 'WhatsApp/email at every stage' },
                  { title: 'Insurance coverage', desc: 'Full protection during transport' },
                  { title: '24/7 support', desc: 'Always available during travel' },
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-600 mr-2 mt-1">✓</span>
                    <div>
                      <strong className="text-green-800">{item.title}</strong>
                      <p className="text-sm text-green-700">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Additional Costs */}
            <div className="bg-yellow-50 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-yellow-800 mb-6 flex items-center">
                <span className="text-3xl mr-3">💰</span>
                Possible Additional Costs
              </h3>
              <ul className="space-y-3">
                {[
                  { title: 'Government fees', desc: 'Import/export permits, quarantine' },
                  { title: 'Veterinary costs', desc: 'Health certificates, vaccinations' },
                  { title: 'Rush service', desc: 'Expedited processing if needed' },
                  { title: 'Special requirements', desc: 'Oversized pets, special care needs' },
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-yellow-600 mr-2 mt-1">•</span>
                    <div>
                      <strong className="text-yellow-800">{item.title}</strong>
                      <p className="text-sm text-yellow-700">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Cost drivers */}
      <section className="py-20 bg-pet-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-pet-navy text-center mb-12">What Actually Drives the Price</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-pet-navy mb-4">Pet size and crate class</h3>
              <p className="text-gray-700">
                Crate size is set by IATA Live Animals Regulations — the pet has to stand fully
                upright, turn around, and lie down without touching the walls. A larger crate means
                a heavier shipment and often a different cargo class, which is the single biggest
                driver of transport cost between otherwise identical routes.
              </p>
            </div>
            <div className="bg-white rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-pet-navy mb-4">Route and airline availability</h3>
              <p className="text-gray-700">
                Direct live-animal cargo capacity is limited on many routes, and seasonal heat
                embargoes can push a shipment onto a longer, more expensive routing to avoid tarmac
                time in extreme temperatures. Routes requiring EU entry documentation or a
                destination quarantine period generally cost more due to the added processing and
                storage involved.
              </p>
            </div>
            <div className="bg-white rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-pet-navy mb-4">Documentation complexity</h3>
              <p className="text-gray-700">
                A destination with an import permit requirement, breed-specific restrictions, or a
                quarantine facility booking adds both cost and lead time compared to a
                straightforward health-certificate-only entry. We flag these requirements during
                the quote so there are no surprises later in the process.
              </p>
            </div>
            <div className="bg-white rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-pet-navy mb-4">Timing</h3>
              <p className="text-gray-700">
                Rush processing for a health certificate or permit inside a tight travel window
                costs more than the same paperwork booked with normal lead time. Planning 2-3
                months ahead of travel is the most reliable way to keep pricing at the standard
                rate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Price Promise */}
      <section className="py-20 bg-gradient-to-br from-pet-orange/10 to-pet-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-3xl p-12 shadow-xl">
            <span className="text-6xl mb-6 block">🏆</span>
            <h2 className="text-3xl font-bold text-pet-navy mb-4">
              Our Price Promise
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              We believe in fair, transparent pricing. If you find a lower quote for the same service level from a licensed pet transporter, we&apos;ll match it!
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <span className="text-4xl mb-3 block">🚫</span>
                <h4 className="font-semibold text-pet-navy">No Hidden Fees</h4>
                <p className="text-sm text-gray-600">All costs disclosed upfront</p>
              </div>
              <div>
                <span className="text-4xl mb-3 block">💸</span>
                <h4 className="font-semibold text-pet-navy">Fixed Quotes</h4>
                <p className="text-sm text-gray-600">Price won&apos;t change after booking</p>
              </div>
              <div>
                <span className="text-4xl mb-3 block">🛡️</span>
                <h4 className="font-semibold text-pet-navy">Full Protection</h4>
                <p className="text-sm text-gray-600">Insured at no extra cost</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-pet-blue to-pet-navy text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Get Your Custom Quote Today 📋
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Every pet&apos;s journey is unique. Let us create the perfect plan for yours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/quote"
              className="bg-pet-orange text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transform hover:scale-105 transition-all inline-flex items-center justify-center"
            >
              Get Free Quote
              <span className="ml-2">→</span>
            </a>
            <a
              href="https://wa.me/1234567890"
              className="bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transform hover:scale-105 transition-all inline-flex items-center justify-center"
            >
              WhatsApp Us
              <span className="ml-2">💬</span>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  )
}
