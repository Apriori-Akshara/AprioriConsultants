# Batch M 30-Mock Cross-Corpus Calibration Checkpoint

**Date:** September 17, 2026  
**Status:** HISTORICAL CALIBRATION + DEEP-QC RECORD / CURRENT RECONCILIATION REVIEW BLOCKED  
**Scope:** Frozen Batch M production corpus only

## 1. Prerequisite final corpus gate

The final collective 30-mock technical corpus gate passed on the current production corpus.

- GitHub Actions run: **35185020770**
- Result: **PASS**
- Frozen corpus: **30 mocks**
- Runtime records: **5,880**
- All mocks: **196 / 196** records
- Unique question IDs: **5,880**
- Unique R&W contexts: **3,240**
- Unique R&W prompts: **3,240**
- Unique Math application fingerprints: **2,640**
- Unique figure data across mocks: **745**

This gate remains technically clean after the calibration instrumentation changes.

## 2. Cross-corpus calibration result

GitHub Actions calibration run **35185020824** executed against the same frozen corpus.

Result: **FAIL — genuine calibration deviation identified**.

The calibration prerequisite final corpus gate passed before the calibration analysis ran. The failure is therefore a corpus-calibration finding, not a prerequisite structural/originality failure.

### R&W domain distribution

| Domain | Current | Calibration target | Difference |
|---|---:|---:|---:|
| Craft and Structure | 30.0% | ~28% | +2.0pp |
| Information and Ideas | 30.0% | ~26% | +4.0pp |
| Standard English Conventions | 20.0% | ~26% | **-6.0pp** |
| Expression of Ideas | 20.0% | ~20% | 0pp |

The project specification defines the R&W weights as approximately 28%, 26%, 26%, and 20%. The current Standard English Conventions share is therefore 6 percentage points below the intended calibration level and crossed the implemented 5-point hard tolerance.

### Math domain distribution

| Domain | Current | Calibration target | Difference |
|---|---:|---:|---:|
| Algebra | 32.58% | ~35% | -2.42pp |
| Advanced Math | 32.95% | ~35% | -2.05pp |
| Problem-Solving and Data Analysis | 17.80% | ~15% | +2.80pp |
| Geometry and Trigonometry | 16.67% | ~15% | +1.67pp |

All Math domain deviations are within the implemented 5-point tolerance.

### Math response-format calibration

- Math multiple-choice: **2,137 / 2,640 = 80.95%**
- Math student-produced response: **503 / 2,640 = 19.05%**
- Specification target: roughly **25–30%** student-produced response.

This did not independently fail the current technical calibration status, but it is a genuine specification review item and was included in the completed remediation scope.

## 3. Other calibration findings

- Overall difficulty: **26.73% easy / 40.92% medium / 32.35% hard**.
- No per-mock difficulty outliers exceeded the implemented 8-point consistency threshold.
- SAT and PSAT difficulty distributions were identical in this corpus-level check.
- R&W source-family coverage: **100%**.
- R&W rhetorical-structure metadata coverage: **100%**.
- R&W cognitive-operation metadata coverage: **100%**.
- Math application-fingerprint coverage: **100%**.
- R&W source-family diversity: **4** families.
- R&W rhetorical structures: **6**.
- R&W cognitive operations: **5**.
- Repetition/originality prerequisite remained PASS.
- PSAT records flagged as SAT-only by `applicable_to` in this calibration check: **0**.

## 4. Candidate-only remediation scope

The quantified calibration remediation was completed before this deep content-quality stage. The production/release boundary remains intact.

## 5. Production boundary

- `productionMutation: false` for this QC stage.
- `releaseEligible: false`.
- `sat21Created: false`.
- The frozen 30-mock production corpus remains unchanged by the deep QC.
- Public release/public-functionality verification is not authorized by this QC result.

## 6. Deep content-quality/diversity QC result

The next defined stage was executed against the **actual 30-mock runtime corpus: 5,880 questions** (SAT1-SAT10, PSAT1-PSAT10, SAT11-SAT20), including the authorized calibration replacement layer.

GitHub Actions deep-QC run **35192485649** completed the analysis and uploaded the full machine-readable report. The run correctly returned a **QUALITY HOLD** because the corpus did not satisfy all substantive acceptance criteria.

### Automated corpus findings

