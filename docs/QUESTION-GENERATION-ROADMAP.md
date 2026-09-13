# Question Generation Implementation Roadmap

**Status:** Approved implementation plan / resume checkpoint  
**Scope:** Question generation, question storage, and figure/question rendering only  
**Production target:** 20 complete original SAT/PSAT-style mocks

This document records the approved implementation sequence so future AI sessions can resume directly at the next unfinished batch rather than repeating the audit/planning process.

---

## 1. Core Architecture

The content system will use:

**Stage 1 Blueprint → Stage 2 Draft → Stage 3 Independent QC Review → Canonical Storage → Existing SAT Engine**

The existing SAT/adaptive engine remains the delivery engine. The new work improves the content-generation, validation, storage, and rendering layers around it.

The new canonical question contract must be reconciled with the existing repository model through a compatibility adapter. Existing useful fields must not be silently deleted.

---

## 2. Verbal / Reading & Writing Standard

The current R&W generator must be upgraded from generic paragraph-plus-question generation to a dedicated Digital SAT-style item-construction process.

### Blueprint controls

Before drafting, select as applicable:
- R&W domain and skill
- easy/medium/hard difficulty
- cognitive operation
- source family
- text type
- rhetorical structure
- evidence relationship
- question construction
- distractor architecture
- passage length
- figure/data requirements

### Source families

**Literature:** character, setting, narrator perspective, conflict, reflection, literary interpretation.

**History/Social Science:** historical development, social change, movements, policy, economic/social behavior, historical argument.

**Humanities:** art history, architecture, archaeology, philosophy, linguistics, anthropology, music/cultural criticism.

**Science:** experiments, observational studies, competing hypotheses, ecological/behavioral research, biology, astronomy, environmental/materials research.

Passages must vary in syntax, rhetorical structure, sentence rhythm, information density, perspective, evidence structure, and implicitness. Do not create difficulty through obscure vocabulary or unnecessary length.

### Distractors

Distractors are built from explicit plausible student-error profiles, such as:
- true but nonresponsive statement
- correct observation but incorrect inference
- plausible interpretation contradicted by evidence
- overly broad interpretation
- overly narrow interpretation
- reversed relationship
- example confused with main claim

### Evidence map

R&W items should retain internal evidence information for QC:
- target evidence
- supporting evidence
- required inference
- correct reasoning
- distractor reasoning

### Cross-text items

Design the relationship first — agreement, contrast, qualification, extension, competing interpretation, etc. — then construct the passages and question around it.

### Rhetorical synthesis

Construct:

**source notes → communication goal → synthesis answer options**

The correct option must use the relevant notes to fulfill the stated goal.

### Quantitative evidence

Construct:

**underlying dataset → claim/context → structured table/graph → question → answer**

The visual is evidence, not decoration.

---

## 3. Figure Implementation

All figures are structured parameter objects rendered by code. Never use AI-drawn production figures, ASCII art, or opaque raw SVG as the source of truth.

### Required figure sequence

**Batch F**
1. Bar charts
2. Line charts
3. Scatter plots
4. Tables

**Batch G**
5. Right triangles
6. General triangles
7. Circles
8. Parabolas
9. Linear-function graphs
10. Coordinate shapes

**Batch H**
11. 3D solids

Also reserve the architecture for:

12. Future multi-source tables / multi-source data displays.

Number lines remain part of the broader taxonomy but are **not implemented in Batch G** and remain deferred to a later approved increment.

Every figure must have deterministic parameters that QC can recompute and validate against the answer.

---

## 4. Math Standard

Math will use the same blueprint → draft → independent QC architecture.

Preserve and extend existing protections against:
- repeated parameter combinations
- repeated mathematical constructions
- disguised numerical substitution
- repeated graph/table data
- prohibited figure reuse

Math QC must independently verify mathematical correctness.

---

## 5. Independent QC

A fresh QC stage must check:

1. schema/answer format
2. passage or stimulus length
3. exactly one defensible answer
4. difficulty and cognitive demand
5. distractor quality
6. domain/skill fit
7. evidence alignment
8. figure/data consistency
9. source/style realism
10. PSAT content ceiling
11. originality and prohibited duplication

A failed item may receive 2–3 correction attempts. Repeated failures on the same check should trigger a prompt/specification improvement rather than indefinite retries.

Only `metadata.qc_status = "passed"` items are eligible for live delivery.

The current Batch D implementation provides this R&W QC stage as a deterministic internal reviewer because the repository does not currently contain an external AI-generation/reviewer service. It does not weaken the delivery gate or introduce a new runtime dependency.

---

## 6. Calibration Corpus

Set up the private calibration corpus before production-volume generation.

Official College Board material may be used internally as a calibration reference for assessment characteristics, style, difficulty, source complexity, and question construction. Do not copy, closely paraphrase, or ship official content as production content.

The calibration corpus should record structural characteristics such as:
- source family
- domain/skill
- passage length
- rhetorical pattern
- question construction
- difficulty
- cognitive demand
- distractor behavior
- figure/data type

---

## 7. Approved Implementation Batches

### A — Canonical schema + compatibility foundation

Reconcile the new specification with the existing question model without deleting useful legacy fields.

### B — Blueprint engine

Implement structured pre-generation blueprints.

### C — Verbal source/passage/question construction

Implement the dedicated R&W source-family, rhetorical, evidence, and cognitive-demand construction system.

