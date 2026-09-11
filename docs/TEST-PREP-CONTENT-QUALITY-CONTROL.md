# Apriori Test-Prep — Content, Question & Lesson Quality Control

**Created:** September 11, 2026  
**Status:** Permanent source of truth for questions, lessons and learning content across SAT, GRE and GMAT

This document is the master content-governance standard for all Apriori test-prep products.

It governs **questions, passages, lessons, drills, exercises, quizzes, mock tests, explanations, graphics, charts, calculator metadata, difficulty, tagging, originality, review, release, versioning and retirement**.

Product-specific documents may define implementation details, but they must not weaken this document. Changes to normal content metadata must not require a redesign of the application architecture.

---

## 1. Source-of-truth hierarchy

### Master content standard

This document is authoritative for:

- content quality;
- content taxonomy;
- labels and tags;
- difficulty policy;
- question and lesson QC;
- exercise/drill structure;
- timed/non-timed rules;
- mock-test content assembly;
- originality and duplication control;
- graphics and calculator requirements;
- publication/release status;
- versioning and retirement.

### Software architecture remains separate

The current application architecture and product-specific schemas remain authoritative for implementation contracts.

For SAT, the existing canonical technical question contract remains:

`src/data/sat/questionSchema.js`

The content standard sits **above** that schema. Adding a new skill, difficulty band, tag, lesson link, figure, calculator mode, assessment family or publication state must normally be handled as content/metadata rather than by rebuilding the application.

### External resources are benchmarks, never source material

No Apriori question, passage, answer choice, explanation, lesson, graphic or proprietary visual asset may be copied from an external provider.

---

## 2. Benchmark hierarchy

### SAT — active priority

**Presentation / assessment experience:** College Board / Bluebook  
**Reading & Writing benchmark:** OnePrep primary; Princeton Review secondary  
**Math benchmark:** Kaplan primary; Barron's secondary

College Board supplies the structural, presentation and official taxonomy reference. OnePrep is the principal benchmark for R&W breadth, practice depth, realistic question writing and instructional quality. Princeton Review is a secondary benchmark for realistic practice and strategy. Kaplan and Barron's are the principal external benchmarks for Math rigor, variety, worked solutions, data displays and problem construction.

### GRE — planning standard only

**Official presentation:** ETS / POWERPREP  
**Instruction/content benchmark:** Magoosh

No GRE build is authorized merely by this document.

### GMAT — planning standard only

**Official presentation:** GMAT Official materials/tests  
**Verbal benchmark:** Manhattan Prep  
**Quant benchmark:** GMAT Club plus validated official material

No GMAT build is authorized merely by this document.

---

## 3. Universal content identity

Every published content item must have stable metadata sufficient to identify, classify, revise, review, assemble, analyze and retire it without changing the surrounding product architecture.

### Required identity concepts

- `contentId`
- `version`
- `product`
- `contentType`
- `assessmentFamily` where applicable
- `course` where applicable
- `subject`
- `section` where applicable
- `module` where applicable
- `domain`
- `skill`
- `subskill`
- `conceptId`
- `difficulty`
- `difficultyBand` where progression requires finer control
- `questionType` where applicable
- `stimulusType` where applicable
- `interactionType`
- `tags`
- `lessonIds`
- `sourceType`
- `authoringStatus`
- `releaseStatus`

### Quality fields

Where applicable, every scored item must also support:

- originality fingerprint;
- concept fingerprint;
- exact/near-duplicate status;
- correctness review;
- explanation review;
- figure review;
- accessibility review;
- bias/sensitivity review;
- calculator/tool review;
- release eligibility.

---

## 4. Controlled labels and tags

Free-form labels should be avoided when a controlled label exists.

### Core status labels

`draft`  
`author-review`  
`content-review`  
`subject-review`  
`qc-approved`  
`assembly-ready`  
`published`  
`retired`

Only `assembly-ready` or `published` content may enter a student-facing mock. `retired` content must never be served as active practice.

### Difficulty labels

- `easy`
- `medium`
- `hard`

These are the broad pedagogical difficulty labels.

### Progression bands

Broad labels are supplemented by controlled progression bands whenever an exercise/drill must become substantially harder set-by-set.

Foundation:

- `foundation-set-01`
- `foundation-set-02`
- `foundation-set-03`
- `foundation-set-04`
- `foundation-set-05`

Advanced:

- `advanced-set-01` through `advanced-set-10`

