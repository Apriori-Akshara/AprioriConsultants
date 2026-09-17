# Batch M Calibration Candidate Selection and Controlled Replacement Checkpoint — 2026-09-17

## 1. Purpose

The 30-mock cross-corpus calibration identified two release-blocking calibration gaps:

- Reading & Writing Standard English Conventions below the approved construction proportion.
- Math student-produced response below the minimum approved proportion.

The approved remediation scope was 352 replacement opportunities:

- 65 Craft & Structure → Standard English Conventions
- 130 Information & Ideas → Standard English Conventions
- 157 additional Math student-produced-response candidates

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

Candidate-selection workflow run: `35186222784`.

## 3. Independent candidate review

The independent review step in:

`scripts/reviewBatchMCalibrationCandidates.js`

validated:

1. Required 195 R&W / 157 Math counts.
2. Required 65/130 R&W replacement-source allocation.
3. SEC-only R&W targeting.
4. SPR-only Math targeting.
5. Presence and uniqueness of originality fingerprints.
6. Reapplication of the existing Batch M content-quality gate.
7. Production/release boundary flags.

The candidate review correctly kept production mutation disabled until explicit authorization.

## 4. Controlled replacement and post-replacement gates — COMPLETED

Explicit authorization was provided to proceed with the controlled replacement.

The production replacement workflow:

`.github/workflows/batch-m-calibration-production-replacement.yml`

executed the authorized replacement against the canonical 30-mock production corpus and completed successfully in workflow run `35189648675`.

Results:

- Authorized replacements applied: **352**
- R&W replacements: **195**
  - Craft & Structure → SEC: **65**
  - Information & Ideas → SEC: **130**
- Math replacements: **157 SPR**
- Final 30-mock corpus gate: **PASS**
- Cross-corpus calibration: **PASS**
- R&W SEC proportion after replacement: **26.02%**
- Math SPR proportion after replacement: **25.00%**
- SAT21 created: **false**

The production replacement is represented by the controlled replacement layer and is consumed by the SAT runtime without changing the underlying legacy generation gates.

## 5. Release boundary

Technical replacement and post-replacement calibration gates have passed, but the release is **not yet marked release-eligible**.

The remaining boundary is public-site verification. This is deliberately separate from the content-generation and calibration gates.

## 6. Next step

**Public website verification of the post-replacement SAT/PSAT corpus.**

Verify on the deployed application that:

1. `/SATMocks` loads correctly.
2. SAT/PSAT mock selection still works.
3. The adaptive test runtime loads the calibrated corpus correctly.
4. Questions render correctly, including figures where applicable.
5. No question-count, module, route, or scoring regressions were introduced.
6. Authentication/access rules remain unchanged.

Only after this verification should the project proceed to end-to-end student-experience testing and final Batch M release acceptance.

## 7. Safety boundaries retained

- No SAT21 created.
- No unrelated SAT/auth/payment/navigation architecture changed as part of this calibration replacement.
- The original 1,594-question remediation is not repeated.
- Candidate generation and selection are not repeated.
- Release eligibility remains false until public-site verification is complete.
