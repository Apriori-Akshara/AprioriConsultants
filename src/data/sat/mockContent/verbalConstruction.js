/**
 * Batch C — dedicated Reading & Writing construction layer.
 *
 * This module separates source-family/rhetorical construction from mock
 * assembly. It deliberately does not implement Batch D's distractor/evidence
 * map or independent QC system; it produces structured, original R&W items
 * for those later gates.
 */

const SOURCE_FAMILIES = [
  'literature',
  'history-social-science',
  'humanities',
  'science',
];

const RHETORICAL_STRUCTURES = [
  'observation-qualification',
  'claim-evidence-interpretation',
  'contrast-development',
  'problem-response-limitation',
  'comparison-synthesis',
  'cause-effect-qualification',
];

const EVIDENCE_RELATIONSHIPS = [
  'direct-support',
  'qualified-support',
  'contrast',
  'inference',
  'example-to-claim',
  'relationship-reversal',
];

const COGNITIVE_OPERATIONS = ['identify', 'interpret', 'infer', 'evaluate', 'synthesize'];

const SOURCE_TOPICS = {
  literature: [
    'a cartographer returning to a town altered by a new railway',
    'a musician deciding whether to preserve a family composition unchanged',
    'a gardener noticing that a neglected courtyard has become a meeting place',
    'a student sorting letters left by a relative who avoided public attention',
    'a sculptor reconsidering a work after seeing it in a crowded exhibition',
    'a traveler recognizing a familiar landscape from an unfamiliar direction',
  ],
  'history-social-science': [
    'municipal efforts to coordinate street markets as cities expanded',
    'changes in how local newspapers described public libraries in the early twentieth century',
    'a community debate over whether a new transit route should follow an older commercial corridor',
    'farmers adapting cooperative practices when regional prices became less predictable',
    'the spread of neighborhood associations during a period of rapid population growth',
    'a policy experiment designed to reduce congestion without restricting access to businesses',
  ],
  humanities: [
    'the acoustic design of small performance spaces',
    'how archaeologists infer trade connections from recurring ceramic materials',
    'the changing use of color in a regional school of landscape painting',
    'a linguist comparing how speakers signal uncertainty in two related dialects',
    'the restoration choices made when a damaged architectural feature has several plausible originals',
    'a museum study of how visitors move between objects with related themes',
  ],
  science: [
    'how seedlings respond to intermittent rather than constant light',
    'the movement of sediment after vegetation is restored along a riverbank',
    'whether a coating changes the stability of a battery electrode during repeated cycles',
    'how migratory birds alter stopover timing when food availability changes',
    'the effect of water temperature on the activity of a freshwater organism',
    'whether an imaging method detects canopy changes more consistently after calibration',
  ],
};

const SOURCE_DETAILS = {
  literature: [
    'The narrator initially treats the change as an inconvenience, but a later observation makes the earlier judgment seem incomplete.',
    'The character values continuity, yet the setting repeatedly introduces evidence that change has already occurred.',
    'The scene moves from a concrete detail to a reflection that reveals the character’s uncertainty rather than resolving it.',
  ],
  'history-social-science': [
    'Contemporary records show that the policy produced a visible change, although the effect varied across neighborhoods.',
    'The evidence suggests that the change was not caused by a single decision but developed through several local responses.',
    'Researchers distinguish the stated purpose of the initiative from the later uses residents found for it.',
  ],
  humanities: [
    'The comparison indicates that a feature often described as decorative also served a practical communicative purpose.',
    'The researchers caution that a recurring feature does not by itself establish a single origin or intention.',
    'The evidence becomes more informative when the object is considered alongside the setting in which audiences encountered it.',
  ],
  science: [
    'Measurements show a consistent overall pattern, but the magnitude of the effect changes under different conditions.',
    'The experiment separates an observed association from the stronger claim that one factor alone caused the outcome.',
    'A follow-up measurement supports the broad interpretation while identifying a condition that limits how widely it can be applied.',
  ],
};

