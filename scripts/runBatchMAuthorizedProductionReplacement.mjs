/**
 * Batch M — applies the exact validated 25-target replacement package to the
 * canonical production source. Intended to run only inside the authorized
 * GitHub Actions production-mutation workflow.
 */
import fs from 'node:fs';

const PACKAGE = process.env.BATCH_M_PACKAGE_INPUT || 'artifacts/batch-m-final-replacement-package/BATCH-M-DEEP-CONTENT-QUALITY-FINAL-REPLACEMENT-PACKAGE-2026-09-22.json';
const STORE = 'src/data/sat/mockContent/batchMProductionStore.js';
const MODULE = 'src/data/sat/mockContent/batchMAuthorized25ReplacementPackage.js';
const AUTH_MARKER = 'explicit-user-authorization-2026-09-22';
const EXPECTED_RUN = '35697516214';

function load(file) { return JSON.parse(fs.readFileSync(file, 'utf8')); }
function q(v) { return JSON.stringify(v); }

function productionTestId(testKey) {
  const key = String(testKey || '').trim().toUpperCase();
  const sat = key.match(/^SAT(\\d+)$/);
  if (sat) {
    const number = Number(sat[1]);
    if (number >= 1 && number <= 10) return `sat-series-a-mock-${String(number).padStart(2, '0')}`;
    if (number >= 11 && number <= 20) return `sat-series-b-mock-${String(number).padStart(2, '0')}`;
  }
  const psat = key.match(/^PSAT(\\d+)$/);
  if (psat) {
    const number = Number(psat[1]);
    if (number >= 1 && number <= 10) return `psat-mock-${String(number).padStart(2, '0')}`;
  }
  throw new Error('Unknown Batch M production target key: ' + key);
}

