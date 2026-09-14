# Question Generation Checkpoint — September 14, 2026

**Status:** Batch M production generation, final collective corpus verification, production-store cleanliness verification, and maintenance/spec safeguard verification COMPLETE; content-quality QC is now the active next step.

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

## Active next step — SAT/PSAT content-quality QC

The project is now moving to the formal **R&W and Math content-quality calibration** checkpoint before final cross-corpus calibration.

The first scope of this review is deliberately **SAT Series A Mocks 1–10 and PSAT Mocks 1–10**. The purpose is to establish that these already-generated production mocks meet the intended Digital SAT/PSAT level, complexity, reasoning demand, and construction quality before the final collective quality decision.

### R&W content-quality QC

Assess, as applicable:

- source/passage complexity and information density;
- syntax, rhetorical structure, evidence structure, and realistic source characteristics;
- question construction and reasoning demand;
- domain/skill fit;
- evidence alignment;
- exactly one defensible answer;
- distractor quality and plausible student-error profiles;
- wording and answer-choice construction;
- Digital SAT-style realism;
- difficulty distribution and quality consistency;
- PSAT content ceiling and appropriate calibration relative to SAT.

### Math content-quality QC

Assess, as applicable:

- mathematical reasoning demand and difficulty;
- skill/domain balance;
- multi-step reasoning and cognitive demand;
- representation quality, including graphs/tables/figures;
- distractor quality and plausible student-error profiles;
- numerical and parameter diversity;
- construction diversity and authentic SAT-style framing;
- Digital SAT-style realism;
- difficulty distribution and quality consistency;
- appropriate PSAT ceiling relative to SAT.

The assessment must use the approved SAT/PSAT specification and permitted calibration references without copying or closely paraphrasing official material.

The goal is **not** to certify that every generated question is acceptable merely because the technical gates passed. It is to determine whether the content actually reaches the intended assessment level and to identify targeted remediation where it does not.

### Cross-corpus step after A/PSAT QC

After SAT1–SAT10 and PSAT1–PSAT10 content-quality QC is complete, perform the 30-mock cross-corpus calibration covering:

- difficulty consistency and distribution;
- R&W and Math skill/domain balance;
- construction diversity;
- conceptual/construction repetition beyond existing originality gates;
- SAT versus PSAT calibration;
- overall coherence and realism of the complete 30-mock product.

SAT11–SAT20 will remain frozen and their public-site verification will be completed later. No new production mocks are authorized.

## Targeted remediation rule

Do not regenerate the corpus wholesale for isolated defects. If a genuine defect requires a production-corpus change, explicitly record the change, rerun the affected individual production gates, and rerun the final collective corpus gate before acceptance.

## Final release sequence

1. SAT1–SAT10 and PSAT1–PSAT10 content-quality QC — **NEXT**
2. Targeted remediation/re-gating if necessary
3. 30-mock cross-corpus calibration
4. Public verification of SAT11–SAT20 and any remaining user-facing verification
5. Final end-to-end student-experience acceptance
6. Final Batch M release acceptance

No SAT21 or additional production target is planned.
