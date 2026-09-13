# Question Generation Checkpoint — September 13, 2026

**Purpose:** Preserve the exact question-generation implementation state through the completion of Batch L and the active Batch M production sequence so later work resumes from the next unfinished production checkpoint without repeating completed implementation or audit work.

## Taxonomy rule

The project uses **Batch A–M** as the single implementation taxonomy. “Phase” is a legacy synonym and should not be used for new work. Future sessions and status reports should refer to Batch A, Batch B, … Batch M.

## Current architecture

**Stage 1 Blueprint → Stage 2 Draft → Stage 3 Independent QC Review → Canonical Storage → Existing SAT Engine**

Question-generation work remains limited to generation, storage, validation, and figure rendering, with the specifically requested SAT Series B navigation shell recorded as a Batch M release-surface dependency.

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

The final live correction is commit `bdaecfb1e35dbfdc2279e62cdd2961d065f5916`.

### Batch J — Figure validation + originality/uniqueness
**Status:** Complete and live.

Final J runtime commit: `a27ffb1f5af4faaf7360b224e87ea1d652069bd8`.

### Batch K — Calibration corpus + assessment calibration
**Status:** **COMPLETE / READY FOR PRIVATE ANCHOR POPULATION.**

Implementation: `src/data/sat/mockContent/calibrationCorpus.js`. The public repository contains no official College Board anchor text.

### Batch L — Controlled end-to-end generation/QC/storage/adapter test
**Status:** **COMPLETE / LIVE.**

Batch L implemented and executed a deterministic controlled integration gate without generating the final production corpus. The gate exercises a controlled SAT/PSAT pair through Stage 1 construction, Stage 2 post-processing, figure validation and Math mathematical QC, Batch D independent R&W QC, mock-level/cross-mock QC, canonical schema adaptation, JSON storage round-trip validation, and integration with the existing SAT content-bank load path.

The Render build completed successfully and is live. Batch L does **not** create or publish the final 20-mock production corpus.

## Batch M — Production generation

**Status:** **ACTIVE / SAT SERIES A MOCK 5 ACCEPTED AND STORED.**

The exact production sequence is fixed and must not be reordered:

1. **SAT Mocks — Series A: Tests 1–10**
2. **PSAT Mocks: Tests 1–10**
3. **SAT Mocks — Series B: Tests 11–20** under the new `/SATMocksSeriesB` navigation page
4. **Final collective verification across the complete 20-mock corpus**

Mocks are generated and accepted one at a time within that sequence. A mock must pass its generation, independent QC, figure/math/originality checks, mock-level checks, cross-mock checks against all previously accepted mocks, and canonical storage validation before the next mock begins.

### SAT Series A production checkpoint

**Mocks 1–5 are now accepted and stored as canonical runtime production records.**

Mock 5 uses the established production identity/order:

- test key: `SAT5`
- test ID: `sat-series-a-mock-05`
- variant: `sat-series-a`
- assessment number: `5`
- deterministic generation seed: `1005`

Mock 5 was generated only after accepted Mocks 1–4. Its cross-mock gate compares against all four accepted Series A mocks for R&W context/prompt reuse, Math application reuse, exact figure-data reuse, and series-level figure originality. It also preserves the established figure-quality/Mathematical-QC path, canonical schema validation, 196-record count, and JSON storage round-trip validation.

The accepted production mocks remain separate from the legacy public corpus. Mock 5 is **not exposed through the public website**.

### Deployment acceptance

Batch M Mock 5 implementation was deployed through Render AutoDeploy after the GitHub commit `4c11789c115eabd5d79773febbb29c781e82ffe3` (`Batch M: Store accepted SAT Series A Mock 5`).

Render deployment: `dep-daj677hnb5bc73dbil30` — **LIVE**.

The successful Render build is the acceptance gate for this production step.

### Next production target

**SAT Series A Mock 6 (`SAT6` → `sat-series-a-mock-06`).**

Do not begin Mock 6 until the accepted Mock 5 checkpoint is preserved. Do not expose or replace the legacy public corpus with the Batch M production records.

## Production-generation gate

Before production-volume generation advances, the Batch L end-to-end gate remains the hard integration prerequisite. After each accepted mock, the production corpus must remain recoverable without silently changing previously accepted mocks. After Mock 20, the final collective QC must cover uniqueness, originality, distributions, difficulty/adaptive balance, answer-key balance, mathematical correctness, figure/data integrity, schema/storage integrity, and runtime compatibility across the complete corpus.

## Closure decision

**Batches A–L are complete. Batch M is active. SAT Series A Mocks 1–5 are accepted; the next production-generation target is SAT Series A Mock 6.**

Do not begin production-volume generation outside the controlled Batch M sequence. Do not replace the existing live corpus until the final 20-mock corpus gate has passed.
