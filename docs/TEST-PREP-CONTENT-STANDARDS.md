# Apriori Test-Prep — Content Quality Benchmarks

**Created:** September 11, 2026  
**Status:** Planning/quality benchmark document — no GRE or GMAT build authorized by this document

This document defines the broad content-quality philosophy for Apriori's SAT, GRE, and GMAT products. SAT is the active priority. GRE and GMAT are planning standards only until their implementation is explicitly started.

The shared test-prep architecture remains in `docs/TEST-PREP-ARCHITECTURE.md`.

---

## 1. Benchmark hierarchy

### SAT — active priority

**Presentation/assessment experience:** College Board / Bluebook  
**Reading & Writing content benchmark:** OnePrep primary; Princeton Review secondary  
**Math content benchmark:** Kaplan primary; Barron's secondary

College Board establishes the reference experience and official content taxonomy. OnePrep is the principal benchmark for R&W breadth, skill-level drilling, explanations, analytics-linked practice and lesson depth. Princeton Review is a secondary benchmark for realistic presentation and instructional strategy. Kaplan and Barron's are the principal external benchmarks for Math rigor, variety, worked solutions and realistic practice construction.

### GRE — future planning only

**Presentation/official test experience:** ETS / POWERPREP  
**Content/instruction benchmark:** Magoosh primary

POWERPREP should establish the future reference for test-taking interaction, official question types, pacing, tools and score-report conventions. Magoosh should be used as the benchmark for instructional breadth, explanations, question drills, strategy teaching and learner-friendly practice.

### GMAT — future planning only

**Official presentation/assessment reference:** GMAT Official materials/tests  
**Verbal content benchmark:** Manhattan Prep  
**Quant content benchmark:** GMAT Club plus validated official material

GMAT Club should inform breadth and variety of Quant practice but should not be treated as the legal source for copied content. Manhattan Prep should inform Verbal instructional rigor and explanation quality. Official GMAT materials should establish the correct test-day presentation and authoritative exam structure.

---

## 2. Originality rule

External sources are benchmarks, never source material for copying.

Apriori must not copy:

- questions;
- passages;
- answer choices;
- explanations;
- diagrams;
- lesson wording;
- screenshots;
- proprietary visual assets;
- trademarked branding;
- proprietary scoring algorithms.

The benchmark question is:

> Does Apriori independently achieve the same or better educational outcome, clarity, realism and rigor?

not:

> Does Apriori reproduce the source?

---

## 3. SAT content quality target

The SAT product should ultimately combine:

- College Board-level structural accuracy;
- OnePrep-level R&W question-bank breadth and skill taxonomy;
- Princeton Review-level instructional realism;
- Kaplan/Barron's-level Math rigor and variety;
- original Apriori pedagogy;
- strong visual learning;
- reliable explanations;
- adaptive test realism;
- high-quality analytics and review workflows.

The result should feel like an independent premium test-preparation product rather than a collection of practice questions.

---

## 4. SAT lessons standard

Lessons should not be passive text pages.

They should combine:

**concept → visual explanation → worked example → strategy → guided practice → independent practice → error diagnosis → transfer**

Whenever the concept benefits from it, use:

- animated graphs;
- interactive visual models;
- annotated equations;
- geometry diagrams;
- number-line transformations;
- data-chart walkthroughs;
- passage annotation;
- rhetorical structure maps;
- before/after sentence revisions;
- calculator demonstrations.

Animation is a teaching tool, not decoration.

Every major lesson should connect to practice questions and the question-bank taxonomy so that student errors can recommend the relevant lesson later.

---

## 5. SAT question-bank completeness target

The Apriori bank must be broad enough to support:

- 10 full-length adaptive mock tests;
- topic drills;
- difficulty drills;
- section practice;
- mixed practice;
- lessons;
- remediation;
- error review;
- future personalized recommendations;
- future additional mock tests without redesigning the content system.

The bank should therefore be substantially larger than the 980 questions needed for ten 98-question mock tests. Extra validated questions are required for adaptive pools, substitutions, practice drills, lesson-linked exercises, calibration and future forms.

The bank must cover every official current SAT domain and skill, not merely the headline subjects.

---

## 6. SAT calculator/tool standard

The SAT Math experience should include the integrated calculator environment appropriate to the current Bluebook experience, including scientific and graphing options where allowed. College Board currently embeds Desmos options in Bluebook and allows calculators throughout Math; CAS calculators are not allowed. citeturn524027search4turn524027search7

Future Apriori SAT Math modules and mock tests must therefore be authored with calculator-aware metadata and a tool experience that is available throughout Math rather than being bolted on after question creation.

---

## 7. GRE planning benchmark — no build yet

When GRE implementation begins, the content program should be evaluated against:

### Official structure and presentation

ETS POWERPREP should establish:

- official question formats;
- timing;
- navigation;
- on-screen calculator experience;
- test-taker controls;
- score/report presentation;
- adaptive behavior.

ETS describes POWERPREP as a way to become familiar with question types, testing tools, test-taker-friendly design, time management and scoring. citeturn442458search7

### Instructional/content benchmark

Magoosh should establish the quality target for:

- Verbal practice variety;
- Quant practice variety;
- explanations;
- strategy lessons;
- drills;
- error review;
- video/text instruction.

No GRE questions, schemas or UI are to be built from this section alone.

---

## 8. GMAT planning benchmark — no build yet

When GMAT implementation begins, the content program should be evaluated against:

### Presentation

Use current official GMAT materials and official practice tests to determine:

- question presentation;
- navigation;
- timing;
- calculator/tool behavior where applicable;
- review/reporting;
- official terminology.

### Verbal

Use Manhattan Prep as the primary benchmark for:

- reasoning rigor;
- passage analysis;
- sentence-level precision;
- explanation quality;
- strategy instruction;
- difficulty progression.

### Quant

Use GMAT Club as a broad variety benchmark, supplemented and constrained by official GMAT specifications and official materials.

No GMAT build is authorized by this document.

---

## 9. Cross-product content governance

All future products should use a content-governance model with:

- stable content IDs;
- versioning;
- controlled taxonomy;
- difficulty metadata;
- skill metadata;
- explanation metadata;
- source/originality status;
- review status;
- retirement status;
- duplicate detection;
- lesson/content links;
- test-assembly eligibility.

Changing content metadata should normally not require changing the application architecture.

Product-specific question schemas remain separate where the interaction models differ materially.

---

## 10. Standard of excellence

Apriori's content target is:

**Official structural fidelity + leading test-prep instructional quality + original content + superior visual teaching + clean metadata + strong quality assurance.**

The product should be credible to a student, parent, educator, tutor and test-prep professional without relying on copied material or superficial visual imitation.

---

## 11. Reference set

SAT:

- College Board / SAT Suite / Bluebook
- OnePrep
- The Princeton Review
- Kaplan
- Barron's

GRE planning:

- ETS / POWERPREP
- Magoosh

GMAT planning:

- GMAT Official
- Manhattan Prep
- GMAT Club
