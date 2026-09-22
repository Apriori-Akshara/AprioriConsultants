/**
 * Batch M — controlled candidate selection for deep content-quality remediation.
 *
 * Reads the already-screened candidate artifact from the candidate-generation
 * workflow, deterministically selects candidates for independent review, and
 * never mutates production or authorizes release.
 */
import fs from 'node:fs';
import path from 'node:path';
import { BATCH_M_ACCEPTED_PRODUCTION_CORPUS } from '../src/data/sat/mockContent/batchMProductionStore.js';
import { BATCH_M_PRODUCTION_SEQUENCE } from '../src/data/sat/mockContent/batchMProductionController.js';

const INPUT = process.env.BATCH_M_CANDIDATE_INPUT || 'artifacts/batch-m-deep-content-quality-remediation-candidates/BATCH-M-DEEP-CONTENT-QUALITY-REMEDIATION-CANDIDATES-2026-09-17.json';
const OUTPUT_DIR = 'artifacts/batch-m-deep-content-quality-candidate-selection';
const SELECTION_DATE = process.env.BATCH_M_CANDIDATE_SELECTION_DATE || '2026-09-17';
const TARGET_AWARE = process.env.BATCH_M_TARGET_AWARE_SELECTION === 'true';
const OUTPUT_JSON = `${OUTPUT_DIR}/BATCH-M-DEEP-CONTENT-QUALITY-CANDIDATE-SELECTION-${SELECTION_DATE}.json`;
const OUTPUT_MD = `${OUTPUT_DIR}/BATCH-M-DEEP-CONTENT-QUALITY-CANDIDATE-SELECTION-${SELECTION_DATE}.md`;

function readInput() {
  if (!fs.existsSync(INPUT)) throw new Error(`Candidate artifact not found: ${INPUT}`);
  return JSON.parse(fs.readFileSync(INPUT, 'utf8'));
}

