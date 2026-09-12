# SAT / PSAT Question Bank Specification
(Ground truth for question generation, data shape, and visuals — read by the AI before it touches the question bank.)

---

## PART 1 — Test Structure, Domains, and Difficulty

### Overall Test Structure (SAT)
- Two sections: **Reading & Writing (R&W)** and **Math**. Each has two modules.
- The real test is section-adaptive: Module 1 performance decides whether a test-taker gets the easier or harder version of Module 2. If the current mock engine is linear, that's an acceptable v1 gap — but every item must still be difficulty-tagged.
- **R&W:** 54 questions (27 per module), 64 minutes total (32/module).
- **Math:** 44 questions (22 per module), 70 minutes total (35/module).
- Scoring is rights-only — no penalty for wrong answers.

### Reading & Writing — Domains & Weighting
| Domain | Weight | Approx. count (of 54) | Tests |
|---|---:|---:|---|
| Craft and Structure | ~28% | 13–15 | Words in context, text structure & purpose, cross-text connections |
| Information and Ideas | ~26% | 12–14 | Central ideas/details, command of evidence (textual + quantitative), inferences |
| Standard English Conventions | ~26% | 12–15 | Punctuation/sentence boundaries, grammar (agreement, tense, pronouns, modifiers) |
| Expression of Ideas | ~20% | 8–12 | Rhetorical synthesis, transitions |

Rules:
- Every question has **its own short passage** (25–150 words, most in the 40–100 word range) — never a shared long passage feeding multiple questions.
- Some Information & Ideas items embed a table/graph in the text.
- 4 answer choices, one correct. Every distractor must reflect a specific, plausible student error.

### Math — Domains & Weighting
| Domain | Weight | Approx. count (of 44) | Tests |
|---|---:|---:|---|
| Algebra | ~35% | 13–15 | Linear equations/inequalities, systems, interpreting linear functions |
| Advanced Math | ~35% | 13–15 | Quadratics/polynomials, exponentials, rational expressions, nonlinear behavior |
| Problem-Solving and Data Analysis | ~15% | 5–7 | Ratios, percentages, probability, statistics, reading tables/scatterplots |
| Geometry and Trigonometry | ~15% | 5–7 | Area/volume, lines/angles/triangles, circles, right-triangle trig |

Rules:
- A calculator is allowed on every Math question.
- Mix multiple-choice with **student-produced response**; roughly 25–30% should be grid-in.
- No calculus. Ceiling is early Algebra II / precalculus.

### Difficulty Bands
Every item is tagged `easy`, `medium`, or `hard`:
- **Easy** — single-step reasoning, grade-level vocabulary, short distance from given info to answer.
- **Medium** — two-step reasoning, or one step plus a distractor requiring care; slightly denser phrasing.
- **Hard** — multi-step reasoning, unusual phrasing/structure, a subtle distinction between correct answer and a very plausible distractor, or synthesis across two pieces of information.

A module should mix difficulty bands, weighted toward the module's intended level.

### PSAT Deltas
Same domains, format, and question types as SAT, with the hardest tail of Advanced Math / Geometry & Trig trimmed. Tag every item `applicable_to: ["SAT","PSAT"]` unless it uses content above the PSAT ceiling, in which case `["SAT"]` only.

---

## PART 2 — Item Data Schema

Every question in the bank should match this shape. **Before mass-updating anything, compare this against the current database/question model and reconcile differences — do not silently overwrite the existing schema.**

```json
{
  "item_id": "sat-math-algebra-000123",
  "product": "SAT",
  "applicable_to": ["SAT", "PSAT"],
  "section": "Math",
  "domain": "Algebra",
  "skill": "Linear equations in two variables",
  "difficulty": "medium",
  "question_type": "multiple_choice",
  "stimulus": {
    "passage_text": null,
    "word_count": null,
    "table_data": null,
    "figure": null
  },
  "prompt": "The full question text the student reads.",
  "answer_format": {
    "type": "multiple_choice",
    "choices": [
      { "id": "A", "text": "..." },
      { "id": "B", "text": "..." },
      { "id": "C", "text": "..." },
      { "id": "D", "text": "..." }
    ],
    "correct_choice_id": "B",
    "grid_in_answer": null
  },
  "rationale": {
    "correct_explanation": "Why the correct answer is correct, step by step.",
    "distractor_explanations": {
      "A": "The specific error a student makes to land here.",
      "C": "...",
      "D": "..."
    }
  },
  "metadata": {
    "generated_by_pipeline_version": "v1",
    "generation_date": "2026-09-12",
    "qc_status": "passed",
    "qc_reviewer_notes": "",
    "human_reviewed": false,
    "response_stats": { "attempts": 0, "correct": 0, "avg_time_seconds": null }
  }
}
```

Notes:
- `question_type` is `multiple_choice` or `student_produced_response` (Math only).
- `stimulus.figure` is `null` or an object from Part 3. Store structured parameters, not an image URL or raw SVG.
- `stimulus.table_data` is structured rows/columns, not prose or an image.
- Only `metadata.qc_status = "passed"` items are eligible for live delivery.
- `metadata.response_stats` starts at zero and later populates from real attempts.
- For GRE/GMAT later, keep section/domain/skill as controlled-vocabulary fields validated per product.

