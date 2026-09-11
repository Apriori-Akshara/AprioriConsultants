import legacyQuestionBank from "../../../data/questions.json";

const DIFFICULTY_BUCKETS = ["easy", "medium", "hard"];

function normalizeText(value) {
  return String(value ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function createLegacyFingerprint(question) {
  return [
    question?.type,
    normalizeText(question?.question),
    ...(Array.isArray(question?.options)
      ? question.options.map(normalizeText)
      : []),
    normalizeText(question?.answer),
  ].join("||");
}

function normalizeLegacyQuestion(question, sourceTestId, sourceGroup, index) {
  return {
    inventoryId: `legacy-${sourceTestId}-${sourceGroup}-${index + 1}`,
    sourceTestId,
    sourceGroup,
    sourceQuestionId: question?.id ?? String(index + 1),
    subject: question?.type === "english" ? "verbal" : "math",
    prompt: typeof question?.question === "string" ? question.question : "",
    options: Array.isArray(question?.options) ? question.options : [],
    answer: question?.answer ?? null,
    sourceType: "legacy-sat",
    candidateLevel: DIFFICULTY_BUCKETS.includes(sourceGroup)
      ? sourceGroup
      : null,
    publicationStatus: "needs-review",
    reviewFlags: [],
    fingerprint: createLegacyFingerprint(question),
  };
}

/**
 * Builds a non-publishing inventory of the existing legacy SAT questions.
 *
 * This deliberately does not insert content into the new SAT Mock bank or
 * Foundation activity registry. It is a review layer for later migration.
 */
export function buildLegacyFoundationInventory() {
  const inventory = [];

  for (const [testId, rawGroups] of Object.entries(legacyQuestionBank || {})) {
    if (!Array.isArray(rawGroups)) continue;

    rawGroups.forEach((entry, entryIndex) => {
      const explicitGroups = DIFFICULTY_BUCKETS.filter(
        (level) =>
          Array.isArray(entry?.[`math${level}`]) ||
          Array.isArray(entry?.[`english${level}`])
      );

      if (explicitGroups.length > 0) {
        for (const level of explicitGroups) {
          for (const subject of ["math", "english"]) {
            const questions = entry?.[`${subject}${level}`];
            if (!Array.isArray(questions)) continue;

            questions.forEach((question, index) => {
              inventory.push(
                normalizeLegacyQuestion(
                  question,
                  testId,
                  `${subject}-${level}`,
                  index
                )
              );
            });
          }
        }
        return;
      }

      inventory.push(
        normalizeLegacyQuestion(entry, testId, "unclassified", entryIndex)
      );
    });
  }

  const fingerprintCounts = inventory.reduce((counts, item) => {
    counts[item.fingerprint] = (counts[item.fingerprint] || 0) + 1;
    return counts;
  }, {});

  return inventory.map((item) => {
    const duplicateCount = fingerprintCounts[item.fingerprint] || 1;

    return {
      ...item,
      duplicateCount,
      reviewFlags:
        duplicateCount > 1 ? ["duplicate-content"] : [],
      publicationStatus:
        duplicateCount > 1 ? "needs-review" : item.publicationStatus,
    };
  });
}

export function summarizeLegacyFoundationInventory() {
  const inventory = buildLegacyFoundationInventory();
  const duplicateItems = inventory.filter((item) => item.duplicateCount > 1);

  return inventory.reduce(
    (summary, item) => {
      summary.total += 1;
      summary.bySubject[item.subject] += 1;

      if (item.candidateLevel) {
        summary.byCandidateLevel[item.candidateLevel] += 1;
      } else {
        summary.unclassified += 1;
      }

      return summary;
    },
    {
      total: 0,
      bySubject: { verbal: 0, math: 0 },
      byCandidateLevel: { easy: 0, medium: 0, hard: 0 },
      unclassified: 0,
      duplicateItemCount: duplicateItems.length,
    }
  );
}

export function getFoundationLegacyCandidates(level = null) {
  const inventory = buildLegacyFoundationInventory();

  if (!level) return inventory;
  if (!DIFFICULTY_BUCKETS.includes(level)) return [];

  return inventory.filter((item) => item.candidateLevel === level);
}

export default {
  buildLegacyFoundationInventory,
  summarizeLegacyFoundationInventory,
  getFoundationLegacyCandidates,
};