The progression band is **not a replacement for Easy/Medium/Hard**. It allows a 5-set or 10-set sequence to contain meaningful difficulty jumps while preserving the standard difficulty vocabulary for filtering, analytics and reporting.

### Required tag families

`product:*`  
`course:*`  
`assessment:*`  
`section:*`  
`domain:*`  
`skill:*`  
`difficulty:*`  
`difficulty-band:*`  
`qtype:*`  
`stimulus:*`  
`interaction:*`  
`figure:*`  
`calc:*`  
`module:*`  
`adaptive-route:*`  
`lesson:*`  
`set:*`  
`test:*`  
`status:*`

Tags aid filtering. They do not replace authoritative structured fields.

---

## 5. SAT assessment catalog

The student-facing SAT area is now conceptually named:

**PSAT/SAT Mocks**

The content system must support separate assessment families rather than treating every mock as merely `SAT Mock 1..10`.

### PSAT mock bank

Target:

- **10 PSAT mocks**

The initial PSAT target is **PSAT/NMSQT-aligned** unless a future product decision explicitly adds separate PSAT 10 or PSAT 8/9 banks. The metadata must allow that later without changing the question architecture.

### SAT mock banks

Target:

- **10 SAT mocks — Series A**
- **10 SAT mocks — Series B**

Total initial SAT target: **20 SAT mocks**.

Series A and Series B should both conform to the same current Digital SAT assessment blueprint while providing distinct content pools and no cross-series duplication of scored questions.

### Assessment metadata

Every mock should be identifiable by:

- `assessmentFamily` → `psat` or `sat`
- `assessmentVariant` → e.g. `psat-nmsqt`, `sat-series-a`, `sat-series-b`
- `assessmentNumber` → 01–10 within the relevant bank
- `section`
- `module`
- adaptive route where applicable
- release status

The existing `/SATMocks` route may evolve into `/PSATSATMocks` or an equivalent route later, but the underlying content taxonomy must not depend on the final route name.

---

## 6. Current PSAT/SAT structural benchmark

The current digital PSAT/NMSQT and SAT structure uses:

- Reading & Writing: 54 questions, 64 minutes, two 32-minute modules;
- Math: 44 questions, 70 minutes, two 35-minute modules;
- total: 98 questions;
- 10-minute break between sections.

College Board describes the first module as a broad mix of difficulty and the second module as adaptively routed based on performance. citeturn476869search5turn476869search0turn161535search7

The platform must reproduce the **assessment experience and structure**, not claim to reproduce College Board's proprietary scoring algorithm.

---

## 7. Reading & Writing content standard

All R&W questions must map to the current four-domain taxonomy:

### Information and Ideas

- Central Ideas and Details
- Command of Evidence
- Inferences

### Craft and Structure

- Words in Context
- Text Structure and Purpose
- Cross-Text Connections

### Expression of Ideas

- Rhetorical Synthesis
- Transitions

### Standard English Conventions

- Boundaries
- Form, Structure, and Sense

The bank should maintain the current official distribution as a blueprint rather than a rigid identical count per module. College Board's current R&W specifications should remain the structural reference. citeturn161535search4

R&W requirements:

- original passages;
- one defensible answer;
- plausible but objectively wrong distractors;
- natural Digital SAT wording;
- appropriate passage length and cognitive burden;
- clear explanations;
- graphics/data displays when relevant;
- no copied passage framing or competitor wording.

---

## 8. Math content standard

All Math questions must map to the current four-domain taxonomy:

### Algebra

Approx. 35%

### Advanced Math

Approx. 35%

### Problem-Solving and Data Analysis

Approx. 15%

### Geometry and Trigonometry

Approx. 15%

The complete underlying skill list must be covered rather than only the four headline domains. College Board's current Math specifications remain the structural benchmark. citeturn161535search2

Math must include both multiple-choice and student-produced response items. Approximately 75% multiple-choice and 25% SPR may be used as a working content-bank target, with final form assembly validated against the intended assessment blueprint.

---

## 9. Graphics, charts, tables and interaction styles

Apriori content must support the full visual range required for high-quality digital assessment and instruction.

Controlled stimulus/figure types include:

- short passage;
- paired texts where appropriate;
- notes/bullets;
- table;
- chart;
- bar chart;
- line graph;
- scatterplot;
- histogram;
- box plot;
- coordinate plane;
- number line;
- geometry diagram;
- triangle/right triangle;
- circle;
- polygon;
- composite geometry;
- angle diagram;
- quadratic graph;
- transformation;
- mixed visual;
- equation/formula display;
- data set.

