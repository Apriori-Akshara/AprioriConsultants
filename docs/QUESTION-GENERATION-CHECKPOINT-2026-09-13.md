# Question Generation Checkpoint — September 14, 2026

**Status:** Batch M production generation, final collective corpus verification, production-store cleanliness verification, and maintenance/spec safeguard verification COMPLETE; release/content-quality verification PENDING.

## Batch M production rule

Mocks were generated one at a time. Each mock passed its applicable generation, independent QC, figure/math/originality, mock-level, cross-mock uniqueness, canonical storage, and Render deployment acceptance gates before the next mock was accepted.

## Frozen 30-mock corpus

The complete approved production corpus is exactly:

- SAT Series A: SAT1–SAT10
- PSAT: PSAT1–PSAT10
- SAT Series B: SAT11–SAT20

The authoritative inventory is `docs/BATCH-M-PRODUCTION-CORPUS-MANIFEST.md`.

All 30 production mocks contain 196 validated records and remain stored separately from the legacy public corpus.

SAT20 is accepted and Render-LIVE by user confirmation.

## Final collective corpus verification

The final collective gate is wired into `src/data/sat/mockContent/batchMProductionStore.js` and runs against the exported frozen production corpus. It verifies exactly 30 mocks, the frozen production order/identity, 196 records per mock / 5,880 total records, canonical schema, per-mock and global question-ID uniqueness, applicable R&W/Math/figure uniqueness, figure originality, and JSON storage round-trip integrity.

The gate returns status `final-30-mock-corpus-qc-passed` and explicitly preserves the production/legacy corpus release boundary.

Implementation merge commit: `9e4d04aba5c5b72774d630627c4c04ce832641eb`.

## Production-store cleanliness verification

The canonical store has been checked and checkpointed after the final collective gate:

- `BATCH_M_ACCEPTED_PRODUCTION_CORPUS` contains exactly the 30 frozen production records.
- Its order is the frozen SAT1–SAT10 → PSAT1–PSAT10 → SAT11–SAT20 sequence.
- The store does not define or export a SAT21 production target.
- `BATCH_M_ACCEPTED_PRODUCTION_CHECKPOINT.nextTestKey` is `null`.
- `BATCH_M_FINAL_CORPUS_VERIFICATION` runs directly against the exported corpus.
- Production records remain separate from the legacy public corpus.

The Render deployment containing the final collective gate is green/live, so the store checkpoint has been executed in the deployment environment.

## Maintenance/spec safeguard verification

Step 4 is complete. The maintenance rules and SAT/PSAT specification were reviewed together with the production checkpoint and frozen corpus manifest.

The safeguards now explicitly preserve:

- the canonical question schema and existing compatible fields;
- the rule that only QC-passed items are eligible for live delivery;
- structured figure parameters as the production visual source of truth;
- independent R&W, mathematical, figure/originality, storage, and collective corpus verification;
- the private calibration boundary and prohibition on copying official calibration material into production/public files;
- the frozen 30-mock production boundary;
- the separation between Batch M production records and the legacy public corpus;
- the prohibition on SAT21 or any other new Batch M production target;
- explicit recording and re-verification of any post-freeze correction; and
- separation of website/release approval from content-generation acceptance.

The safeguard checkpoint is documented in `docs/BATCH-M-PRODUCTION-CORPUS-MANIFEST.md` and `docs/QUESTION-BANK-MAINTENANCE.md`.

## Freeze rule

The 30 production mocks remain frozen.

After this checkpoint:

- do not generate SAT21 or any other new Batch M production mock;
- do not silently regenerate or replace an accepted mock;
- do not expose the new corpus through the legacy public corpus without explicit release approval;
- any required correction must be explicitly recorded as a corpus change and re-verified.

## New Batch M release/content-quality sequence

Batch M production generation and corpus-level technical gates are complete, but **Batch M is not considered fully complete until these remaining checkpoints are completed:**

### 1. Public website release verification — user-facing check

The user inspects only `https://www.aprioriconsultants.org`.

The inspection covers:

- all 30 production mocks open;
- R&W content displays;
- Math content displays;
- figures/charts/tables display;
- no obvious missing content, broken visuals, overlap, clipping, or major layout defects;
- representative mobile/responsive checks.

The user does not perform technical/code/database/corpus QC and does not need to solve every question.

### 2. Technical release QC — internal project check

After the user's public-site findings are reported, technical QC will diagnose every reported issue against the relevant generation, storage, rendering, and frozen production-corpus implementation.

Only genuine defects will be corrected. Scope remains limited to question generation, storage, and rendering. Authentication, payments, entitlements, dashboard, Redux, and unrelated functionality must not be modified.

### 3. SAT/PSAT content-quality QC — R&W and Math

This is a distinct post-production quality checkpoint. Existing structural/originality/math/figure gates establish technical validity; they do not by themselves certify that questions are genuinely SAT/PSAT-level.

R&W calibration will evaluate, as applicable:

- source/passage complexity and information density;
- question construction and reasoning demand;
- skill/domain fit;
- evidence alignment;
- distractor quality and plausible student-error profiles;
- wording and answer-choice construction;
- Digital SAT-style realism;
- difficulty distribution and quality consistency.

Math calibration will evaluate, as applicable:

- mathematical reasoning demand and difficulty;
- skill/domain balance;
- multi-step reasoning;
- representation quality, including graphs/tables/figures;
- distractor quality;
- numerical/parameter diversity;
- Digital SAT-style realism;
- difficulty distribution and quality consistency.

The assessment must use the approved SAT/PSAT specification and permitted calibration references without copying or closely paraphrasing official material.

### 4. 30-mock cross-corpus calibration

The complete frozen corpus will be evaluated collectively for:

- difficulty consistency and distribution;
- R&W and Math skill/domain balance;
- construction diversity;
- conceptual/construction repetition beyond existing originality gates;
- appropriate SAT versus PSAT calibration;
- overall coherence of the 30-mock product.

This is a separate quality assessment from structural/originality QC.

### 5. Targeted remediation, only if necessary

Do not regenerate the corpus wholesale for isolated defects. If a genuine defect requires a production-corpus change, the change must be explicitly recorded, affected individual production gates rerun, and the final collective corpus gate rerun.

The frozen production boundary remains exactly 30 mocks. No SAT21 or additional production target may be created.

### 6. Final end-to-end student-experience acceptance

The final acceptance check will verify the student-facing journey through the existing architecture: launch → instructions → adaptive test-taking → completion → scoring/results → detailed report.

This is distinct from both question-content QC and the public visual inspection.

### 7. Final Batch M acceptance

Batch M may be declared fully complete only when the public website check, technical release QC, R&W/Math content-quality calibration, 30-mock cross-corpus calibration, any required remediation/re-gates, and final student-experience acceptance are complete.

## Important interpretation

Passing the existing generation, structural, originality, mathematical, figure, storage, and collective corpus gates does **not** by itself mean that the questions have been certified as authentic SAT/PSAT-level content. The new R&W/Math content-quality calibration and 30-mock cross-corpus calibration are the formal checkpoints for that judgment.

Any post-freeze corpus correction is exceptional and must be explicitly recorded and fully re-verified. No silent regeneration or replacement is permitted.

## Next step

**User public website inspection of all 30 production mocks.** After the inspection report, perform the technical release QC, then proceed to SAT/PSAT content-quality calibration and cross-corpus calibration. Do not generate SAT21.
