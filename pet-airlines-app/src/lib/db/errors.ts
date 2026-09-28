// Pure Postgres error-code checks, deliberately kept OUT of any
// `server-only`-guarded module so they stay unit-testable from a plain
// Node script with no database and no Next.js server context (see
// scripts/test-inquiries-fallback.mjs). These check the error SHAPE only —
// no I/O.

const UNDEFINED_COLUMN = '42703'

/**
 * Postgres SQLSTATE 42703 (undefined_column) — thrown when a query
 * references a column that doesn't exist yet, e.g. because
 * drizzle/0002_lead_source.sql hasn't been applied to this database.
 */
export function isUndefinedColumnError(err: unknown): boolean {
  return typeof err === 'object' && err !== null && 'code' in err && (err as { code?: string }).code === UNDEFINED_COLUMN
}
