// Pure Postgres error-code checks, deliberately kept OUT of any
// `server-only`-guarded module so they stay unit-testable from a plain
// Node script with no database and no Next.js server context (see
// scripts/test-inquiries-fallback.mjs). These check the error SHAPE only —
// no I/O.
//
// Why the `.cause` walk: the installed drizzle-orm wraps EVERY driver error
// in a DrizzleQueryError (node_modules/drizzle-orm/pg-core/session.js,
// `queryWithCache()` — six `throw new DrizzleQueryError(queryString,
// params, e)` sites in the query path used by both inserts and updates).
// DrizzleQueryError's own constructor (node_modules/drizzle-orm/errors.js)
// sets `this.cause = cause` and defines no `code` property at all — so
// `err.code` is always undefined for anything thrown out of a drizzle
// query. The real Postgres SQLSTATE lives one level down, on
// `err.cause.code` — postgres.js's `PostgresError`
// (node_modules/postgres/src/errors.js does `Object.assign(this, x)` where
// `x` comes from `parseError()` in node_modules/postgres/src/connection.js,
// which maps wire field 67 ('C') to a `code` key holding the 5-character
// SQLSTATE). A helper that only checks `err.code` directly therefore never
// fires against a real drizzle-thrown error — it only matched the
// hand-shaped plain-object test doubles a naive unit test would use.

const MAX_CAUSE_DEPTH = 3

function looksLikeSqlState(value: unknown): value is string {
  return typeof value === 'string' && value.length === 5
}

/**
 * Extracts a Postgres SQLSTATE from an unknown error: checks the error's
 * own `code` first, then walks `.cause` up to MAX_CAUSE_DEPTH levels,
 * returning the first string `code` that looks like a SQLSTATE (a
 * 5-character string). Bounded depth means a circular or very deep cause
 * chain still terminates (each recursive call increments `depth`, so a
 * cycle simply runs out of budget rather than looping forever) instead of
 * blowing the stack or hanging.
 */
export function extractSqlState(err: unknown, depth = 0): string | undefined {
  if (depth > MAX_CAUSE_DEPTH) return undefined
  if (typeof err !== 'object' || err === null) return undefined

  if ('code' in err) {
    const code = (err as { code?: unknown }).code
    if (looksLikeSqlState(code)) return code
  }

  if ('cause' in err) {
    return extractSqlState((err as { cause?: unknown }).cause, depth + 1)
  }

  return undefined
}

/**
 * Postgres SQLSTATE 42703 (undefined_column) — thrown when a query
 * references a column that doesn't exist yet, e.g. because
 * drizzle/0002_lead_source.sql hasn't been applied to this database.
 */
export function isUndefinedColumnError(err: unknown): boolean {
  return extractSqlState(err) === '42703'
}

/**
 * Postgres SQLSTATE 23505 (unique_violation) — thrown on a duplicate-key
 * insert, e.g. a randomly-generated inquiry number colliding with an
 * existing row.
 */
export function isUniqueViolationError(err: unknown): boolean {
  return extractSqlState(err) === '23505'
}
