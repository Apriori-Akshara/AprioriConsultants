# Apriori Digital SAT Platform — Project State

**Last updated:** September 12, 2026

## 1. Purpose of this document

This is the current working status of the Apriori Digital SAT platform.

Use this document to resume development without relying on long copied prompts or memory from an earlier ChatGPT session.

**Rule:** Before continuing work, read this document and `docs/SAT-ARCHITECTURE.md`, then inspect the current repository. The actual repository/code/database state takes precedence if anything differs from this document.

---

## 2. Project overview

The Digital SAT platform is being built inside the existing Next.js/React/Redux Apriori Consultants website.

The controlled testing URL is:

`https://aprioriconsultants.onrender.com`

Do **not** switch controlled testing to the custom domain unless explicitly instructed.

### Current product target

The production-development target is now:

**20 complete original PSAT/SAT-style mock tests.**

We will not build 20 independent test implementations. One shared production-quality mock-test architecture will serve all 20 mocks. Mock 1 will first be taken completely through the required production process and used to prove the content-generation, adaptive, scoring/reporting, UI/UX, deployment and documentation workflow before Mocks 2–20 are produced using the proven process.

The existing public website must continue to work.

---

## 3. Permanent business rules

### Student registration and authentication

* Students can register.
* Student registration creates an unverified account initially.
* Email verification is required before student login is allowed.
* Verification is performed through a time-limited email verification link.
* Passwords are stored as secure hashes, never plaintext.
* Authentication/session handling must remain server-verifiable.
* Do not rely on a browser-readable user cookie or Redux state alone for authorization.
* The authoritative SAT authentication mechanism is the server-side PostgreSQL session represented by the HTTP-only `session` cookie.

### Mock-test access — current development phase

For the current 20-mock development phase, the temporary access rule is:

* **All 20 mocks require authenticated student login.**
* **No Test 3–10 Premium-lock/subscription enforcement is to be implemented or enforced during this development phase.**
* Students who are authenticated may access the available mocks without a subscription gate interfering with the 20-mock build.
* The commercial subscription architecture remains part of the project and can be completed later without being allowed to interfere with the current mock-production work.

This temporary development rule supersedes the earlier Test 1–2 free / Tests 3–10 premium presentation for the current 20-mock build only. It does not delete or invalidate the longer-term commercial requirement.

### Long-term commercial access model

* After successful email verification, a student may access Mock Tests 1 and 2.
* Mock Tests 3–10 require an active subscription entitlement when the commercial subscription milestone is activated.
* A student may purchase the subscription at any stage, including before attempting Tests 1–2, between them, while attempting them, or after completing them.
* Completion of Tests 1–2 must **never** be a prerequisite for purchasing the subscription.
* Authentication, email verification, test access, payment, subscription status, and entitlement are separate concepts and must not be collapsed into one status field.

### Payment and subscription

* Subscription purchase will use a proper payment gateway when that milestone is implemented.
* Confirmed successful payment must automatically activate the student's entitlement.
* Successful payment must generate a persistent payment receipt/record.
* Payment status must be verified server-side.
* Internal/admin users must be able to review registrations, payments, subscriptions and entitlements and intervene where appropriate.
* Duplicate/replayed gateway notifications must not create duplicate entitlement or receipt records.
* The payment gateway is **not** part of the current 20-mock production phase unless a later planned step explicitly calls for it.

### Master/admin access

* The architecture allows exactly five independent master accounts.
* Master accounts are separate from student accounts.
* Master credentials must never be stored in source code, GitHub, frontend code, `NEXT_PUBLIC_*` variables, or plaintext in the database.
* Masters may manage appropriate operational records but must not view plaintext passwords or password hashes.
* Master accounts can be individually deactivated.

---

## 4. Current infrastructure

* GitHub repository: `Apriori-Akshara/AprioriConsultants`
* Branch: `main`
* Framework: Next.js 14.1.4, Pages Router
* React 18
* Redux/Redux Toolkit already exists
* PostgreSQL is the current SAT backend database
* Render web service: `AprioriConsultants`
* Render web service URL: `https://aprioriconsultants.onrender.com`
* Render build: `npm install; npm run build`
* Render start: `npm run start`
* Resend is used for verification email delivery.

