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

The bridge is implemented in these stages:

1. Export the frozen corpus:
   `npm run question-bank:export-legacy`
2. Edit/review questions in the legacy document.
3. Move or reproduce the approved question in the approved-launch working area and set `STATUS: APPROVED`.
4. Validate:
   `npm run question-bank:validate -- <approved-mock.md> --approved-only`
5. Promote to staging:
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

The parser, approval gate, canonical staging bridge, answer/choice adapter, CI pilot, source intake, Math typography, visual hardening, and pre-launch candidate normalization controls are implemented and verified. The full 30-mock legacy document set is already materialized; the next documented step is Step 6 human review and approval after candidate normalization.

The export is a maintenance/review operation only. It does not authorize production replacement or release.
