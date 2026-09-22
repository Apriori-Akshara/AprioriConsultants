# Question Generation Implementation Roadmap

**Status:** Approved implementation plan / current Batch M remediation and release checkpoint updated September 22, 2026  
**Scope:** Question generation, question storage, and figure/question rendering only  
**Production target:** 30 controlled production targets: SAT Series A 1–10, PSAT 1–10, SAT Series B 11–20

## Taxonomy rule

For this project, the implementation sequence is called **Batches A–M**. “Phase” is a legacy synonym and should not be used for new work. Future AI sessions, commits, checkpoints, and status reports should use Batch A, Batch B, … Batch M consistently.

This document is the primary implementation roadmap. `docs/QUESTION-GENERATION-CHECKPOINT-2026-09-13.md` records the detailed earlier checkpoint state, while `docs/QUESTION-BANK-MAINTENANCE.md` records maintenance rules.

## Current implementation status

| Batch | Area | Status |
|---|---|---|
| A | Canonical schema + compatibility | COMPLETE |
| B | Blueprint engine | COMPLETE |
| C | R&W source/passage/question construction | COMPLETE — quality remediation completed for the affected 20-test scope |
| D | R&W distractor/evidence/QC | COMPLETE / LIVE — content-quality remediation completed for the affected 20-test scope |
| E | Figure framework + rendering foundation | COMPLETE / LIVE |
| F | Basic data visuals | COMPLETE / LIVE |
| G | 2D geometry/math visuals | COMPLETE / LIVE |
| H | 3D solids + future multi-source architecture | COMPLETE / VERIFIED |
| I | Math integration + mathematical QC | COMPLETE / LIVE — targeted content-quality remediation completed for the affected 20-test scope |
| J | Figure validation + originality/uniqueness | COMPLETE / LIVE |
| K | Calibration corpus + assessment calibration | COMPLETE / READY FOR PRIVATE ANCHOR POPULATION |
| L | Controlled end-to-end generation/QC/storage/adapter test | COMPLETE / LIVE |
| M | Production generation + corpus-level QC | **TARGETED REMEDIATION COMPLETE / 195-TARGET CALIBRATION RECONCILIATION APPLIED / FINAL 30-MOCK + CROSS-CORPUS GATES PASS / EXACT TARGET-AWARE 25-CANDIDATE REVIEW PASS / CONTROLLED REPLACEMENT PACKAGE VALIDATED** |

**Batch M production generation is complete. The initial SAT1–SAT10 and PSAT1–PSAT10 content-quality audit was remediated through the documented controlled candidate/replacement path. The later 195-target R&W calibration reconciliation was independently reviewed, exactly target-locked, explicitly authorized, and applied to production. The corrected production state passes the final 30-mock corpus gate and 30-mock cross-corpus calibration. The corrected deep-QC candidate pipeline has now completed independent substantive review at 25/25 PASS, with 0 FAIL, 0 expert-review flags, and 0 duplicate groups. Those 25 items were converted into the exact approved production replacement package, explicitly authorized, and applied one-for-one to existing targets. Release eligibility remains false.**

## 1. Core architecture

The content system uses:

**Stage 1 Blueprint → Stage 2 Draft → Stage 3 Independent QC Review → Canonical Storage → Existing SAT Engine**

The existing SAT/adaptive engine remains the delivery engine.

**Generation path:** Stage 1 Blueprint → Stage 2 Draft → Stage 3 Independent QC Review → Canonical Storage → Existing SAT Engine

**Maintenance path:** Canonical Question Record → Human-Editable Mock Question-Bank Document → Requested Edit → Document Parser/Validator → Canonical Question Record → Applicable QC → Existing SAT Engine

The human-editable document layer is a content-authoring/maintenance surface, not a second runtime question bank. The canonical record remains the validated structured representation delivered by the existing engine. See docs/HUMAN-EDITABLE-CANONICAL-QUESTION-BANK-SPEC.md for the detailed contract.
 New work is restricted to generation, storage, validation, and figure rendering.

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

