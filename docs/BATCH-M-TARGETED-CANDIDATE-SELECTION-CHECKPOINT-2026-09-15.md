# Batch M Targeted Candidate-Selection Checkpoint — September 15, 2026

**Status:** CANDIDATE COVERAGE REMEDIATION IN PROGRESS; PRODUCTION FROZEN  
**Implementation branch:** `batch-m-rw-generator-remediation-2026-09-14`  
**Production boundary:** Frozen; no production mutation, replacement, release, or SAT21 creation authorized

## 1. Work completed in this stage

The Batch M targeted candidate-selection stage has been executed successfully through the Words in Context diversity remediation and its corrective WIC impact-guard pass.

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

## 2. Latest runtime validation

GitHub Actions workflow:

`.github/workflows/batch-m-targeted-candidate-selection.yml`

Latest successful workflow run: **#67**, run ID `34991832679`, triggered by commit `95607eeb0f5975a1e241eb18c2a8b1bbe05932db` (`fix: restore Batch M WIC impact guard`).

The workflow completed successfully. All required stages passed, including:

- candidate coverage remediation;
- linear construction remediation;
- linear difficulty/reuse remediation;
- linear alias partition remediation;
- Words in Context remediation;
- difficulty coverage remediation;
- candidate-pool quality diagnostics;
- exact replacement-candidate selection;
- candidate-selection report verification;
- coverage analysis and verification; and
- generated-report commit.

The workflow generated the candidate/report update commit `d1b7068` (`fix: remediate Batch M Words in Context diversity`) after the successful selection run.

### Superseded failed run

The immediately preceding workflow run **#66**, run ID `34990151284`, failed during exact replacement-candidate selection because the temporary WIC quality-gate change reduced the frozen affected-record inventory from 2,144 to 2,014. This was a scope-preservation failure, not a production mutation or candidate-pool failure.

The corrective pass restored the legacy WIC impact guard while replacing the newly added `qualify` candidate target with `moderate`. The next run returned the frozen inventory to exactly 2,144 and completed green.

No retry of the superseded failed run is required.

## 3. Current runtime candidate-selection result

The latest successfully completed selection report records:

- affected unique production records: **2,144**
- selected candidates: **1,111**
- no eligible candidate: **483**
- SAT targets: **1,071**
- PSAT targets: **1,073**
- production mutation: **false**
- release eligible: **false**
- replacement authorization: **NOT_AUTHORIZED**
- SAT21 created: **false**

The result is **unchanged from the prior verified 1,111 selected / 483 no-eligible baseline**. Therefore, the WIC diversity correction successfully restored the frozen impact inventory and workflow integrity, but did not materially increase overall candidate coverage.

The candidate-pool quality diagnostic passed for both SAT and PSAT: **13,000 generated candidates per product**, with zero failed candidates and zero serious failures.

## 4. Difficulty and WIC remediation status

The Math candidate factory continues to use the broader deterministic difficulty lane of **30% easy / 50% medium / 20% hard** rather than the previous 25% easy / 50% medium / 25% hard lane. This improved the earlier result from 1,103/491 to 1,111/483, but the latest rerun shows that the remaining difficulty bottleneck is not resolved.

The Words in Context remediation expanded the candidate vocabulary and stimulus/family variation while preserving the frozen production-impact inventory. The latest coverage analysis shows **166 selected / 50 no-eligible** WIC targets, with candidate reuse as the leading blocker for that skill. The WIC remediation therefore improved candidate diversity at the generator level but did not materially improve the final global selection count.

## 5. Current candidate coverage findings

The latest coverage analysis reports **15** skill groups with remaining no-eligible candidates. The largest remaining groups are:

- **Linear functions** — 135 targets; **41 selected; 94 no eligible; 30.37% coverage**
- **Linear functions and representations** — 103 targets; **29 selected; 74 no eligible; 28.16% coverage**
- **Linear representations** — 93 targets; **27 selected; 66 no eligible; 29.03% coverage**
- **Words in Context** — 216 targets; **166 selected; 50 no eligible; 76.85% coverage**
- **Linear equations** — 125 targets; **89 selected; 36 no eligible; 71.20% coverage**
- **Geometry and measurement** — 70 targets; **38 selected; 32 no eligible; 54.29% coverage**
- **Similarity and scaling** — 64 targets; **35 selected; 29 no eligible; 54.69% coverage**
- **Weighted means** — 80 targets; **58 selected; 22 no eligible; 72.50% coverage**
- **Right triangles** — 46 targets; **26 selected; 20 no eligible; 56.52% coverage**
- **Measures of spread** — 68 targets; **50 selected; 18 no eligible; 73.53% coverage**
- **Exponential equations** — 125 targets; **113 selected; 12 no eligible; 90.40% coverage**
- **Quadratic functions and representations** — 137 targets; **125 selected; 12 no eligible; 91.24% coverage**
- **Quadratic equations** — 95 targets; **87 selected; 8 no eligible; 91.58% coverage**
- **Quadratic parameter reasoning** — 107 targets; **99 selected; 8 no eligible; 92.52% coverage**
- **Percentages** — 60 targets; **58 selected; 2 no eligible; 96.67% coverage**

Across the full analysis, the dominant rejection causes remain:

1. **difficulty mismatch** — 1,774
2. **candidate reuse** — 1,284
3. **question-type mismatch** — 433

The highest-volume remaining Math problems are concentrated in the linear-function family, with difficulty mismatch as the dominant rejection reason. Candidate reuse is the second major constraint, while question-type compatibility is a smaller but recurring constraint.

The R&W `Words in Context` group is now substantially improved in coverage relative to the earlier state, but candidate reuse remains its principal remaining blocker.

## 6. Production boundary

The following remain unchanged:

- `productionMutation: false`
- `releaseEligible: false`
- `replacementAuthorization: NOT_AUTHORIZED`
- `sat21Created: false`

No production question has been replaced, and no release to the frozen corpus has been performed.

## 7. Next logical stage — construction-level difficulty and reuse remediation

**Next step:** inspect and improve the actual generator-side constructions for the remaining high-volume difficulty/reuse bottlenecks, beginning with the three linear-function source families:

- `Linear functions`
- `Linear functions and representations`
- `Linear representations`

This is a **diagnosis-and-construction** stage, not a production replacement stage.

The next stage must:

1. use the latest **1,111 selected / 483 no-eligible** result as the baseline;
2. inspect the actual construction-level difficulty distribution for these source skills;
3. identify why valid candidates are being rejected for target difficulty rather than weakening the difficulty gate;
4. increase genuine difficulty diversity through construction design, not metadata relabeling;
5. identify why candidate fingerprints are being reused across targets and expand construction variation where needed;
6. preserve question-type compatibility and all figure requirements;
7. preserve assessment-family/variant and PSAT ceiling rules;
8. preserve uniqueness/originality and exact-content fingerprint safeguards;
9. rerun the full candidate-selection workflow after each material generator correction;
10. compare the new result against **1,111 selected / 483 no eligible**;
11. keep production frozen throughout.

Do **not** begin production replacement or approval until candidate coverage is materially resolved and all downstream gates are satisfied.

## 8. Resume point for the next session

Read only these documents/sections first:

- this document, especially **§5 Current candidate coverage findings** and **§7 Next logical stage — construction-level difficulty and reuse remediation**;
- `docs/BATCH-M-TARGETED-CANDIDATE-COVERAGE-2026-09-15.json` — latest target/selection/rejection evidence;
- `docs/BATCH-M-TARGETED-CANDIDATE-SELECTION-2026-09-15.json` — exact per-target candidate dispositions;
- `docs/BATCH-M-TARGETED-REPLACEMENT-CHECKPOINT-2026-09-15.md` — production boundary and downstream approval gates;
- `docs/QUESTION-GENERATION-ROADMAP.md` — only the section governing the current Batch M remediation stage.

Do not repeat the impact audit, inventory, replacement preparation, workflow-repair history, or already-green runtime checks unless a repository discrepancy is found.
