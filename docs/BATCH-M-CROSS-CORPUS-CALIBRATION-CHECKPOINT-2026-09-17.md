# Batch M 30-Mock Cross-Corpus Calibration Checkpoint

**Date:** September 17, 2026  
**Status:** CALIBRATION COMPLETE / RELEASE BLOCKED BY TARGETED CALIBRATION REMEDIATION  
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

This did not independently fail the current technical calibration status, but it is a genuine specification review item and is included in the remediation scope before release progression.

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

A read-only remediation-scope calculation has been added. It does not alter production records.

### R&W minimum scope

To move the 3,240-question R&W corpus to the intended approximate domain distribution using integer counts, the minimum planned domain shift is **195 candidate replacements**:

- **65** Craft and Structure records → Standard English Conventions candidates.
- **130** Information and Ideas records → Standard English Conventions candidates.
- Expression of Ideas remains unchanged.

The resulting planned distribution would be approximately:

- Craft and Structure: **907 / 3,240 = 27.99%**
- Information and Ideas: **842 / 3,240 = 26.00%**
- Standard English Conventions: **843 / 3,240 = 26.02%**
- Expression of Ideas: **648 / 3,240 = 20.00%**

This is a planning scope only. No production replacement is authorized by this checkpoint.

### Math minimum scope

The current 503 SPR questions would need at least **157 additional SPR candidates** to reach the lower 25% boundary of the stated specification (660 / 2,640).

The candidate-selection process must preserve Math domain/skill balance, difficulty calibration, figure/data integrity, originality, and PSAT ceiling while changing response format where appropriate.

### Combined minimum candidate scope

The present read-only plan therefore identifies a minimum of **352 candidate replacement opportunities** across R&W and Math before the release sequence can continue.

## 5. Production boundary

This checkpoint records **candidate planning only**.

- `productionMutation: false`
- `releaseEligible: false`
- `sat21Created: false`
- The frozen 30-mock production corpus remains unchanged.
- No public release or website verification should proceed until the calibration blockers are resolved and re-gated.

## 6. Next implementation step

The next step is **calibration remediation candidate generation and controlled selection**. Candidates must be generated only for the quantified calibration gaps above and must remain outside the production corpus until explicitly authorized.

After authorized replacements, rerun the affected production gates, the final 30-mock corpus gate, and the cross-corpus calibration. Public-site verification remains deferred until the calibration stage passes.
