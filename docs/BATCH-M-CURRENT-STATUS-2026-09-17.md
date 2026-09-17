# Batch M Current Status — 2026-09-17

## 1. Repository state

- Main branch: `7e75aee6ddd0739c89db5a781665927a35de2dee`
- Latest main commit: **fix: align calibration candidate test identity with production sequence**.
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

## 3. Current calibration-reconciliation result

The active scope is the **195-candidate Reading & Writing calibration reconciliation**:

- Corrected candidate-generation workflow run: **35215190890**.
- Candidates: **195**.
- Allocation: **65 Craft & Structure → Standard English Conventions** and **130 Information & Ideas → Standard English Conventions**.
- Unique candidate prompts: **195**.
- Candidate substantive quality gate: **PASS**.
- New calibration failures in hypothetical post-state: **0**.
- Hypothetical R&W SEC proportion: **26.02%**.
- Assessment/test mapping source: **`BATCH_M_PRODUCTION_SEQUENCE`**.
- `productionMutation: false`.
- `releaseEligible: false`.
- `replacementAuthorization: NOT_AUTHORIZED`.
- `sat21Created: false`.

The corrected generator now derives assessment family, assessment variant, assessment number, test key, and related production metadata from the same `BATCH_M_PRODUCTION_SEQUENCE` entry as the assigned production test.

## 4. Independent review — PASSED

Corrected independent review workflow run **35215238290** completed successfully.

- 195 / 195 candidates reviewed.
- Assessment-variant compatibility: **PASS**.
- Candidate identity/originality/target compatibility: **PASS**.
- Substantive review: **PASS**.
- Production mutation: **false**.
- Release eligible: **false**.
- Replacement authorization: **NOT_AUTHORIZED**.
- SAT21 created: **false**.

The earlier blocker in run `35213306538` was resolved by correcting the underlying mapping. The reviewer was not weakened or bypassed.

## 5. Exact target-lock stage — PASSED

The existing workflow `.github/workflows/batch-m-calibration-reconciliation-target-lock.yml` completed successfully in run **35215285669**.

The locked artifact confirms:

- **195 / 195** candidates locked.
- **195 / 195** unique production targets.
- **65** Craft & Structure → SEC assignments.
- **130** Information & Ideas → SEC assignments.
- **30 / 30** production mocks represented.
- Exact production test/question identity preserved.
- Difficulty compatibility preserved.
- Every target remains candidate-only.
- `productionMutation: false`.
- `releaseEligible: false`.
- `replacementAuthorization: NOT_AUTHORIZED`.
- `sat21Created: false`.

No production question was replaced or modified by target lock.

## 6. Current authorization boundary

The exact 195-target reconciliation mapping is now locked candidate-only. **Production replacement is not authorized.**

## 7. Exact next implementation step

**Obtain a fresh explicit production authorization for this exact 195-target lock before running any separately controlled production replacement workflow.**

Do not perform production replacement, release, or SAT21 creation before that authorization.

## 8. Standing boundaries

- No production mutation without fresh explicit authorization for the exact reviewed and locked 195-target mapping.
- No SAT21 creation.
- Do not repeat completed candidate generation, selection, controlled replacement, public functionality verification, or earlier deep-QC stages unless a later gate identifies a regression.
- Release eligibility remains **false** until all substantive QC and final release-acceptance gates pass.
