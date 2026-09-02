# Apriori Digital SAT Platform — Project State

Last updated: September 2, 2026

## 1. Project Overview

This repository contains the Apriori Consultants website.

The Digital SAT platform is being developed as a dedicated authenticated student experience inside the existing Next.js/React/Redux website.

The SAT system must be developed without breaking any existing public website functionality.

The overall objective is to build a premium 10-day Digital SAT mock-test program consisting of:

* 10 original full-length Digital SAT-style mock tests
* one mock test per day
* multistage adaptive testing
* authenticated student access
* student dashboard
* detailed score reports
* longitudinal performance analytics
* personalized study recommendations
* original SAT-style passages, questions and explanations
* structured SVG graphs and geometry figures
* question-level review
* duplicate-content prevention

## 2. Core Architectural Principle

The GitHub repository is the source of truth.

The SAT platform must be built incrementally.

Do not create a second unrelated SAT architecture.

Do not unnecessarily delete the existing SAT implementation until the new implementation has replaced its functionality and has been tested.

The old SAT implementation may remain temporarily while the new architecture is developed and migrated.

## 3. Existing Website

The project is an existing Next.js application using the Pages Router.

The existing site uses:

* React
* Next.js
* Redux
* existing reusable layouts/components
* existing authentication infrastructure
* existing API infrastructure
* existing CSS/styling conventions

All new SAT functionality should reuse the existing website architecture wherever practical.

Unrelated pages must not be modified unnecessarily.

## 4. Existing SAT Implementation

The legacy SAT implementation is primarily located under:

src/pages/SATDiagnosticTest/

and:

components/SATTest/

Legacy data includes:

src/data/questions.json

src/data/tests.json

The legacy implementation should not be considered the final SAT architecture.

It may be migrated gradually.

## 5. SAT Navigation Status

The SAT Diagnostic Test link was intentionally removed from the public navbar.

The main legacy SAT landing page was also temporarily redirected away from the SAT experience.

The new SAT platform should remain inaccessible to unauthenticated users.

Do not restore the public SAT navigation link until the new platform is ready for release.

## 6. New SAT Architecture Created on Day 1

The following architecture was added:

src/data/sat/programConfig.js

Purpose:
Central configuration for the entire SAT program.

It defines:

* program ID
* 10-day structure
* Reading & Writing modules
* Math modules
* timing
* adaptive pool identifiers
* content rules
* scoring configuration
* reporting capabilities
* figure types
* Math reference configuration

---

src/data/sat/mockTests.js

Purpose:
Master registry for Mock Tests 1–10.

Each mock has:

* test ID
* test number
* day number
* display title
* release sequence
* section/module references
* adaptive pool references
* expected question counts
* time limits
* validation status

No final test content is stored here.

---

src/data/sat/questionSchema.js

Purpose:
Canonical data contract for every future SAT question.

Questions must support:

* questionId
* testId
* section
* module
* domain
* skill
* conceptId
* difficulty
* questionType
* passageId
* prompt
* choices
* answer
* explanation
* estimatedTimeSeconds
* isOperational
* figure
* originalityFingerprint
* conceptFingerprint
* metadata

This schema should become the standard format for every future mock-test question.

---

src/lib/sat/attemptSchema.js

Purpose:
Canonical structure for student test attempts.

It supports:

* attempt ID
* authenticated user ID
* test ID
* module states
* responses
* question timing
* adaptive state
* estimated scores
* score ranges
* reporting data
* integrity state

Persistent storage and secure server-side attempt handling will be implemented in later stages.

---

src/pages/SATMocks/index.js

Purpose:
Future authenticated SAT program entry point.

During Day 1 this intentionally returns a 404.

Later this route will become the authenticated SAT dashboard entry point.

## 7. SAT Test Structure

The system is designed around the current Digital SAT structure:

Reading & Writing:

* 54 questions
* 64 minutes
* two 32-minute modules

Math:

* 44 questions
* 70 minutes
* two 35-minute modules

Break:

* 10 minutes between Reading & Writing and Math

Total:

* 98 questions

The SAT is multistage adaptive at the module level.

Module 1 performance determines the approximate difficulty band of Module 2.

It is NOT intended to be question-by-question adaptive.

## 8. Adaptive Architecture

Reading & Writing and Math adapt independently.

Each section will use:

Module 1
→ provisional ability estimate
→ adaptive route
→ Module 2

Expected Module 2 routes:

* high
* standard
* low

The exact scoring and routing model will be centralized and calibrated during later implementation.

The platform must not claim to reproduce College Board's proprietary scoring algorithm.

All student-facing SAT scores should be clearly identified as estimates unless a different validated scoring methodology is established.

## 9. SAT Content Domains

Reading & Writing:

* Information and Ideas
* Craft and Structure
* Expression of Ideas
* Standard English Conventions

Math:

* Algebra
* Advanced Math
* Problem-Solving and Data Analysis
* Geometry and Trigonometry

Underlying concepts may repeat across tests.

Questions themselves must not repeat.

## 10. Content Originality Rules

All SAT content created for Apriori must be original.

The system may use public College Board specifications and publicly described Digital SAT question structures as references.

