import fs from 'node:fs';

const mathFile = 'src/data/sat/mockContent/mathBankFactoryRemediatedUnique.js';
let source = fs.readFileSync(mathFile, 'utf8');
const cycleOld = "const TARGETED_GEOMETRY_DIFFICULTY_CYCLE = ['easy', 'easy', 'easy', 'medium', 'medium', 'medium', 'medium', 'medium', 'hard', 'hard'];";
const cycleNew = "const TARGETED_GEOMETRY_DIFFICULTY_CYCLE = ['hard', 'hard', 'hard', 'hard', 'hard', 'hard', 'hard', 'hard', 'hard', 'medium'];";
const marker = '// Batch M targeted geometry difficulty calibration remediation v8';
if (source.includes(marker)) {
  console.log('Batch M targeted geometry difficulty calibration remediation v8 already present; no change needed.');
  process.exit(0);
}
if (!source.includes(cycleOld)) throw new Error('Expected v4 targeted geometry difficulty cycle not found.');
source = source.replace(cycleOld, cycleNew);
source = source.replace(
  "  return {\n    ...question,",
  `  return {\n    ...question,`,
);
source = source.replace(
  'function generateRemediatedMathCandidatesUnique(options = {}) {',
  `${marker}\n\nfunction generateRemediatedMathCandidatesUnique(options = {}) {`,
);
fs.writeFileSync(mathFile, source, 'utf8');
console.log('Applied Batch M targeted geometry difficulty calibration remediation v8.');
