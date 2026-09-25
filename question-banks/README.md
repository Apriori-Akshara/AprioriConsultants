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
legacy-30-mock-corpus/
        ↓
human review / edit
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

End-to-end CI pilot:

`npm run question-bank:pilot`

The pilot is verified green in GitHub Actions (**run 36152194934**). It uses real SAT1 R&W and Math records, preserves question IDs and answers, and performs no production mutation.

## Current status

The bridge is implemented and pilot-verified. The **next step is full 30-mock legacy document materialization**. The export remains non-production and must not be treated as launch approval.