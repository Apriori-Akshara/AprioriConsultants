# Apriori Digital SAT / PSAT — Math Blueprint Audit

**Date:** September 12, 2026  
**Step:** 1 of 4 — official blueprint and current-bank distribution audit  
**Status:** Completed; no question-generation logic changed in this step

## 1. Official assessment baseline

The initial PSAT bank is PSAT/NMSQT-aligned. The SAT and PSAT/NMSQT Math sections both contain 44 questions in two 22-question modules, with 20 operational and 2 pretest questions per module in the standard digital form.

### SAT Math content-domain distribution

| Domain | College Board share | Approx. questions in 44-question section |
|---|---:|---:|
| Algebra | ≈35% | ≈15–16 |
| Advanced Math | ≈35% | ≈15–16 |
| Problem-Solving and Data Analysis | ≈15% | ≈6–7 |
| Geometry and Trigonometry | ≈15% | ≈6–7 |

College Board's current SAT overview also presents the practical ranges as approximately 13–15 Algebra, 13–15 Advanced Math, 5–7 PSDA, and 5–7 Geometry/Trigonometry questions.

### PSAT/NMSQT Math content-domain distribution

| Domain | College Board share | Approx. questions in 44-question section |
|---|---:|---:|
| Algebra | ≈35% | ≈15–16 |
| Advanced Math | ≈32.5% | ≈14–15 |
| Problem-Solving and Data Analysis | ≈20% | ≈9 |
| Geometry and Trigonometry | ≈12.5% | ≈5–6 |

These percentages are the governing PSAT/NMSQT distribution. The exact form can vary within the published operational specification rather than requiring every module to have identical domain counts.

## 2. Subtopic scope that must be covered

### Algebra

- Linear equations in one variable
- Linear equations in two variables
- Linear functions
- Systems of two linear equations in two variables
- Linear inequalities in one or two variables

### Advanced Math

- Equivalent expressions
- Nonlinear equations in one variable and systems of equations in two variables
- Nonlinear functions
- Appropriate nonlinear families include quadratic, exponential, polynomial, rational, radical and absolute-value relationships where supported by the official skill framework

### Problem-Solving and Data Analysis

- Ratios, rates, proportional relationships and units
- Percentages
- One-variable data: distributions and measures of center/spread
- Two-variable data: models and scatterplots
- Probability and conditional probability
- Inference from sample statistics
- SAT-only: margin of error and evaluating statistical claims through observational studies and experiments

### Geometry and Trigonometry

SAT:
- Area and volume
- Lines, angles and triangles
- Right triangles and trigonometry
- Circles

PSAT/NMSQT:
- Area and volume
- Lines, angles and triangles
- Right triangles and right-triangle trigonometry

## 3. Figure, chart and data-display rule

College Board does **not** publish a fixed percentage or fixed number of Math questions that must contain an informational graphic.

The official framework states that Math includes a wide range of informational graphics, including:

- data displays;
- geometric figures;
- xy-plane graphs.

The PSAT/NMSQT student guide states that **select questions** are accompanied by an informational graphic. It also states that approximately 30% of Math questions are set in context. The 30% figure refers to contextual/word problems, not to the number of graphics.

Therefore, Apriori must not invent an official “X graphics per test” requirement and present it as a College Board rule.

### Apriori internal visual/data QC rule for future authoring

Because the official specification intentionally leaves the exact graphic count flexible, visual coverage will be governed by quality and domain representation rather than an artificial fixed percentage. A graphic is included only when it materially supports the mathematical task.

The bank must deliberately include a healthy mix of:

- data displays and tables;
- scatterplots and other xy-plane graphs;
- line/relationship graphs;
- quadratic/nonlinear graphs where appropriate;
- geometry diagrams;
- other original informational graphics supported by the content model.

A decorative or redundant graphic does **not** count as a quality visual item.

## 4. Current repository audit — Stage 1 bank

The current Stage 1 generator creates an 88-question Math bank from a domain pool of:

- Algebra: 28 source items
- Advanced Math: 28 source items
- PSDA: 16 source items
- Geometry: 16 source items

