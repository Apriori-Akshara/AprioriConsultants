# Batch M Content-Quality QC — September 14, 2026

**Scope:** SAT Series A Mocks 1–10 and PSAT Mocks 1–10 only  
**Status:** **REMEDIATION CONSTRUCTION LAYER IMPLEMENTED — REPRESENTATIVE QC NEXT**  
**Corpus boundary:** Frozen; no SAT21 and no wholesale regeneration authorized

## 1. Purpose

This audit is the first formal content-quality review after Batch M production generation. It is intentionally different from the existing schema, originality, figure, mathematical, storage, and collective corpus gates.

The question is whether the generated items actually resemble the intended Digital SAT/PSAT in level, reasoning demand, construction quality, distractor behavior, source realism, and calibration.

## 2. Overall verdict

**SAT1–SAT10 and PSAT1–PSAT10 are NOT ready for final cross-corpus calibration or release-quality acceptance.**

The problem is systemic rather than a small number of isolated weak items. The current generator produces technically valid records, but its construction layer is too template-driven to establish authentic SAT/PSAT assessment quality.

## 3. Systemic findings

### R&W

The current `src/data/sat/mockContent/verbalConstruction.js` uses a small fixed library of source topics, source details, rhetorical structures, question stems, and answer-choice templates. Passages are assembled from reusable sentence patterns rather than genuinely distinct source constructions.

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
- contextual Words in Context target variation;
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

## 5. Remediation implementation — first sub-step complete

Two non-mutating remediation assets were added first.

### A. Candidate content-quality gate

`src/data/sat/mockContent/batchMContentQualityGate.js`

Commit: `95cde6158caad859513e1f77fc9581ca447c0932`

### B. Replacement construction blueprint

`src/data/sat/mockContent/batchMRemediationBlueprint.js`

Commit: `1e74726bdd31ea4321517677152f0ca3e74a477f`

Both files remain outside `batchMProductionStore.js` and cannot silently mutate the frozen corpus.

## 6. Remediation implementation — construction layer complete

The next implementation sub-step has now been completed with three candidate-only assets.

### A. R&W remediated construction layer

`src/data/sat/mockContent/verbalConstructionRemediated.js`

Commit: `39cef8e6c89f67d37d2903472b71eee69fdfe664`

This introduces distinct source situations, varied R&W construction families, contextual Words-in-Context targets, relationship-first Cross-Text construction, explicit Rhetorical Synthesis goals, broader SEC construction sets, and reasoning-based difficulty features.

### B. Math remediated construction layer

`src/data/sat/mockContent/mathBankFactoryRemediated.js`

Commit: `34b17bff0522ca9498e64868bae9b3f133c38b67`

This introduces multi-stage/context-dependent Algebra, parameter/representation reasoning in Advanced Math, data interpretation and transformation tasks, composite/similarity/circle/right-triangle reasoning, explicit hard-item reasoning features, PSAT ceiling metadata, and a 25% SPR starting construction target.

### C. Representative candidate/QC bridge

`src/data/sat/mockContent/batchMRemediationCandidateFactory.js`

Latest commit: `97f39960d7dc6208453bd800486d4d6609291fe3d`

This candidate-only bridge applies remediation-specific distractor construction to Math candidates, supplies adequate SEC context, and sends the combined R&W/Math candidate set through `batchMContentQualityGate.js`.

It explicitly returns `productionMutation: false` and `releaseEligible: false`.

## 7. Current implementation boundary

The construction remediation is implemented, but the production corpus has **not** been repaired yet.

The frozen SAT1–SAT10 and PSAT1–PSAT10 records have not been changed. SAT11–SAT20 have not been changed. No public runtime corpus has been regenerated as part of this remediation work.

The next step is **representative candidate QC**: generate a representative R&W/Math candidate set from the new construction layers, confirm the strengthened content-quality gate passes the intended candidates, and reject/iterate any construction families that still fail.

## 8. Re-gating requirement after representative QC

After remediation is proven on representative candidates:

1. replace only genuinely affected production items in SAT1–SAT10 and PSAT1–PSAT10;
2. record every changed mock/question ID as a post-freeze corpus change;
3. rerun each affected mock's individual production gates;
4. rerun the final collective 30-mock corpus gate;
5. perform the 30-mock cross-corpus calibration;
6. only then proceed to final release verification.

**Do not regenerate the entire 30-mock corpus and do not create SAT21.**

## 9. Release decision at this checkpoint

**Decision: HOLD.**

SAT1–SAT10 and PSAT1–PSAT10 remain blocked from final collective content-quality calibration until representative construction QC passes. SAT11–SAT20 remain frozen and their public verification remains deferred.
