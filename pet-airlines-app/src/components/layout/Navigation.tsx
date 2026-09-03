'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navigation() {
  const [selectedLanguage, setSelectedLanguage] = useState('en')

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-pet-navy">Pet Airlines</Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-pet-navy font-semibold hover:text-pet-blue transition-colors">Home</Link>
            <a href="/services" className="text-pet-navy font-semibold hover:text-pet-blue transition-colors">Services</a>
            <Link href="/routes" className="text-pet-navy font-semibold hover:text-pet-blue transition-colors">Routes</Link>
            <a href="/how-it-works" className="text-pet-navy font-semibold hover:text-pet-blue transition-colors">How It Works</a>
            <a href="/pricing" className="text-pet-navy font-semibold hover:text-pet-blue transition-colors">Pricing</a>
            <a href="/quote" className="bg-pet-orange text-white px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transform hover:scale-105 transition-all">
              Get Quote 🐾
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <select 
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="text-sm border rounded-lg px-2 py-1 border-pet-blue/20"
            >
              <option value="en">🇺🇸 EN</option>
              <option value="es">🇪🇸 ES</option>
              <option value="fr">🇫🇷 FR</option>
              <option value="vi">🇻🇳 VI</option>
              <option value="ko">🇰🇷 KO</option>
              <option value="zh">🇨🇳 ZH</option>
            </select>
            <div className="md:hidden">
              <button className="text-pet-navy p-2">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}