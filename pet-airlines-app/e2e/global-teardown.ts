import { deleteInquiriesByFullNamePrefix } from './helpers/db'

// Runs once, after every worker/project has finished — safe to do a
// prefix-wide sweep here (unlike a per-test afterEach, which races other
// workers still mid-test against rows matching the same prefix). Belt for
// anything a crashed run left behind; the happy-path test deletes its own
// row immediately after asserting against it.
export default async function globalTeardown(): Promise<void> {
  const deleted = await deleteInquiriesByFullNamePrefix('[QA] ')
  if (deleted > 0) {
    console.log(`global-teardown: swept ${deleted} leftover [QA] inquiry row(s)`)
  }
}
