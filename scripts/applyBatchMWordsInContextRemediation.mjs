import fs from 'node:fs';

const targetPath = 'src/data/sat/mockContent/verbalConstructionRemediated.js';
let source = fs.readFileSync(targetPath, 'utf8');
const marker = '// Batch M Words in Context diversity remediation v1';

if (!source.includes(marker)) {
  const oldTargets = `const WIC_TARGETS = {
  technical: [
    ['attenuate', 'reduce the strength of'], ['constrain', 'limit the range of'], ['mediate', 'influence an outcome through an intervening process'], ['retain', 'continue to hold or preserve'],
  ],
  figurative: [
    ['anchor', 'provide a stable reference for'], ['fracture', 'divide or disrupt'], ['amplify', 'make more noticeable or pronounced'], ['temper', 'make less extreme'],
  ],
  rhetorical: [
    ['clarify', 'make a claim or distinction more precise'], ['concede', 'acknowledge a point that may seem to oppose the main claim'], ['underscore', 'emphasize'], ['distinguish', 'show a meaningful difference between'],
  ],
  contextual: [
    ['trace', 'follow the development or origin of'], ['channel', 'direct toward a particular course'], ['yield', 'produce or result in'], ['register', 'show or record'],
  ],
};`;

  const newTargets = `const WIC_TARGETS = {
  technical: [
    ['attenuate', 'reduce the strength of'],
    ['constrain', 'limit the range of'],
    ['mediate', 'influence an outcome through an intervening process'],
    ['retain', 'continue to hold or preserve'],
    ['diminish', 'make or become less pronounced'],
    ['stabilize', 'make less likely to change abruptly'],
    ['modulate', 'adjust the degree or intensity of'],
    ['sustain', 'maintain over a period of time'],
  ],
  figurative: [
    ['anchor', 'provide a stable reference for'],
    ['fracture', 'divide or disrupt'],
    ['amplify', 'make more noticeable or pronounced'],
    ['temper', 'make less extreme'],
    ['illuminate', 'make an idea or issue easier to understand'],
    ['echo', 'repeat or reflect an idea or quality'],
    ['unsettle', 'disturb an established expectation or assumption'],
    ['reinforce', 'make an existing impression or idea stronger'],
  ],
  rhetorical: [
    ['clarify', 'make a claim or distinction more precise'],
    ['concede', 'acknowledge a point that may seem to oppose the main claim'],
    ['underscore', 'emphasize'],
    ['distinguish', 'show a meaningful difference between'],
    ['moderate', 'make a claim or statement less absolute'],
    ['acknowledge', 'recognize a point without necessarily accepting its full implication'],
    ['frame', 'present an issue from a particular perspective'],
    ['invoke', 'refer to an idea or example for a particular purpose'],
  ],
  contextual: [
    ['trace', 'follow the development or origin of'],
    ['channel', 'direct toward a particular course'],
    ['yield', 'produce or result in'],
    ['register', 'show or record'],
    ['derive', 'obtain from a particular source or process'],
    ['encounter', 'come into contact with or experience'],
    ['retain', 'continue to have within a particular setting'],
    ['reflect', 'show or express a condition or pattern'],
  ],
};`;

  if (!source.includes(oldTargets)) throw new Error('Expected WIC_TARGETS block not found.');
  source = source.replace(oldTargets, newTargets + '\n\n' + marker);

  const oldBuild = `  else if (plan.skill === 'Words in Context') {
    const wicOrdinal = Math.floor(index / SECTIONS.length);
    const wicFamily = sourceFamily(wicOrdinal);
    result = makeWIC(wicOrdinal, makeStimulus(wicFamily, wicOrdinal));
  }`;
  const newBuild = `  else if (plan.skill === 'Words in Context') {
    const wicOrdinal = Math.floor(index / SECTIONS.length);
    const wicFamily = FAMILY_KEYS[Math.floor(wicOrdinal / 3) % FAMILY_KEYS.length];
    result = makeWIC(wicOrdinal, makeStimulus(wicFamily, wicOrdinal + index));
  }`;
  if (!source.includes(oldBuild)) throw new Error('Expected Words in Context build branch not found.');
  source = source.replace(oldBuild, newBuild);
}

