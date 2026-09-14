# Batch M Content-Quality QC — September 14, 2026

**Scope:** SAT Series A Mocks 1–10 and PSAT Mocks 1–10 only  
**Status:** AUDIT COMPLETE — **QUALITY HOLD**; remediation gate and replacement blueprint implemented  
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

Two non-mutating remediation assets have now been added.

### A. Candidate content-quality gate

`src/data/sat/mockContent/batchMContentQualityGate.js`

Commit: `95cde6158caad859513e1f77fc9581ca447c0932`

This gate evaluates replacement candidates for generic/template density, difficulty-label conflicts, R&W stimulus/blueprint structure, fixed Words-in-Context targeting, Cross-Text/Rhetorical Synthesis structure, answer-choice quality, Math hard-item reasoning, generic numerical distractors, figure purpose, and section/domain/skill validity.

It returns an explicit pass/fail, severity, checks, score, and `productionMutation: false`.

### B. Replacement construction blueprint

`src/data/sat/mockContent/batchMRemediationBlueprint.js`

Commit: `1e74726bdd31ea4321517677152f0ca3e74a477f`

This defines the construction families to use for targeted replacements, including richer R&W source/construction families, Math reasoning constructions, explicit difficulty requirements, PSAT ceiling rules, and the 25–30% Math student-produced-response target.

Both files are intentionally **not imported into `batchMProductionStore.js`**. They therefore cannot silently regenerate, reorder, mutate, or replace the frozen 30-mock corpus.

## 6. Important boundary

The remediation layer is now in place, but this does **not** mean the production corpus has been repaired.

The frozen SAT1–SAT10 and PSAT1–PSAT10 records have not been changed. SAT11–SAT20 have not been changed. No public runtime corpus has been regenerated as part of this step.

The next implementation sub-step is to upgrade the actual R&W and Math construction layers for controlled replacement candidates and then run representative candidates through the new content-quality gate before any post-freeze production change is considered.

## 7. Re-gating requirement

After remediation is proven on representative candidates:

1. replace only genuinely affected production items in SAT1–SAT10 and PSAT1–PSAT10;
2. record every changed mock/question ID as a post-freeze corpus change;
3. rerun each affected mock's individual production gates;
4. rerun the final collective 30-mock corpus gate;
5. perform the 30-mock cross-corpus calibration;
6. only then proceed to final release verification.

**Do not regenerate the entire 30-mock corpus and do not create SAT21.**

## 8. Release decision at this checkpoint

**Decision: HOLD.**

SAT1–SAT10 and PSAT1–PSAT10 remain blocked from final collective content-quality calibration until the construction remediation is proven. SAT11–SAT20 remain frozen and their public verification remains deferred.
