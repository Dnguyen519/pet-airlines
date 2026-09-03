import type { Metadata } from 'next'
import Layout from '@/components/layout/Layout'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbList } from '@/components/seo/schemas'

export const metadata: Metadata = {
  title: 'Pet Transportation Services & Pricing',
  description:
    'Door-to-door international transport, flight-only booking, documentation, customs clearance, IATA crating, and pet relocation consulting — full service breakdown.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Pet Transportation Services & Pricing | Pet Airlines',
    description:
      'Door-to-door international transport, flight-only booking, documentation, customs clearance, IATA crating, and consulting.',
    url: '/services',
    type: 'website',
  },
}

export default function ServicesPage() {
  return (
    <Layout>
      <JsonLd data={breadcrumbList([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }])} />
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-pet-sky via-pet-light to-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-6xl animate-float">✈️</div>
          <div className="absolute top-20 right-20 text-4xl animate-bounce" style={{animationDuration: '2s'}}>🐕</div>
          <div className="absolute bottom-10 left-1/4 text-5xl animate-wiggle">🐈</div>
          <div className="absolute bottom-20 right-1/3 text-4xl animate-float" style={{animationDelay: '1s'}}>🦜</div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-pet-navy mb-6 animate-fade-in-up">
            Complete Pet Transportation Services 🌍
          </h1>
          <p className="text-xl md:text-2xl text-pet-navy/80 max-w-3xl mx-auto animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            From full door-to-door international transport to consulting services, we've got your pet's journey covered
          </p>
        </div>
      </section>

      {/* Quick Service Overview */}
      <section className="bg-white py-6 shadow-md sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-8 overflow-x-auto">
            <a href="#tier-a" className="text-center px-4 py-2 hover:text-pet-blue transition-colors whitespace-nowrap">
              <span className="block text-2xl mb-1">✈️</span>
              <span className="text-sm font-semibold">Transport Services</span>
            </a>
            <a href="#tier-b" className="text-center px-4 py-2 hover:text-pet-orange transition-colors whitespace-nowrap">
              <span className="block text-2xl mb-1">📋</span>
              <span className="text-sm font-semibold">Support Services</span>
            </a>
            <a href="#tier-c" className="text-center px-4 py-2 hover:text-purple-500 transition-colors whitespace-nowrap">
              <span className="block text-2xl mb-1">💡</span>
              <span className="text-sm font-semibold">Consulting</span>
            </a>
          </div>
        </div>
      </section>

      {/* Tier A - Transport Services */}
      <section id="tier-a" className="py-20 scroll-mt-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-6xl mb-4 block animate-bounce" style={{animationDuration: '2s'}}>✈️</span>
            <h2 className="text-4xl font-bold text-pet-navy mb-4">Tier A - Transport Services</h2>
            <p className="text-xl text-pet-navy/70">Complete pet relocation solutions for every need</p>
          </div>

          <div className="space-y-8">
            {/* A1: Door-to-Door International */}
            <div className="bg-white rounded-3xl overflow-hidden service-card shadow-lg">
              <div className="md:flex">
                <div className="md:w-2/3 p-8 lg:p-12">
                  <div className="flex items-center mb-4">
                    <span className="text-4xl mr-3">🚪✈️🚪</span>
                    <h3 className="text-3xl font-bold text-pet-navy">Door-to-Door International Transport</h3>
                  </div>
                  <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full inline-block mb-4">
                    <span className="font-semibold">Full Service Package</span>
                  </div>
                  <p className="text-lg text-pet-navy/70 mb-6">
                    Our most comprehensive service - we handle everything from pickup at your home to delivery at your destination address.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-pet-navy mb-3">What's Included:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2 mt-1">✓</span>
                          <span className="text-gray-700">Home pickup service</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2 mt-1">✓</span>
                          <span className="text-gray-700">Airport check-in handling</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2 mt-1">✓</span>
                          <span className="text-gray-700">Airline booking & coordination</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2 mt-1">✓</span>
                          <span className="text-gray-700">Export/Import documentation</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2 mt-1">✓</span>
                          <span className="text-gray-700">Customs clearance</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <ul className="space-y-2 mt-9">
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2 mt-1">✓</span>
                          <span className="text-gray-700">Final delivery to destination</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2 mt-1">✓</span>
                          <span className="text-gray-700">Real-time WhatsApp updates</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2 mt-1">✓</span>
                          <span className="text-gray-700">24/7 support throughout journey</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2 mt-1">✓</span>
                          <span className="text-gray-700">Crate approval & confirmation</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-pet-light rounded-2xl p-6">
                    <h4 className="font-semibold text-pet-navy mb-3">Pricing by Pet Size:</h4>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-sm text-gray-600">Small (under 10kg)</p>
                        <p className="text-2xl font-bold text-pet-blue">$2,000-4,500</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Medium (10-25kg)</p>
                        <p className="text-2xl font-bold text-pet-blue">$3,500-6,500</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Large (25kg+)</p>
                        <p className="text-2xl font-bold text-pet-blue">$5,000-9,000+</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/3 bg-gradient-to-br from-green-50 to-green-100 p-8 flex flex-col justify-center">
                  <div className="bg-white rounded-2xl p-6 shadow-lg animate-float">
                    <h4 className="font-bold text-pet-navy mb-3">Popular Routes:</h4>
                    <ul className="space-y-2 text-sm">
                      <li>🇨🇦→🇰🇷 Canada to Korea: $2,500+</li>
                      <li>🇰🇷→🇻🇳 Korea to Vietnam: $2,000+</li>
                      <li>🇨🇦→🇻🇳 Canada to Vietnam: $3,000+</li>
                      <li>🇨🇦→🇫🇷 Canada to France: $3,200+</li>
                      <li>🇰🇷→🇫🇷 Korea to France: $2,800+</li>
                      <li>🇻🇳→🇫🇷 Vietnam to France: $3,500+</li>
                    </ul>
                  </div>
                  <div className="text-center mt-6">
                    <a href="/quote" className="bg-pet-orange text-white px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all inline-block">
                      Get Quote →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* A2: Flight-Only Transport */}
            <div className="bg-white rounded-3xl p-8 service-card shadow-lg">
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-3">✈️</span>
                <h3 className="text-2xl font-bold text-pet-navy">Flight-Only Transport (Airport-to-Airport)</h3>
              </div>
              <p className="text-lg text-pet-navy/70 mb-4">
                Perfect for pet owners who can handle ground transportation but need professional flight booking and check-in assistance.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-pet-navy mb-2">Includes:</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>✓ Airline booking & coordination</li>
                    <li>✓ Crate approval verification</li>
                    <li>✓ Export paperwork preparation</li>
                    <li>✓ Check-in assistance & flight monitoring</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-pet-navy mb-2">Does NOT Include:</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>✗ Home pickup service</li>
                    <li>✗ Customs clearance</li>
                    <li>✗ Final destination delivery</li>
                  </ul>
                  <div className="mt-4 bg-pet-light rounded-xl p-4">
                    <p className="text-sm font-semibold text-pet-navy">Price Range:</p>
                    <p className="text-xl font-bold text-pet-blue">$800 - $4,000</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Transport Services */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Door-to-Airport */}
              <div className="bg-white rounded-2xl p-6 service-card shadow-md">
                <span className="text-3xl mb-3 block">🚗→✈️</span>
                <h4 className="text-xl font-bold text-pet-navy mb-2">Door-to-Airport (Origin)</h4>
                <p className="text-gray-700 text-sm mb-4">Professional pickup and airport check-in service</p>
                <div className="bg-pet-light rounded-xl p-3">
                  <p className="text-sm text-gray-600">Local city: <span className="font-bold text-pet-blue">$100-400</span></p>
                  <p className="text-sm text-gray-600">Inter-city: <span className="font-bold text-pet-blue">$300-800</span></p>
                </div>
              </div>

              {/* Airport-to-Door */}
              <div className="bg-white rounded-2xl p-6 service-card shadow-md">
                <span className="text-3xl mb-3 block">✈️→🏠</span>
                <h4 className="text-xl font-bold text-pet-navy mb-2">Airport-to-Door (Destination)</h4>
                <p className="text-gray-700 text-sm mb-4">Safe delivery from airport to your new home</p>
                <div className="bg-pet-light rounded-xl p-3">
                  <p className="text-sm font-semibold text-pet-blue">$200 - $600</p>
                  <p className="text-xs text-gray-600 mt-1">Includes customs assistance</p>
                </div>
              </div>

              {/* Premium Pet Nanny */}
              <div className="bg-white rounded-2xl p-6 service-card shadow-md border-2 border-pet-orange">
                <span className="text-3xl mb-3 block">👩‍✈️🐾</span>
                <h4 className="text-xl font-bold text-pet-navy mb-2">Premium Pet Nanny</h4>
                <p className="text-gray-700 text-sm mb-4">In-cabin escort service for small pets</p>
                <div className="bg-pet-orange/10 rounded-xl p-3">
                  <p className="text-sm font-semibold text-pet-orange">$1,500 - $4,000+</p>
                  <p className="text-xs text-gray-600 mt-1">VIP treatment all the way!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tier B - Support Services */}
      <section id="tier-b" className="py-20 bg-white scroll-mt-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-6xl mb-4 block animate-wiggle">📋</span>
            <h2 className="text-4xl font-bold text-pet-navy mb-4">Tier B - Support Services</h2>
            <p className="text-xl text-pet-navy/70">Essential documentation and logistics support</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* B1: Paperwork & Documentation */}
            <div className="bg-yellow-50 rounded-3xl p-8 service-card border-2 border-yellow-200">
              <div className="text-center mb-6">
                <span className="text-5xl mb-4 block">📋</span>
                <h3 className="text-2xl font-bold text-pet-navy">Paperwork & Documentation</h3>
              </div>
              <p className="text-gray-700 mb-4">Complete documentation handling for stress-free travel</p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-pet-navy mb-2">Standard Services:</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>✓ Health certificate scheduling</li>
                    <li>✓ Vet appointment guidance</li>
                    <li>✓ Vaccination schedule planning</li>
                    <li>✓ Export/import permits</li>
                    <li>✓ Airline compliance check</li>
                    <li>✓ Travel timeline creation</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-xl p-4">
                  <h4 className="font-semibold text-pet-navy mb-2">Regional Specialties:</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-semibold">🇫🇷 France/EU:</span>
                      <p className="text-gray-600">EU Pet Passport, TRACES system (+$100-200)</p>
                    </div>
                    <div>
                      <span className="font-semibold">🇨🇳 China (Future):</span>
                      <p className="text-gray-600">AQSIQ registration, quarantine permits</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center bg-yellow-100 rounded-xl p-4">
                <p className="text-2xl font-bold text-yellow-800">$150 - $600</p>
              </div>
            </div>

            {/* B2: Customs Clearance */}
            <div className="bg-yellow-50 rounded-3xl p-8 service-card border-2 border-yellow-200">
              <div className="text-center mb-6">
                <span className="text-5xl mb-4 block">🚬</span>
                <h3 className="text-2xl font-bold text-pet-navy">Customs Clearance Only</h3>
              </div>
              <p className="text-gray-700 mb-4">Expert handling of import procedures at destination</p>
              
              <ul className="space-y-2 text-gray-700 mb-6">
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  Import documentation processing
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  Quarantine facility coordination
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  Government agency liaison
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  Fee payment assistance
                </li>
              </ul>
              
              <div className="text-center bg-yellow-100 rounded-xl p-4">
                <p className="text-2xl font-bold text-yellow-800">$200 - $600</p>
                <p className="text-sm text-gray-600 mt-1">Varies by country complexity</p>
              </div>
            </div>

            {/* B3: Crate Sizing & Delivery */}
            <div className="bg-yellow-50 rounded-3xl p-8 service-card border-2 border-yellow-200">
              <div className="text-center mb-6">
                <span className="text-5xl mb-4 block">📦</span>
                <h3 className="text-2xl font-bold text-pet-navy">Crate Sizing & Delivery</h3>
              </div>
              <p className="text-gray-700 mb-4">IATA-approved travel crates delivered to your door</p>
              
              <div className="space-y-4 mb-6">
                <div className="bg-white rounded-xl p-3 text-center">
                  <p className="text-sm text-gray-600">Small Crate</p>
                  <p className="text-xl font-bold text-yellow-800">$60 - $150</p>
                  <p className="text-xs text-gray-500">For pets up to 10kg</p>
                </div>
                <div className="bg-white rounded-xl p-3 text-center">
                  <p className="text-sm text-gray-600">Medium Crate</p>
                  <p className="text-xl font-bold text-yellow-800">$150 - $250</p>
                  <p className="text-xs text-gray-500">For pets 10-25kg</p>
                </div>
                <div className="bg-white rounded-xl p-3 text-center">
                  <p className="text-sm text-gray-600">Large Crate</p>
                  <p className="text-xl font-bold text-yellow-800">$200 - $400+</p>
                  <p className="text-xs text-gray-500">For pets over 25kg</p>
                </div>
              </div>
              
              <p className="text-xs text-center text-gray-600">
                ✓ Free sizing consultation<br/>
                ✓ Delivery included in most areas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tier C - Consulting */}
      <section id="tier-c" className="py-20 bg-pet-light scroll-mt-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-6xl mb-4 block animate-bounce" style={{animationDuration: '2s'}}>💡</span>
            <h2 className="text-4xl font-bold text-pet-navy mb-4">Tier C - Consulting & Advisory</h2>
            <p className="text-xl text-pet-navy/70">Expert guidance for DIY pet travelers</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Basic Consulting */}
            <div className="bg-white rounded-3xl p-8 service-card shadow-lg">
              <div className="text-center mb-6">
                <span className="text-5xl mb-4 block">💬</span>
                <h3 className="text-2xl font-bold text-pet-navy">Basic Consulting</h3>
                <p className="text-pet-navy/70">30-45 minute session</p>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span className="text-gray-700">Route planning advice</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span className="text-gray-700">Document checklist review</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span className="text-gray-700">Timeline recommendations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span className="text-gray-700">Q&A session</span>
                </li>
              </ul>
              
              <div className="text-center bg-orange-50 rounded-xl p-4">
                <p className="text-3xl font-bold text-orange-600">$50 - $150</p>
                <p className="text-sm text-gray-600 mt-2">One-time consultation</p>
              </div>
            </div>

            {/* Premium Advisory */}
            <div className="bg-white rounded-3xl p-8 service-card shadow-lg border-2 border-orange-300 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Value!
              </div>
              <div className="text-center mb-6">
                <span className="text-5xl mb-4 block">🌟</span>
                <h3 className="text-2xl font-bold text-pet-navy">Premium Advisory</h3>
                <p className="text-pet-navy/70">Full journey support</p>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span className="text-gray-700">Complete journey planning</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span className="text-gray-700">Document preparation guidance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span className="text-gray-700">Vendor recommendations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span className="text-gray-700">Ongoing WhatsApp support</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span className="text-gray-700">Emergency assistance</span>
                </li>
              </ul>
              
              <div className="text-center bg-orange-50 rounded-xl p-4">
                <p className="text-3xl font-bold text-orange-600">$150 - $350</p>
                <p className="text-sm text-gray-600 mt-2">Support until arrival</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Choosing the Right Tier */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-6xl mb-4 block">🧭</span>
            <h2 className="text-4xl font-bold text-pet-navy mb-4">Which Tier Is Right for Your Pet?</h2>
            <p className="text-xl text-pet-navy/70">A quick guide to matching the service to your situation</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-gray-700">
              <strong className="text-pet-navy">Door-to-Door (Tier A)</strong> fits owners who
              want the fewest touchpoints on their end — home pickup, airline coordination, export
              and import paperwork, customs clearance, and final delivery are all handled as one
              package. It's the right choice when the destination has import permits, quarantine
              rules, or breed restrictions that are easy to get wrong on a first attempt.
            </p>
            <p className="text-gray-700">
              <strong className="text-pet-navy">Flight-Only (also Tier A)</strong> works for owners
              who can manage ground transport and paperwork themselves but want a specialist
              handling the airline booking, crate approval, and check-in — routes with strict
              live-animal cargo policies or seasonal heat embargoes are where this matters most.
            </p>
            <p className="text-gray-700">
              <strong className="text-pet-navy">Support Services (Tier B)</strong> — documentation,
              customs clearance, or crate sizing on their own — suit owners already booking their
              own flight who need one specific piece done correctly, most often the health
              certificate and vaccination timeline or an IATA-compliant crate.
            </p>
            <p className="text-gray-700">
              <strong className="text-pet-navy">Consulting (Tier C)</strong> is for DIY travelers
              who mainly need a second opinion on their timeline, document checklist, or a
              specific destination's quarantine and import rules before they book anything
              themselves.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-pet-blue to-pet-navy text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6 animate-fade-in-up">
            Ready to Start Your Pet's Journey? 🛫
          </h2>
          <p className="text-xl mb-8 opacity-90 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Get a customized quote based on your specific needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <a href="/quote" className="bg-pet-orange text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transform hover:scale-105 transition-all inline-flex items-center justify-center">
              Get Free Quote
              <span className="ml-2">→</span>
            </a>
            <a href="https://wa.me/1234567890" className="bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transform hover:scale-105 transition-all inline-flex items-center justify-center">
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </Layout>
  )
}