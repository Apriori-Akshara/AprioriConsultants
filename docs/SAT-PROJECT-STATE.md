# Apriori Digital SAT Platform — Project State

**Last updated:** September 12, 2026

## 1. Source of truth

Read this document and `docs/SAT-ARCHITECTURE.md` before resuming SAT/PSAT work. The actual repository state takes precedence if anything differs. `docs/SAT-MOCK-EXPANSION-STATE.md` contains the detailed Stage 3 expansion checkpoint and is the companion source of truth for Mock 1–10 functional work.

## 2. Product target

The current product contains **20 original mock content sets**:

- PSAT Mocks 1–10
- SAT Mocks 1–10

All use one shared production-quality mock-test architecture. Do not create separate test engines or parallel implementations.

Content expansion is **frozen at Mock 10**.

## 3. AUTHORITATIVE student access rule for Mocks 1–10

**PSAT Mocks 1–10 and SAT Mocks 1–10 are accessible through the same single student login/account. Subscription payment is NOT required for any of these 20 mocks.**

Rules:

- One verified student account is used for both PSAT and SAT.
- The same authenticated session/account can access PSAT Mocks 1–10 and SAT Mocks 1–10.
- Do not create separate PSAT/SAT login systems.
- Do not require a second registration or second account when switching between PSAT and SAT.
- Do not add subscription or payment gates to Mocks 1–10.
- Any older documentation or code assumption that Mocks 3–10 require subscription is superseded by this section and must not be reintroduced.
- Payment, entitlement and receipt handling are not prerequisites for the 20-mock milestone.

## 4. Infrastructure

- GitHub: `Apriori-Akshara/AprioriConsultants`
- Branch: `main`
- Next.js 14.1.4, Pages Router
- React 18
- PostgreSQL
- Render web service: `AprioriConsultants`
- Controlled Render URL: `https://aprioriconsultants.onrender.com`
- Controlled SAT URL: `https://aprioriconsultants.onrender.com/SATMocks`
- Public verification URL: `https://www.aprioriconsultants.org`

The user tests only the public website when instructed. Do not ask the user to test Render.

## 5. Authentication/session milestone — COMPLETE

Registration, password hashing, email verification, verified-login acceptance/rejection, PostgreSQL sessions and HTTP-only `session` cookie authentication are implemented. The server-side PostgreSQL session is authoritative.

Do not repeat registration, email verification, database setup or the resolved PostgreSQL/Node client-bundle work unless a real defect requires it.

## 6. Current milestone — Stage 3 functional completion

The objective is to make **all PSAT Mocks 1–10 and SAT Mocks 1–10 fully functional and publicly QC-verifiable** before any Mock 11 work.

Stage 3 consists of Steps 1–12. Steps 1–10 are now implemented and the latest corrective deployment is LIVE. **Step 11 — live functional/public QC — is pending the user's final verification. Step 12 — final documentation and handoff — follows Step 11.**

A mock is fully functional only when the student can launch it through the student-facing library, complete the shared adaptive/timed/resumable test experience, submit it, receive server-authoritative scoring, and view the corresponding report/analysis.

## 7. Existing content and quality gates

Preserve all existing Mocks 1–10. Do not regenerate earlier content merely to support functional integration.

The shared content bank and full twenty-mock quality gate remain active. Do not bypass or weaken originality, structural, figure, answer-position, adaptive-pool, duplicate-ID or cross-mock collision checks.

Each mock contains 196 questions under the calibrated shared structure, for **3,920 questions across 20 content sets**.

Mock 10 passed the full twenty-mock quality gate after its R&W context collision was corrected.

## 8. Shared architecture requirements

- Reuse the existing shared adaptive engine.
- Reuse the existing timed/resumable/navigation/answer-saving/completion infrastructure.
- Reuse server-authoritative scoring and reporting.
- Integrate all PSAT and SAT mocks through the existing mock-library architecture.
- Do not create a separate engine, login system or reporting system for individual mocks.
- Preserve non-SAT website functionality.

## 9. Content originality standard

All passages, questions, answer choices, explanations, figures, graphs, tables and data constructions must be original Apriori material. Do not copy College Board or competitor content/assets.

R&W must not reuse passages, questions or near-duplicate constructions. Math must not reuse questions, disguised numerical substitutions, equivalent constructions, figures, graphs or tables. Every mock must be checked against the complete library.

