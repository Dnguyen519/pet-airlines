// Form validation utilities

export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  min?: number
  max?: number
  custom?: (value: any) => string | null
}

export interface ValidationRules {
  [field: string]: ValidationRule
}

export interface ValidationErrors {
  [field: string]: string
}

// Inquiry form validation rules
export const inquiryFormRules: ValidationRules = {
  pet_type: {
    required: true
  },
  pet_breed: {
    maxLength: 100
  },
  pet_weight_kg: {
    min: 0.1,
    max: 200,
    custom: (value) => {
      if (value && isNaN(parseFloat(value))) {
        return 'Please enter a valid weight'
      }
      return null
    }
  },
  pet_count: {
    required: true,
    min: 1,
    max: 10
  },
  from_country_id: {
    required: true
  },
  from_city: {
    required: true
  },
  to_country_id: {
    required: true
  },
  to_city: {
    required: true
  },
  travel_date: {
    custom: (value) => {
      if (value) {
        const date = new Date(value)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        
        if (date < today) {
          return 'Travel date must be in the future'
        }
        
        // Check if date is not more than 1 year in the future
        const oneYearFromNow = new Date()
        oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1)
        
        if (date > oneYearFromNow) {
          return 'Travel date cannot be more than 1 year in the future'
        }
      }
      return null
    }
  },
  full_name: {
    required: true,
    minLength: 2,
    maxLength: 200,
    pattern: /^[a-zA-Z\s'-]+$/,
    custom: (value) => {
      if (value && !value.match(/^[a-zA-Z\s'-]+$/)) {
        return 'Please enter a valid name (letters, spaces, hyphens, and apostrophes only)'
      }
      return null
    }
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    custom: (value) => {
      if (value && !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        return 'Please enter a valid email address'
      }
      return null
    }
  },
  phone: {
    pattern: /^[\d\s()+-]+$/,
    minLength: 10,
    maxLength: 20,
    custom: (value) => {
      if (value) {
        const digitsOnly = value.replace(/\D/g, '')
        if (digitsOnly.length < 10) {
          return 'Phone number must be at least 10 digits'
        }
      }
      return null
    }
  },
  special_requests: {
    maxLength: 1000
  }
}

// Validate a single field
export function validateField(
  fieldName: string, 
  value: any, 
  rules: ValidationRule
): string | null {
  // Required validation
  if (rules.required && !value) {
    return 'This field is required'
  }

  // Skip other validations if field is empty and not required
  if (!value && !rules.required) {
    return null
  }

  // String validations
  if (typeof value === 'string') {
    if (rules.minLength && value.length < rules.minLength) {
      return `Must be at least ${rules.minLength} characters`
    }
    
    if (rules.maxLength && value.length > rules.maxLength) {
      return `Must be no more than ${rules.maxLength} characters`
    }
    
    if (rules.pattern && !value.match(rules.pattern)) {
      return 'Invalid format'
    }
  }

  // Number validations
  if (typeof value === 'number' || !isNaN(parseFloat(value))) {
    const numValue = parseFloat(value)
    
    if (rules.min !== undefined && numValue < rules.min) {
      return `Must be at least ${rules.min}`
    }
    
    if (rules.max !== undefined && numValue > rules.max) {
      return `Must be no more than ${rules.max}`
    }
  }

  // Custom validation
  if (rules.custom) {
    const customError = rules.custom(value)
    if (customError) {
      return customError
    }
  }

  return null
}

// Validate entire form
export function validateForm(
  formData: Record<string, any>,
  rules: ValidationRules
): ValidationErrors {
  const errors: ValidationErrors = {}

  for (const [fieldName, fieldRules] of Object.entries(rules)) {
    const error = validateField(fieldName, formData[fieldName], fieldRules)
    if (error) {
      errors[fieldName] = error
    }
  }

  return errors
}

// Check if form has any errors
export function hasErrors(errors: ValidationErrors): boolean {
  return Object.keys(errors).length > 0
}

// Format phone number as user types
export function formatPhoneNumber(value: string): string {
  // Remove all non-digits
  const cleaned = value.replace(/\D/g, '')
  
  // Apply US phone format (can be customized for other countries)
  let formatted = cleaned
  
  if (cleaned.length > 0) {
    if (cleaned.length <= 3) {
      formatted = cleaned
    } else if (cleaned.length <= 6) {
      formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`
    } else if (cleaned.length <= 10) {
      formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
    } else {
      formatted = `+${cleaned.slice(0, 1)} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 11)}`
    }
  }
  
  return formatted
}