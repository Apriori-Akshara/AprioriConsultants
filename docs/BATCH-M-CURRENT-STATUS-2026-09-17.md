# Batch M Current Status — 2026-09-17

## 1. Repository state

- Main branch: `f1b58cd4327702c6db00a7a3e72a0e343d5525d2`
- Latest main commit: **Add Batch M calibration reconciliation target-lock workflow**.
- Production/release boundary remains frozen.

## 2. Completed milestones already recorded

The following stages are complete and must not be repeated:

- 30-mock technical corpus gate completed successfully.
- Initial cross-corpus calibration analysis completed.
- Earlier 352-question calibration replacement stage completed and verified.
- Public SAT/PSAT functionality verification completed.
- Deep SAT/PSAT content-quality and diversity QC completed with **QUALITY_HOLD**.
- Deep-QC candidate generation and deterministic selection completed for the 299-candidate substantive remediation set.
- Independent review of that 299-candidate set completed; substantive failures were remediated candidate-first.
- The single Words-in-Context held candidate was separately remediated and independently reviewed successfully.
- Its exact production target was resolved candidate-only and a separately authorized single production replacement was completed and verified.

These milestones remain historical records. Do not restart them unless a later gate explicitly identifies a regression.

## 3. Current active calibration-reconciliation stage

The current active workflow is the **195-candidate Reading & Writing calibration reconciliation** required by the current frozen corpus baseline used by the reconciliation tooling.

Candidate-generation workflow:

- Run: **35212907193**
- Candidates: **195**
- Allocation: **65 Craft & Structure → Standard English Conventions** and **130 Information & Ideas → Standard English Conventions**
- Unique candidate prompts: **195**
- Candidate substantive quality gate: **PASS**
- New calibration failures in the hypothetical post-state: **0**
- Hypothetical R&W SEC proportion: **26.02%**
- `productionMutation: false`
- `releaseEligible: false`
- `replacementAuthorization: NOT_AUTHORIZED`
- `sat21Created: false`

## 4. Current blocker

The independent review workflow has not yet passed.

Latest review run:

- Run: **35213306538**
- Conclusion: **FAIL**
- Normalization step: PASS
- Independent review step: FAIL
- Failure: **candidate `BATCH-M-CAL-SEC-001` assessment variant does not match its production test**

This is a metadata/target-compatibility problem in the candidate package, not an authorization to bypass the review gate.

The candidate reviewer correctly checks that each candidate's `assessmentVariant` matches the variant defined for its assigned production test in `BATCH_M_PRODUCTION_SEQUENCE`.

## 5. Target-lock stage

The target-lock workflow is implemented on `main`:

`.github/workflows/batch-m-calibration-reconciliation-target-lock.yml`

It is intentionally gated on a **successful independent review**. No successful target-lock run exists yet because the review prerequisite has not passed.

The target-lock stage remains candidate-only and requires:

- 195 reviewed candidates,
- 195 exact production targets,
- 65/130 source-domain allocation,
- SEC target domain,
- matching difficulty and test identity,
- all 30 production mocks represented,
- `productionMutation: false`,
- `releaseEligible: false`,
- `replacementAuthorization: NOT_AUTHORIZED`,
- `sat21Created: false`.

## 6. Exact next implementation step

**Fix the candidate-to-production assessment-variant mapping in the 195-candidate calibration-reconciliation generator, regenerate the candidate artifact, and rerun its candidate workflow and independent review.**

The fix must map each candidate's `assessmentVariant` (and related assessment metadata) from the same `BATCH_M_PRODUCTION_SEQUENCE` entry as its assigned `productionTestId`.

Do **not** weaken or remove the review compatibility check. Do **not** authorize production mutation during this fix.

After the independent review passes:

1. allow the existing target-lock workflow to validate and lock the 195 exact targets;
2. verify the target-lock artifact and all production/release boundary flags;
3. only then consider a separate fresh explicit authorization for any production replacement.

## 7. Standing boundaries

- No production mutation without fresh explicit authorization for the exact reviewed target mapping.
- No SAT21 creation.
- No repeat of completed candidate generation, candidate selection, controlled replacement, public functionality verification, or earlier deep-QC stages unless a later gate demonstrates a specific regression.
- Release eligibility remains **false** until all substantive QC and final release-acceptance gates pass.
