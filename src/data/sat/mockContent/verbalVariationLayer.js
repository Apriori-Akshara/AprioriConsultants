/**
 * Batch C — deterministic construction expansion for Reading & Writing.
 *
 * The dedicated construction layer supplies the rhetorical skeleton. This
 * layer adds mock-identity-seeded context to that skeleton so every generated
 * item has a substantively different construction across PSAT/SAT mock pairs.
 * It does not change answer keys or implement Batch D distractor/QC logic.
 */

const SCIENCE_VARIATIONS = [
  'The analysis compared repeated measurements taken under different conditions before the researchers interpreted the overall trend.',
  'A second round of measurements was used to check whether the observed relationship persisted when the surrounding conditions changed.',
  'The researchers considered both the average response and the spread of individual observations before drawing the broader conclusion.',
  'The study included a comparison condition so that an observed change could be separated from ordinary variation in the measurements.',
  'A follow-up observation was collected after the system returned to typical conditions, providing a check on the initial result.',
  'The investigators examined whether the pattern remained visible when unusually large observations were considered separately.',
  'The final analysis treated the direction of the trend and the size of the effect as related but distinct questions.',
  'The researchers compared results from two sampling periods rather than relying on a single measurement series.',
  'The experiment repeated the procedure after one relevant condition was adjusted, allowing the interpretation to be qualified.',
  'The study compared initial and confirmation measurements before deciding how broadly the result could be generalized.',
  'The analysis separated the broad pattern from the possibility that one unusually large reading affected the first comparison.',
  'The investigators reviewed results from multiple observation points to determine whether the relationship was consistent.',
];

const HISTORY_VARIATIONS = [
  'Researchers compared records from several communities rather than treating one locality as representative of the whole region.',
  'The historical account distinguishes the initial policy decision from later ways in which residents adapted to it.',
  'Records from before and after the change provide a baseline against which the later pattern can be interpreted.',
  'Several contemporary accounts describe the change, although they differ in how strongly they attribute it to the same cause.',
  'The evidence combines formal policy records with descriptions of how residents actually used the new arrangement.',
  'A later group of records provides a check on whether the initial interpretation also fits developments that followed.',
  'The comparison includes communities of different sizes, making it possible to distinguish a recurring tendency from a local exception.',
  'The analysis tracks both the stated purpose of the initiative and the informal practices that developed around it.',
  'Researchers considered differences among local conditions before drawing a broader conclusion about the policy.',
  'The study compares multiple contemporary reports instead of relying on the most detailed account alone.',
  'The evidence is strongest when the regional pattern is considered alongside differences among individual communities.',
  'The historical analysis separates what the policy required from what later participants made of it in practice.',
];

const HUMANITIES_VARIATIONS = [
  'The analysis compares several examples so that a recurring feature is not mistaken for a characteristic unique to one work.',
  'Researchers examined the object alongside related examples from the same period before drawing a conclusion about its purpose.',
  'The comparison includes cases in which the feature is prominent and cases in which it is much less noticeable.',
  'The evidence comes from multiple examples, allowing the researchers to distinguish a repeated pattern from an isolated design choice.',
  'The study considers both the physical feature and the setting in which audiences encountered it.',
  'Several examples show the same broad tendency, although the feature serves a different role in each setting.',
  'Earlier and later examples were compared to determine whether the observed characteristic changed with context.',
  'The analysis separates what can be observed directly from what must be inferred about the creator’s intention.',
  'The evidence includes examples with different audiences, making the interpretation sensitive to differences in use and setting.',
  'A broader comparison shows that the recurring feature can serve more than one function.',
  'Researchers evaluated the pattern across multiple objects before treating it as evidence of a general practice.',
  'The interpretation becomes more precise when similarities among examples are weighed against their contextual differences.',
];

const LITERATURE_VARIATIONS = [
  'A later moment changes how the character understands a detail that initially seemed ordinary.',
  'The narrator notices a difference between what was expected and what is actually visible without immediately explaining it.',
  'The character recalls an earlier description and compares it with what is present now, revealing uncertainty rather than certainty.',
  'An object that first appears incidental becomes relevant when the character considers what has changed around it.',
  'The scene contrasts a remembered version of the setting with the present one, prompting the character to reconsider the earlier impression.',
  'The character observes the setting from a new position, making a familiar feature appear different without changing the feature itself.',
  'A brief exchange causes the character to reconsider whether a change is as significant as it first appeared.',
  'An ordinary detail is placed beside a later reflection so that the reader can infer a change in the character’s perspective.',
  'Two descriptions of the same place do not fully agree, creating a reason to question the first impression.',
  'A concrete detail is repeated later in the scene, but its meaning shifts because the surrounding circumstances have changed.',
  'The closing observation does not resolve the character’s uncertainty; instead, it narrows what can reasonably be concluded.',
  'The character notices a small change in the setting and considers whether it signals a larger change in circumstances.',
];

