# Batch M Deep Content-Quality Independent Review Checkpoint — 2026-09-17

## 1. Purpose

Record completion of the independent, candidate-only substantive review stage after controlled selection of the 299 Batch M remediation candidates.

## 2. Implementation

Added and executed:

- `scripts/runBatchMDeepContentQualityIndependentReview.mjs`
- `.github/workflows/batch-m-deep-content-quality-independent-review.yml`
- npm command: `npm run qc:batch-m-deep-content-quality-independent-review`

The workflow consumed the successful candidate-selection artifact from workflow run `35194288337` and completed successfully in workflow run `35194761476`.

## 3. Review result

All **299 selected candidates** were reviewed against independent substantive gates.

- PASS: **0**
- FAIL: **298**
- Expert review required: **1**
- Decision: **HOLD_FOR_REVIEW_AND_REMEDIATION**
- Production mutation: **false**
- Release eligible: **false**
- SAT21 created: **false**

The review therefore does **not** authorize controlled replacement.

## 4. Main findings

- Missing Math distractor-construction architecture: **258** candidates.
- Weak hard-Math multi-step reasoning signals: **250** candidates.
- Semantic prompt-template clusters above the review threshold: **267** candidates.
- Repeated prompt/choice construction clusters: **267** candidates.
- Generic stock explanations: **30** candidates.
- Answer/explanation alignment requiring expert review: **31** candidates.
- Weak question-form detection: **9** candidates.

These findings are overlapping; counts do not represent unique candidates.

The exact normalized prompt check found **0** exact duplicate groups, so the primary diversity problem is structural/template repetition rather than literal prompt duplication.

## 5. Interpretation

The candidate-generation and candidate-selection stages successfully produced a reviewable candidate set, but the independent substantive review shows that the screened candidates are **not yet suitable for controlled replacement**. The largest remaining problems are substantive Math construction/reasoning quality and large-scale structural/template repetition.

The single expert-review item is `SAT4-BATCHM-DQ-0004` (Words in Context). It has no automated failure but its explanation/answer alignment cannot be established reliably by deterministic checks, so it remains on hold pending expert review.

## 6. Production boundary

No production question was replaced, modified, deleted, or released by this stage. Production remains frozen.

## 7. Historical next logical step

The original next step recorded in this checkpoint was targeted remediation of the failed/unresolved 299-candidate classes. That remediation and its subsequent independent re-review were later completed candidate-first; the single held Words-in-Context candidate was separately repaired and independently reviewed successfully.

This checkpoint is therefore a historical record of the 299-candidate review stage, not the current active work queue.

## 8. Current active stage after subsequent remediation

The current active workflow is a separate **195-candidate Reading & Writing calibration reconciliation**. Candidate generation completed successfully in run `35212907193` with 195 unique, quality-passing SEC candidates and no hypothetical new calibration failures.

The independent reconciliation review run `35213306538` is currently **FAILED** before substantive review can complete because `BATCH-M-CAL-SEC-001` carries an assessment variant that does not match the variant assigned to its production test.

The target-lock workflow has already been implemented but correctly waits for a successful independent review.

## 9. Exact current next step

Fix the candidate generator's production-test metadata mapping so `assessmentVariant` and related assessment metadata are copied from the same `BATCH_M_PRODUCTION_SEQUENCE` entry as the candidate's `productionTestId`. Regenerate/revalidate the 195-candidate package, rerun independent review, and then permit the existing target-lock workflow to run only after review PASS.

Do not weaken or remove the assessment-variant compatibility gate. Do not authorize production mutation during this repair. Production remains frozen and SAT21 must not be created.
