import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const inputPath = process.argv[2];
if (!inputPath) throw new Error('Usage: node promoteHumanBankToCanonicalStaging.mjs <approved-mock.md>');
const absolute = path.resolve(process.cwd(), inputPath);
if (!fs.existsSync(absolute)) throw new Error('Approved document not found: ' + inputPath);

const validator = path.resolve(process.cwd(), 'scripts/validateHumanEditableQuestionBank.mjs');
const check = spawnSync(process.execPath, ['--import', './scripts/batchMExtensionlessModuleLoader.mjs', validator, inputPath, '--approved-only'], { cwd: process.cwd(), encoding: 'utf8' });
if (check.status !== 0) {
  process.stderr.write(check.stdout || '');
  process.stderr.write(check.stderr || '');
  throw new Error('Approved document validation failed; canonical staging was not created.');
}
const parsed = JSON.parse(check.stdout);
const testKey = parsed.testKey;
if (!testKey) throw new Error('Approved document is missing TEST KEY.');
if (!/^(SAT([1-9]|10|1[1-9]|20)|PSAT([1-9]|10))$/.test(testKey)) throw new Error('Promotion target is outside the frozen 30-mock scope: ' + testKey);

const outputDir = path.resolve(process.cwd(), 'question-banks/approved-launch-corpus/canonical-promotion-staging');
fs.mkdirSync(outputDir, { recursive: true });
const output = {
  schemaVersion: 1,
  status: 'CANONICAL_STAGING_ONLY',
  productionMutation: false,
  testKey,
  questionCount: parsed.questions.length,
  questions: parsed.questions.map((item) => item.canonical),
};
const outputPath = path.join(outputDir, testKey + '.json');
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2) + '\n', 'utf8');
console.log(JSON.stringify({ status: 'CANONICAL_STAGING_CREATED', testKey, questionCount: output.questionCount, outputPath, productionMutation: false, productionAuthorizationRequired: true, sat21Created: false }, null, 2));
