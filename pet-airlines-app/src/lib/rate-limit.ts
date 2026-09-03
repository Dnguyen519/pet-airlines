// In-memory sliding-window rate limiter. State lives in module scope, so it
// is per-instance only — adequate as long as this app runs on a single
// Fluid Compute instance. If the app scales to multiple instances, this
// needs to move to a shared store (e.g. Redis) or every instance enforces
// its own independent limit.

interface RateLimitOptions {
  limit: number
  windowMs: number
}

interface Bucket {
  count: number
  windowStart: number
}

const buckets = new Map<string, Bucket>()

let lastPrune = Date.now()
const PRUNE_INTERVAL_MS = 10 * 60 * 1000

function pruneIfDue(now: number, windowMs: number): void {
  if (now - lastPrune < PRUNE_INTERVAL_MS) return
  lastPrune = now
  buckets.forEach((bucket, key) => {
    if (now - bucket.windowStart >= windowMs) {
      buckets.delete(key)
    }
  })
}

export function checkRateLimit(
  key: string,
  { limit, windowMs }: RateLimitOptions
): { allowed: boolean; retryAfterSec: number } {
  const now = Date.now()
  pruneIfDue(now, windowMs)

  const existing = buckets.get(key)

  if (!existing || now - existing.windowStart >= windowMs) {
    buckets.set(key, { count: 1, windowStart: now })
    return { allowed: true, retryAfterSec: 0 }
  }

  if (existing.count < limit) {
    existing.count += 1
    return { allowed: true, retryAfterSec: 0 }
  }

  const retryAfterSec = Math.max(1, Math.ceil((existing.windowStart + windowMs - now) / 1000))
  return { allowed: false, retryAfterSec }
}
