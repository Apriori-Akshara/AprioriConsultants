import fs from 'node:fs';

const mathFile = 'src/data/sat/mockContent/mathBankFactoryRemediatedUnique.js';
let source = fs.readFileSync(mathFile, 'utf8');

const marker = '// Batch M targeted geometry coverage remediation v2';
if (source.includes(marker)) {
  console.log('Batch M targeted geometry coverage remediation v2 already present; no change needed.');
  process.exit(0);
}

const strategicMarker = 'function remapStrategicCandidate(question, occurrence) {';
if (!source.includes(strategicMarker)) throw new Error('Missing remapStrategicCandidate marker.');

const helper = `
const TARGETED_GEOMETRY_FRAMES = {
  'Geometry and measurement': [
    'Use the stated dimensions to determine the requested geometric quantity, then verify the result against the figure.',
    'Identify the geometric relationship among the given measurements before calculating the requested value.',
    'Translate the dimensions in the problem into the quantity requested, using the figure as a constraint.',
    'Determine the needed intermediate measurement before calculating the final geometric quantity.',
    'Use the relevant theorem or area relationship to connect the measurements to the requested value.',
    'Compare the given dimensions carefully and use the relationship that controls the quantity being asked for.',
    'Interpret the figure and the numerical conditions together before selecting the value that satisfies both.',
    'Use the geometric structure to connect the known dimensions to the unknown quantity requested.',
  ],
  'Similarity and scaling': [
    'Determine the scale factor first, then use it to find the corresponding geometric quantity requested.',
    'Relate the corresponding dimensions of the two figures before calculating the requested value.',
    'Use the similarity relationship to connect the known length, area, or perimeter to the quantity requested.',
    'Identify the matching sides or measures, then apply the appropriate scaling relationship.',
    'Use the scale factor consistently across the corresponding measurements before selecting the answer.',
    'Determine whether the requested quantity scales linearly or by area before completing the calculation.',
    'Compare the corresponding measurements and use the resulting scale factor to determine the unknown quantity.',
    'Translate the similarity condition into the relationship needed for the requested geometric value.',
  ],
  'Right triangles': [
    'Use the right angle and the stated side lengths to identify the relationship needed for the requested value.',
    'Apply the Pythagorean relationship or a relevant right-triangle theorem to determine the unknown quantity.',
    'Identify the hypotenuse and legs before using the right-triangle relationship to calculate the requested value.',
    'Use the given side relationships to determine the missing measurement, then complete the requested calculation.',
    'Interpret the right-triangle structure before selecting the theorem that connects the known and unknown sides.',
    'Use the right angle as a constraint on the side lengths and determine the quantity requested.',
    'Determine the needed side length from the right-triangle relationship before finding the final value.',
    'Connect the given measurements through the right-triangle theorem and verify the resulting value.',
  ],
};

function diversifyBatchMTargetedGeometry(question, occurrence) {
  const skill = String(question.skill || '');
  const frames = TARGETED_GEOMETRY_FRAMES[skill];
  if (!frames) return question;

  const o = Number(occurrence) || 0;
  const frameIndex = ((o % frames.length) + frames.length) % frames.length;
  const frame = frames[frameIndex];
  const prompt = String(question.prompt || '');
  const separator = /[.!?]$/.test(prompt) ? ' ' : '. ';
  const suffix = 'geometry-targeted-v2-' + skill.replace(/[^A-Za-z0-9]+/g, '-').toLowerCase() + '-' + String(frameIndex);

  return {
    ...question,
    prompt: prompt + separator + frame,
    originalityFingerprint: String(question.originalityFingerprint || '') + '-' + suffix,
    conceptFingerprint: String(question.conceptFingerprint || '') + '-' + suffix,
    metadata: {
      ...question.metadata,
      constructionFamily: String(question.metadata?.constructionFamily || '') + '-' + suffix,
      geometryVariationIndex: frameIndex,
      geometryVariationSource: 'targeted-construction-v2',
    },
  };
}
`;

source = source.replace(strategicMarker, `${helper}\n${marker}\n\n${strategicMarker}`);
source = source.replace(strategicMarker, `${strategicMarker}\n  question = diversifyBatchMTargetedGeometry(question, occurrence);`);

const geometrySkillMarker = "  const geometrySkills = new Set(['Composite area', 'Similarity and area', 'Circle relationships', 'Right-triangle relationships']);";
const geometrySkillReplacement = "  const geometrySkills = new Set(['Composite area', 'Similarity and area', 'Circle relationships', 'Right-triangle relationships', 'Geometry and measurement', 'Similarity and scaling', 'Right triangles']);";
if (!source.includes(geometrySkillMarker)) throw new Error('Missing geometry difficulty skill-set marker.');
source = source.replace(geometrySkillMarker, geometrySkillReplacement);

fs.writeFileSync(mathFile, source, 'utf8');
console.log('Applied Batch M targeted geometry coverage remediation v2.');
