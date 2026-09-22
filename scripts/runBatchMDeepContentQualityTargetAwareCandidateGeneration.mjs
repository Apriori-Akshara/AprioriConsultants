/**
 * Batch M — deterministic target-aware 25-candidate generator.
 *
 * Reads the frozen targeted-replacement preparation inventory, selects exactly
 * 25 real existing production targets, generates candidate-only repaired variants
 * from those exact records, and never mutates production.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  BATCH_M_ACCEPTED_PRODUCTION_CORPUS,
} from '../src/data/sat/mockContent/batchMProductionStore.js';
import { BATCH_M_PRODUCTION_SEQUENCE } from '../src/data/sat/mockContent/batchMProductionController.js';
import {
  repairQuestion,
  stamp,
  targetClasses,
  testKeyOf,
} from './runBatchMDeepContentQualityTargetCandidates.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const INVENTORY_INPUT = process.env.BATCH_M_TARGET_INVENTORY_INPUT ||
  path.join(root, 'docs/BATCH-M-TARGETED-REPLACEMENT-PREPARATION-2026-09-15.json');
const DATE = process.env.BATCH_M_TARGET_DATE || '2026-09-22';
const OUTPUT_DIR = process.env.BATCH_M_TARGET_OUTPUT_DIR ||
  path.join(root, 'artifacts/batch-m-deep-content-quality-target-candidates');
const OUTPUT_JSON = path.join(
  OUTPUT_DIR,
  'BATCH-M-DEEP-CONTENT-QUALITY-TARGET-CANDIDATES-' + DATE + '.json'
);
const OUTPUT_MD = path.join(
  OUTPUT_DIR,
  'BATCH-M-DEEP-CONTENT-QUALITY-TARGET-CANDIDATES-' + DATE + '.md'
);
const TARGET_COUNT = 25;
const TEST_KEYS = [
  'SAT1','SAT2','SAT3','SAT4','SAT5','SAT6','SAT7','SAT8','SAT9','SAT10',
  'PSAT1','PSAT2','PSAT3','PSAT4','PSAT5','PSAT6','PSAT7','PSAT8','PSAT9','PSAT10',
];

const clone = (value) => JSON.parse(JSON.stringify(value));

function readJson(file) {
  if (!fs.existsSync(file)) throw new Error('Required target inventory not found: ' + file);
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function tracksOf(target) {
  const flags = new Set(Array.isArray(target?.flags) ? target.flags : []);
  const tracks = [];
  if (flags.has('math-generic-numeric-distractor')) tracks.push('MATH_DISTRACTOR_REMEDIATION');
  if (flags.has('rw-fixed-wic-target')) tracks.push('RW_WIC_REMEDIATION');
  if (flags.has('rw-template-density')) tracks.push('RW_CONSTRUCTION_REMEDIATION');
  if (flags.has('hard-label-without-demand-feature')) tracks.push('DIFFICULTY_CALIBRATION');
  return tracks;
}

function score(target) {
  const flags = new Set(Array.isArray(target?.flags) ? target.flags : []);
  return (target?.priority === 'HIGH' ? 100 : 0) +
    (target?.remediationType === 'CONTENT_REPLACEMENT' ? 30 : 0) +
    (flags.has('math-generic-numeric-distractor') ? 40 : 0) +
    (flags.has('rw-fixed-wic-target') ? 30 : 0) +
    (flags.has('rw-template-density') ? 25 : 0);
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
    if (!Array.isArray(candidate?.metadata?.difficultyFeatures) ||
        !candidate.metadata.difficultyFeatures.includes('multi-step')) return false;
  }

  if (section === 'math' && candidate?.questionType === 'multiple-choice') {
    const architecture = candidate?.metadata?.distractor_architecture;
    if (!architecture?.profiles || Object.keys(architecture.profiles).length < 3) return false;
    if (choices.length !== 4) return false;
  }

  return true;
}

function semanticTemplate(candidate) {
  return String(candidate?.prompt || '')
    .trim()
    .toLowerCase()
    .replace(/\b\d+(?:\.\d+)?\b/g, '#')
    .replace(/\b[a-z]\b/g, 'v')
    .replace(/\s+/g, ' ');
}

function promptChoiceSignature(candidate) {
  const choices = Array.isArray(candidate?.choices)
    ? candidate.choices.map((choice) =>
        String(choice || '').trim().toLowerCase().replace(/\b\d+(?:\.\d+)?\b/g, '#')
      ).join(' || ')
    : '';
  return semanticTemplate(candidate) + '|' + choices;
}

function candidateSelectionEligible(candidate, state) {
  if (!preReviewEligible(candidate)) return false;
  const exactPrompt = String(candidate?.prompt || '').trim().toLowerCase().replace(/\s+/g, ' ');
  const template = semanticTemplate(candidate);
  const promptChoice = promptChoiceSignature(candidate);
  if (!exactPrompt || state.exactPrompts.has(exactPrompt)) return false;
  if (state.promptChoices.has(promptChoice)) return false;
  if ((state.templates.get(template) || 0) >= 3) return false;
  return true;
}

function addStateCandidate(candidate, state) {
  state.exactPrompts.add(String(candidate.prompt || '').trim().toLowerCase().replace(/\s+/g, ' '));
  const template = semanticTemplate(candidate);
  state.templates.set(template, (state.templates.get(template) || 0) + 1);
  state.promptChoices.add(promptChoiceSignature(candidate));
}

function eligibleInventory(inventory) {
  const eligible = [];
  const seen = new Set();
  for (const item of Array.isArray(inventory?.questions) ? inventory.questions : []) {
    const testKey = String(item?.testKey || '').trim().toUpperCase();
    const questionId = String(item?.questionId || '').trim();
    const key = testKey + '|' + questionId;
    if (!TEST_KEYS.includes(testKey) || !questionId || seen.has(key)) continue;
    if (item?.productionMutation === true || item?.replacementAuthorized === true) continue;
    if (String(item?.remediationType || '') !== 'CONTENT_REPLACEMENT') continue;
    if (!(Array.isArray(item?.classifications) &&
          item.classifications.includes('HIGH_CONFIDENCE_CONTENT_REVIEW'))) continue;
    eligible.push({ ...clone(item), testKey });
    seen.add(key);
  }
  return eligible.sort((a,b) =>
    (score(b)-score(a)) ||
    a.testKey.localeCompare(b.testKey) ||
    String(a.questionId).localeCompare(String(b.questionId))
  );
}

function buildTargetSet(inventory, productionTargets) {
  const eligible = eligibleInventory(inventory);
  const selected = [];
  const selectedKeys = new Set();
  const selectedCandidates = new Map();
  const state = {
    exactPrompts: new Set(),
    templates: new Map(),
    promptChoices: new Set(),
  };

  function tryAdd(target) {
    const key = target.testKey + '|' + target.questionId;
    if (selectedKeys.has(key)) return false;
    const source = productionTargets.get(key);
    if (!source) return false;
    const candidate = buildCandidate(target, source, selected.length);
    if (!candidateSelectionEligible(candidate, state)) return false;
    selected.push(target);
    selectedKeys.add(key);
    selectedCandidates.set(key, candidate);
    addStateCandidate(candidate, state);
    return true;
  }

  // Guarantee at least one selector-compatible target from every audited test.
  for (let i = 0; i < TEST_KEYS.length; i += 1) {
    const testKey = TEST_KEYS[i];
    const preferredTrack = [
      'MATH_DISTRACTOR_REMEDIATION',
      'RW_WIC_REMEDIATION',
      'RW_CONSTRUCTION_REMEDIATION',
      'MATH_DISTRACTOR_REMEDIATION',
    ][i % 4];

    const sameTest = eligible
      .filter((item) => item.testKey === testKey)
      .sort((a,b) =>
        (Number(targetTracks(b).includes(preferredTrack)) - Number(targetTracks(a).includes(preferredTrack))) ||
        (score(b)-score(a)) ||
        String(a.questionId).localeCompare(String(b.questionId))
      );

    if (!sameTest.some(tryAdd)) {
      throw new Error('No selector-compatible content-replacement target found for ' + testKey);
    }
  }

  while (selected.length < TARGET_COUNT) {
    const remaining = eligible.filter((item) => !selectedKeys.has(item.testKey + '|' + item.questionId));
    let added = false;
    for (const target of remaining) {
      if (tryAdd(target)) {
        added = true;
        break;
      }
    }
    if (!added) {
      throw new Error('Unable to fill exactly 25 selector-compatible target candidates. Selected=' + selected.length);
    }
  }

  const targetKeys = new Set(selected.map((item) => item.testKey + '|' + item.questionId));
  if (selected.length !== TARGET_COUNT || targetKeys.size !== TARGET_COUNT) {
    throw new Error('Target-aware generator did not produce exactly 25 unique selector-compatible targets.');
  }
  return { eligibleCount: eligible.length, targets: selected, candidates: selectedCandidates };
}
function productionIndex() {
  const index = new Map();
  for (const mock of BATCH_M_ACCEPTED_PRODUCTION_CORPUS) {
    const testKey = testKeyOf(mock);
    for (const section of ['readingWriting','math']) {
      for (const question of Array.isArray(mock?.[section]) ? mock[section] : []) {
        const questionId = String(question?.questionId || '').trim();
        if (!questionId) continue;
        index.set(testKey + '|' + questionId, {
          testKey,
          testId: String(mock?.testId || ''),
          section,
          question,
        });
      }
    }
  }
  return index;
}

function buildCandidate(target, source, index) {
  const checks = Array.isArray(target?.flags) ? target.flags : [];
  const repaired = repairQuestion(source.question, checks, index);
  const candidate = stamp(repaired, {
    testKey: target.testKey,
    questionId: target.questionId,
    checks,
  }, index);

  candidate.metadata = {
    ...(candidate.metadata || {}),
    targetInventory: {
      source: path.basename(INVENTORY_INPUT),
      inventoryVersion: 'frozen-target-inventory-v1',
      targetTestKey: target.testKey,
      targetQuestionId: target.questionId,
      targetSection: target.section,
      targetDomain: target.domain,
      targetSkill: target.skill,
      targetDifficulty: target.difficulty,
      targetFlags: checks,
      targetRemediationType: target.remediationType,
      targetPriority: target.priority,
      targetTracks: target.tracks || tracksOf(target),
      variantIndex: index,
    },
    remediationPool: {
      ...(candidate.metadata?.remediationPool || {}),
      version: 'batch-m-target-specific-v3',
      sourceIndex: index,
      targetClasses: targetClasses(candidate.section, checks),
      targetTestKey: target.testKey,
      targetQuestionId: target.questionId,
    },
    productionMutation: false,
    candidateOnly: true,
  };

  return candidate;
}

function main() {
  const inventory = readJson(INVENTORY_INPUT);
  const index = productionIndex();
  const targetSet = buildTargetSet(inventory, index);
  const candidates = targetSet.targets.map((target) =>
    targetSet.candidates.get(target.testKey + '|' + target.questionId)
  );
  const unresolved = [];

  const targetKeys = new Set(candidates.map((q) =>
    String(q?.metadata?.targetTestKey || '') + '|' + String(q?.metadata?.targetQuestionId || '')
  ));
  const candidateIds = new Set(candidates.map((q) => String(q?.id || '')));

  if (unresolved.length || candidates.length !== TARGET_COUNT ||
      targetKeys.size !== TARGET_COUNT || candidateIds.size !== TARGET_COUNT) {
    throw new Error('Target-aware candidate generation incomplete: ' + JSON.stringify({
      targetCount: TARGET_COUNT,
      candidateCount: candidates.length,
      unresolvedCount: unresolved.length,
      targetCoverage: targetKeys.size,
      candidateIdentityCoverage: candidateIds.size,
    }));
  }

  const testCoverage = {};
  const trackCoverage = {};
  for (const candidate of candidates) {
    const inventoryMeta = candidate.metadata?.targetInventory || {};
    const testKey = String(inventoryMeta.targetTestKey || '');
    testCoverage[testKey] = (testCoverage[testKey] || 0) + 1;
    for (const track of Array.isArray(inventoryMeta.targetTracks) ? inventoryMeta.targetTracks : []) {
      trackCoverage[track] = (trackCoverage[track] || 0) + 1;
    }
  }

  const result = {
    reportType: 'batch-m-deep-content-quality-target-candidates',
    date: DATE,
    sourceTargetInventory: path.basename(INVENTORY_INPUT),
    frozenTargetCount: TARGET_COUNT,
    eligibleInventoryCount: targetSet.eligibleCount,
    candidateCount: candidates.length,
    unresolvedCount: unresolved.length,
    targets: targetSet.targets,
    candidates,
    unresolved,
    testCoverage,
    trackCoverage,
    productionMutation: false,
    releaseEligible: false,
    sat21Created: false,
    replacementAuthorization: 'NOT_AUTHORIZED',
    acceptanceDecision: 'TARGET_SPECIFIC_25_CANDIDATES_GENERATED',
    nextStep: 'Run exact-target-aware candidate selection, independent review, canonical normalization, post-normalization review, and final hypothetical replacement validation. No production mutation is authorized.',
  };

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(result, null, 2) + '\n', 'utf8');
  fs.writeFileSync(OUTPUT_MD, [
    '# Batch M target-aware 25-candidate generation — ' + DATE,
    '',
    '- Eligible frozen inventory records considered: **' + targetSet.eligibleCount + '**.',
    '- Exact frozen production targets selected: **' + targetSet.targets.length + '**.',
    '- Target-specific candidates generated: **' + candidates.length + '**.',
    '- Exact target coverage: **' + targetKeys.size + '**.',
    '- Unresolved targets: **' + unresolved.length + '**.',
    '- Production mutation: **false**.',
    '- Release eligible: **false**.',
    '- SAT21 created: **false**.',
    '- Replacement authorization: **NOT_AUTHORIZED**.',
    '',
    'The candidate content is generated directly from the selected existing frozen production target records and retains an explicit candidate-to-target mapping. Difficulty-only targets are excluded from this fixed package.',
    '',
    '## Test coverage',
    '',
    ...Object.entries(testCoverage).sort().map(([k,v]) => '- ' + k + ': **' + v + '** candidate'),
    '',
    '## Target-track coverage',
    '',
    ...Object.entries(trackCoverage).sort().map(([k,v]) => '- ' + k + ': **' + v + '** target flags'),
    '',
  ].join('\n') + '\n');

  console.log(JSON.stringify({
    status: result.acceptanceDecision,
    eligibleInventoryCount: result.eligibleInventoryCount,
    candidateCount: result.candidateCount,
    exactTargetCoverage: targetKeys.size,
    unresolvedCount: result.unresolvedCount,
    productionMutation: false,
    releaseEligible: false,
    replacementAuthorization: 'NOT_AUTHORIZED',
    sat21Created: false,
  }, null, 2));
}

main();
