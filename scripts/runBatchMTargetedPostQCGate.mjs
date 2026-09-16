import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateSatQuestion } from '../src/data/sat/questionSchema.js';
import { evaluateContentQuality } from '../src/data/sat/mockContent/batchMContentQualityGate.js';
import { BATCH_M_TARGETED_PRODUCTION_CORPUS } from '../src/data/sat/mockContent/batchMTargetedProductionCorpus.js';
import { applyBatchMControlledReplacements } from '../src/data/sat/mockContent/batchMControlledReplacementMapAdapter.js';
import { BATCH_M_CONTROLLED_REPLACEMENT_MAP } from '../src/data/sat/mockContent/batchMControlledReplacementMap.js';
import { canonicalBatchMTestKey, BATCH_M_TARGET_TEST_KEYS } from '../src/data/sat/mockContent/batchMCanonicalTestKey.js';
import { validateFigureOriginalitySeries } from '../src/data/sat/mockContent/figureOriginalityQC.js';
import { applyBatchMPostQCTargetedRemediations } from '../src/data/sat/mockContent/batchMPostQCTargetedRemediation.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'docs/BATCH-M-TARGETED-POST-QC-GATE-2026-09-16.json');
const pre = BATCH_M_TARGETED_PRODUCTION_CORPUS;
const controlled = applyBatchMControlledReplacements(pre);
const repaired = applyBatchMPostQCTargetedRemediations(controlled);
const corpus = repaired.corpus;
const runtimeRecords = (mock) => [...(mock?.readingWriting || []), ...(mock?.math || [])];
const id = (q) => String(q?.questionId || q?.contentId || '');
const collect = (items) => {
  const map = new Map();
  for (const mock of items) {
    const key = canonicalBatchMTestKey(mock);
    for (const q of runtimeRecords(mock)) map.set(`${key}::${id(q)}`, q);
  }
  return map;
};
const fail = [];
const preQ = collect(pre);
const controlQ = collect(controlled);
const postQ = collect(corpus);
if (preQ.size !== 3920) fail.push(['runtime-pre', preQ.size]);
if (controlQ.size !== 3920) fail.push(['runtime-controlled', controlQ.size]);
if (postQ.size !== 3920) fail.push(['runtime-post', postQ.size]);
if (repaired.summary.difficultyCalibrations !== 550) fail.push(['difficulty-calibrations', repaired.summary.difficultyCalibrations]);
if (repaired.summary.rwStimulusRepairs !== 206) fail.push(['rw-stimulus-repairs', repaired.summary.rwStimulusRepairs]);
if (repaired.summary.figureRepairs !== 1) fail.push(['figure-repairs', repaired.summary.figureRepairs]);
if (repaired.summary.targetsChanged !== 673) fail.push(['unique-targets-changed', repaired.summary.targetsChanged]);
if (Object.keys(BATCH_M_CONTROLLED_REPLACEMENT_MAP).length !== 1594) fail.push(['replacement-map', Object.keys(BATCH_M_CONTROLLED_REPLACEMENT_MAP).length]);

let schemaFailures = 0;
let qualityFailures = 0;
for (const [key, q] of postQ) {
  if (!BATCH_M_TARGET_TEST_KEYS.has(key.split('::')[0])) fail.push(['scope', key]);
  const schema = validateSatQuestion(q);
  if (!schema.valid) { schemaFailures += 1; fail.push(['schema', { key, errors: schema.errors }]); }
  if (evaluateContentQuality(q).verdict !== 'pass') qualityFailures += 1;
}
if (schemaFailures) fail.push(['schema-failures', schemaFailures]);
if (qualityFailures) fail.push(['content-quality-failures', qualityFailures]);
try { validateFigureOriginalitySeries(corpus); } catch (error) { fail.push(['figure-originality', String(error?.message || error)]); }

const report = {
  reportType: 'batch-m-targeted-post-qc-gate',
  reportVersion: '2026-09-16.targeted-post-qc-gate.v1',
  scope: 'SAT1-SAT10 and PSAT1-PSAT10 only',
  expected: { mocks: 20, runtimeQuestions: 3920, replacements: 1594, difficultyCalibrations: 550, rwStimulusRepairs: 206, figureRepairs: 1, uniqueRemediatedTargets: 673 },
  observed: { preRuntimeQuestions: preQ.size, controlledRuntimeQuestions: controlQ.size, postQCRuntimeQuestions: postQ.size, ...repaired.summary, schemaFailures, qualityFailures },
  productionMutation: false,
  releaseEligible: false,
  sat21Created: false,
  gates: { runtimeScope: fail.some((x) => ['scope'].includes(x[0])) ? 'FAIL' : 'PASS', schema: schemaFailures === 0 ? 'PASS' : 'FAIL', contentQuality: qualityFailures === 0 ? 'PASS' : 'FAIL', figureOriginality: fail.some((x) => x[0] === 'figure-originality') ? 'FAIL' : 'PASS' },
  failures: fail,
};
report.passed = fail.length === 0;
report.status = report.passed ? 'PASS' : 'QUALITY_HOLD';
fs.writeFileSync(out, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(report, null, 2));
if (!report.passed) process.exitCode = 1;
