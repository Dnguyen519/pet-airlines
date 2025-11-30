export default function Footer() {
  return (
    <footer className="bg-pet-navy text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Pet Airlines</h3>
            <p className="text-white/70">Professional pet transportation services worldwide</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-white/70">
              <li><a href="/services#tier-a" className="hover:text-pet-orange">Transport Services</a></li>
              <li><a href="/services#tier-b" className="hover:text-pet-orange">Support Services</a></li>
              <li><a href="/services#tier-c" className="hover:text-pet-orange">Consulting</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-white/70">
              <li><a href="/about" className="hover:text-pet-orange">About Us</a></li>
              <li><a href="/how-it-works" className="hover:text-pet-orange">How It Works</a></li>
              <li><a href="/faq" className="hover:text-pet-orange">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-white/70">
              <li>📧 info@petairlines.com</li>
              <li>📱 WhatsApp: +1 234 567 890</li>
              <li>🌐 Available in 6 languages</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-white/50">
          <p>&copy; 2024 Pet Airlines. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}