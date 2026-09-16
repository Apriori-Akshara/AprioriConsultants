/**
 * Batch M remediation candidate generator for Reading & Writing.
 *
 * Candidate-only module. It is deliberately not imported by the frozen
 * production store. Construction is relationship/context first and uses
 * deterministic variation pools so production-scale dry runs can exercise
 * materially distinct, original candidates without mutating production.
 */

import { RW_REMEDIATION_CONSTRUCTIONS, RW_SOURCE_BLUEPRINTS, DIFFICULTY_REQUIREMENTS } from './batchMRemediationBlueprint.js';
import { evaluateContentQuality } from './batchMContentQualityGate.js';

const SOURCE_MATERIAL = {
  literature: [
    ['Mara checks two clocks before leaving for a train because one has recently been unreliable.', 'When the station clock proves inaccurate again, her earlier caution is revealed as a response to evidence rather than indecision.'],
    ['Jonas keeps his grandfather’s unfinished sketches in a box because he thinks preserving them means preserving a finished legacy.', 'Annotations later show that the unfinished sketches record revisions and abandoned choices, changing what the box represents to him.'],
    ['A gardener removes a broken gate expecting the courtyard to become easier to maintain.', 'Neighbors begin crossing the open space and lingering there, so a maintenance decision unexpectedly changes how the courtyard is used.'],
    ['Leena considers a faded theater sign an eyesore until she learns that volunteers repaint its lettering after renovations.', 'The sign then becomes evidence of repeated community involvement rather than simply an aging facade.'],
  ],
  'history-social-science': [
    ['A city staggers market deliveries to reduce congestion on its busiest streets.', 'Traffic falls there, while smaller side streets experience a different pattern because some deliveries have shifted rather than disappeared.'],
    ['A library campaign promotes a newly expanded branch and tracks participation by neighborhood.', 'Membership rises most sharply where evening programs accompany the expansion, suggesting that access alone does not explain the pattern.'],
    ['A cooperative changes its purchasing policy after regional prices become less predictable.', 'The change reduces exposure to short-term price swings, but members with different production schedules benefit by different amounts.'],
    ['A neighborhood association forms after rapid apartment construction changes local conditions.', 'Its early meetings concern street maintenance, but later records show the group becoming a venue for several broader community negotiations.'],
  ],
  humanities: [
    ['Acousticians compare small performance spaces and find that audiences do not judge clarity from reverberation time alone.', 'Wall geometry and listener position also affect perceived clarity, so a single measured property cannot explain every judgment.'],
    ['Archaeologists use repeated ceramic styles as evidence for a regional trade connection.', 'A newer comparison shows that the styles could have spread through several exchange networks rather than one central route.'],
    ['Art historians notice unusually saturated colors in paintings made after a regional exhibition opens.', 'The shift is strongest among artists who attended the exhibition, although it does not appear in every later work.'],
    ['A linguist compares two related dialects and finds several expressions used before uncertain claims.', 'The expressions vary with audience and setting, indicating that uncertainty is communicated through more than one grammatical feature.'],
  ],
  science: [
    ['Researchers expose seedlings to continuous light or repeated short light intervals while holding total exposure similar.', 'The intermittent treatment produces a different growth pattern, indicating that timing matters in addition to total exposure.'],
    ['A field study measures sediment movement before and after vegetation is restored along a riverbank.', 'Average movement declines, but the largest storms still transport substantial sediment, limiting how broadly the result can be applied.'],
    ['Engineers test whether a coating changes battery-electrode stability during repeated charge cycles.', 'Coated electrodes retain capacity more consistently, although the benefit becomes smaller at the highest cycling temperature.'],
    ['Biologists track migratory birds at several stopover sites while local food availability changes.', 'Arrival timing shifts at some sites, but the response varies with the distance to the next available feeding area.'],
  ],
};

const WIC_TARGETS = {
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
};

// Batch M Words in Context diversity remediation v1

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
const WIC_DIFFICULTY_CYCLE = ['easy', 'easy', 'easy', 'medium', 'medium', 'medium', 'medium', 'hard', 'hard', 'hard'];
const FAMILY_KEYS = Object.keys(SOURCE_MATERIAL);
const WIC_FAMILY_KEYS = Object.keys(WIC_TARGETS);

