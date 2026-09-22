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

The second run then exposed an identity-matching defect during the post-mutation gate: production mocks use canonical test IDs such as psat-mock-04 while the validated package targets use logical keys such as PSAT4. No production mutation was committed because the post-mutation gate failed. The correction is committed in 4ebd9374b82f8124f9a15a24e84eea9b2cdded3b and maps each approved logical target key to its existing canonical production test ID before applying the exact replacement.

Workflow attempt 35727582563 then failed before production mutation at the exact package re-verification step. The failure was traced to the target-ID mapper introduced in 4ebd9374b82f8124f9a15a24e84eea9b2cdded3b: the JavaScript regex contained a double-escaped digit class, so valid keys such as PSAT4 were rejected as unknown.

The package artifact itself was independently inspected: it contains exactly 25 unique replacement targets, all target question IDs align with their corresponding canonical production mock IDs, and the approved scope remains unchanged.

The mapper was corrected to an explicit canonical-ID table in commit 89fac2ae187c2c8b6aa4f30afaac107265cbd988, with an additional canonical-target uniqueness guard in 60112e88d098db6d9c3de2ac578fa76f9a22a164. The workflow now also performs a mutation-runner syntax preflight in commit 6f9a58352f879036a690b025f4f524c5dcc3a96a before package execution.

The authorized workflow is intentionally re-triggered by this documentation update. Authorization, package run 35697516214, replacement count 25, target scope, release restriction, and SAT21 prohibition remain unchanged.


## Safety boundary

No broad regeneration, unrelated replacement, production-scope expansion, automatic selection of a different package, or release-status promotion is authorized by this record.
