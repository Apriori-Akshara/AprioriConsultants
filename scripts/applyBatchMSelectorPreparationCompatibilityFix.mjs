import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

const selectorFile = 'scripts/runBatchMTargetedCandidateSelection.js';
const stableCommit = 'b6e38b05437c2d46119770d5e9f6db3965791cff';
const oldDifficultyLine = "  if (normalize(candidate.difficulty) !== normalize(meta.difficulty)) reasons.push('difficulty-mismatch');";
const difficultyHelper = `  function difficultyMatches(candidate, meta) {\n    if (normalize(candidate.difficulty) === normalize(meta.difficulty)) return true;\n\n    if (\n      normalize(meta.assessmentVariant) === 'psat-nmsqt'\n      && normalize(meta.difficulty) === 'hard'\n      && normalize(candidate.difficulty) === 'medium'\n      && normalize(meta.domain) === 'geometry and trigonometry'\n    ) return true;\n\n    return false;\n  }\n\n`;
const marker = '// Batch M selector restoration, product-scoped reuse, and PSAT ceiling compatibility v10';

const stableSource = execFileSync('git', ['show', `${stableCommit}:${selectorFile}`], { encoding: 'utf8' });
if (!stableSource.includes(oldDifficultyLine)) {
  throw new Error('Stable selector commit does not contain the expected difficulty compatibility line.');
}
if (!stableSource.includes('const used = new Set();')) {
  throw new Error('Stable selector does not contain the expected shared reuse pool.');
}
if (!stableSource.includes('reasonList(item, meta, used, productionFingerprints)')) {
  throw new Error('Stable selector does not contain the expected reuse check call.');
}

let source = stableSource.replace(
  oldDifficultyLine,
  `${difficultyHelper}${oldDifficultyLine.replace('if (normalize(candidate.difficulty) !== normalize(meta.difficulty))', 'if (!difficultyMatches(candidate, meta))')}`,
);
source = source.replace('  const used = new Set();', '  const used = { sat: new Set(), psat: new Set() };');
source = source.replace(
  '      const reasons = reasonList(item, meta, used, productionFingerprints);',
  '      const reasons = reasonList(item, meta, used[product], productionFingerprints);',
);
source = source.replace(
  '      used.add(eligibleItems[0].fingerprint);',
  '      used[product].add(eligibleItems[0].fingerprint);',
);
source = `${marker}\n${source}`;
fs.writeFileSync(selectorFile, source, 'utf8');

console.log(JSON.stringify({
  restoredFrom: stableCommit,
  selectorFile,
  psatGeometryDifficultyException: true,
  reuseScope: 'product',
}, null, 2));
