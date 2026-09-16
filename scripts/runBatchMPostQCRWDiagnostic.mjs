import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { BATCH_M_TARGETED_PRODUCTION_CORPUS } from '../src/data/sat/mockContent/batchMTargetedProductionCorpus.js';
import { applyBatchMControlledReplacements } from '../src/data/sat/mockContent/batchMControlledReplacementMapAdapter.js';
import { evaluateContentQuality } from '../src/data/sat/mockContent/batchMContentQualityGate.js';
import { canonicalBatchMTestKey } from '../src/data/sat/mockContent/batchMCanonicalTestKey.js';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outPath = path.join(root, 'docs/BATCH-M-POST-QC-RW-DIAGNOSTIC-2026-09-16.json');
const corpus = applyBatchMControlledReplacements(BATCH_M_TARGETED_PRODUCTION_CORPUS);
const wordCount = (value) => String(value || '').trim().split(/\s+/).filter(Boolean).length;
const failures = [];
for (const mock of corpus) {
  const testKey = canonicalBatchMTestKey(mock);
  for (const question of mock?.readingWriting || []) {
    const quality = evaluateContentQuality(question);
    if (quality.checks.includes('rw-stimulus-length')) failures.push({ testKey, questionId: question.questionId, skill: question.skill, wordCount: wordCount(question.prompt), prompt: question.prompt });
  }
}
failures.sort((a, b) => b.wordCount - a.wordCount || a.testKey.localeCompare(b.testKey) || a.questionId.localeCompare(b.questionId));
const report = { reportType: 'batch-m-post-qc-rw-diagnostic', scope: 'SAT1-SAT10 and PSAT1-PSAT10', productionMutation: false, releaseEligible: false, sat21Created: false, total: failures.length, bySkill: Object.fromEntries([...failures.reduce((m, x) => m.set(x.skill, (m.get(x.skill) || 0) + 1), new Map())]), samples: failures.slice(0, 24) };
fs.writeFileSync(outPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
