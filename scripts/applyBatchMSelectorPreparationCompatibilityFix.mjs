import fs from 'node:fs';

const selectorFile = 'scripts/runBatchMTargetedCandidateSelection.js';
let source = fs.readFileSync(selectorFile, 'utf8');
const marker = '// Batch M selector preparation compatibility fix v9';
if (source.includes(marker)) {
  console.log('Batch M selector preparation compatibility fix v9 already present; no change needed.');
  process.exit(0);
}
const oldLine = 'function targetRecords(preparation) {\n  return preparation.records || preparation.targets || preparation;\n}';
const newBlock = `${marker}\n\nfunction targetRecords(preparation) {\n  return preparation.records || preparation.targets || preparation.questions || preparation;\n}`;
if (!source.includes(oldLine)) throw new Error('Expected selector preparation helper was not found.');
source = source.replace(oldLine, newBlock);
fs.writeFileSync(selectorFile, source, 'utf8');
console.log('Applied Batch M selector preparation compatibility fix v9.');
