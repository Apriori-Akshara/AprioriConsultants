# Batch M Replacement Package Checkpoint — 2026-09-22

## Implemented

The next Batch M control has been implemented on `main`:

- `scripts/runBatchMDeepContentQualityReplacementPackage.mjs`
- `.github/workflows/batch-m-deep-content-quality-replacement-package.yml`

The package builder consumes the exact current 25-candidate selection and independent-review artifacts, indexes the frozen canonical 30-mock production corpus, proposes deterministic existing targets, and records candidate/target compatibility.

## Safety boundary

This stage is candidate-only:

- production mutation: **false**
- release eligible: **false**
- SAT21 created: **false**
- automatic replacement: **false**
- explicit production authorization: **required**

The validator intentionally does not silently rewrite candidate metadata to make a candidate appear canonical-compatible.

## Current finding

The current 25 generic candidates do not carry exact canonical production metadata for all target families. In particular, the candidate set contains assessment and skill labels that differ from the canonical labels used by the frozen production records.

Those differences are therefore recorded as package blockers rather than hidden inside a replacement.

## Decision

**CANONICAL NORMALIZATION IMPLEMENTED — FRESH REVIEW / FINAL PACKAGE VALIDATION PENDING**

The candidate-only canonical-normalization stage is now implemented. It resolves deterministic existing production targets and copies canonical structural metadata into normalized candidates without mutating production. A fresh independent substantive review must pass after normalization, followed by final hypothetical replacement-package validation.

No production replacement should be authorized or executed until that package validation is clean.

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

