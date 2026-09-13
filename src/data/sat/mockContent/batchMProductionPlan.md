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

## Mock 1 checkpoint

**SAT Series A Mock 1 is now the first accepted production checkpoint.** The build-time production gate generates it deterministically, runs the established generation/QC pipeline, rewrites it into the Series A production namespace, verifies the canonical question schema and JSON round-trip, and exposes the accepted result through `batchMProductionStore.js`.

This is a **canonical runtime storage checkpoint**, not a replacement of the legacy public corpus. The existing live SAT/PSAT corpus remains unchanged until the complete production corpus has passed the final collective gate.

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

**Batch M is active. SAT Series A Mock 1 generation, QC, and canonical runtime storage checkpoint are implemented.** The next production step is SAT Series A Mock 2, which must be generated and cross-compared against accepted Mock 1 before it can be accepted.
