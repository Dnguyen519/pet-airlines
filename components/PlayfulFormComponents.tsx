import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

// Base Input Component with Playful Styling
interface PlayfulInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  icon?: string;
  emoji?: string;
  error?: string;
  success?: boolean;
}

export const PlayfulInput: React.FC<PlayfulInputProps> = ({
  label,
  hint,
  icon,
  emoji,
  error,
  success,
  className,
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <div className="space-y-2">
      {label && (
        <label className={cn(
          "text-pet-navy font-medium text-sm transition-all duration-200 flex items-center gap-2",
          focused && "text-pet-blue",
          success && "text-green-600"
        )}>
          {emoji && <span className="text-lg animate-float">{emoji}</span>}
          {label} 
          {focused && <span className="text-lg">✨</span>}
        </label>
      )}
      
      <div className="relative group">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pet-navy opacity-50 group-focus-within:opacity-100 transition-opacity">
            {icon}
          </div>
        )}
        
        <input
          className={cn(
            'w-full px-4 py-4 rounded-pet bg-white border-2 border-pet-light focus:border-pet-orange focus:outline-none transition-all duration-200 hover:border-pet-blue text-lg',
            'focus:scale-[1.02] focus:shadow-lg focus:shadow-pet-orange/10',
            icon && 'pl-10',
            error && 'border-red-400 focus:border-red-500',
            success && 'border-green-400 focus:border-green-500',
            className
          )}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => {
            setHasValue(!!e.target.value);
            props.onChange?.(e);
          }}
          {...props}
        />
        
        {success && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
            <span className="text-xl animate-bounce">✅</span>
          </div>
        )}
      </div>
      
      {hint && !error && (
        <p className="text-sm text-gray-500 flex items-center gap-2">
          <span className="text-base">💡</span>
          {hint}
        </p>
      )}
      
      {error && (
        <p className="text-sm text-red-500 flex items-center gap-2 animate-fade-in">
          <span className="text-base">❗</span>
          {error}
        </p>
      )}
    </div>
  );
};

// Playful Select Component
interface PlayfulSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  emoji?: string;
  options: Array<{ value: string; label: string; emoji?: string }>;
  error?: string;
}

export const PlayfulSelect: React.FC<PlayfulSelectProps> = ({
  label,
  hint,
  emoji,
  options,
  error,
  className,
  ...props
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="space-y-2">
      {label && (
        <label className={cn(
          "text-pet-navy font-medium text-sm transition-all duration-200 flex items-center gap-2",
          focused && "text-pet-blue"
        )}>
          {emoji && <span className="text-lg animate-float">{emoji}</span>}
          {label}
          {focused && <span className="text-lg">✨</span>}
        </label>
      )}
      
      <div className="relative">
        <select
          className={cn(
            'w-full px-4 py-4 rounded-pet bg-white border-2 border-pet-light focus:border-pet-orange focus:outline-none transition-all duration-200 hover:border-pet-blue text-lg',
            'focus:scale-[1.02] focus:shadow-lg focus:shadow-pet-orange/10',
            'appearance-none cursor-pointer',
            error && 'border-red-400 focus:border-red-500',
            className
          )}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.emoji ? `${option.emoji} ${option.label}` : option.label}
            </option>
          ))}
        </select>
        
        {/* Custom dropdown arrow */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg className="w-5 h-5 text-pet-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      {hint && !error && (
        <p className="text-sm text-gray-500 flex items-center gap-2">
          <span className="text-base">💡</span>
          {hint}
        </p>
      )}
      
      {error && (
        <p className="text-sm text-red-500 flex items-center gap-2 animate-fade-in">
          <span className="text-base">❗</span>
          {error}
        </p>
      )}
    </div>
  );
};

