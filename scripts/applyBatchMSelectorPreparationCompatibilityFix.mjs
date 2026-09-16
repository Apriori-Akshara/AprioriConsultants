import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

const selectorFile = 'scripts/runBatchMTargetedCandidateSelection.js';
const stableCommit = 'b6e38b05437c2d46119770d5e9f6db3965791cff';
const oldDifficultyLine = "  if (normalize(candidate.difficulty) !== normalize(meta.difficulty)) reasons.push('difficulty-mismatch');";
const difficultyHelper = `  function difficultyMatches(candidate, meta) {\n    if (normalize(candidate.difficulty) === normalize(meta.difficulty)) return true;\n\n    if (\n      normalize(meta.assessmentVariant) === 'psat-nmsqt'\n      && normalize(meta.difficulty) === 'hard'\n      && normalize(candidate.difficulty) === 'medium'\n      && normalize(meta.domain) === 'geometry and trigonometry'\n    ) return true;\n\n    return false;\n  }\n\n`;
const marker = '// Batch M selector restoration and PSAT ceiling compatibility v9';

const stableSource = execFileSync('git', ['show', `${stableCommit}:${selectorFile}`], { encoding: 'utf8' });
if (!stableSource.includes(oldDifficultyLine)) {
  throw new Error('Stable selector commit does not contain the expected difficulty compatibility line.');
}

let source = stableSource.replace(oldDifficultyLine, `${difficultyHelper}${oldDifficultyLine.replace('if (normalize(candidate.difficulty) !== normalize(meta.difficulty))', 'if (!difficultyMatches(candidate, meta))')}`);
source = `${marker}\n${source}`;
fs.writeFileSync(selectorFile, source, 'utf8');

console.log(JSON.stringify({
  restoredFrom: stableCommit,
  selectorFile,
  psatGeometryDifficultyException: true,
}, null, 2));
