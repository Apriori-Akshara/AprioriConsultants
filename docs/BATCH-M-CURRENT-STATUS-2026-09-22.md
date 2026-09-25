# Batch M Current Status — 2026-09-22

**Status:** CURRENT AUTHORITATIVE BATCH M RELEASE CHECKPOINT — UPDATED 2026-09-25  
**Documentation branch:** `main`  
**Latest relevant implementation revision:** `1fbe6bd2573d8b258fc6ade46cc72cec458ced85`  
**Production target:** 30 controlled mocks — SAT1–SAT10, PSAT1–PSAT10, SAT11–SAT20  
**SAT21:** prohibited / not created  
**Release eligible:** false

## 1. Current authoritative state

The earlier September 21 documentation is now historical. The active deep SAT/PSAT content-quality/diversity remediation path has progressed beyond the prior 299-candidate HOLD.

The corrected candidate pipeline now produces a candidate set that has passed the independent substantive candidate review:

- Candidate selection workflow: **35666673484 — PASS**
- Candidate pipeline: **35666673409 — PASS**
- Independent substantive review: **35666673400 — PASS**
- Independent review result: **25 / 25 PASS**
- FAIL: **0**
- Expert-review flags: **0**
- Duplicate groups: **0**
- Production mutation: **false**
- Release eligibility: **false**

The reviewed candidates formed the input to the exact target-aware replacement package. That package was subsequently authorized and applied to production; the current production state is governed by the exact 25-target mutation record below.

The candidate-selector correction that established this current pipeline is recorded at:

`f52238c6a3ffafd97baca9ba291a310d5187af2f` — `fix: correct Batch M candidate selector syntax`

The latest collective gates remain:

- Final 30-mock corpus gate: **35666818448 — PASS**
- 30-mock cross-corpus calibration: **35666822839 — PASS**

The latest Vercel check before this package-only implementation was green.

## 2. Batch M checklist

| Stage | Status |
|---|---|
| 1. Production corpus generation: SAT1–10, PSAT1–10, SAT11–20 | ✅ COMPLETE |
| 2. Production-store cleanliness / 30-mock boundary | ✅ COMPLETE |
| 3. Targeted 20-test remediation and authorized replacements | ✅ COMPLETE |
| 4. 195-target calibration reconciliation and authorized production application | ✅ COMPLETE |
| 5. Final 30-mock corpus gate | ✅ PASS — 35666818448 |
| 6. 30-mock cross-corpus calibration | ✅ PASS — 35666822839 |
| 7. Deep SAT/PSAT content-quality/diversity remediation | ✅ CANDIDATE PIPELINE CORRECTED |
| 8. Independent substantive candidate review | ✅ 25/25 PASS, 0 FAIL, 0 expert-review flags |
| 9. Prepare controlled production-replacement package | ✅ COMPLETE — deterministic candidate-only package pipeline implemented |
| 10. Resolve package compatibility blockers / validate clean package | ✅ PASS — exact target-aware generation, selection, pre/post independent review, canonical normalization, hypothetical 30-mock gate, and cross-corpus calibration verified in run **35697516214** |
| 11. Explicit authorization of the replacement scope | ✅ COMPLETE — explicit authorization recorded 2026-09-22 |
| 12. Controlled production replacement, if authorized | ✅ COMPLETE — 25/25 exact replacements applied in authorized run **35728264303** |
| 13. Re-run affected corpus/content/calibration gates | ✅ PASS — 30-mock corpus gate + cross-corpus calibration |
| 14. Final public student-facing inspection of all 30 mocks | ✅ COMPLETE — user quick-check verified all 30 mocks |
| 15. Technical release QC | ⏳ PENDING |
| 16. Final end-to-end student acceptance | ⏳ PENDING |
| 17. Final Batch M release acceptance | ⏳ PENDING |

## 3. Completed production milestones

The following remain complete and must not be repeated wholesale:

- Production generation of the frozen 30-mock corpus.
- Production-store cleanliness and scope protection.
- Targeted 20-test remediation and authorized replacements.
- 195-target R&W calibration reconciliation, including independent review, exact target lock, explicit authorization, and production application.
- Correction of the resulting `difficultyBand` compatibility issue.
- Final 30-mock corpus gate.
- 30-mock cross-corpus calibration.
- SAT11–SAT20 public route smoke verification.
- Focused authenticated Series B functionality acceptance reported satisfactory by the user.
- The earlier 299-candidate deep-QC review and its subsequent remediation history.

The frozen production scope remains exactly 30 mocks. No SAT21 has been created.

The user subsequently completed a quick public-site inspection of all 30 frozen mocks and reported that all 30 mocks are loading. This closes the Stage 14 public student-facing inspection checkpoint at the documented quick-check level. The Series B runtime/memory remediation is also live in `c4e73fa0359f7356565aeb794f322b9362c435d6`, and the user verified that Series B tests now load publicly. The earlier Stage 14 calculator/routing implementation therefore proceeds to the next release checkpoint without reopening completed content-generation work.

## 4. Current candidate-only milestone

