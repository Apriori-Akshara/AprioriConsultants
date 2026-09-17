/**
 * Batch M — independent substantive review of the selected remediation candidates.
 *
 * This is a candidate-only review stage. It does not mutate production, release
 * candidates, or create SAT21. It deliberately uses review rules separate from
 * candidate-generation/selection rules and records clear failures versus items
 * that require expert review.
 */
import fs from 'node:fs';
import path from 'node:path';

const INPUT = process.env.BATCH_M_SELECTION_INPUT || 'artifacts/batch-m-deep-content-quality-candidate-selection/BATCH-M-DEEP-CONTENT-QUALITY-CANDIDATE-SELECTION-2026-09-17.json';
const OUTPUT_DIR = 'artifacts/batch-m-deep-content-quality-independent-review';
const OUTPUT_JSON = `${OUTPUT_DIR}/BATCH-M-DEEP-CONTENT-QUALITY-INDEPENDENT-REVIEW-2026-09-17.json`;
const OUTPUT_MD = `${OUTPUT_DIR}/BATCH-M-DEEP-CONTENT-QUALITY-INDEPENDENT-REVIEW-2026-09-17.md`;

const GENERIC_EXPLANATIONS = [
  'The keyed choice matches the item-specific evidence, rhetorical relationship, communication goal, or grammatical constraint established by the construction.',
  'In context, the word is used with the meaning represented by the keyed choice.',
];
const GENERIC_PHRASES = [
  'reported relationship', 'stated relationship', 'observed relationship',
  'item-specific evidence', 'communication goal', 'grammatical constraint',
  'established by the construction', 'the quantities are connected through the model',
  'the unknown is isolated from the stated condition', 'area equals',
];
const ERROR_LABEL = /\b(error|misconception|reasoning error)\b/i;
const QUESTION_LEAD = /\b(which|what|how)\b/i;
const MATH_DOMAINS = new Set(['Algebra', 'Advanced Math', 'Problem-Solving and Data Analysis', 'Geometry and Trigonometry']);
const RW_SKILLS = new Set([
  'Central Ideas and Details', 'Inferences', 'Command of Evidence', 'Words in Context',
  'Text Structure and Purpose', 'Cross-Text Connections', 'Rhetorical Synthesis',
  'Transitions', 'Boundaries', 'Form, Structure, and Sense',
]);
const HARD_FEATURES = new Set(['multi-step', 'strategic-choice', 'constraint-inference', 'representation-shift', 'evidence-synthesis', 'parameter-reasoning']);

