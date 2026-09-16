# Batch M Targeted Candidate-Selection Checkpoint — September 16, 2026

**Status:** CONTROLLED REPLACEMENT COMPLETE; COMPREHENSIVE 20-TEST QC COMPLETE; TARGETED POST-QC REMEDIATION IMPLEMENTED — PRODUCTION-INTEGRATED VALIDATION PENDING  
**Implementation branch:** `batch-m-comprehensive-20-test-qc-2026-09-16`  
**Production boundary:** Authorized controlled mutation remains limited to SAT1–SAT10 and PSAT1–PSAT10; release remains frozen pending production-integrated downstream gates

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

The initial workflow completed with a **QUALITY_HOLD** result. The gate was not weakened to obtain a pass.

Verified successfully:

- **20 mocks** in scope;
- **3,920 runtime questions** before replacement;
- **3,920 runtime questions** after replacement;
- **196 questions per mock**;
- **1,594 / 1,594** controlled replacement targets changed and matched the replacement map;
- **0 schema failures** in the original post-replacement corpus;
- scope/identity gate: **PASS**;
- replacement-integrity gate: **PASS**;
- production mutation by the QC: **false**;
- release eligible: **false**;
- SAT21 created: **false**.

Initial content-quality result:

- **672 / 3,920** questions failed the content-quality gate;
- **550** failures were `hard-label-without-demand-feature`;
- **206** failures were `rw-stimulus-length`;
- the 206 R&W failures were all **Cross-Text Connections** items with overlong synthetic two-passage prompts;
- one figure-originality failure was identified: PSAT1 question `psat-mock-01-math-math-module-1-m1-14` duplicated the figure data of SAT1 question `sat-series-a-mock-01-math-math-module-1-m1-14`.

The complete original machine-readable result is retained as the historical QC evidence. The failure is evidence for targeted remediation; it is not a reason to weaken the gate or regenerate the corpus wholesale.

## 6. Targeted post-QC remediation implementation

A separate remediation layer was implemented without changing the controlled replacement map or regenerating the corpus.

Implementation:

`src/data/sat/mockContent/batchMPostQCTargetedRemediation.js`

The remediation is restricted to canonical `SAT1`–`SAT10` and `PSAT1`–`PSAT10` mock keys and performs only the documented downstream corrections:

- **550** hard-label cases are calibrated from `hard` to `medium` when no qualifying hard-reasoning feature exists;
- **206** Cross-Text Connections prompts are shortened by removing redundant construction sentences until they meet the existing **150-word maximum**;
- **1** exact PSAT1 figure collision is corrected with a distinct parabola dataset and corresponding mathematically consistent prompt/options/rationale;
- the changes affect **673 unique questions**, because some records require more than one remediation operation;
- the existing schema, content-quality, and figure-originality gates remain strict.

The first isolated rerun exposed an implementation-only metadata error in the remediation layer: it temporarily wrote invalid `difficultyBand` values. That patch was removed; the remediation now changes only the difficulty field and preserves the existing valid progression-band metadata.

The isolated targeted QC then showed that the three substantive remediation categories themselves clear the original quality failures: **0 content-quality failures** after the targeted repairs. The subsequent schema correction is the final implementation adjustment before production-integrated validation.

Supporting diagnostics:

- `docs/BATCH-M-POST-QC-TARGETED-DIAGNOSTICS-2026-09-16.json`
- `docs/BATCH-M-POST-QC-RW-DIAGNOSTIC-2026-09-16.json`
- `docs/BATCH-M-POST-QC-FIGURE-DIAGNOSTIC-2026-09-16.json`

## 7. Production-store integration

The targeted remediation layer is now wired into the canonical Batch M production store **after** controlled replacement and **before** the final 30-mock corpus verification.

Changed store:

`src/data/sat/mockContent/batchMProductionStore.js`

The store now applies, in order:

1. frozen production corpus construction;
2. the already-authorized controlled replacement map;
3. the separate post-QC targeted remediation layer;
4. the existing final 30-mock corpus verification.

The post-QC layer remains limited to SAT1–SAT10 and PSAT1–PSAT10. SAT11–SAT20 are not regenerated and are not targeted by the remediation layer. `releaseEligible` remains **false**, and no SAT21 target exists.

The production-integrated QC workflow is:

`.github/workflows/batch-m-production-integrated-20-test-qc.yml`

The production-integrated evidence artifact is:

`docs/BATCH-M-PRODUCTION-INTEGRATED-20-TEST-QC-2026-09-16.json`

The post-QC remediation evidence artifact is:

`docs/BATCH-M-POST-QC-TARGETED-REMEDIATION-2026-09-16.json`

**Production-integrated validation is now the active gate. The release remains frozen until that gate passes.**

## 8. Current remediation status

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
- comprehensive post-replacement 20-test QC execution;
- targeted diagnosis of all 672 QC failures;
- implementation of the 550 difficulty calibrations;
- implementation of the 206 Cross-Text stimulus repairs;
- implementation of the single identified figure-duplication repair;
- integration of the targeted remediation layer into the canonical Batch M production store.

Still pending:

1. **production-integrated 20-test QC pass** over the canonical store;
2. confirmation of the final collective **30-mock corpus gate** after the integrated remediation;
3. 30-mock cross-corpus calibration;
4. deferred SAT11–SAT20 public verification;
5. end-to-end student acceptance;
6. final Batch M release acceptance.

Release eligibility remains **false** until those downstream gates pass.

## 9. Resume point / next implementation step

The next implementation step is the **production-integrated 20-test QC** already wired at `.github/workflows/batch-m-production-integrated-20-test-qc.yml`.

Do not repeat candidate generation, candidate selection, authorization, or controlled replacement. Do not regenerate the corpus. Do not create SAT21.

After the production-integrated 20-test gate passes, the next documented gate is the final collective **30-mock corpus gate** followed by cross-corpus calibration and the remaining release-acceptance steps.
