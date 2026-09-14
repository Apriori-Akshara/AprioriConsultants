# Question Generation Checkpoint — September 14, 2026

**Status:** Batch M production generation, final collective corpus verification, production-store cleanliness verification, and maintenance/spec safeguard verification COMPLETE; SAT/PSAT content-quality QC is COMPLETE with a **QUALITY HOLD**; generator/content-quality remediation is now the active next step.

## Batch M production rule

Mocks were generated one at a time. Each mock passed its applicable generation, independent QC, figure/math/originality, mock-level, cross-mock uniqueness, canonical storage, and Render deployment acceptance gates before the next mock was accepted.

## Frozen 30-mock corpus

The complete approved production corpus is exactly:

- SAT Series A: SAT1–SAT10
- PSAT: PSAT1–PSAT10
- SAT Series B: SAT11–SAT20

The authoritative inventory is `docs/BATCH-M-PRODUCTION-CORPUS-MANIFEST.md`.

All 30 production mocks contain 196 validated records and remain stored separately from the legacy public corpus.

SAT20 is accepted and the Series B runtime deployment is live. Public verification of SAT11–SAT20 is **deferred** because the user is proceeding to the next content-quality step and does not have time to inspect Mocks 11–20 at this checkpoint.

This is a verification deferral, not a claim that SAT11–SAT20 have been fully user-verified. Their public inspection remains required later.

## Final collective corpus verification

The final collective gate is wired into `src/data/sat/mockContent/batchMProductionStore.js` and runs against the exported frozen production corpus. It verifies exactly 30 mocks, the frozen production order/identity, 196 records per mock / 5,880 total records, canonical schema, per-mock and global question-ID uniqueness, applicable R&W/Math/figure uniqueness, figure originality, and JSON storage round-trip integrity.

The gate returns status `final-30-mock-corpus-qc-passed` and explicitly preserves the production/legacy corpus release boundary.

Implementation merge commit: `9e4d04aba5c5b72774d630627c4c04ce832641eb`.

## Production-store cleanliness verification

The canonical store has been checked and checkpointed after the final collective gate:

- `BATCH_M_ACCEPTED_PRODUCTION_CORPUS` contains exactly the 30 frozen production records.
- Its order is the frozen SAT1–SAT10 → PSAT1–PSAT10 → SAT11–SAT20 sequence.
- The store does not define or export a SAT21 production target.
- `BATCH_M_ACCEPTED_PRODUCTION_CHECKPOINT.nextTestKey` is `null`.
- `BATCH_M_FINAL_CORPUS_VERIFICATION` runs directly against the exported corpus.
- Production records remain separate from the legacy public corpus.

## Maintenance/spec safeguard verification

Step 4 is complete. The maintenance rules and SAT/PSAT specification were reviewed together with the production checkpoint and frozen corpus manifest.

The safeguards explicitly preserve:

- the canonical question schema and existing compatible fields;
- the rule that only QC-passed items are eligible for live delivery;
- structured figure parameters as the production visual source of truth;
- independent R&W, mathematical, figure/originality, storage, and collective corpus verification;
- the private calibration boundary and prohibition on copying official calibration material into production/public files;
- the frozen 30-mock production boundary;
- the separation between Batch M production records and the legacy public corpus;
- the prohibition on SAT21 or any other new Batch M production target;
- explicit recording and re-verification of any post-freeze correction; and
- separation of website/release approval from content-generation acceptance.

## Freeze rule

The 30 production mocks remain frozen.

After this checkpoint:

- do not generate SAT21 or any other new Batch M production mock;
- do not silently regenerate or replace an accepted mock;
- do not expose the new corpus through the legacy public corpus without explicit release approval;
- any required correction must be explicitly recorded as a corpus change and re-verified.

## Content-quality QC — completed with quality hold

The formal R&W and Math content-quality audit of **SAT Series A Mocks 1–10 and PSAT Mocks 1–10** is complete.

Detailed findings are recorded in:

`docs/BATCH-M-CONTENT-QUALITY-QC-2026-09-14.md`

### Decision

