import type { Metadata } from 'next'
import Link from 'next/link'
import Layout from '@/components/layout/Layout'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbList } from '@/components/seo/schemas'

export const metadata: Metadata = {
  title: 'How Pet Relocation Works',
  description:
    'The step-by-step pet relocation process: health certificates, microchip and rabies timing, import permits, crate approval, travel day, and arrival.',
  alternates: { canonical: '/how-it-works' },
  openGraph: {
    title: 'How Pet Relocation Works | Pet Airlines',
    description:
      'The step-by-step pet relocation process: health certificates, microchip and rabies timing, import permits, crate approval, travel day, and arrival.',
    url: '/how-it-works',
    type: 'website',
  },
}

export default function HowItWorksPage() {
  const steps = [
    {
      number: '1',
      icon: '📋',
      title: 'Submit Inquiry',
      description: 'Tell us about your pet and travel needs through our simple form.'
    },
    {
      number: '2',
      icon: '💰',
      title: 'Get Quote',
      description: 'Receive transparent pricing and detailed plan within 24 hours.'
    },
    {
      number: '3',
      icon: '📦',
      title: 'Prepare',
      description: 'We handle all paperwork, documentation, and logistics preparation.'
    },
    {
      number: '4',
      icon: '✈️',
      title: 'Travel Safe',
      description: 'Real-time updates throughout your pet\'s journey to their new home.'
    }
  ]

  return (
    <Layout>
      <JsonLd data={breadcrumbList([{ name: 'Home', path: '/' }, { name: 'How It Works', path: '/how-it-works' }])} />
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-pet-navy mb-6">How It Works</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple process, professional results. We handle every detail so you can focus on your pet&apos;s comfort.
            </p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-pet-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">{step.icon}</span>
                </div>
                <div className="bg-pet-orange text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                  {step.number}
                </div>
                <h3 className="font-semibold text-pet-navy mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Detailed Process */}
          <div className="bg-white rounded-3xl p-12 mb-16">
            <h2 className="text-3xl font-bold text-pet-navy mb-8 text-center">Detailed Process</h2>
            
            <div className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-pet-navy mb-4">Pre-Travel Planning (2-8 weeks)</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-pet-blue mr-2 mt-1">•</span>
                      Initial consultation and route planning
                    </li>
                    <li className="flex items-start">
                      <span className="text-pet-blue mr-2 mt-1">•</span>
                      Health certificate and vaccination requirements
                    </li>
                    <li className="flex items-start">
                      <span className="text-pet-blue mr-2 mt-1">•</span>
                      Import permits and customs documentation
                    </li>
                    <li className="flex items-start">
                      <span className="text-pet-blue mr-2 mt-1">•</span>
                      Crate training and travel preparation
                    </li>
                  </ul>
                </div>
                <div className="bg-pet-light rounded-2xl p-8 text-center">
                  <div className="text-6xl mb-4">📋</div>
                  <p className="font-semibold text-pet-navy">Everything prepared before travel day</p>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="bg-pet-light rounded-2xl p-8 text-center lg:order-1">
                  <div className="text-6xl mb-4">🚚</div>
                  <p className="font-semibold text-pet-navy">Seamless pickup and delivery</p>
                </div>
                <div className="lg:order-2">
                  <h3 className="text-2xl font-bold text-pet-navy mb-4">Travel Day</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-pet-blue mr-2 mt-1">•</span>
                      Pet pickup from your location
                    </li>
                    <li className="flex items-start">
                      <span className="text-pet-blue mr-2 mt-1">•</span>
                      Final health check and documentation review
                    </li>
                    <li className="flex items-start">
                      <span className="text-pet-blue mr-2 mt-1">•</span>
                      Safe transport to departure airport
                    </li>
                    <li className="flex items-start">
                      <span className="text-pet-blue mr-2 mt-1">•</span>
                      Real-time flight updates and monitoring
                    </li>
                  </ul>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-pet-navy mb-4">Arrival & Delivery</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-pet-blue mr-2 mt-1">•</span>
                      Customs clearance and import procedures
                    </li>
                    <li className="flex items-start">
                      <span className="text-pet-blue mr-2 mt-1">•</span>
                      Health inspection (if required by destination)
                    </li>
                    <li className="flex items-start">
                      <span className="text-pet-blue mr-2 mt-1">•</span>
                      Safe delivery to your new location
                    </li>
                    <li className="flex items-start">
                      <span className="text-pet-blue mr-2 mt-1">•</span>
                      Follow-up support for settling in
                    </li>
                  </ul>
                </div>
                <div className="bg-pet-light rounded-2xl p-8 text-center">
                  <div className="text-6xl mb-4">🏠</div>
                  <p className="font-semibold text-pet-navy">Safe arrival at new home</p>
                </div>
              </div>
            </div>
          </div>

          {/* Documentation & Timeline Detail */}
          <div className="bg-white rounded-3xl p-12 mb-16">
            <h2 className="text-3xl font-bold text-pet-navy mb-8 text-center">Understanding the Timeline</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-pet-navy mb-3">Microchip, rabies, and health certificate order</h3>
                <p className="text-gray-700 mb-3">
                  Most destinations require the microchip to be implanted before or on the same
                  day as the rabies vaccination — vaccinating first and chipping afterward can
                  invalidate the vaccination for entry purposes. From there, rabies vaccination
                  timing rules vary by destination: some require a minimum of 21 days between
                  vaccination and travel, others require the vaccination to simply be current.
                  The health certificate itself is usually only valid for a short window before
                  departure, commonly 5-10 days, so it has to be scheduled last, not first.
                </p>
                <p className="text-gray-700">
                  Getting this sequence wrong is the most common reason a travel date slips —
                  we build the whole document schedule backward from your target travel date.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-pet-navy mb-3">Crate approval and airline sign-off</h3>
                <p className="text-gray-700 mb-3">
                  Crates have to meet IATA Live Animals Regulations sizing: the pet must be able
                  to stand at full height, turn around, and lie down without touching the crate
                  walls. Airlines typically require crate approval as part of check-in, and some
                  routes are subject to seasonal heat embargoes that suspend live-animal cargo
                  during the hottest months, or breed restrictions for snub-nosed dogs and cats.
                </p>
                <p className="text-gray-700">
                  We confirm crate sizing and the airline&apos;s current policy before booking, so
                  there are no surprises at the check-in counter.
                </p>
              </div>
            </div>
          </div>

          {/* Communication */}
          <div className="bg-gradient-to-r from-pet-blue to-pet-sky rounded-3xl p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-6">Stay Connected Throughout</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl mb-4">📱</div>
                <h3 className="text-xl font-bold mb-2">WhatsApp Updates</h3>
                <p className="opacity-90">Real-time messages with photos and status updates</p>
              </div>
              <div>
                <div className="text-4xl mb-4">📧</div>
                <h3 className="text-xl font-bold mb-2">Email Notifications</h3>
                <p className="opacity-90">Detailed updates at every major milestone</p>
              </div>
              <div>
                <div className="text-4xl mb-4">📞</div>
                <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
                <p className="opacity-90">Always available for questions or concerns</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <h2 className="text-3xl font-bold text-pet-navy mb-4">Ready to Start?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Get your personalized quote and timeline in less than 24 hours.
            </p>
            <Link href="/quote" className="btn-primary text-lg px-8 py-4">
              Get Free Quote
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}