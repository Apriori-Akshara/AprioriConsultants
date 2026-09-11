# Apriori Digital SAT / PSAT — Question & Quiz Content State

**Date:** September 11, 2026

## 1. Front-end milestone confirmed

The user has confirmed that the SAT platform front-end/application features are visible on the public website.

The user has also confirmed that production certificates are issued for both:

- `https://www.aprioriconsultants.org`
- `https://aprioriconsultants.org`

The public live website is the routine student verification environment. Render remains the deployment/infrastructure and diagnostic environment.

## 2. Current transition

The project is moving from:

**Dashboard/UI foundation**

into:

**Question bank → quizzes/drills → student test interface → attempts → scoring/results**

Do not rebuild the completed authentication, session, SAT access-control, subscription foundation, or dashboard UI.

## 3. Master content source of truth

All SAT questions, lessons, drills, exercises, quizzes, mock-test content and other learning content are governed by:

`docs/TEST-PREP-CONTENT-QUALITY-CONTROL.md`

The document also governs the future GRE and GMAT content programs.

External benchmark hierarchy is documented in:

`docs/TEST-PREP-CONTENT-STANDARDS.md`

Current SAT benchmark hierarchy:

- College Board / Bluebook → structure and presentation;
- OnePrep → primary R&W quality benchmark;
- Princeton Review → secondary R&W benchmark;
- Kaplan → primary Math quality benchmark;
- Barron's → secondary Math benchmark.

## 4. PSAT/SAT Mock program

The mock area is now conceptually **PSAT/SAT Mocks**.

Initial target:

- 10 PSAT/NMSQT-aligned mocks;
- 10 SAT mocks — Series A;
- 10 SAT mocks — Series B.

Total initial full-length mock inventory: **30 mocks**.

The detailed assembly blueprint is:

`docs/SAT-PSAT-DRILL-AND-MOCK-BLUEPRINT-2026-09-11.md`

The existing technical route may remain `/SATMocks` until a deliberate later UI/route change. Content IDs and data architecture must not depend on the visible route name.

## 5. Exercise/drill program

### Foundation

Every Foundation exercise/drill contains:

- 5 sets;
- 10 questions per set;
- 50 questions total;
- major difficulty jump after every set.

### Advanced

Every Advanced exercise/drill contains:

- 10 sets;
- 20 questions per set;
- 200 questions total;
- major difficulty jump after every set.

Difficulty progression uses controlled progression-band metadata while retaining Easy/Medium/Hard as the broad difficulty labels.

## 6. Timed and non-timed rules

### Timed drills

- use a hard timeout;
- timeout is based on the relevant product/section average time per question;
- time expires automatically and the activity is locked/submitted according to its execution rules;
- answers and elapsed time are recorded.

### Non-timed drills

- never time out;
- elapsed time is recorded from start to completion;
- pacing information can be shown afterward without penalizing the student for taking longer.

Current SAT timing baselines:

- Reading & Writing ≈ 71 seconds/question;
- Math ≈ 95 seconds/question.

For mixed activities, the timeout is calculated from the individual question's relevant section/product benchmark.

## 7. Calculator requirement

The PSAT/SAT Math experience must include an integrated calculator throughout Math, with question-level metadata indicating intended calculator use.

Scientific and graphing calculator capabilities must be supported without CAS functionality.

## 8. Canonical question contract

The existing SAT technical question schema remains:

`src/data/sat/questionSchema.js`

Important fields already include:

- `questionId`
- `testId`
- `section`
- `module`
- `domain`
- `skill`
- `conceptId`
- `difficulty`
- `questionType`
- `passageId`
- `prompt`
- `choices`
- `answer`
- `explanation`
- `estimatedTimeSeconds`
- `figure`
- `originalityFingerprint`
- `conceptFingerprint`
- `tags`
- `sourceType`
- `authoringStatus`
- `metadata`

The new content-governance layer must sit above this contract and must not create a parallel question schema unless a true product requirement later proves necessary.

## 9. Originality requirements

All Apriori content must be independently authored.

Do not copy or reproduce College Board, OnePrep, Princeton Review, Kaplan, Barron's, Magoosh, Manhattan Prep, GMAT Club or other competitors' questions, passages, explanations, answer choices, diagrams or proprietary assets.

Across PSAT/SAT mocks:

- no repeated R&W passage;
- no repeated R&W question;
- no repeated Math question;
- no trivial Math numerical substitutions presented as new questions;
- no near-duplicate diagrams or question framing;
- concepts and skills may repeat for proper coverage.

## 10. Lessons

SAT lessons are part of the SAT learning modules and must connect to the same content taxonomy.

Required learning sequence:

**Concept → Visual explanation → Worked example → Strategy → Guided practice → Independent practice → Error diagnosis → Transfer**

Use graphics, diagrams, data displays, annotations, animations and interactive demonstrations where they materially improve understanding.

## 11. Stage roadmap

### STAGE 1 — Question Bank Foundation and Validation Infrastructure

Build the central content-bank structure, controlled metadata/tags, validation/QC approach, progression-band model, assessment-family model, timed/non-timed metadata and content-to-lesson linkage without creating a parallel architecture.

### STAGE 2 — First demonstration content set

Author and validate the first demonstration-ready PSAT/SAT question set using the approved taxonomy and QC gates.

### STAGE 3 — Student test-taking interface

Build the student-facing test experience around the canonical question contract and secure attempt/session model.

### STAGE 4 — Attempt persistence and navigation

Implement answer selection, navigation, review marking, timing, autosave, persistence and submission.

### STAGE 5 — Scoring and results

Build result calculation and the student-facing review/results experience using real attempt data.

### STAGE 6 — Scale the question bank

Expand the validated bank across the full PSAT/SAT inventory while maintaining originality, adaptive coverage, progression and QC.

## 12. Current immediate resume point

**Next build step: STAGE 1 — Question Bank Foundation and Validation Infrastructure.**

Before coding Stage 1, inspect the current versions of:

- `src/data/sat/questionSchema.js`
- `src/data/sat/mockTests.js`
- `src/lib/sat/attemptSchema.js`
- `src/data/sat/programConfig.js`
- existing SAT Foundation/content files;
- current SAT test-access API/helpers.

Then extend the existing architecture rather than creating duplicate question or test systems.
