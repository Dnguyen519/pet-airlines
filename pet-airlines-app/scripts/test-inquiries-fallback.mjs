// Unit tests for src/lib/db/errors.ts — the pure decision functions behind
// createInquiry()'s Postgres-error handling (the migration-0002 fallback,
// and the pre-existing inquiry-number collision retry). No database
// needed: these only test error SHAPES, not actual insert/retry behavior.
// Kept in their own `server-only`-free module specifically so they can be
// imported from a plain Node script like this one —
// src/lib/inquiries.ts itself starts with `import 'server-only'`, which
// throws unconditionally outside a Next.js server context.
//
// Usage: node --import tsx --test scripts/test-inquiries-fallback.mjs

import assert from 'node:assert/strict'
import { test } from 'node:test'

import { extractSqlState, isUndefinedColumnError, isUniqueViolationError } from '../src/lib/db/errors.ts'

// The installed drizzle-orm wraps every driver error in a DrizzleQueryError
// whose own `code` is always undefined — the real SQLSTATE lives on
// `.cause`. This import uses the REAL package class, not a stand-in, so
// these cases prove the helpers work against what drizzle actually throws
// (see the comment in src/lib/db/errors.ts for the exact wrap sites).
const { DrizzleQueryError } = await import('drizzle-orm/errors')

function driverError(code, message = 'boom') {
  return Object.assign(new Error(message), { code })
}

// --- Plain-shape cases (no wrapper) -----------------------------------

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

test('a bare {code} unique_violation shape is detected by isUniqueViolationError', () => {
  assert.equal(isUniqueViolationError({ code: '23505' }), true)
})

test('a bare {code} unique_violation shape is NOT detected by isUndefinedColumnError', () => {
  assert.equal(isUndefinedColumnError({ code: '23505' }), false)
})

// --- Real DrizzleQueryError wrapper cases (proves the fix) -------------
// This is the shape createInquiry() actually receives: DrizzleQueryError's
// own `code` is undefined; the SQLSTATE is on `.cause.code`.

test('a REAL DrizzleQueryError wrapping a 42703 driver error is detected as undefined_column', () => {
  const wrapped = new DrizzleQueryError('insert into inquiries ...', [], driverError('42703'))
  // Sanity check on the premise itself: DrizzleQueryError's own `code` is
  // undefined — if this ever changes upstream, this assertion fails loudly
  // instead of the real test below silently passing for the wrong reason.
  assert.equal(wrapped.code, undefined)
  assert.equal(isUndefinedColumnError(wrapped), true)
})

test('a REAL DrizzleQueryError wrapping a 23505 driver error is detected as unique_violation, not undefined_column', () => {
  const wrapped = new DrizzleQueryError('insert into inquiries ...', [], driverError('23505'))
  assert.equal(isUniqueViolationError(wrapped), true)
  assert.equal(isUndefinedColumnError(wrapped), false)
})

test('a REAL DrizzleQueryError wrapping an unrelated code (e.g. 08006, connection_failure) is not detected as either', () => {
  const wrapped = new DrizzleQueryError('insert into inquiries ...', [], driverError('08006', 'connection terminated'))
  assert.equal(isUndefinedColumnError(wrapped), false)
  assert.equal(isUniqueViolationError(wrapped), false)
})

test('a two-level cause chain (DrizzleQueryError -> generic Error -> driver error) still resolves', () => {
  const innerMost = driverError('42703')
  const middle = new Error('rethrown once')
  middle.cause = innerMost
  const wrapped = new DrizzleQueryError('insert into inquiries ...', [], middle)
  assert.equal(isUndefinedColumnError(wrapped), true)
})

test('a circular cause chain terminates (bounded depth) rather than hanging or throwing', () => {
  const a = { message: 'a' }
  const b = { message: 'b', cause: a }
  a.cause = b // a -> b -> a -> b -> ...

  assert.doesNotThrow(() => {
    const result = extractSqlState(a)
    assert.equal(result, undefined)
  })
})

test('a very deep cause chain (10 levels, no code anywhere) terminates and returns undefined', () => {
  let err = { message: 'root cause', code: undefined }
  for (let i = 0; i < 10; i++) {
    err = { message: `level ${i}`, cause: err }
  }
  assert.doesNotThrow(() => {
    assert.equal(extractSqlState(err), undefined)
  })
})

test('a very deep cause chain WITH the real code buried past the depth bound is NOT found (proves the bound is enforced)', () => {
  // 42703 sits 6 levels down — past MAX_CAUSE_DEPTH (3) — so this must NOT match.
  let err = driverError('42703')
  for (let i = 0; i < 6; i++) {
    err = { message: `wrap ${i}`, cause: err }
  }
  assert.equal(extractSqlState(err), undefined)
})

test('extractSqlState finds a code exactly at the depth bound (3 levels of cause)', () => {
  // err -> cause(depth1) -> cause(depth2) -> cause(depth3, has the code)
  const level3 = driverError('42703')
  const level2 = { message: 'l2', cause: level3 }
  const level1 = { message: 'l1', cause: level2 }
  const level0 = { message: 'l0', cause: level1 }
  assert.equal(extractSqlState(level0), '42703')
})
