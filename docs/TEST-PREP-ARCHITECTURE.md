# Apriori Test-Prep Platform — Cross-Product Architecture

**Created:** September 11, 2026

This document defines the cross-product architecture for Apriori's test-prep products. It complements `docs/SAT-ARCHITECTURE.md` and `docs/SAT-PROJECT-STATE.md`.

## 1. Product family

Apriori will support multiple distinct test-preparation products under one student account/session:

- SAT
- GRE
- GMAT

The shared account/session is an identity/authentication layer only. Product authorization, content, progress, attempts, subscriptions, and mock-test rules must remain product-specific.

A student may use the same login for all supported products without making SAT, GRE, and GMAT content interchangeable.

## 2. Product isolation

Each product must have its own route namespace, configuration namespace, content namespace, question/test namespace, progress namespace, and mock-test execution path.

Conceptually:

- `/SAT/...`
- `/GRE/...`
- `/GMAT/...`

The exact final route names may follow the existing Next.js conventions, but one product must never accidentally consume another product's questions, attempts, entitlements, progress records, or mock-test engine.

Shared authentication/session infrastructure may be reused.

## 3. Common course structure

SAT, GRE, and GMAT may share the high-level learning-product structure:

- Foundation
- Advanced
- student progress dashboard
- lessons/content
- assignments
- timed drills
- non-timed drills
- topic-wise exercises
- section-wise tests
- practice/mock tests

This is a product-level pattern, not a requirement that the underlying implementation be identical.

Each product may have its own subject domains, skills, difficulty model, question types, timing model, scoring, and test engine.

## 4. SAT Foundation

SAT Foundation is a standalone learning product that bridges preparation toward SAT mock-test readiness but is **not technically coupled to the SAT Mock Test engine**.

Its initial structure is:

- Verbal
- Math

Each major learning component must support three difficulty levels:

- Easy
- Medium
- Hard

The Foundation product may prepare students for the skills and concepts used later in SAT Mocks, but completion of Foundation content must not be a prerequisite for accessing SAT Mocks unless a future business rule explicitly states otherwise.

SAT Foundation and SAT Mocks use the same authenticated student identity/session but maintain separate product experiences, progress, and content state.

## 5. SAT Foundation progress dashboard

SAT Foundation must have its own student progress dashboard.

The dashboard should eventually show useful learning progress such as:

- Foundation overall completion;
- Verbal completion;
- Math completion;
- Easy/Medium/Hard progress;
- lessons completed;
- assignments completed;
- timed-drill activity;
- non-timed-drill activity;
- topic-wise exercise progress;
- section-test progress;
- practice-test progress;
- accuracy and attempt history where available;
- recommended next activities.

No leaderboard is required.

The Foundation dashboard must not be treated as the SAT Mock dashboard. Mock-test scores, adaptive paths, mock attempts, and mock entitlements belong to the SAT Mock product.

## 6. SAT Advanced

SAT Advanced will use the same broad course architecture as SAT Foundation but will contain higher-level instruction, strategy, practice, and difficulty.

Its implementation can be built alongside SAT Foundation and SAT Mocks while preserving product separation.

## 7. Reuse of legacy SAT questions and tests

The repository contains legacy SAT material and execution code, including:

- `src/data/questions.json`
- `src/data/tests.json`
- `src/pages/SATDiagnosticTest/`
- `components/SATTest/`

These assets are candidates for **repurposing into SAT Foundation content**, not automatic migration into the new SAT Mock Test question bank.

The legacy questions may be useful particularly for Foundation Easy content, with selected questions potentially suitable for Medium or Hard after review.

Before any legacy question is published in Foundation:

1. Audit the question for correctness and quality.
2. Classify its section, domain, skill, concept, and difficulty.
3. Remove or replace inappropriate/copy-derived material.
4. Add a Foundation-specific explanation where needed.
5. Assign it a new Foundation content ID.
6. Record its source as migrated legacy content for internal traceability.
7. Validate that it does not conflict with the originality/duplication rules of the new SAT Mock bank.

Legacy content must not be assumed to satisfy the new SAT Mock content-quality or originality requirements merely because it already exists in the repository.

The old SAT Mock execution code is a reference implementation only. It must not be directly connected to SAT Foundation cards and must not become the new SAT Mock architecture.

## 8. New SAT Mock content remains separate

The new SAT Mock architecture continues to use:

- `src/data/sat/mockTests.js`
- `src/data/sat/questionSchema.js`
- `src/lib/sat/attemptSchema.js`
- `src/lib/sat/satAccess.js`
- `src/lib/sat/testAccess.js`
- `src/pages/SATMocks/index.js`

The current Mock Test registry is configuration-only and explicitly states that question content will be added later. fileciteturn35file0

Foundation content must not be silently inserted into Mock Test question pools.

## 9. SAT Foundation content model

Foundation activity content should use a dedicated product/content model rather than overloading the new SAT Mock `testId` semantics.

A Foundation activity should eventually be classifiable by at least:

- product: `sat`
- course: `foundation`
- subject: `verbal` or `math`
- level: `easy`, `medium`, or `hard`
- activity type: `lesson`, `assignment`, `timed-drill`, `non-timed-drill`, `topic-exercise`, `section-test`, or `practice-test`
- topic/domain
- skill
- concept
- question/content ID
- explanation
- estimated time
- publication status

The exact storage implementation may evolve later.

## 10. GRE architecture

GRE should follow the SAT product pattern where the concepts are structurally compatible:

- shared authentication/session;
- separate product route namespace;
- Foundation and Advanced learning modules;
- standalone progress dashboard;
- dedicated question/content bank;
- dedicated mock-test configuration;
- dedicated adaptive mock-test engine.

SAT and GRE may share reusable architectural patterns and some infrastructure, but their content, scoring rules, question schemas, and product IDs must remain distinct.

## 11. GMAT architecture

GMAT will share the common account/session, dashboard, Foundation, Advanced, and course-module architecture.

Its mock-test engine must remain a separate future implementation because GMAT will use a materially different algorithm, test structure, and test-taking design from SAT/GRE.

Do not force GMAT into the SAT/GRE adaptive engine merely to maximize code reuse.

GMAT-specific mock architecture, algorithm, question model, timing, scoring, and reporting requirements must be documented before GMAT mock-test implementation begins.

## 12. Shared authentication, separate authorization

The shared student login identifies the student globally.

After authentication, product-specific server-side logic must determine access to:

- SAT Foundation;
- SAT Advanced;
- SAT Mocks;
- GRE Foundation;
- GRE Advanced;
- GRE Mocks;
- GMAT Foundation;
- GMAT Advanced;
- GMAT Mocks.

A generic logged-in state must never be treated as proof of entitlement to every product.

Product-specific subscriptions or entitlements may be introduced later according to the commercial model.

## 13. Concurrent development

SAT Foundation, SAT Advanced, and SAT Mocks should be developed in parallel where practical.

Parallel development must not produce duplicate authentication systems or shared state that erases product boundaries.

Each work stream should have:

- its own route/content namespace;
- its own progress state;
- its own question/test identifiers;
- its own product dashboard or dashboard section;
- its own execution rules where test behavior differs.

## 14. No leaderboard

Leaderboards are not part of the Foundation-course requirement and should not be introduced into the Foundation dashboard unless a future product decision explicitly adds them.

## 15. Migration principle

Existing functionality should be reused when it is genuinely useful and safe, but migration must be deliberate.

Do not directly reuse legacy SAT runtime state, legacy browser authorization, or legacy question identifiers in the new product engines.

Where legacy content is repurposed, create a controlled migration/classification process rather than moving the file wholesale.