const v2Marker = '// Batch M Words in Context construction remediation v2';
if (!source.includes(v2Marker)) {
  const difficultyMarker = "const DIFFICULTY_CYCLE = ['easy', 'medium', 'medium', 'hard'];";
  const difficultyReplacement = `${difficultyMarker}\nconst WIC_DIFFICULTY_CYCLE = ['easy', 'easy', 'easy', 'medium', 'medium', 'medium', 'medium', 'medium', 'hard', 'hard'];`;
  if (!source.includes(difficultyMarker)) throw new Error('Expected difficulty cycle not found.');
  source = source.replace(difficultyMarker, difficultyReplacement);

  const difficultyLine = "  const difficulty = pick(DIFFICULTY_CYCLE, index + Math.floor(index / 7));";
  const difficultyLineReplacement = "  const difficulty = plan.skill === 'Words in Context'\n    ? pick(WIC_DIFFICULTY_CYCLE, Math.floor(index / SECTIONS.length))\n    : pick(DIFFICULTY_CYCLE, index + Math.floor(index / 7));";
  if (!source.includes(difficultyLine)) throw new Error('Expected candidate difficulty line not found.');
  source = source.replace(difficultyLine, difficultyLineReplacement);

  const wicFunctionMarker = 'function makeWIC(index, stimulus) {';
  const constructionArray = `const WIC_CONSTRUCTION_V2 = [
  'The author uses the term within a distinction between an observed effect and a broader interpretation.',
  'The term appears where the author connects a specific observation to the condition that shapes it.',
  'Here, the wording makes the effect more precise by limiting what the surrounding evidence establishes.',
  'The term helps the passage separate the reported pattern from an explanation that would be too broad.',
  'In this passage, the word carries a meaning shaped by the evidence immediately surrounding it.',
  'The author selects the term to describe how one part of the evidence changes the significance of another.',
  'The context uses the word to mark a relationship rather than simply name a topic or feature.',
  'The word is chosen because the surrounding discussion requires a precise description of scope or effect.',
  'The passage uses the term to connect the immediate detail with the qualification that follows it.',
  'Here, the word helps characterize a conditional result rather than an unconditional claim.',
  'The author’s use of the term reflects the way the passage weighs the evidence against a competing interpretation.',
  'The wording places the term between the observation and the conclusion the author draws from it.',
  'In context, the word identifies the particular role of the relevant feature in the reported result.',
  'The term helps the author distinguish what the evidence shows from what it merely might suggest.',
  'The surrounding language gives the word a meaning tied to the passage’s specific pattern of evidence.',
  'The author uses the term to describe the effect while preserving the passage’s limiting condition.',
];`;
  if (!source.includes(wicFunctionMarker)) throw new Error('Expected makeWIC function marker not found.');
  source = source.replace(wicFunctionMarker, `${constructionArray}\n\n${v2Marker}\n\n${wicFunctionMarker}`);

  const sentenceLine = '  const contextualSentence = `${stimulus} ${frame} ${context}`;';
  const sentenceReplacement = "  const construction = pick(WIC_CONSTRUCTION_V2, wicIndex);\n  const contextualSentence = `${stimulus} ${construction} ${frame} ${context}`;";
  if (!source.includes(sentenceLine)) throw new Error('Expected WIC contextual sentence line not found.');
  source = source.replace(sentenceLine, sentenceReplacement);

  console.log('Applied Batch M Words in Context construction remediation v2.');
} else {
  console.log('Batch M Words in Context construction remediation v2 already present; no change needed.');
}

fs.writeFileSync(targetPath, source);
