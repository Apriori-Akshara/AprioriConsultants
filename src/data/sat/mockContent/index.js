import { PSAT_MOCK_01_CONTENT, SAT_MOCK_01_CONTENT } from "./productionStage1MockContent";
import { validateMockContent, validateMockPair } from "./mockContentQualityGate";

validateMockContent(PSAT_MOCK_01_CONTENT);
validateMockContent(SAT_MOCK_01_CONTENT);
validateMockPair(PSAT_MOCK_01_CONTENT, SAT_MOCK_01_CONTENT);

export { PSAT_MOCK_01_CONTENT, SAT_MOCK_01_CONTENT };
export const SAT_PSAT_STAGE_1_MOCKS = [PSAT_MOCK_01_CONTENT, SAT_MOCK_01_CONTENT];
export default SAT_PSAT_STAGE_1_MOCKS;
