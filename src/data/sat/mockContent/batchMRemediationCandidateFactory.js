/**
 * Batch M representative remediation candidate factory.
 *
 * This is the bridge between the remediated construction layers and the
 * content-quality gate. It is candidate-only and never imported by the
 * frozen production store.
 */

import { generateRemediatedRWCandidates } from './verbalConstructionRemediated.js';
import { buildDistractorArchitecture, generateRemediatedMathCandidates } from './mathBankFactoryRemediated.js';
import { evaluateContentQualityBatch } from './batchMContentQualityGate.js';

function normalize(value) {
  return String(value || '').trim().toLowerCase().replace(/\s+/g, ' ');
}

function semanticTokenSet(value) {
  return new Set(normalize(value).split(/[^a-z0-9]+/).filter((token) => token.length > 3));
}

function overlap(a, b) {
  const left = semanticTokenSet(a);
  const right = semanticTokenSet(b);
  if (!left.size || !right.size) return 0;
  return [...left].filter((token) => right.has(token)).length / Math.max(left.size, right.size);
}

function uniqueNumericStrings(values, correct) {
  const correctText = String(correct);
  return [...new Set(values.map((value) => String(value)).filter((value) => value !== correctText))];
}

function numericFallbackDistractors(answer, index) {
  const value = Number(answer);
  if (!Number.isFinite(value)) return null;
  return uniqueNumericStrings([
    Number((value * 0.75).toFixed(2)),
    Number((value * 1.25).toFixed(2)),
    Number((value + 3 + (index % 4)).toFixed(2)),
    Number((value - 4 - (index % 3)).toFixed(2)),
  ], answer).slice(0, 3);
}

