import fs from 'node:fs';

const INPUT = process.env.BATCH_M_SINGLE_COMPATIBILITY_INPUT ||
  'artifacts/batch-m-deep-content-quality-single-candidate-remediation/BATCH-M-DEEP-CONTENT-QUALITY-SINGLE-CANDIDATE-REMEDIATION-2026-09-17.json';
const OUTPUT_DIR = 'artifacts/batch-m-deep-content-quality-single-candidate-compatibility-remediation';
const OUTPUT_JSON = `${OUTPUT_DIR}/BATCH-M-DEEP-CONTENT-QUALITY-SINGLE-CANDIDATE-COMPATIBILITY-REMEDIATION-2026-09-17.json`;
const OUTPUT_MD = `${OUTPUT_DIR}/BATCH-M-DEEP-CONTENT-QUALITY-SINGLE-CANDIDATE-COMPATIBILITY-REMEDIATION-2026-09-17.md`;
const CANDIDATE_ID = 'SAT4-BATCHM-DQ-0004';
const REQUIRED_TARGET_DIFFICULTY = 'medium';
const REQUIRED_DOMAIN = 'craft-and-structure';
const REQUIRED_SKILL = 'Words in Context';

const source = JSON.parse(fs.readFileSync(INPUT, 'utf8'));
const candidate = (source.candidates || []).find((item) => String(item.id) === CANDIDATE_ID);
if (!candidate) throw new Error(`Candidate ${CANDIDATE_ID} not found.`);
if (candidate.releaseEligibility === true || candidate.metadata?.productionMutation === true || candidate.status === 'operational') {
  throw new Error('Source candidate violates candidate-only production boundary.');
}
if (String(candidate.domain || '') !== REQUIRED_DOMAIN) throw new Error(`Expected domain ${REQUIRED_DOMAIN}; found ${candidate.domain}.`);
if (String(candidate.skill || '') !== REQUIRED_SKILL) throw new Error(`Expected skill ${REQUIRED_SKILL}; found ${candidate.skill}.`);
if (String(candidate.difficulty || '') !== 'hard') throw new Error(`Expected the reviewed source candidate to be hard; found ${candidate.difficulty}.`);

const out = structuredClone(candidate);
out.version = Number(out.version || 1) + 1;
out.difficulty = REQUIRED_TARGET_DIFFICULTY;
out.isOperational = false;
out.status = 'candidate';
out.authoringStatus = 'candidate';
out.releaseEligibility = false;
out.metadata = {
  ...(out.metadata || {}),
  compatibilityRemediationStage: 'deep-content-quality-single-candidate-production-compatibility',
  compatibilityRemediationVersion: 'v1',
  compatibilitySourceCandidateId: CANDIDATE_ID,
  compatibilitySourceDifficulty: 'hard',
  compatibilityTargetDifficulty: REQUIRED_TARGET_DIFFICULTY,
  candidateOnly: true,
  productionMutation: false,
  releaseEligibility: false,
  repairTrace: {
    ...(out.metadata?.repairTrace || {}),
    compatibilityRecipe: 'retain-passed-wic-content-and-author-for-available-sat4-medium-target'
  },
};
out.originalityFingerprint = 'batch-m-deep-single-candidate-v4-SAT4-qualified-irrigation-condition-medium-compatibility';
out.tags = [...new Set([...(out.tags || []), 'batch-m-single-candidate-compatibility-v1', 'candidate-only'])];

const result = {
  reportType: 'batch-m-deep-content-quality-single-candidate-compatibility-remediation',
  date: '2026-09-17',
  sourceCandidateId: CANDIDATE_ID,
  remediatedCandidateCount: 1,
  compatibilityBasis: {
    targetTestKey: 'SAT4',
    targetDomain: REQUIRED_DOMAIN,
    targetSkill: REQUIRED_SKILL,
    targetDifficulty: REQUIRED_TARGET_DIFFICULTY,
    reason: 'The resolved SAT4 fixed-WIC production target is medium difficulty; the prior repaired candidate was hard, so a new candidate-only compatibility authoring step is required before replacement can be considered.'
  },
  candidates: [out],
  productionMutation: false,
  releaseEligible: false,
  replacementAuthorization: 'NOT_AUTHORIZED',
  sat21Created: false,
  decision: 'CANDIDATE_COMPATIBILITY_REMEDIATION_ONLY',
  nextStep: 'Run independent substantive review on this compatibility-adjusted candidate; keep it outside production.'
};

fs.mkdirSync(OUTPUT_DIR, { recursive: true });
fs.writeFileSync(OUTPUT_JSON, JSON.stringify(result, null, 2));
fs.writeFileSync(OUTPUT_MD, `# Batch M single-candidate compatibility remediation — 2026-09-17\n\n- Candidate: **${CANDIDATE_ID}**\n- Source reviewed difficulty: **hard**\n- Compatibility target difficulty: **medium**\n- Domain: **${REQUIRED_DOMAIN}**\n- Skill: **${REQUIRED_SKILL}**\n- Production mutation: **false**\n- Release eligible: **false**\n- Replacement authorization: **NOT_AUTHORIZED**\n- SAT21 created: **false**\n\nThe previously reviewed Words-in-Context repair is retained substantively but re-authored as a medium-difficulty candidate-only item so it can be evaluated against the available SAT4 production target without bypassing the documented difficulty-preservation boundary. Independent review is required before any replacement can be considered.\n`);
console.log(JSON.stringify({ candidateId: CANDIDATE_ID, sourceDifficulty: 'hard', targetDifficulty: REQUIRED_TARGET_DIFFICULTY, productionMutation: false, releaseEligible: false, replacementAuthorization: 'NOT_AUTHORIZED', sat21Created: false }, null, 2));
