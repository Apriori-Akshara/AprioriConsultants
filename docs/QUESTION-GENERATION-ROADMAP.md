# Question Generation Implementation Roadmap

**Status:** Approved implementation plan / current checkpoint  
**Scope:** Question generation, question storage, and figure/question rendering only  
**Production target:** 20 complete original SAT/PSAT-style mocks

## Taxonomy rule

For this project, the implementation sequence is called **Batches A–M**. “Phase” is a legacy synonym and should not be used for new work. Future AI sessions, commits, checkpoints, and status reports should use **Batch A, Batch B, … Batch M** consistently.

This document is the primary implementation roadmap. `docs/QUESTION-GENERATION-CHECKPOINT-2026-09-13.md` records the detailed checkpoint state, while `docs/QUESTION-BANK-MAINTENANCE.md` records maintenance rules.

---

## Current implementation status

| Batch | Area | Status |
|---|---|---|
| A | Canonical schema + compatibility | COMPLETE |
| B | Blueprint engine | COMPLETE |
| C | R&W source/passage/question construction | COMPLETE |
| D | R&W distractor/evidence/QC | COMPLETE / LIVE |
| E | Figure framework + rendering foundation | COMPLETE / LIVE |
| F | Basic data visuals | COMPLETE / LIVE |
| G | 2D geometry/math visuals | COMPLETE / LIVE |
| H | 3D solids + future multi-source architecture | COMPLETE / VERIFIED |
| I | Math integration + mathematical QC | COMPLETE / LIVE |
| J | Figure validation + originality/uniqueness | COMPLETE / LIVE |
| K | Calibration corpus + assessment calibration | **COMPLETE / READY FOR PRIVATE ANCHOR POPULATION** |
| L | Controlled end-to-end generation/QC/storage/adapter test | **NEXT / PENDING — HARD GATE** |
| M | Production generation of 20 mocks + corpus-level QC | PENDING — BLOCKED BY L |

No final 20-mock production corpus is generated before Batch L passes.

---

## 1. Core architecture

The content system uses:

**Stage 1 Blueprint → Stage 2 Draft → Stage 3 Independent QC Review → Canonical Storage → Existing SAT Engine**

The existing SAT/adaptive engine remains the delivery engine. New work is restricted to generation, storage, validation, and figure rendering.

The canonical question contract must remain compatible with useful legacy fields. Existing fields must not be silently deleted.

---

## 2. R&W construction standard

Before drafting, the blueprint controls as applicable:
- domain and skill
- difficulty
- cognitive operation
- source family
- text type
- rhetorical structure
- evidence relationship
- question construction
- distractor architecture
- passage length
- figure/data requirements

Source families include literature, history/social science, humanities, and science. Passages must vary in syntax, rhetorical structure, sentence rhythm, information density, perspective, evidence structure, and implicitness without using obscure vocabulary or unnecessary length to create difficulty.

Distractors must correspond to plausible student-error profiles such as true-but-nonresponsive, incorrect inference, contradicted interpretation, overly broad/narrow interpretation, reversed relationship, or example-for-claim confusion.

R&W evidence maps retain target evidence, supporting evidence, required inference, correct reasoning, and distractor reasoning. Cross-text items design the relationship first. Rhetorical synthesis uses source notes → communication goal → answer options. Quantitative evidence uses underlying dataset → claim/context → structured visual → question → answer.

---

## 3. Figure implementation

Production figures are structured parameter objects rendered by code. Do not use AI-drawn production figures, ASCII art, or opaque raw SVG as the source of truth.

**Batch F:** bar charts, line charts, scatter plots, tables.  
**Batch G:** right triangles, general triangles, circles, parabolas, linear-function graphs, coordinate shapes.  
**Batch H:** 3D solids; reserve multi-source tables/data displays for future use.  
**Deferred:** number lines are part of the broader taxonomy but were intentionally not implemented in Batch G.

Every live figure must have deterministic parameters that QC can validate against the question and answer.

---

## 4. Math standard

Math uses the same blueprint → draft → independent QC architecture and preserves protections against repeated parameter combinations, repeated constructions, disguised numerical substitution, repeated graph/table data, and prohibited figure reuse.

Mathematical QC must independently verify mathematical correctness. Unsupported constructions must be flagged rather than silently “proved” by a generic solver.

---

## 5. Independent QC standard

The QC system checks, as applicable:
1. schema and answer format
2. passage/stimulus length
3. exactly one defensible answer
4. difficulty and cognitive demand
5. distractor quality
6. domain/skill fit
7. evidence alignment
8. figure/data consistency
9. source/style realism
10. PSAT content ceiling
11. originality and duplication

Failed items may receive limited correction/retry attempts; repeated failure of the same check should trigger specification/generator improvement rather than indefinite retries. Only items meeting the applicable passed QC gates are eligible for live delivery.

Batch D provides deterministic R&W independent QC in the current repository. Batch I provides deterministic Math mathematical QC. Batch J provides strengthened figure relationship and originality QC.

---

## 6. Calibration corpus

Calibration references may be used internally to study assessment characteristics, style, difficulty, source complexity, and question construction. Official material must not be copied, closely paraphrased, or shipped as production content.

The private calibration corpus records structural characteristics such as source family, domain/skill, passage length, rhetorical pattern, question construction, difficulty, cognitive demand, distractor behavior, and figure/data type.

