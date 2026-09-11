import PSAT_RW1 from "./psat-mock-01/rw-module-1";
import PSAT_RW2 from "./psat-mock-01/rw-module-2";
import PSAT_MATH1 from "./psat-mock-01/math-module-1";
import PSAT_MATH2 from "./psat-mock-01/math-module-2";
import SAT_RW1 from "./sat-mock-01/rw-module-1";
import SAT_RW2 from "./sat-mock-01/rw-module-2";
import SAT_MATH1 from "./sat-mock-01/math-module-1";
import SAT_MATH2 from "./sat-mock-01/math-module-2";

export const PSAT_MOCK_01_CONTENT = {
  testId: "psat-mock-01",
  assessmentVariant: "psat-nmsqt",
  questionCount: 98,
  readingWriting: [...PSAT_RW1, ...PSAT_RW2],
  math: [...PSAT_MATH1, ...PSAT_MATH2],
};

export const SAT_MOCK_01_CONTENT = {
  testId: "sat-mock-01",
  assessmentVariant: "sat-series-a",
  questionCount: 98,
  readingWriting: [...SAT_RW1, ...SAT_RW2],
  math: [...SAT_MATH1, ...SAT_MATH2],
};

export const SAT_PSAT_STAGE_1_MOCKS = [PSAT_MOCK_01_CONTENT, SAT_MOCK_01_CONTENT];

export default SAT_PSAT_STAGE_1_MOCKS;
