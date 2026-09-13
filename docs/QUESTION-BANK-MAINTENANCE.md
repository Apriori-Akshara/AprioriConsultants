# Question Bank Maintenance Checkpoint

Approved September 13, 2026.

The 20-mock production corpus will have one human-readable text file per mock, ordered by section, module, and question number. Each question has a stable item_id and records its domain, skill, difficulty, question type, content, answer, rationale, QC status, and figure/data references.

The human-readable mock files are the canonical editable source. Production JS/JSON question data is synchronized from them; do not maintain two independent hand-edited copies.

Question correction workflow: identify mock + section + module + question + item_id; edit the canonical entry; validate; synchronize; run relevant QC; run cross-mock uniqueness checks; test runtime behavior when affected.

QC checkpoint: Verbal/R&W independent QC begins in Batch D. Math/Quant independent mathematical QC begins in Batch I. Figure and originality validation is strengthened in Batch J.

Approved sequence: A schema, B blueprint, C Verbal construction, D Verbal distractor/evidence/QC, E figure framework, F basic visuals, G 2D geometry, H 3D/future multi-source, I Math integration/QC, J figure/originality, K calibration, L end-to-end test, M 20-mock production and corpus QC.

Current checkpoint: Batch D is fully verified for the current R&W delivery path: misconception-based distractor architecture and internal evidence maps are attached, a fresh deterministic independent QC review runs, up to two correction/retry passes are allowed for Batch D-owned defects, `metadata.qc_status = "passed"` is enforced as the live-delivery gate, and public-site functional spot checks passed. The approved College Board calibration reference corpus and per-mock human-readable canonical files are still future architecture work; calibration is a Batch K activity and full per-mock corpus production is gated through Batch L before Batch M.

## Batch E — Figure framework + rendering foundation

**Status: COMPLETE and live.**

Batch E established the structured figure registry/normalization and shared Math visual rendering foundation. Compatibility corrections were deployed successfully in commits `60e1693ee29fc7a32ac78d09f97eaf1cbfbb5ce1` and `649a2d4baba31424dd12846fa20ac277e87c322c`.

## Batch F — Basic Data Visuals

**Status: IMPLEMENTED / CURRENT CHECKPOINT.**

Batch F extends the Batch E architecture for four approved basic data-visual families:

- `bar_chart`
- `line_chart`
- `scatter_plot`
- `table`

The structured figure registry now validates required fields, numeric values, series lengths, table column consistency, and optional axis/trend metadata. The existing legacy `line`, `scatter`, `quadratic`, and `geometry` figure formats remain supported.

The existing `MathVisualStimulus` rendering path now renders the four canonical Phase F types directly from their structured data. Tables use semantic HTML table markup for accessibility. No AI-drawn or opaque production images were introduced.

The Math figure quality gate accepts the Phase F types where appropriate to the existing Math domains while preserving the existing `question-essential` and R&W exclusion checks.

No authentication, database, access-control, subscription/payment, dashboard/navigation, deployment configuration, or unrelated API/Redux work was changed for Batch F.

## Remaining approved batches

- **G — 2D geometry/math visuals:** pending. Do not implement yet.
- **H — 3D + future multi-source architecture:** pending. Do not implement yet.
- **I — Math integration + mathematical QC:** pending.
- **J — Figure validation + originality/uniqueness:** pending.
- **K — Calibration corpus + assessment calibration:** pending.
- **L — End-to-end generation/QC/storage/adapter test:** pending and is the hard gate before production-volume generation.
- **M — Production generation for 20 mocks + corpus-level QC:** pending; cannot begin until Batch L passes.

The 20 final production mocks and private calibration corpus are not being created by Batch F.

## Batch F verification checkpoint

Relevant source files were inspected before implementation: `src/data/sat/questionSchema.js`, `src/data/sat/mockContent/figureRegistry.js`, `src/data/sat/mockContent/figureQualityGate.js`, `src/data/sat/mockContent/mathBankFactoryV2.js`, and `src/components/sat/MathVisualStimulus.js`.

The existing Math bank continues to use its legacy figure formats, so Batch F adds canonical support without rewriting existing mock content. Final production build/runtime verification is delegated to the controlled Render deployment triggered by the main-branch commits; public student verification remains limited to affected behavior after deployment.
