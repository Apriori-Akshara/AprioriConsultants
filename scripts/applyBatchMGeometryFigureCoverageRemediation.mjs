import fs from 'node:fs';

const mathFile = 'src/data/sat/mockContent/mathBankFactoryRemediatedUnique.js';
let source = fs.readFileSync(mathFile, 'utf8');

const marker = '// Batch M targeted geometry figure coverage remediation v3';
if (source.includes(marker)) {
  console.log('Batch M targeted geometry figure coverage remediation v3 already present; no change needed.');
  process.exit(0);
}

const figureMarker = 'function remapFigureCandidate(question, occurrence) {';
if (!source.includes(figureMarker)) throw new Error('Missing remapFigureCandidate marker.');

const helper = `
const TARGETED_GEOMETRY_FIGURE_DIFFICULTY_CYCLE = [
  'easy', 'easy', 'easy', 'medium', 'medium', 'medium', 'medium', 'medium', 'hard', 'hard',
];

const TARGETED_GEOMETRY_FIGURE_FRAMES = {
  'Geometry and measurement': [
    'Use the figure and the stated measurements together to determine the requested quantity.',
    'Identify the controlling geometric relationship before calculating the requested value.',
    'Use the given dimensions as constraints on the quantity the question asks for.',
    'Determine any needed intermediate measurement before finding the final quantity.',
    'Apply the relevant geometric relationship to connect the known measurements to the unknown.',
    'Interpret the numerical conditions and the figure together before selecting the answer.',
    'Compare the relevant dimensions and use the relationship that determines the requested quantity.',
    'Use the geometric structure to connect the known measurements to the requested value.',
    'Determine which theorem or area relationship governs the requested quantity.',
    'Verify that the value is consistent with the dimensions and structure shown in the figure.',
    'Use the figure to identify the relationship among the measurements before completing the calculation.',
    'Translate the geometric conditions into the quantity requested, using the figure as a constraint.',
    'Determine the needed relationship first, then calculate the value supported by the figure.',
    'Use both the dimensions and the geometric structure to constrain the possible answer.',
    'Identify the intermediate geometric quantity that links the stated measurements to the answer.',
    'Select the relationship that uses all relevant measurements in the figure.',
  ],
  'Similarity and scaling': [
    'Determine the scale factor before calculating the corresponding quantity requested.',
    'Match corresponding measures before applying the appropriate scaling relationship.',
    'Use the similarity condition to connect the known measure to the requested value.',
    'Determine whether the requested quantity scales by a length factor or its square.',
    'Apply the same correspondence consistently across the figures before selecting the answer.',
    'Use the relationship between corresponding dimensions to determine the unknown measure.',
    'Translate the similarity condition into the relationship needed for the requested quantity.',
    'Check that the scale factor is applied to the correct geometric measure.',
    'Relate the corresponding lengths first, then use them to determine the requested quantity.',
    'Use the structure of the similar figures to connect the known and unknown measures.',
    'Determine the appropriate scale relationship from the dimensions shown in the figures.',
    'Compare corresponding measures and use their ratio to determine the requested value.',
    'Use the given similarity condition as a constraint on the possible measurements.',
    'Identify the corresponding sides or measures before completing the calculation.',
    'Determine the scale factor and then propagate it to the geometric quantity being asked for.',
    'Use the figure to verify that the corresponding measures have been matched correctly.',
  ],
  'Right triangles': [
    'Use the right angle and the stated side lengths to identify the relationship needed for the answer.',
    'Identify the hypotenuse and legs before applying the appropriate right-triangle relationship.',
    'Use the given side measurements to determine the missing quantity requested.',
    'Apply the Pythagorean relationship after identifying the relevant sides in the figure.',
    'Interpret the right-triangle structure before selecting the theorem that connects the measurements.',
    'Use the right angle as a constraint on the side lengths and determine the requested value.',
    'Determine the needed side length first, then complete the requested calculation.',
    'Connect the known side lengths through the right-triangle relationship and verify the result.',
    'Use the figure to distinguish the hypotenuse from the two legs before calculating.',
    'Identify the relationship among the three side lengths that controls the requested quantity.',
    'Use the stated measurements and the right-angle condition together to determine the unknown.',
    'Determine which side relationship applies before selecting the value supported by the figure.',
    'Use the right-triangle structure to constrain the possible value of the missing measurement.',
    'Apply the appropriate theorem to connect the known and unknown sides.',
    'Check that the resulting side length is consistent with the hypotenuse and the right angle.',
    'Use the figure and the side-length conditions together before selecting the answer.',
  ],
};

function remediateBatchMTargetedGeometryFigure(question, occurrence) {
  const skill = String(question.skill || '');
  const frames = TARGETED_GEOMETRY_FIGURE_FRAMES[skill];
  if (!frames) return question;

  const o = Number(occurrence) || 0;
  const frameIndex = ((o % frames.length) + frames.length) % frames.length;
  const difficulty = TARGETED_GEOMETRY_FIGURE_DIFFICULTY_CYCLE[o % TARGETED_GEOMETRY_FIGURE_DIFFICULTY_CYCLE.length];
  const frame = frames[frameIndex];
  const prompt = String(question.prompt || '');
  const separator = /[.!?]$/.test(prompt) ? ' ' : '. ';
  const suffix = 'geometry-targeted-v3-' + skill.replace(/[^A-Za-z0-9]+/g, '-').toLowerCase() + '-' + String(frameIndex) + '-' + String(o);

  return {
    ...question,
    prompt: prompt + separator + frame,
    difficulty,
    difficultyBand: String(question.assessmentVariant || 'sat') + '-' + String(question.adaptiveRoute || 'standard') + '-' + difficulty,
    cognitiveDemand: difficulty === 'easy' ? 'apply' : 'analyze',
    estimatedTimeSeconds: difficulty === 'hard' ? 105 : difficulty === 'medium' ? 90 : 75,
    originalityFingerprint: String(question.originalityFingerprint || '') + '-' + suffix,
    conceptFingerprint: String(question.conceptFingerprint || '') + '-' + suffix,
    metadata: {
      ...question.metadata,
      constructionFamily: String(question.metadata?.constructionFamily || '') + '-' + suffix,
      geometryVariationIndex: frameIndex,
      geometryVariationSource: 'targeted-figure-construction-v3',
      difficultyFeatures: difficulty === 'easy'
        ? ['direct-application']
        : difficulty === 'medium'
          ? ['careful-interpretation', 'multi-step']
          : ['multi-step', 'strategic-choice', 'constraint-inference'],
      difficultyRequirements: DIFFICULTY_REQUIREMENTS[difficulty],
    },
  };
}
`;

source = source.replace(figureMarker, `${helper}\n${marker}\n\n${figureMarker}\n  question = remediateBatchMTargetedGeometryFigure(question, occurrence);`);

fs.writeFileSync(mathFile, source, 'utf8');
console.log('Applied Batch M targeted geometry figure coverage remediation v3.');