**QUALITY HOLD — SAT1–SAT10 and PSAT1–PSAT10 are not ready for final cross-corpus calibration or release-quality acceptance.**

The audit found systemic construction-quality problems rather than a small number of isolated weak items. The current generator produces technically valid records, but the R&W construction is too templated and the Math construction is too formulaic to establish authentic Digital SAT/PSAT level, reasoning demand, distractor quality, and difficulty calibration.

Key systemic findings:

- R&W source/passage construction is highly repetitive and synthetic.
- R&W reasoning and evidence relationships are often generic rather than item-specific.
- R&W distractor architecture is recorded, but the current deterministic QC does not substantively verify that each distractor represents the claimed student error.
- R&W difficulty is assigned from a repeating position-based cycle rather than from actual reasoning demand.
- Math contains too much direct substitution and familiar one-step calculation for a production corpus intended to model SAT reasoning.
- Math hard labels do not reliably correspond to genuinely hard reasoning.
- Math distractors frequently use generic numeric offsets rather than realistic mathematical-error profiles.
- Math student-produced-response generation is approximately 20%, below the specification target of roughly 25–30%.
- The current implementation does not establish a sufficiently independent PSAT ceiling; PSAT parameterization alone is not enough to certify calibration.

This is a **content-quality gate failure**, not a storage/corpus-boundary failure. The 30-mock production boundary remains intact.

## Required remediation before content replacement

The next implementation target is **generator/content-quality remediation**, not another production mock.

The remediation must strengthen:

1. R&W source and passage diversity;
2. item-specific evidence relationships and reasoning;
3. Words in Context contextual variation;
4. relationship-first Cross-Text construction;
5. authentic Rhetorical Synthesis notes/goals;
6. broader Standard English Conventions constructions;
7. difficulty calibration based on actual cognitive demand;
8. semantic distractor quality rather than metadata-only misconception labels;
9. Math reasoning and construction diversity;
10. strategic and multi-step hard Math items;
11. authentic mathematical distractors;
12. representation-driven Math items;
13. 25–30% Math student-produced-response items;
14. explicit SAT-versus-PSAT ceiling controls.

After remediation is proven on representative samples, only the genuinely affected production items may be replaced. Every post-freeze change must be recorded by mock/question ID and must rerun the affected production gates plus the final collective corpus gate.

## Cross-corpus step after remediation

The 30-mock cross-corpus calibration remains **blocked** until the SAT1–SAT10 and PSAT1–PSAT10 content-quality hold is cleared.

Once cleared, the cross-corpus review must cover:

- difficulty consistency and distribution;
- R&W and Math skill/domain balance;
- construction diversity;
- conceptual/construction repetition beyond existing originality gates;
- SAT versus PSAT calibration;
- overall coherence and realism of the complete 30-mock product.

SAT11–SAT20 remain frozen and their public-site verification will be completed later. No new production mocks are authorized.

## Final release sequence

1. ~~SAT1–SAT10 and PSAT1–PSAT10 content-quality QC~~ — **COMPLETE: QUALITY HOLD**
2. **Generator/content-quality remediation — ACTIVE NEXT STEP**
3. Targeted production replacement and re-gating, only where required
4. 30-mock cross-corpus calibration
5. Public verification of SAT11–SAT20 and any remaining user-facing verification
6. Final end-to-end student-experience acceptance
7. Final Batch M release acceptance

No SAT21 or additional production target is planned.

## Representative QC execution checkpoint — September 14, 2026

The representative QC command was successfully reached locally, but execution stopped at Node ESM module resolution before any R&W/Math quality evaluation was produced. Two candidate-only remediated generators were confirmed to contain relative imports without explicit `.js` extensions.

`verbalConstructionRemediated.js` has been corrected and committed in `023f5da099e6c0a3baf2964a101b976f5bc7aa55`.

`mathBankFactoryRemediated.js` still requires the same narrow extension correction. The production/frozen corpus remains unchanged. The representative content-quality verdict is therefore still **not yet assessed by the execution harness**; the active next action is local synchronization followed by another `npm run qc:batch-m-remediation` run.
