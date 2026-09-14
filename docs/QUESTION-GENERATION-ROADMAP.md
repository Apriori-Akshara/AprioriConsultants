# Question Generation Implementation Roadmap

**Status:** Approved implementation plan / current Batch M production checkpoint  
**Scope:** Question generation, question storage, and figure/question rendering only  
**Production target:** 30 controlled production targets: SAT Series A 1–10, PSAT 1–10, SAT Series B 11–20

## Taxonomy rule

For this project, the implementation sequence is called **Batches A–M**. “Phase” is a legacy synonym and should not be used for new work. Future AI sessions, commits, checkpoints, and status reports should use Batch A, Batch B, … Batch M consistently.

This document is the primary implementation roadmap. `docs/QUESTION-GENERATION-CHECKPOINT-2026-09-13.md` records the detailed checkpoint state, while `docs/QUESTION-BANK-MAINTENANCE.md` records maintenance rules.

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
| K | Calibration corpus + assessment calibration | COMPLETE / READY FOR PRIVATE ANCHOR POPULATION |
| L | Controlled end-to-end generation/QC/storage/adapter test | COMPLETE / LIVE |
| M | Production generation + corpus-level QC | ACTIVE — generation COMPLETE; collective QC PENDING |

**Batch M is the only remaining approved implementation batch.**

## 1. Core architecture

The content system uses:

**Stage 1 Blueprint → Stage 2 Draft → Stage 3 Independent QC Review → Canonical Storage → Existing SAT Engine**

The existing SAT/adaptive engine remains the delivery engine. New work is restricted to generation, storage, validation, and figure rendering.

The canonical question contract must remain compatible with useful legacy fields. Existing fields must not be silently deleted.

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

## 3. Figure implementation

Production figures are structured parameter objects rendered by code. Do not use AI-drawn production figures, ASCII art, or opaque raw SVG as the source of truth.

**Batch F:** bar charts, line charts, scatter plots, tables.  
**Batch G:** right triangles, general triangles, circles, parabolas, linear-function graphs, coordinate shapes.  
**Batch H:** 3D solids; reserve multi-source tables/data displays for future use.  
**Deferred:** number lines remain deliberately deferred.

Every live figure must have deterministic parameters that QC can validate against the question and answer.

## 4. Math standard

Math uses the same blueprint → draft → independent QC architecture and preserves protections against repeated parameter combinations, repeated constructions, disguised numerical substitution, repeated graph/table data, and prohibited figure reuse.

Mathematical QC must independently verify mathematical correctness. Unsupported constructions must be flagged rather than silently “proved” by a generic solver.

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

Failed items may receive limited correction/retry attempts; repeated failure of the same check should trigger specification/generator improvement rather than indefinite retries. Only items meeting the applicable passed QC gates are eligible for production acceptance.

Batch D provides deterministic R&W independent QC. Batch I provides deterministic Math mathematical QC. Batch J provides strengthened figure relationship and originality QC.

## 6. Calibration corpus

Calibration references may be used internally to study assessment characteristics, style, difficulty, source complexity, and question construction. Official material must not be copied, closely paraphrased, or shipped as production content.

The private calibration corpus records structural characteristics such as source family, domain/skill, passage length, rhetorical pattern, question construction, difficulty, cognitive demand, distractor behavior, and figure/data type.

**Batch K established the private calibration boundary and adapter.** Actual private/legal anchor files are an operational input to K and are deliberately not stored in the public repository.

## 7. Approved implementation batches

### Batches A–L

**Status: COMPLETE.** Batches A–L established the schema, blueprint, R&W construction/QC, figure system, Math integration/QC, originality controls, calibration boundary, and controlled end-to-end gate. These completed batches must not be repeated or reopened unless a real production defect requires it.

### Batch M — Production generation for the controlled corpus

**Status: GENERATION COMPLETE; COLLECTIVE QC PENDING.** The fixed production sequence is:

1. SAT Series A Mocks 1–10 — **accepted**
2. PSAT Mocks 1–10 — **accepted**
3. SAT Series B Mocks 11–20 — **accepted**
4. Final collective corpus-level QC — **next**

Mocks were produced one at a time. Each mock passed its generation/QC/storage gates and Render deployment acceptance before the next mock was accepted.

### Frozen production checkpoint

SAT Series A Mocks 1–10, PSAT Mocks 1–10, and SAT Series B Mocks 11–20 are accepted and Render-LIVE. Each accepted production mock contains 196 validated records and remains separate from the legacy public corpus.

The authoritative frozen inventory is `docs/BATCH-M-PRODUCTION-CORPUS-MANIFEST.md`.

### Next target

**Final collective corpus-level QC across all 30 production mocks.** There is no SAT21 production target in Batch M.

## 8. Scope protection

Do not modify unless a question-generation/storage/rendering dependency makes it unavoidable:
- authentication
- registration/email verification
- subscription/payment/access rules
- dashboard
- public-site UI/navigation
- deployment configuration
- unrelated Redux/API/auth code

## 9. Resume procedure

At the beginning of a future session:
1. Read this roadmap.
2. Read the relevant Parts 1–4 of `docs/SAT-PSAT-QUESTION-SPEC.md`.
3. Read `docs/AI-UPDATE-INSTRUCTIONS.md`, including Stage 1, Stage 2, Stage 3, and Calibration Corpus guidance.
4. Read `docs/QUESTION-GENERATION-CHECKPOINT-2026-09-13.md`.
5. Read `docs/QUESTION-BANK-MAINTENANCE.md` and `src/data/sat/mockContent/batchMProductionPlan.md`.
6. Read `docs/BATCH-M-PRODUCTION-CORPUS-MANIFEST.md` to identify the frozen 30-mock inventory.
7. Check current git history/files only to identify the next unfinished Batch M task.
8. Do not repeat completed audits or mock generation.
9. Continue with the final collective corpus-level QC; do not create SAT21.
