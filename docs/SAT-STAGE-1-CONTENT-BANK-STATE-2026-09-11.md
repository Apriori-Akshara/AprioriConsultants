# SAT Stage 1 — Content Bank & Assessment Infrastructure State

**Date:** September 11, 2026  
**Status:** Stage 1 foundation implemented

## 1. Stage naming

The question/content implementation sequence is now managed as numbered **Stages**, not Q1/Q2 labels.

Current stage:

**STAGE 1 — Question Bank Foundation and Validation Infrastructure**

## 2. Implemented Stage 1 files

Created:

- `src/data/sat/assessmentCatalog.js`
- `src/data/sat/activityBlueprint.js`
- `src/data/sat/contentBank.js`
- `src/lib/sat/contentValidation.js`

The existing technical SAT question schema remains the runtime contract. The master content-quality document remains the governing source of truth for content acceptance.

## 3. Assessment inventory

The content architecture now supports:

- 10 PSAT/NMSQT-aligned mocks;
- 10 SAT Series A mocks;
- 10 SAT Series B mocks.

Total planned full-length mock inventory: **30**.

The current visible route may remain `/SATMocks` until a later deliberate UI/route migration. The content taxonomy does not depend on the route name.

## 4. Foundation activity rule

Every Foundation exercise/drill:

- 5 sets;
- 10 questions per set;
- 50 questions total;
- major difficulty jump after every set;
- progression bands `foundation-set-01` through `foundation-set-05`.

Both timed and non-timed modes are supported.

## 5. Advanced activity rule

Every Advanced exercise/drill:

- 10 sets;
- 20 questions per set;
- 200 questions total;
- major difficulty jump after every set;
- progression bands `advanced-set-01` through `advanced-set-10`.

## 6. Timing rule

Timed activities have a hard timeout based on the relevant assessment/section average time per question.

Current SAT baseline:

- Reading & Writing: 64 minutes / 54 questions ≈ 71 seconds/question;
- Math: 70 minutes / 44 questions ≈ 95 seconds/question.

Non-timed activities never time out, but elapsed time is recorded for pacing analytics.

Mixed-section activities must calculate timing from the individual question's section rather than use one universal timeout.

## 7. Calculator rule

PSAT/SAT Math content is authored with calculator-aware metadata. The eventual student interface must provide the integrated calculator environment throughout Math, including scientific and graphing capability appropriate to the assessment standard.

Question metadata distinguishes calculator eligibility, mode and whether calculator use is genuinely required.

## 8. Central content-bank rule

`src/data/sat/contentBank.js` is the central SAT/PSAT content manifest/index.

It keeps questions, passages, lessons and mock manifests separate from the runtime architecture so that normal content changes do not require structural application changes.

## 9. Validation rule

`src/lib/sat/contentValidation.js` provides validation for:

- assessment family/variant;
- section/module;
- difficulty and progression bands;
- question type and stimulus;
- calculator mode;
- Foundation/Advanced set quantities;
- timed/non-timed activity rules;
- release eligibility.

Content remains unpublished until it satisfies the master QC gates.

## 10. Important limitation at this stage

Stage 1 establishes the **content infrastructure and controls**. It does not claim that the 30 mock forms or the complete Foundation/Advanced question banks have been authored yet.

The actual original question authoring begins only after this content structure is in place and will proceed through the master QC process.

## 11. Next stage

**STAGE 2 — First complete PSAT/SAT demonstration content set**

The next stage will use this content-bank structure to author the first fully validated question/lesson set while preserving the existing site, authentication, access-control and dashboard implementation.
