import fs from 'node:fs';

const mathFile = 'src/data/sat/mockContent/mathBankFactoryRemediatedUnique.js';
let source = fs.readFileSync(mathFile, 'utf8');

const marker = '// Batch M geometry difficulty alias remediation v7';
if (source.includes(marker)) {
  console.log('Batch M geometry difficulty alias remediation v7 already present; no change needed.');
  process.exit(0);
}

const functionMarker = 'function remediateBatchMTargetedGeometryDifficulty(question, occurrence) {';
const lookupLine = '  const framesByDifficulty = TARGETED_GEOMETRY_DIFFICULTY_FRAMES[skill];';
const skillUseLine = "  const difficulty = TARGETED_GEOMETRY_DIFFICULTY_CYCLE[o % TARGETED_GEOMETRY_DIFFICULTY_CYCLE.length];";
const letUseLine = "  let difficulty = TARGETED_GEOMETRY_DIFFICULTY_CYCLE[o % TARGETED_GEOMETRY_DIFFICULTY_CYCLE.length];";
if (!source.includes(functionMarker)) throw new Error('Targeted geometry difficulty helper is missing.');
if (!source.includes(lookupLine)) throw new Error('Geometry difficulty frame lookup line is missing.');

const aliases = `\nconst TARGETED_GEOMETRY_DIFFICULTY_ALIASES = {\n  'Composite area': 'Geometry and measurement',\n  'Similarity and area': 'Similarity and scaling',\n  'Right-triangle relationships': 'Right triangles',\n};\n`;
source = source.replace(functionMarker, `${aliases}\n${functionMarker}`);
source = source.replace('  const skill = String(question.skill || \'\');\n  const framesByDifficulty', "  const skill = String(question.skill || '');\n  const targetedSkill = TARGETED_GEOMETRY_DIFFICULTY_ALIASES[skill] || skill;\n  const framesByDifficulty");
source = source.replace(lookupLine, '  const framesByDifficulty = TARGETED_GEOMETRY_DIFFICULTY_FRAMES[targetedSkill];');
source = source.replace("const suffix = 'geometry-difficulty-v4-' + skill.replace(/[^A-Za-z0-9]+/g, '-').toLowerCase()", "const suffix = 'geometry-difficulty-v7-' + targetedSkill.replace(/[^A-Za-z0-9]+/g, '-').toLowerCase()");
source = source.replace(\n  "geometryDifficultySource: 'targeted-native-construction-v4',",\n  "geometryDifficultySource: 'targeted-native-construction-v7',",
);
source = source.replace(functionMarker, `${functionMarker}`); // preserve marker location
source = source.replace('function generateRemediatedMathCandidatesUnique(options = {}) {', `${marker}\n\nfunction generateRemediatedMathCandidatesUnique(options = {}) {`);
fs.writeFileSync(mathFile, source, 'utf8');
console.log('Applied Batch M geometry difficulty alias remediation v7.');