### D — Verbal distractor + evidence map + independent QC

Implement misconception-based distractors, internal evidence maps, rationale support, and independent QC.

**Completed and verified at the current repository checkpoint:** the Batch C R&W path records Batch D distractor architecture and evidence maps, performs a fresh independent deterministic QC review, allows up to two correction/retry passes for Batch D-owned metadata defects, blocks live return unless `metadata.qc_status = "passed"`, and has passed public-site functional spot checks.

### E — Figure framework + rendering foundation

Implement structured figure objects and rendering foundation.

**Status: COMPLETE and live.** Compatibility corrections were deployed successfully in commits `60e1693ee29fc7a32ac78d09f97eaf1cbfbb5ce1` and `649a2d4baba31424dd12846fa20ac277e87c322c`.

### F — Basic data visuals

Implement bar charts, line charts, scatter plots, and tables.

**Status: COMPLETE / VERIFIED BY LIVE SPOT CHECKS.** The four Phase F families use structured data, deterministic validation, and the shared rendering path. Legacy `line`, `scatter`, `quadratic`, and `geometry` formats remain compatible. The user has confirmed that Mock 3 visuals render correctly in spot checks; exhaustive manual visual QC is not required at this checkpoint.

### G — 2D geometry/math visuals

Implement right triangles, general triangles, circles, parabolas, linear-function graphs, and coordinate shapes.

**Status: COMPLETE and live.** The Batch G implementation extends the existing figure registry and quality gate and connects all six approved Phase G families to the existing `MathVisualStimulus` rendering path. Number lines are intentionally not part of this implementation.

### H — 3D + future multi-source architecture

Implement 3D solids and reserve the extensible multi-source table architecture.

**Status: IMPLEMENTED / CURRENT CHECKPOINT.** The `3d_solid` contract is validated in the shared figure registry and rendered deterministically through the shared Math visual entry point. The reserved `multi_source_table` contract is structurally validated but intentionally remains future-only and is not rendered or enabled for live delivery.

The existing Math visual renderer is preserved through `MathVisualStimulusCore`, with the new `ThreeDSolidFigure` component handling 3D solids. Supported 3D solid families include rectangular prisms/cuboids, cubes, cylinders, spheres, and cones.

No production 3D corpus is generated during Batch H. Batch I will integrate Math generation and independent mathematical QC; Batch J will strengthen figure validation and originality/uniqueness.

### I — Math integration + mathematical QC

Bring the Math generators into the new pipeline and strengthen independent mathematical verification and construction diversity.

**Pending.**

### J — Figure validation + originality/uniqueness

Validate visual correctness and run item, passage, construction, dataset, and figure uniqueness checks.

**Pending.**

### K — Calibration corpus + assessment calibration

Set up and wire the private calibration corpus and use it to tune generation toward the target assessment characteristics.

**Pending.**

### L — End-to-end generation/QC/storage/adapter test

Generate a controlled sample across R&W, Math, difficulty bands, question types, cross-text, rhetorical synthesis, quantitative evidence, figures, geometry, and student-produced response. Verify the complete pipeline through the existing engine.

**Pending.**

### M — Production generation for 20 mocks + corpus-level QC

Only after Batch L passes. Generate the full original corpus and validate individual items, each mock, and the full 20-mock corpus.

**Pending. Hard gate: Batch M must not begin until Batch L passes.**

---

## 8. Scope Protection

Do not modify during this project unless a question-generation/storage/rendering dependency makes it unavoidable:
- authentication
- registration/email verification
- subscription/payment/access rules
- dashboard
- public-site UI/navigation
- deployment configuration
- unrelated Redux/API/auth code

---

## 9. Resume Procedure for Future AI Sessions

At the beginning of the next session:

1. Read `docs/QUESTION-GENERATION-ROADMAP.md`.
2. Read the relevant parts of `docs/SAT-PSAT-QUESTION-SPEC.md`:
   - Part 1 — Test Structure, Domains, and Difficulty
   - Part 2 — Item Data Schema
   - Part 3 — Figure Taxonomy
   - Part 4 — Generation Architecture and Quality Requirements
3. Read `docs/AI-UPDATE-INSTRUCTIONS.md`, especially:
   - THE TASK
   - Stage 1 Prompt — Blueprint
   - Stage 2 Prompt — Draft
   - Stage 3 Prompt — QC Review
   - Calibration Corpus
4. Check git history/current files only to identify the next unfinished batch.
5. Do not repeat the completed audit or planning unless the repository has materially changed.
6. Implement the next batch in A→M order, with deployment-safe checkpoints.
7. Do not start Batch M until Batch L passes.

**Current implementation checkpoint:** **Batch E = COMPLETE and LIVE. Batch F = COMPLETE. Batch G = COMPLETE and LIVE. Batch H = IMPLEMENTED/CURRENT.** Batch F provides structured support and shared rendering for `bar_chart`, `line_chart`, `scatter_plot`, and `table`. Batch G extends the same architecture to `right_triangle`, `general_triangle`, `circle`, `parabola`, `linear_function_graph`, and `coordinate_shape`, while retaining the legacy figure formats. Batch H adds deterministic `3d_solid` rendering and reserves validated `multi_source_table` data structures for future use. Number-line rendering remains deferred.

**Remaining:** Batch I, J, K, L, and M are pending. Batch M remains hard-gated on Batch L. Do not create the 20 final production mocks or the calibration corpus during Batch H.
