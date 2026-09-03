'use client'

import { useState } from 'react'

export interface PricingTier {
  name: string
  icon: string
  basePrice: string
  description: string
  features: string[]
  popular?: boolean
  premium?: boolean
}

interface ServicePricingTabsProps {
  transportServices: PricingTier[]
  supportServices: PricingTier[]
  consultingServices: PricingTier[]
}

type TabId = 'transport' | 'support' | 'consulting'

interface TabButtonProps {
  id: TabId
  label: string
  activeTab: TabId
  onSelect: (id: TabId) => void
}

function TabButton({ id, label, activeTab, onSelect }: TabButtonProps) {
  return (
    <button
      onClick={() => onSelect(id)}
      className={`px-6 py-3 rounded-full font-semibold transition-all ${
        activeTab === id
          ? 'bg-pet-blue text-white'
          : 'bg-white text-pet-navy hover:bg-pet-blue hover:text-white'
      }`}
    >
      {label}
    </button>
  )
}

export function ServicePricingTabs({
  transportServices,
  supportServices,
  consultingServices,
}: ServicePricingTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>('transport')

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

  return (
    <>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <TabButton id="transport" label="✈️ Transport Services" activeTab={activeTab} onSelect={setActiveTab} />
        <TabButton id="support" label="📋 Support Services" activeTab={activeTab} onSelect={setActiveTab} />
        <TabButton id="consulting" label="💡 Consulting" activeTab={activeTab} onSelect={setActiveTab} />
      </div>

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
              <p className={`text-3xl font-bold ${service.premium ? 'text-purple-600' : 'text-pet-blue'}`}>
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
                    <span className={`mr-2 mt-1 ${feature.includes('No ') ? 'text-red-500' : 'text-green-500'}`}>
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
              <h4 className="font-semibold text-pet-navy mb-2">What&apos;s Special:</h4>
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
    </>
  )
}
