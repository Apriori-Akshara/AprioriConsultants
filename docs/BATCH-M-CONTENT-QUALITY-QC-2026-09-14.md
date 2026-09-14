# Batch M Content-Quality QC — September 14, 2026

**Scope:** SAT Series A Mocks 1–10 and PSAT Mocks 1–10 only  
**Status:** AUDIT COMPLETE — **NOT READY FOR FINAL QUALITY ACCEPTANCE**  
**Corpus boundary:** Frozen; no SAT21 and no wholesale regeneration authorized

## 1. Purpose

This audit is the first formal content-quality review after Batch M production generation. It is intentionally different from the existing schema, originality, figure, mathematical, storage, and collective corpus gates.

The question is whether the generated items actually resemble the intended Digital SAT/PSAT in level, reasoning demand, construction quality, distractor behavior, source realism, and calibration.

The audit used the current production-generation implementation, the approved SAT/PSAT specification, the AI generation instructions, and current public College Board assessment/domain descriptions as permitted calibration references. Official material was not copied into production content.

## 2. Overall verdict

**SAT1–SAT10 and PSAT1–PSAT10 are NOT ready for final cross-corpus calibration or release-quality acceptance.**

The problem is systemic rather than a small number of isolated weak items. The current generator produces technically valid records, but its construction layer is too template-driven to establish authentic SAT/PSAT assessment quality.

Classification:

- **Acceptable as-is:** technical/schema aspects only; content-quality acceptance cannot be granted.
- **Needs targeted correction:** isolated technical/content defects can be corrected after the generator-level remediation.
- **Structurally valid but not sufficiently SAT/PSAT-authentic:** **large portion of SAT1–SAT10 and PSAT1–PSAT10.**
- **Serious production-gate remediation required:** **yes — generator/construction and content-quality QC must be strengthened before any affected production replacement is accepted.**

This finding does **not** reject the frozen corpus as storage data and does **not** authorize silent regeneration. It establishes that the current production content does not yet meet the intended content-quality release gate.

## 3. Evidence from the current implementation

### R&W

The current `src/data/sat/mockContent/verbalConstruction.js` uses a small fixed library of source topics, source details, rhetorical structures, question stems, and answer-choice templates. The generated passages are assembled from reusable three-part sentence patterns rather than from genuinely distinct source constructions.

Examples of systemic patterns found in the implementation:

- Central Ideas and Details uses essentially the same main-idea construction across topics.
- Inferences repeatedly reduces the task to whether a qualified relationship may change under different conditions.
- Command of Evidence uses generic study observations rather than constructing a concrete claim/evidence relationship.
- Words in Context repeatedly asks about **“qualify”** with a fixed answer set rather than selecting a context-sensitive word from varied source material.
- Text Structure and Purpose repeatedly asks why conditions surrounding a result are included.
- Cross-Text Connections constructs the second passage from the same generic passage engine and asks for a broad qualified agreement rather than designing a meaningful relationship first.
- Rhetorical Synthesis uses a fixed four-note structure with the same observation/qualification/goal pattern.
- Transitions and Standard English Conventions use recurring sentence shells with limited grammatical variation.

`verbalVariationLayer.js` adds deterministic context sentences and family-specific variation, but this changes the surface stimulus without supplying the source complexity, rhetorical specificity, evidence structure, or reasoning diversity required for authentic SAT-style items.

### R&W difficulty

Difficulty is assigned from a repeating fixed array rather than derived from actual item complexity. The current implementation can therefore label a one-step, obvious item `hard` while labeling a more demanding item `medium` or `easy`.

This directly conflicts with the approved difficulty definition, under which hard items require substantially greater reasoning, multi-step processing, subtle distinctions, or synthesis.

### R&W distractors and independent QC

Batch D records plausible misconception labels, but the current QC does not independently establish that each distractor actually embodies the claimed misconception. It mainly checks that three distinct misconception profiles are attached and that the choices are structurally distinct.