It must not copy:

* College Board questions
* College Board passages
* College Board explanations
* competitor questions
* competitor passages
* competitor explanations
* competitor diagrams
* competitor answer choices
* competitor branding
* competitor proprietary visual designs

Magoosh, Kaplan, PrepScholar and Manhattan Prep may be used only as high-level product/design feature references.

## 11. No-Repetition Rules

Across all 10 mocks:

Reading & Writing:

* no repeated passage
* no repeated passage pair
* no repeated question
* no near-duplicate question
* no trivial wording modification of an existing question

Math:

* no repeated question
* no trivial numerical substitutions
* no repeated diagram
* no near-duplicate framing

Underlying skills and concepts may repeat.

The content system should eventually use both exact and near-duplicate detection.

## 12. Figures and Graphs

Future SAT questions should support structured SVG figures rather than copied image assets.

Supported figure categories include:

* scatterplots
* line graphs
* bar charts
* histograms
* tables
* box plots
* coordinate planes
* number lines
* triangles
* right triangles
* circles
* polygons
* composite geometry
* angle diagrams
* quadratic graphs
* transformations

Figures must be generated from structured data.

Figures should include accessible descriptions and readable labels.

## 13. Math Reference Experience

The future test experience should provide an original/paraphrased instruction sequence followed by a Math reference preview.

The Math reference information should remain accessible during Math modules.

Official wording should not be copied verbatim.

## 14. Authentication Requirements

The SAT platform must require authenticated student access.

All of the following should eventually require authentication:

* SAT dashboard
* test launcher
* test player
* test modules
* results
* review
* history
* analytics

A client-side Redux check alone is not considered sufficient premium-content security.

The strongest server-verifiable session/authentication mechanism supported by the existing project should be used.

The existing website's authentication should be reused rather than creating an unrelated second login system.

## 15. Student Dashboard Goals

The dashboard should eventually provide:

* student name
* target score
* current estimated score
* gap to target
* latest score
* score trend
* Reading & Writing trend
* Math trend
* domain performance
* difficulty performance
* timing performance
* tests completed
* questions attempted
* accuracy
* streak
* 10-day challenge progress
* recommended study priorities
* mistake-review access

The dashboard should be visually consistent with Apriori's existing branding while incorporating strong product ideas found across premium SAT preparation platforms.

Do not copy competitor branding or proprietary UI.

## 16. Score Report Goals

The final report should include:

* estimated total score
* estimated Reading & Writing score
* estimated Math score
* estimated score range
* adaptive path
* domain analysis
* skill analysis
* difficulty analysis
* timing analysis
* question-by-question review
* likely error classification
* personalized recommendations
* target-score analysis
* test-history comparison

The report should go significantly beyond a simple correct/incorrect total.

## 17. Future 10-Day Development Sequence

Day 1:
SAT architecture and data contracts

Day 2:
Secure authentication/access control

Day 3:
Student dashboard

Day 4:
Digital SAT test-taking interface

Day 5:
Multistage adaptive engine

Day 6:
Question architecture, SVG figures and anti-duplication validation

Day 7:
Scoring and detailed score reporting

Day 8:
Mock Tests 1–3

Day 9:
Mock Tests 4–7 and longitudinal personalization

Day 10:
Mock Tests 8–10, production QA and hardening

## 18. Migration Principle

Do not rebuild the entire website.

Do not replace the Next.js architecture.

Do not unnecessarily rewrite Redux.

Do not unnecessarily rewrite generic data structures.

Keep SAT-specific functionality isolated as much as practical.

When legacy SAT functionality is migrated to the new system, remove or replace old functionality only after verifying imports, routes and dependencies.

## 19. Coding Instructions for Future Work

The developer/AI working on this project must:

1. Inspect the current repository before editing.
2. Treat current repository state as authoritative.
3. Preserve previously completed work.
4. Change only files necessary for the current task.
5. Never invent the contents of unseen files.
6. Never use placeholder code such as:

   * "..."
   * "same as above"
   * "rest of file"
7. For replaced files, provide complete file contents.
8. For new files, provide complete file contents.
9. Explain exactly where each file goes.
10. Provide copy/paste instructions suitable for a non-coder.
11. Include a test checklist after each development stage.
12. Never compromise unrelated website functionality for SAT work.

## 20. Current Project State

Completed:

* SAT navbar item removed
* legacy SAT landing page temporarily redirected
* Day 1 SAT architecture created

Current phase:

Day 1 completed.

Next phase:

Day 2 — secure authenticated SAT access.

## 21. Important Future Decisions

The following must remain centralized/configurable where possible:

* test schedule
* release timing
* adaptive thresholds
* scoring model
* score ranges
* question difficulty
* content domains
* skills
* figure types
* reporting metrics

Avoid scattering these values throughout React components.

## 22. Source of Truth Rule

When continuing work in a new ChatGPT conversation or with another coding assistant:

First inspect:

docs/SAT-PROJECT-STATE.md

Then inspect the current repository.

The repository state takes precedence over this document if they differ.

Update this document whenever a major architecture decision, migration, security decision, scoring decision, or project milestone changes.
