# Apriori Digital SAT Platform — Project State

**Last updated:** September 7, 2026

## 1. Purpose of this document

This is the current working status of the Apriori Digital SAT platform.

Use this document to resume development without relying on long copied prompts or memory from an earlier ChatGPT session.

**Rule:** Before continuing work, read this document and `docs/SAT-ARCHITECTURE.md`, then inspect the current repository. The actual repository/code/database state takes precedence if anything differs from this document.

---

## 2. Project overview

The Digital SAT platform is being built inside the existing Next.js/React/Redux Apriori Consultants website.

The production/test URL currently used for controlled testing is:

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
* A student may purchase the subscription **at any stage**:

  * before attempting Tests 1–2;
  * between Tests 1 and 2;
  * while working through the first two tests;
  * after completing Tests 1–2.
* Completion of Tests 1–2 must **never** be a prerequisite for purchasing the subscription.
* Authentication, email verification, test access, payment, subscription status, and entitlement are separate concepts and must not be collapsed into one status field.

### Payment and subscription

* Subscription purchase will use a proper payment gateway.
* A confirmed successful payment must automatically activate the student's subscription entitlement.
* A successful payment must generate a payment receipt/record.
* Payment status must be verified server-side; the client must not be able to grant entitlement merely by claiming payment success.
* Internal/admin users must be able to see registrations, payments, subscriptions, and entitlements and intervene when necessary.
* Payment/refund/failure/expiry handling must be designed explicitly when the payment gateway is implemented.
* Duplicate/replayed gateway notifications must not create duplicate entitlement or receipt records.

### Master/admin access

* The architecture allows exactly five independent master accounts.
* Master accounts are separate from student accounts.
* Master credentials must never be stored in source code, GitHub, frontend code, `NEXT_PUBLIC_*` variables, or plaintext in the database.
* Masters may manage students and appropriate operational records but must not view plaintext passwords or password hashes.
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
* Current Resend package version in `package.json`: `^6.9.2`

Do not create a second unrelated Next.js backend, Express server, authentication system, or SAT repository unless a future architecture decision explicitly requires it.

---

## 5. Day 1 status — COMPLETE

Day 1 established the SAT architecture/data contracts and isolated SAT-specific functionality.

Completed Day 1 work includes:

* SAT navbar item removed from public navigation.
* Legacy SAT landing page temporarily redirected/hidden.
* `src/data/sat/programConfig.js` created for central SAT program configuration.
* `src/data/sat/mockTests.js` created as the master registry for Mock Tests 1–10.
* `src/data/sat/questionSchema.js` created as the canonical question contract.
* `src/lib/sat/attemptSchema.js` created as the canonical attempt structure.
* `src/pages/SATMocks/index.js` established as the future authenticated SAT entry point.

---

## 6. Day 2 status — IN PROGRESS

### Completed authentication milestone

The email-verification-before-login milestone is **COMPLETE**.

The following authentication flow has been implemented and tested:

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

### Authentication testing — PASSED

**PASSED:** An unverified student attempted login and received the expected verification-required message.

**PASSED:** A fresh student registration successfully received the verification email.

**PASSED:** Email verification was successfully completed.

**PASSED:** PostgreSQL showed `email_verified = true` for the verified student.

**PASSED:** The verified student successfully accessed the SAT area through the server-side authenticated session.

**PASSED:** SAT access reported `verified-session`.

The old browser-readable `user` cookie is no longer used as the authoritative SAT authorization mechanism.

---

## 7. Registration/email verification implementation

The current registration route is:

`src/pages/api/auth/register.js`

It currently:

* validates name, email and password;
* enforces a minimum password length of 8 characters;
* checks that `RESEND_API_KEY` exists;
* checks that `EMAIL_FROM` exists;
* prevents duplicate email registration;
* hashes the password;
* creates a SAT-prefixed user ID;
* creates the user with `email_verified = false`;
* creates a hashed email-verification token with a 24-hour expiry;
* sends the verification email through Resend;
* checks the Resend API response for an email error;
* returns an appropriate response if email delivery fails;
* uses the controlled Render URL for the verification link.

The verification link currently targets:

`https://aprioriconsultants.onrender.com/VerifyEmail?token=...`

### Resend environment configuration

The Render `AprioriConsultants` web service has been confirmed to contain:

* `RESEND_API_KEY`
* `EMAIL_FROM`

The Resend API key belongs on the **web service**, not the database service.

---

# STEP 8 — SAT SERVER-SIDE PROTECTION — COMPLETED

Updated:

`src/lib/sat/satAccess.js`

The SAT authentication architecture now uses the server-side PostgreSQL session represented to the browser by the HTTP-only `session` cookie.

The old browser-readable `user` cookie is NOT used as the authoritative SAT authentication mechanism.

Implemented:

* Server-side session verification.
* Active-account check.
* Authenticated SAT access through `getVerifiedSatServerAccessState()`.
* Safe SAT return-path validation.
* SAT login URL generation.
* Unauthenticated users are redirected toward `/Auth`.
* SAT authentication is based on the new session architecture.

The existing database and authentication files remain server-side.

---

# STEP 9 — SAT ENTRY PAGE — COMPLETED

Updated:

`src/pages/SATMocks/index.js`

The SAT entry page is protected using `getServerSideProps`.

The page now:

* checks the authenticated server session before granting SAT access;
* does not use the browser-readable `user` cookie for authorization;
* redirects unauthenticated users to `/Auth` with a safe SAT return path;
* allows authenticated users to reach the SAT mock-test area;
* distinguishes Tests 1–2 from Premium Tests 3–10.

