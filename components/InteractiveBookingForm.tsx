import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface BookingStep {
  id: number;
  title: string;
  description: string;
  emoji: string;
}

interface PetInfo {
  name: string;
  type: string;
  weight: number;
  age: number;
  specialNeeds: string[];
}

interface RouteInfo {
  id: string;
  from: string;
  to: string;
  price: number;
  duration: string;
}

interface Service {
  id: string;
  name: string;
  emoji: string;
  price: number;
  description: string;
}

const BOOKING_STEPS: BookingStep[] = [
  { id: 1, title: 'Pet Info', description: 'Tell us about your furry friend', emoji: '🐕' },
  { id: 2, title: 'Route', description: 'Choose your adventure', emoji: '🗺️' },
  { id: 3, title: 'Services', description: 'Make it extra special', emoji: '⭐' }
];

const PET_TYPES = [
  { value: 'dog', label: 'Doggo (Best friend!)', emoji: '🐕' },
  { value: 'cat', label: 'Kitty Cat (Purr-fect!)', emoji: '🐈' },
  { value: 'bird', label: 'Birdie (Tweet tweet!)', emoji: '🦜' },
  { value: 'rabbit', label: 'Bunny (Hop hop!)', emoji: '🐰' },
  { value: 'hamster', label: 'Hamster (So tiny!)', emoji: '🐹' }
];

const POPULAR_ROUTES: RouteInfo[] = [
  { id: 'NYC-LAX', from: 'NYC', to: 'LAX', price: 299, duration: '5h 30m' },
  { id: 'SFO-MIA', from: 'SFO', to: 'MIA', price: 279, duration: '5h 15m' },
  { id: 'CHI-DEN', from: 'CHI', to: 'DEN', price: 179, duration: '2h 30m' }
];

const AVAILABLE_SERVICES: Service[] = [
  { id: 'premium-meal', name: 'Gourmet Pet Meal', emoji: '🍽️', price: 25, description: 'Specially prepared organic treats and meals during flight' },
  { id: 'live-tracking', name: 'Live Pet Cam', emoji: '📹', price: 15, description: 'Watch your pet\'s journey in real-time on your phone' },
  { id: 'spa-service', name: 'In-Flight Spa', emoji: '🧴', price: 45, description: 'Gentle grooming and relaxation massage service' },
  { id: 'pickup', name: 'Door-to-Door', emoji: '🚗', price: 50, description: 'We pick up and deliver your pet safely' }
];

const SPECIAL_NEEDS = [
  { id: 'anxiety', label: 'Anxiety or nervousness' },
  { id: 'medication', label: 'Takes medication' },
  { id: 'dietary', label: 'Special diet' },
  { id: 'senior', label: 'Senior pet (7+ years)' }
];

interface InteractiveBookingFormProps {
  onComplete?: (bookingData: any) => void;
  className?: string;
}

