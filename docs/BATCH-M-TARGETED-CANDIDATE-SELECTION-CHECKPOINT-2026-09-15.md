# Batch M Targeted Candidate-Selection Checkpoint — September 15, 2026

**Status:** CANDIDATE COVERAGE REMEDIATION IN PROGRESS; PRODUCTION FROZEN  
**Implementation branch:** `batch-m-rw-generator-remediation-2026-09-14`  
**Production boundary:** Frozen; no production mutation, replacement, release, or SAT21 creation authorized

## 1. Work completed in this stage

The Batch M targeted candidate-selection stage has now been executed successfully in GitHub Actions, followed by an initial candidate-coverage remediation pass and a full rerun.

The implementation:

- targets the exact existing 2,144 `testKey + questionId` remediation records;
- indexes the frozen SAT1–SAT10 and PSAT1–PSAT10 production corpus read-only;
- generates candidates through the remediated R&W and Math candidate factories;
- applies the strengthened Batch M content-quality gate before selection;
- filters candidates by section, skill, domain, difficulty, assessment family/variant, question type, and figure requirements where applicable;
- enforces exact-content fingerprint checks against frozen production content and already selected candidates;
- records deterministic candidate keys and pool indexes;
- distinguishes content replacement from difficulty-calibration-only targets;
- keeps all candidate decisions outside the production question store;
- preserves the production freeze flags and does not create SAT21.

## 2. Runtime validation completed

GitHub Actions workflow:

`.github/workflows/batch-m-targeted-candidate-selection.yml`

The workflow was corrected to check out the exact triggering commit using `ref: ${{ github.sha }}` and to verify that the checked-out `HEAD` equals `GITHUB_SHA`.

The successful runtime execution completed all required stages, including candidate-pool quality diagnostics, exact replacement-candidate selection, coverage analysis, report validation, and generated-report commit.

The earlier successful implementation commits included:

- `1fcad416ac84ec2b38bc1fbffe14bcbdea8344d9` — pin Batch M workflow to triggering commit
- `176619ff15acae9cb321dc6d1ef0829d2d0f36a7` — decouple Batch M Math domain and skill coverage
- `96fd6763616880c75470fdc859277420d8469d66` — repair Batch M Math interaction and distractors
- `7c0753d1bedadea7ccaf443e4790d4b56ea2475f` — normalize Batch M Math interaction types
- `bc2810c181b51d2c52a6fa316cc95fa3c245fc2b` — repair Batch M scatterplot SPR candidates
- `a8e047aed86640c3810604b9b2b4b07ca89e8ac9` — guarantee non-generic Batch M Math distractors

The first candidate-coverage remediation pass expanded the R&W candidate pool and added figure-remediation constructions. The subsequent full rerun completed successfully and recorded its generated reports in the remediation branch.

## 3. Current runtime candidate-selection result

The latest successfully completed coverage report records:

- affected unique production records: **2,144**
- selected candidates: **410**
- no eligible candidate: **1,184**
- SAT targets: **1,071**
- PSAT targets: **1,073**

This improves the previous baseline of **371 selected / 1,223 no eligible** by **39 additional selected candidates** and **39 fewer no-eligible targets**.

Candidate coverage is therefore improving, but it is still not sufficient for downstream replacement approval.

## 4. Quality fixes required to reach the green runtime state

During runtime validation, generator defects were identified and corrected before the successful candidate-selection runs:

### Math interaction integrity

Some Scatterplot candidates had been converted to student-produced-response while retaining multiple-choice options. The generator was corrected so a candidate is converted to SPR only when it is structurally eligible for SPR. Non-numeric Scatterplot candidates remain valid multiple-choice items.

### Math distractor integrity

Generic numeric distractors such as `+1`, `−1`, and `×2` were being produced by the remediated Math layer. The generator was corrected to choose non-generic distractors while preserving the original correct answer.

