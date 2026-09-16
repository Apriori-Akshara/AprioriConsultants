import fs from 'node:fs';
const mathFile = 'src/data/sat/mockContent/mathBankFactoryRemediatedUnique.js';
const helperFile = 'src/data/sat/mockContent/batchMLinearConstructionV2.js';
let s = fs.readFileSync(mathFile, 'utf8');
let h = fs.readFileSync(helperFile, 'utf8');

if (!h.includes("const strengthenedPrompt")) {
  const from = "  const updated = setNumeric(question, prompt, correct, occurrence);";
  const to = "  const strengthenedPrompt = difficulty === 'medium' ? prompt + ' Use both pieces of information to determine the requested value.' : prompt;\n  const updated = setNumeric(question, strengthenedPrompt, correct, occurrence);";
  if (!h.includes(from)) throw new Error('Missing Batch M linear finish marker.');
  h = h.replace(from, to);
  fs.writeFileSync(helperFile, h, 'utf8');
}

const linearV3Marker = '// Batch M linear construction remediation v3: cross-target prompt diversity';
if (!s.includes(linearV3Marker)) {
  const importMarker = "import { buildBatchMLinearV2 } from './batchMLinearConstructionV2.js';";
  if (!s.includes(importMarker)) throw new Error('Missing Batch M linear v2 import.');

  const helper = `
const LINEAR_V3_FUNCTION_FRAMES = [
  'Use the relationship described to determine the requested quantity.',
  'Determine the requested quantity from the linear model given.',
  'Read the stated relationship carefully before selecting the requested value.',
  'Base the answer on the linear relationship represented in the problem.',
  'Translate the given information into the quantity the question asks for.',
  'Use the numerical relationship in the prompt to find the requested value.',
  'Interpret the linear information provided, then determine the requested quantity.',
  'Identify the relevant linear relationship and use it to obtain the requested value.',
  'Use the stated model to determine the quantity requested.',
  'Connect the given values through the linear relationship to find the requested quantity.',
  'Determine which linear relation applies and use it to answer the question.',
  'Use the information in the model to identify the requested value.',
  'Interpret the model before determining the quantity asked for.',
  'Apply the stated linear relationship to the values given.',
  'Determine the value that follows from the linear relationship in the prompt.',
  'Use the information provided to calculate the requested quantity from the model.',
  'Read the linear model as stated and determine the requested value.',
  'Use the relationship among the given quantities to find the answer.',
  'Determine the requested value by using the linear model in the prompt.',
  'Interpret the given linear model and calculate the quantity requested.',
  'Use the stated relationship among the variables to determine the answer.',
  'Find the requested quantity by applying the linear relationship provided.',
  'Identify how the quantities are related linearly, then determine the requested value.',
  'Use the given linear relationship to obtain the quantity the question asks for.',
];

const LINEAR_V3_REPRESENTATION_FRAMES = [
  'Use the representation provided to determine the requested quantity.',
  'Match the equivalent representation to the quantity requested.',
  'Translate the given linear representation into the form needed to answer the question.',
  'Use the equivalent representations consistently to determine the answer.',
  'Connect the equation, values, or representation provided to the quantity requested.',
  'Interpret the linear representation before selecting the requested value.',
  'Use the representation that makes the requested quantity directly identifiable.',
  'Translate the stated model into the representation needed for the requested value.',
  'Determine the requested value from the equivalent linear information provided.',
  'Use the relationship among the representations to find the quantity asked for.',
  'Identify the matching linear representation and use it to determine the answer.',
  'Interpret the given representations as one linear model, then determine the requested value.',
  'Use the numerical and symbolic information provided to obtain the requested quantity.',
  'Determine which equivalent form is most useful for the quantity being asked for.',
  'Use the stated representation(s) to calculate the requested value.',
  'Connect the representations of the same linear model to answer the question.',
  'Read the given linear representation carefully before determining the requested quantity.',
  'Use the equivalent linear model represented in the prompt to find the answer.',
  'Translate between the given representations as needed to determine the requested value.',
  'Determine the quantity requested from the linear relationship shared by the representations.',
  'Use the equation, table, graph, or stated relationship provided to obtain the answer.',
  'Interpret the equivalent linear information and calculate the quantity requested.',
  'Use the representation in the prompt that directly supports the requested value.',
  'Determine the requested value by connecting the equivalent linear representations.',
];

function diversifyBatchMLinearV3(question, constructed, occurrence, kind) {
  const skill = String(question.skill || '');
  const frames = kind === 'representation' ? LINEAR_V3_REPRESENTATION_FRAMES : LINEAR_V3_FUNCTION_FRAMES;
  const familyOffset = skill === 'Linear functions and representations'
    ? 7
    : skill === 'Linear representations'
      ? 13
      : skill === 'Linear relationships'
        ? 19
        : 0;
  const frame = frames[(Number(occurrence) + familyOffset) % frames.length];
  const prefix = skill === 'Linear functions and representations'
    ? 'Multiple representations describe the same linear model. '
    : skill === 'Linear representations'
      ? 'The representations describe one linear relationship. '
      : '';
  const prompt = String(constructed.prompt || '');
  const separator = /[.!?]$/.test(prompt) ? ' ' : '. ';
  const diversifiedPrompt = prompt + separator + prefix + frame;
  const suffix = 'v3-' + kind + '-' + String(familyOffset) + '-' + String(Number(occurrence) % frames.length);
  return {
    ...constructed,
    prompt: diversifiedPrompt,
    originalityFingerprint: String(constructed.originalityFingerprint || '') + '-' + suffix,
    conceptFingerprint: String(constructed.conceptFingerprint || '') + '-' + suffix,
    metadata: {
      ...constructed.metadata,
      constructionFamily: String(constructed.metadata?.constructionFamily || '') + '-v3-' + String(familyOffset),
      linearVariationIndex: (Number(occurrence) + familyOffset) % frames.length,
      linearVariationSource: 'construction-v3-prompt-diversity',
    },
  };
}
`;

  s = s.replace(importMarker, importMarker + '\n' + linearV3Marker + '\n' + helper);

  const fnOld = "if (skill === 'Linear relationships' || skill === 'Linear functions') return buildBatchMLinearV2(question, o, 'function');";
  const fnNew = "if (skill === 'Linear relationships' || skill === 'Linear functions') return diversifyBatchMLinearV3(question, buildBatchMLinearV2(question, o, 'function'), o, 'function');";
  if (!s.includes(fnOld)) throw new Error('Missing Batch M linear function v2 route.');
  s = s.replace(fnOld, fnNew);

  const repOld = "if (skill === 'Equivalent linear representations' || skill === 'Linear representations' || skill === 'Linear functions and representations') return buildBatchMLinearV2(question, o, 'representation');";
  const repNew = "if (skill === 'Equivalent linear representations' || skill === 'Linear representations' || skill === 'Linear functions and representations') return diversifyBatchMLinearV3(question, buildBatchMLinearV2(question, o, 'representation'), o, 'representation');";
  if (!s.includes(repOld)) throw new Error('Missing Batch M linear representation v2 route.');
  s = s.replace(repOld, repNew);
}

console.log('Applied Batch M linear construction v3 cross-target diversity.');
fs.writeFileSync(mathFile, s, 'utf8');