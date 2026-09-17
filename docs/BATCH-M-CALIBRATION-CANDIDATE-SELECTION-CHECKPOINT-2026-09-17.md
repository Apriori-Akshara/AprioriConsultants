# Batch M Calibration Candidate Selection and Controlled Replacement Checkpoint — 2026-09-17

## 1. Purpose

The 30-mock cross-corpus calibration identified calibration gaps and led to a controlled replacement stage. This document records that completed historical stage and points to the later deep-QC/reconciliation work without reopening completed milestones.

## 2. Candidate generation and controlled selection

The candidate-only generation workflow produced the complete minimum scope for the historical calibration replacement:

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

The remaining boundary was public-site verification. This was later completed, followed by deep SAT/PSAT content-quality and diversity QC.

## 6. Public-site verification and subsequent deep-QC boundary

Public website verification was performed after the controlled replacement.

Observed result:

- Overall SAT/PSAT functionality was working correctly.
- The user-visible question corpus did **not yet demonstrate the expected broader recalibration in overall quality and diversity**.
- The most noticeable R&W change was increased length in Reading questions.

The 352-question calibration replacement was therefore treated as a targeted distribution correction, not as final content-quality acceptance.

The deep SAT/PSAT content-quality and diversity QC stage was subsequently executed and returned **QUALITY_HOLD**, producing the documented substantive failure classes and the candidate-first remediation path.

## 7. Current active reconciliation stage

The historical 352-replacement scope above is complete and must not be repeated as a general workflow.

A later deep-QC/current-corpus reconciliation identified a fresh active R&W calibration mismatch in the corpus baseline used by the current reconciliation tooling: **30% Craft & Structure / 30% Information & Ideas / 20% Standard English Conventions / 20% Expression of Ideas**. The current active reconciliation scope is therefore **195 R&W SEC candidates**:

- 65 Craft & Structure → SEC
- 130 Information & Ideas → SEC

Candidate-generation workflow run: **35212907193**.

- 195 candidates generated and selected by the reconciliation planner.
- 195 unique prompts.
- Candidate quality gate: **PASS**.
- Hypothetical SEC proportion: **26.02%**.
- New hypothetical calibration failures: **0**.
- Production mutation: **false**.
- Replacement authorization: **NOT_AUTHORIZED**.
- SAT21 created: **false**.

The independent reconciliation review run **35213306538** is currently **FAILED** because `BATCH-M-CAL-SEC-001` has an assessment variant that does not match its assigned production test.

## 8. Exact current next step

Fix the candidate generator's assessment-variant/test mapping, regenerate and revalidate the 195-candidate reconciliation package, rerun independent review, and only after review PASS proceed to the existing exact target-lock workflow.

The reviewer compatibility gate must remain active; it must not be bypassed or weakened. A fresh explicit authorization is still required before any subsequent production replacement.

## 9. Safety boundaries retained

- No SAT21 created.
- No unrelated SAT/auth/payment/navigation architecture changed as part of the historical calibration replacement.
- The original 1,594-question remediation is not repeated.
- The historical 352-item calibration replacement is not repeated automatically.
- Public functionality verification is complete and is not repeated unless a regression is found.
- Release eligibility remains false until substantive content-quality/diversity QC and final release acceptance are complete.
