'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

export interface FaqQuestion {
  q: string
  a: string
}

export interface FaqSection {
  category: string
  questions: FaqQuestion[]
}

interface FaqAccordionProps {
  sections: FaqSection[]
}

export function FaqAccordion({ sections }: FaqAccordionProps) {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  let questionIndex = 0

  return (
    <div className="space-y-8">
      {sections.map((section, sectionIndex) => (
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
                    aria-expanded={isOpen}
                    className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50 rounded-2xl transition-colors"
                  >
                    <h3 className="font-semibold text-pet-navy pr-4">{faq.q}</h3>
                    <span className={`text-pet-blue transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </span>
                  </button>

                  <div className={cn('px-6 pb-6', isOpen ? 'block' : 'hidden')}>
                    <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
