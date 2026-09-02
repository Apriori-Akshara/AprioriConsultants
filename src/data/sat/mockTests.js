import { SAT_PROGRAM_CONFIG } from "./programConfig";

/**
 * Master registry for the 10 Apriori Digital SAT mocks.
 *
 * Day 1 intentionally contains configuration only.
 * Question content will be added in later stages.
 */

const createMockTest = ({
  testNumber,
  title,
  shortTitle,
}) => {
  const id = `sat-mock-${String(testNumber).padStart(2, "0")}`;

  return {
    id,
    testNumber,
    dayNumber: testNumber,

    title,
    shortTitle,

    status: "planned",

    release: {
      sequence: testNumber,
      releaseMode: SAT_PROGRAM_CONFIG.release.mode,
      availableFromDay: testNumber,
    },

    sections: {
      readingAndWriting: {
        module1: {
          id: "rw-module-1",
          questionSource: `${id}:rw-module-1`,
        },

        module2: {
          id: "rw-module-2",
          adaptive: true,

          pools: {
            high: `${id}:rw-module-2-high`,
            standard: `${id}:rw-module-2-standard`,
            low: `${id}:rw-module-2-low`,
          },
        },
      },

      math: {
        module1: {
          id: "math-module-1",
          questionSource: `${id}:math-module-1`,
        },

        module2: {
          id: "math-module-2",
          adaptive: true,

          pools: {
            high: `${id}:math-module-2-high`,
            standard: `${id}:math-module-2-standard`,
            low: `${id}:math-module-2-low`,
          },
        },
      },
    },

    /**
     * These counts are copied from the public SAT structure used by this app's
     * testing architecture. They are configuration, not content.
     */
    questionCounts: {
      readingAndWriting: 54,
      math: 44,
      total: 98,
    },

    timeLimits: {
      readingAndWritingMinutes: 64,
      mathMinutes: 70,
      breakMinutes: SAT_PROGRAM_CONFIG.break.durationMinutes,
    },

    /**
     * Future fields:
     * - content manifest
     * - validation status
     * - publication timestamp
     * - calibration metadata
     */
    validation: {
      contentValidated: false,
      originalityValidated: false,
      mathematicsValidated: false,
      figuresValidated: false,
    },
  };
};

export const SAT_MOCK_TESTS = [
  createMockTest({
    testNumber: 1,
    title: "Apriori SAT Mock Test 1",
    shortTitle: "Mock 1",
  }),

  createMockTest({
    testNumber: 2,
    title: "Apriori SAT Mock Test 2",
    shortTitle: "Mock 2",
  }),

  createMockTest({
    testNumber: 3,
    title: "Apriori SAT Mock Test 3",
    shortTitle: "Mock 3",
  }),

  createMockTest({
    testNumber: 4,
    title: "Apriori SAT Mock Test 4",
    shortTitle: "Mock 4",
  }),

  createMockTest({
    testNumber: 5,
    title: "Apriori SAT Mock Test 5",
    shortTitle: "Mock 5",
  }),

  createMockTest({
    testNumber: 6,
    title: "Apriori SAT Mock Test 6",
    shortTitle: "Mock 6",
  }),

  createMockTest({
    testNumber: 7,
    title: "Apriori SAT Mock Test 7",
    shortTitle: "Mock 7",
  }),

  createMockTest({
    testNumber: 8,
    title: "Apriori SAT Mock Test 8",
    shortTitle: "Mock 8",
  }),

  createMockTest({
    testNumber: 9,
    title: "Apriori SAT Mock Test 9",
    shortTitle: "Mock 9",
  }),

  createMockTest({
    testNumber: 10,
    title: "Apriori SAT Mock Test 10",
    shortTitle: "Mock 10",
  }),
];

export const getMockTestById = (testId) => {
  return SAT_MOCK_TESTS.find((test) => test.id === testId) || null;
};

export const getMockTestByDay = (dayNumber) => {
  return (
    SAT_MOCK_TESTS.find((test) => test.dayNumber === Number(dayNumber)) ||
    null
  );
};

export const getPublishedMockTests = () => {
  return SAT_MOCK_TESTS.filter((test) => test.status === "published");
};

export default SAT_MOCK_TESTS;
