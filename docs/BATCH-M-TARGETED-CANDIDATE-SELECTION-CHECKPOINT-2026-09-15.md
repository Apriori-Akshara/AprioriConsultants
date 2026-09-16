# Batch M Targeted Candidate-Selection Checkpoint — September 16, 2026

**Status:** CONTROLLED REPLACEMENT COMPLETE; DOWNSTREAM QUALITY/RELEASE GATES PENDING  
**Implementation branch:** `batch-m-controlled-replacement-2026-09-16`  
**Production boundary:** Authorized controlled mutation completed for SAT1–SAT10 and PSAT1–PSAT10 only; release remains frozen pending downstream gates

## 1. Runtime and workflow state

GitHub Actions workflow:

`.github/workflows/batch-m-controlled-replacement.yml`

Latest successful controlled-replacement workflow: **run #26 / run ID `35080032477`**.

The workflow completed every stage successfully: authoritative candidate selection, controlled replacement application, replacement-quality validation, runtime adapter validation, affected-mock validation, artifact commit, and push.

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

The successful QC stage verified:

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
- final 30-mock corpus gate: **PENDING_DOWNSTREAM**
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

Controlled replacement is now recorded as authorized for the frozen Batch M affected set only:

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

The production store now applies the controlled replacement map through the canonical runtime adapter.

## 5. Current remediation status

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
- no-SAT21 safeguard.

Still pending:

1. final comprehensive **20-test QC** after the controlled replacement;
2. final collective **30-mock corpus gate**;
3. 30-mock cross-corpus calibration;
4. deferred SAT11–SAT20 public verification;
5. end-to-end student acceptance;
6. final Batch M release acceptance.

Release eligibility remains **false** until those downstream gates pass.

## 6. Resume point

Read only:

- this document, especially **§2 Runtime QC result**, **§4 Production mutation record**, and **§5 Current remediation status**;
- `docs/BATCH-M-REPLACEMENT-AUTHORIZATION-GATE-2026-09-16.md` — authorization and scope;
- `docs/BATCH-M-AUTHORITATIVE-CANDIDATE-SELECTION-2026-09-16.json` — exact selected candidate payloads;
- `docs/BATCH-M-CONTROLLED-REPLACEMENT-2026-09-16.json` — applied replacement record;
- `docs/QUESTION-GENERATION-ROADMAP.md` — current Batch M section only.

Do not repeat candidate-generation, candidate-selection, coverage, authorization, or controlled-replacement work unless a real repository discrepancy is found.

## 7. Next step

The next implementation stage is the documented downstream quality sequence, beginning with the **final comprehensive 20-test QC** over the now-mutated SAT1–SAT10 and PSAT1–PSAT10 corpus.

No SAT21 or additional production target may be created.
