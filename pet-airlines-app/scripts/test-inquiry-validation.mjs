// Unit tests for the lead-source additions to InquirySchema
// (src/lib/validation/inquiry.ts) — specifically the requirement that a
// malformed/garbage tracking payload must NEVER produce a validation
// failure for the whole submission. Run with Node's built-in test runner.
//
// Usage: node --import tsx --test scripts/test-inquiry-validation.mjs

import assert from 'node:assert/strict'
import { test } from 'node:test'

import { InquirySchema } from '../src/lib/validation/inquiry.ts'

const VALID_BASE = {
  fullName: 'Jane Doe',
  email: 'jane@example.com',
  petType: 'dog',
  petCount: 1,
  fromCountry: 'CA',
  fromCity: 'Toronto',
  toCountry: 'VN',
  toCity: 'Hanoi',
}

test('a valid submission with NO tracking fields at all still parses', () => {
  const result = InquirySchema.safeParse(VALID_BASE)
  assert.equal(result.success, true)
})

test('a garbage tracking payload never fails validation for the whole request', () => {
  const result = InquirySchema.safeParse({
    ...VALID_BASE,
    sourceSelfReported: 'not-a-real-option',
    sourceSelfDetail: 12345, // wrong type
    sourceReferrerHost: { nested: 'object' }, // wrong type
    sourceReferrerPath: 'x'.repeat(10_000), // way over max
    sourceLandingPath: null,
    utmSource: ['array', 'not', 'string'],
    utmMedium: true,
    utmCampaign: 'y'.repeat(500),
    sourceFirstSeenAt: 'not-a-real-date',
  })

  assert.equal(result.success, true, 'malformed tracking fields must not fail validation')
  if (result.success) {
    // Every malformed field should have been coerced away, not passed through.
    assert.equal(result.data.sourceSelfReported, undefined)
    assert.equal(result.data.sourceSelfDetail, undefined)
    assert.equal(result.data.sourceReferrerHost, undefined)
    assert.equal(result.data.sourceReferrerPath, undefined)
    assert.equal(result.data.sourceLandingPath, undefined)
    assert.equal(result.data.utmSource, undefined)
    assert.equal(result.data.utmMedium, undefined)
    assert.equal(result.data.utmCampaign, undefined)
    assert.equal(result.data.sourceFirstSeenAt, undefined)
  }
})

test('a well-formed tracking payload is preserved as-is', () => {
  const result = InquirySchema.safeParse({
    ...VALID_BASE,
    sourceSelfReported: 'ai_assistant',
    sourceSelfDetail: "asked ChatGPT about moving my dog to Canada",
    sourceReferrerHost: 'chatgpt.com',
    sourceReferrerPath: '/c/abc123',
    sourceLandingPath: '/routes/vietnam-to-canada',
    utmSource: 'chatgpt.com',
    utmMedium: 'referral',
    utmCampaign: 'citation',
    sourceFirstSeenAt: '2026-09-01T12:00:00.000Z',
  })

  assert.equal(result.success, true)
  if (result.success) {
    assert.equal(result.data.sourceSelfReported, 'ai_assistant')
    assert.equal(result.data.sourceReferrerHost, 'chatgpt.com')
    assert.equal(result.data.utmSource, 'chatgpt.com')
    assert.equal(result.data.sourceFirstSeenAt, '2026-09-01T12:00:00.000Z')
  }
})

test('an entirely missing/undefined tracking payload parses cleanly (optional, not required)', () => {
  const result = InquirySchema.safeParse({
    ...VALID_BASE,
    sourceSelfReported: undefined,
    sourceReferrerHost: undefined,
  })
  assert.equal(result.success, true)
})

test('required fields still fail validation as before (tracking additions did not weaken them)', () => {
  const result = InquirySchema.safeParse({ ...VALID_BASE, email: 'not-an-email' })
  assert.equal(result.success, false)
})
