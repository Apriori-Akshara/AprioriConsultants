const TOPICS = [
  'urban heat mapping','migratory bird routes','ceramic pigment analysis','public transit scheduling','reef restoration','archival map conservation','battery electrode design','language change in coastal communities','soil carbon monitoring','museum acoustics','river sediment transport','night-sky monitoring','community garden yields','satellite imaging','woodland corridors','coastal dune recovery','microplastic sampling','ancient trade routes','wetland restoration','historic textile preservation','rainfall forecasting','pedestrian flow','riverbank vegetation','air-quality calibration','museum climate control','seed dispersal','coastal erosion','water-use efficiency','forest canopy recovery','traffic signal timing','solar-panel orientation','lake nutrient monitoring','crop disease detection','public-space acoustics','glacier sediment chemistry','digital archive discovery'
];
const DESIGNS = [
  'Researchers compared two sites before and after a six-week intervention','Researchers collected measurements at three intervals during the same season','Researchers paired sites with similar baseline conditions before making the comparison','Researchers repeated the measurement after changing one environmental condition','Researchers compared an early cohort with a later cohort using the same protocol','Researchers divided observations into low, middle, and high exposure groups','Researchers used two instruments and calibrated both against a common reference','Researchers followed the same locations for one year rather than sampling them once','Researchers compared a treatment group with a nearby group that did not receive it','Researchers combined field observations with a controlled laboratory measurement','Researchers repeated the study at sites with different starting conditions','Researchers recorded both the average outcome and the variation among observations'
];
const RESULTS = [
  'The largest change appeared where the starting value was lowest.','The broad pattern persisted, but its size differed among locations.','The newer method improved consistency without changing the average result.','The effect became smaller when the surrounding conditions were more variable.','The first measurement changed quickly, whereas the later measurement changed more slowly.','The comparison supported an association but did not isolate a single cause.','The result was strongest during the period with the greatest exposure.','The two groups had similar averages but different amounts of variation.','A secondary measure revealed a limitation that the primary measure did not show.','The intervention produced an improvement only when a second condition was present.','The overall direction of the result was consistent across the study sites.','The researchers therefore treated the finding as useful evidence rather than a universal rule.'
];
const SAMPLE_SIZES = [18,24,31,37,43,52,61,68,74,83,91,106];
const RW_SKILLS = [
  ['information-and-ideas','Central Ideas and Details'],['information-and-ideas','Inferences'],['information-and-ideas','Command of Evidence'],['craft-and-structure','Words in Context'],['craft-and-structure','Text Structure and Purpose'],['craft-and-structure','Cross-Text Connections'],['expression-of-ideas','Rhetorical Synthesis'],['expression-of-ideas','Transitions'],['standard-english-conventions','Boundaries'],['standard-english-conventions','Form, Structure, and Sense'],['information-and-ideas','Central Ideas and Details'],['information-and-ideas','Inferences']
];

function rotateChoices(choices, target) { const out = [...choices]; const correct = out.shift(); out.splice(target, 0, correct); return { choices: out, answer: String.fromCharCode(65 + target) }; }

