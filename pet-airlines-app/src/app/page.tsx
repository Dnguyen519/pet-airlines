'use client'

import Layout from '@/components/layout/Layout'

export default function HomePage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-pet-light via-white to-pet-sky/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-pet-navy mb-6">
                International Pet Transportation Made Simple
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Door-to-door service for your furry family members. 
                From Canada, Korea, Vietnam to anywhere in the world.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/quote" className="inline-flex items-center justify-center bg-pet-orange text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-opacity-90 transition-all">
                  Get Free Quote
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
                <a href="/how-it-works" className="inline-flex items-center justify-center border-2 border-pet-navy text-pet-navy px-8 py-4 rounded-full font-semibold text-lg hover:bg-pet-navy hover:text-white transition-all">
                  How It Works
                </a>
              </div>
              <div className="mt-8 flex items-center space-x-6 text-sm text-gray-600">
                <span className="flex items-center">✓ Licensed & Insured</span>
                <span className="flex items-center">✓ 24/7 Support</span>
                <span className="flex items-center">✓ Real-time Updates</span>
              </div>
            </div>
            <div className="relative">
              <div className="bg-pet-blue/10 rounded-3xl p-8 text-center">
                <div className="text-8xl mb-4 animate-float">✈️</div>
                <div className="flex justify-center space-x-4 text-6xl">
                  <span className="animate-float" style={{animationDelay: '0.5s'}}>🐕</span>
                  <span className="animate-float" style={{animationDelay: '1s'}}>🐈</span>
                  <span className="animate-float" style={{animationDelay: '1.5s'}}>🦜</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Tiers */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-pet-navy mb-4">Our Service Packages</h2>
            <p className="text-xl text-gray-600">Choose the perfect solution for your pet's journey</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Tier A */}
            <div className="bg-green-50 rounded-3xl p-8 border-2 border-green-200 hover:shadow-lg transition-all">
              <div className="text-center mb-6">
                <span className="text-5xl">✈️</span>
                <h3 className="text-2xl font-bold text-green-800 mt-4">Transport Services</h3>
                <p className="text-green-700">Complete door-to-door solutions</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">✓</span>
                  <span className="text-gray-700">Full international transport</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">✓</span>
                  <span className="text-gray-700">Flight-only options</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">✓</span>
                  <span className="text-gray-700">Premium pet nanny service</span>
                </li>
              </ul>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Starting from</p>
                <p className="text-3xl font-bold text-green-800">$800</p>
              </div>
            </div>

            {/* Tier B */}
            <div className="bg-yellow-50 rounded-3xl p-8 border-2 border-yellow-200 hover:shadow-lg transition-all">
              <div className="text-center mb-6">
                <span className="text-5xl">📋</span>
                <h3 className="text-2xl font-bold text-yellow-800 mt-4">Support Services</h3>
                <p className="text-yellow-700">Documentation & logistics help</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2 mt-1">✓</span>
                  <span className="text-gray-700">Complete paperwork handling</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2 mt-1">✓</span>
                  <span className="text-gray-700">Customs clearance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2 mt-1">✓</span>
                  <span className="text-gray-700">Crate sizing & delivery</span>
                </li>
              </ul>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Starting from</p>
                <p className="text-3xl font-bold text-yellow-800">$150</p>
              </div>
            </div>

            {/* Tier C */}
            <div className="bg-orange-50 rounded-3xl p-8 border-2 border-orange-200 hover:shadow-lg transition-all">
              <div className="text-center mb-6">
                <span className="text-5xl">💡</span>
                <h3 className="text-2xl font-bold text-orange-800 mt-4">Consulting</h3>
                <p className="text-orange-700">Expert guidance & planning</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2 mt-1">✓</span>
                  <span className="text-gray-700">30-45 min consultations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2 mt-1">✓</span>
                  <span className="text-gray-700">Full journey planning</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2 mt-1">✓</span>
                  <span className="text-gray-700">Custom solutions</span>
                </li>
              </ul>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Starting from</p>
                <p className="text-3xl font-bold text-orange-800">$50</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-20 bg-pet-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-pet-navy mb-4">Popular Routes</h2>
            <p className="text-xl text-gray-600">We connect pets with their families worldwide</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">🇨🇦</span>
                <span className="text-gray-400">→</span>
                <span className="text-2xl">🇰🇷</span>
              </div>
              <h4 className="font-semibold text-pet-navy mb-2">Canada → Korea</h4>
              <p className="text-sm text-gray-600 mb-3">Direct flights available</p>
              <p className="text-pet-blue font-bold">From $2,500</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">🇰🇷</span>
                <span className="text-gray-400">→</span>
                <span className="text-2xl">🇻🇳</span>
              </div>
              <h4 className="font-semibold text-pet-navy mb-2">Korea → Vietnam</h4>
              <p className="text-sm text-gray-600 mb-3">Popular regional route</p>
              <p className="text-pet-blue font-bold">From $2,000</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">🇨🇦</span>
                <span className="text-gray-400">→</span>
                <span className="text-2xl">🇻🇳</span>
              </div>
              <h4 className="font-semibold text-pet-navy mb-2">Canada → Vietnam</h4>
              <p className="text-sm text-gray-600 mb-3">Complete door-to-door</p>
              <p className="text-pet-blue font-bold">From $3,000</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">🇨🇦</span>
                <span className="text-gray-400">→</span>
                <span className="text-2xl">🇫🇷</span>
              </div>
              <h4 className="font-semibold text-pet-navy mb-2">Canada → France</h4>
              <p className="text-sm text-gray-600 mb-3">EU compliance included</p>
              <p className="text-pet-blue font-bold">From $3,200</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">🇰🇷</span>
                <span className="text-gray-400">→</span>
                <span className="text-2xl">🇫🇷</span>
              </div>
              <h4 className="font-semibold text-pet-navy mb-2">Korea → France</h4>
              <p className="text-sm text-gray-600 mb-3">Full EU documentation</p>
              <p className="text-pet-blue font-bold">From $2,800</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">🇻🇳</span>
                <span className="text-gray-400">→</span>
                <span className="text-2xl">🇫🇷</span>
              </div>
              <h4 className="font-semibold text-pet-navy mb-2">Vietnam → France</h4>
              <p className="text-sm text-gray-600 mb-3">Specialized handling</p>
              <p className="text-pet-blue font-bold">From $3,500</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <a href="/routes" className="text-pet-blue font-semibold hover:underline">
              View All Routes →
            </a>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-pet-navy mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple process, professional results</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-pet-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📋</span>
              </div>
              <h4 className="font-semibold text-pet-navy mb-2">1. Submit Inquiry</h4>
              <p className="text-sm text-gray-600">Tell us about your pet and travel needs</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-pet-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💰</span>
              </div>
              <h4 className="font-semibold text-pet-navy mb-2">2. Get Quote</h4>
              <p className="text-sm text-gray-600">Receive transparent pricing within 24h</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-pet-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📦</span>
              </div>
              <h4 className="font-semibold text-pet-navy mb-2">3. Prepare</h4>
              <p className="text-sm text-gray-600">We handle all paperwork and logistics</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-pet-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✈️</span>
              </div>
              <h4 className="font-semibold text-pet-navy mb-2">4. Travel Safe</h4>
              <p className="text-sm text-gray-600">Real-time updates throughout journey</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-20 bg-pet-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-pet-blue mb-2">500+</div>
              <p className="text-gray-600">Pets Transported</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-pet-blue mb-2">50+</div>
              <p className="text-gray-600">Countries Served</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-pet-blue mb-2">24/7</div>
              <p className="text-gray-600">Customer Support</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-pet-blue mb-2">100%</div>
              <p className="text-gray-600">Safe Arrivals</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-pet-blue to-pet-navy text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Pet's Journey?</h2>
          <p className="text-xl mb-8 opacity-90">Get a free quote in less than 24 hours</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/quote" className="bg-pet-orange text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transform hover:scale-105 transition-all inline-flex items-center justify-center">
              Get Started Now
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
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