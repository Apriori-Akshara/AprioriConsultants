# Batch M Targeted Candidate-Selection Checkpoint — September 16, 2026

**Status:** CONTROLLED REPLACEMENT COMPLETE; COMPREHENSIVE 20-TEST QC COMPLETE — QUALITY HOLD REMAINS  
**Implementation branch:** `batch-m-comprehensive-20-test-qc-2026-09-16`  
**Production boundary:** Authorized controlled mutation completed for SAT1–SAT10 and PSAT1–PSAT10 only; release remains frozen pending downstream quality remediation and gates

## 1. Runtime and workflow state

GitHub Actions workflow:

`.github/workflows/batch-m-controlled-replacement.yml`

Latest successful controlled-replacement workflow: **run #26 / run ID `35080032477`**.

The controlled-replacement workflow completed every stage successfully: authoritative candidate selection, controlled replacement application, replacement-quality validation, runtime adapter validation, affected-mock validation, artifact commit, and push.

The authoritative selection stage reproduced the authorized scope exactly:

- affected unique production records: **2,144**
- selected candidates: **1,594**
- no eligible candidate: **0**
- SAT targets: **1,071**
- PSAT targets: **1,073**
- production mutation before apply: **false**
- release eligible: **false**
- SAT21 created: **false**
- exact selected payloads persisted: **1,594**

The controlled replacement stage then applied:

- selected count: **1,594**
- applied count: **1,594**
- replacement quality gate: **PASS**
- production mutation: **true**
- release eligible: **false**
- SAT21 created: **false**

The final committed replacement commit created by the workflow is:

`3c125d9` — `feat: apply authorized Batch M controlled replacement`

## 2. Runtime QC result

The successful controlled-replacement QC stage verified:

- affected targets: **2,144**
- selected replacements: **1,594**
- unresolved candidate coverage: **0**
- runtime corpus: **20 mocks / 3,920 runtime questions**
- questions per affected mock: **196**
- runtime replacement count: **1,594**
- replacement quality gate: **PASS**
- runtime adapter gate: **PASS**
- affected mock gate: **PASS**
- affected mocks checked: **20**
- out-of-scope mocks changed: **0**
- release eligible: **false**
- SAT21 created: **false**

The earlier runtime-count failure is resolved: **2,144 is the remediation target count, not the total 20-mock runtime corpus count.** The correct runtime corpus is **3,920 = 20 × 196**.

## 3. Replacement-construction correction

Run #25 / workflow run ID `35079522713` failed during replacement application because 20 selected replacements failed the post-construction content-quality gate.

Root cause identified: the selector deliberately permits the documented PSAT ceiling-compatible case where a **hard target in Advanced Math or Geometry and Trigonometry uses a medium candidate**, but the replacement constructor was restoring the frozen target's hard difficulty for that case. That created a mismatch with the selected candidate's actual difficulty features.

The replacement constructor was corrected to:

- preserve the exact selected candidate fingerprint and payload;
- merge candidate content onto the canonical production question;
- preserve and supplement canonical production metadata;
- apply candidate difficulty for difficulty-bearing remediation records;
- apply candidate medium difficulty for the documented PSAT hard-target/medium-candidate ceiling-compatible exception only;
- keep production schema validation and content-quality gates strict;
- emit exact failure details if a future replacement-quality gate fails.

The correction commit is:

`c25907cd744c02b5cdb4a333cd6fc449742adb96` — `fix: preserve PSAT ceiling-compatible candidate difficulty`

## 4. Production mutation record

Controlled replacement is recorded as authorized for the frozen Batch M affected set only:

- SAT1–SAT10
- PSAT1–PSAT10
- exact `testKey + questionId` targets only
- 1,594 replacements applied
- no additional production targets
- no wholesale regeneration
- no SAT21

The generated controlled-replacement artifact is:

`docs/BATCH-M-CONTROLLED-REPLACEMENT-2026-09-16.json`

The generated authoritative selection artifact is:

