# Question Bank Maintenance Checkpoint

Approved September 14, 2026; current Batch M status updated September 16, 2026.

## Taxonomy rule

This project uses **Batch A–M** as its single implementation taxonomy. “Phase” is a legacy synonym and should not be used for new work.

The 30-mock production corpus is built as one controlled Batch M sequence. Production records use stable mock/item identities and canonical runtime storage; the legacy public corpus remains separate until final release approval.

## Approved implementation sequence

A schema → B blueprint → C R&W construction → D R&W distractor/evidence/QC → E figure framework → F basic visuals → G 2D geometry → H 3D/future multi-source → I Math integration/QC → J figure/originality → K calibration → L end-to-end test → M controlled production.

### Batch M production order

1. **SAT Series A — Mocks 1–10** — accepted
2. **PSAT — Mocks 1–10** — accepted
3. **SAT Series B — Mocks 11–20** — accepted and deployed; public verification deferred
4. **Final collective QC across the complete production corpus** — passed at the pre-remediation freeze
5. **Production-store cleanliness checkpoint** — passed
6. **Maintenance/spec safeguard verification** — passed
7. **SAT/PSAT content-quality QC** — completed, remediated for the affected 20-test scope, and re-gated successfully

Each mock was generated, independently QC-checked, cross-compared with previously accepted mocks, stored, and deployed to Render before the next mock was accepted. No additional production target remains.

## Batch M — Controlled production generation

**Status: COMPLETE / FROZEN, with targeted post-freeze remediation completed for SAT1–SAT10 and PSAT1–PSAT10.**

All 30 production mocks remain part of the frozen Batch M sequence. SAT11–SAT20 are deployed in the live Series B runtime, but their public-site inspection remains intentionally deferred until the later release checkpoint.

Deferred verification must not be interpreted as rejection or acceptance of the user-facing presentation of SAT11–SAT20. The inspection remains an explicit later release checkpoint.

## Production-store cleanliness checkpoint

The canonical production store is checkpointed as clean:

- `BATCH_M_ACCEPTED_PRODUCTION_CORPUS` contains exactly the frozen 30 production mocks.
- The corpus order matches the authoritative `BATCH_M_PRODUCTION_SEQUENCE`.
- The store exports no SAT21 production target.
- `nextTestKey` is `null`; there is no remaining Batch M generation target.
- Production records remain separate from the legacy public corpus.

This is a release checkpoint, not permission for unrecorded mutation. Any further correction after the completed targeted remediation must be an explicitly recorded corpus change followed by the affected individual gates and the final collective gate again.

## Human-editable and canonical question-bank model

The project will use two connected representations of each accepted question:

- **Human-editable mock question-bank document:** the preferred content-authoring surface, with one document per frozen mock under question-banks/.
- **Canonical question record:** the validated structured representation used by the existing runtime, production assembly, and QC.

These are two representations of the same content, not two independent question banks.

For routine maintenance, the intended workflow is:

**Identify exact testKey + questionId → edit the mock document → parse into canonical structure → run applicable QC → review/decision → explicit authorization when required → update canonical production record → rerun affected gates.**

Direct JavaScript edits remain an implementation mechanism, not the preferred human editing interface.

The complete contract is maintained in docs/HUMAN-EDITABLE-CANONICAL-QUESTION-BANK-SPEC.md.

**Status:** documented and approved; implementation is planned and not yet complete.

This capability is a **Batch M maintenance checkpoint**. It is not Batch N, does not add a new mock, and does not change the frozen 30-mock boundary.

## Batch M release and content-quality acceptance sequence

The production corpus is frozen, and the first targeted remediation/re-gating milestone is complete, but **Batch M is not considered fully released until all remaining release and quality checkpoints are complete.**

### SAT/PSAT content-quality QC — remediation complete for the affected 20-test scope

The formal content-quality review of **SAT Series A Mocks 1–10 and PSAT Mocks 1–10** initially produced a QUALITY HOLD. The resulting affected-record remediation has now been completed and re-gated.

The controlled replacement applied **1,594** authorized replacements within the previously identified **2,144** affected unique production records. No out-of-scope mock was changed.

