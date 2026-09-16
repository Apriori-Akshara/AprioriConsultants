import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { BATCH_M_ACCEPTED_PRODUCTION_CORPUS } from '../src/data/sat/mockContent/batchMProductionStore.js';
import { runBatchMFinalCorpusGate } from '../src/data/sat/mockContent/batchMFinalCorpusGate.js';
import { evaluateContentQualityBatch } from '../src/data/sat/mockContent/batchMContentQualityGate.js';
import { BATCH_M_CONTROLLED_REPLACEMENT_MAP } from '../src/data/sat/mockContent/batchMControlledReplacementMap.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = JSON.parse(fs.readFileSync(path.join(root, 'docs/BATCH-M-CONTROLLED-REPLACEMENT-2026-09-16.json'), 'utf8'));

if (report.authorization !== 'AUTHORIZED') throw new Error('Controlled replacement QC: authorization is not AUTHORIZED.');
if (report.sat21Created !== false) throw new Error('Controlled replacement QC: SAT21 flag is not false.');
if (report.appliedCount !== 1594) throw new Error(`Controlled replacement QC: expected 1594 applied records, found ${report.appliedCount}.`);

const replacementRecords = Object.values(BATCH_M_CONTROLLED_REPLACEMENT_MAP);
if (replacementRecords.length !== 1594) throw new Error(`Controlled replacement QC: expected 1594 replacement-map records, found ${replacementRecords.length}.`);

const quality = evaluateContentQualityBatch(replacementRecords);
if (!quality?.passed) throw new Error(`Controlled replacement QC: replacement quality failed (${quality?.failedCount ?? 'unknown'} failures).`);

const final = runBatchMFinalCorpusGate(BATCH_M_ACCEPTED_PRODUCTION_CORPUS);
if (!final?.passed) throw new Error('Controlled replacement QC: final 30-mock corpus gate did not pass.');

const affectedKeys = new Set(Object.keys(BATCH_M_CONTROLLED_REPLACEMENT_MAP).map((key) => key.split('::')[0]));
const corpusKeys = new Set(BATCH_M_ACCEPTED_PRODUCTION_CORPUS.map((mock) => String(mock.testKey || '').toUpperCase()));
for (const key of affectedKeys) {
  if (!corpusKeys.has(key)) throw new Error(`Controlled replacement QC: affected mock ${key} is missing from the final corpus.`);
}

console.log(JSON.stringify({
  passed: true,
  appliedCount: replacementRecords.length,
  replacementQualityGate: 'PASS',
  final30MockCorpusGate: 'PASS',
  affectedMockCount: affectedKeys.size,
  totalRecords: final.totalRecords,
  releaseEligible: false,
  sat21Created: false,
}, null, 2));
