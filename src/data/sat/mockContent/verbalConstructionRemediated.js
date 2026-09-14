/**
 * Batch M remediation candidate generator for Reading & Writing.
 *
 * Candidate-only module. It is deliberately not imported by the frozen
 * production store. It creates replacement candidates with construction
 * diversity that is materially different from the legacy Batch C layer.
 */

import { RW_REMEDIATION_CONSTRUCTIONS, RW_SOURCE_BLUEPRINTS, DIFFICULTY_REQUIREMENTS } from './batchMRemediationBlueprint';
import { evaluateContentQuality } from './batchMContentQualityGate';

const SOURCE_MATERIAL = {
  literature: [
    ['The station clock had been repaired, but Mara still checked the kitchen clock before leaving.', 'When she later noticed that the station clock was running three minutes fast, her earlier caution seemed less like indecision and more like a response to an unreliable reference.'],
    ['Jonas kept a box of his grandfather’s sketches unopened for years because he believed preserving it meant preserving the past.', 'After finding annotations that explained why several sketches were unfinished, he began to see the box not as a finished record but as evidence of choices still in progress.'],
    ['A gardener removed a broken gate from the courtyard expecting the space to become easier to maintain.', 'Instead, neighbors began crossing through it and lingering there, changing the courtyard from a shortcut into an informal meeting place.'],
    ['Leena initially regarded the faded sign outside the theater as an eyesore.', 'Once she learned that the lettering had been repainted by volunteers after each renovation, the sign became evidence of the building’s continuing local use.'],
  ],
  'history-social-science': [
    ['A city introduced staggered delivery hours to reduce congestion near its central market.', 'Traffic fell on the busiest streets, but merchants on smaller side streets reported a different pattern because deliveries shifted rather than disappeared.'],
    ['A local newspaper campaign encouraged residents to use a newly expanded public library.', 'Membership increased most sharply in neighborhoods where the library also offered evening programs, suggesting that access alone did not explain the change.'],
    ['A cooperative changed its purchasing policy after regional prices became less predictable.', 'The policy reduced exposure to short-term price swings, although members with different production schedules benefited by different amounts.'],
    ['A neighborhood association formed after a rapid increase in apartment construction.', 'Its early meetings focused on street maintenance, but later records show that members used the organization to negotiate several unrelated community concerns.'],
  ],
  humanities: [
    ['Acousticians comparing small performance spaces found that audiences did not judge clarity solely by measured reverberation time.', 'The results suggested that wall geometry and the position of the listener also influenced how clearly performers were heard.'],
    ['Archaeologists had used repeated ceramic styles as evidence of a regional trade connection.', 'A newer comparison showed that the same styles could have spread through exchange networks that did not require a single central trading route.'],
    ['Art historians studying a landscape tradition noticed a shift toward unusually saturated colors in paintings made after a regional exhibition opened.', 'The shift was strongest among artists who attended the exhibition, but it was not present in every work produced afterward.'],
    ['A linguist comparing two related dialects found that speakers used several different expressions before making uncertain claims.', 'The expressions varied with audience and setting, indicating that uncertainty was communicated through more than a single grammatical feature.'],
  ],
  science: [
    ['Researchers exposed seedlings to either continuous light or repeated short light intervals.', 'Both groups accumulated similar total exposure, but the intermittent treatment produced a different growth pattern, indicating that timing mattered as well as total duration.'],
    ['A field study measured sediment movement before and after vegetation was restored along a riverbank.', 'Average movement declined after restoration, but the largest storms still produced substantial transport, limiting how broadly the result could be applied.'],
    ['Engineers tested whether a coating changed the stability of a battery electrode during repeated charge cycles.', 'The coated electrodes retained capacity more consistently, although the benefit was smaller at the highest cycling temperature.'],
    ['Biologists tracked migratory birds at several stopover sites while local food availability changed.', 'Birds shifted their arrival timing at some sites, but the response varied with the distance to the next available feeding area.'],
  ],
};

const WIC_TARGETS = {
  technical: [
    ['attenuate', 'reduce the strength of'],
    ['constrain', 'limit the range of'],
    ['mediate', 'influence an outcome through an intervening process'],
    ['retain', 'continue to hold or preserve'],
  ],
  figurative: [
    ['anchor', 'provide a stable reference for'],
    ['fracture', 'divide or disrupt'],
    ['amplify', 'make more noticeable or pronounced'],
    ['temper', 'make less extreme'],
  ],
  rhetorical: [
    ['qualify', 'limit a claim so that it is more precise'],
    ['concede', 'acknowledge a point that may seem to oppose the main claim'],
    ['underscore', 'emphasize'],
    ['distinguish', 'show a meaningful difference between'],
  ],
  contextual: [
    ['trace', 'follow the development or origin of'],
    ['channel', 'direct toward a particular course'],
    ['yield', 'produce or result in'],
    ['register', 'show or record'],
  ],
};

