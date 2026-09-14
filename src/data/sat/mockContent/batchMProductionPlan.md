# Batch M Production Plan

Batch M is the controlled production stage for the SAT/PSAT-style mock corpus.

## Production sequence

The final corpus is produced in this exact order:

1. **SAT Mocks — Series A: Tests 1–10** — accepted
2. **PSAT Mocks: Tests 1–10** — accepted
3. **SAT Mocks — Series B: Tests 11–20** — active
4. **Final collective verification across the full 30-mock production corpus**

The SAT Series B navigation page is `/SATMocksSeriesB`. It is a release shell only until Tests 11–20 have actually been generated, validated, stored, and accepted. It must not fabricate question data, scores, progress, or payment-success states.

## Generation rule

Mocks are produced and accepted **one mock at a time**. Each mock must pass generation and all applicable QC gates before the next mock is accepted.

For each mock:

1. Build mock blueprint.
2. Generate R&W and Math content.
3. Run independent QC and figure/originality validation.
4. Run mock-level checks.
5. Compare against all previously accepted mocks for cross-mock uniqueness and diversity.
6. Store the accepted mock in the canonical production representation.
7. Obtain Render deployment acceptance.
8. Only then advance to the next mock.

A failed mock is corrected or regenerated before the sequence advances. A failed check must not be bypassed merely to keep production moving.

## Current production checkpoint

**SAT Series A Mocks 1–10, PSAT Mocks 1–10, and SAT Series B Mocks 11–13 are accepted and stored as canonical runtime production records. SAT13 has also passed the Render acceptance gate and is confirmed LIVE. SAT14 is the active target.**

### PSAT10 record

- test key: `PSAT10`
- test ID: `psat-mock-10`
- variant: `psat-nmsqt`
- assessment number: `10`
- deterministic seed: `2010`
- canonical storage mode: `canonical-runtime-records`
- validated question count: `196`

Implementation commits:
- `781cb832d9984f2ab78ed29648cd2a0a92dcac94` — `Batch M: Add PSAT Mock 10 production gate`
- `cbeeb1c6c20a756e10c184ae774fbf9293550d90` — `Batch M: Store accepted PSAT Mock 10`

**Render acceptance:** User-confirmed LIVE for PSAT10.

### SAT11 record

- test key: `SAT11`
- test ID: `sat-series-b-mock-11`
- variant: `sat-series-b`
- assessment number: `11`
- deterministic seed: `1011`
- canonical storage mode: `canonical-runtime-records`
- validated question count: `196`
- cross-mock baseline: SAT1–SAT10 and PSAT1–PSAT10

Implementation commit:
- `35f14dea6e22f361c3eaf8befcf4d9c56ea4840a` — `Batch M: Add SAT11 production gate and canonical storage`

**Render acceptance:** User-confirmed LIVE for SAT11.

### SAT12 record

- test key: `SAT12`
- test ID: `sat-series-b-mock-12`
- variant: `sat-series-b`
- assessment number: `12`
- deterministic seed: `1012`
- canonical storage mode: `canonical-runtime-records`
- validated question count: `196`
- cross-mock baseline: SAT1–SAT10, PSAT1–PSAT10, and SAT11

Implementation commit:
- `5df098e878dbe2d77127ecfe2487a3d1216f4b36` — `Batch M: Add SAT12 production gate and canonical storage`

**Render acceptance:** User-confirmed LIVE for SAT12.

### SAT13 record

- test key: `SAT13`
- test ID: `sat-series-b-mock-13`
- variant: `sat-series-b`
- assessment number: `13`
- deterministic seed: `1013`
- canonical storage mode: `canonical-runtime-records`
- validated question count: `196`
- cross-mock baseline: SAT1–SAT10, PSAT1–PSAT10, SAT11, and SAT12

Implementation commit:
- `1d8557c3eaab25725761d9d87f57caf52114bfff` — `Batch M: Add SAT13 production gate and canonical storage`

**Render acceptance:** User-confirmed LIVE for SAT13.

## Current production target — SAT14

**SAT Series B Mock 14 (`SAT14`) is the active production target.**

SAT14 uses the controller-defined identity:

- test key: `SAT14`
- test ID: `sat-series-b-mock-14`
- variant: `sat-series-b`
- assessment number: `14`
- deterministic seed: `1014`

SAT14 must be compared against all **23** previously accepted production mocks: SAT1–SAT10, PSAT1–PSAT10, SAT11, SAT12, and SAT13. It must preserve the established generation, independent QC, figure/math/originality validation, mock-level checks, canonical storage, and Render acceptance discipline.

SAT14 must not be considered accepted until its Render deployment is confirmed LIVE.

The accepted Batch M production records remain separate from the legacy public corpus. They must not replace or be exposed through the legacy public corpus until the final corpus gate passes.

## Final corpus gate

After SAT Series B Mock 20 is accepted, run collective corpus QC covering:

- schema and answer-format integrity
- domain/skill distribution
- difficulty and adaptive-route distribution
- R&W passage/question uniqueness
- Math question/construction uniqueness
- figure/data uniqueness and relationship integrity
- answer-key balance
- source-family and rhetorical diversity
- mathematical correctness
- cross-mock originality
- storage/serialization integrity
- compatibility with the existing SAT content path

The final corpus gate must consider all **30 production mocks** together wherever cross-corpus uniqueness or distribution rules apply.

## Production safety

Batch M must not replace or delete the legacy SAT content path until the new corpus has passed the complete corpus-level gate.

Do not commit a partially generated production corpus as if it were complete. Production generation is checkpointed so that an individual mock can be regenerated without silently changing previously accepted mocks.

Private calibration anchors, if authorized and supplied, may inform calibration work through the Batch K private boundary. They are not copied into production content or the public repository.

## Status

**Batch M is active. SAT Series A Mocks 1–10, PSAT Mocks 1–10, and SAT11–SAT13 are accepted. SAT14 is the next production target.**
