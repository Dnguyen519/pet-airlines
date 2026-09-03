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

    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    createdAtIdx: index('inquiries_created_at_idx').on(table.createdAt.desc()),
    ipHashCreatedAtIdx: index('inquiries_ip_hash_created_at_idx').on(table.ipHash, table.createdAt.desc()),
  })
)

export type Inquiry = typeof inquiries.$inferSelect
export type NewInquiry = typeof inquiries.$inferInsert
