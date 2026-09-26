# Legacy 30-Mock Corpus

This directory is a **non-approved working copy** of the current frozen 30-mock canonical/runtime corpus.

## Scope

- SAT1–SAT10
- PSAT1–PSAT10
- SAT11–SAT20
- 196 questions per mock
- 5,880 questions total when fully materialized
- SAT21: prohibited / not created
- approval status: **LEGACY — NOT LAUNCH APPROVED**
- production mutation: none

The documents are generated from the frozen canonical/runtime corpus by:

`npm run question-bank:export-legacy`

They are not a second runtime question bank.

## Review rule

A legacy item may be retained, edited, replaced, or rejected during human review. Nothing becomes launch-approved merely because it appears in this directory.

An approved item must move through the approved-launch workflow and pass the required validation/QC before any controlled canonical promotion.

## Current status

The tooling bridge and SAT1 pilot are implemented and CI-verified. The **full 30-mock document set has been materialized** as the frozen legacy working set. The next documented implementation step is human review/approval working-set preparation.