Do not create a second unrelated Next.js backend, Express server, authentication system, or SAT repository unless a future architecture decision explicitly requires it.

---

## 5. Day 1 status — COMPLETE

Completed:

* SAT-specific architecture/data contracts established.
* SAT navbar item removed from public navigation.
* Legacy SAT landing functionality retained for gradual migration.
* `src/data/sat/programConfig.js` created for central SAT program configuration.
* `src/data/sat/mockTests.js` created as the master registry for the original mock-test library.
* `src/data/sat/questionSchema.js` created as the canonical question contract.
* `src/lib/sat/attemptSchema.js` created as the canonical attempt structure.
* `src/pages/SATMocks/index.js` established as the authenticated SAT entry point.

The original registry was established for the initial 10-mock scope; the current product target has subsequently been expanded to 20 mocks and the registry/architecture must evolve without creating a parallel test system.

---

## 6. Authentication and verified-session milestone — COMPLETE

Completed and tested:

1. Student registration.
2. Password hashing.
3. Unverified account creation.
4. Verification-token creation and expiry.
5. Verification email through Resend.
6. Email verification.
7. Server-side rejection of unverified login.
8. Successful login after verification.
9. Server-side session creation.
10. HTTP-only `session` cookie.
11. SAT access through the verified server-side session.

**PASSED:** Unverified login rejection.

**PASSED:** Fresh registration and verification email delivery.

**PASSED:** Email verification.

**PASSED:** PostgreSQL verification state showed `email_verified = true`.

**PASSED:** Verified student accessed the SAT area through the server-side authenticated session.

**PASSED:** SAT access reported `verified-session`.

The old browser-readable `user` cookie is not the authoritative SAT authorization mechanism.

---

## 7. Registration/email verification implementation

Current registration route:

`src/pages/api/auth/register.js`

The implemented flow validates registration input, enforces the password rule, prevents duplicate registration, hashes passwords, creates SAT-prefixed users with `email_verified = false`, creates a hashed 24-hour verification token, sends verification email through Resend, checks provider errors, and uses the controlled Render URL for verification.

Current verification URL pattern:

`https://aprioriconsultants.onrender.com/VerifyEmail?token=...`

Confirmed Render web-service environment configuration includes:

* `RESEND_API_KEY`
* `EMAIL_FROM`

These remain server-side only.

---

# STEP 8 — SAT SERVER-SIDE PROTECTION — COMPLETED

Primary file:

`src/lib/sat/satAccess.js`

Implemented:

* Server-side session verification.
* Active-account check.
* Authenticated SAT access through `getVerifiedSatServerAccessState()`.
* Safe SAT return-path handling.
* SAT authentication based on the server-side session architecture.

The existing database and authentication dependencies remain server-side.

---

# STEP 9 — SAT ENTRY PAGE — COMPLETED

Primary file:

`src/pages/SATMocks/index.js`

The SAT entry page:

* uses `getServerSideProps`;
* checks the authenticated server session before granting SAT access;
* does not use the browser-readable `user` cookie for authorization;
* redirects unauthenticated users to `/Auth` with a safe SAT return path;
* was originally structured to distinguish Tests 1–2 from Premium Tests 3–10.

### Client/server dependency separation — COMPLETED AND DEPLOYED

Browser-safe helper:

`src/lib/sat/satLogin.js`

Current repository state confirms:

* `getVerifiedSatServerAccessState` is imported from `src/lib/sat/satAccess.js`;
* `getSatLoginUrl` is imported from `src/lib/sat/satLogin.js`;
* `satLogin.js` remains browser-safe and does not import PostgreSQL/database dependencies.

This keeps the login URL helper separate from the server-only SAT authentication/database dependency chain and prevents the PostgreSQL/Node dependency from being pulled into the browser bundle through the dashboard.

The earlier `Module not found: Can't resolve 'tls'` issue was caused by server-side PostgreSQL dependencies becoming reachable from the client bundle. That issue is **resolved**.

### Deployment status

The correction was committed and the subsequent Render deployment is **LIVE**.

The corrected dashboard code is now the repository state on `main`.

### Live verification status

