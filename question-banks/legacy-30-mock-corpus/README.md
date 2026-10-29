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

They are not a second runtime question bank. Pre-launch replacement content must enter through docs/QUESTION-BANK-IMPORT-AND-REVIEW-WORKFLOW.md rather than silently overwriting this frozen baseline.

## Review rule

A legacy item may be retained, edited, replaced, or rejected during human review. Nothing becomes launch-approved merely because it appears in this directory.

An approved item must move through the approved-launch workflow and pass the required validation/QC before any controlled canonical promotion.

## Current status

The **full 30-mock document set is materialized** as the frozen LEGACY / NOT LAUNCH APPROVED working set. Steps 2–5 (source intake, Math typography, visual-rendering hardening, and candidate normalization) have passing focused acceptance workflows on stacked branches, but PRs #24–#27 remain open/unmerged and are not yet on `main` or deployed. Immediate next action is dependency-ordered PR integration. After that, Step 6 is exception-first human review and explicit approval; nothing in this directory becomes approved automatically.