/**
 * Batch M first-20 production QC store.
 *
 * This module intentionally materializes only SAT1-SAT10 and PSAT1-PSAT10.
 * It is used by the comprehensive 20-test QC so the 30-mock SAT11-SAT20
 * production gates are not eagerly executed before the scoped QC runs.
 * The full production store remains responsible for the final 30-mock gate.
 */
import { runBatchMFirstProductionGate } from './batchMFirstProductionGate';
import { runBatchMSecondProductionGate } from './batchMSecondProductionGate';
import { runBatchMThirdProductionGate } from './batchMThirdProductionGate';
import { runBatchMFourthProductionGate } from './batchMFourthProductionGate';
import { runBatchMFifthProductionGate } from './batchMFifthProductionGate';
import { runBatchMSixthProductionGate } from './batchMSixthProductionGate';
import { runBatchMSeventhProductionGate } from './batchMSeventhProductionGate';
import { runBatchMEighthProductionGate } from './batchMEighthProductionGate';
import { runBatchMNinthProductionGate } from './batchMNinthProductionGate';
import { runBatchMTenthProductionGate } from './batchMTenthProductionGate';
import { runBatchMPSATFirstProductionGate } from './batchMPSATFirstProductionGate';
import { runBatchMPSATSecondProductionGate } from './batchMPSATSecondProductionGate';
import { runBatchMPSATThirdProductionGate } from './batchMPSATThirdProductionGate';
import { runBatchMPSATFourthProductionGate } from './batchMPSATFourthProductionGate';
import { runBatchMPSATFifthProductionGate } from './batchMPSATFifthProductionGate';
import { runBatchMPSATSixthProductionGate } from './batchMPSATSixthProductionGate';
import { runBatchMPSATSeventhProductionGate } from './batchMPSATSeventhProductionGate';
import { runBatchMPSATEighthProductionGate } from './batchMPSATEighthProductionGate';
import { runBatchMPSATNinthProductionGate } from './batchMPSATNinthProductionGate';
import { runBatchMPSATTenthProductionGate } from './batchMPSATTenthProductionGate';
import { applyBatchMControlledReplacements } from './batchMControlledReplacementMapAdapter';
import { applyBatchMPostQCTargetedRemediations } from './batchMPostQCTargetedRemediation';
import { applyBatchMGenericNumericDistractorRemediation } from './batchMGenericNumericDistractorRemediation';

const accepted = (label, result) => {
  if (!result?.passed || !result?.productionMock) throw new Error(`Batch M ${label}: accepted production mock was not returned by the production gate`);
  return result.productionMock;
};

