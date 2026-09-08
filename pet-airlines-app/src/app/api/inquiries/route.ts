import { createHash } from 'node:crypto'

import { adminNotification, customerConfirmation } from '@/lib/email-templates'
import { sendEmail } from '@/lib/email'
import { countRecentInquiriesByIp, createInquiry, markEmailSent } from '@/lib/inquiries'
import { checkRateLimit } from '@/lib/rate-limit'
import { InquirySchema } from '@/lib/validation/inquiry'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const RATE_LIMIT = { limit: 10, windowMs: 60 * 60 * 1000 }
const FAKE_INQUIRY_NUMBER = 'PA-0000-0000'

// On Vercel, `x-forwarded-for` is set by the platform's edge network from
// the real client connection and cannot be overridden by the caller — a
// client-supplied `x-forwarded-for` header is stripped/replaced before the
// function runs, so this is trustworthy on this deployment target. If this
// app is ever deployed behind a different/untrusted proxy, that guarantee
// no longer holds and `x-vercel-forwarded-for` (or an equivalent trusted
// platform header) should be preferred instead. `x-real-ip` is read only as
// a secondary source when `x-forwarded-for` is absent.
function getClientIp(req: Request): string | undefined {
  const forwardedFor = req.headers.get('x-forwarded-for')
  if (forwardedFor) {
    const first = forwardedFor.split(',')[0]?.trim()
    if (first) return first
  }
  const realIp = req.headers.get('x-real-ip')?.trim()
  if (realIp) return realIp
  return undefined
}

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return Response.json({ success: false, error: 'invalid_json' }, { status: 400 })
  }

  const parsed = InquirySchema.safeParse(body)
  if (!parsed.success) {
    return Response.json(
      { success: false, error: 'validation_failed', details: parsed.error.issues.map((i) => i.message) },
      { status: 400 }
    )
  }

  const input = parsed.data

  // Honeypot — real users never fill this in. Fake success, no DB write,
  // no tip-off to the bot that it was detected.
  if (input.website.length > 0) {
    return Response.json(
      {
        success: true,
        data: {
          inquiryNumber: FAKE_INQUIRY_NUMBER,
          emailSent: { customer: false, admin: false },
        },
      },
      { status: 201 }
    )
  }

  const ip = getClientIp(req)
  const ipHash = ip ? createHash('sha256').update(ip).digest('hex').slice(0, 32) : undefined

  if (ip) {
    const rateLimit = checkRateLimit(ip, RATE_LIMIT)
    if (!rateLimit.allowed) {
      return Response.json(
        { success: false, error: 'rate_limited' },
        { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfterSec) } }
      )
    }
  }

  // DB-backed second opinion behind the in-memory limiter above: the
  // in-memory count resets on cold start and isn't shared across
  // instances, so also check actual row counts for this IP hash. Fails
  // open (logs and continues) on a DB error rather than blocking a
  // legitimate submission because the durability check itself is down.
  if (ipHash) {
    try {
      const recentCount = await countRecentInquiriesByIp(ipHash, RATE_LIMIT.windowMs)
      if (recentCount >= RATE_LIMIT.limit) {
        return Response.json(
          { success: false, error: 'rate_limited' },
          { status: 429, headers: { 'Retry-After': String(Math.ceil(RATE_LIMIT.windowMs / 1000)) } }
        )
      }
    } catch (err) {
      console.error('POST /api/inquiries: countRecentInquiriesByIp failed', err)
    }
  }
  const userAgent = req.headers.get('user-agent') ?? undefined

  let created: { id: string; inquiryNumber: string }
  try {
    created = await createInquiry(input, { ipHash, userAgent })
  } catch (err) {
    console.error('POST /api/inquiries: db_error', err)
    return Response.json({ success: false, error: 'db_error' }, { status: 500 })
  }

  const templateData = {
    inquiryNumber: created.inquiryNumber,
    fullName: input.fullName,
    email: input.email,
    phone: input.phone,
    petType: input.petType,
    petBreed: input.petBreed,
    petCount: input.petCount,
    fromCountry: input.fromCountry,
    fromCity: input.fromCity,
    toCountry: input.toCountry,
    toCity: input.toCity,
    travelDate: input.travelDate,
    petWeightKg: input.petWeightKg,
    specialRequests: input.specialRequests,
  }

  const adminEmail = process.env.ADMIN_EMAIL

  let customerSent = false
  const customerTemplate = customerConfirmation(templateData)
  const customerResult = await sendEmail({
    to: input.email,
    subject: customerTemplate.subject,
    html: customerTemplate.html,
    ...(adminEmail ? { replyTo: adminEmail } : {}),
  })
  if (!customerResult.ok) {
    console.error(`POST /api/inquiries: customer email failed for ${created.inquiryNumber}: ${customerResult.error}`)
  } else {
    customerSent = true
    try {
      await markEmailSent(created.id, 'customer')
    } catch (err) {
      console.error(`POST /api/inquiries: markEmailSent(customer) failed for ${created.inquiryNumber}`, err)
    }
  }

  let adminSent = false
  if (!adminEmail) {
    console.error(`POST /api/inquiries: admin email failed for ${created.inquiryNumber}: ADMIN_EMAIL not set`)
  } else {
    const adminTemplate = adminNotification(templateData)
    const adminResult = await sendEmail({
      to: adminEmail,
      subject: adminTemplate.subject,
      html: adminTemplate.html,
      replyTo: input.email,
    })
    if (!adminResult.ok) {
      console.error(`POST /api/inquiries: admin email failed for ${created.inquiryNumber}: ${adminResult.error}`)
    } else {
      adminSent = true
      try {
        await markEmailSent(created.id, 'admin')
      } catch (err) {
        console.error(`POST /api/inquiries: markEmailSent(admin) failed for ${created.inquiryNumber}`, err)
      }
    }
  }

  return Response.json(
    {
      success: true,
      data: {
        inquiryNumber: created.inquiryNumber,
        emailSent: { customer: customerSent, admin: adminSent },
      },
    },
    { status: 201 }
  )
}

export function GET() {
  return Response.json({ success: false, error: 'method_not_allowed' }, { status: 405, headers: { Allow: 'POST' } })
}
