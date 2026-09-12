# SAT / PSAT Question Bank Specification
(Ground truth for question generation, data shape, and visuals — read by the AI before it touches the question bank.)

---

## PART 1 — Test Structure, Domains, and Difficulty

### Overall Test Structure (SAT)
- Two sections: **Reading & Writing (R&W)** and **Math**. Each has two modules.
- The real test is section-adaptive: Module 1 performance decides whether a
  test-taker gets the easier or harder version of Module 2. If the current
  mock engine is linear (same difficulty for everyone), that's an acceptable
  v1 gap — but every item must still be difficulty-tagged so adaptive
  delivery can be turned on later without regenerating content.
- **R&W:** 54 questions (27 per module), 64 minutes total (32/module).
- **Math:** 44 questions (22 per module), 70 minutes total (35/module).
- Scoring is rights-only — no penalty for wrong answers. Never build
  penalty logic into scoring.

### Reading & Writing — Domains & Weighting
| Domain | Weight | Approx. count (of 54) | Tests |
|---|---|---|---|
| Craft and Structure | ~28% | 13–15 | Words in context, text structure & purpose, cross-text connections |
| Information and Ideas | ~26% | 12–14 | Central ideas/details, command of evidence (textual + quantitative), inferences |
| Standard English Conventions | ~26% | 12–15 | Punctuation/sentence boundaries, grammar (agreement, tense, pronouns, modifiers) |
| Expression of Ideas | ~20% | 8–12 | Rhetorical synthesis (bulleted notes → one sentence meeting a goal), transitions |

Rules:
- Every question has **its own short passage** (25–150 words, most in the
  40–100 word range) — never a shared long passage feeding multiple
  questions. Some Information & Ideas items embed a table/graph in the text.
- 4 answer choices, one correct. Every distractor must reflect a specific,
  plausible student error — never a random or obviously-wrong option.

### Math — Domains & Weighting
| Domain | Weight | Approx. count (of 44) | Tests |
|---|---|---|---|
| Algebra | ~35% | 13–15 | Linear equations/inequalities, systems, interpreting linear functions |
| Advanced Math | ~35% | 13–15 | Quadratics/polynomials, exponentials, rational expressions, nonlinear behavior |
| Problem-Solving and Data Analysis | ~15% | 5–7 | Ratios, percentages, probability, statistics, reading tables/scatterplots |
| Geometry and Trigonometry | ~15% | 5–7 | Area/volume, lines/angles/triangles, circles, right-triangle trig |

Rules:
- A calculator (built-in Desmos graphing calculator) is allowed on
  **every** Math question — no no-calculator section.
- Mix multiple-choice (4 options) with **student-produced response**
  ("grid-in," numeric answer typed, no choices) — roughly 25–30% of Math
  questions should be grid-in, not all multiple-choice.
- No calculus. Ceiling is early Algebra II / precalculus (quadratics,
  exponentials, right-triangle trig only).

### Difficulty Bands
Every item is tagged `easy`, `medium`, or `hard`:
- **Easy** — single-step reasoning, grade-level vocabulary, short distance
  from given info to answer.
- **Medium** — two-step reasoning, or one step plus a distractor requiring
  care; slightly denser phrasing.
- **Hard** — multi-step reasoning, unusual phrasing/structure, a subtle
  distinction between correct answer and a very plausible distractor, or
  synthesis across two pieces of information (e.g., a table + a sentence).

A module should never be one difficulty band only — mix bands, weighted
toward the module's intended level.

### PSAT Deltas (apply on top of everything above)
Same domains, format, and question types as SAT, with:
| Aspect | SAT | PSAT/NMSQT & PSAT 10 |
|---|---|---|
| Question counts & timing | as above | identical |
| Score scale (per section) | 200–800 | 160–760 |
| Content ceiling | full range | hardest tail of Advanced Math / Geometry & Trig trimmed; otherwise same |

Tag every item `applicable_to: ["SAT","PSAT"]` unless it uses content above
the PSAT ceiling, in which case `["SAT"]` only. This lets one item bank
serve both products.

---

## PART 2 — Item Data Schema

Every question in the bank should match this shape. **Before mass-updating
anything, compare this against the current database/question model in this
repo and reconcile differences — do not silently overwrite the existing
schema without flagging conflicts first.**

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
- `question_type` is `multiple_choice` or `student_produced_response` (Math
  only, grid-in — `answer_format.type` becomes `"numeric"` and
  `grid_in_answer` holds the accepted value/range instead of `choices`).
- `stimulus.figure` is `null` or an object from the figure taxonomy in Part
  3 below. Store structured parameters, not an image URL or raw SVG, so
  figures can be re-rendered or fixed later without regenerating the item.
- `stimulus.table_data` — structured rows/columns, not prose or an image.
- `metadata.qc_status` — only `"passed"` items should be eligible to appear
  in a live mock test.
- `metadata.response_stats` — starts at zero, populates from real
  test-taker attempts over time; eventually used to check that stated
  difficulty matches actual percent-correct.
- **For GRE/GMAT later**: keep `section`, `domain`, `skill` as
  controlled-vocabulary fields validated per product rather than hardcoded
  SAT-only values — that's the only schema change needed to reuse this for
  GRE (Verbal/Quant/Analytical Writing) and GMAT (Quant/Verbal/Data
  Insights).

---

## PART 3 — Figure Taxonomy (for visuals)

Never generate a figure as free text, ASCII art, or raw SVG/image directly
from a language model — that's where visual quality breaks down. Figures
are always structured parameters, rendered by code. Recommended rendering:
**matplotlib** (2D charts and geometric figures — free, precise) and
**Three.js** (3D solids, already usable in a Next.js/React stack) or
**JSXGraph** / the free-for-education **Desmos API** for interactive
geometry.

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
| `3d_solid` | `solid_type` (`rectangular_prism`\|`cylinder`\|`cone`\|`sphere`\|`triangular_prism`\|`pyramid`), `dimensions`, `labels` |
| `multi_source_table` (future GMAT Data Insights) | `sources: [{title, headers, rows}]` |

Rules:
1. Numeric parameters must be internally consistent with the item's correct
   answer — QC must recompute the answer from the figure parameters and
   confirm it matches.
2. If a needed figure type isn't in this list, flag for human review and add
   a new type here once a rendering function exists — don't approximate
   with the closest existing type.

This same taxonomy covers most GRE Quant and GMAT Quant/Data Insights
figures later — only the parameter list grows, the approach doesn't change.
