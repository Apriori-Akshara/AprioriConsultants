import PSAT_RW1 from "./psat-mock-01/rw-module-1";
import PSAT_RW2 from "./psat-mock-01/rw-module-2";
import PSAT_MATH1 from "./psat-mock-01/math-module-1";
import PSAT_MATH2 from "./psat-mock-01/math-module-2";
import SAT_RW1 from "./sat-mock-01/rw-module-1";
import SAT_RW2 from "./sat-mock-01/rw-module-2";
import SAT_MATH1 from "./sat-mock-01/math-module-1";
import SAT_MATH2 from "./sat-mock-01/math-module-2";
import { validateMockContent } from "./mockContentQualityGate";

function repairStage1MathExpressions(records) {
  return records.map((question) => {
    if (question.section === "math" && question.skill === "Equivalent expressions" && question.prompt.includes("__")) {
      return {
        ...question,
        answer: "B",
        explanation: "Distribute the coefficient across the quantity in parentheses. The constant term is the product of the coefficient and the constant inside the parentheses.",
      };
    }
    return question;
  });
}

const PSAT_READING_WRITING = [...PSAT_RW1, ...PSAT_RW2];
const PSAT_MATH = repairStage1MathExpressions([...PSAT_MATH1, ...PSAT_MATH2]);
const SAT_READING_WRITING = [...SAT_RW1, ...SAT_RW2];
const SAT_MATH = repairStage1MathExpressions([...SAT_MATH1, ...SAT_MATH2]);

export const PSAT_MOCK_01_CONTENT = {
  testId: "psat-mock-01",
  assessmentVariant: "psat-nmsqt",
  questionCount: 98,
  bankQuestionCount: 196,
  readingWriting: PSAT_READING_WRITING,
  math: PSAT_MATH,
};

export const SAT_MOCK_01_CONTENT = {
  testId: "sat-mock-01",
  assessmentVariant: "sat-series-a",
  questionCount: 98,
  bankQuestionCount: 196,
  readingWriting: SAT_READING_WRITING,
  math: SAT_MATH,
};

validateMockContent(PSAT_MOCK_01_CONTENT);
validateMockContent(SAT_MOCK_01_CONTENT);

export const SAT_PSAT_STAGE_1_MOCKS = [PSAT_MOCK_01_CONTENT, SAT_MOCK_01_CONTENT];

export default SAT_PSAT_STAGE_1_MOCKS;