- Questions analyzed: **5,880 / 5,880**.
- Unique question IDs: **5,880 / 5,880**.
- Math questions: **2,640**.
- Math SPR: **660 / 2,640 = 25.0%** — within the 25–30% target.
- R&W skills represented: **10 / 10**.
- R&W source families: **4 / 4**.
- R&W rhetorical structures: **13** observed.
- R&W cognitive operations: **5** observed.
- Math domains: **4 / 4**.
- Math skills: **17** observed.
- Math figure types: **5** observed.
- Unique figure fingerprints: **745**.
- Duplicate normalized prompts: **76**; this is a diversity/originality failure because at least one duplicate group exists.
- Repeated normalized R&W stimuli: **0**.
- Duplicate Math application fingerprints: **0**.
- Stratified representative sample: **240 questions**; only targeted review flags were surfaced rather than manually reviewing thousands of records.

### Substantive failures

The machine-readable report recorded **3,783 failures** and **1,586 warnings**. The main failure classes were:

1. **Math distractor construction — 1,870 records:** existing content-quality checks found generic/numeric distractor patterns that require substantive distractor remediation.
2. **Hard-difficulty reasoning evidence — 932 records:** questions labelled hard did not consistently carry the required evidence of additional reasoning demand.
3. **R&W stimulus length — 304 records:** stimuli exceeded the implemented deep-QC range.
4. **R&W fixed Words-in-Context target — 301 records:** the same target-word/template pattern remained detectable and is not acceptable for corpus diversity.
5. **Math generic-template density — 290 records.**
6. **R&W generic-template density — 26 records.**
7. **Duplicate normalized prompt group — 1 group / 76 affected prompts.**
8. **Repeated R&W n-gram warning — 1,586 records:** strong evidence of recurring templated language across the corpus and therefore a material originality/diversity concern.

The representative sample also exposed concrete template-like R&W constructions, including recurring language around qualified interpretation, repeated study/context framing, and a fixed Words-in-Context target. These are targeted-review signals, not a claim that every sampled item is individually invalid.

### QC gate outcome

| QC dimension | Result |
|---|---|
| Scope / identity | PASS |
| Schema | PASS |
| R&W construction quality | **FAIL** |
| Math construction quality | **FAIL** |
| Reasoning / difficulty evidence | **FAIL** |
| Distractor quality | **REVIEW / remediation required** |
| Cross-mock diversity | **FAIL** |
| Figures / tables / graphs | PASS |
| PSAT ceiling | PASS |
| Math SPR calibration | PASS |

**Overall acceptance:** `QUALITY_HOLD`  
**Release eligibility:** `NOT_RELEASE_ELIGIBLE`

## 7. Production and release boundary after deep QC

No production question was modified, replaced, released, or deleted by this QC stage. No SAT21 was created. The failed deep-QC result is an acceptance finding only; it does not authorize a production mutation.

## 8. Precise next implementation step

The next step is **targeted substantive content-quality remediation**, limited to the documented deep-QC failure classes:

- remediate Math distractor construction;
- remediate hard-question reasoning-demand evidence;
- remediate R&W stimulus-length outliers;
- remove fixed Words-in-Context target/template repetition;
- remediate generic Math and R&W templates;
- eliminate duplicate prompts and reduce repeated n-gram/template language across mocks;
- preserve all already-passed domain, skill, SPR, figure/originality, PSAT-ceiling, and cross-mock constraints while doing so.

This must remain candidate-first and production-frozen. After targeted remediation candidates are generated and controlled selection is completed, rerun the deep QC and all required downstream corpus/calibration gates. **Do not declare the corpus release-ready until every documented acceptance criterion passes.**

## 9. Subsequent progress and current active boundary

The targeted deep-QC remediation path recorded in §8 has since been executed through candidate generation, selection, independent review, targeted remediation/re-review, and the separately authorized single-candidate replacement path. Those stages are historical and must not be repeated automatically.

The current active record is the **195-candidate R&W calibration reconciliation** represented by candidate-generation run **35212907193**. The candidate package passed its candidate-quality and hypothetical calibration gates, but the independent review run **35213306538** failed on assessment-variant compatibility for `BATCH-M-CAL-SEC-001`.

The implemented target-lock workflow is correctly gated on a successful independent review. Therefore the precise current next step is:

1. fix the candidate generator so each candidate's `assessmentVariant` and related assessment metadata come from the same `BATCH_M_PRODUCTION_SEQUENCE` entry as its assigned `productionTestId`;
2. regenerate the 195-candidate artifact and rerun candidate validation;
3. rerun independent review;
4. only after review PASS, run/verify the 195-target lock;
5. require a fresh explicit production authorization before any new production mutation.

The review compatibility check must not be weakened or removed. Production remains frozen, release eligibility remains false, and SAT21 remains prohibited.
