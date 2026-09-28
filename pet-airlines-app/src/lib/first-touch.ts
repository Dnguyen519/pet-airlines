// Client-only helpers for first-touch attribution capture. Every exported
// function here touches `window` / `document` / `localStorage` and must
// only ever be called from client components, in a browser context (never
// at module scope, never during SSR/prerender). Every call site wraps these
// in try/catch anyway — this file is defense-in-depth, not the only guard —
// because storage can be blocked (private windows, locked-down browsers,
// third-party-storage policies) and must degrade silently to "no data"
// rather than break the page or the quote form.
//
// First touch wins: a valid (non-expired) existing record is never
// overwritten. Referrers from our own hosts are dropped, not stored, so an
// internal page-to-page navigation never gets attributed as its own source.

const STORAGE_KEY = 'pa_first_touch_v1'
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000

const OWN_HOSTS = new Set(['pet-airlines.com', 'www.pet-airlines.com', 'localhost'])

export interface FirstTouchRecord {
  referrerHost?: string
  referrerPath?: string
  landingPath: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  capturedAt: string
}

function isOwnHost(host: string): boolean {
  const normalized = host.toLowerCase()
  if (OWN_HOSTS.has(normalized)) return true
  if (normalized.endsWith('.vercel.app')) return true
  return false
}

function isFresh(capturedAt: unknown): boolean {
  if (typeof capturedAt !== 'string') return false
  const age = Date.now() - new Date(capturedAt).getTime()
  return Number.isFinite(age) && age >= 0 && age <= MAX_AGE_MS
}

/** Reads the stored first-touch record, if any, and only if it's still fresh (within 30 days). Never throws. */
export function readFirstTouch(): FirstTouchRecord | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<FirstTouchRecord> | null
    if (!parsed || typeof parsed.landingPath !== 'string' || !isFresh(parsed.capturedAt)) return null
    return parsed as FirstTouchRecord
  } catch {
    return null
  }
}

function buildFirstTouch(): FirstTouchRecord {
  const landingPath = window.location.pathname || '/'

  let referrerHost: string | undefined
  let referrerPath: string | undefined
  try {
    if (document.referrer) {
      const referrerUrl = new URL(document.referrer)
      if (!isOwnHost(referrerUrl.hostname)) {
        referrerHost = referrerUrl.hostname
        referrerPath = referrerUrl.pathname
      }
    }
  } catch {
    // Malformed/unparseable referrer — leave both undefined.
  }

  const params = new URLSearchParams(window.location.search)

  return {
    referrerHost,
    referrerPath,
    landingPath,
    utmSource: params.get('utm_source') ?? undefined,
    utmMedium: params.get('utm_medium') ?? undefined,
    utmCampaign: params.get('utm_campaign') ?? undefined,
    capturedAt: new Date().toISOString(),
  }
}

/**
 * Captures first-touch attribution on the first valid page load only — if a
 * fresh record already exists, this is a no-op. Every failure mode (storage
 * blocked, private window, malformed existing JSON) degrades silently.
 */
export function captureFirstTouchOnce(): void {
  try {
    if (readFirstTouch()) return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(buildFirstTouch()))
  } catch {
    // Storage unavailable/blocked — nothing to do.
  }
}
