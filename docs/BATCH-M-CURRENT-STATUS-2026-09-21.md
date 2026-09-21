# Batch M Current Status — 2026-09-21

**Status:** CURRENT AUTHORITATIVE BATCH M RELEASE CHECKPOINT  
**Documentation branch:** `main`  
**Last repository commit:** `7c4dd75bf35a3e618deffb1350e1ea3cbb15876a` — `feat: apply authorized 195-target calibration replacements`  
**Latest repository activity currently present:** September 21, 2026 (documentation updates)  
**Production target:** 30 controlled mocks — SAT1–SAT10, PSAT1–PSAT10, SAT11–SAT20  
**SAT21:** prohibited / not created

## 1. Current repository and workflow state

The latest production/content commit applies the explicitly authorized **195-target Reading & Writing calibration reconciliation**; later commits on `main` are documentation-state updates.

The repository is currently **not release-eligible** because the next collective 30-mock corpus gate fails on a schema incompatibility introduced by the latest replacement layer.

There were **no GitHub Actions workflow runs on September 18, 19, or 20, 2026**. On September 21, a documentation commit triggered deep content-quality workflow run **35577494013**, which failed on the **same known `Invalid difficultyBand: sat-series-a-medium` schema regression**. It did not establish a new content-quality finding.

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

## 4. Latest final 30-mock corpus-gate regression

Immediately before the 195-target replacement commit, the final 30-mock corpus gate passed in workflow run **35215919189**.

After the replacement commit, the final 30-mock corpus gate was rerun in workflow run **35216124749** and **FAILED**.

The first blocking error is:

`Invalid difficultyBand: sat-series-a-medium`

The same schema failure is then encountered by downstream validation workflows, including:

- final 30-mock corpus gate — **35216124749** — FAIL
- deep SAT/PSAT content-quality/diversity QC — **35216124621** — FAIL
- 30-mock cross-corpus calibration — **35216124708** — FAIL
- controlled replacement validation — **35216124689** — FAIL
- calibration reconciliation candidates — **35216124752** — FAIL

These downstream failures should be treated as consequences of the same schema regression until the final corpus gate passes again. Do not independently restart all of those stages first.

## 5. Current interpretation

The 195 replacement itself passed its candidate-level review and exact target-lock gates. The current problem is **metadata/schema compatibility at the complete production-corpus level**, not evidence that the 195 candidates failed the substantive review.

The latest production corpus remains the same 30-mock scope. The repository has not created SAT21.

The latest successful pre-regression final corpus gate was run **35215919189**. The latest current final corpus gate is **35216124749**, which fails on the `difficultyBand` value above.

## 6. Exact next implementation step

**Fix the `difficultyBand` value emitted/applied by the 195-target calibration replacement layer so it conforms to the repository's existing canonical difficulty-band schema.**

The fix must:

- preserve the exact 195 authorized target mapping;
- preserve the reviewed question content and assessment identity;
- not weaken any schema or compatibility gate;
- not broaden the replacement scope;
- not create SAT21;
- not change authentication, payment, navigation, dashboard, or unrelated site architecture.

Then:

1. rerun the **final 30-mock corpus gate**;
2. once that passes, rerun the **30-mock cross-corpus calibration**;
3. then complete the deferred **SAT11–SAT20 public verification**;
4. then perform **final end-to-end student acceptance**;
5. then complete **Batch M release acceptance**.

## 7. Release boundary

Current state:

- Production mutation: **already applied for the explicitly authorized 195-target reconciliation**.
- Release eligible: **false**.
- SAT21 created: **false**.

No additional production mutation should occur without a fresh explicit authorization for a separately identified scope.

## 8. September 21 public route verification correction

The first SAT11–SAT20 public-route smoke workflow (**35579757818**) failed for one known routing reason: the Series B landing page correctly redirected unauthenticated users to `/Auth?returnTo=%2FSATMocksSeriesB`, but the shared SAT return-path validator only allowed `/SATMocks` paths. SAT11–SAT20 individual routes passed.

This was corrected in `src/lib/sat/satLogin.js` by explicitly allowing the existing `/SATMocksSeriesB` internal return path. No authentication rule was weakened and no production content was changed.

The replacement workflow will re-run automatically from the fix commit. The next release checkpoint remains authenticated student acceptance of SAT11–SAT20 after the public route smoke check passes.

## 8. Future-session resume instruction

Future sessions should treat this document and `docs/QUESTION-GENERATION-ROADMAP.md` as the current source of truth.

Do **not** resume from the older September 15 or earlier September 17 "next candidate generation / not authorized" statements. Those are historical checkpoints and have been superseded by the later September 17 production application and the resulting final-gate schema regression.

Resume at the single active blocker: **canonical `difficultyBand` compatibility for the applied 195-target calibration replacement, followed by the final 30-mock corpus gate.**