const CROSS_RELATIONSHIPS = [
  { name: 'agreement', stem: 'Which statement best describes how the passages agree about the issue?', correct: 'Both passages identify a pattern but indicate that its meaning depends on the conditions in which it occurs.', errors: ['One passage claims the pattern never varies, whereas the other rejects the pattern entirely.', 'The passages discuss different subjects and therefore make no comparable observation.', 'Both passages treat a single observation as proof that no other explanation is possible.'] },
  { name: 'qualified-agreement', stem: 'Which statement best describes the relationship between the passages?', correct: 'Both passages recognize a similar pattern, but each qualifies that pattern by identifying a condition that limits its scope.', errors: ['The second passage completely disproves the first by showing that the pattern never occurs.', 'The passages reach the same conclusion without identifying any condition that could affect it.', 'The first passage supplies historical background that the second passage explicitly treats as irrelevant.'] },
  { name: 'contrast', stem: 'Which statement best describes a difference between the passages?', correct: 'The passages consider related observations but emphasize different explanations for why the observed pattern occurs.', errors: ['The passages use identical evidence to reach an identical explanation of the pattern.', 'The first passage reports no observation, while the second passage reports only an unsupported opinion.', 'The second passage repeats the first passage without adding a distinct interpretation.'] },
  { name: 'extension', stem: 'How does the second passage build on the idea presented in the first?', correct: 'The second passage extends the first passage’s observation by showing how another condition or setting changes the interpretation.', errors: ['The second passage abandons the first passage’s evidence and replaces it with an unrelated claim.', 'The second passage proves that the first passage’s observation applies without qualification.', 'The second passage merely restates the first passage without introducing a new condition or implication.'] },
  { name: 'competing-interpretation', stem: 'Which statement best characterizes the two authors’ interpretations?', correct: 'The authors consider related evidence but give different weight to the conditions that could explain the observed result.', errors: ['Both authors accept exactly the same explanation and use no qualification.', 'One author discusses evidence while the other makes a claim with no connection to the topic.', 'The authors disagree only about a minor wording choice and otherwise present the same interpretation.'] },
];

const CROSS_QUESTION_FORMS = [
  'Which choice best characterizes the relationship between the two passages?',
  'Which choice most accurately describes the connection between the authors’ claims?',
  'How do the passages relate to one another in their treatment of the evidence?',
  'Which statement best explains what the two passages have in common or how they differ?',
  'Which choice best describes the way the second passage relates to the first?',
  'What is the most accurate comparison of the authors’ interpretations?',
  'Which choice best captures the relationship between the observations presented in the passages?',
  'How should the relationship between the two passages be understood?',
  'Which statement most precisely describes how the passages treat the issue?',
  'What does a comparison of the two passages reveal about their interpretations?',
  'Which choice best identifies the relationship that the two passages establish?',
  'How does the second passage relate to the interpretation developed in the first?'
];

const CROSS_LENSES = [
  'the conditions each author treats as important',
  'the evidence each author uses to support an interpretation',
  'the scope each author gives to the observed pattern',
  'the explanation each author offers for the observed result',
  'the qualification each author places on the main observation',
  'the way each passage connects evidence with its conclusion',
  'the significance each author assigns to the relevant condition',
  'the implication each passage draws from the evidence',
  'the point at which the two interpretations converge or diverge'
];

const SYNTHESIS_GOALS = [
  { label: 'research brief', goal: 'summarize the finding and retain the condition that limits its interpretation', lead: 'A research brief should distinguish the observed pattern from an unrestricted claim.' },
  { label: 'public explanation', goal: 'explain the finding clearly for a general audience without overstating its scope', lead: 'A public explanation should state the useful finding while preserving its most important qualification.' },
  { label: 'comparison', goal: 'compare the observed pattern with the condition that changes how strongly it can be interpreted', lead: 'A comparison should make both the pattern and the relevant difference visible.' },
  { label: 'recommendation', goal: 'present the finding in a way that supports a cautious recommendation', lead: 'A cautious recommendation should use the finding without treating a conditional result as universal.' },
  { label: 'museum or program note', goal: 'communicate the finding while identifying the detail that changes its significance', lead: 'A concise program note should connect the main observation to the detail that changes its significance.' },
  { label: 'method summary', goal: 'state what the evidence shows and what the evidence does not establish', lead: 'A method summary should separate an observed result from conclusions the evidence cannot establish.' },
];