---

## PART 3 — Figure Taxonomy (for visuals)

Never generate a figure as free text, ASCII art, or a raw AI-drawn image. Figures are structured parameters rendered by code.

| `figure_type` | Parameters |
|---|---|
| `bar_chart` | `x_labels`, `series: [{name, values}]`, `x_axis_title`, `y_axis_title` |
| `line_chart` | same shape as `bar_chart` |
| `scatter_plot` | `points: [{x,y}]`, `trend_line: bool`, axis titles |
| `table` | `headers`, `rows` |
| `number_line` | `min`, `max`, `marked_points`, `shaded_range` |
| `right_triangle` | `leg_a`, `leg_b`, `labels`, `unknown_side`, `show_right_angle_marker` |
| `general_triangle` | `side_lengths` (nullable per side), `angles` (nullable per angle), `labels` |
| `circle` | `radius`, `center_label`, `inscribed_angle`, `central_angle`, `chord`, `labels` |
| `parabola` | `equation`, `highlight_vertex`, `highlight_roots`, `x_range` |
| `linear_function_graph` | `slope`, `y_intercept`, `highlight_points`, `x_range` |
| `coordinate_shape` | `vertices`, `shape_name`, `show_gridlines` |
| `3d_solid` | `solid_type`, `dimensions`, `labels` |
| `multi_source_table` (future GMAT Data Insights) | `sources: [{title, headers, rows}]` |

Rules:
1. Numeric parameters must be internally consistent with the item's correct answer. QC must recompute the answer from the figure parameters.
2. If a needed figure type isn't listed, flag it for human review and add a renderer before using it.

---

## PART 4 — Generation Architecture and Quality Requirements

The question bank must be produced through a controlled pipeline:

**Stage 1 Blueprint → Stage 2 Draft → Stage 3 Independent QC Review → Canonical Storage → Existing SAT Engine**

### R&W construction standard

Reading & Writing generation is a dedicated assessment-item construction process. It must model authentic Digital SAT characteristics while keeping every production item original.

Before drafting, the blueprint should select, where applicable:
- source family: literature, history/social science, humanities, or science
- text type and rhetorical structure
- domain and skill
- cognitive operation
- difficulty
- evidence relationship
- question construction
- distractor architecture

Difficulty must come from the intended reasoning task, evidence relationships, inference, rhetorical purpose, information density, and plausible distractors — not artificial obscurity or unnecessary length.

### Verbal source-family diversity

The production corpus should include varied constructions such as:
- literature: character, setting, narrator perspective, conflict, reflection
- history/social science: historical development, social change, movements, policy, economic/social behavior, historical argument
- humanities: art, architecture, archaeology, philosophy, linguistics, anthropology, music/cultural criticism
- science: experiments, observational studies, competing hypotheses, ecological/behavioral research, biology, astronomy, environmental/materials research

Passages should vary in syntax, rhetorical structure, sentence rhythm, information density, perspective, evidence structure, and degree of implicitness while remaining within the specified passage-length rules.

### Distractor construction

Distractors must come from identifiable plausible student errors, including true-but-nonresponsive statements, incorrect inference, overly broad/narrow interpretation, reversed relationships, and confusion between an example and a main claim.

### Evidence mapping

R&W items should retain enough internal metadata for QC to identify target evidence, supporting evidence, required inference, correct reasoning, and distractor reasoning.

### Cross-text questions

Design the relationship first — for example agreement, contrast, qualification, extension, or competing interpretation — then construct the passages and question around that relationship.

### Rhetorical synthesis

For notes-based Expression of Ideas items, construct:
**source notes → communication goal → synthesis answer options**.
The correct answer must use the relevant notes to fulfill the stated goal.

### Quantitative evidence

For table/graph questions, construct:
**underlying dataset → claim/context → structured figure/table → question → answer**.
The visual must function as evidence, not decoration.

### Independent QC gate

A fresh reviewer must verify:
- exact schema and answer format
- passage/stimulus length
- one defensible answer
- difficulty and cognitive demand
- domain/skill fit
- distractor quality
- evidence alignment
- figure/data consistency
- source/style realism
- PSAT content ceiling
- originality and prohibited duplication

### Production gate

Do not generate the 20-mock production corpus until an end-to-end sample passes blueprint, drafting, QC, schema validation, rendering, originality checks, canonical storage, and compatibility with the existing SAT engine.

Then validate at three levels: individual item quality, per-mock coverage/difficulty, and full 20-mock diversity/originality.

### Copyright and calibration boundary

Official College Board material may be used as a private calibration reference for assessment characteristics, style, difficulty, source complexity, and question construction. It must not be copied, closely paraphrased, or shipped as production content. Public repository files must not contain copyrighted anchor text unless its use and licensing explicitly permit that distribution.

---
