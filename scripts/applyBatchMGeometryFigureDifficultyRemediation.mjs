import fs from 'node:fs';

const mathFile = 'src/data/sat/mockContent/mathBankFactoryRemediatedUnique.js';
let source = fs.readFileSync(mathFile, 'utf8');

const marker = '// Batch M geometry figure-path difficulty linkage remediation v5';
if (source.includes(marker)) {
  console.log('Batch M geometry figure-path difficulty linkage remediation v5 already present; no change needed.');
  process.exit(0);
}

const figureMarker = 'function remapFigureCandidate(question, occurrence) {';
const callMarker = '  question = diversifyBatchMGeometry(question, occurrence);';
if (!source.includes(figureMarker)) throw new Error('Missing remapFigureCandidate marker.');
if (!source.includes(callMarker)) throw new Error('Missing geometry diversification call.');
if (!source.includes('function remediateBatchMTargetedGeometryDifficulty(question, occurrence) {')) {
  throw new Error('Targeted geometry difficulty helper is missing; v4 must run first.');
}

source = source.replace(
  callMarker,
  `${callMarker}\n  question = remediateBatchMTargetedGeometryDifficulty(question, occurrence);`,
);
source = source.replace(figureMarker, `${marker}\n\n${figureMarker}`);

fs.writeFileSync(mathFile, source, 'utf8');
console.log('Applied Batch M geometry figure-path difficulty linkage remediation v5.');