## 10. Stage 3 completion standard

The final milestone is not complete merely because the content exists or a deployment builds.

Completion requires:

1. All PSAT Mocks 1–10 exposed correctly in the student-facing flow.
2. All SAT Mocks 1–10 exposed correctly in the student-facing flow.
3. The same verified student login works for both libraries.
4. No subscription is required for any Mock 1–10.
5. Every mock launches the correct content.
6. Adaptive/timed/resumable/navigation behavior works.
7. Submission and completion work.
8. Server-authoritative scoring works.
9. The correct report/analysis is produced.
10. Existing mocks do not break when later mocks are integrated.
11. Cross-mock question/content isolation is enforced.
12. The user completes public-site functional QC and approves the complete 10-mock milestone.
13. Documentation records the final approval before Mock 11 is considered.

## 11. Documentation/deployment rules

For every code change, state:

- where the work is performed;
- exact file path;
- exact change;
- BEFORE/AFTER or complete replacement where appropriate;
- exact commit message;
- expected Render result;
- exact controlled testing URL.

After each Stage 3 step, update the project-state documentation with the step result, files changed, deployment result, public testing result and next step.

## 12. Stage 3 implementation history — Steps 1–10 COMPLETE

### Step 1 — Remove subscription gate for Mocks 1–10

**Status:** LIVE and confirmed.

**File:** `src/lib/sat/testAccess.js`

**Change:** Increased the free-test ceiling from 2 to 10 so PSAT/SAT Mocks 1–10 are allowed without subscription/payment gating.

**Commit:** `0eb24a2b5036b809d4ae90cec08af86a1a983273`

**Commit message:** `Stage 3 Step 1: Remove subscription gate for Mocks 1-10`

**Render deployment:** `dep-daijd95ckfvc73938fu0` — LIVE before later deployments.

### Step 2 — Wire Mocks 9–10 into the shared adaptive engine

**Status:** COMPLETE and deployed LIVE.

**File:** `src/lib/sat/adaptiveMockEngine.js`

**Change:** Integrated PSAT/SAT Mocks 9–10 into the existing shared adaptive execution engine; no parallel mock engine was created.

**Commit:** `664dd1dd3bc73ec103b7c358aeaf5ec7983ed18c`

**Commit message:** `Stage 3 Step 2: Wire Mocks 9-10 into adaptive engine`

### Step 3 — Expose all 20 mocks through the student-facing library and route

**Status:** COMPLETE and deployed LIVE.

**Files:**
- `src/pages/SATMocks/index.js`
- `src/pages/SATMocks/[testId].js`

**Changes:** Exposed PSAT Mocks 1–10 and SAT Mocks 1–10 as permanent library cards; removed obsolete “Coming Next” placeholders; aligned the route to accept PSAT/SAT mock keys 1–10; preserved the existing test interface after an intermediate route-control regression was corrected.

**Commits:**
- `1bf15dec58bd23f1c2fbc85ddf9f187acf9e97bf1` — `Stage 3 Step 3: Expose all 20 mock tests`
- `4d2c9dbc33a4030833b6043a63c2a7e6c7dd5188` — `Stage 3 Step 3: Align mock route access`
- `a0eb021fb13286096239cb01563b83828cee4bfb` — `Stage 3 Step 3: Preserve existing mock test interface`

**Render deployment:** `dep-daijiv2q185c73a8vqo0` — LIVE before later deployments.

### Step 4 — Enforce mock access in the progress API

**Status:** LIVE and confirmed.

**File:** `src/pages/api/sat/mock-progress.js`

**Change:** Added server-side mock-family/test-number access enforcement before creating or mutating attempts, including validation of the allowed PSAT/SAT mock range 1–10.

**Commit:** `79a7d17dd56c0e77434e8f6db59026d2bab58479`

**Commit message:** `Stage 3 Step 4: Enforce mock access in progress API`

**Render deployment:** `dep-daijnv0jo6nc73blou80` — LIVE before later deployments.

### Step 5 — Validate mock question IDs server-side

**Status:** LIVE and confirmed.

**File:** `src/pages/api/sat/mock-progress.js`

**Change:** Added server-side validation so answer/flag/note/position operations cannot reference questions outside the selected mock plan, while preserving shared adaptive plan and attempt ownership checks.

