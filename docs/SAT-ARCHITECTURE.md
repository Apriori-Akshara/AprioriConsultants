# Apriori Digital SAT Platform — Permanent Architecture

**Last updated:** September 7, 2026

This document contains the permanent architecture and business rules for the Apriori Digital SAT platform. It should not be confused with `docs/SAT-PROJECT-STATE.md`, which records current implementation progress.

## 1. Architectural principle

The SAT platform is being built inside the existing Apriori Consultants Next.js application.

The existing repository, current code, and database are the source of truth for implementation.

Do not create a second unrelated SAT application, Express backend, authentication system, database architecture, or repository.

Preserve unrelated existing website functionality.

SAT-specific functionality should remain isolated where practical.

## 2. Current technology architecture

- Next.js 14.1.4
- Pages Router
- React 18
- Redux/Redux Toolkit for UI/application state where appropriate
- PostgreSQL for persistent SAT/authentication data
- Next.js API routes for server-side backend functionality
- Render for deployment
- Resend for transactional email verification

The current controlled deployment/test URL is:

`https://aprioriconsultants.onrender.com`

The custom domain must not be used for controlled testing until explicitly approved.

## 3. Authentication architecture

Authentication is separate from SAT test authorization.

Student registration:

1. Student submits name, email and password.
2. Server validates input.
3. Server hashes the password.
4. Server creates the student with `email_verified = false`.
5. Server creates a hashed, time-limited email verification token.
6. Server sends the verification email through Resend.
7. Student clicks the verification link.
8. Server verifies the token and marks the account as verified.
9. Only after verification may the student log in.

Passwords must never be stored or exposed in plaintext.

Server-side session state is authoritative for authenticated access.

HTTP-only session cookies should be used for the secure session mechanism.

A browser-readable legacy `user` cookie or Redux state must never be treated as sufficient authorization for premium SAT content.

## 4. Email verification architecture

Email verification is its own security state.

The database must retain an explicit verification state, currently represented by `users.email_verified`.

Verification tokens must be stored as hashes rather than plaintext tokens.

Tokens must have an expiry.

The current registration flow uses a 24-hour verification-token expiry.

Resend configuration is server-side only:

- `RESEND_API_KEY`
- `EMAIL_FROM`

These must not be exposed through `NEXT_PUBLIC_*` variables or committed to GitHub.

The registration API must check the Resend response and must not silently claim successful verification-email delivery when the provider reports an error.

## 5. SAT access-control architecture

Authentication, email verification, test access, payment, subscription, and entitlement are separate concepts.

They must not be reduced to one overloaded status flag.

A student's SAT access should be evaluated server-side using the authenticated session and the relevant database/business state.

### Access rules

**Unverified student:**

- Cannot log in.
- Therefore cannot access authenticated SAT content.

**Verified student without subscription:**

- Can log in.
- Can access Mock Tests 1 and 2.
- Cannot access Mock Tests 3–10 unless entitlement is active.
- Can purchase the subscription immediately.

**Verified student with active subscription entitlement:**

- Can access Mock Tests 1–10, subject to any additional test-specific rules that are explicitly implemented later.

## 6. Critical subscription rule

Subscription purchase is **never gated by completion of Mock Tests 1–2**.

A verified student may purchase at any stage:

- before attempting Test 1;
- before attempting Test 2;
- between Tests 1 and 2;
- while attempting the first two tests;
- after completing Tests 1–2.

Do not implement a rule such as `completedTests >= 2` as a prerequisite for purchase.

The purchase flow must depend on eligibility to purchase, not on completion of free tests.

## 7. Payment architecture

Payment is a separate system from entitlement.

The eventual payment gateway integration must follow this general sequence:

1. Authenticated student chooses the subscription.
2. Server creates/initiates a payment order with the payment gateway.
3. Student completes payment at the gateway.
4. Gateway/server verification confirms the payment.
5. Server records the confirmed payment.
6. Server activates or creates the student's subscription entitlement.
7. Server records/generates the payment receipt.
8. Student can immediately access the newly entitled tests.

The browser must never be trusted to activate entitlement merely because it reports payment success.

Payment gateway confirmation/webhook verification must be performed server-side.

Payment records should retain enough information for operational reconciliation without unnecessarily storing sensitive payment credentials or card data.

The design must explicitly support at least:

- successful payment;
- failed payment;
- cancelled payment;
- duplicate/replayed gateway notifications;
- refund where applicable;
- subscription expiry where applicable;
- administrative intervention.

## 8. Subscription and entitlement architecture