The candidate-only pipeline passed substantive independent review with **25 / 25 candidates passing**, and the exact target-aware replacement package completed the full candidate-only validation chain in workflow run **35697516214 — PASS**. That package was then explicitly authorized and applied in production workflow **35728264303 — PASS**.

The required control remains:

**candidate → exact existing production target → replacement package → package validation → explicit authorization → controlled production mutation**

The production target must be an existing question in the frozen 30-mock corpus. No new mock, question outside the approved scope, or automatic replacement may be introduced.

### Replacement-package implementation now present

The controlled package pipeline is now present in:

- `scripts/runBatchMDeepContentQualityReplacementPackage.mjs`
- `scripts/runBatchMDeepContentQualityCanonicalNormalization.mjs`
- `scripts/runBatchMDeepContentQualityIndependentReview.mjs`
- `scripts/runBatchMDeepContentQualityReplacementPackageFinalValidation.mjs`
- `.github/workflows/batch-m-canonical-replacement-package.yml`

The pipeline now generates candidates directly from exact frozen production targets identified in the September 15 replacement-preparation inventory, performs exact-target-aware selection, pre-normalization independent review, canonical normalization, post-normalization independent review, and final hypothetical replacement validation. The former generic 58-candidate pool is no longer the release-package source of truth for Batch M replacement preparation.

The latest hardening prevents silent operational drift: target resolution now records an explicit method and source index; canonical operational fields are checked exactly; protected metadata is integrity-checked; figure type/shape compatibility is required; and the fresh review must explicitly identify the 2026-09-22 normalized artifact. The candidate-only package workflow remains mutation-ineligible by design; the separate authorized production workflow has now completed successfully.

## 5. Production boundary

The following controls remain active:

- Production corpus remains frozen at 30 mocks.
- No SAT21.
- No broad regeneration of the 30-mock corpus.
- No automatic production mutation from candidate review or package preparation.
- No weakening of substantive review, diversity, schema, originality, calibration, or replacement-integrity gates.
- No release eligibility until all downstream release checkpoints pass.

The validated 25-target package has now been applied to the frozen production corpus under the explicit 2026-09-22 authorization. The resulting production mutation remains **release-ineligible** until the downstream release checkpoints pass.

## 6. Human-editable launch-bank implementation checkpoint

The launch-content workflow has now been separated from the frozen legacy corpus. The repository contains `question-banks/legacy-30-mock-corpus/` for the existing 30-mock working copies and `question-banks/approved-launch-corpus/` for human-approved launch content. A deterministic exporter, `scripts/exportBatchMLegacyCorpusToHumanBank.mjs`, and npm command `npm run question-bank:export-legacy` are implemented to materialize the frozen corpus into the legacy human-editable area without mutating production.

The existing 30-mock corpus remains legacy/non-approved content. It may be selectively retained, edited, or replaced, but nothing becomes canonical launch content merely because it exists in the legacy area. The controlled document parser/validator, approval gate, canonical staging adapter, answer-resolution adapter, and CI pilot are now implemented and verified. The next question-bank maintenance step is full 30-mock legacy document materialization.

## 8. Current logical implementation sequence
### Stage 14 frontend remediation — 2026-09-23/25

A public student-facing inspection found two frontend defects: PSAT mocks were launched through the SAT dynamic route, and Desmos calculator access was not reliably exposed across the shared runner. These were corrected by adding a canonical PSAT dynamic route, separating the shared browser runner from the SAT server page, and providing both official College Board Desmos testing calculators with popup-block fallback. The user then completed a quick public-site inspection of all 30 frozen mocks and reported that all 30 mocks are loading. The user also confirmed that the Series B tests are loading publicly after the runtime memory remediation in `c4e73fa0359f7356565aeb794f322b9362c435d6`.

**Stage 14 status: COMPLETE at the documented quick-check level.** No additional Stage 14 code change is required unless a new live defect is reported.


### Step 1 — Controlled replacement-package preparation

**Implemented.** The package builder deterministically proposes an existing production target for each passed candidate and records the candidate, target snapshot, and compatibility blockers.

### Step 2 — Resolve package compatibility blockers / validate clean package — PASS

**Implementation added on `main`:**

- `scripts/runBatchMDeepContentQualityCanonicalNormalization.mjs`
- `scripts/runBatchMDeepContentQualityReplacementPackageFinalValidation.mjs`
- `.github/workflows/batch-m-canonical-replacement-package.yml`

The normalization stage deterministically resolves each passed candidate to one existing frozen production target and copies the target's canonical structural metadata into a candidate-only normalized record. Semantic mappings are now strict: scatterplot interpretation → Data models; equivalent exponential representations → Exponential equations; right-triangle relationships → Right triangles; linear relationships → Linear functions. Candidate content and candidate identity remain distinct.

A **fresh independent substantive review** is then run after normalization, followed by final hypothetical replacement validation against the frozen production corpus, including schema/content quality, exact target compatibility, duplicate checks, the final 30-mock corpus gate, and cross-corpus calibration.

The new workflow is candidate-only and performs no production mutation.

