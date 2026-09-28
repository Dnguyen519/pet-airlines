// Self-reported "how did you hear about us?" options for the inquiry form.
// Values are the enum stored in `inquiries.source_self_reported`; labels are
// the UI copy. Shared between the form component and the Zod schema so the
// two can never drift out of sync.

export const SOURCE_SELF_REPORTED_VALUES = [
  'search_engine',
  'ai_assistant',
  'friend_family',
  'social_media',
  'vet_breeder',
  'returning_customer',
  'other',
] as const

export type SourceSelfReported = (typeof SOURCE_SELF_REPORTED_VALUES)[number]

export const SOURCE_SELF_REPORTED_LABELS: Record<SourceSelfReported, string> = {
  search_engine: 'Search engine (Google, Bing)',
  ai_assistant: 'AI assistant (ChatGPT, Gemini, Copilot, Perplexity)',
  friend_family: 'Friend or family',
  social_media: 'Social media or YouTube',
  vet_breeder: 'Vet, breeder or pet community',
  returning_customer: 'I have used Pet Airlines before',
  other: 'Other',
}