const GENERIC_TOPICS = [
  'the comparison', 'the collection', 'the study', 'the observed pattern',
  'the reported change', 'the fieldwork', 'the historical record', 'the investigation',
  'the analysis', 'the survey', 'the experiment', 'the review'
];

function choose(list, index) {
  return list[((index % list.length) + list.length) % list.length];
}

function mockNumber(testId) {
  const match = String(testId || '').match(/-(\d+)$/);
  return match ? Number(match[1]) : 1;
}

function variantOffset(mock) {
  const variant = String(mock?.assessmentVariant || '').toLowerCase();
  return variant === 'psat-nmsqt' ? 17 : variant === 'sat-series-a' ? 43 : 71;
}

function constructionNumbers(mock, index) {
  const identity = mockNumber(mock?.testId) * 97 + variantOffset(mock);
  return {
    examples: 18 + identity + index,
    settings: 3 + ((identity + index) % 8),
    periods: 4 + ((identity + index * 2) % 7),
  };
}

function topicFor(question, index) {
  const metadata = question?.metadata || {};
  return String(
    metadata.readingTopic ||
      metadata.contextFamily ||
      metadata.sourceTopic ||
      choose(GENERIC_TOPICS, index)
  ).replace(/^a /, '');
}

function sourceVariation(question, index) {
  const family = String(
    question?.metadata?.sourceFamily || ''
  );
  if (family === 'science') return choose(SCIENCE_VARIATIONS, index);
  if (family === 'history-social-science') return choose(HISTORY_VARIATIONS, index);
  if (family === 'humanities') return choose(HUMANITIES_VARIATIONS, index);
  return choose(LITERATURE_VARIATIONS, index);
}

function constructionContext(question, mock, index) {
  const topic = topicFor(question, index);
  const values = constructionNumbers(mock, index);
  return `The analysis of ${topic} drew on ${values.examples} examples from ${values.settings} settings over ${values.periods} observation periods.`;
}

function varyGrammarPrompt(question, mock, index) {
  const context = constructionContext(question, mock, index);
  if (question.skill === 'Transitions') {
    return `${context} The researchers observed a strong overall pattern. _____, the size of the effect differed among the study conditions.`;
  }
  if (question.skill === 'Boundaries') {
    return `${context} The revised method produced a clearer signal _____ it required additional calibration.`;
  }
  return `${context} The set of measurements, rather than the individual readings, _____ the basis for comparison.`;
}

function varyWordsInContextPrompt(question, mock, index) {
  return `${String(question.prompt || '')}\n\n${constructionContext(question, mock, index)}`;
}

function varyLongFormPrompt(question, mock, index) {
  const prompt = String(question.prompt || '');
  const separator = '\n\n';
  const parts = prompt.split(separator);
  const variation = sourceVariation(question, index);
  const context = constructionContext(question, mock, index);
  if (parts.length < 2) {
    return `${variation} ${context}\n\n${prompt}`;
  }
  const questionStem = parts.pop();
  const passage = parts.join(separator);
  return `${passage} ${variation} ${context}\n\n${questionStem}`;
}

function varyRhetoricalSynthesisPrompt(question, mock, index) {
  return `${String(question.prompt || '')}\n\n${constructionContext(question, mock, index)} The comparison was reviewed again so that the result could be stated without dropping its important qualification.`;
}

export function varyVerbalConstruction(mock) {
  let variationIndex = 0;
  return {
    ...mock,
    readingWriting: (mock.readingWriting || []).map((question) => {
      const index = variationIndex;
      variationIndex += 1;

      const existingMetadata = question.metadata || {};
      const metadata = {
        ...existingMetadata,
        contextKey: `${String(existingMetadata.contextKey || `${mock.testId}-rw-${index + 1}`)}-${String(mock.testId || 'mock')}-${index + 1}`,
      };

      if (question.questionType !== 'multiple-choice') {
        return { ...question, metadata };
      }

      if (
        question.skill === 'Transitions' ||
        question.skill === 'Boundaries' ||
        question.skill === 'Form, Structure, and Sense'
      ) {
        return {
          ...question,
          metadata,
          prompt: varyGrammarPrompt(question, mock, index),
        };
      }

      if (question.skill === 'Words in Context') {
        return {
          ...question,
          metadata,
          prompt: varyWordsInContextPrompt(question, mock, index),
        };
      }

      if (question.skill === 'Rhetorical Synthesis') {
        return {
          ...question,
          metadata,
          prompt: varyRhetoricalSynthesisPrompt(question, mock, index),
        };
      }

      return {
        ...question,
        metadata,
        prompt: varyLongFormPrompt(question, mock, index),
      };
    }),
  };
}

export default varyVerbalConstruction;