**CONFIRMED BY USER:** Render deployment completed and is live.

Do not claim independent external browser verification from this session. Public-site verification remains a separate verification activity where explicitly requested.

---

## 10. Stage 3 implementation status — COMPLETE, PUBLIC VERIFICATION PENDING

The Stage 3 work is recorded as implementation-complete through the following three functional areas:

### Stage 3A — Adaptive/integrity foundation

* Adaptive testing foundation implemented.
* Integrity/security controls for the test flow implemented as part of the Stage 3 architecture.

### Stage 3B — Resumable/timed test experience

* Resumable test-taking experience implemented.
* Timed test experience implemented.
* The existing Stage 3 infrastructure is intended to be reused by every mock rather than rebuilt per mock.

### Stage 3C — Scoring/reporting

* Server-side scoring/reporting foundation implemented.
* Completion and reporting architecture are intended to remain shared across all mocks.

### Verification status

**Implementation complete; public-site verification pending.**

Do not mark Stage 3 as fully verified until the relevant public-site verification has actually been performed.

Do not restart Stage 3 unless an actual implementation defect is discovered during the relevant verification or later mock integration.

---

## 11. Current mock-test production architecture

The project will use one shared mock-test system/template to production quality.

The intended relationship is:

```text
                    Shared PSAT/SAT Mock Engine
                               │
          ┌────────────────────┼────────────────────┐
          │                    │                    │
        Mock 1               Mock 2              Mock 3 ...
          │                    │                    │
       Content              Content              Content
          │                    │                    │
          └────────────── Shared test flow ────────┘
                               │
                    Adaptive → Attempt → Resume
                               │
                       Scoring → Report
```

The same architecture continues through Mock 20.

Do not create 20 separate test engines or 20 parallel implementations.

The existing adaptive engine, persistence, timing, scoring and reporting work from Stage 3 must be reused rather than rebuilt.

---

## 12. Master mock-production process

Every mock must follow this production sequence:

**Blueprint → Content Generation → Originality QC → Structural QC → Adaptive Integration → Test-Taking QA → Server Scoring → Detailed Report → UI/UX → Mock Library Integration → Deployment → Documentation**

A mock is not complete merely because its questions exist.

A mock is complete only when the student can:

**Log in → launch → take the complete adaptive test → resume if interrupted → finish → receive server-generated results → view the detailed report.**

### MOCK STAGE 0 — Content & blueprint

Before writing the mock into the application:

1. Define the mock number.
2. Define its PSAT/SAT profile.
3. Define R&W skills/domains.
4. Define Math skills/domains.
5. Define difficulty distribution.
6. Define adaptive Module 2 routing requirements.
7. Define passage/question relationships.
8. Define graph/figure/table requirements.
9. Define answer-key requirements.
10. Define explanations and reporting metadata.
11. Assign unique question IDs.
12. Run originality/collision checks against all previous mocks.

Originality checks must be performed at the content-generation stage, not postponed until after deployment.

### MOCK STAGE 1 — Generate complete content

#### Reading & Writing

Each mock must contain:

* original passages;
* original questions;
* answer choices;
* correct answers;
* explanations;
* domain;
* skill;
* difficulty;
* module assignment;
* question metadata.

#### Math

Each mock must contain:

* original questions;
* answer choices where applicable;
* student-produced-response questions where required;
* correct answers;
* explanations;
* formulas/reference requirements;
* graphs;
* tables;
* figures;
* geometry diagrams;
* domain;
* skill;
* difficulty;
* module assignment.

Content must be original. Do not copy College Board, Magoosh, Kaplan, PrepScholar, Manhattan Prep, or other competitors' questions, passages, diagrams or assets.

### MOCK STAGE 2 — Content Quality Control

#### Structural QC

Check:

* correct number of questions;
* correct modules;
* valid question IDs;
* no duplicate IDs;
* valid answer keys;
* correct number of choices;
* no duplicate choices;
* valid difficulty metadata;
* valid skill/domain metadata;
* valid adaptive routing metadata;
* valid figure/asset references.

#### Originality QC

Compare the new mock against all previously completed mocks.

For R&W:

* no repeated passage;
* no repeated question;
* no near-duplicate question construction;
* no accidental reused text.

