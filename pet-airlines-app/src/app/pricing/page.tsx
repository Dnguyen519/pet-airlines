'use client'

import { useState } from 'react'
import Layout from '@/components/layout/Layout'

interface PricingTier {
  name: string
  icon: string
  basePrice: string
  description: string
  features: string[]
  popular?: boolean
  premium?: boolean
}

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState<'transport' | 'support' | 'consulting'>('transport')
  const [petSize, setPetSize] = useState('small')
  const [serviceType, setServiceType] = useState('doorToDoor')
  const [route, setRoute] = useState('CA-KR')

  const calculateEstimate = () => {
    let basePrice = 2000
    
    // Size adjustments
    if (petSize === 'medium') basePrice *= 1.5
    if (petSize === 'large') basePrice *= 2.2
    
    // Service adjustments
    if (serviceType === 'flightOnly') basePrice *= 0.4
    if (serviceType === 'consulting') basePrice = 150
    
    // Route adjustments
    const routeMultipliers: Record<string, number> = {
      'CA-KR': 1.2,
      'KR-VN': 1,
      'CA-VN': 1.5,
      'CA-FR': 1.6,
      'other': 1.3
    }
    basePrice *= routeMultipliers[route] || 1
    
    const minPrice = Math.round(basePrice * 0.8)
    const maxPrice = Math.round(basePrice * 1.2)
    
    return `$${minPrice.toLocaleString()} - $${maxPrice.toLocaleString()}`
  }

  const transportServices: PricingTier[] = [
    {
      name: 'Door-to-Door International',
      icon: '🚪✈️🚪',
      basePrice: '$2,800 - $5,500',
      description: 'Complete service from pickup to delivery',
      popular: true,
      features: [
        'Home pickup & delivery',
        'All documentation',
        'Airport handling',
        'Customs clearance',
        '24/7 support'
      ]
    },
    {
      name: 'Flight-Only Transport',
      icon: '✈️',
      basePrice: '$800 - $2,200',
      description: 'Airport to airport service',
      features: [
        'Airline booking',
        'Check-in assistance',
        'Basic documentation',
        'Flight monitoring',
        'No ground transport'
      ]
    },
    {
      name: 'Ground Transport Only',
      icon: '🚗',
      basePrice: '$150 - $600',
      description: 'Local pickup and delivery',
      features: [
        'Door-to-airport transfer',
        'Airport-to-door delivery',
        'Inter-city transport',
        'Professional handling'
      ]
    }
  ]

  const supportServices: PricingTier[] = [
    {
      name: 'Documentation Services',
      icon: '📄',
      basePrice: '$300 - $500',
      description: 'Complete paperwork handling',
      features: [
        'Health certificates',
        'Import/export permits',
        'Airline compliance',
        'Vet coordination'
      ]
    },
    {
      name: 'Customs Clearance',
      icon: '🛃',
      basePrice: '$200 - $400',
      description: 'Professional customs handling',
      features: [
        'Import processing',
        'Quarantine handling',
        'Fee payments',
        'Document submission'
      ]
    },
    {
      name: 'Travel Crates',
      icon: '📦',
      basePrice: '$150 - $400',
      description: 'IATA-approved transport crates',
      features: [
        'Size-appropriate crates',
        'IATA compliance',
        'Door delivery',
        'Assembly instructions'
      ]
    }
  ]

  const consultingServices: PricingTier[] = [
    {
      name: 'Basic Consulting',
      icon: '💬',
      basePrice: '$75',
      description: '30-45 minute consultation',
      features: [
        'Route planning help',
        'Document checklist review',
        'Timeline guidance',
        'Quick questions',
        'DIY traveler support'
      ]
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
        'Emergency guidance'
      ]
    }
  ]

  const getCurrentServices = () => {
    switch (activeTab) {
      case 'transport':
        return transportServices
      case 'support':
        return supportServices
      case 'consulting':
        return consultingServices
      default:
        return transportServices
    }
  }

  const TabButton = ({ id, label, isActive }: { id: string; label: string; isActive: boolean }) => (
    <button
      onClick={() => setActiveTab(id as any)}
      className={`px-6 py-3 rounded-full font-semibold transition-all ${
        isActive 
          ? 'bg-pet-blue text-white' 
          : 'bg-white text-pet-navy hover:bg-pet-blue hover:text-white'
      }`}
    >
      {label}
    </button>
  )

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-pet-sky via-pet-light to-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-6xl animate-float">💰</div>
          <div className="absolute top-20 right-20 text-4xl animate-float" style={{animationDelay: '0.5s'}}>🏷️</div>
          <div className="absolute bottom-10 left-1/4 text-5xl animate-float" style={{animationDelay: '1s'}}>📊</div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-pet-navy mb-6">
            Transparent Pet Travel Pricing 💸
          </h1>
          <p className="text-xl md:text-2xl text-pet-navy/80 max-w-3xl mx-auto">
            No hidden fees, no surprises. Every cost explained clearly.
          </p>
        </div>
      </section>

      {/* Pricing Calculator */}
      <section className="py-16 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-pet-navy mb-4">Quick Price Estimator 🧮</h2>
            <p className="text-gray-600">Get an instant estimate for your pet's journey</p>
          </div>

          <div className="max-w-4xl mx-auto bg-pet-light rounded-3xl p-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-pet-navy mb-2">Pet Size</label>
                <select 
                  value={petSize}
                  onChange={(e) => setPetSize(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-pet-blue/20 focus:border-pet-orange transition-all"
                >
                  <option value="small">Small (under 10kg)</option>
                  <option value="medium">Medium (10-25kg)</option>
                  <option value="large">Large (25kg+)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-pet-navy mb-2">Service Type</label>
                <select 
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-pet-blue/20 focus:border-pet-orange transition-all"
                >
                  <option value="doorToDoor">Door-to-Door (Full Service)</option>
                  <option value="flightOnly">Flight Only</option>
                  <option value="consulting">Consulting Only</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-pet-navy mb-2">Route</label>
                <select 
                  value={route}
                  onChange={(e) => setRoute(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-pet-blue/20 focus:border-pet-orange transition-all"
                >
                  <option value="CA-KR">Canada → Korea</option>
                  <option value="KR-VN">Korea → Vietnam</option>
                  <option value="CA-VN">Canada → Vietnam</option>
                  <option value="CA-FR">Canada → France</option>
                  <option value="other">Other Route</option>
                </select>
              </div>
            </div>
            
            <div className="mt-8 text-center bg-white rounded-2xl p-6">
              <p className="text-sm text-gray-600 mb-2">Estimated Price Range:</p>
              <p className="text-4xl font-bold text-pet-blue">{calculateEstimate()}</p>
              <p className="text-xs text-gray-500 mt-2">*Final price depends on specific requirements</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Pricing Tabs */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-pet-navy text-center mb-12">
            Detailed Service Pricing 📋
          </h2>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <TabButton id="transport" label="✈️ Transport Services" isActive={activeTab === 'transport'} />
            <TabButton id="support" label="📋 Support Services" isActive={activeTab === 'support'} />
            <TabButton id="consulting" label="💡 Consulting" isActive={activeTab === 'consulting'} />
          </div>

          {/* Service Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getCurrentServices().map((service, index) => (
              <div 
                key={index}
                className={`bg-white rounded-3xl p-8 shadow-lg transition-all duration-300 hover:transform hover:-translate-y-2 ${
                  service.popular ? 'border-2 border-pet-orange' : ''
                } ${
                  service.premium ? 'bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300' : ''
                }`}
              >
                <div className="text-center mb-6">
                  <span className="text-5xl">{service.icon}</span>
                  <h3 className="text-2xl font-bold text-pet-navy mt-4">{service.name}</h3>
                  {service.popular && (
                    <span className="bg-pet-orange text-white px-3 py-1 rounded-full text-sm">Most Popular</span>
                  )}
                  {service.premium && (
                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">Best Value</span>
                  )}
                </div>
                
                <div className="text-center mb-6">
                  <p className={`text-3xl font-bold ${
                    service.premium ? 'text-purple-600' : 'text-pet-blue'
                  }`}>
                    {service.basePrice}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">{service.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-pet-navy mb-3">
                    {activeTab === 'consulting' ? 'Perfect for:' : 'Includes:'}
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <span className={`mr-2 mt-1 ${
                          feature.includes('No ') ? 'text-red-500' : 'text-green-500'
                        }`}>
                          {feature.includes('No ') ? '✗' : '✓'}
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Pet Nanny Service (Transport tab only) */}
          {activeTab === 'transport' && (
            <div className="mt-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-8 shadow-lg">
              <div className="text-center mb-6">
                <span className="text-5xl">👩‍✈️🐾</span>
                <h3 className="text-2xl font-bold text-pet-navy mt-4">Premium Pet Nanny Service</h3>
                <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">VIP Experience</span>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600">$3,500+</p>
                  <p className="text-sm text-gray-600 mt-2">In-cabin escort service</p>
                </div>
                <div>
                  <h4 className="font-semibold text-pet-navy mb-2">What's Special:</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>✓ Personal escort in cabin</li>
                    <li>✓ Constant companionship</li>
                    <li>✓ No cargo hold travel</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-pet-navy mb-2">Requirements:</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Small pets only (under 8kg)</li>
                    <li>• Advance booking required</li>
                    <li>• Limited availability</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
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
                  { title: '24/7 support', desc: 'Always available during travel' }
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
                  { title: 'Special requirements', desc: 'Oversized pets, special care needs' }
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

      {/* Price Promise */}
      <section className="py-20 bg-gradient-to-br from-pet-orange/10 to-pet-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-3xl p-12 shadow-xl">
            <span className="text-6xl mb-6 block">🏆</span>
            <h2 className="text-3xl font-bold text-pet-navy mb-4">
              Our Price Promise
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              We believe in fair, transparent pricing. If you find a lower quote for the same service level from a licensed pet transporter, we'll match it!
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
                <p className="text-sm text-gray-600">Price won't change after booking</p>
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
            Every pet's journey is unique. Let us create the perfect plan for yours.
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