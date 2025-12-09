import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-pet-navy text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="mb-4">
              <h3 className="text-xl font-bold">Pet Airlines</h3>
            </div>
            <p className="text-white/70">Professional pet transportation services worldwide</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-white/70">
              <li><a href="/services#tier-a" className="hover:text-pet-orange transition-colors">Transport Services</a></li>
              <li><a href="/services#tier-b" className="hover:text-pet-orange transition-colors">Support Services</a></li>
              <li><a href="/services#tier-c" className="hover:text-pet-orange transition-colors">Consulting</a></li>
              <li><a href="/routes" className="hover:text-pet-orange transition-colors">Popular Routes</a></li>
              <li><a href="/pricing" className="hover:text-pet-orange transition-colors">Pricing Calculator</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-white/70">
              <li><a href="/about" className="hover:text-pet-orange transition-colors">About Us</a></li>
              <li><a href="/how-it-works" className="hover:text-pet-orange transition-colors">How It Works</a></li>
              <li><a href="/faq" className="hover:text-pet-orange transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-pet-orange transition-colors">Testimonials</a></li>
              <li><a href="#" className="hover:text-pet-orange transition-colors">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-white/70">
              <li>📧 info@pet-airlines.com</li>
              <li>📱 WhatsApp: +1 234 567 890</li>
              <li>🌐 Available in 6 languages</li>
            </ul>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Follow Us</h4>
              <div className="flex space-x-3">
                <a href="#" className="text-white/70 hover:text-pet-orange transition-colors">
                  <span className="text-2xl">📘</span>
                </a>
                <a href="#" className="text-white/70 hover:text-pet-orange transition-colors">
                  <span className="text-2xl">📷</span>
                </a>
                <a href="#" className="text-white/70 hover:text-pet-orange transition-colors">
                  <span className="text-2xl">🐦</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-white/50">
          <p>&copy; 2024 Pet Airlines. All rights reserved. | <a href="#" className="hover:text-pet-orange transition-colors">Privacy</a> | <a href="#" className="hover:text-pet-orange transition-colors">Terms</a></p>
        </div>
      </div>
    </footer>
  )
}