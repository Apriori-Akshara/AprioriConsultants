/**
 * Batch M targeted replacement-selection corpus.
 *
 * This module intentionally materializes only the frozen SAT1-SAT10 and
 * PSAT1-PSAT10 production corpus required by the targeted remediation run.
 * It does not import or execute SAT11-SAT20 production gates.
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

const accepted = (label, result) => {
  if (!result?.passed || !result?.productionMock) {
    throw new Error(`Batch M ${label}: accepted production mock was not returned by the production gate`);
  }
  return result.productionMock;
};

const SAT1 = accepted('SAT1', runBatchMFirstProductionGate());
const SAT2 = accepted('SAT2', runBatchMSecondProductionGate(SAT1));
const SAT3 = accepted('SAT3', runBatchMThirdProductionGate([SAT1, SAT2]));
const SAT4 = accepted('SAT4', runBatchMFourthProductionGate([SAT1, SAT2, SAT3]));
const SAT5 = accepted('SAT5', runBatchMFifthProductionGate([SAT1, SAT2, SAT3, SAT4]));
const SAT6 = accepted('SAT6', runBatchMSixthProductionGate([SAT1, SAT2, SAT3, SAT4, SAT5]));
const SAT7 = accepted('SAT7', runBatchMSeventhProductionGate([SAT1, SAT2, SAT3, SAT4, SAT5, SAT6]));
const SAT8 = accepted('SAT8', runBatchMEighthProductionGate([SAT1, SAT2, SAT3, SAT4, SAT5, SAT6, SAT7]));
const SAT9 = accepted('SAT9', runBatchMNinthProductionGate([SAT1, SAT2, SAT3, SAT4, SAT5, SAT6, SAT7, SAT8]));
const SAT10 = accepted('SAT10', runBatchMTenthProductionGate([SAT1, SAT2, SAT3, SAT4, SAT5, SAT6, SAT7, SAT8, SAT9]));

const SAT_A = [SAT1, SAT2, SAT3, SAT4, SAT5, SAT6, SAT7, SAT8, SAT9, SAT10];

const PSAT1 = accepted('PSAT1', runBatchMPSATFirstProductionGate(SAT_A));
const PSAT2 = accepted('PSAT2', runBatchMPSATSecondProductionGate([...SAT_A, PSAT1]));
const PSAT3 = accepted('PSAT3', runBatchMPSATThirdProductionGate([...SAT_A, PSAT1, PSAT2]));
const PSAT4 = accepted('PSAT4', runBatchMPSATFourthProductionGate([...SAT_A, PSAT1, PSAT2, PSAT3]));
const PSAT5 = accepted('PSAT5', runBatchMPSATFifthProductionGate([...SAT_A, PSAT1, PSAT2, PSAT3, PSAT4]));
const PSAT6 = accepted('PSAT6', runBatchMPSATSixthProductionGate([...SAT_A, PSAT1, PSAT2, PSAT3, PSAT4, PSAT5]));
const PSAT7 = accepted('PSAT7', runBatchMPSATSeventhProductionGate([...SAT_A, PSAT1, PSAT2, PSAT3, PSAT4, PSAT5, PSAT6]));
const PSAT8 = accepted('PSAT8', runBatchMPSATEighthProductionGate([...SAT_A, PSAT1, PSAT2, PSAT3, PSAT4, PSAT5, PSAT6, PSAT7]));
const PSAT9 = accepted('PSAT9', runBatchMPSATNinthProductionGate([...SAT_A, PSAT1, PSAT2, PSAT3, PSAT4, PSAT5, PSAT6, PSAT7, PSAT8]));
const PSAT10 = accepted('PSAT10', runBatchMPSATTenthProductionGate([...SAT_A, PSAT1, PSAT2, PSAT3, PSAT4, PSAT5, PSAT6, PSAT7, PSAT8, PSAT9]));

export const BATCH_M_TARGETED_PRODUCTION_CORPUS = Object.freeze([
  ...SAT_A,
  PSAT1, PSAT2, PSAT3, PSAT4, PSAT5,
  PSAT6, PSAT7, PSAT8, PSAT9, PSAT10,
]);