export const InteractiveBookingForm: React.FC<InteractiveBookingFormProps> = ({
  onComplete,
  className
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [petInfo, setPetInfo] = useState<PetInfo>({
    name: '',
    type: '',
    weight: 0,
    age: 0,
    specialNeeds: []
  });
  const [selectedRoute, setSelectedRoute] = useState<RouteInfo | null>(null);
  const [customRoute, setCustomRoute] = useState({ departure: '', arrival: '' });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextStep = () => {
    if (!validateStep()) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(prev => Math.min(prev + 1, BOOKING_STEPS.length));
      setIsAnimating(false);
    }, 300);
  };

  const prevStep = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(prev => Math.max(prev - 1, 1));
      setIsAnimating(false);
    }, 300);
  };

  const validateStep = (): boolean => {
    switch (currentStep) {
      case 1:
        return !!(petInfo.name && petInfo.type && petInfo.weight && petInfo.age);
      case 2:
        return !!(selectedRoute || (customRoute.departure && customRoute.arrival));
      case 3:
        return true;
      default:
        return true;
    }
  };

  const handlePetInfoChange = (field: keyof PetInfo, value: any) => {
    setPetInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSpecialNeedsChange = (needId: string, checked: boolean) => {
    setPetInfo(prev => ({
      ...prev,
      specialNeeds: checked
        ? [...prev.specialNeeds, needId]
        : prev.specialNeeds.filter(id => id !== needId)
    }));
  };

  const handleRouteSelect = (route: RouteInfo) => {
    setSelectedRoute(route);
    setCustomRoute({ departure: '', arrival: '' });
  };

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const calculateTotal = (): number => {
    const basePrice = selectedRoute?.price || 299;
    const servicesTotal = selectedServices.reduce((total, serviceId) => {
      const service = AVAILABLE_SERVICES.find(s => s.id === serviceId);
      return total + (service?.price || 0);
    }, 0);
    return basePrice + servicesTotal;
  };

  const handleCompleteBooking = () => {
    const bookingData = {
      pet: petInfo,
      route: selectedRoute || customRoute,
      services: selectedServices,
      total: calculateTotal()
    };
    
    if (onComplete) {
      onComplete(bookingData);
    }
  };

  const StepIndicator = () => (
    <div className="flex justify-center mb-8">
      <div className="flex items-center gap-4">
        {BOOKING_STEPS.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className={cn(
              'flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg transition-all duration-300',
              currentStep >= step.id
                ? 'bg-pet-blue text-white shadow-lg transform scale-110'
                : 'bg-gray-200 text-gray-500'
            )}>
              {currentStep > step.id ? '✓' : step.id}
            </div>
            {index < BOOKING_STEPS.length - 1 && (
              <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-pet-blue transition-all duration-500 ease-out"
                  style={{ width: currentStep > step.id ? '100%' : '0%' }}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  const PetInfoStep = () => (
    <div className={cn('space-y-6', isAnimating && 'opacity-50')}>
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-pet-navy mb-2">
          Tell us about your furry friend!
          <span className="ml-3 text-4xl animate-wiggle inline-block">🐕</span>
        </h3>
        <p className="text-gray-600">We'll use this to prepare the perfect journey</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-pet-navy font-medium block">What's your pet's name?</label>
          <input
            type="text"
            placeholder="e.g., Buddy, Luna, Max..."
            value={petInfo.name}
            onChange={(e) => handlePetInfoChange('name', e.target.value)}
            className="w-full px-4 py-4 rounded-pet bg-white border-2 border-pet-light focus:border-pet-orange focus:outline-none transition-all duration-200 hover:border-pet-blue text-lg focus:scale-[1.02]"
          />
          <p className="text-sm text-gray-500">We'll use this to personalize their journey!</p>
        </div>

        <div className="space-y-2">
          <label className="text-pet-navy font-medium block">What type of pet?</label>
          <select
            value={petInfo.type}
            onChange={(e) => handlePetInfoChange('type', e.target.value)}
            className="w-full px-4 py-4 rounded-pet bg-white border-2 border-pet-light focus:border-pet-orange focus:outline-none transition-all duration-200 hover:border-pet-blue text-lg focus:scale-[1.02]"
          >
            <option value="">Choose your companion</option>
            {PET_TYPES.map(type => (
              <option key={type.value} value={type.value}>
                {type.emoji} {type.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-pet-navy font-medium block">How much do they weigh?</label>
          <input
            type="number"
            placeholder="Weight in lbs"
            value={petInfo.weight || ''}
            onChange={(e) => handlePetInfoChange('weight', Number(e.target.value))}
            className="w-full px-4 py-4 rounded-pet bg-white border-2 border-pet-light focus:border-pet-orange focus:outline-none transition-all duration-200 hover:border-pet-blue text-lg focus:scale-[1.02]"
          />
          <p className="text-sm text-gray-500">This helps us prepare the perfect cabin size!</p>
        </div>

        <div className="space-y-2">
          <label className="text-pet-navy font-medium block">How old are they?</label>
          <input
            type="number"
            placeholder="Age in years"
            value={petInfo.age || ''}
            onChange={(e) => handlePetInfoChange('age', Number(e.target.value))}
            className="w-full px-4 py-4 rounded-pet bg-white border-2 border-pet-light focus:border-pet-orange focus:outline-none transition-all duration-200 hover:border-pet-blue text-lg focus:scale-[1.02]"
          />
          <p className="text-sm text-gray-500">Young or senior, we love them all!</p>
        </div>
      </div>

      <div className="p-6 bg-pet-light/30 rounded-pet">
        <h4 className="text-lg font-bold text-pet-navy mb-3 flex items-center gap-2">
          Any special needs?
          <span className="text-2xl">🏥</span>
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          {SPECIAL_NEEDS.map(need => (
            <label key={need.id} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={petInfo.specialNeeds.includes(need.id)}
                onChange={(e) => handleSpecialNeedsChange(need.id, e.target.checked)}
                className="w-5 h-5 text-pet-blue rounded border-2 border-pet-light"
              />
              <span className="text-pet-navy group-hover:text-pet-blue transition-colors">
                {need.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const RouteStep = () => (
    <div className={cn('space-y-6', isAnimating && 'opacity-50')}>
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-pet-navy mb-2">
          Where are you and your pal going?
          <span className="ml-3 text-4xl animate-wiggle inline-block">🌎</span>
        </h3>
        <p className="text-gray-600">Choose from popular routes or create your own</p>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-semibold text-pet-navy mb-4 flex items-center gap-2">
          <span className="text-2xl">🔥</span>
          Popular Routes
        </h4>
        <div className="grid md:grid-cols-3 gap-4">
          {POPULAR_ROUTES.map(route => (
            <div
              key={route.id}
              onClick={() => handleRouteSelect(route)}
              className={cn(
                'p-4 border-2 rounded-pet cursor-pointer transition-all duration-200 hover:shadow-lg',
                selectedRoute?.id === route.id
                  ? 'border-pet-orange bg-pet-orange/10 shadow-md'
                  : 'border-pet-light hover:border-pet-blue hover:bg-pet-light/30'
              )}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-bold text-pet-navy text-lg">{route.from} → {route.to}</p>
                  <p className="text-sm text-gray-600">Daily flights • {route.duration}</p>
                </div>
                <p className="text-2xl font-bold text-pet-orange">${route.price}</p>
              </div>
              <span className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm">
                Climate controlled
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 bg-gray-50 rounded-pet">
        <h4 className="text-lg font-semibold text-pet-navy mb-4 flex items-center gap-2">
          <span className="text-2xl">🛫</span>
          Or create your own route
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Departure city"
            value={customRoute.departure}
            onChange={(e) => setCustomRoute(prev => ({ ...prev, departure: e.target.value }))}
            className="px-4 py-3 rounded-pet border-2 border-pet-light focus:border-pet-orange focus:outline-none transition-all focus:scale-[1.02]"
          />
          <input
            type="text"
            placeholder="Arrival city"
            value={customRoute.arrival}
            onChange={(e) => setCustomRoute(prev => ({ ...prev, arrival: e.target.value }))}
            className="px-4 py-3 rounded-pet border-2 border-pet-light focus:border-pet-orange focus:outline-none transition-all focus:scale-[1.02]"
          />
        </div>
      </div>
    </div>
  );

  const ServicesStep = () => (
    <div className={cn('space-y-6', isAnimating && 'opacity-50')}>
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-pet-navy mb-2">
          Make it extra special!
          <span className="ml-3 text-4xl animate-wiggle inline-block">⭐</span>
        </h3>
        <p className="text-gray-600">Add premium services for the ultimate pet experience</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {AVAILABLE_SERVICES.map(service => (
          <label
            key={service.id}
            className={cn(
              'flex items-start gap-4 p-4 border-2 rounded-pet cursor-pointer transition-all duration-200 hover:shadow-lg',
              selectedServices.includes(service.id)
                ? 'border-pet-blue bg-pet-blue/10'
                : 'border-pet-light hover:border-pet-blue hover:bg-pet-light/30'
            )}
          >
            <input
              type="checkbox"
              checked={selectedServices.includes(service.id)}
              onChange={() => handleServiceToggle(service.id)}
              className="w-6 h-6 text-pet-blue mt-1 rounded"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">{service.emoji}</span>
                <span className="font-bold text-pet-navy">{service.name}</span>
                <span className="bg-pet-orange text-white px-2 py-1 rounded-full text-sm font-bold">
                  +${service.price}
                </span>
              </div>
              <p className="text-sm text-gray-600">{service.description}</p>
            </div>
          </label>
        ))}
      </div>

      <div className="p-6 bg-pet-light/50 rounded-pet">
        <h4 className="text-lg font-bold text-pet-navy mb-4 flex items-center gap-2">
          <span className="text-2xl">🧾</span>
          Trip Summary
        </h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Base flight</span>
            <span className="font-medium">${selectedRoute?.price || 299}</span>
          </div>
          {selectedServices.map(serviceId => {
            const service = AVAILABLE_SERVICES.find(s => s.id === serviceId);
            if (!service) return null;
            return (
              <div key={serviceId} className="flex justify-between">
                <span className="text-gray-600">{service.name}</span>
                <span className="font-medium">+${service.price}</span>
              </div>
            );
          })}
          <div className="border-t border-gray-300 pt-2 mt-2">
            <div className="flex justify-between text-lg font-bold text-pet-navy">
              <span>Total</span>
              <span>${calculateTotal()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return <PetInfoStep />;
      case 2: return <RouteStep />;
      case 3: return <ServicesStep />;
      default: return null;
    }
  };

  return (
    <div className={cn('bg-white rounded-pet shadow-2xl p-8 max-w-4xl mx-auto relative overflow-hidden', className)}>
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-pet-orange opacity-5 rounded-full transform translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-pet-blue opacity-5 rounded-full transform -translate-x-12 translate-y-12"></div>
      
      <div className="relative">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-pet-navy mb-4 flex items-center justify-center gap-3">
            Quick Paw Booking
            <span className="text-4xl animate-wiggle">🐾</span>
          </h2>
          <p className="text-xl text-gray-600">Book your pet's adventure in just a few taps!</p>
        </div>

        <StepIndicator />
        
        <div className="mb-8 transition-all duration-300">
          {renderCurrentStep()}
        </div>

        <div className="flex justify-between">
          {currentStep > 1 && (
            <button
              onClick={prevStep}
              className="border-2 border-pet-navy text-pet-navy hover:bg-pet-navy hover:text-white px-8 py-3 rounded-pet font-medium transition-all"
            >
              ← Back
            </button>
          )}
          
          <div className="flex-1 flex justify-end">
            {currentStep < BOOKING_STEPS.length ? (
              <button
                onClick={nextStep}
                disabled={!validateStep()}
                className={cn(
                  'px-12 py-4 rounded-pet font-bold text-lg transition-all shadow-lg',
                  validateStep()
                    ? 'bg-gradient-to-r from-pet-blue to-pet-sky hover:from-pet-sky hover:to-pet-blue text-white transform hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                )}
              >
                <span className="flex items-center gap-3">
                  Next: {BOOKING_STEPS[currentStep]?.description}
                  <span className="text-xl animate-float">
                    {BOOKING_STEPS[currentStep]?.emoji}
                  </span>
                </span>
              </button>
            ) : (
              <button
                onClick={handleCompleteBooking}
                className="bg-gradient-to-r from-pet-orange to-orange-500 hover:from-orange-500 hover:to-pet-orange text-white px-12 py-4 rounded-pet font-bold text-lg transform hover:scale-105 transition-all shadow-lg"
              >
                <span className="flex items-center gap-3">
                  Complete Booking
                  <span className="text-2xl animate-bounce">🎉</span>
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveBookingForm;