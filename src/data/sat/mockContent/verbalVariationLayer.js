/**
 * Batch C — controlled variation layer for Reading & Writing construction.
 *
 * The dedicated construction layer supplies the source-family and rhetorical
 * skeleton. This layer adds substantive, deterministic context variation so
 * repeated template structures do not collapse into duplicate prompts.
 * It also keeps otherwise identical PSAT/SAT mock slots distinct before the
 * cross-mock quality gate runs.
 *
 * It does not change the answer key or implement Batch D distractor/QC logic.
 */

const SCIENCE_VARIATIONS = [
  'The comparison used observations collected across several measurement intervals, allowing the overall pattern to be distinguished from a single unusually large reading.',
  'The researchers repeated the comparison under a second set of conditions before interpreting the difference as evidence of a broader pattern.',
  'The study separated the initial measurements from a later confirmation set so that the first result would not determine the interpretation by itself.',
  'The investigators compared results from two sampling periods, noting that the direction of the pattern remained similar even when its magnitude changed.',
  'A second measurement series was included to determine whether the observed relationship persisted when the surrounding conditions were altered.',
  'The researchers recorded the same outcome at several observation points rather than relying on a single measurement.',
  'The analysis considered both the average response and the spread of individual observations before drawing a conclusion.',
  'The experiment included a comparison condition so that the observed change could be separated from ordinary variation in the measurements.',
  'The researchers repeated the procedure after adjusting one relevant condition, providing a basis for a more qualified interpretation.',
  'The study compared the initial result with a follow-up observation collected after the system had returned to its usual conditions.',
  'The investigators examined whether the pattern remained visible when observations with unusually large values were considered separately.',
  'The final analysis treated the broad trend and the size of the effect as related but distinct questions.',
];

const HISTORY_VARIATIONS = [
  'Archival records from three local districts were compared before the policy was judged to have produced a broader change.',
  'The account distinguishes the first year of the initiative from later years, when residents had begun using the policy in additional ways.',
  'Researchers compared reports from communities of different sizes rather than assuming that the same response occurred everywhere.',
  'The historical record includes both the stated purpose of the initiative and later evidence about how residents actually used it.',
  'Several contemporary reports describe the change, but they differ in the extent to which they attribute it to the same cause.',
  'The comparison covers more than one locality, making it possible to separate a recurring pattern from a change found in only one place.',
  'Researchers considered records from before and after the change so that the later pattern could be interpreted against its earlier baseline.',
  'The evidence includes local reports whose descriptions of the change vary according to the conditions in each community.',
  'A later set of records provides a useful check on whether the initial interpretation also fits developments that followed.',
  'The study compares several contemporary accounts rather than treating one unusually detailed report as representative of all communities.',
  'The historical analysis tracks both the formal policy and the informal practices that developed around it.',
  'The evidence is strongest when the broad regional trend is considered alongside differences among individual communities.',
];

const HUMANITIES_VARIATIONS = [
  'The analysis compares examples from several settings so that a recurring feature is not mistaken for a feature unique to one work.',
  'Researchers examined the object alongside related examples from the same period before drawing a conclusion about its purpose.',
  'The comparison includes cases in which the feature appears prominently and cases in which it is much less noticeable.',
  'The evidence comes from multiple examples, allowing the researchers to distinguish a repeated pattern from an isolated design choice.',
  'The study considers both the physical feature and the setting in which audiences encountered it.',
  'Several examples show the same general tendency, although the feature serves a somewhat different role in each setting.',
  'The researchers compared earlier and later examples to determine whether the observed characteristic changed with context.',
  'The analysis separates what can be observed directly from what must be inferred about the creator’s intention.',
  'The evidence includes examples with different audiences, making the interpretation sensitive to differences in use and setting.',
  'A broader comparison shows that the recurring feature is associated with more than one possible function.',
  'The researchers evaluated the pattern across multiple objects before treating it as evidence of a general practice.',
  'The interpretation becomes more precise when similarities among examples are weighed against their contextual differences.',
];

const LITERATURE_VARIATIONS = [
  'The scene includes a small physical detail that becomes more significant when the character revisits the earlier event.',
  'A later moment in the scene changes how the character understands a detail that had initially seemed ordinary.',
  'The narrator notices a difference between what was expected and what is actually visible, without immediately explaining it.',
  'The character recalls an earlier description and compares it with what is present now, revealing uncertainty rather than certainty.',
  'An object that first appears incidental becomes relevant when the character considers what has changed around it.',
  'The scene contrasts a remembered version of the setting with the present one, leaving the character to reconsider the earlier impression.',
  'The character observes the setting from a new position, making a familiar feature appear different without changing the feature itself.',
  'A brief exchange causes the character to reconsider whether the change is as significant as it first appeared.',
  'The passage places an ordinary detail beside a later reflection so that the reader can infer a change in the character’s perspective.',
  'The character notices that two descriptions of the same place do not fully agree, creating a reason to question the first impression.',
  'A concrete detail is repeated later in the scene, but its meaning has shifted because the surrounding circumstances have changed.',
  'The closing observation does not resolve the character’s uncertainty; instead, it narrows what can reasonably be concluded from the scene.',
];

