# Batch M Content-Quality QC — September 14, 2026

**Scope:** SAT Series A Mocks 1–10 and PSAT Mocks 1–10 only  
**Status:** **TARGETED REPLACEMENT PREPARATION COMPLETE — CANDIDATE GENERATION / CONTROLLED SELECTION NEXT**  
**Corpus boundary:** Frozen; no SAT21 and no wholesale regeneration authorized

## 1. Purpose

This audit is the first formal content-quality review after Batch M production generation. It is intentionally different from the existing schema, originality, figure, mathematical, storage, and collective corpus gates.

The question is whether the generated items actually resemble the intended Digital SAT/PSAT in level, reasoning demand, construction quality, distractor behavior, source realism, and calibration.

## 2. Overall verdict

The original frozen SAT1–SAT10 and PSAT1–PSAT10 production content remains under a **QUALITY HOLD** for final release acceptance. The remediation construction layer has cleared its representative candidate-quality gate, and the subsequent read-only impact/classification/inventory/preparation sequence is now complete.

The successful remediation gate does **not** certify the frozen production corpus or authorize replacement. It establishes that the corrected candidate construction/QC path can produce a representative set meeting the strengthened content-quality gate, while the production impact sequence identifies the exact frozen records requiring remediation planning.

## 3. Systemic findings

### R&W

The legacy `src/data/sat/mockContent/verbalConstruction.js` uses a small fixed library of source topics, source details, rhetorical structures, question stems, and answer-choice templates. Passages are assembled from reusable sentence patterns rather than genuinely distinct source constructions.

The principal problems identified in the production audit were:

- source/passage construction too synthetic and repetitive;
- insufficient information density and rhetorical specificity;
- some skills answerable from template relationships rather than close reading;
- generic rather than item-specific evidence relationships;
- repeated Words in Context target/construction patterns;
- generic Cross-Text construction rather than relationship-first design;
- repeated Rhetorical Synthesis note/qualification pattern;
- insufficient Standard English Conventions construction breadth;
- distractor metadata without sufficient semantic proof of the claimed student error;
- position-based difficulty rather than reasoning-demand-based difficulty.

### Math

`src/data/sat/mockContent/mathBankFactoryV2.js` showed improved numerical parameter diversity, but the construction-family library remained too formulaic.

The principal problems identified were:

- excessive direct substitution and familiar formula application;
- hard labels that did not consistently represent hard reasoning;
- generic numerical-offset distractors;
- limited construction diversity;
- figures not consistently essential to the solution;
- approximately 20% student-produced-response generation, below the 25–30% target;
- PSAT parameterization not by itself establishing an independent PSAT ceiling.

## 4. Required remediation

### R&W

- richer source-generation architecture with distinct source situations and rhetorical structures;
- item-specific evidence relationships;
- contextual Words-in-Context target variation;
- relationship-first Cross-Text construction;
- authentic Rhetorical Synthesis note sets and communication goals;
- broader Standard English Conventions constructions;
- difficulty derived from reasoning architecture rather than item position;
- distractors tied to concrete student-error mechanisms and independently reviewed;
- content-quality QC that rejects generic filler even when schema metadata is valid.

### Math

- broader reasoning templates across all four domains;
- genuinely multi-step and strategic hard items;
- contexts that affect the mathematics rather than merely decorate them;
- distractors tied to concrete mathematical errors;
- stronger representation-based tasks;
- approximately 25–30% student-produced-response items;
- explicit SAT-versus-PSAT ceiling controls;
- difficulty determined from actual mathematical reasoning demand.

## 5. Remediation implementation — construction layers complete

The following candidate-only assets were implemented. None is imported by the frozen production store.

### A. Candidate content-quality gate

`src/data/sat/mockContent/batchMContentQualityGate.js`  
Initial remediation commit: `95cde6158caad859513e1f77fc9581ca447c0932`  
Skill-aware stimulus-threshold correction: `bc3140aecabcdb5566752ec06f70fb63d74d0c8e`

### B. Replacement construction blueprint

`src/data/sat/mockContent/batchMRemediationBlueprint.js`  
Commit: `1e74726bdd31ea4321517677152f0ca3e74a477f`

### C. R&W remediated construction layer

`src/data/sat/mockContent/verbalConstructionRemediated.js`  
Original remediation commit: `39cef8e6c89f67d37d2903472b71eee69fdfe664`  
ESM extension correction: `023f5da099e6c0a3baf2964a101b976f5bc7aa55`

### D. Math remediated construction layer