const SYNTHESIS_CONTEXTS = [
  { label: 'a short advisory memo for a project team', focus: 'help the team act on the finding without overstating what the evidence establishes' },
  { label: 'a briefing note for community readers', focus: 'explain the useful finding while preserving the qualification that affects its scope' },
  { label: 'an exhibit label for a public audience', focus: 'present the finding clearly while identifying the detail that changes its significance' },
  { label: 'a methods note for another research group', focus: 'state what the evidence supports and what conclusion would go beyond it' },
  { label: 'a recommendation to a program coordinator', focus: 'connect the evidence to a cautious recommendation rather than a universal rule' },
  { label: 'a comparison paragraph in a research report', focus: 'make the relevant contrast or condition visible when interpreting the pattern' },
];

const WIC_FRAMES = [
  'The author uses the word to describe the practical effect of the change.',
  'Here, the word characterizes how the evidence affects the interpretation.',
  'In this passage, the word refers to the way one condition shapes the result.',
  'The surrounding discussion uses the word to distinguish the observed result from a broader claim.',
  'Here, the word describes the role of the feature in the author’s explanation.',
  'The word is used to characterize what happens when the relevant condition changes.',
  'In context, the word identifies a relationship between the observation and its consequence.',
  'The author uses the word to specify the scope or direction of the reported effect.',
];

const WIC_CONTEXTS = [
  'The nearby discussion treats the term as part of the author’s explanation rather than as an isolated fact.',
  'The term helps distinguish the observed result from a broader conclusion the passage does not establish.',
  'The surrounding evidence makes the meaning depend on the condition described in the passage.',
  'The author uses the term to connect the immediate observation with its larger implication.',
  'The context contrasts the relevant effect with a different possible interpretation.',
  'The passage uses the term to mark how the evidence should be understood within its limits.',
  'The term contributes to a qualification that keeps the author’s conclusion appropriately narrow.',
  'The surrounding sentence shows that the term refers to a relationship, not merely to a surface feature.',
  'The context makes the term’s meaning specific to the pattern being described rather than to the topic in general.',
];

const REASONING_QUESTION_FORMS = [
  'Which choice best states the central idea of the text?',
  'Which choice best describes what the text establishes?',
  'Which choice best captures the development of the text?',
  'Which choice best summarizes the passage’s main point?',
  'Which statement most accurately reflects the text’s central claim?',
  'Which choice best expresses the conclusion supported by the passage?',
  'Which choice most precisely describes the main idea developed in the text?',
  'What is the best summary of the text’s central point?',
  'Which statement best represents what the passage shows?',
  'Which choice most accurately captures the passage’s overall conclusion?',
  'What conclusion about the text is best supported by the information presented?',
  'Which choice best characterizes the principal idea established by the passage?'
];

const INFERENCE_QUESTION_FORMS = [
  'Which inference is best supported by the text?',
  'What can most reasonably be inferred from the passage?',
  'The passage most strongly suggests that',
  'Which conclusion is most directly supported by the information in the text?',
  'What does the passage most strongly imply about the reported result?',
  'Which inference follows most logically from the evidence presented?',
  'What can a reader most reasonably conclude from the passage?',
  'Which statement is most strongly supported as an inference from the text?',
  'The evidence in the passage most strongly supports which conclusion?',
  'Which conclusion can be drawn most reasonably from the passage?',
  'What does the evidence most clearly imply?',
  'Which inference best accounts for the information presented in the text?'
];

const TEXT_STRUCTURE_QUESTION_FORMS = [
  'Why does the author include the second sentence?',
  'What is the primary function of the latter part of the passage?',
  'How does the second observation contribute to the passage?',
  'What role does the later evidence play in the text?',
  'Why does the author introduce the second observation at this point?',
  'How does the passage’s later detail affect its overall structure?',
  'What is the main purpose of the passage’s final observation?',
  'How does the second part of the text support the author’s purpose?',
  'What function does the later evidence serve in the development of the passage?',
  'Why does the author shift from the initial observation to the later detail?',
  'How does the final observation change the way the earlier point is understood?',
  'What structural role does the later condition play in the passage?'
];

