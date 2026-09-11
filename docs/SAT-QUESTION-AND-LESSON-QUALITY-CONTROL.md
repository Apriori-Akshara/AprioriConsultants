# Apriori Digital SAT — Question Bank & Lesson Quality Control

**Created:** September 11, 2026  
**Status:** Permanent content-quality source of truth

This document governs the authoring, classification, validation, approval, assembly, maintenance, and retirement of all original Apriori SAT questions, quizzes, drills, module content, mock-test content, and SAT lessons.

It is intentionally separate from the software architecture. The existing technical architecture and `src/data/sat/questionSchema.js` remain authoritative for implementation contracts. This document governs **content quality, metadata, coverage, originality, and editorial control** without requiring the website architecture to change when content changes.

---

## 1. Content standard hierarchy

Apriori SAT content must be original. External resources are benchmarks, not source material to copy.

### Primary structural/presentation reference

**College Board / Bluebook**

Use for:

- current Digital SAT structure;
- module format;
- question presentation conventions;
- screen-level interaction expectations;
- official domain/skill taxonomy;
- calculator/reference-sheet/tool behavior;
- broad difficulty and test-day experience.

Do **not** copy College Board questions, passages, answer choices, explanations, diagrams, wording, branding, or proprietary interface assets.

### Reading & Writing quality benchmark

**Primary:** OnePrep  
**Secondary:** The Princeton Review

Use these as benchmarks for:

- breadth of skill coverage;
- natural Digital SAT-style wording;
- difficulty progression;
- realistic distractor quality;
- explanations;
- practice variety;
- passage quality;
- targeted skill drilling.

OnePrep is the stronger benchmark for the depth and breadth of the question-bank taxonomy and practice experience. Princeton Review is a secondary benchmark for question presentation, strategy, and realistic practice variation.

### Math quality benchmark

**Primary:** Kaplan  
**Secondary:** Barron's

Use these as benchmarks for:

- mathematical rigor;
- variety of problem construction;
- algebra/nonlinear/data/geometry coverage;
- realistic word problems;
- diagrams and data displays;
- distractor design;
- worked solutions and instructional value.

### Universal rule

Never reproduce benchmark material. The goal is to meet or exceed the **quality standard**, not reproduce the underlying content.

---

## 2. Current SAT blueprint

The canonical Digital SAT structure remains:

| Section | Questions shown | Time | Modules |
|---|---:|---:|---:|
| Reading & Writing | 54 | 64 min | 2 × 32 min |
| Math | 44 | 70 min | 2 × 35 min |
| Break | — | 10 min | between sections |

Each section is multistage adaptive at the module level. Module 2 is routed from Module 1 performance; the platform must not claim to reproduce College Board's proprietary scoring algorithm.

### Reading & Writing domain weights

Use College Board's published operational-question distribution as the blueprint target:

| Domain | Approx. share | Official skills |
|---|---:|---|
| Information and Ideas | ≈26% | Central Ideas and Details; Command of Evidence; Inferences |
| Craft and Structure | ≈28% | Words in Context; Text Structure and Purpose; Cross-Text Connections |
| Expression of Ideas | ≈20% | Rhetorical Synthesis; Transitions |
| Standard English Conventions | ≈26% | Boundaries; Form, Structure, and Sense |

The distribution is a blueprint, not a requirement that every individual module have an identical count.

### Math domain weights

| Domain | Approx. share | Official skills |
|---|---:|---|
| Algebra | ≈35% | Linear equations in one variable; Linear functions in one variable; Linear equations in two variables; Systems of two linear equations in two variables; Linear inequalities in one or two variables |
| Advanced Math | ≈35% | Equivalent expressions; Nonlinear equations in one variable and systems of equations in two variables; Nonlinear functions |
| Problem-Solving and Data Analysis | ≈15% | Ratios/rates/proportions/units; Percentages; One-variable data; Two-variable data/models/scatterplots; Probability and conditional probability; Inference from sample statistics and margin of error; Evaluating statistical claims |
| Geometry and Trigonometry | ≈15% | Area and volume; Lines, angles, and triangles; Right triangles and trigonometry; Circles |

### Math response-type target

Approximately:

- 75% multiple-choice;
- 25% student-produced response.

For a 44-question form, the working target is approximately 33 multiple-choice and 11 student-produced-response questions. Final assembly may vary where required by the target blueprint and test design.

---

## 3. Required question record

Every question must carry metadata that allows content changes without changing the application architecture.

The existing canonical technical schema remains:

`src/data/sat/questionSchema.js`

### Required identity fields