Likewise, the evidence map is generated from fixed positional rules rather than independently demonstrating that the cited evidence actually supports the answer.

Therefore the current technical R&W QC can pass an item whose student-facing distractors and evidence relationship are weak. This is a key reason the content-quality audit is required in addition to the existing gates.

### Math

`src/data/sat/mockContent/mathBankFactoryV2.js` has improved numerical parameter diversity, but the underlying construction family remains highly formulaic.

The principal patterns are:

- direct substitution into linear equations/functions;
- solving a linear equation for a single unknown;
- identifying a slope or intercept directly from supplied coordinates;
- adding two quadratic roots;
- direct exponential-equation equivalence;
- identifying the vertex/minimum of a completed-square expression;
- direct discriminant-zero parameter calculation;
- direct percentage calculation;
- direct prediction from a linear data model;
- direct IQR calculation;
- weighted-mean calculation;
- direct triangle/circle/right-triangle area calculation;
- direct similarity-area scaling.

Some items include multi-step flags or figures, but the underlying mathematical task often remains a straightforward formula application. Adding a scenario sentence does not by itself create SAT-level reasoning demand.

The current Math generator also uses a limited construction-family library and does not yet demonstrate the breadth of authentic SAT mathematical representations and reasoning moves expected across the full corpus.

### Math question-type mix

The current generator makes a student-produced-response item when `(i + assessmentNumber) % 5 === 0`, which is approximately **20%** of Math items.

The approved specification calls for roughly **25–30%** student-produced-response items. This is a separate production-spec issue that must be corrected as part of remediation rather than ignored during content calibration.

### Math difficulty

As with R&W, difficulty is supplied by fixed position arrays. The hard label therefore does not guarantee hard reasoning. Several constructions tagged hard can still be solved by a single familiar formula or direct relationship.

### SAT versus PSAT calibration

The current implementation does not provide a sufficiently strong independent SAT/PSAT calibration boundary. The PSAT variant changes seeds, routing/domain arrays, and parameterization, but the same fundamental construction templates remain in use.

The approved specification requires the PSAT hardest tail to be trimmed relative to SAT. A parameter change or different seed is not sufficient evidence of an appropriate PSAT ceiling.

Accordingly, PSAT1–PSAT10 cannot currently be certified as appropriately calibrated merely from their `psat-nmsqt` identity and technical gates.

## 4. Specification-level findings

### R&W findings

1. **Source realism:** FAIL — passages are too synthetic and repetitive in construction.
2. **Information density:** FAIL — many stimuli contain generic claims and qualifications rather than information-rich source material.
3. **Reasoning demand:** FAIL — several question types can be answered from the template relationship rather than close reading.
4. **Evidence alignment:** FAIL at content-quality level — internal metadata exists, but evidence relationships are often asserted rather than substantively constructed.
5. **Distractor quality:** FAIL at content-quality level — distractors are frequently generic polarity/overclaim variants rather than carefully engineered student-error options tied to the item.
6. **Words in Context:** FAIL — repeated use of the same target word and fixed answer set is not sufficient for a production corpus.
7. **Cross-Text Connections:** FAIL — passage relationship is too generic and does not demonstrate the required relationship-first construction.
8. **Rhetorical Synthesis:** FAIL — note sets and communication goals are too repetitive.
9. **Standard English Conventions:** FAIL — grammatical constructions are too narrow to demonstrate authentic breadth of editing tasks.
10. **Difficulty calibration:** FAIL — difficulty labels are not reliably tied to actual cognitive demand.
11. **Domain balance:** REQUIRES REMEDIATION — the fixed skill cycle produces a much more uniform per-skill distribution than the approved domain weighting, so final mock-level balance must be rebuilt from the operational 54-question selection rather than the 108 stored R&W branches.

### Math findings