### Initial coverage remediation

The first remediation pass increased the R&W candidate pool from 900 to 2,500 per SAT/PSAT product and added Math figure constructions for the most visible zero/low-coverage families. The rerun showed a measurable improvement, but the remaining diagnostics demonstrate that additional construction-to-target alignment is required.

These changes remain candidate-only remediation changes and do not mutate the frozen production corpus.

## 5. Current candidate coverage findings

The latest successful report shows that the principal remaining blockers are still **candidate construction/target compatibility constraints**, not workflow execution failure.

The most important remaining groups include:

- Quadratic functions and representations — 137 targets; **0 selected**
- Words in Context — 216 targets; **83 selected**
- Linear functions — 135 targets; **19 selected**
- Linear equations — 125 targets; **18 selected**
- Linear functions and representations — 103 targets; **14 selected**
- Linear representations — 93 targets; **13 selected**
- Exponential equations — 125 targets; **51 selected**
- Geometry and measurement — 70 targets; **2 selected**
- Similarity and scaling — 64 targets; **2 selected**
- Quadratic parameter reasoning — 107 targets; **45 selected**
- Quadratic equations — 95 targets; **40 selected**
- Data models — 48 targets; **0 selected**
- Right triangles — 46 targets; **2 selected**

Repeated rejection causes remain:

- difficulty mismatch
- assessment-variant mismatch
- candidate reuse
- question-type mismatch
- figure-required / figure-type mismatch

The latest rerun also confirms that simply adding a figure to a generator construction is not enough when the generator's source skill name or raw figure type does not align with the frozen target metadata. The next remediation work must therefore align the actual construction names and canonical figure types with the selection layer without weakening the eligibility rules.

## 6. Production boundary

The following remain unchanged:

- `productionMutation: false`
- `releaseEligible: false`
- `replacementAuthorization: NOT_AUTHORIZED`
- `sat21Created: false`

No production question has been replaced, and no release to the frozen corpus has been performed.

## 7. Next logical stage — targeted construction/figure alignment and rerun

**Next step:** continue candidate coverage remediation by fixing the actual generator-side source constructions that still produce zero/very-low coverage, beginning with the confirmed Math figure/skill alignment failures and then the highest-volume R&W/Math groups.

The next stage must:

1. use the latest 410 selected / 1,184 no-eligible report as the baseline;
2. inspect the actual generator construction names used by the candidate pool against the target-side skill aliases;
3. align raw figure types with the frozen target metadata and the canonical figure-quality gate;
4. preserve assessment-family/variant and PSAT ceiling rules;
5. preserve difficulty requirements rather than relaxing them globally;
6. preserve uniqueness/originality and candidate-reuse constraints;
7. avoid relabeling candidates solely to improve counts;
8. rerun the full candidate-selection workflow after each material generator correction;
9. compare the new result against **410 selected / 1,184 no-eligible**;
10. keep production frozen throughout.

Do **not** begin production replacement or approval until candidate coverage is materially resolved and the required downstream gates are satisfied.

## 8. Resume point for the next session

Read only these documents/sections first:

- this document, especially **§5 Current candidate coverage findings** and **§7 Next logical stage — targeted construction/figure alignment and rerun**;
- `docs/BATCH-M-TARGETED-CANDIDATE-COVERAGE-2026-09-15.json` — latest target/selection/rejection evidence;
- `docs/BATCH-M-TARGETED-CANDIDATE-SELECTION-2026-09-15.json` — exact per-target candidate dispositions;
- `docs/BATCH-M-TARGETED-REPLACEMENT-CHECKPOINT-2026-09-15.md` — production boundary and downstream approval gates;
- `docs/QUESTION-GENERATION-ROADMAP.md` — only the section governing the current Batch M remediation stage.

Do not repeat the impact audit, inventory, replacement preparation, workflow-repair history, or already-green runtime checks unless a repository discrepancy is found.
