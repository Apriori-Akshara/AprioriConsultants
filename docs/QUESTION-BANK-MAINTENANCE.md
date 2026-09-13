# Question Bank Maintenance Checkpoint

Approved September 13, 2026.

The 20-mock production corpus will have one human-readable text file per mock, ordered by section, module, and question number. Each question has a stable item_id and records its domain, skill, difficulty, question type, content, answer, rationale, QC status, and figure/data references.

The human-readable mock files are the canonical editable source. Production JS/JSON question data is synchronized from them; do not maintain two independent hand-edited copies.

Question correction workflow: identify mock + section + module + question + item_id; edit the canonical entry; validate; synchronize; run relevant QC; run cross-mock uniqueness checks; test runtime behavior when affected.

QC checkpoint: Verbal/R&W independent QC begins in Batch D. Math/Quant independent mathematical QC begins in Batch I. Figure and originality validation is strengthened in Batch J.

Approved sequence: A schema, B blueprint, C Verbal construction, D Verbal distractor/evidence/QC, E figure framework, F basic visuals, G 2D geometry, H 3D/future multi-source, I Math integration/QC, J figure/originality, K calibration, L end-to-end test, M 20-mock production and corpus QC.

## Batch I — Math integration + mathematical QC

**Status: COMPLETE / LIVE.**

The Math figure-quality path integrates deterministic mathematical QC and canonicalizes selected legacy Math figures before validation. Mathematical inconsistencies are rejected rather than silently corrected. A same-mock duplicate-figure rejection discovered during deployment was removed because distinct questions may legitimately share the same figure structure; cross-mock figure uniqueness remains a separate series-level rule.

## Batch J — Figure validation + originality/uniqueness

**Status: IN PROGRESS / CURRENT CHECKPOINT.**

Added `src/data/sat/mockContent/figureOriginalityQC.js` and integrated it into `figureQualityGate.js`.

The J foundation now:
- validates chart labels/series widths and numeric chart data;
- validates scatter-point structure and numeric coordinates;
- validates table headers/rows and row widths;
- rejects duplicate vertices in coordinate shapes;
- generates a deterministic normalized figure originality fingerprint;
- stores that fingerprint as `metadata.figureOriginalityFingerprint` for Math figures;
- preserves legitimate repeated figure structures within a single mock.

The existing `mockContentQualityGate.js` already performs series-level exact Math figure-data uniqueness across mocks, alongside question/prompt/construction/originality checks. The remaining J work is to strengthen figure-specific normalization and figure/question relationship validation without incorrectly rejecting legitimate reuse within a mock.

No final 20-mock production corpus or private calibration corpus is being created during J.

## Batch E — Figure framework + rendering foundation

**Status: COMPLETE and live.**

Batch E established the structured figure registry/normalization and shared Math visual rendering foundation. Compatibility corrections were deployed successfully in commits `60e1693ee29fc7a32ac78d09f97eaf1cbfbb5ce1` and `649a2d4baba31424dd12846fa20ac277e87c322c`.

## Batch F — Basic Data Visuals

**Status: COMPLETE.**

Batch F established structured support and shared rendering for `bar_chart`, `line_chart`, `scatter_plot`, and `table`. Legacy `line`, `scatter`, `quadratic`, and `geometry` formats remain supported. Mock 3 visuals were confirmed by public spot checks.

## Batch G — 2D geometry/math visuals

**Status: COMPLETE and live.**

Batch G established structured validation and shared rendering for `right_triangle`, `general_triangle`, `circle`, `parabola`, `linear_function_graph`, and `coordinate_shape`. Number lines remain deferred.

## Batch H — 3D + future multi-source architecture

**Status: IMPLEMENTED / publicly verified.**

Batch H implements the `3d_solid` structured figure contract and deterministic rendering for cube, rectangular prism/cuboid, cylinder, sphere, and cone. `multi_source_table` is structurally reserved but remains future-only and is not live-enabled.

The existing renderer behavior was preserved through `MathVisualStimulusCore`; no new visualization dependency or unrelated application subsystem was introduced.

## Remaining approved batches

- **J — Figure validation + originality/uniqueness:** in progress as described above.
- **K — Calibration corpus + assessment calibration:** pending.
- **L — End-to-end generation/QC/storage/adapter test:** pending and is the hard gate before production-volume generation.
- **M — Production generation for 20 mocks + corpus-level QC:** pending; cannot begin until Batch L passes.

Authentication, database, access control, payment/subscription, dashboard/navigation, deployment configuration, and unrelated Redux/API work remain outside this project scope.
