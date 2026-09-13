# Batch M Production Plan

Batch M is the controlled production stage for the 20-mock SAT/PSAT-style corpus.

## Generation rule

Mocks are produced and accepted **one mock at a time**. Each mock must pass the applicable generation and QC gates before the next mock is accepted.

The sequence is:

1. Build mock blueprint.
2. Generate R&W and Math content.
3. Run independent QC and figure/originality validation.
4. Run mock-level checks.
5. Compare against previously accepted mocks for cross-mock uniqueness and diversity.
6. Store the accepted mock in the canonical production representation.
7. Proceed to the next mock.

A failed mock is corrected or regenerated before the sequence advances. A failed check must not be bypassed merely to keep production moving.

## Final corpus gate

After Mock 20 is accepted, run a collective 20-mock corpus QC covering:

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

## Production safety

Batch M must not replace or delete the legacy SAT content path until the new corpus has passed the complete corpus-level gate.

Do not commit a partially generated production corpus as if it were complete. Production generation should be checkpointed so that an individual mock can be regenerated without silently changing previously accepted mocks.

Private calibration anchors, if authorized and supplied, may inform calibration work through the Batch K private boundary. They are not copied into production content or the public repository.

## Status

Batch M is planned but must only begin after Batch L has passed and the production generation run has been explicitly started.
