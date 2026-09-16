import { BATCH_M_TARGETED_PRODUCTION_CORPUS } from '../src/data/sat/mockContent/batchMTargetedProductionCorpus.js';
import { buildRepresentativeBatchMRemediationCandidates } from '../src/data/sat/mockContent/batchMRemediationCandidateFactory.js';

const TARGET_SKILLS = new Set([
  'Geometry and measurement',
  'Similarity and scaling',
  'Right triangles',
]);

const SKILL_ALIASES = {
  'Composite area': 'Geometry and measurement',
  'Similarity and area': 'Similarity and scaling',
  'Right-triangle relationships': 'Right triangles',
};

function deriveTestKey(mock) {
  if (mock?.testKey) return mock.testKey;
  const match = String(mock?.testId || '').match(/(?:mock-)?(\d+)$/i);
  if (!match) return null;
  const prefix = String(mock.testId).toLowerCase().startsWith('psat') ? 'PSAT' : 'SAT';
  return `${prefix}${Number(match[1])}`;
}

function collect(value, out = [], seen = new Set()) {
  if (!value || typeof value !== 'object' || seen.has(value)) return out;
  seen.add(value);
  if (Array.isArray(value)) {
    value.forEach((item) => collect(item, out, seen));
    return out;
  }
  if (typeof value.prompt === 'string' && value.section && value.skill && value.questionId) out.push(value);
  Object.entries(value).forEach(([key, child]) => {
    if (key === 'figure' || key === 'metadata' || key === 'choices') return;
    collect(child, out, seen);
  });
  return out;
}

function newCounts() {
  return { easy: 0, medium: 0, hard: 0, total: 0 };
}

const targets = {};
for (const mock of BATCH_M_TARGETED_PRODUCTION_CORPUS) {
  const testKey = deriveTestKey(mock);
  if (!testKey) continue;
  for (const question of collect(mock)) {
    if (question.section !== 'math') continue;
    const canonicalSkill = TARGET_SKILLS.has(question.skill) ? question.skill : null;
    if (!canonicalSkill) continue;
    const key = canonicalSkill;
    targets[key] ??= newCounts();
    targets[key][question.difficulty] = (targets[key][question.difficulty] || 0) + 1;
    targets[key].total += 1;
  }
}

for (const product of [
  ['sat', 'sat-series-a', 'SAT1'],
  ['psat', 'psat-nmsqt', 'PSAT1'],
]) {
  const [name, variant, testId] = product;
  const result = buildRepresentativeBatchMRemediationCandidates({ rwCount: 0, mathCount: 8000, testId, variant });
  const candidates = {};
  for (const candidate of result.candidates) {
    const canonicalSkill = TARGET_SKILLS.has(candidate.skill)
      ? candidate.skill
      : SKILL_ALIASES[candidate.skill] || null;
    if (!canonicalSkill) continue;
    candidates[canonicalSkill] ??= newCounts();
    candidates[canonicalSkill][candidate.difficulty] = (candidates[canonicalSkill][candidate.difficulty] || 0) + 1;
    candidates[canonicalSkill].total += 1;
  }
  console.log(JSON.stringify({ product: name, targetDistribution: targets, candidateDistribution: candidates }, null, 2));
}
