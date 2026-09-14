# Batch M Content-Quality QC — September 14, 2026

**Scope:** SAT Series A Mocks 1–10 and PSAT Mocks 1–10 only  
**Status:** **REPRESENTATIVE REMEDIATION QC PASSED — TARGETED PRODUCTION IMPACT IDENTIFICATION NEXT**  
**Corpus boundary:** Frozen; no SAT21 and no wholesale regeneration authorized

## 1. Purpose

This audit is the first formal content-quality review after Batch M production generation. It is intentionally different from the existing schema, originality, figure, mathematical, storage, and collective corpus gates.

The question is whether the generated items actually resemble the intended Digital SAT/PSAT in level, reasoning demand, construction quality, distractor behavior, source realism, and calibration.

## 2. Overall verdict

The original frozen SAT1–SAT10 and PSAT1–PSAT10 production content remains under a **QUALITY HOLD** for final release acceptance. However, the remediation construction layer has now cleared its representative candidate-quality gate.

The successful remediation gate does **not** by itself certify the frozen production corpus or authorize wholesale replacement. It establishes that the corrected candidate construction/QC path can produce a representative set meeting the strengthened content-quality gate.

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
- contexts that affect the mathematics rather than merely decorate it;
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

## 6. Representative QC execution harness

`scripts/runBatchMRemediationQC.js` executes the representative candidate gate.

GitHub commit:

`be0aa6b6f4a63f26f6c5da6b940a00ffad71e7af` — **Fix Batch M representative QC runner pass property**

`package.json` exposes:

`npm run qc:batch-m-remediation`

The runner generates **40 R&W + 40 Math candidate items for SAT1** and sends the complete set through the strengthened content-quality gate. It also reports Math student-produced-response percentage.

## 7. Representative remediation QC — FINAL RESULT

The representative candidate run was executed locally after the remediation and now passes:

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

The QC runner now reports:

`Batch M representative remediation QC PASSED.`

The `MODULE_TYPELESS_PACKAGE_JSON` message observed during local execution is a Node warning and is not a content-quality failure. No package change is required for this checkpoint.

## 8. Production boundary after representative pass

The representative pass does **not** mutate or authorize mutation of accepted production records.

The frozen corpus remains exactly:

- SAT1–SAT10
- PSAT1–PSAT10
- SAT11–SAT20

No SAT21 exists or is authorized. No wholesale regeneration is authorized.

## 9. Next required action — production impact identification

The next step is a **read-only audit of the frozen production corpus** to identify genuinely affected questions before any replacement is attempted.

The audit must identify exact mock/question IDs where the documented content-quality defects are evidenced, including where applicable:

1. R&W construction/template weaknesses;
2. R&W semantic distractor weakness;
3. insufficient reasoning demand;
4. difficulty-label conflicts;
5. Math generic numeric distractors;
6. formulaic/direct-substitution construction patterns;
7. insufficient Math reasoning features;
8. Math SPR distribution issues;
9. SAT-versus-PSAT ceiling concerns.

The impact audit must be read-only. It must not mutate the production store.

After the affected IDs are identified, only those records may enter the targeted replacement process. Each post-freeze replacement must be recorded by mock/question ID and must rerun the affected mock gates plus the final collective 30-mock corpus gate.

## 10. Release decision at this checkpoint

**Decision: QUALITY HOLD remains for the frozen production corpus.**

**Representative remediation decision: PASS.**

The construction/QC remediation is proven on the representative candidate set, but the frozen production corpus has not yet undergone targeted impact identification or replacement/re-gating.

The 30-mock cross-corpus calibration remains blocked until targeted production remediation is complete and re-verified.

**Do not regenerate the entire 30-mock corpus and do not create SAT21.**
