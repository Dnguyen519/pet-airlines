'use client'

import { useState } from 'react'

const ROUTE_MULTIPLIERS: Record<string, number> = {
  'CA-KR': 1.2,
  'KR-VN': 1,
  'CA-VN': 1.5,
  'CA-FR': 1.6,
  other: 1.3,
}

export function PriceEstimator() {
  const [petSize, setPetSize] = useState('small')
  const [serviceType, setServiceType] = useState('doorToDoor')
  const [route, setRoute] = useState('CA-KR')

  const calculateEstimate = () => {
    let basePrice = 2000

    if (petSize === 'medium') basePrice *= 1.5
    if (petSize === 'large') basePrice *= 2.2

    if (serviceType === 'flightOnly') basePrice *= 0.4
    if (serviceType === 'consulting') basePrice = 150

    basePrice *= ROUTE_MULTIPLIERS[route] || 1

    const minPrice = Math.round(basePrice * 0.8)
    const maxPrice = Math.round(basePrice * 1.2)

    return `$${minPrice.toLocaleString()} - $${maxPrice.toLocaleString()}`
  }

  return (
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
  )
}
