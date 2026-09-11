# SAT/PSAT Mock Quality Addendum — Surgical Stage 1 Closure

**Date:** September 11, 2026
**Scope:** PSAT Mock 01 and SAT Mock 01 — Series A
**Authority:** This addendum supplements `docs/TEST-PREP-CONTENT-QUALITY-CONTROL.md` and is authoritative for the Stage 1 mock prototypes until superseded.

## 1. Zero-duplication rule

For the two Stage 1 mocks:

- no repeated R&W question;
- no repeated R&W passage/context;
- no repeated Math question;
- no Math question that is a trivial numerical substitution of another item;
- no cross-mock duplicate context or duplicate prompt;
- concepts and skills may repeat only when the application, setup, reasoning path and item construction are materially different.

Every question receives a stable originality fingerprint and the combined content bank is checked for duplicate IDs and repeated R&W prompts/contexts before the bank is accepted.

## 2. Verbal anti-cheat rule

A student must never be able to identify the correct R&W answer reliably from answer-choice length, grammatical complexity, vocabulary sophistication, or sentence complexity.

Therefore:

- correct and incorrect choices must be approximately balanced in length for meaning-based questions;
- no correct answer may systematically be the longest or most elaborate choice;
- no distractor may be deliberately shorter merely to make the correct choice look more complete;
- wording complexity must reflect the reasoning task, not the correct/incorrect status;
- the correct-answer position must not form a predictable pattern;
- answer choices must be independently plausible before the text/evidence is considered;
- the content bank quality gate rejects materially unbalanced choice lengths and excessive answer-position concentration.

The correct answer must be identifiable only by understanding the passage/notes and applying the relevant skill.

## 3. Adaptive pool rule

Each 98-question delivered mock uses a larger protected bank:

- R&W Module 1: 27 operational questions;
- R&W Module 2: 81 questions = 27 High + 27 Standard + 27 Low;
- Math Module 1: 22 operational questions;
- Math Module 2: 66 questions = 22 High + 22 Standard + 22 Low.

The student still receives 54 R&W + 44 Math = 98 questions.

Module 2 is selected from an exact route pool. The adaptive engine is not permitted to silently fill a missing route with questions from another route.

## 4. Routing rule

Module 1 performance determines Module 2 route:

- High: 75% or higher;
- Standard: 46%–74%;
- Low: 45% or lower.

The execution architecture is shared by PSAT Mock 01, SAT Mock 01 and all future mocks.

## 5. Stage 1 release requirement

The following are considered complete for the first PSAT/SAT pair:

- content-bank structure;
- original question pool;
- cross-mock duplicate protection;
- R&W anti-length/complexity cheat protection;
- adaptive High/Standard/Low pools;
- strict adaptive-pool integrity;
- attempt persistence;
- secure answer storage;
- route-aware scoring;
- dashboard integration;
- Profile progress integration;
- documentation of the reusable mock template.

No further Stage 1 architecture work is required before the next paired mock build.

## 6. Future paired-build rule

After student verification of this pair, future mock development proceeds in pairs:

**one PSAT + one SAT**

using the same approved execution, persistence, scoring, dashboard and QC architecture.

Only new content authoring, route calibration, figures/data displays, and test-specific metadata should change unless a genuine product requirement is discovered.