**Commit:** `88ed0e72cdfba9e91f89bfb87bac6552c1310a1a`

**Commit message:** `Stage 3 Step 5: Validate mock question IDs server-side`

**Render deployment:** `dep-daijpbgae00c73dfbuvg` — LIVE before later deployments.

### Step 6 — Add completed mock report history

**Status:** LIVE and confirmed by the user.

**File:** `src/pages/SATMocks/results.js`

**Change:** Added a completed-attempt history selector so students with multiple completed mocks can switch between their saved reports. Existing scoring, breakdowns and question-level reporting were preserved.

**Commit:** `d31bdca8c16500910693ea210e4417049b7bd93b`

**Commit message:** `Stage 3 Step 6: Add completed mock report history`

**Render deployment:** `dep-daijqsh5efls7390uob0` — LIVE before later deployments.

### Step 7 — Enforce server-authoritative mock progression

**Status:** LIVE and confirmed by the user.

**File:** `src/pages/api/sat/mock-progress.js`

**Change:** Strengthened server authority over attempt progression. The server validates active section/module context, active-module question positions, adaptive progression and final completion stage, preventing client-spoofed progression.

**Commit:** `c8fd626c9897bb3f8851baba9ce122a50e7bb3e8`

**Commit message:** `Stage 3 Step 7: Enforce server-authoritative mock progression`

**Render deployment:** `dep-daijs1cs728c73akeukg` — LIVE before Step 8.

### Step 8 — Show mock attempt status and resume actions

**Status:** COMPLETE / LIVE and user-confirmed.

**File:** `src/pages/SATMocks/index.js`

**Change:** Each mock card reflects saved attempt state: Ready/Start, In Progress/Resume, or Completed/Retake. In-progress attempts take priority when both completed and in-progress attempts exist. An in-progress count is shown in the library summary. Existing `/SATMocks/[testId]` routing and shared execution architecture are preserved.

**Commit:** `e7f3e01d7a57cac96507fde1148bd6c732119c85`

**Commit message:** `Stage 3 Step 8: Show mock attempt status and resume actions`

**Render deployment:** `dep-daik009affks739e16gg` — LIVE and user-confirmed.

### Step 9 — Enforce adaptive module routing and adaptive integrity across all 20 mocks

**Status:** COMPLETE / LIVE after corrective deployment.

**File:** `src/lib/sat/adaptiveMockEngine.js`

**Change:** Strengthened the shared adaptive engine so every PSAT/SAT Mock 1–10 uses exactly three disjoint Module 2 route pools for R&W (27 standard + 27 high + 27 low) and Math (22 standard + 22 high + 22 low). Unsupported or missing routes are rejected instead of silently falling back to standard. Shared routing remains responsible for selecting High/Standard/Low from Module 1 performance.

**History:**
- `4d4db879bcad795adb1a784a904c765587afba9c` — `Stage 3 Step 9: Enforce adaptive module routing across all mocks` — build failed.
- `e0b515f1c382b61f7213c6bd97cb3fd3d9022386` — `Stage 3 Step 9: Establish checkpoint and remaining steps` — historical build-failed checkpoint.
- `908be71c89c8119f64a415ba2dbb07f67fa34c8c` — `Stage 3 Step 9: Correct adaptive route enforcement` — corrective implementation.

**Render deployment:** `dep-daik6s0jo6nc73bm6cmg` — **LIVE** and user-confirmed.

### Step 10 — Cross-mock content and question-ID isolation gate

**Status:** COMPLETE / LIVE after corrective deployment.

**Files:**
- `src/data/sat/mockContent/mockContentQualityGate.js`
- `src/data/sat/mockContent/index.js`

**Change:** Strengthened the twenty-mock quality gate to enforce explicit mock ownership and isolation. Each mock must have a valid unique `testId`; each question must have a nonempty `questionId`, matching `testId`, matching `contentId`, and a question ID beginning with the owning mock ID. Cross-mock duplicate question IDs, originality fingerprints, prompts, passages, Math constructions and figure data remain rejected. `conceptFingerprint` is intentionally not treated as a collision because concepts may repeat across mocks.