**Fresh verification result — run 35697516214:** target-aware candidate generation produced **25/25** exact-target candidates with **0 unresolved**; target-aware selection produced **25/25** with **0 rejected**; pre-normalization independent review returned **25 PASS / 0 FAIL / 0 expert-review**; canonical normalization passed; post-normalization independent review passed; final hypothetical replacement validation passed; and package artifacts uploaded successfully. The former 58-candidate → 4-target blocker is superseded.

Production remains candidate-only; no CI step in this package performs production mutation or grants authorization.

**Historical compatibility failures preceding the PASS:** after the module-loader issue was fixed, the workflow reached canonical normalization and correctly rejected `PSAT1-BATCHM-DQ-1031` because its strict target pool required the same module, while the frozen PSAT1 Math corpus places the matching canonical Data Models item in another adaptive module. The package workflow is now corrected at the selection layer: it downloads the current 58-candidate pool, target-aware reselects exactly 25 candidates that have real canonical targets under the strict compatibility contract, performs an independent review before normalization, normalizes canonical metadata, performs a distinct post-normalization review, and then runs final package validation. The workflow remains candidate-only; no CI PASS is claimed until a completed run verifies this path.

The package validator must establish, for all 25 entries:

- one exact existing production target per candidate;
- unique candidate identities;
- unique target identities;
- section/module/difficulty/question-type compatibility;
- canonical domain/skill compatibility;
- assessment-family/assessment-variant compatibility;
- figure/data compatibility where applicable;
- production-boundary flags remain false;
- no production-scope expansion;
- no SAT21 creation.

The canonical-normalization implementation now resolves the previously identified assessment/skill-label compatibility differences in a candidate-only artifact and records the exact mapping and target-metadata integrity hash. The final validator separately verifies those controls rather than assuming normalization was safe.

### Step 3 — Explicit authorization checkpoint

**COMPLETE.** Explicit human authorization was recorded on 2026-09-22 for the exact validated 25-target package.

### Step 4 — Controlled production replacement

**COMPLETE.** Authorized workflow **35728264303** applied exactly 25 one-for-one replacements to existing production targets. Existing canonical `testId` and `questionId` identities were preserved, production metadata records the authorization/package/candidate/target identities, `releaseEligibility` remains false, and no new mock or SAT21 was created.

### Step 5 — Affected and collective re-gating

**PASS.** The same authorized workflow ran the post-mutation production gates successfully:

- frozen corpus size: **30 mocks**;
- authorized replacements detected: **25**;
- final 30-mock corpus gate: **PASS**;
- cross-corpus calibration: **PASS**;
- releaseEligibility: **false**;
- SAT21: **not created**.

### Step 6 — Final release sequence

Once the controlled replacement sequence is fully cleared:

1. final public student-facing inspection of all 30 mocks;
2. technical release QC;
3. final end-to-end student acceptance;
4. Batch M release acceptance.

## 7. Human-editable and canonical question-bank architecture

The human-editable/canonical maintenance bridge is **implemented and pilot-verified**. It is a maintenance capability layered on top of the canonical runtime question bank; it does not replace the existing SAT engine or release gates.

Implemented controls include the legacy/approved separation, deterministic 30-mock exporter, deterministic Markdown parser, canonical schema validation, explicit `STATUS: APPROVED` gating, canonical staging, conservative answer/choice resolution, and the end-to-end SAT1 pilot.

Verified CI pilot: **Human question bank pilot — run 36152194934 — SUCCESS**. The pilot preserved exact question IDs and answer identities and performed no production mutation.

The next maintenance step is **full 30-mock legacy document materialization**. It is independent of the remaining Batch M release checkpoints and must not be treated as release approval.

## 8. Documentation authority

For future sessions:

1. Treat this file as the authoritative Batch M current-status document.
2. Treat `docs/QUESTION-GENERATION-ROADMAP.md` as the authoritative implementation roadmap.
3. Treat `docs/HUMAN-EDITABLE-CANONICAL-QUESTION-BANK-SPEC.md` as authoritative for human-editable/canonical question-bank maintenance.
4. Treat September 17 and September 21 Batch M checkpoints as historical records where their "current next step" sections conflict with this document.
5. Do not resume from the obsolete 299-candidate HOLD or from the obsolete `difficultyBand` blocker.
6. Do not repeat completed generation, remediation, review, locking, or production-application stages.

## 9. Release status

**Current release status: NOT RELEASE-ELIGIBLE.**

Stages 11–14 are complete: explicit authorization, the exact 25-target controlled production replacement, post-mutation affected/collective gates, and the user-reported quick public inspection of all 30 frozen mocks. The later frontend/runtime defects involving PSAT routing, calculator exposure, and Series B loading were corrected and separately verified; no new Stage 14 work is required unless a new live defect is reported.

The next Batch M release stage remains **Stage 15 — Technical release QC**, followed by final end-to-end student acceptance and final Batch M release acceptance.

The next question-bank maintenance stage is separate: **materialize the full 30-mock legacy document set** using `npm run question-bank:export-legacy`.
