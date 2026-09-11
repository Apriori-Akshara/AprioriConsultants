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

## First two mock implementation milestone

The first two full-length prototypes are now connected to one reusable adaptive execution architecture.

### PSAT Mock 01

- Assessment: `psat-nmsqt`
- Questions delivered per completed route: **98**
- Reading & Writing: **54**
- Math: **44**
- Modules: 2 R&W + 2 Math
- Elevated difficulty standard applied
- Calculator metadata included throughout Math
- Original Apriori content
- Student route: `/SATMocks/PSAT1`

### SAT Mock 01 — Series A

- Assessment: `sat-series-a`
- Questions delivered per completed route: **98**
- Reading & Writing: **54**
- Math: **44**
- Modules: 2 R&W + 2 Math
- Elevated difficulty standard applied
- Calculator metadata included throughout Math
- Original Apriori content
- Student route: `/SATMocks/Test1`

## Adaptive mock implementation completed

Reusable engine:

`src/lib/sat/adaptiveMockEngine.js`

The engine now correctly maps the existing mock-content module records into the student-facing test plan. The previous delivery defect where the engine expected `questions.records` while the content bank exposes section arrays has been corrected.

The engine provides:

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

The execution framework is reusable. Future mocks should plug their authored module and route pools into the same engine instead of creating another test implementation.

## Attempt persistence and reporting completed

Server endpoint:

`src/pages/api/sat/mock-progress.js`

It creates/uses the `sat_mock_attempts` PostgreSQL table and records:

- student ID;
- mock key;
- in-progress/completed state;
- current section/module;
- selected adaptive route for R&W and Math;
- question responses;
- section scores;
- completion timestamp.

Completion scoring now uses the **actual adaptive route selected for each section**, rather than always scoring the standard Module 2 pool.

## Dashboard integration completed

`src/pages/SATMocks/index.js` now exposes:

- PSAT Mock 01 as a live student-facing adaptive mock;
- SAT Mock 01 as a live student-facing adaptive mock;
- the remaining SAT library as reserved production slots using the same visual/test template;
- completed-mock count;
- best mock accuracy;
- direct test launch actions;
- direct access to the Profile progress dashboard.

The PSAT and SAT cards were also redesigned together so that they use one cohesive card system: clear identity badge, compact status pill, structured test metadata, balanced card height and centered CTA treatment.

`src/pages/Profile/index.js` now consumes the same mock-progress endpoint and displays:

- mocks completed;
- questions answered;
- latest accuracy;
- best accuracy;
- latest mock route information;
- latest R&W and Math breakdown;
- direct path to the mock library.

The SAT Mock Tests path card on the Profile dashboard was aligned with the same visual treatment and now represents the live PSAT/SAT mock experience rather than a future-only placeholder.

## Content-quality boundary for the two prototypes

The execution architecture is now ready to serve as the template for the remaining mock inventory. Content release quality remains governed by the master QC document.

The remaining content calibration work is:

- fully authored high/standard/low Module 2 pools with real difficulty separation;
- final official domain-distribution calibration;
- expanded figure/chart/geometry stimulus coverage;
- visual accessibility validation;
- deeper duplicate/concept-overlap controls across the 30-mock inventory;
- final scoring calibration and report interpretation.

These are content-calibration tasks, not reasons to rebuild the execution architecture.

## Foundation and Advanced timing rule

Foundation remains **5 × 10 = 50 questions** per exercise/drill and Advanced remains **10 × 20 = 200 questions** per exercise/drill, with a major difficulty jump at each set boundary. Their creation remains deferred until the mock milestone specified above.

## Timing and calculator rules

Timed SAT/PSAT learning uses approximately:

- Reading & Writing ≈ 71 seconds per question;
- Math ≈ 95 seconds per question.

Non-timed exercises do not expire but record elapsed time.

SAT/PSAT Math continues to support the integrated scientific/graphing calculator model with CAS excluded, and question metadata records calculator mode/requirement.

## Current Stage 1 state

**STAGE 1 — Question Bank Foundation and Validation Infrastructure + reusable adaptive mock implementation is in progress.**

The first two mocks now have the reusable execution engine, persistent attempt layer, adaptive routing framework, scoring, mock-library integration and Profile integration. The next build work should concentrate on surgical content calibration and expansion of these exact patterns into the remaining mocks, without recreating the architecture.
