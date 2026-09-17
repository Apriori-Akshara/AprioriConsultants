# Batch M Calibration Candidate Selection Checkpoint — 2026-09-17

## 1. Purpose

The 30-mock cross-corpus calibration identified two release-blocking calibration gaps:

- Reading & Writing Standard English Conventions below the approved construction proportion.
- Math student-produced response below the minimum approved proportion.

The read-only remediation scope defined a minimum candidate opportunity set of 352:

- 65 Craft & Structure → Standard English Conventions
- 130 Information & Ideas → Standard English Conventions
- 157 additional Math student-produced-response candidates

The frozen production corpus remains unchanged.

## 2. Implemented step

Implemented candidate generation and deterministic controlled selection as a candidate-only workflow.

### New script

`scripts/runBatchMCalibrationCandidateSelection.js`

The script:

1. Generates original R&W and Math remediation candidates using the existing Batch M remediation generators.
2. Applies the existing `batchMContentQualityGate` to candidates.
3. Restricts R&W selections to Standard English Conventions candidates.
4. Selects 195 R&W candidates with the required 65/130 replacement-source allocation.
5. Restricts Math selections to student-produced-response candidates.
6. Selects 157 Math SPR candidates.
7. Interleaves candidates across SAT/PSAT test identities for controlled diversity.
8. Enforces originality-fingerprint uniqueness within each selected set.
9. Writes the full selected candidate records and generation statistics to a workflow artifact.

## 3. Workflow

`.github/workflows/batch-m-calibration-candidate-selection.yml`

The workflow is read-only with respect to repository contents and production data. It uploads the candidate review package as a GitHub Actions artifact with a 14-day retention period.

## 4. Production boundary

The implementation explicitly preserves all release boundaries:

- `productionMutation: false`
- `releaseEligible: false`
- `sat21Created: false`
- `batchMProductionStore.js` is not imported by the candidate-selection script.
- No accepted production question is replaced.
- No public-site release is authorized by this step.

## 5. Verification status

The candidate-selection workflow is expected to run automatically from the workflow commit on `main`.

Required successful result:

- 195 eligible R&W selections.
- 157 eligible Math SPR selections.
- 352 total selected candidates.
- No production mutation.

If the workflow cannot produce the full minimum scope, the workflow must fail rather than silently reduce the remediation scope.

## 6. Next boundary

After successful candidate generation and selection, the next step is **candidate review and explicit controlled-replacement authorization**.

The selected candidates must not be inserted into the production corpus merely because the selection workflow passes. The 30-mock corpus gate and cross-corpus calibration must be rerun after any separately authorized production replacement.
