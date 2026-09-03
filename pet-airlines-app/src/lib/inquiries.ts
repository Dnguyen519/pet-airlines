import 'server-only'

import { randomInt } from 'node:crypto'

import { and, count, eq, gt } from 'drizzle-orm'

import { getDb } from '@/lib/db/client'
import { inquiries } from '@/lib/db/schema'
import type { InquiryInput } from '@/lib/validation/inquiry'

// Crockford base32 alphabet — avoids visually ambiguous characters (0/O, 1/I/L).
const BASE32_ALPHABET = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'

function randomBase32Chars(length: number): string {
  let out = ''
  for (let i = 0; i < length; i++) {
    out += BASE32_ALPHABET[randomInt(BASE32_ALPHABET.length)]
  }
  return out
}

function makeInquiryNumber(): string {
  const now = new Date()
  const yy = String(now.getUTCFullYear()).slice(-2)
  const mm = String(now.getUTCMonth() + 1).padStart(2, '0')
  return `PA-${yy}${mm}-${randomBase32Chars(4)}`
}

const UNIQUE_VIOLATION = '23505'
const MAX_ATTEMPTS = 5

interface CreateInquiryMeta {
  ipHash?: string
  userAgent?: string
}

export async function createInquiry(
  input: InquiryInput,
  meta: CreateInquiryMeta = {}
): Promise<{ id: string; inquiryNumber: string }> {
  let lastError: unknown

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const inquiryNumber = makeInquiryNumber()

    try {
      const [row] = await getDb()
        .insert(inquiries)
        .values({
          inquiryNumber,
          fullName: input.fullName,
          email: input.email,
          phone: input.phone,
          petType: input.petType,
          petBreed: input.petBreed,
          petWeightKg: input.petWeightKg !== undefined ? String(input.petWeightKg) : undefined,
          petCount: input.petCount,
          fromCountry: input.fromCountry,
          fromCity: input.fromCity,
          toCountry: input.toCountry,
          toCity: input.toCity,
          travelDate: input.travelDate,
          specialRequests: input.specialRequests,
          ipHash: meta.ipHash,
          userAgent: meta.userAgent,
        })
        .returning({ id: inquiries.id, inquiryNumber: inquiries.inquiryNumber })

      return row
    } catch (err) {
      lastError = err
      if (isUniqueViolation(err)) {
        continue
      }
      throw err
    }
  }

  const error = new Error(
    `Failed to generate a unique inquiry number after ${MAX_ATTEMPTS} attempts`
  ) as Error & { cause?: unknown }
  error.cause = lastError
  throw error
}

function isUniqueViolation(err: unknown): boolean {
  return typeof err === 'object' && err !== null && 'code' in err && (err as { code?: string }).code === UNIQUE_VIOLATION
}

export async function markEmailSent(id: string, which: 'customer' | 'admin'): Promise<void> {
  await getDb()
    .update(inquiries)
    .set(which === 'customer' ? { customerEmailSent: true } : { adminEmailSent: true })
    .where(eq(inquiries.id, id))
}

// DB-backed rate-limit check — a durable second opinion behind the fast
// in-memory limiter in `@/lib/rate-limit`. The in-memory limiter resets on
// every cold start and isn't shared across instances; this counts actual
// rows for the IP hash within the window, so a caller can enforce the cap
// even after a cold start or across multiple warm instances.
export async function countRecentInquiriesByIp(ipHash: string, windowMs: number): Promise<number> {
  const cutoff = new Date(Date.now() - windowMs)

  const [row] = await getDb()
    .select({ count: count() })
    .from(inquiries)
    .where(and(eq(inquiries.ipHash, ipHash), gt(inquiries.createdAt, cutoff)))

  return row?.count ?? 0
}
