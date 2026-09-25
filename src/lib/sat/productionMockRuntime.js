/**
 * Server-only adapter for the Batch M production corpus.
 *
 * Release-time production gates are never executed during a student request.
 * The accepted Series B records are materialized once during the Render build
 * into a compact runtime snapshot and loaded from that snapshot here.
 */

let corpus = null;
let snapshotLoaded = false;

function loadCorpus() {
  if (!snapshotLoaded) {
    // eslint-disable-next-line global-require
    const snapshot = require('../../data/sat/mockContent/batchMSeriesBRuntimeSnapshot.json');
    corpus = Array.isArray(snapshot?.mocks) ? snapshot.mocks : [];
    snapshotLoaded = true;
  }
  return corpus;
}

export function getSeriesBMock(testKey) {
  const normalized = String(testKey || '').trim().toUpperCase().replace(/_/g, '');
  const match = normalized.match(/^SAT(1[1-9]|20)$/);
  if (!match) return null;

  const targetKey = `SAT${Number(match[1])}`;
  return loadCorpus().find((mock) => String(mock?.testKey || '').toUpperCase() === targetKey) || null;
}

export function validateSeriesBMockRuntime(mock) {
  const records = [...(mock?.readingWriting || []), ...(mock?.math || [])];
  if (records.length !== 196) throw new Error(`Production mock integrity failure for ${mock?.testKey || mock?.testId || 'unknown'}: expected 196 records, found ${records.length}`);
  const seen = new Set();
  for (const question of records) {
    if (!question?.questionId) throw new Error(`Production mock integrity failure: missing questionId in ${mock?.testKey || mock?.testId || 'unknown'}`);
    if (seen.has(question.questionId)) throw new Error(`Production mock integrity failure: duplicate questionId ${question.questionId}`);
    seen.add(question.questionId);
    if (!question.testId) throw new Error(`Production mock integrity failure: missing testId for ${question.questionId}`);
    if (!question.section || !question.module || String(question.prompt || '').trim() === '') throw new Error(`Production mock integrity failure: incomplete ${question.questionId}`);
  }
  return mock;
}

export default { getSeriesBMock, validateSeriesBMockRuntime };
