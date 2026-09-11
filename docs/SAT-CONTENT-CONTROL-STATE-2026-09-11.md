# Apriori Digital SAT — Content Control State

**Date:** September 11, 2026

## Current status

The user has confirmed that the SAT front-end/application features are visible on the public website and that the production certificate has now been issued for both:

- `https://www.aprioriconsultants.org`
- `https://aprioriconsultants.org`

The public live site is the routine student verification environment. Render remains the deployment and infrastructure/diagnostic environment.

## Content-governance documents now established

### Primary SAT content-quality source of truth

`docs/SAT-QUESTION-AND-LESSON-QUALITY-CONTROL.md`

This document governs:

- SAT question-bank taxonomy;
- controlled labels and tags;
- difficulty classification;
- R&W and Math coverage;
- question types;
- graphics/charts/figures;
- calculator metadata;
- originality and anti-duplication controls;
- test assembly controls;
- release status;
- question versioning;
- lesson quality;
- visual teaching requirements;
- quality-control gates;
- content changes that must not require architecture changes.

### Cross-product content benchmark document

`docs/TEST-PREP-CONTENT-STANDARDS.md`

SAT is the active priority. This document records the benchmark hierarchy:

- College Board/Bluebook for SAT structure and presentation;
- OnePrep + Princeton Review for SAT Reading & Writing quality;
- Kaplan + Barron's for SAT Math quality;
- ETS/POWERPREP + Magoosh for future GRE benchmarking only;
- GMAT Official + Manhattan Prep + GMAT Club for future GMAT benchmarking only.

No GRE or GMAT implementation is authorized by that document.

## Important content decision

There is no single external SAT bank that should simply be imported into Apriori.

The current external landscape includes:

- College Board's official Student Question Bank with thousands of official questions and filtering by assessment, section, domain, skill and difficulty;
- OnePrep's current SAT question bank with 4,000+ questions across Reading & Writing and Math skills.

Apriori will therefore build its own larger original bank using these sources as quality/coverage benchmarks rather than copying their material.

## Question-bank implementation principle

The existing technical question contract remains:

`src/data/sat/questionSchema.js`

The existing test registry remains:

`src/data/sat/mockTests.js`

The new content-quality standard must sit above these implementation contracts. Normal changes such as difficulty, tags, explanation, figures, calculator preference, skill classification, or publication state must be data/content changes and must not require rebuilding the SAT architecture.

## Calculator requirement

All future SAT Math learning, quiz and mock-test experiences must be authored with calculator-aware support. The student-facing Math experience will include an integrated scientific calculator and, where appropriate, graphing functionality aligned with the current Bluebook/Desmos model.

## Lesson requirement

SAT lessons are part of the SAT modules and must be premium instructional content using visual explanations, worked examples, purposeful animation/interaction where beneficial, targeted practice and links into the question-bank taxonomy.

## Immediate next step

Do not start mass question authoring until the question-bank quality standard and taxonomy are accepted as the governing content framework. The next implementation step is to inspect the current SAT data files and create the central content-bank structure without disturbing the existing site, authentication, access control, dashboard or other completed features.