const REASONING_FOCUS_VARIANTS = [
  'Consider the passage as a whole when selecting the best answer.',
  'Base the answer on the passage’s complete development.',
  'Pay particular attention to the condition introduced after the initial observation.',
  'Consider what the later evidence adds to the initial observation.',
  'Use the relationship between the observations as part of the evidence for your answer.',
  'Distinguish the passage’s main point from its supporting details.',
  'Consider how the final detail affects the meaning of the earlier point.',
  'Base the answer on what the passage establishes rather than on assumptions beyond it.',
  'Take the scope of the evidence into account when selecting the answer.',
  'Consider the conclusion of the passage in light of the evidence it provides.',
  'Use both the initial observation and the later qualification when evaluating the choices.'
];

const ERROR_PATTERNS = [
  ['true-but-nonresponsive', 'states a true detail that does not answer the question asked'],
  ['reversed-relationship', 'reverses which condition affects the observed result'],
  ['overgeneralization', 'extends a conditional finding beyond the evidence'],
  ['narrowing-error', 'focuses on one detail while ignoring the broader relationship'],
  ['example-for-claim', 'treats a supporting example as if it were the main claim'],
  ['unsupported-causation', 'turns an observed association into an unsupported causal claim'],
];

function pick(list, index) {
  return list[((index % list.length) + list.length) % list.length];
}

function hashIndex(index, salt, length) {
  const value = (index * 37 + salt * 101 + Math.floor(index / Math.max(1, length)) * 17) % length;
  return value < 0 ? value + length : value;
}

function sourceFamily(index) {
  return pick(FAMILY_KEYS, index * 5 + 1);
}

function sourcePair(family, index, salt = 0) {
  return pick(SOURCE_MATERIAL[family], index * 3 + salt);
}

function makeStimulus(family, index) {
  const pair = sourcePair(family, index);
  const perspective = pick([
    'The observation matters because the later detail changes how the initial decision is interpreted.',
    'The second observation narrows the conclusion that could reasonably be drawn from the first.',
    'The later evidence makes a previously plausible interpretation less complete.',
    'The contrast between the two observations reveals why the initial evidence alone is insufficient.',
  ], index + FAMILY_KEYS.indexOf(family));
  return `${pair[0]} ${pair[1]} ${perspective}`;
}

function rotateChoices(choices, target) {
  const out = [...choices];
  const correct = out.shift();
  out.splice(target, 0, correct);
  return { choices: out, answer: String.fromCharCode(65 + target) };
}

function makeEvidenceQuestion(stimulus, index) {
  const evidenceSets = [
    ['Which finding would most directly support the interpretation in the text?', 'A measurement collected under the changed condition shows whether the reported pattern persists.', 'A statement about why the researchers became interested in the topic explains the mechanism directly.', 'An observation from an unrelated setting proves that the pattern occurs without exception.', 'A historical summary shows that the topic has been discussed for many years.'],
    ['Which finding would provide the strongest evidence for the claim made in the passage?', 'A second observation isolates the condition that the passage identifies as relevant to the result.', 'A participant describes a personal reaction without measuring the relevant condition.', 'A later study reports a similar topic but uses a different outcome measure.', 'A researcher explains that the original question was considered important.'],
    ['Which result would most strengthen the author’s interpretation?', 'Measurements taken before and after the relevant change show the predicted difference while other conditions remain comparable.', 'A review lists several researchers who have studied the same broad topic.', 'A survey records interest in the topic without measuring the proposed relationship.', 'A separate example contains the same keyword but does not test the proposed explanation.'],
    ['Which additional evidence would best distinguish the passage’s interpretation from a competing explanation?', 'The same pattern appears when the proposed condition changes while the competing condition is held comparable.', 'The researchers report that the study attracted substantial attention from other scholars.', 'A later article summarizes the topic without reporting new observations.', 'A participant recalls an earlier event but cannot identify the relevant conditions.'],
  ];
  const set = pick(evidenceSets, index);
  return { prompt: `${stimulus}\n\n${set[0]}`, ...rotateChoices([set[1], set[2], set[3], set[4]], hashIndex(index, 3, 4)) };
}

