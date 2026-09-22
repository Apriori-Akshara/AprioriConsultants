# Batch M Replacement Package Checkpoint — 2026-09-22

## Implemented

The next Batch M control has been implemented and hardened on `main`:

- `scripts/runBatchMDeepContentQualityReplacementPackage.mjs`
- `scripts/runBatchMDeepContentQualityCanonicalNormalization.mjs`
- `scripts/runBatchMDeepContentQualityIndependentReview.mjs`
- `scripts/runBatchMDeepContentQualityReplacementPackageFinalValidation.mjs`
- `.github/workflows/batch-m-canonical-replacement-package.yml`

The package builder consumes the exact current 25-candidate selection and independent-review artifacts, indexes the frozen canonical 30-mock production corpus, proposes deterministic existing targets, and records candidate/target compatibility.

## Safety boundary

This stage is candidate-only:

- production mutation: **false**
- release eligible: **false**
- SAT21 created: **false**
- automatic replacement: **false**
- explicit production authorization: **required**

The validation path intentionally does not silently rewrite candidate metadata to make a candidate appear canonical-compatible. Canonical normalization records the deterministic target-resolution method/source index and a SHA-256 of the target's canonical metadata; final validation checks protected operational metadata and figure type/shape compatibility.

## Current finding / resolution

The current 25 generic candidates did not carry exact canonical production metadata for all target families. The candidate-only normalization stage now resolves the documented assessment/skill-label differences with strict mappings:

- scatterplot interpretation → Data models
- equivalent exponential representations → Exponential equations
- right-triangle relationships → Right triangles
- linear relationships → Linear functions

The normalized artifact remains candidate-only. The final validator now rejects incomplete target identity, duplicate targets/candidates, stale review artifacts, operational metadata drift, figure mismatch, and other replacement-integrity violations rather than allowing them to pass into an authorization decision.

## Decision

**CANONICAL NORMALIZATION IMPLEMENTED + PACKAGE VALIDATION HARDENED — FRESH CI RESULT PENDING VERIFICATION**

The candidate-only canonical-normalization stage is now implemented. It resolves deterministic existing production targets and copies canonical structural metadata into normalized candidates without mutating production. A fresh independent substantive review must pass after normalization, followed by final hypothetical replacement-package validation.

A validation-path defect was also identified and corrected: the final package validator now resolves production mocks from their canonical `SAT1`/`PSAT1`/`SAT11`-style `testKey` through `BATCH_M_PRODUCTION_SEQUENCE` when the runtime mock only carries a `testId`. This prevents false target-not-found results.

A second control issue was corrected: the fresh independent review previously retained the September 17 artifact date even when reviewing the normalized September 22 candidates. Review artifacts now derive their date from the input artifact, and final validation requires the review to identify the normalized 2026-09-22 artifact.

The package validator also now checks exact canonical operational fields (`timingMode`, calculator/reference-sheet controls, adaptive routing, etc.), target metadata integrity, figure type/shape, unique candidate/target identity, and mapping consistency.

No production replacement should be authorized or executed until that package validation is clean.

## Validation-path correction

- Final package validator correction commit: `dc59e553902b717c18f106ffebcd21f659c26060`.
- Correction: map runtime production `testId` values to canonical Batch M `testKey` values before exact target lookup.
- Production mutation: **false**.
- Authorization: **not granted**.

The package remains candidate-only. No production mutation has been executed.

## Evidence

The 25-candidate independent review remains:

- run **35666673400**
- **25 / 25 PASS**
- **0 FAIL**
- **0 expert-review flags**
- **0 duplicate groups**

The collective gates remain:

- final 30-mock corpus gate: **35666818448 — PASS**
- 30-mock cross-corpus calibration: **35666822839 — PASS**

