import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { evaluateContentQualityBatch } from '../src/data/sat/mockContent/batchMContentQualityGate.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const selectionPath = path.join(root, 'docs/BATCH-M-TARGETED-CANDIDATE-SELECTION-2026-09-15.json');
const authorizationPath = path.join(root, 'docs/BATCH-M-REPLACEMENT-AUTHORIZATION-2026-09-16.md');
const snapshotPath = path.join(root, '.batch-m-selection-bound-candidates-v2.json');
const mapPath = path.join(root, 'src/data/sat/mockContent/batchMControlledReplacementMap.js');
const reportPath = path.join(root, 'docs/BATCH-M-CONTROLLED-REPLACEMENT-2026-09-16.json');
const storePath = path.join(root, 'src/data/sat/mockContent/batchMProductionStore.js');

const selection = JSON.parse(fs.readFileSync(selectionPath, 'utf8'));
const authorization = fs.readFileSync(authorizationPath, 'utf8');
const snapshot = JSON.parse(fs.readFileSync(snapshotPath, 'utf8'));
if (!authorization.includes('**Authorization state:** `AUTHORIZED`')) throw new Error('Batch M controlled replacement v5: explicit AUTHORIZED state is missing.');
if (selection.summary?.noEligibleCandidate !== 0) throw new Error('Batch M controlled replacement v5: candidate coverage is not resolved.');
if (snapshot.selectionReport !== 'docs/BATCH-M-TARGETED-CANDIDATE-SELECTION-2026-09-15.json') throw new Error('Batch M controlled replacement v5: snapshot is bound to an unexpected selection report.');
if (snapshot.selectedCount !== selection.summary?.selected) throw new Error(`Batch M controlled replacement v5: snapshot selected count ${snapshot.selectedCount} does not match selection count ${selection.summary?.selected}.`);

function normalize(value) { return String(value ?? '').trim().toLowerCase().replace(/\s+/g, ' '); }
function stable(value) { return JSON.stringify(value, Object.keys(value || {}).sort()); }
function selectorFingerprint(question) {
  return crypto.createHash('sha256').update(String(stable({
    section: question.section,
    prompt: normalize(question.prompt),
    choices: (question.choices || []).map(normalize),
    answer: normalize(question.answer),
    figure: question.figure || null,
    domain: question.domain,
    skill: question.skill,
    difficulty: question.difficulty,
  }))).digest('hex').slice(0, 16);
}

const records = Array.isArray(selection.records) ? selection.records : [];
const selectedRecords = records.filter((record) => record.selectionDisposition === 'REPLACEMENT_CANDIDATE_SELECTED_FOR_DOWNSTREAM_APPROVAL');
const snapshotByTarget = new Map((Array.isArray(snapshot.records) ? snapshot.records : []).map((record) => [`${record.testKey}::${record.questionId}`, record]));
if (snapshotByTarget.size !== selectedRecords.length) throw new Error(`Batch M controlled replacement v5: snapshot contains ${snapshotByTarget.size} unique targets; expected ${selectedRecords.length}.`);

const selectedFingerprints = { sat: new Set(), psat: new Set() };
for (const record of selectedRecords) {
  const product = String(record.testKey || '').startsWith('PSAT') ? 'psat' : 'sat';
  selectedFingerprints[product].add(String(record.selectedCandidateKey || '').split(':').at(-1));
}

