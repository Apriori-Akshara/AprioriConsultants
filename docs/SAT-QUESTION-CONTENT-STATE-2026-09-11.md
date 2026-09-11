# Apriori Digital SAT / PSAT — Question & Quiz Content State

**Date:** September 11, 2026

## 1. Current implementation state

The project now has four live adaptive mock forms: PSAT Mock 01, PSAT Mock 02, SAT Mock 01 — Series A, and SAT Mock 02 — Series A.

The public live website is the routine student verification environment. Render remains deployment/infrastructure and does not define the product verification workflow.

**Latest changes are implemented but pending user quality verification.** The user will review all four mocks together before Mock 03 work begins.

## 2. Master content source of truth

All SAT questions, lessons, drills, exercises, quizzes, mock-test content and related learning content are governed by:

`docs/TEST-PREP-CONTENT-QUALITY-CONTROL.md`

External benchmarks are used only for structure, presentation and quality benchmarking. No third-party question, passage, answer choice, explanation, diagram or proprietary asset is copied.

## 3. Mock inventory

Initial planned inventory:

- 10 PSAT/NMSQT-aligned mocks;
- 10 SAT Series A mocks;
- 10 SAT Series B mocks.

Total: **30 full-length mocks**.

## 4. Difficulty rule

All PSAT/SAT mock content uses College Board structure/application conventions plus the project's elevated difficulty standard. The increase must come from stronger reasoning, evidence discrimination, multi-step application, tighter distractors and more sophisticated but natural SAT-style decision making.

## 5. Four live full-length mocks

All four use the same 196-question protected bank structure and deliver 98 questions per completed adaptive route.

### PSAT Mock 01

- `psat-nmsqt`
- 54 R&W + 44 Math;
- 2 timed modules per section;
- student route: `/SATMocks/PSAT1`.

### PSAT Mock 02

- `psat-nmsqt`
- independent Mock 02 bank;
- fresh R&W passage/prompt construction;
- fresh Math applications and question-specific figures;
- student route: `/SATMocks/PSAT2`.

### SAT Mock 01 — Series A

- `sat-series-a`
- 54 R&W + 44 Math;
- 2 timed modules per section;
- student route: `/SATMocks/Test1`.

### SAT Mock 02 — Series A

- `sat-series-a`
- independent Mock 02 bank;
- fresh R&W passage/prompt construction;
- fresh Math applications and question-specific figures;
- student route: `/SATMocks/Test2`.

## 6. Protected bank structure

Every mock contains:

- R&W Module 1: 27 questions;
- R&W Module 2: 81 = 27 High + 27 Standard + 27 Low;
- Math Module 1: 22 questions;
- Math Module 2: 66 = 22 High + 22 Standard + 22 Low.

A completed adaptive route delivers **54 R&W + 44 Math = 98 questions**.

## 7. Reusable adaptive mock template

Canonical execution layer:

`src/lib/sat/adaptiveMockEngine.js`

It provides mock normalization, Module-1 loading, High/Standard/Low Module-2 routing, client-safe question delivery, timing, persistence, route-aware scoring and Math figure delivery.

Current thresholds:

- High ≥75%;
- Standard 46–74%;
- Low ≤45%.

Future mocks must plug into this architecture rather than creating another runner.

## 8. Attempt and progress layer

`src/pages/api/sat/mock-progress.js` stores user ID, mock key, section/module, route, answers, completion state, scores, question position and Mark-for-Review flags in PostgreSQL.

## 9. Mock-library integration

`src/pages/SATMocks/index.js` now exposes PSAT 01, PSAT 02, SAT 01 and SAT 02 as live forms. Tests 3–10 remain reserved/premium under the existing access model.

## 10. Mock 02 content implementation

Mock 02 content is generated through:

- `src/data/sat/mockContent/stage2MockBank.js`
- `src/data/sat/mockContent/stage2PostProcess.js`
- `src/data/sat/mockContent/index.js`
- `src/data/sat/contentBank.js`

The combined quality gate now validates all four mocks together for duplicate IDs, prompts, R&W context keys and Math application fingerprints. Math answer positions are balanced before Mock 02 release validation.

The figure quality gate remains active: Math figures are question-essential and domain-compatible, while R&W questions cannot receive Math figures.

## 11. Student test-taking layer

The shared runner supports timed modules, adaptive routing, persistent answers, current-question persistence, Mark for Review, Question Navigator, Math calculator, Math reference sheet, Notes, Line Reader, Option Eliminator and zoom.

## 12. Quality verification status — PENDING

The four-mock build is **not yet quality-approved**.

The user will review the four live forms together for:

- question correctness and explanations;
- originality and non-repetition;
- R&W passage/question quality;
- Math calculation quality;
- figure relevance and mathematical consistency;
- adaptive route behavior;
- calculator/reference/tools;
- timer, navigation, flagging and persistence;
- desktop/mobile presentation;
- meaningful differentiation between Mock 01 and Mock 02.

No Mock 03 work should begin until this verification is complete or the user explicitly authorizes proceeding.

## 13. Current resume point

**Next action: user quality review of all four live mocks.** After that, make only targeted corrections to concrete issues discovered during review. Do not rebuild the mock engine or repeat completed infrastructure work.
