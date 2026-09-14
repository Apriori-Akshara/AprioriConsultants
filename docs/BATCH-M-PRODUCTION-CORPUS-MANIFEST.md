# Batch M Production Corpus Manifest

**Status:** FROZEN — CONTENT-QUALITY HOLD / RELEASE VERIFICATION PENDING  
**Date:** September 14, 2026  
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

SAT1–SAT10, PSAT1–PSAT10, and SAT11–SAT20 are the complete approved Batch M production sequence. SAT20 passed its individual production gate and the complete corpus subsequently passed the collective verification gate.

The canonical production store contains exactly this frozen sequence. It does not define or export a SAT21 production target. `nextTestKey` is `null`.

The final collective verification runs against the exported frozen production corpus and preserves the boundary between the production corpus and the legacy public corpus.

## Maintenance and release safeguards

The following rules are mandatory after the Batch M freeze:

1. **No new Batch M target:** do not create SAT21 or any other Batch M production mock.
2. **No silent replacement:** do not regenerate, replace, reorder, or mutate an accepted mock without recording the corpus change.
3. **Correction protocol:** any post-freeze correction must rerun the affected individual production gates and the final collective corpus gate before acceptance.
4. **Legacy boundary:** do not replace, delete, or silently merge the legacy public corpus with Batch M production records without explicit release approval.
5. **Calibration boundary:** private calibration anchors remain private and must never be copied into production content or the public repository.
6. **Scope boundary:** authentication, registration/email verification, subscription/payment/access, dashboard, unrelated API/Redux code, and deployment configuration remain outside Batch M production changes unless a genuine question-generation/storage/rendering dependency requires otherwise.
7. **Release gate:** passing generation/QC does not by itself authorize public release; website inspection and release approval remain separate checkpoints.
8. **Content-quality gate:** passing structural/originality/mathematical/figure/corpus gates does not by itself certify authentic SAT/PSAT-level quality. R&W/Math content-quality calibration and 30-mock cross-corpus calibration are required before final Batch M acceptance.

## Verification status

**Step 4 — maintenance/spec safeguard verification: COMPLETE.**

The safeguards are consistent with the SAT/PSAT Question Specification and AI generation instructions: canonical schema remains protected; only QC-passed items are eligible; structured figures remain the source of truth; independent QC, originality, mathematical, storage, and corpus-level gates remain mandatory; and official calibration material remains an internal reference only.

## Content-quality QC status

The formal SAT1–SAT10 and PSAT1–PSAT10 content-quality audit is complete.

**Decision: QUALITY HOLD.** The audit found systemic weaknesses in R&W source complexity, reasoning demand, distractor quality, construction diversity, Math reasoning diversity, hard-item calibration, and SAT-versus-PSAT calibration. Math student-produced-response generation is also approximately 20%, below the specified 25–30% target.

Detailed findings and remediation requirements are recorded in `docs/BATCH-M-CONTENT-QUALITY-QC-2026-09-14.md`.

This finding does not authorize wholesale regeneration. The production corpus remains frozen until a corrected construction/content-quality layer is proven and any required post-freeze replacements are explicitly recorded and re-gated.

## Remaining Batch M release sequence

1. **Generator/content-quality remediation — active:** strengthen R&W and Math construction, semantic distractor validation, difficulty calibration, and SAT-versus-PSAT controls.
2. **Targeted production replacement/re-gating:** replace only genuinely affected SAT1–SAT10 and PSAT1–PSAT10 items; record every changed mock/question ID; rerun affected individual gates and the final collective gate.
3. **30-mock cross-corpus calibration:** assess difficulty consistency, skill/domain balance, construction diversity, conceptual/construction repetition, SAT/PSAT calibration, and overall corpus coherence.
4. **Public website inspection — user responsibility:** after the content-quality hold is cleared, inspect only `https://www.aprioriconsultants.org`; verify all 30 mocks open, R&W/Math content displays, figures/charts/tables display, there are no obvious missing/broken/overlapping/clipped elements, and representative responsive/mobile views work. The user does not perform technical QC or solve every question.
5. **Technical release QC — project responsibility:** diagnose every reported issue against generation/storage/rendering and correct only genuine defects within scope.
6. **Final end-to-end student acceptance:** verify launch → instructions → adaptive test-taking → completion → scoring/results → detailed report using the existing architecture.
7. **Final Batch M acceptance:** only after all preceding checkpoints pass.

SAT11–SAT20 remain deployed but their public-site verification is deliberately deferred until the later release checkpoint. No SAT21 or additional production mock is planned.

## Current status

**Production generation, collective corpus verification, production-store cleanliness, and maintenance/spec safeguard verification are complete. The corpus remains frozen at exactly 30 mocks. SAT1–SAT10 and PSAT1–PSAT10 content-quality QC is complete with a QUALITY HOLD. Generator/content-quality remediation is active. SAT11–SAT20 are deployed but user-facing verification is deferred.**

No SAT21 or additional production mock is planned.
