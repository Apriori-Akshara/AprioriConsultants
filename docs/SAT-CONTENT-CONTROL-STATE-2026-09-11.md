# Apriori Test-Prep — Content Control State

**Date:** September 11, 2026

## Current status

The user has confirmed that the SAT front-end/application features are visible on the public website and that production certificates are issued for both:

- `https://www.aprioriconsultants.org`
- `https://aprioriconsultants.org`

The public live site is the routine student verification environment. Render remains the deployment and infrastructure/diagnostic environment.

## Master content-quality source of truth

The single governing document for **all questions, lessons and learning content across SAT, GRE and GMAT** is now:

`docs/TEST-PREP-CONTENT-QUALITY-CONTROL.md`

It governs:

- content taxonomy;
- labels and tags;
- question types;
- difficulty and progression bands;
- exercise/drill construction;
- timed/non-timed rules;
- PSAT/SAT mock construction;
- graphics/charts/figures;
- calculator metadata;
- lesson quality;
- originality and anti-duplication;
- review/release gates;
- versioning and retirement;
- content changes that should not require architecture changes.

The external benchmark hierarchy remains documented separately in:

`docs/TEST-PREP-CONTENT-STANDARDS.md`

## PSAT/SAT mock program

The student-facing mock area is now conceptually **PSAT/SAT Mocks**.

Initial target:

- 10 PSAT/NMSQT-aligned mocks;
- 10 SAT mocks — Series A;
- 10 SAT mocks — Series B.

Total initial full-length mock inventory: **30 mocks**.

The detailed quantities and progression rules are in:

`docs/SAT-PSAT-DRILL-AND-MOCK-BLUEPRINT-2026-09-11.md`

The existing `/SATMocks` route and existing technical architecture are not being changed yet merely by this naming/content decision.

## Foundation exercise/drill rule

Every Foundation exercise or drill contains:

**5 sets × 10 questions = 50 questions**

Each set must increase materially in difficulty, with a major difficulty jump at each set boundary.

## Advanced exercise/drill rule

Every Advanced exercise or drill contains:

**10 sets × 20 questions = 200 questions**

Each set must increase materially in difficulty, with a major difficulty jump at each set boundary.

The master QC document uses progression-band metadata so this can be represented without replacing the existing Easy/Medium/Hard vocabulary.

## Timing rule

Timed exercises/drills use a hard timeout computed from the relevant product/section average time per question.

For SAT baseline timing:

- Reading & Writing ≈ 71 seconds per question;
- Math ≈ 95 seconds per question.

Non-timed exercises/drills never time out but always record elapsed time for pacing analytics.

Mixed activities calculate time using the relevant question's section/product benchmark rather than a single universal time.

## Calculator rule

PSAT/SAT Math learning, drills and mocks will include an integrated calculator throughout Math. Question metadata records whether scientific or graphing functionality is intended, optional or required.

The implementation must align with the current digital SAT Suite experience while avoiding CAS functionality that the SAT Suite does not permit.

## Lesson rule

SAT lessons remain part of the SAT learning modules and must follow the premium instructional sequence:

**Concept → Visual explanation → Worked example → Strategy → Guided practice → Independent practice → Error diagnosis → Transfer**

Visual explanations, graphs, diagrams, animation and interactive demonstrations should be used when they improve conceptual understanding rather than as decoration.

## Current implementation decision

Do not start mass question authoring until the master quality-control document and the PSAT/SAT blueprint are the governing content framework.

The next implementation milestone is:

**STAGE 1 — Question Bank Foundation and Validation Infrastructure**

Stage 1 must build on the existing SAT question schema and test architecture rather than creating a parallel system.
