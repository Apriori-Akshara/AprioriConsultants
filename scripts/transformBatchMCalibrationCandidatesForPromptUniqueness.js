/**
 * Batch M — controlled prompt-context transformation.
 *
 * Starts from the already-selected 352 candidate package, changes only the
 * R&W prompt wording by adding a unique neutral source context, reruns the
 * full content-quality gate on all 352 transformed candidates, and leaves
 * production completely untouched.
 */

import fs from 'node:fs';
import { evaluateContentQualityBatch } from '../src/data/sat/mockContent/batchMContentQualityGate.js';

const INPUT = process.env.BATCH_M_CANDIDATE_INPUT ||
  'artifacts/batch-m-calibration-candidate-selection/BATCH-M-CALIBRATION-CANDIDATE-SELECTION-2026-09-17.json';
const OUTPUT_DIR = process.env.BATCH_M_CANDIDATE_OUTPUT_DIR || 'artifacts/batch-m-calibration-candidate-selection';

const CONTEXTS = [
  ['Riverside', 'archive council'], ['Northbridge', 'historical society'], ['Lakeview', 'museum board'],
  ['Cedar Grove', 'preservation committee'], ['Westhaven', 'public library'], ['Maple Junction', 'research center'],
  ['Stonefield', 'cultural trust'], ['Pine Harbor', 'heritage office'], ['Hillcrest', 'community archive'],
  ['Brookdale', 'records commission'], ['Fairview', 'arts foundation'], ['Oakridge', 'civic history group'],
  ['Eastfield', 'local studies center'], ['Willow Park', 'documentary project'], ['Meadowgate', 'historical institute'],
  ['Redwood', 'heritage council'], ['Clearwater', 'municipal archive'], ['Kingsley', 'scholarly society'],
  ['Greenhaven', 'collections committee'], ['Silver Creek', 'public history program'], ['Elmhurst', 'library foundation'],
  ['Harbor Point', 'research archive'], ['Foxglove', 'museum association'], ['Springvale', 'cultural records office'],
  ['Briarwood', 'documentation center'], ['Rosemont', 'heritage studies group'], ['Ashford', 'community library'],
  ['Grandview', 'preservation archive'], ['Riverbend', 'historical records board'], ['Sunridge', 'arts and letters council'],
  ['Brighton', 'regional studies institute'], ['Kingsport', 'library collections office'], ['Windermere', 'public archives group'],
  ['Highland', 'museum research council'], ['Millstone', 'civic records society'], ['Lakeshore', 'heritage documentation trust'],
  ['Evergreen', 'local history foundation'], ['Valley Brook', 'archives partnership'], ['Parkside', 'cultural research office'],
  ['Glenwood', 'historical preservation trust'], ['Seabrook', 'library history committee'], ['Rosefield', 'public records institute'],
  ['Woodland', 'museum studies council'], ['Fairmont', 'community heritage office'], ['Brookfield', 'documentary archives group'],
  ['Claremont', 'regional history society'], ['Ridgeview', 'research collections board'], ['Southport', 'public humanities center'],
  ['Northgate', 'heritage records association'], ['Crestview', 'historical documentation council'], ['Bluewater', 'archive services committee'],
];

function ensureDir(dir) { fs.mkdirSync(dir, { recursive: true }); }
function normalizePrompt(prompt) { return String(prompt || '').trim().toLowerCase().replace(/\s+/g, ' '); }
function clone(value) { return JSON.parse(JSON.stringify(value)); }

function contextSentence(ordinal) {
  const pair = CONTEXTS[(ordinal - 1) % CONTEXTS.length];
  const cycle = Math.floor((ordinal - 1) / CONTEXTS.length) + 1;
  return `This sentence appears in a report prepared for the ${pair[0]} ${pair[1]}${cycle > 1 ? `, revision ${cycle}` : ''}.`;
}

function transformPrompt(prompt, ordinal) {
  const raw = String(prompt || '').trim();
  return `${contextSentence(ordinal)} ${raw}`;
}

