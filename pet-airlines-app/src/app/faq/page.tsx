import type { Metadata } from 'next'
import Link from 'next/link'
import Layout from '@/components/layout/Layout'
import { FaqAccordion, type FaqSection } from '@/components/marketing/FaqAccordion'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbList } from '@/components/seo/schemas'

export const metadata: Metadata = {
  title: 'Pet Transportation FAQ',
  description:
    'Answers on documentation timelines, microchip and rabies vaccination order, crate sizing, pricing, tracking, and cabin vs. cargo travel for international pet relocation.',
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'Pet Transportation FAQ | Pet Airlines',
    description:
      'Answers on documentation timelines, microchip and rabies vaccination order, crate sizing, pricing, tracking, and cabin vs. cargo travel.',
    url: '/faq',
    type: 'website',
  },
}

const faqs: FaqSection[] = [
  {
    category: 'General',
    questions: [
      {
        q: 'How long does international pet transport take?',
        a: 'Processing time varies by route, typically 7-21 days for documentation plus travel time. We provide detailed timelines during consultation.',
      },
      {
        q: 'Is pet transportation safe?',
        a: 'Yes, we follow strict international safety standards. All our transport partners are certified, and we maintain a 100% safe arrival rate.',
      },
      {
        q: 'What countries do you serve?',
        a: 'We serve 50+ countries worldwide, with expertise in routes between Canada, Korea, Vietnam, France, and the USA. Custom routes available.',
      },
    ],
  },
  {
    category: 'Documentation',
    questions: [
      {
        q: 'What documents does my pet need?',
        a: 'Requirements vary by destination but typically include health certificates, vaccination records, microchip documentation, and import permits. We handle all paperwork.',
      },
      {
        q: 'Do you help with veterinary requirements?',
        a: 'Yes, we provide detailed checklists and work with your veterinarian to ensure all health requirements are met for your destination country.',
      },
      {
        q: 'How much advance notice do you need?',
        a: 'We recommend contacting us 2-3 months before travel to allow time for documentation and health preparations, though urgent cases can sometimes be accommodated.',
      },
      {
        q: 'What order do the microchip and rabies vaccination need to happen in?',
        a: 'Most destinations require the microchip to be implanted before or on the same day as the rabies vaccination — vaccinating first and chipping afterward can invalidate the vaccination for entry purposes. We sequence this for you as part of the documentation plan.',
      },
    ],
  },
  {
    category: 'Pricing',
    questions: [
      {
        q: 'How much does pet transportation cost?',
        a: 'Costs vary by route, pet size, and services needed. Transport services start from $800, support services from $150, consulting from $50. Contact us for a detailed quote.',
      },
      {
        q: 'Are there hidden fees?',
        a: 'No hidden fees. We provide transparent pricing with detailed breakdowns. All costs are discussed upfront during consultation.',
      },
      {
        q: 'Do you offer payment plans?',
        a: 'Yes, we offer flexible payment options for larger transports. Discuss payment plans during your consultation.',
      },
    ],
  },
  {
    category: 'Travel Process',
    questions: [
      {
        q: 'Can I track my pet during travel?',
        a: "Yes, we provide real-time updates throughout the journey via WhatsApp, email, and phone. You'll know your pet's status every step of the way.",
      },
      {
        q: 'What size crate does my pet need?',
        a: "Crate size depends on your pet's measurements and airline requirements — IATA Live Animals Regulations require the pet to stand fully upright, turn around, and lie down without touching the crate walls. We provide sizing guidance and can arrange IATA-compliant crates.",
      },
      {
        q: 'Can pets travel in cabin?',
        a: "Small pets may travel in cabin on some routes, subject to airline policies and destination requirements. We'll advise on the best option for your pet.",
      },
      {
        q: 'What is a heat embargo?',
        a: 'Many airlines suspend live-animal cargo during the hottest summer months on routes where tarmac temperatures pose a health risk. This can shift travel dates or routing, and we plan around it when booking.',
      },
      {
        q: 'Are there breed restrictions?',
        a: 'Snub-nosed (brachycephalic) breeds — pugs, bulldogs, Persian cats, and similar breeds — are restricted or refused by many carriers for cargo travel due to a higher risk of respiratory distress. We check the specific airline and route policy before booking.',
      },
      {
        q: 'Does my destination require quarantine?',
        a: "Some countries and territories require a quarantine period on arrival regardless of documentation, and this varies by country and sometimes by the pet's origin and vaccination history. Where quarantine applies, it needs to be booked and paid for in advance, which extends the overall timeline by weeks.",
      },
    ],
  },
]

export default function FAQPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.flatMap((section) =>
      section.questions.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      }))
    ),
  }

  return (
    <Layout>
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbList([{ name: 'Home', path: '/' }, { name: 'FAQ', path: '/faq' }])} />
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-pet-navy mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-gray-600">Find answers to common questions about pet transportation</p>
          </div>

          <FaqAccordion sections={faqs} />

          {/* Contact CTA */}
          <div className="bg-gradient-to-r from-pet-blue to-pet-sky rounded-3xl p-8 text-center text-white mt-12">
            <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-lg mb-6 opacity-90">
              Our experts are here to help with any specific concerns about your pet&apos;s journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote" className="bg-pet-orange text-white px-8 py-4 rounded-full font-bold hover:bg-opacity-90 transition-all">
                Get Personalized Quote
              </Link>
              <a href="mailto:info@pet-airlines.com" className="bg-white text-pet-blue px-8 py-4 rounded-full font-bold hover:bg-opacity-90 transition-all">
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
