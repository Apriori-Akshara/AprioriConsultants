# Batch M Content-Quality QC — September 14, 2026

**Scope:** SAT Series A Mocks 1–10 and PSAT Mocks 1–10 only  
**Status:** **REPRESENTATIVE QC HARNESS IMPLEMENTED — EXECUTION/VALIDATION REQUIRED**  
**Corpus boundary:** Frozen; no SAT21 and no wholesale regeneration authorized

## 1. Purpose

This audit is the first formal content-quality review after Batch M production generation. It is intentionally different from the existing schema, originality, figure, mathematical, storage, and collective corpus gates.

The question is whether the generated items actually resemble the intended Digital SAT/PSAT in level, reasoning demand, construction quality, distractor behavior, source realism, and calibration.

## 2. Overall verdict

**SAT1–SAT10 and PSAT1–PSAT10 are NOT ready for final cross-corpus calibration or release-quality acceptance.**

The problem is systemic rather than a small number of isolated weak items. The original generator produces technically valid records, but its construction layer is too template-driven to establish authentic SAT/PSAT assessment quality.

## 3. Systemic findings

### R&W

The current legacy `src/data/sat/mockContent/verbalConstruction.js` uses a small fixed library of source topics, source details, rhetorical structures, question stems, and answer-choice templates. Passages are assembled from reusable sentence patterns rather than genuinely distinct source constructions.

The principal problems are:

- source/passage construction is too synthetic and repetitive;
- information density and rhetorical specificity are insufficient;
- several skills can be answered from the template relationship rather than close reading;
- evidence relationships are often generic rather than item-specific;
- Words in Context repeatedly uses the same target word/construction;
- Cross-Text Connections uses a generic second-passage construction rather than relationship-first design;
- Rhetorical Synthesis repeatedly uses the same note/qualification pattern;
- Standard English Conventions has insufficient construction breadth;
- distractor metadata exists, but current deterministic QC does not prove the distractor actually embodies the claimed student error;
- difficulty is assigned from a repeating position-based cycle rather than actual reasoning demand.

### Math

`src/data/sat/mockContent/mathBankFactoryV2.js` has improved numerical parameter diversity, but the construction-family library remains too formulaic.

The principal problems are:

- excessive direct substitution and familiar formula application;
- hard labels that do not consistently represent hard reasoning;
- distractors frequently generated as simple numerical offsets;
- limited construction diversity;
- figures are not consistently the mechanism through which the problem must be solved;
- approximately 20% student-produced-response generation, below the specification target of roughly 25–30%;
- PSAT parameterization does not by itself establish an independent PSAT ceiling.

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
Commit: `95cde6158caad859513e1f77fc9581ca447c0932`

### B. Replacement construction blueprint

`src/data/sat/mockContent/batchMRemediationBlueprint.js`  
Commit: `1e74726bdd31ea4321517677152f0ca3e74a477f`

### C. R&W remediated construction layer

`src/data/sat/mockContent/verbalConstructionRemediated.js`  
Original remediation commit: `39cef8e6c89f67d37d2903472b71eee69fdfe664`  

### D. Math remediated construction layer

`src/data/sat/mockContent/mathBankFactoryRemediated.js`  
Commit: `34b17bff0522ca9498e64868bae9b3f133c38b67`

### E. Representative candidate/QC bridge

`src/data/sat/mockContent/batchMRemediationCandidateFactory.js`  
Latest commit: `97f39960d7dc6208453bd800486d4d6609291fe3d`

The bridge applies remediation-specific Math distractor construction, supplies SEC context, and evaluates the combined candidate set through the strengthened content-quality gate. It explicitly returns `productionMutation: false` and `releaseEligible: false`.

## 6. Representative QC execution harness

A repository-local QC runner has now been added:

`scripts/runBatchMRemediationQC.js`  
Commit: `66fdc97a27f799d2335655bd5a272f37a3689242`

`package.json` now exposes:

`npm run qc:batch-m-remediation`  
Commit: `eef1d7654b7e546d61835cdaf14eeab8f7131b36`

The runner generates a representative set of **40 R&W + 40 Math candidate items for SAT1** and sends the complete set through the strengthened content-quality gate. It also reports the Math student-produced-response percentage.

This is a **candidate-only validation harness**. A passing run does not authorize production replacement. A failing run means the construction layer must be corrected before any production corpus changes.

## 7. Current implementation boundary

The construction remediation is implemented and the representative QC harness is ready, but the production corpus has **not** been repaired.

The frozen SAT1–SAT10 and PSAT1–PSAT10 records have not been changed. SAT11–SAT20 have not been changed. No public runtime corpus has been regenerated as part of this remediation work.

## 8. Next required action

Run the representative QC harness and inspect the resulting failures by construction family.

The required sequence is:

1. execute `npm run qc:batch-m-remediation`;
2. inspect every failed QC category, not merely the aggregate pass/fail result;
3. correct any failing construction family or QC rule;
4. rerun representative QC until the intended candidate set passes;
5. only after representative QC passes, identify genuinely affected frozen production items for targeted replacement;
6. record every changed mock/question ID as a post-freeze corpus change;
7. rerun each affected mock's individual production gates;
8. rerun the final collective 30-mock corpus gate;
9. perform the 30-mock cross-corpus calibration;
10. only then proceed to final release verification.

**Do not regenerate the entire 30-mock corpus and do not create SAT21.**

## 9. Release decision at this checkpoint

**Decision: HOLD.**

SAT1–SAT10 and PSAT1–PSAT10 remain blocked from final collective content-quality calibration until representative construction QC passes. SAT11–SAT20 remain frozen and their public verification remains deferred.

## 10. Representative-QC execution checkpoint — September 14, 2026

The first local execution attempt reached the representative QC runner, confirming that the harness is being invoked rather than failing at the npm-script layer. The runner then stopped during ESM module resolution.

Two candidate-only remediated generators were found to contain local relative imports without explicit `.js` extensions:

- `src/data/sat/mockContent/verbalConstructionRemediated.js`
- `src/data/sat/mockContent/mathBankFactoryRemediated.js`

The first corrective commit has now been applied to GitHub:

- `023f5da099e6c0a3baf2964a101b976f5bc7aa55` — **Fix ESM extensions in Batch M remediated R&W generator**

The candidate factory, content-quality gate, blueprint, and QC runner were inspected and their local relative imports already use explicit `.js` extensions or require no import change.

The Math generator still requires the same narrow import-resolution correction before the representative QC can execute. No generator logic, question content, frozen production record, or production store has been changed as part of this execution fix.

**Current checkpoint:** representative QC has **not** yet produced R&W/Math content-quality results. The quality verdict therefore remains **HOLD / NOT ASSESSED BY THIS RUN**. The user must synchronize the corrected candidate files locally and rerun `npm run qc:batch-m-remediation`; the complete output will determine the next remediation iteration.

The production/frozen corpus remains unchanged and continues to be protected from remediation-candidate execution.