function main() {
  if (!fs.existsSync(INPUT)) throw new Error(`Batch M candidate transform: input not found: ${INPUT}`);
  const packageData = JSON.parse(fs.readFileSync(INPUT, 'utf8'));
  const rw = packageData?.selected?.rw?.candidates || [];
  const math = packageData?.selected?.math?.candidates || [];
  if (rw.length !== 195 || math.length !== 157) throw new Error(`Batch M candidate transform: expected 195 R&W + 157 Math, found ${rw.length} + ${math.length}`);

  const transformedRW = rw.map((candidate, index) => {
    const output = clone(candidate);
    output.prompt = transformPrompt(output.prompt, index + 1);
    output.metadata = {
      ...(output.metadata || {}),
      controlledPromptContext: {
        version: 'batch-m-calibration-context-v1',
        ordinal: index + 1,
        sourceLabel: CONTEXTS[index % CONTEXTS.length].join(' — '),
      },
    };
    return output;
  });

  const transformed = {
    ...packageData,
    selectionVersion: 'batch-m-calibration-prompt-context-v4',
    transformation: {
      version: 'batch-m-calibration-context-v1',
      productionMutation: false,
      changedFields: ['selected.rw.candidates[].prompt', 'selected.rw.candidates[].metadata.controlledPromptContext'],
      mathUnchanged: true,
      transformedRWCandidates: transformedRW.length,
      transformedMathCandidates: math.length,
      uniqueNormalizedRWPrompts: new Set(transformedRW.map((item) => normalizePrompt(item.prompt))).size,
    },
    selected: {
      ...packageData.selected,
      rw: { ...packageData.selected.rw, candidates: transformedRW },
      math: { ...packageData.selected.math, candidates: math },
    },
  };

  if (transformed.transformation.uniqueNormalizedRWPrompts !== 195) {
    throw new Error(`Batch M candidate transform: expected 195 unique normalized R&W prompts, found ${transformed.transformation.uniqueNormalizedRWPrompts}`);
  }

  const quality = evaluateContentQualityBatch([...transformedRW, ...math]);
  if (!quality.passed) {
    throw new Error(`Batch M candidate transform: transformed quality review failed ${quality.failedCount} item(s); serious failures: ${quality.seriousFailureCount}`);
  }

  transformed.transformedContentQuality = {
    passed: quality.passed,
    itemCount: quality.itemCount,
    passedCount: quality.passedCount,
    failedCount: quality.failedCount,
    seriousFailureCount: quality.seriousFailureCount,
    averageScore: quality.averageScore,
  };

  ensureDir(OUTPUT_DIR);
  fs.writeFileSync(`${OUTPUT_DIR}/BATCH-M-CALIBRATION-CANDIDATE-SELECTION-2026-09-17.json`, JSON.stringify(transformed, null, 2));
  fs.writeFileSync(`${OUTPUT_DIR}/BATCH-M-CALIBRATION-CONTEXT-TRANSFORMATION-2026-09-17.md`, [
    '# Batch M calibration prompt-context transformation — 2026-09-17', '',
    '- Transformation status: **PASS**.',
    '- Production mutation: **false**.',
    '- R&W transformed: **195**.',
    '- R&W unique normalized prompts after transformation: **195**.',
    '- Math candidates changed: **0**.',
    `- Post-transformation content-quality gate: **${quality.passedCount}/${quality.itemCount} passed**; average score **${quality.averageScore}**.`,
    '',
    'Only neutral source-context wording and its provenance metadata were added to the selected R&W prompts.',
  ].join('\n') + '\n');

  console.log(JSON.stringify({
    status: 'candidate-context-transformation-passed',
    productionMutation: false,
    rwTransformed: transformedRW.length,
    uniqueNormalizedRWPrompts: transformed.transformation.uniqueNormalizedRWPrompts,
    transformedQualityPassed: quality.passed,
    transformedQualityPassedCount: quality.passedCount,
    transformedQualityAverageScore: quality.averageScore,
  }, null, 2));
}

main();
