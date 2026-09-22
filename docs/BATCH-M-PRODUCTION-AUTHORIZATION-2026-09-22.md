# Batch M Explicit Production Authorization — 2026-09-22

AUTHORIZATION_STATUS: AUTHORIZED

This record is the explicit human authorization checkpoint for the exact validated Batch M replacement package.

- PACKAGE_RUN: 35697516214
- PACKAGE_REVISION: 0c2acc194c79620f031a1d8bab9c22cbaaeb722b
- REPLACEMENT_COUNT: 25
- TARGET_SCOPE: exact one-for-one replacements only
- PRODUCTION_CORPUS: frozen 30-mock corpus
- SAT21: prohibited / not created
- AUTHORIZED_BY: user explicit authorization in ChatGPT session on 2026-09-22
- AUTHORIZATION_TOKEN: explicit-user-authorization-2026-09-22

## Authorization basis

The exact package completed the candidate-only validation chain in GitHub Actions run 35697516214 — PASS:

- target-aware candidate generation: 25/25 exact targets
- target-aware selection: 25/25
- pre-normalization independent review: 25/25 PASS
- canonical normalization: PASS
- post-normalization independent review: PASS
- final hypothetical replacement-package validation: PASS
- final hypothetical 30-mock corpus gate: PASS
- cross-corpus calibration: no new failures
- production mutation before this checkpoint: false
- release eligibility before this checkpoint: false

## Authorized operation

The authorized operation is limited to applying the exact 25 candidate-to-existing-target mappings from the validated package run above.

The production mutation workflow must:

1. retrieve the exact package artifact from run 35697516214;
2. re-check the authorization record and package integrity;
3. preserve each existing target's testId and questionId;
4. apply only the candidate content to the corresponding existing target;
5. record the authorization, package run, package revision, candidate identity, and target identity in production metadata;
6. keep releaseEligibility false;
7. create no new mock and no SAT21;
8. run the post-mutation 30-mock corpus gate and cross-corpus calibration;
9. commit the exact mutation to main only if all post-mutation gates pass.

This authorization does not constitute final Batch M release acceptance. The remaining public inspection, technical QC, student acceptance, and final release acceptance stages remain required.

## Execution checkpoint

The first authorized production workflow attempt was run 35722753346. It stopped before production mutation because the workflow's artifact lookup queried the repository-wide artifact list incorrectly. No production mutation occurred in that attempt.

The retrieval logic was corrected in commit 96aee3d79c1faa7b22b4d62c5aacbcf3a7d29d13 to query artifacts directly from validation run 35697516214.

The second authorized production workflow attempt was run 35723635815. Exact package retrieval succeeded, but execution stopped before mutation because scripts/runBatchMAuthorizedProductionReplacement.mjs contained an unescaped nested template literal and failed Node syntax parsing. No production mutation occurred in that attempt.

The mutation script syntax was corrected in commit cb4296129aee3185f589612ee5b86c1c3e875e41.

This documentation update intentionally re-triggers the authorized workflow so the corrected mutation script can execute. Authorization, package run, replacement count, and scope are unchanged.

## Safety boundary

No broad regeneration, unrelated replacement, production-scope expansion, automatic selection of a different package, or release-status promotion is authorized by this record.
