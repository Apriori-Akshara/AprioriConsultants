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

The package-generation/validation stage itself is candidate-only; the separate production execution was governed by the explicit authorization record:

- package-generation production mutation: **false**
- release eligible: **false**
- SAT21 created: **false**
- automatic replacement: **false**
- explicit production authorization: **recorded and executed separately**

The validation path intentionally does not silently rewrite candidate metadata to make a candidate appear canonical-compatible. Canonical normalization records the deterministic target-resolution method/source index and a SHA-256 of the target's canonical metadata; final validation checks protected operational metadata and figure type/shape compatibility.

## Current finding / resolution

The current 25 generic candidates did not carry exact canonical production metadata for all target families. The candidate-only normalization stage now resolves the documented assessment/skill-label differences with strict mappings:

- scatterplot interpretation → Data models
- equivalent exponential representations → Exponential equations
- right-triangle relationships → Right triangles
- linear relationships → Linear functions

The normalized artifact remains candidate-only. The final validator now rejects incomplete target identity, duplicate targets/candidates, stale review artifacts, operational metadata drift, figure mismatch, and other replacement-integrity violations rather than allowing them to pass into an authorization decision.

## Decision

**REPLACEMENT PACKAGE VALIDATED — PRODUCTION REPLACEMENT APPLIED — POST-MUTATION GATES PASS**

Historical candidate-only package validation in run **35697516214** was clean: exact target-aware selection **25/25**, pre-normalization review **25/25 PASS**, canonical normalization **PASS**, post-normalization review **PASS**, and final hypothetical replacement validation **PASS**. Explicit production authorization was then recorded and the exact package was successfully applied in workflow **35728264303**.

A validation-path defect was also identified and corrected: the final package validator now resolves production mocks from their canonical `SAT1`/`PSAT1`/`SAT11`-style `testKey` through `BATCH_M_PRODUCTION_SEQUENCE` when the runtime mock only carries a `testId`. This prevents false target-not-found results.

A second control issue was corrected: the fresh independent review previously retained the September 17 artifact date even when reviewing the normalized September 22 candidates. Review artifacts now derive their date from the input artifact, and final validation requires the review to identify the normalized 2026-09-22 artifact.

The package validator also now checks exact canonical operational fields (`timingMode`, calculator/reference-sheet controls, adaptive routing, etc.), target metadata integrity, figure type/shape, unique candidate/target identity, and mapping consistency.

Package validation was clean, explicit authorization was then recorded, and the exact package was applied successfully in authorized workflow **35728264303**. No release promotion occurred.

## Fresh validated package result

Run **35697516214 — PASS**.

- Target-aware candidate generation: **25/25 exact-target candidates**, **0 unresolved**.
- Target-aware selection: **25/25 selected**, **0 rejected**.
- Pre-normalization independent review: **25 PASS / 0 FAIL / 0 expert-review**.
- Canonical normalization: **PASS**.
- Post-normalization independent review: **PASS**.
- Final hypothetical replacement validation: **PASS**.
- Package-generation production mutation: **false**.
- Release eligible after mutation: **false**.
- SAT21 created: **false**.
- Explicit production authorization: **GRANTED — see authorized execution below**.

The former generic 58-candidate compatibility blocker is superseded by target-aware generation from the frozen replacement-preparation inventory.

## Validation-path correction



- Final package validator correction commit: `dc59e553902b717c18f106ffebcd21f659c26060`.
- Correction: map runtime production `testId` values to canonical Batch M `testKey` values before exact target lookup.
- Production mutation: **false**.
- Authorization: **not granted**.

The package-validation record above is candidate-only; the separately authorized production execution is recorded below.

## Evidence

The original generic 25-candidate independent review remains historical evidence:

- run **35666673400**
- **25 / 25 PASS**
- **0 FAIL**
- **0 expert-review flags**
- **0 duplicate groups**

The authoritative current package-validation evidence is **35697516214 — PASS**.

The collective gates remain:

- final 30-mock corpus gate: **35666818448 — PASS**
- 30-mock cross-corpus calibration: **35666822839 — PASS**


## Authorized production execution — completed

- Authorization: **explicit-user-authorization-2026-09-22**
- Authorization record: `docs/BATCH-M-PRODUCTION-AUTHORIZATION-2026-09-22.md`
- Production workflow: **35728264303 — PASS**
- Exact package run: **35697516214**
- Package revision: **0c2acc194c79620f031a1d8bab9c22cbaaeb722b**
- Exact replacements applied: **25 / 25**
- Frozen production corpus: **30 mocks**
- Final 30-mock post-mutation gate: **PASS**
- Cross-corpus calibration after mutation: **PASS**
- Release eligibility: **false**
- SAT21: **not created**

The production mutation was committed to `main` as **ade1dec20dde087d0e547f751101c8c90e0836a4** with commit message **feat: apply authorized Batch M 25-target production replacement**. The commit contains only the authorized production store/module and the auditable mutation artifact.

## Next release checkpoint

Stage 12 (controlled production replacement) and Stage 13 (affected/collective post-mutation gating) are complete. The next required work is **Stage 14 — final public student-facing inspection of all 30 mocks**. No release-status promotion should occur before the remaining public, technical, student-acceptance, and final Batch M acceptance stages.
