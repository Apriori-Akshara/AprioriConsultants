# Question Generation Checkpoint — September 13, 2026

**Purpose:** Preserve the exact question-generation implementation state through the completion of Batch L so later work resumes from the next unfinished Batch without repeating completed implementation or audit work.

## Taxonomy rule

The project uses **Batch A–M** as the single implementation taxonomy. “Phase” is a legacy synonym and should not be used for new work. Future sessions and status reports should refer to Batch A, Batch B, … Batch M.

## Current architecture

**Stage 1 Blueprint → Stage 2 Draft → Stage 3 Independent QC Review → Canonical Storage → Existing SAT Engine**

Question-generation work remains limited to generation, storage, validation, and figure rendering.

## Batch history and status

### Batch A — Canonical schema + compatibility foundation
**Status:** Completed foundation.

### Batch B — Blueprint engine
**Status:** Completed foundation and used by the current Math construction path.

### Batch C — R&W source/passage/question construction
**Status:** Implemented in the current R&W generation path.

### Batch D — R&W distractor, evidence map, and independent QC
**Status:** Complete and live. The current R&W path uses misconception-oriented distractor architecture, internal evidence support, deterministic independent QC, and a passed-status delivery gate.

### Batch E — Figure framework + rendering foundation
**Status:** Complete and live. Compatibility corrections were deployed successfully in commits `60e1693ee29fc7a32ac78d09f97eaf1cbfbb5ce1` and `649a2d4baba31424dd12846fa20ac277e87c322c`.

### Batch F — Basic data visuals
**Status:** Complete and live/verified by public Mock 3 spot checks.

### Batch G — 2D Math/geometry visuals
**Status:** Complete and live. Number lines remain deliberately deferred.

### Batch H — 3D solids + future multi-source architecture
**Status:** Complete and publicly verified. `3d_solid` is structurally validated and rendered deterministically. `multi_source_table` remains future-only and is not live-enabled.

### Batch I — Math integration + mathematical QC
**Status:** Complete and live.

The final live correction is commit `bdaecfb1e35dbfdc2279e62cdd2961d065f5916`. Batch I includes strengthened Math figure contracts, deterministic mathematical QC, selected legacy figure canonicalization, construction checks, figure-integrity checks, nonnumeric legacy SPR normalization, cyclic answer placement for normalized responses, and rejection of deterministic mathematical inconsistencies.

### Batch J — Figure validation + originality/uniqueness
**Status:** Complete and live.

Final J runtime commit: `a27ffb1f5af4faaf7360b224e87ea1d652069bd8`. J strengthened figure-specific validation, relationship checks, structure fingerprints, exact figure-data fingerprints, and cross-mock exact-data duplication checks while preserving legitimate same-mock structural reuse.

### Batch K — Calibration corpus + assessment calibration
**Status:** **COMPLETE / READY FOR PRIVATE ANCHOR POPULATION.**

Implementation: `src/data/sat/mockContent/calibrationCorpus.js`. Batch K establishes controlled calibration domains/difficulty bands, metadata validation, local/private corpus loading through `SAT_CALIBRATION_CORPUS_DIR`, domain/difficulty anchor selection, corpus summaries, and assessment-oriented target profiles.

The repository contains `internal-only/calibration-corpus/README.md` and `.gitignore` protection for private anchor files. Official/retired College Board anchor text is intentionally not committed here. When no private corpus directory is configured, the adapter returns an empty corpus and the live SAT application remains unchanged.

Actual private/legal anchor population is an **operational input to Batch K**, not a separate Batch L requirement. It may be supplied later in a private environment. The K software/integration work is complete.

### Batch L — Controlled end-to-end generation/QC/storage/adapter test
**Status:** **COMPLETE / LIVE.**

Batch L implemented and executed a deterministic controlled integration gate without generating the final production corpus. The gate exercises a controlled SAT/PSAT pair through:

1. **Stage 1 — Blueprint/construction:** `buildProductionMock` + `buildMathBank`;
2. **Stage 2 — Draft/post-processing:** `prepareStage2Mock`;
3. **Figure validation + Math mathematical QC:** the shared figure quality gate;
4. **Stage 3 — Independent R&W QC:** the existing Batch D gate through `varyVerbalConstruction`;
5. **Mock-level and cross-mock QC:** `validateMockContent` + `validateMockSeries`;
6. **Canonical schema adapter:** normalization followed by `validateSatQuestion`;
7. **Canonical storage round-trip:** JSON serialization/restoration with ID and schema revalidation;
8. **Existing SAT content path integration:** the Batch L gate is executed from the canonical `src/data/sat/contentBank.js` load path.

The Render build for the Batch L implementation completed successfully and is live. The controlled gate throws on any failure, so a successful build confirms the hard-gate checks executed without an integration failure.

Batch L does **not** create or publish the final 20-mock production corpus.

## Production-generation gate

Before Batch M:

- Batch I Math integration/QC: **COMPLETE**;
- Batch J figure validation/originality: **COMPLETE**;
- Batch K calibration infrastructure: **COMPLETE**;
- Batch L end-to-end generation/QC/storage/adapter test: **COMPLETE / LIVE**.

**Batch M is now the next implementation and may proceed only through the approved production-generation plan and corpus-level QC.**

## Key implementation commits

### Batch I
- `f109fc48d9043c53bf7b2ad6f65c0cb924d20a4a` — `Batch I: Strengthen Math figure contracts for QC`
- `da28ab0dddb56639adfc149941c166f8109ca4c5` — `Batch I: Add independent mathematical QC layer`
- `04df0da20faa870b22bb94cf156374ee77393c03` — `Batch I: Integrate Math figures and mathematical QC`
- `f50975ac63c789dbb338f9ea7b858533c7abca93` — `Batch I: Complete independent mathematical QC coverage`
- `612b990dd2d58b66b72cff910797584d378c5b9b` — `Batch I: Normalize nonnumeric Math SPR responses`
- `88509b7c2b043fa0c829a30d13d942ae47192fb6` — `Batch I: Balance normalized Math response choices`
- `bdaecfb1e35dbfdc2279e62cdd2961d065f5916` — `Batch I: Stabilize normalized Math response positions`

### Batch J
- `a27ffb1f5af4faaf7360b224e87ea1d652069bd8` — `Batch J: Strengthen figure originality and relationship QC`

### Batch K
- `0a91844d37c90e7fb539f21b544dea0da11d2b93` — `Batch K: Add private calibration corpus adapter`
- `a5d756f414ed35b9275e8ae6724fc0d94f49dd4a` — `Batch K: Establish private calibration corpus boundary`
- `96b704fdfa0b32133ca5cbf22d5f488a102cbb74` — `Batch K: Close calibration implementation checkpoint`

### Batch L
- `0017756a84237e33c4e0ecfb2acc20c9e6e3fdd4` — `Batch L: Add controlled end-to-end generation gate`
- `fdec121432a144193081222a5626e6c63b5e6593` — `Batch L: Normalize canonical adapter contract`
- `beb7efa0c3ae909e167ea06322e8fd7deac338aa` — `Batch L: Integrate controlled end-to-end gate`
- `232e5f926ec0aa649da7631b056a207ad4c6265c` — `Batch K: Standardize roadmap and close K`

## Closure decision

**Batches A–L are complete at the current implementation checkpoint. Batch M is the next and final production-generation batch.**

Do not begin production-volume generation outside Batch M's controlled generation plan. The final 20-mock corpus remains subject to item-level, mock-level, and corpus-level QC.