1. **Reasoning demand:** FAIL — too much direct substitution and single-operation calculation.
2. **Hard-item authenticity:** FAIL — `hard` is not consistently supported by multi-step or strategically demanding reasoning.
3. **Distractor quality:** FAIL — numerical distractors are commonly generated as `answer + 1`, `answer - 1`, or `answer × 2`, which does not reliably model authentic student errors.
4. **Construction diversity:** FAIL — limited construction families repeat across the corpus.
5. **Representation diversity:** NEEDS REMEDIATION — figures exist, but representation is not consistently functioning as the evidence/problem-solving mechanism.
6. **SPRs:** FAIL spec target — approximately 20% rather than the specified 25–30% range.
7. **Domain/skill calibration:** REQUIRES REMEDIATION — current fixed arrays must be compared against the operational 44-question module distribution and the official domain ranges before release.
8. **SAT/PSAT calibration:** FAIL — no sufficiently independent PSAT ceiling mechanism is demonstrated.

## 5. What passed

The audit does **not** invalidate the completed technical work.

The following remain accepted technical foundations:

- canonical production identity and frozen 30-mock boundary;
- 196-record storage structure per production mock;
- production/legacy corpus separation;
- deterministic structured figure architecture;
- existing schema validation;
- question-ID uniqueness and corpus-level uniqueness gates;
- storage round-trip validation;
- existing mathematical correctness gates where their supported constructions are applicable;
- existing figure/originality gates within their defined scope.

The finding is specifically that these technical protections are insufficient to certify authentic assessment quality.

## 6. Affected production scope

The systemic construction defects affect the **SAT Series A Mocks 1–10 and PSAT Mocks 1–10 production content generated from the current Batch C/Math construction layers**.

The audit therefore does not identify a safe subset of whole mocks that can simply be marked content-quality accepted. Individual item review will still be useful for triage, but the generator-level defects must be corrected before targeted replacement can be trusted.

SAT11–SAT20 are not being modified by this audit. Their public verification remains deferred as already documented.

## 7. Required remediation gate

Before any affected production content is replaced, the following must be implemented and tested:

### R&W remediation

- richer source-generation architecture with genuinely distinct source situations and rhetorical structures;
- item-specific evidence relationships rather than generic qualification templates;
- real variation across Words in Context target vocabulary and sentence contexts;
- relationship-first Cross-Text construction;
- more authentic Rhetorical Synthesis note sets and communication goals;
- broader Standard English Conventions constructions;
- difficulty derived from reasoning architecture, not a position-based difficulty cycle;
- distractors generated from actual item-specific misconceptions and then independently reviewed for semantic plausibility;
- content-quality QC capable of rejecting generic filler even when schema metadata is valid.

### Math remediation

- broader reasoning templates across all four domains;
- genuinely multi-step and strategic hard items;
- context-driven items where context affects the mathematical reasoning rather than merely decorating it;
- distractors tied to concrete mathematical errors instead of generic numeric offsets;
- stronger representation-based tasks using figures/tables/graphs as evidence;
- approximately 25–30% student-produced-response items;
- explicit SAT versus PSAT ceiling controls;
- difficulty determined from actual mathematical reasoning demand.

## 8. Re-gating requirement

Because the defects are systemic, the correct sequence is:

1. remediate the generator/construction and content-quality QC layers;
2. run representative samples through the strengthened content-quality gate;
3. once the remediation is proven, replace only the affected production items in SAT1–SAT10 and PSAT1–PSAT10;
4. record every changed mock/question ID as a post-freeze corpus change;
5. rerun each affected mock's individual production gates;
6. rerun the final collective 30-mock corpus gate;
7. perform the 30-mock cross-corpus calibration;
8. only then proceed to final release verification.

**Do not regenerate the entire 30-mock corpus and do not create SAT21.**

## 9. Release decision at this checkpoint

**Decision: HOLD.**

SAT1–SAT10 and PSAT1–PSAT10 are **not ready for final collective content-quality calibration**. The next implementation target is generator/content-quality remediation, followed by controlled replacement and re-gating.

SAT11–SAT20 remain frozen and public verification remains deferred.
