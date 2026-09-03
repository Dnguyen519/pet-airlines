import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import postgres from 'postgres'

// `webServer.command` in playwright.config.ts loads `.env.local` for the
// NEXT SERVER process via `node --env-file`, but the Playwright TEST
// RUNNER is a separate process and never sees that file — `postgres()`
// below would otherwise get `process.env.DATABASE_URL === undefined`.
// A minimal parser (no dotenv dependency) loads it once for this process.
function loadEnvLocal(): void {
  const path = resolve(__dirname, '..', '..', '.env.local')
  if (!existsSync(path)) return

  for (const rawLine of readFileSync(path, 'utf8').split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) continue

    const eq = line.indexOf('=')
    if (eq < 0) continue

    const key = line.slice(0, eq).trim()
    let value = line.slice(eq + 1).trim()
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }

    if (value.length > 0 && !process.env[key]) {
      process.env[key] = value
    }
  }
}

loadEnvLocal()

let sql: ReturnType<typeof postgres> | undefined

function getSql(): ReturnType<typeof postgres> {
  if (!sql) {
    const url = process.env.DATABASE_URL
    if (!url) {
      throw new Error('DATABASE_URL is not set — e2e/helpers/db.ts could not find it in .env.local')
    }
    sql = postgres(url, { max: 1, idle_timeout: 10, connect_timeout: 10, prepare: false, ssl: 'require' })
  }
  return sql
}

export interface InquiryRow {
  id: string
  inquiry_number: string
  full_name: string
  email: string
  status: string
}

/** Reads a single inquiry row by its `PA-...` reference number. Returns `undefined` if no row matches. */
export async function getInquiryByNumber(inquiryNumber: string): Promise<InquiryRow | undefined> {
  const rows = await getSql()<InquiryRow[]>`
    select id, inquiry_number, full_name, email, status
    from inquiries
    where inquiry_number = ${inquiryNumber}
    limit 1
  `
  return rows[0]
}

/** Deletes an inquiry row by its `PA-...` reference number. No-op if no row matches. */
export async function deleteInquiryByNumber(inquiryNumber: string): Promise<void> {
  await getSql()`delete from inquiries where inquiry_number = ${inquiryNumber}`
}

/** Deletes every inquiry row whose full name starts with the given prefix — a defensive sweep for [QA] rows left behind by a crashed test. */
export async function deleteInquiriesByFullNamePrefix(prefix: string): Promise<number> {
  const deleted = await getSql()<{ id: string }[]>`
    delete from inquiries where full_name like ${prefix + '%'} returning id
  `
  return deleted.length
}
