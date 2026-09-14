# Batch M Production Corpus Manifest

**Status:** FROZEN FOR COLLECTIVE VERIFICATION
**Date:** September 14, 2026
**Scope:** Batch M production question corpus only

## Purpose

This manifest freezes the approved Batch M production sequence before the final collective corpus verification. It is an inventory checkpoint, not a replacement for the individual generation/QC gates.

No new production mock is to be generated, and no previously accepted production mock is to be silently regenerated or replaced, during the collective verification stage.

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

SAT1–SAT10, PSAT1–PSAT10, and SAT11–SAT20 are the complete approved Batch M production sequence. SAT20 has passed its individual production gate and is confirmed Render-LIVE.

The corpus is now **frozen for collective verification**. The next production activity is the final 30-mock corpus-level verification; there is no SAT21 production target in Batch M.

The production records remain separate from the legacy public corpus until collective verification and final release approval are complete.
