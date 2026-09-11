# Apriori Digital SAT Platform — Project State

**Last updated:** September 11, 2026

## 1. Purpose of this document

This is the current working status of the Apriori Digital SAT platform.

Use this document to resume development without relying on long copied prompts or memory from an earlier ChatGPT session.

**Rule:** Before continuing work, read this document and `docs/SAT-ARCHITECTURE.md`, then inspect the current repository. The actual repository/code/database state takes precedence if anything differs from this document.

---

## 2. Project overview

The Digital SAT platform is being built inside the existing Next.js/React/Redux Apriori Consultants website.

The controlled testing URL is:

`https://aprioriconsultants.onrender.com`

Do **not** switch testing to the custom domain until explicitly instructed.

The platform will ultimately provide 10 original Digital SAT-style mock tests, authenticated student access, adaptive testing, detailed scoring/reporting, longitudinal analytics, personalized recommendations, and secure subscription access.

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

### Mock-test access

* After successful email verification, a student may access Mock Tests 1 and 2.
* Mock Tests 3–10 require an active subscription entitlement.
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
* `src/data/sat/mockTests.js` created as the master registry for Mock Tests 1–10.
* `src/data/sat/questionSchema.js` created as the canonical question contract.
* `src/lib/sat/attemptSchema.js` created as the canonical attempt structure.
* `src/pages/SATMocks/index.js` established as the authenticated SAT entry point.

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
* distinguishes Tests 1–2 from Premium Tests 3–10.

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

Do not claim independent external browser verification from this session. Future UI work should continue from the actual deployed dashboard state and user testing where required.

### Current resume point

Do **not** repeat authentication, database setup, subscription architecture foundation, or the resolved client/server import issue.

The project is now at the **post-deployment / 10M progressive dashboard UI/UX stage**.

---

## 10. Current SAT student page

Primary page:

`src/pages/SATMocks/index.js`

Current intended access model:

* Tests 1–2 → available to verified students.
* Tests 3–10 → premium/subscription-required unless a valid entitlement exists.
* Premium purchase remains conceptually available without requiring completion of Tests 1–2.

The current dashboard is a functional and progressively styled foundation, not the final student dashboard.

Do not begin the test-taking interface merely by clicking into Tests 1–10 as part of dashboard UI verification. Test-taking functionality is a later milestone.

---

## 11. Important current files

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

---

## 12. Completed implementation batches

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
* Established server-side Test 1–2 free / Tests 3–10 premium access logic.
* Established the initial premium purchase path without requiring Tests 1–2 completion.

### Dashboard UI/UX work completed so far

Completed:

* Initial SAT dashboard and 10-test card presentation.
* Tests 1–2 and Tests 3–10 visual grouping.
* Premium/locked presentation foundation.
* Narrower, centred CTA treatment.
* Responsive/mobile styling improvements.
* Shared dashboard styling work using the existing Apriori visual identity.
* The latest dashboard code was deployed successfully to Render.

The next UI/UX work must inspect the exact current files first and build on this state rather than recreating the dashboard.

---

## 13. Testing status

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

### Still pending when the relevant milestone is reached

* Test 1 server-side access.
* Test 2 server-side access.
* Test 3 server-side rejection without entitlement.
* Test 3 server-side access with a controlled entitlement.
* Tests 4–10 premium enforcement.
* Premium purchase availability without completing Tests 1–2.

Do not confuse these future access tests with the already-passed authentication/session tests.

---

## 14. Deployment status

The latest SAT dashboard changes are deployed to Render and the service is **LIVE**.

Controlled testing URL:

`https://aprioriconsultants.onrender.com/SATMocks`

Do not switch controlled testing to the custom domain unless explicitly instructed.

The previous SAT dashboard module-resolution/client-bundle issue is resolved.

---

## 15. GitHub write/access status

The connected GitHub integration can inspect the repository and should use the current file version before making changes.

When updating an existing file:

* avoid replacing newer work with an older version;
* do not delete unrelated code;
* use complete replacement content where a file replacement is required;
* do not use `...` or `same as above` placeholders in replacement files.

---

# STAGED UI/UX DEVELOPMENT REQUIREMENT

UI/UX development must occur progressively alongside each major SAT feature. The final visual design must **not** be postponed until the end of the project.

Every working milestone should increasingly serve as a polished demonstration for students and clients.

### UI/UX must be developed in stages

This includes, as applicable:

* SAT entry/dashboard experience
* 10 mock-test cards
* Free vs premium presentation
* Locked/unlocked states
* Subscription and purchase experience
* Payment status and confirmation
* Receipt presentation
* Student test instructions
* Test-taking interface
* Module navigation
* Timer and break experience
* Question display and answer selection
* Review and navigation controls
* Test completion
* Results and score presentation
* Progress tracking
* Completed/in-progress/not-started states
* Student account/session experience
* Error, loading and empty states
* Responsive/mobile presentation
* Administrative/master-facing interfaces where applicable

### 10 Mock-Test Cards

The current 10-card presentation is a functional foundation and must not be treated as the final visual design.

Cards should progressively support, when backed by real functionality:

* Not started
* Available
* In progress
* Completed
* Premium/locked
* Premium/unlocked

Where applicable, cards should eventually provide:

* Clear test number and title
* R&W / Math identification
* Availability state
* Premium indication
* Start / Continue / Review action
* Completion/progress information
* Score/result information when available
* Clear subscription CTA for locked premium tests
* Consistent visual hierarchy and responsive layout
* Professional graphics, icons and visual elements consistent with the Apriori Digital SAT experience

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

## 16. Next development step

### NEXT SESSION — Resume here

**Current resume point: post-deployment 10M dashboard UI/UX milestone.**

Before making the next UI/UX change:

1. Read `docs/SAT-PROJECT-STATE.md`.
2. Read `docs/SAT-ARCHITECTURE.md`.
3. Inspect the exact current versions of the dashboard files relevant to the requested change, especially:
   * `src/pages/SATMocks/index.js`
   * `src/styles/SATMocks.module.css`
   * any SAT access helper directly affected by the change.
4. Preserve the current server-side session and entitlement architecture.
5. Continue from the current dashboard rather than rebuilding earlier stages.

Do **not** restart registration, email verification, login, server-session work, database setup, or the resolved client/server dependency work.

Do **not** implement the payment gateway unless a later planned step explicitly calls for it.

The immediate next work will be based on the user's next set of requested changes for the SAT dashboard/UI/UX. Inspect first, then make only the changes required.

Future secure feature sequence remains:

**Student authentication → Test access control → Subscription purchase → Payment gateway → Server-side payment confirmation → Entitlement activation → Receipt → Premium Tests 3–10**

---

## 17. Development safety rules

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
* Do not allow a browser-readable cookie or Redux state to grant premium SAT access.
* Do not make subscription purchase dependent on completion of Tests 1–2.
* Do not overwrite newer code with an older version from a previous session.

---

## 18. Session handoff rule

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
