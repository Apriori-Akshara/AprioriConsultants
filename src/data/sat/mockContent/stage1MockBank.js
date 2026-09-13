// Backward-compatible entry point for the Stage 1 mock bank.
// Batch C moves Reading & Writing construction into a dedicated module.
export {
  PSAT_MOCK_01_CONTENT,
  SAT_MOCK_01_CONTENT,
  buildProductionMock,
} from './verbalConstruction';

export { default } from './verbalConstruction';
