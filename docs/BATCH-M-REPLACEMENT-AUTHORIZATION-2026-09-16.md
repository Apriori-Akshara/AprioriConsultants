# Batch M Controlled Replacement Authorization — September 16, 2026

**Authorization state:** `AUTHORIZED`
**Scope:** affected SAT1–SAT10 and PSAT1–PSAT10 records identified by the existing Batch M targeted replacement preparation and candidate-selection artifacts only.
**Production mutation:** authorized for the controlled replacement operation only; downstream release eligibility remains false until all required gates pass.
**SAT11–SAT20:** outside replacement scope; public verification remains deferred.
**SAT21:** prohibited.

## Owner authorization

The project owner explicitly instructed in the project conversation:

> “I authorize the controlled replacement. Proceed.”

This is the authorization required by the Batch M replacement gate. It does not waive individual candidate-quality, uniqueness/originality, mathematical, mock-level, corpus-level, calibration, public-verification, or final release gates.

## Required replacement controls

- Use the deterministic selected candidates from `docs/BATCH-M-TARGETED-CANDIDATE-SELECTION-2026-09-15.json`.
- Replace only records whose selected disposition is eligible for controlled downstream approval.
- Record every actual post-freeze change by exact `testKey + questionId` and replacement disposition.
- Preserve unaffected production records.
- Do not regenerate the corpus wholesale.
- Do not alter authentication, subscription, payment, navigation, or unrelated application code.
- Do not create SAT21.

## Pre-authorization evidence

The latest candidate-selection checkpoint reports 2,144 affected records, 1,594 selected candidates, 0 no-eligible records, 1,071 SAT targets, and 1,073 PSAT targets. Candidate-pool quality passed for 13,000 SAT candidates and 13,000 PSAT candidates. These figures establish candidate coverage; they do not by themselves establish release eligibility.

## Next action

Implement the controlled replacement operation on this branch, then run the documented affected-mock and downstream Batch M gates before any release promotion.
