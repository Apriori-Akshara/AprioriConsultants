import { normalizeMathSourceNotation } from "./contentNormalization.js";
import { typesetMathText } from "./mathTypography.js";
import { validateSatQuestion } from "../../data/sat/questionSchema.js";
import { evaluateContentQuality } from "../../data/sat/mockContent/batchMContentQualityGate.js";
import { validateStructuredFigure } from "../../data/sat/mockContent/figureRegistry.js";
import { validateFigureOriginality } from "../../data/sat/mockContent/figureOriginalityQC.js";
import { validateMathQuestionMathematics } from "../../data/sat/mockContent/mathMathematicalQC.js";

const IDENTITY_FIELDS = ["testKey", "questionId"];
const TEXT_FIELDS = ["prompt", "answer", "explanation"];

function keyFor(testKey, questionId) {
  return String(testKey || "").trim() + "|" + String(questionId || "").trim();
}

function normalizeText(value) {
  return normalizeMathSourceNotation(value);
}

function normalizeChoices(choices) {
  if (!Array.isArray(choices)) return choices;
  return choices.map((choice) => typeof choice === "string" ? normalizeText(choice) : choice);
}

function normalizeTableFigure(raw) {
  if (!raw || typeof raw !== "object") return raw;
  const source = raw.figure && typeof raw.figure === "object" ? raw.figure : raw;
  const type = String(source.type || "").trim().toLowerCase();
  if (type !== "table") return source;
  const data = source.data && typeof source.data === "object" ? source.data : source;
  const headers = Array.isArray(data.headers) ? data.headers.map(normalizeText) : [];
  const rows = Array.isArray(data.rows)
    ? data.rows.map((row) => Array.isArray(row) ? row.map(normalizeText) : row)
    : [];
  const figure = { type: "table", headers, rows };
  if (typeof source.title === "string" && source.title.trim()) figure.title = normalizeText(source.title);
  if (typeof source.ariaLabel === "string" && source.ariaLabel.trim()) figure.ariaLabel = normalizeText(source.ariaLabel);
  return figure;
}

function collectCandidateFigure(candidate, figureCandidatesByTarget) {
  if (candidate?.figure && typeof candidate.figure === "object") return normalizeTableFigure(candidate.figure);
  const match = figureCandidatesByTarget.get(keyFor(candidate?.testKey, candidate?.questionId));
  return match ? normalizeTableFigure(match) : null;
}

function validateIdentity(candidate, target, exceptions) {
  if (!target) {
    exceptions.push({
      code: "UNKNOWN_FROZEN_TARGET",
      severity: "error",
      message: "Candidate does not resolve to an existing frozen question identity.",
    });
    return;
  }
  if (candidate.testKey !== target.testKey || candidate.questionId !== target.questionId) {
    exceptions.push({
      code: "IDENTITY_TARGET_MISMATCH",
      severity: "error",
      message: "Candidate testKey + questionId do not match the frozen target identity.",
    });
  }

  const metadata = candidate.baseMetadata && typeof candidate.baseMetadata === "object" ? candidate.baseMetadata : {};
  for (const field of ["questionId", "testId", "section", "module"]) {
    if (metadata[field] === undefined || metadata[field] === null) continue;
    const expected = field === "questionId" ? target.questionId
      : field === "testId" ? target.testId
      : field === "section" ? target.section
      : target.module;
    if (String(metadata[field]) !== String(expected)) {
      exceptions.push({
        code: "IDENTITY_METADATA_MISMATCH",
        severity: "error",
        field,
        message: "System metadata " + field + " does not match the frozen target.",
      });
    }
  }
}

function buildCanonicalQuestion(candidate, target, figure) {
  const metadata = candidate.baseMetadata && typeof candidate.baseMetadata === "object"
    ? structuredClone(candidate.baseMetadata)
    : {};

  return {
    ...metadata,
    questionId: target.questionId,
    testId: target.testId,
    section: target.section,
    module: target.module,
    prompt: normalizeText(candidate.prompt),
    choices: normalizeChoices(candidate.choices),
    answer: normalizeText(candidate.answer),
    explanation: normalizeText(candidate.explanation),
    ...(figure ? { figure } : {}),
  };
}

function collectTextChanges(candidate, canonical) {
  const changedFields = [];
  for (const field of TEXT_FIELDS) {
    if (String(candidate?.[field] ?? "") !== String(canonical?.[field] ?? "")) changedFields.push(field);
  }
  if (JSON.stringify(candidate?.choices ?? null) !== JSON.stringify(canonical?.choices ?? null)) changedFields.push("choices");
  return [...new Set(changedFields)];
}

function verifyPresentationBoundary(question, exceptions) {
  const fields = [question.prompt, ...(Array.isArray(question.choices) ? question.choices : []), question.explanation];
  for (const value of fields) {
    if (typeof value !== "string" || !value.trim()) continue;
    const rendered = typesetMathText(value);
    if (!rendered || typeof rendered !== "string") {
      exceptions.push({
        code: "MATH_PRESENTATION_FAILED",
        severity: "error",
        message: "Student-facing Math presentation could not be deterministically generated.",
      });
      return;
    }
  }
}

