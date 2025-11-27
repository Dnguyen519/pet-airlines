import React from 'react';
import { PetAirlinesLogo } from './PetAirlinesLogo';

export const Navigation: React.FC = () => {
  return (
    <nav className="bg-white border-b-2 border-pet-light shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <PetAirlinesLogo variant="default" />
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-pet-navy hover:text-pet-blue transition-colors duration-200 font-medium">
              Book Flight
            </a>
            <a href="#" className="text-pet-navy hover:text-pet-blue transition-colors duration-200 font-medium">
              Pet Travel Guide
            </a>
            <a href="#" className="text-pet-navy hover:text-pet-blue transition-colors duration-200 font-medium">
              About Us
            </a>
            <button className="bg-pet-orange hover:bg-orange-500 text-white px-6 py-2 rounded-full font-medium transition-all duration-200 transform hover:scale-105">
              Sign In
            </button>
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
  );
};

export const NavigationPlayful: React.FC = () => {
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);
  
  return (
    <nav className="bg-gradient-to-r from-pet-light to-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="animate-float">
            <PetAirlinesLogo variant="large" />
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            {['Book Flight', 'Pet Travel', 'Safety', 'Contact'].map((item) => (
              <a
                key={item}
                href="#"
                className={`relative px-4 py-2 text-pet-navy font-medium transition-all duration-300 ${
                  hoveredItem === item ? 'text-pet-blue' : ''
                }`}
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {item}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-pet-orange transform origin-left transition-transform duration-300 ${
                  hoveredItem === item ? 'scale-x-100' : 'scale-x-0'
                }`} />
                {hoveredItem === item && (
                  <span className="absolute -top-2 -right-2 text-2xl animate-bounce">✈️</span>
                )}
              </a>
            ))}
            
            <button className="bg-gradient-to-r from-pet-blue to-pet-sky hover:from-pet-sky hover:to-pet-blue text-white px-8 py-3 rounded-pet font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
              <span className="flex items-center gap-2">
                <span>Get Started</span>
                <span className="text-xl">🐕</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};