const SECTIONS = [
  { skill: 'Central Ideas and Details', domain: 'information-and-ideas', operation: 'identify' },
  { skill: 'Inferences', domain: 'information-and-ideas', operation: 'infer' },
  { skill: 'Command of Evidence', domain: 'information-and-ideas', operation: 'evaluate' },
  { skill: 'Words in Context', domain: 'craft-and-structure', operation: 'interpret' },
  { skill: 'Text Structure and Purpose', domain: 'craft-and-structure', operation: 'interpret' },
  { skill: 'Cross-Text Connections', domain: 'craft-and-structure', operation: 'synthesize' },
  { skill: 'Rhetorical Synthesis', domain: 'expression-of-ideas', operation: 'synthesize' },
  { skill: 'Transitions', domain: 'expression-of-ideas', operation: 'evaluate' },
  { skill: 'Boundaries', domain: 'standard-english-conventions', operation: 'evaluate' },
  { skill: 'Form, Structure, and Sense', domain: 'standard-english-conventions', operation: 'evaluate' },
];

const DIFFICULTY_CYCLE = ['easy', 'medium', 'medium', 'hard'];

function pick(list, index) {
  return list[((index % list.length) + list.length) % list.length];
}

function sourceFamily(index) {
  return pick(Object.keys(SOURCE_MATERIAL), index * 3 + 1);
}

function makeStimulus(family, index) {
  const pair = pick(SOURCE_MATERIAL[family], index);
  return `${pair[0]} ${pair[1]}`;
}

function makeEvidenceQuestion(stimulus, index) {
  const choices = [
    'A measurement collected after the relevant condition changed shows whether the observed pattern persisted.',
    'A statement describing the researchers’ general interest in the topic establishes the mechanism directly.',
    'A later observation from an unrelated setting proves that the original pattern always occurs.',
    'A summary of the topic’s history establishes why the measured difference must have one cause.',
  ];
  const target = index % 4;
  const correct = choices[0];
  choices.splice(0, 1);
  choices.splice(target, 0, correct);
  return { choices, answer: String.fromCharCode(65 + target), prompt: `${stimulus}\n\nWhich finding would provide the strongest evidence for the interpretation presented in the text?` };
}

function makeWIC(index, stimulus) {
  const family = pick(Object.keys(WIC_TARGETS), index);
  const [word, meaning] = pick(WIC_TARGETS[family], Math.floor(index / 4));
  const choices = [meaning, 'make the result more difficult to observe', 'remove every limitation from the claim', 'repeat an earlier observation without changing it'];
  const target = (index + 1) % 4;
  const correct = choices[0];
  choices.splice(0, 1);
  choices.splice(target, 0, correct);
  return {
    choices,
    answer: String.fromCharCode(65 + target),
    prompt: `${stimulus} In this context, the word “${word}” most nearly means which of the following?`,
    targetWord: word,
  };
}

function makeSynthesis(index) {
  const family = pick(Object.keys(SOURCE_MATERIAL), index + 2);
  const pair = pick(SOURCE_MATERIAL[family], index);
  const notes = [
    `Research focus: ${pair[0]}`,
    `Finding: ${pair[1]}`,
    'Qualification: the result varied when an important condition changed.',
    'Goal: communicate the finding accurately without overstating its scope.',
  ];
  const choices = [
    `${pair[1]} This result should therefore be interpreted in light of the condition that changed.`,
    'The study was conducted by researchers who were interested in the topic.',
    'The study produced observations that can be generalized to every possible setting.',
    'The researchers collected several measurements before discussing the topic.',
  ];
  const target = (index + 2) % 4;
  const correct = choices[0];
  choices.splice(0, 1);
  choices.splice(target, 0, correct);
  return { prompt: `${notes.join(' ')}\n\nThe student wants to communicate the main finding while preserving its important qualification. Which choice best accomplishes this goal?`, choices, answer: String.fromCharCode(65 + target) };
}

