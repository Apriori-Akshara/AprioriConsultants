# SAT/PSAT Mock Quality Addendum — Four-Mock Verification Gate

**Date:** September 11, 2026  
**Scope:** PSAT Mock 01, PSAT Mock 02, SAT Mock 01 — Series A, SAT Mock 02 — Series A  
**Authority:** This addendum supplements `docs/TEST-PREP-CONTENT-QUALITY-CONTROL.md` and is authoritative for the current four-mock milestone until superseded.

## 1. Current milestone

Four student-facing mock forms are now implemented through the same adaptive execution architecture. Mock 02 was added as a reusable paired build rather than as a second test implementation.

**Status: IMPLEMENTED / OPERATIONAL — PENDING QUESTION-BY-QUESTION USER QUALITY VERIFICATION.**

The user has indicated that the other major features appear to be working correctly. This does not constitute question-level approval. Every question in all four mocks remains subject to manual verification.

The observation-count filler display issue has been corrected in the shared student-facing delivery layer for all four mocks.

## 2. Zero-duplication rule

Across the four-mock bank:

- no duplicate question IDs;
- no duplicate R&W prompts;
- no repeated R&W context keys;
- no repeated Math application fingerprints;
- no cross-mock duplicate prompt;
- concepts and skills may repeat only when the application, setup, reasoning path and item construction are materially different.

The combined four-mock bank is validated as one release set rather than allowing each mock to pass independently and bypass cross-mock controls.

## 3. Verbal anti-cheat rule

Correct R&W answers must not be reliably identifiable from length, grammatical complexity, vocabulary sophistication or sentence complexity. Correct-answer positions are deliberately distributed across A-D.

## 4. Adaptive pool rule

Each mock protects the same reusable bank structure:

- R&W Module 1: 27;
- R&W Module 2: 27 High + 27 Standard + 27 Low;
- Math Module 1: 22;
- Math Module 2: 22 High + 22 Standard + 22 Low.

A completed route delivers 98 questions: 54 R&W + 44 Math.

## 5. Math figure rule

Figures are Math-only and must be question-essential. Figure type must match the Math domain. R&W questions must not receive Math figures. Question-specific visual variants prevent the previous exact-signature failure from recurring while preserving authored figure relevance.

## 6. Mock 02 implementation rule

PSAT Mock 02 and SAT Mock 02 use the same:

- `adaptiveMockEngine.js`;
- shared student runner;
- attempt persistence/scoring endpoint;
- access-control model;
- content-bank contract;
- figure quality gate;
- duplicate/QC gate.

Only the authored content, question IDs, application fingerprints, route pools and test-specific metadata change.

## 7. Historical failure prevention

The earlier Stage 1 failure modes remain explicitly blocked:

- duplicate IDs;
- answer-length clues;
- answer-position imbalance;
- cross-mock Math application duplication;
- irrelevant/generated figures;
- duplicate figure signatures that cause a production build to fail;
- student-visible generated/internal observation-count filler.

A future mock pair must pass the same combined release gates before being exposed as live.

## 8. Final four-mock verification gate

The following remain **pending user verification** on the public live website:

1. question-by-question correctness and answer keys;
2. explanation correctness and usefulness;
3. originality/non-repetition across all four forms;
4. R&W passage quality;
5. Math calculation quality;
6. figure relevance and usefulness;
7. adaptive routing behavior;
8. timer, navigator, Mark for Review and persistence;
9. calculator/reference/tools;
10. responsive desktop/mobile UI;
11. consistency of the shared architecture without making Mock 02 feel like a copy of Mock 01.

Mock 03 work may proceed as the next planned build milestone, but the four-mock content milestone must remain marked **pending question-by-question verification** until the user's review is complete.

## 9. Next-pair release protocol

Mock 03 should be developed as the next PSAT + SAT pair using the existing shared architecture. The implementation may be performed one mock at a time where that increases throughput, but the same QC controls must remain active.

Required sequence:

**Mock 03 PSAT → structural/QC validation → Mock 03 SAT → combined QC across the expanded inventory → deployment → user verification.**

Do not create a parallel runner, duplicate persistence layer, or bypass the combined content gates.

## 10. Unlock verification checkpoint

After the Mock 03 pair is created, the user will test the internal unlock mechanism.

This checkpoint is intended to verify:

- internal unlock of PSAT/SAT Tests 8–10;
- separate SAT Tests 11–20 unlock path;
- the required completion condition covering Tests 1–10 for both PSAT and SAT before SAT Tests 11–20 may be unlocked.

This checkpoint is recorded as a planned verification activity and is not to be treated as already passed.
