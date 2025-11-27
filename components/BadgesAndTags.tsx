import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'info' | 'playful';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className
}) => {
  const variants = {
    default: 'bg-pet-light text-pet-navy',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-orange-100 text-orange-700',
    info: 'bg-blue-100 text-blue-700',
    playful: 'bg-gradient-to-r from-pet-orange to-orange-400 text-white'
  };
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base'
  };
  
  return (
    <span className={cn(
      'inline-flex items-center gap-1 rounded-full font-medium',
      variants[variant],
      sizes[size],
      className
    )}>
      {children}
    </span>
  );
};

export const AnimatedBadge: React.FC<BadgeProps & { icon?: string }> = ({
  children,
  icon,
  className
}) => {
  return (
    <span className={cn(
      'inline-flex items-center gap-2 bg-pet-orange text-white px-4 py-2 rounded-full font-bold transform hover:scale-105 transition-all duration-200 hover:shadow-lg',
      className
    )}>
      {icon && <span className="animate-bounce text-lg">{icon}</span>}
      {children}
    </span>
  );
};

export const Tag: React.FC<{
  children: React.ReactNode;
  onRemove?: () => void;
  color?: 'blue' | 'orange' | 'green' | 'purple';
}> = ({ children, onRemove, color = 'blue' }) => {
  const colors = {
    blue: 'bg-pet-light text-pet-blue border-pet-blue',
    orange: 'bg-orange-50 text-pet-orange border-pet-orange',
    green: 'bg-green-50 text-green-700 border-green-700',
    purple: 'bg-purple-50 text-purple-700 border-purple-700'
  };
  
  return (
    <span className={cn(
      'inline-flex items-center gap-2 px-3 py-1.5 rounded-pet border',
      colors[color]
    )}>
      {children}
      {onRemove && (
        <button
          onClick={onRemove}
          className="hover:bg-black/10 rounded-full p-0.5 transition-colors"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </span>
  );
};

export const StatusBadge: React.FC<{
  status: 'active' | 'pending' | 'completed' | 'cancelled';
}> = ({ status }) => {
  const styles = {
    active: { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' },
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-500' },
    completed: { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' },
    cancelled: { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500' }
  };
  
  const { bg, text, dot } = styles[status];
  
  return (
    <span className={cn('inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium', bg, text)}>
      <span className={cn('w-2 h-2 rounded-full', dot, status === 'active' && 'animate-pulse')} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export const PetTypeBadge: React.FC<{
  petType: 'dog' | 'cat' | 'bird' | 'rabbit' | 'other';
  size?: 'sm' | 'md' | 'lg';
}> = ({ petType, size = 'md' }) => {
  const pets = {
    dog: { icon: '🐕', label: 'Dog', color: 'bg-amber-100 text-amber-700' },
    cat: { icon: '🐈', label: 'Cat', color: 'bg-purple-100 text-purple-700' },
    bird: { icon: '🦜', label: 'Bird', color: 'bg-green-100 text-green-700' },
    rabbit: { icon: '🐰', label: 'Rabbit', color: 'bg-pink-100 text-pink-700' },
    other: { icon: '🐾', label: 'Other', color: 'bg-gray-100 text-gray-700' }
  };
  
  const sizes = {
    sm: 'px-2 py-1 text-xs gap-1',
    md: 'px-3 py-1.5 text-sm gap-1.5',
    lg: 'px-4 py-2 text-base gap-2'
  };
  
  const { icon, label, color } = pets[petType];
  
  return (
    <span className={cn(
      'inline-flex items-center rounded-full font-medium',
      color,
      sizes[size]
    )}>
      <span>{icon}</span>
      <span>{label}</span>
    </span>
  );
};

export const FeatureBadge: React.FC<{
  feature: string;
  icon: string;
}> = ({ feature, icon }) => {
  return (
    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pet-light to-white px-4 py-2 rounded-pet border border-pet-blue/20 hover:border-pet-blue/40 transition-colors">
      <span className="text-2xl">{icon}</span>
      <span className="font-medium text-pet-navy">{feature}</span>
    </div>
  );
};

export const BadgeShowcase: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-pet-navy mb-4">Standard Badges</h3>
        <div className="flex flex-wrap gap-3">
          <Badge>Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="playful">Playful</Badge>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-pet-navy mb-4">Animated Badges</h3>
        <div className="flex flex-wrap gap-3">
          <AnimatedBadge icon="✈️">Now Boarding</AnimatedBadge>
          <AnimatedBadge icon="🎉">Limited Offer</AnimatedBadge>
          <AnimatedBadge icon="⭐">Premium</AnimatedBadge>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-pet-navy mb-4">Status Badges</h3>
        <div className="flex flex-wrap gap-3">
          <StatusBadge status="active" />
          <StatusBadge status="pending" />
          <StatusBadge status="completed" />
          <StatusBadge status="cancelled" />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-pet-navy mb-4">Pet Type Badges</h3>
        <div className="flex flex-wrap gap-3">
          <PetTypeBadge petType="dog" />
          <PetTypeBadge petType="cat" />
          <PetTypeBadge petType="bird" />
          <PetTypeBadge petType="rabbit" />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-pet-navy mb-4">Tags</h3>
        <div className="flex flex-wrap gap-3">
          <Tag color="blue">Friendly Staff</Tag>
          <Tag color="orange" onRemove={() => {}}>Climate Control</Tag>
          <Tag color="green">Vet Approved</Tag>
          <Tag color="purple">24/7 Support</Tag>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-pet-navy mb-4">Feature Badges</h3>
        <div className="flex flex-wrap gap-3">
          <FeatureBadge feature="GPS Tracking" icon="📍" />
          <FeatureBadge feature="Live Camera" icon="📹" />
          <FeatureBadge feature="Insurance" icon="🛡️" />
        </div>
      </div>
    </div>
  );
};