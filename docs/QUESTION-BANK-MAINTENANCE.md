# Question Bank Maintenance Checkpoint

Approved September 14, 2026; current Batch M status and full legacy materialization updated September 26, 2026.

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

### Bulk source-input workflow

For pre-launch content consolidation, do not require manual question-by-question Markdown editing. User-supplied DOCX, PDF, or structured pasted text enters the non-production source-import workflow defined in docs/QUESTION-BANK-IMPORT-AND-REVIEW-WORKFLOW.md.

The sequence is:

**Source document → deterministic mapping → candidate content → human-editable representation → canonical candidate → exception-first QC/review → approval → applicable staging/QC**

Pre-launch source changes are candidate replacements/content candidates, not post-launch maintenance edits. The frozen legacy corpus remains the baseline and is not silently overwritten.

### Math and visual normalization

Before final launch acceptance, Math notation and visual rendering are normalized through:

- docs/SAT-MATH-TYPOGRAPHY-AND-RENDERING-STANDARD.md
- docs/SAT-FIGURE-DATA-AND-RENDERING-STANDARD.md

Raw ASCII math display such as caret exponents, ASCII inequality operators, or ambiguous fraction text must not remain in student-facing Math when typeset mathematical notation is intended. Figures remain structured data rendered deterministically.

Post-launch editing is reserved for observed released-item problems, including incorrect answers, wording mismatches, mathematical display defects, or figure/graph/chart rendering mismatches.

### Current controlled workflow

**Select exact testKey + questionId → edit the human-readable mock document → review and mark APPROVED → validate → promote to canonical staging → run applicable QC → explicit production authorization when required → apply to existing canonical target → re-run required affected/collective gates.**

Never treat a legacy export as launch-approved merely because it has been generated. Never treat canonical staging as production.

The complete document/canonical contract is maintained in docs/HUMAN-EDITABLE-CANONICAL-QUESTION-BANK-SPEC.md. Bulk intake is defined in docs/QUESTION-BANK-IMPORT-AND-REVIEW-WORKFLOW.md; Math typography and visual rendering are defined in the dedicated standards.

**Status:** IMPLEMENTED / PILOT VERIFIED. Step 1 full 30-mock legacy materialization is complete; Step 2 bulk source intake and deterministic mapping is next.

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

### Step 1 — Full 30-mock legacy document materialization — COMPLETE

The frozen 30-mock legacy document set is materialized and recorded.

### Step 2 — Bulk source intake and deterministic mapping — COMPLETE

Implemented the documented non-production bulk source-input workflow for DOCX, text-PDF, structured JSON/text, and pasted structured content. It produces exact frozen-identity mappings, candidate content, provenance, structured table candidates where recoverable, and an exception manifest. The workflow does not mutate production.

**Acceptance result (2026-09-26):** GitHub Actions Step 2 acceptance run #14 passed: 30 frozen mocks / 5,880 frozen questions preserved; 4 deterministic mappings; 4 candidates; 1 structured figure candidate; negative-path coverage for ambiguous mapping and missing required content; production mutation: false. The implementation-specific test was npm run question-bank:source-import:test.

Step 4 is complete; Step 5 is now the next implementation step.

### Step 3 — Canonical Math typography and student-facing rendering — COMPLETE — 2026-09-26

Implemented the approved Math typography layer for the student-facing mock runner and reusable figure presentation path. The layer is conservative, deterministic, and shared by question prompts, answer choices, Math Reference formulas, table content, graph axes/labels, geometry labels, and 3D figure labels. Mathematical identity/content is not rewritten in the source bank.

**Acceptance result:** GitHub Actions Step 3 acceptance run #10 passed on commit f09d62b55e8da40cd002975a250d55a74aaaab8f with 17 implementation-specific assertions, including deterministic output, accessible Math role, shared SVG notation, and preservation of URLs/date-like source text.

Step 4 — Figure/graph/chart/table rendering hardening — COMPLETE — 2026-09-26.

### Step 4 — Structured figure/graph/chart/table rendering hardening — COMPLETE — 2026-09-26

Implemented docs/SAT-FIGURE-DATA-AND-RENDERING-STANDARD.md across the current structured-figure student renderer. Charts and graphs now use deterministic axes, ticks, scales, category positions, and consistent source data; bar charts correctly handle zero/negative baselines; multi-series charts expose a legend and non-color series distinction; tables use the shared Math typography path; SVG figures expose accessible titles/descriptions; unsafe geometry/3D default dimensions and unsupported parabola fallbacks were removed; unsupported/future figure families still fail closed.

**Acceptance result:** GitHub Actions Step 4 acceptance run #3 passed on commit dc608b39b06f2b71eb82412b527d2d90c87b318c. The focused implementation-specific test passed 25 assertions across 11 representative supported figure families, with deterministic layout, numeric axes, table Math typography, accessibility-contract coverage, unsupported/future fail-closed behavior, and `productionMutation: false`.

**Scope boundary:** No Step 5 normalization, exception-first review, human approval, canonical promotion, production replacement, or release work was started.

### Step 5 — Pre-launch candidate normalization and exception-first review

Apply imported candidates and approved source material through the human-editable/canonical candidate path. Run structural, content, Math, figure, originality, duplicate, and compatibility checks. Send only material exceptions to human review.

### Step 6 — Human review and approval working set

Resolve the exception queue and controlled substantive content decisions. Approved content moves to the approved-launch working area; it is not silently promoted to production.

### Step 7 — Controlled promotion and QC

Validate approved documents and promote only to canonical staging. Run all applicable item/mock/corpus gates before any production authorization.

### Step 8 — Explicit production application where authorized

Only explicit production authorization may replace an existing canonical production target. Preserve testKey + questionId and the frozen 30-mock boundary.

### Step 9 — Post-launch maintenance

After launch, use the human-editable document for exact released-item corrections, including wording, answer, mathematical display, or figure/graph/chart mismatches. Reconstruct canonical content, run the applicable gates, and apply only after required authorization.

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

**Batch M production generation, targeted remediation, authorized replacements, final corpus gates, cross-corpus calibration, and public quick-check are complete. The human-editable/canonical bridge and Step 1 legacy materialization are complete. Steps 2–4 bulk source intake, Math typography, and figure/graph/chart/table rendering hardening are complete. The next implementation step is Step 5 pre-launch candidate normalization and exception-first review.**