### Additional client/server dependency fix completed

A new browser-safe helper was created:

`src/lib/sat/satLogin.js`

This separates the SAT login URL helper from the server-only SAT authentication/database dependency chain.

`src/pages/SATMocks/index.js` now imports:

`getVerifiedSatServerAccessState` from `satAccess.js`

and:

`getSatLoginUrl` from `satLogin.js`

This prevents the browser-side SAT page from unnecessarily pulling the PostgreSQL/Node `pg` dependency into the client bundle.

### Deployment status

The earlier Render build error:

`Module not found: Can't resolve 'tls'`

was caused by the server-side PostgreSQL dependency becoming reachable from the browser bundle.

The dependency separation was implemented and the subsequent Render deployment is **Live**.

### Current verification status

GitHub confirms that:

* `src/lib/sat/satLogin.js` exists and contains no server-side database imports;
* `src/pages/SATMocks/index.js` uses the new `satLogin.js` helper;
* `src/lib/sat/satAccess.js` continues to contain the server-side session protection.

The code change is therefore complete.

### PENDING — LIVE VERIFICATION

The code fix has been deployed, but the live `/SATMocks` authentication flow has **not yet been fully verified in the browser**.

This must be the **first task in the next session**.

Verify:

1. The live `/SATMocks` page loads without the previous `tls`/build problem.
2. A logged-out user is redirected to `/Auth`.
3. The SAT return path is preserved correctly.
4. An authenticated user can reach `/SATMocks`.
5. The server-side `session` remains the authoritative authentication mechanism.

**No further code change is required for this issue unless the live verification reveals a problem.**

### Resume point

**Next session: begin with LIVE VERIFICATION of `/SATMocks`.**

If the live verification passes, continue with the next unfinished authentication/subscription task beginning with **STEP 10 — LOGIN PAGE**.

Do not revisit the completed database/session setup or the resolved `tls` build problem unless a new error appears.

---

## 10. Current SAT student page

The SAT entry page is:

`src/pages/SATMocks/index.js`

It now uses the server-side session and presents the initial Test 1–10 structure.

Current intended access model:

* Tests 1–2 → available to the verified student.
* Tests 3–10 → shown as premium/subscription-required.
* Premium purchase is presented as an available path without requiring completion of Tests 1–2.

The current page is intentionally a functional foundation and **not yet the final visual SAT dashboard**.

The final SAT dashboard, test interface, graphics, question presentation, adaptive testing, scoring, reporting, and personalization will be built in later stages.

---

## 11. Important current files

### Authentication

* `src/pages/api/auth/register.js`
* `src/pages/api/login.js`
* `src/lib/auth.js`
* `src/lib/db.js`

### SAT access

* `src/lib/sat/satAccess.js`
* `src/lib/sat/testAccess.js`
* `src/pages/api/sat/test-access.js`
* `src/pages/SATMocks/index.js`

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

## 12. Work completed in the current session — September 7, 2026

The following work was completed after the verified-session milestone:

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

---

## 13. Testing status after today's work

### Completed tests

* Email verification flow — PASSED.
* Unverified login rejection — PASSED.
* Verified database record — PASSED.
* Verified session authentication — PASSED.
* SAT access through verified server-side session — PASSED.
* `users.id` PostgreSQL type verification — PASSED.
* Subscription/payment database migration — PASSED.

### Not yet tested

The following should be tested in the next development session after the current GitHub changes are deployed:

* Test 1 server-side access.
* Test 2 server-side access.
* Test 3 server-side rejection without entitlement.
* Test 3 server-side access with a controlled test entitlement.
* Tests 4–10 premium enforcement.
* Premium purchase availability without completing Tests 1–2.

Do not confuse these future access tests with the already-passed authentication/session tests.

---

## 14. Deployment status

The GitHub code changes for the current batch have been made.

The current Render deployment status after these latest changes has **not yet been confirmed in this session**.

Therefore, do not record the current deployment as LIVE until Render has completed the new deployment successfully.

Controlled testing URL remains:

`https://aprioriconsultants.onrender.com`

Do not switch testing to the custom domain.

---

## 15. GitHub write/access status

GitHub file inspection and file updates are available through the connected GitHub integration.

When updating an existing file, always use the current version of the file and avoid replacing newer work with an older version.

When a complete replacement file is required, provide the complete file without `...` placeholders.

Do not delete unrelated code.

---

## 16. Next development step

### NEXT SESSION — Resume here

Do **not** restart registration, email verification, login, or server-session work.

Do **not** repeat the already-passed verified-session test unless a later change breaks it.

First:

1. Read `docs/SAT-PROJECT-STATE.md`.
2. Read `docs/SAT-ARCHITECTURE.md`.
3. Inspect the current versions of:

   * `src/lib/sat/satAccess.js`
   * `src/lib/sat/testAccess.js`
   * `src/pages/api/sat/test-access.js`
   * `src/pages/SATMocks/index.js`
4. Confirm the latest GitHub changes are deployed successfully to Render.
5. Test the new server-side test-access endpoint.
6. Confirm:

   * authenticated student → Test 1 allowed;
   * authenticated student → Test 2 allowed;
   * authenticated student without entitlement → Test 3 blocked;
   * premium entitlement → Test 3 allowed.
7. Then continue building the **student subscription/purchase flow**, while keeping purchase available at any stage and without requiring completion of Tests 1–2.

### Do not implement the payment gateway yet unless the next planned step explicitly calls for it.

The next major architecture sequence remains:

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