For Math:

* no repeated question;
* no disguised numerical substitution;
* no repeated mathematical construction where the structure is effectively identical;
* no reused figure data;
* no repeated graph/table construction where it amounts to the same question.

The QC becomes stricter as the library grows from Mock 1 through Mock 20.

Phase 2 demonstrated why this must be enforced at the generator/source level: changing numbers while retaining the same underlying mathematical construction is not sufficient originality.

### MOCK STAGE 3 — Connect to the shared adaptive engine

The mock content becomes an actual test through the existing Stage 3 architecture:

**Mock content → adaptive engine → attempt → persistent progress → scoring → report**

Do not create a separate engine for each mock.

### MOCK STAGE 4 — Student test-taking experience

Each mock must support the established Stage 3 experience, as applicable:

* login;
* test launch;
* instructions;
* R&W Module 1;
* adaptive R&W Module 2;
* Math Module 1;
* inter-section break;
* Math Module 2;
* server-authoritative timers;
* answer saving;
* question navigation;
* back/next/continue;
* mark for review;
* notes;
* calculator;
* reference information;
* zoom;
* resume;
* automatic expiry handling;
* completion.

Reuse the existing Stage 3 infrastructure.

### MOCK STAGE 5 — Server-authoritative scoring

After completion:

1. The server determines final answers.
2. The server calculates performance.
3. The server records the attempt.
4. The server records the adaptive route.
5. The server records section/module results.
6. The server generates detailed report data.

The browser must not be trusted to declare the final score or completion state.

### MOCK STAGE 6 — Detailed performance report

At minimum, each mock should provide:

#### Overall

* questions attempted;
* correct;
* incorrect;
* unanswered;
* accuracy.

#### R&W

* overall performance;
* Module 1;
* Module 2;
* domain performance;
* skill performance;
* difficulty performance.

#### Math

* overall performance;
* Module 1;
* Module 2;
* domain performance;
* skill performance;
* difficulty performance.

#### Adaptive information

* route taken;
* appropriate explanatory information.

#### Question review

* question-level performance;
* correct/incorrect/unanswered;
* relevant metadata.

Use the existing reporting infrastructure rather than creating a separate reporting system per mock.

### MOCK STAGE 7 — UI/UX polish

After the mock is functionally complete, polish its student experience for the current milestone.

Check:

* visual hierarchy;
* spacing;
* typography;
* question readability;
* mathematical notation;
* figures;
* graphs;
* tables;
* answer-choice presentation;
* buttons;
* timer;
* progress indicator;
* navigator;
* responsive behaviour;
* mobile layout;
* accessibility;
* error states;
* completion experience;
* report presentation.

UI/UX must continue progressively alongside feature development rather than being postponed until Mock 20.

### MOCK STAGE 8 — Mock Library integration

The mock becomes a proper entry in the SAT mock library.

Where backed by real functionality, cards may represent:

* Available;
* Not Started;
* In Progress;
* Completed;
* Continue Test;
* Review Results.

Do not display invented scores, progress or other placeholder performance data merely to make cards look complete.

For the current 20-mock development phase:

**Authenticated login → access to the available mocks.**

No Premium-lock presentation is required for this phase.

### MOCK STAGE 9 — Deployment and verification

Each meaningful mock batch gets a controlled deployment.

Verify:

#### Build

* production compilation;
* page generation;
* no server/client dependency errors;
* no missing imports;
* no static-generation errors.

#### Runtime

* mock launches;
* questions load;
* answers save;
* timer works;
* resume works;
* adaptive routing works;
* completion works;
* scoring works;
* report works.

#### Regression

Retest existing functionality only when the new mock could realistically affect it. Do not repeatedly retest the entire website after every mock.

### MOCK STAGE 10 — Documentation checkpoint

After each completed mock, update:

`docs/SAT-PROJECT-STATE.md`

Record:

* mock completed;
* content scope;
* content-generation method;
* QC/originality status;
* files added/modified;
* database changes, if any;
* adaptive integration;
* scoring/report integration;
* deployment status;
* testing status;
* known limitations;
* next mock.

---

## 13. Mock 1–20 production sequence

The approved production sequence is:

