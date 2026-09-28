import { z } from 'zod'

import { COUNTRY_CODES } from '@/lib/countries'
import { SOURCE_SELF_REPORTED_VALUES } from '@/lib/source-options'

const DATE_ONLY_RE = /^\d{4}-\d{2}-\d{2}$/

export const PET_TYPES = ['dog', 'cat', 'bird', 'rabbit', 'other'] as const

// Lead-source tracking fields are all optional, best-effort attribution —
// never required, never allowed to fail the whole request. Each helper
// below coerces a malformed/wrong-typed/too-long/unrecognized value to
// `undefined` INSTEAD of letting Zod reject it, so a corrupted or spoofed
// tracking payload still produces a valid inquiry (see the `website`
// honeypot comment above for the same "never tip off / never block a real
// submission" principle applied to a different field).
function safeOptionalString(maxLen: number) {
  return z.preprocess((val) => {
    if (typeof val !== 'string') return undefined
    const trimmed = val.trim()
    if (trimmed.length === 0 || trimmed.length > maxLen) return undefined
    return trimmed
  }, z.string().max(maxLen).optional())
}

function safeOptionalEnum<T extends readonly [string, ...string[]]>(values: T) {
  return z.preprocess((val) => {
    if (typeof val !== 'string') return undefined
    return (values as readonly string[]).includes(val) ? val : undefined
  }, z.enum(values).optional())
}

// Accepts any parseable date/datetime string and normalizes it to ISO-8601;
// anything unparseable (or non-string) becomes undefined rather than a 400.
function safeOptionalIsoTimestamp() {
  return z.preprocess((val) => {
    if (typeof val !== 'string' || val.trim().length === 0) return undefined
    const parsed = new Date(val)
    if (Number.isNaN(parsed.getTime())) return undefined
    return parsed.toISOString()
  }, z.string().optional())
}

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

  // Lead-source tracking — see the helpers above. Never required; a
  // missing/malformed value here must never fail validation for the whole
  // request.
  sourceSelfReported: safeOptionalEnum(SOURCE_SELF_REPORTED_VALUES),
  sourceSelfDetail: safeOptionalString(120),

  sourceReferrerHost: safeOptionalString(255),
  sourceReferrerPath: safeOptionalString(512),
  sourceLandingPath: safeOptionalString(512),
  utmSource: safeOptionalString(120),
  utmMedium: safeOptionalString(120),
  utmCampaign: safeOptionalString(120),
  sourceFirstSeenAt: safeOptionalIsoTimestamp(),

  // Honeypot — real users never fill this in; bots that autofill every field
  // do. Defaulted so an omitted field doesn't fail validation for a
  // legitimate client that never sends it. Must accept a non-empty value
  // (not max(0)) so a filled-in honeypot reaches the route handler's
  // fake-success branch instead of being rejected here as a validation
  // error — a 400 would tip the bot off that the field was checked.
  website: z.string().max(200).default(''),
})

export type InquiryInput = z.infer<typeof InquirySchema>
