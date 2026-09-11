# SAT/PSAT Mock Quality Addendum — Four-Mock Verification Gate

**Date:** September 11, 2026  
**Scope:** PSAT Mock 01, PSAT Mock 02, SAT Mock 01 — Series A, SAT Mock 02 — Series A  
**Authority:** This addendum supplements `docs/TEST-PREP-CONTENT-QUALITY-CONTROL.md` and is authoritative for the current four-mock milestone until superseded.

## 1. Current milestone

Four student-facing mock forms are now implemented through the same adaptive execution architecture. Mock 02 was added as a reusable paired build rather than as a second test implementation.

**Status: IMPLEMENTED — PENDING USER QUALITY VERIFICATION.**

The user will review all four live forms together before Mock 03 is started.

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
- duplicate figure signatures that cause a production build to fail.

A future mock pair must pass the same combined release gates before being exposed as live.

## 8. Final four-mock verification gate

The following remain **pending user verification** on the public live website:

1. question correctness and explanations;
2. originality/non-repetition across all four forms;
3. R&W passage quality;
4. Math calculation quality;
5. figure relevance and usefulness;
6. adaptive routing behavior;
7. timer, navigator, Mark for Review and persistence;
8. calculator/reference/tools;
9. responsive desktop/mobile UI;
10. consistency of the shared architecture without making Mock 02 feel like a copy of Mock 01.

Mock 03 work must not begin until this gate is cleared or the user explicitly authorizes proceeding despite an identified issue.
