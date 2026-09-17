/**
 * Batch M — authorized production replacement execution + post-replacement gates.
 *
 * The replacement layer is now active in the runtime. This script assembles
 * the complete 30-mock runtime corpus, verifies the 352 authorized changes,
 * then reruns the final corpus gate and canonical cross-corpus calibration.
 * It never creates SAT21 and it does not mark the release eligible by itself.
 */

import fs from 'node:fs';
import { getMockDefinition } from '../src/lib/sat/adaptiveMockEngine';
import { getSeriesBMock } from '../src/lib/sat/productionMockRuntime';
import { BATCH_M_PRODUCTION_SEQUENCE } from '../src/data/sat/mockContent/batchMProductionController';
import { BATCH_M_CALIBRATION_PRODUCTION_REPLACEMENT } from '../src/data/sat/mockContent/batchMCalibrationProductionReplacement';
import { runBatchMFinalCorpusGate } from '../src/data/sat/mockContent/batchMFinalCorpusGate';
import { runBatchMCrossCorpusCalibrationCanonical } from '../src/data/sat/mockContent/batchMCrossCorpusCalibrationCanonical';

const OUTPUT_DIR = process.env.BATCH_M_OUTPUT_DIR || 'artifacts/batch-m-calibration-production-replacement';
const EXPECTED_REPLACEMENTS = 352;

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function getRuntimeMock(target) {
  if (target.testKey.startsWith('SAT') && target.assessmentNumber >= 11) {
    return getSeriesBMock(target.testKey);
  }
  return getMockDefinition(target.testKey)?.content || null;
}

function collectProductionChanges(corpus) {
  const changes = [];
  for (const mock of corpus) {
    for (const section of ['readingWriting', 'math']) {
      for (const record of mock?.[section] || []) {
        const change = record?.metadata?.controlledReplacement;
        if (change?.authorization === 'explicit-user-authorization' && change?.testKey) {
          changes.push({
            testKey: change.testKey,
            section,
            replacedQuestionId: change.replacedQuestionId,
            candidateQuestionId: change.candidateQuestionId,
            domain: record.domain,
            questionType: record.questionType,
          });
        }
      }
    }
  }
  return changes;
}

function assertReplacementShape(changes) {
  if (changes.length !== EXPECTED_REPLACEMENTS) throw new Error(`Expected ${EXPECTED_REPLACEMENTS} authorized replacements, found ${changes.length}`);
  const uniqueTargets = new Set(changes.map((item) => `${item.testKey}:${item.replacedQuestionId}`));
  if (uniqueTargets.size !== EXPECTED_REPLACEMENTS) throw new Error('Authorized replacement targets are not unique');
  const rw = changes.filter((item) => item.section === 'readingWriting');
  const math = changes.filter((item) => item.section === 'math');
  if (rw.length !== 195 || math.length !== 157) throw new Error(`Replacement section counts are ${rw.length} R&W + ${math.length} Math, expected 195 + 157`);
  if (math.some((item) => item.questionType !== 'student-produced-response')) throw new Error('Authorized Math replacement set contains a non-SPR record');
  if (rw.some((item) => item.domain !== 'standard-english-conventions')) throw new Error('Authorized R&W replacement set contains a non-SEC record');
}

function main() {
  if (BATCH_M_CALIBRATION_PRODUCTION_REPLACEMENT.productionMutation !== true) throw new Error('Authorized replacement layer is not marked production-active');
  if (BATCH_M_CALIBRATION_PRODUCTION_REPLACEMENT.replacementCount !== EXPECTED_REPLACEMENTS) throw new Error('Authorized replacement layer scope mismatch');

  const corpus = BATCH_M_PRODUCTION_SEQUENCE.map((target) => {
    const mock = getRuntimeMock(target);
    if (!mock) throw new Error(`Missing runtime mock for ${target.testKey}`);
    return clone(mock);
  });

  if (corpus.length !== 30) throw new Error(`Expected 30 runtime mocks, found ${corpus.length}`);
  const changes = collectProductionChanges(corpus);
  assertReplacementShape(changes);

  const finalCorpusGate = runBatchMFinalCorpusGate(corpus);
  if (!finalCorpusGate.passed) throw new Error(`Post-replacement final corpus gate failed: ${JSON.stringify(finalCorpusGate, null, 2)}`);

  const calibration = runBatchMCrossCorpusCalibrationCanonical(corpus);
  if (!calibration.passed) throw new Error(`Post-replacement cross-corpus calibration failed: ${JSON.stringify(calibration, null, 2)}`);

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const result = {
    date: '2026-09-17',
    status: 'authorized-production-replacement-and-post-gates-passed',
    productionMutation: true,
    releaseEligible: false,
    sat21Created: false,
    replacementCount: changes.length,
    replacementScope: { readingWriting: 195, math: 157 },
    finalCorpusGate: finalCorpusGate,
    crossCorpusCalibration: calibration,
    replacements: changes,
  };
  fs.writeFileSync(`${OUTPUT_DIR}/BATCH-M-CALIBRATION-PRODUCTION-REPLACEMENT-2026-09-17.json`, JSON.stringify(result, null, 2));
  fs.writeFileSync(`${OUTPUT_DIR}/BATCH-M-CALIBRATION-PRODUCTION-REPLACEMENT-2026-09-17.md`, [
    '# Batch M authorized calibration production replacement — 2026-09-17', '',
    '- Status: **PASS**.',
    '- Production replacement layer: **ACTIVE**.',
    '- Authorized replacements: **352**.',
    '- R&W replacements: **195** (65 Craft & Structure → SEC; 130 Information & Ideas → SEC).',
    '- Math replacements: **157 SPR**.',
    '- Final 30-mock corpus gate: **PASS**.',
    '- Cross-corpus calibration: **PASS**.',
    '- Release eligibility: **false** (post-gate website verification remains required).',
    '- SAT21 created: **false**.',
  ].join('\n') + '\n');

  console.log(JSON.stringify({
    status: result.status,
    productionMutation: result.productionMutation,
    replacementCount: result.replacementCount,
    finalCorpusGatePassed: finalCorpusGate.passed,
    crossCorpusCalibrationPassed: calibration.passed,
    rwSECProportion: calibration.overall?.domain?.['reading-writing']?.['standard-english-conventions']?.proportion ?? null,
    mathSPRProportion: calibration.overall?.questionType?.math?.['student-produced-response']?.proportion ?? null,
    artifactDir: OUTPUT_DIR,
  }, null, 2));
}

main();