- `questionId`
- `version`
- `status`
- `testId`
- `section`
- `module`
- `passageId` where applicable
- `sourceType`

### Required classification fields

- `domain`
- `skill`
- `subskill`
- `conceptId`
- `difficulty`
- `questionType`
- `stimulusType`
- `interactionType`
- `cognitiveDemand`

### Required instructional fields

- `prompt`
- `choices` where applicable
- `answer`
- `explanation`
- `commonMistakes`
- `estimatedTimeSeconds`
- `lessonIds`
- `tags`

### Required visual/tool fields

- `figure`
- `figureType`
- `calculatorEligibility`
- `calculatorMode`
- `referenceSheetRelevant`
- `inputStyle`

### Required quality-control fields

- `originalityFingerprint`
- `conceptFingerprint`
- `duplicateCheckStatus`
- `contentReviewStatus`
- `mathReviewStatus` where applicable
- `figureReviewStatus` where applicable
- `accessibilityReviewStatus`
- `biasSensitivityStatus`
- `explanationReviewStatus`
- `releaseEligibility`

If implementation evolves, these are content-governance concepts first; field names may be mapped into the existing architecture without changing the student-facing product.

---

## 4. Controlled labels

Use controlled labels rather than free-form inconsistent wording.

### Section

- `reading-writing`
- `math`

### Module

- `rw-module-1`
- `rw-module-2-high`
- `rw-module-2-standard`
- `rw-module-2-low`
- `math-module-1`
- `math-module-2-high`
- `math-module-2-standard`
- `math-module-2-low`

### Difficulty

- `easy`
- `medium`
- `hard`

Difficulty must be assigned by intended cognitive demand and validated against observed performance later. Difficulty must never mean only “long” or “tricky.”

### Question type

Reading & Writing:

- `rw-multiple-choice`

Math:

- `math-multiple-choice`
- `math-student-produced-response`

### Stimulus type

- `single-short-passage`
- `paired-passages`
- `notes-bullets`
- `sentence-level`
- `equation`
- `table`
- `chart`
- `scatterplot`
- `line-graph`
- `bar-chart`
- `histogram`
- `box-plot`
- `coordinate-plane`
- `geometry-diagram`
- `mixed-visual`
- `word-problem`
- `data-set`
- `other-approved`

### Cognitive demand

- `recall-apply`
- `interpret`
- `analyze`
- `reason`
- `synthesize`

### Publication status

- `draft`
- `author-review`
- `content-review`
- `subject-review`
- `qc-approved`
- `assembly-ready`
- `published`
- `retired`

No question may enter a student-facing mock as `draft`, `author-review`, or `content-review`.

---

## 5. Tagging system

Every question should use tags that make filtering and future content maintenance easy.

### Required tag families

`section:*`  
`domain:*`  
`skill:*`  
`difficulty:*`  
`qtype:*`  
`stimulus:*`  
`calc:*`  
`figure:*`  
`module:*`  
`adaptive-route:*`  
`lesson:*`  
`test:*`

### Useful optional tags

`data-interpretation`  
`word-problem`  
`multi-step`  
`graph-reading`  
`table-reading`  
`vocabulary-in-context`  
`cross-text`  
`grammar`  
`punctuation`  
`rhetorical-purpose`  
`transition`  
`inference`  
`evidence`  
`function-notation`  
`quadratic`  
`exponential`  
`probability`  
`statistics`  
`trigonometry`  
`circle`  
`coordinate-geometry`

Tags describe the content; they must never be used as a replacement for the authoritative domain/skill fields.

---

## 6. Reading & Writing quality controls

### Passage quality

Every passage must:

- be original;
- be concise enough for Digital SAT presentation;
- contain a clear information/argument structure;
- provide enough evidence to support one defensible answer;
- avoid unnecessary background burden;
- avoid culturally or linguistically unfair barriers unrelated to the skill;
- use academically appropriate but natural language;
- be factually coherent;
- support the intended difficulty.

### Distractor quality

Every wrong answer must be plausible enough to represent a realistic student error, but objectively wrong under the prompt.

Avoid:

- silly distractors;
- grammatical giveaways;
- answer-length giveaways;
- duplicate meanings;
- ambiguity between two options;
- unsupported trick wording.

### Grammar questions

For Standard English Conventions:

- exactly one answer must conform to the intended rule in context;
- punctuation questions must be structurally valid;
- verb, modifier, pronoun, agreement and sentence-boundary questions must have unambiguous answers;
- the explanation must teach the rule rather than merely name the correct option.

### Rhetorical questions

