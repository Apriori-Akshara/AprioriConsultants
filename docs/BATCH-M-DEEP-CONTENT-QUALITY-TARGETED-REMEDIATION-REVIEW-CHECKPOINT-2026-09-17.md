# Batch M Deep Content-Quality Targeted Remediation / Re-Review Checkpoint — 2026-09-17

## 1. Completed stage

The Batch M deep content-quality candidate remediation and independent re-review stage is complete as a **candidate-only** stage.

- Selected candidates: **299**.
- Targeted remediation completed: **298** candidates.
- Independent re-review result before expert resolution: **298 PASS / 0 FAIL / 1 EXPERT_REVIEW_REQUIRED**.
- Held candidate: `SAT4-BATCHM-DQ-0004`.
- Production mutation: **false**.
- Release eligible: **false**.
- Replacement authorization: **NOT_AUTHORIZED**.
- SAT21 created: **false**.

The 298 remediated candidates remain outside production. The single held candidate was intentionally not auto-cleared by the remediation process.

## 2. Expert review of the remaining hold

`SAT4-BATCHM-DQ-0004` is a SAT Words-in-Context candidate. Direct inspection of its stimulus, keyed answer, choices, and explanation resolves the hold as **FAIL**.

The evidence is substantive:

1. The tested word **“clarify” does not appear in the stimulus passage**. The question therefore does not supply contextual evidence from which a student can determine the word's meaning.
2. The keyed answer, **“make a claim or distinction more precise,”** is a plausible dictionary-style meaning, but the item does not establish that meaning from the passage.
3. The explanation — **“In context, ‘clarify’ is used with the meaning represented by the keyed choice.”** — is circular and does not point to any passage evidence that proves the keyed answer.
4. Because this is a Words-in-Context item, the answer/explanation alignment gate is not satisfied merely by having a generally plausible definition.

Accordingly, the expert-review hold is closed as **FAIL**, not PASS. This is a content-quality disposition only; it is not a production mutation.

## 3. Final result of the closed stage

| Category | Final result |
|---|---:|
| Targeted-remediated candidates passing independent re-review | **298** |
| Expert-held candidate resolved as FAIL | **1** |
| Final PASS | **298** |
| Final FAIL | **1** |
| Production mutations | **0** |
| Release eligible | **false** |
| Replacement authorization | **NOT_AUTHORIZED** |
| SAT21 created | **false** |

## 4. Interpretation / production boundary

This checkpoint closes the **targeted remediation and re-review stage**. It does **not** authorize controlled production replacement.

The failed candidate was later remediated as a separately authorized candidate-only item and passed independent review. The passing candidate remains outside production until a separately controlled replacement stage is authorized.

## 5. Separate single-candidate remediation stage

The repaired candidate changes the Words-in-Context target from **“clarify”** to **“qualified”**, places the tested word directly in the stimulus, supplies contextual evidence for its meaning, and provides an explanation that explicitly connects the keyed answer to that evidence.

The repaired candidate passed independent substantive review in GitHub Actions run **35200787784**:

- **1 PASS**
- **0 FAIL**
- **0 expert-review holds**
- exact prompt groups: **0**
- semantic template clusters: **0**
- prompt/choice clusters: **0**
- production mutation: **false**
- release eligible: **false**
- SAT21 created: **false**

## 6. Candidate-to-production target resolution boundary

The candidate-generation design does not assign each candidate to a production `questionId`; candidates are assigned to a mock and remediation target class. Therefore target resolution must use the documented target class rather than incorrectly treating the candidate prompt as a copy of an existing production question.

For `SAT4-BATCHM-DQ-0004`, the target class is `rw-wic-target-diversity`. The canonical SAT4 production pool is therefore restricted to existing SAT4 Reading & Writing **Words-in-Context** records carrying the fixed **“qualify”** target identified by the deep-QC failure class. Eligible targets are ordered deterministically by production `questionId`, and the candidate's recorded `sourceIndex` selects one target by modulo within that eligible pool.

This is still a **candidate-only target assignment**. It records an exact `testKey + questionId` proposed replacement target but performs no production mutation and grants no replacement authorization.

## 7. Historical next stage — completed

The original next stage recorded here — pass the target-assignment artifact, obtain a fresh explicit authorization, and perform the single controlled replacement — was subsequently completed for this **one repaired Words-in-Context candidate**. The production replacement and post-replacement verification were recorded in the separate single-candidate authorization/gate records.

This checkpoint is therefore historical. Do not reopen the single-candidate path unless a later gate identifies a specific regression.

## 8. Current active stage

The project has since moved to a separate **195-candidate Reading & Writing calibration reconciliation**.

Candidate-generation workflow run: **35212907193**.

- Candidates: **195**.
- Allocation: **65 Craft & Structure → Standard English Conventions** and **130 Information & Ideas → Standard English Conventions**.
- Unique candidate prompts: **195**.
- Candidate quality gate: **PASS**.
- Hypothetical SEC proportion: **26.02%**.
- New hypothetical calibration failures: **0**.
- Production mutation: **false**.
- Release eligible: **false**.
- Replacement authorization: **NOT_AUTHORIZED**.
- SAT21 created: **false**.

The current independent reconciliation review run **35213306538** is **FAILED** because candidate `BATCH-M-CAL-SEC-001` has an `assessmentVariant` that does not match the assessment variant assigned to its production test.

The existing target-lock workflow is intentionally gated on a successful independent review and therefore has not produced a successful lock artifact.

## 9. Exact current next implementation step

**Fix the candidate generator's assessment-variant/test mapping, regenerate and revalidate the 195-candidate reconciliation package, and rerun independent review.**

The candidate's `assessmentVariant` and related assessment metadata must come from the same `BATCH_M_PRODUCTION_SEQUENCE` entry as its assigned `productionTestId`. The independent-review compatibility check must **not** be weakened or removed.

After review PASS:

1. run/verify the existing exact target-lock workflow for all **195** targets;
2. verify the locked artifact and all production/release boundary flags;
3. only then consider a **fresh explicit authorization** for any production replacement.

Production remains frozen during the current repair. No SAT21 may be created.


## 10. Superseded current-state note

The current-active sections above are historical and superseded by `docs/BATCH-M-CURRENT-STATUS-2026-09-21.md` and the September 21 roadmap update.

The later 195-target calibration reconciliation passed review and exact target locking, was explicitly authorized, and was applied to production. The current blocker is the post-replacement final 30-mock schema failure `Invalid difficultyBand: sat-series-a-medium`; the earlier reconciliation candidate-review blocker is resolved.
