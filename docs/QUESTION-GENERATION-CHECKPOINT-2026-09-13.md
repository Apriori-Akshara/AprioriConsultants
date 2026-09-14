# Question Generation Checkpoint — September 13, 2026

**Purpose:** Preserve the exact question-generation implementation state through the active Batch M production sequence so later work resumes from the next unfinished production checkpoint without repeating completed implementation or audit work.

## Taxonomy rule

The project uses **Batch A–M** as the single implementation taxonomy. “Phase” is a legacy synonym and should not be used for new work. Future sessions and status reports should refer to Batch A, Batch B, … Batch M.

## Current architecture

**Stage 1 Blueprint → Stage 2 Draft → Stage 3 Independent QC Review → Canonical Storage → Existing SAT Engine**

Question-generation work remains limited to generation, storage, validation, and figure rendering, with the requested SAT Series B navigation shell recorded as a Batch M release-surface dependency.

## Batch history and status

### Batch A — Canonical schema + compatibility foundation
**Status:** Completed foundation.

### Batch B — Blueprint engine
**Status:** Completed foundation and used by the current Math construction path.

### Batch C — R&W source/passage/question construction
**Status:** Implemented in the current R&W generation path.

### Batch D — R&W distractor, evidence map, and independent QC
**Status:** Complete and live.

### Batch E — Figure framework + rendering foundation
**Status:** Complete and live.

### Batch F — Basic data visuals
**Status:** Complete and live/verified by public Mock 3 spot checks.

### Batch G — 2D Math/geometry visuals
**Status:** Complete and live. Number lines remain deliberately deferred.

### Batch H — 3D solids + future multi-source architecture
**Status:** Complete and publicly verified. `3d_solid` is structurally validated and rendered deterministically. `multi_source_table` remains future-only.

### Batch I — Math integration + mathematical QC
**Status:** Complete and live.

### Batch J — Figure validation + originality/uniqueness
**Status:** Complete and live.

### Batch K — Calibration corpus + assessment calibration
**Status:** **COMPLETE / READY FOR PRIVATE ANCHOR POPULATION.**

### Batch L — Controlled end-to-end generation/QC/storage/adapter test
**Status:** **COMPLETE / LIVE.**

Batch L exercised a controlled SAT/PSAT pair through generation, post-processing, figure validation, Math QC, R&W independent QC, mock/cross-mock QC, canonical adaptation, JSON storage round-trip, and existing content-bank integration. It did not generate the final production corpus.

## Batch M — Production generation

**Status:** **ACTIVE / SAT SERIES A MOCKS 1–10, PSAT MOCKS 1–10, AND SAT SERIES B MOCKS 11–16 ACCEPTED AND STORED. SAT17 IN PROGRESS.**

The exact production sequence is fixed and must not be reordered:

1. **SAT Mocks — Series A: Tests 1–10** — accepted
2. **PSAT Mocks: Tests 1–10** — accepted
3. **SAT Mocks — Series B: Tests 11–20** — active
4. **Final collective verification across the complete 30-mock production corpus**

Mocks are generated and accepted one at a time. A mock must pass generation, independent QC, figure/math/originality checks, mock-level checks, cross-mock checks against all previously accepted mocks, canonical storage validation, and Render deployment acceptance before the next mock begins.

### Accepted production checkpoint — SAT Series B Mock 15

**SAT15 is accepted and stored as a canonical runtime production record.** User-confirmed Render-LIVE acceptance closes the SAT15 deployment gate.

SAT15 uses `SAT15` / `sat-series-b-mock-15`, variant `sat-series-b`, assessment number `15`, deterministic generation seed `1015`, 196 validated records, and canonical runtime storage. Its cross-mock baseline was all accepted SAT1–SAT10, PSAT1–PSAT10, and SAT11–SAT14 records.

Implementation commit:
- `f7e870878b0ca3cf2d4d859f8866b7740698f452` — `Batch M: Add SAT15 production gate and canonical storage`

**Render acceptance:** User-confirmed LIVE for SAT15.

### Accepted production checkpoint — SAT Series B Mock 16

**SAT16 is accepted and stored as a canonical runtime production record.** User-confirmed Render-LIVE acceptance closes the SAT16 deployment gate.

SAT16 uses:

- test key: `SAT16`
- test ID: `sat-series-b-mock-16`
- variant: `sat-series-b`
- assessment number: `16`
- deterministic generation seed: `1016`
- validated mock size: `196` records
- storage mode: `canonical-runtime-records`
- cross-mock baseline: all accepted SAT1–SAT10, PSAT1–PSAT10, and SAT11–SAT15 records

Implementation merge commit:
- `a27fdaa59f96296e1d1d467b24110fa09a56fa18` — `Batch M: Add SAT16 production gate and canonical storage`

**Render acceptance:** User-confirmed LIVE for SAT16. This closes the SAT16 production acceptance gate.

### Current production target — SAT Series B Mock 17

**SAT Series B Mock 17 (`SAT17`) is the active production target.** It is generated only after the accepted SAT1–SAT10, PSAT1–PSAT10, and SAT11–SAT16 baselines. The SAT17 gate compares R&W context/prompt reuse, Math application reuse, exact figure-data reuse, and figure originality against all 26 previously accepted mocks and preserves the established figure-quality, Math mathematical-QC, canonical-schema, 196-record, and storage round-trip gates.

SAT17 uses the controller-defined identity:

- test key: `SAT17`
- test ID: `sat-series-b-mock-17`
- variant: `sat-series-b`
- assessment number: `17`
- deterministic generation seed: `1017`

SAT17 must not be considered accepted until its Render deployment is confirmed LIVE.

The accepted Batch M production records remain separate from the legacy public corpus. They must not replace or be exposed through the legacy public corpus until the final corpus gate passes.

## Production-generation gate

After each accepted mock, the production corpus must remain recoverable without silently changing previously accepted mocks. After SAT Series B Mock 20, the final collective QC must cover uniqueness, originality, distributions, difficulty/adaptive balance, answer-key balance, mathematical correctness, figure/data integrity, schema/storage integrity, and runtime compatibility across the complete production corpus.

## Closure decision

**Batches A–L are complete. Batch M is active. SAT Series A Mocks 1–10, PSAT Mocks 1–10, and SAT11–SAT16 are accepted. SAT17 is the current implementation target. Do not advance to SAT18 until SAT17 passes all gates and Render-LIVE acceptance. Do not replace the existing live corpus until the final corpus gate has passed.**