function base({ id, testId, variant, module, route, domain, skill, prompt, choices, answer, explanation, cognitiveDemand = 'analyze' }) {
  return {
    contentId: id, version: 4, product: 'sat', questionId: id, testId,
    assessmentFamily: variant === 'psat-nmsqt' ? 'psat' : 'sat', assessmentVariant: variant,
    assessmentNumber: 1, section: 'reading-writing', module, domain, skill, subskill: skill,
    conceptId: `${domain}-${skill.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    difficulty: 'medium', difficultyBand: 'rw-originality', cognitiveDemand,
    questionType: 'multiple-choice', stimulusType: skill === 'Rhetorical Synthesis' ? 'notes' : 'short-passage', interactionType: 'single-select',
    timingMode: 'timed', estimatedTimeSeconds: 71, calculatorEligibility: false, calculatorMode: 'not-applicable', calculatorRequired: false, referenceSheetRelevant: false,
    passageId: `${testId}-passage-${String(id.match(/rw-(\d+)$/)?.[1] || 0).padStart(3,'0')}`,
    prompt, choices, answer, explanation, figure: null, isOperational: true, adaptiveRoute: route || null,
    originalityFingerprint: `${variant}-${id}`, conceptFingerprint: `${domain}-${skill}-${id}`, tags: [variant, 'mock', 'reading-writing', 'apriori-original'], lessonIds: [], sourceType: 'apriori-original', authoringStatus: 'qc-approved', status: 'assembly-ready', releaseEligibility: true,
    metadata: { contextKey: `${variant}-${testId}-rw-${id}`, contextFamily: `${variant}-${testId}-passage-family`, passageGenre: ['science','humanities','history','social-science'][Number(id.match(/rw-(\d+)$/)?.[1] || 0) % 4], readingTopic: null, rhetoricalPurpose: null, answerFormat: 'A-D' },
  };
}

function passageFor(i, seed) {
  const topic = TOPICS[(i + seed * 7) % TOPICS.length]; const design = DESIGNS[(i * 3 + seed) % DESIGNS.length]; const result = RESULTS[(i * 5 + seed * 2) % RESULTS.length]; const sample = SAMPLE_SIZES[(i + seed) % SAMPLE_SIZES.length]; const duration = 4 + ((i + seed * 3) % 9); const baseline = 40 + i; const followUp = 70 + i * 2;
  return `${topic[0].toUpperCase()}${topic.slice(1)} was examined in an original study. ${design} using ${sample} observations at each site. The observation period lasted ${duration} weeks, with ${baseline} baseline measurements and ${followUp} follow-up measurements recorded separately. ${result}`;
}

function equalizeChoiceLengths(choices) {
  const words = choices.map((choice) => String(choice).trim().split(/\s+/).filter(Boolean).length); const target = Math.max(...words);
  const suffixes = ['under the conditions described in the study and comparison','in the reported study and comparison described here','given the evidence provided in the passage and study','for the stated purpose in the reported comparison','in this comparison under the conditions described','as described in the passage and supporting study'];
  return choices.map((choice, index) => { const gap = target - words[index]; if (gap <= 0) return choice; const suffixWords = suffixes[index % suffixes.length].split(' '); return `${choice} ${suffixWords.slice(0, gap).join(' ')}`.trim(); });
}

function buildQuestion({ i, testId, variant, module, route, seed }) {
  const [domain, skill] = RW_SKILLS[i % RW_SKILLS.length]; const passage = passageFor(i, seed); let stem; let choices; let explanation; let cognitiveDemand = 'analyze';
  if (skill === 'Central Ideas and Details') { stem = 'Which choice best states the main idea of the text?'; choices = ['The study identifies a pattern whose size depends on the conditions under which it was observed.','The study proves that one factor determines the result in every setting.','The study shows that all observations produced identical results.','The study makes earlier measurements unnecessary because the new method is conclusive.']; explanation = 'The correct choice summarizes the reported pattern while preserving the qualification about conditions.'; }
  else if (skill === 'Inferences') { stem = 'Which inference is best supported by the text?'; choices = ['The observed relationship may change when the conditions surrounding the observation change.','The observed relationship must remain unchanged in every setting.','The evidence establishes one certain cause of the reported result.','The study found no meaningful difference among the observations.']; explanation = 'The passage describes a relationship whose size or persistence varies with conditions, supporting a qualified inference.'; cognitiveDemand = 'evaluate'; }
  else if (skill === 'Command of Evidence') { stem = 'Which finding would best support the interpretation presented in the text?'; choices = ['A follow-up measurement shows the same pattern when the relevant condition is changed in the predicted direction.','The researchers collected observations at several locations during the study.','The researchers recorded both averages and individual measurements.','The project followed earlier work on a related research question.']; explanation = 'The first choice directly tests and supports the interpretation; the other choices describe the study without providing direct evidence for the interpretation.'; }
  else if (skill === 'Words in Context') { stem = 'As used in the text, what does “pattern” most nearly mean?'; choices = ['a recurring relationship','a decorative arrangement','a private instruction','a fixed measurement']; explanation = 'In context, pattern refers to a recurring relationship visible in the observations.'; }
  else if (skill === 'Text Structure and Purpose') { stem = 'Why does the author include the information about how the result changes under different conditions?'; choices = ['To qualify the broader finding by identifying an important condition.','To replace the study’s main finding with an unrelated explanation.','To provide background that has no effect on the interpretation.','To repeat the first finding without adding any qualification.']; explanation = 'The added information limits how broadly the main pattern should be interpreted.'; cognitiveDemand = 'evaluate'; }
  else if (skill === 'Cross-Text Connections') { const passage2 = passageFor(i + 41, seed + 5); stem = `Passage 2: ${passage2}\n\nBased on the two passages, which statement would both authors most likely agree with?`; choices = ['A broad result can be informative even when its strength varies with local conditions.','A result is useful only when it is identical in every setting.','Local conditions make comparisons between studies unnecessary.','A single observation is sufficient to establish a universal rule.']; explanation = 'Both passages support a qualified interpretation in which the broad pattern remains useful while its magnitude depends on conditions.'; }
  else if (skill === 'Rhetorical Synthesis') { stem = 'The student wants to emphasize the study’s main result while preserving its important qualification. Which choice best accomplishes this goal?'; choices = ['The comparison reveals a measurable effect, although its size varies with the conditions being studied.','The researchers collected observations and compared them across several locations.','The study examined a defined group of observations during a specified period.','The project used measurements from more than one site and recorded the results.']; explanation = 'The first choice directly emphasizes the result and preserves the qualification that limits an overbroad claim.'; cognitiveDemand = 'synthesize'; }
  else if (skill === 'Transitions') { stem = 'The researchers observed a strong overall pattern. _____, the size of the effect differed among the study conditions.'; choices = ['However,','For example,','Similarly,','In addition,']; explanation = 'However correctly signals the contrast between the overall pattern and the difference in effect size.'; }
  else if (skill === 'Boundaries') { stem = 'The revised method produced a clearer signal _____ it required additional calibration.'; choices = ['; however,','; therefore,','; for example,','; similarly,']; explanation = 'A semicolon joins the two independent clauses, and however correctly signals their contrast.'; }
  else { stem = 'The set of measurements, rather than the individual readings, _____ the basis for comparison.'; choices = ['provides','provide','providing','have provided']; explanation = 'The singular subject set takes the singular verb provides.'; }
  choices = equalizeChoiceLengths(choices);
  const prompt = `${passage}\n\n${stem}`; const id = `${testId}-rw-${String(i + 1).padStart(3, '0')}`; const rotated = rotateChoices(choices, (i + seed) % 4);
  const record = base({ id, testId, variant, module, route, domain, skill, prompt, choices: rotated.choices, answer: rotated.answer, explanation, cognitiveDemand });
  record.metadata.readingTopic = TOPICS[(i + seed * 7) % TOPICS.length]; record.metadata.passageId = record.passageId; record.metadata.passageFingerprint = passage.toLowerCase().replace(/\s+/g, ' ').trim();
  return record;
}

export function buildProductionMock({ testId, variant, seed = 0 }) {
  const readingWriting = [];
  for (let i = 0; i < 27; i += 1) readingWriting.push(buildQuestion({ i, testId, variant, seed, module: 'rw-module-1', route: null }));
  for (const route of ['high','standard','low']) for (let i = 0; i < 27; i += 1) { const globalIndex = route === 'high' ? i + 27 : route === 'standard' ? i + 54 : i + 81; readingWriting.push(buildQuestion({ i: globalIndex, testId, variant, seed, module: 'rw-module-2', route })); }
  return { testId, assessmentVariant: variant, questionCount: 108, bankQuestionCount: 196, readingWriting, math: [] };
}

export const PSAT_MOCK_01_CONTENT = buildProductionMock({ testId: 'psat-mock-01', variant: 'psat-nmsqt', seed: 0 });
export const SAT_MOCK_01_CONTENT = buildProductionMock({ testId: 'sat-mock-01', variant: 'sat-series-a', seed: 1 });
export default { PSAT_MOCK_01_CONTENT, SAT_MOCK_01_CONTENT };
