import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  icon,
  error,
  className,
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-pet-navy font-medium text-sm">{label}</label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pet-navy opacity-50">
            {icon}
          </div>
        )}
        <input
          className={cn(
            'w-full px-4 py-2.5 rounded-pet border-2 border-pet-light focus:border-pet-blue focus:outline-none transition-colors',
            icon && 'pl-10',
            error && 'border-red-400',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
};

export const PlayfulInput: React.FC<InputProps> = ({
  label,
  className,
  ...props
}) => {
  const [focused, setFocused] = React.useState(false);
  
  return (
    <div className="space-y-1">
      {label && (
        <label className={cn(
          "text-pet-navy font-medium text-sm transition-all duration-200",
          focused && "text-pet-blue"
        )}>
          {label} {focused && '✈️'}
        </label>
      )}
      <div className="relative">
        <input
          className={cn(
            'w-full px-4 py-3 rounded-pet bg-white border-2 border-pet-light focus:border-pet-orange focus:outline-none transition-all duration-200 hover:border-pet-blue',
            focused && 'shadow-lg transform scale-[1.02]',
            className
          )}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
      </div>
    </div>
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string; icon?: string }[];
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  className,
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-pet-navy font-medium text-sm">{label}</label>
      )}
      <select
        className={cn(
          'w-full px-4 py-2.5 rounded-pet border-2 border-pet-light focus:border-pet-blue focus:outline-none transition-colors appearance-none bg-white',
          'bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' fill=\'%231B3A5F\' viewBox=\'0 0 16 16\'%3E%3Cpath d=\'M8 11L3 6h10z\'/%3E%3C/svg%3E")] bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10',
          className
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.icon} {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export const Checkbox: React.FC<{
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}> = ({ label, checked = false, onChange }) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          className="peer sr-only"
        />
        <div className="w-5 h-5 border-2 border-pet-light rounded-md peer-checked:bg-pet-blue peer-checked:border-pet-blue transition-all duration-200 group-hover:border-pet-blue">
          <svg
            className="w-3 h-3 text-white absolute top-0.5 left-0.5 opacity-0 peer-checked:opacity-100 transition-opacity"
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
      <span className="text-pet-navy select-none">{label}</span>
    </label>
  );
};

export const RadioButton: React.FC<{
  label: string;
  value: string;
  name: string;
  checked?: boolean;
  onChange?: () => void;
}> = ({ label, value, name, checked = false, onChange }) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className="relative">
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          className="peer sr-only"
        />
        <div className="w-5 h-5 border-2 border-pet-light rounded-full peer-checked:border-pet-blue transition-all duration-200 group-hover:border-pet-blue">
          <div className="w-2.5 h-2.5 bg-pet-blue rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-0 peer-checked:scale-100 transition-transform duration-200" />
        </div>
      </div>
      <span className="text-pet-navy select-none">{label}</span>
    </label>
  );
};

export const Toggle: React.FC<{
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}> = ({ label, checked = false, onChange }) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          className="peer sr-only"
        />
        <div className="w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-pet-blue transition-colors duration-200">
          <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform duration-200 peer-checked:translate-x-6 shadow-sm" />
        </div>
      </div>
      <span className="text-pet-navy font-medium">{label}</span>
    </label>
  );
};

export const PetForm: React.FC = () => {
  return (
    <div className="bg-white rounded-pet shadow-lg p-8 max-w-2xl">
      <h3 className="text-2xl font-bold text-pet-navy mb-6">Book Your Pet's Flight</h3>
      
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <PlayfulInput label="Pet Name" placeholder="Enter your pet's name" />
          <Select
            label="Pet Type"
            options={[
              { value: 'dog', label: 'Dog', icon: '🐕' },
              { value: 'cat', label: 'Cat', icon: '🐈' },
              { value: 'bird', label: 'Bird', icon: '🦜' },
              { value: 'rabbit', label: 'Rabbit', icon: '🐰' },
            ]}
          />
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <Input label="Departure City" placeholder="From" />
          <Input label="Arrival City" placeholder="To" />
        </div>
        
        <div className="space-y-3">
          <p className="text-pet-navy font-medium">Travel Preferences</p>
          <div className="space-y-2">
            <Checkbox label="Window seat preferred" />
            <Checkbox label="Special dietary requirements" />
            <Checkbox label="Anxiety medication needed" />
          </div>
        </div>
        
        <div className="space-y-3">
          <p className="text-pet-navy font-medium">Cabin Class</p>
          <div className="space-y-2">
            <RadioButton label="Economy" value="economy" name="cabin" />
            <RadioButton label="Premium" value="premium" name="cabin" />
            <RadioButton label="First Class" value="first" name="cabin" />
          </div>
        </div>
        
        <Toggle label="Add pet insurance" />
        
        <button className="w-full bg-gradient-to-r from-pet-blue to-pet-sky hover:from-pet-sky hover:to-pet-blue text-white py-3 rounded-pet font-bold transform hover:scale-[1.02] hover:shadow-lg transition-all">
          Continue to Payment
        </button>
      </div>
    </div>
  );
};