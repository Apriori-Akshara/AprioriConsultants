/**
 * Batch M — final expert review of the single unresolved candidate after
 * targeted remediation and independent re-review.
 *
 * Candidate-only recordkeeping stage. This script does not mutate production,
 * authorize release, or create SAT21.
 */
import fs from 'node:fs';

const REMEDIATION_INPUT = process.env.BATCH_M_REMEDIATION_INPUT ||
  'artifacts/batch-m-deep-content-quality-targeted-remediation/BATCH-M-DEEP-CONTENT-QUALITY-TARGETED-REMEDIATION-2026-09-17.json';
const REREVIEW_INPUT = process.env.BATCH_M_REREVIEW_INPUT ||
  'artifacts/batch-m-deep-content-quality-targeted-remediation-review/BATCH-M-DEEP-CONTENT-QUALITY-INDEPENDENT-REVIEW-2026-09-17.json';
const OUTPUT_DIR = process.env.BATCH_M_EXPERT_REVIEW_OUTPUT_DIR ||
  'artifacts/batch-m-deep-content-quality-expert-review';
const OUTPUT_JSON = `${OUTPUT_DIR}/BATCH-M-DEEP-CONTENT-QUALITY-EXPERT-REVIEW-2026-09-17.json`;
const OUTPUT_MD = `${OUTPUT_DIR}/BATCH-M-DEEP-CONTENT-QUALITY-EXPERT-REVIEW-2026-09-17.md`;
const HELD_ID = 'SAT4-BATCHM-DQ-0004';

const remediation = JSON.parse(fs.readFileSync(REMEDIATION_INPUT, 'utf8'));
const rereview = JSON.parse(fs.readFileSync(REREVIEW_INPUT, 'utf8'));
const candidate = (remediation.candidates || []).find((item) => String(item.id) === HELD_ID);
const reviewItem = (rereview.review || []).find((item) => String(item.id) === HELD_ID);

if (!candidate) throw new Error(`Held candidate ${HELD_ID} was not found in the targeted-remediation artifact.`);
if (!reviewItem) throw new Error(`Held candidate ${HELD_ID} was not found in the independent re-review artifact.`);
if (reviewItem.status !== 'EXPERT_REVIEW_REQUIRED') {
  throw new Error(`Expected ${HELD_ID} to remain EXPERT_REVIEW_REQUIRED before expert review; received ${reviewItem.status}.`);
}

const prompt = String(candidate.prompt || '');
const explanation = String(candidate.explanation || '');
const choices = Array.isArray(candidate.choices) ? candidate.choices.map(String) : [];
const answerIndex = String(candidate.answer || '').trim().toUpperCase().charCodeAt(0) - 65;
const keyedChoice = choices[answerIndex] || '';

const checks = {
  targetWordAppearsInStimulus: /\bclarify\b/i.test(prompt.split(/\n\nIn this context,/i)[0] || ''),
  keyedAnswerMatchesStandardMeaning: /make a claim or distinction more precise/i.test(keyedChoice),
  explanationProvidesEvidence: explanation.length > 40 && !/^In context,?\s*[“\"]?clarify[”\"]?/i.test(explanation) && /because|since|means|refers|indicat|shows|demonstrat/i.test(explanation),
  explanationIsItemSpecific: !/used with the meaning represented by the keyed choice/i.test(explanation),
  questionIsGroundedInStimulus: /\bclarify\b/i.test(prompt.split(/\n\nIn this context,/i)[0] || ''),
};

const reasons = [];
if (!checks.targetWordAppearsInStimulus) {
  reasons.push('The tested word “clarify” does not appear in the stimulus passage, so the item does not provide the required contextual evidence for a Words-in-Context question.');
}
if (!checks.explanationProvidesEvidence) {
  reasons.push('The explanation does not establish the keyed meaning from the passage; it merely restates that the keyed choice represents the meaning.');
}
if (!checks.explanationIsItemSpecific) {
  reasons.push('The explanation is generic rather than tied to a specific phrase, contrast, or inference in the stimulus.');
}

const result = {
  reportType: 'batch-m-deep-content-quality-expert-review',
  date: '2026-09-17',
  candidateId: HELD_ID,
  sourceRemediationArtifact: REMEDIATION_INPUT,
  sourceIndependentRereviewArtifact: REREVIEW_INPUT,
  reviewBasis: 'Direct content inspection of the candidate stimulus, keyed answer, choices, and explanation against the documented answer-key and explanation/evidence-alignment gate for Words in Context.',
  checks,
  finding: reasons,
  finalStatus: 'FAIL',
  disposition: 'EXPERT_REVIEW_HOLD_RESOLVED_AS_FAIL',
  remediationRequired: true,
  productionMutation: false,
  releaseEligible: false,
  replacementAuthorization: 'NOT_AUTHORIZED',
  sat21Created: false,
  nextStep: 'Keep this candidate outside production and address it only in a separately authorized remediation stage; do not authorize controlled replacement from this review alone.',
};

fs.mkdirSync(OUTPUT_DIR, { recursive: true });
fs.writeFileSync(OUTPUT_JSON, JSON.stringify(result, null, 2));
fs.writeFileSync(OUTPUT_MD, `# Batch M expert review — 2026-09-17\n\n- Candidate: **${HELD_ID}**\n- Final status: **FAIL**\n- Disposition: **EXPERT_REVIEW_HOLD_RESOLVED_AS_FAIL**\n- Production mutation: **false**\n- Release eligible: **false**\n- Replacement authorization: **NOT_AUTHORIZED**\n- SAT21 created: **false**\n\n## Evidence\n\n${reasons.map((reason) => `- ${reason}`).join('\n')}\n\nThis review resolves the automated expert-review hold. It does not authorize production replacement and does not remediate the candidate.\n`);

console.log(JSON.stringify({ candidateId: HELD_ID, finalStatus: 'FAIL', productionMutation: false, releaseEligible: false, replacementAuthorization: 'NOT_AUTHORIZED', sat21Created: false }, null, 2));
