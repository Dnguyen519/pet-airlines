'use client'

import { useEffect } from 'react'

import { captureFirstTouchOnce } from '@/lib/first-touch'

/**
 * Mounted once in the root layout. Renders nothing — its only job is to
 * capture first-touch attribution (referrer, landing path, utm params) into
 * localStorage on first page load. Reads `window.location` directly inside
 * the effect rather than via `useSearchParams()`, so it needs no Suspense
 * boundary and every marketing page above it can stay a server component
 * with its own per-page metadata.
 */
export function FirstTouchTracker(): null {
  useEffect(() => {
    captureFirstTouchOnce()
  }, [])

  return null
}
