import Link from 'next/link'
import { MobileMenu, type MobileMenuLink } from './MobileMenu'

const NAV_LINKS: MobileMenuLink[] = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/routes', label: 'Routes' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/pricing', label: 'Pricing' },
]

export default function Navigation() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-pet-navy">Pet Airlines</Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-pet-navy font-semibold hover:text-pet-blue transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/quote" className="bg-pet-orange text-white px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transform hover:scale-105 transition-all">
              Get Quote 🐾
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <MobileMenu links={NAV_LINKS} ctaHref="/quote" ctaLabel="Get Quote 🐾" />
          </div>
        </div>
      </div>
    </nav>
  )
}
