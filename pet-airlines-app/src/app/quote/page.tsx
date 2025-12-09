import InquiryForm from '@/components/forms/InquiryFormV2'
import Layout from '@/components/layout/Layout'

export default function QuotePage() {
  return (
    <Layout>
      {/* Main Content */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InquiryForm />
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