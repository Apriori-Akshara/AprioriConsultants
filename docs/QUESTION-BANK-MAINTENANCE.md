# Question Bank Maintenance Checkpoint

Approved September 13, 2026.

The 20-mock production corpus will have one human-readable text file per mock, ordered by section, module, and question number. Each question has a stable item_id and records its domain, skill, difficulty, question type, content, answer, rationale, QC status, and figure/data references.

The human-readable mock files are the canonical editable source. Production JS/JSON question data is synchronized from them; do not maintain two independent hand-edited copies.

Question correction workflow: identify mock + section + module + question + item_id; edit the canonical entry; validate; synchronize; run relevant QC; run cross-mock uniqueness checks; test runtime behavior when affected.

QC checkpoint: Verbal/R&W independent QC begins in Batch D. Math/Quant independent mathematical QC begins in Batch I. Figure and originality validation is strengthened in Batch J.

Approved sequence: A schema, B blueprint, C Verbal construction, D Verbal distractor/evidence/QC, E figure framework, F basic visuals, G 2D geometry, H 3D/future multi-source, I Math integration/QC, J figure/originality, K calibration, L end-to-end test, M 20-mock production and corpus QC.

Current checkpoint: Batch C implementation exists; Batch C verification is the immediate gate. Next implementation batch: D. The calibration reference corpus and per-mock human-readable files are approved architecture but are not yet created. Batch M is blocked until Batch L passes.