**Content-quality audit finding:** the original production content did not meet this construction standard consistently. The affected SAT1–SAT10 and PSAT1–PSAT10 records were remediated through the controlled candidate/replacement process, and the comprehensive 20-test post-replacement QC passed. The final 30-mock corpus gate still remains separate.

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

**Content-quality audit finding:** the initial production content had insufficient construction diversity and reasoning demand, with generic distractors and weak hard-item calibration. The targeted remediation included difficulty calibration, figure remediation, and numeric-distractor remediation; the affected 20-test comprehensive QC passed with zero content-quality failures. Final 30-mock calibration remains pending.

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

**Remediation result:** the targeted 20-test post-replacement QC validated the affected scope with zero schema failures, zero content-quality failures, figure originality PASS, and every affected mock at 196 / 196 passing questions. This does not replace the final 30-mock corpus gate.

## 6. Calibration corpus

Calibration references may be used internally to study assessment characteristics, style, difficulty, source complexity, and question construction. Official material must not be copied, closely paraphrased, or shipped as production content.

The private calibration corpus records structural characteristics such as source family, domain/skill, passage length, rhetorical pattern, question construction, difficulty, cognitive demand, distractor behavior, and figure/data type.

**Batch K established the private calibration boundary and adapter.** Actual private/legal anchor files are an operational input to K and are deliberately not stored in the public repository.

## 7. Approved implementation batches

### Batches A–L

**Status: COMPLETE, with only genuine downstream production/release defects allowed to reopen a relevant dependency.** Batches A–L established the schema, blueprint, R&W construction/QC, figure system, Math integration/QC, originality controls, calibration boundary, and controlled end-to-end gate. These completed batches must not be repeated wholesale.

### Batch M — Production generation for the controlled corpus

**Status: PRODUCTION COMPLETE / TARGETED REMEDIATION COMPLETE / CONTROLLED 25-TARGET REPLACEMENT COMPLETE / POST-MUTATION GATES PASS / FINAL RELEASE CHECKPOINTS PENDING.** The fixed production sequence was:

1. SAT Series A Mocks 1–10 — accepted technically
2. PSAT Mocks 1–10 — accepted technically
3. SAT Series B Mocks 11–20 — accepted and deployed; public inspection deferred
4. Final collective corpus-level QC before the remediation hold — passed technically
5. Production-store cleanliness checkpoint — passed
6. Maintenance/spec safeguard verification — passed
7. SAT/PSAT content-quality QC — initial quality hold identified
8. Targeted impact identification, classification, inventory, preparation, and candidate selection — complete
9. Authorized controlled replacement of the selected affected records — complete
10. Comprehensive post-replacement QC for SAT1–SAT10 and PSAT1–PSAT10 — PASS

Mocks were produced one at a time. Each mock passed its generation/QC/storage gates and Render deployment acceptance before the next mock was accepted. No further production target is authorized.

### Frozen production checkpoint

SAT Series A Mocks 1–10, PSAT Mocks 1–10, and SAT Series B Mocks 11–20 remain the frozen production corpus. The corpus contains exactly 30 mocks and no SAT21 target.

SAT11–SAT20 are deployed in the live Series B runtime. Their unauthenticated public-route smoke verification is complete, and focused authenticated Series B functionality acceptance has been reported satisfactory by the user. Exhaustive public content/UI QC remains a later release checkpoint.

### Content-quality audit result and remediation

The formal audit of SAT1–SAT10 and PSAT1–PSAT10 is recorded in `docs/BATCH-M-CONTENT-QUALITY-QC-2026-09-14.md`.

**Initial result: QUALITY HOLD.** The audit identified weaknesses in R&W source complexity, reasoning demand, distractor quality, construction diversity, Math reasoning diversity, hard-item calibration, and SAT-versus-PSAT calibration. The affected records were then processed through the targeted remediation sequence.

