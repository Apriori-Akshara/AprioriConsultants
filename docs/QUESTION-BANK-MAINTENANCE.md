# Question Bank Maintenance Checkpoint

Approved September 14, 2026; current Batch M status updated September 16, 2026.

## Taxonomy rule

This project uses **Batch A–M** as its single implementation taxonomy. “Phase” is a legacy synonym and should not be used for new work.

The 30-mock production corpus is built as one controlled Batch M sequence. Production records use stable mock/item identities and canonical runtime storage; the legacy public corpus remains separate until final release approval.

## Approved implementation sequence

A schema → B blueprint → C R&W construction → D R&W distractor/evidence/QC → E figure framework → F basic visuals → G 2D geometry → H 3D/future multi-source → I Math integration/QC → J figure/originality → K calibration → L end-to-end test → M controlled production.

### Batch M production order

1. **SAT Series A — Mocks 1–10** — accepted
2. **PSAT — Mocks 1–10** — accepted
3. **SAT Series B — Mocks 11–20** — accepted and deployed; public verification deferred
4. **Final collective QC across the complete production corpus** — passed at the pre-remediation freeze
5. **Production-store cleanliness checkpoint** — passed
6. **Maintenance/spec safeguard verification** — passed
7. **SAT/PSAT content-quality QC** — completed, remediated for the affected 20-test scope, and re-gated successfully

Each mock was generated, independently QC-checked, cross-compared with previously accepted mocks, stored, and deployed to Render before the next mock was accepted. No additional production target remains.

## Batch M — Controlled production generation

**Status: COMPLETE / FROZEN, with targeted post-freeze remediation completed for SAT1–SAT10 and PSAT1–PSAT10.**

All 30 production mocks remain part of the frozen Batch M sequence. SAT11–SAT20 are deployed in the live Series B runtime, but their public-site inspection remains intentionally deferred until the later release checkpoint.

Deferred verification must not be interpreted as rejection or acceptance of the user-facing presentation of SAT11–SAT20. The inspection remains an explicit later release checkpoint.

## Production-store cleanliness checkpoint

The canonical production store is checkpointed as clean:

- `BATCH_M_ACCEPTED_PRODUCTION_CORPUS` contains exactly the frozen 30 production mocks.
- The corpus order matches the authoritative `BATCH_M_PRODUCTION_SEQUENCE`.
- The store exports no SAT21 production target.
- `nextTestKey` is `null`; there is no remaining Batch M generation target.
- Production records remain separate from the legacy public corpus.

This is a release checkpoint, not permission for unrecorded mutation. Any further correction after the completed targeted remediation must be an explicitly recorded corpus change followed by the affected individual gates and the final collective gate again.

## Human-editable and canonical question-bank model

The project uses two connected representations of each accepted question:

- **Human-editable mock question-bank document:** the preferred content-authoring surface under `question-banks/legacy-30-mock-corpus/` and `question-banks/approved-launch-corpus/`.
- **Canonical question record:** the validated structured representation used by the existing runtime, production assembly, and QC.

These are two representations of the same content, not two independent runtime banks.

The document bridge is implemented and CI-verified. The runtime website continues to use the existing canonical production store until an approved, explicitly authorized promotion is applied.

### Implemented controls

- deterministic 30-mock export;
- deterministic Markdown parser;
- canonical `validateSatQuestion` schema validation;
- explicit `STATUS: APPROVED` gate for canonical staging;
- canonical staging under `question-banks/approved-launch-corpus/canonical-promotion-staging/`;
- conservative answer/choice resolution through `scripts/humanQuestionBankContentAdapter.mjs`;
- end-to-end SAT1 R&W + Math pilot;
- GitHub Actions verification with no production mutation.

Verified pilot: GitHub Actions **run 36152194934 — SUCCESS**.

### Current controlled workflow

**Select exact testKey + questionId → edit the human-readable mock document → review and mark APPROVED → validate → promote to canonical staging → run applicable QC → explicit production authorization when required → apply to existing canonical target → re-run required affected/collective gates.**

Never treat a legacy export as launch-approved merely because it has been generated. Never treat canonical staging as production.

The complete contract is maintained in `docs/HUMAN-EDITABLE-CANONICAL-QUESTION-BANK-SPEC.md`.

**Status:** IMPLEMENTED / PILOT VERIFIED. Full 30-mock legacy document materialization is the next step.

## Batch M release and content-quality acceptance sequence

The frozen 30-mock production corpus and the authorized 25-target replacement package are complete. The current Batch M release status is **not release-eligible** until the remaining downstream technical, student-acceptance, and final release checkpoints pass.

Completed and not to be repeated wholesale:

1. frozen 30-mock production generation;
2. targeted remediation and authorized replacements;
3. 195-target calibration reconciliation and authorized application;
4. final 30-mock corpus gate;
5. 30-mock cross-corpus calibration;
6. exact 25-target package validation and authorized production application;
7. post-mutation collective gates;
8. public quick-check of all 30 mocks;
9. Series B runtime-loading remediation and focused verification.

The human-editable/canonical bridge is a **maintenance capability**, not a new Batch N and not a replacement for the Batch M release gate.

## Current implementation order

### Step 1 — Full 30-mock legacy document materialization — NEXT

Run:

`npm run question-bank:export-legacy`

Expected result:

- 30 Markdown documents;
- SAT1–SAT10, PSAT1–PSAT10, SAT11–SAT20 only;
- 196 questions per document;
- 5,880 questions total;
- all exported questions remain `STATUS: LEGACY`;
- no production mutation;
- no SAT21.

### Step 2 — Human review/approval working set

Use the generated legacy documents as the review baseline. Retain, edit, replace, or reject items individually. Approved items move into the approved-launch working area; they are not silently promoted to production.

### Step 3 — Controlled promotion and QC

For an approved mock document:

`npm run question-bank:validate -- <approved-mock.md>`

then:

`npm run question-bank:promote-staging -- <approved-mock.md>`

Promotion writes canonical staging only. Run the applicable content, mathematical/figure, originality, duplicate, compatibility, and affected-corpus gates before any production authorization.

### Step 4 — Production promotion

Only an explicit production authorization may allow a staged approved item to replace an existing canonical production target. Preserve `testKey + questionId` and the frozen 30-mock boundary.

## Post-freeze maintenance rules

- No new Batch M target may be created.
- No accepted mock may be silently regenerated, reordered, or broadly replaced.
- Human-editable documents are the preferred authoring surface for routine item maintenance.
- Canonical staging is not production.
- Any authorized production edit requires the applicable affected-item and collective re-gates.
- Do not create SAT21.
- Do not copy private calibration anchors into production or the public repository.
- Changes outside question content, storage, rendering, or required release dependencies remain outside this maintenance track.

## Current status

**Batch M production generation, targeted remediation, authorized replacements, final corpus gates, cross-corpus calibration, and public quick-check are complete. The human-editable/canonical bridge is implemented and pilot-verified. The next implementation step is full 30-mock legacy document materialization.**