Subscription and entitlement should be represented as explicit server-side concepts.

A payment is evidence of a financial transaction.

A subscription represents the student's subscription state/period.

An entitlement represents the student's actual authorization to access the premium mock tests.

These must remain distinguishable so that an administrator can investigate and correct discrepancies without corrupting payment history.

A confirmed payment should automatically create/update the appropriate entitlement according to the subscription rules.

Entitlement checks must be performed server-side before premium content is released.

## 9. Receipt architecture

A successful confirmed payment must produce a persistent payment receipt/record.

The receipt should be tied to:

- student/user;
- payment transaction/order;
- amount/currency;
- payment status;
- subscription/entitlement where applicable;
- transaction date/time;
- gateway reference where appropriate.

The receipt system should not expose secrets or sensitive payment credentials.

## 10. Master/admin architecture

The platform supports exactly five independent master accounts.

Rules:

- Maximum five master accounts.
- Master accounts are separate from student accounts.
- Each master has independent credentials.
- Master IDs must be unpredictable.
- Passwords are stored only as secure hashes.
- Master credentials must never appear in source code, GitHub, frontend code, or `NEXT_PUBLIC_*` variables.
- A server-side bootstrap mechanism may provision masters once using a server-only `MASTER_BOOTSTRAP_SECRET`.
- Masters can be individually deactivated.
- Masters must not be able to view plaintext passwords or password hashes through normal administration screens/API responses.

Master/admin authorization must be based on the authenticated server-side session and server-side role, not client-supplied role values.

## 11. Master management capabilities

Master-only administration should eventually support appropriate operational functions such as:

- view student registrations;
- view student account status;
- activate/deactivate students;
- initiate secure password-reset/change mechanisms;
- view payment records;
- view subscription status;
- view entitlement status;
- review receipt/payment information;
- intervene when a payment or entitlement requires correction;
- manage appropriate test/program operational data.

Administration must not expose passwords or password hashes.

Creation of additional master accounts beyond the maximum of five must be blocked server-side.

## 12. Database architecture

PostgreSQL is the persistent source for authentication and SAT transactional state.

The architecture should keep distinct entities for at least the following concepts as implementation progresses:

- users
- sessions
- email verification tokens
- login logs
- subscriptions
- payments
- entitlements
- receipts
- test attempts/results

Exact table design may evolve, but the business separation between these concepts must be preserved.

Database migrations should be idempotent where practical and should be safe to run against the intended SAT database.

## 13. SAT test architecture

The program consists of 10 original Digital SAT-style mock tests.

The current architecture uses:

- `src/data/sat/programConfig.js`
- `src/data/sat/mockTests.js`
- `src/data/sat/questionSchema.js`
- `src/lib/sat/attemptSchema.js`
- `src/lib/sat/satAccess.js`
- `src/pages/SATMocks/index.js`

The SAT should use a centralized configuration rather than scattering test rules across React components.

## 14. Digital SAT structure

Reading & Writing:

- 54 questions
- 64 minutes
- two 32-minute modules

Math:

- 44 questions
- 70 minutes
- two 35-minute modules

Break:

- 10 minutes between Reading & Writing and Math

Total:

- 98 questions

The platform models multistage adaptive testing at the module level, not question-by-question adaptation.

## 15. Adaptive architecture

Reading & Writing and Math adapt independently.

Conceptually:

Module 1 → provisional ability estimate → route → Module 2

Expected Module 2 routes:

- high
- standard
- low

Exact thresholds and scoring calculations must be centralized and calibrated later.

The platform must not claim to reproduce College Board's proprietary scoring algorithm.

Student-facing scores should be clearly described as estimates unless a separately validated scoring methodology is established.

## 16. Content architecture

Reading & Writing domains:

- Information and Ideas
- Craft and Structure
- Expression of Ideas
- Standard English Conventions

Math domains:

- Algebra
- Advanced Math
- Problem-Solving and Data Analysis
- Geometry and Trigonometry

Questions should use the canonical schema and support metadata such as:

- question ID
- test ID
- section
- module
- domain
- skill
- concept ID
- difficulty
- question type
- passage ID
- prompt
- choices
- answer
- explanation
- estimated time
- operational status
- figure
- originality fingerprint
- concept fingerprint
- metadata

## 17. Content originality and anti-duplication

All Apriori SAT content must be original.

Public SAT specifications may be used as structural references.

Do not copy College Board or competitor:

- questions;
- passages;
- explanations;
- diagrams;
- answer choices;
- branding;
- proprietary visual designs.

Across all ten tests:

