# Apriori Test-Prep — Content Control State

**Date:** September 11, 2026

## Current status

The SAT/PSAT student-facing mock area is now expanded to four live mock forms: PSAT Mock 01, PSAT Mock 02, SAT Mock 01 — Series A, and SAT Mock 02 — Series A.

The public live site is the routine student verification environment. Render remains the deployment/infrastructure and diagnostic environment.

**Latest Mock 02 changes are implemented and deployed, but are explicitly pending student quality verification.** The user will review all four live mocks together before Mock 03 work begins.

## Master content-quality source of truth

The single governing document for all SAT, GRE and GMAT learning content remains:

`docs/TEST-PREP-CONTENT-QUALITY-CONTROL.md`

No College Board, competitor or third-party question, passage, answer choice, explanation or proprietary asset is copied into Apriori content.

## Mock program

Initial target:

- 10 PSAT/NMSQT-aligned mocks;
- 10 SAT mocks — Series A;
- 10 SAT mocks — Series B.

Total initial full-length mock inventory: **30 mocks**.

Future mock pairs must reuse the existing execution, persistence, scoring, access-control and QC architecture. New work should be limited to content, route calibration, figures/data displays and test-specific metadata unless a genuine product requirement requires an architectural change.

## Four-mock implementation state

Each delivered mock contains a protected bank of **196 questions**:

- R&W Module 1: 27;
- R&W Module 2: 81 = 27 High + 27 Standard + 27 Low;
- Math Module 1: 22;
- Math Module 2: 66 = 22 High + 22 Standard + 22 Low.

A completed adaptive route delivers **54 R&W + 44 Math = 98 questions**.

### PSAT Mock 01

- Assessment: `psat-nmsqt`
- Student route: `/SATMocks/PSAT1`
- Original content
- Figure-aware Math delivery
- Adaptive routing and persistent attempts

### PSAT Mock 02

- Assessment: `psat-nmsqt`
- Student route: `/SATMocks/PSAT2`
- Independent Mock 02 bank
- Fresh R&W passages/prompts and Math applications
- Question-specific Math figures
- Included in the same four-mock duplicate/QC gate

### SAT Mock 01 — Series A

- Assessment: `sat-series-a`
- Student route: `/SATMocks/Test1`
- Original content
- Figure-aware Math delivery
- Adaptive routing and persistent attempts

### SAT Mock 02 — Series A

- Assessment: `sat-series-a`
- Student route: `/SATMocks/Test2`
- Independent Mock 02 bank
- Fresh R&W passages/prompts and Math applications
- Question-specific Math figures
- Free-test access remains controlled by the existing Tests 1–2 rule

## Reusable Mock 02 implementation

Mock 02 uses:

- `src/data/sat/mockContent/stage2MockBank.js`
- `src/data/sat/mockContent/stage2PostProcess.js`
- `src/data/sat/mockContent/index.js`
- `src/lib/sat/adaptiveMockEngine.js`
- `src/data/sat/mockContent/mockContentQualityGate.js`
- `src/data/sat/contentBank.js`
- the existing shared `/SATMocks/[testId]` runner

The series quality gate now validates all four mocks together for duplicate IDs, duplicate prompts, repeated R&W context keys and repeated Math application fingerprints. Math answer positions are rebalanced before the Mock 02 release gate.

The figure quality gate remains active. Math figures must be question-essential, domain-compatible and question-specific; R&W questions cannot receive Math figures.

## Access and student-facing library

Tests 1–2 remain free after the existing verified-student flow. Tests 3–10 remain premium. The Mock Library now exposes PSAT 01, PSAT 02, SAT 01 and SAT 02 as live forms while preserving the reserved future slots for Tests 3–10.

## Verification status — IMPORTANT

**PENDING VERIFICATION:**

The latest four-mock build has not yet received the user's full quality review. Verification will be performed on the public live website after all four forms are online.

The review should cover, at minimum:

- originality and non-repetition across the four forms;
- passage/question quality and answer correctness;
- Math calculations and explanations;
- relevance and usefulness of every displayed figure;
- R&W absence of inappropriate Math visuals;
- adaptive Module 2 route behavior;
- calculator/reference/tools behavior;
- Mark for Review and Question Navigator;
- persistence/resume behavior;
- timing and section transitions;
- mobile and desktop presentation;
- Mock 01 and Mock 02 consistency without making them feel like copies.

**Do not mark the four-mock content milestone as quality-approved until this verification is complete.**

## Next build rule

No Mock 03 content generation begins until the four-mock verification is complete and concrete issues, if any, have been corrected. After approval, the same paired implementation pattern will be reused for the next PSAT + SAT pair.

## Foundation and Advanced timing rule

Foundation remains **5 × 10 = 50 questions** per exercise/drill and Advanced remains **10 × 20 = 200 questions** per exercise/drill. Their creation remains deferred until the mock milestone specified by the project plan.
