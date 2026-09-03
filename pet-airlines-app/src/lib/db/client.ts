import 'server-only'

import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import * as schema from './schema'

declare global {
  var __petAirlinesDb: PostgresJsDatabase<typeof schema> | undefined
}

function createDb(): PostgresJsDatabase<typeof schema> {
  const url = process.env.DATABASE_URL

  if (!url) {
    throw new Error('DATABASE_URL is not set')
  }

  // Sized for serverless (Vercel), not a long-lived server: each warm
  // lambda instance gets its own pool, so a per-instance `max` above 1-2
  // multiplies against Railway's connection cap as instances scale out.
  // `idle_timeout`/`connect_timeout` (seconds) make sure an idle connection
  // is actually reclaimed instead of held open indefinitely (postgres.js's
  // default) and that a stalled connect fails fast instead of hanging the
  // request. `prepare: false` avoids prepared-statement state that doesn't
  // survive connection reuse across invocations.
  //
  // IMPORTANT: this must be given Railway's PUBLIC proxy connection string
  // in Vercel's env, not the private/internal one — Vercel functions can't
  // reach Railway's internal network.
  const client = postgres(url, {
    max: 2,
    idle_timeout: 20,
    connect_timeout: 10,
    prepare: false,
    ssl: 'require',
  })

  return drizzle(client, { schema })
}

// Lazy + memoised on globalThis: the pool is created on first use, not at
// module import. A missing DATABASE_URL then surfaces inside the caller's
// own try/catch (e.g. the inquiries route's documented
// `{ success: false, error: 'db_error' }` 500) instead of crashing the
// module load with a bare framework 500. globalThis memoisation also means
// Next.js dev HMR doesn't leak a new connection pool on every module
// reload.
export function getDb(): PostgresJsDatabase<typeof schema> {
  if (!globalThis.__petAirlinesDb) {
    globalThis.__petAirlinesDb = createDb()
  }
  return globalThis.__petAirlinesDb
}
