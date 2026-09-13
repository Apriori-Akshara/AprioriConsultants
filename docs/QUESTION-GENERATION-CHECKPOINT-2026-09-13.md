# Question Generation Checkpoint — September 13, 2026

**Purpose:** Preserve the exact question-generation implementation state at the completion of Batch K so later work resumes from the next unfinished phase without repeating completed implementation or audit work.

## Current architecture

**Stage 1 Blueprint → Stage 2 Draft → Stage 3 Independent QC Review → Canonical Storage → Existing SAT Engine**

The existing SAT/adaptive engine remains the delivery engine. Question-generation work is limited to generation, storage, validation, and figure rendering.

## Phase history and status

### A — Canonical schema + compatibility foundation
**Status:** Completed foundation.

### B — Blueprint engine
**Status:** Completed foundation and used by the current Math construction path.

### C — Verbal source/passage/question construction
**Status:** Implemented in the current R&W generation path.

### D — Verbal distractor, evidence map, and independent QC
**Status:** Complete and publicly spot-checked. The current R&W path uses misconception-oriented distractor architecture, internal evidence support, deterministic independent QC, and a passed-status delivery gate.

### E — Figure framework + rendering foundation
**Status:** Complete and live.

### F — Basic data visuals
**Status:** Complete and live/verified by public Mock 3 spot checks.

### G — 2D Math/geometry visuals
**Status:** Complete and live. Number lines remain deliberately deferred.

### H — 3D solids + future multi-source architecture
**Status:** Implemented/current checkpoint and publicly verified. `3d_solid` is structurally validated and rendered deterministically. `multi_source_table` remains future-only and is not live-enabled.

### I — Math integration + mathematical QC
**Status: COMPLETE / LIVE.**

The final live deployment is commit `bdaecfb1e35bdbfdc2279e62cdd2961d065f5916`. Phase I includes strengthened Math figure contracts, deterministic mathematical QC, selected legacy figure canonicalization, deterministic construction checks, figure-integrity checks, nonnumeric legacy SPR normalization, cyclic answer placement for normalized responses, and rejection of deterministic mathematical inconsistencies.

### J — Figure validation + originality/uniqueness
**Status: COMPLETE / LIVE.**

The final J runtime commit is `a27ffb1f5af4faaf7360b224e87ea1d652069bd8`. J strengthened figure-specific validation, relationship checks, structure fingerprints, exact figure-data fingerprints, and cross-mock exact-data duplication checks while preserving legitimate same-mock structural reuse.

## Phase K — Calibration corpus + assessment calibration

**Status: IMPLEMENTED / READY FOR PRIVATE ANCHOR POPULATION.**

Batch K establishes the private calibration boundary without placing copyrighted official anchor content in the public repository.

The implementation is `src/data/sat/mockContent/calibrationCorpus.js`. It provides:

1. controlled calibration domains and difficulty bands;
2. validation for metadata-only calibration records;
3. local/private corpus loading through `SAT_CALIBRATION_CORPUS_DIR`;
4. domain/difficulty anchor selection for future Stage 2 drafting;
5. corpus coverage summaries;
6. assessment-oriented target profiles for source family and cognitive demand.

The repository now contains `internal-only/calibration-corpus/README.md` and `.gitignore` protection for private anchor files. Official/retired College Board anchor text is intentionally **not** committed here. When no private corpus directory is configured, the adapter returns an empty corpus and the live SAT application remains unchanged.

This is a deliberate implementation boundary: actual official/retired anchor files must be supplied in a private/local environment under an appropriate use basis. The repository does not fabricate or redistribute copyrighted calibration material.

### K calibration decision

The **K software/integration work is complete**. Private anchor population is an operational input, not a public-repository code change. The calibration adapter is ready for that input and does not block the repository from proceeding to the controlled end-to-end gate.

## Production-generation gate

No production-volume generation of the final 20 mocks begins before:

- Batch I Math integration/QC passes; **COMPLETE**;
- Batch J figure validation and originality/uniqueness passes; **COMPLETE**;
- Batch K calibration infrastructure passes; **COMPLETE**;
- Batch L end-to-end generation/QC/storage/adapter testing passes; **PENDING / HARD GATE**.

Batch M remains hard-gated on Batch L.

## Batch I commits

- `f109fc48d9043c53bf7b2ad6f65c0cb924d20a4a` — `Batch I: Strengthen Math figure contracts for QC`
- `da28ab0dddb56639adfc149941c166f8109ca4c5` — `Batch I: Add independent mathematical QC layer`
- `04df0da20faa870b22bb94cf156374ee77393c03` — `Batch I: Integrate Math figures and mathematical QC`
- `f50975ac63c789dbb338f9ea7b858533c7abca93` — `Batch I: Complete independent mathematical QC coverage`
- `612b990dd2d58b66b72cff910797584d378c5b9b` — `Batch I: Normalize nonnumeric Math SPR responses`
- `88509b7c2b043fa0c829a30d13d942ae47192fb6` — `Batch I: Balance normalized Math response choices`
- `bdaecfb1e35bdbfdc2279e62cdd2961d065f5916` — `Batch I: Stabilize normalized Math response positions`

## Batch J commit

- `a27ffb1f5af4faaf7360b224e87ea1d652069bd8` — `Batch J: Strengthen figure originality and relationship QC`

## Batch K commits

- `0a91844d37c90e7fb539f21b544dea0da11d2b93` — `Batch K: Add private calibration corpus adapter`
- `a5d756f414ed35b9275e8ae6724fc0d94f49dd4a` — `Batch K: Establish private calibration corpus boundary`

## Closure decision

**Batch K software/integration implementation is complete.** No further Batch K code changes are required unless the private anchor population or Batch L exposes a concrete calibration defect. The next implementation phase is **Batch L — controlled end-to-end generation/QC/storage/adapter test**.

Do not begin production-volume generation until Batch L passes its hard gate. Batch M remains blocked until L passes.
