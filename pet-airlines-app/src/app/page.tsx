'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Layout from '@/components/layout/Layout'

export default function HomePage() {
  const [isConnected, setIsConnected] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState('Checking...')

  useEffect(() => {
    checkConnection()
  }, [])

  const checkConnection = async () => {
    try {
      const { data, error } = await supabase
        .from('languages')
        .select('count')
        .limit(1)

      if (error) {
        setConnectionStatus(`Error: ${error.message}`)
        setIsConnected(false)
      } else {
        setConnectionStatus('Connected to local database!')
        setIsConnected(true)
      }
    } catch (err) {
      setConnectionStatus('Failed to connect to database')
      setIsConnected(false)
    }
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-pet-navy mb-6">
              International Pet Transportation
              <span className="block text-pet-blue">Made Simple</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Door-to-door service for your furry family members. 
              From Canada, Korea, Vietnam to anywhere in the world.
            </p>

            {/* Connection Status */}
            <div className="mb-8 p-4 rounded-2xl max-w-md mx-auto">
              <div className={`flex items-center justify-center space-x-2 ${
                isConnected ? 'text-green-600' : 'text-red-600'
              }`}>
                <span>{isConnected ? '✅' : '❌'}</span>
                <span className="font-medium">{connectionStatus}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/quote" className="btn-primary text-lg px-8 py-4">
                Get Free Quote
                <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
              <a href="#how-it-works" className="btn-outline text-lg px-8 py-4">
                How It Works
              </a>
            </div>

            <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-gray-600">
              <span className="flex items-center">✓ Licensed & Insured</span>
              <span className="flex items-center">✓ 24/7 Support</span>
              <span className="flex items-center">✓ Real-time Updates</span>
            </div>
          </div>

          {/* Visual Element */}
          <div className="mt-16 text-center">
            <div className="bg-pet-blue/10 rounded-3xl p-8 max-w-md mx-auto">
              <div className="text-8xl mb-4 animate-float">✈️</div>
              <div className="flex justify-center space-x-4 text-6xl">
                <span className="animate-float" style={{animationDelay: '0.5s'}}>🐕</span>
                <span className="animate-float" style={{animationDelay: '1s'}}>🐈</span>
                <span className="animate-float" style={{animationDelay: '1.5s'}}>🦜</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-20 bg-white">
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
    </Layout>
  )
}