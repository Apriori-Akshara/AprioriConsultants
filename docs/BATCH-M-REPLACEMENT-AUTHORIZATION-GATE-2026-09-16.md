# Batch M Replacement Authorization Gate — September 16, 2026

**Status:** SATISFIED FOR THE AUTHORIZED 20-TEST TARGET SET; CONTROLLED REPLACEMENT COMPLETED  
**Documentation branch:** `main`  
**Production corpus:** Frozen at 30 mocks  
**Scope:** Controlled replacement of selected affected records from SAT1–SAT10 and PSAT1–PSAT10 only

## 1. Purpose

This document records the explicit gate between validated candidate selection and any mutation of the frozen Batch M production corpus.

Candidate generation, candidate quality validation, and candidate selection did not constitute production authorization by themselves. The later controlled replacement was performed only after the required authorization state had been established for the identified affected-record set.

## 2. Required authorization state

The replacement gate was satisfied only after all of the following were established for the affected set:

- the production scope was limited to the previously identified Batch M target set;
- replacement targets were identified by exact `testKey + questionId`;
- the selected candidate disposition was recorded;
- applicable candidate-quality gates passed;
- candidate coverage was resolved for the selected set;
- replacement authorization was explicitly established for the controlled affected-record set;
- authorization did not permit wholesale regeneration;
- no SAT21 or additional production target was included.

## 3. Verified authorization and replacement result

The authorized controlled replacement was applied by commit:

`3c125d90fca54b964d5aa044f2f6317b47dd2de3` — `feat: apply authorized Batch M controlled replacement`

The applied scope was:

- **2,144** previously identified affected unique production records reproduced as the authorized impact scope;
- **1,594** selected replacement targets applied;
- **0** out-of-scope mocks changed;
- **20** affected mocks retained exactly **196** questions each;
- **3,920** runtime questions covered across the affected 20-mock scope;
- no SAT21 created.

The replacement therefore remains constrained to the explicitly authorized affected-record set.

## 4. Post-replacement validation

The successful comprehensive 20-test QC workflow was GitHub Actions run **35181971047** (run #7).

It reported:

- **1,594 / 1,594** verified replacement targets;
- **0** schema failures;
- **0** content-quality failures;
- figure-originality gate **PASS**;
- every affected mock at **196 / 196** passing questions;
- `productionMutation: false` for the comprehensive QC stage;
- `releaseEligible: false`;
- `sat21Created: false`;
- overall status **PASS**.

This establishes completion of the targeted 20-test remediation/re-gating milestone, not final 30-mock release acceptance.

## 5. Authorization gate interpretation

The historical authorization boundary has been crossed only for the controlled replacement that was actually applied. It does **not** authorize any further unsolicited production mutation.

For any future post-freeze change, a fresh explicit authorization state must be established and the affected scope must again be identified before mutation.

## 6. Remaining release gates

The controlled replacement milestone is complete. The next implementation step is the **final collective 30-mock corpus gate**, followed by:

1. 30-mock cross-corpus calibration;
2. SAT11–SAT20 public verification;
3. final end-to-end student acceptance;
4. Batch M release acceptance.

Until those separate gates pass, `releaseEligible` remains false for final release purposes.

No SAT21 or additional production target may be created.
