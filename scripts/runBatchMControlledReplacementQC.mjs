import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateSatQuestion } from '../src/data/questionSchema.js';
import { BATCH_M_TARGETED_PRODUCTION_CORPUS } from '../src/data/sat/mockContent/batchMTargetedProductionCorpus.js';
import { applyBatchMControlledReplacements } from '../src/data/sat/mockContent/batchMControlledReplacementMapAdapter.js';
import { evaluateContentQualityBatch } from '../src/data/sat/mockContent/batchMContentQualityGate.js';
import { BATCH_M_CONTROLLED_REPLACEMENT_MAP } from '../src/data/sat/mockContent/batchMControlledReplacementMap.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = JSON.parse(fs.readFileSync(path.join(root, 'docs/BATCH-M-CONTROLLED-REPLACEMENT-2026-09-16.json'), 'utf8'));

const EXPECTED_TESTS = new Set([
  'SAT1', 'SAT2', 'SAT3', 'SAT4', 'SAT5', 'SAT6', 'SAT7', 'SAT8', 'SAT9', 'SAT10',
  'PSAT1', 'PSAT2', 'PSAT3', 'PSAT4', 'PSAT5', 'PSAT6', 'PSAT7', 'PSAT8', 'PSAT9', 'PSAT10',
]);
const EXPECTED_RECORDS_PER_MOCK = 196;

if (report.authorization !== 'AUTHORIZED') throw new Error('Controlled replacement QC: authorization is not AUTHORIZED.');
if (report.sat21Created !== false) throw new Error('Controlled replacement QC: SAT21 flag is not false.');
if (report.appliedCount !== 1594) throw new Error(`Controlled replacement QC: expected 1594 applied records, found ${report.appliedCount}.`);

const replacementRecords = Object.values(BATCH_M_CONTROLLED_REPLACEMENT_MAP);
if (replacementRecords.length !== 1594) throw new Error(`Controlled replacement QC: expected 1594 replacement-map records, found ${replacementRecords.length}.`);
const quality = evaluateContentQualityBatch(replacementRecords);
if (!quality?.passed) throw new Error(`Controlled replacement QC: replacement quality failed (${quality?.failedCount ?? 'unknown'} failures).`);

const affectedCorpus = applyBatchMControlledReplacements(BATCH_M_TARGETED_PRODUCTION_CORPUS);
if (!Array.isArray(affectedCorpus) || affectedCorpus.length !== 20) throw new Error(`Controlled replacement QC: expected 20 affected mocks, found ${affectedCorpus?.length ?? 'unknown'}.`);

const seenQuestionIds = new Set();
const mockSummaries = [];
const affectedKeys = new Set();
for (const mock of affectedCorpus) {
  const testKey = String(mock?.testKey || '').toUpperCase();
  if (!EXPECTED_TESTS.has(testKey)) throw new Error(`Controlled replacement QC: out-of-scope mock ${testKey}.`);
  if (affectedKeys.has(testKey)) throw new Error(`Controlled replacement QC: duplicate mock ${testKey}.`);
  affectedKeys.add(testKey);

  const records = [...(mock.readingWriting || []), ...(mock.math || [])];
  if (records.length !== EXPECTED_RECORDS_PER_MOCK) throw new Error(`Controlled replacement QC: ${testKey} expected ${EXPECTED_RECORDS_PER_MOCK} records, found ${records.length}.`);

  let replacementCount = 0;
  for (const record of records) {
    const id = String(record?.questionId || record?.contentId || '');
    if (!id) throw new Error(`Controlled replacement QC: ${testKey} contains a record without an ID.`);
    if (seenQuestionIds.has(`${testKey}::${id}`)) throw new Error(`Controlled replacement QC: duplicate question ID inside ${testKey}: ${id}`);
    seenQuestionIds.add(`${testKey}::${id}`);

    const schema = validateSatQuestion(record);
    if (!schema.valid) throw new Error(`Controlled replacement QC: schema failure in ${testKey}/${id}: ${schema.errors.join(' ')}`);
    if (BATCH_M_CONTROLLED_REPLACEMENT_MAP[`${testKey}::${id}`]) replacementCount += 1;
  }

  mockSummaries.push({ testKey, recordCount: records.length, replacementRecordCount: replacementCount });
}

if (affectedKeys.size !== 20) throw new Error(`Controlled replacement QC: expected 20 affected mocks, found ${affectedKeys.size}.`);
const actualReplacementCount = mockSummaries.reduce((sum, item) => sum + item.replacementRecordCount, 0);
if (actualReplacementCount !== 1594) throw new Error(`Controlled replacement QC: expected 1594 replacements present in affected corpus, found ${actualReplacementCount}.`);

console.log(JSON.stringify({
  passed: true,
  appliedCount: replacementRecords.length,
  replacementQualityGate: 'PASS',
  affectedMockGate: 'PASS',
  affectedMockCount: affectedKeys.size,
  affectedRecordCount: seenQuestionIds.size,
  releaseEligible: false,
  final30MockCorpusGate: 'PENDING_DOWNSTREAM',
  sat21Created: false,
  mockSummaries,
}, null, 2));