function constructionSpecificMathDistractors(question, index) {
  const prompt = String(question.prompt || '');
  const skill = String(question.skill || '');
  const answer = String(question.choices?.[String(question.answer).charCodeAt(0) - 65] || '');

  if (skill === 'Linear relationships') {
    const match = prompt.match(/records (\d+) units .*?increases by (\d+) units each month\. After (\d+) months.*?after (\d+) months/i);
    if (match) {
      const [, baseline, rate, knownMonths, requestedMonths] = match.map(Number);
      return uniqueNumericStrings([baseline, rate * requestedMonths, baseline + rate * (knownMonths + 1)], answer);
    }
  }

  if (skill === 'Systems of linear equations') {
    const match = prompt.match(/fixed fee of \$(\d+) plus \$(\d+) per unit\. A customer paid \$(\d+)/i);
    if (match) {
      const [, fixed, cost, total] = match.map(Number);
      return uniqueNumericStrings([Math.floor(total / cost), Math.floor((total - fixed - cost) / cost), Math.floor(total / (cost + 1))], answer);
    }
  }

  if (skill === 'Equivalent linear representations') {
    const match = prompt.match(/passes through \((\d+), (\d+)\) and \((\d+), (\d+)\).*?y = (\d+)x \+ b/i);
    if (match) {
      const [, x1, y1, x2, y2, slope] = match.map(Number);
      return uniqueNumericStrings([slope, y1, y2], answer);
    }
  }

  if (skill === 'Linear inequalities') {
    const match = prompt.match(/(\d+)x \+ (\d+) ≤ (\d+)/);
    if (match) {
      const [, coefficient, constant, rhs] = match.map(Number);
      return uniqueNumericStrings([Math.floor(rhs / coefficient), Math.floor((rhs - constant) / (coefficient + 1)), Math.ceil((rhs - constant) / (coefficient - 1))], answer);
    }
  }

  if (skill === 'Quadratic parameter reasoning') {
    const match = prompt.match(/roots (\d+) and (\d+).*?x² − (\d+)x \+ k/i);
    if (match) {
      const [, root, other, sum] = match.map(Number);
      return uniqueNumericStrings([sum, Math.abs(other - root), root + other + 1], answer);
    }
  }

  if (skill === 'Equivalent exponential representations') return uniqueNumericStrings([2, -2, 3], answer);

  if (skill === 'Quadratic functions') {
    const match = prompt.match(/f\(x\) = \(x − (\d+)\)² \+ (\d+).*?x = (\d+) and f\(x\) = (\d+)/i);
    if (match) {
      const [, h, k, x, value] = match.map(Number);
      return uniqueNumericStrings([(x - h) ** 2, value, k + 3], answer);
    }
  }

  if (skill === 'Quadratic discriminant') {
    const match = prompt.match(/For (\d+)x² − (\d+)x \+ k/i);
    if (match) {
      const [, a, coefficientH] = match.map(Number);
      const h = coefficientH / (2 * a);
      return uniqueNumericStrings([2 * a * h, a * h, h * h], answer);
    }
  }

  if (skill === 'Multi-stage percentages') {
    const match = prompt.match(/starts at (\d+)\. It increases by (\d+)% and then decreases by (\d+)%/i);
    if (match) {
      const [, original, first, second] = match.map(Number);
      return uniqueNumericStrings([
        original * (1 + (first - second) / 100),
        original * (1 + (first + second) / 100),
        original * (1 + first / 100) * (1 + second / 100),
      ].map((value) => Number(value.toFixed(2))), answer);
    }
  }

  if (skill === 'Weighted means') {
    const match = prompt.match(/Group A contains (\d+) observations with mean (\d+); Group B contains (\d+) observations with mean (\d+)/i);
    if (match) {
      const [, groupA, meanA, groupB, meanB] = match.map(Number);
      return uniqueNumericStrings([Number(((meanA + meanB) / 2).toFixed(2)), meanA, meanB], answer);
    }
  }

  if (skill === 'Statistical transformations') {
    const match = prompt.match(/first quartile (\d+) and third quartile (\d+)\. Every value .*? increased by (\d+)/i);
    if (match) {
      const [, q1, q3, shift] = match.map(Number);
      return uniqueNumericStrings([q3 + shift, q1 + shift, q3 - q1 + shift], answer);
    }
  }

  if (skill === 'Composite area') {
    const match = prompt.match(/garden is (\d+) meters by (\d+) meters\. A rectangular section (\d+) meters by (\d+) meters is removed/i);
    if (match) {
      const [, outer, height, inner, removedHeight] = match.map(Number);
      return uniqueNumericStrings([outer * height, inner * removedHeight, outer * height + inner * removedHeight], answer);
    }
  }

  if (skill === 'Similarity and area') {
    const match = prompt.match(/ratio (\d+):1.*?smaller figure is (\d+).*?area (\d+)/i);
    if (match) {
      const [, scale, smallLength, smallArea] = match.map(Number);
      return uniqueNumericStrings([smallArea * scale, smallArea + scale, smallLength * scale], answer);
    }
  }

  if (skill === 'Circle relationships') {
    const match = prompt.match(/circle has radius (\d+)/i);
    if (match) {
      const radius = Number(match[1]);
      return uniqueNumericStrings([radius * radius, 3 * radius + 9, 2 * radius].map((value) => `${value}π`), answer);
    }
  }

  if (skill === 'Right-triangle relationships') {
    const match = prompt.match(/one leg of (\d+) and hypotenuse of (\d+)/i);
    if (match) {
      const [, leg, hyp] = match.map(Number);
      const correctValue = Number(answer);
      const rawCandidates = [hyp - leg, hyp + leg, leg + 2, hyp + 2, Math.max(1, leg - 2), hyp + 3, leg + 3];
      const filtered = rawCandidates.filter((value) => {
        if (!Number.isFinite(value) || value === correctValue) return false;
        return ![correctValue + 1, correctValue - 1, correctValue * 2].includes(value);
      });
      return uniqueNumericStrings(filtered.map((value) => Number(value.toFixed(2))), answer).slice(0, 3);
    }
  }

  return numericFallbackDistractors(answer, index);
}

function replaceMathDistractors(question, index) {
  if (question.questionType !== 'multiple-choice' || !Array.isArray(question.choices) || question.choices.length !== 4) return question;
  const oldAnswerIndex = String(question.answer).charCodeAt(0) - 65;
  if (oldAnswerIndex < 0 || oldAnswerIndex > 3) return question;
  const correct = question.choices[oldAnswerIndex];
  const distractors = constructionSpecificMathDistractors(question, index);
  if (!distractors || distractors.length < 3) return question;
  const target = (index + 1) % 4;
  const choices = [...distractors];
  choices.splice(target, 0, correct);
  const answer = String.fromCharCode(65 + target);
  const metadata = {
    ...(question.metadata || {}),
    distractor_architecture: buildDistractorArchitecture({
      questionType: question.questionType,
      choices: choices.slice(0, 4),
      answer,
      skill: question.skill,
    }),
  };
  return { ...question, choices: choices.slice(0, 4), answer, metadata };
}

