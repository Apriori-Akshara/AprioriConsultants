# SAT Mock Expansion State — September 12, 2026

This is the current expansion addendum to `docs/SAT-PROJECT-STATE.md` and is the source of truth for the remaining PSAT/SAT Mock 1–10 functional work.

## Authoritative student access rule

PSAT Mocks 1–10 and SAT Mocks 1–10 are accessed through the **same single student login/account**. **Subscription payment is not required for any of these 20 mocks.**

- One verified student account is used for both PSAT and SAT.
- The same authenticated session can access PSAT Mocks 1–10 and SAT Mocks 1–10.
- Do not create separate PSAT/SAT login systems or require a second account.
- Do not add subscription/payment gating to Mocks 1–10.
- Any older documentation or implementation assumption that Mocks 3–10 require subscription is superseded by this rule.

## Content expansion checkpoint

Content expansion is **frozen at Mock 10**.

- All 10 PSAT mocks and all 10 SAT mocks are now in the central production content set.
- No Mock 11 is to be created until all 20 existing mocks are fully functional and publicly QC-approved by the user.
- Existing mock content is preserved; functional work must use the shared production architecture rather than creating parallel mock implementations.

## Completed expansion batches

- Mock 3: complete and frozen.
- Mock 4: complete and frozen.
- Mock 5: complete and deployed LIVE.
- Mock 6: complete and deployed LIVE after originality/generation fixes.
- Mock 7: complete and deployed LIVE after originality/generation fixes.
- Mock 8: complete and deployed LIVE after the full 16-mock quality gate passed; Mock 2 legacy identity collision was corrected at the source.
- Mock 9: complete and deployed LIVE after the full 18-mock quality gate passed.
- Mock 10: complete and deployed LIVE after the complete twenty-mock series gate passed.
- Existing Mock 1–10 content remains preserved and is not regenerated as part of Stage 3 functional work.

## Mock 10 batch checkpoint

Mock 10 is implemented through the existing shared production pipeline:
- PSAT Mock 10
- SAT Mock 10 — Series A
- Original R&W contexts and Math generation seed pair 18/19.
- Cross-mock question ID, verbal context/prompt, and Math application checks remain active across all twenty content sets.
- Shared adaptive engine is reused; no parallel mock engine is created.
- Central bank target: 3,920 questions across 20 mock content sets (196 per mock).

## Quality standard

Each mock must provide 196 bank questions: 27 R&W Module 1, 81 R&W Module 2 route questions, 22 Math Module 1, and 66 Math Module 2 route questions. Shared structural, originality, figure, answer-position, and adaptive-pool gates remain active.

## Stage 3 functional implementation checkpoint — Steps 1–10 COMPLETE

Steps 1–10 are implemented and the latest corrective deployment is LIVE. Step 11 remains the final public functional/QC gate to be completed by the user.

### Step 1 — Remove subscription gate for Mocks 1–10

**Status:** COMPLETE / LIVE.

- File: `src/lib/sat/testAccess.js`
- Change: Free-test ceiling increased from 2 to 10.
- Commit: `0eb24a2b5036b809d4ae90cec08af86a1a983273`
- Message: `Stage 3 Step 1: Remove subscription gate for Mocks 1-10`
- Render: `dep-daijd95ckfvc73938fu0` — deployed LIVE before later steps.

### Step 2 — Wire Mocks 9–10 into the shared adaptive engine

**Status:** COMPLETE / LIVE.

- File: `src/lib/sat/adaptiveMockEngine.js`
- Change: PSAT/SAT Mocks 9–10 connected to the shared adaptive engine.
- Commit: `664dd1dd3bc73ec103b7c358aeaf5ec7983ed18c`
- Message: `Stage 3 Step 2: Wire Mocks 9-10 into adaptive engine`

### Step 3 — Expose all 20 mocks through the student-facing library and route

**Status:** COMPLETE / LIVE.

- Files: `src/pages/SATMocks/index.js`, `src/pages/SATMocks/[testId].js`
- Changes: Exposed PSAT/SAT Mocks 1–10; removed obsolete “Coming Next” placeholders; aligned routes to PSAT/SAT mock keys 1–10; preserved the existing mock interface after correcting an intermediate route-control regression.
- Commits:
  - `1bf15dec58bd23f1c2fbc85ddf9f187acf9e97bf1` — `Stage 3 Step 3: Expose all 20 mock tests`
  - `4d2c9dbc33a4030833b6043a63c2a7e6c7dd5188` — `Stage 3 Step 3: Align mock route access`
  - `a0eb021fb13286096239cb01563b83828cee4bfb` — `Stage 3 Step 3: Preserve existing mock test interface`
