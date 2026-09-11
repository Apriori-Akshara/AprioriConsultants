# Apriori Digital SAT / PSAT — Question & Quiz Content State

**Date:** September 11, 2026

## 1. Current platform state

The SAT/PSAT application is being built against the public live website. The public live website is the routine student verification environment. Render remains the deployment/infrastructure and diagnostic environment.

Authentication, verified-session access, subscription foundation and the existing SAT dashboard UI are not to be rebuilt.

## 2. Master content source of truth

All SAT questions, lessons, drills, exercises, quizzes, mock-test content and future GRE/GMAT learning content are governed by:

`docs/TEST-PREP-CONTENT-QUALITY-CONTROL.md`

External benchmark hierarchy is documented in:

`docs/TEST-PREP-CONTENT-STANDARDS.md`

SAT benchmark hierarchy:

- College Board / Bluebook → structure and presentation;
- OnePrep → primary R&W quality benchmark;
- Princeton Review → secondary R&W benchmark;
- Kaplan → primary Math quality benchmark;
- Barron's → secondary Math benchmark.

No third-party question, passage, answer choice, explanation or proprietary asset is copied into Apriori content.

## 3. PSAT/SAT Mock program

Initial target:

- 10 PSAT/NMSQT-aligned mocks;
- 10 SAT mocks — Series A;
- 10 SAT mocks — Series B.

Total initial full-length inventory: **30 mocks**.

The Foundation and Advanced exercise/drill programs remain deferred until the requested mock-bank milestone is reached.

## 4. Difficulty rule — retrospective and prospective

**College Board = structure, wording style, application style, domain taxonomy and answer-choice conventions. Apriori = one difficulty level higher for both Verbal and Quant.**

This rule applies retrospectively to already-authored PSAT/SAT mock content and prospectively to every new mock until explicitly changed.

Difficulty elevation must come from stronger reasoning, tighter distractors, multi-step application and subtler evidence discrimination rather than unnatural complexity.

## 5. Canonical question contract

`src/data/sat/questionSchema.js` remains the canonical SAT question contract. Content governance sits above it and must not create a parallel question schema without a genuine requirement.

Core metadata includes section/module/domain/skill/concept/difficulty/question type/stimulus/timing/calculator/originality/status information.

## 6. Originality controls

Across the 30 PSAT/SAT mocks:

- no repeated R&W passage;
- no repeated R&W question;
- no repeated Math question;
- no trivial numeric substitution presented as a new Math question;
- no near-duplicate diagram/question framing;
- concepts and skills may repeat for appropriate coverage.

## 7. Stage 1 completed execution layer for first prototypes

The first two full-length mock content prototypes are now connected to a reusable student execution architecture.

### PSAT Mock 01

- 98 questions: 54 R&W + 44 Math;
- two R&W modules and two Math modules;
- adaptive Module 2 routing;
- timed 32-minute R&W modules and 35-minute Math modules;
- 10-minute section break;
- persistent attempt and answer storage;
- secure server-side scoring;
- progress dashboard integration;
- route: `/SATMocks/PSAT1`.

### SAT Mock 01 — Series A

- 98 questions: 54 R&W + 44 Math;
- two R&W modules and two Math modules;
- adaptive Module 2 routing;
- timed 32-minute R&W modules and 35-minute Math modules;
- 10-minute section break;
- persistent attempt and answer storage;
- secure server-side scoring;
- progress dashboard integration;
- route: `/SATMocks/Test1`.

## 8. Reusable adaptive architecture

The reusable execution engine is:

`src/lib/sat/adaptiveMockEngine.js`

It provides:

- one common definition contract for PSAT/SAT mocks;
- Module 1 → Module 2 route selection;
- `high`, `standard`, and `low` route states;
- secure client-safe question delivery without exposing answer keys;
- reusable timing and section structure;
- a common template for future mocks.

Current routing thresholds:

- high: ≥75% correct in Module 1;
- standard: 46–74%;
- low: ≤45%.

The architecture is reusable. Remaining mocks will receive properly authored/calibrated high/standard/low question pools without rebuilding the execution engine.

## 9. Attempt persistence and reporting

`src/pages/api/sat/mock-progress.js` provides the persistent attempt layer through PostgreSQL table `sat_mock_attempts`.

Recorded data includes:

- student account;
- mock key;
- attempt state;
- current section/module;
- adaptive route;
- question answers;
- section scores;
- completion timestamp.

The same endpoint feeds the SAT Mocks dashboard and the student Profile dashboard.

## 10. Dashboard integration

`src/pages/SATMocks/index.js` now shows:

- PSAT Mock 01 as a live adaptive mock;
- SAT Mock 01 as a live adaptive mock;
- remaining SAT test slots using the same future template;
- completed-mock count;
- best accuracy;
- persistent attempt state;
- direct progress-dashboard access.

`src/pages/Profile/index.js` now shows recorded mock performance instead of UI-only placeholders for the connected mock data:

- mocks completed;
- questions answered;
- best mock accuracy;
- latest mock results;
- direct mock-library navigation.

## 11. Stage roadmap — updated

### STAGE 1 — Question Bank Foundation + reusable adaptive execution

**In progress and substantially built.** The first PSAT and SAT prototype banks, adaptive execution engine, secure attempt persistence, scoring and dashboard integration are established.

### STAGE 2 — First demonstration content set / quality calibration

Refine the first two prototype question sets to full production content quality: genuine route-separated difficulty, final domain calibration, stronger visual stimulus coverage, accessibility, duplicate controls and content release checks.

### STAGE 3 — Scale validated mock content

Use the verified Stage 1 execution template to author the remaining PSAT/SAT mock inventory without rebuilding the test engine.

### STAGE 4 — Scoring/reporting expansion

Extend beyond raw accuracy into richer SAT-style score interpretation, timing analytics, skill/domain reporting and review workflows.

### STAGE 5 — Foundation and Advanced modules

Begin Foundation/Advanced only after the mock milestone requested by the project direction is reached.

## 12. Immediate build direction

Continue Stage 1/Stage 2 quality work by improving the first PSAT Mock 01 and SAT Mock 01 content itself. Do not rebuild the adaptive engine, attempt layer or dashboard architecture after student verification unless a concrete defect requires it.
