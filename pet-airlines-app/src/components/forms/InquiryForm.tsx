'use client'

import { useState, useEffect } from 'react'
import { supabase, submitInquiry, getCountries, type Country } from '@/lib/supabase'
import { getCitiesForCountry } from '@/data/cities'

export default function InquiryForm() {
  const [countries, setCountries] = useState<Country[]>([])
  const [fromCities, setFromCities] = useState<string[]>([])
  const [toCities, setToCities] = useState<string[]>([])
  const [showPopularRoutes, setShowPopularRoutes] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    // Pet Information (MVP essential fields)
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

  useEffect(() => {
    loadCountries()
  }, [])
  
  useEffect(() => {
    // Initialize city lists when countries are first loaded
    if (countries.length > 0 && fromCities.length === 0 && toCities.length === 0) {
      if (formData.from_country_id) {
        const fromCountry = countries.find(c => c.id === formData.from_country_id)
        if (fromCountry) {
          setFromCities(getCitiesForCountry(fromCountry.code))
        }
      }
      if (formData.to_country_id) {
        const toCountry = countries.find(c => c.id === formData.to_country_id)
        if (toCountry) {
          setToCities(getCitiesForCountry(toCountry.code))
        }
      }
    }
  }, [countries]) // Only depend on countries loading

  const loadCountries = async () => {
    const countriesData = await getCountries()
    setCountries(countriesData)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Update city options when country changes
    if (name === 'from_country_id' && value) {
      const selectedCountry = countries.find(c => c.id === value)
      if (selectedCountry) {
        const cities = getCitiesForCountry(selectedCountry.code)
        setFromCities(cities)
        // Reset city selection when country changes
        setFormData(prev => ({ ...prev, from_city: '' }))
      } else {
        setFromCities([])
      }
    }
    
    if (name === 'to_country_id' && value) {
      const selectedCountry = countries.find(c => c.id === value)
      if (selectedCountry) {
        const cities = getCitiesForCountry(selectedCountry.code)
        setToCities(cities)
        // Reset city selection when country changes
        setFormData(prev => ({ ...prev, to_city: '' }))
      } else {
        setToCities([])
      }
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
        preferred_language: 'en' // MVP: English only
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
          language: 'en' // MVP: English only
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
        } else {
          console.log('Confirmation emails sent successfully')
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
        setSubmitStatus('idle')
      }, 3000)

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
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-pet-navy mb-4">Get Your Free Quote</h1>
        <p className="text-lg text-gray-600">Tell us about your pet's journey and receive a detailed quote within 24 hours</p>
      </div>

      {/* Popular Routes Quick Selection */}
      {showPopularRoutes && (
        <div className="card mb-8">
          <h3 className="text-lg font-semibold text-pet-navy mb-4 flex items-center justify-between">
            <span>🚀 Popular Routes</span>
            <button 
              type="button"
              onClick={() => setShowPopularRoutes(false)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { fromCode: 'CA', fromCity: 'Toronto', toCode: 'KR', toCity: 'Seoul', label: '🇨🇦 Canada → 🇰🇷 Korea' },
              { fromCode: 'KR', fromCity: 'Seoul', toCode: 'VN', toCity: 'Ho Chi Minh City', label: '🇰🇷 Korea → 🇻🇳 Vietnam' },
              { fromCode: 'CA', fromCity: 'Vancouver', toCode: 'VN', toCity: 'Hanoi', label: '🇨🇦 Canada → 🇻🇳 Vietnam' },
              { fromCode: 'CA', fromCity: 'Montreal', toCode: 'FR', toCity: 'Paris', label: '🇨🇦 Canada → 🇫🇷 France' },
              { fromCode: 'KR', fromCity: 'Busan', toCode: 'FR', toCity: 'Paris', label: '🇰🇷 Korea → 🇫🇷 France' },
              { fromCode: 'VN', fromCity: 'Da Nang', toCode: 'FR', toCity: 'Lyon', label: '🇻🇳 Vietnam → 🇫🇷 France' }
            ].map((route, index) => {
              const fromCountry = countries.find(c => c.code === route.fromCode)
              const toCountry = countries.find(c => c.code === route.toCode)
              
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    if (fromCountry && toCountry) {
                      setFormData(prev => ({
                        ...prev,
                        from_country_id: fromCountry.id,
                        from_city: route.fromCity,
                        to_country_id: toCountry.id,
                        to_city: route.toCity
                      }))
                      // Update city lists
                      setFromCities(getCitiesForCountry(route.fromCode))
                      setToCities(getCitiesForCountry(route.toCode))
                    }
                  }}
                  className="text-sm py-2 px-3 bg-pet-light rounded-xl hover:bg-pet-blue/20 transition-all text-center"
                >
                  {route.label}
                </button>
              )
            })}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Pet Information */}
        <div className="card">
          <h2 className="text-2xl font-bold text-pet-navy mb-6 flex items-center">
            <span className="text-3xl mr-3">🐾</span>
            Pet Information
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="pet_type" className="block text-sm font-semibold text-pet-navy mb-2">
                Pet Type <span className="text-red-500">*</span>
              </label>
              <select 
                id="pet_type" 
                name="pet_type" 
                required 
                value={formData.pet_type}
                onChange={handleInputChange}
                className="input-field"
              >
                <option value="">Select pet type</option>
                <option value="dog">🐕 Dog</option>
                <option value="cat">🐈 Cat</option>
                <option value="bird">🦜 Bird</option>
                <option value="rabbit">🐰 Rabbit</option>
                <option value="other">🦎 Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="pet_breed" className="block text-sm font-semibold text-pet-navy mb-2">
                Breed <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                id="pet_breed" 
                name="pet_breed" 
                required 
                value={formData.pet_breed}
                onChange={handleInputChange}
                placeholder="e.g., Golden Retriever" 
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="pet_weight_kg" className="block text-sm font-semibold text-pet-navy mb-2">
                Weight (kg) <span className="text-red-500">*</span>
              </label>
              <input 
                type="number" 
                id="pet_weight_kg" 
                name="pet_weight_kg" 
                required 
                value={formData.pet_weight_kg}
                onChange={handleInputChange}
                placeholder="e.g., 15" 
                step="0.1"
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="pet_count" className="block text-sm font-semibold text-pet-navy mb-2">
                Number of Pets <span className="text-red-500">*</span>
              </label>
              <select 
                id="pet_count" 
                name="pet_count" 
                required 
                value={formData.pet_count}
                onChange={handleInputChange}
                className="input-field"
              >
                <option value={1}>1 Pet</option>
                <option value={2}>2 Pets</option>
                <option value={3}>3 Pets</option>
                <option value={4}>4+ Pets</option>
              </select>
            </div>
          </div>
        </div>

        {/* Travel Information */}
        <div className="card">
          <h2 className="text-2xl font-bold text-pet-navy mb-6 flex items-center">
            <span className="text-3xl mr-3">✈️</span>
            Travel Information
          </h2>
          
          {/* Helpful tip */}
          <div className="bg-pet-light rounded-xl p-4 mb-6">
            <p className="text-sm text-pet-navy">
              💡 <strong>Tip:</strong> Select your country first, then choose from popular cities. Don't see your city? Select "Other" and specify in the special requests section.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="from_country_id" className="block text-sm font-semibold text-pet-navy mb-2">
                From Country <span className="text-red-500">*</span>
              </label>
              <select 
                id="from_country_id" 
                name="from_country_id" 
                required 
                value={formData.from_country_id}
                onChange={handleInputChange}
                className="input-field"
              >
                <option value="">Select country</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="from_city" className="block text-sm font-semibold text-pet-navy mb-2">
                From City <span className="text-red-500">*</span>
              </label>
              {fromCities.length > 0 ? (
                <select 
                  id="from_city" 
                  name="from_city" 
                  required 
                  value={formData.from_city}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="">Select city</option>
                  {fromCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                  <option value="other">Other (specify in special requests)</option>
                </select>
              ) : (
                <input 
                  type="text" 
                  id="from_city" 
                  name="from_city" 
                  required 
                  value={formData.from_city}
                  onChange={handleInputChange}
                  placeholder={formData.from_country_id ? "Please select a country first" : "e.g., Toronto"} 
                  className="input-field"
                  disabled={!formData.from_country_id}
                />
              )}
            </div>

            <div>
              <label htmlFor="to_country_id" className="block text-sm font-semibold text-pet-navy mb-2">
                To Country <span className="text-red-500">*</span>
              </label>
              <select 
                id="to_country_id" 
                name="to_country_id" 
                required 
                value={formData.to_country_id}
                onChange={handleInputChange}
                className="input-field"
              >
                <option value="">Select country</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="to_city" className="block text-sm font-semibold text-pet-navy mb-2">
                To City <span className="text-red-500">*</span>
              </label>
              {toCities.length > 0 ? (
                <select 
                  id="to_city" 
                  name="to_city" 
                  required 
                  value={formData.to_city}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="">Select city</option>
                  {toCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                  <option value="other">Other (specify in special requests)</option>
                </select>
              ) : (
                <input 
                  type="text" 
                  id="to_city" 
                  name="to_city" 
                  required 
                  value={formData.to_city}
                  onChange={handleInputChange}
                  placeholder={formData.to_country_id ? "Please select a country first" : "e.g., Seoul"} 
                  className="input-field"
                  disabled={!formData.to_country_id}
                />
              )}
            </div>

            <div>
              <label htmlFor="travel_date" className="block text-sm font-semibold text-pet-navy mb-2">
                Approximate Travel Date
              </label>
              <input 
                type="date" 
                id="travel_date" 
                name="travel_date" 
                value={formData.travel_date}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                className="input-field"
              />
              <p className="text-xs text-gray-500 mt-1">Not sure yet? Leave blank and we'll discuss options</p>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="card">
          <h2 className="text-2xl font-bold text-pet-navy mb-6 flex items-center">
            <span className="text-3xl mr-3">📧</span>
            Your Contact Information
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="full_name" className="block text-sm font-semibold text-pet-navy mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                id="full_name" 
                name="full_name" 
                required 
                value={formData.full_name}
                onChange={handleInputChange}
                placeholder="John Doe" 
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-pet-navy mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required 
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com" 
                className="input-field"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="phone" className="block text-sm font-semibold text-pet-navy mb-2">
                Phone/WhatsApp <span className="text-red-500">*</span>
              </label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                required 
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+1 234 567 8900" 
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Special Requests */}
        <div className="card">
          <label htmlFor="special_requests" className="block text-sm font-semibold text-pet-navy mb-2">
            Special Requests or Concerns <span className="text-gray-500 text-xs">(optional)</span>
          </label>
          <textarea 
            id="special_requests" 
            name="special_requests" 
            rows={4}
            value={formData.special_requests}
            onChange={handleInputChange}
            placeholder="Tell us about any special needs, medical conditions, or specific requirements. If your city is not listed above, please specify it here."
            className="input-field resize-none"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="btn-primary text-lg px-12 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              <>
                Submit Inquiry
                <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </>
            )}
          </button>

          {submitStatus === 'error' && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-2xl">
              <p className="text-red-800">
                There was an error submitting your inquiry. Please try again or contact us directly.
              </p>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}