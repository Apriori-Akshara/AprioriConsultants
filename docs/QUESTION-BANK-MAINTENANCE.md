# Question Bank Maintenance Checkpoint

Approved September 14, 2026.

## Taxonomy rule

This project uses **Batch A–M** as its single implementation taxonomy. “Phase” is a legacy synonym and should not be used for new work.

The 30-mock production corpus is built as one controlled Batch M sequence. Production records use stable mock/item identities and canonical runtime storage; the legacy public corpus remains separate until final release approval.

## Approved implementation sequence

A schema → B blueprint → C R&W construction → D R&W distractor/evidence/QC → E figure framework → F basic visuals → G 2D geometry → H 3D/future multi-source → I Math integration/QC → J figure/originality → K calibration → L end-to-end test → M controlled production.

### Batch M production order

1. **SAT Series A — Mocks 1–10** — accepted
2. **PSAT — Mocks 1–10** — accepted
3. **SAT Series B — Mocks 11–20** — accepted and deployed; public verification deferred
4. **Final collective QC across the complete production corpus** — passed
5. **Production-store cleanliness checkpoint** — passed
6. **Maintenance/spec safeguard verification** — passed
7. **SAT/PSAT content-quality QC** — **complete with quality hold**

Each mock was generated, independently QC-checked, cross-compared with previously accepted mocks, stored, and deployed to Render before the next mock was accepted. No additional production target remains.

## Batch M — Controlled production generation

**Status: COMPLETE / FROZEN.**

All 30 production mocks remain accepted and stored. SAT11–SAT20 are deployed in the live Series B runtime, but their public-site inspection has been intentionally deferred because the next active project step is content-quality remediation and the user is not currently available to inspect Mocks 11–20.

Deferred verification must not be interpreted as rejection or acceptance of the user-facing presentation of SAT11–SAT20. The inspection remains an explicit later release checkpoint.

## Production-store cleanliness checkpoint

The canonical production store is checkpointed as clean:

- `BATCH_M_ACCEPTED_PRODUCTION_CORPUS` contains exactly the frozen 30 production mocks.
- The corpus order matches the authoritative `BATCH_M_PRODUCTION_SEQUENCE`.
- The store exports no SAT21 production target.
- `nextTestKey` is `null`; there is no remaining Batch M generation target.
- Production records remain separate from the legacy public corpus.

This is a release checkpoint, not permission to mutate the corpus. Any correction after this point must be an explicitly recorded corpus change followed by the affected individual gates and the final collective gate again.

## Batch M release and content-quality acceptance sequence

The production corpus is frozen, but **Batch M is not considered fully complete until all remaining release and quality checkpoints are complete.**

### SAT/PSAT content-quality QC — complete with quality hold

The formal content-quality review of **SAT Series A Mocks 1–10 and PSAT Mocks 1–10** has been completed.

Detailed findings are recorded in `docs/BATCH-M-CONTENT-QUALITY-QC-2026-09-14.md`.

**Decision: QUALITY HOLD.** The affected SAT/PSAT content is technically valid but is not sufficiently authentic in source complexity, reasoning demand, distractor quality, construction diversity, and difficulty calibration to proceed to final cross-corpus quality acceptance.

The most important systemic findings are:

- R&W passages and question constructions are overly template-driven.
- R&W evidence and distractor relationships are often metadata-driven rather than substantively item-specific.
- R&W difficulty is position-based rather than reliably derived from reasoning demand.
- Math relies too heavily on direct substitution and familiar formula application.
- Math hard items are not consistently hard in the required reasoning sense.
- Math distractors are frequently generic numeric offsets rather than authentic student-error constructions.
- Math student-produced-response generation is approximately 20%, below the specified 25–30% target.
- The PSAT variant does not yet demonstrate a sufficiently independent ceiling relative to SAT.

The existing technical gates therefore cannot be treated as a substitute for content-quality certification.

### Active next checkpoint — generator/content-quality remediation

The next task is **not another mock and not public verification of SAT11–SAT20**. It is remediation of the construction and content-quality layers so that representative items can meet the approved standard before any frozen production records are changed.

Required remediation areas:

1. R&W source/passage diversity and information density;
2. item-specific evidence construction;
3. contextual Words in Context variation;
4. relationship-first Cross-Text construction;
5. authentic Rhetorical Synthesis notes and communication goals;
6. broader Standard English Conventions constructions;
7. difficulty based on actual cognitive demand;
8. semantic distractor validation;
9. broader Math reasoning and construction diversity;
10. genuine multi-step/strategic hard Math items;
11. realistic mathematical distractors;
12. representation-driven Math items;
13. 25–30% Math student-produced-response items;
14. explicit SAT-versus-PSAT ceiling controls.

### After remediation

1. Validate representative corrected items through the strengthened content-quality gate.
2. Replace only genuinely affected production items in SAT1–SAT10 and PSAT1–PSAT10.
3. Record every post-freeze corpus change by mock/question ID.
4. Rerun affected individual production gates.
5. Rerun the final collective 30-mock corpus gate.
6. Perform 30-mock cross-corpus calibration.
7. Perform public verification of SAT11–SAT20, which remains deferred and outstanding.
8. Perform final end-to-end student-experience acceptance.
9. Finalize Batch M release acceptance.

## Targeted remediation and re-gating

Do not regenerate the corpus wholesale for isolated defects. Because the current content-quality findings are systemic, remediation must first improve the generator/construction gates; production replacement then remains item-specific.

If a genuine production-corpus change is required:

1. explicitly record the corpus change;
2. rerun the affected individual production gates;
3. rerun the final collective corpus gate;
4. preserve the exact 30-mock boundary.

No SAT21 or additional production target may be created.

## Post-freeze maintenance rules

- No new Batch M target may be created.
- No accepted mock may be silently regenerated, replaced, reordered, or mutated.
- Any post-freeze correction must be explicitly recorded and fully re-verified.
- Passing the existing production gates does not by itself certify authentic SAT/PSAT-level quality.
- Private calibration anchors remain private and must never be copied into production content or the public repository.
- The legacy public corpus remains separate until explicit release approval.

## Current status

**Batch M production generation, collective corpus verification, production-store cleanliness, and maintenance/spec safeguard verification are complete. The 30-mock corpus is frozen. The SAT1–SAT10 and PSAT1–PSAT10 content-quality audit is complete with a QUALITY HOLD. Generator/content-quality remediation is the active next step. SAT11–SAT20 are deployed but user-facing verification is deferred.**
