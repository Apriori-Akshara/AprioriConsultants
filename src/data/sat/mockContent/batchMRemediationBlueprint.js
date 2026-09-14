/** Batch M replacement-item construction contract. Not imported by frozen production store. */

export const RW_REMEDIATION_CONSTRUCTIONS = {
  'Central Ideas and Details': ['development-through-example', 'claim-with-counterpoint', 'character-motivation-shift', 'finding-with-limitation'],
  Inferences: ['implicit-motivation', 'qualified-causal-inference', 'comparison-based-inference', 'consequence-from-evidence'],
  'Command of Evidence': ['claim-to-result', 'claim-to-comparison', 'interpretation-to-observation', 'hypothesis-to-measurement'],
  'Words in Context': ['technical-sense', 'figurative-sense', 'rhetorical-sense', 'contextual-action-sense'],
  'Text Structure and Purpose': ['claim-then-limit', 'example-to-generalization', 'context-to-argument', 'finding-to-qualification'],
  'Cross-Text Connections': ['agreement', 'qualified-agreement', 'contrast', 'extension', 'competing-interpretation'],
  'Rhetorical Synthesis': ['recommendation', 'comparison', 'finding-summary', 'public-explanation', 'research-brief'],
  Transitions: ['contrast', 'cause-effect', 'sequence', 'concession', 'elaboration'],
  Boundaries: ['independent-clauses', 'dependent-introductory-clause', 'restrictive-nonrestrictive', 'compound-predicate'],
  'Form, Structure, and Sense': ['agreement', 'verb-tense', 'pronoun-reference', 'modifier-placement', 'parallel-structure'],
};

export const RW_SOURCE_BLUEPRINTS = {
  literature: ['character decision shaped by an earlier misunderstanding', 'narrator revises an interpretation after noticing a physical detail', 'setting changes the meaning of an ordinary action', 'character weighs continuity against an unexpected opportunity'],
  'history-social-science': ['policy change produces different effects across communities', 'historical argument is revised by newly available evidence', 'institutional change alters an established social practice', 'economic incentive changes behavior without a uniform result'],
  humanities: ['scholars reinterpret an artistic convention in light of its audience', 'archaeological evidence complicates a proposed trade network', 'linguistic variation reveals a social distinction', 'architectural choices reflect practical and symbolic purposes'],
  science: ['controlled experiment separates a proposed mechanism from correlation', 'field study finds a broad pattern with an ecological limitation', 'competing hypotheses make different predictions', 'follow-up experiment tests whether an effect persists under changed conditions'],
};

export const MATH_REMEDIATION_CONSTRUCTIONS = {
  Algebra: ['parameterized linear relationship with interpretation', 'system where a condition determines a parameter', 'linear inequality with contextual constraint', 'equivalent linear representation'],
  'Advanced Math': ['quadratic parameter from a root or vertex condition', 'equivalent exponential representation', 'polynomial structure with strategic substitution', 'nonlinear model using two linked conditions'],
  'Problem-Solving and Data Analysis': ['two-stage percentage or ratio reasoning', 'table-based comparison with derived quantity', 'scatterplot interpretation with limitation', 'statistical measure changed by transformation'],
  'Geometry and Trigonometry': ['composite-area decomposition', 'similarity with derived length before area', 'circle relationship requiring a theorem', 'right-triangle relationship with two conditions'],
};

export const DIFFICULTY_REQUIREMENTS = {
  easy: { minimumReasoningSteps: 1, requiredFeatures: [], distractorStandard: 'one plausible procedural error' },
  medium: { minimumReasoningSteps: 2, requiredFeatures: ['careful-interpretation'], distractorStandard: 'plausible misconception or missed condition' },
  hard: { minimumReasoningSteps: 2, requiredFeatures: ['multi-step', 'strategic-choice'], distractorStandard: 'high-plausibility alternative based on a specific reasoning error' },
};

export const PSAT_CEILING_RULES = {
  sharedWithSAT: ['Algebra', 'core-data-analysis', 'core-geometry', 'standard-R&W-skills'],
  trimFromHardTail: ['Advanced Math', 'Geometry and Trigonometry'],
  prohibitedForPSATReplacement: ['content above early-Algebra-II/precalculus ceiling'],
};

export const MATH_SPR_TARGET = { minimumPercent: 25, maximumPercent: 30 };

export default { RW_REMEDIATION_CONSTRUCTIONS, RW_SOURCE_BLUEPRINTS, MATH_REMEDIATION_CONSTRUCTIONS, DIFFICULTY_REQUIREMENTS, PSAT_CEILING_RULES, MATH_SPR_TARGET };