| Batch | Work |
| --- | --- |
| **Foundation** | Documentation/state update + define 20-mock architecture |
| **Mock 1** | Build completely through every required stage |
| **Mock 2** | Generate → QC → integrate → test → report |
| **Mock 3** | Same |
| **Mock 4** | Same |
| **Mock 5** | Same |
| **Mock 6** | Same |
| **Mock 7** | Same |
| **Mock 8** | Same |
| **Mock 9** | Same |
| **Mock 10** | Same + midpoint library QC |
| **Mock 11** | Same |
| **Mock 12** | Same |
| **Mock 13** | Same |
| **Mock 14** | Same |
| **Mock 15** | Same |
| **Mock 16** | Same |
| **Mock 17** | Same |
| **Mock 18** | Same |
| **Mock 19** | Same |
| **Mock 20** | Same + full library QC |

Do **not** generate all 20 blindly in one giant batch. Mock 1 must prove the production method first.

The key lesson from Phase 2 is:

**Build one mock → validate its content-generation model → validate its adaptive implementation → validate scoring/reporting → validate UI → deploy and verify → freeze the proven process → replicate.**

---

## 14. Current SAT student page

Primary page:

`src/pages/SATMocks/index.js`

For the current 20-mock development phase:

* authenticated students may access the available mocks;
* no Tests 3–10 premium lock should interfere with the mock-production work;
* the commercial subscription architecture remains reserved for its later milestone.

The dashboard is a functional and progressively styled foundation. It will continue to evolve as the student experience becomes more complete.

Do not begin the full test-taking implementation merely by clicking into mock cards as dashboard UI verification. Test-taking work should follow the approved Mock 1 production sequence.

---

## 15. Important current files

### Authentication

* `src/pages/api/auth/register.js`
* `src/pages/api/login.js`
* `src/lib/auth.js`
* `src/lib/db.js`

### SAT access

* `src/lib/sat/satAccess.js`
* `src/lib/sat/satLogin.js`
* `src/lib/sat/testAccess.js`
* `src/pages/api/sat/test-access.js`
* `src/pages/SATMocks/index.js`
* `src/styles/SATMocks.module.css`

### SAT architecture/data

* `docs/SAT-ARCHITECTURE.md`
* `docs/SAT-PROJECT-STATE.md`
* `src/data/sat/programConfig.js`
* `src/data/sat/mockTests.js`
* `src/data/sat/questionSchema.js`
* `src/lib/sat/attemptSchema.js`

### Database

Current SAT business tables:

* `subscriptions`
* `payments`
* `entitlements`
* `receipts`

Additional mock-generation and Stage 3 files must be identified from the current repository before modification; do not assume paths or recreate existing architecture from memory.

---

## 16. Completed implementation batches

### Batch 1 — Secure SAT session foundation

Completed:

* SAT authorization changed from the legacy browser-readable `user` cookie to the server-side `session` cookie.
* SAT session is verified against PostgreSQL.
* Active-account check added.
* SAT access confirmed as `verified-session`.

### Batch 2 — Subscription/payment database foundation

Completed:

* Confirmed `users.id` is PostgreSQL `bigint` / `int8`.
* Created `subscriptions`.
* Created `payments`.
* Created `entitlements`.
* Created `receipts`.
* Added relevant foreign keys and indexes.
* Migration completed successfully in pgAdmin.

### Batch 3 — Student test-access foundation

Completed:

* Created `src/pages/api/sat/test-access.js`.
* Created `src/lib/sat/testAccess.js`.
* Updated `src/lib/sat/satAccess.js` with `getSatUserId()`.
* Updated `src/pages/SATMocks/index.js`.
* Established the initial server-side Test 1–2 free / Tests 3–10 premium access architecture.
* Established the initial premium purchase path without requiring Tests 1–2 completion.

This commercial access architecture remains available for the later commercial phase; the current 20-mock development phase temporarily does not enforce the premium lock.

### Stage 3 — Adaptive / timed / resumable / scoring foundation

Completed:

* Stage 3A adaptive/integrity foundation.
* Stage 3B resumable/timed test experience.
* Stage 3C scoring/reporting foundation.

Status:

**Implementation complete; public-site verification pending.**