`src/data/sat/mockContent/mathBankFactoryRemediated.js`  
Commit: `34b17bff0522ca9498e64868bae9b3f133c38b67`

### E. Representative candidate/QC bridge

`src/data/sat/mockContent/batchMRemediationCandidateFactory.js`

The bridge applies remediation-specific Math distractor construction, R&W distractor repair, difficulty alignment, and candidate-only quality evaluation. The final right-triangle distractor correction was synchronized to GitHub in commit:

`42493c99faf60f9ad5a1885691fbc62ffae5f02c` — **Sync Batch M right-triangle candidate remediation fix**

The bridge continues to return `productionMutation: false` and `releaseEligible: false`.

## 6. Representative remediation QC — FINAL RESULT

The representative candidate run was executed locally after the remediation and passes:

- **80 evaluated**
- **80 passed**
- **0 failed**
- **average score: 100**
- **serious failures: 0**
- **R&W: 40**
- **Math: 40**
- **Math student-produced-response: 25%**
- **productionMutation: false**
- **releaseEligible: false**

The runner reports:

`Batch M representative remediation QC PASSED.`

The `MODULE_TYPELESS_PACKAGE_JSON` message observed during local execution is a Node warning and is not a content-quality failure. No package change is required for this checkpoint.

## 7. Read-only production impact and classification sequence — COMPLETE

The corrected read-only impact audit covered:

- SAT1–SAT10
- PSAT1–PSAT10
- 20 mocks
- 3,920 questions

It identified **2,144 unique affected question records** and **2,164 total findings**. No production mutation occurred and release eligibility remained false.

The impact findings were:

| Finding | Count |
|---|---:|
| `math-generic-numeric-distractor` | 1,356 |
| `hard-label-without-demand-feature` | 648 |
| `rw-fixed-wic-target` | 216 |
| `rw-template-density` | 22 |
| `math-spr-distribution-outside-25-30-percent` | 20 mock-level findings |

The classification and inventory stages then assigned the affected records to deterministic review groups and exact IDs.

Supporting records:

- `docs/BATCH-M-IMPACT-AUDIT-CHECKPOINT-2026-09-15.md`
- `docs/BATCH-M-TARGETED-REVIEW-INVENTORY-2026-09-15.json`

## 8. Targeted replacement preparation — COMPLETE

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

Track counts overlap because a question may require more than one remediation track.

The generated preparation report is:

`docs/BATCH-M-TARGETED-REPLACEMENT-PREPARATION-2026-09-15.json`

This report is a planning record only. It does not approve or perform replacement.

## 9. Active next step — replacement-candidate generation and controlled selection

The next step is to generate candidate replacements against the exact prepared production IDs and remediation tracks.

Candidate generation/selection must:

1. remain candidate-only and outside the production store;
2. preserve mock identity, section, skill/domain, difficulty intent, figure/data requirements and SAT-versus-PSAT ceiling as applicable;
3. pass the strengthened content-quality gate;
4. pass uniqueness/originality and cross-corpus collision controls;
5. account for mock-level Math SPR distribution;
6. map validated candidates deterministically to affected production IDs;
7. distinguish content replacement, difficulty calibration, and combined remediation;
8. produce a reviewable candidate-selection report;
9. keep `productionMutation: false`, `releaseEligible: false`, and replacement authorization explicitly not granted until later approval gates.

The existing `scripts/runBatchMTargetedReplacementDryRun.js` remains a candidate-pool quality harness. It does not itself map validated candidates to the 2,144 frozen production records and is not a production replacement mechanism.

## 10. Production boundary and later gates

The frozen corpus remains:

- SAT1–SAT10
- PSAT1–PSAT10
- SAT11–SAT20

No SAT21 exists or is authorized. No wholesale regeneration is authorized.

After candidate selection and explicit later authorization:

1. apply only approved item-level replacements;
2. record every post-freeze change by mock/question ID;
3. rerun affected individual production gates;
4. rerun the final collective 30-mock corpus gate;
5. perform 30-mock cross-corpus calibration;
6. complete deferred public verification of SAT11–SAT20;
7. perform final end-to-end student acceptance;
8. finalize Batch M release acceptance.

## 11. Release decision at this checkpoint

**Decision: QUALITY HOLD remains for the frozen production corpus.**

**Representative remediation decision: PASS.**

**Targeted impact identification: COMPLETE.**  
**Targeted review inventory: COMPLETE.**  
**Targeted replacement preparation: COMPLETE.**  
**Replacement authorization: NOT AUTHORIZED.**

The next active project task is replacement-candidate generation and controlled selection. Do not regenerate the entire 30-mock corpus and do not create SAT21.