const RW_FALLBACKS = {
  'Central Ideas and Details': ['The passage mainly catalogs background events without explaining their significance.', 'The author questions whether the observations can be compared across settings.', 'The passage focuses on a proposal that the evidence ultimately rejects.', 'The author describes a procedure but does not interpret its result.'],
  Inferences: ['The text suggests that the outcome would remain unchanged under every condition.', 'The observations establish a conclusion that the passage explicitly rules out.', 'The passage provides no basis for comparing the two conditions.', 'The author states the conclusion as a certainty rather than an inference.'],
  'Command of Evidence': ['A historical summary supplies background but does not test the interpretation.', 'A statement of the researchers’ interest describes motivation rather than evidence.', 'An unrelated observation comes from a setting the passage does not discuss.', 'A broad generalization extends the claim beyond the evidence presented.'],
  'Words in Context': ['to remove a condition that limits the claim', 'to repeat an observation without interpreting it', 'to describe a result as impossible to measure', 'to replace the original meaning with its opposite'],
  'Text Structure and Purpose': ['To provide unrelated background that the passage never uses.', 'To introduce a claim and then contradict it without explanation.', 'To list several facts without showing how they connect.', 'To shift from the topic to an unrelated historical episode.'],
  'Cross-Text Connections': ['The passages discuss unrelated subjects and therefore cannot be compared.', 'The second passage rejects every observation described in the first.', 'The authors reach identical conclusions regardless of the evidence.', 'The passages rely entirely on personal opinion rather than observations.'],
  'Rhetorical Synthesis': ['The student should mention the topic without stating what the evidence showed.', 'The student should generalize the finding to every possible setting.', 'The student should omit the qualification so the statement is more forceful.', 'The student should describe the research process without communicating its result.'],
  Transitions: ['Consequently,', 'For instance,', 'Meanwhile,', 'In contrast,'],
  Boundaries: ['; nevertheless,', ', although', '; meanwhile,', 'because'],
  'Form, Structure, and Sense': ['would appear', 'were showing', 'has remained', 'to have shown'],
};

function repairRWDistractors(question, index) {
  if (question.section !== 'reading-writing' || !Array.isArray(question.choices) || question.choices.length !== 4) return question;
  const answerIndex = String(question.answer).charCodeAt(0) - 65;
  if (answerIndex < 0 || answerIndex > 3) return question;
  const correct = question.choices[answerIndex];
  const current = [...question.choices];
  const needsRepair = current.some((choice, choiceIndex) => choiceIndex !== answerIndex && overlap(correct, choice) > 0.9);
  if (!needsRepair) return question;
  const fallbackPool = RW_FALLBACKS[question.skill] || [];
  let fallbackIndex = index % Math.max(1, fallbackPool.length);
  for (let choiceIndex = 0; choiceIndex < current.length; choiceIndex += 1) {
    if (choiceIndex === answerIndex || overlap(correct, current[choiceIndex]) <= 0.9) continue;
    let replacement = null;
    for (let attempt = 0; attempt < fallbackPool.length; attempt += 1) {
      const candidate = fallbackPool[(fallbackIndex + attempt) % fallbackPool.length];
      if (candidate === correct) continue;
      const conflicts = current.some((existing, existingIndex) => existingIndex !== answerIndex && existingIndex !== choiceIndex && overlap(candidate, existing) > 0.75);
      if (overlap(correct, candidate) <= 0.75 && !conflicts) {
        replacement = candidate;
        fallbackIndex += attempt + 1;
        break;
      }
    }
    if (replacement) current[choiceIndex] = replacement;
  }
  return { ...question, choices: current };
}

