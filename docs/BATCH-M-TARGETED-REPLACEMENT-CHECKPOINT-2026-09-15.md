# Batch M Targeted Replacement Checkpoint — September 15, 2026

**Status:** TARGETED CANDIDATE-SELECTION RUNTIME VALIDATED — CANDIDATE COVERAGE REMEDIATION NEXT  
**Branch:** `batch-m-rw-generator-remediation-2026-09-14`  
**Scope:** Read-only preparation and candidate selection for targeted remediation of frozen SAT1–SAT10 and PSAT1–PSAT10 production records  
**Production boundary:** Frozen; no production mutation, replacement, release, or SAT21 creation authorized

## 1. Completed remediation sequence

The Batch M post-audit sequence has completed these read-only stages:

1. Representative remediation QC — PASS.
2. First-20 production impact identification — COMPLETE.
3. Impact classification — COMPLETE.
4. Targeted review inventory — COMPLETE.
5. Targeted replacement preparation — COMPLETE.
6. Targeted candidate generation and controlled selection — RUNTIME VALIDATED.

No step above mutated the frozen production corpus.

## 2. Audited production scope

- SAT1–SAT10
- PSAT1–PSAT10
- 20 mocks
- 3,920 questions total, 196 per mock
- 2,144 unique affected production question records

SAT11–SAT20 remain outside this impact-replacement scope and remain a later public-verification checkpoint.

## 3. Completed impact classification and inventory

The read-only impact audit identified 2,144 affected unique records. Classification and inventory established these question-level review groups:

- **HIGH_CONFIDENCE_CONTENT_REVIEW:** 1,594 assignments
- **DIFFICULTY_CALIBRATION_REVIEW:** 648 assignments
- **Review buckets:**
  - HIGH_CONFIDENCE_CONTENT_REVIEW: 1,496
  - DIFFICULTY_CALIBRATION_REVIEW: 550
  - HIGH_CONFIDENCE_PLUS_DIFFICULTY: 98

The generated targeted-review inventory is:

`docs/BATCH-M-TARGETED-REVIEW-INVENTORY-2026-09-15.json`

## 4. Completed targeted replacement preparation

The preparation command was executed successfully from `D:\AprioriConsultants-Git`:

`npm run qc:batch-m-targeted-replacement-preparation`

Result:

- **2,144 affected unique questions prepared**
- `productionMutation: false`
- `releaseEligible: false`
- `replacementAuthorization: NOT_AUTHORIZED`
- `status: TARGETED_REPLACEMENT_PREPARATION_READY`

Remediation types:

| Remediation type | Count |
|---|---:|
| CONTENT_REPLACEMENT | 1,496 |
| CONTENT_REPLACEMENT_PLUS_DIFFICULTY_CALIBRATION | 98 |
| DIFFICULTY_CALIBRATION_AND_POSSIBLE_REPLACEMENT | 550 |

Remediation tracks:

| Track | Count |
|---|---:|
| MATH_DISTRACTOR_REMEDIATION | 1,356 |
| DIFFICULTY_CALIBRATION | 648 |
| RW_WIC_REMEDIATION | 216 |
| RW_CONSTRUCTION_REMEDIATION | 22 |

Track counts can overlap because one question may require more than one remediation track.

The generated preparation report is:

`docs/BATCH-M-TARGETED-REPLACEMENT-PREPARATION-2026-09-15.json`

## 5. Completed targeted candidate generation and controlled selection

The candidate-selection implementation is now runtime validated through GitHub Actions.

The successful pipeline:

- generated candidates from the remediated R&W and Math factories;
- applied the strengthened Batch M content-quality gate;
- filtered by target section/skill/domain/difficulty/variant/question-type/figure requirements;
- enforced production-content and candidate-reuse uniqueness checks;
- produced deterministic candidate-selection and coverage reports;
- preserved the production freeze throughout.

The workflow now checks out the exact triggering commit and verifies the checked-out `HEAD` equals `GITHUB_SHA`, preventing branch-head drift from producing misleading runtime results.

Validated baseline:

- **2,144 affected records**
- **371 selected candidates**
- **1,223 no-eligible-candidate records**

Reports:

- `docs/BATCH-M-TARGETED-CANDIDATE-SELECTION-2026-09-15.json`
- `docs/BATCH-M-TARGETED-CANDIDATE-COVERAGE-2026-09-15.json`

## 6. Interpretation boundary

The candidate-selection report is a controlled remediation-selection artifact, not a production replacement authorization.

A selected candidate is eligible for downstream review only. It is not production-approved merely because it passes the candidate-selection gate.

No question may be replaced merely because it appears in the 2,144-record inventory or because a candidate has been selected.

## 7. Current blocker and next logical step — candidate coverage remediation

The runtime pipeline is now green. The remaining problem is **candidate coverage**, with 371/2,144 targets currently receiving a selected candidate and 1,223/2,144 remaining without an eligible candidate.

The next implementation stage is to remediate the candidate-generation/pool gaps identified by the coverage report, starting with the highest-impact zero/low-coverage groups.

Primary remaining causes include:

- difficulty mismatch;
- assessment-variant mismatch;
- candidate reuse;
- question-type mismatch;
- figure-required or figure-type mismatch.

This stage must improve the actual candidate pool rather than relax the selection gate merely to increase counts. The strengthened content-quality gate, uniqueness/originality rules, assessment-family rules, figure requirements, and PSAT ceilings must remain intact.

After each material generator correction, the complete candidate-selection workflow must be rerun and the resulting coverage compared against the current 371-selected / 1,223-no-eligible baseline.

## 8. Mandatory gates after candidate coverage is resolved

Before any frozen production record is changed:

1. candidate-generation/selection report must meet the required coverage threshold;
2. replacement authorization must be explicitly established;
3. selected candidates must pass the applicable individual quality gates;
4. exact post-freeze changes must be recorded by `testKey + questionId`;
5. affected mock production gates must be rerun;
6. the final collective 30-mock corpus gate must be rerun;
7. 30-mock cross-corpus calibration must be completed;
8. SAT11–SAT20 public verification must be completed;
9. final end-to-end student acceptance must be completed;
10. Batch M release acceptance must be finalized.

No SAT21 or additional production target may be created.

## 9. Resume point for the next session

Read only:

- this document, especially **§7 Current blocker and next logical step — candidate coverage remediation**;
- `docs/BATCH-M-TARGETED-CANDIDATE-SELECTION-CHECKPOINT-2026-09-15.md` — runtime status and implementation history;
- `docs/BATCH-M-TARGETED-CANDIDATE-COVERAGE-2026-09-15.json` — current coverage and rejection evidence;
- `docs/BATCH-M-TARGETED-CANDIDATE-SELECTION-2026-09-15.json` — exact per-target candidate dispositions;
- `docs/QUESTION-GENERATION-ROADMAP.md` — only the section governing the current Batch M remediation stage.

Do not repeat the impact audit, inventory, replacement preparation, workflow repair, or already-green runtime execution unless a real repository discrepancy is found.