const WIC_CONSTRUCTION_V2 = [
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
];

// Batch M Words in Context construction remediation v2

function makeWIC(index, stimulus) {
  const wicIndex = Math.max(0, Number(index) || 0);
  const family = pick(WIC_FAMILY_KEYS, wicIndex);
  const familyIndex = WIC_FAMILY_KEYS.indexOf(family);
  const pairOrdinal = Math.floor(wicIndex / WIC_FAMILY_KEYS.length);
  const targetIndex = (pairOrdinal + familyIndex) % WIC_TARGETS[family].length;
  const [word, meaning] = WIC_TARGETS[family][targetIndex];
  const frame = pick(WIC_FRAMES, Math.floor(pairOrdinal / 2) + targetIndex + 2);
  const context = pick(WIC_CONTEXTS, wicIndex);
  const construction = pick(WIC_CONSTRUCTION_V2, wicIndex);
  const contextualSentence = `${stimulus} ${construction} ${frame} ${context}`;
  const alternatives = [
    'make the reported result disappear entirely',
    'repeat the earlier observation without changing its meaning',
    'make the claim apply equally in every possible setting',
    'describe a cause that the passage never identifies',
    'remove the distinction between the two conditions',
    'refer only to the author’s personal reaction to the topic',
  ];
  const rotated = rotateChoices([
    meaning,
    pick(alternatives, wicIndex + 1),
    pick(alternatives, wicIndex + 3),
    pick(alternatives, wicIndex + 5),
  ], hashIndex(wicIndex, 17, 4));
  return { prompt: `${contextualSentence}\n\nIn this context, the word “${word}” most nearly means which of the following?`, targetWord: word, ...rotated };
}

function makeSynthesis(index) {
  const synthesisIndex = Math.max(0, Number(index) || 0);
  const family = pick(FAMILY_KEYS, synthesisIndex + 2);
  const pairOrdinal = Math.floor(synthesisIndex / FAMILY_KEYS.length);
  const pair = sourcePair(family, pairOrdinal, 1);
  const goal = pick(SYNTHESIS_GOALS, Math.floor(synthesisIndex / 3) + synthesisIndex);
  const context = pick(SYNTHESIS_CONTEXTS, synthesisIndex);
  const notes = [
    `Research notes — topic: ${pair[0]}`,
    `Evidence: ${pair[1]}`,
    'Implication: the evidence is informative but depends on the condition described in the notes.',
    `Communication goal: ${goal.goal}.`,
    `Audience context: ${context.focus}.`,
  ];
  const correct = `${goal.lead} ${pair[1]} The result should therefore be interpreted in light of the condition described in the notes.`;
  const distractors = [
    `${pair[0]} The finding can therefore be treated as universal regardless of the condition described in the notes.`,
    'The study concerns an important topic, so the specific evidence is unnecessary when communicating its conclusion.',
    `${pair[1]} Because the result was observed, no alternative explanation or limiting condition needs to be considered.`,
  ];
  return { prompt: `${notes.join(' ')}\n\nThe student is preparing ${context.label}. Which choice best accomplishes the stated communication goal?`, ...rotateChoices([correct, ...distractors], hashIndex(synthesisIndex, 23, 4)) };
}

