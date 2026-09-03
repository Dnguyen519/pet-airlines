import { z } from 'zod'

import { COUNTRY_CODES } from '@/lib/countries'

const DATE_ONLY_RE = /^\d{4}-\d{2}-\d{2}$/

export const PET_TYPES = ['dog', 'cat', 'bird', 'rabbit', 'other'] as const

export const InquirySchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(120, 'Full name must be 120 characters or fewer'),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().max(40, 'Phone number must be 40 characters or fewer').optional(),

  petType: z.enum(PET_TYPES, { message: 'Choose a pet type' }),
  petBreed: z.string().max(80, 'Breed must be 80 characters or fewer').optional(),
  petWeightKg: z
    .number()
    .min(0.1, 'Weight must be at least 0.1 kg')
    .max(150, 'Weight must be 150 kg or less')
    .optional(),
  petCount: z
    .number()
    .int('Number of pets must be a whole number')
    .min(1, 'At least 1 pet is required')
    .max(10, 'No more than 10 pets per inquiry'),

  fromCountry: z.enum(COUNTRY_CODES, { message: 'Choose the origin country' }),
  fromCity: z.string().min(1, 'Origin city is required').max(80, 'Origin city must be 80 characters or fewer'),
  toCountry: z.enum(COUNTRY_CODES, { message: 'Choose the destination country' }),
  toCity: z.string().min(1, 'Destination city is required').max(80, 'Destination city must be 80 characters or fewer'),

  travelDate: z.string().regex(DATE_ONLY_RE, 'Travel date must be in YYYY-MM-DD format').optional(),
  specialRequests: z.string().max(2000, 'Special requests must be 2000 characters or fewer').optional(),

  // Honeypot — real users never fill this in; bots that autofill every field
  // do. Defaulted so an omitted field doesn't fail validation for a
  // legitimate client that never sends it. Must accept a non-empty value
  // (not max(0)) so a filled-in honeypot reaches the route handler's
  // fake-success branch instead of being rejected here as a validation
  // error — a 400 would tip the bot off that the field was checked.
  website: z.string().max(200).default(''),
})

export type InquiryInput = z.infer<typeof InquirySchema>
