# Batch M Targeted Candidate-Selection Checkpoint — September 16, 2026

**Status:** CANDIDATE COVERAGE RESOLVED; DOWNSTREAM QUALITY/RELEASE GATES PENDING  
**Implementation branch:** `batch-m-rw-generator-remediation-2026-09-14`  
**Production boundary:** Frozen; no production mutation, replacement, release, or SAT21 creation authorized

## 1. Runtime and workflow state

GitHub Actions workflow:

`.github/workflows/batch-m-targeted-candidate-selection.yml`

Latest successful workflow run: **run ID `35060652969`**.

The workflow completed all stages successfully, including selector validation, candidate-pool quality diagnostics, exact candidate selection, coverage analysis, report verification, and report commit.

The four failed iterations immediately before the recent green runs were diagnosed as workflow/selector integration defects rather than content-pool quality failures:

- one run used the wrong WIC remediation filename in a `node --check` command;
- the selector preparation change caused `targetRecords(...).filter is not a function` in subsequent runs;
- those failures were corrected by restoring the stable selector implementation and preserving product-scoped reuse plus the documented PSAT ceiling handling.

No production mutation occurred in those failures.

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

This is an improvement from the immediately preceding valid baseline of **1,554 selected / 40 no-eligible**.

## 3. Candidate coverage resolution

The latest coverage analysis reports:

- **no-eligible candidate skill groups: 0**
- **top missing skill groups: none**
- **rejection reason counts: none**

The remaining 40 gaps were all in PSAT Advanced Math. The documented PSAT ceiling permits the Advanced Math hard tail to be trimmed, and the selector already had the equivalent exception for Geometry and Trigonometry. The remediation therefore extended the same ceiling-compatible rule to `Advanced Math`, allowing medium candidates to satisfy hard PSAT targets where that is the documented ceiling-compatible replacement path.

The change was implemented in:

`scripts/applyBatchMSelectorPreparationCompatibilityFix.mjs`

The selector now reports both:

- `psatGeometryDifficultyException: true`
- `psatAdvancedMathDifficultyException: true`

while retaining product-scoped candidate reuse.

This did **not** weaken the content-quality gate and did **not** relabel candidate difficulty. It changed only the selector's PSAT ceiling compatibility rule.

## 4. Current remediation status

The following generator/selection remediations are now in place and runtime validated:

- candidate coverage remediation;
- linear construction and difficulty/reuse remediation;
- linear alias partition remediation;
- Words in Context construction remediation;
- geometry construction, targeted coverage, figure coverage, and difficulty/reuse remediation;
- product-scoped candidate reuse reservation;
- PSAT Geometry ceiling-compatible selection;
- PSAT Advanced Math ceiling-compatible selection.

The candidate-selection stage is therefore **resolved at the coverage level** for the frozen 2,144 affected records.

## 5. Production boundary

The following remain unchanged:

- `productionMutation: false`
- `releaseEligible: false`
- `replacementAuthorization: NOT_AUTHORIZED`
- `sat21Created: false`

The 1,594 selected candidates are downstream review candidates only. They are not production-approved and no frozen question has been replaced.

## 6. Next logical stage — downstream quality and release gating

Candidate coverage is now resolved. The next stage is **not another candidate-coverage remediation cycle**.

The next work must move through the already-defined downstream gates:

1. validate the selected candidates against the applicable individual replacement/QC requirements;
2. establish explicit replacement authorization before any production mutation;
3. apply only genuinely affected replacements and record every `testKey + questionId` change;
4. rerun the affected mock production gates;
5. rerun the final collective **30-mock corpus gate**;
6. complete 30-mock cross-corpus calibration;
7. complete the deferred SAT11–SAT20 public verification;
8. complete final end-to-end student acceptance;
9. finalize Batch M release acceptance.

No SAT21 or additional production target may be created.

## 7. Resume point

Read only:

- this document, especially **§3 Candidate coverage resolution** and **§6 Next logical stage — downstream quality and release gating**;
- `docs/BATCH-M-TARGETED-CANDIDATE-COVERAGE-2026-09-15.json` — latest zero-gap coverage evidence;
- `docs/BATCH-M-TARGETED-CANDIDATE-SELECTION-2026-09-15.json` — exact candidate dispositions;
- `docs/BATCH-M-TARGETED-REPLACEMENT-CHECKPOINT-2026-09-15.md` — production authorization and release gates;
- `docs/QUESTION-GENERATION-ROADMAP.md` — current Batch M section only.

Do not repeat the impact audit, inventory, replacement preparation, selector performance work, or already-green candidate-selection workflow unless a real repository discrepancy is found.
