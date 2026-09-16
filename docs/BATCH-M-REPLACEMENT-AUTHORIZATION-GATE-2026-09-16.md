# Batch M Replacement Authorization Gate — September 16, 2026

**Status:** AUTHORIZED — controlled replacement may proceed
**Documentation branch:** `batch-m-controlled-replacement-2026-09-16`
**Production corpus:** Frozen until the controlled replacement workflow applies the authorized records
**Scope:** Controlled replacement of selected affected records from SAT1–SAT10 and PSAT1–PSAT10 only

## 1. Purpose

This document is the explicit gate between validated candidate selection and mutation of the frozen Batch M production corpus.

Candidate generation and validation remain candidate-only until this authorization gate is satisfied.

## 2. Authorization state

**Authorization state:** `AUTHORIZED`

The authorization applies only to the already-defined Batch M affected record set:

- SAT1–SAT10
- PSAT1–PSAT10
- affected records identified by exact `testKey + questionId`
- selected candidates recorded by the authoritative Batch M selection report
- no wholesale regeneration
- no SAT21
- no additional production targets

## 3. Pre-mutation requirements

The controlled replacement workflow must still verify:

- 2,144 affected unique records are in scope;
- 1,594 replacement candidates are selected;
- no unresolved candidate-coverage blocker remains;
- each selected candidate payload is preserved from the exact selector run that chose it;
- each selected candidate passes the applicable content-quality gate;
- replacement records remain limited to SAT1–SAT10 and PSAT1–PSAT10;
- `productionMutation` is false in the candidate-selection artifact;
- `releaseEligible` remains false until downstream gates are completed;
- `sat21Created` remains false.

## 4. Authoritative selection requirement

The prior selection report retained candidate keys and fingerprints but did not persist the complete selected candidate objects. Because some historical candidate payloads were not reproducible after the selection run, the controlled replacement now uses:

`docs/BATCH-M-AUTHORITATIVE-CANDIDATE-SELECTION-2026-09-16.json`

That report captures the exact selected candidate payload in the same process that performed candidate selection.

## 5. Downstream boundary

Authorization to mutate the affected records does **not** by itself make the Batch M release eligible.

After controlled replacement, the documented downstream gates remain mandatory:

1. controlled-replacement QC;
2. affected-mock production gates;
3. final 30-mock corpus gate;
4. 30-mock cross-corpus calibration;
5. SAT11–SAT20 public verification;
6. end-to-end student acceptance;
7. final Batch M release acceptance.

No SAT21 or additional production target may be created.