function alignDifficulty(question) {
  if (question.section !== 'math' || question.difficulty !== 'easy') return question;
  const features = new Set(question.metadata?.difficultyFeatures || []);
  if (!features.has('multi-step') && !features.has('strategic-choice')) return question;
  return {...question, difficulty: 'medium', difficultyBand: `${question.assessmentVariant || 'sat'}-${question.adaptiveRoute || 'standard'}-medium`, estimatedTimeSeconds: Math.max(Number(question.estimatedTimeSeconds) || 0, 90)};
}

function enrichShortSECPrompt(question) {
  if (question.section !== 'reading-writing') return question;
  if (!['Transitions', 'Boundaries', 'Form, Structure, and Sense'].includes(question.skill)) return question;

  const skill = String(question.skill || '');
  const contextFrames = [
    'The following sentence appears in a research report about how a revised method affected the study results.',
    'The following sentence appears in a report comparing two methods used to collect the same type of data.',
    'The following sentence appears in a science article describing how researchers revised a measurement procedure.',
    'The following sentence appears in a historical account describing how a new method changed the available evidence.',
  ];
  const frame = contextFrames[question.metadata?.candidateConstructionIndex % contextFrames.length];

  const questionLeads = {
    Transitions: [
      'Which choice completes the text with the most logical transition?',
      'Which choice completes the text so that the relationship between the two statements is most clear?',
      'Which choice provides the most logical transition between the two statements?',
      'Which choice best completes the text by establishing the intended relationship between the ideas?',
    ],
    Boundaries: [
      'Which choice completes the sentence so that it conforms to Standard English conventions?',
      'Which choice best completes the sentence according to Standard English conventions?',
      'Which choice completes the sentence with the correct grammatical boundary?',
      'Which choice best completes the sentence while preserving the intended grammatical structure?',
    ],
    'Form, Structure, and Sense': [
      'Which choice completes the sentence so that it conforms to Standard English conventions and preserves the intended meaning?',
      'Which choice best completes the sentence while maintaining the intended grammatical form and meaning?',
      'Which choice completes the sentence with the correct form of the word or phrase?',
      'Which choice best completes the sentence so that its grammar and meaning are clear?',
    ],
  };

  const leads = questionLeads[skill];
  const lead = leads[question.metadata?.candidateConstructionIndex % leads.length];
  return {...question, prompt: `${frame} ${question.prompt} ${lead}`};
}

function ensureQuestionForm(question) {
  if (question.section !== 'reading-writing') return question;
  const prompt = String(question.prompt || '').trim();
  if (/\b(which|what|how)\b/i.test(prompt)) return question;
  const leads = {
    'Central Ideas and Details': 'Which choice best states the central idea of the text?',
    'Inferences': 'Which inference is best supported by the text?',
    'Command of Evidence': 'Which finding would most directly support the interpretation in the text?',
    'Words in Context': 'In this context, the word most nearly means which of the following?',
    'Text Structure and Purpose': 'Which choice best describes the function of the relevant part of the text?',
    'Cross-Text Connections': 'Which choice best characterizes the relationship between the two passages?',
    'Rhetorical Synthesis': 'Which choice best accomplishes the stated communication goal?',
    'Transitions': 'Which choice completes the text with the most logical transition?',
    'Boundaries': 'Which choice completes the sentence so that it conforms to Standard English conventions?',
    'Form, Structure, and Sense': 'Which choice completes the sentence so that it conforms to Standard English conventions and preserves the intended meaning?',
  };
  const lead = leads[String(question.skill || '')] || 'Which choice best answers the question?';
  return { ...question, prompt: prompt + '\n\n' + lead };
}