function makeCrossText(index) {
  const firstFamily = pick(Object.keys(SOURCE_MATERIAL), index);
  const secondFamily = pick(Object.keys(SOURCE_MATERIAL), index + 1);
  const first = pick(SOURCE_MATERIAL[firstFamily], index);
  const second = pick(SOURCE_MATERIAL[secondFamily], index + 2);
  const choices = [
    'Both texts indicate that a broad pattern can depend on the conditions under which it is observed.',
    'Both texts establish that a pattern remains identical whenever the setting changes.',
    'The first text rejects measurement, whereas the second text relies only on personal opinion.',
    'The two texts reach opposite conclusions because neither considers evidence from observations.',
  ];
  const target = (index + 3) % 4;
  const correct = choices[0];
  choices.splice(0, 1);
  choices.splice(target, 0, correct);
  return { prompt: `Passage 1: ${first[0]} ${first[1]}\n\nPassage 2: ${second[0]} ${second[1]}\n\nWhich statement best describes a relationship between the two passages?`, choices, answer: String.fromCharCode(65 + target) };
}

function makeSENTask(skill, index) {
  if (skill === 'Transitions') {
    const sets = [
      ['The initial measurements showed a clear increase. _____, the increase was smaller when the temperature was higher.', ['However,', 'Therefore,', 'For example,', 'Likewise,'], 0],
      ['The first model explains the overall trend. _____, the second model accounts for the unusually large values at the upper end.', ['In contrast,', 'For instance,', 'As a result,', 'Similarly,'], 0],
      ['The researchers repeated the test under a second condition. _____, they compared the two sets of observations.', ['Next,', 'Nevertheless,', 'Instead,', 'For example,'], 0],
      ['The result was consistent across three sites. _____, the fourth site showed a different response.', ['By contrast,', 'For example,', 'In addition,', 'Therefore,'], 0],
    ];
    const set = sets[index % sets.length];
    return { prompt: set[0], choices: set[1], answer: 'A' };
  }
  if (skill === 'Boundaries') {
    const sets = [
      ['The revised method produced a clearer signal _____ it required additional calibration.', ['; however,', ', however', '; therefore,', ', therefore,'], 0],
      ['The team changed the sampling interval _____ the original interval missed several short events.', ['because', '; because', ', because,', '; however,'], 0],
      ['The archive was incomplete _____ researchers could still compare the surviving records.', ['but', '; but', ', but,', 'and;'], 0],
      ['The estimate was reliable _____ only within the range represented by the data.', ['but', '; but', ', but,', ': but'], 0],
    ];
    const set = sets[index % sets.length];
    return { prompt: set[0], choices: set[1], answer: 'A' };
  }
  const sets = [
    ['The collection of measurements _____ the basis for comparison.', ['provides', 'provide', 'providing', 'have provided'], 0],
    ['The researchers who repeated the test _____ the same trend.', ['observed', 'observes', 'observing', 'has observed'], 0],
    ['The revised estimates, along with the original measurements, _____ included in the final table.', ['are', 'is', 'being', 'has been'], 0],
    ['The report describes the conditions that _____ the response.', ['affected', 'affects', 'affecting', 'has affected'], 0],
  ];
  const set = sets[index % sets.length];
  return { prompt: set[0], choices: set[1], answer: 'A' };
}

function rotateChoices(choices, target) {
  const out = [...choices];
  const correct = out.shift();
  out.splice(target, 0, correct);
  return { choices: out, answer: String.fromCharCode(65 + target) };
}

