# Question Bank Maintenance Checkpoint

Approved September 13, 2026.

## Taxonomy rule

This project uses **Batch A–M** as its single implementation taxonomy. “Phase” is a legacy synonym and should not be used for new work.

The 20-mock production corpus is built as one controlled Batch M sequence. Production records use stable mock/item identities and canonical runtime storage; the legacy public corpus remains separate until final corpus acceptance.

## Approved implementation sequence

A schema → B blueprint → C R&W construction → D R&W distractor/evidence/QC → E figure framework → F basic visuals → G 2D geometry → H 3D/future multi-source → I Math integration/QC → J figure/originality → K calibration → L end-to-end test → M controlled production.

### Batch M production order

1. **SAT Series A — Mocks 1–10** — accepted
2. **PSAT — Mocks 1–10** — accepted
3. **SAT Series B — Mocks 11–20** — next
4. **Final collective QC across the complete production corpus**

Each mock is generated, independently QC-checked, cross-compared with previously accepted mocks, stored, and deployed to Render before the next mock is accepted. The SAT Series B navigation page is `/SATMocksSeriesB`; it is a release shell until the corresponding production mocks exist and pass QC.

## Batch M — Controlled production generation

**Status: ACTIVE / SAT SERIES A MOCKS 1–10 AND PSAT MOCKS 1–10 ACCEPTED.**

### Accepted production checkpoints

- SAT Series A Mock 1 — accepted and stored.
- SAT Series A Mock 2 — accepted and stored.
- SAT Series A Mock 3 — accepted and stored.
- SAT Series A Mock 4 — accepted and stored.
- SAT Series A Mock 5 — accepted and stored.
- SAT Series A Mock 6 — accepted and stored.
- SAT Series A Mock 7 — accepted and stored.
- SAT Series A Mock 8 — accepted and stored.
- SAT Series A Mock 9 — accepted and stored.
- SAT Series A Mock 10 — accepted and stored.
- PSAT Mock 1 — accepted and stored.
- PSAT Mock 2 — accepted and stored.
- PSAT Mock 3 — accepted and stored.
- PSAT Mock 4 — accepted and stored.
- PSAT Mock 5 — accepted and stored.
- PSAT Mock 6 — accepted and stored.
- PSAT Mock 7 — accepted and stored.
- PSAT Mock 8 — accepted and stored.
- PSAT Mock 9 — accepted and stored.
- **PSAT Mock 10 — accepted and stored; Render LIVE confirmed.**

### PSAT Mock 10 record

- test key: `PSAT10`
- test ID: `psat-mock-10`
- variant: `psat-nmsqt`
- assessment number: `10`
- deterministic seed: `2010`
- canonical storage mode: `canonical-runtime-records`
- validated question count: `196`
- implementation commits: `781cb832d9984f2ab78ed29648cd2a0a92dcac94` and `cbeeb1c6c20a756e10c184ae774fbf9293550d90`

PSAT10 was accepted only after SAT1–SAT10 and PSAT1–PSAT9. Its production gate checked cross-mock R&W context/prompt uniqueness, Math application uniqueness, exact figure-data uniqueness, figure originality, figure-quality/Math QC, canonical schema integrity, 196-record count, and JSON storage round-trip integrity.

## Current next target

**SAT Series B Mock 11 (`SAT11`).**

SAT11 must be generated only after preserving the 20-mock accepted checkpoint above. It must be checked against all 20 previously accepted production mocks and must pass the same generation, independent QC, figure/math/originality, mock-level, canonical-storage, and Render acceptance gates.

## Production safety

Batch M must not replace or delete the legacy SAT content path until the complete corpus-level gate passes.

Do not commit a partially generated production corpus as if it were complete. Production generation is checkpointed so an individual mock can be regenerated without silently changing previously accepted mocks.

Private calibration anchors, if authorized and supplied, are not copied into production content or the public repository.

## Status

**Batch M is active. SAT Series A Mocks 1–10 and PSAT Mocks 1–10 are accepted, QC-checked, canonically stored, and deployment-accepted. The next production target is SAT Series B Mock 11 (`SAT11`).**
