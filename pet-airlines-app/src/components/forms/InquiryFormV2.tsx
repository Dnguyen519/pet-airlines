'use client'

import { useState, useEffect } from 'react'
import { supabase, submitInquiry, getCountries, type Country } from '@/lib/supabase'
import { getCitiesForCountry, type City } from '@/lib/supabase-client'

export default function InquiryForm() {
  const [countries, setCountries] = useState<Country[]>([])
  const [fromCities, setFromCities] = useState<City[]>([])
  const [toCities, setToCities] = useState<City[]>([])
  const [loadingFromCities, setLoadingFromCities] = useState(false)
  const [loadingToCities, setLoadingToCities] = useState(false)
  const [showPopularRoutes, setShowPopularRoutes] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    // Pet Information
    pet_type: '',
    pet_breed: '',
    pet_weight_kg: '',
    pet_count: 1,
    
    // Travel Information
    from_country_id: '',
    from_city: '',
    to_country_id: '',
    to_city: '',
    travel_date: '',
    
    // Customer Information
    full_name: '',
    email: '',
    phone: '',
    
    // Additional Context
    special_requests: ''
  })

  // Popular routes for quick selection
  const popularRoutes = [
    { from: 'CA', to: 'KR', label: '🇨🇦 Canada → 🇰🇷 Korea' },
    { from: 'US', to: 'JP', label: '🇺🇸 USA → 🇯🇵 Japan' },
    { from: 'CA', to: 'CN', label: '🇨🇦 Canada → 🇨🇳 China' },
    { from: 'US', to: 'AU', label: '🇺🇸 USA → 🇦🇺 Australia' },
    { from: 'CA', to: 'VN', label: '🇨🇦 Canada → 🇻🇳 Vietnam' },
    { from: 'US', to: 'UK', label: '🇺🇸 USA → 🇬🇧 UK' },
  ]

  useEffect(() => {
    loadCountries()
  }, [])

  const loadCountries = async () => {
    const countriesData = await getCountries()
    setCountries(countriesData)
  }

  const loadCitiesForCountry = async (countryId: string, type: 'from' | 'to') => {
    if (type === 'from') {
      setLoadingFromCities(true)
      const cities = await getCitiesForCountry(countryId)
      setFromCities(cities)
      setLoadingFromCities(false)
    } else {
      setLoadingToCities(true)
      const cities = await getCitiesForCountry(countryId)
      setToCities(cities)
      setLoadingToCities(false)
    }
  }

  const handlePopularRouteClick = async (route: { from: string; to: string }) => {
    const fromCountry = countries.find(c => c.code === route.from)
    const toCountry = countries.find(c => c.code === route.to)
    
    if (fromCountry && toCountry) {
      setFormData(prev => ({
        ...prev,
        from_country_id: fromCountry.id,
        to_country_id: toCountry.id,
        from_city: '',
        to_city: ''
      }))
      
      // Load cities for both countries
      await Promise.all([
        loadCitiesForCountry(fromCountry.id, 'from'),
        loadCitiesForCountry(toCountry.id, 'to')
      ])
      
      setShowPopularRoutes(false)
    }
  }

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Update city options when country changes
    if (name === 'from_country_id' && value) {
      setFormData(prev => ({ ...prev, from_city: '' }))
      await loadCitiesForCountry(value, 'from')
    }
    
    if (name === 'to_country_id' && value) {
      setFormData(prev => ({ ...prev, to_city: '' }))
      await loadCitiesForCountry(value, 'to')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Convert form data to match database schema
      const inquiryData = {
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        pet_type: formData.pet_type as any,
        pet_breed: formData.pet_breed,
        pet_weight_kg: formData.pet_weight_kg ? parseFloat(formData.pet_weight_kg) : null,
        pet_count: formData.pet_count,
        from_country_id: formData.from_country_id || null,
        from_city: formData.from_city,
        to_country_id: formData.to_country_id || null,
        to_city: formData.to_city,
        travel_date: formData.travel_date || null,
        special_requests: formData.special_requests,
        preferred_language: 'en'
      }

      const result = await submitInquiry(inquiryData)
      console.log('Inquiry submitted successfully:', result)
      
      // Send confirmation emails
      try {
        const fromCountry = countries.find(c => c.id === formData.from_country_id)
        const toCountry = countries.find(c => c.id === formData.to_country_id)
        
        const emailData = {
          fullName: formData.full_name,
          email: formData.email,
          inquiryNumber: result.inquiry_number,
          petType: formData.pet_type,
          originCountry: fromCountry?.name || formData.from_city,
          destinationCountry: toCountry?.name || formData.to_city,
          travelDate: formData.travel_date || 'To be determined',
          language: 'en'
        }
        
        const emailResponse = await fetch('/api/send-inquiry-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailData),
        })
        
        if (!emailResponse.ok) {
          console.error('Failed to send confirmation emails')
        }
      } catch (emailError) {
        console.error('Error sending emails:', emailError)
      }
      
      setSubmitStatus('success')
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          pet_type: '',
          pet_breed: '',
          pet_weight_kg: '',
          pet_count: 1,
          from_country_id: '',
          from_city: '',
          to_country_id: '',
          to_city: '',
          travel_date: '',
          full_name: '',
          email: '',
          phone: '',
          special_requests: ''
        })
        setFromCities([])
        setToCities([])
        setShowPopularRoutes(true)
        setSubmitStatus('idle')
      }, 5000)

    } catch (error) {
      console.error('Error submitting inquiry:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === 'success') {
    return (
      <div className="card max-w-2xl mx-auto text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold text-pet-navy mb-4">Thank You!</h2>
        <p className="text-lg text-gray-700 mb-6">
          Your inquiry has been submitted successfully. We'll respond within 24 hours with a detailed quote.
        </p>
        <div className="bg-pet-light rounded-2xl p-4">
          <p className="text-sm text-pet-navy font-medium">
            Check your email for a confirmation message, and feel free to reach out if you have any questions!
          </p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Popular Routes Quick Selection */}
      {showPopularRoutes && (
        <div className="card">
          <h3 className="font-semibold text-pet-navy mb-3">Popular Routes</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {popularRoutes.map((route) => (
              <button
                key={`${route.from}-${route.to}`}
                type="button"
                onClick={() => handlePopularRouteClick(route)}
                className="px-4 py-2 text-sm border-2 border-gray-200 rounded-lg hover:border-pet-orange hover:bg-pet-light transition-colors text-left"
              >
                {route.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Pet Information */}
      <div className="card">
        <h3 className="text-xl font-semibold text-pet-navy mb-6">Pet Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pet Type <span className="text-red-500">*</span>
            </label>
            <select
              name="pet_type"
              value={formData.pet_type}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pet-orange focus:border-pet-orange"
            >
              <option value="">Select pet type</option>
              <option value="dog">🐕 Dog</option>
              <option value="cat">🐱 Cat</option>
              <option value="bird">🦜 Bird</option>
              <option value="rabbit">🐰 Rabbit</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Breed
            </label>
            <input
              type="text"
              name="pet_breed"
              value={formData.pet_breed}
              onChange={handleInputChange}
              placeholder="e.g., Golden Retriever"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pet-orange focus:border-pet-orange"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Weight (kg)
            </label>
            <input
              type="number"
              name="pet_weight_kg"
              value={formData.pet_weight_kg}
              onChange={handleInputChange}
              min="0"
              step="0.1"
              placeholder="e.g., 15.5"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pet-orange focus:border-pet-orange"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Pets
            </label>
            <input
              type="number"
              name="pet_count"
              value={formData.pet_count}
              onChange={handleInputChange}
              min="1"
              max="10"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pet-orange focus:border-pet-orange"
            />
          </div>
        </div>
      </div>

      {/* Travel Information */}
      <div className="card">
        <h3 className="text-xl font-semibold text-pet-navy mb-6">Travel Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From Country <span className="text-red-500">*</span>
            </label>
            <select
              name="from_country_id"
              value={formData.from_country_id}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pet-orange focus:border-pet-orange"
            >
              <option value="">Select country</option>
              {countries.map(country => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From City <span className="text-red-500">*</span>
            </label>
            <select
              name="from_city"
              value={formData.from_city}
              onChange={handleInputChange}
              required
              disabled={!formData.from_country_id || loadingFromCities}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pet-orange focus:border-pet-orange disabled:bg-gray-100"
            >
              <option value="">
                {loadingFromCities ? 'Loading cities...' : 'Select city'}
              </option>
              {fromCities.map(city => (
                <option key={city.id} value={city.name}>
                  {city.name}
                  {city.is_major_city && ' ⭐'}
                  {city.airport_codes?.length > 0 && ` (${city.airport_codes.join(', ')})`}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To Country <span className="text-red-500">*</span>
            </label>
            <select
              name="to_country_id"
              value={formData.to_country_id}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pet-orange focus:border-pet-orange"
            >
              <option value="">Select country</option>
              {countries.map(country => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To City <span className="text-red-500">*</span>
            </label>
            <select
              name="to_city"
              value={formData.to_city}
              onChange={handleInputChange}
              required
              disabled={!formData.to_country_id || loadingToCities}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pet-orange focus:border-pet-orange disabled:bg-gray-100"
            >
              <option value="">
                {loadingToCities ? 'Loading cities...' : 'Select city'}
              </option>
              {toCities.map(city => (
                <option key={city.id} value={city.name}>
                  {city.name}
                  {city.is_major_city && ' ⭐'}
                  {city.airport_codes?.length > 0 && ` (${city.airport_codes.join(', ')})`}
                </option>
              ))}
            </select>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Travel Date
            </label>
            <input
              type="date"
              name="travel_date"
              value={formData.travel_date}
              onChange={handleInputChange}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pet-orange focus:border-pet-orange"
            />
          </div>
        </div>
      </div>

      {/* Customer Information */}
      <div className="card">
        <h3 className="text-xl font-semibold text-pet-navy mb-6">Your Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pet-orange focus:border-pet-orange"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pet-orange focus:border-pet-orange"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+1 (555) 123-4567"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pet-orange focus:border-pet-orange"
            />
          </div>
        </div>
      </div>

      {/* Special Requests */}
      <div className="card">
        <h3 className="text-xl font-semibold text-pet-navy mb-6">Additional Information</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Special Requests or Health Conditions
          </label>
          <textarea
            name="special_requests"
            value={formData.special_requests}
            onChange={handleInputChange}
            rows={4}
            placeholder="Tell us about any special needs, medications, or specific requirements for your pet..."
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pet-orange focus:border-pet-orange"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-8 py-3 rounded-full font-semibold text-white transition-all ${
            isSubmitting 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-pet-orange hover:bg-pet-orange-dark hover:scale-105 transform'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Submitting...
            </span>
          ) : (
            'Get Your Free Quote'
          )}
        </button>
      </div>

      {/* Error Message */}
      {submitStatus === 'error' && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
          Sorry, there was an error submitting your inquiry. Please try again or contact us directly.
        </div>
      )}
    </form>
  )
}