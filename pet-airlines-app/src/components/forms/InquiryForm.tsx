'use client'

import { useState } from 'react'

import { COUNTRIES } from '@/lib/countries'
import { InquirySchema, PET_TYPES, type InquiryInput } from '@/lib/validation/inquiry'

interface InquiryFormProps {
  initialFrom?: string
  initialTo?: string
}

type FormState = {
  fullName: string
  email: string
  phone: string
  petType: string
  petBreed: string
  petWeightKg: string
  petCount: string
  fromCountry: string
  fromCity: string
  toCountry: string
  toCity: string
  travelDate: string
  specialRequests: string
  website: string
}

const POPULAR_ROUTE_CHIPS = [
  { from: 'CA', to: 'VN', label: 'Canada → Vietnam' },
  { from: 'CA', to: 'KR', label: 'Canada → South Korea' },
  { from: 'KR', to: 'VN', label: 'South Korea → Vietnam' },
  { from: 'CA', to: 'FR', label: 'Canada → France' },
  { from: 'KR', to: 'FR', label: 'South Korea → France' },
  { from: 'VN', to: 'FR', label: 'Vietnam → France' },
]

const PET_TYPE_LABELS: Record<(typeof PET_TYPES)[number], string> = {
  dog: '🐕 Dog',
  cat: '🐱 Cat',
  bird: '🦜 Bird',
  rabbit: '🐰 Rabbit',
  other: 'Other',
}

function emptyForm(initialFrom?: string, initialTo?: string): FormState {
  return {
    fullName: '',
    email: '',
    phone: '',
    petType: '',
    petBreed: '',
    petWeightKg: '',
    petCount: '1',
    fromCountry: initialFrom ?? '',
    fromCity: '',
    toCountry: initialTo ?? '',
    toCity: '',
    travelDate: '',
    specialRequests: '',
    website: '',
  }
}

function buildPayload(form: FormState): unknown {
  return {
    fullName: form.fullName.trim(),
    email: form.email.trim(),
    phone: form.phone.trim() || undefined,
    petType: form.petType,
    petBreed: form.petBreed.trim() || undefined,
    petWeightKg: form.petWeightKg.trim() ? Number(form.petWeightKg) : undefined,
    petCount: form.petCount.trim() ? Number(form.petCount) : undefined,
    fromCountry: form.fromCountry,
    fromCity: form.fromCity.trim(),
    toCountry: form.toCountry,
    toCity: form.toCity.trim(),
    travelDate: form.travelDate || undefined,
    specialRequests: form.specialRequests.trim() || undefined,
    website: form.website,
  }
}

type SubmitResult =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'success'; inquiryNumber: string; customerEmailed: boolean }
  | { status: 'validation-error'; messages: string[] }
  | { status: 'rate-limited' }
  | { status: 'server-error' }

