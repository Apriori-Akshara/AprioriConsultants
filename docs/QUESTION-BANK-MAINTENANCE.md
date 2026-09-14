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

Each mock was generated, independently QC-checked, cross-compared with previously accepted mocks, stored, and deployed to Render before the next mock was accepted. No additional production target remains.

## Batch M — Controlled production generation

**Status: COMPLETE / FROZEN.**

All 30 production mocks remain accepted and stored. SAT11–SAT20 are deployed in the live Series B runtime, but their public-site inspection has been intentionally deferred because the next active project step is SAT/PSAT content-quality QC and the user is not currently available to inspect Mocks 11–20.

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

### Active checkpoint — SAT/PSAT content-quality QC

The immediate next task is a formal content-quality review of **SAT Series A Mocks 1–10 and PSAT Mocks 1–10**.

This review must determine whether the generated questions genuinely match the intended Digital SAT/PSAT level and complexity, rather than merely passing technical/schema/originality/math/figure gates.

**R&W review:** source/passage complexity, information density, syntax and rhetorical structure, question construction, reasoning demand, skill/domain fit, evidence alignment, answer defensibility, distractor quality, wording, answer-choice construction, Digital SAT-style realism, and difficulty/quality distribution.

**Math review:** mathematical reasoning demand, difficulty, skill/domain balance, multi-step reasoning, representation quality, graphs/tables/figures, distractor quality, numerical/parameter diversity, construction diversity, Digital SAT-style realism, and difficulty/quality distribution.

The review must separately assess SAT calibration and the PSAT content ceiling and must not use copied or closely paraphrased official questions.

### After A/PSAT content-quality QC

1. Targeted remediation and re-gating, only where genuine defects are found.
2. 30-mock cross-corpus calibration for difficulty, skill/domain balance, construction diversity, repetition, SAT-vs-PSAT calibration, and overall realism/coherence.
3. Public verification of SAT11–SAT20, which is currently deferred and remains outstanding.
4. Final end-to-end student-experience acceptance.
5. Final Batch M release acceptance.

## Targeted remediation and re-gating

Do not regenerate the corpus wholesale for isolated defects. If a genuine defect requires a production-corpus change:

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

**Batch M production generation, collective corpus verification, production-store cleanliness, and maintenance/spec safeguard verification are complete. The 30-mock corpus is frozen. SAT11–SAT20 are deployed but user-facing verification is deferred. The active next step is SAT1–SAT10 and PSAT1–PSAT10 content-quality QC, followed by cross-corpus calibration and the deferred Series B verification.**