All scored graphics must be original, accurate, readable, accessible and purposeful. Data-driven/SVG rendering is preferred where practical.

---

## 10. Calculator/tool policy

For the SAT/PSAT Math experience, an integrated calculator must be available throughout Math, consistent with the current digital SAT Suite experience. College Board currently provides embedded Desmos scientific and graphing options and does not permit CAS calculators. citeturn161535search6turn161535search23

Question metadata must therefore include, where applicable:

- `calculatorEligibility`
- `calculatorMode` → `none`, `scientific`, `graphing`, `either`
- `calculatorRequired`
- `referenceSheetRelevant`

The question may be designed to be solvable without a calculator even when the tool is available. Calculator availability is a test-environment rule; calculator requirement is a content-authoring attribute.

---

## 11. Foundation exercise/drill standard

**Every Foundation exercise or drill consists of 5 sets of 10 questions = 50 questions.**

Each set must:

- remain focused on the same primary skill/concept or tightly defined skill cluster;
- increase meaningfully in difficulty compared with the preceding set;
- contain a major difficulty jump after every completed set;
- preserve enough item variety that the exercise is not a numerical-rewrite sequence;
- contain original questions;
- record accurate explanations and common errors where appropriate.

The intended sequence is:

Set 1 → introductory benchmark  
Set 2 → first major jump  
Set 3 → second major jump  
Set 4 → third major jump  
Set 5 → fourth major jump / highest Foundation challenge

The broad labels Easy/Medium/Hard remain available, while `foundation-set-01..05` records the finer progression.

### Foundation timed drill

The timeout is computed from the section-specific SAT benchmark time per question for the questions contained in the set.

### Foundation non-timed drill

There is **no timeout**. The system records elapsed time from start to completion for analytics and pacing feedback.

---

## 12. Advanced exercise/drill standard

**Every Advanced exercise or drill consists of 10 sets of 20 questions = 200 questions.**

Each set must:

- represent a deliberate difficulty increase from the previous set;
- contain a major difficulty jump after every completed set;
- expand reasoning complexity, distractor sophistication, multi-step demands, data/visual interpretation or application burden rather than merely increasing length;
- remain within the intended SAT/GRE/GMAT product taxonomy for the activity;
- remain original and non-duplicative.

Sequence:

Set 1 → Advanced entry challenge  
Set 2 → major jump  
...  
Set 10 → highest Advanced challenge

The exact difficulty curve may differ by product because SAT, GRE and GMAT have different content models, but the **set-by-set progression requirement is universal**.

### Advanced timed drill

The timeout is generated from the product/section timing benchmark associated with each question type. For SAT, the baseline is approximately:

- Reading & Writing: 64 ÷ 54 ≈ **71 seconds per question**;
- Math: 70 ÷ 44 ≈ **95 seconds per question**.

These are baseline averages, not a claim that every official question receives identical time. citeturn161535search4turn161535search2

### Advanced non-timed drill

There is **no timeout**. Elapsed time is recorded and reported for pacing analysis.

---

## 13. Timed vs non-timed activity model

Every drill/exercise must carry a timing mode:

- `timed`
- `non-timed`

### Timed

- has a calculated hard timeout;
- uses section/product average time-per-question benchmarks;
- displays remaining time;
- automatically stops/submits/locks the activity when time expires;
- preserves recorded answers and elapsed time.

### Non-timed

- never automatically times out;
- records elapsed time;
- may display pacing guidance or comparisons afterward;
- does not penalize the student merely for spending longer.

The timing policy must remain configuration/metadata driven so benchmark timing can change without changing individual question architecture.

---

## 14. Difficulty calibration

Difficulty has four useful layers:

1. **Author-intended:** Easy / Medium / Hard.
2. **Progression band:** Foundation Set 01–05 or Advanced Set 01–10.
3. **Expert reviewed:** cognitive demand, distractor quality, processing burden and expected time.
4. **Observed:** actual performance statistics after enough student data exist.

Observed difficulty must not overwrite historical attempt data.

A material content revision creates a new version and repeats QC.

---

## 15. Originality and duplication controls

Before release, check for:

- exact text duplication;
- near-duplicate wording;
- same mathematical structure with trivial number substitution;
- repeated passage concepts with cosmetic rewriting;
- repeated diagram geometry;
- repeated answer patterns that reveal the key;
- competitor/source resemblance;
- repeated question framing across tests or drill sets.

For PSAT/SAT mocks:

- no repeated R&W passage across mocks;
- no repeated R&W question;
- no repeated Math question;
- no trivial Math number substitution;
- no repeated diagram with only cosmetic changes;
- no near-duplicate question across Series A/B.

Concepts and skills may repeat because mastery requires repeated measurement.

---

## 16. Mock-test assembly quality gates

A mock can be published only when all of the following are satisfied:

- correct assessment family and variant;
- correct section/module counts;
- correct timing;
- correct domain distribution;
- correct question-type distribution;
- intended difficulty distribution;
- adaptive Module 2 routing pools are complete;
- tool/figure coverage is appropriate;
- no duplicate or near-duplicate content;
- all questions have explanations;
- all questions are `assembly-ready` or `published`;
- accessibility review is complete;
- answer keys are internally validated;
- no unapproved or retired content is included.

The bank is the source pool. Mock tests are assembled from approved content; question content should not be forked and manually edited inside a test.

---

## 17. Lesson quality standard

Lessons are core learning content, not decorative pages.

Every major lesson should progress through:

**Concept → Visual explanation → Worked example → Strategic insight → Guided practice → Independent practice → Error diagnosis → Transfer application**

Where beneficial, use:

- animated graphs;
- interactive diagrams;
- annotated equations;
- geometry constructions;
- number-line transformations;
- data-display walkthroughs;
- passage annotation;
- rhetorical structure maps;
- before/after sentence revisions;
- calculator demonstrations.

Animation must be purposeful, accessible and optional where motion could hinder comprehension.

Every lesson should have:

- objective;
- prerequisites;
- concept explanation;
- visual model;
- worked example;
- common mistakes;
- strategy;
- checkpoint;
- linked practice;
- harder extension where appropriate;
- question-bank skill links.

Lesson metadata must use the same controlled product/domain/skill/concept/difficulty taxonomy so questions and lessons can be connected for remediation and recommendations.

---

## 18. Cross-product rule for GRE and GMAT

The **same master QC document governs GRE and GMAT content** even though their product-specific taxonomies and test engines will differ.

GRE and GMAT will receive their own product-specific schemas/blueprints when implementation begins, but they must inherit this document's universal rules for:

- originality;
- stable IDs;
- versioning;
- controlled labels/tags;
- difficulty review;
- explanation quality;
- visual quality;
- accessibility;
- duplicate detection;
- lesson linkage;
- release gating;
- retirement.

No SAT-specific assumption may be copied into GRE/GMAT where their official structure differs.

---

## 19. Content change without architecture disruption

The following should normally be metadata/content changes only:

- change difficulty;
- change difficulty band;
- add/remove a tag;
- improve an explanation;
- replace a figure;
- change calculator intent;
- add a lesson link;
- change a passage topic;
- retire a question;
- move a question between approved pools;
- change publication state;
- add an approved exercise set.

These changes should not require rebuilding authentication, access-control, dashboard architecture, subscription logic, or the core test engine.

A material change to the interaction model may require a schema change, but that is an exception and must be reviewed before implementation.

---

## 20. Required review gates

### Gate 1 — Authoring

Content matches the intended blueprint and is fully populated.

### Gate 2 — Subject/correctness review

A qualified reviewer verifies correctness, uniqueness of the answer and quality of reasoning.

### Gate 3 — Editorial/content review

Language, distractors, clarity, realism, cognitive demand and instructional value are checked.

### Gate 4 — Visual/tool/accessibility review

Figures, equations, tables, calculator metadata, interaction behaviour and responsive readability are checked.

### Gate 5 — Originality/duplicate review

Exact, near-duplicate and source-resemblance checks are passed.

### Gate 6 — Assembly review

Coverage, distribution, timing, adaptive routing and test-form integrity are validated.

### Gate 7 — Release

Only approved content is published.

---

## 21. Change-management rule

Never fix a content problem by creating a second question architecture, second lesson architecture, duplicate backend or parallel test engine.

First ask:

1. Is this a content correction?
2. Is this a metadata correction?
3. Is this a taxonomy correction?
4. Is this an actual product interaction/architecture requirement?

If it is one of the first three, keep the change in the content layer.

---

## 22. Planned quality objective

Apriori aims to combine:

**Official structural fidelity + best-in-class instructional quality + original content + superior visual teaching + strong metadata + rigorous QC + progressively calibrated difficulty.**

The goal is not to imitate a competitor. The goal is to produce content that can withstand review by students, parents, educators, tutors and test-prep professionals.