const SKILL_PLAN = [
  { domain: 'information-and-ideas', skill: 'Central Ideas and Details', operation: 'identify' },
  { domain: 'information-and-ideas', skill: 'Inferences', operation: 'infer' },
  { domain: 'information-and-ideas', skill: 'Command of Evidence', operation: 'evaluate' },
  { domain: 'craft-and-structure', skill: 'Words in Context', operation: 'interpret' },
  { domain: 'craft-and-structure', skill: 'Text Structure and Purpose', operation: 'interpret' },
  { domain: 'craft-and-structure', skill: 'Cross-Text Connections', operation: 'synthesize' },
  { domain: 'expression-of-ideas', skill: 'Rhetorical Synthesis', operation: 'synthesize' },
  { domain: 'expression-of-ideas', skill: 'Transitions', operation: 'evaluate' },
  { domain: 'standard-english-conventions', skill: 'Boundaries', operation: 'evaluate' },
  { domain: 'standard-english-conventions', skill: 'Form, Structure, and Sense', operation: 'evaluate' },
];

const DIFFICULTIES = ['easy', 'medium', 'medium', 'hard', 'medium', 'easy', 'hard', 'medium', 'easy', 'hard'];

function words(text) {
  return String(text).trim().split(/\s+/).filter(Boolean).length;
}

function choose(list, index) {
  return list[((index % list.length) + list.length) % list.length];
}

function makePassage({ family, index, seed, structure }) {
  const topic = choose(SOURCE_TOPICS[family], index + seed * 2);
  const detail = choose(SOURCE_DETAILS[family], index * 2 + seed);
  const bridge = choose([
    `In examining ${topic}, researchers focused on what changed rather than assuming that the change had a single explanation.`,
    `A recent study of ${topic} compared observations from different conditions instead of treating the first pattern as conclusive.`,
    `An account of ${topic} becomes more informative when its evidence is considered alongside the circumstances in which it was collected.`,
  ], index + seed + structure.length);
  const conclusion = choose([
    'Taken together, the observations support a useful pattern but leave room for a more qualified interpretation.',
    'The result therefore supports a narrower claim than a simple comparison might initially suggest.',
    'This distinction matters because the evidence describes what occurred under the observed conditions, not every possible condition.',
  ], index + seed * 3);
  const passage = `${bridge} ${detail} ${conclusion}`;
  return passage;
}

function makeNotes(index, seed) {
  const topic = choose(SOURCE_TOPICS.humanities.concat(SOURCE_TOPICS['history-social-science']), index + seed);
  return [
    `Study focus: ${topic}.`,
    'Observation: the evidence shows a measurable difference between the two settings.',
    'Qualification: the size of the difference depends on conditions surrounding the observation.',
    'Goal: state the result accurately without making a broader claim than the evidence supports.',
  ];
}

function buildBlueprint({ index, seed, family, plan }) {
  const difficulty = choose(DIFFICULTIES, index + seed);
  const structure = choose(RHETORICAL_STRUCTURES, index * 3 + seed);
  const evidence = choose(EVIDENCE_RELATIONSHIPS, index + seed * 2);
  return {
    sourceFamily: family,
    textType: family === 'literature' ? 'literary-prose' : family === 'science' ? 'research-summary' : 'informational-prose',
    rhetoricalStructure: structure,
    evidenceRelationship: evidence,
    domain: plan.domain,
    skill: plan.skill,
    cognitiveOperation: plan.operation,
    difficulty,
    questionConstruction: plan.skill,
    passageLengthTarget: difficulty === 'hard' ? '70-110' : difficulty === 'medium' ? '50-90' : '35-70',
  };
}

function rotateChoices(choices, target) {
  const out = [...choices];
  const correct = out.shift();
  out.splice(target, 0, correct);
  return { choices: out, answer: String.fromCharCode(65 + target) };
}

