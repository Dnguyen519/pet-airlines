import { boolean, char, date, index, integer, numeric, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const inquiries = pgTable(
  'inquiries',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    inquiryNumber: text('inquiry_number').notNull().unique(),

    fullName: text('full_name').notNull(),
    email: text('email').notNull(),
    phone: text('phone'),

    petType: text('pet_type').notNull(),
    petBreed: text('pet_breed'),
    petWeightKg: numeric('pet_weight_kg', { precision: 6, scale: 2 }),
    petCount: integer('pet_count').notNull().default(1),

    fromCountry: char('from_country', { length: 2 }).notNull(),
    fromCity: text('from_city').notNull(),
    toCountry: char('to_country', { length: 2 }).notNull(),
    toCity: text('to_city').notNull(),

    travelDate: date('travel_date'),
    specialRequests: text('special_requests'),

    status: text('status').notNull().default('new'),

    customerEmailSent: boolean('customer_email_sent').notNull().default(false),
    adminEmailSent: boolean('admin_email_sent').notNull().default(false),

    ipHash: text('ip_hash'),
    userAgent: text('user_agent'),

    // Lead-source attribution — all nullable, additive (migration 0002).
    // See src/lib/first-touch.ts (client capture) and
    // src/lib/source-classifier.ts (server-side channel derivation).
    sourceSelfReported: text('source_self_reported'),
    sourceSelfDetail: text('source_self_detail'),
    sourceChannel: text('source_channel'),
    sourceDetailAuto: text('source_detail_auto'),
    sourceReferrerHost: text('source_referrer_host'),
    sourceReferrerPath: text('source_referrer_path'),
    sourceLandingPath: text('source_landing_path'),
    utmSource: text('utm_source'),
    utmMedium: text('utm_medium'),
    utmCampaign: text('utm_campaign'),
    sourceFirstSeenAt: timestamp('source_first_seen_at', { withTimezone: true }),

    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    createdAtIdx: index('inquiries_created_at_idx').on(table.createdAt.desc()),
    ipHashCreatedAtIdx: index('inquiries_ip_hash_created_at_idx').on(table.ipHash, table.createdAt.desc()),
  })
)

export type Inquiry = typeof inquiries.$inferSelect
export type NewInquiry = typeof inquiries.$inferInsert

// A second table object mapped onto the SAME physical "inquiries" table,
// containing ONLY the columns that exist after migrations 0000 and 0001 —
// used SOLELY by createInquiry()'s missing-migration fallback in
// src/lib/inquiries.ts.
//
// Why this exists: drizzle's `.insert(table).values({...})` builds an
// INSERT statement that names EVERY column of the TABLE OBJECT it targets
// — writing `default` for any column whose key was omitted from
// `.values()` — not just the keys actually passed. So inserting a partial
// object (e.g. `baseInsertValues()`, which omits the lead-source fields)
// into the full `inquiries` object above still produces a statement that
// references `source_self_reported`, `source_channel`, etc., and fails
// with the exact same 42703 (undefined_column) the fallback exists to
// recover from. Targeting THIS narrower table object instead produces an
// INSERT that references only pre-0002 columns.
//
// ⚠ This object must NEVER gain the lead-source columns (or any other
// column added by a future migration) — if it does, it stops representing
// "what the table looks like before migration 0002" and the fallback
// breaks again, silently.
//
// ⚠ drizzle-kit risk, TESTED, not assumed safe: running `drizzle-kit
// generate` against this schema.ts (scratch config + scratch `out` dir,
// 2026-09-28) does NOT error and does NOT emit two CREATE TABLEs for the
// duplicate "inquiries" name — it silently resolves the name collision by
// keeping only the LAST-DECLARED object (this one, `inquiriesLegacy`) and
// discarding `inquiries` entirely, producing a migration for a 21-column
// table with none of the lead-source columns. There is no warning printed
// about the collision. This is safe TODAY only because nothing in this
// repo's tooling ever invokes drizzle-kit `generate`/`push` — there is no
// such npm script, and both existing migrations under drizzle/ are
// hand-written SQL applied by scripts/migrate.mjs, never drizzle-kit
// output. If drizzle-kit generate/push is ever wired up for this project
// in the future, this collision MUST be resolved first (e.g. drop this
// object from drizzle.config.ts's schema glob, or stop using drizzle-kit's
// generate/push workflow for this table) — otherwise a generate/push could
// silently produce or apply a migration that drops the lead-source
// columns from a live database.
export const inquiriesLegacy = pgTable('inquiries', {
  id: uuid('id').primaryKey().defaultRandom(),
  inquiryNumber: text('inquiry_number').notNull().unique(),

  fullName: text('full_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),

  petType: text('pet_type').notNull(),
  petBreed: text('pet_breed'),
  petWeightKg: numeric('pet_weight_kg', { precision: 6, scale: 2 }),
  petCount: integer('pet_count').notNull().default(1),

  fromCountry: char('from_country', { length: 2 }).notNull(),
  fromCity: text('from_city').notNull(),
  toCountry: char('to_country', { length: 2 }).notNull(),
  toCity: text('to_city').notNull(),

  travelDate: date('travel_date'),
  specialRequests: text('special_requests'),

  status: text('status').notNull().default('new'),

  customerEmailSent: boolean('customer_email_sent').notNull().default(false),
  adminEmailSent: boolean('admin_email_sent').notNull().default(false),

  ipHash: text('ip_hash'),
  userAgent: text('user_agent'),

  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})
