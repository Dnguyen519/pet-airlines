import React from 'react';
import { Navigation, NavigationPlayful } from './Navigation';
import { ButtonGroup } from './Buttons';
import { ServiceCard, FlightCard, TestimonialCard, PricingCard } from './Cards';
import { PetAirlinesLogoAnimated } from './PetAirlinesLogo';

export const ShowcasePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationPlayful />
      
      <main className="max-w-7xl mx-auto px-4 py-12 space-y-16">
        {/* Hero Section */}
        <section className="text-center py-16 bg-gradient-to-r from-pet-light to-white rounded-pet">
          <PetAirlinesLogoAnimated className="mx-auto mb-8" />
          <h1 className="text-5xl font-bold text-pet-navy mb-4">
            Welcome to Pet Airlines
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Where your furry friends fly first class! ✈️🐾
          </p>
        </section>

        {/* Button Showcase */}
        <section className="bg-white p-8 rounded-pet shadow-lg">
          <h2 className="text-3xl font-bold text-pet-navy mb-8">Button Components</h2>
          <ButtonGroup />
        </section>

        {/* Service Cards */}
        <section>
          <h2 className="text-3xl font-bold text-pet-navy mb-8">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <ServiceCard
              icon="🛡️"
              title="Pet Safety First"
              description="Temperature-controlled cabins and dedicated pet attendants ensure your pet's comfort."
            />
            <ServiceCard
              icon="🏥"
              title="Vet On Board"
              description="Licensed veterinarians available on every flight for peace of mind."
            />
            <ServiceCard
              icon="🎮"
              title="Pet Entertainment"
              description="Interactive toys and calming music designed specifically for pets."
            />
          </div>
        </section>

        {/* Flight Cards */}
        <section>
          <h2 className="text-3xl font-bold text-pet-navy mb-8">Available Flights</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FlightCard
              from="NYC"
              to="LAX"
              date="Dec 15, 2024"
              price="$299"
              petType="All pets"
            />
            <FlightCard
              from="SFO"
              to="MIA"
              date="Dec 20, 2024"
              price="$249"
              petType="Dogs & Cats"
            />
            <FlightCard
              from="CHI"
              to="DEN"
              date="Dec 18, 2024"
              price="$179"
              petType="Small pets"
            />
          </div>
        </section>

        {/* Pricing Cards */}
        <section>
          <h2 className="text-3xl font-bold text-pet-navy mb-8 text-center">Choose Your Plan</h2>
          <div className="grid md:grid-cols-3 gap-8 items-end">
            <PricingCard
              tier="Basic"
              price="$99"
              features={[
                "Standard cabin",
                "Basic pet amenities",
                "24/7 support"
              ]}
            />
            <PricingCard
              tier="Premium"
              price="$199"
              popular={true}
              features={[
                "Premium cabin space",
                "Gourmet pet meals",
                "Live video streaming",
                "Priority boarding"
              ]}
            />
            <PricingCard
              tier="First Class"
              price="$399"
              features={[
                "Private pet suite",
                "Personal attendant",
                "Spa services",
                "Door-to-door service",
                "Pet concierge"
              ]}
            />
          </div>
        </section>

        {/* Testimonials */}
        <section>
          <h2 className="text-3xl font-bold text-pet-navy mb-8 text-center">Happy Travelers</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <TestimonialCard
              name="Sarah Johnson"
              petName="Max"
              petType="dog"
              review="Max had the best flight experience ever! The staff was amazing and he arrived happy and relaxed."
              rating={5}
            />
            <TestimonialCard
              name="Mike Chen"
              petName="Whiskers"
              petType="cat"
              review="I was worried about flying with my cat, but Pet Airlines made it stress-free for both of us!"
              rating={5}
            />
            <TestimonialCard
              name="Emma Davis"
              petName="Charlie"
              petType="bird"
              review="The specialized bird area was perfect. Charlie sang the whole way!"
              rating={4}
            />
          </div>
        </section>
      </main>
    </div>
  );
};