import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateSatQuestion } from '../src/data/sat/questionSchema.js';
import { evaluateContentQuality } from '../src/data/sat/mockContent/batchMContentQualityGate.js';
import { BATCH_M_ACCEPTED_PRODUCTION_CORPUS } from '../src/data/sat/mockContent/batchMProductionStore.js';
import { applyBatchMCalibrationProductionReplacement } from '../src/data/sat/mockContent/batchMCalibrationProductionReplacement.js';
import { BATCH_M_PRODUCTION_SEQUENCE } from '../src/data/sat/mockContent/batchMProductionController.js';
import { validateFigureOriginalitySeries, getFigureDataFingerprint } from '../src/data/sat/mockContent/figureOriginalityQC.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUTPUT_DIR = process.env.BATCH_M_OUTPUT_DIR || path.join(root, 'artifacts/batch-m-deep-content-quality-qc');
const REPORT_PATH = path.join(root, 'docs/BATCH-M-DEEP-CONTENT-QUALITY-DIVERSITY-QC-2026-09-17.json');

const EXPECTED_MOCKS = 30;
const EXPECTED_RECORDS_PER_MOCK = 196;
const EXPECTED_TOTAL = EXPECTED_MOCKS * EXPECTED_RECORDS_PER_MOCK;
const RW_SHORT_SKILLS = new Set(['Transitions', 'Boundaries', 'Form, Structure, and Sense']);
const RW_SKILLS = new Set([
  'Central Ideas and Details', 'Inferences', 'Command of Evidence', 'Words in Context',
  'Text Structure and Purpose', 'Cross-Text Connections', 'Rhetorical Synthesis',
  'Transitions', 'Boundaries', 'Form, Structure, and Sense',
]);
const MATH_DOMAINS = new Set(['Algebra', 'Advanced Math', 'Problem-Solving and Data Analysis', 'Geometry and Trigonometry']);
const HARD_FEATURES = new Set(['multi-step', 'strategic-choice', 'constraint-inference', 'representation-shift', 'evidence-synthesis', 'parameter-reasoning']);
const GENERIC_PHRASES = [
  'the observed relationship', 'the reported comparison condition', 'the stated relationship',
  'the result therefore supports', 'qualify means to limit or modify',
  'the first choice directly reflects the evidence relationship', 'the researchers collected observations',
  'uses the reported relationship directly', 'the unknown is isolated from the stated condition',
  'the quantities are connected through the model', 'area equals',
];
const SAMPLE_PER_BUCKET = 2;
const MAX_SAMPLE = 240;