The final targeted 20-test checkpoint is `docs/BATCH-M-COMPREHENSIVE-20-TEST-QC-CHECKPOINT-2026-09-16.md`.

### September 16 targeted-remediation result

The controlled replacement and subsequent comprehensive 20-test QC are complete.

- **2,144** affected unique records were reproduced as the authorized scope.
- **1,594** authorized selected replacements were applied.
- **3,920** runtime questions were validated across the 20 affected mocks.
- **0** schema failures.
- **0** content-quality failures.
- Figure originality gate **PASS**.
- **550** difficulty calibrations.
- **206** R&W stimulus repairs.
- **169** figure repairs.
- **5** numeric-distractor repairs.
- **846** total targeted remediation changes.
- Every affected SAT1–SAT10 and PSAT1–PSAT10 mock passed at **196 / 196**.
- `productionMutation: false`, `releaseEligible: false`, `sat21Created: false` for the comprehensive QC report.

GitHub Actions run **35181971047** (run #7) is the successful comprehensive QC evidence for this milestone.

### Human-editable and canonical question-bank maintenance capability

**Status: APPROVED / PLANNED — NOT YET IMPLEMENTED.**

The project will maintain one human-readable question-bank document per frozen production mock under question-banks/. These documents are the preferred editing surface for item-level content maintenance.

The documents do not replace canonical runtime records. A controlled parser/validator will convert an edited document question into the current canonical question structure, preserve the exact testKey + questionId, run the applicable schema/content/figure/originality/corpus checks, and only then make a specifically authorized canonical production update.

This capability is a **Batch M maintenance checkpoint**, not a new Batch N and not a new mock-generation stage.

Implementation placement in the current release sequence:

1. resolve the active deep SAT/PSAT content-quality/diversity blocker through the existing candidate-only remediation/review path;
2. implement and round-trip test the per-mock question-bank documents against canonical records;
3. use the documents for future item-specific changes;
4. rerun the existing affected-item/mock/corpus gates after any authorized change;
5. continue final public, end-to-end, and Batch M acceptance.

The document system must not create SAT21, broaden the 30-mock scope, weaken a quality gate, or automatically mutate production.

### Controlled replacement-package implementation — current checkpoint

The deterministic replacement-package builder is implemented at `scripts/runBatchMDeepContentQualityReplacementPackage.mjs`, with the authoritative candidate-only CI orchestration at `.github/workflows/batch-m-canonical-replacement-package.yml`. The pipeline consumes the current 25-candidate selection and prior review, resolves one deterministic existing target per candidate, and never performs production mutation.

The candidate-only canonical-normalization stage resolved the known non-canonical assessment/skill labels from exact existing production targets using strict semantic mappings: scatterplot interpretation → Data models; equivalent exponential representations → Exponential equations; right-triangle relationships → Right triangles; linear relationships → Linear functions.

The package validation path is hardened and verified. Run **35697516214 — PASS** establishes correct fresh-review linkage, unique candidate and target identities, exact canonical operational fields, target-resolution audit metadata, canonical target-metadata SHA-256 integrity, candidate-boundary protection, figure type/shape compatibility, schema/content-quality PASS, baseline-aware hypothetical uniqueness, the final 30-mock corpus gate, and cross-corpus calibration with no new failures.

### Batch M package-verification controls — verified state

The package pipeline has direct npm commands in `package.json` for target-aware candidate generation, canonical normalization, and final replacement-package validation, and the CI workflow performs Node syntax checks before execution. These controls were verified by **35697516214 — PASS**. They remain validation-only and do not authorize production mutation.

### Final 30-mock gate and release checkpoints — current state

The final collective corpus gate and 30-mock cross-corpus calibration remain **PASS** on the last verified production state:

- Final 30-mock corpus gate: **35666818448 — PASS**.
- 30-mock cross-corpus calibration: **35666822839 — PASS**.
- No new Vercel status is asserted for the package-only hardening commits.

The earlier `Invalid difficultyBand: sat-series-a-medium` regression is resolved and is historical, not the current blocker.

The corrected deep SAT/PSAT content-quality/diversity candidate pipeline has also completed its independent substantive review:

- Candidate selection: **35666673484 — PASS**.
- Candidate pipeline: **35666673409 — PASS**.
- Independent review: **35666673400 — PASS**.
- Substantive result: **25 / 25 PASS**.
- FAIL: **0**.
- Expert-review flags: **0**.
- Duplicate groups: **0**.
- Production mutation: **false**.
- Release eligibility: **false**.

The candidate-selector correction is recorded at `f52238c6a3ffafd97baca9ba291a310d5187af2f`. The 25 passed candidates are not automatically production replacements.

**Current next stage:** complete final public student-facing inspection of all 30 mocks. Stages 11–13 are complete: explicit authorization, exact 25-target controlled replacement, and post-mutation affected/collective gates. After public inspection, complete technical release QC, final end-to-end student acceptance, and final Batch M release acceptance.

### Remediation branch promotion boundary

The generator-remediation branch `batch-m-rw-generator-remediation-2026-09-14` is not a release branch. Implementation changes must not be promoted merely because candidate selection or the 20-test QC passed; promotion decisions remain subject to the documented release gates and repository state.

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

## 9. Documentation continuity

The following September 15 paths referenced by earlier session prompts are **not present on the current `main` branch**:

- `docs/BATCH-M-TARGETED-CANDIDATE-SELECTION-CHECKPOINT-2026-09-15.md`
- `docs/BATCH-M-TARGETED-CANDIDATE-COVERAGE-2026-09-15.json`
- `docs/BATCH-M-TARGETED-CANDIDATE-SELECTION-2026-09-15.json`

They should not be treated as missing active work. Their relevant candidate-generation/selection history was superseded by the later September 17 checkpoints, and the authoritative current state is `docs/BATCH-M-CURRENT-STATUS-2026-09-22.md`.

The September 15 targeted-replacement checkpoint remains in the repository as a historical record and now explicitly points to the later state.

## 10. Resume procedure

At the beginning of a future session:
1. Read this roadmap.
2. Read the relevant Parts 1–4 of `docs/SAT-PSAT-QUESTION-SPEC.md`.
3. Read `docs/AI-UPDATE-INSTRUCTIONS.md`, including Stage 1, Stage 2, Stage 3, and Calibration Corpus guidance.
4. Read `docs/QUESTION-GENERATION-CHECKPOINT-2026-09-13.md` only for the earlier architecture checkpoint as needed.
5. Read `docs/QUESTION-BANK-MAINTENANCE.md` and `src/data/sat/mockContent/batchMProductionPlan.md`.
6. Read `docs/BATCH-M-PRODUCTION-CORPUS-MANIFEST.md` to identify the frozen 30-mock inventory.
7. Read `docs/BATCH-M-CONTENT-QUALITY-QC-2026-09-14.md` for the original audit findings.
8. Read `docs/BATCH-M-COMPREHENSIVE-20-TEST-QC-CHECKPOINT-2026-09-16.md` for the completed remediation/re-gating milestone.
9. Do not repeat the completed impact audit, classification, inventory, preparation, candidate selection, controlled replacement, or comprehensive 20-test QC.
10. Record the completed **target-aware candidate generation → exact-target selection → pre-normalization independent review → canonical normalization → post-normalization independent review → final replacement-package validation → explicit authorization → controlled production replacement → post-mutation gates** sequence. Validation run **35697516214 — PASS**; authorized production run **35728264303 — PASS**. Keep release eligibility false until the remaining public/technical/student/final acceptance checkpoints pass. Canonical normalization uses exact target identity where present and strict structural compatibility; it cannot substitute unrelated canonical skills. The prior `difficultyBand` compatibility regression and collective gates are already resolved; do not create SAT21.
11. Treat SAT11–SAT20 public verification as deferred release work.
