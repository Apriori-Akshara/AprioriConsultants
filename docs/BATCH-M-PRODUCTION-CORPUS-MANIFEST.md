# Batch M Production Corpus Manifest

**Status:** FROZEN — AUTHORIZED 25-TARGET REPLACEMENT COMPLETE / 30-MOCK TECHNICAL + CALIBRATION GATES PASS / PUBLIC QUICK-CHECK COMPLETE / RELEASE NOT YET ACCEPTED  
**Date:** Updated September 25, 2026  
**Scope:** Batch M production question corpus only

## Purpose

This manifest is the authoritative inventory of the approved Batch M production corpus. It is an inventory and release-boundary checkpoint, not a replacement for the individual generation/QC gates or the final collective corpus gate.

No new production mock is authorized, and no previously accepted production mock may be silently regenerated or replaced after this freeze.

## Frozen production corpus

The complete production corpus contains exactly **30 mocks** in this order:

### SAT Series A — Mocks 1–10

| # | Test key | Test ID | Variant | Seed |
|---|---|---|---|---:|
| 1 | `SAT1` | `sat-series-a-mock-01` | `sat-series-a` | 1001 |
| 2 | `SAT2` | `sat-series-a-mock-02` | `sat-series-a` | 1002 |
| 3 | `SAT3` | `sat-series-a-mock-03` | `sat-series-a` | 1003 |
| 4 | `SAT4` | `sat-series-a-mock-04` | `sat-series-a` | 1004 |
| 5 | `SAT5` | `sat-series-a-mock-05` | `sat-series-a` | 1005 |
| 6 | `SAT6` | `sat-series-a-mock-06` | `sat-series-a` | 1006 |
| 7 | `SAT7` | `sat-series-a-mock-07` | `sat-series-a` | 1007 |
| 8 | `SAT8` | `sat-series-a-mock-08` | `sat-series-a` | 1008 |
| 9 | `SAT9` | `sat-series-a-mock-09` | `sat-series-a` | 1009 |
| 10 | `SAT10` | `sat-series-a-mock-10` | `sat-series-a` | 1010 |

### PSAT — Mocks 1–10

| # | Test key | Test ID | Variant |
|---|---|---|---|
| 11 | `PSAT1` | `psat-mock-01` | `psat` |
| 12 | `PSAT2` | `psat-mock-02` | `psat` |
| 13 | `PSAT3` | `psat-mock-03` | `psat` |
| 14 | `PSAT4` | `psat-mock-04` | `psat` |
| 15 | `PSAT5` | `psat-mock-05` | `psat` |
| 16 | `PSAT6` | `psat-mock-06` | `psat` |
| 17 | `PSAT7` | `psat-mock-07` | `psat` |
| 18 | `PSAT8` | `psat-mock-08` | `psat` |
| 19 | `PSAT9` | `psat-mock-09` | `psat` |
| 20 | `PSAT10` | `psat-mock-10` | `psat` |

### SAT Series B — Mocks 11–20

| # | Test key | Test ID | Variant | Seed |
|---|---|---|---|---:|
| 21 | `SAT11` | `sat-series-b-mock-11` | `sat-series-b` | 1011 |
| 22 | `SAT12` | `sat-series-b-mock-12` | `sat-series-b` | 1012 |
| 23 | `SAT13` | `sat-series-b-mock-13` | `sat-series-b` | 1013 |
| 24 | `SAT14` | `sat-series-b-mock-14` | `sat-series-b` | 1014 |
| 25 | `SAT15` | `sat-series-b-mock-15` | `sat-series-b` | 1015 |
| 26 | `SAT16` | `sat-series-b-mock-16` | `sat-series-b` | 1016 |
| 27 | `SAT17` | `sat-series-b-mock-17` | `sat-series-b` | 1017 |
| 28 | `SAT18` | `sat-series-b-mock-18` | `sat-series-b` | 1018 |
| 29 | `SAT19` | `sat-series-b-mock-19` | `sat-series-b` | 1019 |
| 30 | `SAT20` | `sat-series-b-mock-20` | `sat-series-b` | 1020 |

## Acceptance boundary

