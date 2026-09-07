# Apriori Digital SAT Platform — Project State

**Last updated:** September 7, 2026

## 1. Purpose of this document

This is the current working status of the Apriori Digital SAT platform.

Use this document to resume development without relying on long copied prompts or memory from an earlier ChatGPT session.

**Rule:** Before continuing work, read this document and `docs/SAT-ARCHITECTURE.md`, then inspect the current repository. The actual repository/code/database state takes precedence if anything differs from this document.

## 2. Project overview

The Digital SAT platform is being built inside the existing Next.js/React/Redux Apriori Consultants website.

The production/test URL currently used for controlled testing is:

`https://aprioriconsultants.onrender.com`

Do **not** switch testing to the custom domain until explicitly instructed.

The platform will ultimately provide 10 original Digital SAT-style mock tests, authenticated student access, adaptive testing, detailed scoring/reporting, longitudinal analytics, personalized recommendations, and secure subscription access.

The existing public website must continue to work.

## 3. Permanent business rules

### Student registration and authentication

- Students can register.
- Student registration creates an unverified account initially.
- Email verification is required before student login is allowed.
- Verification is performed through a time-limited email verification link.
- Passwords are stored as secure hashes, never plaintext.
- Authentication/session handling must remain server-verifiable.
- Do not rely on a browser-readable user cookie or Redux state alone for authorization.

### Mock-test access

- After successful email verification, a student may access Mock Tests 1 and 2.
- Mock Tests 3–10 require an active subscription entitlement.
- A student may purchase the subscription **at any stage**:
  - before attempting Tests 1–2;
  - between Tests 1 and 2;
  - while working through the first two tests;
  - after completing Tests 1–2.
- Completion of Tests 1–2 must **never** be a prerequisite for purchasing the subscription.
- Authentication, email verification, test access, payment, subscription status, and entitlement are separate concepts and must not be collapsed into one status field.

### Payment and subscription

- Subscription purchase will use a proper payment gateway.
- A confirmed successful payment must automatically activate the student's subscription entitlement.
- A successful payment must generate a payment receipt/record.
- Payment status must be verified server-side; the client must not be able to grant entitlement merely by claiming payment success.
- Internal/admin users must be able to see registrations, payments, subscriptions, and entitlements and intervene when necessary.
- Payment/refund/failure/expiry handling must be designed explicitly when the payment gateway is implemented.

### Master/admin access

- The architecture allows exactly five independent master accounts.
- Master accounts are separate from student accounts.
- Master credentials must never be stored in source code, GitHub, frontend code, `NEXT_PUBLIC_*` variables, or plaintext in the database.
- Masters may manage students and appropriate operational records but must not view plaintext passwords or password hashes.
- Master accounts can be individually deactivated.

## 4. Current infrastructure

- GitHub repository: `Apriori-Akshara/AprioriConsultants`
- Branch: `main`
- Framework: Next.js 14.1.4, Pages Router
- React 18
- Redux/Redux Toolkit already exists
- PostgreSQL is the current SAT backend database
- Render web service: `AprioriConsultants`
- Render web service URL: `https://aprioriconsultants.onrender.com`
- Render build: `npm install; npm run build`
- Render start: `npm run start`
- Resend is used for verification email delivery.
- Current Resend package version in `package.json`: `^6.9.2`

Do not create a second unrelated Next.js backend, Express server, authentication system, or SAT repository unless a future architecture decision explicitly requires it.

## 5. Day 1 status — COMPLETE

Day 1 established the SAT architecture/data contracts and isolated SAT-specific functionality.

Completed Day 1 work includes:

- SAT navbar item removed from public navigation.
- Legacy SAT landing page temporarily redirected/hidden.
- `src/data/sat/programConfig.js` created for central SAT program configuration.
- `src/data/sat/mockTests.js` created as the master registry for Mock Tests 1–10.
- `src/data/sat/questionSchema.js` created as the canonical question contract.
- `src/lib/sat/attemptSchema.js` created as the canonical attempt structure.
- `src/pages/SATMocks/index.js` established as the future authenticated SAT entry point; during the early architecture stage it intentionally returned 404.

## 6. Day 2 status — IN PROGRESS

**Current milestone:** Step 25 — require email verification before login.

Steps 1–24 were completed before Step 25.

Step 24 connected student registration to email verification.

Step 25 added the server-side login restriction that rejects an otherwise valid password login when `email_verified` is false.

### Step 25 implementation

The current `src/pages/api/login.js` checks:

1. HTTP method.
2. User ID and password presence.
3. User lookup.
4. Password validity.
5. Optional name match.
6. `email_verified` status.
7. Login logging.
8. Session creation and HTTP-only session cookie.