const replacements = [];
for (const record of selectedRecords) {
  const targetKey = `${record.testKey}::${record.questionId}`;
  const bound = snapshotByTarget.get(targetKey);
  if (!bound) throw new Error(`Batch M controlled replacement v5: missing recovered candidate for ${targetKey}.`);
  if (String(bound.selectedCandidateKey || '') !== String(record.selectedCandidateKey || '')) throw new Error(`Batch M controlled replacement v5: selected candidate key mismatch for ${targetKey}.`);

  const resolvedFingerprint = String(bound.resolvedFingerprint || '');
  const resolvedKeyParts = String(bound.resolvedCandidateKey || '').split(':');
  if (!/^[0-9a-f]{16}$/i.test(resolvedFingerprint) || resolvedFingerprint !== resolvedKeyParts.at(-1)) throw new Error(`Batch M controlled replacement v5: recovered candidate key/fingerprint mismatch for ${targetKey}.`);
  const selectedFingerprint = String(record.selectedCandidateKey || '').split(':').at(-1);
  if (bound.fallbackUsed && selectedFingerprints[String(record.testKey || '').startsWith('PSAT') ? 'psat' : 'sat'].has(resolvedFingerprint)) throw new Error(`Batch M controlled replacement v5: fallback candidate reuses another target's authorized selected fingerprint for ${targetKey}.`);

  const candidate = bound.candidate;
  if (!candidate || typeof candidate !== 'object') throw new Error(`Batch M controlled replacement v5: candidate payload is missing for ${targetKey}.`);
  if (selectorFingerprint(candidate) !== resolvedFingerprint) throw new Error(`Batch M controlled replacement v5: candidate fingerprint verification failed for ${targetKey}.`);

  const eligibleOptionKeys = new Set((Array.isArray(record.options) ? record.options : []).filter((option) => option?.verdict === 'eligible').map((option) => String(option.candidateKey || '')));
  if (!eligibleOptionKeys.has(String(bound.selectedCandidateKey || '')) && !eligibleOptionKeys.has(String(bound.resolvedCandidateKey || ''))) {
    throw new Error(`Batch M controlled replacement v5: recovered candidate is not one of the recorded eligible options for ${targetKey}.`);
  }

  const replacement = {
    ...candidate,
    testId: record.testKey,
    questionId: record.questionId,
    contentId: record.questionId,
    originalityFingerprint: String(candidate.originalityFingerprint || '').replaceAll(String(candidate.testId || ''), record.testKey),
  };

  replacements.push({
    testKey: record.testKey,
    questionId: record.questionId,
    remediationType: record.remediationType,
    selectionDisposition: record.selectionDisposition,
    selectedCandidateKey: record.selectedCandidateKey,
    resolvedCandidateKey: bound.resolvedCandidateKey,
    selectedPoolIndex: Number.isInteger(bound.selectedPoolIndex) ? bound.selectedPoolIndex : null,
    resolvedPoolIndex: Number.isInteger(bound.resolvedPoolIndex) ? bound.resolvedPoolIndex : null,
    candidateFingerprint: resolvedFingerprint,
    authorizedSelectedFingerprint: selectedFingerprint,
    fallbackUsed: Boolean(bound.fallbackUsed),
    resolvedOptionRank: Number.isInteger(bound.resolvedOptionRank) ? bound.resolvedOptionRank : null,
    selectionGenerationCommit: snapshot.generationCommit,
    replacement,
  });
}

const quality = evaluateContentQualityBatch(replacements.map((item) => item.replacement));
if (!quality?.passed) throw new Error(`Batch M controlled replacement v5: selected replacement quality gate failed (${quality?.failedCount ?? 'unknown'} failures).`);

const map = {};
for (const item of replacements) map[`${item.testKey}::${item.questionId}`] = item.replacement;
fs.writeFileSync(mapPath, `/** Generated deterministic Batch M controlled replacement map. */\nexport const BATCH_M_CONTROLLED_REPLACEMENT_MAP = Object.freeze(${JSON.stringify(map, null, 2)});\n`, 'utf8');

let store = fs.readFileSync(storePath, 'utf8');
if (!store.includes('const BATCH_M_PRE_REPLACEMENT_CORPUS = Object.freeze([')) {
  const marker = 'export const BATCH_M_ACCEPTED_PRODUCTION_CORPUS = Object.freeze([';
  const start = store.indexOf(marker);
  if (start === -1) throw new Error('Batch M controlled replacement v5: production-store corpus marker not found.');
  const end = store.indexOf('\n]);', start);
  if (end === -1) throw new Error('Batch M controlled replacement v5: production-store corpus terminator not found.');
  const block = store.slice(start, end + 4);
  const replacementBlock = block.replace('export const BATCH_M_ACCEPTED_PRODUCTION_CORPUS', 'const BATCH_M_PRE_REPLACEMENT_CORPUS').concat('\n\nexport const BATCH_M_ACCEPTED_PRODUCTION_CORPUS = Object.freeze(applyBatchMControlledReplacements(BATCH_M_PRE_REPLACEMENT_CORPUS));');
  store = store.slice(0, start) + replacementBlock + store.slice(end + 4);
  if (!store.includes("batchMControlledReplacementMapAdapter")) {
    store = store.replace("import { runBatchMFinalCorpusGate } from './batchMFinalCorpusGate';", "import { runBatchMFinalCorpusGate } from './batchMFinalCorpusGate';\nimport { applyBatchMControlledReplacements } from './batchMControlledReplacementMapAdapter';");
  }
}
fs.writeFileSync(storePath, store, 'utf8');

const fallbackCount = replacements.filter((item) => item.fallbackUsed).length;
const report = {
  reportType: 'batch-m-controlled-replacement',
  reportVersion: '2026-09-16.controlled-replacement.v5',
  authorization: 'AUTHORIZED',
  scope: 'SAT1-SAT10 and PSAT1-PSAT10 affected records only',
  selectionGenerationCommit: snapshot.generationCommit,
  selectionBoundSnapshot: true,
  candidateResolutionMode: snapshot.resolutionMode,
  fallbackCount,
  fingerprintAlgorithm: 'sha256(stable(section,prompt,choices,answer,figure,domain,skill,difficulty))[0:16]',
  sat21Created: false,
  selectedCount: selectedRecords.length,
  appliedCount: replacements.length,
  qualityGatePassed: true,
  productionMutation: true,
  releaseEligible: false,
  records: replacements.map(({ replacement, ...item }) => ({ ...item, applied: true, replacementQuestionId: replacement.questionId })),
};
fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ selectedCount: selectedRecords.length, appliedCount: replacements.length, fallbackCount, qualityGatePassed: true, sat21Created: false }, null, 2));
