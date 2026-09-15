# Question Generation Implementation Roadmap

**Status:** Approved implementation plan / current Batch M content-quality remediation checkpoint  
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
| C | R&W source/passage/question construction | COMPLETE — **quality remediation required** |
| D | R&W distractor/evidence/QC | COMPLETE / LIVE — **content-quality gate insufficient; remediation required** |
| E | Figure framework + rendering foundation | COMPLETE / LIVE |
| F | Basic data visuals | COMPLETE / LIVE |
| G | 2D geometry/math visuals | COMPLETE / LIVE |
| H | 3D solids + future multi-source architecture | COMPLETE / VERIFIED |
| I | Math integration + mathematical QC | COMPLETE / LIVE — **content-quality remediation required** |
| J | Figure validation + originality/uniqueness | COMPLETE / LIVE |
| K | Calibration corpus + assessment calibration | COMPLETE / READY FOR PRIVATE ANCHOR POPULATION |
| L | Controlled end-to-end generation/QC/storage/adapter test | COMPLETE / LIVE |
| M | Production generation + corpus-level QC | PRODUCTION COMPLETE / **CONTENT-QUALITY HOLD — TARGETED REMEDIATION ACTIVE** |

**Batch M production generation is complete and frozen. The formal SAT1–SAT10 and PSAT1–PSAT10 content-quality audit is complete and found systemic assessment-quality weaknesses. The active remaining work is targeted candidate generation/selection, controlled replacement where later authorized, re-gating, cross-corpus calibration, and release verification.**

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

**Content-quality audit finding:** the current implementation does not yet meet this construction standard consistently. Its topic, passage, stem, distractor, and rhetorical templates are too repetitive, and the existing deterministic QC checks metadata coherence more reliably than substantive assessment quality.

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

**Content-quality audit finding:** numerical diversity has improved, but construction diversity and reasoning demand remain insufficient. Too many current items are direct substitution or familiar formula applications, hard labels do not reliably correspond to hard reasoning, and distractors are frequently generic numeric offsets.

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

**Remediation requirement:** content-quality QC must become capable of rejecting generic or formulaic items even when schema and internal metadata are valid. Difficulty must be assessed from actual reasoning demand, and distractors must be evaluated semantically rather than only by attached misconception labels.

## 6. Calibration corpus

Calibration references may be used internally to study assessment characteristics, style, difficulty, source complexity, and question construction. Official material must not be copied, closely paraphrased, or shipped as production content.

The private calibration corpus records structural characteristics such as source family, domain/skill, passage length, rhetorical pattern, question construction, difficulty, cognitive demand, distractor behavior, and figure/data type.

**Batch K established the private calibration boundary and adapter.** Actual private/legal anchor files are an operational input to K and are deliberately not stored in the public repository.

## 7. Approved implementation batches

### Batches A–L

**Status: COMPLETE, with content-quality remediation required in the generation/QC layers identified by the Batch M audit.** Batches A–L established the schema, blueprint, R&W construction/QC, figure system, Math integration/QC, originality controls, calibration boundary, and controlled end-to-end gate. These completed batches must not be repeated wholesale; only genuine production-quality defects should reopen the relevant generation/QC dependency.

### Batch M — Production generation for the controlled corpus

**Status: PRODUCTION COMPLETE / QUALITY HOLD.** The fixed production sequence was:

1. SAT Series A Mocks 1–10 — accepted technically
2. PSAT Mocks 1–10 — accepted technically
3. SAT Series B Mocks 11–20 — accepted and deployed; public inspection deferred
4. Final collective corpus-level QC — passed technically
5. Production-store cleanliness checkpoint — passed
6. Maintenance/spec safeguard verification — passed
7. SAT/PSAT content-quality QC — **complete; quality hold**

Mocks were produced one at a time. Each mock passed its generation/QC/storage gates and Render deployment acceptance before the next mock was accepted. No further production target is authorized.

### Frozen production checkpoint

SAT Series A Mocks 1–10, PSAT Mocks 1–10, and SAT Series B Mocks 11–20 are the frozen production corpus. Each contains 196 validated records and remains separate from the legacy public corpus. The frozen inventory is `docs/BATCH-M-PRODUCTION-CORPUS-MANIFEST.md`.

SAT11–SAT20 are deployed in the live Series B runtime, but the user-facing inspection of Mocks 11–20 has been **deferred** and remains outstanding. This is a verification deferral, not a claim of completed public-site acceptance.

The canonical store contains exactly the frozen 30-mock sequence, with no SAT21 target.

### Content-quality audit result

The formal audit of SAT1–SAT10 and PSAT1–PSAT10 is recorded in `docs/BATCH-M-CONTENT-QUALITY-QC-2026-09-14.md`.

**Result: QUALITY HOLD.** The current production content is technically valid but not sufficiently authentic in R&W source complexity, reasoning demand, evidence construction, distractor quality, Math reasoning diversity, hard-item calibration, and SAT-versus-PSAT calibration.

The Math generator also produces approximately 20% student-produced-response items, below the approved 25–30% target.

### Post-audit targeted remediation status — September 15, 2026

The frozen production impact and remediation-preparation sequence is now complete for SAT1–SAT10 and PSAT1–PSAT10.

- 2,144 unique affected production questions identified.
- 2,144 unique affected questions inventoried with exact IDs and reasons.
- 2,144 unique affected questions assigned a read-only remediation plan.
- Remediation types: 1,496 content replacement; 98 content replacement + difficulty calibration; 550 difficulty calibration and possible replacement.
- Remediation tracks: 1,356 Math distractor remediation; 648 difficulty calibration; 216 R&W Words-in-Context remediation; 22 R&W construction remediation.
- `productionMutation: false` throughout these stages.
- `releaseEligible: false` throughout these stages.
- `replacementAuthorization: NOT_AUTHORIZED` remains the active boundary.

Supporting records:

- `docs/BATCH-M-IMPACT-AUDIT-CHECKPOINT-2026-09-15.md`
- `docs/BATCH-M-TARGETED-REVIEW-INVENTORY-2026-09-15.json`
- `docs/BATCH-M-TARGETED-REPLACEMENT-PREPARATION-2026-09-15.json`
- `docs/BATCH-M-TARGETED-REPLACEMENT-CHECKPOINT-2026-09-15.md`

### Next target

**Replacement-candidate generation and controlled selection.**

The next stage is to generate candidate replacements against the exact affected production IDs and prepared remediation tracks, validate those candidates through the strengthened content-quality gate and uniqueness/originality constraints, and produce a deterministic candidate-selection report. This stage must remain outside the production store and must not grant replacement authorization by itself.

After candidates are validated and later authorized:

1. replace only genuinely affected SAT1–SAT10 and PSAT1–PSAT10 items;
2. record every post-freeze corpus change by mock/question ID;
3. rerun affected individual production gates;
4. rerun the final collective 30-mock corpus gate;
5. perform 30-mock cross-corpus calibration;
6. complete the deferred public verification of SAT11–SAT20;
7. perform final end-to-end student-experience acceptance;
8. finalize Batch M release acceptance.

No SAT21 or additional production target may be created.

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
7. Read `docs/BATCH-M-CONTENT-QUALITY-QC-2026-09-14.md` for the completed audit findings and remediation requirements.
8. Read `docs/BATCH-M-TARGETED-REPLACEMENT-CHECKPOINT-2026-09-15.md` for the current remediation-preparation state.
9. Do not repeat completed audits, classifications, inventories, or preparation.
10. Start with replacement-candidate generation and controlled selection; do not create SAT21.
11. Treat SAT11–SAT20 public verification as deferred work that must be completed later.
