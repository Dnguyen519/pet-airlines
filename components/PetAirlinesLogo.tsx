import React from 'react';

interface LogoProps {
  variant?: 'default' | 'small' | 'large' | 'icon-only';
  className?: string;
}

export const PetAirlinesLogo: React.FC<LogoProps> = ({ variant = 'default', className = '' }) => {
  const sizes = {
    'small': 'h-8',
    'default': 'h-12',
    'large': 'h-20',
    'icon-only': 'h-10'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg 
        className={`${sizes[variant]}`}
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Airplane body */}
        <path 
          d="M20 50 Q30 30 50 35 L80 40 Q85 45 80 50 L50 55 Q30 60 20 50" 
          fill="#3B9AE1" 
          stroke="#1B3A5F" 
          strokeWidth="2"
        />
        
        {/* Wings */}
        <path 
          d="M40 45 L30 35 Q28 33 30 35 L40 40" 
          fill="#FFA366" 
          stroke="#1B3A5F" 
          strokeWidth="2"
        />
        
        {/* Dog head (simplified) */}
        <circle cx="55" cy="45" r="8" fill="white" stroke="#1B3A5F" strokeWidth="2"/>
        <circle cx="53" cy="43" r="1.5" fill="#1B3A5F"/>
        <path d="M58 48 Q60 49 62 48" stroke="#1B3A5F" strokeWidth="1.5" fill="none"/>
      </svg>
      
      {variant !== 'icon-only' && (
        <div className="flex flex-col">
          <span className="text-[#1B3A5F] font-bold text-xl leading-tight">PET</span>
          <span className="text-[#1B3A5F] font-bold text-xl leading-tight">AIRLINES</span>
        </div>
      )}
    </div>
  );
};

export const PetAirlinesLogoAnimated: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="animate-bounce-slow">
        <PetAirlinesLogo variant="default" />
      </div>
      <div className="absolute -bottom-2 left-4 w-20 h-2 bg-gray-200 rounded-full blur-md animate-scale-x" />
    </div>
  );
};