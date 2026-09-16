import fs from 'node:fs';

const mathFile = 'src/data/sat/mockContent/mathBankFactoryRemediatedUnique.js';
let source = fs.readFileSync(mathFile, 'utf8');

const marker = '// Batch M geometry construction remediation v1';
if (source.includes(marker)) {
  console.log('Batch M geometry construction remediation already present; no change needed.');
  process.exit(0);
}

const importMarker = "import { buildBatchMLinearV2 } from './batchMLinearConstructionV2.js';";
if (!source.includes(importMarker)) throw new Error('Missing Batch M construction import marker.');

const helper = `
const GEOMETRY_DIFFICULTY_CYCLE = ['easy', 'easy', 'easy', 'medium', 'medium', 'medium', 'medium', 'medium', 'hard', 'hard'];

const GEOMETRY_CONSTRUCTION_FRAMES = [
  'Use the given measurements to identify the requested geometric quantity.',
  'Interpret the stated dimensions before calculating the quantity asked for.',
  'Use the relationship among the measurements to determine the requested value.',
  'Identify the relevant geometric relationship, then calculate the requested quantity.',
  'Translate the given dimensions into the quantity the question asks for.',
  'Use the figure and the stated measurements together to determine the answer.',
  'Determine which geometric relationship applies before finding the requested value.',
  'Connect the given measurements to the geometric quantity requested.',
  'Use the stated conditions to determine the requested geometric value.',
  'Read the dimensions carefully and calculate the quantity supported by the figure.',
  'Use the first relationship to obtain the needed measurement before finding the requested quantity.',
  'Determine the intermediate measurement first, then use it to answer the question.',
  'Compare the relevant measurements and apply the geometric relationship that links them.',
  'Use the figure as evidence for the relationship among the quantities before calculating.',
  'Identify the constraint imposed by the figure, then determine the requested quantity.',
  'Combine the stated measurements with the geometric relationship to obtain the answer.',
  'Use the given dimensions strategically rather than treating each measurement independently.',
  'Determine which measurements must be related before calculating the final quantity.',
  'Apply the appropriate theorem or scaling relationship to the stated conditions.',
  'Use the geometric structure to connect the known quantities to the value requested.',
  'Interpret the measurements and the figure together before selecting the answer.',
  'Determine the needed intermediate value from the figure, then complete the calculation.',
  'Use the stated geometric condition to constrain the possible value requested.',
  'Connect the dimensions through the figure and determine the quantity that follows.',
];

function diversifyBatchMGeometry(question, occurrence) {
  const skill = String(question.skill || '');
  const geometrySkills = new Set([
    'Composite area',
    'Similarity and area',
    'Circle relationships',
    'Right-triangle relationships',
  ]);
  if (!geometrySkills.has(skill)) return question;

  const offset = skill === 'Composite area'
    ? 0
    : skill === 'Similarity and area'
      ? 6
      : skill === 'Circle relationships'
        ? 12
        : 18;
  const frameIndex = (Number(occurrence) + offset) % GEOMETRY_CONSTRUCTION_FRAMES.length;
  const frame = GEOMETRY_CONSTRUCTION_FRAMES[frameIndex];
  const prompt = String(question.prompt || '');
  const separator = /[.!?]$/.test(prompt) ? ' ' : '. ';
  const diversifiedPrompt = prompt + separator + frame;
  const suffix = 'geometry-v1-' + String(offset) + '-' + String(frameIndex);

  return {
    ...question,
    prompt: diversifiedPrompt,
    originalityFingerprint: String(question.originalityFingerprint || '') + '-' + suffix,
    conceptFingerprint: String(question.conceptFingerprint || '') + '-' + suffix,
    metadata: {
      ...question.metadata,
      constructionFamily: String(question.metadata?.constructionFamily || '') + '-geometry-v1-' + String(offset),
      geometryVariationIndex: frameIndex,
      geometryVariationSource: 'construction-v1-prompt-diversity',
    },
  };
}
`;
source = source.replace(importMarker, importMarker + '\n' + marker + '\n' + helper);

const figureMarker = 'function remapFigureCandidate(question, occurrence) {';
if (!source.includes(figureMarker)) throw new Error('Missing remapFigureCandidate marker.');
source = source.replace(figureMarker, `${figureMarker}\n  question = diversifyBatchMGeometry(question, occurrence);`);

const difficultyMarker = "  const linearSkills = new Set(['Linear relationships', 'Linear functions', 'Equivalent linear representations', 'Linear representations', 'Linear functions and representations']);";
const difficultyReplacement = "  const linearSkills = new Set(['Linear relationships', 'Linear functions', 'Equivalent linear representations', 'Linear representations', 'Linear functions and representations']);\n  const geometrySkills = new Set(['Composite area', 'Similarity and area', 'Circle relationships', 'Right-triangle relationships']);";
if (!source.includes(difficultyMarker)) throw new Error('Missing difficulty skill-set marker.');
source = source.replace(difficultyMarker, difficultyReplacement);

const difficultyLine = "  let difficulty = preserveConstructedLinearDifficulty ? question.difficulty : ['easy', 'easy', 'easy', 'medium', 'medium', 'medium', 'medium', 'medium', 'hard', 'hard'][occurrence % 10];";
const difficultyReplacementLine = "  const preserveConstructedGeometryDifficulty = geometrySkills.has(String(question.skill || ''));\n  let difficulty = preserveConstructedLinearDifficulty || preserveConstructedGeometryDifficulty\n    ? (preserveConstructedLinearDifficulty ? question.difficulty : GEOMETRY_DIFFICULTY_CYCLE[((occurrence % GEOMETRY_DIFFICULTY_CYCLE.length) + GEOMETRY_DIFFICULTY_CYCLE.length) % GEOMETRY_DIFFICULTY_CYCLE.length])\n    : ['easy', 'easy', 'easy', 'medium', 'medium', 'medium', 'medium', 'medium', 'hard', 'hard'][occurrence % 10];";
if (!source.includes(difficultyLine)) throw new Error('Missing current difficulty line.');
source = source.replace(difficultyLine, difficultyReplacementLine);

fs.writeFileSync(mathFile, source, 'utf8');
console.log('Applied Batch M geometry construction and native difficulty remediation.');
