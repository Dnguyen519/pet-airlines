import type { Metadata } from 'next'

import Layout from '@/components/layout/Layout'
import { InquiryForm } from '@/components/forms/InquiryForm'
import { COUNTRY_CODES } from '@/lib/countries'

export const metadata: Metadata = {
  title: 'Get a Pet Transport Quote',
  description:
    'Tell us where your pet is flying from and to, and our team will reply by email with a detailed international pet relocation quote.',
  alternates: { canonical: '/quote' },
  openGraph: {
    title: 'Get a Pet Transport Quote | Pet Airlines',
    description:
      'Tell us where your pet is flying from and to, and our team will reply by email with a detailed international pet relocation quote.',
    url: '/quote',
    type: 'website',
  },
}

interface QuotePageProps {
  searchParams: Promise<{ from?: string; to?: string }>
}

const COUNTRY_CODE_SET = new Set<string>(COUNTRY_CODES)

function normalizeCountryParam(value: string | undefined): string | undefined {
  if (!value) return undefined
  const upper = value.toUpperCase()
  return COUNTRY_CODE_SET.has(upper) ? upper : undefined
}

export default async function QuotePage({ searchParams }: QuotePageProps) {
  const params = await searchParams
  const initialFrom = normalizeCountryParam(params.from)
  const initialTo = normalizeCountryParam(params.to)

  return (
    <Layout>
      {/* Guidance */}
      <section className="pt-12 pb-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-pet-navy mb-4">Get a Pet Transport Quote</h1>
          <p className="text-lg text-gray-700 mb-6">
            Fill in the form below with your pet&apos;s details and travel route. A member of our team reviews every
            request personally and replies by email with a route-specific quote and next steps — we don&apos;t use an
            automated pricing calculator, because import rules, crate requirements, and quarantine periods vary too
            much by country to price accurately without a human checking them.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="card">
              <h2 className="text-lg font-semibold text-pet-navy mb-3">What to have ready</h2>
              <ul className="text-gray-700 text-sm space-y-2 list-disc list-inside">
                <li>Your pet&apos;s microchip number, so we can confirm it matches ISO standards for the destination country.</li>
                <li>
                  Recent vaccination and health records, including the dates each vaccination was given — some countries
                  require a minimum waiting period after a rabies vaccination before travel is permitted.
                </li>
                <li>
                  Your pet&apos;s approximate weight and a rough measurement of how they stand, turn around, and lie down
                  comfortably, so we can recommend the right crate size once IATA sizing rules are applied.
                </li>
                <li>
                  A target travel window rather than a fixed date — flexibility of even a few days can matter once we
                  check flight and quarantine availability.
                </li>
              </ul>
            </div>
            <div className="card">
              <h2 className="text-lg font-semibold text-pet-navy mb-3">What happens after you submit</h2>
              <ul className="text-gray-700 text-sm space-y-2 list-disc list-inside">
                <li>You&apos;ll see a reference number on this page immediately — save it, it identifies your request.</li>
                <li>Our team reviews the route, pet details, and any special requests you noted.</li>
                <li>
                  We reply by email with the documentation and health checks your specific route requires, an estimated
                  timeline, and next steps for booking.
                </li>
                <li>
                  If anything in your submission needs clarifying — an unusual route, a large pet, or a short travel
                  window — we&apos;ll ask before quoting rather than guess.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <div className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InquiryForm initialFrom={initialFrom} initialTo={initialTo} />
        </div>
      </div>

      {/* Trust Indicators */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <span className="text-4xl mb-3 block">🔒</span>
              <h4 className="font-semibold text-pet-navy mb-1">Secure & Confidential</h4>
              <p className="text-sm text-gray-600">Your information is protected</p>
            </div>
            <div>
              <span className="text-4xl mb-3 block">⏱️</span>
              <h4 className="font-semibold text-pet-navy mb-1">24-Hour Response</h4>
              <p className="text-sm text-gray-600">Quick quote turnaround</p>
            </div>
            <div>
              <span className="text-4xl mb-3 block">💰</span>
              <h4 className="font-semibold text-pet-navy mb-1">No Hidden Fees</h4>
              <p className="text-sm text-gray-600">Transparent pricing always</p>
            </div>
            <div>
              <span className="text-4xl mb-3 block">🌐</span>
              <h4 className="font-semibold text-pet-navy mb-1">Professional Service</h4>
              <p className="text-sm text-gray-600">Expert pet transportation</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