For Expression of Ideas:

- the rhetorical goal must be explicit enough to be solved;
- notes-based questions must contain relevant and irrelevant information where appropriate;
- the correct choice must accomplish the goal most effectively;
- distractors must fail for a reason that can be explained.

---

## 7. Math quality controls

Every math question must pass an independent mathematical correctness review.

The reviewer must verify:

- the problem has a valid solution;
- the keyed answer is correct;
- no alternative choice is also correct;
- the algebra/arithmetic is correct;
- units and labels are correct;
- diagrams are geometrically consistent;
- graphs match the equations/data;
- numerical values are realistic;
- the stated assumptions are sufficient;
- the explanation reproduces the result independently.

### Distractor design

Math distractors should represent real errors such as:

- sign errors;
- algebraic distribution errors;
- misuse of a formula;
- reading a graph incorrectly;
- wrong unit conversion;
- confusing a parameter with a result;
- incomplete multi-step reasoning.

Do not manufacture random wrong numbers merely to fill four choices.

### Student-produced response

Every SPR question must specify:

- accepted answer format;
- acceptable equivalent representations;
- numeric precision rules;
- expected negative/decimal/fraction handling;
- a clear unique numerical result.

---

## 8. Graphics, charts and figures

All Apriori figures must be original structured assets whenever practical.

Prefer data-driven/SVG rendering over copied image assets.

### Required figure review

Check:

- mathematical accuracy;
- labels;
- axis orientation;
- scale;
- legends;
- units;
- readability at laptop/tablet/mobile widths;
- accessibility labels;
- consistency with prompt and answer;
- no misleading visual proportions.

A figure may not be decorative unless the figure is explicitly tagged as decorative in a lesson context. In a scored question, every displayed visual element must have a deliberate purpose or be safely ignorable.

---

## 9. Scientific and graphing calculator standard

The SAT Math experience must provide an integrated calculator experience consistent with the current Bluebook environment.

College Board currently provides an embedded Desmos calculator with scientific and graphing options for SAT Math. CAS functionality is not permitted. citeturn524027search4turn524027search7

### Apriori requirement

The future SAT Math practice and mock-test interface must support:

- an integrated scientific calculator;
- an integrated graphing calculator where appropriate;
- access throughout Math modules, not just on selected questions;
- calculator visibility that does not obscure question content;
- keyboard and mouse/touch support;
- reset/clear behavior between questions or as appropriate;
- responsive positioning;
- no external website dependency for normal student operation.

Each question may additionally carry:

- `calculatorEligibility: true/false` for authoring analytics;
- `calculatorMode: none/scientific/graphing/either` to indicate the author's intended method;
- `calculatorRequired: true/false` where an item genuinely depends on calculator use.

The presence of a calculator must never make a question materially easier than intended because of accidental tool affordances.

---

## 10. Difficulty calibration

Difficulty has three layers:

1. **Author-intended difficulty** — drafted as Easy/Medium/Hard.
2. **Expert-reviewed difficulty** — reviewed for cognitive demand, distractor quality, processing burden, and time.
3. **Observed difficulty** — assigned later from real student response data.

Never overwrite historical observed results merely because a question was reclassified.

Difficulty changes must be metadata changes, not architecture changes.

When a question changes materially, create a new `version` and rerun validation.

---

## 11. Duplicate and originality control

Originality is a release gate.

Before publication, check for:

- exact text duplicates;
- near-duplicate wording;
- same mathematical structure with trivial number substitution;
- repeated diagram geometry;
- reused passage ideas with cosmetic wording changes;
- repeated answer-choice patterns that reveal the key;
- repeated question framing across tests.

### Ten-test rule

Reading & Writing:

- no repeated passage;
- no repeated passage pair;
- no repeated question;
- no near-duplicate question;
- no trivial prompt rewrite.

Math:

- no repeated question;
- no trivial numerical substitution;
- no repeated diagram with changed labels only;
- no near-duplicate problem structure presented as a different test item.

Skills/concepts may repeat because proper SAT coverage requires repeated measurement of important skills.

---

## 12. Test assembly controls

The question bank is the source pool; mock tests are assembled views of validated content.

Never hand-edit question content inside an individual test merely to force a visual result. Instead, update the bank record and assemble from approved questions.

Every test assembly must verify:

- section count;
- module count;
- timing;
- domain distribution;
- difficulty distribution;
- question-type distribution;
- adaptive Module 2 routing pools;
- figure/tool coverage;
- no duplicate question or passage;
- no retired/unapproved content;
- explanations exist;
- all test questions meet release status.

