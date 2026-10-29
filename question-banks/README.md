# Question-Bank Working Area

This directory is the controlled content-maintenance layer for the frozen 30-mock SAT/PSAT corpus.

## Two connected representations

- `legacy-30-mock-corpus/` — deterministic, non-approved working copies exported from the current frozen canonical/runtime corpus.
- `approved-launch-corpus/` — explicitly reviewed/approved working content and canonical staging artifacts.

These are two representations of the same content, not two independent runtime question banks.

## Controlled flow

```
Frozen 30-mock canonical/runtime corpus
        ↓
legacy-30-mock-corpus/ (frozen, not launch-approved)
        ↓
DOCX/PDF/structured source → Step 2 import/mapping
        ↓
candidate content + provenance + exceptions
        ↓
Step 5 normalization and applicable QC
        ↓
Step 6 exception-first human review / explicit decision
        ↓
STATUS: APPROVED
        ↓
approved-launch-corpus/
        ↓
schema + applicable content/QC gates
        ↓
canonical-promotion-staging/
        ↓
explicit production authorization when required
        ↓
existing canonical production target
        ↓
affected/collective re-gates
```

## Frozen scope

Exactly:

- SAT1–SAT10
- PSAT1–PSAT10
- SAT11–SAT20

No SAT21 may be created.

## Implemented tooling

Legacy export:

`npm run question-bank:export-legacy`

Document validation:

`npm run question-bank:validate -- <mock.md>`

Approval-gated canonical staging:

`npm run question-bank:promote-staging -- <approved-mock.md>`

Pre-launch candidate normalization:

`npm run question-bank:prelaunch-normalization -- <candidates.json> [figure-candidates.json] [output-dir]`

End-to-end CI pilot:

`npm run question-bank:pilot`

The pilot is verified green in GitHub Actions (**run 36152194934**). It uses real SAT1 R&W and Math records, preserves question IDs and answers, and performs no production mutation.

## Current status

The full 30-mock legacy materialization is complete. Steps 2–5 have passing focused acceptance workflows on stacked branches, but PRs #24–#27 remain open/unmerged; their changes are not yet on `main` or deployed. Immediate next action is dependency-ordered integration of PRs #24–#27. After that, Step 6 is to build the exception-first human review/approval working set from normalized candidates and the review queue. Export/import/normalization artifacts remain non-production and do not approve content.