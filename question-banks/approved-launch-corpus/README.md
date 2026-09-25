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

The parser, approval gate, staging bridge, answer-resolution adapter, and CI pilot are implemented and verified. Full 30-mock content materialization and human review are the next maintenance steps.