const normalize = (value) => String(value ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
const words = (value) => normalize(value).split(/\s+/).filter(Boolean);
const wordCount = (value) => words(value).length;
const unique = (values) => [...new Set(values.filter(Boolean))];
const inc = (map, key, amount = 1) => map.set(key, (map.get(key) || 0) + amount);
const sortedObject = (map) => Object.fromEntries([...map.entries()].sort((a, b) => b[1] - a[1]));
const recordsOf = (mock) => [...(mock?.readingWriting || []), ...(mock?.math || [])];
const idOf = (q) => String(q?.questionId || q?.contentId || '');
const testKeyOf = (mock) => String(mock?.testKey || mock?.testId || '').toUpperCase();
function clone(value) { return JSON.parse(JSON.stringify(value)); }
function stimulusOf(q) {
  const prompt = String(q?.prompt || '').trim();
  const parts = prompt.split(/\n\n+/).map((x) => x.trim()).filter(Boolean);
  if (parts.length <= 1) return prompt;
  return parts.slice(0, -1).join(' ');
}
function sentenceStats(text) {
  const cleaned = String(text || '').replace(/\s+/g, ' ').trim();
  const sentences = cleaned.split(/[.!?]+(?=\s|$)/).map((s) => s.trim()).filter(Boolean);
  const counts = sentences.map(wordCount);
  return { count: sentences.length, averageWords: counts.length ? Number((counts.reduce((a, b) => a + b, 0) / counts.length).toFixed(2)) : 0, maxWords: counts.length ? Math.max(...counts) : 0 };
}
function typeTokenRatio(text) {
  const tokens = words(text).filter((x) => x.length > 2);
  return tokens.length ? Number((new Set(tokens).size / tokens.length).toFixed(3)) : 0;
}
function repeatedNgramRate(text, n = 4) {
  const tokens = words(text).filter((x) => x.length > 2);
  if (tokens.length < n) return 0;
  const counts = new Map();
  for (let i = 0; i <= tokens.length - n; i += 1) inc(counts, tokens.slice(i, i + n).join(' '));
  const repeated = [...counts.values()].filter((x) => x > 1).reduce((a, b) => a + b, 0);
  return Number((repeated / Math.max(tokens.length - n + 1, 1)).toFixed(3));
}
function answerIndex(q) { return String(q?.answer || '').trim().toUpperCase().charCodeAt(0) - 65; }
function choicesOf(q) { return Array.isArray(q?.choices) ? q.choices.map((x) => String(x ?? '')) : []; }
function genericHits(text) { const n = normalize(text); return GENERIC_PHRASES.filter((p) => n.includes(normalize(p))); }
function metadata(q) { return q?.metadata && typeof q.metadata === 'object' ? q.metadata : {}; }
function getDistractorProfiles(q) {
  const profiles = metadata(q)?.distractor_architecture?.profiles;
  if (!profiles || typeof profiles !== 'object') return [];
  return Object.entries(profiles).filter(([, value]) => value?.role === 'distractor' && value?.misconception && value?.error_mechanism);
}
function buildRuntimeCorpus() {
  return BATCH_M_PRODUCTION_SEQUENCE.map((target) => {
    const base = BATCH_M_ACCEPTED_PRODUCTION_CORPUS.find((mock) => mock?.testId === target.testId);
    if (!base) throw new Error(`Missing canonical production mock for ${target.testKey}/${target.testId}`);
    return applyBatchMCalibrationProductionReplacement(clone(base), target.testKey);
  });
}

const failures = [];
const warnings = [];
function fail(check, detail) { failures.push({ check, detail }); }
function warn(check, detail) { warnings.push({ check, detail }); }

const corpus = buildRuntimeCorpus();
if (corpus.length !== EXPECTED_MOCKS) fail('scope:mock-count', `expected ${EXPECTED_MOCKS}, found ${corpus.length}`);
const all = [];
const ids = new Set();
const mockSummaries = [];
const counts = {
  section: new Map(), domain: new Map(), rwSkill: new Map(), mathSkill: new Map(),
  rwSourceFamily: new Map(), rwRhetoricalStructure: new Map(), rwCognitiveOperation: new Map(),
  rwEvidenceRelationship: new Map(), difficulty: new Map(), questionType: new Map(),
  mathFigureType: new Map(), mathDifficultyFeature: new Map(), stimulusBucket: new Map(),
};
const duplicatePrompt = new Map();
const duplicateStimulus = new Map();
const duplicateApplication = new Map();
const figureFingerprints = new Map();

for (const mock of corpus) {
  const testKey = testKeyOf(mock);
  const records = recordsOf(mock);
  if (records.length !== EXPECTED_RECORDS_PER_MOCK) fail('scope:record-count', `${testKey}: ${records.length} records; expected ${EXPECTED_RECORDS_PER_MOCK}`);
  const mockSkills = new Set();
  const mockFigures = new Set();
  const mockTypes = new Set();
  let mockFailures = 0;

  for (const q of records) {
    const id = idOf(q);
    if (!id) fail('identity:missing-question-id', `${testKey}`);
    if (ids.has(id)) fail('identity:duplicate-question-id', id);
    ids.add(id);
    all.push({ testKey, q });

    const schema = validateSatQuestion(q);
    if (!schema.valid) fail('schema', { testKey, questionId: id, errors: schema.errors });
    const quality = evaluateContentQuality(q);
    if (quality.verdict !== 'pass') { mockFailures += 1; fail('existing-content-quality-gate', { testKey, questionId: id, checks: quality.checks }); }

    inc(counts.section, q.section || 'missing');
    inc(counts.difficulty, q.difficulty || 'missing');
    inc(counts.questionType, `${q.section || 'missing'}:${q.questionType || 'missing'}`);
    mockTypes.add(q.questionType || 'missing');
    const promptNorm = normalize(q.prompt);
    if (promptNorm) inc(duplicatePrompt, promptNorm);

    if (q.section === 'reading-writing') {
      const skill = String(q.skill || '');
      inc(counts.rwSkill, skill || 'missing');
      mockSkills.add(skill || 'missing');
      if (!RW_SKILLS.has(skill)) fail('rw:unsupported-skill', `${testKey}/${id}: ${skill || 'missing'}`);
      const stimulus = stimulusOf(q);
      const wc = wordCount(stimulus);
      const limit = RW_SHORT_SKILLS.has(skill) ? [8, 80] : [25, 150];
      inc(counts.stimulusBucket, `${skill}:${wc < limit[0] ? 'too-short' : wc > limit[1] ? 'too-long' : 'in-range'}`);
      if (wc < limit[0] || wc > limit[1]) fail('rw:stimulus-length', `${testKey}/${id}: ${wc} words; expected ${limit[0]}-${limit[1]}`);
      const m = metadata(q);
      inc(counts.rwSourceFamily, m.sourceFamily || 'missing');
      inc(counts.rwRhetoricalStructure, m.rhetoricalStructure || 'missing');
      inc(counts.rwCognitiveOperation, m.cognitiveOperation || 'missing');
      inc(counts.rwEvidenceRelationship, m.evidenceRelationship || 'missing');
      if (!m.sourceFamily || !m.rhetoricalStructure || !m.cognitiveOperation) fail('rw:blueprint-metadata', `${testKey}/${id}`);
      if (getDistractorProfiles(q).length < 3) warn('rw:distractor-architecture-not-fully-explicit', `${testKey}/${id}`);
      if (genericHits(stimulus).length >= 2) fail('rw:generic-template-density', `${testKey}/${id}`);
      if (repeatedNgramRate(stimulus) > 0.08) warn('rw:repeated-ngram-density', `${testKey}/${id}`);
      if (typeTokenRatio(stimulus) < 0.42 && wc >= 40) warn('rw:low-lexical-variety', `${testKey}/${id}`);
      if (['Central Ideas and Details', 'Inferences', 'Command of Evidence', 'Words in Context', 'Text Structure and Purpose', 'Cross-Text Connections', 'Rhetorical Synthesis'].includes(skill) && !m.evidence_map) warn('rw:evidence-map-missing', `${testKey}/${id}`);
      if (skill === 'Cross-Text Connections' && !/passage 2/i.test(String(q.prompt || ''))) fail('rw:cross-text-structure', `${testKey}/${id}`);
      if (skill === 'Rhetorical Synthesis' && !/goal:/i.test(String(q.prompt || ''))) fail('rw:synthesis-goal', `${testKey}/${id}`);
      if (skill === 'Words in Context' && /qualify/i.test(stimulus)) fail('rw:fixed-wic-target', `${testKey}/${id}`);
      if (promptNorm) inc(duplicateStimulus, normalize(stimulus));
    } else if (q.section === 'math') {
      const domain = String(q.domain || '');
      const skill = String(q.skill || '');
      inc(counts.domain, domain || 'missing');
      inc(counts.mathSkill, skill || 'missing');
      mockSkills.add(`${domain}|${skill}`);
      if (!MATH_DOMAINS.has(domain)) fail('math:unsupported-domain', `${testKey}/${id}: ${domain || 'missing'}`);
      const m = metadata(q);
      const features = Array.isArray(m.difficultyFeatures) ? m.difficultyFeatures : [];
      features.forEach((feature) => inc(counts.mathDifficultyFeature, feature));
      if (q.difficulty === 'hard' && !features.some((feature) => HARD_FEATURES.has(feature))) fail('math:hard-without-demand-feature', `${testKey}/${id}`);
      if (q.difficulty === 'hard' && !features.includes('multi-step')) fail('math:hard-without-multi-step', `${testKey}/${id}`);
      if (q.questionType === 'multiple-choice') {
        const choices = choicesOf(q);
        const ai = answerIndex(q);
        if (choices.length !== 4) fail('math:choice-count', `${testKey}/${id}: ${choices.length}`);
        if (ai < 0 || ai > 3) fail('math:answer-key', `${testKey}/${id}`);
        if (new Set(choices.map(normalize)).size !== choices.length) fail('math:duplicate-choices', `${testKey}/${id}`);
      } else if (q.questionType === 'student-produced-response') {
        if (choicesOf(q).length) fail('math:spr-has-choices', `${testKey}/${id}`);
      } else fail('math:unsupported-question-type', `${testKey}/${id}: ${q.questionType || 'missing'}`);
      if (genericHits(q.prompt).length >= 2) fail('math:generic-template-density', `${testKey}/${id}`);
      if (q.figure) {
        const figureType = String(q.figure.figure_type || q.figure.type || q.figureType || 'unknown');
        inc(counts.mathFigureType, figureType);
        mockFigures.add(figureType);
        if (m.figurePurpose !== 'question-essential') fail('math:figure-not-essential', `${testKey}/${id}`);
        const fp = getFigureDataFingerprint(q);
        if (fp) inc(figureFingerprints, fp);
      }
      if (m.applicationFingerprint) inc(duplicateApplication, normalize(m.applicationFingerprint));
    } else {
      fail('section:unsupported', `${testKey}/${id}`);
    }

    if (Array.isArray(q.applicable_to) && q.applicable_to.includes('PSAT') && q.metadata?.psatCeiling === 'SAT-only') warn('psat:ceiling-metadata-conflict', `${testKey}/${id}`);
    if (testKey.startsWith('PSAT') && q.metadata?.psatAboveCeiling === true) fail('psat:above-ceiling', `${testKey}/${id}`);
  }

  mockSummaries.push({ testKey, recordCount: records.length, qualityFailures: mockFailures, distinctSkillOrDomainSkillKeys: mockSkills.size, distinctFigureTypes: mockFigures.size, questionTypes: [...mockTypes] });
}

const promptDuplicates = [...duplicatePrompt.entries()].filter(([, count]) => count > 1);
const stimulusDuplicates = [...duplicateStimulus.entries()].filter(([, count]) => count > 1);
const applicationDuplicates = [...duplicateApplication.entries()].filter(([, count]) => count > 1);
if (promptDuplicates.length) fail('diversity:duplicate-prompts', `${promptDuplicates.length} duplicated normalized prompts`);
if (stimulusDuplicates.length) warn('diversity:repeated-stimulus', `${stimulusDuplicates.length} duplicated normalized stimuli`);
if (applicationDuplicates.length) fail('diversity:duplicate-math-applications', `${applicationDuplicates.length} duplicated Math application fingerprints`);
if (ids.size !== EXPECTED_TOTAL) fail('scope:unique-question-count', `expected ${EXPECTED_TOTAL}, found ${ids.size}`);
try { validateFigureOriginalitySeries(corpus); } catch (error) { fail('figures:originality-series', String(error?.message || error)); }

const rwFamilies = unique([...counts.rwSourceFamily.keys()].filter((x) => x !== 'missing'));
const rwStructures = unique([...counts.rwRhetoricalStructure.keys()].filter((x) => x !== 'missing'));
const rwOperations = unique([...counts.rwCognitiveOperation.keys()].filter((x) => x !== 'missing'));
const rwSkills = unique([...counts.rwSkill.keys()].filter((x) => x !== 'missing'));
const mathDomains = unique([...counts.domain.keys()].filter((x) => x !== 'missing'));
const mathSkills = unique([...counts.mathSkill.keys()].filter((x) => x !== 'missing'));
const figureTypes = unique([...counts.mathFigureType.keys()].filter((x) => x !== 'unknown'));
if (rwFamilies.length < 4) fail('diversity:rw-source-families', `expected all 4 documented families, found ${rwFamilies.length}`);
if (rwStructures.length < 6) fail('diversity:rw-rhetorical-structures', `expected at least 6 observed structures, found ${rwStructures.length}`);
if (rwOperations.length < 5) fail('diversity:rw-cognitive-operations', `expected at least 5 observed operations, found ${rwOperations.length}`);
if (rwSkills.length < RW_SKILLS.size) fail('diversity:rw-skill-coverage', `expected all ${RW_SKILLS.size} documented skills, found ${rwSkills.length}`);
if (mathDomains.length < MATH_DOMAINS.size) fail('diversity:math-domain-coverage', `expected all ${MATH_DOMAINS.size} documented domains, found ${mathDomains.length}`);
if (mathSkills.length < 10) warn('diversity:math-skill-breadth', `only ${mathSkills.length} distinct Math skills observed`);
if (figureTypes.length < 4) warn('diversity:math-figure-types', `only ${figureTypes.length} distinct figure types observed`);

const totalMath = all.filter(({ q }) => q.section === 'math').length;
const sprCount = all.filter(({ q }) => q.section === 'math' && q.questionType === 'student-produced-response').length;
const sprPct = totalMath ? Number((sprCount / totalMath * 100).toFixed(2)) : 0;
if (sprPct < 25 || sprPct > 30) fail('calibration:math-spr-range', `observed ${sprPct}% SPR; specification target is roughly 25-30%`);
const easy = counts.difficulty.get('easy') || 0;
const medium = counts.difficulty.get('medium') || 0;
const hard = counts.difficulty.get('hard') || 0;
if (!easy || !medium || !hard) fail('difficulty:missing-band', `easy=${easy}, medium=${medium}, hard=${hard}`);

const sampleCandidates = [];
const seenBuckets = new Map();
for (const { testKey, q } of all) {
  const dimension = q.section === 'reading-writing' ? String(q.skill || 'missing') : `${q.domain || 'missing'}|${q.skill || 'missing'}`;
  const bucket = `${testKey}|${q.section}|${dimension}|${q.difficulty}`;
  const count = seenBuckets.get(bucket) || 0;
  if (count < SAMPLE_PER_BUCKET && sampleCandidates.length < MAX_SAMPLE) {
    seenBuckets.set(bucket, count + 1);
    sampleCandidates.push({
      testKey, questionId: idOf(q), section: q.section, domain: q.domain || null, skill: q.skill || null,
      difficulty: q.difficulty, questionType: q.questionType, prompt: String(q.prompt || ''), choices: choicesOf(q), answer: q.answer || null,
      stimulusWordCount: q.section === 'reading-writing' ? wordCount(stimulusOf(q)) : null,
      sourceFamily: metadata(q).sourceFamily || null, rhetoricalStructure: metadata(q).rhetoricalStructure || null,
      cognitiveOperation: metadata(q).cognitiveOperation || null, evidenceRelationship: metadata(q).evidenceRelationship || null,
      difficultyFeatures: metadata(q).difficultyFeatures || [], figureType: q.figure ? String(q.figure.figure_type || q.figure.type || q.figureType || 'unknown') : null,
      distractorProfiles: getDistractorProfiles(q).map(([id, value]) => ({ choice: id, misconception: value.misconception, errorMechanism: value.error_mechanism })),
    });
  }
}
const sampleFindings = sampleCandidates.map((item) => {
  const flags = [];
  if (item.section === 'reading-writing' && item.stimulusWordCount !== null && item.stimulusWordCount < (RW_SHORT_SKILLS.has(item.skill) ? 8 : 25)) flags.push('short-stimulus');
  if (item.section === 'reading-writing' && genericHits(item.prompt).length) flags.push('generic-language');
  if (item.section === 'math' && item.difficulty === 'hard' && !item.difficultyFeatures.some((x) => HARD_FEATURES.has(x))) flags.push('weak-hard-evidence');
  if (item.section === 'reading-writing' && item.distractorProfiles.length < 3) flags.push('distractor-architecture-not-explicit');
  return { ...item, automatedFlags: flags, reviewDisposition: flags.length ? 'targeted-human-review' : 'representative-pass-candidate' };
});

const gateSummary = {
  scopeAndIdentity: failures.some((x) => x.check.startsWith('scope:') || x.check.startsWith('identity:')) ? 'FAIL' : 'PASS',
  schema: failures.some((x) => x.check === 'schema') ? 'FAIL' : 'PASS',
  rwConstruction: failures.some((x) => x.check.startsWith('rw:')) ? 'FAIL' : 'PASS',
  mathConstruction: failures.some((x) => x.check.startsWith('math:')) ? 'FAIL' : 'PASS',
  reasoningAndDifficulty: failures.some((x) => x.check.includes('hard-without') || x.check.startsWith('difficulty:')) ? 'FAIL' : 'PASS',
  distractorQuality: warnings.some((x) => x.check.includes('distractor')) ? 'REVIEW' : 'PASS',
  diversity: failures.some((x) => x.check.startsWith('diversity:')) ? 'FAIL' : 'PASS',
  figuresAndTables: failures.some((x) => x.check.startsWith('figures:') || x.check.startsWith('math:figure')) ? 'FAIL' : 'PASS',
  psatCeiling: failures.some((x) => x.check.startsWith('psat:')) ? 'FAIL' : 'PASS',
  mathSPR: failures.some((x) => x.check === 'calibration:math-spr-range') ? 'FAIL' : 'PASS',
};

const report = {
  reportType: 'batch-m-deep-content-quality-diversity-qc',
  reportVersion: '2026-09-17.v1',
  date: '2026-09-17',
  scope: 'Frozen Batch M 30-mock runtime corpus: SAT1-SAT10, PSAT1-PSAT10, SAT11-SAT20',
  source: 'BATCH_M_ACCEPTED_PRODUCTION_CORPUS plus authorized 352-question calibration replacement layer',
  productionMutation: false,
  releaseEligible: false,
  sat21Created: false,
  methodology: {
    automated: 'All 5,880 runtime questions were analyzed for schema, construction, difficulty signals, diversity, originality, response format, figures, PSAT ceiling, and documented content-quality indicators.',
    representativeSampling: `Stratified deterministic sample of up to ${MAX_SAMPLE} items, targeting ${SAMPLE_PER_BUCKET} items per mock × section × skill/domain × difficulty bucket. The sample is for focused human review and is not a substitute for corpus-wide automated gates.`,
    manualThousandsNotPerformed: true,
  },
  corpus: { mocks: corpus.length, recordsPerMock: EXPECTED_RECORDS_PER_MOCK, totalQuestions: all.length, uniqueQuestionIds: ids.size, mathQuestions: totalMath, mathSPR: sprCount, mathSPRPercent: sprPct },
  distributions: {
    section: sortedObject(counts.section), difficulty: sortedObject(counts.difficulty), questionType: sortedObject(counts.questionType),
    rwSkills: sortedObject(counts.rwSkill), rwSourceFamilies: sortedObject(counts.rwSourceFamily), rwRhetoricalStructures: sortedObject(counts.rwRhetoricalStructure),
    rwCognitiveOperations: sortedObject(counts.rwCognitiveOperation), rwEvidenceRelationships: sortedObject(counts.rwEvidenceRelationship),
    mathDomains: sortedObject(counts.domain), mathSkills: sortedObject(counts.mathSkill), mathDifficultyFeatures: sortedObject(counts.mathDifficultyFeature), mathFigureTypes: sortedObject(counts.mathFigureType),
  },
  diversitySummary: {
    rwSkillCount: rwSkills.length, rwSourceFamilyCount: rwFamilies.length, rwRhetoricalStructureCount: rwStructures.length, rwCognitiveOperationCount: rwOperations.length,
    mathDomainCount: mathDomains.length, mathSkillCount: mathSkills.length, mathFigureTypeCount: figureTypes.length,
    duplicateNormalizedPrompts: promptDuplicates.length, repeatedNormalizedStimuli: stimulusDuplicates.length, duplicateMathApplicationFingerprints: applicationDuplicates.length,
    uniqueFigureFingerprints: figureFingerprints.size,
  },
  perMock: mockSummaries,
  gates: gateSummary,
  failureCounts: sortedObject(failures.reduce((m, x) => { inc(m, x.check); return m; }, new Map())),
  failures,
  warnings,
  representativeSample: sampleFindings,
  acceptanceDecision: failures.length === 0 && warnings.length === 0 ? 'PASS' : 'QUALITY_HOLD',
  releaseDecision: 'NOT_RELEASE_ELIGIBLE',
  nextStep: failures.length || warnings.length
    ? 'Address the documented substantive quality/diversity gaps using targeted candidate remediation only; rerun this deep QC and the required downstream release gates. Do not perform wholesale regeneration or create SAT21.'
    : 'Proceed to final release-acceptance gates, while retaining production/release boundaries until all acceptance gates pass.',
};

fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
fs.mkdirSync(OUTPUT_DIR, { recursive: true });
fs.writeFileSync(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
fs.writeFileSync(path.join(OUTPUT_DIR, 'BATCH-M-DEEP-CONTENT-QUALITY-DIVERSITY-QC-2026-09-17.json'), `${JSON.stringify(report, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ status: report.acceptanceDecision, releaseEligible: report.releaseEligible, failures: failures.length, warnings: warnings.length, totalQuestions: all.length, sampleSize: sampleFindings.length, mathSPRPercent: sprPct, reportPath: REPORT_PATH }, null, 2));
if (report.acceptanceDecision !== 'PASS') process.exitCode = 1;
