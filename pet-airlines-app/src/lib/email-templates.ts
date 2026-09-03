import { countryName } from '@/lib/countries'

export interface InquiryTemplateData {
  inquiryNumber: string
  fullName: string
  email: string
  phone?: string
  petType: string
  petBreed?: string
  petCount: number
  fromCountry: string
  fromCity: string
  toCountry: string
  toCity: string
  travelDate?: string
  petWeightKg?: number
  specialRequests?: string
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function routeLine(d: InquiryTemplateData): string {
  const from = `${escapeHtml(d.fromCity)}, ${escapeHtml(countryName(d.fromCountry))}`
  const to = `${escapeHtml(d.toCity)}, ${escapeHtml(countryName(d.toCountry))}`
  return `${from} &rarr; ${to}`
}

function detailRows(d: InquiryTemplateData, opts: { includeContact: boolean }): string {
  const rows: Array<[string, string]> = [
    ['Inquiry Number', escapeHtml(d.inquiryNumber)],
    ['Pet Type', escapeHtml(d.petType)],
  ]

  if (d.petBreed) rows.push(['Breed', escapeHtml(d.petBreed)])
  if (d.petWeightKg !== undefined) rows.push(['Weight', `${d.petWeightKg} kg`])
  rows.push(['Number of Pets', String(d.petCount)])
  rows.push(['Route', routeLine(d)])
  if (d.travelDate) rows.push(['Preferred Travel Date', escapeHtml(d.travelDate)])
  if (opts.includeContact) {
    rows.push(['Customer Name', escapeHtml(d.fullName)])
    rows.push(['Email', escapeHtml(d.email)])
    if (d.phone) rows.push(['Phone', escapeHtml(d.phone)])
  }
  if (d.specialRequests) rows.push(['Special Requests', escapeHtml(d.specialRequests)])

  return rows
    .map(
      ([label, value]) =>
        `<p style="margin:4px 0;"><strong>${label}:</strong> ${value}</p>`
    )
    .join('\n')
}

function shell(bodyHtml: string, title: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="margin: 0; font-size: 28px;">Pet Airlines</h1>
    <p style="margin: 10px 0 0 0; font-size: 16px;">Global Pet Transportation</p>
  </div>
  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    ${bodyHtml}
  </div>
</body>
</html>`
}

export function customerConfirmation(d: InquiryTemplateData): { subject: string; html: string } {
  const subject = `Pet Airlines - Inquiry Received (${d.inquiryNumber})`

  const body = `
    <h2 style="color: #667eea; margin-top: 0;">Hello ${escapeHtml(d.fullName)},</h2>
    <p>Thank you for your inquiry with Pet Airlines. We've received your request and a specialist will reply within one business day.</p>
    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
      <h3 style="margin-top: 0; color: #667eea;">Inquiry Details</h3>
      ${detailRows(d, { includeContact: false })}
    </div>
    <p>What happens next: a Pet Airlines specialist reviews your route and pet details, then replies to this email with next steps and any questions.</p>
    <p>Best regards,<br>
    <strong>Pet Airlines Team</strong></p>
  `

  return { subject, html: shell(body, subject) }
}

export function adminNotification(d: InquiryTemplateData): { subject: string; html: string } {
  const subject = `New Inquiry ${d.inquiryNumber} - ${d.fromCity} to ${d.toCity}`

  const body = `
    <h2 style="color: #667eea; margin-top: 0;">New Pet Airlines Inquiry</h2>
    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
      ${detailRows(d, { includeContact: true })}
    </div>
    <p>Reply to customer: <a href="mailto:${escapeHtml(d.email)}">${escapeHtml(d.email)}</a></p>
  `

  return { subject, html: shell(body, subject) }
}
