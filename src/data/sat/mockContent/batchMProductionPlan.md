# Batch M Production Plan

Batch M is the controlled production stage for the SAT/PSAT-style mock corpus.

## Production sequence

The final corpus is produced in this exact order:

1. **SAT Mocks — Series A: Tests 1–10**
2. **PSAT Mocks: Tests 1–10**
3. **SAT Mocks — Series B: Tests 11–20**
4. **Final collective verification across the full production corpus**

The SAT Series B navigation page is `/SATMocksSeriesB`. It is a release shell only until Tests 11–20 have actually been generated, validated, stored, and accepted. It must not fabricate question data, scores, progress, or payment-success states.

## Generation rule

Mocks are produced and accepted **one mock at a time within the sequence above**. Each mock must pass the applicable generation and QC gates before the next mock is accepted.

For each mock:

1. Build mock blueprint.
2. Generate R&W and Math content.
3. Run independent QC and figure/originality validation.
4. Run mock-level checks.
5. Compare against all previously accepted mocks for cross-mock uniqueness and diversity.
6. Store the accepted mock in the canonical production representation.
7. Only then advance to the next mock in the sequence.

A failed mock is corrected or regenerated before the sequence advances. A failed check must not be bypassed merely to keep production moving.

## Current production checkpoint

**SAT Series A Mocks 1–10 are accepted and stored as canonical runtime production records.**

Mock 10 was accepted only after Mocks 1–9 were accepted and was checked against the complete accepted Series A baseline for R&W context/prompt uniqueness, Math application uniqueness, exact figure-data uniqueness, and series-level figure originality, together with the established figure-quality/Math mathematical QC, canonical schema, 196-record count, and storage round-trip gates.

Mock 10 uses:

- test key: `SAT10`
- test ID: `sat-series-a-mock-10`
- variant: `sat-series-a`
- assessment number: `10`
- deterministic seed: `1010`

The accepted production mocks remain separate from the legacy public corpus. Mock 10 is not exposed publicly.

## Next production target

**PSAT Mock 1 (`PSAT1`).**

PSAT production begins only after the SAT Series A Mock 10 checkpoint is preserved. PSAT Mock 1 must pass the same one-at-a-time production discipline: generation, independent QC, figure/math/originality validation, mock-level checks, cross-mock comparison against all previously accepted production mocks where applicable, canonical storage, and Render deployment acceptance before PSAT Mock 2 begins.

## Final corpus gate

After SAT Series B Mock 20 is accepted, run a collective corpus QC covering:

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

The final corpus gate must consider SAT Series A, PSAT, and SAT Series B together wherever cross-corpus uniqueness or distribution rules apply.

## Production safety

Batch M must not replace or delete the legacy SAT content path until the new corpus has passed the complete corpus-level gate.

Do not commit a partially generated production corpus as if it were complete. Production generation is checkpointed so that an individual mock can be regenerated without silently changing previously accepted mocks.

Private calibration anchors, if authorized and supplied, may inform calibration work through the Batch K private boundary. They are not copied into production content or the public repository.

## Status

**Batch M is active. SAT Series A Mocks 1–10 generation, QC, cross-mock acceptance, and canonical runtime storage checkpoints are complete. The next production target is PSAT Mock 1.**
