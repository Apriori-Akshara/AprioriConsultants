# Batch M Targeted Candidate-Selection Checkpoint — September 15, 2026

**Status:** RUNTIME EXECUTION COMPLETE; CANDIDATE COVERAGE REMEDIATION NEXT  
**Implementation branch:** `batch-m-rw-generator-remediation-2026-09-14`  
**Production boundary:** Frozen; no production mutation, replacement, release, or SAT21 creation authorized

## 1. Work completed in this stage

The Batch M targeted candidate-selection stage has now been executed successfully in GitHub Actions.

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

The successful runtime execution completed all stages:

- triggering-commit checkout — PASS
- workflow-commit equality check — PASS
- runner-file validation — PASS
- candidate-pool quality diagnostics — PASS
- exact replacement-candidate selection — PASS
- candidate-selection report validation — PASS
- candidate coverage analysis — PASS
- candidate coverage report validation — PASS
- generated-report commit — PASS

The successful implementation commits were:

- `1fcad416ac84ec2b38bc1fbffe14bcbdea8344d9` — pin Batch M workflow to triggering commit
- `176619ff15acae9cb321dc6d1ef0829d2d0f36a7` — decouple Batch M Math domain and skill coverage
- `96fd6763616880c75470fdc859277420d8469d66` — repair Batch M Math interaction and distractors
- `7c0753d1bedadea7ccaf443e4790d4b56ea2475f` — normalize Batch M Math interaction types
- `bc2810c181b51d2c52a6fa316cc95fa3c245fc2b` — repair Batch M scatterplot SPR candidates
- `a8e047aed86640c3810604b9b2b4b07ca89e8ac9` — guarantee non-generic Batch M Math distractors

The successful Actions run completed on commit `a8e047aed86640c3810604b9b2b4b07ca89e8ac9`; GitHub Actions then recorded the generated reports in commit `978559eb3d25c9f149275b8153264ebeb143e97b`.

## 3. Runtime candidate-selection result

The validated coverage report records:

- affected unique production records: **2,144**
- selected candidates: **371**
- no eligible candidate: **1,223**
- SAT targets: **1,071**
- PSAT targets: **1,073**

The candidate-selection pipeline therefore passes as an executable/read-only process, but candidate coverage is not yet sufficient for downstream replacement approval.

## 4. Quality fixes required to reach the green runtime state

During runtime validation, two generator defects were identified and corrected before the successful run:

### Math interaction integrity

Some Scatterplot candidates had been converted to student-produced-response while retaining multiple-choice options. The generator was corrected so a candidate is converted to SPR only when it is structurally eligible for SPR. Non-numeric Scatterplot candidates remain valid multiple-choice items.

### Math distractor integrity

Generic numeric distractors such as `+1`, `−1`, and `×2` were being produced by the remediated Math layer. The generator was corrected to choose non-generic distractors while preserving the original correct answer.

These changes were candidate-only remediation changes and did not mutate the frozen production corpus.

## 5. Current candidate coverage findings

The successful report shows that the principal remaining blockers are now **coverage constraints**, not workflow execution failure.

The largest remaining groups include:

- Words in Context — 216 targets; 46 selected
- Quadratic functions and representations — 137 targets; 0 selected
- Linear functions — 135 targets; 19 selected
- Exponential equations — 125 targets; 51 selected
- Linear equations — 125 targets; 18 selected
- Quadratic parameter reasoning — 107 targets; 45 selected
- Linear functions and representations — 103 targets; 14 selected
- Quadratic equations — 95 targets; 40 selected
- Cross-Text Connections — 94 targets; 5 selected
- Linear representations — 93 targets; 13 selected
- Inferences — 90 targets; 6 selected
- Geometry and measurement — 70 targets; 2 selected
- Similarity and scaling — 64 targets; 2 selected
- Data models — 48 targets; 0 selected
- Right triangles — 46 targets; 0 selected

The latest coverage analysis shows repeated rejection causes including:

- difficulty mismatch
- assessment-variant mismatch
- candidate reuse
- question-type mismatch
- figure-required / figure-type mismatch

These must be resolved by improving candidate-pool coverage and construction alignment. The selection rules must not simply be relaxed to force coverage.

## 6. Production boundary

The following remain unchanged:

- `productionMutation: false`
- `releaseEligible: false`
- `replacementAuthorization: NOT_AUTHORIZED`
- `sat21Created: false`

No production question has been replaced, and no release to the frozen corpus has been performed.

## 7. Next logical stage — candidate coverage remediation

**Next step:** remediate the candidate-generation/coverage gaps identified by the successful report, beginning with the highest-impact zero/low-coverage Math and R&W groups.

The next stage must:

1. use the existing coverage report and rejection diagnostics as the starting evidence;
2. identify the specific generator/pool constraint causing each material zero/low-coverage group;
3. add or correct candidate constructions so the required target skill/domain/figure/question-type combinations genuinely exist;
4. preserve the strengthened content-quality gate;
5. preserve assessment-family/variant and PSAT ceiling rules;
6. preserve uniqueness/originality and candidate-reuse constraints;
7. avoid blindly loosening eligibility rules or relabeling candidates solely to improve counts;
8. rerun the full candidate-selection workflow after the generator changes;
9. compare the new coverage report against the current baseline of 371 selected / 1,223 no-eligible;
10. keep production frozen throughout.

Do **not** begin production replacement or approval until candidate coverage is materially resolved and the required downstream gates are satisfied.

## 8. Resume point for the next session

Read only these documents/sections first:

- this document, especially **§5 Current candidate coverage findings** and **§7 Next logical stage — candidate coverage remediation**;
- `docs/BATCH-M-TARGETED-CANDIDATE-COVERAGE-2026-09-15.json` — current target/selection/rejection evidence;
- `docs/BATCH-M-TARGETED-CANDIDATE-SELECTION-2026-09-15.json` — exact per-target candidate dispositions;
- `docs/BATCH-M-TARGETED-REPLACEMENT-CHECKPOINT-2026-09-15.md` — production boundary and downstream approval gates;
- `docs/QUESTION-GENERATION-ROADMAP.md` — only the section governing the current Batch M remediation stage.

Do not repeat the impact audit, inventory, replacement preparation, workflow-repair history, or already-green runtime checks unless a repository discrepancy is found.