The assembly/interleaving logic then selects the displayed Math pools from that source arrangement. The resulting current Stage 1 protected Math bank is highly imbalanced:

| Domain | Current Stage 1 bank count | Current share | Governing benchmark comparison |
|---|---:|---:|---|
| Algebra | 42 | 47.7% | Too high for SAT or PSAT/NMSQT |
| Advanced Math | 25 | 28.4% | Below both SAT and PSAT/NMSQT targets |
| PSDA | 18 | 20.5% | Near PSAT/NMSQT but high for SAT |
| Geometry | 3 | 3.4% | Critically low for both |

The current selection method can therefore produce a Math module with **no Geometry questions**, which is incompatible with the requirement that questions from all four content domains appear in each module.

## 5. Current repository audit — Stage 2 / Mock 02 bank

The current Stage 2 generator cycles the four domains evenly by question index. Each 22-question pool therefore contains approximately:

- 6 Algebra
- 6 Advanced Math
- 5 PSDA
- 5 Geometry

That produces approximately:

- Algebra 27.3%
- Advanced Math 27.3%
- PSDA 22.7%
- Geometry 22.7%

This is also incompatible with both current College Board blueprints because it underweights Algebra and Advanced Math and materially overweights Geometry.

## 6. Figure/data findings in the current bank

The current generators frequently attach graphics based on index patterns rather than on whether the graphic is mathematically necessary to answer the question. For example, simple substitution questions can receive a line or quadratic visual even when the prompt never asks the student to read or reason from that visual.

This is inconsistent with the project's existing `figureQualityGate.js` rule that Math figures must be `question-essential`.

The next steps must therefore correct **both** distribution and purpose:

1. domain counts must conform to the correct SAT and PSAT/NMSQT blueprint;
2. each module must contain all four domains;
3. graphics must be purposeful, mathematically accurate and aligned with the question's reasoning demand;
4. PSDA must contain authentic data interpretation tasks, not merely word problems tagged as data analysis;
5. Geometry must be represented at the official level rather than treated as an occasional visual add-on.

## 7. Difficulty is deliberately deferred to Step 2

This audit does not change the existing difficulty labels yet. Difficulty calibration is a separate step and will be addressed after the blueprint distribution is established.

Step 2 will specifically audit the current Easy/Medium/Hard assignment, the shortage of hard questions, adaptive-route difficulty, and the quality of the actual mathematical reasoning required.

## 8. Governing sources

Primary source hierarchy for this audit:

1. College Board — Math Specifications for the SAT Suite.
2. College Board — Assessment Framework for the Digital SAT Suite, version 3.01.
3. College Board — SAT/PSAT Math section overview and student guides.
4. Secondary benchmark references such as Magoosh, Kaplan/PrepScholar may be used for question-writing and practice-quality benchmarking, but they do not override College Board's official domain blueprint.

### References

- College Board, **Math Specifications – SAT Suite**: https://satsuite.collegeboard.org/k12-educators/about/alignment/math
- College Board, **Assessment Framework for the Digital SAT Suite**, version 3.01 (August 2024): https://satsuite.collegeboard.org/media/pdf/assessment-framework-for-digital-sat-suite.pdf
- College Board, **SAT Math overview**: https://satsuite.collegeboard.org/sat/whats-on-the-test/math/overview
- College Board, **PSAT/NMSQT Student Guide**: https://satsuite.collegeboard.org/media/pdf/psat-nmsqt-student-guide.pdf

## Step 1 acceptance criteria

Step 1 is complete only when:

- SAT and PSAT/NMSQT domain distributions are explicitly documented;
- official subtopic coverage is documented;
- the absence of an official fixed Math-graphic percentage is explicitly recorded;
- contextual questions are distinguished from graphic/data-display questions;
- the current repository distribution is measured rather than assumed;
- the current mismatch is quantified;
- difficulty changes are left to the separate Step 2 rather than mixed into this step.

**Result: all Step 1 criteria are satisfied. No production question-bank code was changed in this step.**