const SAT_SERIES_A_MOCK_01_PRODUCTION = accepted('SAT1', runBatchMFirstProductionGate());
const SAT_SERIES_A_MOCK_02_PRODUCTION = accepted('SAT2', runBatchMSecondProductionGate(SAT_SERIES_A_MOCK_01_PRODUCTION));
const SAT_SERIES_A_MOCK_03_PRODUCTION = accepted('SAT3', runBatchMThirdProductionGate([SAT_SERIES_A_MOCK_01_PRODUCTION, SAT_SERIES_A_MOCK_02_PRODUCTION]));
const SAT_SERIES_A_MOCK_04_PRODUCTION = accepted('SAT4', runBatchMFourthProductionGate([SAT_SERIES_A_MOCK_01_PRODUCTION, SAT_SERIES_A_MOCK_02_PRODUCTION, SAT_SERIES_A_MOCK_03_PRODUCTION]));
const SAT_SERIES_A_MOCK_05_PRODUCTION = accepted('SAT5', runBatchMFifthProductionGate([SAT_SERIES_A_MOCK_01_PRODUCTION, SAT_SERIES_A_MOCK_02_PRODUCTION, SAT_SERIES_A_MOCK_03_PRODUCTION, SAT_SERIES_A_MOCK_04_PRODUCTION]));
const SAT_SERIES_A_MOCK_06_PRODUCTION = accepted('SAT6', runBatchMSixthProductionGate([SAT_SERIES_A_MOCK_01_PRODUCTION, SAT_SERIES_A_MOCK_02_PRODUCTION, SAT_SERIES_A_MOCK_03_PRODUCTION, SAT_SERIES_A_MOCK_04_PRODUCTION, SAT_SERIES_A_MOCK_05_PRODUCTION]));
const SAT_SERIES_A_MOCK_07_PRODUCTION = accepted('SAT7', runBatchMSeventhProductionGate([SAT_SERIES_A_MOCK_01_PRODUCTION, SAT_SERIES_A_MOCK_02_PRODUCTION, SAT_SERIES_A_MOCK_03_PRODUCTION, SAT_SERIES_A_MOCK_04_PRODUCTION, SAT_SERIES_A_MOCK_05_PRODUCTION, SAT_SERIES_A_MOCK_06_PRODUCTION]));
const SAT_SERIES_A_MOCK_08_PRODUCTION = accepted('SAT8', runBatchMEighthProductionGate([SAT_SERIES_A_MOCK_01_PRODUCTION, SAT_SERIES_A_MOCK_02_PRODUCTION, SAT_SERIES_A_MOCK_03_PRODUCTION, SAT_SERIES_A_MOCK_04_PRODUCTION, SAT_SERIES_A_MOCK_05_PRODUCTION, SAT_SERIES_A_MOCK_06_PRODUCTION, SAT_SERIES_A_MOCK_07_PRODUCTION]));
const SAT_SERIES_A_MOCK_09_PRODUCTION = accepted('SAT9', runBatchMNinthProductionGate([SAT_SERIES_A_MOCK_01_PRODUCTION, SAT_SERIES_A_MOCK_02_PRODUCTION, SAT_SERIES_A_MOCK_03_PRODUCTION, SAT_SERIES_A_MOCK_04_PRODUCTION, SAT_SERIES_A_MOCK_05_PRODUCTION, SAT_SERIES_A_MOCK_06_PRODUCTION, SAT_SERIES_A_MOCK_07_PRODUCTION, SAT_SERIES_A_MOCK_08_PRODUCTION]));
const SAT_SERIES_A_MOCK_10_PRODUCTION = accepted('SAT10', runBatchMTenthProductionGate([SAT_SERIES_A_MOCK_01_PRODUCTION, SAT_SERIES_A_MOCK_02_PRODUCTION, SAT_SERIES_A_MOCK_03_PRODUCTION, SAT_SERIES_A_MOCK_04_PRODUCTION, SAT_SERIES_A_MOCK_05_PRODUCTION, SAT_SERIES_A_MOCK_06_PRODUCTION, SAT_SERIES_A_MOCK_07_PRODUCTION, SAT_SERIES_A_MOCK_08_PRODUCTION, SAT_SERIES_A_MOCK_09_PRODUCTION]));

const SAT_A = [
  SAT_SERIES_A_MOCK_01_PRODUCTION, SAT_SERIES_A_MOCK_02_PRODUCTION, SAT_SERIES_A_MOCK_03_PRODUCTION,
  SAT_SERIES_A_MOCK_04_PRODUCTION, SAT_SERIES_A_MOCK_05_PRODUCTION, SAT_SERIES_A_MOCK_06_PRODUCTION,
  SAT_SERIES_A_MOCK_07_PRODUCTION, SAT_SERIES_A_MOCK_08_PRODUCTION, SAT_SERIES_A_MOCK_09_PRODUCTION,
  SAT_SERIES_A_MOCK_10_PRODUCTION,
];

