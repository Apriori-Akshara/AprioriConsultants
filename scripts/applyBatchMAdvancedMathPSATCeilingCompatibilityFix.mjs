import fs from 'node:fs';

const selectorFile = 'scripts/runBatchMTargetedCandidateSelection.js';
const source = fs.readFileSync(selectorFile, 'utf8');
const marker = '// Batch M PSAT Advanced Math ceiling compatibility v11';

if (source.includes(marker)) {
  console.log('Batch M PSAT Advanced Math ceiling compatibility v11 already present; no change needed.');
  process.exit(0);
}

const oldBlock = `if (\n      normalize(meta.assessmentVariant) === 'psat-nmsqt'\n      && normalize(meta.difficulty) === 'hard'\n      && normalize(candidate.difficulty) === 'medium'\n      && normalize(meta.domain) === 'geometry and trigonometry'\n    ) return true;`;

const newBlock = `if (\n      normalize(meta.assessmentVariant) === 'psat-nmsqt'\n      && normalize(meta.difficulty) === 'hard'\n      && normalize(candidate.difficulty) === 'medium'\n      && (\n        normalize(meta.domain) === 'geometry and trigonometry'\n        || normalize(meta.domain) === 'advanced math'\n      )\n    ) return true;`;

if (!source.includes(oldBlock)) {
  throw new Error('Expected PSAT ceiling compatibility block was not found in selector.');
}

const updated = source
  .replace('// Batch M selector restoration, product-scoped reuse, and PSAT ceiling compatibility v10', marker)
  .replace(oldBlock, newBlock);

fs.writeFileSync(selectorFile, updated, 'utf8');
console.log('Applied Batch M PSAT Advanced Math ceiling compatibility v11.');
