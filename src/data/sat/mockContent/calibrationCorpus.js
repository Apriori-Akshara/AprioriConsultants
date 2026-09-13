/**
 * Batch K — private calibration-corpus adapter.
 *
 * Production code never contains official anchor text. Calibration records are
 * metadata-only in this repository and may reference locally supplied,
 * gitignored anchor files through SAT_CALIBRATION_CORPUS_DIR.
 */

import fs from 'fs';
import path from 'path';

export const CALIBRATION_DOMAINS = Object.freeze([
  'information-and-ideas',
  'craft-and-structure',
  'expression-of-ideas',
  'standard-english-conventions',
  'algebra',
  'advanced-math',
  'problem-solving-and-data-analysis',
  'geometry-and-trigonometry',
]);

export const CALIBRATION_DIFFICULTIES = Object.freeze(['easy', 'medium', 'hard']);

const REQUIRED_FIELDS = Object.freeze([
  'id',
  'domain',
  'difficulty',
  'skill',
  'sourceFamily',
  'textType',
  'rhetoricalPattern',
  'questionConstruction',
  'cognitiveDemand',
  'distractorBehavior',
  'figureDataType',
]);

const DEFAULT_TARGETS = Object.freeze({
  'information-and-ideas': { sourceFamilies: ['science', 'history-social-science', 'humanities'], cognitiveDemands: ['identify', 'infer', 'evaluate'] },
  'craft-and-structure': { sourceFamilies: ['literature', 'humanities', 'science'], cognitiveDemands: ['interpret', 'evaluate', 'synthesize'] },
  'expression-of-ideas': { sourceFamilies: ['history-social-science', 'humanities', 'science'], cognitiveDemands: ['evaluate', 'synthesize'] },
  'standard-english-conventions': { sourceFamilies: ['general-prose'], cognitiveDemands: ['evaluate', 'apply'] },
  algebra: { sourceFamilies: ['quantitative-context', 'symbolic'], cognitiveDemands: ['apply', 'reason', 'analyze'] },
  'advanced-math': { sourceFamilies: ['symbolic', 'quantitative-context'], cognitiveDemands: ['apply', 'reason', 'analyze'] },
  'problem-solving-and-data-analysis': { sourceFamilies: ['data-context'], cognitiveDemands: ['apply', 'analyze', 'reason'] },
  'geometry-and-trigonometry': { sourceFamilies: ['geometric-context', 'diagram'], cognitiveDemands: ['apply', 'analyze', 'reason'] },
});

function assertSafeRecord(record, source) {
  if (!record || typeof record !== 'object' || Array.isArray(record)) {
    throw new Error(`Calibration record in ${source} must be an object.`);
  }
  const missing = REQUIRED_FIELDS.filter((field) => record[field] === undefined || record[field] === null || record[field] === '');
  if (missing.length) throw new Error(`Calibration record ${record.id || '(missing id)'} is missing: ${missing.join(', ')}.`);
  if (!CALIBRATION_DOMAINS.includes(record.domain)) throw new Error(`Calibration record ${record.id} has unsupported domain ${record.domain}.`);
  if (!CALIBRATION_DIFFICULTIES.includes(record.difficulty)) throw new Error(`Calibration record ${record.id} has unsupported difficulty ${record.difficulty}.`);
  if (typeof record.anchorFile !== 'string' || !record.anchorFile.trim()) {
    throw new Error(`Calibration record ${record.id} must identify a private anchorFile; official anchor text must not be stored in repository source.`);
  }
  return record;
}

function readJsonFile(filePath) {
  const parsed = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return Array.isArray(parsed) ? parsed : [parsed];
}

export function loadCalibrationCorpus(corpusDir = process.env.SAT_CALIBRATION_CORPUS_DIR) {
  if (!corpusDir) return [];
  const resolved = path.resolve(corpusDir);
  if (!fs.existsSync(resolved)) return [];

  const records = [];
  const visit = (currentDir) => {
    for (const entry of fs.readdirSync(currentDir, { withFileTypes: true })) {
      const entryPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) visit(entryPath);
      else if (entry.isFile() && entry.name.endsWith('.json')) {
        readJsonFile(entryPath).forEach((record) => records.push(assertSafeRecord(record, entryPath)));
      }
    }
  };
  visit(resolved);
  return records;
}

export function getCalibrationTargets(domain) {
  return DEFAULT_TARGETS[domain] || { sourceFamilies: [], cognitiveDemands: [] };
}

export function selectCalibrationAnchors(records, { domain, difficulty, limit = 5 } = {}) {
  const matches = (records || []).filter((record) =>
    (!domain || record.domain === domain) && (!difficulty || record.difficulty === difficulty)
  );
  return matches.slice(0, Math.max(0, Number(limit) || 0));
}

export function summarizeCalibrationCorpus(records = []) {
  const summary = { total: 0, byDomain: {}, byDifficulty: { easy: 0, medium: 0, hard: 0 } };
  records.forEach((record) => {
    summary.total += 1;
    summary.byDomain[record.domain] = (summary.byDomain[record.domain] || 0) + 1;
    if (summary.byDifficulty[record.difficulty] !== undefined) summary.byDifficulty[record.difficulty] += 1;
  });
  return summary;
}

export function validateCalibrationCorpus(records) {
  if (!Array.isArray(records)) throw new Error('Calibration corpus must be an array.');
  const ids = new Set();
  records.forEach((record) => {
    assertSafeRecord(record, 'calibration corpus');
    if (ids.has(record.id)) throw new Error(`Duplicate calibration record id: ${record.id}.`);
    ids.add(record.id);
  });
  return { ok: true, summary: summarizeCalibrationCorpus(records) };
}

export default {
  CALIBRATION_DOMAINS,
  CALIBRATION_DIFFICULTIES,
  loadCalibrationCorpus,
  getCalibrationTargets,
  selectCalibrationAnchors,
  summarizeCalibrationCorpus,
  validateCalibrationCorpus,
};
