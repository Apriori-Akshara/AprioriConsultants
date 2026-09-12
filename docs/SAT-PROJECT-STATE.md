# Apriori Digital SAT Platform — Project State

**Last updated:** September 12, 2026

## 1. Source of truth

Read this document and `docs/SAT-ARCHITECTURE.md` before resuming SAT/PSAT work. The actual repository state takes precedence if anything differs.

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

Stage 3 will be deployed **one step at a time, Steps 1–12**, with each approved step deployed before moving to the next. Avoid unnecessary intermediate deployments within a step.

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
11. The user completes public-site QC and approves the complete 10-mock milestone.
12. Documentation records the final approval before Mock 11 is considered.

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

## 12. Mock 11 rule

**Do not create, regenerate or begin Mock 11 until the user has personally QC-verified and approved all PSAT Mocks 1–10 and SAT Mocks 1–10 as fully functional.**

## 13. Current next step

**Stage 3 — Step 1 of 12.**

Use the existing shared architecture to begin functional completion of Mocks 1–10. No subscription gate applies to these mocks. Do not regenerate content. Do not create Mock 11.
