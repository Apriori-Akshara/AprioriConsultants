# Apriori Test-Prep — Content Control State

**Date:** September 11, 2026

## Current status

The SAT/PSAT student-facing mock area is now expanded to four live mock forms: PSAT Mock 01, PSAT Mock 02, SAT Mock 01 — Series A, and SAT Mock 02 — Series A.

The public live site is the routine student verification environment. Render remains the deployment/infrastructure and diagnostic environment.

**Current status: operational feature set is working, but question-by-question verification of all four mocks is still pending.** The recently identified observation-count filler issue has been removed from the student-facing delivery layer for all four forms. The user has reported that the other major features appear to be working correctly.

Feature-level success must not be treated as final content approval. Every question still requires question-by-question review for correctness, quality, originality and presentation.

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

The shared student-facing prompt sanitizer removes the obsolete observation-count filler from all four mocks, including when the filler occurs within rather than at the end of a prompt.

## Access and student-facing library

Tests 1–2 remain free after the existing verified-student flow. Tests 3–10 remain premium. The Mock Library exposes PSAT 01, PSAT 02, SAT 01 and SAT 02 as live forms while preserving the reserved future slots.

## Verification status — IMPORTANT

**PENDING VERIFICATION:**

The four-mock build has not yet received the user's full question-by-question quality review. Verification will be performed on the public live website after all four forms are online.

The review should cover, at minimum:

- every question's correctness and answer key;
- every explanation's correctness and usefulness;
- originality and non-repetition across the four forms;
- passage/question quality;
- Math calculations;
- relevance and usefulness of every displayed figure;
- R&W absence of inappropriate Math visuals;
- adaptive Module 2 route behavior;
- calculator/reference/tools behavior;
- Mark for Review and Question Navigator;
- persistence/resume behavior;
- timing and section transitions;
- mobile and desktop presentation;
- meaningful differentiation between Mock 01 and Mock 02.

**Do not mark the four-mock content milestone as quality-approved until this question-by-question verification is complete.**

## Unlock verification sequence

After the Mock 03 PSAT + SAT pair is created, the user will test the internal unlock mechanism. This keeps the verification sequence aligned with the expanded mock inventory.

The unlock test must cover the intended internal unlock of PSAT/SAT Tests 8–10 and the separate SAT Tests 11–20 progression rule after the required Tests 1–10 completion condition is satisfied.

## Future paired-build protocol — SPEED WITH CONTROL

The standard build unit is a **PSAT + SAT pair**, because this gives a coherent content, architecture and QC milestone. However, the implementation may proceed one mock at a time when that is faster or technically cleaner.

### For each new pair

1. Reuse the existing adaptive runner, persistence, scoring, access control, figure validation and combined QC gates.
2. Build one mock completely when needed: authored content, question IDs, route pools, metadata and student-facing integration.
3. Run structural/content QC immediately; do not allow known failures to accumulate into the second mock.
4. Build the paired mock with genuinely independent authored content using the same controlled architecture.
5. Run the combined cross-mock release gate across both new mocks and the existing inventory.
6. Deploy the coherent pair milestone when possible.
7. Keep manual question-by-question verification as a separate user-quality pass so development can continue at pace without weakening automated controls.

### Non-negotiable quality controls

Do not remove or weaken controls for speed. Every future mock must retain:

- duplicate ID detection;
- cross-mock prompt/context/application duplication detection;
- answer-position balancing;
- explanation/answer integrity checks;
- figure relevance and mathematical consistency checks;
- adaptive pool-count integrity;
- student-facing sanitization of internal/generated text;
- build-time quality gates.

## Priority before tomorrow's continuation

**Urgent / mandatory:**

1. Preserve the current four-mock build exactly as the verified implementation baseline; do not rewrite working architecture for Mock 03.
2. Keep the four-mock question-by-question verification explicitly open in the records.
3. Do not start a separate infrastructure or authentication rebuild.
4. Treat the Mock 03 pair as the next implementation milestone.
5. After Mock 03 is live, execute the planned internal unlock verification before expanding the build sequence further if the results are needed to validate the wider access model.

No other urgent documentation or architecture change is required before resuming mock-pair creation. The key requirement is to follow this controlled, repeatable paired-build process while allowing one-mock-at-a-time implementation when it improves throughput.

## Next build rule

Begin Mock 03 only from the current repository state and existing architecture. Do not repeat completed authentication, database, shared-runner, figure-gate or previous mock-build work.

The next work cycle should therefore be:

**Mock 03 PSAT → structural/QC validation → Mock 03 SAT → combined QC → deployment → user verification → continue to the next pair.**

If the pair must be split operationally, retain the same order and gates rather than inventing a parallel implementation.

## Foundation and Advanced timing rule

Foundation remains **5 × 10 = 50 questions** per exercise/drill and Advanced remains **10 × 20 = 200 questions** per exercise/drill. Their creation remains deferred until the mock milestone specified by the project plan.
