import { z } from 'zod'

import { COUNTRY_CODES } from '@/lib/countries'

const DATE_ONLY_RE = /^\d{4}-\d{2}-\d{2}$/

export const PET_TYPES = ['dog', 'cat', 'bird', 'rabbit', 'other'] as const

export const InquirySchema = z.object({
  fullName: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().max(40).optional(),

  petType: z.enum(PET_TYPES),
  petBreed: z.string().max(80).optional(),
  petWeightKg: z.number().min(0.1).max(150).optional(),
  petCount: z.number().int().min(1).max(10),

  fromCountry: z.enum(COUNTRY_CODES),
  fromCity: z.string().min(1).max(80),
  toCountry: z.enum(COUNTRY_CODES),
  toCity: z.string().min(1).max(80),

  travelDate: z.string().regex(DATE_ONLY_RE, 'travelDate must be YYYY-MM-DD').optional(),
  specialRequests: z.string().max(2000).optional(),

  // Honeypot — real users never fill this in; bots that autofill every field
  // do. Defaulted so an omitted field doesn't fail validation for a
  // legitimate client that never sends it. Must accept a non-empty value
  // (not max(0)) so a filled-in honeypot reaches the route handler's
  // fake-success branch instead of being rejected here as a validation
  // error — a 400 would tip the bot off that the field was checked.
  website: z.string().max(200).default(''),
})

export type InquiryInput = z.infer<typeof InquirySchema>
