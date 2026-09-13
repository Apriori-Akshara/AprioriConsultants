// Backward-compatible entry point for the Stage 1 mock bank.
// Batch C moves Reading & Writing construction into a dedicated module and
// applies the controlled variation layer before the bank is consumed by the
// shared mock-content quality gates.
import {
  PSAT_MOCK_01_CONTENT as PSAT_RAW,
  SAT_MOCK_01_CONTENT as SAT_RAW,
  buildProductionMock as buildRawProductionMock,
} from './verbalConstruction';
import { varyVerbalConstruction } from './verbalVariationLayer';

export const PSAT_MOCK_01_CONTENT = varyVerbalConstruction(PSAT_RAW);
export const SAT_MOCK_01_CONTENT = varyVerbalConstruction(SAT_RAW);

export function buildProductionMock(options) {
  return varyVerbalConstruction(buildRawProductionMock(options));
}

export default {
  PSAT_MOCK_01_CONTENT,
  SAT_MOCK_01_CONTENT,
  buildProductionMock,
};