function makeCrossText(index) {
  const crossTextOrdinal = Math.floor(index / SECTIONS.length);
  const relation = pick(CROSS_RELATIONSHIPS, crossTextOrdinal);
  const totalSourcePairs = FAMILY_KEYS.length * SOURCE_MATERIAL[FAMILY_KEYS[0]].length;
  const sourceOrdinal = crossTextOrdinal % totalSourcePairs;
  const sourceFamilySpan = SOURCE_MATERIAL[FAMILY_KEYS[0]].length;
  const firstFamilyIndex = Math.floor(sourceOrdinal / sourceFamilySpan);
  const firstFamily = FAMILY_KEYS[firstFamilyIndex];
  const first = sourcePair(firstFamily, firstFamilyIndex, sourceOrdinal % sourceFamilySpan);
  let secondSourceOrdinal = (sourceOrdinal * 5 + 7) % totalSourcePairs;
  let secondFamilyIndex = Math.floor(secondSourceOrdinal / sourceFamilySpan);
  if (secondFamilyIndex === firstFamilyIndex) {
    secondSourceOrdinal = (secondSourceOrdinal + sourceFamilySpan) % totalSourcePairs;
    secondFamilyIndex = Math.floor(secondSourceOrdinal / sourceFamilySpan);
  }
  const secondFamily = FAMILY_KEYS[secondFamilyIndex];
  const second = sourcePair(secondFamily, secondFamilyIndex, secondSourceOrdinal % sourceFamilySpan);
  const form = pick(CROSS_QUESTION_FORMS, crossTextOrdinal);
  const lens = pick(CROSS_LENSES, crossTextOrdinal);
  const correct = relation.correct;
  const errors = relation.errors.map((text, errorIndex) => {
    const pattern = pick(ERROR_PATTERNS, index + errorIndex);
    return `${text} This reflects a ${pattern[0]} error: ${pattern[1]}.`;
  });
  return {
    prompt: `Passage 1: ${first[0]} ${first[1]}\n\nPassage 2: ${second[0]} ${second[1]}\n\nWhen comparing ${lens}, ${form}`,
    ...rotateChoices([correct, ...errors], hashIndex(index, 37, 4)),
    crossTextRelationship: relation.name,
  };
}

function makeReasoningTask(plan, stimulus, index, reasoningOrdinal = index) {
  const taskFamilies = {
    'Central Ideas and Details': [
      ['Which choice best states the central idea of the text?', 'The later evidence changes how the initial observation should be interpreted.', 'The passage argues that the initial observation has no value.', 'The passage focuses on an unrelated history of the topic.', 'The later evidence confirms every possible explanation of the initial observation.'],
      ['Which choice best describes what the text establishes?', 'The observed result is meaningful, but the later condition limits how broadly it should be interpreted.', 'The observed result proves that one cause is responsible in every setting.', 'The later condition makes the initial observation impossible to evaluate.', 'The passage presents background information without drawing any conclusion from it.'],
      ['Which choice best captures the development of the text?', 'An initial observation is reconsidered after evidence reveals an important condition.', 'A general claim is introduced and then replaced by an unrelated example.', 'A historical detail is presented without any connection to the main observation.', 'A single result is repeated several times without being qualified.'],
    ],
    Inferences: [
      ['Which inference is best supported by the text?', 'The condition identified in the second observation likely helps explain why the initial pattern was not uniform.', 'The initial pattern must occur in every setting because it was observed once.', 'The later observation proves that the initial measurement was collected incorrectly.', 'The evidence shows that no factor can influence the reported result.'],
      ['What can most reasonably be inferred from the passage?', 'A conclusion based only on the first observation would overlook information supplied by the later observation.', 'The later observation eliminates every possible interpretation of the first observation.', 'The author believes that the reported pattern has no measurable effect.', 'The two observations cannot be compared because they concern the same topic.'],
      ['The passage most strongly suggests that', 'the apparent pattern is more conditional than it first appears.', 'the reported pattern is entirely independent of context.', 'the later evidence is less relevant than the initial claim.', 'the author has rejected the use of observations as evidence.'],
    ],
    'Text Structure and Purpose': [
      ['Why does the author include the second sentence?', 'To qualify the first observation by introducing evidence that changes its interpretation.', 'To replace the first observation with a completely unrelated claim.', 'To provide historical background that the author never uses.', 'To repeat the first observation without adding information.'],
      ['What is the primary function of the latter part of the passage?', 'It narrows the scope of the initial claim by identifying a relevant condition.', 'It shifts the discussion to a topic unrelated to the initial observation.', 'It supplies a definition that contradicts every earlier statement.', 'It summarizes a source that the passage never otherwise discusses.'],
      ['How does the second observation contribute to the passage?', 'It turns a simple observation into a more qualified interpretation.', 'It demonstrates that the first observation was entirely fabricated.', 'It introduces an unrelated historical example.', 'It repeats the first observation without changing its significance.'],
    ],
  };
  const sets = taskFamilies[plan.skill];
  if (sets) {
    const set = pick(sets, reasoningOrdinal);
    const promptForms = plan.skill === 'Inferences'
      ? INFERENCE_QUESTION_FORMS
      : plan.skill === 'Text Structure and Purpose'
        ? TEXT_STRUCTURE_QUESTION_FORMS
        : REASONING_QUESTION_FORMS;
    const questionIndex = reasoningOrdinal % promptForms.length;
    const focus = pick(REASONING_FOCUS_VARIANTS, Math.floor(reasoningOrdinal / promptForms.length));
    const contextualPrompt = [stimulus, '', focus, promptForms[questionIndex]].join('\n');
    return { prompt: contextualPrompt, ...rotateChoices([set[1], set[2], set[3], set[4]], hashIndex(reasoningOrdinal, 41, 4)) };
  }
  const generic = [
    'The text presents a finding while distinguishing the evidence from a broader conclusion.',
    'The text establishes that the finding applies without exception.',
    'The text discusses background information without interpreting the evidence.',
    'The text argues that the evidence cannot be compared across conditions.',
  ];
  const genericFocus = pick(REASONING_FOCUS_VARIANTS, Math.floor(reasoningOrdinal / REASONING_QUESTION_FORMS.length));
  const genericPrompt = `${pick(REASONING_QUESTION_FORMS, reasoningOrdinal)} ${genericFocus}\n\nWhich choice best identifies the text’s main point?`;
  return { prompt: `${stimulus}\n\n${genericPrompt}`, ...rotateChoices(generic, hashIndex(reasoningOrdinal, 43, 4)) };
}

