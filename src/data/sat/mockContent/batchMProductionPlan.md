# Batch M Production Plan

Batch M is the controlled production stage for the SAT/PSAT-style mock corpus.

## Production sequence

The final corpus is produced in this exact order:

1. **SAT Mocks — Series A: Tests 1–10** — accepted
2. **PSAT Mocks: Tests 1–10** — accepted
3. **SAT Mocks — Series B: Tests 11–20** — accepted
4. **Final collective verification across the full 30-mock production corpus** — next

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

**SAT Series A Mocks 1–10, PSAT Mocks 1–10, and SAT Series B Mocks 11–20 are accepted, stored as canonical runtime production records, and confirmed Render-LIVE. Production generation is complete.**

The authoritative frozen inventory is `docs/BATCH-M-PRODUCTION-CORPUS-MANIFEST.md`.

## Frozen production corpus

The Batch M production corpus contains exactly **30 mocks**:

- SAT Series A: `SAT1` through `SAT10`
- PSAT: `PSAT1` through `PSAT10`
- SAT Series B: `SAT11` through `SAT20`

Each accepted production mock contains 196 validated records. The production records remain separate from the legacy public corpus until the final corpus gate passes.

The corpus is now frozen. During collective verification, no SAT21 or other new Batch M production mock may be generated, and accepted mocks must not be silently regenerated or replaced.

## Final corpus gate

The next task is collective corpus QC covering:

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

Do not commit a partially generated production corpus as if it were complete. Production generation is checkpointed so that an individual mock can be regenerated without silently changing previously accepted mocks. Once the 30-mock corpus is frozen, any required correction must be explicitly recorded and the affected corpus checks rerun.

Private calibration anchors, if authorized and supplied, may inform calibration work through the Batch K private boundary. They are not copied into production content or the public repository.

## Status

**Batch M production generation is complete. The 30-mock corpus is frozen for collective verification. The next task is final collective corpus QC. There is no SAT21 production target.**