export function InquiryForm({ initialFrom, initialTo }: InquiryFormProps) {
  const [form, setForm] = useState<FormState>(() => emptyForm(initialFrom, initialTo))
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [result, setResult] = useState<SubmitResult>({ status: 'idle' })

  const isSubmitting = result.status === 'submitting'

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function applyRoute(from: string, to: string) {
    setForm((prev) => ({ ...prev, fromCountry: from, toCountry: to }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const payload = buildPayload(form)
    const parsed = InquirySchema.safeParse(payload)

    if (!parsed.success) {
      const nextFieldErrors: Record<string, string> = {}
      const messages: string[] = []
      for (const issue of parsed.error.issues) {
        const field = String(issue.path[0] ?? '')
        if (field && !(field in nextFieldErrors)) {
          nextFieldErrors[field] = issue.message
        }
        messages.push(issue.message)
      }
      setFieldErrors(nextFieldErrors)
      setResult({ status: 'validation-error', messages })
      return
    }

    setFieldErrors({})
    setResult({ status: 'submitting' })

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(parsed.data satisfies InquiryInput),
      })

      if (res.status === 201) {
        const body = (await res.json()) as {
          data: { inquiryNumber: string; emailSent: { customer: boolean; admin: boolean } }
        }
        setResult({
          status: 'success',
          inquiryNumber: body.data.inquiryNumber,
          customerEmailed: body.data.emailSent.customer,
        })
        return
      }

      if (res.status === 400) {
        const body = (await res.json()) as { details?: string[] }
        setResult({ status: 'validation-error', messages: body.details ?? ['Validation failed.'] })
        return
      }

      if (res.status === 429) {
        setResult({ status: 'rate-limited' })
        return
      }

      setResult({ status: 'server-error' })
    } catch {
      setResult({ status: 'server-error' })
    }
  }

  if (result.status === 'success') {
    return (
      <div className="card max-w-2xl mx-auto text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold text-pet-navy mb-4">Request received</h2>
        <p className="text-lg text-gray-700 mb-2">
          Your reference number is <span className="font-mono font-semibold">{result.inquiryNumber}</span>.
        </p>
        <div className="bg-pet-light rounded-2xl p-4">
          <p className="text-sm text-pet-navy font-medium">
            {result.customerEmailed
              ? `We emailed a confirmation to ${form.email}.`
              : 'Keep this reference number — our team will reply by email.'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      {/* Honeypot — hidden from real users, off-screen (not display:none) so bots that ignore CSS still fill it. */}
      <div style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }} aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          autoComplete="off"
          tabIndex={-1}
          value={form.website}
          onChange={(e) => update('website', e.target.value)}
        />
      </div>

      {/* Popular Routes */}
      <div className="card">
        <h3 className="font-semibold text-pet-navy mb-3">Popular Routes</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {POPULAR_ROUTE_CHIPS.map((route) => (
            <button
              key={`${route.from}-${route.to}`}
              type="button"
              onClick={() => applyRoute(route.from, route.to)}
              className="px-4 py-2 text-sm border-2 border-gray-200 rounded-lg hover:border-pet-orange hover:bg-pet-light transition-colors text-left"
            >
              {route.label}
            </button>
          ))}
        </div>
      </div>

      {/* Pet Information */}
      <div className="card">
        <h3 className="text-xl font-semibold text-pet-navy mb-6">Pet Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="petType" className="block text-sm font-medium text-gray-700 mb-2">
              Pet Type <span className="text-red-500">*</span>
            </label>
            <select
              id="petType"
              name="petType"
              value={form.petType}
              onChange={(e) => update('petType', e.target.value)}
              aria-invalid={Boolean(fieldErrors.petType)}
              aria-describedby={fieldErrors.petType ? 'petType-error' : undefined}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pet-orange focus:border-pet-orange"
            >
              <option value="">Select pet type</option>
              {PET_TYPES.map((t) => (
                <option key={t} value={t}>
                  {PET_TYPE_LABELS[t]}
                </option>
              ))}
            </select>
            {fieldErrors.petType && (
              <p id="petType-error" className="mt-1 text-sm text-red-600">
                {fieldErrors.petType}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="petBreed" className="block text-sm font-medium text-gray-700 mb-2">
              Breed
            </label>
            <input
              id="petBreed"
              name="petBreed"
              type="text"
              value={form.petBreed}
              onChange={(e) => update('petBreed', e.target.value)}
              placeholder="e.g., Golden Retriever"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pet-orange focus:border-pet-orange"
            />
          </div>

          <div>
            <label htmlFor="petWeightKg" className="block text-sm font-medium text-gray-700 mb-2">
              Weight (kg)
            </label>
            <input
              id="petWeightKg"
              name="petWeightKg"
              type="number"
              min="0.1"
              max="150"
              step="0.1"
              value={form.petWeightKg}
              onChange={(e) => update('petWeightKg', e.target.value)}
              placeholder="e.g., 15.5"
              aria-invalid={Boolean(fieldErrors.petWeightKg)}
              aria-describedby={fieldErrors.petWeightKg ? 'petWeightKg-error' : undefined}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pet-orange focus:border-pet-orange"
            />
            {fieldErrors.petWeightKg && (
              <p id="petWeightKg-error" className="mt-1 text-sm text-red-600">
                {fieldErrors.petWeightKg}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="petCount" className="block text-sm font-medium text-gray-700 mb-2">
              Number of Pets
            </label>
            <input
              id="petCount"
              name="petCount"
              type="number"
              min="1"
              max="10"
              value={form.petCount}
              onChange={(e) => update('petCount', e.target.value)}
              aria-invalid={Boolean(fieldErrors.petCount)}
              aria-describedby={fieldErrors.petCount ? 'petCount-error' : undefined}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pet-orange focus:border-pet-orange"
            />
            {fieldErrors.petCount && (
              <p id="petCount-error" className="mt-1 text-sm text-red-600">
                {fieldErrors.petCount}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Travel Information */}
      <div className="card">
        <h3 className="text-xl font-semibold text-pet-navy mb-6">Travel Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="fromCountry" className="block text-sm font-medium text-gray-700 mb-2">
              From Country <span className="text-red-500">*</span>
            </label>
            <select
              id="fromCountry"
              name="fromCountry"
              value={form.fromCountry}
              onChange={(e) => update('fromCountry', e.target.value)}
              aria-invalid={Boolean(fieldErrors.fromCountry)}
              aria-describedby={fieldErrors.fromCountry ? 'fromCountry-error' : undefined}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pet-orange focus:border-pet-orange"
            >
              <option value="">Select country</option>
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
            {fieldErrors.fromCountry && (
              <p id="fromCountry-error" className="mt-1 text-sm text-red-600">
                {fieldErrors.fromCountry}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="fromCity" className="block text-sm font-medium text-gray-700 mb-2">
              From City <span className="text-red-500">*</span>
            </label>
            <input
              id="fromCity"
              name="fromCity"
              type="text"
              value={form.fromCity}
              onChange={(e) => update('fromCity', e.target.value)}
              placeholder="e.g., Toronto"
              aria-invalid={Boolean(fieldErrors.fromCity)}
              aria-describedby={fieldErrors.fromCity ? 'fromCity-error' : undefined}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pet-orange focus:border-pet-orange"
            />
            {fieldErrors.fromCity && (
              <p id="fromCity-error" className="mt-1 text-sm text-red-600">
                {fieldErrors.fromCity}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="toCountry" className="block text-sm font-medium text-gray-700 mb-2">
              To Country <span className="text-red-500">*</span>
            </label>
            <select
              id="toCountry"
              name="toCountry"
              value={form.toCountry}
              onChange={(e) => update('toCountry', e.target.value)}
              aria-invalid={Boolean(fieldErrors.toCountry)}
              aria-describedby={fieldErrors.toCountry ? 'toCountry-error' : undefined}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pet-orange focus:border-pet-orange"
            >
              <option value="">Select country</option>
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
            {fieldErrors.toCountry && (
              <p id="toCountry-error" className="mt-1 text-sm text-red-600">
                {fieldErrors.toCountry}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="toCity" className="block text-sm font-medium text-gray-700 mb-2">
              To City <span className="text-red-500">*</span>
            </label>
            <input
              id="toCity"
              name="toCity"
              type="text"
              value={form.toCity}
              onChange={(e) => update('toCity', e.target.value)}
              placeholder="e.g., Hanoi"
              aria-invalid={Boolean(fieldErrors.toCity)}
              aria-describedby={fieldErrors.toCity ? 'toCity-error' : undefined}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pet-orange focus:border-pet-orange"
            />
            {fieldErrors.toCity && (
              <p id="toCity-error" className="mt-1 text-sm text-red-600">
                {fieldErrors.toCity}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label htmlFor="travelDate" className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Travel Date
            </label>
            <input
              id="travelDate"
              name="travelDate"
              type="date"
              value={form.travelDate}
              onChange={(e) => update('travelDate', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              aria-invalid={Boolean(fieldErrors.travelDate)}
              aria-describedby={fieldErrors.travelDate ? 'travelDate-error' : undefined}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pet-orange focus:border-pet-orange"
            />
            {fieldErrors.travelDate && (
              <p id="travelDate-error" className="mt-1 text-sm text-red-600">
                {fieldErrors.travelDate}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Customer Information */}
      <div className="card">
        <h3 className="text-xl font-semibold text-pet-navy mb-6">Your Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={form.fullName}
              onChange={(e) => update('fullName', e.target.value)}
              aria-invalid={Boolean(fieldErrors.fullName)}
              aria-describedby={fieldErrors.fullName ? 'fullName-error' : undefined}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pet-orange focus:border-pet-orange"
            />
            {fieldErrors.fullName && (
              <p id="fullName-error" className="mt-1 text-sm text-red-600">
                {fieldErrors.fullName}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? 'email-error' : undefined}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pet-orange focus:border-pet-orange"
            />
            {fieldErrors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-600">
                {fieldErrors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
              aria-invalid={Boolean(fieldErrors.phone)}
              aria-describedby={fieldErrors.phone ? 'phone-error' : undefined}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pet-orange focus:border-pet-orange"
            />
            {fieldErrors.phone && (
              <p id="phone-error" className="mt-1 text-sm text-red-600">
                {fieldErrors.phone}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Special Requests */}
      <div className="card">
        <h3 className="text-xl font-semibold text-pet-navy mb-6">Additional Information</h3>
        <div>
          <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-2">
            Special Requests or Health Conditions
          </label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            value={form.specialRequests}
            onChange={(e) => update('specialRequests', e.target.value.slice(0, 2000))}
            rows={4}
            maxLength={2000}
            placeholder="Tell us about any special needs, medications, or specific requirements for your pet..."
            aria-invalid={Boolean(fieldErrors.specialRequests)}
            aria-describedby="specialRequests-count"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pet-orange focus:border-pet-orange"
          />
          <p id="specialRequests-count" className="mt-1 text-xs text-gray-500 text-right">
            {form.specialRequests.length} / 2000
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-8 py-3 rounded-full font-semibold text-white transition-all ${
            isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-pet-orange hover:bg-pet-orange-dark hover:scale-105 transform'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Submitting...
            </span>
          ) : (
            'Get Your Free Quote'
          )}
        </button>
      </div>

      {result.status === 'validation-error' && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg" role="alert">
          <p className="font-semibold mb-2">Please fix the following:</p>
          <ul className="list-disc list-inside text-sm space-y-1">
            {result.messages.map((message, i) => (
              <li key={i}>{message}</li>
            ))}
          </ul>
        </div>
      )}

      {result.status === 'rate-limited' && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center" role="alert">
          Too many requests. Please try again in a little while.
        </div>
      )}

      {result.status === 'server-error' && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center" role="alert">
          Sorry, there was an error submitting your inquiry. Please try again or contact us directly.
        </div>
      )}
    </form>
  )
}