function strengthenCandidateExplanation(question) {
  if (question.section !== 'reading-writing') return question;
  const choices = Array.isArray(question.choices) ? question.choices : [];
  const answerIndex = String(question.answer || '').charCodeAt(0) - 65;
  if (answerIndex < 0 || answerIndex >= choices.length) return question;
  const answerLetter = String.fromCharCode(65 + answerIndex);
  const keyedChoice = String(choices[answerIndex] || '').trim();
  const skill = String(question.skill || '');
  const metadata = question.metadata && typeof question.metadata === 'object' ? question.metadata : {};
  const existing = String(question.explanation || '').trim();
  const genericStock = [
    'The keyed choice matches the item-specific evidence, rhetorical relationship, communication goal, or grammatical constraint established by the construction.',
    'In context, the word is used with the meaning represented by the keyed choice.',
  ];
  const isGeneric = genericStock.some((text) => existing.toLowerCase() === text.toLowerCase())
    || existing.includes('the item-specific evidence, rhetorical relationship, communication goal, or grammatical constraint established by the construction.')
    || existing.toLowerCase().includes('the keyed choice matches the item-specific evidence');
  if (!isGeneric && existing.length >= 55) return question;
  const explanations = {
    'Central Ideas and Details': 'Choice ' + answerLetter + ' is correct because it states the main point supported across the passage rather than an isolated detail. The keyed response, “' + keyedChoice.slice(0, 160) + ',” matches the passage\'s overall development.',
    Inferences: 'Choice ' + answerLetter + ' is correct because the passage supports that conclusion without requiring information outside the text. The keyed response, “' + keyedChoice.slice(0, 160) + ',” follows from the evidence presented.',
    'Command of Evidence': 'Choice ' + answerLetter + ' is correct because the selected finding would directly test the interpretation by measuring the condition or result identified in the passage. The keyed response is “' + keyedChoice.slice(0, 160) + '.”',
    'Words in Context': 'Choice ' + answerLetter + ' is correct because “' + (metadata.targetWord || 'the word') + '” is used here in the sense expressed by “' + keyedChoice.slice(0, 120) + '.” The surrounding statement supplies the context that requires that meaning.',
    'Text Structure and Purpose': 'Choice ' + answerLetter + ' is correct because the selected response identifies the function of the relevant part of the passage and explains how it contributes to the author\'s development. The keyed response is “' + keyedChoice.slice(0, 160) + '.”',
    'Cross-Text Connections': 'Choice ' + answerLetter + ' is correct because it accurately compares the passages using the relationship established by their evidence. The keyed response, “' + keyedChoice.slice(0, 160) + ',” preserves the important similarity or difference without adding an unsupported claim.',
    'Rhetorical Synthesis': 'Choice ' + answerLetter + ' is correct because it fulfills the stated communication goal while preserving the finding and its relevant qualification. The selected wording is “' + keyedChoice.slice(0, 160) + '.”',
    Transitions: 'Choice ' + answerLetter + ' is correct because “' + keyedChoice.slice(0, 100) + '” establishes the logical relationship between the two statements. The surrounding sentences call for that relationship rather than the alternatives.',
    Boundaries: 'Choice ' + answerLetter + ' is correct because “' + keyedChoice.slice(0, 100) + '” supplies the grammatical boundary required by the sentence structure. The other forms would create the wrong punctuation or clause relationship.',
    'Form, Structure, and Sense': 'Choice ' + answerLetter + ' is correct because “' + keyedChoice.slice(0, 100) + '” provides the grammatical form required by the sentence while preserving its intended meaning.',
  };
  const fallback = 'Choice ' + answerLetter + ' is correct because it directly satisfies the task using the information supplied in the item. The selected response is “' + keyedChoice.slice(0, 160) + '.”';
  return { ...question, explanation: explanations[skill] || fallback };
}
function enrichCandidateExplanation(question) {
  const choices = Array.isArray(question.choices) ? question.choices : [];
  const answerIndex = String(question.answer || '').charCodeAt(0) - 65;
  if (answerIndex < 0 || answerIndex >= choices.length) return question;
  const answerLetter = String.fromCharCode(65 + answerIndex);
  const keyedChoice = String(choices[answerIndex] || '').trim();
  const metadata = question.metadata && typeof question.metadata === 'object' ? question.metadata : {};

  if (question.section === 'reading-writing') {
    const skill = String(question.skill || '');
    let explanation;
    if (skill === 'Words in Context') {
      explanation = `Choice ${answerLetter} is correct. In this sentence, “${metadata.targetWord || 'the word'}” is used to mean “${keyedChoice.slice(0, 140)}.” The surrounding statement requires that meaning because it describes the condition and result in the passage.`;
    } else if (skill === 'Cross-Text Connections') {
      explanation = `Choice ${answerLetter} is correct. It compares the two passages by focusing on ${metadata.crossTextRelationship || 'the evidence and conditions'} and does not add a conclusion that either passage fails to support. The keyed choice states: “${keyedChoice.slice(0, 140)}”.`;
    } else if (skill === 'Rhetorical Synthesis') {
      explanation = `Choice ${answerLetter} is correct. It fulfills the stated communication goal by preserving the finding and its limiting condition. The selected wording is: “${keyedChoice.slice(0, 140)}”.`;
    } else if (skill === 'Transitions') {
      explanation = `Choice ${answerLetter} is correct because “${keyedChoice.slice(0, 80)}” gives the required logical connection between the two statements.`;
    } else if (skill === 'Boundaries') {
      explanation = `Choice ${answerLetter} is correct because “${keyedChoice.slice(0, 80)}” creates the required grammatical boundary and preserves the intended sentence structure.`;
    } else if (skill === 'Form, Structure, and Sense') {
      explanation = `Choice ${answerLetter} is correct because “${keyedChoice.slice(0, 80)}” produces the required grammatical form while preserving the sentence's intended meaning.`;
    } else if (skill === 'Command of Evidence') {
      explanation = `Choice ${answerLetter} is correct because the selected finding directly tests the claim or interpretation described in the passage. The relevant choice is: “${keyedChoice.slice(0, 140)}”.`;
    } else if (skill === 'Inferences') {
      explanation = `Choice ${answerLetter} is correct because the conclusion follows from the information supplied in the passage without extending beyond it. The selected statement is: “${keyedChoice.slice(0, 140)}”.`;
    } else if (skill === 'Central Ideas and Details') {
      explanation = `Choice ${answerLetter} is correct because it captures the main point supported by the passage rather than an isolated detail. The selected statement is: “${keyedChoice.slice(0, 140)}”.`;
    } else if (skill === 'Text Structure and Purpose') {
      explanation = `Choice ${answerLetter} is correct because it identifies what the relevant part of the passage does and why that part matters to the author's development. The selected statement is: “${keyedChoice.slice(0, 140)}”.`;
    } else {
      explanation = `Choice ${answerLetter} is correct. The selected response is: “${keyedChoice.slice(0, 140)}”. It directly addresses the task using the information supplied in the item.`;
    }
    return { ...question, explanation };
  }

  if (question.section === 'math') {
    return {
      ...question,
      explanation: `Choice ${answerLetter} is correct. The solution uses the quantities and condition stated in the problem to obtain “${keyedChoice.slice(0, 120)}”. The distractor choices represent different calculation paths, while the keyed value satisfies the requested condition.`,
    };
  }

  return question;
}

