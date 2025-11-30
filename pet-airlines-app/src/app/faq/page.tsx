'use client'

import { useState } from 'react'
import Layout from '@/components/layout/Layout'

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const faqs = [
    {
      category: 'General',
      questions: [
        {
          q: 'How long does international pet transport take?',
          a: 'Processing time varies by route, typically 7-21 days for documentation plus travel time. We provide detailed timelines during consultation.'
        },
        {
          q: 'Is pet transportation safe?',
          a: 'Yes, we follow strict international safety standards. All our transport partners are certified, and we maintain a 100% safe arrival rate.'
        },
        {
          q: 'What countries do you serve?',
          a: 'We serve 50+ countries worldwide, with expertise in routes between Canada, Korea, Vietnam, France, and the USA. Custom routes available.'
        }
      ]
    },
    {
      category: 'Documentation',
      questions: [
        {
          q: 'What documents does my pet need?',
          a: 'Requirements vary by destination but typically include health certificates, vaccination records, microchip documentation, and import permits. We handle all paperwork.'
        },
        {
          q: 'Do you help with veterinary requirements?',
          a: 'Yes, we provide detailed checklists and work with your veterinarian to ensure all health requirements are met for your destination country.'
        },
        {
          q: 'How much advance notice do you need?',
          a: 'We recommend contacting us 2-3 months before travel to allow time for documentation and health preparations, though urgent cases can sometimes be accommodated.'
        }
      ]
    },
    {
      category: 'Pricing',
      questions: [
        {
          q: 'How much does pet transportation cost?',
          a: 'Costs vary by route, pet size, and services needed. Transport services start from $800, support services from $150, consulting from $50. Contact us for a detailed quote.'
        },
        {
          q: 'Are there hidden fees?',
          a: 'No hidden fees. We provide transparent pricing with detailed breakdowns. All costs are discussed upfront during consultation.'
        },
        {
          q: 'Do you offer payment plans?',
          a: 'Yes, we offer flexible payment options for larger transports. Discuss payment plans during your consultation.'
        }
      ]
    },
    {
      category: 'Travel Process',
      questions: [
        {
          q: 'Can I track my pet during travel?',
          a: 'Yes, we provide real-time updates throughout the journey via WhatsApp, email, and phone. You\'ll know your pet\'s status every step of the way.'
        },
        {
          q: 'What size crate does my pet need?',
          a: 'Crate size depends on your pet\'s measurements and airline requirements. We provide sizing guidance and can arrange IATA-compliant crates.'
        },
        {
          q: 'Can pets travel in cabin?',
          a: 'Small pets may travel in cabin on some routes, subject to airline policies and destination requirements. We\'ll advise on the best option for your pet.'
        }
      ]
    }
  ]

  let questionIndex = 0

  return (
    <Layout>
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-pet-navy mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-gray-600">Find answers to common questions about pet transportation</p>
          </div>

          {/* FAQ Sections */}
          <div className="space-y-8">
            {faqs.map((section, sectionIndex) => (
              <div key={sectionIndex} className="bg-white rounded-3xl p-8">
                <h2 className="text-2xl font-bold text-pet-navy mb-6">{section.category}</h2>
                
                <div className="space-y-4">
                  {section.questions.map((faq, faqIndex) => {
                    const currentIndex = questionIndex++
                    const isOpen = openItems.includes(currentIndex)
                    
                    return (
                      <div key={faqIndex} className="border border-gray-200 rounded-2xl">
                        <button
                          onClick={() => toggleItem(currentIndex)}
                          className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50 rounded-2xl transition-colors"
                        >
                          <h3 className="font-semibold text-pet-navy pr-4">{faq.q}</h3>
                          <span className={`text-pet-blue transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                          </span>
                        </button>
                        
                        {isOpen && (
                          <div className="px-6 pb-6">
                            <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="bg-gradient-to-r from-pet-blue to-pet-sky rounded-3xl p-8 text-center text-white mt-12">
            <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-lg mb-6 opacity-90">
              Our experts are here to help with any specific concerns about your pet's journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/quote" className="bg-pet-orange text-white px-8 py-4 rounded-full font-bold hover:bg-opacity-90 transition-all">
                Get Personalized Quote
              </a>
              <a href="https://wa.me/1234567890" className="bg-green-500 text-white px-8 py-4 rounded-full font-bold hover:bg-opacity-90 transition-all">
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}