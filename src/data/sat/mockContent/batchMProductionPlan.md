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

**SAT Series A Mocks 1–10, PSAT Mocks 1–10, and SAT Series B Mocks 11–16 are accepted and stored as canonical runtime production records. SAT16 has also passed the Render acceptance gate and is confirmed LIVE. SAT17 is the active target.**

### Accepted SAT Series B checkpoints

SAT11 through SAT16 are accepted and Render-LIVE. Their production identities are controller-defined, each has 196 validated records, and each remains stored separately from the legacy public corpus.

SAT16:
- test key: `SAT16`
- test ID: `sat-series-b-mock-16`
- variant: `sat-series-b`
- assessment number: `16`
- deterministic seed: `1016`
- cross-mock baseline: all 25 earlier accepted production mocks
- canonical storage mode: `canonical-runtime-records`
- validated question count: `196`

Implementation merge commit:
- `a27fdaa59f96296e1d1d467b24110fa09a56fa18` — `Batch M: Add SAT16 production gate and canonical storage`

**Render acceptance:** User-confirmed LIVE for SAT16.

## Current production target — SAT17

**SAT Series B Mock 17 (`SAT17`) is the active production target.**

SAT17 uses the controller-defined identity:

- test key: `SAT17`
- test ID: `sat-series-b-mock-17`
- variant: `sat-series-b`
- assessment number: `17`
- deterministic seed: `1017`
- cross-mock baseline: all 26 previously accepted production mocks
- canonical storage mode: `canonical-runtime-records`
- validated question count: `196` required by the production gate

SAT17 is implemented through:

- `src/data/sat/mockContent/batchMSAT17ProductionGate.js`
- `src/data/sat/mockContent/batchMProductionStore.js`

The SAT17 gate preserves the established generation, Stage 2 post-processing, figure quality, Math mathematical QC through the existing mock-quality path, R&W variation, cross-mock uniqueness, figure originality, canonical schema, 196-record, and JSON storage round-trip checks.

SAT17 must not be considered accepted until its Render deployment is confirmed LIVE.

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

**Batch M is active. SAT Series A Mocks 1–10, PSAT Mocks 1–10, and SAT11–SAT16 are accepted. SAT17 is the active production target.**
