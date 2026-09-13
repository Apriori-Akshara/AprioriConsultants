/**
 * Batch M — controlled production sequence controller.
 *
 * This module does not generate or publish production questions by itself.
 * It defines the only approved production order and provides deterministic
 * checkpoint helpers for a future generation runner.
 */

const satSeriesA = Array.from({ length: 10 }, (_, index) => ({
  assessment: 'sat',
  series: 'A',
  number: index + 1,
  testKey: `SAT${index + 1}`,
  testId: `sat-series-a-mock-${String(index + 1).padStart(2, '0')}`,
  variant: 'sat-series-a',
  assessmentNumber: index + 1,
}));

const psat = Array.from({ length: 10 }, (_, index) => ({
  assessment: 'psat',
  series: null,
  number: index + 1,
  testKey: `PSAT${index + 1}`,
  testId: `psat-mock-${String(index + 1).padStart(2, '0')}`,
  variant: 'psat-nmsqt',
  assessmentNumber: index + 1,
}));

const satSeriesB = Array.from({ length: 10 }, (_, index) => ({
  assessment: 'sat',
  series: 'B',
  number: index + 11,
  testKey: `SAT${index + 11}`,
  testId: `sat-series-b-mock-${String(index + 11).padStart(2, '0')}`,
  variant: 'sat-series-b',
  assessmentNumber: index + 11,
}));

export const BATCH_M_PRODUCTION_SEQUENCE = Object.freeze([
  ...satSeriesA,
  ...psat,
  ...satSeriesB,
]);

const sequenceByKey = new Map(
  BATCH_M_PRODUCTION_SEQUENCE.map((target, index) => [target.testKey, { ...target, sequenceIndex: index }])
);

export function getBatchMProductionTarget(testKey) {
  const target = sequenceByKey.get(String(testKey || '').toUpperCase());
  return target ? { ...target } : null;
}

export function getNextBatchMProductionTarget(acceptedTestKeys = []) {
  const accepted = new Set(
    (Array.isArray(acceptedTestKeys) ? acceptedTestKeys : [])
      .map((key) => String(key || '').toUpperCase())
  );

  return BATCH_M_PRODUCTION_SEQUENCE.find((target) => !accepted.has(target.testKey)) || null;
}

export function assertBatchMProductionOrder(acceptedTestKeys = []) {
  const accepted = Array.isArray(acceptedTestKeys) ? acceptedTestKeys : [];
  const normalized = accepted.map((key) => String(key || '').toUpperCase());

  for (let index = 0; index < normalized.length; index += 1) {
    const expected = BATCH_M_PRODUCTION_SEQUENCE[index]?.testKey;
    if (!expected || normalized[index] !== expected) {
      throw new Error(
        `Batch M production order violation at position ${index + 1}: expected ${expected || 'no additional mock'}, found ${normalized[index] || 'empty'}`
      );
    }
  }

  return true;
}

export function isBatchMProductionComplete(acceptedTestKeys = []) {
  if (!Array.isArray(acceptedTestKeys) || acceptedTestKeys.length !== BATCH_M_PRODUCTION_SEQUENCE.length) {
    return false;
  }

  assertBatchMProductionOrder(acceptedTestKeys);
  return true;
}

export default BATCH_M_PRODUCTION_SEQUENCE;
