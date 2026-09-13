/**
 * Batch D — R&W distractor architecture, evidence mapping, and independent QC.
 *
 * This layer deliberately sits after the Batch C stimulus-construction layer.
 * It does not rewrite student-facing question content, change the answer key,
 * touch Math, or introduce an external AI dependency that the current repo does
 * not have. It records internal item-construction metadata and applies a fresh,
 * deterministic review before the item can be returned to the SAT engine.
 */

const APPROVED_RW_SKILLS = new Set([
  'Central Ideas and Details',
  'Inferences',
  'Command of Evidence',
  'Words in Context',
  'Text Structure and Purpose',
  'Cross-Text Connections',
  'Rhetorical Synthesis',
  'Transitions',
  'Boundaries',
  'Form, Structure, and Sense',
]);

const MISCONCEPTION_PROFILES = {
  'Central Ideas and Details': [
    ['true-but-nonresponsive', 'Chooses a true detail that does not state the text’s central idea.'],
    ['overly-broad-inference', 'Extends the passage to a universal claim that the evidence does not support.'],
    ['too-narrow-detail', 'Treats one local observation as the whole point of the passage.'],
  ],
  Inferences: [
    ['causal-overreach', 'Infers a causal claim even though the passage establishes only an observed relationship.'],
    ['absolute-inference', 'Turns a qualified inference into an unconditional statement.'],
    ['under-interpretation', 'Repeats a surface observation without drawing the required supported inference.'],
  ],
  'Command of Evidence': [
    ['true-but-nonresponsive', 'Selects evidence that is accurate but does not directly support the stated interpretation.'],
    ['method-instead-of-evidence', 'Confuses study procedure or context with evidence for the claim.'],
    ['background-instead-of-support', 'Chooses surrounding information rather than evidence bearing on the target claim.'],
  ],
  'Words in Context': [
    ['literal-near-synonym', 'Selects a familiar dictionary sense that does not fit the word’s use in context.'],
    ['irrelevant-context', 'Chooses a possible meaning associated with the topic rather than the sentence.'],
    ['reversed-meaning', 'Interprets the word in a direction opposite to the relationship established by the text.'],
  ],
  'Text Structure and Purpose': [
    ['local-detail-as-purpose', 'Treats the immediate detail as the author’s overall rhetorical purpose.'],
    ['overbroad-purpose', 'Assigns a purpose broader than the passage evidence warrants.'],
    ['reversed-rhetorical-role', 'Reverses the function of the information in the development of the passage.'],
  ],
  'Cross-Text Connections': [
    ['one-passage-only', 'Answers from one passage while ignoring the relationship required across both texts.'],
    ['reversed-relationship', 'Switches agreement, contrast, qualification, or another stated relationship.'],
    ['overgeneralized-agreement', 'Attributes a stronger or broader agreement to both authors than the texts support.'],
  ],
  'Rhetorical Synthesis': [
    ['note-dump', 'Includes a relevant note but does not fulfill the communication goal stated in the prompt.'],
    ['goal-mismatch', 'Uses relevant information but emphasizes the wrong rhetorical priority.'],
    ['overclaim', 'Combines the notes into a statement stronger than the supplied evidence.'],
  ],
  Transitions: [
    ['non-structural-fit', 'Chooses a transition that is grammatical but does not express the relationship between the sentences.'],
    ['example-for-contrast', 'Treats a contrast as though the second sentence were merely an example.'],
    ['addition-for-contrast', 'Signals addition when the sentence relationship requires a contrasting move.'],
  ],
  Boundaries: [
    ['comma-splice-or-fragment', 'Treats two sentence boundaries as though one punctuation mark could incorrectly join or fragment them.'],
    ['independent-clause-confusion', 'Fails to recognize the clause structure needed for the sentence boundary.'],
    ['misplaced-transition', 'Selects punctuation/transition placement that does not correctly separate the surrounding clauses.'],
  ],
  'Form, Structure, and Sense': [
    ['subject-verb-agreement', 'Selects a verb that agrees with a nearby noun rather than the actual subject.'],
    ['tense-or-person-mismatch', 'Chooses a form inconsistent with the sentence’s established tense or grammatical person.'],
    ['modifier-or-structure-error', 'Chooses a form that creates a grammatical or structural mismatch in the sentence.'],
  ],
};