function constructionChoices(skill, family, index) {
  const source = family === 'science' ? 'the experiment' : family === 'literature' ? 'the passage' : 'the account';
  const templates = {
    'Central Ideas and Details': [
      `The ${source} identifies a pattern while qualifying how broadly it should be interpreted.`,
      `The ${source} proves that the observed result occurs in every comparable setting.`,
      `The ${source} treats one observation as sufficient to establish a universal rule.`,
      `The ${source} focuses mainly on background details without reaching an interpretive conclusion.`,
    ],
    Inferences: [
      'The observed relationship may change when relevant surrounding conditions change.',
      'The observed relationship must remain identical regardless of surrounding conditions.',
      'The evidence establishes a single cause with no need for further comparison.',
      'The observations show that the measured difference is too small to interpret.',
    ],
    'Command of Evidence': [
      'A follow-up observation reproduces the predicted pattern after the relevant condition is changed.',
      'The researchers collected observations from more than one location or setting.',
      'The researchers recorded both averages and individual observations.',
      'The study followed earlier work on a related question.',
    ],
    'Words in Context': ['qualify', 'measure', 'decorate', 'separate'],
    'Text Structure and Purpose': [
      'To qualify a broader finding by identifying a condition that limits it.',
      'To replace the central finding with an unrelated explanation.',
      'To provide background that has no effect on the interpretation.',
      'To repeat the earlier observation without adding information.',
    ],
    'Cross-Text Connections': [
      'Both authors support a qualified interpretation of a broad pattern.',
      'Both authors argue that a result must be identical in every setting.',
      'Both authors conclude that local conditions make comparison unnecessary.',
      'Both authors treat a single observation as sufficient for a universal rule.',
    ],
    'Rhetorical Synthesis': [
      'The comparison reveals a measurable effect, although its size depends on the conditions studied.',
      'The researchers collected observations and recorded them at several locations.',
      'The study examined a defined group during a specified period.',
      'The project used multiple observations but did not report a result.',
    ],
    Transitions: ['However,', 'For example,', 'Similarly,', 'In addition,'],
    Boundaries: ['; however,', '; therefore,', '; for example,', '; similarly,'],
    'Form, Structure, and Sense': ['supports', 'support', 'supporting', 'have supported'],
  };
  return templates[skill] || templates['Central Ideas and Details'];
}