function main() {
  if (process.env.BATCH_M_PRODUCTION_AUTHORIZATION !== AUTH_MARKER) throw new Error('Production mutation blocked: explicit authorization marker missing.');
  const pkg = load(PACKAGE);
  if (pkg?.replacementAuthorization !== 'NOT_AUTHORIZED') throw new Error('Expected source package to remain pre-authorization candidate-only.');
  if (pkg?.decision !== 'REPLACEMENT_PACKAGE_VALIDATED_PENDING_EXPLICIT_PRODUCTION_AUTHORIZATION') throw new Error('Unexpected package decision.');
  if (pkg?.final30MockCorpusGate !== 'PASS' || pkg?.crossCorpusCalibrationNoNewFailures !== 'PASS') throw new Error('Validated package gates are not both PASS.');
  if (pkg?.productionMutation !== false || pkg?.releaseEligible !== false || pkg?.sat21Created !== false) throw new Error('Source package crosses production boundary.');
  if (pkg?.normalizedCandidateCount !== 25 || pkg?.exactTargetCoverage !== 25 || !Array.isArray(pkg?.replacements) || pkg.replacements.length !== 25) throw new Error('Exact 25-target package requirement failed.');
  if (process.env.BATCH_M_PACKAGE_RUN !== EXPECTED_RUN) throw new Error('Validated package run mismatch.');

  const seen = new Set();
  const replacements = pkg.replacements.map((item) => {
    const key = `${String(item.targetTestKey).toUpperCase()}::${item.targetQuestionId}`;
    if (!item.candidateId || seen.has(key)) throw new Error('Duplicate/missing target: ' + key);
    seen.add(key);
    return {
      testKey: String(item.targetTestKey).toUpperCase(),
      testId: productionTestId(item.targetTestKey),
      questionId: String(item.targetQuestionId),
      candidateId: String(item.candidateId),
      content: {
        prompt: item.candidate.prompt,
        choices: item.candidate.choices,
        answer: item.candidate.answer,
        explanation: item.candidate.explanation,
        originalityFingerprint: item.candidate.originalityFingerprint,
        ...(Object.prototype.hasOwnProperty.call(item.candidate, 'passageId') ? { passageId: item.candidate.passageId } : {}),
        ...(Object.prototype.hasOwnProperty.call(item.candidate, 'figure') ? { figure: item.candidate.figure } : {}),
      },
    };
  });

  const moduleText = `/**
 * Batch M — explicitly authorized 25-target production replacement package.
 * Source package: GitHub Actions run ${EXPECTED_RUN}.
 * Authorization: ${AUTH_MARKER}.
 */

const AUTHORIZATION = ${q(AUTH_MARKER)};
const PACKAGE_RUN = ${q(EXPECTED_RUN)};
const PACKAGE_REVISION = '0c2acc194c79620f031a1d8bab9c22cbaaeb722b';

const REPLACEMENTS = ${JSON.stringify(replacements, null, 2)};

const clone = (value) => JSON.parse(JSON.stringify(value));

export function applyBatchMAuthorized25ReplacementPackage(corpus) {
  if (!Array.isArray(corpus)) throw new Error('Batch M authorized replacement package: corpus must be an array');
  const output = clone(corpus);
  const seenTargets = new Set();
  for (const item of REPLACEMENTS) {
    const mock = output.find((candidate) => String(candidate?.testKey || '').trim().toUpperCase() === item.testKey || String(candidate?.testId || '').trim() === item.testId);
    if (!mock) throw new Error('Batch M authorized replacement package: target mock ' + item.testKey + ' not found');
    const section = item.content.passageId ? 'readingWriting' : 'math';
    const records = mock[section] || [];
    const index = records.findIndex((record) => String(record?.questionId) === item.questionId);
    if (index < 0) throw new Error('Batch M authorized replacement package: target ' + item.testKey + '::' + item.questionId + ' not found');
    const target = records[index];
    const targetKey = item.testKey + '::' + item.questionId;
    if (seenTargets.has(targetKey)) throw new Error('Batch M authorized replacement package: duplicate target ' + targetKey);
    seenTargets.add(targetKey);
    const replacement = {
      ...target,
      ...clone(item.content),
      testId: target.testId,
      questionId: target.questionId,
      contentId: target.contentId || target.questionId,
      releaseEligibility: false,
      isOperational: target.isOperational,
      status: target.status,
      authoringStatus: target.authoringStatus,
      metadata: {
        ...(target.metadata || {}),
        candidateOnly: false,
        productionMutation: true,
        releaseEligibility: false,
        controlledReplacement: {
          ...(target.metadata?.controlledReplacement || {}),
          date: '2026-09-22',
          authorization: AUTHORIZATION,
          scope: 'batch-m-exact-25-target-replacement-package',
          packageRun: PACKAGE_RUN,
          packageRevision: PACKAGE_REVISION,
          targetTestKey: item.testKey,
          targetQuestionId: item.questionId,
          candidateId: item.candidateId
        },
        deepContentQualityReplacement: {
          ...(target.metadata?.deepContentQualityReplacement || {}),
          stage: 'batch-m-deep-content-quality-exact-25-target-package',
          reviewStatus: 'PASS',
          validationStatus: 'PASS_NO_NEW_CALIBRATION_REGRESSION'
        }
      }
    };
    if (replacement.testId !== target.testId || replacement.questionId !== target.questionId) throw new Error('Batch M authorized replacement package: production identity changed for ' + targetKey);
    records[index] = replacement;
  }
  if (seenTargets.size !== 25) throw new Error('Batch M authorized replacement package: expected 25 replacements, applied ' + seenTargets.size);
  return output;
}

export const BATCH_M_AUTHORIZED_25_REPLACEMENT_PACKAGE = Object.freeze({
  date: '2026-09-22',
  packageRun: PACKAGE_RUN,
  packageRevision: PACKAGE_REVISION,
  authorization: AUTHORIZATION,
  replacementCount: 25,
  productionMutation: true,
  releaseEligible: false,
  sat21Created: false
});

export default applyBatchMAuthorized25ReplacementPackage;
`;

  fs.writeFileSync(MODULE, moduleText, 'utf8');
  let store = fs.readFileSync(STORE, 'utf8');
  const importLine = "import { applyBatchMAuthorized25ReplacementPackage } from './batchMAuthorized25ReplacementPackage';";
  if (!store.includes(importLine)) store = store.replace("import { applyBatchMCalibrationReconciliationProductionCorpus } from './batchMCalibrationReconciliationProductionOverlay';", "import { applyBatchMCalibrationReconciliationProductionCorpus } from './batchMCalibrationReconciliationProductionOverlay';\n" + importLine);
  const old = 'export const BATCH_M_ACCEPTED_PRODUCTION_CORPUS = Object.freeze(applyBatchMCalibrationReconciliationProductionCorpus(BATCH_M_BASE_PRODUCTION_CORPUS));';
  const replacement = 'export const BATCH_M_ACCEPTED_PRODUCTION_CORPUS = Object.freeze(applyBatchMAuthorized25ReplacementPackage(applyBatchMCalibrationReconciliationProductionCorpus(BATCH_M_BASE_PRODUCTION_CORPUS)));';
  if (!store.includes(old) && !store.includes(replacement)) throw new Error('Production store anchor not found.');
  store = store.replace(old, replacement);
  fs.writeFileSync(STORE, store, 'utf8');
  fs.writeFileSync('artifacts/batch-m-authorized-production-replacement-2026-09-22.json', JSON.stringify({
    date:'2026-09-22', authorization:AUTH_MARKER, packageRun:EXPECTED_RUN, packageRevision:'0c2acc194c79620f031a1d8bab9c22cbaaeb722b',
    replacementCount:25, productionMutation:true, releaseEligible:false, sat21Created:false,
    targets:replacements.map((x)=>({testKey:x.testKey,questionId:x.questionId,candidateId:x.candidateId}))
  }, null, 2)+'\n');
  console.log(JSON.stringify({status:'AUTHORIZED_PRODUCTION_PACKAGE_APPLIED', replacementCount:25, packageRun:EXPECTED_RUN, productionMutation:true}, null, 2));
}
main();
