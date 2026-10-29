# Legacy-to-Approved Question Workflow

## Purpose

The frozen 30-mock production corpus is retained as the **legacy review baseline**. The approved-launch area contains only content that has been explicitly reviewed and marked approved.

This workflow prevents the current runtime corpus from being treated as launch-approved merely because it passes technical runtime gates.

## Item statuses

- `LEGACY` — exported from the frozen canonical/runtime corpus; not launch-approved.
- `EDIT` — retained for substantive human editing.
- `REPLACE` — retained only as a reference because a separately authored replacement is required.
- `APPROVED` — reviewed and explicitly approved for canonical staging.
- `REJECTED` — not suitable for launch.

Only `APPROVED` questions may proceed to canonical staging.

## Current tooling

The controlled stages and commands are:

1. Export the frozen corpus (Step 1, complete):
   `npm run question-bank:export-legacy`
2. Import external DOCX/PDF/structured content through Step 2. The importer maps candidates to exact frozen identities and emits candidate content, provenance, figure candidates and exceptions.
3. Normalize candidates through Step 5:
   `npm run question-bank:prelaunch-normalization -- <candidates.json> [figure-candidates.json] [output-dir]`
4. Step 6 (next, after PRs #24–#27 are integrated): resolve material exceptions/substantive content decisions in a provenance-linked review working set. Record explicit dispositions. Never auto-approve on automated QC alone.
5. Move or reproduce only explicitly human-approved items in the approved-launch working area and set `STATUS: APPROVED`.
6. Validate:
   `npm run question-bank:validate -- <approved-mock.md> --approved-only`
7. Promote to staging:
   `npm run question-bank:promote-staging -- <approved-mock.md>`

The staging command writes only to `question-banks/approved-launch-corpus/canonical-promotion-staging/`. It does not mutate production.

## Identity rule

For existing questions, preserve the exact `testKey + questionId`.

Do not create a new mock target. SAT21 is prohibited.

## Content-source rule

Personal question-bank material may be incorporated when the user has the rights to use it.

College Board material must not be copied, closely paraphrased, or transformed one-to-one into production questions. Public specifications/frameworks may be used for alignment subject to applicable terms.

## Production rule

After staging, run the applicable content-quality, mathematical/figure, originality, duplicate, compatibility, and affected-corpus checks. Production mutation requires the separate explicit authorization applicable to the change.

The production boundary is:

**Edit → Review/Approve → Validate → Canonical staging → QC → Explicit authorization when required → Existing canonical production target → Re-gate**

## Current status

The parser, approval gate, canonical staging bridge, answer/choice adapter, CI pilot, source intake, Math typography, visual hardening, and candidate-normalization controls have passed focused tests on the current stacked branches. PRs #24–#27 remain open/unmerged; their code is not yet on `main` or deployed. The full 30-mock legacy document set is materialized and remains LEGACY / NOT LAUNCH APPROVED. Immediate next action is to merge PRs #24–#27 in dependency order; then implement Step 6, the exception-first human review/approval working set. Canonical staging, production application, and release are later steps.

The export is a maintenance/review operation only. It does not authorize production replacement or release.
