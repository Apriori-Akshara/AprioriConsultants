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

const CANONICAL_TEST_IDS = Object.freeze({
  SAT1: 'sat-series-a-mock-01',
  SAT2: 'sat-series-a-mock-02',
  SAT3: 'sat-series-a-mock-03',
  SAT4: 'sat-series-a-mock-04',
  SAT5: 'sat-series-a-mock-05',
  SAT6: 'sat-series-a-mock-06',
  SAT7: 'sat-series-a-mock-07',
  SAT8: 'sat-series-a-mock-08',
  SAT9: 'sat-series-a-mock-09',
  SAT10: 'sat-series-a-mock-10',
  PSAT1: 'psat-mock-01',
  PSAT2: 'psat-mock-02',
  PSAT3: 'psat-mock-03',
  PSAT4: 'psat-mock-04',
  PSAT5: 'psat-mock-05',
  PSAT6: 'psat-mock-06',
  PSAT7: 'psat-mock-07',
  PSAT8: 'psat-mock-08',
  PSAT9: 'psat-mock-09',
  PSAT10: 'psat-mock-10',
  SAT11: 'sat-series-b-mock-11',
  SAT12: 'sat-series-b-mock-12',
  SAT13: 'sat-series-b-mock-13',
  SAT14: 'sat-series-b-mock-14',
  SAT15: 'sat-series-b-mock-15',
  SAT16: 'sat-series-b-mock-16',
  SAT17: 'sat-series-b-mock-17',
  SAT18: 'sat-series-b-mock-18',
  SAT19: 'sat-series-b-mock-19',
  SAT20: 'sat-series-b-mock-20',
});

function productionTestId(testKey) {
  const key = String(testKey || '').trim().toUpperCase();
  const testId = CANONICAL_TEST_IDS[key];
  if (!testId) throw new Error('Unknown Batch M production target key: ' + key);
  return testId;
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
  const seenProductionTargets = new Set();
  const replacements = pkg.replacements.map((item) => {
    const testKey = String(item.targetTestKey).trim().toUpperCase();
    const testId = productionTestId(testKey);
    const questionId = String(item.targetQuestionId);
    const key = `${testKey}::${questionId}`;
    const productionKey = `${testId}::${questionId}`;
    if (!item.candidateId || seen.has(key)) throw new Error('Duplicate/missing target: ' + key);
    if (seenProductionTargets.has(productionKey)) throw new Error('Duplicate canonical production target: ' + productionKey);
    seen.add(key);
    seenProductionTargets.add(productionKey);
    return {
      testKey,
      testId,
      questionId,
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