**History:**
- `3053d2605842ff3e805effcfd118ce6505a9ae70` — `Update mockContentQualityGate.js` — build failed because the first identity regex expected uppercase `PSAT|SAT` while actual IDs are lowercase.
- `b8cded66272be89f14c120b7f1384638125567ec` — `Stage 3 Step 10: Correct mock identity validation` — corrective implementation.

**Render deployment:** `dep-daikfvek1f9s73f4pbqg` — **LIVE**.

**Result:** The complete twenty-mock series gate passes with the corrected lowercase mock identity validation.

## 13. Stage 3 Step 11 — Full functional and public QC

**Status:** **IMPLEMENTATION COMPLETE; LIVE FUNCTIONAL QC AND FINAL USER VERIFICATION PENDING.**

No additional code change is currently required for Step 11. Steps 1–10 contain the implementation needed for this gate. Step 11 is the final real-world verification of the live public student experience.

The user will perform the final QC on the **public website only**. Do not ask the user to test the Render URL.

### Recommended final QC scope

The user does not need to complete all 20 mocks. A focused authenticated click-through should verify at least one PSAT mock and one SAT mock far enough to establish the shared architecture works end-to-end:

1. Open `https://www.aprioriconsultants.org/SATMocks`.
2. Confirm PSAT and SAT Mocks 1–10 are visible and selectable.
3. Launch one PSAT mock and one SAT mock using the verified student account.
4. Confirm the correct mock opens and its questions belong to that mock.
5. Confirm Module 1 loads and answer selection/navigation work.
6. Confirm flags/notes and other established controls behave correctly where used.
7. Continue far enough to reach Module 2.
8. Confirm adaptive Module 2 is reached without cross-mock content leakage or incorrect fallback behavior.
9. Confirm resume/retake behavior where applicable.
10. Confirm submission/completion and that the report identifies the correct mock.
11. Confirm there is no irrelevant generated-analysis text in student-facing questions or reports.
12. Confirm responsive/mobile behavior is usable.
13. Confirm existing public pages remain unaffected.

**Important:** Step 11 must remain pending until the user reports that public-site functional QC passes, or identifies a defect that must be corrected. If a defect is found, code changes and a new controlled deployment will be made before Step 11 is closed.

## 14. Stage 3 Step 12 — Final documentation and Stage 3 handoff

**Status:** **PENDING completion of Step 11.**

After the user confirms live functional QC, Step 12 will:

- record final Stage 3 approval status;
- record the final LIVE deployment checkpoint;
- record any remaining non-blocking observations;
- explicitly confirm content remains frozen at Mock 10;
- confirm no subscription/payment gating was introduced for Mocks 1–10;
- confirm the same verified student account remains the access path for all 20 mocks;
- hand off the project to the next approved phase only after all 20 mocks are publicly QC-approved.

Therefore **Stage 3 is not yet declared fully verified or closed**. The remaining action is the user's live functional QC, followed by the final documentation/hand-off checkpoint.

## 15. Current live deployment checkpoint

Latest Stage 3 deployment:

- Commit: `b8cded66272be89f14c120b7f1384638125567ec`
- Message: `Stage 3 Step 10: Correct mock identity validation`
- Render deployment: `dep-daikfvek1f9s73f4pbqg`
- Status: **LIVE**

The current live code contains the completed Step 10 isolation gate and all preceding Stage 3 implementation work.

## 16. Public verification URLs

Public/live site: `https://www.aprioriconsultants.org`

SAT Mock Library: `https://www.aprioriconsultants.org/SATMocks`

The public site is the user's testing surface. Render is used for deployment/build confirmation only unless the user explicitly requests otherwise.

## 17. Operating rules for remaining work

1. Do not create Mock 11.
2. Do not re-run completed setup work unless a real regression requires it.
3. Do not replace the shared adaptive engine with a parallel implementation.
4. Do not introduce subscription/payment gating for Mocks 1–10.
5. Do not alter unrelated public-site authentication, Redux, navigation, styling, or APIs unless required by a Stage 3 gate.
6. Prefer one coherent implementation and one deployment per approved step.
7. Update the state documents at the completion checkpoint of each approved step so the next session can resume without reconstructing prior work.
8. Do not mark Step 11 or Stage 3 fully verified until the user's public-site QC confirmation is received.
9. Do not begin Mock 11 until the user has personally QC-verified and approved all PSAT Mocks 1–10 and SAT Mocks 1–10.