function normalize(value) {
  return String(value ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
}

function testKeyForTestId(testId) {
  const normalized = String(testId || '').trim().toUpperCase();
  return BATCH_M_PRODUCTION_SEQUENCE.find((entry) =>
    String(entry.testKey).toUpperCase() === normalized ||
    String(entry.testId).toUpperCase() === normalized
  )?.testKey || normalized;
}

function canonicalSkillFor(candidate) {
  const skill = normalize(candidate?.skill);
  return {
    'scatterplot interpretation': 'data models',
    'equivalent exponential representations': 'exponential equations',
    'right-triangle relationships': 'right triangles',
    'linear relationships': 'linear functions',
  }[skill] || skill;
}

function figureSignature(question) {
  const figure = question?.figure;
  if (!figure) return null;
  return { type: normalize(figure.type), shape: normalize(figure.shape) };
}

function buildProductionIndex() {
  const map = new Map();
  for (const mock of BATCH_M_ACCEPTED_PRODUCTION_CORPUS) {
    const testKey = String(mock?.testKey || testKeyForTestId(mock?.testId)).toUpperCase();
    for (const section of ['readingWriting', 'math']) {
      for (const record of Array.isArray(mock?.[section]) ? mock[section] : []) {
        const questionId = String(record?.questionId || '');
        if (!questionId) continue;
        const key = `${testKey}::${questionId}`;
        if (map.has(key)) throw new Error(`Duplicate frozen production identity: ${key}`);
        map.set(key, { testKey, section, record });
      }
    }
  }
  return map;
}

function canonicalTargetPool(candidate, productionIndex) {
  const testKey = testKeyForTestId(candidate?.testId);
  const candidateSection = normalize(candidate?.section);
  const candidateModule = normalize(candidate?.module);
  const candidateDifficulty = normalize(candidate?.difficulty);
  const candidateQuestionType = normalize(candidate?.questionType);
  const candidateDomain = normalize(candidate?.domain);
  const canonicalSkill = canonicalSkillFor(candidate);

  return [...productionIndex.values()]
    .filter((entry) => entry.testKey === testKey)
    .filter((entry) => normalize(entry.section) === candidateSection)
    // Module and difficulty are canonical structural fields that may be normalized
    // from an existing production target. Do not allow changes to the content type,
    // domain, skill, or figure structure.
    .filter((entry) => normalize(entry.record.questionType) === candidateQuestionType)
    .filter((entry) => normalize(entry.record.domain) === candidateDomain)
    .filter((entry) => normalize(entry.record.skill) === canonicalSkill)
    .filter((entry) => {
      if (candidateSection !== 'math') return true;
      return JSON.stringify(figureSignature(candidate)) === JSON.stringify(figureSignature(entry.record));
    })
    .sort((a, b) => {
      const aDifficulty = Number(normalize(a.record.difficulty) !== candidateDifficulty);
      const bDifficulty = Number(normalize(b.record.difficulty) !== candidateDifficulty);
      const aModule = Number(normalize(a.record.module) !== candidateModule);
      const bModule = Number(normalize(b.record.module) !== candidateModule);
      return (aDifficulty - bDifficulty) ||
        (aModule - bModule) ||
        String(a.record.questionId).localeCompare(String(b.record.questionId));
    });
}

function explicitCandidateTarget(candidate, productionIndex) {
  if (!TARGET_AWARE) return null;
  const testKey = String(candidate?.metadata?.targetTestKey || '').trim().toUpperCase();
  const questionId = String(candidate?.metadata?.targetQuestionId || '').trim();
  if (!testKey || !questionId) return null;
  const exact = productionIndex.get(`${testKey}::${questionId}`);
  if (!exact) return null;
  if (normalize(exact.section) !== normalize(candidate?.section)) return null;
  if (normalize(exact.record.questionType) !== normalize(candidate?.questionType)) return null;
  if (normalize(exact.record.domain) !== normalize(candidate?.domain)) return null;
  if (normalize(exact.record.skill) !== normalize(candidate?.skill)) return null;
  if (normalize(candidate?.section) === 'math' &&
      JSON.stringify(figureSignature(candidate)) !== JSON.stringify(figureSignature(exact.record))) return null;
  return exact;
}

function previewCanonicalTarget(targetPool, sourceIndex, reservedTargetKeys, explicitTarget = null) {
  if (explicitTarget) {
    const key = `${explicitTarget.testKey}::${explicitTarget.record.questionId}`;
    return reservedTargetKeys.has(key) ? null : explicitTarget;
  }
  if (!Array.isArray(targetPool) || !targetPool.length) return null;
  const start = sourceIndex % targetPool.length;
  for (let offset = 0; offset < targetPool.length; offset += 1) {
    const entry = targetPool[(start + offset) % targetPool.length];
    const key = `${entry.testKey}::${entry.record.questionId}`;
    if (!reservedTargetKeys.has(key)) return entry;
  }
  return null;
}

function score(candidate) {
  const targets = candidate?.metadata?.remediationPool?.targetClasses || [];
  let value = targets.length * 10;
  if (targets.includes('rw-wic-target-diversity')) value += 20;
  if (targets.includes('rw-stimulus-length')) value += 8;
  if (targets.includes('rw-prompt-diversity')) value += 8;
  if (targets.includes('hard-reasoning-demand')) value += 6;
  if (targets.includes('math-distractor-construction')) value += 6;
  if (targets.includes('math-template-diversity')) value += 4;
  if (targets.includes('rw-template-diversity')) value += 4;
  if (candidate.difficulty === 'hard') value += 2;
  return value;
}

function main() {
  const source = readInput();
  const candidates = Array.isArray(source.candidates) ? source.candidates : [];
  if (!candidates.length) throw new Error('Candidate pool is empty.');

  const productionIndex = TARGET_AWARE ? buildProductionIndex() : null;
  const seenIds = new Set();
  const seenFingerprints = new Set();
  const selected = [];
  const rejected = [];
  const templateCounts = new Map();
  const promptChoiceSeen = new Set();
  const exactPromptSeen = new Set();
  const reservedTargetKeys = new Set();

  function semanticTemplate(candidate) {
    return String(candidate?.prompt || '')
      .trim().toLowerCase()
      .replace(/\b\d+(?:\.\d+)?\b/g, '#')
      .replace(/\b[a-z]\b/g, 'v')
      .replace(/\s+/g, ' ');
  }

  function promptChoiceSignature(candidate) {
    const template = semanticTemplate(candidate);
    const choices = Array.isArray(candidate?.choices)
      ? candidate.choices.map((choice) => String(choice || '').trim().toLowerCase().replace(/\b\d+(?:\.\d+)?\b/g, '#')).join(' || ')
      : '';
    return `${template}|${choices}`;
  }

  function preReviewEligible(candidate) {
    const prompt = String(candidate?.prompt || '');
    const explanation = String(candidate?.explanation || '');
    const section = String(candidate?.section || '');
    const choices = Array.isArray(candidate?.choices) ? candidate.choices : [];

    if (!prompt || !explanation) return false;
    if (section === 'reading-writing' && !/\b(which|what|how)\b/i.test(prompt)) return false;
    if (section === 'reading-writing' && explanation.length < 55) return false;

    if (section === 'math' && candidate?.difficulty === 'hard') {
      const signals = ['then', 'after', 'given that', 'if', 'must', 'because', 'compared with', 'change', 'relationship', 'model'];
      const signalCount = signals.filter((signal) => prompt.toLowerCase().includes(signal)).length;
      if (signalCount < 2) return false;
      if (!Array.isArray(candidate?.metadata?.difficultyFeatures) || !candidate.metadata.difficultyFeatures.includes('multi-step')) return false;
    }

    if (section === 'math' && candidate?.questionType === 'multiple-choice') {
      const architecture = candidate?.metadata?.distractor_architecture;
      if (!architecture?.profiles || Object.keys(architecture.profiles).length < 3) return false;
      if (choices.length !== 4) return false;
    }

    return true;
  }

  // Selection must enforce the same diversity ceiling used by the independent
  // review gate. The previous selector admitted the entire screened pool,
  // allowing large repeated-template clusters to fail the independent review
  // even when individual candidates were otherwise usable.
  const ordered = [...candidates].sort((a, b) => (score(b) - score(a)) || String(a.id).localeCompare(String(b.id)));
  for (const candidate of ordered) {
    const id = String(candidate.id || '');
    const fingerprint = String(candidate.originalityFingerprint || '');
    const productionMutation = candidate?.metadata?.productionMutation === true || candidate.releaseEligibility === true || candidate.status === 'operational';
    const exactPrompt = String(candidate?.prompt || '').trim().toLowerCase().replace(/\s+/g, ' ');
    const template = semanticTemplate(candidate);
    const promptChoice = promptChoiceSignature(candidate);
    const templateCount = templateCounts.get(template) || 0;
    const targetPool = TARGET_AWARE ? canonicalTargetPool(candidate, productionIndex) : [];
    const sourceIndex = Math.abs(Number(candidate?.metadata?.remediationPool?.sourceIndex || 0));
    const explicitTarget = TARGET_AWARE ? explicitCandidateTarget(candidate, productionIndex) : null;
    const previewTarget = TARGET_AWARE
      ? previewCanonicalTarget(targetPool, sourceIndex, reservedTargetKeys, explicitTarget)
      : null;
    const eligible = id && fingerprint && !seenIds.has(id) && !seenFingerprints.has(fingerprint) && !productionMutation &&
      exactPrompt && !exactPromptSeen.has(exactPrompt) && !promptChoiceSeen.has(promptChoice) && templateCount < 3 && preReviewEligible(candidate) &&
      (!TARGET_AWARE || Boolean(explicitTarget) && Boolean(previewTarget));
    if (!eligible) {
      let reason = 'duplicate-or-missing-identity';
      if (productionMutation) {
        reason = 'production-or-release-boundary-violation';
      } else if (!id || !fingerprint) {
        reason = 'duplicate-or-missing-identity';
      } else if (templateCount >= 3) {
        reason = 'semantic-template-review-ceiling';
      } else if (exactPromptSeen.has(exactPrompt)) {
        reason = 'duplicate-normalized-prompt';
      } else if (promptChoiceSeen.has(promptChoice)) {
        reason = 'duplicate-prompt-choice-construction';
      } else if (TARGET_AWARE && (!canonicalTargetPool(candidate, productionIndex).length || !explicitTarget || !previewTarget)) {
        reason = 'explicit-target-not-compatible-or-available';
      } else if (!preReviewEligible(candidate)) {
        reason = 'pre-review-substantive-screen';
      }
      rejected.push({ id, reason });
      continue;
    }
    seenIds.add(id);
    seenFingerprints.add(fingerprint);
    exactPromptSeen.add(exactPrompt);
    promptChoiceSeen.add(promptChoice);
    templateCounts.set(template, templateCount + 1);
    if (TARGET_AWARE && previewTarget) reservedTargetKeys.add(`${previewTarget.testKey}::${previewTarget.record.questionId}`);
    selected.push({
      ...candidate,
      selection: {
        selected: true,
        selectionScore: score(candidate),
        independentReviewRequired: true,
        diversitySelection: { semanticTemplateLimit: 3, exactPromptLimit: 1, promptChoiceLimit: 1 },
        canonicalTargetCompatibility: TARGET_AWARE ? {
          eligible: true,
          resolutionMode: 'explicit-target-key-v1',
          availableTargetCount: explicitTarget ? 1 : targetPool.length,
          explicitTargetTestKey: explicitTarget?.testKey || null,
          explicitTargetQuestionId: explicitTarget?.record?.questionId || null,
          canonicalSkill: canonicalSkillFor(candidate),
          sourceModule: candidate.module,
          sourceDifficulty: candidate.difficulty,
          previewTargetModule: previewTarget?.record?.module || null,
          previewTargetDifficulty: previewTarget?.record?.difficulty || null,
        } : null,
        productionMutation: false,
        releaseEligible: false,
        sat21Created: false
      }
    });
  }

  selected.sort((a, b) => (b.selection.selectionScore - a.selection.selectionScore) || String(a.id).localeCompare(String(b.id)));

  const coverage = {};
  for (const candidate of selected) {
    for (const target of candidate?.metadata?.remediationPool?.targetClasses || []) coverage[target] = (coverage[target] || 0) + 1;
  }

  const result = {
    reportType: 'batch-m-deep-content-quality-candidate-selection',
    date: SELECTION_DATE,
    sourceArtifact: path.basename(INPUT),
    sourceGeneratedCount: source.generatedCount ?? null,
    sourceAcceptedCount: candidates.length,
    selectedCount: selected.length,
    rejectedCount: rejected.length,
    coverage,
    candidates: selected,
    rejected,
    productionMutation: false,
    releaseEligible: false,
    sat21Created: false,
    targetAware: TARGET_AWARE,
  acceptanceDecision: selected.length === 25 ? 'SELECTED_FOR_INDEPENDENT_REVIEW' : 'SELECTION_INCOMPLETE',
    nextStep: 'Independent review of the pre-screened selected candidates against target-specific substantive quality requirements; no production mutation is authorized.'
  };

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(result, null, 2));
  fs.writeFileSync(OUTPUT_MD, `# Batch M deep content-quality candidate selection — ${SELECTION_DATE}\n\n- Source accepted pool: **${candidates.length}**.\n- Selected for independent review: **${selected.length}**.\n- Canonical-target-aware selection: **${TARGET_AWARE}**.\n- Rejected at selection boundary: **${rejected.length}**.\n- Production mutation: **false**.\n- Release eligible: **false**.\n- SAT21 created: **false**.\n\n## Target-class coverage\n\n${Object.entries(coverage).map(([key, value]) => `- ${key}: **${value}** selected`).join('\n')}\n\nSelection is deterministic and candidate-only. It does not replace, modify, delete, or release any production question. Independent substantive review is required before any production mutation can be considered.\n`);
  if (TARGET_AWARE && selected.length !== 25) {
    const rejectionCounts = rejected.reduce((acc, item) => {
      acc[item.reason] = (acc[item.reason] || 0) + 1;
      return acc;
    }, {});
    throw new Error(`Canonical-target-aware selection produced ${selected.length} candidates; exactly 25 are required. Rejections=${JSON.stringify(rejectionCounts)}`);
  }
  console.log(JSON.stringify({ status: result.acceptanceDecision, sourceAcceptedCount: candidates.length, selectedCount: selected.length, rejectedCount: rejected.length, coverage, targetAware: TARGET_AWARE, productionMutation: false, releaseEligible: false, sat21Created: false }, null, 2));
}

main();