function buildCandidate({ index, testId = 'SAT1', variant = 'sat', module = 'reading-writing-module-1' }) {
  const plan = pick(SECTIONS, index);
  const family = sourceFamily(index);
  const construction = pick(RW_REMEDIATION_CONSTRUCTIONS[plan.skill], index + 2);
  const difficulty = pick(DIFFICULTY_CYCLE, index + 1);
  const stimulus = makeStimulus(family, index);
  let prompt = stimulus;
  let choices;
  let answer;
  let targetWord = null;

  if (plan.skill === 'Command of Evidence') {
    ({ prompt, choices, answer } = makeEvidenceQuestion(stimulus, index));
  } else if (plan.skill === 'Words in Context') {
    ({ prompt, choices, answer, targetWord } = makeWIC(index, stimulus));
  } else if (plan.skill === 'Cross-Text Connections') {
    ({ prompt, choices, answer } = makeCrossText(index));
  } else if (plan.skill === 'Rhetorical Synthesis') {
    ({ prompt, choices, answer } = makeSynthesis(index));
  } else if (plan.skill === 'Transitions' || plan.skill === 'Boundaries' || plan.skill === 'Form, Structure, and Sense') {
    ({ prompt, choices, answer } = makeSENTask(plan.skill, index));
  } else if (plan.skill === 'Inferences') {
    choices = [
      'The result is likely influenced by the condition that changed between observations.',
      'The result must be identical under all possible conditions.',
      'The observations prove that only one factor can explain the result.',
      'The observations are too limited to support any comparison at all.',
    ];
    ({ choices, answer } = rotateChoices(choices, (index + 1) % 4));
    prompt = `${stimulus}\n\nWhich inference is best supported by the text?`;
  } else if (plan.skill === 'Text Structure and Purpose') {
    choices = [
      'To introduce a finding and then narrow its interpretation by identifying an important condition.',
      'To replace the main finding with an unrelated historical detail.',
      'To provide background that the author explicitly says is irrelevant.',
      'To repeat the opening claim without adding or limiting information.',
    ];
    ({ choices, answer } = rotateChoices(choices, (index + 2) % 4));
    prompt = `${stimulus}\n\nWhy does the author include the second sentence in relation to the first?`;
  } else {
    choices = [
      'The text presents a finding while distinguishing the evidence from a broader claim.',
      'The text establishes that the finding applies without exception.',
      'The text focuses entirely on background information and avoids an interpretation.',
      'The text argues that the evidence cannot be compared across conditions.',
    ];
    ({ choices, answer } = rotateChoices(choices, index % 4));
    prompt = `${stimulus}\n\nWhich choice best states the main idea of the text?`;
  }

  const difficultyFeatures = difficulty === 'hard'
    ? ['multi-step', 'strategic-choice', 'evidence-synthesis']
    : difficulty === 'medium'
      ? ['careful-interpretation']
      : [];
  const id = `${testId}-rw-rem-${String(index + 1).padStart(3, '0')}`;
  const record = {
    contentId: id,
    version: 7,
    product: 'sat',
    questionId: id,
    testId,
    assessmentFamily: variant === 'psat-nmsqt' ? 'psat' : 'sat',
    assessmentVariant: variant,
    assessmentNumber: 1,
    section: 'reading-writing',
    module,
    domain: plan.domain,
    skill: plan.skill,
    subskill: construction,
    conceptId: `${plan.domain}-${plan.skill.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    difficulty,
    difficultyBand: `${variant}-${difficulty}`,
    cognitiveDemand: plan.operation === 'identify' ? 'identify' : plan.operation,
    questionType: 'multiple-choice',
    stimulusType: plan.skill === 'Rhetorical Synthesis' ? 'notes' : 'short-passage',
    interactionType: 'single-select',
    timingMode: 'timed',
    estimatedTimeSeconds: difficulty === 'hard' ? 82 : difficulty === 'medium' ? 70 : 55,
    calculatorEligibility: false,
    calculatorMode: 'not-applicable',
    calculatorRequired: false,
    referenceSheetRelevant: false,
    passageId: plan.skill === 'Rhetorical Synthesis' ? null : `${testId}-rem-passage-${String(index + 1).padStart(3, '0')}`,
    prompt,
    choices,
    answer,
    explanation: targetWord
      ? `In context, “${targetWord}” is used with the meaning represented by the keyed choice.`
      : 'The keyed choice matches the item-specific evidence, rhetorical relationship, or grammatical constraint established by the construction.',
    figure: null,
    isOperational: false,
    adaptiveRoute: null,
    originalityFingerprint: `batch-m-rem-${variant}-${testId}-${index}-${family}-${construction}`,
    conceptFingerprint: `${plan.domain}-${plan.skill}-${family}-${index}`,
    tags: [variant, 'batch-m-remediation-candidate', 'apriori-original', `source-${family}`],
    lessonIds: [],
    sourceType: 'apriori-original',
    authoringStatus: 'candidate',
    status: 'candidate',
    releaseEligibility: false,
    metadata: {
      sourceFamily: family,
      sourceBlueprint: pick(RW_SOURCE_BLUEPRINTS[family], index),
      rhetoricalStructure: construction,
      evidenceRelationship: pick(['direct-support', 'qualified-support', 'contrast', 'inference', 'example-to-claim'], index + 1),
      cognitiveOperation: plan.operation,
      difficultyFeatures,
      difficultyRequirements: DIFFICULTY_REQUIREMENTS[difficulty],
      targetWord,
      candidateOnly: true,
      productionMutation: false,
    },
  };
  return record;
}

export function generateRemediatedRWCandidates(options = {}) {
  const count = Math.max(1, Number(options.count) || 40);
  const candidates = Array.from({ length: count }, (_, index) => buildCandidate({ ...options, index }));
  return {
    candidates,
    quality: candidates.map(evaluateContentQuality),
    productionMutation: false,
  };
}

export default generateRemediatedRWCandidates;
