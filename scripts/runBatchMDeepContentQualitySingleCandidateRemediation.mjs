import fs from 'node:fs';

const INPUT = process.env.BATCH_M_SINGLE_REMEDIATION_INPUT ||
  'artifacts/batch-m-deep-content-quality-targeted-remediation/BATCH-M-DEEP-CONTENT-QUALITY-TARGETED-REMEDIATION-2026-09-17.json';
const OUTPUT_DIR = 'artifacts/batch-m-deep-content-quality-single-candidate-remediation';
const OUTPUT_JSON = `${OUTPUT_DIR}/BATCH-M-DEEP-CONTENT-QUALITY-SINGLE-CANDIDATE-REMEDIATION-2026-09-17.json`;
const OUTPUT_MD = `${OUTPUT_DIR}/BATCH-M-DEEP-CONTENT-QUALITY-SINGLE-CANDIDATE-REMEDIATION-2026-09-17.md`;
const CANDIDATE_ID = 'SAT4-BATCHM-DQ-0004';

const source = JSON.parse(fs.readFileSync(INPUT, 'utf8'));
const candidate = (source.candidates || []).find((item) => String(item.id) === CANDIDATE_ID);
if (!candidate) throw new Error(`Candidate ${CANDIDATE_ID} not found.`);
if (candidate.metadata?.remediationHold !== 'EXPERT_REVIEW_REQUIRED') {
  throw new Error(`Expected ${CANDIDATE_ID} to be the documented expert-review hold.`);
}

const out = structuredClone(candidate);
out.version = Number(out.version || 1) + 1;
out.isOperational = false;
out.status = 'candidate';
out.authoringStatus = 'candidate';
out.releaseEligibility = false;
out.sourceType = 'apriori-original';
out.prompt = `The research report initially described a new irrigation method as increasing crop yields in every trial. A later analysis qualified that broad claim by showing that the increase occurred only under cooler conditions. The added condition did not erase the original finding; it narrowed the circumstances in which the finding applied.\n\nIn this context, the word “qualified” most nearly means which of the following?`;
out.choices = [
  'limited the claim by adding a condition',
  'confirmed the claim under every condition',
  'removed the evidence supporting the claim',
  'translated the claim into numerical terms',
];
out.answer = 'A';
out.explanation = 'The report first makes a broad claim that the method increased yields in every trial, then adds the condition that the increase occurred only under cooler conditions. Because that later detail narrows the original claim, “qualified” means limited the claim by adding a condition.';
out.passageId = 'SAT4-batchm-dq-0004-remediation-v3';
out.metadata = {
  ...(out.metadata || {}),
  targetWord: 'qualified',
  remediationStage: 'deep-content-quality-single-candidate-remediation',
  remediationVersion: 'v3',
  remediationSourceCandidateId: CANDIDATE_ID,
  remediationType: 'RW_WIC_CONTEXT_AND_TARGET_DIVERSITY_REPAIR',
  candidateOnly: true,
  productionMutation: false,
  releaseEligibility: false,
  remediationHold: null,
  repairTrace: {
    sourceIssueClasses: [
      'review:answer-explanation-alignment',
      'rw-wic-target-diversity',
    ],
    repairRecipe: 'wic-contextual-evidence-and-target-word-v3',
  },
};
out.originalityFingerprint = 'batch-m-deep-single-candidate-v3-SAT4-qualified-irrigation-condition';
out.tags = [...new Set([...(out.tags || []), 'batch-m-single-candidate-remediation-v3', 'candidate-only'])];

const result = {
  reportType: 'batch-m-deep-content-quality-single-candidate-remediation',
  date: '2026-09-17',
  sourceCandidateCount: 1,
  remediatedCandidateCount: 1,
  heldCandidate: CANDIDATE_ID,
  candidates: [out],
  productionMutation: false,
  releaseEligible: false,
  replacementAuthorization: 'NOT_AUTHORIZED',
  sat21Created: false,
  decision: 'CANDIDATE_REMEDIATION_ONLY',
  nextStep: 'Run independent substantive review on this repaired candidate; keep it outside production.',
};

fs.mkdirSync(OUTPUT_DIR, { recursive: true });
fs.writeFileSync(OUTPUT_JSON, JSON.stringify(result, null, 2));
fs.writeFileSync(OUTPUT_MD, `# Batch M single-candidate remediation — 2026-09-17\n\n- Candidate: **${CANDIDATE_ID}**\n- Remediated: **1**\n- Production mutation: **false**\n- Release eligible: **false**\n- Replacement authorization: **NOT_AUTHORIZED**\n- SAT21 created: **false**\n\n## Repair\n\nThe Words-in-Context item was rebuilt so the tested word **“qualified”** appears in the stimulus, the passage supplies the contextual meaning, and the explanation explicitly connects the keyed answer to that evidence. The target word was also changed to reduce the fixed Words-in-Context target repetition identified by the deep-QC stage.\n\nThis remains a candidate-only artifact and is not a production replacement.\n`);
console.log(JSON.stringify({ candidateId: CANDIDATE_ID, remediatedCandidateCount: 1, productionMutation: false, releaseEligible: false, replacementAuthorization: 'NOT_AUTHORIZED', sat21Created: false }, null, 2));
