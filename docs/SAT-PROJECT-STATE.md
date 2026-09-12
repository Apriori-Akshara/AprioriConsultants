# Apriori Digital SAT Platform — Project State

**Last updated:** September 12, 2026

## 1. Purpose

This document is the source of truth for resuming SAT/PSAT development. Before continuing work, read this document and `docs/SAT-ARCHITECTURE.md`, then inspect only the repository files relevant to the next task. The actual repository state takes precedence if anything differs.

## 2. Current product target

**20 complete original PSAT/SAT-style mock tests.**

One shared production-quality mock-test architecture must serve all mocks. Do not create separate test engines or parallel implementations.

The existing four completed mock content sets are the foundation and must be preserved:

1. PSAT Mock 1 — existing
2. PSAT Mock 2 — existing
3. SAT Mock 1 — existing
4. SAT Mock 2 — existing

These are **not** to be regenerated as part of the 20-mock expansion.

## 3. Current development access rule

For the current 20-mock development phase:

* All available mocks require authenticated student login.
* Do not enforce the commercial Tests 3–10 subscription lock during this phase.
* The long-term commercial model remains: verified students can access Tests 1–2; Tests 3–10 require subscription entitlement when that commercial milestone is activated.
* Subscription may ultimately be purchased at any stage; completion of Tests 1–2 must never be a prerequisite.
* Payment, entitlement and receipt handling remain future commercial milestones unless explicitly activated.

## 4. Infrastructure

* GitHub: `Apriori-Akshara/AprioriConsultants`
* Branch: `main`
* Next.js 14.1.4, Pages Router
* React 18
* PostgreSQL
* Render web service: `AprioriConsultants`
* Controlled testing URL: `https://aprioriconsultants.onrender.com`
* Controlled SAT testing URL: `https://aprioriconsultants.onrender.com/SATMocks`
* Do not switch controlled testing to the custom domain unless explicitly instructed.

## 5. Authentication/session milestone — COMPLETE

Registration, password hashing, email verification, verified-login rejection/acceptance, PostgreSQL session creation and HTTP-only `session` cookie authentication are implemented and tested.

The server-side PostgreSQL session is authoritative. Do not use a browser-readable cookie or Redux state as the authorization source.

The earlier PostgreSQL/Node `tls` client-bundle issue was resolved by separating the browser-safe SAT login helper from server-only SAT authentication/database dependencies.

## 6. Stage 3 — IMPLEMENTATION COMPLETE; PUBLIC VERIFICATION PENDING

### Stage 3A

* Adaptive testing foundation implemented.
* Integrity/security controls implemented.

### Stage 3B

* Resumable test-taking implemented.
* Server-authoritative timed experience implemented.
* Inter-section break timing implemented.
* Resume/saved-state experience implemented.

### Stage 3C

* Server-authoritative scoring implemented.
* Completion integrity implemented.
* Performance report page and report styling implemented.
* Mock library connected to reporting.
* SAT navigation controls completed.

**Status:** Implementation complete. Public-site verification is still pending.

Do not restart Stage 3 unless an actual defect is discovered during verification or later mock integration.

## 7. Existing mock content — PRESERVE

The current `src/data/sat/contentBank.js` imports and validates these four existing content sets:

* `PSAT_MOCK_01_CONTENT`
* `PSAT_MOCK_02_CONTENT`
* `SAT_MOCK_01_CONTENT`
* `SAT_MOCK_02_CONTENT`

The current content bank validates duplicate IDs, verbal-context/prompt duplication and Math application duplication across the four existing mocks, and expects the existing calibrated four-mock bank totals.

**Do not replace, regenerate or duplicate these four mock content sets merely to support the 20-mock target.** Extend the existing architecture around them.

## 8. Stage 3 / dashboard work already completed

The SAT dashboard and student-facing mock-library foundation have been implemented and progressively styled. Recent UI work includes centred/narrower test CTAs and responsive/mobile layout improvements. The latest dashboard changes were deployed successfully to Render.

Do not redo completed dashboard work unless a new integration requirement or real defect requires it.

## 9. Step A — COMPLETE

Step A updated the project state for the 20-mock target, documented the shared architecture, temporary development access rule, Mock Stage 0–10 production standard, originality requirements and session handoff rules.

Commit: `8fff77fb61b1830adc706788cb198295c573fe66`

## 10. Step B — CORRECTED / CLOSED

A Step B commit was created:

`7a2b7d56cbfdbda07cf1e918726c302f15117e82` — `Add Mock 1 production blueprint`

It added only:

`src/data/sat/mockContent/mock01Blueprint.js`

The file contained configuration only and did **not** contain replacement question content. It did not modify the existing PSAT Mock 1, PSAT Mock 2, SAT Mock 1, SAT Mock 2, Stage 3A, Stage 3B or Stage 3C implementation.

However, the blueprint incorrectly treated the already-existing SAT Mock 1 as a new production-proof mock. **It must not be used to regenerate or replace SAT Mock 1.**

The redundant blueprint has now been removed because it could create confusion with the existing SAT Mock 1.

