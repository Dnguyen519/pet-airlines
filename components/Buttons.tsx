import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'playful' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-pet-blue hover:bg-blue-600 text-white focus:ring-pet-blue',
    secondary: 'bg-pet-orange hover:bg-orange-500 text-white focus:ring-pet-orange',
    playful: 'bg-gradient-to-r from-pet-blue to-pet-sky hover:from-pet-sky hover:to-pet-blue text-white transform hover:scale-105 hover:shadow-lg',
    outline: 'border-2 border-pet-navy text-pet-navy hover:bg-pet-navy hover:text-white',
    ghost: 'text-pet-navy hover:bg-pet-light hover:text-pet-blue',
  };
  
  const sizes = {
    sm: 'px-4 py-1.5 text-sm gap-1.5',
    md: 'px-6 py-2.5 text-base gap-2',
    lg: 'px-8 py-3 text-lg gap-3',
  };
  
  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
};

export const PlayfulButton: React.FC<ButtonProps> = ({
  children,
  className,
  ...props
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <button
      className={cn(
        'relative bg-pet-orange hover:bg-orange-500 text-white px-8 py-3 rounded-pet font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-xl overflow-hidden',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
        <span className={`transition-all duration-300 ${isHovered ? 'rotate-12' : ''}`}>
          ✈️
        </span>
      </span>
      <div className={`absolute inset-0 bg-gradient-to-r from-pet-blue to-pet-sky transform transition-transform duration-300 ${
        isHovered ? 'translate-x-0' : '-translate-x-full'
      }`} />
    </button>
  );
};

export const IconButton: React.FC<ButtonProps & { emoji: string }> = ({
  children,
  emoji,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        'group relative bg-white border-2 border-pet-light hover:border-pet-blue text-pet-navy px-6 py-3 rounded-pet font-medium transition-all duration-200 hover:shadow-lg',
        className
      )}
      {...props}
    >
      <span className="flex items-center gap-3">
        <span className="text-2xl group-hover:animate-wiggle">{emoji}</span>
        {children}
      </span>
    </button>
  );
};

export const ButtonGroup: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-pet-navy font-bold text-lg">Pet Airlines Button Variants</h3>
      <div className="flex flex-wrap gap-4">
        <Button variant="primary">Book Now</Button>
        <Button variant="secondary">Learn More</Button>
        <Button variant="playful">Start Journey</Button>
        <Button variant="outline">View Prices</Button>
        <Button variant="ghost">Cancel</Button>
      </div>
      
      <div className="flex flex-wrap gap-4">
        <PlayfulButton>Fly with Pets</PlayfulButton>
        <IconButton emoji="🐕">Dog Travel</IconButton>
        <IconButton emoji="🐈">Cat Travel</IconButton>
        <IconButton emoji="🦜">Bird Travel</IconButton>
      </div>
      
      <div className="flex flex-wrap gap-4">
        <Button size="sm" variant="secondary">Small</Button>
        <Button size="md" variant="secondary">Medium</Button>
        <Button size="lg" variant="secondary">Large</Button>
      </div>
    </div>
  );
};