### Dashboard UI/UX work completed so far

Completed:

* Initial SAT dashboard and mock-test card presentation.
* Test grouping/presentation foundation.
* Narrower, centred CTA treatment.
* Responsive/mobile styling improvements.
* Shared dashboard styling work using the existing Apriori visual identity.
* Latest dashboard code deployed successfully to Render.

The dashboard must continue to be improved progressively as the real mock functionality is integrated.

---

## 17. Testing status

### Completed tests

* Email verification flow — PASSED.
* Unverified login rejection — PASSED.
* Verified database record — PASSED.
* Verified session authentication — PASSED.
* SAT access through verified server-side session — PASSED.
* `users.id` PostgreSQL type verification — PASSED.
* Subscription/payment database migration — PASSED.
* Client/server SAT login-helper dependency separation — CONFIRMED IN REPOSITORY.
* Corrected SAT dashboard deployment — CONFIRMED LIVE BY USER.

### Stage 3 verification

* Stage 3 implementation — COMPLETE.
* Public-site verification of the complete Stage 3 student flow — **PENDING**.

Do not claim the pending public-site verification has been completed.

### Future commercial access tests

These remain pending until the commercial subscription milestone is reactivated:

* Test 1 server-side access.
* Test 2 server-side access.
* Test 3 server-side rejection without entitlement.
* Test 3 server-side access with a controlled entitlement.
* Tests 4–10 premium enforcement.
* Premium purchase availability without completing Tests 1–2.

Do not confuse these future commercial access tests with the already-passed authentication/session tests or the current temporary 20-mock development access rule.

### Mock-production verification

For each mock, verification must follow the Mock Stage 9 checklist before the mock is marked complete.

---

## 18. Deployment status

The latest SAT dashboard changes are deployed to Render and the service is **LIVE**.

Controlled testing URL:

`https://aprioriconsultants.onrender.com/SATMocks`

Do not switch controlled testing to the custom domain unless explicitly instructed.

The previous SAT dashboard module-resolution/client-bundle issue is resolved.

Stage 3 implementation is complete, but its public-site verification remains pending.

---

## 19. GitHub write/access status

The connected GitHub integration can inspect the repository and should use the current file version before making changes.

When updating an existing file:

* avoid replacing newer work with an older version;
* do not delete unrelated code;
* use complete replacement content where a file replacement is required;
* do not use `...` or `same as above` placeholders in replacement files.

Every code change must identify:

* where the work is performed;
* exact file path;
* exact change;
* BEFORE + AFTER or complete replacement file where appropriate;
* exact commit message;
* expected Render result;
* exact testing URL.

---

# STAGED UI/UX DEVELOPMENT REQUIREMENT

UI/UX development must occur progressively alongside each major SAT feature. The final visual design must **not** be postponed until the end of the project.

Every working milestone should increasingly serve as a polished demonstration for students and clients.

### UI/UX must be developed in stages

This includes, as applicable:

* SAT entry/dashboard experience;
* mock-test cards;
* Free vs premium presentation when the commercial phase is active;
* locked/unlocked states when the commercial phase is active;
* subscription and purchase experience;
* payment status and confirmation;
* receipt presentation;
* student test instructions;
* test-taking interface;
* module navigation;
* timer and break experience;
* question display and answer selection;
* review and navigation controls;
* test completion;
* results and score presentation;
* progress tracking;
* completed/in-progress/not-started states;
* student account/session experience;
* error, loading and empty states;
* responsive/mobile presentation;
* administrative/master-facing interfaces where applicable.

### Mock-test cards

The current card presentation is a functional foundation and must not be treated as the final visual design.

Cards should progressively support, when backed by real functionality:

* Not started;
* Available;
* In progress;
* Completed;
* Premium/locked when the commercial phase is active;
* Premium/unlocked when the commercial phase is active.

Where applicable, cards should eventually provide:

* clear test number and title;
* R&W / Math identification;
* availability state;
* premium indication when applicable;
* Start / Continue / Review action;
* completion/progress information;
* score/result information when available;
* clear subscription CTA for locked premium tests when applicable;
* consistent visual hierarchy and responsive layout;
* professional graphics, icons and visual elements consistent with the Apriori Digital SAT experience.

