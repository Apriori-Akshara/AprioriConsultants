# Batch M Calibration Candidate Selection and Review Checkpoint — 2026-09-17

## 1. Purpose

The 30-mock cross-corpus calibration identified two release-blocking calibration gaps:

- Reading & Writing Standard English Conventions below the approved construction proportion.
- Math student-produced response below the minimum approved proportion.

The remediation scope was 352 candidate opportunities:

- 65 Craft & Structure → Standard English Conventions
- 130 Information & Ideas → Standard English Conventions
- 157 additional Math student-produced-response candidates

The frozen production corpus remains unchanged.

## 2. Candidate generation and controlled selection

The candidate-only generation workflow produced the complete minimum scope:

- R&W candidates generated: **3,750**
- R&W quality-gate passes: **3,750**
- R&W SEC candidates eligible: **720**
- R&W selected: **195**
  - Craft & Structure allocation: **65**
  - Information & Ideas allocation: **130**
- Math candidates generated: **1,500**
- Math quality-gate passes: **659**
- Math SPR candidates eligible: **299**
- Math selected: **157**
- Combined selected: **352**

Workflow run: `35186222784`.

## 3. Candidate review

Implemented an independent review step in:

`scripts/reviewBatchMCalibrationCandidates.js`

The review validates:

1. Required 195 R&W / 157 Math counts.
2. Required 65/130 R&W replacement-source allocation.
3. SEC-only R&W targeting.
4. SPR-only Math targeting.
5. Presence and uniqueness of originality fingerprints.
6. Reapplication of the existing Batch M content-quality gate.
7. Production/release boundary flags.

The workflow now runs candidate generation, deterministic selection, and independent review before uploading the review package.

## 4. Authorization boundary

Automated review is **not** production authorization.

The review output explicitly records:

- `productionMutation: false`
- `releaseEligible: false`
- `sat21Created: false`
- `authorization.authorized: false`
- `authorization.productionMutationPermitted: false`

No production question is replaced by candidate generation or review.

## 5. Next boundary

The next step is **explicit controlled-replacement authorization**. That authorization must be a separate action from automated candidate review. Only after explicit authorization may the selected candidates be applied to the frozen production corpus.

After authorized replacement, the 30-mock corpus gate and cross-corpus calibration must be rerun before release or public-site verification.