- Render: `dep-daijiv2q185c73a8vqo0` — deployed LIVE before later steps.

### Step 4 — Enforce mock access in the progress API

**Status:** COMPLETE / LIVE.

- File: `src/pages/api/sat/mock-progress.js`
- Change: Added server-side family/test-number access enforcement before creating or mutating attempts; allowed PSAT/SAT range is 1–10.
- Commit: `79a7d17dd56c0e77434e8f6db59026d2bab58479`
- Message: `Stage 3 Step 4: Enforce mock access in progress API`
- Render: `dep-daijnv0jo6nc73blou80` — deployed LIVE before later steps.

### Step 5 — Validate mock question IDs server-side

**Status:** COMPLETE / LIVE.

- File: `src/pages/api/sat/mock-progress.js`
- Change: Answer/flag/note/position operations validate question IDs/positions against the selected mock plan.
- Commit: `88ed0e72cdfba9e91f89bfb87bac6552c1310a1a`
- Message: `Stage 3 Step 5: Validate mock question IDs server-side`
- Render: `dep-daijpbgae00c73dfbuvg` — deployed LIVE before later steps.

### Step 6 — Add completed mock report history

**Status:** COMPLETE / LIVE and user-confirmed.

- File: `src/pages/SATMocks/results.js`
- Change: Added completed-attempt history selection so students can switch between saved reports; existing scoring and report sections preserved.
- Commit: `d31bdca8c16500910693ea210e4417049b7bd93b`
- Message: `Stage 3 Step 6: Add completed mock report history`
- Render: `dep-daijqsh5efls7390uob0` — deployed LIVE before later steps.

### Step 7 — Enforce server-authoritative mock progression

**Status:** COMPLETE / LIVE and user-confirmed.

- File: `src/pages/api/sat/mock-progress.js`
- Change: Server validates active section/module context, active-module question positions, adaptive progression, and final completion stage, preventing client-spoofed progression.
- Commit: `c8fd626c9897bb3f8851baba9ce122a50e7bb3e8`
- Message: `Stage 3 Step 7: Enforce server-authoritative mock progression`
- Render: `dep-daijs1cs728c73akeukg` — deployed LIVE before Step 8.

### Step 8 — Show mock attempt status and resume actions

**Status:** COMPLETE / LIVE and user-confirmed.

- File: `src/pages/SATMocks/index.js`
- Change: Each mock card reflects saved attempt state: Ready/Start, In Progress/Resume, or Completed/Retake. In-progress attempts take priority when both completed and in-progress attempts exist. An in-progress count is shown in the library summary. Existing `/SATMocks/[testId]` routing and shared execution architecture are preserved.
- Commit: `e7f3e01d7a57cac96507fde1148bd6c732119c85`
- Message: `Stage 3 Step 8: Show mock attempt status and resume actions`
- Render: `dep-daik009affks739e16gg` — **LIVE**.

### Step 9 — Enforce adaptive module routing and adaptive integrity across all 20 mocks

**Status:** COMPLETE / LIVE after corrective deployment.

- File: `src/lib/sat/adaptiveMockEngine.js`
- Change: Strengthened the shared adaptive engine so every PSAT/SAT Mock 1–10 uses exactly three disjoint Module 2 route pools for R&W (27 standard + 27 high + 27 low) and Math (22 standard + 22 high + 22 low). Unsupported or missing routes are rejected instead of silently falling back to standard. Shared routing remains responsible for selecting High/Standard/Low from Module 1 performance.
- Initial implementation commit: `4d4db879bcad795adb1a784a904c765587afba9c` — `Stage 3 Step 9: Enforce adaptive module routing across all mocks` — build failed.
- Documentation checkpoint commit: `e0b515f1c382b61f7213c6bd97cb3fd3d9022386` — `Stage 3 Step 9: Establish checkpoint and remaining steps` — historical build-failed checkpoint.
- Corrective commit: `908be71c89c8119f64a415ba2dbb07f67fa34c8c` — `Stage 3 Step 9: Correct adaptive route enforcement`
- Corrective Render deployment: `dep-daik6s0jo6nc73bm6cmg` — **LIVE** and user-confirmed.
- The earlier failed deployments are historical records; the corrected implementation is the current live implementation.

### Step 10 — Cross-mock content and question-ID isolation gate

**Status:** COMPLETE / LIVE after corrective deployment.

- Files:
  - `src/data/sat/mockContent/mockContentQualityGate.js`
  - `src/data/sat/mockContent/index.js`
