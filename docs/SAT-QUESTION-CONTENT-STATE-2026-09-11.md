# Apriori Digital SAT / PSAT — Question & Quiz Content State

**Date:** September 11, 2026

## 1. Current implementation state

The project has moved from dashboard-only preparation into the first reusable adaptive mock implementation.

The public live website remains the routine student verification environment. Render remains deployment/infrastructure and does not define the product verification workflow.

## 2. Master content source of truth

All SAT questions, lessons, drills, exercises, quizzes, mock-test content and related learning content are governed by:

`docs/TEST-PREP-CONTENT-QUALITY-CONTROL.md`

External benchmarks:

- College Board / Bluebook → Digital SAT/PSAT structure, presentation, wording style, domain taxonomy and answer-choice conventions;
- OnePrep → primary R&W quality benchmark;
- Princeton Review → secondary R&W benchmark;
- Kaplan → primary Math quality benchmark;
- Barron's → secondary Math benchmark.

No third-party question, passage, answer choice, explanation, diagram or proprietary asset is copied.

## 3. Mock inventory

Initial planned inventory:

- 10 PSAT/NMSQT-aligned mocks;
- 10 SAT Series A mocks;
- 10 SAT Series B mocks.

Total: **30 full-length mocks**.

Foundation and Advanced creation is deferred until the required mock-bank milestone is reached.

## 4. Difficulty rule

All PSAT/SAT mock content uses:

**College Board for structure and wording/application conventions + one full difficulty level higher for Apriori Verbal and Quant.**

This rule applies retrospectively to existing content and prospectively to new content unless explicitly revised later.

The increase must come from stronger reasoning, evidence discrimination, multi-step application, tighter distractors and more sophisticated but natural SAT-style decision making.

## 5. First two full-length mocks

### PSAT Mock 01

- `psat-nmsqt`
- 98 questions delivered per adaptive route;
- 54 Reading & Writing;
- 44 Math;
- 2 timed modules per section;
- 32 minutes per R&W module;
- 35 minutes per Math module;
- 10-minute break between sections;
- integrated Math calculator metadata;
- student route: `/SATMocks/PSAT1`.

### SAT Mock 01 — Series A

- `sat-series-a`;
- 98 questions delivered per adaptive route;
- 54 Reading & Writing;
- 44 Math;
- 2 timed modules per section;
- 32 minutes per R&W module;
- 35 minutes per Math module;
- 10-minute break between sections;
- integrated Math calculator metadata;
- student route: `/SATMocks/Test1`.

## 6. Reusable adaptive mock template

Canonical reusable execution layer:

`src/lib/sat/adaptiveMockEngine.js`

Current template provides:

1. Mock definition and normalization.
2. Module-1 question loading from the canonical section content arrays.
3. Module-2 routing after Module 1.
4. High / Standard / Low route states.
5. Client-safe question delivery with no answer-key leakage.
6. Timed R&W/Math execution.
7. Persistent PostgreSQL attempts.
8. Server-side route-aware scoring.
9. Completion data returned to the dashboard.

Adaptive thresholds currently used:

- High ≥75%;
- Standard 46–74%;
- Low ≤45%.

The architecture is now the template for every later mock. Future builds should replace only the mock content/configuration and preserve the execution/persistence/reporting layers.

## 7. Attempt and progress layer

`src/pages/api/sat/mock-progress.js` maintains the `sat_mock_attempts` table and stores:

- user ID;
- test key;
- current section/module;
- selected R&W and Math routes;
- question answers;
- completion status;
- section scores;
- completion time.

Scoring uses the actual route selected for each section.

## 8. Student mock-library integration

`src/pages/SATMocks/index.js` now integrates both first live mocks into one cohesive PSAT/SAT library screen.

The live cards expose:

- mock identity;
- status;
- 98-question count;
- module structure;
- test timing;
- adaptive status;
- centered start/retake action.

The remaining SAT slots use the same card/template design while awaiting content authoring.

## 9. Profile dashboard integration

`src/pages/Profile/index.js` now consumes the mock-progress endpoint and displays live mock metrics instead of placeholder SAT-mock statistics.

It now shows:

- mocks completed;
- questions answered;
- latest accuracy;
- best accuracy;
- latest completed mock;
- adaptive route information;
- R&W and Math performance breakdown;
- direct link to the mock library.

The SAT mock path card is now visually aligned with the live PSAT/SAT mock system.

## 10. Content-quality requirements still to be applied before declaring production-calibrated mocks

The reusable test engine is established, but content itself remains subject to the master QC gates.

Required next content pass:

- genuine, separately authored high/standard/low Module-2 pools;
- complete official domain/skill distribution calibration;
- figures, tables, graphs, coordinate planes and geometry stimulus where appropriate;
- accessibility checks for visual stimuli;
- duplicate/near-duplicate control across the complete inventory;
- final score/report interpretation calibration.

These are content-authoring/calibration tasks and must not trigger another test-engine architecture.

## 11. Stage roadmap

### STAGE 1 — Question Bank Foundation and Validation Infrastructure

**Current state:** reusable mock content, metadata, adaptive execution, attempts, scoring and dashboard integration are established for the first two prototypes.

### STAGE 2 — First demonstration content set

Refine the first PSAT and SAT mock content to production-calibrated quality using the approved difficulty and College Board-aligned conventions.

### STAGE 3 — Student test-taking interface

The reusable student test interface is already functioning as the foundation for the first two mocks and will be refined as content quality is finalized.

### STAGE 4 — Attempt persistence and navigation

Server-side attempt persistence and answer saving are already in place for the first two mocks; richer review navigation/flagging remains later work.

### STAGE 5 — Scoring and results

Basic route-aware scoring and results are implemented. Full SAT score calibration and deeper analytics remain later work.

### STAGE 6 — Scale the question bank

After the user verifies the first two mocks, use this exact template to scale the remaining PSAT/SAT inventory without recreating the architecture.

## 12. Current resume point

**Immediate next work: surgically improve the content quality and adaptive route pools of PSAT Mock 01 and SAT Mock 01, then reuse the verified template to expand the remaining mock inventory.**