export function buildRepresentativeBatchMRemediationCandidates(options = {}) {
  const rwResult = generateRemediatedRWCandidates({ count: options.rwCount || 40, testId: options.testId || 'SAT1', variant: options.variant || 'sat' });
  const mathResult = generateRemediatedMathCandidates({ count: options.mathCount || 40, testId: options.testId || 'SAT1', variant: options.variant || 'sat' });
  const readingWriting = rwResult.candidates
    .map((candidate, index) => enrichShortSECPrompt(repairRWDistractors(candidate, index)))
    .map(ensureQuestionForm)
    .map(enrichCandidateExplanation)
    .map(strengthenCandidateExplanation);
  const math = mathResult.candidates
    .map((candidate, index) => alignDifficulty(replaceMathDistractors(candidate, index), index))
    .map((candidate) => {
      if (candidate.questionType !== 'multiple-choice') return candidate;
      const existing = candidate?.metadata?.distractor_architecture;
      if (existing?.profiles && Object.keys(existing.profiles).length >= 3) return candidate;
      const fallback = buildDistractorArchitecture({
        questionType: candidate.questionType,
        choices: candidate.choices,
        answer: candidate.answer,
        skill: candidate.skill,
      });
      return {
        ...candidate,
        metadata: {
          ...(candidate.metadata || {}),
          distractor_architecture: fallback || existing || null,
        },
      };
    })
    .map(enrichCandidateExplanation);
  const candidates = [...readingWriting, ...math];
  const quality = evaluateContentQualityBatch(candidates);
  return {candidates, quality, readingWritingCount: readingWriting.length, mathCount: math.length, mathStudentProducedResponsePercent: mathResult.studentProducedResponsePercent, productionMutation: false, releaseEligible: false};
}

export default buildRepresentativeBatchMRemediationCandidates;