function makeQuestion({ index, seed, testId, variant, module, route }) {
  const family = choose(SOURCE_FAMILIES, index + seed);
  const plan = choose(SKILL_PLAN, index * 7 + seed);
  const blueprint = buildBlueprint({ index, seed, family, plan });
  const passage = plan.skill === 'Rhetorical Synthesis' ? null : makePassage({ family, index, seed, structure: blueprint.rhetoricalStructure });
  let prompt;
  let choices = constructionChoices(plan.skill, family, index);
  let explanation;

  if (plan.skill === 'Central Ideas and Details') prompt = 'Which choice best states the main idea of the text?';
  else if (plan.skill === 'Inferences') prompt = 'Which inference is best supported by the text?';
  else if (plan.skill === 'Command of Evidence') prompt = 'Which finding would best support the interpretation presented in the text?';
  else if (plan.skill === 'Words in Context') prompt = 'As used in the text, what does “qualify” most nearly mean?';
  else if (plan.skill === 'Text Structure and Purpose') prompt = 'Why does the author include the information about the conditions surrounding the result?';
  else if (plan.skill === 'Cross-Text Connections') {
    const second = makePassage({ family: choose(SOURCE_FAMILIES, index + seed + 2), index: index + 19, seed: seed + 3, structure: choose(RHETORICAL_STRUCTURES, index + 4) });
    prompt = `Passage 2: ${second}\n\nBased on the two passages, which statement would both authors most likely agree with?`;
  } else if (plan.skill === 'Rhetorical Synthesis') {
    const notes = makeNotes(index, seed);
    prompt = `${notes.join(' ')}\n\nThe student wants to emphasize the study’s main result while preserving its important qualification. Which choice best accomplishes this goal?`;
  } else if (plan.skill === 'Transitions') {
    prompt = 'The researchers observed a strong overall pattern. _____, the size of the effect differed among the study conditions.';
  } else if (plan.skill === 'Boundaries') {
    prompt = 'The revised method produced a clearer signal _____ it required additional calibration.';
  } else {
    prompt = 'The set of measurements, rather than the individual readings, _____ the basis for comparison.';
  }

  if (plan.skill === 'Words in Context') explanation = 'In context, qualify means to limit or modify a statement so that it is not interpreted too broadly.';
  else if (plan.skill === 'Transitions') explanation = 'However correctly signals the contrast between the broad pattern and the difference in effect size.';
  else if (plan.skill === 'Boundaries') explanation = 'The semicolon separates two independent clauses, while however correctly signals their contrast.';
  else if (plan.skill === 'Form, Structure, and Sense') explanation = 'The singular subject set takes the singular verb supports.';
  else explanation = 'The first choice directly reflects the evidence relationship and cognitive task specified by the construction blueprint.';

  const content = passage ? `${passage}\n\n${prompt}` : prompt;
  const target = (index + seed) % 4;
  const rotated = rotateChoices(choices, target);
  const numericId = String(index + 1).padStart(3, '0');
  const id = `${testId}-rw-${numericId}`;
  const passageId = `${testId}-passage-${numericId}`;
  const record = {
    contentId: id,
    version: 5,
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
    subskill: plan.skill,
    conceptId: `${plan.domain}-${plan.skill.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    difficulty: blueprint.difficulty,
    difficultyBand: 'rw-originality',
    cognitiveDemand: blueprint.cognitiveOperation === 'identify' ? 'recall' : blueprint.cognitiveOperation === 'synthesize' ? 'synthesize' : blueprint.cognitiveOperation === 'evaluate' ? 'evaluate' : 'analyze',
    questionType: 'multiple-choice',
    stimulusType: plan.skill === 'Rhetorical Synthesis' ? 'notes' : 'short-passage',
    interactionType: 'single-select',
    timingMode: 'timed',
    estimatedTimeSeconds: 71,
    calculatorEligibility: false,
    calculatorMode: 'not-applicable',
    calculatorRequired: false,
    referenceSheetRelevant: false,
    passageId,
    prompt: content,
    choices: rotated.choices,
    answer: rotated.answer,
    explanation,
    figure: null,
    isOperational: true,
    adaptiveRoute: route || null,
    originalityFingerprint: `${variant}-${testId}-rw-${numericId}-${family}-${blueprint.rhetoricalStructure}`,
    conceptFingerprint: `${plan.domain}-${plan.skill}-${family}-${index % 17}`,
    tags: [variant, 'mock', 'reading-writing', 'apriori-original', `source-${family}`],
    lessonIds: [],
    sourceType: 'apriori-original',
    authoringStatus: 'draft',
    status: 'draft',
    releaseEligibility: false,
    metadata: {
      contextKey: `${variant}-${testId}-rw-${numericId}`,
      contextFamily: `${variant}-${family}-${blueprint.rhetoricalStructure}`,
      passageGenre: family,
      readingTopic: choose(SOURCE_TOPICS[family], index + seed * 2),
      rhetoricalPurpose: blueprint.rhetoricalStructure,
      answerFormat: 'A-D',
      sourceFamily: family,
      textType: blueprint.textType,
      rhetoricalStructure: blueprint.rhetoricalStructure,
      evidenceRelationship: blueprint.evidenceRelationship,
      cognitiveOperation: blueprint.cognitiveOperation,
      questionConstruction: blueprint.questionConstruction,
      passageWordCount: passage ? words(passage) : null,
      constructionBlueprintVersion: 'batch-c-v1',
    },
  };
  return record;
}

export function buildProductionMock({ testId, variant, seed = 0 }) {
  const readingWriting = [];
  for (let i = 0; i < 27; i += 1) readingWriting.push(makeQuestion({ index: i, testId, variant, seed, module: 'rw-module-1', route: null }));
  for (const route of ['high', 'standard', 'low']) {
    for (let i = 0; i < 27; i += 1) {
      const index = route === 'high' ? i + 27 : route === 'standard' ? i + 54 : i + 81;
      readingWriting.push(makeQuestion({ index, testId, variant, seed, module: 'rw-module-2', route }));
    }
  }
  return { testId, assessmentVariant: variant, questionCount: 108, bankQuestionCount: 196, readingWriting, math: [] };
}

export const PSAT_MOCK_01_CONTENT = buildProductionMock({ testId: 'psat-mock-01', variant: 'psat-nmsqt', seed: 0 });
export const SAT_MOCK_01_CONTENT = buildProductionMock({ testId: 'sat-mock-01', variant: 'sat-series-a', seed: 1 });

export { SOURCE_FAMILIES, RHETORICAL_STRUCTURES, EVIDENCE_RELATIONSHIPS, COGNITIVE_OPERATIONS };

export default { PSAT_MOCK_01_CONTENT, SAT_MOCK_01_CONTENT, buildProductionMock };