// Playful Checkbox Component
interface PlayfulCheckboxProps {
  label: string;
  description?: string;
  emoji?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export const PlayfulCheckbox: React.FC<PlayfulCheckboxProps> = ({
  label,
  description,
  emoji,
  checked = false,
  onChange,
  className
}) => {
  return (
    <label className={cn(
      'flex items-start gap-3 p-3 cursor-pointer group hover:bg-pet-light/30 rounded-pet transition-all duration-200',
      className
    )}>
      <div className="relative mt-1">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          className="peer sr-only"
        />
        <div className={cn(
          'w-6 h-6 border-2 border-pet-light rounded-lg transition-all duration-200',
          'peer-checked:bg-pet-blue peer-checked:border-pet-blue',
          'group-hover:border-pet-blue group-hover:shadow-sm'
        )}>
          <svg
            className="w-4 h-4 text-white absolute top-0.5 left-0.5 opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      
      <div className="flex-1">
        <div className="flex items-center gap-2">
          {emoji && (
            <span className="text-xl group-hover:animate-wiggle">{emoji}</span>
          )}
          <span className="font-medium text-pet-navy group-hover:text-pet-blue transition-colors">
            {label}
          </span>
        </div>
        {description && (
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        )}
      </div>
    </label>
  );
};

// Playful Radio Button Group
interface PlayfulRadioOption {
  value: string;
  label: string;
  description?: string;
  emoji?: string;
  price?: number;
}

interface PlayfulRadioGroupProps {
  label?: string;
  name: string;
  options: PlayfulRadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const PlayfulRadioGroup: React.FC<PlayfulRadioGroupProps> = ({
  label,
  name,
  options,
  value,
  onChange,
  className
}) => {
  return (
    <div className={cn('space-y-3', className)}>
      {label && (
        <label className="text-pet-navy font-medium text-lg flex items-center gap-2">
          {label}
          <span className="text-xl animate-float">🎯</span>
        </label>
      )}
      
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(
              'flex items-start gap-3 p-4 cursor-pointer border-2 rounded-pet transition-all duration-200',
              'hover:border-pet-blue hover:bg-pet-light/30 hover:shadow-sm',
              value === option.value
                ? 'border-pet-orange bg-pet-orange/10'
                : 'border-pet-light'
            )}
          >
            <div className="relative mt-1">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={() => onChange?.(option.value)}
                className="peer sr-only"
              />
              <div className="w-6 h-6 border-2 border-pet-light rounded-full peer-checked:border-pet-blue transition-all duration-200">
                <div className="w-3 h-3 bg-pet-blue rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-0 peer-checked:scale-100 transition-transform duration-200" />
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {option.emoji && (
                    <span className="text-2xl">{option.emoji}</span>
                  )}
                  <span className="font-bold text-pet-navy">{option.label}</span>
                </div>
                {option.price && (
                  <span className="bg-pet-orange text-white px-2 py-1 rounded-full text-sm font-bold">
                    ${option.price}
                  </span>
                )}
              </div>
              {option.description && (
                <p className="text-sm text-gray-600 mt-1">{option.description}</p>
              )}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

// Animated Form Section
interface PlayfulFormSectionProps {
  title: string;
  description?: string;
  emoji?: string;
  children: React.ReactNode;
  className?: string;
}

export const PlayfulFormSection: React.FC<PlayfulFormSectionProps> = ({
  title,
  description,
  emoji,
  children,
  className
}) => {
  return (
    <div className={cn(
      'p-6 bg-gradient-to-r from-pet-light/30 to-white rounded-pet border border-pet-light/50 hover:border-pet-blue/30 transition-all duration-300',
      className
    )}>
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-pet-navy mb-2 flex items-center gap-3">
          {emoji && <span className="text-3xl animate-float">{emoji}</span>}
          {title}
        </h3>
        {description && (
          <p className="text-gray-600">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
};

// Progress Indicator
interface PlayfulProgressProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

export const PlayfulProgress: React.FC<PlayfulProgressProps> = ({
  steps,
  currentStep,
  className
}) => {
  return (
    <div className={cn('mb-8', className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center">
              <div className={cn(
                'w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 relative',
                index < currentStep
                  ? 'bg-green-500 text-white'
                  : index === currentStep
                  ? 'bg-pet-blue text-white shadow-lg transform scale-110'
                  : 'bg-gray-200 text-gray-500'
              )}>
                {index < currentStep ? (
                  <span className="animate-bounce">✓</span>
                ) : (
                  index + 1
                )}
                {index === currentStep && (
                  <div className="absolute inset-0 bg-pet-blue rounded-full animate-ping opacity-30" />
                )}
              </div>
              <span className={cn(
                'text-sm mt-2 text-center font-medium transition-colors',
                index <= currentStep ? 'text-pet-navy' : 'text-gray-500'
              )}>
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 h-1 bg-gray-200 mx-4 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-pet-blue to-pet-sky transition-all duration-500 ease-out"
                  style={{ width: index < currentStep ? '100%' : '0%' }}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// Success/Error Message Component
interface PlayfulMessageProps {
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  onClose?: () => void;
  className?: string;
}

export const PlayfulMessage: React.FC<PlayfulMessageProps> = ({
  type,
  title,
  message,
  onClose,
  className
}) => {
  const styles = {
    success: {
      bg: 'bg-gradient-to-r from-green-50 to-emerald-50',
      border: 'border-green-200',
      text: 'text-green-800',
      emoji: '🎉'
    },
    error: {
      bg: 'bg-gradient-to-r from-red-50 to-pink-50',
      border: 'border-red-200',
      text: 'text-red-800',
      emoji: '😢'
    },
    info: {
      bg: 'bg-gradient-to-r from-blue-50 to-sky-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      emoji: '💡'
    },
    warning: {
      bg: 'bg-gradient-to-r from-yellow-50 to-amber-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      emoji: '⚠️'
    }
  };

  const style = styles[type];

  return (
    <div className={cn(
      'p-4 rounded-pet border-2 animate-fade-in',
      style.bg,
      style.border,
      className
    )}>
      <div className="flex items-start gap-3">
        <span className="text-2xl animate-bounce">{style.emoji}</span>
        <div className="flex-1">
          <h4 className={cn('font-bold mb-1', style.text)}>{title}</h4>
          <p className={cn('text-sm', style.text)}>{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className={cn('hover:opacity-70 transition-opacity', style.text)}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

// Form Container
interface PlayfulFormProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onSubmit?: () => void;
  className?: string;
}

export const PlayfulForm: React.FC<PlayfulFormProps> = ({
  title,
  subtitle,
  children,
  onSubmit,
  className
}) => {
  return (
    <div className={cn(
      'bg-white rounded-pet shadow-2xl p-8 relative overflow-hidden',
      className
    )}>
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-pet-orange opacity-5 rounded-full transform translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-pet-blue opacity-5 rounded-full transform -translate-x-12 translate-y-12"></div>
      
      <div className="relative">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-pet-navy mb-2">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-600">{subtitle}</p>
          )}
        </div>
        
        <div className="space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
};