const normalize = (value) => String(value ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
const words = (value) => normalize(value).split(/\s+/).filter(Boolean);
const wordCount = (value) => words(value).length;
const choiceTexts = (q) => Array.isArray(q?.choices) ? q.choices.map((x) => String(x ?? '')) : [];
const answerIndex = (q) => {
  const answer = String(q?.answer || '').trim().toUpperCase();
  return answer.length === 1 ? answer.charCodeAt(0) - 65 : -1;
};
const metadata = (q) => q?.metadata && typeof q.metadata === 'object' ? q.metadata : {};
const targets = (q) => metadata(q)?.remediationPool?.targetClasses || [];
const genericHits = (text) => {
  const n = normalize(text);
  return GENERIC_PHRASES.filter((phrase) => n.includes(normalize(phrase)));
};
function stimulusOf(q) {
  const prompt = String(q?.prompt || '').trim();
  const parts = prompt.split(/\n\n+/).map((x) => x.trim()).filter(Boolean);
  if (parts.length <= 1) return prompt;
  return parts.slice(0, -1).join(' ');
}
function sentenceCount(text) {
  return String(text || '').split(/[.!?]+(?=\s|$)/).map((x) => x.trim()).filter(Boolean).length;
}
function semanticTemplate(q) {
  const prompt = normalize(q?.prompt);
  return prompt
    .replace(/\b\d+(?:\.\d+)?\b/g, '#')
    .replace(/\b[a-z]\b/g, 'v')
    .replace(/\s+/g, ' ')
    .trim();
}
function answerChoiceSignature(q) {
  const choices = choiceTexts(q).map((x) => normalize(x).replace(/\b\d+(?:\.\d+)?\b/g, '#'));
  return choices.join(' || ');
}
function explanationStrength(q) {
  const explanation = normalize(q?.explanation);
  const answer = String(q?.answer || '').trim().toUpperCase();
  const choices = choiceTexts(q);
  const keyedText = answerIndex(q) >= 0 ? normalize(choices[answerIndex(q)] || '') : '';
  let score = 0;
  if (explanation.length >= 35) score += 1;
  if (answer && (explanation.includes(`choice ${answer.toLowerCase()}`) || explanation.includes(`option ${answer.toLowerCase()}`))) score += 1;
  if (keyedText && keyedText.length >= 8 && explanation.includes(keyedText.slice(0, Math.min(32, keyedText.length)))) score += 1;
  if (/because|therefore|since|so that|which means|this shows|this indicates|must|cannot|only if/i.test(explanation)) score += 1;
  return score;
}
function addIssue(bucket, code, detail, severity = 'fail') {
  bucket.push({ code, detail, severity });
}

if (!fs.existsSync(INPUT)) throw new Error(`Selection artifact not found: ${INPUT}`);
const source = JSON.parse(fs.readFileSync(INPUT, 'utf8'));
const candidates = Array.isArray(source.candidates) ? source.candidates : [];
if (!candidates.length) throw new Error('Selected candidate set is empty.');

const duplicatePromptGroups = new Map();
const duplicateTemplateGroups = new Map();
const duplicateCrossMockPromptGroups = new Map();
for (const q of candidates) {
  const prompt = normalize(q.prompt);
  const template = semanticTemplate(q);
  if (prompt) duplicatePromptGroups.set(prompt, [...(duplicatePromptGroups.get(prompt) || []), q.id]);
  if (template) duplicateTemplateGroups.set(template, [...(duplicateTemplateGroups.get(template) || []), q.id]);
  const key = `${template}|${answerChoiceSignature(q)}`;
  duplicateCrossMockPromptGroups.set(key, [...(duplicateCrossMockPromptGroups.get(key) || []), q.id]);
}

const review = [];
const coverage = {};
const counts = { pass: 0, fail: 0, expertReview: 0 };
const issueCounts = {};

function recordIssue(list, code, detail, severity = 'fail') {
  addIssue(list, code, detail, severity);
  issueCounts[code] = (issueCounts[code] || 0) + 1;
}

for (const q of candidates) {
  const failures = [];
  const expert = [];
  const id = String(q.id || q.questionId || q.contentId || '');
  const section = String(q.section || '');
  const skill = String(q.skill || '');
  const qTargets = targets(q);
  qTargets.forEach((target) => { coverage[target] = (coverage[target] || 0) + 1; });

  if (!id) recordIssue(failures, 'identity:missing-id', 'Candidate has no stable ID.');
  if (q.metadata?.productionMutation === true || q.releaseEligibility === true || q.status === 'operational') {
    recordIssue(failures, 'boundary:production-or-release', 'Candidate violates candidate-only boundary.');
  }
  if (!q.prompt || !QUESTION_LEAD.test(String(q.prompt))) recordIssue(failures, 'prompt:weak-question-form', 'Prompt does not present a clear question form.');
  if (!q.explanation || wordCount(q.explanation) < 8) recordIssue(failures, 'explanation:insufficient', 'Explanation is missing or too short.');
  if (GENERIC_EXPLANATIONS.some((x) => normalize(x) === normalize(q.explanation))) recordIssue(failures, 'explanation:generic', 'Explanation is a stock statement rather than item-specific reasoning.');
  if (genericHits(q.explanation).length >= 2) recordIssue(failures, 'explanation:generic-density', `Generic explanation phrases: ${genericHits(q.explanation).join(', ')}`);
  if (ERROR_LABEL.test(String(q.prompt || '')) && section === 'reading-writing') recordIssue(failures, 'rw:distractor-error-label', 'A distractor exposes an explicit error label instead of testing the reasoning itself.');
  if (section === 'reading-writing') {
    if (!RW_SKILLS.has(skill)) recordIssue(failures, 'rw:unsupported-skill', `Unsupported skill: ${skill || 'missing'}`);
    const stimulusWords = wordCount(stimulusOf(q));
    const shortSkill = new Set(['Transitions', 'Boundaries', 'Form, Structure, and Sense']).has(skill);
    const min = shortSkill ? 8 : 25;
    const max = shortSkill ? 80 : 150;
    if (stimulusWords < min || stimulusWords > max) recordIssue(failures, 'rw:stimulus-length', `Stimulus is ${stimulusWords} words; expected ${min}-${max}.`);
    const m = metadata(q);
    if (!m.sourceFamily || !m.rhetoricalStructure || !m.cognitiveOperation) recordIssue(failures, 'rw:missing-blueprint', 'Required R&W construction metadata is incomplete.');
    if (skill === 'Cross-Text Connections' && !/passage\s+1:/i.test(String(q.prompt)) || skill === 'Cross-Text Connections' && !/passage\s+2:/i.test(String(q.prompt))) recordIssue(failures, 'rw:cross-text-structure', 'Cross-text item does not clearly contain two passages.');
    if (skill === 'Rhetorical Synthesis' && !/communication goal:/i.test(String(q.prompt))) recordIssue(failures, 'rw:synthesis-goal', 'Rhetorical Synthesis item does not clearly state a communication goal.');
    if (skill === 'Words in Context' && !/\b(in this context|in the passage|as used here)\b/i.test(String(q.prompt))) recordIssue(failures, 'rw:wic-context-cue', 'Words-in-Context item lacks a clear context cue.');
    if (explanationStrength(q) < 2) recordIssue(expert, 'review:answer-explanation-alignment', 'Automated checks cannot establish that the explanation actually proves the keyed answer; expert content review required.', 'expertReview');
  } else if (section === 'math') {
    if (!MATH_DOMAINS.has(String(q.domain || ''))) recordIssue(failures, 'math:unsupported-domain', `Unsupported domain: ${q.domain || 'missing'}`);
    const choices = choiceTexts(q);
    const ai = answerIndex(q);
    if (q.questionType === 'multiple-choice') {
      if (choices.length !== 4) recordIssue(failures, 'math:choice-count', `Multiple-choice item has ${choices.length} choices.`);
      if (ai < 0 || ai >= choices.length) recordIssue(failures, 'math:answer-key', 'Answer key is not a valid choice index.');
      if (new Set(choices.map(normalize)).size !== choices.length) recordIssue(failures, 'math:duplicate-choices', 'Choices are duplicated.');
    } else if (q.questionType !== 'student-produced-response') {
      recordIssue(failures, 'math:unsupported-type', `Unsupported Math question type: ${q.questionType || 'missing'}`);
    }
    const m = metadata(q);
    const features = Array.isArray(m.difficultyFeatures) ? m.difficultyFeatures : [];
    if (q.difficulty === 'hard') {
      if (!features.includes('multi-step')) recordIssue(failures, 'math:hard-without-multistep', 'Hard item lacks the required multi-step feature.');
      if (!features.some((feature) => HARD_FEATURES.has(feature))) recordIssue(failures, 'math:hard-without-demand-feature', 'Hard item lacks a substantive reasoning-demand feature.');
      if ((m.difficultyRequirements?.minimumReasoningSteps || 0) < 2) recordIssue(failures, 'math:hard-reasoning-metadata', 'Hard item does not declare at least two reasoning steps.');
    }
    if (qTargets.includes('math-distractor-construction')) {
      const profiles = m.distractor_architecture?.profiles;
      if (!profiles || typeof profiles !== 'object') recordIssue(failures, 'math:distractor-architecture-missing', 'Targeted distractor-construction item has no explicit distractor architecture.');
      else {
        const usable = Object.values(profiles).filter((p) => p?.role === 'distractor' && p?.misconception && p?.error_mechanism);
        if (usable.length < 3) recordIssue(failures, 'math:distractor-architecture-incomplete', `Only ${usable.length} distractors have explicit misconception/error mechanisms.`);
      }
    }
    if (qTargets.includes('hard-reasoning-demand')) {
      const prompt = normalize(q.prompt);
      const reasoningSignals = ['then', 'after', 'given that', 'if', 'must', 'because', 'compared with', 'change', 'relationship', 'model'];
      const signalCount = reasoningSignals.filter((s) => prompt.includes(s)).length;
      if (signalCount < 2) recordIssue(failures, 'math:weak-multistep-signal', `Prompt has only ${signalCount} independent reasoning signals.`);
      else if (explanationStrength(q) < 2) recordIssue(expert, 'review:math-solution-proof', 'Automated checks cannot prove the mathematical solution path; expert review required.', 'expertReview');
    }
    if (q.figure && m.figurePurpose !== 'question-essential') recordIssue(failures, 'math:nonessential-figure', 'Figure is present but not marked as question-essential.');
  } else {
    recordIssue(failures, 'section:unsupported', `Unsupported section: ${section || 'missing'}`);
  }

  const prompt = normalize(q.prompt);
  if (prompt && duplicatePromptGroups.get(prompt)?.length > 1) recordIssue(failures, 'diversity:exact-prompt-duplicate', `Exact normalized prompt occurs ${duplicatePromptGroups.get(prompt).length} times.`);
  const template = semanticTemplate(q);
  if (template && duplicateTemplateGroups.get(template)?.length > 3) recordIssue(failures, 'diversity:semantic-template-cluster', `Semantic prompt template occurs ${duplicateTemplateGroups.get(template).length} times.`);
  const combined = `${template}|${answerChoiceSignature(q)}`;
  if (combined && duplicateCrossMockPromptGroups.get(combined)?.length > 1) recordIssue(failures, 'diversity:prompt-choice-cluster', `Prompt/choice construction repeats ${duplicateCrossMockPromptGroups.get(combined).length} times.`);

  const normalizedPrompt = normalize(q.prompt);
  if (normalizedPrompt && normalizedPrompt.length < 35) recordIssue(failures, 'prompt:too-short', 'Prompt is too short to support a substantive SAT-style task.');
  if (/\s+[,.!?]/.test(String(q.prompt || ''))) recordIssue(failures, 'prompt:punctuation', 'Prompt contains malformed punctuation spacing.');

  const status = failures.length ? 'FAIL' : expert.length ? 'EXPERT_REVIEW_REQUIRED' : 'PASS';
  counts[status === 'FAIL' ? 'fail' : status === 'PASS' ? 'pass' : 'expertReview'] += 1;
  review.push({
    id,
    testId: q.testId,
    section,
    skill,
    difficulty: q.difficulty,
    targetClasses: qTargets,
    status,
    failureCount: failures.length,
    expertReviewCount: expert.length,
    failures,
    expertReview: expert,
  });
}

const crossMockTemplateFailures = [...duplicateCrossMockPromptGroups.entries()].filter(([, ids]) => ids.length > 1).map(([signature, ids]) => ({ signature, count: ids.length, ids }));
const exactPromptFailures = [...duplicatePromptGroups.entries()].filter(([, ids]) => ids.length > 1).map(([prompt, ids]) => ({ prompt, count: ids.length, ids }));
const semanticTemplateFailures = [...duplicateTemplateGroups.entries()].filter(([, ids]) => ids.length > 3).map(([template, ids]) => ({ template, count: ids.length, ids }));

const result = {
  reportType: 'batch-m-deep-content-quality-independent-review',
  date: '2026-09-17',
  sourceArtifact: path.basename(INPUT),
  sourceSelectedCount: candidates.length,
  counts,
  coverage,
  issueCounts,
  duplicateGroups: {
    exactPrompt: exactPromptFailures,
    semanticTemplate: semanticTemplateFailures,
    promptChoiceConstruction: crossMockTemplateFailures,
  },
  review,
  productionMutation: false,
  releaseEligible: false,
  sat21Created: false,
  decision: counts.fail > 0 || counts.expertReview > 0 ? 'HOLD_FOR_REVIEW_AND_REMEDIATION' : 'REVIEW_PASS_CANDIDATE_ONLY',
  nextStep: 'Only candidates with no substantive failures and completed expert review may enter a separately authorized controlled replacement step. Production remains frozen.',
};

fs.mkdirSync(OUTPUT_DIR, { recursive: true });
fs.writeFileSync(OUTPUT_JSON, JSON.stringify(result, null, 2));
const lines = [
  '# Batch M deep content-quality independent substantive review — 2026-09-17',
  '',
  `- Selected candidates reviewed: **${candidates.length}**`,
  `- PASS: **${counts.pass}**`,
  `- FAIL: **${counts.fail}**`,
  `- Expert review required: **${counts.expertReview}**`,
  `- Production mutation: **false**`,
  `- Release eligible: **false**`,
  `- SAT21 created: **false**`,
  `- Decision: **${result.decision}**`,
  '',
  '## Review gates',
  '',
  '1. Answer-key and explanation/evidence alignment.',
  '2. Math distractor construction and plausibility metadata.',
  '3. Genuine multi-step reasoning for hard Math items.',
  '4. R&W stimulus construction and length.',
  '5. Words-in-Context contextual targeting.',
  '6. Generic/template language reduction.',
  '7. Cross-mock prompt and construction diversity.',
  '8. SAT/PSAT structural appropriateness and candidate-only boundary.',
  '',
  '## Key findings',
  '',
  `- Exact normalized duplicate-prompt groups: **${exactPromptFailures.length}**.`,
  `- Semantic prompt-template clusters above the review threshold: **${semanticTemplateFailures.length}**.`,
  `- Repeated prompt/choice construction groups: **${crossMockTemplateFailures.length}**.`,
  '',
  'The report is a candidate-only review artifact. It does not authorize production replacement or release.',
];
fs.writeFileSync(OUTPUT_MD, `${lines.join('\n')}\n`);
console.log(JSON.stringify({ status: result.decision, counts, exactPromptGroups: exactPromptFailures.length, semanticTemplateClusters: semanticTemplateFailures.length, promptChoiceClusters: crossMockTemplateFailures.length, productionMutation: false, releaseEligible: false, sat21Created: false }, null, 2));
