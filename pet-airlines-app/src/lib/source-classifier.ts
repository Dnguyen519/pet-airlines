// Pure, server-side classifier: derives a coarse `source_channel` (and a
// friendly `detail` string, e.g. "chatgpt" or "google") from a referrer host
// and/or a utm_source value. No I/O, no `server-only` import — this stays
// unit-testable with a plain `node --test` run.
//
// Order matters: utm_source is checked before the referrer host, because AI
// assistants (ChatGPT in particular) commonly strip the Referer header on
// outbound links but append `utm_source=chatgpt.com` — utm is the more
// reliable signal for that case. Within the referrer-host checks, the exact
// AI-assistant host list is checked BEFORE the search-engine wildcard list,
// because `gemini.google.com` / `bard.google.com` would otherwise match the
// `google` wildcard and misclassify as a search referral.

export type SourceChannel = 'ai_assistant' | 'search' | 'social' | 'referral' | 'direct'

export interface ClassifyInput {
  referrerHost?: string | null
  utmSource?: string | null
}

export interface ClassifyResult {
  channel: SourceChannel
  detail?: string
}

const AI_UTM_SUBSTRINGS = ['chatgpt', 'openai', 'perplexity', 'gemini', 'copilot', 'claude'] as const

// Exact-or-subdomain host matches, in priority order (checked before the
// search/social wildcard lists).
const AI_HOSTS: ReadonlyArray<[host: string, detail: string]> = [
  ['chatgpt.com', 'chatgpt'],
  ['chat.openai.com', 'chatgpt'],
  ['openai.com', 'chatgpt'],
  ['perplexity.ai', 'perplexity'],
  ['gemini.google.com', 'gemini'],
  ['bard.google.com', 'gemini'],
  ['copilot.microsoft.com', 'copilot'],
  ['claude.ai', 'claude'],
  ['you.com', 'you.com'],
  ['phind.com', 'phind'],
  ['poe.com', 'poe'],
  ['meta.ai', 'meta ai'],
  ['grok.com', 'grok'],
  ['x.ai', 'grok'],
  ['deepseek.com', 'deepseek'],
]

// Wildcard label matches — the base label must appear as one full dot-separated
// segment of the host, so this matches any TLD (google.com, google.ca, google.co.jp, ...).
const SEARCH_LABEL_WILDCARDS: ReadonlyArray<[label: string, detail: string]> = [
  ['google', 'google'],
  ['yahoo', 'yahoo'],
  ['yandex', 'yandex'],
]

const SEARCH_HOSTS: ReadonlyArray<[host: string, detail: string]> = [
  ['bing.com', 'bing'],
  ['duckduckgo.com', 'duckduckgo'],
  ['naver.com', 'naver'],
  ['baidu.com', 'baidu'],
  ['ecosia.org', 'ecosia'],
  ['coccoc.com', 'coccoc'],
]

const SOCIAL_LABEL_WILDCARDS: ReadonlyArray<[label: string, detail: string]> = [
  ['facebook', 'facebook'],
  ['instagram', 'instagram'],
  ['tiktok', 'tiktok'],
  ['youtube', 'youtube'],
  ['twitter', 'twitter'],
  ['linkedin', 'linkedin'],
  ['reddit', 'reddit'],
  ['threads', 'threads'],
  ['zalo', 'zalo'],
]

const SOCIAL_HOSTS: ReadonlyArray<[host: string, detail: string]> = [
  ['x.com', 'x'],
  ['t.co', 'x'],
]

function normalizeHost(host: string | null | undefined): string | undefined {
  if (!host) return undefined
  const trimmed = host.trim().toLowerCase().replace(/\.$/, '')
  return trimmed.length > 0 ? trimmed : undefined
}

function hostIsOrSubdomainOf(host: string, domain: string): boolean {
  return host === domain || host.endsWith(`.${domain}`)
}

function hostHasLabel(host: string, label: string): boolean {
  return host.split('.').includes(label)
}

function matchExactHosts(host: string, table: ReadonlyArray<[string, string]>): string | undefined {
  for (const [domain, detail] of table) {
    if (hostIsOrSubdomainOf(host, domain)) return detail
  }
  return undefined
}

function matchLabelWildcards(host: string, table: ReadonlyArray<[string, string]>): string | undefined {
  for (const [label, detail] of table) {
    if (hostHasLabel(host, label)) return detail
  }
  return undefined
}

/**
 * Classifies a lead's traffic source into one of five channels, purely from
 * a referrer host and/or a utm_source string. Never throws — bad/missing
 * input just falls through to `{ channel: 'direct' }`.
 */
export function classifySourceChannel(input: ClassifyInput): ClassifyResult {
  const utm = typeof input.utmSource === 'string' ? input.utmSource.trim().toLowerCase() : ''
  if (utm) {
    for (const needle of AI_UTM_SUBSTRINGS) {
      if (utm.includes(needle)) return { channel: 'ai_assistant', detail: needle }
    }
  }

  const host = normalizeHost(input.referrerHost)
  if (!host) return { channel: 'direct' }

  const aiDetail = matchExactHosts(host, AI_HOSTS)
  if (aiDetail) return { channel: 'ai_assistant', detail: aiDetail }

  const searchWildcardDetail = matchLabelWildcards(host, SEARCH_LABEL_WILDCARDS)
  if (searchWildcardDetail) return { channel: 'search', detail: searchWildcardDetail }

  const searchHostDetail = matchExactHosts(host, SEARCH_HOSTS)
  if (searchHostDetail) return { channel: 'search', detail: searchHostDetail }

  const socialWildcardDetail = matchLabelWildcards(host, SOCIAL_LABEL_WILDCARDS)
  if (socialWildcardDetail) return { channel: 'social', detail: socialWildcardDetail }

  const socialHostDetail = matchExactHosts(host, SOCIAL_HOSTS)
  if (socialHostDetail) return { channel: 'social', detail: socialHostDetail }

  return { channel: 'referral', detail: host }
}
