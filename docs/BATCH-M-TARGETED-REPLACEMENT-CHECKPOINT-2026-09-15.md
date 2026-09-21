# Batch M Targeted Replacement Checkpoint — September 15, 2026

**Status:** TARGETED REPLACEMENT PREPARATION COMPLETE; CANDIDATE-POOL DRY RUN PASSED; EXACT CANDIDATE GENERATION / CONTROLLED SELECTION NEXT  
**Documentation branch:** `main`  
**Generator-remediation branch:** `batch-m-rw-generator-remediation-2026-09-14`  
**Scope:** Read-only preparation and candidate-only remediation for frozen SAT1–SAT10 and PSAT1–PSAT10 production records  
**Production boundary:** Frozen; no production mutation, replacement, release, or SAT21 creation authorized

## 1. Completed remediation sequence

The Batch M post-audit sequence has now completed these stages:

1. Representative remediation QC — PASS.
2. First-20 production impact identification — COMPLETE.
3. Impact classification — COMPLETE.
4. Targeted review inventory — COMPLETE.
5. Targeted replacement preparation — COMPLETE.
6. R&W candidate-generator uniqueness remediation — COMPLETE.
7. Math strategic/non-figure candidate parameter-diversity remediation — COMPLETE.
8. Math figure candidate parameter-diversity remediation — COMPLETE.
9. Full SAT targeted replacement candidate-pool dry run — PASS.
10. Full PSAT targeted replacement candidate-pool dry run — PASS.

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

## 5. Candidate-pool dry-run result

Command:

`npm run qc:batch-m-targeted-replacement`

The full SAT and PSAT candidate-pool checks passed.

### SAT

- R&W pool: **1,080**
- Cross-Text: **108 / 108**
- Rhetorical Synthesis: **108 / 108**
- Words in Context: **108 / 108**
- Reasoning-driven: **756 / 42**
- Math pool: **1,100**
- Strategic: **550 / 168**
- Figure: **550 / 103**
- SPR: **25.00%**
- R&W quality: **PASS**
- Math quality: **PASS**

### PSAT

- R&W pool: **1,080**
- Cross-Text: **108 / 108**
- Rhetorical Synthesis: **108 / 108**
- Words in Context: **108 / 108**
- Reasoning-driven: **756 / 42**
- Math pool: **1,100**
- Strategic: **550 / 173**
- Figure: **550 / 88**
- SPR: **25.00%**
- R&W quality: **PASS**
- Math quality: **PASS**

Final result:

- `productionMutation: false`
- `releaseEligible: false`
- `Batch M targeted replacement dry run PASSED.`

This validates the candidate generator/pool gates only. It does not authorize production replacement.

## 6. Interpretation boundary

The preparation report and successful candidate-pool dry run are remediation artifacts, not replacement authorization.

The frozen production questions remain unchanged. No question may be replaced merely because it appears in the 2,144-record inventory or because a candidate pool has passed its quality gates.

## 7. Next logical step — exact replacement-candidate generation and controlled selection

The next implementation stage is to generate **candidate replacements specifically for the prepared 2,144 affected production records** and perform controlled selection before any production mutation.

The implementation must produce a deterministic candidate-selection report that maps each affected `testKey + questionId` to zero or more validated candidate options and records why each option is eligible or rejected. It must distinguish content replacement candidates from difficulty-calibration-only cases.

The stage remains candidate-only and must preserve:

- exact affected mock/question identity and remediation metadata;
- section, domain/skill, difficulty intent, figure/data requirements, and SAT-versus-PSAT applicability;
- strengthened content-quality validation;
- within-mock and cross-corpus uniqueness/originality constraints;
- Math SPR implications;
- `productionMutation: false`;
- `releaseEligible: false`;
- replacement authorization not granted.

The existing `scripts/runBatchMTargetedReplacementDryRun.js` remains a **candidate-pool quality harness**. It does not itself perform the 2,144-question candidate-to-production-ID mapping required by this next stage.

