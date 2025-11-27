import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from './Buttons';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={cn(
      'bg-white rounded-pet shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden',
      className
    )}>
      {children}
    </div>
  );
};

export const PlayfulCard: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={cn(
      'relative bg-gradient-to-br from-pet-light to-white rounded-pet shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden',
      className
    )}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-pet-orange opacity-10 rounded-full transform translate-x-16 -translate-y-16" />
      {children}
    </div>
  );
};

export const ServiceCard: React.FC<{
  title: string;
  description: string;
  icon: string;
  price?: string;
}> = ({ title, description, icon, price }) => {
  return (
    <PlayfulCard className="p-6">
      <div className="flex items-start gap-4">
        <div className="text-4xl animate-float">{icon}</div>
        <div className="flex-1">
          <h3 className="text-pet-navy font-bold text-xl mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          {price && (
            <p className="text-pet-orange font-bold text-2xl mb-4">{price}</p>
          )}
          <Button variant="secondary" size="sm">
            Learn More
          </Button>
        </div>
      </div>
    </PlayfulCard>
  );
};

export const FlightCard: React.FC<{
  from: string;
  to: string;
  date: string;
  price: string;
  petType: string;
}> = ({ from, to, date, price, petType }) => {
  return (
    <Card className="p-6 border-2 border-pet-light hover:border-pet-blue transition-colors duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 text-pet-navy">
            <span className="font-bold text-lg">{from}</span>
            <span>→</span>
            <span className="font-bold text-lg">{to}</span>
          </div>
          <p className="text-gray-500 text-sm mt-1">{date}</p>
        </div>
        <div className="text-right">
          <p className="text-pet-orange font-bold text-2xl">{price}</p>
          <p className="text-gray-500 text-sm">per pet</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 mb-4">
        <span className="bg-pet-light text-pet-navy px-3 py-1 rounded-full text-sm font-medium">
          {petType} friendly
        </span>
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
          Climate controlled
        </span>
      </div>
      
      <Button variant="primary" className="w-full">
        Select Flight
      </Button>
    </Card>
  );
};

export const TestimonialCard: React.FC<{
  name: string;
  petName: string;
  petType: string;
  review: string;
  rating: number;
}> = ({ name, petName, petType, review, rating }) => {
  return (
    <PlayfulCard className="p-6">
      <div className="flex items-center gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < rating ? 'text-pet-orange' : 'text-gray-300'}>
            ★
          </span>
        ))}
      </div>
      
      <p className="text-gray-700 mb-4 italic">&ldquo;{review}&rdquo;</p>
      
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-pet-light rounded-full flex items-center justify-center text-2xl">
          {petType === 'dog' ? '🐕' : petType === 'cat' ? '🐈' : '🦜'}
        </div>
        <div>
          <p className="font-bold text-pet-navy">{name}</p>
          <p className="text-sm text-gray-500">Flying with {petName}</p>
        </div>
      </div>
    </PlayfulCard>
  );
};

export const PricingCard: React.FC<{
  tier: string;
  price: string;
  features: string[];
  popular?: boolean;
}> = ({ tier, price, features, popular = false }) => {
  return (
    <div className={cn(
      'relative transition-all duration-300',
      popular && 'transform scale-105'
    )}>
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-pet-orange text-white px-4 py-1 rounded-full text-sm font-bold">
          Most Popular
        </div>
      )}
      
      <Card className={cn(
        'p-8',
        popular && 'border-2 border-pet-orange'
      )}>
        <h3 className="text-2xl font-bold text-pet-navy mb-2">{tier}</h3>
        <p className="text-4xl font-bold text-pet-blue mb-6">
          {price}
          <span className="text-lg text-gray-500 font-normal">/trip</span>
        </p>
        
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button 
          variant={popular ? 'playful' : 'outline'} 
          className="w-full"
        >
          Choose {tier}
        </Button>
      </Card>
    </div>
  );
};