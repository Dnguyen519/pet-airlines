import type { Metadata } from 'next'
import Layout from '@/components/layout/Layout'
import { AnimatedCounter } from '@/components/marketing/AnimatedCounter'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbList } from '@/components/seo/schemas'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Pet Airlines is a pet relocation team handling documentation, customs clearance, and door-to-door international pet transportation since 2014.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Pet Airlines',
    description:
      'Pet Airlines is a pet relocation team handling documentation, customs clearance, and door-to-door international pet transportation since 2014.',
    url: '/about',
    type: 'website',
  },
}

export default function AboutPage() {
  return (
    <Layout>
      <JsonLd data={breadcrumbList([{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }])} />
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-pet-sky via-pet-light to-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-6xl animate-float">🏢</div>
          <div className="absolute top-20 right-20 text-4xl animate-float" style={{animationDelay: '0.5s'}}>❤️</div>
          <div className="absolute bottom-10 left-1/4 text-5xl animate-float" style={{animationDelay: '1s'}}>🐾</div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-pet-navy mb-6 animate-fade-in-up">
            About Pet Airlines 🛫
          </h1>
          <p className="text-xl md:text-2xl text-pet-navy/80 max-w-3xl mx-auto animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Reuniting pets with their families across the globe since 2014
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in">
              <h2 className="text-4xl font-bold text-pet-navy mb-6">Our Story 📖</h2>
              <p className="text-gray-700 mb-4">
                Pet Airlines was born from a simple belief: no family should be separated from their pets due to international relocation. 
                Founded in 2014 by a team of pet lovers and logistics experts, we saw the stress and confusion pet owners faced when 
                trying to navigate international pet transportation.
              </p>
              <p className="text-gray-700 mb-4">
                What started as a small operation helping expats in Asia has grown into a trusted global network, 
                serving thousands of families each year. We've turned the complex process of pet relocation into 
                a seamless, stress-free experience.
              </p>
              <p className="text-gray-700">
                Today, we're proud to be the bridge that keeps families together, no matter where life takes them.
              </p>
            </div>
            <div className="bg-gradient-to-br from-pet-blue/10 to-pet-orange/10 rounded-3xl p-8 text-center">
              <div className="grid grid-cols-2 gap-6">
                <AnimatedCounter target={10} colorClass="text-pet-blue" label="Years of Service" />
                <AnimatedCounter target={5000} suffix="+" colorClass="text-pet-orange" label="Happy Pets Transported" />
                <AnimatedCounter target={50} suffix="+" colorClass="text-green-500" label="Countries Served" />
                <AnimatedCounter target={100} suffix="%" colorClass="text-purple-500" label="Safe Arrivals" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-pet-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-pet-navy mb-4">Our Mission & Values 🎯</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div className="text-center mb-6">
                <span className="text-5xl">🚀</span>
                <h3 className="text-2xl font-bold text-pet-navy mt-4">Our Mission</h3>
              </div>
              <p className="text-gray-700 text-center">
                To provide safe, compassionate, and stress-free international pet transportation services 
                that keep families together across borders. We treat every pet as if they were our own.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div className="text-center mb-6">
                <span className="text-5xl">🔮</span>
                <h3 className="text-2xl font-bold text-pet-navy mt-4">Our Vision</h3>
              </div>
              <p className="text-gray-700 text-center">
                To be the global leader in pet relocation services, setting the standard for safety, 
                transparency, and customer care while making international pet travel accessible to all families.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 text-center value-card shadow-md">
              <span className="text-4xl mb-3 block">❤️</span>
              <h4 className="font-bold text-pet-navy mb-2">Compassion</h4>
              <p className="text-sm text-gray-600">Every pet deserves love and care during their journey</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center value-card shadow-md">
              <span className="text-4xl mb-3 block">🛡️</span>
              <h4 className="font-bold text-pet-navy mb-2">Safety First</h4>
              <p className="text-sm text-gray-600">100% commitment to your pet's wellbeing</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center value-card shadow-md">
              <span className="text-4xl mb-3 block">💎</span>
              <h4 className="font-bold text-pet-navy mb-2">Transparency</h4>
              <p className="text-sm text-gray-600">Clear communication and honest pricing always</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center value-card shadow-md">
              <span className="text-4xl mb-3 block">🌟</span>
              <h4 className="font-bold text-pet-navy mb-2">Excellence</h4>
              <p className="text-sm text-gray-600">Exceeding expectations in every interaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-pet-navy mb-4">Meet Our Team 👥</h2>
            <p className="text-xl text-gray-600">Passionate professionals dedicated to your pet's journey</p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
            <div className="text-center team-card">
              <div className="bg-pet-light rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-4">
                <span className="text-5xl">👨‍💼</span>
              </div>
              <h4 className="font-bold text-pet-navy">Michael Chen</h4>
              <p className="text-pet-blue mb-2">Founder & CEO</p>
              <p className="text-sm text-gray-600">15+ years in logistics, dog dad to Max & Luna</p>
            </div>

            <div className="text-center team-card">
              <div className="bg-pet-light rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-4">
                <span className="text-5xl">👩‍⚕️</span>
              </div>
              <h4 className="font-bold text-pet-navy">Dr. Sarah Kim</h4>
              <p className="text-pet-blue mb-2">Head Veterinary Advisor</p>
              <p className="text-sm text-gray-600">DVM with 20 years experience</p>
            </div>

            <div className="text-center team-card">
              <div className="bg-pet-light rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-4">
                <span className="text-5xl">👨‍✈️</span>
              </div>
              <h4 className="font-bold text-pet-navy">James Park</h4>
              <p className="text-pet-blue mb-2">Operations Director</p>
              <p className="text-sm text-gray-600">Former airline cargo specialist</p>
            </div>

            <div className="text-center team-card">
              <div className="bg-pet-light rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-4">
                <span className="text-5xl">👩‍💻</span>
              </div>
              <h4 className="font-bold text-pet-navy">Emily Nguyen</h4>
              <p className="text-pet-blue mb-2">Customer Success Lead</p>
              <p className="text-sm text-gray-600">Speaks 5 languages, cat mom</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Our team of 50+ pet lovers, logistics experts, and customer care specialists work around the clock to ensure every pet's safe journey.
            </p>
            <a href="/quote" className="inline-flex items-center text-pet-blue font-semibold hover:underline">
              Meet more of our team
              <span className="ml-2">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Certifications & Partners */}
      <section className="py-20 bg-pet-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-pet-navy mb-4">Certifications & Partnerships 🏆</h2>
            <p className="text-xl text-gray-600">Trusted by industry leaders worldwide</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h3 className="text-2xl font-bold text-pet-navy mb-6">Our Certifications</h3>
              <div className="space-y-4">
                <div className="flex items-center bg-white rounded-xl p-4 shadow">
                  <span className="text-3xl mr-4">✈️</span>
                  <div>
                    <h4 className="font-semibold text-pet-navy">IATA Certified</h4>
                    <p className="text-sm text-gray-600">International Air Transport Association member</p>
                  </div>
                </div>
                <div className="flex items-center bg-white rounded-xl p-4 shadow">
                  <span className="text-3xl mr-4">🌐</span>
                  <div>
                    <h4 className="font-semibold text-pet-navy">IPATA Member</h4>
                    <p className="text-sm text-gray-600">International Pet and Animal Transportation Association</p>
                  </div>
                </div>
                <div className="flex items-center bg-white rounded-xl p-4 shadow">
                  <span className="text-3xl mr-4">🛡️</span>
                  <div>
                    <h4 className="font-semibold text-pet-navy">Licensed & Insured</h4>
                    <p className="text-sm text-gray-600">Full coverage in all operating countries</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-pet-navy mb-6">Trusted Partners</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-6 text-center shadow">
                  <span className="text-4xl mb-2 block">🛩️</span>
                  <p className="font-semibold text-pet-navy">Major Airlines</p>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow">
                  <span className="text-4xl mb-2 block">🏥</span>
                  <p className="font-semibold text-pet-navy">Vet Clinics</p>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow">
                  <span className="text-4xl mb-2 block">🏛️</span>
                  <p className="font-semibold text-pet-navy">Government Agencies</p>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow">
                  <span className="text-4xl mb-2 block">🚚</span>
                  <p className="font-semibold text-pet-navy">Ground Transport</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Responsibility */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-pet-navy mb-4">Giving Back 💚</h2>
            <p className="text-xl text-gray-600">Supporting animal welfare worldwide</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <span className="text-5xl">🏠</span>
              </div>
              <h4 className="font-bold text-pet-navy mb-2">Shelter Support</h4>
              <p className="text-gray-600">Monthly donations to local animal shelters in our operating regions</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <span className="text-5xl">🆘</span>
              </div>
              <h4 className="font-bold text-pet-navy mb-2">Rescue Transport</h4>
              <p className="text-gray-600">Free transport for rescued animals to their forever homes</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <span className="text-5xl">🌱</span>
              </div>
              <h4 className="font-bold text-pet-navy mb-2">Green Initiative</h4>
              <p className="text-gray-600">Carbon offset program for all pet flights</p>
            </div>
          </div>

          <div className="text-center mt-12 bg-green-50 rounded-3xl p-8">
            <p className="text-lg text-green-800 font-semibold">
              1% of all profits go directly to animal welfare organizations
            </p>
            <p className="text-green-700 mt-2">
              Together, we've contributed over $250,000 to help animals in need
            </p>
          </div>
        </div>
      </section>

      {/* Press & Recognition */}
      <section className="py-20 bg-pet-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-pet-navy mb-4">In The News 📰</h2>
            <p className="text-xl text-gray-600">Recognized for excellence in pet transportation</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="bg-white rounded-xl p-6 shadow">
              <span className="text-3xl mb-3 block">🏅</span>
              <p className="font-semibold text-pet-navy">Best Pet Transport 2023</p>
              <p className="text-sm text-gray-600">Global Pet Expo Awards</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow">
              <span className="text-3xl mb-3 block">⭐</span>
              <p className="font-semibold text-pet-navy">5.0 Rating</p>
              <p className="text-sm text-gray-600">500+ Google Reviews</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow">
              <span className="text-3xl mb-3 block">📺</span>
              <p className="font-semibold text-pet-navy">Featured on CNN</p>
              <p className="text-sm text-gray-600">"Setting the Standard"</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow">
              <span className="text-3xl mb-3 block">🌟</span>
              <p className="font-semibold text-pet-navy">Industry Leader</p>
              <p className="text-sm text-gray-600">IPATA Excellence Award</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-pet-blue to-pet-navy text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6 animate-fade-in-up">
            Join Our Growing Family 🏠
          </h2>
          <p className="text-xl mb-8 opacity-90 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Let us help reunite you with your furry family member
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <a href="/quote" className="bg-pet-orange text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transform hover:scale-105 transition-all inline-flex items-center justify-center">
              Start Your Journey
              <span className="ml-2">→</span>
            </a>
            <a href="/faq" className="bg-white text-pet-navy px-8 py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transform hover:scale-105 transition-all inline-flex items-center justify-center">
              Learn More
              <span className="ml-2">📚</span>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  )
}