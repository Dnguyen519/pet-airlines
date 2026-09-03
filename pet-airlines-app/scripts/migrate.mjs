// Plain Node ESM migration runner. No TypeScript, no drizzle-kit runtime —
// just applies drizzle/*.sql files in sorted order, once each, tracked in a
// `_migrations` table so re-runs are idempotent.
//
// Usage: node --env-file=.env.local scripts/migrate.mjs

import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import postgres from 'postgres'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const migrationsDir = path.join(__dirname, '..', 'drizzle')

async function main() {
  const url = process.env.DATABASE_URL
  if (!url) {
    console.error('DATABASE_URL is not set')
    process.exit(1)
  }

  const sql = postgres(url, { max: 1, prepare: false, ssl: 'require' })

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS "_migrations" (
        "name" text PRIMARY KEY,
        "applied_at" timestamptz NOT NULL DEFAULT now()
      )
    `

    const files = (await readdir(migrationsDir))
      .filter((f) => f.endsWith('.sql'))
      .sort()

    if (files.length === 0) {
      console.log('No migration files found in', migrationsDir)
      return
    }

    for (const file of files) {
      const already = await sql`SELECT 1 FROM "_migrations" WHERE "name" = ${file}`
      if (already.length > 0) {
        console.log(`skip (already applied): ${file}`)
        continue
      }

      const fullPath = path.join(migrationsDir, file)
      const raw = await readFile(fullPath, 'utf8')

      // Split on drizzle-kit's statement-breakpoint marker so each statement
      // runs as its own query inside the transaction.
      const statements = raw
        .split('--> statement-breakpoint')
        .map((s) => s.trim())
        .filter(Boolean)

      await sql.begin(async (tx) => {
        for (const statement of statements) {
          await tx.unsafe(statement)
        }
        await tx`INSERT INTO "_migrations" ("name") VALUES (${file})`
      })

      console.log(`applied: ${file}`)
    }
  } finally {
    await sql.end({ timeout: 5 })
  }
}

main().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
