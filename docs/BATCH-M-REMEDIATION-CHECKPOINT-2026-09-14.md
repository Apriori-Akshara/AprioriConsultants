# Batch M Remediation Checkpoint — September 14, 2026

## Representative remediation QC — COMPLETE

The candidate-only remediation path has passed the strengthened content-quality gate:

- 80 evaluated
- 80 passed
- 0 failed
- average score 100
- 0 serious failures
- 40 R&W + 40 Math
- Math student-produced-response = 25%
- `productionMutation: false`
- `releaseEligible: false`

The runner reports `Batch M representative remediation QC PASSED.`

## Repository synchronization

The final right-triangle candidate-distractor correction is synchronized to GitHub in commit `42493c99faf60f9ad5a1885691fbc62ffae5f02c`.

The representative QC runner pass-property correction is in `be0aa6b6f4a63f26f6c5da6b940a00ffad71e7af`.

The candidate remediation remains isolated from the frozen production store.

## Production freeze

The approved production corpus remains exactly SAT1–SAT10, PSAT1–PSAT10, and SAT11–SAT20: 30 mocks, 196 records per mock, 5,880 records total.

No SAT21. No wholesale regeneration. No production question was replaced by representative remediation.

## Read-only production-impact audit — COMPLETE

The frozen SAT1–SAT10 and PSAT1–PSAT10 corpus was audited for the documented R&W and Math content-quality findings.

The audit identified **1,264 targeted replacement candidates**:

- 732 R&W
- 532 Math

The replacement set is distributed by remediation family as follows:

- 216 relationship-first Cross-Text items
- 216 contextual Words-in-Context items
- 216 Rhetorical Synthesis items using notes → communication goal construction
- 84 other reasoning-demand-driven R&W items
- 341 strategic/multi-step Math items with misconception-based distractors
- 191 figure-essential Math items

The production store was not mutated during this audit.

## Targeted replacement dry-run checkpoint — BLOCKED BY GENERATOR CAPACITY

The next dry-run was designed to test whether the current remediated candidate generators can supply enough **distinct** candidates for the approved 1,264 replacement slots while still passing the strengthened content-quality gate.

Read-only inspection of the actual candidate-generator logic found a blocking capacity problem before production replacement:

### R&W

The current remediated R&W generator reuses four source records per source family and deterministic modulo selection. For the replacement construction families that require the largest supply, the generated prompt diversity is far below the approved replacement demand. A simulation of the current logic produces only approximately:

- 4 unique Cross-Text constructions for 216 required candidates
- 4 unique Rhetorical Synthesis constructions for 216 required candidates
- 16 unique Words-in-Context constructions for 216 required candidates

Therefore the current remediated R&W generator cannot yet support the targeted replacement inventory without introducing unacceptable repetition.

### Math

The current remediated Math generator also uses the same `index % 4` selector both for domain selection and internal construction selection. This causes each domain to exercise only one of its intended four construction branches rather than cycling independently across all four construction families. The result is insufficient construction diversity for the production-scale targeted replacement pool.

The targeted replacement dry run is therefore **NOT PASSED** at this checkpoint.

This is a generator-capacity/content-diversity issue, not a production-corpus failure. No production record has been changed.

## Required next action

Before any production replacement:

1. strengthen the remediated R&W generator so the approved replacement families can produce materially distinct, content-specific items at production scale;
2. correct the remediated Math construction selector so domains and construction forms vary independently;
3. run a production-scale candidate dry run covering the full approved replacement demand for SAT and PSAT;
4. require content-quality pass, construction-family capacity, and normalized-prompt uniqueness before production mutation is allowed;
5. only then perform targeted replacement, record every post-freeze change, and rerun affected mock gates plus the final 30-mock collective corpus gate.

## Release position

Representative remediation: **PASS**.

Frozen production corpus: **QUALITY HOLD**.

Targeted replacement: **NOT YET AUTHORIZED** because the current remediation generators do not yet demonstrate sufficient production-scale construction diversity.

No SAT21. No wholesale regeneration. No silent production replacement.
