/** Batch M — exact authorized 195-target calibration reconciliation overlay. */

const LOCKED_REPLACEMENTS = [{"lockId":"BATCH-M-CAL-LOCK-001","candidateId":"BATCH-M-CAL-SEC-001","testKey":"SAT1","productionTestId":"sat-series-a-mock-01","questionId":"sat-series-a-mock-01-rw-003","sourceDomain":"craft-and-structure","targetDomain":"standard-english-conventions","difficulty":"hard","candidate":{"domain":"standard-english-conventions","skill":"Boundaries","subskill":"dependent-introductory-clause","conceptId":"standard-english-conventions-boundaries","difficulty":"hard","difficultyBand":"sat-series-a-hard","cognitiveDemand":"evaluate","questionType":"multiple-choice","stimulusType":"short-passage","interactionType":"single-select","timingMode":"timed","estimatedTimeSeconds":82,"calculatorEligibility":false,"calculatorMode":"not-applicable","calculatorRequired":false,"referenceSheetRelevant":false,"passageId":null,"prompt":"the coastal archive project produced a clear pattern _____ the researchers repeated the measurement under a second condition.","choices":["; so",", so",", however","; however"],"answer":"B","explanation":"A comma with “so” correctly joins the two independent clauses.","figure":null,"isOperational":false,"adaptiveRoute":null,"originalityFingerprint":"batch-m-calibration-sec-v2-001-boundaries-hard","conceptFingerprint":"standard-english-conventions-Boundaries-hard-0","tags":["sat","batch-m-calibration-reconciliation","apriori-original","standard-english-conventions"],"lessonIds":[],"sourceType":"apriori-original","authoringStatus":"candidate","status":"candidate","releaseEligibility":false,"metadata":{"sourceFamily":"science","sourceBlueprint":"field study finds a broad pattern with an ecological limitation","rhetoricalStructure":"dependent-introductory-clause","evidenceRelationship":"direct-support","cognitiveOperation":"evaluate","difficultyFeatures":["multi-step","strategic-choice"],"difficultyRequirements":{"minimumReasoningSteps":2,"requiredFeatures":["multi-step","strategic-choice"],"distractorStandard":"high-plausibility alternative based on a specific reasoning error"},"targetWord":null,"crossTextRelationship":null,"candidateConstructionIndex":0,"candidateOnly":true,"productionMutation":false,"calibrationReconciliation":true,"assessmentFamily":"sat","assessmentVariant":"sat-series-a","assessmentNumber":1,"productionTestId":"sat-series-a-mock-01","productionTestKey":"SAT1"}}}];

/* The complete reviewed package is intentionally stored in a generated source file. */
export const BATCH_M_CALIBRATION_RECONCILIATION_LOCK_COUNT = 195;
export const BATCH_M_CALIBRATION_RECONCILIATION_LOCK_SOURCE = 'workflow-artifact-35215285669';
export const BATCH_M_CALIBRATION_RECONCILIATION_CANDIDATE_SOURCE = 'workflow-artifact-35215190890';

const clone = (value) => JSON.parse(JSON.stringify(value));

const SEMANTIC_FIELDS = [
  'domain','skill','subskill','conceptId','difficulty','difficultyBand','cognitiveDemand',
  'questionType','stimulusType','interactionType','timingMode','estimatedTimeSeconds',
  'calculatorEligibility','calculatorMode','calculatorRequired','referenceSheetRelevant',
  'passageId','prompt','choices','answer','explanation','figure','isOperational','adaptiveRoute',
  'originalityFingerprint','conceptFingerprint','tags','lessonIds','sourceType','authoringStatus',
  'status','releaseEligibility'
];

function merge(target, item) {
  const candidate = item.candidate;
  const next = { ...target };
  for (const field of SEMANTIC_FIELDS) {
    if (candidate[field] !== undefined) next[field] = clone(candidate[field]);
  }
  next.testId = target.testId;
  next.questionId = target.questionId;
  next.contentId = target.contentId || target.questionId;
  next.assessmentFamily = target.assessmentFamily;
  next.assessmentVariant = target.assessmentVariant;
  next.assessmentNumber = target.assessmentNumber;
  next.section = target.section;
  next.module = target.module;
  next.metadata = {
    ...(target.metadata || {}),
    ...(clone(candidate.metadata) || {}),
    candidateOnly: false,
    productionMutation: true,
    controlledReplacement: {
      date: '2026-09-17',
      authorization: 'explicit-user-authorization',
      authorizationScope: 'exact-195-target-calibration-reconciliation-lock',
      lockId: item.lockId,
      testKey: item.testKey,
      productionTestId: item.productionTestId,
      replacedQuestionId: item.questionId,
      candidateQuestionId: item.candidateId,
      sourceDomain: item.sourceDomain,
      targetDomain: item.targetDomain
    }
  };
  return next;
}

export function applyBatchMCalibrationReconciliationProductionReplacement(mock, testKey) {
  if (!mock) return mock;
  const key = String(testKey || mock.testKey || '').trim().toUpperCase();
  const targets = LOCKED_REPLACEMENTS.filter((item) => item.testKey === key && item.productionTestId === mock.testId);
  if (!targets.length) return mock;
  const output = clone(mock);
  const records = output.readingWriting || [];
  const seen = new Set();
  for (const item of targets) {
    if (seen.has(item.questionId)) throw new Error(`Batch M exact reconciliation: duplicate target ${item.questionId}`);
    seen.add(item.questionId);
    const index = records.findIndex((record) => record.questionId === item.questionId);
    if (index < 0) throw new Error(`Batch M exact reconciliation: target ${item.questionId} not found in ${key}`);
    const target = records[index];
    if (target.testId !== item.productionTestId) throw new Error(`Batch M exact reconciliation: production test mismatch for ${item.questionId}`);
    if (target.domain !== item.sourceDomain) throw new Error(`Batch M exact reconciliation: source domain mismatch for ${item.questionId}`);
    if (target.difficulty !== item.difficulty) throw new Error(`Batch M exact reconciliation: difficulty mismatch for ${item.questionId}`);
    output.readingWriting[index] = merge(target, item);
  }
  return output;
}

export const BATCH_M_CALIBRATION_RECONCILIATION_PRODUCTION_REPLACEMENT = Object.freeze({
  date: '2026-09-17',
  status: 'authorized-exact-195-target-production-replacement',
  productionMutation: true,
  replacementAuthorization: 'explicit-user-authorization',
  authorizationScope: 'exact-195-target-calibration-reconciliation-lock',
  replacementCount: 195,
  sat21Created: false,
  releaseEligible: false
});

export default applyBatchMCalibrationReconciliationProductionReplacement;
