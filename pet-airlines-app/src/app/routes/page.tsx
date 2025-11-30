import Layout from '@/components/layout/Layout'

export default function RoutesPage() {
  const routes = [
    { from: '🇨🇦', to: '🇰🇷', name: 'Canada → Korea', price: 'From $2,500', time: '11-13 hours', note: 'Direct flights available' },
    { from: '🇰🇷', to: '🇻🇳', name: 'Korea → Vietnam', price: 'From $2,000', time: '5-6 hours', note: 'Popular regional route' },
    { from: '🇨🇦', to: '🇻🇳', name: 'Canada → Vietnam', price: 'From $3,000', time: '15-20 hours', note: 'Complete door-to-door' },
    { from: '🇨🇦', to: '🇫🇷', name: 'Canada → France', price: 'From $3,200', time: '7-9 hours', note: 'EU compliance included' },
    { from: '🇰🇷', to: '🇫🇷', name: 'Korea → France', price: 'From $2,800', time: '11-13 hours', note: 'Full EU documentation' },
    { from: '🇻🇳', to: '🇫🇷', name: 'Vietnam → France', price: 'From $3,500', time: '12-15 hours', note: 'Specialized handling' },
  ]

  return (
    <Layout>
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-pet-navy mb-4">Popular Routes</h1>
            <p className="text-xl text-gray-600">We connect pets with their families worldwide</p>
          </div>

          {/* Routes Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {routes.map((route, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">{route.from}</span>
                  <span className="text-gray-400">→</span>
                  <span className="text-2xl">{route.to}</span>
                </div>
                <h4 className="font-semibold text-pet-navy mb-2">{route.name}</h4>
                <p className="text-sm text-gray-600 mb-1">{route.time}</p>
                <p className="text-sm text-gray-600 mb-3">{route.note}</p>
                <p className="text-pet-blue font-bold">{route.price}</p>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-16 bg-white rounded-3xl p-8">
            <h2 className="text-3xl font-bold text-pet-navy mb-6">Custom Routes Available</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-pet-navy mb-4">We serve destinations worldwide including:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>🇺🇸 United States</li>
                  <li>🇦🇺 Australia</li>
                  <li>🇯🇵 Japan</li>
                  <li>🇬🇧 United Kingdom</li>
                  <li>🇩🇪 Germany</li>
                  <li>🇸🇬 Singapore</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-pet-navy mb-4">Don't see your route?</h3>
                <p className="text-gray-700 mb-4">
                  We handle custom routes to almost any destination worldwide. 
                  Each journey is carefully planned with local regulations in mind.
                </p>
                <a href="/quote" className="btn-primary">
                  Get Custom Quote
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}