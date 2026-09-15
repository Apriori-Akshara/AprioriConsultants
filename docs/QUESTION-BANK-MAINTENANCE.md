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

### Active remediation state — September 15, 2026

The read-only production impact, classification, targeted review inventory, and targeted replacement-preparation stages have all completed successfully for SAT1–SAT10 and PSAT1–PSAT10.

- **2,144** unique affected production questions identified and inventoried.
- **1,496** prepared as content-replacement records.
- **98** prepared as content-replacement-plus-difficulty-calibration records.
- **550** prepared as difficulty-calibration-and-possible-replacement records.
- Remediation tracks: **1,356** Math distractor, **648** difficulty calibration, **216** R&W Words-in-Context, **22** R&W construction.
- `productionMutation: false` throughout.
- `releaseEligible: false` throughout.
- `replacementAuthorization: NOT_AUTHORIZED` remains active.

Detailed records:

- `docs/BATCH-M-IMPACT-AUDIT-CHECKPOINT-2026-09-15.md`
- `docs/BATCH-M-TARGETED-REVIEW-INVENTORY-2026-09-15.json`
- `docs/BATCH-M-TARGETED-REPLACEMENT-PREPARATION-2026-09-15.json`
- `docs/BATCH-M-TARGETED-REPLACEMENT-CHECKPOINT-2026-09-15.md`

### Active next checkpoint — replacement-candidate generation and controlled selection

The next task is **not wholesale regeneration and not public verification of SAT11–SAT20**. It is generation and validation of replacement candidates against the exact prepared production IDs and remediation tracks.

Candidate work must:

1. remain outside the production store;
2. preserve mock ownership, section, skill/domain, difficulty intent, figure/data requirements and SAT/PSAT ceiling;
3. pass the strengthened content-quality gate;
4. pass uniqueness/originality and cross-corpus collision controls;
5. account for mock-level Math SPR distribution;
6. map validated candidates deterministically to affected production IDs;
7. distinguish content replacement, difficulty calibration, and combined remediation;
8. produce a reviewable candidate-selection report;
9. keep `productionMutation: false`, `releaseEligible: false`, and replacement authorization explicitly not granted until later gates.

The existing `scripts/runBatchMTargetedReplacementDryRun.js` is a candidate-pool quality harness. It is not the production replacement mechanism because it does not itself map validated candidates to the 2,144 affected frozen IDs.

### After candidate selection and authorization

1. Explicitly authorize the selected replacements.
2. Apply only the approved post-freeze corpus changes by mock/question ID.
3. Rerun affected individual production gates.
4. Rerun the final collective 30-mock corpus gate.
5. Perform 30-mock cross-corpus calibration.
6. Perform public verification of SAT11–SAT20, which remains deferred and outstanding.
7. Perform final end-to-end student-experience acceptance.
8. Finalize Batch M release acceptance.

## Targeted remediation and re-gating

Do not regenerate the corpus wholesale for isolated defects. Because the current content-quality findings are systemic, remediation must first improve the generator/construction gates; production replacement then remains item-specific.

If a genuine production-corpus change is required:

1. explicitly record the corpus change;
2. rerun the affected individual production gates;
3. rerun the final collective corpus gate;
4. preserve the exact 30-mock boundary.

No SAT21 or additional production target may be created.

## Working-copy rule for GitHub Desktop and legacy backup

There are two local project folders used during this project and they must not be treated as interchangeable:

- **Active authoritative working copy:** `AprioriConsultants-Git` — the GitHub Desktop-connected local repository used for current Batch M remediation work since September 14, 2026. Current branch work, edits, commits, pushes, pulls, and QC commands must be performed here unless explicitly stated otherwise.
- **Older backup/reference copy:** `AprioriConsultants` — the pre-GitHub-Desktop local folder retained as a backup and historical reference. It may contain legitimate earlier changes that were never synchronized to the online repository.

The backup copy is not authoritative for current work. Do not run the current Batch M QC from it and do not copy/merge files from it blindly. When a material discrepancy is found, compare the specific file against the active Git-connected copy and the online branch, then recover only verified work.

Before running any Git/npm command for the current Batch M task, first confirm the command prompt is in the active `AprioriConsultants-Git` folder and confirm the intended branch with `git branch --show-current`.

## Known synchronization discrepancy — targeted dry-run runner

`scripts/runBatchMTargetedReplacementDryRun.js` exists in a stronger local form than the version currently recorded online. The shared/local form adds explicit candidate-only assertions (`productionMutation === false`, `releaseEligible === false`), minimum pool-size checks, clearer per-gate reporting, and a final dry-run status block. The discrepancy is recorded so it is not mistaken for an accidental file loss.

The online GitHub version remains the baseline until the verified local form is deliberately synchronized and committed. The two versions must not be silently allowed to diverge.

## Post-freeze maintenance rules

- No new Batch M target may be created.
- No accepted mock may be silently regenerated, replaced, reordered, or mutated.
- Any post-freeze correction must be explicitly recorded and fully re-verified.
- Passing the existing production gates does not by itself certify authentic SAT/PSAT-level quality.
- Private calibration anchors remain private and must never be copied into production content or the public repository.
- The legacy public corpus remains separate until explicit release approval.
- The 2,144-record targeted replacement preparation is a planning record only; it does not authorize replacement.

## Current status

**Batch M production generation, collective corpus verification, production-store cleanliness, and maintenance/spec safeguard verification are complete. The 30-mock corpus is frozen. The SAT1–SAT10 and PSAT1–PSAT10 content-quality audit is complete with a QUALITY HOLD. Impact identification, classification, targeted review inventory, and targeted replacement preparation are complete. The active next step is replacement-candidate generation and controlled selection. SAT11–SAT20 are deployed but user-facing verification is deferred.**