**Batch K established the private calibration boundary and adapter.** Actual private/legal anchor files are an operational input and are deliberately not stored in the public repository.

---

## 7. Approved implementation batches

### Batch A — Canonical schema + compatibility foundation
Reconcile the new specification with the existing question model without deleting useful legacy fields.

**Status: COMPLETE.**

### Batch B — Blueprint engine
Implement structured pre-generation blueprints.

**Status: COMPLETE.**

### Batch C — R&W source/passage/question construction
Implement dedicated source-family, rhetorical, evidence, and cognitive-demand construction.

**Status: COMPLETE.**

### Batch D — R&W distractor + evidence map + independent QC
Implement misconception-based distractors, internal evidence maps, rationale support, and independent QC.

**Status: COMPLETE / LIVE.** The current R&W path applies the Batch D independent QC gate before live delivery.

### Batch E — Figure framework + rendering foundation
Implement structured figure objects and shared rendering foundation.

**Status: COMPLETE / LIVE.** Compatibility corrections were deployed in commits `60e1693ee29fc7a32ac78d09f97eaf1cbfbb5ce1` and `649a2d4baba31424dd12846fa20ac277e87c322c`.

### Batch F — Basic data visuals
Implement bar charts, line charts, scatter plots, and tables.

**Status: COMPLETE / LIVE.** Mock 3 visuals were confirmed by public spot checks; exhaustive manual visual QC is not required at this checkpoint.

### Batch G — 2D geometry/math visuals
Implement right triangles, general triangles, circles, parabolas, linear-function graphs, and coordinate shapes.

**Status: COMPLETE / LIVE.** Number lines are intentionally deferred.

### Batch H — 3D + future multi-source architecture
Implement deterministic 3D solids and reserve the extensible multi-source table architecture.

**Status: COMPLETE / VERIFIED.** Supported solids include cube, rectangular prism/cuboid, cylinder, sphere, and cone. `multi_source_table` remains future-only and is not live-enabled.

### Batch I — Math integration + mathematical QC
Bring Math generation into the new pipeline and strengthen independent mathematical verification and construction diversity.

**Status: COMPLETE / LIVE.** The final live correction stabilized nonnumeric legacy SPR normalization and answer-position handling in commit `bdaecfb1e35dbfdc2279e62cdd2961d065f5916`.

### Batch J — Figure validation + originality/uniqueness
Validate visual correctness and run item, passage, construction, dataset, and figure uniqueness checks.

**Status: COMPLETE / LIVE.** Final runtime commit: `a27ffb1f5af4faaf7360b224e87ea1d652069bd8`.

### Batch K — Calibration corpus + assessment calibration
Set up the private calibration corpus boundary, metadata validation, local/private loading, anchor selection, coverage summaries, and assessment-oriented target profiles.

**Status: COMPLETE / READY FOR PRIVATE ANCHOR POPULATION.**

Implementation: `src/data/sat/mockContent/calibrationCorpus.js`. The private boundary is documented by `internal-only/calibration-corpus/README.md` and protected by `.gitignore`. The public repository contains no official College Board anchor text. The adapter returns an empty corpus when `SAT_CALIBRATION_CORPUS_DIR` is not configured, so the live application is unchanged by the absence of private anchors.

Actual private anchor population is an operational input, not a separate Batch L. If a later private calibration run exposes a concrete defect, that defect can be corrected in the relevant batch without reopening K as a whole.

### Batch L — Controlled end-to-end generation/QC/storage/adapter test
Generate a small deterministic control sample through the complete content pipeline and verify:
- Stage 1 blueprint/construction
- Stage 2 draft/post-processing
- Stage 3 independent R&W QC
- deterministic Math mathematical QC
- figure validation/originality
- mock-level and cross-mock QC
- canonical schema adaptation
- storage serialization/round-trip integrity
- compatibility with the existing SAT content path

**Status: NEXT / PENDING — HARD GATE.** This batch must not create the final 20 production mocks.

### Batch M — Production generation for 20 mocks + corpus-level QC
Generate the full original corpus only after Batch L passes. Validate each item, each mock, and the complete 20-mock corpus.

**Status: PENDING. HARD-GATED BY BATCH L.**

---

## 8. Scope protection

Do not modify unless a question-generation/storage/rendering dependency makes it unavoidable:
- authentication
- registration/email verification
- subscription/payment/access rules
- dashboard
- public-site UI/navigation
- deployment configuration
- unrelated Redux/API/auth code

---

## 9. Resume procedure

At the beginning of a future session:
1. Read this roadmap.
2. Read the relevant Parts 1–4 of `docs/SAT-PSAT-QUESTION-SPEC.md`.
3. Read `docs/AI-UPDATE-INSTRUCTIONS.md`, including Stage 1, Stage 2, Stage 3, and Calibration Corpus guidance.
4. Read `docs/QUESTION-GENERATION-CHECKPOINT-2026-09-13.md`.
5. Check current git history/files only to identify the next unfinished **Batch**.
6. Do not repeat completed audits or implementation.
7. Continue in A→M order with deployment-safe checkpoints.
8. **Do not begin Batch M until Batch L passes.**

**Current checkpoint:** **Batches A–J complete; Batch K complete; Batch L is the next implementation; Batch M remains blocked until L passes.**