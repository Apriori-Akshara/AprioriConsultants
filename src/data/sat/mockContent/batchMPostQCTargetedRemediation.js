import { canonicalBatchMTestKey } from './batchMCanonicalTestKey.js';
import { getFigureDataFingerprint } from './figureOriginalityQC.js';

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

function stripFigureFingerprints(metadata) {
  if (!metadata) return metadata;
  const { figureOriginalityFingerprint, figureStructureFingerprint, figureDataFingerprint, ...rest } = metadata;
  return rest;
}

function rotateChoices(choices, target) {
  const out = [...choices];
  const correct = out.shift();
  out.splice(target, 0, correct);
  return { choices: out, answer: String.fromCharCode(65 + target) };
}

function numericRepair(question, prompt, correct, distractors, explanation, occurrence) {
  const correctText = String(correct);
  if (question.questionType === 'student-produced-response') {
    return {
      ...question,
      prompt: `${prompt}\nEnter your answer as a number.`,
      choices: [],
      answer: correctText,
      explanation,
    };
  }
  const rotated = rotateChoices([correctText, ...distractors.map(String)], occurrence % 4);
  return { ...question, prompt, choices: rotated.choices, answer: rotated.answer, explanation };
}

function seedFromQuestionId(questionId) {
  let hash = 0;
  for (const character of String(questionId || '')) hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
  return hash;
}

function buildFigureCollisionVariant(question, occurrence) {
  const skill = String(question.skill || '');
  const o = Number(occurrence) || 0;

  if (skill === 'Right triangles') {
    const leg = 7 + ((o * 7) % 73);
    const hyp = leg + 4;
    const other = Number(Math.sqrt(hyp * hyp - leg * leg).toFixed(2));
    const prompt = `A right triangle has one leg of ${leg} and hypotenuse of ${hyp}. What is the length of the other leg?`;
    const repaired = numericRepair(
      question,
      prompt,
      other,
      [leg, Number((hyp - leg).toFixed(2)), Number((other + 2.5).toFixed(2))],
      'Use the Pythagorean theorem to square the hypotenuse and the known leg, subtract, and take the positive square root for the other leg.',
      o,
    );
    return { ...repaired, figure: { type: 'right_triangle', values: { x: leg, y: other } } };
  }

  if (skill === 'Quadratic functions and representations') {
    const h = 3 + ((o * 5) % 47);
    const k = 6 + ((o * 7) % 53);
    const a = 1;
    const b = -2 * h;
    const c = h * h + k;
    const prompt = `The graph of f(x) = (x − ${h})² + ${k} is shown. What is the y-coordinate of the vertex of the graph?`;
    const repaired = numericRepair(
      question,
      prompt,
      k,
      [h, k + 2, Math.max(0, k - 3)],
      'In vertex form, f(x) = (x − h)² + k has vertex (h, k), so the y-coordinate is k.',
      o,
    );
    return { ...repaired, figure: { type: 'parabola', a, b, c, values: { a, b, c } } };
  }

  if (skill === 'Data models') {
    const base = 10 + ((o * 11) % 70);
    const increments = [3 + (o % 3), 7 + (o % 4), 10 + (o % 5), 14 + (o % 6)];
    const points = [[1, base], [2, base + increments[0]], [3, base + increments[1]], [4, base + increments[2]], [5, base + increments[3]]];
    const prompt = `A scatterplot has observed values ${points.map(([x, y]) => `(${x}, ${y})`).join(', ')}. A linear model is used to describe the trend. Which statement is best supported by the data?`;
    const choices = [
      'The response generally increases as the explanatory variable increases.',
      'The response is exactly constant for every value.',
      'The response must decrease whenever the explanatory variable increases.',
      'The data establish that the explanatory variable causes every change in the response.',
    ];
    const rotated = rotateChoices(choices, o % 4);
    return {
      ...question,
      questionType: 'multiple-choice',
      interactionType: 'single-select',
      prompt,
      choices: rotated.choices,
      answer: rotated.answer,
      explanation: 'The plotted response values rise overall as the explanatory variable increases, but the data do not establish causation.',
      figure: { type: 'scatter_plot', values: { points } },
    };
  }

  if (skill === 'Similarity and scaling') {
    const smallLength = 4 + ((o * 3) % 36);
    const scale = 2 + (o % 4);
    const smallArea = 12 + ((o * 5) % 29);
    const correct = smallArea * scale * scale;
    const prompt = `Two similar figures have corresponding lengths in the ratio ${scale}:1. If the smaller figure has area ${smallArea} square units, what is the area of the larger figure?`;
    const repaired = numericRepair(
      question,
      prompt,
      correct,
      [smallArea * scale, smallArea + scale * scale, Math.max(1, correct - scale * 3)],
      `Areas of similar figures scale by the square of the length factor. The larger area is ${smallArea} × ${scale}² = ${correct}.`,
      o,
    );
    return {
      ...repaired,
      figure: { type: 'geometry', values: { shape: 'similar-figures', smallLength, scale, intermediate: smallLength * scale, smallArea } },
    };
  }

  if (skill === 'Geometry and measurement') {
    const outer = 18 + ((o * 5) % 37);
    const height = 5 + ((o * 3) % 17);
    const inner = 6 + ((o * 7) % Math.max(2, outer - 3));
    const removedHeight = Math.max(2, height - 2);
    const correct = outer * height - inner * removedHeight;
    const prompt = `A rectangular garden is ${outer} meters by ${height} meters. A rectangular section ${inner} meters by ${removedHeight} meters is removed. What is the remaining area, in square meters?`;
    const repaired = numericRepair(
      question,
      prompt,
      correct,
      [outer * height, inner * removedHeight, Math.max(1, correct + outer)],
      'Find the area of the full rectangle and subtract the area of the removed rectangle.',
      o,
    );
    return {
      ...repaired,
      figure: { type: 'geometry', values: { shape: 'composite-rectangle', outer, inner, height } },
    };
  }

  throw new Error(`Batch M post-QC remediation: unsupported duplicate figure family for ${question.questionId} (${skill}).`);
}