SAT1–SAT10, PSAT1–PSAT10, and SAT11–SAT20 are the complete approved Batch M production sequence. SAT20 passed its individual production gate and the complete corpus passed the pre-remediation collective verification gate. The later authorized targeted remediation was limited to selected affected records in SAT1–SAT10 and PSAT1–PSAT10.

The canonical production store contains exactly this frozen sequence. It does not define or export a SAT21 production target. `nextTestKey` is `null`.

The final collective verification after the targeted remediation has passed; it remains a required evidence checkpoint, not a pending task.

## Maintenance and release safeguards

The following rules are mandatory after the Batch M freeze:

1. **No new Batch M target:** do not create SAT21 or any other Batch M production mock.
2. **No silent replacement:** do not regenerate, replace, reorder, or mutate an accepted mock without recording the corpus change.
3. **Correction protocol:** any post-freeze correction must rerun the affected individual production gates and the final collective corpus gate before acceptance.
4. **Legacy boundary:** do not replace, delete, or silently merge the legacy public corpus with Batch M production records without explicit release approval.
5. **Calibration boundary:** private calibration anchors remain private and must never be copied into production content or the public repository.
6. **Scope boundary:** authentication, registration/email verification, subscription/payment/access, dashboard, unrelated API/Redux code, and deployment configuration remain outside Batch M production changes unless a genuine question-generation/storage/rendering dependency requires otherwise.
7. **Release gate:** passing generation/QC does not by itself authorize public release; website inspection and release approval remain separate checkpoints.
8. **Content-quality gate:** passing structural/originality/mathematical/figure/corpus gates does not by itself certify final public readiness. The final 30-mock cross-corpus calibration and release checkpoints remain mandatory.

## Verification status

**Targeted 20-test remediation and comprehensive re-gating: COMPLETE.**

The authorized controlled replacement changed **1,594** selected targets within the previously identified **2,144** affected SAT1–SAT10 and PSAT1–PSAT10 records. No out-of-scope mock was changed.

GitHub Actions comprehensive 20-test QC run **35181971047** (run #7) passed with **3,920 / 3,920** runtime questions covered, **1,594 / 1,594** replacement targets verified, **0** schema failures, **0** content-quality failures, figure originality **PASS**, and every affected mock at **196 / 196** passing questions. The run reported `productionMutation: false`, `releaseEligible: false`, and `sat21Created: false`.

The detailed checkpoint is `docs/BATCH-M-COMPREHENSIVE-20-TEST-QC-CHECKPOINT-2026-09-16.md`.

## Final Batch M release sequence

1. **Final collective 30-mock corpus gate — PASS.**
2. **30-mock cross-corpus calibration — PASS.**
3. **Deep content-quality/diversity candidate/review/replacement boundary — COMPLETE for the authorized package:** the exact 25-target package was independently reviewed, validated, explicitly authorized, and applied; post-mutation corpus and calibration gates passed.
4. **SAT11–SAT20 public route/runtime verification — COMPLETE.**
5. **Public student-facing quick-check of all 30 mocks — COMPLETE:** the user verified that all 30 mocks load. No additional Stage 14 work is required unless a new live defect is reported.
6. **Technical release QC — NEXT:** diagnose and correct genuine remaining launch-blocking technical defects within scope.
7. **Final end-to-end student acceptance — PENDING.**
8. **Final Batch M acceptance — PENDING.**

The human-editable/canonical question-bank bridge is implemented and pilot-verified, but it is a maintenance track rather than a prerequisite release gate. Its next step is full 30-mock legacy document materialization.

No SAT21 or additional production mock is planned.

## Current status

**Production generation, targeted remediation, authorized 195-target calibration replacement, exact authorized 25-target replacement, post-mutation gates, final 30-mock corpus gate, cross-corpus calibration, SAT11–SAT20 verification, and public quick-check are complete. The corpus remains frozen at exactly 30 mocks. Release is not yet accepted; Stage 15 technical release QC, final end-to-end student acceptance, and final Batch M acceptance remain pending.**

The human-editable/canonical question-bank bridge is implemented and CI-verified. The next maintenance step is full 30-mock legacy document materialization.
