# Batch M Targeted Replacement Checkpoint — September 15, 2026

**Status:** TARGETED REPLACEMENT PREPARATION COMPLETE — CANDIDATE GENERATION / CONTROLLED SELECTION NEXT  
**Branch:** `batch-m-rw-generator-remediation-2026-09-14`  
**Scope:** Read-only preparation for targeted remediation of frozen SAT1–SAT10 and PSAT1–PSAT10 production records  
**Production boundary:** Frozen; no production mutation, replacement, release, or SAT21 creation authorized

## 1. Completed remediation sequence

The Batch M post-audit sequence has now completed these read-only stages:

1. Representative remediation QC — PASS.
2. First-20 production impact identification — COMPLETE.
3. Impact classification — COMPLETE.
4. Targeted review inventory — COMPLETE.
5. Targeted replacement preparation — COMPLETE.

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

## 5. Interpretation boundary

The preparation report is a remediation plan, not a replacement authorization.

It identifies what kind of remediation each affected record requires, but it does not automatically select or approve a replacement question. Existing production questions remain frozen exactly as stored.

No question may be replaced merely because it appears in the 2,144-record inventory.

## 6. Next logical step — replacement-candidate generation and controlled selection

The next implementation stage is to generate **candidate replacements specifically for the prepared remediation tracks** and evaluate them before any production mutation.

That stage must:

1. generate candidates against the exact affected mock/question remediation metadata;
2. preserve the existing mock identity, section, skill/domain, difficulty intent, figure/data requirements, and SAT-versus-PSAT ceiling as applicable;
3. apply the strengthened content-quality gate before a candidate can enter the selection pool;
4. enforce within-mock and cross-corpus uniqueness/originality constraints;
5. verify Math SPR implications at mock level;
6. distinguish candidates requiring content replacement from those requiring difficulty calibration only;
7. keep candidates outside the production store;
8. produce a deterministic candidate-selection report mapping each affected production ID to zero or more validated candidate options and the reasons each option is eligible or rejected;
9. keep `productionMutation: false`, `releaseEligible: false`, and replacement authorization explicitly not granted until later approval gates.

The existing `scripts/runBatchMTargetedReplacementDryRun.js` is a **candidate-pool quality harness**. It does not by itself map validated candidates to the 2,144 frozen production records and therefore is not a production replacement mechanism.

## 7. Mandatory gates after candidate preparation

Before any frozen production record is changed:

1. candidate-generation/selection report must be complete;
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

## 8. Resume point for the next session

Future sessions should read this checkpoint together with:

- `docs/QUESTION-GENERATION-ROADMAP.md`
- `docs/QUESTION-BANK-MAINTENANCE.md`
- `docs/BATCH-M-CONTENT-QUALITY-QC-2026-09-14.md`
- `docs/BATCH-M-IMPACT-AUDIT-CHECKPOINT-2026-09-15.md`
- `docs/BATCH-M-TARGETED-REVIEW-INVENTORY-2026-09-15.json`
- `docs/BATCH-M-TARGETED-REPLACEMENT-PREPARATION-2026-09-15.json`

Do not repeat the completed impact audit, classification, inventory, or preparation stages unless a real repository discrepancy requires verification.
