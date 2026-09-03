import 'server-only'

import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import * as schema from './schema'

declare global {
  // eslint-disable-next-line no-var
  var __petAirlinesDb: PostgresJsDatabase<typeof schema> | undefined
}

function createDb(): PostgresJsDatabase<typeof schema> {
  const url = process.env.DATABASE_URL

  if (!url) {
    throw new Error('DATABASE_URL is not set')
  }

  const client = postgres(url, {
    max: 5,
    prepare: false,
    ssl: 'require',
  })

  return drizzle(client, { schema })
}

// Singleton on globalThis so Next.js dev HMR doesn't leak a new connection
// pool on every module reload.
export const db = globalThis.__petAirlinesDb ?? createDb()

if (process.env.NODE_ENV !== 'production') {
  globalThis.__petAirlinesDb = db
}
