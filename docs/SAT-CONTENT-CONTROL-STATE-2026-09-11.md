# Apriori Test-Prep — Content Control State

**Date:** September 11, 2026

## Current status

The SAT/PSAT student-facing application is being built against the public live website. The public live site is the routine student verification environment; Render remains the deployment and infrastructure/diagnostic environment.

## Master content-quality source of truth

The single governing document for **all questions, lessons and learning content across SAT, GRE and GMAT** is:

`docs/TEST-PREP-CONTENT-QUALITY-CONTROL.md`

It governs content taxonomy, labels/tags, difficulty, exercise/drill construction, timing, mock construction, figures, calculator metadata, lesson quality, originality, review/release gates, versioning and content changes that do not require architecture changes.

External providers are benchmarks only. No College Board, competitor or third-party question, passage, answer choice, explanation or proprietary asset is copied into Apriori content.

## PSAT/SAT mock program

The student-facing mock area is **PSAT/SAT Mocks**.

Initial target:

- 10 PSAT/NMSQT-aligned mocks;
- 10 SAT mocks — Series A;
- 10 SAT mocks — Series B.

Total initial full-length mock inventory: **30 mocks**.

Foundation and Advanced exercise/drill creation is intentionally deferred until the mock-bank build reaches the requested milestone of completed PSAT/SAT mock inventory.

## Mock difficulty revision rule — effective immediately and retrospectively

For the current PSAT/SAT mock-bank build, the quality standard is elevated above baseline assessment difficulty while preserving the exact style of current College Board Digital SAT/PSAT presentation, wording, question construction, application style and answer-choice logic.

**College Board = structure, wording style, application style, domain taxonomy and answer-choice conventions. Apriori = one difficulty level higher for both Verbal and Quant.**

This applies **retrospectively** to already-authored mock questions and **prospectively** to every new PSAT/SAT mock unless a later instruction explicitly changes the standard.

The elevation must come from stronger reasoning, more precise distractors, multi-step application, tighter evidence discrimination and subtler wording—not artificial complexity or vocabulary/math tricks that make the item unlike the SAT/PSAT.

## Stage 1 first-mock implementation milestone

The first complete content prototypes are now connected to a reusable adaptive mock-test engine.

### PSAT Mock 01

- Assessment: `psat-nmsqt`
- Questions: **98**
- Reading & Writing: **54**
- Math: **44**
- Modules: 2 R&W + 2 Math
- Elevated difficulty standard applied
- Calculator metadata included throughout Math
- Original Apriori content
- Student route: `/SATMocks/PSAT1`

### SAT Mock 01 — Series A

- Questions: **98**
- Reading & Writing: **54**
- Math: **44**
- Modules: 2 R&W + 2 Math
- Elevated difficulty standard applied
- Calculator metadata included throughout Math
- Original Apriori content
- Student route: `/SATMocks/Test1`

## Adaptive mock implementation completed in Stage 1

Reusable engine:

`src/lib/sat/adaptiveMockEngine.js`

The engine now provides:

- one common mock-definition contract for PSAT Mock 01 and SAT Mock 01;
- Module 1 → Module 2 routing;
- three Module 2 route states: `high`, `standard`, `low`;
- section timing of 32 minutes R&W and 35 minutes Math;
- 10-minute break between sections;
- secure server-side answer recording;
- server-side scoring using the canonical answer key;
- reusable client-safe question delivery that does not expose correct answers;
- a reusable route/template intended for the remaining mock inventory.

Current routing thresholds are:

- **High route:** ≥75% correct in Module 1;
- **Standard route:** 46–74% correct;
- **Low route:** ≤45% correct.

The routing framework is intentionally reusable. The remaining mock sets will replace prototype route-pool assignments with fully authored and calibrated high/standard/low question pools rather than requiring a new execution architecture.

## Attempt persistence and reporting completed in Stage 1

New server-side attempt endpoint:

`src/pages/api/sat/mock-progress.js`

It creates/uses the `sat_mock_attempts` PostgreSQL table and records:

- student ID;
- mock key;
- in-progress/completed state;
- current section/module;
- selected adaptive route;
- question responses;
- section scores;
- completion timestamp.

This gives the mock engine a persistent attempt layer before later expansion into richer scoring analytics.

## Dashboard integration completed in Stage 1

`src/pages/SATMocks/index.js` now exposes:

- PSAT Mock 01 as a live student-facing adaptive mock;
- SAT Mock 01 as a live student-facing adaptive mock;
- the remaining SAT inventory as reserved production slots using the same template;
- completed-mock count;
- best mock accuracy;
- persistent attempt status;
- direct access to the progress dashboard.

`src/pages/Profile/index.js` now consumes the same mock-progress endpoint and displays:

- mocks completed;
- questions answered;
- best mock accuracy;
- latest recorded mock attempts and accuracy;
- direct path back to the adaptive mock library.

## Content-quality boundary for the two live prototypes

The execution architecture is now functional, but content release quality remains governed by the master QC document.

Before a mock is classified as a fully production-calibrated assessment, the content itself still requires:

- fully authored high/standard/low Module 2 pools with real difficulty separation;
- final official domain-distribution calibration;
- expanded figure/chart/geometry stimulus coverage;
- visual accessibility validation;
- deeper duplicate/concept-overlap controls across the 30-mock inventory;
- final scoring calibration and report interpretation.

These are content-calibration gates, not reasons to rebuild the execution architecture. Once the student verifies the reusable mock engine, future mocks should use this same route, persistence, reporting and dashboard template without repeating architecture checks.

## Foundation and Advanced timing rule

Foundation remains **5 × 10 = 50 questions** per exercise/drill and Advanced remains **10 × 20 = 200 questions** per exercise/drill, with a major difficulty jump at each set boundary. Their creation remains deferred until the mock milestone specified above.

## Timing and calculator rules

Timed SAT/PSAT learning uses approximately:

- Reading & Writing ≈ 71 seconds per question;
- Math ≈ 95 seconds per question.

Non-timed exercises do not expire but record elapsed time.

SAT/PSAT Math continues to support the integrated scientific/graphing calculator model with CAS excluded, and question metadata records calculator mode/requirement.

## Current Stage 1 state

**STAGE 1 — Question Bank Foundation and Validation Infrastructure + first reusable adaptive mock implementation is in progress.**

The reusable execution architecture, attempt persistence, progress reporting and dashboard integration are now established for the first PSAT and SAT prototypes. The next build work can therefore focus on authoring and calibrating the remaining mock inventory rather than rebuilding the test engine.
