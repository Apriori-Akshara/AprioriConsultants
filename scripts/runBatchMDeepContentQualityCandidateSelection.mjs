/**
 * Batch M — controlled candidate selection for deep content-quality remediation.
 *
 * Reads the already-screened candidate artifact from the candidate-generation
 * workflow, deterministically selects candidates for independent review, and
 * never mutates production or authorizes release.
 */
import fs from 'node:fs';
import path from 'node:path';

const INPUT = process.env.BATCH_M_CANDIDATE_INPUT || 'artifacts/batch-m-deep-content-quality-remediation-candidates/BATCH-M-DEEP-CONTENT-QUALITY-REMEDIATION-CANDIDATES-2026-09-17.json';
const OUTPUT_DIR = 'artifacts/batch-m-deep-content-quality-candidate-selection';
const OUTPUT_JSON = `${OUTPUT_DIR}/BATCH-M-DEEP-CONTENT-QUALITY-CANDIDATE-SELECTION-2026-09-17.json`;
const OUTPUT_MD = `${OUTPUT_DIR}/BATCH-M-DEEP-CONTENT-QUALITY-CANDIDATE-SELECTION-2026-09-17.md`;

function readInput() {
  if (!fs.existsSync(INPUT)) throw new Error(`Candidate artifact not found: ${INPUT}`);
  return JSON.parse(fs.readFileSync(INPUT, 'utf8'));
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

  const seenIds = new Set();
  const seenFingerprints = new Set();
  const selected = [];
  const rejected = [];
  const templateCounts = new Map();
  const promptChoiceSeen = new Set();
  const exactPromptSeen = new Set();

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
    if (section === 'reading-writing' && !/\\b(which|what|how)\\b/i.test(prompt)) return false;
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
    const eligible = id && fingerprint && !seenIds.has(id) && !seenFingerprints.has(fingerprint) && !productionMutation &&
      exactPrompt && !exactPromptSeen.has(exactPrompt) && !promptChoiceSeen.has(promptChoice) && templateCount < 3 && preReviewEligible(candidate);
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
    selected.push({
      ...candidate,
      selection: {
        selected: true,
        selectionScore: score(candidate),
        independentReviewRequired: true,
        diversitySelection: { semanticTemplateLimit: 3, exactPromptLimit: 1, promptChoiceLimit: 1 },
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
    date: '2026-09-17',
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
    acceptanceDecision: 'SELECTED_FOR_INDEPENDENT_REVIEW',
    nextStep: 'Independent review of the pre-screened selected candidates against target-specific substantive quality requirements; no production mutation is authorized.'
  };

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(result, null, 2));
  fs.writeFileSync(OUTPUT_MD, `# Batch M deep content-quality candidate selection — 2026-09-17\n\n- Source accepted pool: **${candidates.length}**.\n- Selected for independent review: **${selected.length}**.\n- Rejected at selection boundary: **${rejected.length}**.\n- Production mutation: **false**.\n- Release eligible: **false**.\n- SAT21 created: **false**.\n\n## Target-class coverage\n\n${Object.entries(coverage).map(([key, value]) => `- ${key}: **${value}** selected`).join('\n')}\n\nSelection is deterministic and candidate-only. It does not replace, modify, delete, or release any production question. Independent substantive review is required before any production mutation can be considered.\n`);
  console.log(JSON.stringify({ status: result.acceptanceDecision, sourceAcceptedCount: candidates.length, selectedCount: selected.length, rejectedCount: rejected.length, coverage, productionMutation: false, releaseEligible: false, sat21Created: false }, null, 2));
}

main();
