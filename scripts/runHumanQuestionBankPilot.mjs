import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { BATCH_M_ACCEPTED_PRODUCTION_CORPUS } from '../src/data/sat/mockContent/batchMProductionStore.js';

const mock = BATCH_M_ACCEPTED_PRODUCTION_CORPUS.find((item) => String(item?.testId || '').toLowerCase() === 'sat-series-a-mock-01');
if (!mock) throw new Error('Pilot could not locate the real frozen SAT1 canonical corpus.');
const rw = mock.readingWriting?.[0];
const math = mock.math?.[0];
if (!rw || !math) throw new Error('Pilot requires one real R&W and one real Math question.');

function block(question) {
  const choices = question.choices ?? question.options ?? [];
  const metadata = { ...question };
  delete metadata.prompt; delete metadata.choices; delete metadata.options; delete metadata.answer; delete metadata.explanation;
  return ['### Question: ' + question.questionId, '', 'STATUS: APPROVED', 'TEST KEY: SAT1', 'PROMPT:', String(question.prompt ?? ''), '', 'CHOICES:', JSON.stringify(choices, null, 2), '', 'ANSWER:', String(question.answer ?? question.correctAnswer ?? ''), '', 'EXPLANATION:', String(question.explanation ?? ''), '', 'SYSTEM METADATA (DO NOT EDIT DIRECTLY):', '```json', JSON.stringify(metadata, null, 2), '```', ''].join('\n');
}

const documentText = ['# SAT1 — Human-Editable Pilot', '', 'STATUS: PILOT', 'TEST KEY: SAT1', 'TEST ID: sat-series-a-mock-01', 'QUESTION COUNT: 2', '', block(rw), block(math)].join('\n');
const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'apriori-question-bank-pilot-'));
const input = path.join(tempRoot, 'SAT1-pilot.md');
fs.writeFileSync(input, documentText, 'utf8');
const validator = path.resolve(process.cwd(), 'scripts/validateHumanEditableQuestionBank.mjs');
const promotion = path.resolve(process.cwd(), 'scripts/promoteHumanBankToCanonicalStaging.mjs');
const args = ['--import', './scripts/batchMExtensionlessModuleLoader.mjs'];
const validate = spawnSync(process.execPath, [...args, validator, input, '--approved-only'], { cwd: process.cwd(), encoding: 'utf8' });
if (validate.status !== 0) { process.stderr.write(validate.stdout || ''); process.stderr.write(validate.stderr || ''); throw new Error('Pilot validation failed.'); }
const parsed = JSON.parse(validate.stdout);
if (parsed.parsedQuestionCount !== 2) throw new Error('Pilot expected exactly 2 parsed questions.');
const promoted = spawnSync(process.execPath, [...args, promotion, input], { cwd: process.cwd(), encoding: 'utf8' });
if (promoted.status !== 0) { process.stderr.write(promoted.stdout || ''); process.stderr.write(promoted.stderr || ''); throw new Error('Pilot canonical staging failed.'); }
const staged = JSON.parse(promoted.stdout);
if (staged.status !== 'CANONICAL_STAGING_CREATED' || staged.productionMutation !== false || staged.testKey !== 'SAT1' || staged.questionCount !== 2) throw new Error('Pilot produced an unexpected canonical staging result.');
const promotedFile = path.resolve(process.cwd(), 'question-banks/approved-launch-corpus/canonical-promotion-staging/SAT1.json');
if (!fs.existsSync(promotedFile)) throw new Error('Pilot staging artifact was not created.');
const stagedData = JSON.parse(fs.readFileSync(promotedFile, 'utf8'));
const expectedIds = [rw.questionId, math.questionId];
const actualIds = stagedData.questions.map((question) => question.questionId);
if (JSON.stringify(expectedIds) !== JSON.stringify(actualIds)) throw new Error('Pilot changed canonical question identities.');
fs.rmSync(promotedFile, { force: true });
fs.rmSync(tempRoot, { recursive: true, force: true });
console.log(JSON.stringify({ status: 'PILOT_PASS', testKey: 'SAT1', representativeQuestions: ['R&W', 'Math'], questionCount: 2, identitiesPreserved: true, canonicalStagingOnly: true, productionMutation: false, sat21Created: false }, null, 2));
