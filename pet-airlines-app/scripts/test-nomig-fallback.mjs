#!/usr/bin/env node
// Regression test for createInquiry()'s missing-migration fallback
// (src/lib/inquiries.ts + src/lib/db/errors.ts + src/lib/db/schema.ts's
// `inquiriesLegacy`). Proves END-TO-END, against a REAL running Next.js
// server backed by a REAL Postgres database that has only migrations
// 0000_inquiries.sql and 0001_inquiries_ip_hash_idx.sql applied (NOT
// 0002_lead_source.sql), that POSTing a valid inquiry WITH tracking fields
// still returns HTTP 201 and saves exactly one row — instead of the
// funnel-wide 500 this fallback exists to prevent.
//
// SKIPPED BY DEFAULT — this is not part of `npm run test:e2e`, `npm run
// build`, or any other default gate, because it needs a SECOND database
// deliberately missing migration 0002, which nothing else in this repo
// provisions or tears down. Set E2E_NOMIG_DATABASE_URL to run it:
//
//   E2E_NOMIG_DATABASE_URL=postgresql://user:pass@127.0.0.1:PORT/dbname \
//     node scripts/test-nomig-fallback.mjs
//
// Requires `npm run build` to have already produced a `.next` production
// build (this spawns `next start`, same as playwright.config.ts's
// webServer — see the README's "Running the e2e suite" section).
//
// Refuses to run against anything whose host isn't localhost/127.0.0.1 —
// this script creates and deletes rows in whatever database you point it
// at, and must never be pointed at anything real.

import { spawn } from 'node:child_process'
import { setTimeout as sleep } from 'node:timers/promises'

import postgres from 'postgres'

const NOMIG_URL = process.env.E2E_NOMIG_DATABASE_URL
const PORT = Number(process.env.E2E_NOMIG_PORT ?? 3131)
const READY_TIMEOUT_MS = 20_000

if (!NOMIG_URL) {
  console.log(
    'test-nomig-fallback: E2E_NOMIG_DATABASE_URL is not set — skipping. This is expected in the default gate run; see this file\'s header comment to run it deliberately.'
  )
  process.exit(0)
}

let parsedUrl
try {
  parsedUrl = new URL(NOMIG_URL)
} catch {
  console.error('test-nomig-fallback: E2E_NOMIG_DATABASE_URL is not a valid URL.')
  process.exit(1)
}

if (parsedUrl.hostname !== 'localhost' && parsedUrl.hostname !== '127.0.0.1') {
  console.error(
    `test-nomig-fallback: refusing to run — E2E_NOMIG_DATABASE_URL host is "${parsedUrl.hostname}", not localhost or 127.0.0.1. This script writes and deletes rows and must only ever target a local, disposable database.`
  )
  process.exit(1)
}

const sql = postgres(NOMIG_URL, { max: 1, ssl: 'require', prepare: false, idle_timeout: 10, connect_timeout: 10 })

const QA_MARKER = `[QA-NOMIG-REGRESSION] ${Date.now()}`
let server
let exitCode = 0

async function waitForReady(child) {
  let output = ''
  let ready = false
  child.stdout.on('data', (chunk) => {
    output += chunk.toString()
    if (output.includes('Ready in')) ready = true
  })
  child.stderr.on('data', (chunk) => {
    output += chunk.toString()
  })

  const deadline = Date.now() + READY_TIMEOUT_MS
  while (!ready && Date.now() < deadline) {
    await sleep(200)
  }
  if (!ready) {
    throw new Error(`server did not report ready within ${READY_TIMEOUT_MS}ms. Output so far:\n${output}`)
  }
}

try {
  console.log(`test-nomig-fallback: starting "next start -p ${PORT}" against ${parsedUrl.hostname}${parsedUrl.pathname} ...`)
  server = spawn(process.execPath, ['node_modules/.bin/next', 'start', '-p', String(PORT)], {
    env: { ...process.env, DATABASE_URL: NOMIG_URL },
    stdio: ['ignore', 'pipe', 'pipe'],
  })

  await waitForReady(server)

  const [{ count: before }] = await sql`select count(*)::int as count from inquiries`

  const res = await fetch(`http://localhost:${PORT}/api/inquiries`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      fullName: QA_MARKER,
      email: 'qa+nomigregression@example.com',
      petType: 'dog',
      petCount: 1,
      fromCountry: 'CA',
      fromCity: 'Toronto',
      toCountry: 'VN',
      toCity: 'Hanoi',
      sourceSelfReported: 'ai_assistant',
      sourceSelfDetail: 'regression-test payload',
      sourceReferrerHost: 'chatgpt.com',
      utmSource: 'chatgpt.com',
    }),
  })

  const body = await res.json().catch(() => undefined)

  if (res.status !== 201) {
    console.error(`test-nomig-fallback: FAIL — expected HTTP 201, got ${res.status}. Body: ${JSON.stringify(body)}`)
    exitCode = 1
  } else if (!body || body.success !== true || typeof body.data?.inquiryNumber !== 'string') {
    console.error(`test-nomig-fallback: FAIL — got HTTP 201 but an unexpected response shape: ${JSON.stringify(body)}`)
    exitCode = 1
  } else {
    const [{ count: after }] = await sql`select count(*)::int as count from inquiries`
    if (after !== before + 1) {
      console.error(`test-nomig-fallback: FAIL — expected exactly one new row (before=${before}, after=${after})`)
      exitCode = 1
    } else {
      console.log(
        `test-nomig-fallback: PASS — HTTP 201, inquiryNumber=${body.data.inquiryNumber}, exactly one new row saved against a database missing migration 0002_lead_source.`
      )
    }
  }

  await sql`delete from inquiries where full_name = ${QA_MARKER}`
} catch (err) {
  console.error('test-nomig-fallback: FAIL —', err instanceof Error ? err.message : err)
  exitCode = 1
} finally {
  if (server) server.kill('SIGTERM')
  await sql.end({ timeout: 5 })
}

process.exit(exitCode)
