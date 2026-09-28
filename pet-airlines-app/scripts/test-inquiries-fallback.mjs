// Unit tests for isUndefinedColumnError() in src/lib/db/errors.ts — the
// pure decision function behind createInquiry()'s one-time fallback when
// migration 0002_lead_source hasn't been applied yet (Postgres SQLSTATE
// 42703, undefined_column). No database needed: this only tests the error
// shape, not the actual insert/retry behavior. Kept in its own
// `server-only`-free module specifically so it can be imported from a plain
// Node script like this one — src/lib/inquiries.ts itself starts with
// `import 'server-only'`, which throws unconditionally outside a Next.js
// server context.
//
// Usage: node --import tsx --test scripts/test-inquiries-fallback.mjs

import assert from 'node:assert/strict'
import { test } from 'node:test'

import { isUndefinedColumnError } from '../src/lib/db/errors.ts'

test('a Postgres 42703 (undefined_column) error is detected', () => {
  assert.equal(isUndefinedColumnError({ code: '42703' }), true)
})

test('a Postgres 42703 error with extra fields (message, etc.) is still detected', () => {
  assert.equal(
    isUndefinedColumnError({ code: '42703', message: 'column "source_channel" of relation "inquiries" does not exist' }),
    true
  )
})

test('a different Postgres error code (e.g. unique_violation) is NOT treated as undefined_column', () => {
  assert.equal(isUndefinedColumnError({ code: '23505' }), false)
})

test('a numeric code (wrong type, not the string "42703") is NOT treated as undefined_column', () => {
  assert.equal(isUndefinedColumnError({ code: 42703 }), false)
})

test('a plain Error with no `code` property is NOT treated as undefined_column', () => {
  assert.equal(isUndefinedColumnError(new Error('boom')), false)
})

test('null is NOT treated as undefined_column', () => {
  assert.equal(isUndefinedColumnError(null), false)
})

test('undefined is NOT treated as undefined_column', () => {
  assert.equal(isUndefinedColumnError(undefined), false)
})

test('a non-object primitive (string) is NOT treated as undefined_column', () => {
  assert.equal(isUndefinedColumnError('42703'), false)
})