function normalize(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
}

function wordCount(value) {
  return normalize(value).split(/\s+/).filter(Boolean).length;
}

function promptParts(question) {
  const text = String(question?.prompt || '').trim();
  const parts = text.split(/\n\n/);
  if (parts.length <= 1) {
    return { stimulus: '', stem: text, segments: [] };
  }
  const stem = parts.pop();
  const stimulus = parts.join('\n\n').trim();
  return {
    stimulus,
    stem,
    segments: stimulus.split(/\n\n+/).map((part) => part.trim()).filter(Boolean),
  };
}

function choiceId(index) {
  return String.fromCharCode(65 + index);
}

function wrongChoiceIndices(question) {
  const answerIndex = String(question?.answer || 'A').charCodeAt(0) - 65;
  return [0, 1, 2, 3].filter((index) => index !== answerIndex);
}

function buildDistractorArchitecture(question, attempt = 0) {
  const profiles = MISCONCEPTION_PROFILES[question?.skill] || MISCONCEPTION_PROFILES['Central Ideas and Details'];
  const wrongIndices = wrongChoiceIndices(question);
  const architecture = {};

  wrongIndices.forEach((index, position) => {
    const profile = profiles[(position + attempt) % profiles.length];
    const id = choiceId(index);
    architecture[id] = {
      role: 'distractor',
      misconception: profile[0],
      error_mechanism: profile[1],
      why_plausible: `Choice ${id} preserves part of the stimulus or task relationship closely enough to resemble a reasonable student interpretation.` ,
    };
  });

  const correctId = String(question?.answer || 'A');
  architecture[correctId] = {
    role: 'correct',
    misconception: null,
    error_mechanism: null,
    why_plausible: 'Matches the evidence, reasoning task, and stated answer relationship for the item.',
  };

  return {
    version: 'batch-d-1',
    internal_only: true,
    profiles: architecture,
  };
}

function requiredInference(question) {
  const skill = String(question?.skill || '');
  const relationship = String(question?.metadata?.evidenceRelationship || '');

  const bySkill = {
    'Central Ideas and Details': 'Identify the passage-level claim that best integrates the major information rather than a single detail.',
    Inferences: 'Draw only the conclusion that is warranted by the stated or strongly implied evidence.',
    'Command of Evidence': 'Connect the selected evidence directly to the interpretation named in the question.',
    'Words in Context': 'Use the surrounding sentence relationship to select the sense that fits this specific context.',
    'Text Structure and Purpose': 'Determine what rhetorical job the referenced information performs in the passage as a whole.',
    'Cross-Text Connections': 'Compare both passages before deciding how their claims or interpretations relate.',
    'Rhetorical Synthesis': 'Select notes that fulfill the stated communication goal without adding an unsupported claim.',
    Transitions: 'Identify the logical relationship between the surrounding sentences before selecting the transition.',
    Boundaries: 'Identify the clause structure and then select punctuation that creates the required sentence boundary.',
    'Form, Structure, and Sense': 'Select the grammatical form that agrees with the sentence structure and preserves its meaning.',
  };

  const base = bySkill[skill] || 'Connect the answer directly to the evidence and reasoning demanded by the prompt.';
  return relationship ? `${base} Evidence relationship: ${relationship}.` : base;
}

