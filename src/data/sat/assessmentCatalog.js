/**
 * Central SAT/PSAT assessment catalog.
 *
 * This file defines assessment families and mock inventory only. Question
 * content remains in the central content bank and is governed by the master
 * content-quality document.
 */

export const SAT_ASSESSMENT_CATALOG = {
  psat: {
    assessmentFamily: "psat",
    assessmentVariant: "psat-nmsqt",
    displayName: "PSAT/NMSQT",
    mockCount: 10,
    questionCountPerMock: 98,
    sections: {
      readingAndWriting: {
        questionCount: 54,
        durationMinutes: 64,
        moduleCount: 2,
        averageSecondsPerQuestion: 64 * 60 / 54,
      },
      math: {
        questionCount: 44,
        durationMinutes: 70,
        moduleCount: 2,
        averageSecondsPerQuestion: 70 * 60 / 44,
      },
    },
  },

  satSeriesA: {
    assessmentFamily: "sat",
    assessmentVariant: "sat-series-a",
    displayName: "SAT — Series A",
    mockCount: 10,
    questionCountPerMock: 98,
    sections: {
      readingAndWriting: {
        questionCount: 54,
        durationMinutes: 64,
        moduleCount: 2,
        averageSecondsPerQuestion: 64 * 60 / 54,
      },
      math: {
        questionCount: 44,
        durationMinutes: 70,
        moduleCount: 2,
        averageSecondsPerQuestion: 70 * 60 / 44,
      },
    },
  },

  satSeriesB: {
    assessmentFamily: "sat",
    assessmentVariant: "sat-series-b",
    displayName: "SAT — Series B",
    mockCount: 10,
    questionCountPerMock: 98,
    sections: {
      readingAndWriting: {
        questionCount: 54,
        durationMinutes: 64,
        moduleCount: 2,
        averageSecondsPerQuestion: 64 * 60 / 54,
      },
      math: {
        questionCount: 44,
        durationMinutes: 70,
        moduleCount: 2,
        averageSecondsPerQuestion: 70 * 60 / 44,
      },
    },
  },
};

export const getAssessmentConfig = (assessmentVariant) => {
  return (
    Object.values(SAT_ASSESSMENT_CATALOG).find(
      (assessment) => assessment.assessmentVariant === assessmentVariant
    ) || null
  );
};

export const getTotalMockInventory = () =>
  Object.values(SAT_ASSESSMENT_CATALOG).reduce(
    (total, assessment) => total + assessment.mockCount,
    0
  );

export default SAT_ASSESSMENT_CATALOG;