function makeSENTask(skill, index) {
  const transitionSets = [
    ['The initial measurements showed a clear increase. _____, the increase was smaller when the temperature was higher.', ['However,', 'Therefore,', 'For example,', 'Likewise,']],
    ['The first model explains the overall trend. _____, the second model accounts for unusually large values at the upper end.', ['In contrast,', 'For instance,', 'As a result,', 'Similarly,']],
    ['The researchers repeated the test under a second condition. _____, they compared the two sets of observations.', ['Next,', 'Nevertheless,', 'Instead,', 'For example,']],
    ['The result was consistent across three sites. _____, the fourth site showed a different response.', ['By contrast,', 'For example,', 'In addition,', 'Therefore,']],
    ['The first estimate was useful for comparison. _____, the revised estimate accounted for an additional source of variation.', ['In addition,', 'For example,', 'Instead,', 'Likewise,']],
    ['The archive preserves most of the original records. _____, several years are missing from the sequence.', ['Nevertheless,', 'For example,', 'Similarly,', 'Therefore,']],
  ];
  const boundarySets = [
    ['The revised method produced a clearer signal _____ it required additional calibration.', ['; however,', ', however', '; therefore,', ', therefore,']],
    ['The team changed the sampling interval _____ the original interval missed several short events.', ['because', '; because', ', because,', '; however,']],
    ['The archive was incomplete _____ researchers could still compare the surviving records.', ['but', '; but', ', but,', 'and;']],
    ['The estimate was reliable _____ only within the range represented by the data.', ['but', '; but', ', but,', ': but']],
    ['The new observations were useful _____ they did not resolve every uncertainty.', ['although', '; although', ', although,', ': although']],
    ['The researchers repeated the measurement _____ the first trial had produced an unexpected result.', ['because', '; because', ', because,', '; although,']],
  ];
  const grammarSets = [
    ['The collection of measurements _____ the basis for comparison.', ['provides', 'provide', 'providing', 'have provided']],
    ['The researchers who repeated the test _____ the same trend.', ['observed', 'observes', 'observing', 'has observed']],
    ['The revised estimates, along with the original measurements, _____ included in the final table.', ['are', 'is', 'being', 'has been']],
    ['The report describes the conditions that _____ the response.', ['affected', 'affects', 'affecting', 'has affected']],
    ['The set of observations _____ a useful comparison across sites.', ['provides', 'provide', 'providing', 'have provided']],
    ['The instruments used by the research team _____ calibrated before each trial.', ['were', 'was', 'being', 'has been']],
  ];
  const sets = skill === 'Transitions' ? transitionSets : skill === 'Boundaries' ? boundarySets : grammarSets;
  const set = pick(sets, index);
  return { prompt: set[0], ...rotateChoices(set[1], hashIndex(index, 47, 4)) };
}