The existing 10-test registry remains configuration; this QC document governs content selection.

---

## 13. Lesson quality-control standard

SAT lessons are part of the SAT learning product and must be treated as premium instructional content, not filler pages.

Each lesson should follow:

**Concept → Visual model → Worked example → Strategic insight → Guided practice → Independent practice → Error diagnosis → Transfer application**

### Lesson components

A high-quality lesson should contain, where applicable:

- learning objective;
- prerequisite knowledge;
- concept explanation;
- visual representation;
- annotated worked example;
- “why this works” explanation;
- common mistakes;
- test-taking strategy;
- mini-checkpoint;
- targeted practice;
- harder extension;
- links to relevant question-bank skills.

### Visual-first rule

Use visual explanations wherever they genuinely improve understanding:

- annotated graphs;
- step-by-step diagrams;
- number lines;
- algebraic transformations;
- geometry animations;
- data-display walkthroughs;
- sentence/paragraph highlighting;
- rhetorical structure maps;
- before/after revisions.

Animation must be purposeful, restrained, accessible, and optional where motion could hinder comprehension.

### Lesson difficulty

Lessons may have:

- Foundation/Easy;
- Core/Medium;
- Advanced/Hard;

but the lesson should teach the concept progressively rather than simply increasing visual complexity.

### Lesson-to-question linkage

Every lesson should link to a set of approved questions or activities by `lessonId`/skill metadata.

This enables:

Lesson → Practice → Error → Recommended Lesson

without changing the SAT question schema or test engine.

---

## 14. Quality-control workflow

### Gate A — Authoring

Author creates the draft and metadata.

### Gate B — Structural validation

Verify schema, required fields, IDs, tags, choices, answer format, and figure references.

### Gate C — Subject validation

R&W: editorial/skill review.  
Math: independent mathematical verification.  
Lessons: instructional review.

### Gate D — Originality validation

Run exact and near-duplicate checks against the entire current bank.

### Gate E — Visual/tool validation

Check figures, calculator behavior, formatting, accessibility, and responsive presentation.

### Gate F — Editorial QC

Check wording, ambiguity, distractors, explanation quality, difficulty, timing, and bias/sensitivity.

### Gate G — Assembly approval

Verify form blueprint, adaptive pools, coverage and no duplication.

### Gate H — Publication

Only `published` content may be released to students.

---

## 15. Change management

Content changes must be designed so that changing:

- question wording;
- answer choices;
- explanation;
- difficulty;
- domain/skill;
- tags;
- calculator preference;
- figure specification;
- lesson linkage;
- publication status

does **not** require changing the SAT application architecture.

Architecture changes are only justified when the question **interaction model itself** changes, for example a future interaction not supported by the current schema.

Normal content expansion must remain data/configuration work.

---

## 16. Minimum release checklist

A question is `assembly-ready` only when all applicable checks are TRUE:

- [ ] Correct section/domain/skill
- [ ] Correct question type
- [ ] Correct difficulty classification
- [ ] Original Apriori content
- [ ] No duplicate/near-duplicate
- [ ] Exactly one defensible answer
- [ ] Distractors are plausible and distinct
- [ ] Explanation is correct and instructional
- [ ] Estimated time is reasonable
- [ ] Figure/data display validated
- [ ] Calculator metadata validated
- [ ] Accessibility reviewed
- [ ] Bias/sensitivity reviewed
- [ ] Lesson linkage added where applicable
- [ ] Test assembly eligibility confirmed

---

## 17. Quality bar

The target is not “good enough for an SAT practice site.”

The target is:

**College Board-level presentation discipline + OnePrep-level Reading & Writing breadth and practice depth + Princeton Review instructional realism + Kaplan/Barron's Math rigor and variety + Apriori-original content and pedagogy.**

The content should be strong enough to serve:

- a first-time SAT student;
- a 1200-level student;
- a 1400-level student;
- a 1500+ student;
- classroom use;
- targeted skill drills;
- full-length adaptive mocks.

No question should be published merely to fill a numerical quota.

---

## 18. External references used for this standard

- College Board — What's on the SAT
- College Board — Student Question Bank: Reading and Writing
- College Board — Student Question Bank: Math
- College Board — SAT calculator policy / Bluebook tools
- OnePrep — Digital SAT Question Bank and analytics
- OnePrep — Digital SAT lessons/course
- The Princeton Review — Digital SAT structure and practice
- Kaplan — Digital SAT practice and SAT Premium Prep
- Barron's — Digital SAT Practice Questions

These references establish the benchmark only. Apriori content must remain original.
