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

**Status:** **ACTIVE / SAT SERIES A MOCKS 1–10, PSAT MOCKS 1–10, AND SAT SERIES B MOCK 11 ACCEPTED AND STORED. SAT12 IN PROGRESS.**

The exact production sequence is fixed and must not be reordered:

1. **SAT Mocks — Series A: Tests 1–10** — accepted
2. **PSAT Mocks: Tests 1–10** — accepted
3. **SAT Mocks — Series B: Tests 11–20** — active
4. **Final collective verification across the complete 30-mock production corpus**

Mocks are generated and accepted one at a time. A mock must pass generation, independent QC, figure/math/originality checks, mock-level checks, cross-mock checks against all previously accepted mocks, canonical storage validation, and Render deployment acceptance before the next mock begins.

### Accepted production checkpoint — SAT Series A

**SAT Mocks 1–10 are accepted and stored as canonical runtime production records.** Mock 10 uses `SAT10` → `sat-series-a-mock-10`, variant `sat-series-a`, assessment number `10`, deterministic seed `1010`. Its production gate checked the complete accepted Series A baseline for R&W context/prompt reuse, Math application reuse, exact figure-data reuse, figure originality, figure quality, Math mathematical QC, schema integrity, 196-record count, and storage round-trip integrity.

### Accepted production checkpoint — PSAT

**PSAT Mocks 1–10 are accepted and stored as canonical runtime production records.**

PSAT Mock 10 uses:

- test key: `PSAT10`
- test ID: `psat-mock-10`
- variant: `psat-nmsqt`
- assessment number: `10`
- deterministic generation seed: `2010`
- validated mock size: 196 records
- storage mode: `canonical-runtime-records`

Implementation commits:
- `781cb832d9984f2ab78ed29648cd2a0a92dcac94` — `Batch M: Add PSAT Mock 10 production gate`
- `cbeeb1c6c20a756e10c184ae774fbf9293550d90` — `Batch M: Store accepted PSAT Mock 10`

**Render acceptance:** User-confirmed LIVE for PSAT10. This closes the PSAT10 production acceptance gate.

### Accepted production checkpoint — SAT Series B Mock 11

**SAT11 is accepted and stored as a canonical runtime production record.** User-confirmed Render-LIVE acceptance closes the SAT11 deployment gate.

SAT11 uses:

- test key: `SAT11`
- test ID: `sat-series-b-mock-11`
- variant: `sat-series-b`
- assessment number: `11`
- deterministic generation seed: `1011`
- validated mock size: `196` records
- storage mode: `canonical-runtime-records`
- cross-mock baseline: all accepted SAT1–SAT10 and PSAT1–PSAT10 records

Implementation commit:
- `35f14dea6e22f361c3eaf8befcf4d9c56ea4840a` — `Batch M: Add SAT11 production gate and canonical storage`

**Render acceptance:** User-confirmed LIVE for SAT11. This closes the SAT11 production acceptance gate.

The accepted Batch M production records remain separate from the legacy public corpus. They must not replace or be exposed through the legacy public corpus until the final corpus gate passes.

### Current production target — SAT Series B Mock 12

**SAT12 is the active implementation target.** It is generated only after the accepted SAT1–SAT10, PSAT1–PSAT10, and SAT11 baselines. The SAT12 gate compares R&W context/prompt reuse, Math application reuse, exact figure-data reuse, and figure originality against all 21 previously accepted mocks and preserves the established figure-quality, Math mathematical-QC, canonical-schema, 196-record, and storage round-trip gates.

SAT12 uses the controller-defined identity:

- test key: `SAT12`
- test ID: `sat-series-b-mock-12`
- variant: `sat-series-b`
- assessment number: `12`
- deterministic generation seed: `1012`

SAT12 must not be considered accepted until its Render deployment is confirmed LIVE.

## Production-generation gate

After each accepted mock, the production corpus must remain recoverable without silently changing previously accepted mocks. After SAT Series B Mock 20, the final collective QC must cover uniqueness, originality, distributions, difficulty/adaptive balance, answer-key balance, mathematical correctness, figure/data integrity, schema/storage integrity, and runtime compatibility across the complete production corpus.

## Closure decision

**Batches A–L are complete. Batch M is active. SAT Series A Mocks 1–10, PSAT Mocks 1–10, and SAT11 are accepted. SAT12 is the current implementation target. Do not advance to SAT13 until SAT12 passes all gates and Render-LIVE acceptance. Do not replace the existing live corpus until the final corpus gate has passed.**
