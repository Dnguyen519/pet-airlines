import Layout from '@/components/layout/Layout'

export default function ServicesPage() {
  return (
    <Layout>
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-pet-navy mb-4">Our Service Packages</h1>
            <p className="text-xl text-gray-600">Choose the perfect solution for your pet's journey</p>
          </div>

          {/* Service Tiers */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Tier A */}
            <div className="bg-green-50 rounded-3xl p-8 border-2 border-green-200 hover:shadow-lg transition-all">
              <div className="text-center mb-6">
                <span className="text-5xl">✈️</span>
                <h3 className="text-2xl font-bold text-green-800 mt-4">Transport Services</h3>
                <p className="text-green-700">Complete door-to-door solutions</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">✓</span>
                  <span className="text-gray-700">Full international transport</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">✓</span>
                  <span className="text-gray-700">Flight-only options</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">✓</span>
                  <span className="text-gray-700">Premium pet nanny service</span>
                </li>
              </ul>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Starting from</p>
                <p className="text-3xl font-bold text-green-800">$800</p>
              </div>
            </div>

            {/* Tier B */}
            <div className="bg-yellow-50 rounded-3xl p-8 border-2 border-yellow-200 hover:shadow-lg transition-all">
              <div className="text-center mb-6">
                <span className="text-5xl">📋</span>
                <h3 className="text-2xl font-bold text-yellow-800 mt-4">Support Services</h3>
                <p className="text-yellow-700">Documentation & logistics help</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2 mt-1">✓</span>
                  <span className="text-gray-700">Complete paperwork handling</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2 mt-1">✓</span>
                  <span className="text-gray-700">Customs clearance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2 mt-1">✓</span>
                  <span className="text-gray-700">Crate sizing & delivery</span>
                </li>
              </ul>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Starting from</p>
                <p className="text-3xl font-bold text-yellow-800">$150</p>
              </div>
            </div>

            {/* Tier C */}
            <div className="bg-orange-50 rounded-3xl p-8 border-2 border-orange-200 hover:shadow-lg transition-all">
              <div className="text-center mb-6">
                <span className="text-5xl">💡</span>
                <h3 className="text-2xl font-bold text-orange-800 mt-4">Consulting</h3>
                <p className="text-orange-700">Expert guidance & planning</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2 mt-1">✓</span>
                  <span className="text-gray-700">30-45 min consultations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2 mt-1">✓</span>
                  <span className="text-gray-700">Full journey planning</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2 mt-1">✓</span>
                  <span className="text-gray-700">Custom solutions</span>
                </li>
              </ul>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Starting from</p>
                <p className="text-3xl font-bold text-orange-800">$50</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <a href="/quote" className="btn-primary text-lg px-8 py-4">
              Get Your Custom Quote
            </a>
          </div>
        </div>
      </div>
    </Layout>
  )
}