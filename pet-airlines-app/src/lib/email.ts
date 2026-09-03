import 'server-only'

import { Resend } from 'resend'

export type SendResult = { ok: true; id: string } | { ok: false; error: string }

interface SendEmailOptions {
  to: string
  subject: string
  html: string
  replyTo?: string
}

let loggedMissingKey = false
let loggedMissingFrom = false

export async function sendEmail({ to, subject, html, replyTo }: SendEmailOptions): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL

  if (!apiKey) {
    if (!loggedMissingKey) {
      loggedMissingKey = true
      console.error('sendEmail: RESEND_API_KEY not set')
    }
    return { ok: false, error: 'RESEND_API_KEY not set' }
  }

  if (!from) {
    if (!loggedMissingFrom) {
      loggedMissingFrom = true
      console.error('sendEmail: RESEND_FROM_EMAIL not set')
    }
    return { ok: false, error: 'RESEND_FROM_EMAIL not set' }
  }

  try {
    const resend = new Resend(apiKey)
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
      ...(replyTo ? { replyTo } : {}),
    })

    if (error) {
      return { ok: false, error: error.message }
    }

    if (!data?.id) {
      return { ok: false, error: 'no id returned' }
    }

    return { ok: true, id: data.id }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return { ok: false, error: message }
  }
}