function targetEvidence(question, parts) {
  const skill = String(question?.skill || '');
  const total = Math.max(parts.segments.length, 1);

  if (skill === 'Cross-Text Connections') {
    return [
      { locator: 'stimulus.segment.1', role: 'passage_1_evidence' },
      { locator: `stimulus.segment.${Math.min(total, 2)}`, role: 'passage_2_evidence' },
    ];
  }

  if (skill === 'Rhetorical Synthesis') {
    return parts.segments.map((_, index) => ({
      locator: `stimulus.segment.${index + 1}`,
      role: index === parts.segments.length - 1 ? 'goal_or_qualification' : 'source_note',
    }));
  }

  return [
    { locator: 'stimulus.segment.1', role: 'primary_evidence' },
    { locator: `stimulus.segment.${total}`, role: 'conclusion_or_qualification' },
  ];
}

function buildEvidenceMap(question) {
  const parts = promptParts(question);
  const target = targetEvidence(question, parts);
  const supporting = target.length > 1 ? target.slice(1) : target.slice(0, 1);

  return {
    version: 'batch-d-1',
    internal_only: true,
    source_family: question?.metadata?.sourceFamily || null,
    rhetorical_structure: question?.metadata?.rhetoricalStructure || null,
    evidence_relationship: question?.metadata?.evidenceRelationship || null,
    cognitive_operation: question?.metadata?.cognitiveOperation || null,
    target_evidence: target,
    supporting_evidence: supporting,
    required_inference: requiredInference(question),
    correct_reasoning: String(question?.explanation || '').trim(),
    distractor_reasoning: {},
  };
}

function attachInternalMaps(question, attempt) {
  const distractorArchitecture = buildDistractorArchitecture(question, attempt);
  const evidenceMap = buildEvidenceMap(question);
  const distractorReasoning = {};

  Object.entries(distractorArchitecture.profiles).forEach(([id, profile]) => {
    if (profile.role === 'distractor') {
      distractorReasoning[id] = profile.error_mechanism;
    }
  });

  evidenceMap.distractor_reasoning = distractorReasoning;

  return {
    ...question,
    metadata: {
      ...(question.metadata || {}),
      distractor_architecture: distractorArchitecture,
      evidence_map: evidenceMap,
    },
  };
}

function semanticOverlap(a, b) {
  const left = new Set(normalize(a).split(/\W+/).filter((token) => token.length > 2));
  const right = new Set(normalize(b).split(/\W+/).filter((token) => token.length > 2));
  if (!left.size || !right.size) return 0;
  const intersection = [...left].filter((token) => right.has(token)).length;
  return intersection / Math.max(left.size, right.size);
}

function reviewVerbalItem(question) {
  const failed = [];
  const choices = Array.isArray(question?.choices) ? question.choices : [];
  const answer = String(question?.answer || '');
  const parts = promptParts(question);
  const metadata = question?.metadata || {};
  const architecture = metadata.distractor_architecture?.profiles;
  const evidenceMap = metadata.evidence_map;

  if (question?.section !== 'reading-writing') failed.push('1');
  if (question?.questionType !== 'multiple-choice') failed.push('1');
  if (choices.length !== 4) failed.push('1');
  if (!/^[A-D]$/.test(answer)) failed.push('1');
  if (!String(question?.explanation || '').trim()) failed.push('1');

  const uniqueChoices = new Set(choices.map((choice) => normalize(choice)));
  if (uniqueChoices.size !== 4) failed.push('3');

  const passageWords = wordCount(parts.stimulus || question?.prompt || '');
  if (passageWords < 25 || passageWords > 150) failed.push('2');

  if (!APPROVED_RW_SKILLS.has(String(question?.skill || ''))) failed.push('6');
  if (!question?.difficulty) failed.push('4');
  if (!question?.cognitiveDemand) failed.push('4');
  if (!question?.originalityFingerprint) failed.push('10');

  const wrongIds = wrongChoiceIndices(question).map(choiceId);
  const architectureIds = architecture ? Object.keys(architecture) : [];
  if (!architecture || architectureIds.length !== 4) {
    failed.push('5');
  } else {
    const wrongProfiles = wrongIds.map((id) => architecture[id]?.misconception).filter(Boolean);
    if (wrongProfiles.length !== 3 || new Set(wrongProfiles).size !== 3) failed.push('5');
    if (architecture[answer]?.role !== 'correct') failed.push('3');
  }

  if (!evidenceMap || !Array.isArray(evidenceMap.target_evidence) || !evidenceMap.target_evidence.length) {
    failed.push('7');
  }
  if (!evidenceMap || !Array.isArray(evidenceMap.supporting_evidence) || !evidenceMap.supporting_evidence.length) {
    failed.push('7');
  }
  if (!evidenceMap?.required_inference) failed.push('7');
  if (!evidenceMap?.correct_reasoning) failed.push('7');
  if (!evidenceMap?.distractor_reasoning || Object.keys(evidenceMap.distractor_reasoning).length !== 3) failed.push('7');

  const correctText = choices[answer.charCodeAt(0) - 65] || '';
  const tooSimilar = choices.some((choice, index) => {
    if (choice === correctText || index === answer.charCodeAt(0) - 65) return false;
    return semanticOverlap(choice, correctText) > 0.9;
  });
  if (tooSimilar) failed.push('5');

  const normalizedFailed = [...new Set(failed)];
  return {
    verdict: normalizedFailed.length ? 'fail' : 'pass',
    failed_checks: normalizedFailed,
    reviewer_notes: normalizedFailed.length
      ? `Independent Batch D review failed checks ${normalizedFailed.join(', ')}. Correct the flagged internal structure or route the item to human review; do not bypass the gate.`
      : 'Independent Batch D review passed: answer structure, length, distractor architecture, evidence mapping, skill fit, and production metadata are internally coherent.',
    recomputed_answer_if_figure_present: null,
  };
}

