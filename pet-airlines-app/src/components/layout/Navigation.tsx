'use client'

export default function Navigation() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-pet-navy">Pet Airlines</a>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-pet-navy font-semibold hover:text-pet-blue">Home</a>
            <a href="/services" className="text-pet-navy font-semibold hover:text-pet-blue">Services</a>
            <a href="/routes" className="text-pet-navy font-semibold hover:text-pet-blue">Routes</a>
            <a href="/how-it-works" className="text-pet-navy font-semibold hover:text-pet-blue">How It Works</a>
            <a href="/pricing" className="text-pet-navy font-semibold hover:text-pet-blue">Pricing</a>
            <a href="/about" className="text-pet-navy font-semibold hover:text-pet-blue">About</a>
            <a href="/faq" className="text-pet-navy font-semibold hover:text-pet-blue">FAQ</a>
            <a href="/quote" className="bg-pet-orange text-white px-6 py-3 rounded-full font-semibold hover:bg-opacity-90">
              Get Quote 🐾
            </a>
          </div>
          <div className="md:hidden">
            <button className="text-pet-navy p-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}