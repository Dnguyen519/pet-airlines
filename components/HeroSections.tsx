import React from 'react';
import { Button } from './Buttons';

export const HeroClassic: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-pet-light to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-bold text-pet-navy leading-tight">
              Your Pet's
              <span className="text-pet-blue"> First-Class</span>
              <br />
              Journey Starts Here
            </h1>
            <p className="text-xl text-gray-600">
              Safe, comfortable, and stress-free air travel designed specifically for your beloved companions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="playful" size="lg">
                Book a Flight ✈️
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
            
            <div className="flex items-center gap-8 pt-4">
              <div>
                <p className="text-3xl font-bold text-pet-orange">50k+</p>
                <p className="text-sm text-gray-600">Happy Pets</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-pet-orange">98%</p>
                <p className="text-sm text-gray-600">Satisfaction</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-pet-orange">24/7</p>
                <p className="text-sm text-gray-600">Support</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-pet-blue opacity-10 rounded-full transform scale-110"></div>
            <img 
              src="/api/placeholder/600/400" 
              alt="Happy pet traveling" 
              className="relative rounded-pet shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-white rounded-pet shadow-lg p-4 animate-float">
              <p className="text-sm font-bold text-pet-navy">Next Flight</p>
              <p className="text-2xl">NYC → LAX</p>
              <p className="text-pet-orange font-bold">in 2 hours</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 text-6xl opacity-20 animate-float">✈️</div>
      <div className="absolute bottom-20 right-20 text-6xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>🐾</div>
    </section>
  );
};

export const HeroPlayful: React.FC = () => {
  const [hoveredPet, setHoveredPet] = React.useState<string | null>(null);
  
  return (
    <section className="relative bg-gradient-to-r from-pet-sky via-pet-light to-white overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-pet-orange opacity-10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pet-blue opacity-10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-pet-navy">Now boarding: All pets welcome!</span>
          </div>
          
          <h1 className="text-6xl lg:text-7xl font-bold text-pet-navy">
            Fly with Your
            <div className="relative inline-block ml-4">
              <span className="text-pet-orange">Best Friend</span>
              <div className="absolute -top-8 -right-8 text-4xl animate-wiggle">🐕</div>
            </div>
          </h1>
          
          <p className="text-2xl text-gray-600 max-w-2xl mx-auto">
            Where tails wag at 30,000 feet! Safe, fun, and pawsitively perfect travel.
          </p>
          
          <div className="flex justify-center gap-6 pt-4">
            {['🐕', '🐈', '🦜', '🐰', '🐹'].map((pet, index) => (
              <button
                key={index}
                className={`text-6xl transform transition-all duration-200 ${
                  hoveredPet === pet ? 'scale-125 -translate-y-2' : 'hover:scale-110'
                }`}
                onMouseEnter={() => setHoveredPet(pet)}
                onMouseLeave={() => setHoveredPet(null)}
              >
                {pet}
              </button>
            ))}
          </div>
          
          <div className="flex justify-center gap-4 pt-8">
            <Button variant="secondary" size="lg" className="group">
              <span className="flex items-center gap-2">
                Start Your Journey
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </Button>
            <Button variant="ghost" size="lg">
              Watch Video
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export const HeroMinimal: React.FC = () => {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-32 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-7xl font-bold">
            <span className="text-pet-navy">Pet</span>
            <span className="text-pet-blue"> Airlines</span>
          </h1>
          
          <p className="text-2xl text-gray-600">
            Premium air travel for pets. Simple, safe, stress-free.
          </p>
          
          <div className="pt-8">
            <Button variant="primary" size="lg">
              Book Now
            </Button>
          </div>
          
          <div className="flex justify-center gap-12 pt-12 text-center">
            <div className="space-y-2">
              <div className="text-4xl">🛡️</div>
              <p className="font-medium text-pet-navy">100% Safe</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl">🌡️</div>
              <p className="font-medium text-pet-navy">Climate Control</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl">👨‍⚕️</div>
              <p className="font-medium text-pet-navy">Vet Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const HeroInteractive: React.FC = () => {
  const [selectedRoute, setSelectedRoute] = React.useState('NYC-LAX');
  const routes = {
    'NYC-LAX': { from: 'New York', to: 'Los Angeles', price: '$299', time: '5h 30m' },
    'SFO-MIA': { from: 'San Francisco', to: 'Miami', price: '$279', time: '5h 15m' },
    'CHI-DEN': { from: 'Chicago', to: 'Denver', price: '$179', time: '2h 30m' },
  };
  
  return (
    <section className="relative bg-gradient-to-b from-pet-light to-white">
      <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl font-bold text-pet-navy">
              Ready for Takeoff?
              <span className="block text-3xl text-pet-blue mt-2">
                Your pet's adventure awaits
              </span>
            </h1>
            
            <div className="bg-white rounded-pet shadow-xl p-6">
              <h3 className="font-bold text-pet-navy mb-4">Quick Booking</h3>
              
              <div className="space-y-4">
                {Object.entries(routes).map(([key, route]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedRoute(key)}
                    className={`w-full p-4 rounded-pet border-2 transition-all ${
                      selectedRoute === key
                        ? 'border-pet-orange bg-pet-light'
                        : 'border-pet-light hover:border-pet-blue'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="text-left">
                        <p className="font-bold text-pet-navy">
                          {route.from} → {route.to}
                        </p>
                        <p className="text-sm text-gray-600">{route.time}</p>
                      </div>
                      <p className="text-2xl font-bold text-pet-orange">{route.price}</p>
                    </div>
                  </button>
                ))}
              </div>
              
              <Button variant="playful" className="w-full mt-6">
                Continue with {routes[selectedRoute].from} → {routes[selectedRoute].to}
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-pet-blue to-pet-sky rounded-pet p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Why Choose Pet Airlines?</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <p className="font-bold">Dedicated Pet Cabins</p>
                    <p className="text-sm opacity-90">No cargo holds, ever.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <p className="font-bold">Live Updates</p>
                    <p className="text-sm opacity-90">Track your pet's journey in real-time.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <p className="font-bold">Expert Care</p>
                    <p className="text-sm opacity-90">Trained pet attendants on every flight.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-white rounded-pet shadow-lg p-4">
              <div className="flex items-center gap-3">
                <div className="text-3xl animate-bounce">🎉</div>
                <div>
                  <p className="font-bold text-pet-navy">Limited Offer</p>
                  <p className="text-sm text-gray-600">20% off first flight</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};