function repairFigureCollision(question) {
  if (question?.questionId === 'psat-mock-01-math-math-module-1-m1-14' && question?.section === 'math' && question?.skill === 'Quadratic functions and representations') {
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

  if (question?.questionId !== 'psat-mock-01-math-math-module-1-m1-17') return { question, applied: false };
  if (question?.section !== 'math') throw new Error('Batch M post-QC remediation: PSAT1 m1-17 is not a Math item.');
  const figure = question.figure;
  if (!figure || String(figure.type || '') !== 'scatter_plot') throw new Error(`Batch M post-QC remediation: PSAT1 m1-17 expected scatter_plot, found ${String(figure?.type || '(none)')}.`);
  const sourcePoints = Array.isArray(figure.values?.points) ? figure.values.points : Array.isArray(figure.points) ? figure.points : null;
  if (!sourcePoints || sourcePoints.length < 2) throw new Error('Batch M post-QC remediation: PSAT1 m1-17 scatter plot must expose coordinate points for the collision repair.');
  const translatedPoints = sourcePoints.map((point) => [Number(point[0]) + 1, Number(point[1]) + 1]);
  const repairedPrompt = 'A scatterplot has observed values (2, 17), (3, 20), (4, 27), (5, 29), (6, 32). A linear model is used to describe the trend. Which statement is best supported by the data?';
  return {
    question: {
      ...question,
      prompt: repairedPrompt,
      figure: { ...figure, points: translatedPoints, values: { ...(figure.values || {}), points: translatedPoints } },
      metadata: stripFigureFingerprints(question.metadata),
    },
    applied: true,
  };
}

export function applyBatchMPostQCTargetedRemediations(corpus) {
  if (!Array.isArray(corpus)) throw new Error('Batch M post-QC remediation: corpus must be an array.');
  const summary = { difficultyCalibrations: 0, rwStimulusRepairs: 0, figureRepairs: 0, targetsChanged: 0 };
  const changedQuestionIds = new Set();

  let repairedCorpus = corpus.map((mock) => {
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
      if (figure.applied) {
        question = { ...question, metadata: stripFigureFingerprints(question.metadata) };
        summary.figureRepairs += 1;
        changed = true;
      }
      if (changed) changedQuestionIds.add(question.questionId);
      return question;
    };
    return { ...mock, readingWriting: (mock.readingWriting || []).map(repairQuestion), math: (mock.math || []).map(repairQuestion) };
  });

  const seen = new Map();
  const repairOccurrences = new Map();
  let collisionRepairs = 0;

  repairedCorpus = repairedCorpus.map((mock) => {
    const testKey = canonicalBatchMTestKey(mock);
    const repairQuestion = (question) => {
      if (question?.section !== 'math' || !question?.figure || !TARGET_TEST_KEYS.has(testKey)) return question;
      const fingerprint = getFigureDataFingerprint(question);
      const previous = seen.get(fingerprint);
      if (!previous || previous.testKey === testKey) {
        seen.set(fingerprint, { testKey, questionId: question.questionId });
        return question;
      }

      const questionId = String(question.questionId || question.contentId || '');
      const baseSeed = seedFromQuestionId(questionId);
      const start = repairOccurrences.get(question.skill) || 0;
      for (let attempt = 0; attempt < 1000; attempt += 1) {
        const seed = (baseSeed + start + attempt) % 1000003;
        const candidate = buildFigureCollisionVariant(question, seed);
        const candidateFingerprint = getFigureDataFingerprint(candidate);
        if (!seen.has(candidateFingerprint)) {
          const repaired = {
            ...candidate,
            metadata: {
              ...stripFigureFingerprints(candidate.metadata),
              figureCollisionRepair: 'batch-m-targeted-semantic-v1',
              figureCollisionSourceQuestionId: previous.questionId,
              figureCollisionRepairSeed: seed,
            },
          };
          seen.set(candidateFingerprint, { testKey, questionId });
          repairOccurrences.set(question.skill, seed + 1);
          changedQuestionIds.add(questionId);
          collisionRepairs += 1;
          return repaired;
        }
      }
      throw new Error(`Batch M post-QC remediation: could not create a unique figure variant for ${questionId}.`);
    };
    return { ...mock, readingWriting: (mock.readingWriting || []).map(repairQuestion), math: (mock.math || []).map(repairQuestion) };
  });

  summary.figureRepairs += collisionRepairs;
  summary.targetsChanged = changedQuestionIds.size;
  return { corpus: repairedCorpus, summary };
}

export default applyBatchMPostQCTargetedRemediations;