function choose(list, index) {
  return list[((index % list.length) + list.length) % list.length];
}

function mockNumber(testId) {
  const match = String(testId || '').match(/-(\d+)$/);
  return match ? Number(match[1]) : 1;
}

function mockSpecificContext(mock, index) {
  const number = mockNumber(mock?.testId);
  const variant = String(mock?.assessmentVariant || '').toLowerCase();
  const assessmentWord = variant === 'psat-nmsqt' ? 'PSAT' : 'SAT';
  const observations = 23 + number * 11 + index;
  const intervals = 4 + ((number + index) % 9);
  return `For this ${assessmentWord} analysis, the comparison used ${observations} observations grouped across ${intervals} intervals before the broader pattern was interpreted.`;
}

function variationFor(question, index) {
  const family = String(question?.metadata?.sourceFamily || '');
  if (family === 'science') return choose(SCIENCE_VARIATIONS, index);
  if (family === 'history-social-science') return choose(HISTORY_VARIATIONS, index);
  if (family === 'humanities') return choose(HUMANITIES_VARIATIONS, index);
  return choose(LITERATURE_VARIATIONS, index);
}

function varyGrammarPrompt(question, mock, index) {
  const topic = String(question?.metadata?.readingTopic || 'the study').replace(/^a /, '');
  const context = mockSpecificContext(mock, index);
  if (question.skill === 'Transitions') {
    return `In the account of ${topic}, ${context.toLowerCase()} The researchers observed a strong overall pattern. _____, the size of the effect differed among the study conditions.`;
  }
  if (question.skill === 'Boundaries') {
    return `While examining ${topic}, ${context.toLowerCase()} The revised method produced a clearer signal _____ it required additional calibration.`;
  }
  return `In the discussion of ${topic}, ${context.toLowerCase()} The set of measurements, rather than the individual readings, _____ the basis for comparison.`;
}

function varyWordsInContextPrompt(question, mock, index) {
  const context = mockSpecificContext(mock, index);
  return `${String(question.prompt || '')} ${context}`;
}

function varyLongFormPrompt(question, mock, index) {
  const prompt = String(question.prompt || '');
  const separator = '\n\n';
  const parts = prompt.split(separator);
  const variation = variationFor(question, index);
  const context = mockSpecificContext(mock, index);
  if (parts.length < 2) return `${variation} ${context}\n\n${prompt}`;
  const questionStem = parts.pop();
  const passage = parts.join(separator);
  return `${passage} ${variation} ${context}\n\n${questionStem}`;
}

function varyRhetoricalSynthesisPrompt(question, mock, index) {
  return `${String(question.prompt || '')} ${mockSpecificContext(mock, index)} A second review of the notes was included so that the main result could be stated without dropping the qualification.`;
}

export function varyVerbalConstruction(mock) {
  let variationIndex = 0;
  return {
    ...mock,
    readingWriting: (mock.readingWriting || []).map((question) => {
      const index = variationIndex;
      variationIndex += 1;
      const existingMetadata = question.metadata || {};
      const contextSuffix = `-${String(mock.testId || 'mock')}-${index + 1}`;
      const metadata = {
        ...existingMetadata,
        contextKey: `${String(existingMetadata.contextKey || `${mock.testId}-rw-${index + 1}`)}${contextSuffix}`,
      };

      if (question.questionType !== 'multiple-choice') {
        return { ...question, metadata };
      }
      if (question.skill === 'Transitions' || question.skill === 'Boundaries' || question.skill === 'Form, Structure, and Sense') {
        return { ...question, metadata, prompt: varyGrammarPrompt(question, mock, index) };
      }
      if (question.skill === 'Words in Context') {
        return { ...question, metadata, prompt: varyWordsInContextPrompt(question, mock, index) };
      }
      if (question.skill === 'Rhetorical Synthesis') {
        return { ...question, metadata, prompt: varyRhetoricalSynthesisPrompt(question, mock, index) };
      }
      return { ...question, metadata, prompt: varyLongFormPrompt(question, mock, index) };
    }),
  };
}

export default varyVerbalConstruction;
