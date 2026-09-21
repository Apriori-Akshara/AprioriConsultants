# Batch M Current Status — 2026-09-21

**Status:** CURRENT AUTHORITATIVE BATCH M RELEASE CHECKPOINT  
**Documentation branch:** `main`  
**Latest verified functional/content state:** September 21, 2026  
**Production target:** 30 controlled mocks — SAT1–SAT10, PSAT1–PSAT10, SAT11–SAT20  
**SAT21:** prohibited / not created

## 1. Current repository and workflow state

The latest production/content commit applies the explicitly authorized **195-target Reading & Writing calibration reconciliation**; later commits on `main` are documentation-state updates.

The earlier `difficultyBand: sat-series-a-medium` schema regression has been corrected. The current final 30-mock corpus gate and 30-mock cross-corpus calibration both pass on the corrected production state.

The remaining release blocker is the substantive deep SAT/PSAT content-quality/diversity gate. Its current production-corpus run **35578714129** fails on content-quality findings; the later candidate-generation/selection pipeline and independent-review workflow are candidate-only and do not authorize or mutate production.

## 2. Completed stages that must not be repeated

The following are complete and historical unless a later gate identifies a real regression:

- Batches A–L.
- Initial 30-mock technical corpus generation/gating.
- Historical 352-item calibration replacement and verification.
- Public SAT/PSAT functionality verification.
- Deep SAT/PSAT content-quality and diversity QC.
- 2,000-candidate deep-QC candidate generation.
- Controlled selection of the 299 deep-QC candidates.
- Independent substantive review of those 299 candidates.
- Targeted remediation/re-review of that candidate set.
- Separate repair and controlled replacement of the single held Words-in-Context candidate.
- The 20-test targeted remediation/replacement milestone and its comprehensive post-replacement QC.
- The 195-candidate calibration reconciliation candidate generation.
- Independent review of the corrected 195-candidate package.
- Exact 195-target candidate lock.

Do not rerun these stages wholesale.

## 3. 195-target calibration reconciliation — completed through production application

The corrected reconciliation package contained:

- **195** R&W candidates.
- **65** Craft & Structure → Standard English Conventions.
- **130** Information & Ideas → Standard English Conventions.
- **195 / 195** reviewed successfully.
- **195 / 195** exact targets locked.
- **30 / 30** production mocks represented.
- Candidate identity/originality/target compatibility: PASS.
- Difficulty compatibility: PASS.

Relevant successful workflow runs:

- Candidate generation: **35215190890**
- Independent review: **35215238290**
- Exact target lock: **35215285669**

The exact authorized production replacement was then applied by:

`7c4dd75bf35a3e618deffb1350e1ea3cbb15876a` — `feat: apply authorized 195-target calibration replacements`

The production replacement is therefore **no longer candidate-only**.

## 4. Final 30-mock corpus gate and cross-corpus calibration

The corrected production state now passes the two collective technical/calibration gates:

- final 30-mock corpus gate — **35578714088** — PASS
- 30-mock cross-corpus calibration — **35578713967** — PASS

The prior `Invalid difficultyBand: sat-series-a-medium` regression is therefore resolved and must not be treated as the current blocker.

The remaining deep content-quality/diversity workflow is:

- deep SAT/PSAT content-quality/diversity QC — **35578714129** — FAIL

That failure is substantive content-quality/diversity work, not the old schema regression. Its later candidate-only remediation pipeline and independent-review workflow are separate from production mutation.

## 5. Current interpretation

The authorized 195-target calibration replacement passed its candidate-level review and exact target-lock gates, was applied to production, and the corrected production state now passes the final 30-mock corpus gate and 30-mock cross-corpus calibration.

The remaining substantive blocker is the deep content-quality/diversity gate. The latest production-corpus deep-QC run is **35578714129 — FAIL**. The follow-on run **35579096349** successfully generated and selected a candidate-only remediation pool, and **35579481595** successfully executed the independent-review workflow; however, that review's substantive disposition is **HOLD_FOR_REVIEW_AND_REMEDIATION (298 FAIL / 1 expert review / 0 PASS)**. These candidates remain outside production.

The production corpus remains the same frozen 30-mock scope. The repository has not created SAT21.

## 6. Current next implementation step

**Resolve the remaining deep SAT/PSAT content-quality/diversity hold through the existing candidate-only remediation/review path, without mutating production until the required authorization gate is satisfied.**

Current verified sequence:

1. **Final 30-mock corpus gate — PASS:** 35578714088.
2. **30-mock cross-corpus calibration — PASS:** 35578713967.
3. **Deep content-quality/diversity QC — FAIL:** 35578714129.
4. **Candidate generation/selection — technical workflow PASS, candidate-only:** 35579096349.
5. **Independent-review workflow — technical workflow PASS, substantive decision HOLD:** 35579481595; 298 FAIL / 1 expert-review item / 0 PASS.
6. **SAT11–SAT20 public route smoke — PASS:** 35580194863.
7. **Authenticated Series B functionality — focused live acceptance reported satisfactory by the user; not exhaustive content QC.**

Next implementation work must stay candidate-only until the substantive candidate review/remediation reaches the documented release boundary. Do not create SAT21, broaden the production scope, or weaken any gate.

After the deep-QC production blocker is legitimately cleared:

1. rerun the affected final 30-mock/content gates as required;
2. complete final public student-facing QC of the complete 30-mock experience;
3. complete final end-to-end student acceptance;
4. complete Batch M release acceptance.

## 7. Release boundary

Current state:

- Production mutation: **already applied for the explicitly authorized 195-target reconciliation**.
- Current deep-QC remediation candidates: **candidate-only; not applied to production**.
- Release eligible: **false**.
- SAT21 created: **false**.
- Authenticated SAT11–SAT20 functionality: **focused live acceptance reported satisfactory by the user; final comprehensive release QC remains pending**.

No additional production mutation should occur without the documented authorization for a specifically identified replacement scope.

## 8. September 21 public verification and authenticated acceptance

The SAT11–SAT20 public-route smoke workflow initially failed because the live deployment had not yet converged to the corrected Series B login return-path behavior. The deployment-aware smoke workflow then passed in **35580194863**.

Verified public route scope:
- `/SATMocksSeriesB`
- `/SATMocks/SAT11` through `/SATMocks/SAT20`

The user then performed the focused authenticated Series B live-site functionality acceptance and reported the features/functionality as satisfactory. This closes the **focused functionality checkpoint only**; it does not certify exhaustive question-by-question content QC or final release.

Detailed acceptance record: `docs/BATCH-M-SAT11-SAT20-AUTHENTICATED-STUDENT-ACCEPTANCE-2026-09-21.md`.

## 8. Future-session resume instruction

Future sessions should treat this document and `docs/QUESTION-GENERATION-ROADMAP.md` as the current source of truth.

Do **not** resume from the older September 15 or earlier September 17 "next candidate generation / not authorized" statements. Those are historical checkpoints and have been superseded by the later September 17 production application and the resulting final-gate schema regression.

Resume at the single active blocker: **candidate-only deep SAT/PSAT content-quality/diversity remediation and independent review**. The `difficultyBand` regression and final 30-mock technical gates are already resolved; do not mutate production or create SAT21.
