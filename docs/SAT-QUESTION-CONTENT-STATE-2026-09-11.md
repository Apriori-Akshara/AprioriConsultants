# Apriori Digital SAT — Question & Quiz Content State

**Date:** September 11, 2026

## 1. Front-end milestone confirmed

The user has confirmed that the SAT platform front-end features are now visible on the public website, including the current SAT student-facing dashboard/application experience.

This confirms the project has moved beyond the dashboard-only UI/UX milestone and can now progress into SAT question, quiz, and test-taking content implementation.

Public verification domain:

`https://www.aprioriconsultants.org`

Render remains the deployment/infrastructure target and diagnostic environment; it is not the routine student verification URL.

## 2. Current transition

The project is moving from:

**Dashboard/UI foundation**

into:

**Question bank → quiz/test engine → student test interface → attempts → scoring/results**

Do not rebuild the completed authentication, session, SAT access-control, subscription foundation, or dashboard UI.

## 3. Question-content requirements

All SAT question content must be original Apriori-authored material.

Do not copy or reproduce College Board, Magoosh, Kaplan, PrepScholar, Manhattan Prep, or other competitor questions, passages, diagrams, answer choices, explanations, or proprietary assets.

### Coverage requirements

Each mock test is planned for:

* Reading and Writing: 54 questions.
* Math: 44 questions.
* Total: 98 questions.

The existing master registry already models two modules per section and adaptive Module 2 pools. Question content must fit that architecture rather than creating a parallel test structure.

### Originality requirements

* No repeated Reading and Writing passage across the 10 tests.
* No repeated Reading and Writing question across the 10 tests.
* No repeated Math question across the 10 tests.
* Concepts and skills may repeat when needed for proper SAT coverage.
* Figures/graphs must be original structured content and should not depend on copied official/competitor graphics.

## 4. Canonical question contract

The canonical question structure remains:

`src/data/sat/questionSchema.js`

Important fields include:

* `questionId`
* `testId`
* `section`
* `module`
* `domain`
* `skill`
* `conceptId`
* `difficulty`
* `questionType`
* `passageId`
* `prompt`
* `choices`
* `answer`
* `explanation`
* `estimatedTimeSeconds`
* `figure`
* `originalityFingerprint`
* `conceptFingerprint`
* `tags`
* `sourceType`
* `authoringStatus`
* `metadata`

Multiple-choice questions require exactly four choices under the current structural validator.

## 5. Recommended build sequence from this point

### Q1 — Question-bank foundation

Create the central SAT content-bank structure and authoring/validation approach without yet pretending that a complete 10-test bank exists.

### Q2 — Test 1 content

Author and validate the first complete demonstration-ready content set for Mock Test 1, including both sections, both modules, adaptive Module 2 pools, explanations, and required figures/data displays.

### Q3 — Student test-taking interface

Build the actual `/SATMocks/Test1` experience around the canonical question contract and secure attempt/session model.

### Q4 — Attempt persistence and navigation

Implement answer selection, navigation, review marking, timing, autosave/persistence, and submission while keeping server-side authorization authoritative.

### Q5 — Scoring/results

Build result calculation and the student-facing review/results experience using real attempt data.

### Q6 onward — Expand the content bank

Extend the same validated structure across Tests 2–10 while maintaining originality and avoiding question duplication.

## 6. Important UI/UX rule for question work

Question content and the student-facing experience must be developed together.

Do not build a large raw question database and postpone the test interface until the end.

For each major test feature:

**Content model → usable student UI → validation/testing → polished demo experience → integration**

The eventual interface should support:

* SAT section/module context
* question display
* answer choices or student-produced response entry
* timer
* previous/next navigation
* mark for review
* question navigator
* module transitions
* submission
* clear loading/error/confirmation states
* responsive presentation

## 7. Current constraints

* Preserve the existing Next.js Pages Router architecture.
* Preserve server/client boundaries.
* Keep PostgreSQL/server-only code out of browser bundles.
* Do not create a second SAT backend or parallel question architecture.
* Do not create fake scores, fake completion states, or fake test results.
* Do not expose answer keys in client-side data before submission if the architecture can avoid it.
* Continue updating the project-state documentation after meaningful completed batches.

## 8. Immediate resume point

**Next build step: Q1 — Question-bank foundation and first original SAT question set.**

Before coding Q1, inspect the current repository versions of:

* `src/data/sat/questionSchema.js`
* `src/data/sat/mockTests.js`
* `src/lib/sat/attemptSchema.js`
* `src/data/sat/programConfig.js`
* any existing SAT foundation/content files
* the current SAT test-access API/helpers

Then extend the existing architecture rather than creating duplicate content/test systems.
