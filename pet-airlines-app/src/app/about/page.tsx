import Layout from '@/components/layout/Layout'

export default function AboutPage() {
  return (
    <Layout>
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-pet-navy mb-6">About Pet Airlines</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're passionate about reuniting pets with their families worldwide. 
              Our mission is to make international pet transportation safe, stress-free, and reliable.
            </p>
          </div>

          {/* Story */}
          <div className="bg-white rounded-3xl p-12 mb-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-pet-navy mb-6">Our Story</h2>
                <p className="text-gray-700 mb-4">
                  Founded by pet lovers who experienced the challenges of international relocation firsthand, 
                  Pet Airlines was born from a simple belief: every pet deserves a safe, comfortable journey 
                  to their new home.
                </p>
                <p className="text-gray-700 mb-4">
                  We've helped hundreds of families reunite with their beloved companions across six continents, 
                  handling everything from complex documentation to specialized medical requirements.
                </p>
                <p className="text-gray-700">
                  Our team combines years of logistics experience with genuine care for animal welfare, 
                  ensuring every journey is handled with the attention your pet deserves.
                </p>
              </div>
              <div className="bg-pet-blue/10 rounded-3xl p-8 text-center">
                <div className="text-8xl mb-4">🌍</div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-pet-blue">500+</div>
                    <div className="text-sm text-gray-600">Pets Safely Transported</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-pet-blue">50+</div>
                    <div className="text-sm text-gray-600">Countries Served</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-pet-blue">5+</div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-pet-blue">100%</div>
                    <div className="text-sm text-gray-600">Safe Arrivals</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-pet-navy text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl mb-4">🛡️</div>
                <h3 className="text-xl font-bold text-pet-navy mb-4">Safety First</h3>
                <p className="text-gray-700">
                  Every transport is planned with your pet's safety and comfort as our top priority. 
                  We work with certified carriers and follow strict international standards.
                </p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">💖</div>
                <h3 className="text-xl font-bold text-pet-navy mb-4">Compassionate Care</h3>
                <p className="text-gray-700">
                  We understand the emotional journey of relocating with pets. 
                  Our team provides support and updates every step of the way.
                </p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">🌐</div>
                <h3 className="text-xl font-bold text-pet-navy mb-4">Global Expertise</h3>
                <p className="text-gray-700">
                  With deep knowledge of international regulations and partnerships worldwide, 
                  we navigate complex requirements so you don't have to.
                </p>
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="bg-white rounded-3xl p-12">
            <h2 className="text-3xl font-bold text-pet-navy text-center mb-12">Our Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-pet-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">👨‍💼</span>
                </div>
                <h3 className="font-bold text-pet-navy mb-2">Sarah Johnson</h3>
                <p className="text-pet-blue font-medium mb-2">Lead Transport Specialist</p>
                <p className="text-sm text-gray-600">10+ years in international logistics and animal transportation</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-pet-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">👩‍⚕️</span>
                </div>
                <h3 className="font-bold text-pet-navy mb-2">Dr. Emily Chen</h3>
                <p className="text-pet-blue font-medium mb-2">Veterinary Advisor</p>
                <p className="text-sm text-gray-600">Licensed veterinarian specializing in travel health requirements</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-pet-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">👨‍💻</span>
                </div>
                <h3 className="font-bold text-pet-navy mb-2">Michael Rodriguez</h3>
                <p className="text-pet-blue font-medium mb-2">Documentation Expert</p>
                <p className="text-sm text-gray-600">Expert in international pet documentation and customs procedures</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <h2 className="text-3xl font-bold text-pet-navy mb-4">Ready to Start Your Pet's Journey?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Let our experienced team handle every detail of your pet's international travel.
            </p>
            <a href="/quote" className="btn-primary text-lg px-8 py-4">
              Get Free Quote
            </a>
          </div>
        </div>
      </div>
    </Layout>
  )
}