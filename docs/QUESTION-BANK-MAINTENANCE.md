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

**Status: COMPLETE.**

Batch F established structured support and shared rendering for:

- `bar_chart`
- `line_chart`
- `scatter_plot`
- `table`

The structured registry validates required fields, numeric values, series lengths, table column consistency, and optional axis/trend metadata. Existing legacy `line`, `scatter`, `quadratic`, and `geometry` formats remain supported. The user has confirmed that Mock 3 visuals render correctly in spot checks; exhaustive manual visual QC is not required at this checkpoint.

No authentication, database, access-control, subscription/payment, dashboard/navigation, deployment configuration, or unrelated API/Redux work was changed for Batch F.

## Batch G — 2D geometry/math visuals

**Status: IMPLEMENTED / CURRENT CHECKPOINT.**

Batch G extends the Batch E architecture with structured validation and shared rendering for:

- `right_triangle`
- `general_triangle`
- `circle`
- `parabola`
- `linear_function_graph`
- `coordinate_shape`

The registry validates the required geometry/math parameters and basic internal consistency, including positive dimensions, triangle inequality/angle constraints where fully specified, valid ranges, and numeric coordinate pairs. The existing Math figure quality gate now accepts the six Phase G families only within appropriate Math domains. The shared `MathVisualStimulus` renders the six canonical types directly from their structured parameters.

Number lines remain deferred and were not added to the Batch G runtime gate. 3D solids and future multi-source tables remain Batch H work.

Legacy figure formats remain supported. No new visualization library, AI-drawn production asset, parallel renderer, or unrelated application subsystem was introduced.

## Remaining approved batches

- **H — 3D + future multi-source architecture:** pending.
- **I — Math integration + mathematical QC:** pending.
- **J — Figure validation + originality/uniqueness:** pending.
- **K — Calibration corpus + assessment calibration:** pending.
- **L — End-to-end generation/QC/storage/adapter test:** pending and is the hard gate before production-volume generation.
- **M — Production generation for 20 mocks + corpus-level QC:** pending; cannot begin until Batch L passes.

The 20 final production mocks and private calibration corpus are not being created by Batch G.

## Batch G implementation verification checkpoint

Relevant source files were inspected before implementation: `src/data/sat/questionSchema.js`, `src/data/sat/mockContent/figureRegistry.js`, `src/data/sat/mockContent/figureQualityGate.js`, and `src/components/sat/MathVisualStimulus.js`. Existing figure formats and the shared renderer were preserved rather than replaced.

The current implementation remains limited to question generation/storage/rendering scope. Authentication, database, access control, payment/subscription, dashboard/navigation, deployment configuration, and unrelated Redux/API code were not changed.

Final build/runtime verification is delegated to the controlled deployment triggered by the main-branch commits; public student verification should remain limited to affected visual behavior after deployment.