For an unverified student, the expected response is:

`Please verify your email address before logging in. Check your email for the verification link.`

### Step 25 testing status

**PASSED:** An unverified student attempted login and received the expected verification-required message.

**PASSED:** A fresh student registration successfully received the verification email and completed verification.

**PASSED:** The verified student's PostgreSQL record was checked in pgAdmin and `email_verified = true` was confirmed.

**Remaining confirmation:** Confirm that the now-verified student can log in successfully and receives a valid authenticated session. If this has already been tested, record it as PASSED here at the end of the session.

## 7. Registration/email verification implementation

The current registration route is:

`src/pages/api/auth/register.js`

It currently:

- validates name, email and password;
- enforces a minimum password length of 8 characters;
- checks that `RESEND_API_KEY` exists;
- checks that `EMAIL_FROM` exists;
- prevents duplicate email registration;
- hashes the password;
- creates a SAT-prefixed user ID;
- creates the user with `email_verified = false`;
- creates a hashed email-verification token with a 24-hour expiry;
- sends the verification email through Resend;
- checks the Resend API response for an email error;
- returns an appropriate response if email delivery fails;
- uses the controlled Render URL for the verification link.

The verification link currently targets:

`https://aprioriconsultants.onrender.com/VerifyEmail?token=...`

### Resend environment configuration

The Render `AprioriConsultants` web service has been confirmed to contain:

- `RESEND_API_KEY`
- `EMAIL_FROM`

The Resend API key belongs on the **web service**, not the database service.

## 8. PostgreSQL status

The new SAT infrastructure uses PostgreSQL connected through `src/lib/db.js`.

The database connection is controlled through `DATABASE_URL` and SSL is configured in the existing database helper.

The database has been used successfully for authentication and verification testing.

A recent pgAdmin check returned `email_verified = true` for the freshly verified student.

Do not assume database credentials are available to the user; database access is being managed through the newly connected infrastructure/pgAdmin workflow already established in the project.

## 9. Important existing files

### Authentication

- `src/pages/api/auth/register.js`
- `src/pages/api/login.js`
- `src/lib/auth.js`
- `src/lib/db.js`

### SAT access

- `src/lib/sat/satAccess.js`
- `src/pages/SATMocks/index.js`

### SAT architecture/data

- `src/data/sat/programConfig.js`
- `src/data/sat/mockTests.js`
- `src/data/sat/questionSchema.js`
- `src/lib/sat/attemptSchema.js`

## 10. Deployment status

The current Render deployment for Step 25 is LIVE.

Historical failed deployments must not be treated as the current state.

In particular, an earlier deployment named `Add Resend email package` failed, but later deployments succeeded and are live. Do not roll back to that historical failed deployment.

Later successful milestones include:

- Fix verifyemail import paths
- Connect registration to email verification
- Require email verification before login

The manually applied registration-email error-handling fix should be retained as current work and must not be replaced by an older version of `register.js`.

## 11. GitHub write/access status

GitHub file inspection is available.

Earlier direct GitHub write attempts returned HTTP 403 (`Resource not accessible by integration`). Therefore, when a direct GitHub update is unavailable, provide the user with the **complete replacement file content** and exact manual GitHub instructions rather than asking them to reconstruct individual lines.

## 12. Next development step

After Step 25 is fully tested and its verified-login test is recorded, continue to the next unfinished Day 2 step from the original Day 2 roadmap.

Do not restart earlier steps merely because a new session has started.

Before implementing the next step:

1. Read this state document.
2. Read `docs/SAT-ARCHITECTURE.md`.
3. Inspect the current repository files relevant to the next step.
4. Check the live Render deployment status when deployment is relevant.
5. Check PostgreSQL state when database changes are relevant.
6. Make only the necessary changes.
7. Test the result.
8. Update this document at the end of the work.

## 13. Development safety rules

- Preserve existing non-SAT website functionality.
- Do not create duplicate authentication or backend infrastructure.
- Do not delete unrelated code.
- Do not use placeholders such as `...` or `same as above` in replacement files.
- When replacing a file, provide the complete file.
- Explain file paths and where the work is performed in simple terms.
- Give an exact commit message for GitHub changes.
- Give expected Render behavior after deployment.
- Give the exact controlled testing URL.
- Do not claim a security property has been implemented unless the relevant server-side code actually enforces it.

## 14. Session handoff rule

At the end of each development session, update this document with:

- date;
- day/step completed;
- files changed;
- database changes;
- tests performed and their results;
- Render deployment result;
- known problems;
- exact next step.

This document is intended to make session breaks safe and reduce the need for the user to remember or restate project history.
