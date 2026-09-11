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
- no cross-mock duplicate Math application fingerprint;
- concepts and skills may repeat only when the application, setup, reasoning path and item construction are materially different.

The combined PSAT/SAT bank must be validated as one pair before release. A mock may not pass its own QC check and then bypass the paired-bank QC check.

Every question receives a stable originality fingerprint plus context/application fingerprints, and the combined content bank is checked for duplicate IDs, repeated R&W prompts/contexts and repeated Math application fingerprints before the bank is accepted.

## 2. Verbal anti-cheat rule

A student must never be able to identify the correct R&W answer reliably from answer-choice length, grammatical complexity, vocabulary sophistication, or sentence complexity.

Therefore:

- correct and incorrect choices must be approximately balanced in length for meaning-based questions;
- no correct answer may systematically be the longest or most elaborate choice;
- no correct answer may be the uniquely longest choice in a meaning-based R&W item;
- no distractor may be deliberately shorter merely to make the correct choice look more complete;
- wording complexity must reflect the reasoning task, not the correct/incorrect status;
- the correct-answer position must be deliberately balanced across A-D rather than patterned predictably;
- answer choices must be independently plausible before the text/evidence is considered;
- the content bank quality gate must reject materially unbalanced choice lengths and answer-position concentration.

The correct answer must be identifiable only by understanding the passage/notes and applying the relevant skill.

## 3. Adaptive pool rule

Each 98-question delivered mock uses a larger protected bank:

- R&W Module 1: 27 operational questions;
- R&W Module 2: 81 questions = 27 High + 27 Standard + 27 Low;
- Math Module 1: 22 operational questions;
- Math Module 2: 66 questions = 22 High + 22 Standard + 22 Low.

The student still receives 54 R&W + 44 Math = 98 questions.

Module 2 is selected from an exact route pool. The adaptive engine is not permitted to silently fill a missing route with questions from another route.

## 4. Question-type rule

Math must include both multiple-choice and student-produced-response items. Student-produced-response records expose no answer-choice set to the client and store a numeric answer format in metadata.

## 5. Routing rule

Module 1 performance determines Module 2 route:

- High: 75% or higher;
- Standard: 46%–74%;
- Low: 45% or lower.

The execution architecture is shared by PSAT Mock 01, SAT Mock 01 and all future mocks.

## 6. Current Stage 1 completion status

The implementation architecture is complete, but **Stage 1 is not considered closed until the current content bank passes a clean production build**.

The current failed build exposed content-QC defects that must be cleared before closure:

- R&W answer-length imbalance in Rhetorical Synthesis items;
- duplicate Math prompts in the prior generated bank;
- answer-key position imbalance;
- cross-mock duplicate/context risk in the previous generator;
- the Profile `align-items: end` CSS compatibility warning.

The surgical replacement now addresses those defects through:

- a dedicated duplicate-safe mock content engine;
- balanced Rhetorical Synthesis and Cross-Text answer choices;
- deterministic A-D answer-position balancing;
- paired PSAT/SAT cross-mock duplicate checks;
- unique verbal context allocation across the complete 216-question paired R&W bank;
- unique Math application fingerprints across the complete 176-question paired Math bank;
- four Math student-produced-response items per mock;
- the Profile CSS compatibility fix.

Stage 1 closes only after those rules are incorporated and the resulting build is green.

## 7. Future paired-build rule

After student verification of this pair, future mock development proceeds in pairs:

**one PSAT + one SAT**

using the same approved execution, persistence, scoring, dashboard and QC architecture.

Only new content authoring, route calibration, figures/data displays, and test-specific metadata should change unless a genuine product requirement is discovered.

Future pairs must pass the same paired-bank duplicate, verbal anti-cheat, answer-position, Math application and adaptive-pool gates before being marked complete.
