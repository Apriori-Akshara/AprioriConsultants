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
10. Authored Math figure metadata is passed through the client-safe question payload.

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
- completion time;
- current question position;
- Mark-for-Review flags.

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

## 10. Stage 1 content-quality pass — completed for PSAT Mock 01 and SAT Mock 01

A new Stage 1 content bank is active for both first mocks:

`src/data/sat/mockContent/stage1MockBank.js`

The active bank provides:

- separate PSAT/NMSQT and SAT Series A content identities;
- 196 bank questions per mock;
- 27 R&W Module-1 questions;
- three separately routed 27-question R&W Module-2 pools;
- 22 Math Module-1 questions;
- three separately routed 22-question Math Module-2 pools;
- original passages/prompts and explanations;
- balanced answer-position rotation;
- multiple-choice and SPR Math items;
- controlled Math domain coverage across Algebra, Advanced Math, Problem-Solving and Data Analysis, and Geometry/Trigonometry;
- calculator and reference-sheet metadata;
- authored Math figure metadata for geometry, line/coordinate, quadratic and scatterplot stimuli;
- PSAT/SAT cross-mock fingerprints and application identifiers.

The existing content quality gate remains active and runs at import time before the mock bank can be served.

The content pass also removed the previous dependency on the older generated mock source for the two Stage 1 live mocks.

## 11. Student test-taking layer — current state

The shared runner remains the execution layer for both mocks and currently provides:

- timed two-module R&W and Math execution;
- adaptive Module 2 routing;
- persistent answers;
- persistent current-question position;
- Mark for Review;
- bottom Question Navigator;
- calculator access throughout Math;
- Math reference sheet;
- Notes panel;
- Line Reader;
- Option Eliminator;
- zoom controls;
- responsive mobile layout.

The student-facing runner is intentionally shared by PSAT Mock 01 and SAT Mock 01 rather than forked.

## 12. Deployment state

The current `main` branch deployment is live on Render after the Stage 1 content-bank assembly fix.

Latest live commit:

`327105d2a894cebe1187d540d05507d7329cf388` — `Fix Stage 1 mock content assembly aliases`

Historical failed deployments from the content-authoring iteration are not being rewritten or recreated. They remain historical deployment records; `main` is the source of truth.

## 13. Remaining verification before declaring Stage 1 content production-calibrated

The user has not yet individually reviewed every question. That review is intentionally deferred until the current content deployment is stable.

Next verification pass:

- review PSAT Mock 01 questions individually;
- review SAT Mock 01 questions individually;
- verify each R&W prompt has clean, natural opening text;
- verify every Math figure is meaningful to the question rather than decorative;
- verify graph/table/geometry labels and values are mathematically consistent;
- verify answer keys and explanations question-by-question;
- verify no visible placeholder/generator wording remains;
- verify no duplicate or near-duplicate questions;
- verify adaptive route pools are substantively differentiated, not merely relabeled.

**Do not lock PSAT/SAT Mock 01 as the reusable content template until this verification is accepted.**

## 14. Stage roadmap

### STAGE 1 — Question Bank Foundation and Validation Infrastructure

**Current state:** reusable mock content, metadata, adaptive execution, attempts, scoring, dashboard integration and the first substantive Stage 1 content bank are established for the first two prototypes.

### STAGE 2 — First demonstration content set

Use the individual PSAT Mock 01 and SAT Mock 01 review to correct any remaining content, figure, explanation or calibration defects before the bank is treated as the reusable demonstration template.

### STAGE 3 — Student test-taking interface

The reusable student test interface is functioning as the foundation for the first two mocks.

### STAGE 4 — Attempt persistence and navigation

Server-side attempt persistence, answer saving, question position and flagging are in place for the first two mocks.

### STAGE 5 — Scoring and results

Basic route-aware scoring and results are implemented. Full SAT score calibration and deeper analytics remain later work.

### STAGE 6 — Scale the question bank

After the user verifies the first two mocks, use the accepted content and execution template to scale the remaining PSAT/SAT inventory without recreating the architecture.

## 15. Current resume point

**Immediate next work: user-level question-by-question verification of PSAT Mock 01 and SAT Mock 01, followed only by targeted corrections where an item, explanation, figure or route pool fails the QC standard. Do not rebuild the test engine.**
