# Apriori Digital SAT / PSAT — Question & Quiz Content State

**Date:** September 11, 2026

## 1. Current implementation state

The project now has four live adaptive mock forms: PSAT Mock 01, PSAT Mock 02, SAT Mock 01 — Series A, and SAT Mock 02 — Series A.

The public live website is the routine student verification environment. Render remains deployment/infrastructure and does not define the product verification workflow.

**Current status: implementation is working; question-by-question quality verification is still pending.** The user has confirmed that the other major features appear to be working correctly. The observation-count filler display issue has been corrected at the shared student-facing prompt-delivery layer for all four mocks.

**Important:** Do not interpret feature-level verification as question-level quality approval. Every question in all four existing mocks still requires question-by-question review before the four-mock content milestone is marked fully approved.

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

## 10. Mock 02 and shared QC implementation

Mock 02 content is generated through:

- `src/data/sat/mockContent/stage2MockBank.js`
- `src/data/sat/mockContent/stage2PostProcess.js`
- `src/data/sat/mockContent/index.js`
- `src/data/sat/contentBank.js`

The combined quality gate validates all four mocks together for duplicate IDs, prompts, R&W context keys and Math application fingerprints. Math answer positions are balanced before release validation.

The figure quality gate remains active: Math figures are question-essential and domain-compatible, while R&W questions cannot receive Math figures.

The shared student-facing prompt sanitizer now removes the obsolete observation-count filler from all four mock forms, including cases where the filler is not the final sentence of a prompt.

## 11. Student test-taking layer

The shared runner supports timed modules, adaptive routing, persistent answers, current-question persistence, Mark for Review, Question Navigator, Math calculator, Math reference sheet, Notes, Line Reader, Option Eliminator and zoom.

## 12. Quality verification status — PENDING

The four-mock build is **implemented and operational, but not yet quality-approved**.

The remaining verification is explicitly **question-by-question** across all four mocks. Review must cover:

- correctness of every question and answer;
- explanation correctness and usefulness;
- originality and non-repetition;
- R&W passage/question quality;
- Math calculation quality;
- figure relevance and mathematical consistency;
- adaptive route behavior;
- calculator/reference/tools;
- timer, navigation, flagging and persistence;
- desktop/mobile presentation;
- meaningful differentiation between Mock 01 and Mock 02.

The user has also confirmed that the broader feature set appears to be working correctly. That does not replace the pending question-by-question review.

## 13. Unlock verification sequence

After the next Mock 03 pair is created, the user will test the internal unlock mechanism. This is deliberately scheduled after Mock 03 pair creation so that the unlock logic can be exercised against the expanded mock inventory rather than interrupting the current content-build sequence.

The unlock verification must include the intended internal unlock controls for PSAT/SAT Tests 8–10 and the separate SAT Tests 11–20 progression rule after the required completion condition is met.

## 14. Paired-build operating rule for future mocks

The project must now prioritize **speed with controlled repeatability**. The standard build unit is a PSAT + SAT pair, but the implementation may be completed one mock at a time when necessary.

When a pair is built:

1. reuse the existing adaptive runner, access model, persistence, scoring, QC gates and figure-validation architecture;
2. build the first mock to completion with its content, route pools, metadata and visual/functional integration;
3. validate the first mock's structural and content gates immediately;
4. build the paired mock using the same architecture but genuinely independent authored content;
5. run the combined cross-mock QC gate before release;
6. deploy the pair as one coherent milestone when possible;
7. keep question-by-question verification as a separate user-quality phase rather than delaying implementation unnecessarily.

If one mock must be completed before the other, do not create a new architecture or wait for the entire pair to be manually verified before progressing. The first mock may be implemented and structurally validated, then the second mock added using exactly the same controlled pattern.

## 15. Pace-with-accuracy rule

Future work should move in cohesive batches with minimal backtracking:

**Content design → structural/QC validation → shared runner integration → deployment → user verification → targeted corrections.**

Do not sacrifice duplicate controls, answer-quality controls, figure validation, adaptive-pool integrity or originality merely to increase output speed.

Do not repeat completed infrastructure work unless a real defect requires it.

## 16. Current resume point

**Immediate priority:** finish the next Mock 03 PSAT + SAT pair using the established architecture and QC pipeline.

**Mandatory pending verification:** question-by-question review of the four existing mocks remains open.

**Planned next verification:** after Mock 03 pair creation, test the internal unlock mechanism.

No new architecture should be introduced for Mock 03 unless an actual requirement cannot be met by the existing shared system.
