/**
 * Server-only adapter for the frozen Batch M production corpus.
 *
 * The production gates are release-time generation/QC machinery. They must not
 * execute merely because Next.js is compiling or because a client-safe helper
 * is imported. The corpus is loaded lazily only when a verified server request
 * actually needs a Series B mock.
 */

let corpus = null;
let storeLoaded = false;

function loadCorpus() {
  if (!storeLoaded) {
    // eslint-disable-next-line global-require
    const store = require('../../data/sat/mockContent/batchMProductionStore');
    corpus = store.BATCH_M_ACCEPTED_PRODUCTION_CORPUS || [];
    storeLoaded = true;
  }
  return corpus;
}

export function getSeriesBMock(testKey) {
  const normalized = String(testKey || '').trim().toUpperCase().replace(/_/g, '');
  const match = normalized.match(/^SAT(1[1-9]|20)$/);
  if (!match) return null;

  const targetKey = `sat-series-b-mock-${String(Number(match[1])).padStart(2, '0')}`;
  return loadCorpus().find((mock) => mock?.testId === targetKey) || null;
}

export function validateSeriesBMockRuntime(mock) {
  const records = [...(mock?.readingWriting || []), ...(mock?.math || [])];
  if (records.length !== 196) throw new Error(`Production mock integrity failure for ${mock?.testId || 'unknown'}: expected 196 records, found ${records.length}`);
  const seen = new Set();
  for (const question of records) {
    if (!question?.questionId) throw new Error(`Production mock integrity failure: missing questionId in ${mock.testId}`);
    if (seen.has(question.questionId)) throw new Error(`Production mock integrity failure: duplicate questionId ${question.questionId}`);
    seen.add(question.questionId);
    if (question.testId !== mock.testId) throw new Error(`Production mock integrity failure: ${question.questionId} has mismatched testId`);
    if (!question.section || !question.module || String(question.prompt || '').trim() === '') throw new Error(`Production mock integrity failure: incomplete ${question.questionId}`);
  }
  return mock;
}

export default { getSeriesBMock, validateSeriesBMockRuntime };