- Change: Strengthened the twenty-mock quality gate to enforce explicit mock ownership and isolation. Each mock must have a valid unique `testId`; each question must have a nonempty `questionId`, matching `testId`, matching `contentId`, and a question ID beginning with the owning mock ID. Cross-mock duplicate question IDs, originality fingerprints, prompts, passages, Math constructions and figure data remain rejected. `conceptFingerprint` is intentionally not treated as a collision because concepts may repeat across mocks.
- First implementation commit: `3053d2605842ff3e805effcfd118ce6505a9ae70` — `Update mockContentQualityGate.js` — build failed because the identity check incorrectly expected uppercase `PSAT|SAT` while actual IDs are lowercase.
- Corrective commit: `b8cded66272be89f14c120b7f1384638125567ec` — `Stage 3 Step 10: Correct mock identity validation`
- Corrective Render deployment: `dep-daikfvek1f9s73f4pbqg` — **LIVE**.
- Result: the complete twenty-mock series gate passes with the corrected lowercase mock identity validation.

## Stage 3 — Step 11: Full functional and public QC

**Status:** IMPLEMENTATION COMPLETE; **LIVE FUNCTIONAL QC AND FINAL USER VERIFICATION PENDING.**

No additional code change is currently required for Step 11. Steps 1–10 contain the implementation needed for this gate. Step 11 is the final real-world verification of the live public student experience.

The user will perform the final QC on the **public website only**. Render is not the student testing surface.

### Recommended final QC scope

The user does not need to complete all 20 mocks. A focused authenticated click-through should verify at least one PSAT mock and one SAT mock far enough to establish the shared architecture works end-to-end:

1. Open the public Mock Library.
2. Confirm PSAT and SAT Mocks 1–10 are visible and selectable.
3. Launch a PSAT mock and a SAT mock using the verified student account.
4. Confirm the correct mock opens and questions belong to that mock.
5. Confirm Module 1 loads and answer selection/navigation work.
6. Confirm flags/notes and other established controls behave correctly where used.
7. Continue far enough to reach Module 2.
8. Confirm adaptive Module 2 is reached without cross-mock content leakage or incorrect fallback behavior.
9. Confirm resume/retake behavior where applicable.
10. Confirm submission/completion and that the report identifies the correct mock.
11. Confirm there is no irrelevant generated-analysis text in student-facing questions or reports.
12. Confirm responsive/mobile behavior is usable.
13. Confirm existing public pages remain unaffected.

### Step 11 completion rule

Step 11 must remain **PENDING** until the user reports that the public-site functional QC passes, or identifies a defect that must be corrected. If a defect is found, code changes and a new controlled deployment will be made before Step 11 is closed.

## Stage 3 — Step 12: Final documentation and Stage 3 handoff

**Status:** PENDING user completion of Step 11.

Step 12 will be the documentation/final-handoff checkpoint after the user confirms live functional QC. It will:

- record the final Stage 3 approval status;
- record the final LIVE deployment checkpoint;
- record any remaining non-blocking observations;
- explicitly confirm that content remains frozen at Mock 10;
- confirm no subscription/payment gating was introduced for Mocks 1–10;
- confirm the same verified student account remains the access path for all 20 mocks;
- hand off the project to the next approved phase only after all 20 mocks are publicly QC-approved.

Because Step 11 is still pending from the user, **Stage 3 itself is not yet declared fully verified or closed.**

## Current live deployment checkpoint

Latest Stage 3 deployment:
- Commit: `b8cded66272be89f14c120b7f1384638125567ec`
- Message: `Stage 3 Step 10: Correct mock identity validation`
- Render deployment: `dep-daikfvek1f9s73f4pbqg`
- Status: **LIVE**

The current live code therefore contains the completed Step 10 isolation gate and all preceding Stage 3 implementation work.

## Public verification URLs

Public/live site: `https://www.aprioriconsultants.org`

SAT Mock Library: `https://www.aprioriconsultants.org/SATMocks`

The public site is the user's testing surface. Render is used for deployment/build confirmation only unless the user explicitly requests otherwise.

## Operating rules for remaining work

1. Do not create Mock 11.
2. Do not re-run completed setup work unless a real regression requires it.
3. Do not replace the shared adaptive engine with a parallel implementation.
4. Do not introduce subscription/payment gating for Mocks 1–10.
5. Do not alter unrelated public-site authentication, Redux, navigation, styling, or APIs unless required by a Stage 3 gate.
6. Prefer one coherent implementation and one deployment per approved step.
7. Update this document at the completion checkpoint of each approved step so the next session can resume without reconstructing prior work.
8. Do not mark Step 11 or Stage 3 fully verified until the user's public-site QC confirmation is received.
