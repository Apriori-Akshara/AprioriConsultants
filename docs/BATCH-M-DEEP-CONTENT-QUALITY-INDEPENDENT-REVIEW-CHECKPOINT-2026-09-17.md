# Batch M Deep Content-Quality Independent Review Checkpoint — 2026-09-17

## 1. Purpose

Implement the next stage after controlled candidate selection: an independent, candidate-only substantive review of the 299 selected Batch M remediation candidates.

## 2. Scope reviewed by the implementation

The review stage evaluates the selected candidate artifact against independent gates for:

1. Answer-key and explanation/evidence alignment.
2. Math distractor construction and plausibility metadata.
3. Genuine multi-step reasoning for hard Math items.
4. R&W stimulus construction and length.
5. Words-in-Context contextual targeting.
6. Generic/template language reduction.
7. Cross-mock prompt and construction diversity.
8. SAT/PSAT structural appropriateness and candidate-only safety boundaries.

The review deliberately distinguishes deterministic failures from items requiring expert content review. Automated checks do not authorize production replacement.

## 3. Implementation

Added:

- `scripts/runBatchMDeepContentQualityIndependentReview.mjs`
- `.github/workflows/batch-m-deep-content-quality-independent-review.yml`
- npm command: `npm run qc:batch-m-deep-content-quality-independent-review`

The workflow consumes the successful candidate-selection artifact from workflow run `35194288337` and writes a candidate-only JSON/Markdown review artifact.

## 4. Production boundary

The implementation explicitly records:

- Production mutation: **false**.
- Release eligible: **false**.
- SAT21 created: **false**.

No production question is replaced, modified, deleted, or released by this stage.

## 5. Important review behavior

The review checks the actual selected candidate corpus rather than merely checking workflow metadata. In particular, it detects repeated normalized prompts, repeated semantic prompt templates, repeated prompt/choice constructions, generic explanations, explicit distractor error labels, missing distractor-construction metadata, weak hard-question reasoning signals, and structural R&W issues.

Items that cannot be proven correct by deterministic checks are marked for expert review rather than being treated as passed.

## 6. Decision boundary

The review artifact must be interpreted as follows:

- `FAIL` = substantive automated review failure; candidate is not eligible for replacement from this review result.
- `EXPERT_REVIEW_REQUIRED` = automated checks did not establish sufficient correctness; human/content-expert review is required before replacement consideration.
- `PASS` = no automated substantive failure was found; this still does not authorize production replacement by itself.

Only candidates that survive the review gates and any required expert review may enter a separately authorized controlled replacement stage.

## 7. Next step

After the independent-review workflow completes, inspect its actual artifact counts and findings. If the candidate set is held, remediate/re-generate only the failed or unresolved candidate classes as documented. If candidates pass all required review gates, proceed to a separately authorized controlled replacement step. Production remains frozen until that authorization is explicit.