function runApplicableGates(question, exceptions) {
  const schema = validateSatQuestion(question);
  if (!schema.valid) {
    exceptions.push(...schema.errors.map((message) => ({
      code: "SCHEMA_VALIDATION_FAILED",
      severity: "error",
      message,
    })));
  }

  const content = evaluateContentQuality(question);
  if (content.verdict !== "pass") {
    exceptions.push({
      code: "CONTENT_QUALITY_REVIEW",
      severity: content.severity || "review",
      message: "Content-quality gate returned " + content.verdict + ".",
      checks: content.checks,
      score: content.score,
    });
  }

  if (question.section === "math") {
    try {
      validateMathQuestionMathematics(structuredClone(question));
    } catch (error) {
      exceptions.push({
        code: "MATH_QC_FAILED",
        severity: "error",
        message: error.message,
      });
    }
  }

  if (question.figure) {
    const structural = validateStructuredFigure(question.figure);
    if (!structural.valid) {
      exceptions.push(...structural.errors.map((message) => ({
        code: "FIGURE_VALIDATION_FAILED",
        severity: "error",
        message,
      })));
    }
    try {
      validateFigureOriginality(structuredClone(question));
    } catch (error) {
      exceptions.push({
        code: "FIGURE_ORIGINALITY_FAILED",
        severity: "error",
        message: error.message,
      });
    }
  }

  verifyPresentationBoundary(question, exceptions);
}

export function normalizePrelaunchCandidate(candidate, { targetResolver, figureCandidatesByTarget = new Map() } = {}) {
  const exceptions = [];
  if (!candidate || typeof candidate !== "object") {
    return {
      status: "CANDIDATE_NORMALIZATION_REVIEW",
      eligible: false,
      reviewRequired: true,
      exceptions: [{ code: "INVALID_CANDIDATE", severity: "error", message: "Candidate must be an object." }],
      productionMutation: false,
    };
  }

  const target = targetResolver?.(candidate.testKey, candidate.questionId) || null;
  validateIdentity(candidate, target, exceptions);
  const figure = collectCandidateFigure(candidate, figureCandidatesByTarget);
  const canonical = target ? buildCanonicalQuestion(candidate, target, figure) : null;

  if (canonical) {
    for (const field of ["prompt", "explanation"]) {
      if (!String(canonical[field] ?? "").trim()) {
        exceptions.push({
          code: "MISSING_REQUIRED_CONTENT",
          severity: "error",
          field,
          message: field + " is missing after normalization.",
        });
      }
    }
    if (canonical.answer === "" || canonical.answer === null || canonical.answer === undefined) {
      exceptions.push({
        code: "MISSING_REQUIRED_CONTENT",
        severity: "error",
        field: "answer",
        message: "answer is missing after normalization.",
      });
    }
    runApplicableGates(canonical, exceptions);
  }

  return {
    status: exceptions.length ? "CANDIDATE_NORMALIZATION_REVIEW" : "CANDIDATE_NORMALIZED",
    eligible: exceptions.length === 0,
    reviewRequired: exceptions.length > 0,
    testKey: candidate.testKey || target?.testKey || "",
    questionId: candidate.questionId || target?.questionId || "",
    sourceRef: candidate.sourceRef || null,
    mappingMethod: candidate.mappingMethod || null,
    changedFields: collectTextChanges(candidate, canonical || {}),
    canonical: canonical ? structuredClone(canonical) : null,
    exceptions,
    productionMutation: false,
  };
}

export function normalizePrelaunchCandidateBatch(candidates, { targetResolver, figureCandidates = [] } = {}) {
  if (!Array.isArray(candidates)) throw new Error("Pre-launch candidate normalization expects an array.");

  const figureCandidatesByTarget = new Map();
  const figureDuplicates = new Set();
  for (const figure of Array.isArray(figureCandidates) ? figureCandidates : []) {
    const key = keyFor(figure?.testKey, figure?.questionId);
    if (!key || key === "|") continue;
    if (figureCandidatesByTarget.has(key)) figureDuplicates.add(key);
    else figureCandidatesByTarget.set(key, figure);
  }

  const seenTargets = new Set();
  const results = candidates.map((candidate) => {
    const result = normalizePrelaunchCandidate(candidate, { targetResolver, figureCandidatesByTarget });
    const key = keyFor(result.testKey, result.questionId);

    if (key !== "|" && seenTargets.has(key)) {
      result.reviewRequired = true;
      result.eligible = false;
      result.status = "CANDIDATE_NORMALIZATION_REVIEW";
      result.exceptions.push({
        code: "DUPLICATE_TARGET",
        severity: "error",
        message: "Multiple candidate records target the same frozen question identity.",
      });
    } else if (key !== "|") {
      seenTargets.add(key);
    }

    if (figureDuplicates.has(key)) {
      result.reviewRequired = true;
      result.eligible = false;
      result.status = "CANDIDATE_NORMALIZATION_REVIEW";
      result.exceptions.push({
        code: "DUPLICATE_FIGURE_CANDIDATE",
        severity: "error",
        message: "Multiple structured figure candidates target the same frozen question identity.",
      });
    }

    return result;
  });

  const reviewQueue = results
    .filter((item) => item.reviewRequired)
    .map((item) => ({
      testKey: item.testKey,
      questionId: item.questionId,
      sourceRef: item.sourceRef,
      exceptionCount: item.exceptions.length,
      exceptions: item.exceptions,
    }));

  return {
    schemaVersion: 1,
    status: "PRELAUNCH_CANDIDATE_NORMALIZATION_CANDIDATE_ONLY",
    productionMutation: false,
    candidates: results,
    reviewQueue,
    summary: {
      candidateCount: results.length,
      normalizedCount: results.filter((item) => item.eligible).length,
      reviewRequiredCount: reviewQueue.length,
      exceptionCount: results.reduce((sum, item) => sum + item.exceptions.length, 0),
      frozenBoundaryChecked: true,
      productionMutation: false,
    },
  };
}

export default { normalizePrelaunchCandidate, normalizePrelaunchCandidateBatch };