## 8. Branch and commit boundary

Documentation/status records belong on `main`.

The generator/remediation implementation remains on `batch-m-rw-generator-remediation-2026-09-14` until the complete candidate-generation/selection stage and subsequent approval gates are validated.

GitHub comparison currently shows that the remediation branch is **9 commits ahead of `main` and 0 behind**. The 9 commits are:

- `e27815585afe3250900719f8bc06eb1e17e5868a` — Rhetorical Synthesis candidate diversity
- `90ed505a16731e25e759a610da14db1eea418dea` — branch synchronization merge from `main` (historical; do not separately promote)
- `154d5a53e4a3e2c6bdafbe4caa3bd1c171ea1810` — Words-in-Context uniqueness remediation
- `b79b5d5bfa09a0d4926c83017ac2c1580414c1c7` — Reasoning uniqueness construction remediation
- `9946c03ba063177f593e46dffe306b8d8cf4ed7b` — stronger reasoning prompt variation
- `ef0cdf0e8fa0c200bca8767dc40e061913bd1d05` — reasoning candidate prompt sequencing
- `75ad767f8bb27fd05981037c6410406313afbae2` — strategic Math parameter diversity
- `d1c76cf99920f07c66194cb429960bd917843a2e` — expanded strategic Math candidate construction
- `95f5ea3be4bd30a9293f144353df863ff3aff88f` — figure Math parameter diversity

These implementation commits are **not to be promoted to `main` now** merely because the pool dry run passed. The validated remediation set should be promoted later, after the exact candidate-generation/controlled-selection stage and the required downstream approval/validation gates are complete. The synchronization merge commit should never be cherry-picked independently.

The documentation update that records this state is committed on `main`; it does not promote the remediation implementation.

## 9. Mandatory gates after candidate selection

Before any frozen production record is changed:

1. candidate-generation/selection report must be complete;
2. replacement authorization must be explicitly established;
3. selected candidates must pass applicable individual quality gates;
4. exact post-freeze changes must be recorded by `testKey + questionId`;
5. affected mock production gates must be rerun;
6. the final collective 30-mock corpus gate must be rerun;
7. 30-mock cross-corpus calibration must be completed;
8. SAT11–SAT20 public verification must be completed;
9. final end-to-end student acceptance must be completed;
10. Batch M release acceptance must be finalized.

No SAT21 or additional production target may be created.

## 10. Resume point for the next session

Future sessions should read this checkpoint together with:

- `docs/QUESTION-GENERATION-ROADMAP.md`
- `docs/QUESTION-BANK-MAINTENANCE.md`
- `docs/BATCH-M-CONTENT-QUALITY-QC-2026-09-14.md`
- `docs/BATCH-M-IMPACT-AUDIT-CHECKPOINT-2026-09-15.md`
- `docs/BATCH-M-TARGETED-REVIEW-INVENTORY-2026-09-15.json`
- `docs/BATCH-M-TARGETED-REPLACEMENT-PREPARATION-2026-09-15.json`

Do not repeat the completed impact audit, classification, inventory, preparation, or candidate-pool generator remediation unless a real repository discrepancy requires verification.

Resume directly with **exact replacement-candidate generation and controlled selection**. Do not create SAT21.


## 11. Superseded by later Batch M progress

This September 15 checkpoint is a historical record of the preparation/candidate-pool state at that date. Its “Next logical step” is no longer the current work queue.

The exact replacement-candidate and controlled-selection work later progressed through independent review, remediation/re-review, exact target locking, explicit authorization, and the authorized 195-target production replacement on September 17, 2026.

Current status is maintained in `docs/BATCH-M-CURRENT-STATUS-2026-09-21.md` and `docs/QUESTION-GENERATION-ROADMAP.md`. The current blocker is the post-replacement final-corpus schema failure `Invalid difficultyBand: sat-series-a-medium`.
