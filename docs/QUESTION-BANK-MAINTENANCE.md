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
3. **SAT Series B — Mocks 11–20** — accepted
4. **Final collective QC across the complete production corpus** — passed
5. **Production-store cleanliness checkpoint** — passed
6. **Maintenance/spec safeguard verification** — passed

Each mock was generated, independently QC-checked, cross-compared with previously accepted mocks, stored, and deployed to Render before the next mock was accepted. No additional production target remains.

## Batch M — Controlled production generation

**Status: COMPLETE / FROZEN.**

### Accepted production checkpoints

- SAT Series A Mock 1 — accepted and stored.
- SAT Series A Mock 2 — accepted and stored.
- SAT Series A Mock 3 — accepted and stored.
- SAT Series A Mock 4 — accepted and stored.
- SAT Series A Mock 5 — accepted and stored.
- SAT Series A Mock 6 — accepted and stored.
- SAT Series A Mock 7 — accepted and stored.
- SAT Series A Mock 8 — accepted and stored.
- SAT Series A Mock 9 — accepted and stored.
- SAT Series A Mock 10 — accepted and stored.
- PSAT Mock 1 — accepted and stored.
- PSAT Mock 2 — accepted and stored.
- PSAT Mock 3 — accepted and stored.
- PSAT Mock 4 — accepted and stored.
- PSAT Mock 5 — accepted and stored.
- PSAT Mock 6 — accepted and stored.
- PSAT Mock 7 — accepted and stored.
- PSAT Mock 8 — accepted and stored.
- PSAT Mock 9 — accepted and stored.
- PSAT Mock 10 — accepted and stored.
- SAT Series B Mock 11 — accepted and stored.
- SAT Series B Mock 12 — accepted and stored.
- SAT Series B Mock 13 — accepted and stored.
- SAT Series B Mock 14 — accepted and stored.
- SAT Series B Mock 15 — accepted and stored.
- SAT Series B Mock 16 — accepted and stored.
- SAT Series B Mock 17 — accepted and stored.
- SAT Series B Mock 18 — accepted and stored.
- SAT Series B Mock 19 — accepted and stored.
- SAT Series B Mock 20 — accepted and stored; Render LIVE confirmed.

Each accepted production mock contains 196 validated records. The final collective gate verifies exactly 30 mocks and 5,880 total records, canonical schema integrity, global question-ID uniqueness, applicable R&W/Math/figure uniqueness, figure originality, identity/order, and storage round-trip integrity.

## Production-store cleanliness checkpoint

The canonical production store is now explicitly checkpointed as clean:

- `BATCH_M_ACCEPTED_PRODUCTION_CORPUS` contains exactly the frozen 30 production mocks.
- The corpus order matches the authoritative `BATCH_M_PRODUCTION_SEQUENCE`.
- The store exports no SAT21 production target.
- `nextTestKey` is `null`; there is no remaining Batch M generation target.

This is a release checkpoint, not permission to mutate the corpus. Any correction after this point must be an explicitly recorded corpus change followed by the affected individual gates and the final collective gate again.

## Batch M release and content-quality acceptance sequence

The production corpus is frozen, but **Batch M is not considered fully complete until all of the following checkpoints are complete:**

### 1. Public website release verification — user responsibility

The user inspects only `https://www.aprioriconsultants.org` and does not perform technical/code/database/corpus QC.

The inspection must cover:

- all 30 production mocks open;
- R&W content displays;
- Math content displays;
- figures/charts/tables display;
- no obvious missing content, broken visuals, overlap, clipping, or major layout defects;
- representative mobile/responsive checks.

The user does not need to solve every question.

### 2. Technical release QC — project responsibility

After the user reports the public-site findings, technical QC diagnoses each reported issue by inspecting the relevant generation, storage, rendering, and frozen production-corpus implementation.

Only genuine defects are corrected. Scope remains question generation, storage, and rendering. Authentication, registration/email verification, payments, entitlements, dashboard, Redux, and unrelated functionality are not to be changed.

### 3. SAT/PSAT content-quality QC — R&W and Math

This is a distinct post-production checkpoint. Structural/schema/originality/math/figure gates establish technical validity but do not by themselves certify SAT/PSAT-level quality.

**R&W review:** source/passage complexity, information density, question construction, reasoning demand, skill/domain fit, evidence alignment, distractor quality, wording, answer-choice construction, Digital SAT-style realism, and difficulty/quality distribution.

**Math review:** mathematical reasoning demand, difficulty, skill/domain balance, multi-step reasoning, representation quality, graphs/tables/figures, distractor quality, numerical/parameter diversity, Digital SAT-style realism, and difficulty/quality distribution.

The review uses the approved SAT/PSAT specification and permitted calibration references without copying or closely paraphrasing official material.

### 4. 30-mock cross-corpus calibration

Evaluate the entire frozen corpus collectively for:

- difficulty consistency and distribution;
- R&W and Math skill/domain balance;
- construction diversity;
- conceptual/construction repetition beyond existing originality gates;
- appropriate SAT versus PSAT calibration;
- overall coherence and realism of the 30-mock product.

This is separate from structural/originality QC.

### 5. Targeted remediation and re-gating

Do not regenerate the corpus wholesale for isolated defects. If a genuine defect requires a production-corpus change:

1. explicitly record the corpus change;
2. rerun the affected individual production gates;
3. rerun the final collective corpus gate;
4. preserve the exact 30-mock boundary.

No SAT21 or additional production target may be created.

### 6. Final end-to-end student-experience acceptance

Verify the complete student-facing journey using the existing architecture:

**launch → instructions → adaptive test-taking → completion → scoring/results → detailed report**

This is distinct from question-content QC and the public visual inspection.

### 7. Final Batch M acceptance

Batch M can be marked fully complete only after public website verification, technical release QC, R&W/Math content-quality calibration, 30-mock cross-corpus calibration, any required remediation/re-gates, and final student-experience acceptance are complete.

## Post-freeze maintenance rules

- No new Batch M target may be created.
- No accepted mock may be silently regenerated, replaced, reordered, or mutated.
- Any post-freeze correction must be explicitly recorded and fully re-verified.
- Passing the existing production gates does not by itself certify authentic SAT/PSAT-level quality.
- Private calibration anchors remain private and must never be copied into production content or the public repository.
- The legacy public corpus remains separate until explicit release approval.

## Current status

**Batch M production generation, collective corpus verification, production-store cleanliness, and maintenance/spec safeguard verification are complete. The 30-mock corpus is frozen. The next checkpoint is the user-only public website inspection, followed by technical release QC and SAT/PSAT content-quality/cross-corpus calibration.**