`docs/BATCH-M-AUTHORITATIVE-CANDIDATE-SELECTION-2026-09-16.json`

The controlled replacement map is:

`src/data/sat/mockContent/batchMControlledReplacementMap.js`

The production store applies the controlled replacement map through the canonical runtime adapter.

## 5. Comprehensive 20-test QC result — September 16, 2026

The comprehensive downstream QC was implemented as a read-only gate over the post-replacement SAT1–SAT10 and PSAT1–PSAT10 runtime corpus.

Workflow:

`.github/workflows/batch-m-comprehensive-20-test-qc.yml`

QC report:

`docs/BATCH-M-COMPREHENSIVE-20-TEST-QC-2026-09-16.json`

The workflow completed with a **QUALITY_HOLD** result. The gate was not weakened to obtain a pass.

Verified successfully:

- **20 mocks** in scope;
- **3,920 runtime questions** before replacement;
- **3,920 runtime questions** after replacement;
- **196 questions per mock**;
- **1,594 / 1,594** controlled replacement targets changed and matched the replacement map;
- **0 schema failures**;
- scope/identity gate: **PASS**;
- replacement-integrity gate: **PASS**;
- production mutation by the QC: **false**;
- release eligible: **false**;
- SAT21 created: **false**.

Content-quality result:

- **672 / 3,920** questions failed the current content-quality gate;
- **550** failures were `hard-label-without-demand-feature`;
- **206** failures were `rw-stimulus-length`;
- the 550 hard-label failures correspond to the still-unresolved difficulty-calibration population identified in the prior remediation plan;
- all 20 mocks retained content-quality failures, so the corpus cannot advance to release acceptance.

Figure-originality result:

- figure-originality gate: **FAIL**;
- one cross-mock figure duplication was detected: PSAT1 question `psat-mock-01-math-math-module-1-m1-14` duplicated the figure data of SAT1 question `sat-series-a-mock-01-math-math-module-1-m1-14`.

The complete machine-readable result is the QC report above. The failure is evidence for further targeted remediation; it is not a reason to weaken the gate or regenerate the corpus wholesale.

## 6. Current remediation status

Completed:

- candidate coverage remediation;
- candidate generation and selection remediation;
- exact authoritative candidate payload capture;
- explicit replacement authorization;
- controlled replacement of all 1,594 selected targets;
- replacement-quality gate;
- runtime adapter validation;
- affected-mock production gate;
- exact target identity preservation;
- out-of-scope protection;
- no-SAT21 safeguard;
- comprehensive 20-test post-replacement QC execution and evidence capture.

Still pending:

1. targeted remediation of the **550 remaining difficulty-calibration failures**;
2. targeted remediation of the **206 R&W stimulus-length failures**;
3. correction of the identified **cross-mock figure duplication**;
4. rerun the comprehensive 20-test QC;
5. only after the 20-test QC passes, run the final collective **30-mock corpus gate**;
6. 30-mock cross-corpus calibration;
7. deferred SAT11–SAT20 public verification;
8. end-to-end student acceptance;
9. final Batch M release acceptance.

Release eligibility remains **false** until those downstream gates pass.

## 7. Resume point / next implementation step

The next implementation step is **targeted post-QC remediation**, not another candidate-generation or controlled-replacement pass.

Start with the exact failures recorded in:

`docs/BATCH-M-COMPREHENSIVE-20-TEST-QC-2026-09-16.json`

The remediation must:

- address the 550 unresolved difficulty-calibration failures without weakening the hard-item gate;
- address the 206 R&W stimulus-length failures using the existing R&W construction/QC architecture;
- correct the identified cross-mock figure duplication through the existing figure-originality controls;
- remain limited to SAT1–SAT10 and PSAT1–PSAT10;
- not regenerate the corpus wholesale;
- not create SAT21;
- keep release eligibility false until the rerun passes.

After targeted remediation, rerun the comprehensive 20-test QC. Do **not** proceed to the final 30-mock corpus gate while this 20-test gate is failing.