Deletion commit:

`55306b04aadd0c2583019a40ebde4e081bbb9b4d` — `Remove redundant Mock 1 blueprint`

No existing mock content or Stage 3 implementation was removed by this correction.

## 11. Correct production position after Step B

The project already has four completed mock content sets and the shared Stage 3 foundation. Therefore the next work is **not** to build another Mock 1.

The correct approach is:

**Existing four mocks → extend/strengthen the shared production pipeline → produce the next new mock(s) → QC against the entire existing library → integrate through the existing Stage 3 architecture → deploy/verify → document → repeat.**

The next new mock must receive its own unambiguous identity and must not reuse an existing `sat-mock-01`, `sat-mock-02`, `psat-mock-01` or `psat-mock-02` identity.

## 12. Master mock-production standard

Every new mock must pass:

**Blueprint → Original Content Generation → Structural QC → Originality/Collision QC → Adaptive Integration → Test-Taking QA → Server Scoring → Detailed Report → UI/UX → Mock Library Integration → Deployment → Verification → Documentation**

A mock is complete only when the student can log in, launch it, complete the adaptive test, resume when applicable, finish it, receive server-generated results and view the detailed report.

### Content originality

* All passages, questions, answer choices, explanations, figures, graphs, tables and data constructions must be original Apriori material.
* Do not copy College Board or competitor content/assets.
* R&W must not reuse passages, questions or near-duplicate constructions.
* Math must not reuse questions, disguised numerical substitutions, equivalent constructions, figures, graphs or tables.
* Every new mock must be checked against the complete existing mock library.

### Adaptive structure

Reuse the existing shared adaptive service and Stage 3 architecture. Do not create a per-mock adaptive engine.

### Student experience

Reuse the existing timed/resumable/navigation/answer-saving/completion infrastructure and integrate new content into it.

### Scoring/reporting

Reuse the existing server-authoritative scoring and reporting infrastructure. Do not create a separate reporting system per mock.

### UI/UX

Continue progressive UI/UX improvement with each meaningful feature. Do not postpone all visual refinement until the end.

## 13. Mock completion documentation requirement

After each completed mock, update this document with:

* mock identity and content scope;
* generation method;
* structural/originality QC result;
* files changed;
* database changes, if any;
* adaptive integration;
* scoring/report integration;
* deployment result;
* testing result;
* known limitations;
* next mock.

## 14. Testing and deployment rules

* Use the controlled Render URL for controlled testing unless explicitly instructed otherwise.
* The user may separately verify the public website when requested; do not claim that verification without the user's confirmation.
* Do not repeatedly retest unrelated website features after every mock.
* Run build/deployment checks after meaningful code batches.
* Preserve existing non-SAT website functionality.
* Do not repeat registration, email verification, database setup or resolved client/server dependency work unless a real defect requires it.

## 15. Code-change rules

For every code change, state:

* where the work is performed;
* exact file path;
* exact change;
* BEFORE/AFTER or complete replacement where appropriate;
* exact commit message;
* expected Render result;
* exact controlled testing URL.

Do not use placeholder code such as `...` or `same as above` in replacement files. Do not overwrite newer repository work with an older remembered version.

## 16. Current expansion status — Mock 4 complete

### Mock 3 — COMPLETE

PSAT Mock 3 and SAT Mock 3 were generated as original content and integrated through the shared pipeline. Six mock content sets are represented in the central content bank, with 1,176 questions total. The shared adaptive-engine identity validation and completion timestamp parameter issues discovered during integration were fixed without creating a parallel engine.

### Mock 4 — COMPLETE

PSAT Mock 4 and SAT Mock 4 were generated as original content using the same shared content-generation pipeline. Mock 4 adds 392 questions for the pair, bringing the central bank to **1,568 questions across eight mock content sets**.

Mock 4 passed the shared structural/content validation and cross-mock originality/duplication gates used by the content bank. Its content, content-bank integration and shared adaptive-engine integration were merged to `main` in one production batch.

Merge commit: `4521b772b38f2fe06218f4e6ebd6f1d32ccba099` — `Merge pull request #3 from Apriori-Akshara/mock4-production-batch Build PSAT and SAT Mock 4`

Render deployment for that merge is **LIVE**: `dep-daihcegae00c73ddgkcg`.

The existing first four mock content sets were preserved; no separate Mock 4 engine was created.

## 17. Public verification status

The implementation/deployment side of Mock 4 is complete. Public-site student-flow verification remains a user-side check and has not been claimed as completed.

Public site for verification when instructed: `https://www.aprioriconsultants.org`

The user should test only the public site, not the controlled Render URL.

## 18. Next build stage

**Next batch: Mock 5 — PSAT Mock 5 and SAT Mock 5.**

Use the same shared production pipeline. Before coding, inspect only the current Mock 4 integration and the content-generation contracts necessary to create the next unique identities. Do not regenerate Mocks 1–4. Do not restart Stage 3. Do not create a parallel mock engine.

Prefer one coherent branch/PR merge for the Mock 5 pair so compatible changes produce one production deployment.
