// Unit tests for src/lib/source-classifier.ts, run with Node's built-in
// test runner — no new dependency (the repo has no test runner besides
// Playwright, and this classifier is a pure function with no browser or DB
// dependency, so it doesn't need one).
//
// Usage: node --import tsx --test scripts/test-source-classifier.mjs

import assert from 'node:assert/strict'
import { test } from 'node:test'

import { classifySourceChannel } from '../src/lib/source-classifier.ts'

test('utm_source containing "chatgpt" classifies as ai_assistant even with no referrer', () => {
  const result = classifySourceChannel({ utmSource: 'chatgpt.com' })
  assert.equal(result.channel, 'ai_assistant')
  assert.equal(result.detail, 'chatgpt')
})

for (const needle of ['chatgpt', 'openai', 'perplexity', 'gemini', 'copilot', 'claude']) {
  test(`utm_source containing "${needle}" (any casing/substring) classifies as ai_assistant`, () => {
    const result = classifySourceChannel({ utmSource: `SomePrefix-${needle}-suffix` })
    assert.equal(result.channel, 'ai_assistant')
  })
}

test('gemini.google.com classifies as ai_assistant, not search (order matters)', () => {
  const result = classifySourceChannel({ referrerHost: 'gemini.google.com' })
  assert.equal(result.channel, 'ai_assistant')
  assert.equal(result.detail, 'gemini')
})

test('bard.google.com classifies as ai_assistant', () => {
  const result = classifySourceChannel({ referrerHost: 'bard.google.com' })
  assert.equal(result.channel, 'ai_assistant')
})

test('chatgpt.com referrer classifies as ai_assistant', () => {
  const result = classifySourceChannel({ referrerHost: 'chatgpt.com' })
  assert.equal(result.channel, 'ai_assistant')
  assert.equal(result.detail, 'chatgpt')
})

test('chat.openai.com referrer classifies as ai_assistant with detail chatgpt', () => {
  const result = classifySourceChannel({ referrerHost: 'chat.openai.com' })
  assert.equal(result.channel, 'ai_assistant')
  assert.equal(result.detail, 'chatgpt')
})

test('claude.ai referrer classifies as ai_assistant', () => {
  const result = classifySourceChannel({ referrerHost: 'claude.ai' })
  assert.equal(result.channel, 'ai_assistant')
  assert.equal(result.detail, 'claude')
})

test('www.google.ca referrer classifies as search (google wildcard, any TLD)', () => {
  const result = classifySourceChannel({ referrerHost: 'www.google.ca' })
  assert.equal(result.channel, 'search')
  assert.equal(result.detail, 'google')
})

test('google.com referrer classifies as search', () => {
  const result = classifySourceChannel({ referrerHost: 'google.com' })
  assert.equal(result.channel, 'search')
})

test('bing.com referrer classifies as search', () => {
  const result = classifySourceChannel({ referrerHost: 'bing.com' })
  assert.equal(result.channel, 'search')
  assert.equal(result.detail, 'bing')
})

test('duckduckgo.com referrer classifies as search', () => {
  const result = classifySourceChannel({ referrerHost: 'duckduckgo.com' })
  assert.equal(result.channel, 'search')
})

test('m.facebook.com referrer classifies as social (subdomain label match)', () => {
  const result = classifySourceChannel({ referrerHost: 'm.facebook.com' })
  assert.equal(result.channel, 'social')
  assert.equal(result.detail, 'facebook')
})

test('l.instagram.com referrer classifies as social', () => {
  const result = classifySourceChannel({ referrerHost: 'l.instagram.com' })
  assert.equal(result.channel, 'social')
  assert.equal(result.detail, 'instagram')
})

test('www.youtube.com referrer classifies as social', () => {
  const result = classifySourceChannel({ referrerHost: 'www.youtube.com' })
  assert.equal(result.channel, 'social')
})

test('x.com referrer classifies as social', () => {
  const result = classifySourceChannel({ referrerHost: 'x.com' })
  assert.equal(result.channel, 'social')
  assert.equal(result.detail, 'x')
})

test('t.co referrer classifies as social', () => {
  const result = classifySourceChannel({ referrerHost: 't.co' })
  assert.equal(result.channel, 'social')
})

test('an arbitrary unknown host classifies as referral, with the host as detail', () => {
  const result = classifySourceChannel({ referrerHost: 'some-pet-blog.example' })
  assert.equal(result.channel, 'referral')
  assert.equal(result.detail, 'some-pet-blog.example')
})

test('no referrer and no utm classifies as direct', () => {
  const result = classifySourceChannel({})
  assert.equal(result.channel, 'direct')
  assert.equal(result.detail, undefined)
})

test('null/undefined referrerHost and utmSource classify as direct without throwing', () => {
  assert.doesNotThrow(() => {
    const result = classifySourceChannel({ referrerHost: null, utmSource: undefined })
    assert.equal(result.channel, 'direct')
  })
})

test('empty-string referrerHost classifies as direct, not referral', () => {
  const result = classifySourceChannel({ referrerHost: '' })
  assert.equal(result.channel, 'direct')
})

test('host is case-insensitive', () => {
  const result = classifySourceChannel({ referrerHost: 'WWW.GOOGLE.COM' })
  assert.equal(result.channel, 'search')
})

test('host with a trailing dot is normalized', () => {
  const result = classifySourceChannel({ referrerHost: 'google.com.' })
  assert.equal(result.channel, 'search')
})