const PSAT_MOCK_01_PRODUCTION = accepted('PSAT1', runBatchMPSATFirstProductionGate(SAT_A));
const PSAT_MOCK_02_PRODUCTION = accepted('PSAT2', runBatchMPSATSecondProductionGate([...SAT_A, PSAT_MOCK_01_PRODUCTION]));
const PSAT_MOCK_03_PRODUCTION = accepted('PSAT3', runBatchMPSATThirdProductionGate([...SAT_A, PSAT_MOCK_01_PRODUCTION, PSAT_MOCK_02_PRODUCTION]));
const PSAT_MOCK_04_PRODUCTION = accepted('PSAT4', runBatchMPSATFourthProductionGate([...SAT_A, PSAT_MOCK_01_PRODUCTION, PSAT_MOCK_02_PRODUCTION, PSAT_MOCK_03_PRODUCTION]));
const PSAT_MOCK_05_PRODUCTION = accepted('PSAT5', runBatchMPSATFifthProductionGate([...SAT_A, PSAT_MOCK_01_PRODUCTION, PSAT_MOCK_02_PRODUCTION, PSAT_MOCK_03_PRODUCTION, PSAT_MOCK_04_PRODUCTION]));
const PSAT_MOCK_06_PRODUCTION = accepted('PSAT6', runBatchMPSATSixthProductionGate([...SAT_A, PSAT_MOCK_01_PRODUCTION, PSAT_MOCK_02_PRODUCTION, PSAT_MOCK_03_PRODUCTION, PSAT_MOCK_04_PRODUCTION, PSAT_MOCK_05_PRODUCTION]));
const PSAT_MOCK_07_PRODUCTION = accepted('PSAT7', runBatchMPSATSeventhProductionGate([...SAT_A, PSAT_MOCK_01_PRODUCTION, PSAT_MOCK_02_PRODUCTION, PSAT_MOCK_03_PRODUCTION, PSAT_MOCK_04_PRODUCTION, PSAT_MOCK_05_PRODUCTION, PSAT_MOCK_06_PRODUCTION]));
const PSAT_MOCK_08_PRODUCTION = accepted('PSAT8', runBatchMPSATEighthProductionGate([...SAT_A, PSAT_MOCK_01_PRODUCTION, PSAT_MOCK_02_PRODUCTION, PSAT_MOCK_03_PRODUCTION, PSAT_MOCK_04_PRODUCTION, PSAT_MOCK_05_PRODUCTION, PSAT_MOCK_06_PRODUCTION, PSAT_MOCK_07_PRODUCTION]));
const PSAT_MOCK_09_PRODUCTION = accepted('PSAT9', runBatchMPSATNinthProductionGate([...SAT_A, PSAT_MOCK_01_PRODUCTION, PSAT_MOCK_02_PRODUCTION, PSAT_MOCK_03_PRODUCTION, PSAT_MOCK_04_PRODUCTION, PSAT_MOCK_05_PRODUCTION, PSAT_MOCK_06_PRODUCTION, PSAT_MOCK_07_PRODUCTION, PSAT_MOCK_08_PRODUCTION]));
const PSAT_MOCK_10_PRODUCTION = accepted('PSAT10', runBatchMPSATTenthProductionGate([...SAT_A, PSAT_MOCK_01_PRODUCTION, PSAT_MOCK_02_PRODUCTION, PSAT_MOCK_03_PRODUCTION, PSAT_MOCK_04_PRODUCTION, PSAT_MOCK_05_PRODUCTION, PSAT_MOCK_06_PRODUCTION, PSAT_MOCK_07_PRODUCTION, PSAT_MOCK_08_PRODUCTION, PSAT_MOCK_09_PRODUCTION]));

export const BATCH_M_20_TEST_PRE_REPLACEMENT_CORPUS = Object.freeze([
  ...SAT_A,
  PSAT_MOCK_01_PRODUCTION, PSAT_MOCK_02_PRODUCTION, PSAT_MOCK_03_PRODUCTION, PSAT_MOCK_04_PRODUCTION, PSAT_MOCK_05_PRODUCTION,
  PSAT_MOCK_06_PRODUCTION, PSAT_MOCK_07_PRODUCTION, PSAT_MOCK_08_PRODUCTION, PSAT_MOCK_09_PRODUCTION, PSAT_MOCK_10_PRODUCTION,
]);

export const BATCH_M_20_TEST_CONTROLLED_CORPUS = Object.freeze(
  applyBatchMControlledReplacements(BATCH_M_20_TEST_PRE_REPLACEMENT_CORPUS),
);

const remediated = applyBatchMPostQCTargetedRemediations(BATCH_M_20_TEST_CONTROLLED_CORPUS);
const numericDistractorRemediated = applyBatchMGenericNumericDistractorRemediation(remediated.corpus);

export const BATCH_M_20_TEST_ACCEPTED_PRODUCTION_CORPUS = Object.freeze(numericDistractorRemediated.corpus);
export const BATCH_M_20_TEST_POST_QC_REMEDIATION_SUMMARY = Object.freeze({
  ...remediated.summary,
  targetsChanged: remediated.summary.targetsChanged + numericDistractorRemediated.changed,
  numericDistractorRepairs: numericDistractorRemediated.changed,
  numericDistractorRepairQuestionIds: numericDistractorRemediated.changedQuestionIds,
});
