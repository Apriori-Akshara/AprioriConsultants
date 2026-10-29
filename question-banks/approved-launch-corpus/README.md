# Approved Launch Corpus

This directory is the **human-review and approval working area** for content intended for launch.

It is separate from `question-banks/legacy-30-mock-corpus/`.

## Required lifecycle

`LEGACY / DRAFT → REVIEW → APPROVED → VALIDATE → CANONICAL STAGING → AUTHORIZED PRODUCTION → RE-GATE → RELEASE`

Approval does not by itself mutate production.

Canonical staging is written to:

`question-banks/approved-launch-corpus/canonical-promotion-staging/`

## Required identity

Every existing question must retain its exact `testKey + questionId` unless an explicit identity migration is separately approved.

No new mock target may be created through this workflow.

## Validation commands

`npm run question-bank:validate -- <approved-mock.md> --approved-only`

`npm run question-bank:promote-staging -- <approved-mock.md>`

The promotion command performs approved-only validation first and writes staging only. Production mutation remains a separate authorized operation.

## Current status

The approval gate, staging bridge, answer-resolution adapter and CI pilot are implemented and verified. The full 30-mock legacy baseline is already materialized separately. Steps 2–5 have passing focused acceptance workflows on stacked branches, but PRs #24–#27 remain open/unmerged and are not yet on `main` or deployed. After dependency-ordered PR integration, Step 6 will build the exception-first human review/approval working set. This directory must contain only explicitly human-approved content; automated QC does not confer approval.