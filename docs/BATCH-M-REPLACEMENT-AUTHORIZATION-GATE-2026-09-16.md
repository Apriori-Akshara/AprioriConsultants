# Batch M Replacement Authorization Gate — September 16, 2026

**Status:** BLOCKED — explicit replacement authorization not present
**Documentation branch:** `main`
**Production corpus:** Frozen
**Scope:** Controlled replacement of selected affected records from SAT1–SAT10 and PSAT1–PSAT10 only

## 1. Purpose

This document is the explicit gate between validated candidate selection and any mutation of the frozen Batch M production corpus.

Candidate generation, candidate quality validation, and candidate selection do **not** constitute production authorization. A production replacement may occur only after an explicit authorization state is recorded.

## 2. Required authorization state

The replacement gate is satisfied only when all of the following are explicitly true:

- the affected production scope is limited to the already-authorized Batch M target set;
- every replacement target is identified by exact `testKey + questionId`;
- the selected candidate disposition is recorded for each target;
- applicable individual candidate-quality gates have passed;
- no unresolved candidate-coverage blocker remains;
- `replacementAuthorization` is explicitly set to `AUTHORIZED` by the project owner/authorized decision-maker;
- the authorization applies only to the identified affected records and does not authorize wholesale regeneration;
- no SAT21 or additional production target is included.

## 3. Verified current state

The latest candidate-selection checkpoint reports **1,594 selected candidates out of 2,144 affected unique records**, with zero no-eligible candidates. It also explicitly reports `productionMutation: false`, `releaseEligible: false`, `replacementAuthorization: NOT_AUTHORIZED`, and `sat21Created: false`. No frozen question has been replaced. 

The earlier replacement checkpoint likewise states that the candidate-pool dry run validates candidate-generator/pool gates only and does not authorize production replacement. Its mandatory pre-mutation gates require explicit replacement authorization before any frozen production record is changed.

## 4. Authorization decision

**REPLACEMENT AUTHORIZATION: NOT ESTABLISHED**

There is no verified repository authorization record that changes the current boundary to `AUTHORIZED`.

Therefore:

- **No production records may be mutated.**
- **No candidate may be written into the frozen production corpus.**
- **No remediation branch may be promoted solely on the basis of candidate selection.**
- **No release may be marked eligible.**
- **No SAT21 may be created.**

## 5. Evidence used for this gate

- `docs/BATCH-M-TARGETED-REPLACEMENT-CHECKPOINT-2026-09-15.md`
- `docs/BATCH-M-TARGETED-CANDIDATE-SELECTION-CHECKPOINT-2026-09-15.md`
- `docs/BATCH-M-TARGETED-CANDIDATE-COVERAGE-2026-09-15.json`
- `docs/BATCH-M-TARGETED-CANDIDATE-SELECTION-2026-09-15.json`
- `docs/QUESTION-GENERATION-ROADMAP.md` — current Batch M section

The current candidate-selection checkpoint records the latest successful workflow as run `35060652969`, with coverage resolved at 1,594 selected / 0 no-eligible, while retaining `replacementAuthorization: NOT_AUTHORIZED`.

## 6. Next action

The next implementation step is **not production replacement**.

An explicit owner authorization must first be supplied and recorded as `replacementAuthorization: AUTHORIZED` for the controlled affected-record set. Once that state exists, the implementation may proceed to the controlled replacement stage, followed by the documented affected-mock gates, final 30-mock corpus gate, cross-corpus calibration, SAT11–SAT20 public verification, end-to-end student acceptance, and Batch M release acceptance.

Until then, the frozen production corpus remains unchanged.
