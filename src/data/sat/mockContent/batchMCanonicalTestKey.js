const MAX_BATCH_M_INDEX = 10;

const TARGET_TEST_FAMILIES = new Set(['sat', 'psat']);

export function canonicalBatchMTestKey(mock) {
  const family = String(mock?.assessmentFamily || '').trim().toLowerCase();
  const assessmentNumber = Number(mock?.assessmentNumber);
  if (TARGET_TEST_FAMILIES.has(family) && Number.isInteger(assessmentNumber) && assessmentNumber >= 1 && assessmentNumber <= MAX_BATCH_M_INDEX) {
    return `${family.toUpperCase()}${assessmentNumber}`;
  }

  const testId = String(mock?.testId || '').trim();
  const match = testId.match(/^(SAT|PSAT)(?:-|_)?(?:[^\s]*?[-_])?MOCK[-_](\d+)$/i);
  if (match) {
    const number = Number(match[2]);
    if (Number.isInteger(number) && number >= 1 && number <= MAX_BATCH_M_INDEX) {
      return `${match[1].toUpperCase()}${number}`;
    }
  }

  const normalized = testId.replace(/_/g, '-');
  const fallback = normalized.match(/^(SAT|PSAT)(?:-[^-]+)*-MOCK-(\d+)$/i);
  if (fallback) {
    const number = Number(fallback[2]);
    if (Number.isInteger(number) && number >= 1 && number <= MAX_BATCH_M_INDEX) {
      return `${fallback[1].toUpperCase()}${number}`;
    }
  }

  return '';
}

export const BATCH_M_TARGET_TEST_KEYS = Object.freeze(new Set([
  ...Array.from({ length: MAX_BATCH_M_INDEX }, (_, index) => `SAT${index + 1}`),
  ...Array.from({ length: MAX_BATCH_M_INDEX }, (_, index) => `PSAT${index + 1}`),
]));
