import fs from 'node:fs';

const mathFile = 'src/data/sat/mockContent/mathBankFactoryRemediatedUnique.js';
let source = fs.readFileSync(mathFile, 'utf8');

const marker = '// Batch M geometry difficulty finalization remediation v6';
if (source.includes(marker)) {
  console.log('Batch M geometry difficulty finalization remediation v6 already present; no change needed.');
  process.exit(0);
}

const preRebalanceCall = '  question = remediateBatchMTargetedGeometryDifficulty(question, occurrence);';
const rebalanceLine = '    return rebalanceDifficultyAndInteraction(partitioned, occurrence);';
if (!source.includes(preRebalanceCall)) throw new Error('Expected pre-rebalance geometry difficulty calls were not found.');
if (!source.includes(rebalanceLine)) throw new Error('Missing final difficulty rebalance return line.');
if (!source.includes('function remediateBatchMTargetedGeometryDifficulty(question, occurrence) {')) {
  throw new Error('Targeted geometry difficulty helper is missing.');
}

source = source.replace(/  question = remediateBatchMTargetedGeometryDifficulty\(question, occurrence\);\n/g, '');
source = source.replace(
  rebalanceLine,
  `    const rebalanced = rebalanceDifficultyAndInteraction(partitioned, occurrence);\n    return remediateBatchMTargetedGeometryDifficulty(rebalanced, occurrence);`,
);
source = source.replace(
  'function generateRemediatedMathCandidatesUnique(options = {}) {',
  `${marker}\n\nfunction generateRemediatedMathCandidatesUnique(options = {}) {`,
);

fs.writeFileSync(mathFile, source, 'utf8');
console.log('Applied Batch M geometry difficulty finalization remediation v6.');
