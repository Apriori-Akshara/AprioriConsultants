# SAT / PSAT Figure Recalibration — 2026-09-11

## Purpose
Correct the Stage 1 PSAT Mock 01 and SAT Mock 01 visual-authoring problem in which generic charts/graphs were displayed on questions that did not author a relevant figure, and exact visual data could repeat unnecessarily.

## Official SAT alignment used
- SAT/PSAT Math has 44 questions across two 35-minute modules; all four Math domains appear in each module.
- College Board describes informational graphics as **select Math questions**, including function graphs, dot plots, scatterplots, bar graphs, line graphs, histograms, and geometric figures.
- Reading and Writing graphics are limited to tables, bar graphs, and line graphs and are used only when the associated passage/question requires interpreting the information.
- The current product may intentionally use more graphics than an official test, but a graphic must be question-essential and relevant rather than decorative or globally repeated.

## Implemented changes
1. `src/pages/SATMocks/[testId].js`
   - Replaced the generic Math visual behavior with question-specific rendering.
   - A visual is now rendered only when the authored Math question contains `question.figure`.
   - Removed the previous index-based behavior that could display a chart on an unrelated question.
   - Preserved the shared adaptive runner, timers, module flow, break, persistence, Mark for Review, navigator, calculator, reference sheet, notes, line reader, eliminator, and zoom tools.

2. `src/components/sat/MathVisualStimulus.js`
   - Renders authored line, scatter, quadratic, and geometry figures.
   - Uses each question's `visualVariant` to prevent visually identical repeated rendering while preserving the underlying question data.

3. `src/data/sat/mockContent/figureQualityGate.js`
   - Enforces Math-only figures.
   - Requires `metadata.figurePurpose === "question-essential"`.
   - Enforces domain-to-figure relevance:
     - Algebra → line
     - Advanced Math → quadratic/line
     - Problem-Solving and Data Analysis → scatter/line
     - Geometry and Trigonometry → geometry
   - Adds deterministic question-specific visual variants and rejects duplicate normalized figure signatures.

4. `src/data/sat/mockContent/index.js`
   - Applies the figure-quality normalization before exporting PSAT Mock 01 and SAT Mock 01.
   - Existing verbal-choice normalization remains in place.

5. Removed obsolete `src/data/sat/mockContent/productionStage1MockContent.js`.
   - This file was the source of the historical `Expected ',', got ';'` Render build failures and is no longer part of the active content architecture.

## Render failure diagnosis
The historical failed deployment cluster included commits `d9dbc1d`, `792a7ac`, `128d7be`, and `d5d1581`.

The Render logs show the same underlying stale-file problem: `productionStage1MockContent.js` contained invalid JavaScript at line 46 (`Expected ',', got ';'`) and remained in the repository even after the active content path was moved to `stage1MockBank.js`.

The obsolete file has now been deleted so the failure cannot recur through an accidental import.

## Verification gate before next mock pair
Do not create the next pair of mocks from this Stage 1 implementation until PSAT Mock 01 and SAT Mock 01 have passed:
- individual question review;
- no unrelated visual appearing on a question;
- no exact duplicate visual data/signature within a mock;
- visual is necessary to answer/interpret the question;
- figure labels/values agree with the question;
- all four Math domains are represented in each module;
- Math module timing/counts remain 35 minutes / 22 questions;
- R&W remains 32 minutes / 27 questions per module;
- adaptive route persistence and scoring remain functional.

## Current status
The figure-aware runner and quality gate are implemented. Render is processing the final cleanup deployment after removal of the obsolete broken generator. The next student-facing step is question-by-question verification of PSAT Mock 01 and SAT Mock 01. Do not lock these mocks as reusable templates until that review is accepted.
