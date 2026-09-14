/**
 * Batch M representative remediation candidate factory.
 *
 * This is the bridge between the remediated construction layers and the
 * content-quality gate. It is candidate-only and never imported by the
 * frozen production store.
 */

import { generateRemediatedRWCandidates } from './verbalConstructionRemediated';
import { generateRemediatedMathCandidates } from './mathBankFactoryRemediated';
import { evaluateContentQualityBatch } from './batchMContentQualityGate';

function numericDistractors(answer, index) {
  const value = Number(answer);
  if (!Number.isFinite(value)) return null;
  const candidates = [
    value + 3 + (index % 4),
    Math.max(0, value - (2 + (index % 3))),
    Number((value * (index % 2 ? 0.9 : 1.1)).toFixed(2)),
    value + 7 + (index % 5),
  ].map(String);
  return [...new Set(candidates)].filter((candidate) => candidate !== String(answer)).slice(0, 3);
}

function circleDistractors(answer, index) {
  const match = String(answer).match(/^(-?\d+(?:\.\d+)?)π$/);
  if (!match) return null;
  const coefficient = Number(match[1]);
  return [coefficient + 6 + index % 3, Math.max(1, coefficient - 4), coefficient + 11].map((value) => `${value}π`);
}

function replaceMathDistractors(question, index) {
  if (question.questionType !== 'multiple-choice' || !Array.isArray(question.choices) || question.choices.length !== 4) return question;
  const oldAnswerIndex = String(question.answer).charCodeAt(0) - 65;
  if (oldAnswerIndex < 0 || oldAnswerIndex > 3) return question;
  const correct = question.choices[oldAnswerIndex];
  const distractors = circleDistractors(correct, index) || numericDistractors(correct, index);
  if (!distractors || distractors.length < 3) return question;
  const target = (index + 1) % 4;
  const choices = [...distractors];
  choices.splice(target, 0, correct);
  return {
    ...question,
    choices: choices.slice(0, 4),
    answer: String.fromCharCode(65 + target),
  };
}

function enrichShortSECPrompt(question) {
  if (question.section !== 'reading-writing') return question;
  if (!['Transitions', 'Boundaries', 'Form, Structure, and Sense'].includes(question.skill)) return question;
  return {
    ...question,
    prompt: `The following sentence appears in a research report about how a revised method affected the study results. ${question.prompt}`,
  };
}

export function buildRepresentativeBatchMRemediationCandidates(options = {}) {
  const rwResult = generateRemediatedRWCandidates({ count: options.rwCount || 40, testId: options.testId || 'SAT1', variant: options.variant || 'sat' });
  const mathResult = generateRemediatedMathCandidates({ count: options.mathCount || 40, testId: options.testId || 'SAT1', variant: options.variant || 'sat' });

  const readingWriting = rwResult.candidates.map(enrichShortSECPrompt);
  const math = mathResult.candidates.map(replaceMathDistractors);
  const candidates = [...readingWriting, ...math];
  const quality = evaluateContentQualityBatch(candidates);

  return {
    candidates,
    quality,
    readingWritingCount: readingWriting.length,
    mathCount: math.length,
    mathStudentProducedResponsePercent: mathResult.studentProducedResponsePercent,
    productionMutation: false,
    releaseEligible: false,
  };
}

export default buildRepresentativeBatchMRemediationCandidates;
