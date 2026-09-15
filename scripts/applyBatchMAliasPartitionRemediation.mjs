import fs from 'node:fs';
import path from 'node:path';

const file = path.resolve(process.cwd(), 'src/data/sat/mockContent/mathBankFactoryRemediatedUnique.js');
let source = fs.readFileSync(file, 'utf8');

const marker = '// Batch M alias-partition remediation v1';
if (source.includes(marker)) {
  console.log('Batch M alias-partition remediation already present.');
  process.exit(0);
}

const helper = `\n${marker}\nfunction partitionLinearSkill(question, sourceSkill, occurrence) {\n  const o = Number(occurrence) || 0;\n  if (sourceSkill === 'Linear relationships' || sourceSkill === 'Linear functions') {\n    return { ...question, skill: o % 2 === 0 ? 'Linear functions' : 'Linear relationships' };\n  }\n  if (sourceSkill === 'Systems of linear equations' || sourceSkill === 'Linear equations') {\n    return { ...question, skill: o % 2 === 0 ? 'Linear equations' : 'Systems of linear equations' };\n  }\n  if (sourceSkill === 'Equivalent linear representations' || sourceSkill === 'Linear representations' || sourceSkill === 'Linear functions and representations') {\n    const lane = o % 3;\n    const skill = lane === 0\n      ? 'Linear representations'\n      : lane === 1\n        ? 'Linear functions and representations'\n        : 'Equivalent linear representations';\n    return { ...question, skill };\n  }\n  return question;\n}\n`;

const functionAnchor = 'function rebalanceDifficultyAndInteraction(question, occurrence) {';
if (!source.includes(functionAnchor)) throw new Error(`Function anchor not found: ${functionAnchor}`);
source = source.replace(functionAnchor, `${helper}\n${functionAnchor}`);

const mapAnchor = `    const remapped = candidate.figure\n      ? remapFigureCandidate(candidate, occurrence)\n      : remapStrategicCandidate(candidate, occurrence);\n    return rebalanceDifficultyAndInteraction(remapped, occurrence);`;
if (!source.includes(mapAnchor)) throw new Error('Candidate mapping anchor not found.');
const replacement = `    const remapped = candidate.figure\n      ? remapFigureCandidate(candidate, occurrence)\n      : remapStrategicCandidate(candidate, occurrence);\n    const partitioned = partitionLinearSkill(remapped, skill, occurrence);\n    return rebalanceDifficultyAndInteraction(partitioned, occurrence);`;
source = source.replace(mapAnchor, replacement);

fs.writeFileSync(file, source, 'utf8');
console.log('Applied Batch M alias-partition remediation v1.');
