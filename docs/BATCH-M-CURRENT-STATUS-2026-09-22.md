# Batch M Current Status — 2026-09-22

**Status:** CURRENT AUTHORITATIVE BATCH M RELEASE CHECKPOINT  
**Documentation branch:** `main`  
**Latest verified implementation revision:** `a36a7d5ea4fe0d69bb0fddf8aa512c302e0e77e3`  
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

The reviewed candidates are therefore **approved candidates for the next controlled replacement-preparation stage**, but they are not themselves production replacements.

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
| 9. Prepare controlled production-replacement package | ✅ IMPLEMENTED — deterministic package builder + CI validation added; authorization readiness still blocked pending canonical compatibility validation |
| 10. Resolve package compatibility blockers / validate clean package | ✅ IMPLEMENTED + HARDENED — canonical normalization, fresh-review identity, target-resolution, operational-metadata, figure, and final hypothetical package gates added; CI result not independently retrievable |
| 11. Explicit authorization of the replacement scope | ⏳ PENDING |
| 12. Controlled production replacement, if authorized | ⏳ PENDING |
| 13. Re-run affected corpus/content/calibration gates | ⏳ PENDING |
| 14. Final public student-facing inspection of all 30 mocks | ⏳ PENDING |
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

## 4. Current candidate-only milestone

The current candidate-only pipeline has passed substantive independent review with **25 / 25 candidates passing**.

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

The pipeline consumes the current 25-candidate selection, resolves one deterministic existing target per candidate in the frozen 30-mock corpus, normalizes canonical structural metadata without production mutation, runs a fresh independent substantive review, and performs final hypothetical replacement validation.

The latest hardening prevents silent operational drift: target resolution now records an explicit method and source index; canonical operational fields are checked exactly; protected metadata is integrity-checked; figure type/shape compatibility is required; and the fresh review must explicitly identify the 2026-09-22 normalized artifact. Production mutation remains blocked.

## 5. Production boundary

The following controls remain active:

- Production corpus remains frozen at 30 mocks.
- No SAT21.
- No broad regeneration of the 30-mock corpus.
- No automatic production mutation from candidate review or package preparation.
- No weakening of substantive review, diversity, schema, originality, calibration, or replacement-integrity gates.
- No release eligibility until all downstream release checkpoints pass.

The 25 reviewed candidates are **candidate-only**.

## 6. Current logical implementation sequence

### Step 1 — Controlled replacement-package preparation

**Implemented.** The package builder deterministically proposes an existing production target for each passed candidate and records the candidate, target snapshot, and compatibility blockers.

### Step 2 — Resolve package compatibility blockers / validate clean package

**Implementation added on `main`:**

- `scripts/runBatchMDeepContentQualityCanonicalNormalization.mjs`
- `scripts/runBatchMDeepContentQualityReplacementPackageFinalValidation.mjs`
- `.github/workflows/batch-m-canonical-replacement-package.yml`

The normalization stage deterministically resolves each passed candidate to one existing frozen production target and copies the target's canonical structural metadata into a candidate-only normalized record. Semantic mappings are now strict: scatterplot interpretation → Data models; equivalent exponential representations → Exponential equations; right-triangle relationships → Right triangles; linear relationships → Linear functions. Candidate content and candidate identity remain distinct.

A **fresh independent substantive review** is then run after normalization, followed by final hypothetical replacement validation against the frozen production corpus, including schema/content quality, exact target compatibility, duplicate checks, the final 30-mock corpus gate, and cross-corpus calibration.

The new workflow is candidate-only and performs no production mutation.

**CI execution result is not independently retrievable through the available GitHub Actions read interface; no CI PASS is claimed here. The repository includes direct npm QC commands and Node syntax checks for the package scripts.**

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

Only after the canonical-normalized pipeline has a verifiable clean 25/25 fresh review **and** final package validation result should the exact package be presented as ready for explicit production authorization.

Authorization is a separate control and must not be inferred from candidate-review PASS.

### Step 4 — Controlled production replacement

Only after explicit authorization:

- apply the exact approved mappings;
- record before/after identities;
- keep the operation one-for-one and auditable;
- do not regenerate unrelated questions.

### Step 5 — Affected and collective re-gating

After any authorized production mutation, rerun the required affected-item/mock checks and the collective gates. The final 30-mock corpus gate and cross-corpus calibration must remain PASS.

### Step 6 — Final release sequence

Once the controlled replacement sequence is fully cleared:

1. final public student-facing inspection of all 30 mocks;
2. technical release QC;
3. final end-to-end student acceptance;
4. Batch M release acceptance.

## 7. Human-editable and canonical question-bank architecture

The human-editable question-bank capability remains **approved/planned and not yet implemented in code**.

It is a maintenance capability and does not replace the canonical runtime question bank. It must not be introduced as an excuse to bypass the controlled replacement package or the production authorization gate.

Its implementation remains downstream of the current Batch M release-critical content-quality work unless a later maintenance task is explicitly prioritized.

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

The prior 25-candidate review passed. The controlled replacement pipeline is now hardened and remains candidate-only. The next release-critical verification is a verifiable fresh CI result for the normalized candidates and final package; only after that may the exact package move to the separate explicit-authorization checkpoint. Post-mutation re-gating and the final public/technical/student/release acceptance sequence remain pending.