Reading & Writing must avoid repeated passages, passage pairs, questions, near-duplicate questions, and trivial wording modifications.

Math must avoid repeated questions, trivial numerical substitutions, repeated diagrams, and near-duplicate framing.

Underlying skills and concepts may repeat.

The content system should eventually support exact and near-duplicate detection using fingerprints/validation.

## 18. Figures and math reference

SAT figures should use structured SVG/data-driven rendering rather than copied image assets where practical.

Supported figure types include:

- scatterplots
- line graphs
- bar charts
- histograms
- tables
- box plots
- coordinate planes
- number lines
- triangles
- right triangles
- circles
- polygons
- composite geometry
- angle diagrams
- quadratic graphs
- transformations

Figures should be accessible and use readable labels.

The Math experience should provide an original/paraphrased instruction sequence and an accessible Math reference experience.

Do not copy official wording verbatim.

## 19. Student dashboard and reporting

The eventual student dashboard should include useful progress information such as:

- student name;
- target score;
- current estimated score;
- gap to target;
- latest score;
- score trend;
- Reading & Writing trend;
- Math trend;
- domain performance;
- difficulty performance;
- timing performance;
- tests completed;
- questions attempted;
- accuracy;
- streak;
- 10-day challenge progress;
- recommended study priorities;
- mistake-review access.

Detailed reports should eventually include:

- estimated total score;
- estimated Reading & Writing score;
- estimated Math score;
- estimated score range;
- adaptive path;
- domain analysis;
- skill analysis;
- difficulty analysis;
- timing analysis;
- question-by-question review;
- likely error classification;
- personalized recommendations;
- target-score analysis;
- test-history comparison.

## 20. Route and authorization architecture

The future SAT dashboard/test routes must use server-side access checks.

Unauthenticated users should be redirected to the authentication experience with a safe return path where appropriate.

Inactive users must be denied access.

Premium test routes must check entitlement server-side.

Do not expose premium question content to the browser before authorization has been established.

Do not rely solely on hiding links/buttons.

## 21. Existing legacy SAT implementation

Legacy SAT functionality exists under areas including:

- `src/pages/SATDiagnosticTest/`
- `components/SATTest/`
- `src/data/questions.json`
- `src/data/tests.json`

Legacy functionality should be migrated/replaced gradually.

Do not delete legacy functionality simply to make a new route work. Remove or replace it only after imports, dependencies, routes, and the replacement behavior have been verified.

## 22. Development sequence

Original high-level sequence:

Day 1 — SAT architecture and data contracts

Day 2 — Secure authentication/access control

Day 3 — Student dashboard

Day 4 — Digital SAT test-taking interface

Day 5 — Multistage adaptive engine

Day 6 — Question architecture, SVG figures and anti-duplication validation

Day 7 — Scoring and detailed score reporting

Day 8 — Mock Tests 1–3

Day 9 — Mock Tests 4–7 and longitudinal personalization

Day 10 — Mock Tests 8–10, production QA and hardening

This sequence can be refined as implementation reveals dependencies, but permanent business rules in this document must not be silently weakened.

## 23. Security rules

Never commit:

- database passwords;
- Resend API keys;
- payment gateway secrets;
- master bootstrap secrets;
- master passwords;
- student plaintext passwords;
- private API credentials;
- production secrets.

Server-only secrets must not use `NEXT_PUBLIC_*` variables.

Never trust client-supplied:

- user ID for authorization;
- role;
- subscription state;
- entitlement state;
- payment success state;
- completed-test state.

The server must derive authoritative values from the authenticated session, database, and verified payment gateway responses.

## 24. Change-management rules

Before changing code:

1. Inspect the current repository.
2. Read `docs/SAT-PROJECT-STATE.md`.
3. Read this architecture document.
4. Inspect the exact files involved.
5. Preserve completed work.
6. Change only what is required.
7. Test the change.
8. Record the result in the project-state document.

When a file is replaced, the complete replacement file must be available; do not provide fragments such as `...` or “same as above”.

Do not repeat already completed setup steps unless a test proves they are broken.

## 25. Session-resumption rule

At the beginning of a new session, the assistant should first inspect:

1. `docs/SAT-PROJECT-STATE.md`
2. `docs/SAT-ARCHITECTURE.md`
3. the current repository state relevant to the next task

The state document tells the assistant **where the project currently is**.

This architecture document tells the assistant **what the system must remain**.

The repository/code/database state takes precedence if these documents are stale.

At the end of a session, update `docs/SAT-PROJECT-STATE.md` with the completed work, tests, deployment/database status, problems, and exact next step.
