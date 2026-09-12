# SAT Mock Expansion State — September 12, 2026

This is the current expansion addendum to `docs/SAT-PROJECT-STATE.md`.

## Authoritative student access rule

PSAT Mocks 1–10 and SAT Mocks 1–10 are accessed through the **same single student login/account**. **Subscription payment is not required for any of these 20 mocks.**

- One verified student account is used for both PSAT and SAT.
- The same authenticated session can access PSAT Mocks 1–10 and SAT Mocks 1–10.
- Do not create separate PSAT/SAT login systems or require a second account.
- Do not add subscription/payment gating to Mocks 1–10.
- Any older documentation or implementation assumption that Mocks 3–10 require subscription is superseded by this rule.

## Completed expansion batches

- Mock 3: complete and frozen.
- Mock 4: complete and frozen.
- Mock 5: complete and deployed LIVE.
- Mock 6: complete and deployed LIVE after originality/generation fixes.
- Mock 7: complete and deployed LIVE after originality/generation fixes.
- Mock 8: complete and deployed LIVE after the full 16-mock quality gate passed; Mock 2 legacy identity collision was corrected at the source.
- Mock 9: complete and deployed LIVE after the full 18-mock quality gate passed.
- Existing Mocks 1–9 remain preserved and are not regenerated.

## Mock 10 batch

Mock 10 is now implemented through the existing shared production pipeline:
- PSAT Mock 10
- SAT Mock 10 — Series A
- Original R&W contexts and Math generation seed pair 18/19.
- Cross-mock question ID, verbal context/prompt, and Math application checks remain active across all twenty content sets.
- Shared adaptive engine is reused; no parallel mock engine is created.
- Central bank target after this batch: 3,920 questions across 20 mock content sets (196 per mock).

## Quality standard

Each mock must provide 196 bank questions: 27 R&W Module 1, 81 R&W Module 2 route questions, 22 Math Module 1, and 66 Math Module 2 route questions. Shared structural, originality, figure, answer-position, and adaptive-pool gates remain active. Mock 10 passed the complete twenty-mock series gate.

## Current status

Content expansion is **frozen at Mock 10**. The current work is Stage 3 functional completion of PSAT and SAT Mocks 1–10. Do not create Mock 11 until all 10 PSAT mocks and all 10 SAT mocks have been fully functional and publicly QC-approved by the user.

Stage 3 is being deployed sequentially, one approved step at a time. Avoid unnecessary intermediate deployments within a step.

## Stage 3 progress — Steps 1–7 COMPLETE

### Step 1 — Remove subscription gate for Mocks 1–10

**Status:** LIVE and confirmed.

- File: `src/lib/sat/testAccess.js`
- Change: Free-test ceiling increased from 2 to 10.
- Commit: `0eb24a2b5036b809d4ae90cec08af86a1a983273`
- Message: `Stage 3 Step 1: Remove subscription gate for Mocks 1-10`
- Render: `dep-daijd95ckfvc73938fu0` — LIVE.

### Step 2 — Wire Mocks 9–10 into the shared adaptive engine

**Status:** COMPLETE and deployed LIVE.

- File: `src/lib/sat/adaptiveMockEngine.js`
- Change: PSAT/SAT Mocks 9–10 connected to the shared adaptive engine.
- Commit: `664dd1dd3bc73ec103b7c358aeaf5ec7983ed18c`
- Message: `Stage 3 Step 2: Wire Mocks 9-10 into adaptive engine`

### Step 3 — Expose all 20 mocks through the student-facing library and route

**Status:** COMPLETE and deployed LIVE.

- Files: `src/pages/SATMocks/index.js`, `src/pages/SATMocks/[testId].js`
- Changes: Exposed PSAT/SAT Mocks 1–10; removed obsolete “Coming Next” placeholders; aligned routes to PSAT/SAT mock keys 1–10; preserved the existing mock interface after correcting an intermediate route-control regression.
- Commits:
  - `1bf15dec58bd23f1c2fbc85ddf9f187acf9e97bf1` — `Stage 3 Step 3: Expose all 20 mock tests`
  - `4d2c9dbc33a4030836b3043a63c2a7e6c7dd5188` — `Stage 3 Step 3: Align mock route access`
  - `a0eb021fb13286096239cb01563b83828cee4bfb` — `Stage 3 Step 3: Preserve existing mock test interface`
- Render: `dep-daijiv2q185c73a8vqo0` — LIVE.

### Step 4 — Enforce mock access in the progress API

**Status:** LIVE and confirmed.

- File: `src/pages/api/sat/mock-progress.js`
- Change: Added server-side family/test-number access enforcement before creating or mutating attempts; allowed PSAT/SAT range is 1–10.
- Commit: `79a7d17dd56c0e77434e8f6db59026d2bab58479`
- Message: `Stage 3 Step 4: Enforce mock access in progress API`
- Render: `dep-daijnv0jo6nc73blou80` — deployed LIVE before later deployments.

### Step 5 — Validate mock question IDs server-side

**Status:** LIVE and confirmed.

- File: `src/pages/api/sat/mock-progress.js`
- Change: Answer/flag/note/position operations validate question IDs/positions against the selected mock plan.
- Commit: `88ed0e72cdfba9e91f89bfb87bac6552c1310a1a`
- Message: `Stage 3 Step 5: Validate mock question IDs server-side`
- Render: `dep-daijpbgae00c73dfbuvg` — LIVE.

### Step 6 — Add completed mock report history

**Status:** LIVE and confirmed by the user.

- File: `src/pages/SATMocks/results.js`
- Change: Added completed-attempt history selection so students can switch between saved reports; existing scoring and report sections preserved.
- Commit: `d31bdca8c16500910693ea210e4417049b7bd93b`
- Message: `Stage 3 Step 6: Add completed mock report history`
- Render: `dep-daijqsh5efls7390uob0` — LIVE.

### Step 7 — Enforce server-authoritative mock progression

**Status:** LIVE and confirmed by the user.

- File: `src/pages/api/sat/mock-progress.js`
- Change: Server now validates active section/module context, active-module question positions, adaptive progression, and final completion stage, preventing client-spoofed progression.
- Commit: `c8fd626c9897bb3f8851baba9ce122a50e7bb3e8`
- Message: `Stage 3 Step 7: Enforce server-authoritative mock progression`
- Render: `dep-daijs1cs728c73akeukg` — LIVE and user-confirmed.

## Public verification

The user will test only the public/live site when explicitly told. Do not ask the user to test the Render URL.

Public site: `https://www.aprioriconsultants.org`

Current SAT Mock Library: `https://www.aprioriconsultants.org/SATMocks`

## Next build

**Stage 3, Step 8 of 12.** Update `src/pages/SATMocks/index.js` so each of the 20 mock cards accurately reflects saved attempt state:

- `Ready` + `Start Mock` for never-started forms.
- `In Progress` + `Resume Mock` for unfinished attempts.
- `Completed` + `Retake Mock` when only completed attempts exist.
- If both completed and in-progress attempts exist for a mock, prioritize `In Progress` and offer `Resume Mock`.
- Add an in-progress count to the summary area.
- Continue using the existing `/SATMocks/[testId]` route and shared execution architecture.

Commit message: `Stage 3 Step 8: Show mock attempt status and resume actions`

Do not change mock content, scoring, authentication, subscription rules, the adaptive engine, or create Mock 11.
