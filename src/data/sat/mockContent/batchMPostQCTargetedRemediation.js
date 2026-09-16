import { canonicalBatchMTestKey } from './batchMCanonicalTestKey.js';

const TARGET_TEST_KEYS = new Set([
  'SAT1', 'SAT2', 'SAT3', 'SAT4', 'SAT5', 'SAT6', 'SAT7', 'SAT8', 'SAT9', 'SAT10',
  'PSAT1', 'PSAT2', 'PSAT3', 'PSAT4', 'PSAT5', 'PSAT6', 'PSAT7', 'PSAT8', 'PSAT9', 'PSAT10',
]);

const HARD_FEATURES = new Set([
  'multi-step', 'strategic-choice', 'constraint-inference', 'representation-shift',
  'evidence-synthesis', 'parameter-reasoning',
]);

const CROSS_TEXT_REDUNDANT_PATTERNS = [
  /^This distinction matters because /i,
  /^The analysis of .* drew on .*$/i,
  /^The researchers considered both /i,
  /^Taken together, the observations support a useful pattern but leave room for a more qualified interpretation\.?$/i,
  /^The result therefore supports a narrower claim than a simple comparison might initially suggest\.?$/i,
  /^The final analysis treated /i,
  /^The investigators examined whether /i,
  /^The experiment repeated the procedure after /i,
  /^The study included a comparison condition /i,
];

function wordCount(value) {
  return String(value || '').trim().split(/\s+/).filter(Boolean).length;
}

function replaceSentence(block, predicate) {
  const sentences = block.match(/[^.!?]+[.!?](?:\s+|$)|[^.!?]+$/g) || [block];
  const kept = sentences.filter((sentence) => !predicate(sentence.trim()));
  return kept.join(' ').replace(/\s+/g, ' ').trim();
}

function shortenCrossTextPrompt(prompt) {
  let blocks = String(prompt || '').split(/\n\s*\n/).map((block) => block.trim()).filter(Boolean);
  if (blocks.length < 3) return String(prompt || '');
  for (let index = 0; index < blocks.length - 1; index += 1) {
    for (const pattern of CROSS_TEXT_REDUNDANT_PATTERNS) blocks[index] = replaceSentence(blocks[index], (sentence) => pattern.test(sentence));
  }
  const removablePriority = [
    /^The analysis of /i,
    /^The researchers considered /i,
    /^The investigators examined /i,
    /^The final analysis treated /i,
    /^The study included /i,
    /^The experiment repeated /i,
    /^Taken together, /i,
    /^This distinction matters /i,
    /^The result therefore supports /i,
  ];
  let attempts = 0;
  while (wordCount(blocks.join(' ')) > 150 && attempts < 30) {
    let removed = false;
    for (const pattern of removablePriority) {
      for (let index = 1; index < blocks.length - 1; index += 1) {
        const before = blocks[index];
        const after = replaceSentence(before, (sentence) => pattern.test(sentence));
        if (after !== before) { blocks[index] = after; removed = true; break; }
      }
      if (removed) break;
    }
    if (!removed) break;
    attempts += 1;
  }
  return blocks.join('\n\n');
}

function normalizeHardDifficulty(question) {
  if (question?.difficulty !== 'hard') return { question, applied: false };
  const features = new Set(question?.metadata?.difficultyFeatures || []);
  if ([...features].some((feature) => HARD_FEATURES.has(feature))) return { question, applied: false };
  return { question: { ...question, difficulty: 'medium' }, applied: true };
}

function repairFigureCollision(question) {
  if (question?.questionId !== 'psat-mock-01-math-math-module-1-m1-14') return { question, applied: false };
  if (question?.section !== 'math' || question?.skill !== 'Quadratic functions and representations') return { question, applied: false };
  return {
    question: {
      ...question,
      prompt: 'The graph of f(x) = (x − 5)² + 10 is shown. What is the y-coordinate of the vertex of the graph?',
      choices: ['10', '8', '12', '15'],
      answer: 'A',
      rationale: 'In vertex form, f(x) = (x − h)² + k has vertex (h, k). Here k = 10, so the y-coordinate is 10.',
      explanation: 'The constant term in vertex form gives the y-coordinate of the vertex, so the answer is 10.',
      figure: { type: 'parabola', a: 1, b: -10, c: 35, values: { a: 1, b: -10, c: 35 }, figurePurpose: 'question-essential' },
    },
    applied: true,
  };
}

export function applyBatchMPostQCTargetedRemediations(corpus) {
  if (!Array.isArray(corpus)) throw new Error('Batch M post-QC remediation: corpus must be an array.');
  const summary = { difficultyCalibrations: 0, rwStimulusRepairs: 0, figureRepairs: 0, targetsChanged: 0 };
  const repairedCorpus = corpus.map((mock) => {
    const testKey = canonicalBatchMTestKey(mock);
    if (!TARGET_TEST_KEYS.has(testKey)) return mock;
    const repairQuestion = (original) => {
      let question = original;
      let changed = false;
      const difficulty = normalizeHardDifficulty(question);
      question = difficulty.question;
      if (difficulty.applied) { summary.difficultyCalibrations += 1; changed = true; }
      if (question.section === 'reading-writing' && question.skill === 'Cross-Text Connections' && wordCount(question.prompt) > 150) {
        const repairedPrompt = shortenCrossTextPrompt(question.prompt);
        if (wordCount(repairedPrompt) > 150) throw new Error(`Batch M post-QC remediation: Cross-Text prompt remains over 150 words for ${testKey}::${question.questionId}.`);
        if (repairedPrompt !== question.prompt) { question = { ...question, prompt: repairedPrompt }; summary.rwStimulusRepairs += 1; changed = true; }
      }
      const figure = repairFigureCollision(question);
      question = figure.question;
      if (figure.applied) { summary.figureRepairs += 1; changed = true; }
      if (changed) summary.targetsChanged += 1;
      return question;
    };
    return { ...mock, readingWriting: (mock.readingWriting || []).map(repairQuestion), math: (mock.math || []).map(repairQuestion) };
  });
  return { corpus: repairedCorpus, summary };
}

export default applyBatchMPostQCTargetedRemediations;
