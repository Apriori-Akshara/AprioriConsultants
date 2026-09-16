# Batch M Targeted Candidate-Selection Checkpoint — September 16, 2026

**Status:** CANDIDATE SELECTION AND INDIVIDUAL SELECTED-CANDIDATE QUALITY GATES PASSED; REPLACEMENT AUTHORIZATION PENDING  
**Implementation branch:** `batch-m-rw-generator-remediation-2026-09-14`  
**Production boundary:** Frozen; no production mutation, replacement, release, or SAT21 creation authorized

## 1. Runtime and workflow state

GitHub Actions workflow:

`.github/workflows/batch-m-targeted-candidate-selection.yml`

Latest successful workflow run: **run #123 / run ID `35062589891`**.

The successful run completed all workflow stages, including selector validation, candidate-pool quality diagnostics, exact candidate selection, selected-candidate individual quality validation, coverage analysis, report verification, and report commit.

The two red workflow runs immediately before this successful run were **run #121 and run #122**. Both reached the selected-candidate quality gate successfully and failed only in the report-verification step because the verification expected a different `validatedCount` semantic than the generated report. Neither failure identified a candidate-content or selector-quality defect.

The corrected workflow contract was restored and run #123 passed all steps.

Earlier workflow/selector integration defects remain historical and already resolved; no production mutation occurred in those failures.

## 2. Latest candidate-selection result

The latest successful run produced:

- affected unique production records: **2,144**
- selected candidates: **1,594**
- no eligible candidate: **0**
- SAT targets: **1,071**
- PSAT targets: **1,073**
- candidate-pool quality: **13,000 SAT candidates passed; 13,000 PSAT candidates passed**
- production mutation: **false**
- release eligible: **false**
- replacement authorization: **NOT_AUTHORIZED**
- SAT21 created: **false**

The selected-candidate quality report additionally records:

- validated affected records: **2,144**
- validated selected candidates: **1,594**
- calibration-only records: **550**
- failed selected-candidate quality checks: **0**
- serious failures: **0**
- gate status: **PASS**

The authoritative report is:

`docs/BATCH-M-SELECTED-CANDIDATE-QUALITY-2026-09-15.json`

## 3. Candidate coverage resolution

The latest coverage analysis reports:

- **no-eligible candidate skill groups: 0**
- **top missing skill groups: none**
- **rejection reason counts: none**

The final 40 historical gaps were all in PSAT Advanced Math. The documented PSAT ceiling permits the Advanced Math hard tail to be trimmed, and the selector therefore extended its ceiling-compatible medium-for-hard handling to Advanced Math alongside Geometry and Trigonometry.

This did **not** weaken the content-quality gate and did **not** relabel candidate difficulty. It changed only selector compatibility for the documented PSAT ceiling path.

## 4. Current remediation status

The following stages are now resolved and runtime validated:

- candidate coverage remediation;
- linear construction and difficulty/reuse remediation;
- linear alias partition remediation;
- Words in Context construction remediation;
- geometry construction, targeted coverage, figure coverage, and difficulty/reuse remediation;
- product-scoped candidate reuse reservation;
- PSAT Geometry ceiling-compatible selection;
- PSAT Advanced Math ceiling-compatible selection;
- exact replacement-candidate selection;
- individual selected-candidate quality gate.

There is no remaining candidate-generation or candidate-selection failure requiring remediation before the replacement gate.

## 5. Production boundary

The following remain unchanged:

- `productionMutation: false`
- `releaseEligible: false`
- `replacementAuthorization: NOT_AUTHORIZED`
- `sat21Created: false`

The 1,594 selected candidates are downstream review candidates only. They are not production-approved and no frozen question has been replaced.

## 6. Next logical stage — authorization and controlled replacement

The next work must now move beyond candidate generation:

1. establish explicit replacement authorization;
2. apply only the authorized affected replacements and record every post-freeze change by `testKey + questionId`;
3. rerun the affected mock production gates;
4. after those gates pass, run the comprehensive **20-test QC covering SAT1–SAT10 and PSAT1–PSAT10**;
5. rerun the final collective **30-mock corpus gate**;
6. complete 30-mock cross-corpus calibration;
7. complete the deferred SAT11–SAT20 public verification;
8. complete final end-to-end student acceptance;
9. finalize Batch M release acceptance.

The production freeze remains active until explicit authorization is recorded.

No SAT21 or additional production target may be created.

## 7. Resume point

Read only:

- this document, especially **§4 Current remediation status** and **§6 Next logical stage — authorization and controlled replacement**;
- `docs/BATCH-M-SELECTED-CANDIDATE-QUALITY-2026-09-15.json` — latest individual-quality evidence;
- `docs/BATCH-M-TARGETED-CANDIDATE-COVERAGE-2026-09-15.json` — latest zero-gap coverage evidence;
- `docs/BATCH-M-TARGETED-CANDIDATE-SELECTION-2026-09-15.json` — exact candidate dispositions;
- `docs/BATCH-M-TARGETED-REPLACEMENT-CHECKPOINT-2026-09-15.md` — production authorization and release gates;
- `docs/QUESTION-GENERATION-ROADMAP.md` — current Batch M section only.

Do not repeat the impact audit, inventory, replacement preparation, selector performance work, candidate-generation remediation, or already-green downstream gates unless a real repository discrepancy is found.