function buildCandidate({ index, testId = 'SAT1', variant = 'sat', module = 'reading-writing-module-1' }) {
  const plan = pick(SECTIONS, index);
  const family = sourceFamily(index);
  const construction = pick(RW_REMEDIATION_CONSTRUCTIONS[plan.skill], index + Math.floor(index / SECTIONS.length));
  const difficulty = plan.skill === 'Words in Context'
    ? pick(WIC_DIFFICULTY_CYCLE, Math.floor(index / SECTIONS.length))
    : pick(DIFFICULTY_CYCLE, index + Math.floor(index / 7));
  const stimulus = makeStimulus(family, index);
  const reasoningOrdinal = Math.floor(index / SECTIONS.length);
  let result;
  let targetWord = null;
  let crossTextRelationship = null;

  if (plan.skill === 'Command of Evidence') result = makeEvidenceQuestion(stimulus, index);
  else if (plan.skill === 'Words in Context') {
    const wicOrdinal = Math.floor(index / SECTIONS.length);
    const wicFamily = FAMILY_KEYS[Math.floor(wicOrdinal / 3) % FAMILY_KEYS.length];
    result = makeWIC(wicOrdinal, makeStimulus(wicFamily, wicOrdinal + index));
  }
  else if (plan.skill === 'Cross-Text Connections') result = makeCrossText(index);
  else if (plan.skill === 'Rhetorical Synthesis') {
    const synthesisOrdinal = Math.floor(index / SECTIONS.length);
    result = makeSynthesis(synthesisOrdinal);
  }
  else if (plan.skill === 'Transitions' || plan.skill === 'Boundaries' || plan.skill === 'Form, Structure, and Sense') result = makeSENTask(plan.skill, index);
  else result = makeReasoningTask(plan, stimulus, index, reasoningOrdinal);

  targetWord = result.targetWord || null;
  crossTextRelationship = result.crossTextRelationship || null;
  const difficultyFeatures = difficulty === 'hard'
    ? ['multi-step', 'strategic-choice', 'evidence-synthesis']
    : difficulty === 'medium'
      ? ['careful-interpretation']
      : [];
  const id = `${testId}-rw-rem-${String(index + 1).padStart(3, '0')}`;
  return {
    contentId: id,
    version: 8,
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
    prompt: result.prompt,
    choices: result.choices,
    answer: result.answer,
    explanation: targetWord
      ? `In context, “${targetWord}” is used with the meaning represented by the keyed choice.`
      : 'The keyed choice matches the item-specific evidence, rhetorical relationship, communication goal, or grammatical constraint established by the construction.',
    figure: null,
    isOperational: false,
    adaptiveRoute: null,
    originalityFingerprint: `batch-m-rem-${variant}-${testId}-${index}-${family}-${construction}`,
    conceptFingerprint: `${plan.domain}-${plan.skill}-${family}-${construction}-${index}`,
    tags: [variant, 'batch-m-remediation-candidate', 'apriori-original', `source-${family}`],
    lessonIds: [],
    sourceType: 'apriori-original',
    authoringStatus: 'candidate',
    status: 'candidate',
    releaseEligibility: false,
    metadata: {
      sourceFamily: family,
      sourceBlueprint: pick(RW_SOURCE_BLUEPRINTS[family], index * 2 + 1),
      rhetoricalStructure: construction,
      evidenceRelationship: crossTextRelationship || pick(['direct-support', 'qualified-support', 'contrast', 'inference', 'example-to-claim'], index + 1),
      cognitiveOperation: plan.operation,
      difficultyFeatures,
      difficultyRequirements: DIFFICULTY_REQUIREMENTS[difficulty],
      targetWord,
      crossTextRelationship,
      candidateConstructionIndex: index,
      candidateOnly: true,
      productionMutation: false,
    },
  };
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
