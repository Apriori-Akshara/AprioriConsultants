# AI Task Brief: Update the Question Bank to Spec

This file is written to be read and acted on directly by your AI coding
assistant. It assumes the assistant also has SAT-PSAT-QUESTION-SPEC.md and HUMAN-EDITABLE-CANONICAL-QUESTION-BANK-SPEC.md in this repo. Read both when the task involves question-bank content or item-level maintenance.

---

## THE TASK (read this first, do these steps in order)

1. **Audit before changing anything.** Look at the current question
   generation code and the current question bank data in this repo.
   Compare the existing data shape to the schema in Part 2 of
   `SAT-PSAT-QUESTION-SPEC.md`. List any conflicts or fields that don't map
   cleanly, and propose a reconciliation — do not silently overwrite the
   existing schema.
2. **Once the schema is confirmed**, rebuild question generation as a
   **three-stage pipeline** instead of a single generate-and-store call:
   Stage 1 (Blueprint) → Stage 2 (Draft) → Stage 3 (QC Review). Each stage
   is a separate AI call. The exact prompt for each stage is below.
3. **Build the figure rendering step** described in Part 3 of the spec
   file, so any item with `stimulus.figure` gets an actual rendered
   chart/diagram (matplotlib for 2D, Three.js or JSXGraph/Desmos for
   geometry and 3D) instead of no visual or an AI-drawn approximation.
4. **Set up the calibration corpus** described near the end of this
   document before generating at volume — a handful of real anchor
   examples per domain/difficulty make Stage 2 dramatically more accurate.
5. **Run the pipeline against the existing mocks**: for each mock test that
   needs updating, regenerate items module by module, respecting the
   domain/difficulty distribution in Part 1 of the spec, and replace only
   items that fail QC or don't match spec — no need to discard everything
   that's already working.
6. **For item-level maintenance, use the human-editable mock question-bank
   document as the preferred editing surface.** Identify the exact
   testKey + questionId, edit only the requested content, reconstruct the
   canonical question record, and run the applicable validation before any
   production update.
7. **Treat the canonical question record as the runtime authority.** The
   document and canonical representations must remain synchronized and any
   drift must be reported rather than silently resolved.
8. **Do not change unrelated parts of the app** (auth, dashboard, deploy
   config) as part of this task — scope this strictly to question
   generation, storage, and rendering.

---

## DOCUMENT-BASED ITEM MAINTENANCE WORKFLOW

When the user requests a change to a specific existing question after the
human-editable question-bank system is implemented:

1. Read docs/HUMAN-EDITABLE-CANONICAL-QUESTION-BANK-SPEC.md.
2. Locate the exact mock document using the frozen mock identity.
3. Locate the exact testKey + questionId.
4. Change only the content fields required by the request.
5. Preserve system-managed identity, fingerprints, QC state, and production
   status unless the requested change explicitly requires a recalculation.
6. Parse the edited question into the canonical structure defined by
   src/data/sat/questionSchema.js.
7. Run schema, content-quality, math/figure, originality, and compatibility
   checks applicable to the changed item.
8. Keep the result candidate-only until the documented production
   authorization exists.
9. After an authorized production update, rerun the affected mock and
   collective gates required by the change.
10. Report the exact changed testKey + questionId and whether the result is
    document-only, candidate-only, or production-applied.

The document edit is never, by itself, a production deployment.


## BULK SOURCE-DOCUMENT WORKFLOW

When the user supplies a Word document, PDF, or structured pasted question set for pre-launch content work, do not ask the user to retype questions into Markdown or JavaScript.

Read:
- docs/QUESTION-BANK-IMPORT-AND-REVIEW-WORKFLOW.md
- docs/HUMAN-EDITABLE-CANONICAL-QUESTION-BANK-SPEC.md
- docs/SAT-PSAT-QUESTION-SPEC.md
- docs/SAT-MATH-TYPOGRAPHY-AND-RENDERING-STANDARD.md when Math is involved
- docs/SAT-FIGURE-DATA-AND-RENDERING-STANDARD.md when visuals are involved

Extract the source in batches, map each question deterministically to the frozen testKey + questionId, create candidate content, and report only ambiguous or failed mappings/checks for human attention. Preserve the frozen legacy baseline and keep all results candidate-only until the documented approval/staging path is satisfied.

Pre-launch source replacements/content candidates are distinct from post-launch maintenance edits. After release, an exact released-item defect may use the human-editable document as the maintenance surface, followed by canonical reconstruction and the applicable gates.

## MATHEMATICAL DISPLAY RULE

Do not “fix” SAT Math typography with blind string replacement. Route mathematical spans through the canonical typography/rendering contract so exponents, fractions, roots, inequalities, symbols, equations, graph labels, and figure annotations use one consistent student-facing system.

## VISUAL RULE

Do not patch individual screenshots or use AI-drawn production figures as substitutes for the structured figure system. Reconstruct structured figure/data parameters, render them deterministically, and validate their relationship to the question and answer.

## STAGE 1 PROMPT — Blueprint

Use as the system/instruction prompt for the first AI call. Its only job is
deciding *what* question to generate — never the question content itself.

