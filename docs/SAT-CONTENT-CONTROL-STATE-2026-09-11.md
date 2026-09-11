# Apriori Test-Prep — Content Control State

**Date:** September 11, 2026

## Current status

The user has confirmed that the SAT front-end/application features are visible on the public website and that production certificates are issued for both:

- `https://www.aprioriconsultants.org`
- `https://aprioriconsultants.org`

The public live site is the routine student verification environment. Render remains the deployment and infrastructure/diagnostic environment.

## Master content-quality source of truth

The single governing document for **all questions, lessons and learning content across SAT, GRE and GMAT** is:

`docs/TEST-PREP-CONTENT-QUALITY-CONTROL.md`

It governs content taxonomy, labels/tags, difficulty, exercise/drill construction, timing, mock construction, figures, calculator metadata, lesson quality, originality, review/release gates, versioning and content changes that do not require architecture changes.

External providers are benchmarks only. No College Board, competitor or third-party question, passage, answer choice, explanation or proprietary asset is copied into Apriori content.

## PSAT/SAT mock program

The student-facing mock area is conceptually **PSAT/SAT Mocks**.

Initial target:

- 10 PSAT/NMSQT-aligned mocks;
- 10 SAT mocks — Series A;
- 10 SAT mocks — Series B.

Total initial full-length mock inventory: **30 mocks**.

Foundation and Advanced exercise/drill creation is intentionally deferred until the mock-bank build specified below has reached the requested milestone.

## Mock difficulty revision rule — effective immediately and retrospectively

For the current PSAT/SAT mock-bank build, the quality standard is elevated above baseline assessment difficulty while preserving the exact style of current College Board Digital SAT/PSAT presentation, wording, question construction and answer-choice logic.

The rule is:

**College Board = structure, wording style, application style, domain taxonomy and answer-choice conventions. Apriori = one difficulty level higher for both Verbal and Quant.**

This rule applies **retrospectively** to already-authored mock questions in the current bank and **prospectively** to every new PSAT/SAT mock unless a later instruction explicitly changes the standard.

A standards revision must therefore trigger a content-bank QC pass over already-created material; it must not be applied only to future questions.

The elevation must come from stronger reasoning, more precise distractors, multi-step application, tighter evidence discrimination, subtler wording and higher cognitive demand—not from unnatural complexity or vocabulary/math tricks that would make the item unlike the SAT/PSAT.

## Current Stage 1 mock-content milestone

The first full-length content prototypes are now represented in the central SAT/PSAT content bank:

### PSAT Mock 01

- Assessment: `psat-nmsqt`
- Questions: **98**
- Reading & Writing: **54**
- Math: **44**
- Modules: 2 R&W + 2 Math
- Difficulty: elevated one level above baseline
- Calculator metadata: included throughout Math
- Original content: yes

### SAT Mock 01 — Series A

- Assessment: `sat-series-a`
- Questions: **98**
- Reading & Writing: **54**
- Math: **44**
- Modules: 2 R&W + 2 Math
- Difficulty: elevated one level above baseline
- Calculator metadata: included throughout Math
- Original content: yes

These two prototypes are Stage 1 content-bank assets. They are not yet the final student-facing adaptive implementation because the adaptive Module 2 route pools, test-taking UI, attempt persistence, scoring and results layers are separate later stages.

## Question-quality gate applied to the first two mocks

Each current question record includes:

- stable content/question ID;
- assessment family and variant;
- section/module;
- College Board-aligned domain/skill taxonomy;
- Easy/Medium/Hard-compatible difficulty metadata, with an elevated mock progression band;
- cognitive-demand metadata;
- question type and stimulus type;
- timed baseline estimate;
- calculator eligibility/mode for Math;
- answer and explanation;
- originality fingerprint;
- content status and release metadata.

The first quality pass also checks:

- exactly one defensible answer;
- four choices for multiple-choice items;
- non-empty explanations;
- no exact duplicate IDs;
- no repeated answer-key requirement in the schema itself;
- correct PSAT/SAT section and question counts;
- no copied external content.

## Known boundary of this Stage 1 content pass

The first two mocks are content-bank prototypes, not yet the final adaptive delivery forms. Before either is exposed as a production mock, the following must still be completed by the relevant later implementation stages:

- complete adaptive high/standard/low Module 2 pools;
- final domain-distribution calibration against the official blueprint;
- full figure/chart coverage and visual rendering validation;
- accessibility review of every visual item;
- student test-taking interface;
- attempt persistence and secure submission;
- scoring/reporting calibration;
- end-to-end mock assembly and release gates.

## Foundation exercise/drill rule

Every Foundation exercise or drill contains:

**5 sets × 10 questions = 50 questions**

Each set must increase materially in difficulty, with a major difficulty jump at each set boundary.

## Advanced exercise/drill rule

Every Advanced exercise or drill contains:

**10 sets × 20 questions = 200 questions**

Each set must increase materially in difficulty, with a major difficulty jump at each set boundary.

## Timing rule

Timed exercises/drills use a hard timeout computed from the relevant product/section average time per question.

For SAT/PSAT baseline timing:

- Reading & Writing ≈ 71 seconds per question;
- Math ≈ 95 seconds per question.

Non-timed exercises/drills never time out but always record elapsed time.

## Calculator rule

PSAT/SAT Math learning, drills and mocks will include an integrated calculator throughout Math. Question metadata records whether scientific or graphing functionality is intended, optional or required.

## Lesson rule

SAT lessons remain part of the SAT learning modules and follow:

**Concept → Visual explanation → Worked example → Strategy → Guided practice → Independent practice → Error diagnosis → Transfer**

Visual explanations, graphs, diagrams, animation and interactive demonstrations should be used when they improve conceptual understanding rather than as decoration.

## Current implementation state

**STAGE 1 — Question Bank Foundation and Validation Infrastructure is in progress.**

The first two full-length mock content sets are now established. The next Stage 1 work is validation/refinement of the mock-bank quality rules and then expansion to the remaining requested mock inventory before Foundation/Advanced content begins.