The successful comprehensive 20-test QC workflow (GitHub Actions run **35181971047**, run #7, September 16, 2026) reported:

- **3,920** runtime questions across 20 mocks;
- **1,594** verified replacement targets;
- **0** schema failures;
- **0** content-quality failures;
- figure originality gate **PASS**;
- **550** difficulty calibrations;
- **206** R&W stimulus repairs;
- **169** figure repairs;
- **5** numeric-distractor repairs;
- **846** total targeted remediation changes;
- every affected mock at **196 / 196** passing questions;
- `productionMutation: false` for the comprehensive QC stage;
- `releaseEligible: false`;
- `sat21Created: false`.

The detailed current checkpoint is `docs/BATCH-M-COMPREHENSIVE-20-TEST-QC-CHECKPOINT-2026-09-16.md`.

### Current remediation state — September 16, 2026

The following stages are complete and must not be repeated without a genuine repository discrepancy:

- production impact identification;
- impact classification;
- targeted review inventory;
- targeted replacement preparation;
- candidate-pool quality validation;
- exact candidate selection;
- controlled replacement of the authorized targets;
- affected 20-test runtime validation;
- comprehensive 20-test post-replacement QC.

The frozen 30-mock corpus is still **not finally release-accepted** because the final 30-mock corpus gate and the remaining release checkpoints are separate.

## Final Batch M release sequence

1. **Candidate-only deep content-quality remediation/review — CURRENT IMPLEMENTATION STEP:** resolve the substantive hold from the deep SAT/PSAT content-quality/diversity gate through the existing candidate-generation, diversity-aware selection, and independent-review path. No production mutation occurs at this stage.
2. **Final collective 30-mock corpus gate:** rerun the complete current 30-mock production corpus after any authorized remediation, including SAT1–SAT10, PSAT1–PSAT10, and SAT11–SAT20.
3. **30-mock cross-corpus calibration:** assess difficulty consistency, skill/domain balance, construction diversity, conceptual/construction repetition, SAT/PSAT calibration, and overall corpus coherence.
4. **Public website inspection — user responsibility:** after the content-quality hold is cleared, inspect only `https://www.aprioriconsultants.org`; verify all 30 mocks open, R&W/Math content displays, figures/charts/tables display, there are no obvious missing/broken/overlapping/clipped elements, and representative responsive/mobile views work. The user does not perform technical QC or solve every question.
5. **Technical release QC — project responsibility:** diagnose every reported issue against generation/storage/rendering and correct only genuine defects within scope.
6. **Final end-to-end student acceptance:** verify launch → instructions → adaptive test-taking → completion → scoring/results → detailed report using the existing architecture.
7. **Final Batch M acceptance:** only after all preceding checkpoints pass.

SAT11–SAT20 remain deployed but their public-site verification is deliberately deferred until the later release checkpoint. No SAT21 or additional production mock is planned.

### Current deep-QC remediation status

The prior independent-review run (**35579481595**) was technically successful but substantively held with **298 FAIL / 1 expert-review item / 0 PASS**. Two candidate-only corrections now precede the next review:

- `da71fcbd473741236de08fd9dce0e27b3511b9e4` — diversity-aware candidate selection before independent review;
- `7885a01eab70982ad866438c310e85eeb5e6001e` — Math hard-difficulty alignment so hard candidates require a genuine multi-step construction.

These changes do not authorize or perform production replacement. The next verification point is the resulting independent-review run.

## Targeted remediation and re-gating

Do not regenerate the corpus wholesale for isolated defects. The September 16 controlled replacement was limited to the explicitly affected production records. Any further post-freeze correction must remain item-specific and fully re-gated.

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

### Human-editable document rule after implementation

Once the document system is implemented, routine item-level content edits should be made against the relevant mock document first. The canonical runtime representation must be regenerated/updated through the controlled parser and validation path.

Never assume that changing a document alone changes the live website.

If direct canonical/JavaScript content is changed for an emergency or implementation reason, the corresponding mock document must be synchronized and drift-checked before the change is considered complete.

## Post-freeze maintenance rules

- No new Batch M target may be created.
- No accepted mock may be silently regenerated, replaced, reordered, or mutated.
- The September 16 targeted remediation is an explicitly recorded exception within the authorized affected-record boundary; future corrections require the same level of explicit recording and re-gating.
- Passing the existing production gates does not by itself certify final public release.
- Private calibration anchors remain private and must never be copied into production content or the public repository.
- The legacy public corpus remains separate until explicit release approval.
- The original 2,144-record targeted replacement preparation was a planning record; the subsequent controlled replacement was separately authorized and completed for 1,594 selected targets.

## Current status

**Batch M production generation, production-store cleanliness, maintenance/spec safeguard verification, targeted remediation, controlled replacement, and comprehensive 20-test post-replacement QC are complete. The 30-mock corpus remains frozen. The current implementation step is candidate-only resolution of the substantive deep content-quality/diversity hold. SAT11–SAT20 remain deployed. Final collective corpus gating, cross-corpus calibration, public verification, end-to-end student acceptance, and Batch M release acceptance remain outstanding.**
