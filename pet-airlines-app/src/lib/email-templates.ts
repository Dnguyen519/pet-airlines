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
  <meta name="color-scheme" content="light">
  <title>${escapeHtml(title)}</title>
  <style>
    @media screen and (max-width: 600px) {
      .par-container { width: 100% !important; }
      .par-pad { padding-left: 16px !important; padding-right: 16px !important; }
    }
  </style>
</head>
<body style="margin:0; padding:0; background:#f2f2f2; font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f2f2f2;">
    <tr>
      <td align="center" style="padding: 16px 8px;">
        <table role="presentation" class="par-container" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px; max-width:600px; background:#ffffff; border-radius:10px; overflow:hidden;">
          <tr>
            <td class="par-pad" bgcolor="#1B3A5F" style="background-color:#1B3A5F; background-image: linear-gradient(135deg, #3B9AE1 0%, #1B3A5F 100%); color:#ffffff; text-align:center; padding: 24px;">
              <h1 style="margin: 0; font-size: 26px;">Pet Airlines</h1>
              <p style="margin: 8px 0 0 0; font-size: 15px;">Global Pet Transportation</p>
            </td>
          </tr>
          <tr>
            <td class="par-pad" bgcolor="#E8F4FB" style="background-color:#E8F4FB; padding: 24px;">
              ${bodyHtml}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function detailCard(innerHtml: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 16px 0; background:#ffffff; border-radius:8px;">
      <tr>
        <td width="4" bgcolor="#3B9AE1" style="background-color:#3B9AE1; font-size:0; line-height:0;">&nbsp;</td>
        <td style="padding: 16px 20px;">
          ${innerHtml}
        </td>
      </tr>
    </table>`
}

export function customerConfirmation(d: InquiryTemplateData): { subject: string; html: string } {
  const subject = `Pet Airlines - Inquiry Received (${d.inquiryNumber})`

  const body = `
    <h2 style="color: #1B3A5F; margin-top: 0;">Hello ${escapeHtml(d.fullName)},</h2>
    <p>Thank you for your inquiry with Pet Airlines. We've received your request and a specialist will reply within one business day.</p>
    ${detailCard(`<h3 style="margin-top: 0; color: #1B3A5F;">Inquiry Details</h3>
      ${detailRows(d, { includeContact: false })}`)}
    <p>What happens next: a Pet Airlines specialist reviews your route and pet details, then replies to this email with next steps and any questions.</p>
    <p>Best regards,<br>
    <strong>Pet Airlines Team</strong></p>
  `

  return { subject, html: shell(body, subject) }
}

export function adminNotification(d: InquiryTemplateData): { subject: string; html: string } {
  const subject = `New Inquiry ${d.inquiryNumber} - ${d.fromCity} to ${d.toCity}`

  const body = `
    <h2 style="color: #1B3A5F; margin-top: 0;">New Pet Airlines Inquiry</h2>
    ${detailCard(detailRows(d, { includeContact: true }))}
    <p>Reply to customer: <a href="mailto:${escapeHtml(d.email)}">${escapeHtml(d.email)}</a></p>
  `

  return { subject, html: shell(body, subject) }
}
