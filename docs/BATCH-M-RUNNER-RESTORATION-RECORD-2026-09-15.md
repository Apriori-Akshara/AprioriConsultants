# Batch M Runner Restoration Record — September 15, 2026

**Purpose:** Record the restoration of the larger candidate-only Batch M dry-run runner and its remediated candidate-factory dependency so the change can be retraced if a later QC/build issue occurs.

## Restored files

1. `scripts/runBatchMTargetedReplacementDryRun.js`
   - Source: user-provided newer local/uploaded runner.
   - Source file is the larger runner previously identified as the 522-line version (the Windows `wc -l` count is 521 because the file does not end with an extra newline).
   - Architecture: uses `buildRepresentativeBatchMRemediationCandidates`, detailed R&W/Math bucket checks, content-quality reporting, uniqueness checks, Math SPR 25–30% validation, and candidate-only status checks.
   - Restored to the Batch M remediation branch in commit:
     `29ac742c2a6d950bce0f9eb96e9c99ef7cee0495`
     `Batch M: restore exact larger targeted dry-run runner`

2. `src/data/sat/mockContent/batchMRemediationCandidateFactory.js`
   - Source: user-provided non-OLD factory from the older reference folder.
   - This file is the supporting factory imported by the larger runner.
   - Restored to the Batch M remediation branch in commit:
     `7cd3efb743d8fa075611611f4d18f2c064632b54`
     `Batch M: restore remediated candidate factory`

## Important transient commit

An intermediate runner write was made during the restoration process using a compressed representation of the file:

`0eedd12c985837891fccb84766e21f29dac793a1`
`Batch M: restore larger targeted dry-run runner`

That intermediate version was immediately recognized as not being the exact uploaded runner and was superseded by:

`29ac742c2a6d950bce0f9eb96e9c99ef7cee0495`

The intermediate commit must not be treated as the intended final runner version.

## Safety boundary

- The work was limited to candidate-generation/QC support files and documentation.
- The frozen production corpus was not intentionally mutated.
- No production replacement or release authorization was performed.
- The Batch M PR remains a draft and must still pass the complete SAT + PSAT dry-run gates before any production replacement discussion.

## Synchronization requirement

The online GitHub branch is now the authoritative copy for these two restored files. The local active working copy at `D:\AprioriConsultants-Git` must be synchronized from GitHub before the next local QC run.

Before running QC, verify that the active folder is on:

`batch-m-rw-generator-remediation-2026-09-14`

and that the local working copy contains the restored runner and factory.

## Recovery pointer

If a later build/QC issue appears after this restoration, use the following as the exact recovery point:

- Runner restoration commit: `29ac742c2a6d950bce0f9eb96e9c99ef7cee0495`
- Factory restoration commit: `7cd3efb743d8fa075611611f4d18f2c064632b54`
- Superseded intermediate runner commit: `0eedd12c985837891fccb84766e21f29dac793a1`
- Source-of-truth branch: `batch-m-rw-generator-remediation-2026-09-14`