Do not create misleading placeholder information merely to make cards appear complete.

### Feature-by-feature visual development rule

For every major feature:

1. Implement the underlying secure functionality.
2. Implement its basic usable UI.
3. Test the complete user flow.
4. Improve the visual presentation sufficiently for the current milestone/demo.
5. Continue refining the UI as additional functionality becomes available.

A backend/API/database milestone is not fully demonstrated merely because its underlying functionality works. Its relevant student-facing experience should also be usable and appropriately polished.

### Demo-readiness principle

The application should progressively move through:

**Functional foundation → Usable interface → Polished feature → Integrated student experience**

UI/UX work must not accumulate as one final end-stage task.

### Security and UI separation

UI state may communicate authentication, subscription, entitlement, progress and test status, but UI state is never authoritative for access decisions.

Server-side authentication, authorization, subscription, entitlement and payment verification remain authoritative.

The interface must reflect server-confirmed state without allowing client-side state, Redux, browser-readable cookies or client-supplied values to grant access.

---

## 20. Next development step

### STEP A — DOCUMENTATION/STATE UPDATE — COMPLETE

This documentation batch records:

* completed work through Stage 3C;
* Stage 3 status as **implementation complete; public-site verification pending**;
* the new target of **20 complete original PSAT/SAT-style mock tests**;
* the current temporary rule that all 20 mocks require authenticated login but no Test 3–10 subscription lock is enforced during this development phase;
* the shared one-engine architecture for Mocks 1–20;
* the approved Mock Stage 0–10 production standard;
* the Mock 1 proof-of-process requirement;
* the subsequent Mocks 2–20 production sequence.

### NEXT — STEP B

**Mock 1 blueprint and content architecture.**

Before modifying code for Step B:

1. Read `docs/SAT-PROJECT-STATE.md`.
2. Read `docs/SAT-ARCHITECTURE.md`.
3. Inspect the exact current repository files relevant to mock generation, question schemas, mock registry, adaptive routing and Stage 3 integration.
4. Determine what existing content-generation infrastructure can be reused and what must be extended for the 20-mock target.
5. Do not create a parallel mock engine or replace existing architecture without necessity.
6. Establish Mock 1's complete blueprint before generating its full content.

Do **not** restart registration, email verification, login, server-session work, database setup, or the resolved client/server dependency work.

Do **not** implement the payment gateway during the current 20-mock production phase unless a later planned step explicitly calls for it.

### Future production sequence

**Step A — Documentation/state update → Step B — Mock 1 blueprint/content architecture → Step C — Build Mock 1 completely → Step D — Deploy and verify Mock 1 → Step E — Freeze proven process → Step F — Produce Mocks 2–20 using the proven pipeline with originality checks against the entire library.**

---

## 21. Development safety rules

* Preserve existing non-SAT website functionality.
* Do not create duplicate authentication or backend infrastructure.
* Do not create a second PostgreSQL database.
* Do not delete unrelated code.
* Do not use placeholders such as `...` or `same as above` in replacement files.
* When replacing a file, provide the complete file.
* Explain file paths and where the work is performed in simple terms.
* Give an exact commit message for GitHub changes.
* Give expected Render behavior after deployment.
* Give the exact controlled testing URL.
* Do not claim a security property has been implemented unless the relevant server-side code actually enforces it.
* Do not treat frontend visibility as authorization.
* Do not allow a browser-readable cookie or Redux state to grant SAT access.
* Do not make subscription purchase dependent on completion of Tests 1–2 when the commercial phase is implemented.
* Do not overwrite newer code with an older version from a previous session.
* Do not generate all 20 mocks before Mock 1 proves the production process.
* Do not accept superficial numerical substitutions as mathematical originality.
* Do not copy competitor or College Board content or assets.
* Do not mark Stage 3 or a mock as fully verified without the relevant verification having actually occurred.

---

## 22. Session handoff rule

At the end of each development session, update this document with:

* date;
* day/step completed;
* files changed;
* database changes;
* tests performed and their results;
* Render deployment result;
* known problems;
* exact next step.

This document is intended to make session breaks safe and reduce the need for the user to remember or restate project history.