```
You are a test-item blueprint planner for SAT/PSAT mock test generation.

You will be given a target section, domain, difficulty band, and any
constraints on question type or figure use. Output ONLY a JSON blueprint —
no question content, no passage, no answer choices. Follow the domain/
skill/difficulty definitions in SAT-PSAT-QUESTION-SPEC.md exactly. Do not
invent domains, skills, or difficulty definitions not present in the spec.

Output schema:
{
  "section": "Reading & Writing" | "Math",
  "domain": "<one of the four domains for that section, per spec>",
  "skill": "<a specific sub-skill within that domain, per spec>",
  "difficulty": "easy" | "medium" | "hard",
  "question_type": "multiple_choice" | "student_produced_response",
  "requires_figure": true | false,
  "figure_type_hint": "<a figure_type from Part 3 of the spec, or null>",
  "requires_passage_pair": true | false,
  "notes_for_drafting": "<1-2 sentences of scenario guidance only, no
    actual question content>"
}

Vary skills and scenarios across a batch — never repeat the same skill/
scenario combination back to back.
```

---

## STAGE 2 PROMPT — Draft

Use as the system/instruction prompt for the second AI call. Takes a Stage
1 blueprint plus 3-5 real anchor examples (from the calibration corpus
below) and writes one original, complete item.

```
You are an expert item writer for SAT/PSAT mock tests, writing to the exact
structural and stylistic standard of the real Digital SAT.

You will be given a blueprint and 3-5 REAL anchor examples of official
retired items at a similar domain/skill/difficulty, for calibration only.

Rules:
- The anchors show target style, phrasing density, passage length, and
  difficulty — do not copy their content, scenario, numbers, or wording.
  Write a fully original item.
- Follow the passage/stimulus length rules exactly (25-150 words for R&W).
- If requires_figure is true, output the figure as a structured object
  matching a type in Part 3 of SAT-PSAT-QUESTION-SPEC.md — never as text,
  ASCII art, or embedded image/SVG.
- Every distractor must reflect a specific, identifiable, plausible student
  error — state the error in the rationale field, not the question itself.
- If question_type is student_produced_response, output only the accepted
  numeric answer (or valid range/equivalent forms) — no answer choices.
- Output a single JSON object matching the schema in Part 2 of
  SAT-PSAT-QUESTION-SPEC.md exactly — no extra commentary.
```

---

## STAGE 3 PROMPT — QC Review

Use as the system/instruction prompt for the third AI call, made fresh
(no memory of writing the item) so it isn't biased toward approving its own
work.

```
You are a strict quality-control reviewer for SAT/PSAT mock test items. You
did not write this item. Evaluate it against this checklist and output
ONLY a JSON verdict.

Checklist:
1. STRUCTURE — matches its question_type/answer_format exactly?
2. LENGTH — passage/stimulus within 25-150 words?
3. SINGLE DEFENSIBLE ANSWER — exactly one correct answer, no ambiguity?
4. DIFFICULTY MATCH — actual complexity matches its stated band, per spec
   definitions, not just self-report?
5. DISTRACTOR QUALITY — each wrong choice tied to a specific plausible
   error, not random or obviously wrong?
6. DOMAIN/SKILL FIT — actually tests the stated domain and skill?
7. FIGURE CONSISTENCY (if applicable) — recompute the answer from the
   figure's numeric parameters yourself; does it match the stated answer?
8. TONE/REALISM — resembles a real Digital SAT item, not generic test-prep
   filler?
9. CONTENT CEILING — for PSAT-tagged items, content doesn't exceed the
   PSAT ceiling in the spec?

Output schema:
{
  "verdict": "pass" | "fail",
  "failed_checks": ["<numbers>"],
  "reviewer_notes": "<specific, actionable reason, detailed enough to fix
    without regenerating from scratch>",
  "recomputed_answer_if_figure_present": "<your own worked answer>"
}

Be skeptical by default — "merely fine" fails, not passes with reservations.
```

**On fail:** send `reviewer_notes` into a new Stage 2 call as correction
instructions and regenerate. Cap at 2-3 retries per blueprint, then route
to human review instead of looping indefinitely. Log every fail's
`failed_checks` — a pattern on one check number means the Stage 2 prompt or
spec needs tightening, not just more retries.

---

## Calibration Corpus (set up once, before generating at volume)

Stage 2 needs a small set of **real official items** as style/difficulty
anchors. These are copyrighted — internal reference only, never committed
publicly or shipped to end users. If this repo is public, put them in a
gitignored folder, e.g.:

```
/internal-only/calibration-corpus/
    sat-rw-craft-and-structure/
    sat-rw-information-and-ideas/
    sat-rw-standard-english-conventions/
    sat-rw-expression-of-ideas/
    sat-math-algebra/
    sat-math-advanced-math/
    sat-math-problem-solving-data-analysis/
    sat-math-geometry-trigonometry/
```

Free official sources to pull from:
- **College Board Educator Question Bank** (no login needed) —
  https://satsuiteeducatorquestionbank.collegeboard.org/
- **Student Question Bank** inside My Practice/Bluebook
- ETS POWERPREP (for GRE later) — https://www.ets.org/gre/test-takers/general-test/prepare/powerprep.html
- GMAT Official Starter Kit (for GMAT later) — https://www.mba.com/exam-prep/gmat-official-starter-kit

Roughly 15-25 real items per domain, spread across difficulty bands, is
enough to start — tag each with domain/skill/difficulty so Stage 2 can pull
relevant anchors automatically. Expand over time, especially wherever QC
failures cluster.

The other half of calibration is real response data: once mocks are live,
populate `metadata.response_stats` on each item from actual attempts, and
periodically check that percent-correct roughly matches the stated
difficulty band to be implemented after all the mocks pass quality control as verified by Akshara/Dominic. 
---



## Operational rule for this project

Do not ask the user to edit JavaScript. The user supplies the requested
content change in plain language. The assistant is responsible for editing
the human-readable question-bank document, reconstructing canonical data,
performing the required QC, and making only explicitly authorized
production changes.
