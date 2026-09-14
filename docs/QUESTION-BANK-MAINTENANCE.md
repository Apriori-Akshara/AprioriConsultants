# Question Bank Maintenance Checkpoint

Approved September 14, 2026.

## Taxonomy rule

This project uses **Batch A–M** as its single implementation taxonomy. “Phase” is a legacy synonym and should not be used for new work.

The 30-mock production corpus is built as one controlled Batch M sequence. Production records use stable mock/item identities and canonical runtime storage; the legacy public corpus remains separate until final release approval.

## Approved implementation sequence

A schema → B blueprint → C R&W construction → D R&W distractor/evidence/QC → E figure framework → F basic visuals → G 2D geometry → H 3D/future multi-source → I Math integration/QC → J figure/originality → K calibration → L end-to-end test → M controlled production.

### Batch M production order

1. **SAT Series A — Mocks 1–10** — accepted
2. **PSAT — Mocks 1–10** — accepted
3. **SAT Series B — Mocks 11–20** — accepted
4. **Final collective QC across the complete production corpus** — passed
5. **Production-store cleanliness checkpoint** — passed

Each mock was generated, independently QC-checked, cross-compared with previously accepted mocks, stored, and deployed to Render before the next mock was accepted. No additional production target remains.

## Batch M — Controlled production generation

**Status: COMPLETE.**

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
- PSAT Mock 10 — accepted and stored.
- SAT Series B Mock 11 — accepted and stored.
- SAT Series B Mock 12 — accepted and stored.
- SAT Series B Mock 13 — accepted and stored.
- SAT Series B Mock 14 — accepted and stored.
- SAT Series B Mock 15 — accepted and stored.
- SAT Series B Mock 16 — accepted and stored.
- SAT Series B Mock 17 — accepted and stored.
- SAT Series B Mock 18 — accepted and stored.
- SAT Series B Mock 19 — accepted and stored.
- SAT Series B Mock 20 — accepted and stored; Render LIVE confirmed.

Each accepted production mock contains 196 validated records. The final collective gate verifies exactly 30 mocks and 5,880 total records, canonical schema integrity, global question-ID uniqueness, applicable R&W/Math/figure uniqueness, figure originality, identity/order, and storage round-trip integrity.

## Production-store cleanliness checkpoint

The canonical production store is now explicitly checkpointed as clean:

- `BATCH_M_ACCEPTED_PRODUCTION_CORPUS` contains exactly the frozen 30 production mocks.
- The corpus order matches the authoritative `BATCH_M_PRODUCTION_SEQUENCE`.
- The store exports no SAT21 production target.
- The final collective verification runs against the exported frozen corpus.
- The production corpus remains separate from the legacy public corpus.
- `nextTestKey` is `null`; there is no remaining Batch M generation target.

This is a release checkpoint, not permission to mutate the corpus. Any correction after this point must be an explicitly recorded corpus change followed by the affected individual gates and the final collective gate again.

## Current next target

**Step 4 — maintenance/spec safeguard verification.** After that verification passes, begin the planned public website inspection of all 30 production mocks. Do not generate SAT21.

## Production safety

Batch M must not replace or delete the legacy SAT content path until release approval is complete.

Do not commit a partially generated production corpus as if it were complete. Do not silently regenerate or replace an accepted mock after the corpus freeze. Any post-freeze correction must be explicitly recorded and re-verified.

Private calibration anchors, if authorized and supplied, are not copied into production content or the public repository.

## Status

**Batch M production generation, collective corpus verification, and production-store cleanliness checkpoint are complete. The next task is maintenance/spec safeguard verification, followed by public website inspection.**
