# Question Bank Maintenance Checkpoint

Approved September 13, 2026.

## Taxonomy rule

This project uses **Batch A–M** as its single implementation taxonomy. “Phase” is a legacy synonym and should not be used for new work. Future maintenance notes, checkpoints, commits, and AI sessions should use **Batch** consistently.

The 20-mock production corpus will have one human-readable text file per mock, ordered by section, module, and question number. Each question has a stable item_id and records its domain, skill, difficulty, question type, content, answer, rationale, QC status, and figure/data references.

The human-readable mock files are the canonical editable source. Production JS/JSON question data is synchronized from them; do not maintain two independent hand-edited copies.

Question correction workflow: identify mock + section + module + question + item_id; edit the canonical entry; validate; synchronize; run relevant QC; run cross-mock uniqueness checks; test runtime behavior when affected.

## Approved implementation sequence

A schema → B blueprint → C R&W construction → D R&W distractor/evidence/QC → E figure framework → F basic visuals → G 2D geometry → H 3D/future multi-source → I Math integration/QC → J figure/originality → K calibration → L end-to-end test → M controlled production.

### Batch M production order

Within Batch M, the 20-mock corpus must be generated in this exact order:

1. **SAT Series A — Mocks 1–10**
2. **PSAT — Mocks 1–10**
3. **SAT Series B — Mocks 11–20**
4. **Final collective QC across the complete 20-mock corpus**

Each mock is generated, independently QC-checked, cross-compared with previously accepted mocks, and stored before the next mock is accepted. The new SAT Series B navigation page is `/SATMocksSeriesB`; it is a release shell until the corresponding production mocks exist and pass QC.

## Batch E — Figure framework + rendering foundation

**Status: COMPLETE / LIVE.**

Batch E established the structured figure registry/normalization and shared Math visual rendering foundation. Compatibility corrections were deployed successfully in commits `60e1693ee29fc7a32ac78d09f97eaf1cbfbb5ce1` and `649a2d4baba31424dd12846fa20c277e87c322c`.

## Batch F — Basic data visuals

**Status: COMPLETE / LIVE.**

Batch F established structured support and shared rendering for `bar_chart`, `line_chart`, `scatter_plot`, and `table`. Legacy `line`, `scatter`, `quadratic`, and `geometry` formats remain supported. Mock 3 visuals were confirmed by public spot checks.

## Batch G — 2D geometry/math visuals

**Status: COMPLETE / LIVE.**

Batch G established structured validation and shared rendering for `right_triangle`, `general_triangle`, `circle`, `parabola`, `linear_function_graph`, and `coordinate_shape`. Number lines remain deferred.

## Batch H — 3D + future multi-source architecture

**Status: COMPLETE / publicly verified.**

Batch H implements the `3d_solid` structured figure contract and deterministic rendering for cube, rectangular prism/cuboid, cylinder, sphere, and cone. `multi_source_table` is structurally reserved but remains future-only and is not live-enabled.

The existing renderer behavior was preserved through `MathVisualStimulusCore`; no new visualization dependency or unrelated application subsystem was introduced.

## Batch I — Math integration + mathematical QC

**Status: COMPLETE / LIVE.**

The Math figure-quality path integrates deterministic mathematical QC and canonicalizes selected legacy Math figures before validation. Mathematical inconsistencies are rejected rather than silently corrected. Same-mock structural figure reuse is allowed; cross-mock originality remains a series-level rule.

## Batch J — Figure validation + originality/uniqueness

**Status: COMPLETE / LIVE.**

`src/data/sat/mockContent/figureOriginalityQC.js` validates figure data shape, figure/question relationships, normalized construction fingerprints, exact figure-data fingerprints, and cross-mock exact-data reuse while preserving legitimate same-mock structural reuse.

## Batch K — Calibration corpus + assessment calibration

**Status: COMPLETE / READY FOR PRIVATE ANCHOR POPULATION.**

`src/data/sat/mockContent/calibrationCorpus.js` provides metadata validation, local/private corpus loading through `SAT_CALIBRATION_CORPUS_DIR`, domain/difficulty anchor selection, corpus summaries, and assessment-oriented target profiles. `internal-only/calibration-corpus/README.md` and `.gitignore` establish the private boundary.

The public repository contains no official College Board anchor text. Actual private/legal anchor population is an operational input to K and may be supplied later in a private environment. It is not fabricated by the implementation and is not a prerequisite for the K software gate.

## Batch L — Controlled end-to-end generation/QC/storage/adapter test

**Status: COMPLETE / LIVE.**

Batch L adds `src/data/sat/mockContent/batchLIntegrationGate.js` and executes it from the canonical `src/data/sat/contentBank.js` load path. The controlled gate exercises a deterministic SAT/PSAT pair through Stage 1 construction, Stage 2 post-processing, figure validation and Math mathematical QC, Batch D independent R&W QC, mock-level/cross-mock QC, canonical schema adaptation, and JSON storage round-trip validation.

The gate throws on failure. The successful Render deployment therefore confirms that the controlled end-to-end checks completed without an integration failure. No final 20-mock production corpus is generated by L.

## Batch M — Controlled production generation

**Status: ACTIVE / SAT SERIES A MOCKS 1–6 ACCEPTED.**

`src/data/sat/mockContent/batchMProductionController.js` establishes the deterministic production sequence and checkpoint helpers. Production records remain separate from the legacy public corpus.

### Accepted production checkpoints

- SAT Series A Mock 1 — accepted and stored.
- SAT Series A Mock 2 — accepted and stored.
- SAT Series A Mock 3 — accepted and stored.
- SAT Series A Mock 4 — accepted and stored.
- SAT Series A Mock 5 — accepted and stored.
- **SAT Series A Mock 6 — accepted and stored.**

Mock 6 uses `SAT6` → `sat-series-a-mock-06`, assessment number `6`, and deterministic seed `1006`. It is generated only after accepted Mocks 1–5.

Mock 6's production gate checks cross-mock R&W context/prompt uniqueness, Math application uniqueness, exact figure-data uniqueness, figure originality, established figure-quality/Math mathematical QC, canonical schema integrity, 196-record count, and JSON storage round-trip integrity against the complete accepted Mock 1–5 baseline.

### Current next target

**SAT Series A Mock 7 (`SAT7` → `sat-series-a-mock-07`).**

The sequence must not advance until Mock 6 is accepted and stored. Mock 6 is not exposed through the public website.

## Production safety

Batch M must not replace or delete the legacy SAT content path until the new corpus has passed the complete corpus-level gate.

Do not commit a partially generated production corpus as if it were complete. Production generation is checkpointed so that an individual mock can be regenerated without silently changing previously accepted mocks.

Private calibration anchors, if authorized and supplied, may inform calibration work through the Batch K private boundary. They are not copied into production content or the public repository.

## Status

**Batch M is active. SAT Series A Mocks 1–6 generation, QC, cross-mock acceptance, and canonical runtime storage checkpoints are complete. The next production target is SAT Series A Mock 7.**