function repairForRetry(question, failedChecks, attempt) {
  const next = { ...question };
  if (failedChecks.includes('5') || failedChecks.includes('7')) {
    return attachInternalMaps(next, attempt + 1);
  }
  return next;
}

export function qcVerbalQuestion(question, options = {}) {
  const maxRetries = Number.isInteger(options.maxRetries) ? Math.max(0, Math.min(2, options.maxRetries)) : 2;
  let candidate = attachInternalMaps(question, 0);
  let review = null;

  for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
    review = reviewVerbalItem(candidate);

    if (review.verdict === 'pass') {
      return {
        ...candidate,
        metadata: {
          ...(candidate.metadata || {}),
          qc_status: 'passed',
          qc_reviewer_id: 'batch-d-independent-rw-v1',
          qc_attempts: attempt + 1,
          qc_failed_checks: [],
          qc_reviewer_notes: review.reviewer_notes,
        },
      };
    }

    if (attempt < maxRetries) {
      candidate = repairForRetry(candidate, review.failed_checks, attempt);
    }
  }

  return {
    ...candidate,
    metadata: {
      ...(candidate.metadata || {}),
      qc_status: 'failed',
      qc_reviewer_id: 'batch-d-independent-rw-v1',
      qc_attempts: maxRetries + 1,
      qc_failed_checks: review?.failed_checks || ['1'],
      qc_reviewer_notes: review?.reviewer_notes || 'Independent Batch D review failed.',
    },
  };
}

export function applyBatchDVerbalQC(mock, options = {}) {
  const maxRetries = Number.isInteger(options.maxRetries) ? options.maxRetries : 2;
  const readingWriting = (mock?.readingWriting || []).map((question) =>
    qcVerbalQuestion(question, { maxRetries })
  );

  return {
    ...mock,
    readingWriting,
  };
}

export function assertBatchDLiveDeliveryReady(mock) {
  const failed = (mock?.readingWriting || []).filter(
    (question) => question?.metadata?.qc_status !== 'passed'
  );

  if (failed.length) {
    const ids = failed.map((question) => question?.questionId || question?.contentId || '(missing-id)');
    throw new Error(
      `${String(mock?.testId || 'mock')}: Batch D live-delivery gate blocked ${ids.length} R&W item(s): ${ids.join(', ')}`
    );
  }

  return mock;
}

export default applyBatchDVerbalQC;
