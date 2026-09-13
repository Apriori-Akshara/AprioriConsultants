# Question Bank Maintenance Checkpoint

Approved September 13, 2026.

The 20-mock production corpus will have one human-readable text file per mock, ordered by section, module, and question number. Each question has a stable item_id and records its domain, skill, difficulty, question type, content, answer, rationale, QC status, and figure/data references.

The human-readable mock files are the canonical editable source. Production JS/JSON question data is synchronized from them; do not maintain two independent hand-edited copies.

Question correction workflow: identify mock + section + module + question + item_id; edit the canonical entry; validate; synchronize; run relevant QC; run cross-mock uniqueness checks; test runtime behavior when affected.

QC checkpoint: Verbal/R&W independent QC begins in Batch D. Math/Quant independent mathematical QC begins in Batch I. Figure and originality validation is strengthened in Batch J.

Approved sequence: A schema, B blueprint, C Verbal construction, D Verbal distractor/evidence/QC, E figure framework, F basic visuals, G 2D geometry, H 3D/future multi-source, I Math integration/QC, J figure/originality, K calibration, L end-to-end test, M 20-mock production and corpus QC.

Current checkpoint: Batch C is provisionally passed based on implementation and public-site spot checks. Batch D is implemented in the final Batch C R&W path for Mocks 1–2: misconception-based distractor architecture and internal evidence maps are attached, a fresh deterministic independent QC review runs, up to two correction/retry passes are allowed for Batch D-owned defects, and `metadata.qc_status = "passed"` is enforced as the live-delivery gate. The calibration reference corpus and per-mock human-readable files are approved architecture but are not yet created. Next implementation batch: E. Batch M is blocked until Batch L passes.
